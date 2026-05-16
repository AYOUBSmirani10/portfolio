import { Code, Database, Server, Boxes } from 'lucide-react';

export function About() {
  const stats = [
    { label: '2+ ans', sublabel: 'Expérience professionnelle' },
    { label: '10 projets', sublabel: 'Réalisés' },
    { label: '2 langues', sublabel: 'Maîtrisées' },
  ];

  const skills = [
    {
      title: 'Langages',
      icon: Code,
      items: ['Python', 'JavaScript', 'Java', 'Kotlin'],
    },
    {
      title: 'Back-end',
      icon: Server,
      items: ['Node.js', 'Web Services', 'SQL', 'NoSQL'],
    },
    {
      title: 'DevOps',
      icon: Database,
      items: ['Docker', 'Kubernetes', 'CI/CD', 'Linux'],
    },
    {
      title: 'QA & Tests',
      icon: Boxes,
      items: ['Selenium', 'TestNG', 'Test Automation', 'TDD'],
    },
  ];

  return (
    <section id="about" className="py-24 px-4 sm:px-6 lg:px-20" style={{ maxWidth: '1440px', margin: '0 auto' }}>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
        {/* Left Column - Photo & Stats */}
        <div className="flex flex-col gap-8">
          {/* Developer Photo */}
          <div
            className="rounded-2xl overflow-hidden relative w-full max-w-[420px] mx-auto lg:mx-0"
            style={{
              border: '2px solid var(--accent-blue)',
              boxShadow: 'var(--shadow-glow-blue)',
              aspectRatio: '1/1',
              background: 'linear-gradient(135deg, var(--accent-blue) 0%, var(--accent-cyan) 100%)',
            }}
          >
            <div
              className="w-full h-full flex items-center justify-center"
              style={{
                fontSize: '120px',
                color: 'white',
                fontFamily: 'var(--font-heading)',
              }}
            >
              AS
            </div>
          </div>

          {/* Stats Row */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="p-4 rounded-lg text-center"
                style={{
                  background: 'var(--surface)',
                  border: '1px solid var(--border)',
                }}
              >
                <div
                  style={{
                    fontSize: '18px',
                    fontWeight: 'var(--weight-bold)',
                    color: 'var(--accent-blue)',
                    marginBottom: '4px',
                  }}
                >
                  {stat.label}
                </div>
                <div style={{ fontSize: 'var(--text-small)', color: 'var(--text-muted)' }}>
                  {stat.sublabel}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column - About Text & Skills */}
        <div className="flex flex-col gap-8">
          {/* Section Label */}
          <div
            style={{
              color: 'var(--accent-blue)',
              fontSize: 'var(--text-small)',
              fontWeight: 'var(--weight-bold)',
              letterSpacing: '2px',
              textTransform: 'uppercase',
            }}
          >
            À propos
          </div>

          {/* Heading */}
          <h2 style={{ marginTop: '-16px' }}>Étudiant en Master, spécialisé en QA et développement Full-Stack.</h2>

          {/* Body Text */}
          <div className="flex flex-col gap-4">
            <p>
              Je suis ingénieur logiciel et je poursuis actuellement un Master en Informatique à l’Université de Lille. Avec plus de 2 ans d’expérience professionnelle, je me spécialise en QA automation, développement back-end et applications web full-stack.
            </p>
            <p>
              Mes compétences couvrent Python, JavaScript, Java ainsi que des frameworks de test comme Selenium et TestNG. Je suis passionné par la qualité logicielle, l’automatisation et la création de systèmes robustes avec Docker, Kubernetes et CI/CD.
            </p>
            <p>
              Basé à Villeneuve-d’Ascq (France), je parle français et anglais. J’accorde une grande importance à l’apprentissage continu et à l’application des bonnes pratiques (TDD, DevOps).
            </p>
          </div>

          {/* Skills Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
            {skills.map((skill, index) => (
              <div
                key={index}
                className="card-3d p-5 rounded-xl transition-all duration-300"
                style={{
                  background: 'var(--surface)',
                  border: '1px solid var(--border)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'var(--accent-blue)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'var(--border)';
                }}
              >
                <div className="flex items-center gap-3 mb-3">
                  <skill.icon size={20} style={{ color: 'var(--accent-blue)' }} />
                  <h3
                    style={{
                      fontSize: '18px',
                      fontWeight: 'var(--weight-semibold)',
                      margin: 0,
                    }}
                  >
                    {skill.title}
                  </h3>
                </div>
                <ul className="space-y-1 list-none pl-0">
                  {skill.items.map((item, i) => (
                    <li
                      key={i}
                      style={{
                        fontSize: 'var(--text-small)',
                        color: 'var(--text-secondary)',
                        paddingLeft: '0',
                      }}
                    >
                      • {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
