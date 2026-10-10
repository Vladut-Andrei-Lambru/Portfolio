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

const combatDiagrams = [
  {
    src: "/images/combat-progression/06-progression-flow.png",
    title: "Progression flow",
    caption:
      "The progression flow from earning XP to reaching a new rank and choosing an upgrade.",
    width: 590,
    height: 790,
  },
  {
    src: "/images/combat-progression/05-system-diagram.png",
    title: "System architecture",
    caption:
      "The relationships between the progression system, upgrade selection and gameplay components. The original report uses red for new components, yellow for modified components and green for reused components.",
    width: 949,
    height: 1051,
  },
];

function assetUrl(src: string) {
  return src.startsWith("/") ? `${basePath}${src}` : src;
}

function ProjectVideo({ video }: { video: ProjectVideoData }) {
  if (video.type === "mp4") {
    return (
      <video
        className="project-video"
        controls
        preload="metadata"
        poster={video.poster ? assetUrl(video.poster) : undefined}
      >
        <source src={assetUrl(video.src)} type="video/mp4" />
        Your browser does not support embedded video.
      </video>
    );
  }

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

  if (!project) {
    notFound();
  }

  const examples = codeExamples[project.slug] ?? [];
  const isCombatProgression = project.slug === "combat-progression";

  const screenshots = project.images.slice(1).filter(
    (src) =>
      !isCombatProgression ||
      !combatDiagrams.some((diagram) => diagram.src === src)
  );

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
          href={assetUrl("/files/vladut-andrei-lambru-resume.pdf")}
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
              href={assetUrl(link.href)}
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
          {project.roleLabel && (
            <div>
              <dt>Role</dt>
              <dd>{project.roleLabel}</dd>
            </div>
          )}

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

          {project.language && (
            <div>
              <dt>Language</dt>
              <dd>{project.language}</dd>
            </div>
          )}
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
            src={assetUrl(project.hero)}
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

      {isCombatProgression && (
        <section
          className="systems-section"
          aria-labelledby="documentation-title"
        >
          <div className="section-heading">
            <h2 id="documentation-title">
              Research &amp; technical design
            </h2>
          </div>

          <div className="case-prose">
            <p>
              The project report documents the research, requirements,
              technical design, implementation and reflection. These
              original diagrams show the progression flow and how the
              upgrade system connects to Unity’s existing gameplay code.
            </p>

            <div className="case-links">
              <a
                href={assetUrl("/files/combat-progression-report.pdf")}
                target="_blank"
                rel="noreferrer"
              >
                Read the full report ↗
              </a>
            </div>

            <p>Click either diagram to open the full-size image.</p>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fit, minmax(min(100%, 320px), 1fr))",
              gap: "2rem",
              marginTop: "1.5rem",
              alignItems: "start",
            }}
          >
            {combatDiagrams.map((diagram) => (
              <figure key={diagram.src} style={{ margin: 0 }}>
                <h3>{diagram.title}</h3>

                <a
                  href={assetUrl(diagram.src)}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`Open full-size diagram: ${diagram.title}`}
                  style={{
                    display: "block",
                    marginTop: "1rem",
                    padding: "1rem",
                    background: "#f4f6f8",
                    borderRadius: "12px",
                    cursor: "zoom-in",
                  }}
                >
                  <Image
                    unoptimized
                    src={assetUrl(diagram.src)}
                    alt={diagram.title}
                    width={diagram.width}
                    height={diagram.height}
                    sizes="(max-width: 760px) 100vw, 50vw"
                    style={{
                      display: "block",
                      width: "100%",
                      height: "auto",
                    }}
                  />
                </a>

                <figcaption
                  style={{
                    marginTop: "0.75rem",
                    lineHeight: 1.6,
                  }}
                >
                  {diagram.caption}
                </figcaption>
              </figure>
            ))}
          </div>
        </section>
      )}

      {project.challenge && (
        <section className="technical-challenge">
          <h2>Technical challenge</h2>

          <div className="challenge-grid">
            <div>
              <h3>The problem</h3>
              <p>{project.challenge.problem}</p>
            </div>

            <div>
              <h3>The approach</h3>
              <p>{project.challenge.decision}</p>
            </div>

            <div>
              <h3>The result</h3>
              <p>{project.challenge.result}</p>
            </div>
          </div>
        </section>
      )}

      {examples.length > 0 && (
        <section className="code-section">
          <h2>Selected code</h2>

          <div className="code-example-list">
            {examples.map((example) => (
              <CodeExcerpt key={example.source} example={example} />
            ))}
          </div>
        </section>
      )}

      {screenshots.length > 0 && (
        <section className="gallery-section">
          <div className="section-heading">
            <h2>Screenshots</h2>
          </div>

          <div className="gallery-grid">
            {screenshots.map((image, index) => (
              <figure
                key={image}
                className={index % 3 === 0 ? "wide" : ""}
              >
                <a
                  href={assetUrl(image)}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`Open full-size ${project.title} screenshot ${index + 1}`}
                  style={{
                    position: "absolute",
                    inset: 0,
                    display: "block",
                    cursor: "zoom-in",
                  }}
                >
                  <Image
                    unoptimized
                    src={assetUrl(image)}
                    alt={`${project.title} screenshot ${index + 1}`}
                    fill
                    sizes="(max-width: 760px) 100vw, 50vw"
                  />
                </a>
              </figure>
            ))}
          </div>
        </section>
      )}

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
        <section className="further-work">
          <h2>Further work</h2>
          <p>{project.furtherWork}</p>
        </section>
      )}

      <section className="next-project">
        <Link href="/#work">
          Back to selected work <span>↗</span>
        </Link>
      </section>
    </main>
  );
}