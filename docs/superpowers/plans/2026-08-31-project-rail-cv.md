# Project Rail and CV Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add an extensible horizontal project rail, simplify the dark colour system and copy, and replace the Europass résumé with a recruiter-readable one-page CV.

**Architecture:** Project ordering remains data-driven in `lib/projects.ts`; a focused client component owns rail controls while existing project cards and hover-video logic remain reusable. The CV is generated from a deterministic local script, rendered and visually inspected, then published as PDF while the editable DOCX is retained.

**Tech Stack:** Next.js 16 static export, React, TypeScript, CSS scroll snap, Node test runner, python-docx, LibreOffice/Poppler rendering, GitHub Pages.

**Spec:** `docs/superpowers/specs/2026-08-31-project-rail-cv-design.md`

## Global Constraints

- Preserve the page background `#0d1017`.
- Use one restrained periwinkle accent family centered on `#9c8cff`.
- Meet WCAG 2.2 AA contrast for normal text and controls.
- No fake projects on the deployed site.
- Videos start only on fine-pointer hover; touch and reduced-motion users keep still images.
- `lib/projects.ts` remains the only file required to add or reorder projects.
- CV is one A4 page and contains no photo, age, birth date, nationality, street address, old username, proficiency bars, or generic personality claims.

---

### Task 1: Project feature ordering

**Files:**
- Modify: `lib/projects.ts`
- Modify: `tests/portfolio-content.test.mjs`

**Interfaces:**
- Produces: `Project.featuredOrder?: 1 | 2 | 3`
- Produces: `orderedProjects: Project[]`

- [ ] Add failing tests asserting three unique feature numbers and that `orderedProjects` begins with orders 1, 2, and 3.
- [ ] Run `node --test tests/*.test.mjs` and confirm the ordering assertions fail.
- [ ] Add `featuredOrder?: 1 | 2 | 3` to `Project`, assign orders to the three real projects, and export:

```ts
export const orderedProjects = [...projects].sort((a, b) => {
  const aOrder = a.featuredOrder ?? Number.POSITIVE_INFINITY;
  const bOrder = b.featuredOrder ?? Number.POSITIVE_INFINITY;
  return aOrder - bOrder;
});
```

- [ ] Run the tests and confirm the ordering assertions pass.

### Task 2: Accessible horizontal project rail

**Files:**
- Create: `app/components/ProjectRail.tsx`
- Modify: `app/page.tsx`
- Modify: `app/globals.css`
- Modify: `tests/portfolio-content.test.mjs`

**Interfaces:**
- Consumes: `orderedProjects: Project[]`
- Produces: `ProjectRail({ projects }: { projects: Project[] })`

- [ ] Add failing source tests for a labelled rail, previous/next controls, factual project heading, hover preview cue, and CSS scroll snapping.
- [ ] Run the tests and confirm those assertions fail.
- [ ] Create a client component with a `ref` to the rail and buttons that call:

```ts
rail.current?.scrollBy({
  left: direction * rail.current.clientWidth * 0.82,
  behavior: reduceMotion ? "auto" : "smooth",
});
```

- [ ] Render each project as a card containing `HoverVideoPreview`, metadata, title, summary, tags, and case-study link.
- [ ] Replace the current vertical mapping in `app/page.tsx` with `ProjectRail projects={orderedProjects}` and plain heading copy.
- [ ] Add spacious card sizing, `overflow-x: auto`, `scroll-snap-type: x proximity`, visible focus states, responsive widths, touch scrolling, and a reduced-motion fallback.
- [ ] Run tests and the static build.

### Task 3: Colour and copy cleanup

**Files:**
- Modify: `app/globals.css`
- Modify: `app/page.tsx`
- Modify: `app/projects/[slug]/page.tsx`
- Modify: `tests/portfolio-content.test.mjs`

**Interfaces:**
- Consumes existing CSS custom properties.
- Produces one accent token family and recruiter-readable headings.

- [ ] Add failing tests that reject `--accent-blue`, multiple accent hues, and known slogan copy.
- [ ] Run the tests and confirm they fail.
- [ ] Replace the colour tokens with:

```css
--background: #0d1017;
--surface: #151923;
--surface-raised: #1b202c;
--text: #f3f4f7;
--muted: #aeb4c0;
--line: #303747;
--accent: #9c8cff;
--accent-strong: #b2a7ff;
```

- [ ] Replace cyan/violet references with role-based accent usage and retain neutral surfaces.
- [ ] Replace slogan-like section/footer headings with short literal headings.
- [ ] Run the tests and build again.

### Task 4: One-page CV

**Files:**
- Create: `scripts/build_cv.py`
- Create: `public/files/vladut-andrei-lambru-resume.docx`
- Replace: `public/files/vladut-andrei-lambru-resume.pdf`
- Modify: `tests/portfolio-content.test.mjs`

**Interfaces:**
- Produces an editable DOCX and its matching public PDF.

- [ ] Add failing tests checking that both formats exist and extracted PDF text contains the portfolio URL, selected project titles, Unity, C#, VR/XR, Git, and February 2027, while rejecting Europass, `lvmbrxu`, birth details, and generic claims.
- [ ] Run tests and confirm CV assertions fail.
- [ ] Build a one-page A4 document with a compact name/contact header, factual profile, three selected projects, education, skills, certificates, and additional experience.
- [ ] Use the Hanze email and full GitHub, LinkedIn, and portfolio URLs as clickable links.
- [ ] Render the DOCX with the document skill renderer and inspect the entire page at 100%.
- [ ] Adjust spacing and typography until nothing clips and the page remains one page.
- [ ] Export the final PDF, run metadata/privacy checks, and rerun content tests.

### Task 5: Maintenance documentation and deployment

**Files:**
- Modify: `README.md`
- Modify: `.gitignore`
- Modify: repository source files from Tasks 1–4

**Interfaces:**
- Documents the `featuredOrder`, image, YouTube, Vimeo, and MP4 workflow.

- [ ] Add README examples showing one complete project entry, top-three ordering, image placement, supported video objects, local commands, and GitHub Pages deployment.
- [ ] Ignore `.superpowers/` and local mockup/render artifacts.
- [ ] Run `node --test tests/*.test.mjs`.
- [ ] Run `NEXT_PUBLIC_BASE_PATH=/Portfolio node_modules/.bin/next build`.
- [ ] Confirm all static routes generate and inspect output for correct `/Portfolio/` paths.
- [ ] Push verified files to `Vladut-Andrei-Lambru/Portfolio` on `main` using the connected GitHub tools.
- [ ] Wait for GitHub Pages workflows to complete successfully.
- [ ] Verify the live homepage, project routes, videos, downloadable PDF, downloadable DOCX, and new project ordering.

## Self-review

- Spec coverage: project ordering, horizontal rail, hover behaviour, palette, copy, CV, README, accessibility, tests, push, and live verification are each assigned to a task.
- Placeholder scan: no implementation placeholders remain.
- Type consistency: `featuredOrder`, `orderedProjects`, and `ProjectRail` use the same names throughout.
