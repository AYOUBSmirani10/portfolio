"use client";

import { motion } from "motion/react";
import { useCallback } from "react";

import { PromptInput } from "./PromptInput";
import { SuggestionPills } from "./SuggestionPills";
import { ChatContainer } from "./ChatContainer";
import { useAiChat } from "./useAiChat";

type RecruiterRole = "fullstack" | "qa" | "data" | "devops";

const RECRUITER_PILLS: Array<{ id: RecruiterRole; label: string; experienceId: string }> = [
  {
    id: "fullstack",
    label: "Full‑Stack Developer",
    experienceId: "experience-les-ciments-de-bizerte-developpeur-full-stack",
  },
  {
    id: "qa",
    label: "QA Automation",
    experienceId: "experience-ghouyouth-alhassoub-developpeur-qa-automation",
  },
  {
    id: "data",
    label: "Data Analyst",
    experienceId: "experience-global-consulting-data-analyst",
  },
  {
    id: "devops",
    label: "DevOps / Cloud",
    experienceId: "experience-universite-de-lille-master-1-informatique-parcours-e-services",
  },
];

function scrollToSection(id: string) {
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
  // Force reflow so the animation can re-trigger
  void el.offsetWidth;
  el.classList.add(className);
  window.setTimeout(() => el.classList.remove(className), Math.max(200, durationMs));
}

export function AIHero() {
  const { messages, isStreaming, error, canSend, send, clear } = useAiChat();

  const onPickRecruiterRole = useCallback((role: RecruiterRole) => {
    const pill = RECRUITER_PILLS.find((p) => p.id === role);
    if (!pill) return;

    // Keep URL meaningful even if we scroll to a specific card.
    try {
      window.history.replaceState(null, "", "#stack");
    } catch {
      // ignore
    }

    const scrolledToCard = scrollToElementById(pill.experienceId);
    if (!scrolledToCard) scrollToSection("stack");

    window.setTimeout(() => flashElementBorder(pill.experienceId, 30_000, "long"), 350);
  }, []);

  return (
    <section
      id="home"
      className="relative min-h-svh flex items-center px-4 sm:px-6 lg:px-20 pt-24 pb-16 overflow-hidden"
      style={{ maxWidth: "1440px", margin: "0 auto" }}
    >
      <div className="w-full">
        {/* Background effects (tokens only) */}
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(900px circle at 50% 18%, rgba(59,130,246,0.22) 0%, rgba(10,14,26,0) 60%), radial-gradient(700px circle at 18% 60%, rgba(6,182,212,0.14) 0%, rgba(10,14,26,0) 55%), radial-gradient(700px circle at 82% 68%, rgba(168,85,247,0.10) 0%, rgba(10,14,26,0) 55%)",
            }}
          />
          <div
            className="absolute inset-0 opacity-40"
            style={{
              backgroundImage:
                "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.06) 1px, rgba(0,0,0,0) 0)",
              backgroundSize: "24px 24px",
            }}
          />
        </div>

        <div className="flex flex-col items-center text-center gap-6">
          <div className="flex items-center gap-2 w-fit px-4 py-2 rounded-full border" style={{ background: "var(--surface)", borderColor: "var(--border)" }}>
            <div className="w-2 h-2 rounded-full animate-pulse" style={{ background: "var(--success)" }} />
            <span style={{ color: "var(--text-secondary)", fontSize: "var(--text-small)" }}>
              Assistant personnel de Ayoub
            </span>
          </div>

          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }}>
            <h1 className="mb-3" style={{ fontSize: "var(--text-display-xl)", lineHeight: "1.05" }}>
              Pose une question sur mon parcours.
            </h1>
            <p className="text-balance" style={{ fontSize: "18px", color: "var(--text-muted)", maxWidth: 820 }}>
              Full‑Stack · QA Automation · DevOps · Data/IA — réponses basées sur mes expériences, projets et compétences.
            </p>
          </motion.div>

          <div className="w-full max-w-[920px] flex flex-col gap-5">
            <div className="flex flex-col items-center gap-2">
              <div style={{ color: "var(--text-muted)", fontSize: "var(--text-small)" }}>Je recrute pour :</div>
              <div className="flex flex-wrap justify-center gap-2">
                {RECRUITER_PILLS.map((p) => (
                  <motion.button
                    key={p.id}
                    type="button"
                    disabled={isStreaming}
                    whileHover={isStreaming ? undefined : { y: -2 }}
                    whileTap={isStreaming ? undefined : { scale: 0.98 }}
                    className="px-3 py-1.5 rounded-full border transition-colors"
                    style={{
                      background: "rgba(17, 24, 39, 0.35)",
                      borderColor: "var(--border)",
                      color: "var(--text-secondary)",
                      backdropFilter: "blur(14px)",
                      WebkitBackdropFilter: "blur(14px)",
                      fontSize: "var(--text-small)",
                    }}
                    onClick={() => onPickRecruiterRole(p.id)}
                  >
                    {p.label}
                  </motion.button>
                ))}
              </div>
            </div>

            <PromptInput disabled={!canSend} onSubmit={send} />

            <div className="flex items-center justify-center gap-3">
              <button
                type="button"
                className="px-4 py-2 rounded-full border transition-colors"
                style={{
                  background: "rgba(17, 24, 39, 0.35)",
                  borderColor: "var(--border)",
                  color: "var(--text-secondary)",
                }}
                onClick={clear}
                disabled={isStreaming || messages.length === 0}
              >
                Effacer l’historique
              </button>
            </div>

            <SuggestionPills disabled={!canSend} onPick={send} />

            <ChatContainer messages={messages} isStreaming={isStreaming} error={error} />
          </div>
        </div>
      </div>
    </section>
  );
}
