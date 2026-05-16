"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion } from "motion/react";

export function PromptInput({
  disabled,
  onSubmit,
  initialValue = "",
}: {
  disabled?: boolean;
  initialValue?: string;
  onSubmit: (value: string) => void;
}) {
  const [value, setValue] = useState(initialValue);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  const autoGrow = useCallback(() => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = "0px";
    el.style.height = Math.min(el.scrollHeight, 220) + "px";
  }, []);

  useEffect(() => {
    autoGrow();
  }, [autoGrow, value]);

  const submit = useCallback(() => {
    const text = value.trim();
    if (!text) return;
    onSubmit(text);
    setValue("");
  }, [onSubmit, value]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className="w-full"
    >
      <div
        className="w-full rounded-2xl border p-1"
        style={{
          borderColor: "var(--border)",
          background: "linear-gradient(135deg, rgba(59,130,246,0.20), rgba(6,182,212,0.10))",
        }}
      >
        <div
          className="rounded-2xl border"
          style={{
            borderColor: "rgba(255,255,255,0.06)",
            background: "rgba(17, 24, 39, 0.55)",
            backdropFilter: "blur(18px)",
            WebkitBackdropFilter: "blur(18px)",
          }}
        >
          <div className="flex flex-col gap-2 p-4">
            <textarea
              ref={textareaRef}
              value={value}
              onChange={(e) => setValue(e.target.value)}
              disabled={disabled}
              placeholder="Pose une question sur mon parcours, mes projets, mes compétences…"
              className="w-full resize-none outline-hidden"
              style={{
                background: "transparent",
                color: "var(--text-primary)",
                fontSize: "18px",
                lineHeight: "1.5",
                minHeight: "64px",
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  submit();
                }
              }}
            />

            <div className="flex items-center justify-between gap-3">
              <div
                className="text-xs"
                style={{ color: "var(--text-muted)", fontFamily: "var(--font-mono)" }}
              >
                Entrée: ↵ Envoyer · Shift+↵ Nouvelle ligne
              </div>

              <button
                type="button"
                disabled={disabled || !value.trim()}
                className="px-4 py-2 rounded-xl transition-all duration-300 border"
                style={{
                  background: disabled ? "rgba(59,130,246,0.15)" : "var(--accent-blue)",
                  borderColor: disabled ? "var(--border)" : "rgba(255,255,255,0.12)",
                  color: "white",
                  fontWeight: "var(--weight-medium)",
                  boxShadow: disabled ? "none" : "var(--shadow-glow-blue)",
                }}
                onClick={submit}
              >
                Envoyer
              </button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
