import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProject, projects } from "@/lib/projects";
import { publicPath } from "@/lib/paths";
import { getDisplayLinks, getPresentation } from "@/lib/project-presentation";

export function generateStaticParams(){ return projects.map((project)=>({slug:project.slug})); }

export default async function ProjectPage({params}:{params:Promise<{slug:string}>}){
  const {slug}=await params;
  const project=getProject(slug);
  if(!project) notFound();
  const view=getPresentation(project);
  const links=getDisplayLinks(project);

  return <main className={`case-page ${view.theme}`}>
    <header className="site-header case-header"><Link className="wordmark" href="/#top">Vladut-Andrei Lambru</Link><Link className="case-back" href="/#work">← Selected work</Link><a className="header-cta" href={publicPath("/files/vladut-andrei-lambru-resume.pdf")} target="_blank" rel="noreferrer">Résumé <span aria-hidden="true">↗</span></a></header>
    <section className="case-hero">
      <div className="case-heading"><p className="section-label">{view.category} · {project.year}</p><h1>{project.title}</h1><p>{project.summary}</p><div className="case-actions">{links.map((link)=><a className="button button-ghost" key={link.href} href={link.href} target="_blank" rel="noreferrer">{link.label} <span aria-hidden="true">↗</span></a>)}</div></div>
      <div className="case-hero-media"><Image unoptimized src={publicPath(project.hero)} alt={view.alt} fill priority sizes="100vw" /></div>
    </section>
    <section className="case-overview">
      <div className="case-facts"><div><span>Role</span><p>{view.roleSummary}</p></div><div><span>Stack</span><p>{view.stack}</p></div><div><span>Scope</span><p>{project.duration} · {project.team === "5 people" ? "5-person team" : project.team}</p></div><div><span>Result</span><p>{view.highlight}</p></div></div>
      <div className="case-copy"><div><p className="section-label">The brief</p><p>{project.brief}</p></div><div><p className="section-label">My role</p><p>{project.role}</p></div></div>
    </section>
    <section className="systems-section">
      <div className="section-heading"><div><p className="section-label">Implementation</p><h2>How the main systems work.</h2></div><p>The parts below focus on the systems I directly worked on and the decisions behind them.</p></div>
      <div className="system-list">{project.systems.map((system,index)=><article key={system.title}><div className="system-number">0{index+1}</div><div><h3>{system.title}</h3><p>{system.description}</p><ul>{system.details.map((detail)=><li key={detail}>{detail}</li>)}</ul></div></article>)}</div>
    </section>
    {project.images.length>1&&<section className="gallery-section"><div className="section-heading"><div><p className="section-label">Gallery</p><h2>Project screenshots.</h2></div></div><div className="gallery-grid">{project.images.slice(1).map((image,index)=><figure key={image} className={index%3===0?"wide":""}><Image unoptimized src={publicPath(image)} alt={`${project.title} screenshot ${index+2}`} fill sizes="(max-width: 760px) 100vw, 50vw" /></figure>)}</div></section>}
    <section className="case-result"><div><p className="section-label">Outcome</p><p>{project.outcome}</p></div><div><p className="section-label">What I learned</p><p>{project.learning}</p></div></section>
    <section className="case-next"><p className="section-label">More work</p><Link href="/#work">Back to selected projects <span aria-hidden="true">↗</span></Link></section>
  </main>;
}
