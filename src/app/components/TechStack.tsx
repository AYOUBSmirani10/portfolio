export function TechStack() {
  const technologies = [
    'Python',
    'JavaScript',
    'Java',
    'Kotlin',
    'Node.js',
    'PostgreSQL',
    'MySQL',
    'MongoDB',
    'Docker',
    'Kubernetes',
    'Selenium',
    'Git',
  ];

  return (
    <section className="py-16 overflow-hidden relative">
      {/* Gradient Fade Left */}
      <div
        className="absolute left-0 top-0 bottom-0 w-16 sm:w-32 z-10 pointer-events-none"
        style={{
          background: 'linear-gradient(to right, var(--bg-primary), transparent)',
        }}
      ></div>

      {/* Gradient Fade Right */}
      <div
        className="absolute right-0 top-0 bottom-0 w-16 sm:w-32 z-10 pointer-events-none"
        style={{
          background: 'linear-gradient(to left, var(--bg-primary), transparent)',
        }}
      ></div>

      {/* Scrolling Container */}
      <div className="flex gap-8 sm:gap-12 animate-scroll">
        {[...technologies, ...technologies].map((tech, index) => (
          <div
            key={index}
            className="flex flex-col items-center gap-3 min-w-[96px] sm:min-w-[120px] transition-all duration-300 group cursor-pointer"
          >
            <div
              className="w-16 h-16 rounded-xl flex items-center justify-center transition-all duration-300"
              style={{
                background: 'var(--surface)',
                border: '1px solid var(--border)',
              }}
            >
              <span
                className="transition-all duration-300"
                style={{
                  fontSize: '24px',
                  filter: 'grayscale(1)',
                  fontWeight: 'var(--weight-bold)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.filter = 'grayscale(0)';
                  e.currentTarget.style.color = 'var(--accent-blue)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.filter = 'grayscale(1)';
                  e.currentTarget.style.color = 'inherit';
                }}
              >
                {tech.charAt(0)}
              </span>
            </div>
            <span
              style={{
                color: 'var(--text-muted)',
                fontSize: 'var(--text-small)',
                fontWeight: 'var(--weight-medium)',
              }}
            >
              {tech}
            </span>
          </div>
        ))}
      </div>

      <style>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-scroll {
          animation: scroll 30s linear infinite;
        }
        .animate-scroll:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
}
