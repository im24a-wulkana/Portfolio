  "use client";

import Link from "next/link";
import { useState, useEffect } from "react";

const content = {
  nav: { profile: "Profile", work: "Workflow", projects: "Projects", interests: "Interests", contact: "Contact" },
  hero: {
    title: "Aaron Wulkan",
    subtitle: "Full Stack Developer | Creative Problem Solver",
  },
  profile: {
    title: "About me",
    p1: "Hey! I'm Aaron, a 17-year-old developer from Männedorf, Switzerland. I attend IMS Hottingen Zürich and I'm passionate about building cool web applications and solving problems with code.",
    p2: "I speak German (C2) and English (C1), and I'm constantly learning new technologies. When I'm not coding, I'm exploring new frameworks and experimenting with full-stack development. I love collaborating on projects and creating things that actually matter.",
  },
  work: {
    title: "Skills",
    categories: [
      {
        name: "Languages",
        items: [
          { name: "TypeScript", icon: "typescript" },
          { name: "JavaScript", icon: "javascript" },
          { name: "Python", icon: "python" },
          { name: "Java", icon: "openjdk" },
        ],
      },
      {
        name: "Frameworks",
        items: [
          { name: "Next.js", icon: "nextdotjs" },
          { name: "React", icon: "react" },
          { name: "Tailwind CSS", icon: "tailwindcss" },
          { name: "Flask", icon: "flask" },
        ],
      },
      {
        name: "Databases",
        items: [
          { name: "MySQL", icon: "mysql" },
          { name: "PostgreSQL", icon: "postgresql" },
          { name: "MongoDB", icon: "mongodb" },
        ],
      },
      {
        name: "Tools",
        items: [
          { name: "Git & GitHub", icon: "github" },
          { name: "Docker", icon: "docker" },
          { name: "Vercel", icon: "vercel" },
          { name: "Neon", icon: "neon" },
        ],
      },
      {
        name: "Certificates",
        items: ["Abacus Anwender 2026", "Hackathon 2026"],
      },
    ],
  },
  projects: {
    title: "Projects",
    intro: "Three projects that represent my current level best:",
    featured: {
      name: "Boared",
      summary:
        "Board game website with chess, nine men's morris and connect four, playable locally in multiplayer or against bots.",
      detailsHref: null,
      detailsLabel: "Open project page",
      projectHref: "https://boared-eight.vercel.app/",
      projectLabel: "Play Now",
      backendHref: "https://github.com/im24a-wulkana/Boared",
      backendLabel: "View on GitHub",
    },
    side: {
      name: "Casino Tower",
      summary: "Gambling website where you can climb different floors with online multiplayer and 19 different games.",
      detailsHref: null,
      detailsLabel: "Open project page",
      projectHref: "https://casino-tower.vercel.app/",
      projectLabel: "Play Now",
      backendHref: "https://github.com/im24a-wulkana/casino-tower",
      backendLabel: "View on GitHub",
    },
    third: {
      name: "Trackworks",
      summary: "Online multiplayer racing game where you build your own track with obstacles first and then race against friends.",
      detailsHref: null,
      detailsLabel: "Open project page",
      projectHref: "https://sensitive-reserve.669ceb1.deploio.app/",
      projectLabel: "Play Now",
      backendHref: "https://github.com/im24a-mendolag/hackathon-2026.git",
      backendLabel: "View on GitHub",
    },
  },
  contact: {
    title: "Contact",
    text: "If you want to discuss a school project or small idea, feel free to send a quick email.",
    copyAction: "Copy",
    copied: "Copied!",
    copyFailed: "Copy failed",
  },
  footer: "Aaron Wulkan",
};

const storePieces = [
  {
    file: "glitter-jeans.jpg",
    label: 'Dior Homme AW05 "In The Morning" Glitter Jeans',
    href: "https://www.instagram.com/p/DZ0fX5LiCCK/",
  },
  {
    file: "leopard-jacket.jpg",
    label: 'Saint Laurent SS16 "Surf Sound" Leopard Contrast Panel Leather Jacket',
    href: "https://www.instagram.com/p/DbL1xFVCFkl/",
  },
  {
    file: "suede-boots.jpg",
    label: 'Dior AW07 "Navigate" Dark Brown Suede Boots',
    href: "https://www.instagram.com/p/DaN84OQCJih/",
  },
];

export default function Home() {
  const [isCopyMenuOpen, setIsCopyMenuOpen] = useState(false);
  const [copyFeedback, setCopyFeedback] = useState("");
  const [lolStats, setLolStats] = useState(null);
  const [lolLoading, setLolLoading] = useState(true);
  const [musicStats, setMusicStats] = useState(null);
  const [musicLoading, setMusicLoading] = useState(true);
  const t = content;
  const currentYear = new Date().getFullYear();
  const emailAddress = "aaronwulkan.dev@gmail.com";

  useEffect(() => {
    const fetchLolStats = async () => {
      try {
        const res = await fetch("/api/lol-stats");
        const data = await res.json();
        setLolStats(data);
      } catch (error) {
        console.error("Error:", error);
        setLolStats({ error: true });
      } finally {
        setLolLoading(false);
      }
    };

    fetchLolStats();
  }, []);

  useEffect(() => {
    const fetchMusicStats = async () => {
      try {
        const res = await fetch("/api/music-stats");
        const data = await res.json();
        setMusicStats(data);
      } catch (error) {
        console.error("Error:", error);
        setMusicStats({ error: true });
      } finally {
        setMusicLoading(false);
      }
    };

    fetchMusicStats();
  }, []);

  async function handleCopyEmail() {
    try {
      await navigator.clipboard.writeText(emailAddress);
      setCopyFeedback(t.contact.copied);
      setIsCopyMenuOpen(false);
    } catch {
      setCopyFeedback(t.contact.copyFailed);
    }

    setTimeout(() => setCopyFeedback(""), 1800);
  }

  return (
    <>
      {/* Semantic top navigation for clearer hierarchy */}
      <header className="site-header">
        <nav aria-label="Primary">
          <div className="container nav-inner">
            <ul>
              <li><a href="#profile">{t.nav.profile}</a></li>
              <li><a href="#workflow">{t.nav.work}</a></li>
              <li><a href="#projects">{t.nav.projects}</a></li>
              <li><a href="#interests">{t.nav.interests}</a></li>
              <li><a href="#contact">{t.nav.contact}</a></li>
            </ul>
          </div>
        </nav>
      </header>

      <main>
        <section className="hero" aria-labelledby="hero-title">
          <div className="container section-grid">
            <div className="hero-content">
              <h1 id="hero-title">{t.hero.title}</h1>
              <p className="hero-subtitle">{t.hero.subtitle}</p>
            </div>
          </div>
        </section>

        <section id="profile" aria-labelledby="profile-title">
          <div className="container section-grid">
            <div className="section-header">
              <h2 id="profile-title">{t.profile.title}</h2>
            </div>
            <article className="surface text-block">
              <p>{t.profile.p1}</p>
              <p>{t.profile.p2}</p>
            </article>
          </div>
        </section>

        <section id="workflow" aria-labelledby="work-title">
          <div className="container section-grid">
            <div className="section-header">
              <h2 id="work-title">{t.work.title}</h2>
            </div>
            <div className="skills-categories">
              {t.work.categories.map((category) => (
                <div key={category.name} className="skill-category">
                  <h3>{category.name}</h3>
                  <div className="skill-tags">
                    {category.items.map((item) => {
                      const itemName = typeof item === 'string' ? item : item.name;
                      const itemIcon = typeof item === 'string' ? null : item.icon;
                      const isJava = itemIcon === 'openjdk';
                      return (
                        <span key={itemName} className="skill-tag">
                          {itemIcon && !isJava && (
                            <img
                              src={`https://cdn.simpleicons.org/${itemIcon}/4A90E2`}
                              alt={itemName}
                              className="skill-icon"
                            />
                          )}
                          {itemName}
                        </span>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="projects" aria-labelledby="projects-title">
          <div className="container section-grid">
            <div className="section-header">
              <h2 id="projects-title">{t.projects.title}</h2>
              <p className="section-intro">{t.projects.intro}</p>
            </div>

            <div className="work-list">
              <article className="surface">
                <h3>{t.projects.side.name}</h3>
                <p>{t.projects.side.summary}</p>
                <div className="project-actions">
                  {t.projects.side.detailsHref && (
                    <Link href={t.projects.side.detailsHref} className="project-link">
                      {t.projects.side.detailsLabel}
                    </Link>
                  )}
                  <a href={t.projects.side.projectHref} target="_blank" rel="noopener noreferrer" className="project-link">
                    {t.projects.side.projectLabel}
                  </a>
                  {t.projects.side.backendHref && (
                    <a href={t.projects.side.backendHref} target="_blank" rel="noopener noreferrer" className="project-link">
                      {t.projects.side.backendLabel}
                    </a>
                  )}
                </div>
              </article>
              <article className="surface">
                <h3>{t.projects.third.name}</h3>
                <p>{t.projects.third.summary}</p>
                <div className="project-actions">
                  {t.projects.third.detailsHref && (
                    <Link href={t.projects.third.detailsHref} className="project-link">
                      {t.projects.third.detailsLabel}
                    </Link>
                  )}
                  <a href={t.projects.third.projectHref} target="_blank" rel="noopener noreferrer" className="project-link">
                    {t.projects.third.projectLabel}
                  </a>
                  {t.projects.third.backendHref && (
                    <a href={t.projects.third.backendHref} target="_blank" rel="noopener noreferrer" className="project-link">
                      {t.projects.third.backendLabel}
                    </a>
                  )}
                </div>
              </article>
              <article className="surface">
                <h3>{t.projects.featured.name}</h3>
                <p>{t.projects.featured.summary}</p>
                <div className="project-actions">
                  {t.projects.featured.detailsHref && (
                    <Link href={t.projects.featured.detailsHref} className="project-link">
                      {t.projects.featured.detailsLabel}
                    </Link>
                  )}
                  <a href={t.projects.featured.projectHref} target="_blank" rel="noopener noreferrer" className="project-link">
                    {t.projects.featured.projectLabel}
                  </a>
                  {t.projects.featured.backendHref && (
                    <a href={t.projects.featured.backendHref} target="_blank" rel="noopener noreferrer" className="project-link">
                      {t.projects.featured.backendLabel}
                    </a>
                  )}
                </div>
              </article>
              <article className="surface">
                <h3>Portfolio</h3>
                <p>Personal portfolio with projects and their GitHub repos, contact details and more.</p>
                <div className="project-actions">
                  <a href="https://github.com/im24a-wulkana/Portfolio" target="_blank" rel="noopener noreferrer" className="project-link">
                    View on GitHub
                  </a>
                </div>
              </article>
            </div>
          </div>
        </section>

        <section id="interests" aria-labelledby="interests-title">
          <div className="container section-grid">
            <div className="section-header">
              <h2 id="interests-title">Interests</h2>
            </div>
            <div className="interests-grid">
              <article>
                <h3>Music</h3>
                {musicLoading ? (
                  <p>Loading stats...</p>
                ) : musicStats?.error ? (
                  <p>Unable to load stats</p>
                ) : (
                  <div className="music-stats">
                    <div className="music-column">
                      <span className="lol-stat-label">Top artists · 7 days</span>
                      <ol className="music-list">
                        {musicStats?.topArtists?.map((artist) => (
                          <li key={artist.name}>
                            <span className="music-name">{artist.name}</span>
                            <span className="music-plays">{artist.plays} plays</span>
                          </li>
                        ))}
                      </ol>
                    </div>
                    <div className="music-column">
                      <span className="lol-stat-label">Top tracks · 7 days</span>
                      <ol className="music-list">
                        {musicStats?.topTracks?.map((track) => (
                          <li key={`${track.artist}-${track.name}`}>
                            {track.image && (
                              <img src={track.image} alt="" className="music-art" />
                            )}
                            <span className="music-name">{track.name}</span>
                            <span className="music-plays">{track.artist}</span>
                          </li>
                        ))}
                      </ol>
                    </div>
                    <p className="lol-footnote">Live via Last.fm</p>
                  </div>
                )}
              </article>
              <article>
                <h3>League of Legends</h3>
                {lolLoading ? (
                  <p>Loading stats...</p>
                ) : lolStats?.error ? (
                  <p>Unable to load stats</p>
                ) : (
                  <div className="lol-stats">
                    <div className="lol-stat-row">
                      <div className="lol-stat">
                        <span className="lol-stat-value">{lolStats?.rank}</span>
                        <span className="lol-stat-label">
                          {lolStats?.lp !== null ? `${lolStats?.lp} LP · Solo/Duo` : "Solo/Duo"}
                        </span>
                      </div>
                      <div className="lol-stat">
                        <span className="lol-stat-value">{lolStats?.winrate}</span>
                        <span className="lol-stat-label">{lolStats?.wins}W / {lolStats?.losses}L</span>
                      </div>
                    </div>
                    {lolStats?.topChampions?.length > 0 && (
                      <div className="lol-champions">
                        <span className="lol-stat-label">Most played</span>
                        <div className="lol-champion-list">
                          {lolStats.topChampions.map((champ) => (
                            <span key={champ.id} className="lol-champion">
                              {champ.iconUrl && (
                                <img src={champ.iconUrl} alt="" className="lol-champion-icon" />
                              )}
                              {champ.name}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                    <p className="lol-footnote">Live via Riot API</p>
                  </div>
                )}
              </article>
              <article>
                <h3>Clothing Store</h3>
                <p>Second-hand designer clothing store ran with 2 friends, with a selection of old Dior Homme, Saint Laurent Paris, Celine and more.</p>
                <div className="store-grid">
                  {storePieces.map((piece) => (
                    <a
                      key={piece.file}
                      href={piece.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="store-piece"
                    >
                      <img src={`/store/${piece.file}`} alt={piece.label} />
                      <span className="store-caption">{piece.label}</span>
                    </a>
                  ))}
                </div>
                <div className="project-actions">
                  <a href="https://www.instagram.com/untilfourever" target="_blank" rel="noopener noreferrer" className="project-link">
                    Visit Store
                  </a>
                </div>
                <p className="lol-footnote store-footnote">Ran through Instagram</p>
              </article>
            </div>
          </div>
        </section>

        <section id="contact" aria-labelledby="contact-title">
          <div className="container section-grid">
            <div className="section-header">
              <h2 id="contact-title">{t.contact.title}</h2>
            </div>
            <div className="surface contact-content">
              <div className="contact-links">
                <div className="email-copy-wrapper">
                  {isCopyMenuOpen && (
                    <button type="button" className="copy-popover" onClick={handleCopyEmail}>
                      {t.contact.copyAction}
                    </button>
                  )}
                  <button
                    type="button"
                    className="contact-link-button"
                    onClick={() => {
                      setIsCopyMenuOpen((prev) => !prev);
                      setCopyFeedback("");
                    }}
                    aria-expanded={isCopyMenuOpen}
                  >
                    {emailAddress}
                  </button>
                  {copyFeedback && <span className="copy-feedback">{copyFeedback}</span>}
                </div>
                <a href="https://github.com/im24a-wulkana" target="_blank" rel="noopener noreferrer" className="contact-link-button">
                  GitHub
                </a>
                <a href="https://www.linkedin.com/in/aaron-wulkan/" target="_blank" rel="noopener noreferrer" className="contact-link-button">
                  LinkedIn
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer>
        <div className="container">
          <p>© {currentYear} {t.footer}</p>
        </div>
      </footer>
    </>
  );
}
