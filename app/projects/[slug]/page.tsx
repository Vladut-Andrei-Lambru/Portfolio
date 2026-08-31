import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProject, projects } from "@/lib/projects";

const basePath=process.env.NEXT_PUBLIC_BASE_PATH ?? "";

function ProjectVideo({video}:{video:NonNullable<ReturnType<typeof getProject>>["video"]}){
  if(!video) return null;
  if(video.type==="mp4") return <video className="project-video" controls preload="metadata" poster={video.poster?`${basePath}${video.poster}`:undefined}><source src={`${basePath}${video.src}`} type="video/mp4" />Your browser does not support embedded video.</video>;
  const embedSrc=video.type==="youtube"?`https://www.youtube-nocookie.com/embed/${video.src}`:`https://player.vimeo.com/video/${video.src}`;
  return <div className="video-frame"><iframe src={embedSrc} title={video.title} loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen /></div>;
}

export function generateStaticParams(){ return projects.map((project)=>({slug:project.slug})); }
export default async function ProjectPage({params}:{params:Promise<{slug:string}>}){
  const {slug}=await params; const project=getProject(slug); if(!project) notFound();
  return <main className="case-page">
    <header className="site-header case-header"><Link className="wordmark" href="/#top">Vlad Lambru<span>.</span></Link><Link className="back-link" href="/#work">← All work</Link><a className="header-link" href={`${basePath}/files/vladut-andrei-lambru-resume.pdf`} target="_blank" rel="noreferrer">Résumé ↗</a></header>
    <section className="case-hero"><div className="case-kicker"><span>{project.year}</span><span>{project.engine}</span></div><h1>{project.title}</h1><p>{project.summary}</p><div className="case-links">{project.links.map((link)=><a key={link.href} href={link.href} target="_blank" rel="noreferrer">{link.label} ↗</a>)}</div></section>
    <div className="case-hero-image"><Image unoptimized src={`${basePath}${project.hero}`} alt={`${project.title} gameplay`} fill priority sizes="100vw" /></div>
    {project.video&&<section className="video-section"><p className="eyebrow">Watch it in action</p><ProjectVideo video={project.video} /></section>}
    <section className="case-overview"><div className="case-facts"><div><span>Team</span><strong>{project.team}</strong></div><div><span>Time</span><strong>{project.duration}</strong></div><div><span>Engine</span><strong>{project.engine}</strong></div></div><div className="case-prose"><p className="eyebrow">The brief</p><p>{project.brief}</p><p className="eyebrow">What I did</p><p>{project.role}</p></div></section>
    <section className="systems-section"><div className="section-heading inverse"><p className="section-number">01</p><div><p className="eyebrow">Under the hood</p><h2>The systems I worked on.</h2></div></div><div className="system-list">{project.systems.map((system,index)=><article key={system.title}><p className="system-number">0{index+1}</p><div><h3>{system.title}</h3><p>{system.description}</p><ul>{system.details.map((detail)=><li key={detail}>{detail}</li>)}</ul></div></article>)}</div></section>
    <section className="gallery-section"><div className="section-heading"><p className="section-number">02</p><div><p className="eyebrow">Project gallery</p><h2>What the player sees.</h2></div></div><div className="gallery-grid">{project.images.slice(1).map((image,index)=><figure key={image} className={index%3===0?"wide":""}><Image unoptimized src={`${basePath}${image}`} alt={`${project.title} screenshot ${index+2}`} fill sizes="(max-width: 760px) 100vw, 50vw" /></figure>)}</div></section>
    <section className="result-section"><div><p className="eyebrow">Result</p><p>{project.outcome}</p></div><div><p className="eyebrow">What I learned</p><p>{project.learning}</p></div></section>
    <section className="next-project"><p className="eyebrow">Keep looking</p><Link href="/#work">Back to all projects <span>↗</span></Link></section>
  </main>;
}
