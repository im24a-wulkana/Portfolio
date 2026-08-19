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
    p1: "I'm passionate about building elegant, scalable web applications using modern technologies. I love solving complex problems and creating intuitive user experiences that make a real impact.",
    p2: "With expertise in full-stack development, I focus on writing clean, maintainable code and staying at the forefront of web development trends. I'm always eager to take on new challenges and collaborate on exciting projects.",
  },
  work: {
    title: "Skills",
    items: [
      { title: "Python", text: "Core programming, algorithms, and scripting" },
      { title: "JavaScript & React", text: "Modern web development and interactive applications" },
      { title: "HTML & CSS", text: "Semantic markup and responsive design" },
      { title: "MySQL", text: "Database design and SQL queries" },
      { title: "Next.js", text: "Full-stack web development and deployment" },
      { title: "Git & GitHub", text: "Version control and collaboration" },
    ],
  },
  projects: {
    title: "Projects",
    intro: "Three projects that represent my current level best:",
    featured: {
      name: "Boared",
      summary:
        "A multiplayer web platform featuring classic board games like Chess, Nine Men's Morris, and Connect Four. Play against real opponents online.",
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
            <div className="work-list">
              {t.work.items.map((item) => (
                <article className="surface work-item" key={item.title}>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </article>
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
                <h3>Portfolio</h3>
                <p>This modern portfolio website showcasing my web development skills with clean architecture and responsive design.</p>
                <div className="project-actions">
                  <a href="https://github.com/im24a-wulkana/Portfolio" target="_blank" rel="noopener noreferrer" className="project-link">
                    View on GitHub
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
              <p>{t.contact.text}</p>
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
