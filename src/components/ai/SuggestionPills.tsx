"use client";

import { motion } from "motion/react";

const defaultSuggestions = [
  "Parle-moi de ses projets QA",
  "Quels outils maîtrise-t-il ?",
  "Pourquoi le QA automation ?",
  "Quels sont ses projets les plus complexes ?",
  "A-t-il une expérience DevOps ?",
  "Quels frameworks frontend utilise-t-il ?",
  "Comment travaille-t-il en équipe ?",
  "Quels sont ses points forts ?",
];

export function SuggestionPills({
  suggestions = defaultSuggestions,
  disabled,
  onPick,
}: {
  suggestions?: string[];
  disabled?: boolean;
  onPick: (text: string) => void;
}) {
  return (
    <div className="flex flex-wrap justify-center gap-2">
      {suggestions.map((s) => (
        <motion.button
          key={s}
          type="button"
          disabled={disabled}
          whileHover={disabled ? undefined : { y: -2 }}
          whileTap={disabled ? undefined : { scale: 0.98 }}
          className="px-3 py-1.5 rounded-full border transition-colors"
          style={{
            background: "rgba(17, 24, 39, 0.35)",
            borderColor: "var(--border)",
            color: "var(--text-secondary)",
            backdropFilter: "blur(14px)",
            WebkitBackdropFilter: "blur(14px)",
            fontSize: "var(--text-small)",
          }}
          onClick={() => onPick(s)}
        >
          {s}
        </motion.button>
      ))}
    </div>
  );
}
