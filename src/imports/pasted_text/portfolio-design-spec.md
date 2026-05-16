
— PROMPT FIGMA AI — PORTFOLIO IT —

Design a complete, modern, high-end IT portfolio website in Figma. The portfolio is for a senior full-stack developer / software engineer.



──────────────────────────────────────
VISUAL IDENTITY & STYLE
──────────────────────────────────────
- Dark mode first. Background: deep dark navy #0A0E1A, surface cards at #111827.
- Accent color: electric blue #3B82F6 with neon-like glow effect on hover states.
- Secondary accent: soft cyan #06B6D4 for highlights and gradient text.
- Typography: "Inter" for body (weight 400/500), "Space Grotesk" for headings (weight 700), "JetBrains Mono" for code snippets and technical labels.
- Clean, minimal grid layout. 12-column grid, 80px horizontal margins on desktop, 24px on mobile.
- Motion design intent: subtle fade-in on scroll, parallax hero, micro-animations on CTAs.

──────────────────────────────────────
LAYOUT — PAGE SECTIONS (in order)
──────────────────────────────────────
1. NAVBAR (sticky, glassmorphism)
- Logo left: initials monogram in a rounded square badge (accent blue).
- Nav links center: Home, About, Projects, Stack, Contact.
- Right: "Hire me" CTA button — solid blue, rounded pill, subtle glow.
- Background: blurred dark glass effect (backdrop-filter: blur 20px, background rgba dark 70%).
- On scroll: border bottom appears.

2. HERO SECTION (full viewport height)
- Left column: 
  - Small label badge: "Available for work" with a pulsing green dot.
  - Main headline (H1): "Building robust digital products." — large, bold, white.
  - Sub-headline: "Full-Stack Engineer · 6+ years · Open to remote & freelance."
  - Two CTA buttons side by side: "View my work" (filled blue) and "Download CV" (outlined white).
  - Social icons row below: GitHub, LinkedIn, Twitter — minimal, white, 20px.
- Right column:
  - Floating code window mockup (VS Code style, dark theme) showing a short elegant TypeScript code snippet. Window has traffic light buttons (red/yellow/green), a filename tab, syntax highlighting in blue/cyan/green.
  - Behind it: abstract glowing mesh/grid pattern using accent colors.
  - Subtle floating tech badges (React, Node.js, Docker, PostgreSQL) orbiting around the window.

3. TECH STACK MARQUEE (full width, auto-scroll)
- Single horizontal scrolling row of tech logos with names below.
- Logos: React, TypeScript, Node.js, Next.js, Python, Docker, Kubernetes, PostgreSQL, AWS, Figma, GraphQL, Redis.
- Grayscale by default, color on hover.
- Gradient fade on left and right edges.

4. ABOUT SECTION
- Left: professional developer photo in a rounded card frame, with a thin neon blue border glow.
  Below photo: a mini stat row (3 metrics side by side): "6+ Years exp." · "30+ Projects" · "15+ Clients".
- Right: 
  - Section label: "About me" in accent blue, small caps, letter-spaced.
  - H2 heading: "Passionate about clean code & great UX."
  - 2–3 short paragraphs of body text (placeholder Lorem Ipsum but IT-themed).
  - A row of 4 soft-card skill categories (Frontend, Backend, DevOps, Architecture) each with a relevant icon and 3 bullet skills.

5. FEATURED PROJECTS (3 cards)
- Section heading + "See all projects →" link on same row.
- 3 large project cards in a row (desktop), stacked on mobile:
  - Card structure: full-width project screenshot/mockup image at top (dark frame, browser mockup).
  - Below image: project name (H3), short 1-line description, tech stack tags (pill badges in dark).
  - Two small icon links bottom right: GitHub icon + external link icon.
  - Hover: card lifts with box-shadow + image scales up slightly.
  - Each card has a top colored accent line (3px): card 1 = blue, card 2 = cyan, card 3 = purple.

6. EXPERIENCE TIMELINE
- Vertical timeline, centered vertical line in accent blue.
- 3–4 entries, alternating left/right on desktop, all left on mobile.
- Each entry: company logo circle, company name + role in bold, date range, short description, tech tags.
- Current role has a "Present" badge in glowing green.

7. TESTIMONIALS (2 cards)
- Subtitle: "What people say"
- 2 side-by-side glass-morphism cards, each with: large quote icon, testimonial text, avatar + name + role below.

8. CONTACT SECTION
- Left: headline "Let's work together.", subtitle, direct email address (monospace font), social links.
- Right: minimal contact form with fields: Name, Email, Message textarea, Send button.
- Form fields: dark fill #1A2035, light border, blue focus ring, rounded corners 8px.

9. FOOTER
- One row: logo left, nav links center, "Designed & built by [Name] © 2025" right.
- Very subtle top border. Background same as main surface.

──────────────────────────────────────
DESIGN SYSTEM TO DEFINE
──────────────────────────────────────
- Color styles: Background Primary, Surface, Surface Elevated, Accent Blue, Accent Cyan, Accent Purple, Text Primary, Text Secondary, Text Muted, Border, Error, Success.
- Text styles: Display XL (56px/700), H1 (40px/700), H2 (32px/700), H3 (24px/600), Body (16px/400), Small (14px/400), Mono (14px/400).
- Component library: Button (Primary / Secondary / Ghost / Icon), Badge/Tag, Card, Input, Textarea, Avatar, Icon Button, Nav Link, Divider.
- Spacing scale: 4 / 8 / 12 / 16 / 24 / 32 / 48 / 64 / 80 / 96px.
- Border radius: xs=4px, sm=8px, md=12px, lg=16px, xl=24px, full=9999px.
- Shadow scale: sm, md, lg, glow-blue (0 0 20px rgba(59,130,246,0.4)).

──────────────────────────────────────
RESPONSIVE BREAKPOINTS
──────────────────────────────────────
- Desktop: 1440px (primary design frame)
- Tablet: 768px (adapted layout, 2-column grids)
- Mobile: 375px (single column, hamburger nav)

──────────────────────────────────────
DELIVERABLE STRUCTURE IN FIGMA
──────────────────────────────────────
- Page 1: Desktop — full scrollable page
- Page 2: Mobile — full scrollable page
- Page 3: Design System / Component Library
- Use Auto Layout throughout.
- All components as Figma components with variants (default, hover, active, disabled).
- All colors and text as named styles.
