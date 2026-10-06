"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import type { Project } from "@/lib/projects";
import HoverVideoPreview from "@/app/components/HoverVideoPreview";

type Props = { projects: Project[] };

export default function ProjectGrid({ projects }: Props) {
  const grid = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  const updatePosition = () => {
    const element = grid.current;
    if (!element || element.children.length < 2) return;
    const first = element.children[0] as HTMLElement;
    const second = element.children[1] as HTMLElement;
    const spacing = second.offsetLeft - first.offsetLeft;
    if (spacing > 0)
      setActive(
        Math.min(
          projects.length - 1,
          Math.max(0, Math.round(element.scrollLeft / spacing)),
        ),
      );
  };

  const move = (direction: -1 | 1) => {
    const element = grid.current;
    if (!element) return;
    const index = Math.min(
      projects.length - 1,
      Math.max(0, active + direction),
    );
    const target = element.children[index] as HTMLElement | undefined;
    const first = element.children[0] as HTMLElement | undefined;
    if (!target || !first) return;
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    element.scrollTo({
      left: target.offsetLeft - first.offsetLeft,
      behavior: reducedMotion ? "auto" : "smooth",
    });
  };

  return (
    <div className="project-collection">
      <div className="mobile-project-controls" aria-label="Project navigation">
        <span aria-live="polite" aria-atomic="true">
          {projects.length ? active + 1 : 0} / {projects.length}
        </span>
        <span className="swipe-hint">Swipe to browse</span>
        <button
          type="button"
          aria-label="Previous project"
          disabled={active === 0}
          onClick={() => move(-1)}
        >
          ←
        </button>
        <button
          type="button"
          aria-label="Next project"
          disabled={active >= projects.length - 1}
          onClick={() => move(1)}
        >
          →
        </button>
      </div>
      <div
        className="project-grid"
        ref={grid}
        onScroll={updatePosition}
        aria-label="Project case studies"
        tabIndex={0}
        onKeyDown={(event) => {
          if (
            event.target !== event.currentTarget ||
            !window.matchMedia("(max-width: 760px)").matches
          )
            return;
          if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
            event.preventDefault();
            move(event.key === "ArrowLeft" ? -1 : 1);
          }
        }}
      >
        {projects.map((project) => (
          <article className="project-card" key={project.slug}>
            <Link
              className="project-image"
              href={`/projects/${project.slug}`}
              aria-label={`Read the ${project.title} case study`}
            >
              <HoverVideoPreview
                image={project.hero}
                alt={`${project.title} project screenshot`}
                video={project.videos?.[0]}
              />
            </Link>
            <div className="project-card-copy">
              <p className="project-meta">
                {project.year} · {project.engine} · {project.team}
              </p>
              <h3>
                <Link href={`/projects/${project.slug}`}>{project.title}</Link>
              </h3>
              <p>{project.summary}</p>
              <p className="project-contribution">
                <span>My work</span>
                {project.contribution}
              </p>
              <p className="project-tools">
                {project.tags.slice(0, 3).join(" · ")}
              </p>
              <Link className="case-link" href={`/projects/${project.slug}`}>
                Project breakdown <span>↗</span>
              </Link>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
