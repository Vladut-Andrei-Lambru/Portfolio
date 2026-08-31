# Project rail and CV redesign

## Goal

Make the portfolio easier to extend beyond three projects without weakening the first recruiter scan, while replacing the outdated Europass résumé with a concise one-page CV.

## Homepage project system

- Every entry in `lib/projects.ts` remains a full project with its own case-study route.
- Projects receive an optional `featuredOrder` value of `1`, `2`, or `3`.
- The homepage sorts numbered projects first in ascending order, followed by all unnumbered projects in their existing data order.
- The work section is one horizontal, scrollable rail. It shows about three cards on a wide desktop and slightly more than one card on a phone so the continuation is visible.
- Previous and next buttons provide an obvious mouse and keyboard control. Trackpad, wheel-shift, touch dragging, and native horizontal scrolling remain available.
- CSS scroll snapping uses `proximity`, not forced snapping, so users can stop naturally.
- Cards use more internal spacing and shorter copy than the mockup. The heading is plain: `Projects`, followed by a factual description of the work.
- A project image remains visible until a fine pointer hovers over the card media. Hovering starts the first muted video and displays a small `Gameplay preview` cue.
- Touch devices and reduced-motion users keep the still image. No video starts merely because a card enters the viewport.
- Temporary duplicate projects used in the mockup are not published.

## Visual system

- Preserve the current near-black `#0d1017` page background.
- Remove the competing cyan and magenta/violet accents.
- Use one restrained periwinkle family, centered around `#9c8cff`, for interactive emphasis, labels, focus rings, and small decorative details.
- Use cool neutral surfaces and off-white text. Body text and controls must meet WCAG 2.2 AA contrast requirements.
- Project imagery remains the strongest colour on the page.
- Existing portrait, university logos, case studies, social icons, and responsive structure remain.
- Copy must be literal and recruiter-readable. Remove slogan patterns, rhetorical fragments, and claims unsupported by project evidence.

## CV

- Create a one-page A4 CV in editable DOCX and final PDF formats.
- Replace the public file at `public/files/vladut-andrei-lambru-resume.pdf` with the new PDF.
- Header: Vladut-Andrei Lambru, Technical Game Designer / Gameplay Programmer, Hanze email, portfolio, GitHub, and LinkedIn.
- Do not include a photo, age, date of birth, nationality, full street address, or the old `lvmbrxu` handle.
- Use a two- or three-sentence factual profile covering CMGT, Unity/C#, gameplay systems, VR interaction, the SeoulTech exchange, and February 2027 availability.
- Lead with selected projects: Virtual Life Support, Tiny Spider Tiny Home, and Maker's Fair. Each entry states role, tools, concrete systems, and a result or constraint.
- Add compact education, technical skills, certificates, and additional experience sections.
- Do not use self-assigned proficiency bars, keyword clouds, generic soft-skill claims, or unsupported metrics.
- Use searchable industry terms naturally: Unity, C#, gameplay programming, technical design, VR/XR, interaction systems, prototyping, physics, cameras, user testing, Git, and Unreal Engine.

## Maintainability

- `lib/projects.ts` remains the only file needed to add, remove, or reorder projects.
- The `Project` type documents `featuredOrder` and video options.
- The README explains how to add a project, set the top three, add images, add YouTube/Vimeo/MP4 media, and test locally.

## Verification

- Automated tests cover featured ordering, valid unique feature numbers, project video data, copy constraints, and résumé links.
- Run the full test suite and the exact GitHub Pages production build with `/Portfolio` as the base path.
- Check horizontal overflow and card sizing at phone, tablet, and desktop widths.
- Verify keyboard focus, button labels, hover-only video behaviour, touch fallback, and reduced-motion fallback.
- Render the DOCX to images and inspect the full page before exporting the replacement PDF.
- Push only verified source and deploy through GitHub Pages. Confirm that the workflow succeeds and the live site serves the new project rail and résumé.
