"use client";

import { useEffect, useMemo, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";

import { AIResponse } from "./AIResponse";
import type { ChatMessage } from "./useAiChat";

function TypingIndicator() {
  return (
    <div
      className="inline-flex items-center gap-1 px-4 py-3 rounded-2xl border"
      style={{
        background: "rgba(17, 24, 39, 0.55)",
        borderColor: "var(--border)",
        backdropFilter: "blur(18px)",
        WebkitBackdropFilter: "blur(18px)",
      }}
    >
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className="inline-block size-2 rounded-full animate-pulse"
          style={{
            background: "var(--accent-cyan)",
            opacity: 0.8,
            animationDelay: `${i * 0.15}s`,
          }}
        />
      ))}
      <span className="ml-2 text-sm" style={{ color: "var(--text-muted)" }}>
        Réflexion…
      </span>
    </div>
  );
}

export function ChatContainer({
  messages,
  isStreaming,
  error,
}: {
  messages: ChatMessage[];
  isStreaming: boolean;
  error: string | null;
}) {
  const bottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages.length, isStreaming]);

  const visibleMessages = useMemo(() => messages.filter((m) => m.content.trim().length > 0), [messages]);

  return (
    <div className="w-full">
      {error ? (
        <div className="mb-3 text-sm" style={{ color: "var(--error)" }}>
          {error}
        </div>
      ) : null}

      <div
        className="w-full rounded-2xl border overflow-hidden"
        style={{
          borderColor: "var(--border)",
          background: "rgba(17, 24, 39, 0.35)",
          backdropFilter: "blur(18px)",
          WebkitBackdropFilter: "blur(18px)",
        }}
      >
        <div className="max-h-[420px] overflow-y-auto px-4 py-4 flex flex-col gap-3">
          <AnimatePresence initial={false}>
            {visibleMessages.map((m) => (
              <motion.div
                key={m.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
              >
                <AIResponse message={m} />
              </motion.div>
            ))}
          </AnimatePresence>

          {isStreaming ? <TypingIndicator /> : null}

          <div ref={bottomRef} />
        </div>
      </div>
    </div>
  );
}
