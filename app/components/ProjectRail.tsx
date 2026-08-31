"use client";

import Link from "next/link";
import { useRef } from "react";
import type { Project } from "@/lib/projects";
import HoverVideoPreview from "@/app/components/HoverVideoPreview";

type Props = { projects: Project[] };

export default function ProjectRail({ projects }: Props) {
  const rail = useRef<HTMLDivElement>(null);

  const move = (direction: -1 | 1) => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    rail.current?.scrollBy({
      left: direction * rail.current.clientWidth * 0.82,
      behavior: reduceMotion ? "auto" : "smooth",
    });
  };

  return <div className="project-rail-shell">
    <div className="project-rail-controls" aria-label="Project navigation">
      <button type="button" onClick={() => move(-1)} aria-label="Previous projects">←</button>
      <button type="button" onClick={() => move(1)} aria-label="Next projects">→</button>
    </div>
    <div className="project-rail" ref={rail} aria-label="Project case studies" tabIndex={0}>
      {projects.map((project) => <article className="project-rail-card" key={project.slug}>
        <Link className="project-image" href={`/projects/${project.slug}`} aria-label={`Read the ${project.title} case study`}>
          <HoverVideoPreview image={project.hero} alt={`${project.title} project screenshot`} video={project.videos?.[0]} />
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
  </div>;
}
