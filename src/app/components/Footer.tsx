export function Footer() {
  const navItems = [
    { label: 'Accueil', href: '#home' },
    { label: 'À propos', href: '#about' },
    { label: 'Projets', href: '#projects' },
    { label: 'Expérience', href: '#stack' },
    { label: 'Contact', href: '#contact' },
  ];

  const currentYear = new Date().getFullYear();

  return (
    <footer
      className="py-8 px-4 sm:px-6 lg:px-20"
      style={{
        borderTop: '1px solid var(--border)',
        background: 'var(--surface)',
      }}
    >
      <div className="max-w-[1440px] mx-auto flex flex-col md:flex-row items-center md:justify-between gap-4">
        {/* Logo */}
        <div
          className="flex items-center justify-center w-10 h-10 rounded-lg font-bold"
          style={{
            background: 'var(--accent-blue)',
            color: 'white',
            fontFamily: 'var(--font-heading)',
          }}
        >
          AS
        </div>

        {/* Nav Links */}
        <div className="flex flex-wrap justify-center gap-4 md:gap-8">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="transition-colors duration-200"
              style={{
                color: 'var(--text-muted)',
                fontSize: 'var(--text-small)',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--text-primary)')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-muted)')}
            >
              {item.label}
            </a>
          ))}
        </div>

        {/* Copyright */}
        <div
          style={{
            color: 'var(--text-muted)',
            fontSize: 'var(--text-small)',
          }}
        >
          Conçu et réalisé par Ayoub Smirani © {currentYear}
        </div>
      </div>
    </footer>
  );
}
