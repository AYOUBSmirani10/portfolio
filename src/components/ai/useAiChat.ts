"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";

export type ChatRole = "user" | "assistant";

export type ChatMessage = {
  id: string;
  role: ChatRole;
  content: string;
  createdAt: number;
};

const STORAGE_KEY = "ai_chat_history_v1";

function safeParseJson<T>(value: string): T | null {
  try {
    return JSON.parse(value) as T;
  } catch {
    return null;
  }
}

function now() {
  return Date.now();
}

function uid() {
  return Math.random().toString(36).slice(2) + "_" + now().toString(36);
}

function toApiHistory(messages: ChatMessage[]) {
  return messages
    .filter((m) => m.role === "user" || m.role === "assistant")
    .map((m) => ({ role: m.role, content: m.content }));
}

function extractDeltaTextFromSseData(data: any): string {
  // OpenAI-style chunk: { choices: [{ delta: { content: "..." } }] }
  const choice = data?.choices?.[0];
  const content = choice?.delta?.content ?? choice?.message?.content;
  return typeof content === "string" ? content : "";
}

export function useAiChat() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isStreaming, setIsStreaming] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const abortRef = useRef<AbortController | null>(null);

  useEffect(() => {
    const raw = typeof window !== "undefined" ? window.localStorage.getItem(STORAGE_KEY) : null;
    if (!raw) return;

    const parsed = safeParseJson<ChatMessage[]>(raw);
    if (!Array.isArray(parsed)) return;

    const sanitized = parsed
      .filter((m) => m && (m.role === "user" || m.role === "assistant") && typeof m.content === "string")
      .slice(-30)
      .map((m) => ({
        id: typeof m.id === "string" ? m.id : uid(),
        role: m.role,
        content: m.content,
        createdAt: typeof m.createdAt === "number" ? m.createdAt : now(),
      }));

    setMessages(sanitized);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(messages.slice(-30)));
  }, [messages]);

  const canSend = useMemo(() => !isStreaming, [isStreaming]);

  const stop = useCallback(() => {
    abortRef.current?.abort();
    abortRef.current = null;
    setIsStreaming(false);
  }, []);

  const clear = useCallback(() => {
    stop();
    setMessages([]);
    setError(null);
    if (typeof window !== "undefined") {
      window.localStorage.removeItem(STORAGE_KEY);
    }
  }, [stop]);

  const send = useCallback(
    async (text: string) => {
      const message = (text ?? "").trim();
      if (!message) return;
      if (isStreaming) return;

      setError(null);
      setIsStreaming(true);

      const controller = new AbortController();
      abortRef.current = controller;

      const userMsg: ChatMessage = {
        id: uid(),
        role: "user",
        content: message,
        createdAt: now(),
      };

      const assistantId = uid();
      const assistantMsg: ChatMessage = {
        id: assistantId,
        role: "assistant",
        content: "",
        createdAt: now(),
      };

      setMessages((prev) => [...prev, userMsg, assistantMsg]);

      try {
        const historySnapshot = toApiHistory([...messages, userMsg]);

        const res = await fetch("/api/chat", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          signal: controller.signal,
          body: JSON.stringify({
            message,
            history: historySnapshot,
          }),
        });

        if (!res.ok || !res.body) {
          const text = await res.text().catch(() => "");
          throw new Error(text || `HTTP ${res.status}`);
        }

        const reader = res.body.getReader();
        const decoder = new TextDecoder();

        let buffer = "";
        let done = false;

        while (!done) {
          const read = await reader.read();
          done = read.done;
          buffer += decoder.decode(read.value ?? new Uint8Array(), { stream: !done });

          // SSE events are separated by blank lines
          let eventEnd = buffer.indexOf("\n\n");
          while (eventEnd !== -1) {
            const rawEvent = buffer.slice(0, eventEnd);
            buffer = buffer.slice(eventEnd + 2);

            const lines = rawEvent.split(/\r?\n/);
            for (const line of lines) {
              const trimmed = line.trim();
              if (!trimmed.startsWith("data:")) continue;

              const payload = trimmed.slice("data:".length).trim();
              if (!payload) continue;
              if (payload === "[DONE]") {
                done = true;
                break;
              }

              const json = safeParseJson<any>(payload);
              if (!json) continue;

              const delta = extractDeltaTextFromSseData(json);
              if (!delta) continue;

              setMessages((prev) =>
                prev.map((m) => (m.id === assistantId ? { ...m, content: m.content + delta } : m)),
              );
            }

            eventEnd = buffer.indexOf("\n\n");
          }
        }
      } catch (e: any) {
        const msg = typeof e?.message === "string" ? e.message : "Erreur inconnue";
        setError(msg);
        setMessages((prev) =>
          prev.map((m) =>
            m.id === assistantId && !m.content
              ? { ...m, content: "Désolé, je n'ai pas pu répondre. Réessaie dans un instant." }
              : m,
          ),
        );
      } finally {
        setIsStreaming(false);
        abortRef.current = null;
      }
    },
    [isStreaming, messages],
  );

  return {
    messages,
    isStreaming,
    error,
    canSend,
    send,
    stop,
    clear,
  };
}
