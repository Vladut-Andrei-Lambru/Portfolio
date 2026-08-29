# Vlad Lambru — Portfolio

Editable Next.js portfolio configured for GitHub Pages.

## Local editing

Install Node.js 22.13+ and run:

```bash
npm install
npm run dev
```

Then open the local URL printed in the terminal.

## Main files to edit

- `app/page.tsx` — homepage text/layout
- `lib/projects.ts` — project content
- `app/globals.css` — styling
- `public/images/` — images
- `public/files/vladut-andrei-lambru-resume.pdf` — résumé

## Deployment

This repository includes `.github/workflows/deploy-pages.yml`.

In GitHub:
1. Settings → Pages.
2. Under **Build and deployment**, choose **GitHub Actions**.
3. Push/commit to `main`, or run the workflow manually from Actions.

The configuration automatically handles both:
- a project repo such as `Website` → `https://USERNAME.github.io/Website/`
- a user Pages repo such as `USERNAME.github.io` → `https://USERNAME.github.io/`
