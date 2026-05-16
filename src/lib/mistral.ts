import { buildSystemPrompt, type ChatMessage } from "./prompts";

export type Provider = "hf";

export type ChatCompletionStreamParams = {
  provider?: Provider;
  model: string;
  apiKey: string;
  temperature?: number;
  maxTokens?: number;
  messages: ChatMessage[];
};

function buildUpstreamMessages(messages: ChatMessage[]): Array<{ role: string; content: string }> {
  return [
    {
      role: "system",
      content: buildSystemPrompt(),
    },
    ...messages.map((m) => ({ role: m.role, content: m.content })),
  ];
}

type RouterModelsList = {
  data?: Array<{ id?: string }>;
};

const FALLBACK_MODEL_PREFERENCES = [
  // Pick a small, broadly available instruct model first.
  "google/gemma-2-2b-it",
  "meta-llama/Meta-Llama-3-8B-Instruct",
  "mistralai/Mistral-7B-Instruct-v0.3",
  "deepseek-ai/DeepSeek-R1",
  "openai/gpt-oss-120b",
];

function ensureFastestPolicy(modelId: string) {
  // Router supports policy suffixes; prefer fastest.
  return modelId.includes(":") ? modelId : `${modelId}:fastest`;
}

async function listRouterModels(apiKey: string): Promise<string[] | null> {
  const res = await fetch("https://router.huggingface.co/v1/models", {
    headers: {
      Authorization: `Bearer ${apiKey}`,
      Accept: "application/json",
    },
  });

  if (!res.ok) return null;

  try {
    const json = (await res.json()) as RouterModelsList;
    const ids = (json.data ?? []).map((m) => m.id).filter((id): id is string => typeof id === "string");
    return ids;
  } catch {
    return null;
  }
}

function pickFallbackModel(available: string[]): string | null {
  if (available.length === 0) return null;
  const set = new Set(available);

  for (const base of FALLBACK_MODEL_PREFERENCES) {
    const fastest = ensureFastestPolicy(base);
    if (set.has(fastest)) return fastest;
    if (set.has(base)) return ensureFastestPolicy(base);

    // Some listings include provider suffixes like ":fireworks-ai".
    const providerVariant = available.find((id) => id === base || id.startsWith(base + ":"));
    if (providerVariant) return providerVariant;
  }

  // Last resort: pick any model with a policy/provider suffix (usually chat-capable).
  const anyChatish = available.find((id) => id.includes(":fastest") || id.includes(":preferred")) ?? available[0];
  return anyChatish;
}

async function isModelNotSupportedResponse(res: Response): Promise<boolean> {
  if (res.status !== 400) return false;
  const text = await res.clone().text().catch(() => "");
  try {
    const parsed = JSON.parse(text) as any;
    return parsed?.error?.code === "model_not_supported";
  } catch {
    return false;
  }
}

export async function createChatCompletionStream({
  model,
  apiKey,
  temperature = 0.7,
  maxTokens = 800,
  messages,
}: ChatCompletionStreamParams): Promise<Response> {
  const apiUrl = "https://router.huggingface.co/v1/chat/completions";

  async function post(modelName: string) {
    return fetch(apiUrl, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
        Accept: "text/event-stream",
      },
      body: JSON.stringify({
        model: modelName,
        messages: buildUpstreamMessages(messages),
        temperature,
        max_tokens: maxTokens,
        stream: true,
      }),
    });
  }

  const upstream = await post(model);

  if (upstream.ok) return upstream;

  if (await isModelNotSupportedResponse(upstream)) {
    const available = await listRouterModels(apiKey);
    if (available && available.length > 0) {
      const fallback = pickFallbackModel(available);
      if (fallback && fallback !== model) {
        const retry = await post(fallback);
        if (retry.ok) return retry;
      }
    }
  }

  return upstream;
}
