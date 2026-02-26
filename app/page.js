"use client";

import { useState } from "react";

const content = {
  de: {
    nav: { about: "Über mich", skills: "Fähigkeiten", projects: "Projekte", contact: "Kontakt" },
    hero: {
      title: "Hallo, ich bin Aaron.",
      subtitle: "IMS-Schüler mit Schwerpunkt Informatik",
    },
    about: {
      title: "Über mich",
      p1: "Ich bin IMS-Schüler an der Kantonsschule Hottingen (KSH) im zweiten Jahr mit Schwerpunkt Informatik. Während meiner Ausbildung beschäftige ich mich mit Programmierung und grundlegenden IT-Themen. Besonders interessiert mich das Arbeiten mit Software und Webtechnologien, da mir logisches Denken und strukturiertes Arbeiten liegen.",
      p2: "Ich arbeite zuverlässig und konzentriert, bin lernbereit und motiviert, meine fachlichen Kenntnisse kontinuierlich zu erweitern. Neue Aufgaben gehe ich sorgfältig an und lege Wert auf saubere und verständliche Lösungen.",
    },
    skills: {
      title: "Fähigkeiten",
      python: "Grundlegende Programmierkenntnisse, einfache Programme",
      mysql: "Datenbanken, einfache Abfragen",
      htmlCss: "Struktur und Gestaltung einfacher Webseiten",
    },
    projects: {
      title: "Projekte",
      gaming: "Ein GitHub-Projekt zur Verwaltung von Gaming-Incentives und Belohnungssystemen.",
      gamingLink: "Auf GitHub ansehen",
      portfolio: "Diese moderne Portfolio-Webseite, erstellt mit HTML und CSS, zeigt meine Fähigkeiten im Webdesign.",
      portfolioLink: "Projekt ansehen",
    },
    contact: {
      title: "Kontakt",
      text: "Du möchtest mit mir in Kontakt treten? Schreib mir gerne eine E-Mail oder besuche mein GitHub-Profil.",
    },
    footer: "Aaron – IMS Schüler Informatik",
  },
  en: {
    nav: { about: "About me", skills: "Skills", projects: "Projects", contact: "Contact" },
    hero: {
      title: "Hi, I'm Aaron.",
      subtitle: "IMS student with focus on computer science",
    },
    about: {
      title: "About me",
      p1: "I am an IMS student at Kantonsschule Hottingen (KSH) in my second year with a focus on computer science. During my training I work on programming and fundamental IT topics. I am especially interested in software and web technologies, as I enjoy logical thinking and structured work.",
      p2: "I work reliably and with focus, I am eager to learn and motivated to continuously expand my skills. I approach new tasks carefully and value clean, understandable solutions.",
    },
    skills: {
      title: "Skills",
      python: "Basic programming skills, simple programs",
      mysql: "Databases, simple queries",
      htmlCss: "Structure and styling of simple websites",
    },
    projects: {
      title: "Projects",
      gaming: "A GitHub project for managing gaming incentives and reward systems.",
      gamingLink: "View on GitHub",
      portfolio: "This modern portfolio website, built with HTML and CSS, showcases my web design skills.",
      portfolioLink: "View project",
    },
    contact: {
      title: "Contact",
      text: "Want to get in touch? Feel free to send me an email or visit my GitHub profile.",
    },
    footer: "Aaron – IMS student computer science",
  },
};

export default function Home() {
  const [lang, setLang] = useState("de");
  const [isCopyMenuOpen, setIsCopyMenuOpen] = useState(false);
  const [copyFeedback, setCopyFeedback] = useState("");
  const t = content[lang];
  const currentYear = new Date().getFullYear();
  const emailAddress = "aaron.wulkan@icloud.com";

  async function handleCopyEmail() {
    try {
      await navigator.clipboard.writeText(emailAddress);
      setCopyFeedback(lang === "de" ? "Kopiert!" : "Copied!");
      setIsCopyMenuOpen(false);
    } catch {
      setCopyFeedback(lang === "de" ? "Kopieren fehlgeschlagen" : "Copy failed");
    }

    setTimeout(() => setCopyFeedback(""), 1800);
  }

  return (
    <>
      <nav>
        <div className="container nav-inner">
          <ul>
            <li><a href="#ueber-mich">{t.nav.about}</a></li>
            <li><a href="#faehigkeiten">{t.nav.skills}</a></li>
            <li><a href="#projekte">{t.nav.projects}</a></li>
            <li><a href="#kontakt">{t.nav.contact}</a></li>
          </ul>
          <div className="lang-switch">
            <button
              type="button"
              className={lang === "de" ? "active" : ""}
              onClick={() => setLang("de")}
              aria-label="Deutsch"
            >
              DE
            </button>
            <button
              type="button"
              className={lang === "en" ? "active" : ""}
              onClick={() => setLang("en")}
              aria-label="English"
            >
              EN
            </button>
          </div>
        </div>
      </nav>

      <section className="hero">
        <div className="container">
          <div className="hero-content">
            <h1>{t.hero.title}</h1>
            <p>{t.hero.subtitle}</p>
          </div>
        </div>
      </section>

      <section id="ueber-mich" className="about">
        <div className="container">
          <div className="section-header">
            <h2>{t.about.title}</h2>
          </div>
          <div className="about-content">
            <p>{t.about.p1}</p>
            <p>{t.about.p2}</p>
          </div>
        </div>
      </section>

      <section id="faehigkeiten">
        <div className="container">
          <div className="section-header">
            <h2>{t.skills.title}</h2>
          </div>
          <div className="skills-grid">
            <div className="skill-card">
              <h3>Python</h3>
              <p>{t.skills.python}</p>
            </div>
            <div className="skill-card">
              <h3>MySQL</h3>
              <p>{t.skills.mysql}</p>
            </div>
            <div className="skill-card">
              <h3>HTML &amp; CSS</h3>
              <p>{t.skills.htmlCss}</p>
            </div>
          </div>
        </div>
      </section>

      <section id="projekte" className="projects">
        <div className="container">
          <div className="section-header">
            <h2>{t.projects.title}</h2>
          </div>
          <div className="projects-grid">
            <div className="project-card">
              <h3>Gaming Incentives</h3>
              <p>{t.projects.gaming}</p>
              <a href="https://github.com/im24a-mendolag/Prwr-good" target="_blank" rel="noopener noreferrer" className="project-link">{t.projects.gamingLink}</a>
            </div>
            <div className="project-card">
              <h3>Portfolio-Webseite</h3>
              <p>{t.projects.portfolio}</p>
              <a href="#" className="project-link">{t.projects.portfolioLink}</a>
            </div>
          </div>
        </div>
      </section>

      <section id="kontakt" className="contact">
        <div className="container">
          <div className="section-header">
            <h2>{t.contact.title}</h2>
          </div>
          <div className="contact-content">
            <p>{t.contact.text}</p>
            <div className="contact-links">
              <div className="email-copy-wrapper">
                {isCopyMenuOpen && (
                  <button type="button" className="copy-popover" onClick={handleCopyEmail}>
                    Kopieren
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
              <a href="https://github.com/im24a-wulkana" target="_blank" rel="noopener noreferrer">GitHub</a>
            </div>
          </div>
        </div>
      </section>

      <footer>
        <div className="container">
          <p>© {currentYear} {t.footer}</p>
        </div>
      </footer>
    </>
  );
}
