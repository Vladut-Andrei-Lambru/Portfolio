import Image from "next/image";
import Link from "next/link";
import { orderedProjects } from "@/lib/projects";
import ProjectRail from "@/app/components/ProjectRail";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const socialIcons = {
  github: `${basePath}/icons/github.svg`,
  linkedin: `${basePath}/icons/linkedin.svg`,
};

const education = [
  { period: "Aug 2026 — Jan 2027", title: "Computer Science exchange", place: "SeoulTech", location: "Seoul, South Korea", note: "A semester abroad focused on computer science and working in a new academic culture.", logo: "/images/education/seoultech.png", logoAlt: "SeoulTech" },
  { period: "2024 — 2028", title: "Creative Media & Game Technologies", place: "Hanze University of Applied Sciences", location: "Groningen, Netherlands", note: "Project-based game development, mainly using Unity and C# for gameplay, VR and interaction systems.", logo: "/images/education/hanze.svg", logoAlt: "Hanze University of Applied Sciences" },
  { period: "2020 — 2024", title: "Mathematics & Computer Science", place: "Grigore Moisil National College", location: "Urziceni, Romania", note: "Where I built my foundation in programming, mathematics, logic and physics." },
];

const credentials = [
  ["2025", "Propedeutic Diploma", "Hanze University of Applied Sciences"],
  ["2024", "Cambridge English Qualification · score 173", "Cambridge Assessment English"],
  ["2024", "Diploma de Bacalaureat", "Ministry of Education, Romania"],
  ["2023", "Database Design", "Oracle Academy"],
];

function SocialIcon({ name }: { name: "github" | "linkedin" }) {
  return <Image className="social-icon" src={socialIcons[name]} alt="" width={16} height={16} aria-hidden="true" />;
}

export default function Home() {
  return <main>
    <header className="site-header">
      <Link className="wordmark" href="#top" aria-label="Back to the top">Vlad Lambru<span>.</span></Link>
      <nav aria-label="Main navigation"><a href="#work">Work</a><a href="#about">About</a><a href="#background">Background</a></nav>
      <a className="header-contact" href={`${basePath}/files/vladut-andrei-lambru-resume.pdf`} target="_blank" rel="noreferrer">Résumé</a>
    </header>

    <section className="hero" id="top">
      <div className="hero-copy enter">
        <p className="availability"><span /> Seeking a full-time internship from February 2027</p>
        <h1>Technical Game Designer & Gameplay Programmer<span>Unity, C# and VR development</span></h1>
        <p className="hero-intro">I’m a CMGT student at Hanze University, currently studying at SeoulTech. I build gameplay and interaction systems in Unity, with a focus on VR, player feedback and technical prototyping.</p>
        <div className="hero-actions">
          <a className="button primary" href="#work">View selected work</a>
          <a className="button" href={`${basePath}/files/vladut-andrei-lambru-resume.pdf`} target="_blank" rel="noreferrer">Résumé ↗</a>
        </div>
        <div className="hero-links">
          <a href="https://github.com/Vladut-Andrei-Lambru" target="_blank" rel="noreferrer" aria-label="GitHub profile"><SocialIcon name="github" />GitHub</a>
          <a href="https://www.linkedin.com/in/vladut-andrei-lambru/" target="_blank" rel="noreferrer" aria-label="LinkedIn profile"><SocialIcon name="linkedin" />LinkedIn</a>
          <a href="mailto:v.lambru@st.hanze.nl">v.lambru@st.hanze.nl</a>
        </div>
      </div>
      <figure className="hero-portrait enter delay-one">
        <div className="portrait-frame"><Image unoptimized src={`${basePath}/images/vlad.jpg`} alt="Vlad Lambru" fill priority sizes="(max-width: 760px) 78vw, 32vw" /></div>
        <figcaption>Currently studying at SeoulTech in South Korea.</figcaption>
      </figure>
    </section>

    <section className="project-section" id="work">
      <div className="section-heading enter"><p className="label">Work</p><h2>Projects</h2><p>Unity, C# and VR work from university and client projects.</p></div>
      <ProjectRail projects={orderedProjects} />
    </section>

    <section className="about-section" id="about">
      <div className="section-heading enter"><p className="label">About</p><h2>What I work on</h2></div>
      <div className="about-grid">
        <div className="about-copy enter"><p>My work sits between design and programming. I prototype mechanics, implement them in Unity, test them with players and iterate with designers and artists. Recent projects have focused on VR interaction, movement, physics, cameras and feedback systems.</p></div>
        <div className="toolbox enter delay-one"><h3>Role and tools</h3><dl>
          <div><dt>Main tools</dt><dd>Unity · C# · Git</dd></div>
          <div><dt>Used in projects</dt><dd>VR/XR · Meta Quest 3 · Unreal Engine · Blueprints</dd></div>
          <div><dt>I enjoy</dt><dd>Gameplay prototyping · Debugging · Playtesting · Interaction design</dd></div>
          <div><dt>Developing next</dt><dd>Architecture · Tools programming · C++</dd></div>
        </dl></div>
      </div>
    </section>

    <section className="background-section" id="background">
      <div className="section-heading enter"><p className="label">Background</p><h2>Education and experience.</h2></div>
      <div className="timeline">{education.map((item) => <article className="enter" key={item.period + item.title}><p className="timeline-period">{item.period}</p><div className="timeline-content"><div><h3>{item.title}</h3><p className="timeline-place">{item.place} · {item.location}</p><p>{item.note}</p></div>{item.logo && <div className="education-logo"><Image unoptimized src={`${basePath}${item.logo}`} alt={item.logoAlt} width={220} height={110} /></div>}</div></article>)}</div>
      <div className="background-lower">
        <div className="enter"><h3 className="subheading">Certificates & training</h3><div className="credential-list">{credentials.map(([year, title, issuer]) => <div key={title}><span>{year}</span><p><strong>{title}</strong><small>{issuer}</small></p></div>)}</div></div>
        <div className="enter delay-one"><h3 className="subheading">Work outside university</h3><div className="plain-card"><h3>Sales employee · Albert Heijn</h3><p className="muted">Part-time, 2024 — present · Groningen</p><p>Working alongside my studies, helping customers, restocking shelves and unloading deliveries.</p></div><div className="plain-card"><h3>Festival volunteer</h3><p className="muted">Neversea 2023 · Beach, Please! 2024</p><p>Managed access for artists, VIPs and staff during busy shifts and handled access problems as they came up.</p></div></div>
      </div>
    </section>

    <footer>
      <p className="label">Available from February 2027</p>
      <h2>Contact</h2>
      <a className="email-link" href="mailto:v.lambru@st.hanze.nl">v.lambru@st.hanze.nl</a>
      <div className="footer-links"><a href="https://www.linkedin.com/in/vladut-andrei-lambru/" target="_blank" rel="noreferrer" aria-label="LinkedIn profile"><SocialIcon name="linkedin" />LinkedIn</a><a href="https://github.com/Vladut-Andrei-Lambru" target="_blank" rel="noreferrer" aria-label="GitHub profile"><SocialIcon name="github" />GitHub</a><a href={`${basePath}/files/vladut-andrei-lambru-resume.pdf`} target="_blank" rel="noreferrer">Résumé ↗</a></div>
      <p className="footer-note">Vladut-Andrei Lambru · CMGT student and gameplay programmer</p>
    </footer>
  </main>;
}
