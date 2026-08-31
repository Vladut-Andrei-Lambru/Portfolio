import Image from "next/image";
import Link from "next/link";
import { projects } from "@/lib/projects";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const education = [
  { period: "Aug 2026 — Jan 2027", title: "Computer Science exchange", place: "SeoulTech", location: "Seoul, South Korea", note: "A semester abroad focused on computer science and working in a new academic culture." },
  { period: "2024 — 2028", title: "Creative Media & Game Technologies", place: "Hanze University of Applied Sciences", location: "Groningen, Netherlands", note: "Project-based game development, mainly using Unity and C# for gameplay, VR and interaction systems." },
  { period: "2020 — 2024", title: "Mathematics & Computer Science", place: "Grigore Moisil National College", location: "Urziceni, Romania", note: "Where I built my foundation in programming, mathematics, logic and physics." },
];

const credentials = [
  ["2025", "Propedeutic Diploma", "Hanze University of Applied Sciences"],
  ["2024", "Cambridge English Qualification · score 173", "Cambridge Assessment English"],
  ["2024", "Diploma de Bacalaureat", "Ministry of Education, Romania"],
  ["2023", "Database Design", "Oracle Academy"],
];

export default function Home() {
  return <main>
    <header className="site-header">
      <Link className="wordmark" href="#top" aria-label="Back to the top">Vlad Lambru<span>.</span></Link>
      <nav aria-label="Main navigation"><a href="#work">Work</a><a href="#about">About</a><a href="#background">Background</a></nav>
      <a className="header-contact" href="mailto:v.lambru@st.hanze.nl">Email me</a>
    </header>

    <section className="hero" id="top">
      <div className="hero-copy enter">
        <p className="availability"><span /> Seeking a full-time internship from February 2027</p>
        <h1>Gameplay programming, technical design and VR interaction.</h1>
        <p className="hero-intro">I’m Vlad, a 21-year-old CMGT student. I work mainly in Unity and C#, building movement, interaction and feedback systems that get better through playtesting.</p>
        <div className="hero-actions">
          <a className="button primary" href="#work">View selected work</a>
          <a className="button" href={`${basePath}/files/vladut-andrei-lambru-resume.pdf`} target="_blank" rel="noreferrer">Résumé ↗</a>
        </div>
        <div className="hero-links">
          <a href="https://github.com/Vladut-Andrei-Lambru" target="_blank" rel="noreferrer">GitHub</a>
          <a href="https://www.linkedin.com/in/vladut-andrei-lambru/" target="_blank" rel="noreferrer">LinkedIn</a>
          <a href="mailto:v.lambru@st.hanze.nl">v.lambru@st.hanze.nl</a>
        </div>
      </div>
      <figure className="hero-portrait enter delay-one">
        <div className="portrait-frame"><Image unoptimized src={`${basePath}/images/vlad.jpg`} alt="Vlad Lambru" fill priority sizes="(max-width: 760px) 78vw, 32vw" /></div>
        <figcaption>Currently studying at SeoulTech in South Korea.</figcaption>
      </figure>
    </section>

    <section className="project-section" id="work">
      <div className="section-heading enter"><p className="label">Selected work</p><h2>Projects I can actually talk through.</h2><p>What I built, what broke, and how the systems changed along the way.</p></div>
      <div className="project-list">
        {projects.map((project) => <article className="project-card enter" key={project.slug}>
          <Link className="project-image" href={`/projects/${project.slug}`} aria-label={`Read the ${project.title} case study`}>
            <Image unoptimized src={`${basePath}${project.hero}`} alt={`${project.title} project screenshot`} fill sizes="(max-width: 760px) 100vw, 56vw" />
          </Link>
          <div className="project-card-copy">
            <p className="project-meta">{project.year} · {project.engine} · {project.team}</p>
            <h3><Link href={`/projects/${project.slug}`}>{project.title}</Link></h3>
            <p>{project.summary}</p>
            <ul className="tag-list" aria-label="Project skills">{project.tags.map((tag) => <li key={tag}>{tag}</li>)}</ul>
            <Link className="case-link" href={`/projects/${project.slug}`}>Project breakdown <span>↗</span></Link>
          </div>
        </article>)}
      </div>
    </section>

    <section className="about-section" id="about">
      <div className="section-heading enter"><p className="label">About</p><h2>I’m interested in the part of a game the player feels before they can explain it.</h2></div>
      <div className="about-grid">
        <div className="about-copy enter"><p>I started with graphics and interfaces, then moved toward programming because I wanted more control over how things behave. Most of my recent work has involved movement, physics, cameras, interaction and feedback.</p><p>I’m not trying to present myself as a finished developer. I can build a working first version, test it with people, find the awkward parts and improve it with the team. That is the kind of work I want to keep doing during my internship.</p></div>
        <div className="toolbox enter delay-one"><h3>Working set</h3><dl>
          <div><dt>Main tools</dt><dd>Unity · C# · Git</dd></div>
          <div><dt>Used in projects</dt><dd>VR/XR · Meta Quest 3 · Unreal Engine · Blueprints</dd></div>
          <div><dt>I enjoy</dt><dd>Gameplay prototyping · Debugging · Playtesting · Interaction design</dd></div>
          <div><dt>Developing next</dt><dd>Architecture · Tools programming · C++</dd></div>
        </dl></div>
      </div>
    </section>

    <section className="background-section" id="background">
      <div className="section-heading enter"><p className="label">Background</p><h2>Study, work and the useful things around them.</h2></div>
      <div className="timeline">{education.map((item) => <article className="enter" key={item.period + item.title}><p className="timeline-period">{item.period}</p><div><h3>{item.title}</h3><p className="timeline-place">{item.place} · {item.location}</p><p>{item.note}</p></div></article>)}</div>
      <div className="background-lower">
        <div className="enter"><h3 className="subheading">Certificates & training</h3><div className="credential-list">{credentials.map(([year, title, issuer]) => <div key={title}><span>{year}</span><p><strong>{title}</strong><small>{issuer}</small></p></div>)}</div></div>
        <div className="enter delay-one"><h3 className="subheading">Work outside university</h3><div className="plain-card"><h3>Sales employee · Albert Heijn</h3><p className="muted">Part-time, 2024 — present · Groningen</p><p>Working alongside my studies, helping customers, restocking shelves and unloading deliveries.</p></div><div className="plain-card"><h3>Festival volunteer</h3><p className="muted">Neversea 2023 · Beach, Please! 2024</p><p>Managed access for artists, VIPs and staff during busy shifts and handled access problems as they came up.</p></div></div>
      </div>
    </section>

    <footer>
      <p className="label">Available from February 2027</p>
      <h2>Interested in working together?</h2>
      <a className="email-link" href="mailto:v.lambru@st.hanze.nl">v.lambru@st.hanze.nl</a>
      <div className="footer-links"><a href="https://www.linkedin.com/in/vladut-andrei-lambru/" target="_blank" rel="noreferrer">LinkedIn ↗</a><a href="https://github.com/Vladut-Andrei-Lambru" target="_blank" rel="noreferrer">GitHub ↗</a><a href={`${basePath}/files/vladut-andrei-lambru-resume.pdf`} target="_blank" rel="noreferrer">Résumé ↗</a></div>
      <p className="footer-note">Vladut-Andrei Lambru · CMGT student and gameplay programmer</p>
    </footer>
  </main>;
}
