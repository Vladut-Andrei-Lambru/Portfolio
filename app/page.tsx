import Image from "next/image";
import Link from "next/link";
import { projects } from "@/lib/projects";

const basePath=process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const education = [
  { period: "Aug 2026 — Jan 2027", title: "Exchange semester, Computer Science", place: "Seoul National University of Science and Technology", location: "Seoul, South Korea", note: "A semester abroad focused on computer science, new ways of working, and learning inside a different academic culture." },
  { period: "2024 — 2028", title: "Creative Media & Game Technologies", place: "Hanze University of Applied Sciences", location: "Groningen, Netherlands", note: "Project-based game development with most of my time spent in Unity, C#, VR, gameplay systems, debugging, and team production." },
  { period: "2020 — 2024", title: "Mathematics & Computer Science", place: "Grigore Moisil National College", location: "Urziceni, Romania", note: "Built my foundation in programming, mathematics, logic, and physics before moving into game development." },
];

const credentials = [
  ["2025", "Propedeutic Diploma", "Hanze University of Applied Sciences"],
  ["2024", "Cambridge English Qualification · B2, score 173", "Cambridge Assessment English"],
  ["2024", "Diploma de Bacalaureat", "Ministry of Education, Romania"],
  ["2023", "Database Design", "Oracle Academy"],
];

export default function Home() {
  return <main>
    <header className="site-header">
      <Link className="wordmark" href="#top" aria-label="Back to the top">Vlad Lambru<span>.</span></Link>
      <nav aria-label="Main navigation"><a href="#work">Work</a><a href="#about">About</a><a href="#background">Background</a></nav>
      <a className="header-link" href={`${basePath}/files/vladut-andrei-lambru-resume.pdf`} target="_blank" rel="noreferrer">Résumé ↗</a>
    </header>

    <section className="hero" id="top">
      <div className="hero-copy">
        <p className="eyebrow"><span className="status-dot" /> Seeking a full-time internship from February 2027</p>
        <h1>Gameplay programmer with a soft spot for unusual controls.</h1>
        <p className="hero-intro">I’m Vlad, a 21-year-old CMGT student. I use Unity and C# to build movement, interaction and VR systems, usually through a lot of testing and a few questionable first attempts.</p>
        <div className="hero-actions">
          <a className="button primary" href="#work">See my work ↓</a>
          <a className="button text" href="https://github.com/Vladut-Andrei-Lambru" target="_blank" rel="noreferrer">GitHub ↗</a>
          <a className="button text" href="https://www.linkedin.com/in/vladut-andrei-lambru/" target="_blank" rel="noreferrer">LinkedIn ↗</a>
        </div>
      </div>
      <div className="hero-portrait">
        <div className="portrait-frame"><Image unoptimized src={`${basePath}/images/vlad.jpg`} alt="Vlad Lambru" fill priority sizes="(max-width: 760px) 70vw, 32vw" /></div>
        <p><span>Currently</span> Exchange semester in Seoul</p>
      </div>
    </section>

    <section className="project-section" id="work">
      <div className="section-heading"><p className="section-number">01</p><div><p className="eyebrow">Selected work</p><h2>Things I’ve built and what I learned from them.</h2></div></div>
      <div className="project-list">
        {projects.map((project, index) => <article className="project-card" key={project.slug}>
          <Link className="project-image" href={`/projects/${project.slug}`} aria-label={`Read the ${project.title} case study`}>
            <Image unoptimized src={`${basePath}${project.hero}`} alt={`${project.title} project screenshot`} fill sizes="(max-width: 760px) 100vw, 58vw" /><span className="project-index">0{index + 1}</span>
          </Link>
          <div className="project-card-copy">
            <p className="eyebrow">{project.year} · {project.engine}</p><h3><Link href={`/projects/${project.slug}`}>{project.title}</Link></h3><p>{project.summary}</p>
            <ul className="tag-list" aria-label="Project skills">{project.tags.map((tag) => <li key={tag}>{tag}</li>)}</ul>
            <Link className="case-link" href={`/projects/${project.slug}`}>Read case study <span>↗</span></Link>
          </div>
        </article>)}
      </div>
    </section>

    <section className="about-section" id="about">
      <div className="section-heading inverse"><p className="section-number">02</p><div><p className="eyebrow">About</p><h2>I care about the point where code becomes something a player can feel.</h2></div></div>
      <div className="about-grid">
        <div className="about-copy"><p>I started out making graphics and interfaces, then moved toward programming because I wanted to control how things behave, not only how they look. These days, most of my work sits around movement, interaction, physics, camera systems, and feedback.</p><p>I don’t pretend to know everything. I’m at my best when I can build a first version, give it to someone, watch what goes wrong, and improve it with the team.</p></div>
        <div className="toolbox"><p className="eyebrow">What I work with</p><dl>
          <div><dt>Every week</dt><dd>Unity · C# · Git</dd></div><div><dt>Project experience</dt><dd>VR/XR · Meta Quest 3 · Unreal Engine · Blueprints</dd></div><div><dt>Comfortable doing</dt><dd>Gameplay prototyping · Debugging · UI feedback · Playtesting</dd></div><div><dt>Learning next</dt><dd>Stronger architecture · Tools programming · C++</dd></div>
        </dl></div>
      </div>
    </section>

    <section className="background-section" id="background">
      <div className="section-heading"><p className="section-number">03</p><div><p className="eyebrow">Background</p><h2>Where I’m studying and what I’ve done alongside it.</h2></div></div>
      <div className="timeline">{education.map((item) => <article key={item.period + item.title}><p className="timeline-period">{item.period}</p><div><h3>{item.title}</h3><p className="timeline-place">{item.place} · {item.location}</p><p>{item.note}</p></div></article>)}</div>
      <div className="background-lower">
        <div><p className="eyebrow">Certificates & training</p><div className="credential-list">{credentials.map(([year, title, issuer]) => <div key={title}><span>{year}</span><p><strong>{title}</strong><small>{issuer}</small></p></div>)}</div></div>
        <div><p className="eyebrow">Work outside university</p><div className="plain-card"><h3>Sales employee · Albert Heijn</h3><p className="muted">Part-time, 2024 — present · Groningen</p><p>Working alongside my studies, helping customers, restocking shelves, and unloading deliveries.</p></div><div className="plain-card"><h3>Festival volunteer</h3><p className="muted">Neversea 2023 · Beach, Please! 2024</p><p>Managed access for artists, VIPs, and staff during busy shifts and helped resolve access problems as they came up.</p></div></div>
      </div>
    </section>

    <footer><p className="footer-lead">Looking for a gameplay or technical design intern?</p><h2>Let’s talk about the work.</h2><div className="footer-links"><a href="https://www.linkedin.com/in/vladut-andrei-lambru/" target="_blank" rel="noreferrer">LinkedIn ↗</a><a href="https://github.com/Vladut-Andrei-Lambru" target="_blank" rel="noreferrer">GitHub ↗</a><a href={`${basePath}/files/vladut-andrei-lambru-resume.pdf`} target="_blank" rel="noreferrer">Résumé ↗</a></div><p className="footer-note">Vladut-Andrei Lambru · Designed and built in 2026</p></footer>
  </main>;
}
