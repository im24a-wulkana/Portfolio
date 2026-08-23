  "use client";

import Link from "next/link";
import { useState } from "react";

const content = {
  nav: { profile: "Profile", work: "Workflow", projects: "Projects", contact: "Contact" },
  hero: {
    title: "Aaron Wulkan",
    subtitle: "Full Stack Developer | Creative Problem Solver",
  },
  profile: {
    title: "About me",
    p1: "Hey! I'm Aaron, a 15-year-old developer from Männedorf, Switzerland. I attend IMS Hottingen Zürich and I'm passionate about building cool web applications and solving problems with code.",
    p2: "I speak German (C2) and English (C1), and I'm constantly learning new technologies. When I'm not coding, I'm exploring new frameworks and experimenting with full-stack development. I love collaborating on projects and creating things that actually matter.",
  },
  work: {
    title: "Skills",
    categories: [
      {
        name: "Languages",
        items: ["TypeScript", "JavaScript", "Python", "Java"],
      },
      {
        name: "Frameworks",
        items: ["Next.js", "React", "Tailwind CSS", "Flask"],
      },
      {
        name: "Databases",
        items: ["MySQL", "PostgreSQL", "MongoDB"],
      },
      {
        name: "Tools",
        items: ["Git & GitHub", "Docker", "Vercel", "Neon"],
      },
      {
        name: "Certificates",
        items: ["Abacus Anwender 2026"],
      },
    ],
  },
  projects: {
    title: "Projects",
    intro: "Three projects that represent my current level best:",
    featured: {
      name: "Boared",
      summary:
        "A multiplayer web platform featuring classic board games like Chess, Nine Men's Morris, and Connect Four. Play against bots or real players with local multiplayer (online coming soon).",
      detailsHref: null,
      detailsLabel: "Open project page",
      projectHref: "https://github.com/im24a-wulkana/Boared",
      projectLabel: "View on GitHub",
    },
    side: {
      name: "Casino Tower",
      summary: "An interactive casino tower game built with Next.js and React. Explore the live demo or check out the source code.",
      detailsHref: null,
      detailsLabel: "Open project page",
      projectHref: "https://casino-tower.vercel.app/",
      projectLabel: "Live Demo",
      backendHref: "https://github.com/im24a-wulkana/casino-tower",
      backendLabel: "View on GitHub",
    },
    third: {
      name: "Trackworks",
      summary: "An online multiplayer racing game where you build your track with obstacles first, and then race on it against your friends.",
      detailsHref: null,
      detailsLabel: "Open project page",
      projectHref: "https://sensitive-reserve.669ceb1.deploio.app/",
      projectLabel: "Play Now",
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

export default function Home() {
  const [isCopyMenuOpen, setIsCopyMenuOpen] = useState(false);
  const [copyFeedback, setCopyFeedback] = useState("");
  const t = content;
  const currentYear = new Date().getFullYear();
  const emailAddress = "aaronwulkan.dev@gmail.com";

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
                    {category.items.map((item) => (
                      <span key={item} className="skill-tag">{item}</span>
                    ))}
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
                </div>
              </article>
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
                </div>
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
