import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import CodeExcerpt from "@/app/components/CodeExcerpt";
import { codeExamples } from "@/lib/code-examples";
import {
  getProject,
  projects,
  type ProjectVideo as ProjectVideoData,
} from "@/lib/projects";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

function ProjectVideo({ video }: { video: ProjectVideoData }) {
  if (!video) return null;
  if (video.type === "mp4")
    return (
      <video
        className="project-video"
        controls
        preload="metadata"
        poster={video.poster ? `${basePath}${video.poster}` : undefined}
      >
        <source src={`${basePath}${video.src}`} type="video/mp4" />
        Your browser does not support embedded video.
      </video>
    );
  const embedSrc =
    video.type === "youtube"
      ? `https://www.youtube-nocookie.com/embed/${video.src}`
      : `https://player.vimeo.com/video/${video.src}`;
  return (
    <div className="video-frame">
      <iframe
        src={embedSrc}
        title={video.title}
        loading="lazy"
        referrerPolicy="strict-origin-when-cross-origin"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
      />
    </div>
  );
}

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}
export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();
  const examples = codeExamples[project.slug] ?? [];
  return (
    <main className="case-page">
      <header className="site-header case-header">
        <Link className="wordmark" href="/">
          Vlad Lambru<span>.</span>
        </Link>
        <Link className="back-link" href="/#work">
          ← All work
        </Link>
        <a
          className="header-contact"
          href={`${basePath}/files/vladut-andrei-lambru-resume.pdf`}
          target="_blank"
          rel="noreferrer"
        >
          Résumé
        </a>
      </header>
      <section className="case-hero">
        <div className="case-kicker">
          <span>{project.year}</span>
          <span>{project.engine}</span>
        </div>
        <h1>{project.title}</h1>
        <p>{project.summary}</p>
        <div className="case-links">
          {project.links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              target="_blank"
              rel="noreferrer"
            >
              {link.label} ↗
            </a>
          ))}
        </div>
      </section>
      <section className="case-at-a-glance">
        <dl className="case-facts">
          {project.roleLabel && <div><dt>Role</dt><dd>{project.roleLabel}</dd></div>}
          <div>
            <dt>Team</dt>
            <dd>{project.team}</dd>
          </div>
          <div>
            <dt>Time</dt>
            <dd>{project.duration}</dd>
          </div>
          <div>
            <dt>Engine</dt>
            <dd>{project.engine}</dd>
          </div>
          {project.language && <div><dt>Language</dt><dd>{project.language}</dd></div>}
        </dl>
        <div className="case-role">
          <h2>My contribution</h2>
          <p>{project.role}</p>
        </div>
      </section>
      {project.videos?.length ? (
        <section className="video-section">
          <h2>Gameplay</h2>
          <div className="project-video-list">
            {project.videos.map((video) => (
              <figure key={video.src}>
                <ProjectVideo video={video} />
                <figcaption>{video.title}</figcaption>
              </figure>
            ))}
          </div>
        </section>
      ) : (
        <div className="case-hero-image">
          <Image
            unoptimized
            src={`${basePath}${project.hero}`}
            alt={`${project.title} gameplay`}
            fill
            priority
            sizes="100vw"
          />
        </div>
      )}
      <section className="case-overview">
        <div className="case-prose">
          <h2>The brief</h2>
          <p>{project.brief}</p>
        </div>
        <div className="case-prose">
          <h2>How it developed</h2>
          <p>{project.development}</p>
        </div>
      </section>
      <section className="systems-section">
        <div className="section-heading">
          <h2>Implementation</h2>
        </div>
        <div className="system-list">
          {project.systems.map((system) => (
            <article key={system.title}>
              <div>
                <h3>{system.title}</h3>
                <p>{system.description}</p>
                <ul>
                  {system.details.map((detail) => (
                    <li key={detail}>{detail}</li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </section>
      {project.challenge && (
        <section className="technical-challenge">
          <h2>Technical challenge</h2>
          <div className="challenge-grid">
            <div><h3>The problem</h3><p>{project.challenge.problem}</p></div>
            <div><h3>The approach</h3><p>{project.challenge.decision}</p></div>
            <div><h3>The result</h3><p>{project.challenge.result}</p></div>
          </div>
        </section>
      )}
      {examples.length > 0 && (
        <section className="code-section">
          <h2>Selected code</h2>
          <div className="code-example-list">
            {examples.map(example => <CodeExcerpt key={example.source} example={example} />)}
          </div>
        </section>
      )}
      <section className="gallery-section">
        <div className="section-heading">
          <h2>Screenshots</h2>
        </div>
        <div className="gallery-grid">
          {project.images.slice(1).map((image, index) => (
            <figure key={image} className={index % 3 === 0 ? "wide" : ""}>
              <Image
                unoptimized
                src={`${basePath}${image}`}
                alt={`${project.title} screenshot ${index + 2}`}
                fill
                sizes="(max-width: 760px) 100vw, 50vw"
              />
            </figure>
          ))}
        </div>
      </section>
      <section className="result-section">
        <div>
          <h2>Result</h2>
          <p>{project.outcome}</p>
        </div>
        <div>
          <h2>What I learned</h2>
          <p>{project.learning}</p>
        </div>
      </section>
      {project.furtherWork && (
        <section className="further-work"><h2>Further work</h2><p>{project.furtherWork}</p></section>
      )}
      <section className="next-project">
        <Link href="/#work">
          Back to selected work <span>↗</span>
        </Link>
      </section>
    </main>
  );
}
