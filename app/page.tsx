import Image from "next/image";
import Link from "next/link";
import { projects } from "@/lib/projects";
import { publicPath } from "@/lib/paths";

const education = [
  {
    period: "2024 – 2028",
    title: "BSc Creative Media & Game Technologies",
    institution: "Hanze University of Applied Sciences",
    description:
      "Project-based game development with a focus on Unity, C#, VR and multidisciplinary production.",
  },
  {
    period: "2026",
    title: "Computer Science exchange semester",
    institution: "Seoul National University of Science and Technology",
    description:
      "Coursework in computer science alongside my main game-development degree.",
  },
];

const capabilities = [
  ["Primary tools", "Unity · C# · Git"],
  ["Gameplay", "Prototyping · Movement · Cameras · Interaction · Feedback"],
  ["VR / XR", "Meta Quest 3 · XR Interaction Toolkit · Hand tracking · Physics"],
  ["Additional", "Unreal Engine · Blueprints · UI/UX · Playtesting"],
];

export default function Home() {
  const featured = projects[0];

  return (
    <main id="top">
      <header className="site-header">
        <Link className="wordmark" href="#top" aria-label="Back to the top">
          Vladut-Andrei Lambru
        </Link>
        <nav aria-label="Main navigation">
          <a href="#work">Projects</a>
          <a href="#profile">Profile</a>
          <a href="#background">Background</a>
        </nav>
        <a
          className="header-cta"
          href={publicPath("/files/vladut-andrei-lambru-resume.pdf")}
          target="_blank"
          rel="noreferrer"
        >
          Résumé <span aria-hidden="true">↗</span>
        </a>
      </header>

      <section className="hero">
        <div className="hero-copy">
          <p className="identity">Vladut-Andrei Lambru</p>
          <h1>
            Technical Game Designer
            <span>&amp; Gameplay Programmer</span>
          </h1>
          <p className="hero-summary">
            Unity and C# portfolio focused on gameplay prototyping, player interaction,
            movement and VR systems. The case studies show what I worked on, how the
            systems work and what changed after testing.
          </p>
          <div className="hero-actions">
            <a className="button button-primary" href="#work">View selected work</a>
            <a className="button button-ghost" href="https://github.com/Vladut-Andrei-Lambru" target="_blank" rel="noreferrer">
              GitHub <span aria-hidden="true">↗</span>
            </a>
            <a className="button button-ghost" href="https://www.linkedin.com/in/vladut-andrei-lambru/" target="_blank" rel="noreferrer">
              LinkedIn <span aria-hidden="true">↗</span>
            </a>
          </div>
          <div className="availability-line"><span aria-hidden="true" />Seeking a full-time internship from February 2027</div>
        </div>

        <Link className="hero-project" href={`/projects/${featured.slug}/`} aria-label={`Read the ${featured.title} case study`}>
          <Image
            unoptimized
            src={publicPath(featured.hero)}
            alt={featured.alt}
            fill
            priority
            sizes="(max-width: 900px) 100vw, 46vw"
          />
          <div className="hero-project-shade" />
          <div className="hero-project-label">
            <p>Featured project · {featured.category}</p>
            <h2>{featured.title}</h2>
            <span>{featured.highlight}</span>
          </div>
        </Link>
      </section>

      <section className="work-section" id="work">
        <div className="section-heading">
          <div>
            <p className="section-label">Selected work</p>
            <h2>Selected Unity and VR projects.</h2>
          </div>
          <p>
            Each case study covers the brief, my role, the implementation and the result.
            Repository and build links are included when they are available.
          </p>
        </div>

        <div className="project-list">
          {projects.map((project) => (
            <article className={`project-card ${project.theme}`} key={project.slug}>
              <Link className="project-card-media" href={`/projects/${project.slug}/`} aria-label={`Read the ${project.title} case study`}>
                <Image
                  unoptimized
                  src={publicPath(project.hero)}
                  alt={project.alt}
                  fill
                  sizes="(max-width: 760px) 100vw, 48vw"
                />
              </Link>
              <div className="project-card-content">
                <div className="project-card-topline"><span>{project.category}</span><span>{project.year}</span></div>
                <h3><Link href={`/projects/${project.slug}/`}>{project.title}</Link></h3>
                <p className="project-card-summary">{project.summary}</p>
                <dl className="project-card-facts">
                  <div><dt>Role</dt><dd>{project.roleSummary}</dd></div>
                  <div><dt>Stack</dt><dd>{project.stack}</dd></div>
                  <div><dt>Scope</dt><dd>{project.duration} · {project.team}</dd></div>
                </dl>
                <p className="project-highlight">{project.highlight}</p>
                <div className="project-actions">
                  <Link className="text-link" href={`/projects/${project.slug}/`}>Read case study <span aria-hidden="true">↗</span></Link>
                  {project.links.map((link) => (
                    <a className="quiet-link" key={link.href} href={link.href} target="_blank" rel="noreferrer">
                      {link.label} <span aria-hidden="true">↗</span>
                    </a>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="profile-section" id="profile">
        <div className="profile-intro">
          <p className="section-label">Profile</p>
          <h2>Technical design backed by implementation.</h2>
          <p>
            I’m a 21-year-old Creative Media and Game Technologies student from Romania.
            I usually work between design and programming: agreeing on how a mechanic
            should behave, getting a playable version running and fixing what playtests expose.
          </p>
          <p>
            I’m most interested in movement, cameras, interactions, VR physics and player
            feedback. I’m looking for a team where I can contribute to a real production and
            learn from experienced designers and programmers.
          </p>
        </div>
        <div className="capability-table" aria-label="Technical capabilities">
          {capabilities.map(([label, value]) => <div key={label}><span>{label}</span><p>{value}</p></div>)}
        </div>
      </section>

      <section className="background-section" id="background">
        <div className="section-heading background-heading">
          <div><p className="section-label">Background</p><h2>Education and experience.</h2></div>
          <a className="text-link" href={publicPath("/files/vladut-andrei-lambru-resume.pdf")} target="_blank" rel="noreferrer">
            Open full résumé <span aria-hidden="true">↗</span>
          </a>
        </div>
        <div className="background-grid">
          <div className="education-list">
            {education.map((item) => (
              <article key={item.title}>
                <p>{item.period}</p>
                <div><h3>{item.title}</h3><strong>{item.institution}</strong><span>{item.description}</span></div>
              </article>
            ))}
          </div>
          <aside className="background-aside">
            <div>
              <p className="section-label">Additional experience</p>
              <h3>Store employee · Albert Heijn</h3>
              <span>Part-time alongside university, 2024 – present</span>
              <p>Customer support, stock and deliveries in a busy team environment.</p>
            </div>
            <div>
              <p className="section-label">Certificates</p>
              <ul>
                <li>Propedeutic diploma · Hanze UAS, 2025</li>
                <li>Cambridge English qualification · Score 173, 2024</li>
                <li>Database Design · Oracle Academy, 2023</li>
              </ul>
            </div>
          </aside>
        </div>
      </section>

      <footer>
        <div className="footer-copy">
          <p className="section-label">February 2027 internship</p>
          <h2>Interested in the work?</h2>
          <p>My project breakdowns, source links and résumé are all available here. You can reach me directly through LinkedIn.</p>
        </div>
        <div className="footer-actions">
          <a className="button button-primary" href="https://www.linkedin.com/in/vladut-andrei-lambru/" target="_blank" rel="noreferrer">LinkedIn profile <span aria-hidden="true">↗</span></a>
          <a className="button button-ghost" href="https://github.com/Vladut-Andrei-Lambru" target="_blank" rel="noreferrer">GitHub profile <span aria-hidden="true">↗</span></a>
          <a className="button button-ghost" href={publicPath("/files/vladut-andrei-lambru-resume.pdf")} target="_blank" rel="noreferrer">Download résumé <span aria-hidden="true">↗</span></a>
        </div>
        <p className="footer-meta">© 2026 Vladut-Andrei Lambru</p>
      </footer>
    </main>
  );
}
