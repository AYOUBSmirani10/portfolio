import { NextResponse } from "next/server";

import { clampUserMessage, normalizeHistory, type ChatMessage } from "@/lib/prompts";
import { createChatCompletionStream } from "@/lib/mistral";

export const runtime = "edge";

type ChatRequestBody = {
  message?: string;
  history?: ChatMessage[];
};

function normalizeEnvModel(value: string) {
  const trimmed = value.trim();
  // Allow users to write HF_MODEL="..." in .env.local
  return trimmed.replace(/^['"]|['"]$/g, "");
}

export async function POST(req: Request) {
  const apiKey = process.env.HUGGINGFACE_API_KEY;
  const model = normalizeEnvModel(process.env.HF_MODEL ?? "google/gemma-2-2b-it:fastest");

  if (!apiKey) {
    return NextResponse.json(
      {
        error: "Missing HUGGINGFACE_API_KEY. Add it to .env.local on the server.",
      },
      { status: 500 },
    );
  }

  let body: ChatRequestBody;
  try {
    body = (await req.json()) as ChatRequestBody;
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const message = clampUserMessage(body.message ?? "");
  const history = normalizeHistory(body.history);

  if (!message) {
    return NextResponse.json({ error: "Message is required" }, { status: 400 });
  }

  const messages: ChatMessage[] = [...history, { role: "user", content: message }];

  const upstream = await createChatCompletionStream({
    provider: "hf",
    model,
    apiKey,
    temperature: 0.2,
    maxTokens: 900,
    messages,
  });

  if (!upstream.ok) {
    const text = await upstream.text().catch(() => "");

    let hint: string | undefined;
    try {
      const parsed = JSON.parse(text) as any;
      const code = parsed?.error?.code;
      const message = parsed?.error?.message;

      if (code === "model_not_supported") {
        hint =
          "Model not supported by your enabled Hugging Face Inference Providers. The server will try to auto-select an available Router model from GET /v1/models, but for best reliability enable at least one provider at https://hf.co/settings/inference-providers (and ensure your token has 'Inference Providers' permission), then set HF_MODEL to a model available in your Router dashboard.";
      } else if (typeof message === "string" && message.toLowerCase().includes("not supported")) {
        hint =
          "The selected model is not available for your Hugging Face Router setup. Verify HF_MODEL and that at least one provider is enabled on your HF account.";
      }
    } catch {
      // ignore JSON parse errors
    }

    return NextResponse.json(
      {
        error: "Upstream LLM request failed",
        status: upstream.status,
        provider: "hf",
        model,
        hint,
        details: text.slice(0, 2000),
      },
      { status: upstream.status },
    );
  }

  const headers = new Headers(upstream.headers);
  headers.set("Content-Type", "text/event-stream; charset=utf-8");
  headers.set("Cache-Control", "no-cache, no-transform");

  return new Response(upstream.body, {
    status: 200,
    headers,
  });
}
