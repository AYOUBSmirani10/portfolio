import { useState, useEffect } from 'react';

export function Navbar() {
  const navItems = [
    { label: 'Accueil', href: '#home' },
    { label: 'À propos', href: '#about' },
    { label: 'Projets', href: '#projects' },
    { label: 'Expérience', href: '#stack' },
    { label: 'Références', href: '#references' },
    { label: 'Contact', href: '#contact' },
  ];

  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'border-b border-[var(--border)]' : ''
      }`}
      style={{
        background: 'rgba(10, 14, 26, 0.7)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
      }}
    >
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-20 py-4 flex flex-wrap md:flex-nowrap items-center justify-between gap-3">
        {/* Logo */}
        <a
          href="#home"
          className="flex items-center justify-center w-10 h-10 rounded-lg font-bold"
          style={{
            background: 'var(--accent-blue)',
            color: 'white',
            fontFamily: 'var(--font-heading)',
            textDecoration: 'none',
          }}
        >
          AS
        </a>

        {/* Nav Links */}
        <div className="basis-full md:basis-auto md:flex-1 flex justify-center order-3 md:order-none">
          <div className="flex flex-wrap justify-center gap-x-4 gap-y-2 md:flex-nowrap md:gap-6 lg:gap-8 px-2">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="transition-colors duration-200"
              style={{
                color: 'var(--text-secondary)',
                fontFamily: 'var(--font-body)',
                fontWeight: 'var(--weight-medium)',
                fontSize: '14px',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--text-primary)')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-secondary)')}
            >
              {item.label}
            </a>
          ))}
          </div>
        </div>

        {/* CTA Button */}
        <a
          href="#contact"
          className="px-4 py-2 sm:px-6 sm:py-3 text-sm sm:text-base transition-all duration-300"
          style={{
            background: 'var(--accent-blue)',
            color: 'white',
            borderRadius: 'var(--radius-full)',
            fontFamily: 'var(--font-body)',
            fontWeight: 'var(--weight-medium)',
            boxShadow: '0 0 0 rgba(59, 130, 246, 0.4)',
            textDecoration: 'none',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.boxShadow = 'var(--shadow-glow-blue)';
            e.currentTarget.style.transform = 'translateY(-2px)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.boxShadow = '0 0 0 rgba(59, 130, 246, 0.4)';
            e.currentTarget.style.transform = 'translateY(0)';
          }}
        >
          Me contacter
        </a>
      </div>
    </nav>
  );
}
