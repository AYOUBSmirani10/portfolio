"use client";

import { useMemo } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import type { ChatMessage } from "./useAiChat";

type SectionTarget = {
  id: "home" | "about" | "projects" | "stack" | "references" | "contact";
  label: string;
  keywords: string[];
  strongKeywords?: string[];
  minScore?: number;
};

type NavHint = {
  section: SectionTarget["id"];
  focusId?: string;
};

const SECTION_TARGETS: SectionTarget[] = [
  {
    id: "contact",
    label: "Contact",
    keywords: [
      "contact",
      "me contacter",
      "email",
      "e-mail",
      "mail",
      "linkedin",
      "message",
      "travaillons ensemble",
    ],
    strongKeywords: ["mailto", "@", "ayoubsmirani", "me contacter", "contact"],
    minScore: 2,
  },
  {
    id: "projects",
    label: "Projets",
    keywords: [
      "projet",
      "projets",
      "github",
      "gitlab",
      "repo",
      "repository",
      "comparateur",
      "scraper",
      "recommender",
      "power bi",
      "android",
      "spring",
      "angular",
    ],
    strongKeywords: [
      "github",
      "gitlab",
      "repository",
      "repo",
      "comparateur",
      "scraper",
      "power bi",
      "android",
      "spring",
      "angular",
    ],
    // Avoid always routing to projects when the assistant casually says "projets".
    minScore: 3,
  },
  {
    id: "stack",
    label: "Expérience",
    keywords: [
      "experience",
      "expérience",
      "alternance",
      "stage",
      "parcours",
      "data analyst",
      "qa",
      "automation",
      "global consulting",
      "ciments de bizerte",
      "ghouyouth",
      "universite",
      "université",
      "lille",
    ],
    strongKeywords: [
      "alternance",
      "stage",
      "qa",
      "selenium",
      "testng",
      "data analyst",
      "global consulting",
      "ciments de bizerte",
    ],
    minScore: 2,
  },
  {
    id: "references",
    label: "Références",
    keywords: ["temoignages", "témoignages", "reference", "référence", "references", "références", "avis", "recommandation"],
    strongKeywords: ["temoignages", "témoignages", "références", "references"],
    minScore: 2,
  },
  {
    id: "about",
    label: "À propos",
    keywords: [
      "a propos",
      "à propos",
      "profil",
      "presentation",
      "présentation",
      "identite",
      "identité",
      "localisation",
      "villeneuve",
    ],
    strongKeywords: ["profil", "identite", "identité", "localisation"],
    minScore: 2,
  },
  {
    id: "home",
    label: "Accueil",
    keywords: ["accueil", "home", "hero"],
    minScore: 1,
  },
];

function normalizeText(value: string) {
  return (value ?? "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .replace(/\s+/g, " ")
    .trim();
}

function parseNavHint(text: string): NavHint | null {
  const raw = text ?? "";
  // We expect the nav tag at the end but tolerate anywhere.
  const match = raw.match(/\[\[NAV\s+([^\]]+)\]\]/i);
  if (!match) return null;

  const parts = match[1]
    .split(/\s+/)
    .map((p) => p.trim())
    .filter(Boolean);

  const kv: Record<string, string> = {};
  for (const part of parts) {
    const idx = part.indexOf("=");
    if (idx === -1) continue;
    const key = part.slice(0, idx).trim().toLowerCase();
    const value = part.slice(idx + 1).trim();
    if (!key || !value) continue;
    kv[key] = value;
  }

  const section = kv["section"] as NavHint["section"] | undefined;
  if (!section) return null;
  if (!SECTION_TARGETS.some((t) => t.id === section)) return null;

  const focusId = kv["focus"]?.trim();
  return { section, focusId: focusId || undefined };
}

function stripNavHintFromText(text: string): string {
  return (text ?? "")
    .replace(/\n?\[\[NAV[^\]]*\]\]\s*$/gi, "")
    .replace(/\[\[NAV[^\]]*\]\]/gi, "")
    .trimEnd();
}

function countKeywordHits(normalizedHaystack: string, keywords: string[]) {
  let score = 0;
  for (const kw of keywords) {
    const needle = normalizeText(kw);
    if (!needle) continue;
    if (normalizedHaystack.includes(needle)) score += 1;
  }
  return score;
}

function inferTargetFromExplicitAnchor(text: string): SectionTarget | null {
  const normalized = normalizeText(text);
  if (!normalized) return null;

  const match = normalized.match(/#(home|about|projects|stack|references|contact)(\b|\s|$)/);
  if (!match) return null;

  const id = match[1] as SectionTarget["id"];
  return SECTION_TARGETS.find((t) => t.id === id) ?? null;
}

function inferTargetFromText(text: string): SectionTarget | null {
  const explicit = inferTargetFromExplicitAnchor(text);
  if (explicit) return explicit;

  const normalized = normalizeText(text);
  if (!normalized) return null;

  let best: { target: SectionTarget; score: number } | null = null;
  for (const target of SECTION_TARGETS) {
    const baseScore = countKeywordHits(normalized, target.keywords);
    const strongScore = target.strongKeywords ? countKeywordHits(normalized, target.strongKeywords) : 0;

    // strong hits weigh more than generic hits
    const score = baseScore + strongScore * 3;
    const minScore = target.minScore ?? 1;

    if (score < minScore) continue;
    if (!best || score > best.score) best = { target, score };
  }

  return best?.target ?? null;
}

function navigateToSection(id: SectionTarget["id"]) {
  if (typeof window === "undefined") return;

  const el = document.getElementById(id);
  if (!el) {
    window.location.hash = id;
    return;
  }

  try {
    window.history.replaceState(null, "", `#${id}`);
  } catch {
    // ignore
  }

  el.scrollIntoView({ behavior: "smooth", block: "start" });

  // Smooth scroll + replaceState does not emit hashchange, so flash here.
  // Prefer flashing a card within the section when available.
  const flashTarget = (el.querySelector?.(".card-3d") as HTMLElement | null) ?? el;
  flashTarget.classList.remove("flash-border");
  void flashTarget.offsetWidth;
  flashTarget.classList.add("flash-border");
  window.setTimeout(() => flashTarget.classList.remove("flash-border"), 1400);
}

function scrollToElementById(elementId: string) {
  if (typeof window === "undefined") return false;
  const el = document.getElementById(elementId);
  if (!el) return false;
  el.scrollIntoView({ behavior: "smooth", block: "start" });
  return true;
}

function flashElementBorder(elementId: string, durationMs = 30_000, variant: "short" | "long" = "long") {
  if (typeof window === "undefined") return;
  const el = document.getElementById(elementId);
  if (!el) return;

  const className = variant === "long" ? "flash-border-long" : "flash-border";
  el.classList.remove("flash-border");
  el.classList.remove("flash-border-long");
  void el.offsetWidth;
  el.classList.add(className);
  window.setTimeout(() => el.classList.remove(className), Math.max(200, durationMs));
}

function navigateWithHint(hint: NavHint) {
  if (typeof window === "undefined") return;

  // Keep URL meaningful even if we scroll to a specific card.
  try {
    window.history.replaceState(null, "", `#${hint.section}`);
  } catch {
    // ignore
  }

  const focused = hint.focusId ? scrollToElementById(hint.focusId) : false;
  if (!focused) navigateToSection(hint.section);

  if (hint.focusId) {
    // Retry once: some layouts/images can delay final positioning.
    const run = () => flashElementBorder(hint.focusId!, 30_000, "long");
    window.setTimeout(run, 350);
    window.setTimeout(run, 850);
  }
}

export function AIResponse({ message }: { message: ChatMessage }) {
  const isUser = message.role === "user";
  const navHint = useMemo(() => {
    if (message.role !== "assistant") return null;
    return parseNavHint(message.content);
  }, [message.content, message.role]);

  const displayContent = useMemo(() => {
    if (message.role !== "assistant") return message.content;
    return stripNavHintFromText(message.content);
  }, [message.content, message.role]);

  const target = useMemo(() => {
    if (message.role !== "assistant") return null;
    if (navHint) {
      return SECTION_TARGETS.find((t) => t.id === navHint.section) ?? null;
    }
    return inferTargetFromText(displayContent);
  }, [displayContent, message.role, navHint]);

  if (isUser) {
    return (
      <div className="w-full flex justify-end">
        <div
          className="max-w-[680px] px-4 py-3 rounded-2xl"
          style={{
            background: "var(--accent-blue)",
            color: "white",
          }}
        >
          <p className="whitespace-pre-wrap">{message.content}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full flex justify-start">
      <div
        className="max-w-[680px] px-4 py-3 rounded-2xl border text-left"
        style={{
          background: "rgba(17, 24, 39, 0.55)",
          borderColor: "var(--border)",
          backdropFilter: "blur(18px)",
          WebkitBackdropFilter: "blur(18px)",
          color: "var(--text-secondary)",
        }}
      >
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          components={{
            p: ({ children }) => (
              <p className="whitespace-pre-line leading-relaxed text-left">{children}</p>
            ),
            a: ({ href, children }) => (
              <a
                href={href}
                target="_blank"
                rel="noreferrer"
                className="underline underline-offset-4"
                style={{ color: "var(--accent-cyan)" }}
              >
                {children}
              </a>
            ),
            code: ({ className, children }) => (
              <code
                className={className}
                style={{
                  fontFamily: "var(--font-mono)",
                  color: "var(--text-primary)",
                }}
              >
                {children}
              </code>
            ),
            pre: ({ children }) => (
              <pre
                className="overflow-x-auto rounded-xl p-4 border"
                style={{
                  background: "var(--surface)",
                  borderColor: "var(--border)",
                }}
              >
                {children}
              </pre>
            ),
            ul: ({ children }) => <ul className="list-disc pl-5 space-y-1 text-left">{children}</ul>,
            ol: ({ children }) => <ol className="list-decimal pl-5 space-y-1 text-left">{children}</ol>,
            li: ({ children }) => <li className="leading-relaxed">{children}</li>,
            strong: ({ children }) => <strong style={{ color: "var(--text-primary)" }}>{children}</strong>,
          }}
        >
          {displayContent || ""}
        </ReactMarkdown>

        {target ? (
          <div className="mt-3">
            <button
              type="button"
              className="inline-flex items-center gap-2 px-3 py-2 rounded-full border text-sm transition-colors"
              style={{
                background: "rgba(17, 24, 39, 0.35)",
                borderColor: "var(--border)",
                color: "var(--text-secondary)",
              }}
              onClick={() => (navHint ? navigateWithHint(navHint) : navigateToSection(target.id))}
            >
              Aller à {target.label}
              <span aria-hidden>→</span>
            </button>
          </div>
        ) : null}
      </div>
    </div>
  );
}
