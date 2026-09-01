# Vladut-Andrei Lambru — Portfolio

Personal portfolio for my gameplay programming, technical design and VR work.

Built with Next.js and TypeScript and deployed automatically with GitHub Pages.

[View the live website](https://vladut-andrei-lambru.github.io/Portfolio/) · [Contact me](mailto:v.lambru@st.hanze.nl)

## Editing

- `app/page.tsx` — homepage content
- `lib/projects.ts` — every project, its position, links, images and videos
- `app/globals.css` — colours and layout
- `public/images/` — portfolio media
- `public/files/` — the public PDF résumé and editable DOCX

## Adding a project

Add one object to the `projects` array in `lib/projects.ts`. The homepage card and the full case-study route are generated from the same data.

```ts
{
  slug: "project-url",
  title: "Project title",
  year: "2026",
  engine: "Unity",
  duration: "8 weeks",
  team: "5 people",
  hero: "/images/project-folder/hero.jpg",
  images: [
    "/images/project-folder/hero.jpg",
    "/images/project-folder/01.jpg",
  ],
  videos: [
    { type: "youtube", src: "YOUTUBE_VIDEO_ID", title: "Gameplay" },
  ],
  summary: "One sentence explaining the game and your contribution.",
  brief: "What the project needed to achieve.",
  development: "How the design changed during development and testing.",
  role: "What you personally implemented and what belonged to the team.",
  tags: ["Unity", "C#", "Gameplay programming"],
  links: [{ label: "GitHub", href: "https://github.com/..." }],
  systems: [
    {
      title: "System name",
      description: "How the system works.",
      details: ["Concrete detail", "Concrete detail"],
    },
  ],
  outcome: "What was delivered or learned from testing.",
  learning: "The main technical or design lesson.",
}
```

Put its media in `public/images/project-folder/`. Keep gameplay videos on YouTube or Vimeo instead of committing large files to Git.

## Choosing the first three projects

Add `featuredOrder` to the projects you want shown first:

```ts
featuredOrder: 1 // first
featuredOrder: 2 // second
featuredOrder: 3 // third
```

Remove `featuredOrder` from every other project. Unnumbered projects automatically follow the top three in the order they appear in the file.

## Video options

```ts
{ type: "youtube", src: "VIDEO_ID", title: "Gameplay" }
{ type: "vimeo", src: "VIDEO_ID", title: "Development walkthrough" }
{ type: "mp4", src: "/videos/project/gameplay.mp4", title: "Gameplay", poster: "/images/project/poster.jpg" }
```

The first YouTube video becomes the muted desktop hover preview. Touch devices and visitors using reduced-motion settings keep the still image. All videos appear with controls on the project page.

## Updating the CV

Edit `scripts/build_cv.py`, then run:

```bash
python scripts/build_cv.py
```

The editable file is `public/files/vladut-andrei-lambru-resume.docx`. Export the finished one-page document as `public/files/vladut-andrei-lambru-resume.pdf`; the website always links to that filename.

## Running locally

Use Node.js 22 or newer:

```bash
npm ci
npm run dev
```

Before pushing:

```bash
npm test
NEXT_PUBLIC_BASE_PATH=/Portfolio npm run build
```

Pushing to `main` triggers the GitHub Pages workflow in `.github/workflows/deploy-pages.yml`.

## Security headers

GitHub Pages does not apply custom response headers, so the live GitHub Pages build uses the protections that static HTML can set: a Content Security Policy meta tag and a strict referrer meta tag in `app/layout.tsx`.

The CSP keeps external scripts on this site’s own origin and allows frames only from YouTube’s privacy-enhanced domain and Vimeo. Next.js needs inline hydration scripts, so `'unsafe-inline'` remains enabled for inline scripts; removing it would break the project rail and hover previews.

`public/_headers` is included for a possible Netlify deployment. Netlify reads that file and can send the full policy as HTTP response headers, including `X-Content-Type-Options`, `Permissions-Policy`, `X-Frame-Options` and `frame-ancestors`. GitHub Pages serves the file but does not enforce it.

The GitHub and LinkedIn marks in `public/icons/` are locally hosted copies from [Simple Icons](https://simpleicons.org/), so the live site does not depend on an icon CDN.
