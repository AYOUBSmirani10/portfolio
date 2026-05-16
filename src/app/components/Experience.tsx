export function Experience() {
  const toDomId = (value: string) =>
    (value ?? "")
      .toLowerCase()
      .normalize("NFD")
      .replace(/\p{Diacritic}/gu, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "")
      .trim();

  const experiences = [
    {
      company: 'Global Consulting',
      role: 'Data Analyst',
      period: '05/2024 - 07/2024',
      descriptionPoints: [
        'Automatisation de pipelines de traitement de données (performance et optimisation)',
        'Manipulation de bases de données SQL (MySQL)',
        'Analyse et visualisation avec Power BI',
        'Amélioration de la scalabilité des traitements',
        'Compétences : SQL, bases de données, Power BI, Excel, ETL, Data Processing',
      ],
      tags: ['SQL', 'MySQL', 'Power BI', 'Excel', 'ETL', 'Traitement de données'],
      current: false,
    },
    {
      company: 'Les Ciments de Bizerte',
      role: 'Développeur Full-stack',
      period: '03/2022 - 07/2023',
      descriptionPoints: [
        'Développement d’une application web conviviale de gestion des congés',
        'Conception et architecture logicielle',
        'Application de méthodologies Agile et TDD',
        'Compétences : MySQL, GitHub, Angular, Node.js, front-end, conception, TDD',
      ],
      tags: ['Angular', 'Node.js', 'MySQL', 'GitHub', 'Agile', 'TDD'],
      current: false,
    },
    {
      company: 'Ghouyouth Alhassoub',
      role: 'Développeur QA Automation',
      period: '05/2022 - 08/2022',
      descriptionPoints: [
        'Développement de tests automatisés (Automation QA) avec Selenium et TestNG',
        'Mise en place d’une stratégie de validation des applications web avant déploiement',
        'Participation à l’amélioration de la qualité logicielle et de la robustesse applicative',
        'Collaboration avec les développeurs dans un environnement Agile',
        'Compétences : CSV, Selenium, TestNG, Java, QA',
      ],
      tags: ['Selenium', 'TestNG', 'Java', 'QA', 'CSV'],
      current: false,
    },
    {
      company: 'Université de Lille',
      role: 'Master 1 Informatique – parcours E-services',
      period: 'En cours',
      descriptionPoints: [
        'Master 1 Informatique (parcours E-services) à l’Université de Lille',
        'Développement de compétences en architecture logicielle, cloud et DevOps',
        'Localisation : Villeneuve-d’Ascq, France',
      ],
      tags: ['Architecture logicielle', 'Cloud', 'DevOps', 'Docker'],
      current: true,
    },
  ];

  return (
    <section id="stack" className="py-24 px-4 sm:px-6 lg:px-20" style={{ maxWidth: '1200px', margin: '0 auto' }}>
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
          Expérience
        </div>
        <h2>Parcours professionnel</h2>
      </div>

      {/* Timeline */}
      <div className="relative">
        {/* Vertical Line */}
        <div
          className="hidden md:block absolute left-1/2 top-0 bottom-0 w-0.5"
          style={{
            background: 'var(--accent-blue)',
            transform: 'translateX(-50%)',
          }}
        ></div>

        {/* Timeline Entries */}
        <div className="space-y-12">
          {experiences.map((exp, index) => (
            <div
              key={index}
              className={`flex flex-col md:flex-row items-center gap-8 ${
                index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
              }`}
            >
              {/* Content Card */}
              <div
                className={`w-full md:flex-1 flex justify-center ${
                  index % 2 === 0 ? 'md:justify-end' : 'md:justify-start'
                }`}
              >
                <div
                  id={`experience-${toDomId(exp.company)}-${toDomId(exp.role)}`}
                  data-experience-role={exp.role}
                  className="card-3d w-full md:w-auto max-w-[520px] p-6 rounded-xl transition-all duration-300"
                  style={{
                    background: 'var(--surface)',
                    border: '1px solid var(--border)',
                    scrollMarginTop: '110px',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = 'var(--accent-blue)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'var(--border)';
                  }}
                >
                  <div className="flex items-center gap-3 mb-2" style={{ justifyContent: 'flex-start' }}>
                    <h3 style={{ margin: 0, fontSize: '20px' }}>{exp.company}</h3>
                    {exp.current && (
                      <span
                        className="px-2 py-1 rounded-full animate-pulse"
                        style={{
                          background: 'var(--success)',
                          color: 'white',
                          fontSize: '11px',
                          fontWeight: 'var(--weight-bold)',
                        }}
                      >
                        En cours
                      </span>
                    )}
                  </div>
                  <div
                    style={{
                      color: 'var(--accent-blue)',
                      fontWeight: 'var(--weight-semibold)',
                      marginBottom: '8px',
                    }}
                  >
                    {exp.role}
                  </div>
                  <div
                    style={{
                      color: 'var(--text-muted)',
                      fontSize: 'var(--text-small)',
                      marginBottom: '12px',
                      fontFamily: 'var(--font-mono)',
                    }}
                  >
                    {exp.period}
                  </div>
                  <div className="space-y-1" style={{ marginBottom: '12px' }}>
                    {exp.descriptionPoints.map((point, i) => (
                      <div
                        key={i}
                        style={{
                          fontSize: 'var(--text-small)',
                          lineHeight: '1.6',
                          color: 'var(--text-secondary)',
                        }}
                      >
                        • {point}
                      </div>
                    ))}
                  </div>
                  <div className="flex flex-wrap gap-2" style={{ justifyContent: 'flex-start' }}>
                    {exp.tags.map((tag, i) => (
                      <span
                        key={i}
                        className="px-2.5 py-1 rounded"
                        style={{
                          background: 'var(--surface-elevated)',
                          color: 'var(--text-secondary)',
                          fontSize: '11px',
                          fontFamily: 'var(--font-mono)',
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Center Circle */}
              <div className="relative z-10">
                <div
                  className="w-14 h-14 md:w-16 md:h-16 rounded-full flex items-center justify-center"
                  style={{
                    background: 'var(--surface)',
                    border: '3px solid var(--accent-blue)',
                    boxShadow: 'var(--shadow-glow-blue)',
                  }}
                >
                  <div
                    className="w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center"
                    style={{
                      background: 'linear-gradient(135deg, var(--accent-blue), var(--accent-cyan))',
                      fontSize: '18px',
                      fontWeight: 'var(--weight-bold)',
                      color: 'white',
                    }}
                  >
                    {exp.company.charAt(0)}
                  </div>
                </div>
              </div>

              {/* Empty Space for Alternating Layout */}
              <div className="hidden md:block md:flex-1"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
