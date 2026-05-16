export function Projects() {
  const comparateurImageUrl = new URL('../../../assets/com.png', import.meta.url).href;
  const crudImageUrl = new URL('../../../assets/crud S.png', import.meta.url).href;
  const systemImageUrl = new URL('../../../assets/sys.png', import.meta.url).href;
  const patrimoineImageUrl = new URL('../../../assets/MonumentDetails.png', import.meta.url).href;
  const experienceImageUrl = new URL('../../../assets/experience.png', import.meta.url).href;
  const visualisationImageUrl = new URL('../../../assets/Visuation.png', import.meta.url).href;
  const clavierImageUrl = new URL('../../../assets/clavier.png', import.meta.url).href;

  const projects = [
    {
      name: 'Comparateur de prix',
      technology: ['Angular', 'Spring Boot', 'MySQL'],
      description:
        "Application web qui permet de comparer les prix de produits issus de différents détaillants en ligne. Recherche par produit, affichage des résultats et récupération des informations tarifaires les plus récentes. (Données non fournies : données d’entreprise privées/confidentielles.)",
      imageUrl: comparateurImageUrl,
      repoUrl: 'https://github.com/AyoubSmirani7080?tab=repositories',
    },
    {
      name: 'Spring MVC CRUD',
      technology: ['Spring MVC'],
      description:
        "Application web complète développée avec Spring MVC, offrant une fonctionnalité CRUD (Create, Read, Update, Delete) pour gérer les données de manière simple et efficace.",
      imageUrl: crudImageUrl,
      repoUrl: 'https://github.com/AyoubSmirani7080?tab=repositories',
    },
    {
      name: 'Système de gestion des congés et des formations',
      technology: ['Angular 10', 'Node.js', 'Express', 'MySQL'],
      description:
        "Solution RH pour gérer les congés et les formations : suivi des demandes, gestion des employés et attribution des formations. Conçue pour rationaliser les processus et améliorer la visibilité opérationnelle. (Données non fournies : données d’entreprise privées/confidentielles.)",
      hideImage: true,
      repoUrl: 'https://github.com/AyoubSmirani7080?tab=repositories',
    },
    {
      name: 'Manufacturing Analysis (Power BI)',
      technology: ['Power BI', 'Power Query'],
      description:
        "Analyse de données industrielles avec Power Query et Power BI : intégration, transformation, modélisation et dashboards KPI interactifs (avec rafraîchissement automatisé).",
      imageUrl: 'https://raw.githubusercontent.com/AyoubSmirani7080/Manufacture-Analysis/main/example.png',
      repoUrl: 'https://github.com/AyoubSmirani7080/Manufacture-Analysis',
    },
    {
      name: 'Football Match Scraper (FlashScore)',
      technology: ['Python', 'Selenium', 'Requests', 'Pandas'],
      description:
        "Scraper qui récupère les matchs d’une date donnée depuis FlashScore (équipes, horaires, scores, logos) et exporte les résultats en CSV.",
      imageUrl: 'https://raw.githubusercontent.com/AyoubSmirani7080/FalshScore-Football-Match-Scraper/main/Output.png',
      repoUrl: 'https://github.com/AyoubSmirani7080/FalshScore-Football-Match-Scraper',
    },
    {
      name: 'IMDb Insightful Recommender',
      technology: ['Python', 'BeautifulSoup', 'scikit-learn', 'Tkinter'],
      description:
        "Système de recommandation de films (content-based) : scraping IMDb, préparation des données, vectorisation TF‑IDF et recommandations via similarité cosinus, avec une interface graphique Tkinter.",
      imageUrl: 'https://raw.githubusercontent.com/AyoubSmirani7080/IMDbInsightful-Recommender/main/Example.png',
      repoUrl: 'https://github.com/AyoubSmirani7080/IMDbInsightful-Recommender',
    },
    {
      name: 'Expérience IIHM : techniques de pointage',
      tag: 'Académique',
      technology: ['Python', 'PyQt5', 'R (R Markdown)'],
      description:
        "Expérience contrôlée IIHM comparant plusieurs techniques de pointage (Normal Cursor, Bubble Cursor, Rope) selon la densité et la taille des cibles, avec collecte de logs et analyse statistique/visualisation des résultats.",
      imageUrl: experienceImageUrl,
      repoUrl: 'https://gitlab.univ-lille.fr/ayoub.smirani.etu/tp1_iihm',
    },
    {
      name: 'DataViz IIHM : villes françaises (Processing)',
      tag: 'Académique',
      technology: ['Processing (Java)', 'Data visualisation'],
      description:
        "Visualisation cartographique de villes françaises avec marques visuelles (cercles) encodant population, densité, altitude et surface, et des interactions (vue distribution, variantes d’affichage).",
      imageUrl: visualisationImageUrl,
      repoUrl: 'https://gitlab.univ-lille.fr/ayoub.smirani.etu/tp3_iihm',
    },
    {
      name: 'Entrée de texte : clavier & dictionnaire',
      tag: 'Académique',
      technology: ['Python'],
      description:
        "Prototype autour des techniques d’entrée de texte : clavier/éditeur, gestion d’un dictionnaire et module de reconnaissance, avec configuration de layout et ressources associées.",
      imageUrl: clavierImageUrl,
      repoUrl: 'https://gitlab.univ-lille.fr/ayoub.smirani.etu/tp_technique_entree_de_texte',
    },
    {
      name: 'Patrimoine francilien à découvrir (app)',
      tag: 'Académique',
      technology: ['Android', 'Room', 'Retrofit'],
      description:
        "Application mobile avec gestion de favoris (Room), consommation d’un service distant (Retrofit) et modes d’affichage liste/grille.",
      imageUrl: patrimoineImageUrl,
      repoUrl: 'https://gitlab.univ-lille.fr/ayoub.smirani.etu/projet_mobile_2025',
    },
  ];

  return (
    <section id="projects" className="py-24 px-4 sm:px-6 lg:px-20" style={{ maxWidth: '1440px', margin: '0 auto' }}>
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-12">
        <h2>Projets sélectionnés</h2>
        <a
          href="https://github.com/AyoubSmirani7080?tab=repositories"
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-2 transition-colors duration-200"
          style={{ color: 'var(--accent-blue)', fontSize: 'var(--text-body)', fontWeight: 'var(--weight-medium)' }}
          onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--accent-cyan)')}
          onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--accent-blue)')}
        >
          Voir tous les projets
          <span>→</span>
        </a>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project, index) => (
          (() => {
            const repoUrl = (project as any).repoUrl as string;
            const isGitLab = repoUrl?.includes('gitlab');
            const ctaLabel = isGitLab ? 'Voir sur GitLab' : 'Voir sur GitHub';
            const imageUrl = (project as any).imageUrl as string | undefined;
            const hideImage = Boolean((project as any).hideImage) || !imageUrl;

            return (
          <div
            key={index}
            className="card-3d rounded-xl overflow-hidden transition-all duration-300 group flex flex-col"
            style={{
              background: 'var(--surface)',
              border: '1px solid var(--border)',
              borderTop: `3px solid var(--accent-blue)`,
            }}
          >
            {/* Project Image */}
            {hideImage ? (
              <div
                className="h-56"
                style={{
                  borderBottom: '1px solid var(--border)',
                  background: 'var(--surface)',
                }}
              />
            ) : (
              <div className="overflow-hidden h-56 relative" style={{ borderBottom: '1px solid var(--border)' }}>
                <div
                  className="absolute inset-0 transition-transform duration-300 group-hover:scale-[1.02]"
                  style={{
                    backgroundImage: `url(${imageUrl})`,
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: isGitLab ? 'contain' : 'cover',
                    backgroundPosition: 'center',
                    backgroundColor: 'var(--surface)',
                  }}
                />
              </div>
            )}

            {/* Project Info */}
            <div className="p-6 flex flex-col flex-1">
              <h3 style={{ marginBottom: '8px' }}>{project.name}</h3>

              {'tag' in project && project.tag ? (
                <div style={{ marginBottom: '10px' }}>
                  <span
                    className="inline-flex items-center rounded-full px-3 py-1"
                    style={{
                      fontSize: '12px',
                      border: '1px solid var(--border)',
                      color: 'var(--text-secondary)',
                      background: 'var(--surface)',
                      fontWeight: 'var(--weight-medium)',
                    }}
                  >
                    {project.tag}
                  </span>
                </div>
              ) : null}

              <p style={{ fontSize: 'var(--text-small)', color: 'var(--text-secondary)', marginBottom: '12px' }}>
                <span style={{ color: 'var(--text)', fontWeight: 'var(--weight-medium)' }}>Technologie :</span>{' '}
                {project.technology.join(', ')}
              </p>

              <p style={{ fontSize: 'var(--text-small)', color: 'var(--text-muted)' }}>{project.description}</p>

              <div className="mt-6 pt-2" style={{ marginTop: 'auto' }}>
                <a
                  href={repoUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center w-full rounded-lg px-5 py-3 transition-colors duration-200"
                  style={{
                    background: 'var(--accent-blue)',
                    color: 'white',
                    fontSize: 'var(--text-small)',
                    fontWeight: 'var(--weight-medium)',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--accent-cyan)')}
                  onMouseLeave={(e) => (e.currentTarget.style.background = 'var(--accent-blue)')}
                >
                  {ctaLabel}
                </a>
              </div>
            </div>
          </div>
            );
          })()
        ))}
      </div>
    </section>
  );
}
