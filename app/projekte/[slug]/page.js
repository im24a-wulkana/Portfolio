import Link from "next/link";
import { notFound } from "next/navigation";

const projects = {
  "gaming-incentives": {
    title: "Gaming Incentives",
    subtitle: "Team project focused on rules, points and reward summaries",
    description: [
      "This project implements a small reward system for a gaming community. Users can collect actions and receive points.",
      "My main contribution was the data model and the UI structure. I focused on keeping the flow simple and easy to understand.",
    ],
    techBoxes: [
      { label: "Frontend", value: "React, CSS" },
      { label: "Backend", value: "Python (basic structure)" },
      { label: "Database", value: "MySQL" },
    ],
    projectUrl: "https://github.com/im24a-mendolag/Prwr-good",
    projectLabel: "Open project link",
  },
  "portfolio-website": {
    title: "Portfolio Website",
    subtitle: "Personal website as an ongoing learning project",
    description: [
      "This website is my learning and testing project. I keep improving layout, content and code structure while I learn.",
      "The focus is not visual effects. I prioritize readability, clean structure and practical navigation.",
    ],
    techBoxes: [
      { label: "Framework", value: "Next.js" },
      { label: "UI", value: "React" },
      { label: "Styling", value: "CSS" },
    ],
    projectUrl: "/#hero-title",
    projectLabel: "Open homepage top",
  },
};

export default async function ProjectDetailPage({ params }) {
  const { slug } = await params;
  const project = projects[slug];

  if (!project) {
    notFound();
  }

  return (
    <main>
      <section className="project-page">
        <div className="container section-grid">
          <Link href="/#projects" className="project-back-link">
            ← Back to projects
          </Link>

          <header className="section-header">
            <h1>{project.title}</h1>
            <p className="hero-note">{project.subtitle}</p>
          </header>

          <article className="surface text-block">
            {project.description.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </article>

          <section className="surface">
            <h2>Used technologies</h2>
            <div className="tech-grid">
              {project.techBoxes.map((item) => (
                <div className="tech-box" key={item.label}>
                  <span className="tech-label">{item.label}</span>
                  <strong>{item.value}</strong>
                </div>
              ))}
            </div>
          </section>

          {project.projectUrl && (
            <section className="surface">
              <h2>Project link</h2>
              {project.projectUrl.startsWith("http") ? (
                <a href={project.projectUrl} target="_blank" rel="noopener noreferrer" className="project-link">
                  {project.projectLabel}
                </a>
              ) : (
                <Link href={project.projectUrl} className="project-link">
                  {project.projectLabel}
                </Link>
              )}
            </section>
          )}
        </div>
      </section>
    </main>
  );
}
