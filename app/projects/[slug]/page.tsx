import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import CodeExcerpt from "@/app/components/CodeExcerpt";
import { EvidenceLoop } from "@/app/components/HoverVideoPreview";
import { codeExamples } from "@/lib/code-examples";
import { getProject, projects, type ProjectVideo } from "@/lib/projects";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

function assetUrl(src: string) {
  return src.startsWith("/") ? `${basePath}${src}` : src;
}

function Video({ video }: { video: ProjectVideo }) {
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
  const src =
    video.type === "youtube"
      ? `https://www.youtube-nocookie.com/embed/${video.src}`
      : `https://player.vimeo.com/video/${video.src}`;
  return (
    <div className="video-frame">
      <iframe
        src={src}
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
  return projects.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  return {
    title: project.title + " | Vladut-Andrei Lambru",
    description: project.summary,
    openGraph: {
      title: project.title + " | Vladut-Andrei Lambru",
      description: project.summary,
      images: [{ url: project.hero, alt: project.title + " gameplay" }],
    },
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const sourceExamples = codeExamples[slug] ?? [];
  const leadIndices =
    slug === "time-rewind"
      ? [2, 3]
      : slug === "tiny-spider-tiny-home"
        ? [0, 2]
        : [0, 1];
  const examples = [
    ...leadIndices.flatMap((index) =>
      sourceExamples[index] ? [sourceExamples[index]] : [],
    ),
    ...sourceExamples.filter((_, index) => !leadIndices.includes(index)),
  ];
  const language = project.language?.includes("C++") ? "C++" : "C#";
  const videos = project.videos ?? [];
  const documentation = project.documentation;
  const diagrams = documentation?.diagrams ?? [];
  const screenshots = project.images
    .slice(1)
    .filter((src) => !diagrams.some((diagram) => diagram.src === src));
  const courseContext = ["combat-progression", "time-rewind"].includes(slug);

  return (
    <main className="case-page">
      <header className="site-header case-header">
        <Link className="wordmark" href="/">
          Vlad Lambru<span>.</span>
        </Link>
        <Link className="back-link" href="/#work">
          All work
        </Link>
        <a
          className="header-contact"
          href={assetUrl("/files/vladut-andrei-lambru-resume.pdf")}
          target="_blank"
          rel="noreferrer"
        >
          CV
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
              {link.label}
            </a>
          ))}
        </div>
      </section>

      {videos[0] ? (
        <section className="video-section" aria-label="Gameplay showcase">
          <figure>
            <Video video={videos[0]} />
            <figcaption>{videos[0].title}</figcaption>
          </figure>
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
            <dt>{courseContext ? "Context" : "Duration"}</dt>
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
          <h3 className="case-result-heading">Result</h3>
          <p>{project.outcome}</p>
        </div>
      </section>

      <section className="case-overview">
        <div className="case-prose">
          <h2>The brief</h2>
          <p>{project.brief}</p>
        </div>
        <div className="case-prose">
          <h2>Development direction</h2>
          <p>{project.development}</p>
        </div>
      </section>

      <section className="systems-section">
        <div className="section-heading">
          <h2>Key systems</h2>
        </div>
        <div className="system-list">
          {project.systems.map((system) => (
            <article key={system.title}>
              <div>
                <h3>{system.title}</h3>
                <p>{system.description}</p>
                <div className="system-details">
                  <ul>
                    {system.details.map((detail) => (
                      <li key={detail}>{detail}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {project.iterations?.length ? (
        <section className="iteration-section">
          <h2>Development decisions and iteration</h2>
          <div className="iteration-list">
            {project.iterations.map((iteration) => (
              <article key={iteration.title}>
                <h3>{iteration.title}</h3>
                <dl className="iteration-grid">
                  <div>
                    <dt>The starting point</dt>
                    <dd>{iteration.observation}</dd>
                  </div>
                  <div>
                    <dt>What changed</dt>
                    <dd>{iteration.change}</dd>
                  </div>
                  <div>
                    <dt>Result and evidence</dt>
                    <dd>{iteration.result}</dd>
                  </div>
                </dl>
              </article>
            ))}
          </div>
          {project.testingNote && (
            <p className="testing-note">{project.testingNote}</p>
          )}
        </section>
      ) : null}

      {project.evidence?.length ? (
        <section className="evidence-section">
          <h2>Development in practice</h2>
          <div className="evidence-grid">
            {project.evidence.map((item) => (
              <figure key={item.src}>
                <div
                  className="evidence-media"
                  style={{ aspectRatio: `${item.width} / ${item.height}` }}
                >
                  {item.type === "video" ? (
                    <EvidenceLoop
                      src={assetUrl(item.src)}
                      poster={item.poster ? assetUrl(item.poster) : undefined}
                      title={item.title}
                    />
                  ) : (
                    <Image
                      unoptimized
                      src={assetUrl(item.src)}
                      alt={item.title}
                      width={item.width}
                      height={item.height}
                      sizes="(max-width: 760px) 100vw, 50vw"
                    />
                  )}
                </div>
                <figcaption>
                  <h3>{item.title}</h3>
                  <p>{item.caption}</p>
                </figcaption>
              </figure>
            ))}
          </div>
        </section>
      ) : null}

      {project.challenge && (
        <section className="technical-challenge">
          <h2>Technical decision</h2>
          <div className="challenge-grid">
            <div>
              <h3>The problem</h3>
              <p>{project.challenge.problem}</p>
            </div>
            <div>
              <h3>My approach</h3>
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
              <CodeExcerpt
                key={example.source}
                example={example}
                language={language}
              />
            ))}
          </div>
        </section>
      )}

      <section className="result-section">
        <div>
          <h2>What I learned</h2>
          <p>{project.learning}</p>
        </div>
        {project.furtherWork && (
          <div>
            <h2>Further work</h2>
            <p>{project.furtherWork}</p>
          </div>
        )}
      </section>

      {videos.length > 1 && (
        <section
          className="video-section"
          aria-label="Additional gameplay videos"
        >
          <h2>Additional gameplay</h2>
          <div className="project-video-list">
            {videos.slice(1).map((video) => (
              <figure key={video.src}>
                <Video video={video} />
                <figcaption>{video.title}</figcaption>
              </figure>
            ))}
          </div>
        </section>
      )}

      <section className="case-supporting">
        {documentation && (
          <div className="supporting-content">
            <h2>
              {slug === "time-rewind"
                ? "Test plan and evaluation"
                : "Research and technical design"}
            </h2>
            <p className="supporting-intro">{documentation.summary}</p>
            <div className="case-links">
              <a
                href={assetUrl(documentation.report)}
                target="_blank"
                rel="noreferrer"
              >
                Read the full document
              </a>
            </div>
            {diagrams.length > 0 && (
              <div className="documentation-grid">
                {diagrams.map((diagram) => (
                  <figure key={diagram.src}>
                    <h3>{diagram.title}</h3>
                    <a
                      className="diagram-image"
                      href={assetUrl(diagram.src)}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={`Open full-size ${diagram.title}`}
                    >
                      <Image
                        unoptimized
                        src={assetUrl(diagram.src)}
                        alt={diagram.title}
                        width={diagram.width}
                        height={diagram.height}
                        sizes="(max-width: 760px) 100vw, 50vw"
                      />
                    </a>
                    <figcaption>{diagram.caption}</figcaption>
                  </figure>
                ))}
              </div>
            )}
          </div>
        )}
      </section>

      {screenshots.length > 0 && (
        <section className="gallery-section">
          <div className="section-heading">
            <h2>Screenshots</h2>
          </div>
          <div className="gallery-grid">
            {screenshots.map((src, index) => (
              <figure key={src} className={index % 3 === 0 ? "wide" : ""}>
                <a
                  className="gallery-image-link"
                  href={assetUrl(src)}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`Open full-size ${project.title} screenshot ${index + 1}`}
                >
                  <Image
                    unoptimized
                    src={assetUrl(src)}
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
      <section className="next-project">
        <Link href="/#work">Back to selected work</Link>
      </section>
    </main>
  );
}
