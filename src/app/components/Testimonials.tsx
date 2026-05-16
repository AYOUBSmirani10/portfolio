import { Quote } from 'lucide-react';

export function Testimonials() {
  const testimonials = [
    {
      quote:
        "Travailler avec Ayoub a été un vrai plaisir. Son expertise technique et sa capacité à résoudre des problèmes sont excellentes. Il a livré notre plateforme e-commerce en avance, avec une qualité remarquable.",
      name: 'Sarah Martinez',
      role: 'CTO chez Digital Commerce',
      avatar: 'SM',
    },
    {
      quote:
        "Les compétences full-stack d’Ayoub et son attention aux détails ont transformé notre dashboard analytique. Sa capacité à traduire des besoins complexes en solutions élégantes est remarquable. Je recommande vivement !",
      name: 'Michael Chen',
      role: 'Product Manager chez DataViz Inc.',
      avatar: 'MC',
    },
  ];

  return (
    <section id="references" className="py-24 px-4 sm:px-6 lg:px-20" style={{ maxWidth: '1440px', margin: '0 auto' }}>
      {/* Section Header */}
      <div className="text-center mb-16">
        <div
          style={{
            color: 'var(--accent-blue)',
            fontSize: 'var(--text-small)',
            fontWeight: 'var(--weight-bold)',
            letterSpacing: '2px',
            textTransform: 'uppercase',
            marginBottom: '16px',
          }}
        >
          Témoignages
        </div>
        <h2>Ce que l’on dit</h2>
      </div>

      {/* Testimonials Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {testimonials.map((testimonial, index) => (
          <div
            key={index}
            className="card-3d p-6 sm:p-8 rounded-2xl transition-all duration-300"
            style={{
              background: 'rgba(17, 24, 39, 0.5)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              border: '1px solid var(--border)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = 'var(--accent-blue)';
              e.currentTarget.style.boxShadow = 'var(--shadow-glow-blue)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'var(--border)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            {/* Quote Icon */}
            <div className="mb-6">
              <Quote size={40} style={{ color: 'var(--accent-blue)', opacity: 0.3 }} />
            </div>

            {/* Testimonial Text */}
            <p
              style={{
                fontSize: '18px',
                lineHeight: '1.7',
                color: 'var(--text-secondary)',
                marginBottom: '24px',
                fontStyle: 'italic',
              }}
            >
              "{testimonial.quote}"
            </p>

            {/* Author Info */}
            <div className="flex items-center gap-4">
              <div
                className="flex items-center justify-center rounded-full"
                style={{
                  width: '56px',
                  height: '56px',
                  background: 'linear-gradient(135deg, var(--accent-blue), var(--accent-cyan))',
                  color: 'white',
                  fontWeight: 'var(--weight-bold)',
                  fontSize: '18px',
                }}
              >
                {testimonial.avatar}
              </div>
              <div>
                <div
                  style={{
                    fontWeight: 'var(--weight-bold)',
                    color: 'var(--text-primary)',
                    marginBottom: '4px',
                  }}
                >
                  {testimonial.name}
                </div>
                <div
                  style={{
                    fontSize: 'var(--text-small)',
                    color: 'var(--text-muted)',
                  }}
                >
                  {testimonial.role}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
