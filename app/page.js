  "use client";

import Link from "next/link";
import { useState } from "react";

const content = {
  nav: { profile: "Profile", work: "Workflow", projects: "Projects", contact: "Contact" },
  hero: {
    title: "Aaron Wulkan",
    subtitle: "IMS student at KSH (year 2), computer science track.",
    note: "This site documents real school and side projects. No marketing copy, just actual work.",
    cta: "See projects",
  },
  profile: {
    title: "About me",
    p1: "I am currently in year 2 of IMS at Kantonsschule Hottingen. Most school projects I do are in Python, SQL and core web tech.",
    p2: "I prefer clean and readable code over clever but hard-to-maintain solutions.",
  },
  work: {
    title: "How I work right now",
    items: [
      { title: "Frontend", text: "Next.js, React, HTML and CSS. I keep components direct and easy to read." },
      { title: "Backend / Data", text: "Python and MySQL for basic APIs, queries and small data models." },
      { title: "Workflow", text: "Small commits and short code notes for better traceability." },
    ],
  },
  projects: {
    title: "Projects",
    intro: "Two projects that represent my current level best:",
    featured: {
      name: "Gaming Incentives",
      summary:
        "Team project for reward rules, points and small reports. My part focused on data structure and UI implementation.",
      detailsHref: "/projekte/gaming-incentives",
      detailsLabel: "Open project page",
      projectHref: "https://github.com/im24a-mendolag/Prwr-good",
      projectLabel: "Open project link",
    },
    side: {
      name: "Portfolio Website",
      summary: "This website is my ongoing practice project. I keep improving it while learning.",
      detailsHref: "/projekte/portfolio-website",
      detailsLabel: "Open project page",
      projectHref: "/#hero-title",
      projectLabel: "Open project link",
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
  const [currentProjectIndex, setCurrentProjectIndex] = useState(0);
  const [touchStartX, setTouchStartX] = useState(null);
  const t = content;
  const currentYear = new Date().getFullYear();
  const emailAddress = "aaron.wulkan@icloud.com";
  const projectItems = [
    {
      name: t.projects.featured.name,
      summary: t.projects.featured.summary,
      detailsHref: t.projects.featured.detailsHref,
      detailsLabel: t.projects.featured.detailsLabel,
      projectHref: t.projects.featured.projectHref,
      projectLabel: t.projects.featured.projectLabel,
    },
    {
      name: t.projects.side.name,
      summary: t.projects.side.summary,
      detailsHref: t.projects.side.detailsHref,
      detailsLabel: t.projects.side.detailsLabel,
      projectHref: t.projects.side.projectHref,
      projectLabel: t.projects.side.projectLabel,
    },
    {
      name: "Battleship",
      summary:
        "Frontend for a Battleship game with a focus on clear game state, responsive interaction and a simple user flow.",
      projectHref: "https://github.com/im24a-voegelie/Schiffeversenken-Frontend",
      projectLabel: "Open frontend repo",
      backendHref: "https://github.com/im24a-voegelie/Schiffeversenken-Backend",
      backendLabel: "Open backend repo",
    },
    {
      name: "Future project 02",
      summary: "Placeholder for an upcoming project. Details will be added soon.",
    },
    {
      name: "Future project 03",
      summary: "Placeholder for an upcoming project. Details will be added soon.",
    },
  ];
  const activeProject = projectItems[currentProjectIndex];

  function goToProject(index) {
    setCurrentProjectIndex(index);
  }

  function goToNextProject() {
    setCurrentProjectIndex((prev) => (prev + 1) % projectItems.length);
  }

  function goToPreviousProject() {
    setCurrentProjectIndex((prev) => (prev - 1 + projectItems.length) % projectItems.length);
  }

  function handleProjectTouchStart(event) {
    setTouchStartX(event.changedTouches[0].clientX);
  }

  function handleProjectTouchEnd(event) {
    if (touchStartX === null) {
      return;
    }

    const touchEndX = event.changedTouches[0].clientX;
    const deltaX = touchEndX - touchStartX;

    if (Math.abs(deltaX) > 40) {
      if (deltaX < 0) {
        goToNextProject();
      } else {
        goToPreviousProject();
      }
    }

    setTouchStartX(null);
  }

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
              <p className="hero-note">{t.hero.note}</p>
              <a href="#projects" className="hero-link">{t.hero.cta}</a>
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
              <p className="section-intro">{t.projects.intro} Swipe or use the dots to navigate.</p>
            </div>

            <div
              className="project-slider"
              onTouchStart={handleProjectTouchStart}
              onTouchEnd={handleProjectTouchEnd}
            >
              <div className="project-slider-track">
                <button
                  type="button"
                  className="project-nav-button"
                  onClick={goToPreviousProject}
                  aria-label="Previous project"
                >
                  {"<"}
                </button>

                <article className="surface project-slide">
                  <h3>{activeProject.name}</h3>
                  <p>{activeProject.summary}</p>
                  <div className="project-actions">
                    {activeProject.detailsHref ? (
                      <Link href={activeProject.detailsHref} className="project-link">
                        {activeProject.detailsLabel}
                      </Link>
                    ) : (
                      <span className="project-link muted-link">Project page soon</span>
                    )}
                    {activeProject.projectHref ? (
                      activeProject.projectHref.startsWith("http") ? (
                        <a href={activeProject.projectHref} target="_blank" rel="noopener noreferrer" className="project-link">
                          {activeProject.projectLabel}
                        </a>
                      ) : (
                        <Link href={activeProject.projectHref} className="project-link">
                          {activeProject.projectLabel}
                        </Link>
                      )
                    ) : (
                      <span className="project-link muted-link">Project link soon</span>
                    )}
                    {activeProject.backendHref ? (
                      <a href={activeProject.backendHref} target="_blank" rel="noopener noreferrer" className="project-link">
                        {activeProject.backendLabel}
                      </a>
                    ) : null}
                  </div>
                </article>

                <button
                  type="button"
                  className="project-nav-button"
                  onClick={goToNextProject}
                  aria-label="Next project"
                >
                  {">"}
                </button>
              </div>

              <div className="project-dots" aria-label="Project slider navigation">
                {projectItems.map((item, index) => (
                  <button
                    key={item.name}
                    type="button"
                    className={index === currentProjectIndex ? "project-dot active" : "project-dot"}
                    onClick={() => goToProject(index)}
                    aria-label={`Go to ${item.name}`}
                  />
                ))}
              </div>
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
