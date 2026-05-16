import type { Metadata } from "next";

import "../styles/index.css";

export const metadata: Metadata = {
  title: "Ayoub Smirani — Portfolio",
  description: "Développeur Full-stack & QA Automation — Portfolio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  );
}
