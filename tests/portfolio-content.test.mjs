import test from "node:test";
import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import { execFile } from "node:child_process";
import { promisify } from "node:util";

const read = (path) => readFile(new URL(`../${path}`, import.meta.url), "utf8");
const execFileAsync = promisify(execFile);

test("homepage uses the professional contact and current identity", async () => {
  const page = await read("app/page.tsx");
  assert.match(page, /mailto:v\.lambru@st\.hanze\.nl/);
  assert.match(page, /github\.com\/Vladut-Andrei-Lambru/);
  assert.doesNotMatch(page, /lvmbrxu|wixsite/i);
  assert.match(page, /aria-label="GitHub profile"/);
  assert.match(page, /aria-label="LinkedIn profile"/);
  assert.match(page, /className="social-icon"/);
  assert.match(page, />Résumé</);
  assert.doesNotMatch(page, /className="header-contact" href="mailto:/);
});

test("social links use locally hosted standardized brand marks", async () => {
  const page = await read("app/page.tsx");
  await access(new URL("../public/icons/github.svg", import.meta.url));
  await access(new URL("../public/icons/linkedin.svg", import.meta.url));
  assert.match(page, /icons\/github\.svg/);
  assert.match(page, /icons\/linkedin\.svg/);
  assert.doesNotMatch(page, /function GitHubIcon|function LinkedInIcon/);
});

test("static export includes GitHub Pages-compatible security metadata", async () => {
  const layout = await read("app/layout.tsx");
  assert.match(layout, /httpEquiv="Content-Security-Policy"/);
  assert.match(layout, /script-src 'self' 'unsafe-inline'/);
  assert.match(layout, /frame-src https:\/\/www\.youtube-nocookie\.com https:\/\/player\.vimeo\.com/);
  assert.match(layout, /name="referrer" content="strict-origin-when-cross-origin"/);
});

test("Netlify migration headers include the full response-header policy", async () => {
  const headers = await read("public/_headers");
  const readme = await read("README.md");
  assert.match(headers, /X-Content-Type-Options: nosniff/);
  assert.match(headers, /Referrer-Policy: strict-origin-when-cross-origin/);
  assert.match(headers, /Permissions-Policy: camera=\(\), microphone=\(\), geolocation=\(\)/);
  assert.match(headers, /Content-Security-Policy:.*script-src 'self' 'unsafe-inline'/);
  assert.match(readme, /GitHub Pages does not apply custom response headers/i);
  assert.match(readme, /_headers/);
});

test("education shows the official Hanze and SeoulTech marks", async () => {
  const page = await read("app/page.tsx");
  assert.match(page, /images\/education\/hanze\.svg/);
  assert.match(page, /images\/education\/seoultech\.png/);
  assert.match(page, /className="education-logo"/);
  assert.match(page, /logoAlt: "Hanze University of Applied Sciences"/);
  assert.match(page, /logoAlt: "SeoulTech"/);
  assert.match(page, /alt=\{item\.logoAlt\}/);
});

test("visual system is dark, restrained and motion-aware", async () => {
  const css = await read("app/globals.css");
  assert.match(css, /--background:\s*#0d1017/i);
  assert.match(css, /--surface:\s*#151923/i);
  assert.match(css, /--surface-raised:\s*#1b202c/i);
  assert.match(css, /--text:\s*#f3f4f7/i);
  assert.match(css, /--muted:\s*#aeb4c0/i);
  assert.match(css, /--accent:\s*#9c8cff/i);
  assert.match(css, /--accent-strong:\s*#b2a7ff/i);
  assert.doesNotMatch(css, /accent-(?:blue|violet|magenta)/i);
  assert.match(css, /prefers-reduced-motion:\s*reduce/);
  assert.match(css, /caret-color:\s*transparent/);
  assert.match(css, /scroll-snap-type:\s*x proximity/);
  assert.match(css, /\.portrait-frame:hover img/);
});

test("homepage copy is direct and recruiter-facing", async () => {
  const page = await read("app/page.tsx");
  assert.match(page, /Technical Game Designer & Gameplay Programmer/);
  assert.match(page, /Unity, C# and VR development/);
  assert.match(page, />Projects</);
  assert.match(page, /Unity, C# and VR work from university and client projects/);
  assert.match(page, /Role and tools/);
  assert.doesNotMatch(page, /<h2>Gameplay and interaction systems|Interested in working together|actually talk through|what broke|before they can explain it|finished developer/i);
});

test("project data makes the top three easy to change", async () => {
  const projects = await read("lib/projects.ts");
  assert.match(projects, /featuredOrder\?:\s*1\s*\|\s*2\s*\|\s*3/);
  assert.equal((projects.match(/featuredOrder:\s*[123]/g) ?? []).length, 3);
  assert.match(projects, /export const orderedProjects/);
  assert.match(projects, /Number\.POSITIVE_INFINITY/);
});

test("homepage uses an accessible horizontal project rail", async () => {
  const page = await read("app/page.tsx");
  const rail = await read("app/components/ProjectRail.tsx");
  const css = await read("app/globals.css");

  assert.match(page, /<ProjectRail projects=\{orderedProjects\}/);
  assert.match(rail, /aria-label="Previous projects"/);
  assert.match(rail, /aria-label="Next projects"/);
  assert.match(rail, /aria-label="Project case studies"/);
  assert.match(rail, /scrollBy/);
  assert.match(rail, /clientWidth \* 0\.82/);
  assert.match(css, /overflow-x:\s*auto/);
  assert.match(css, /scroll-snap-align:\s*start/);
  assert.match(css, /\.project-rail-card/);
});

test("homepage avoids numbered template sections", async () => {
  const page = await read("app/page.tsx");
  assert.doesNotMatch(page, /section-number/);
  assert.doesNotMatch(page, />0[123]</);
});

test("project pages support multiple videos without forced playback", async () => {
  const projectPage = await read("app/projects/[slug]/page.tsx");
  const projectData = await read("lib/projects.ts");
  assert.match(projectData, /"youtube"\s*\|\s*"vimeo"\s*\|\s*"mp4"/);
  assert.match(projectData, /videos\?:\s*ProjectVideo\[\]/);
  assert.match(projectData, /vG7jiHwuDTQ/);
  assert.match(projectData, /CfQb3SuM-Os/);
  assert.match(projectData, /tFO7g93U6ew/);
  assert.match(projectData, /34psfsuSL3U/);
  assert.match(projectData, /B_9jCtzeDWo/);
  assert.match(projectPage, /youtube-nocookie\.com/);
  assert.match(projectPage, /referrerPolicy="strict-origin-when-cross-origin"/);
  assert.match(projectPage, /project\.videos\.map/);
  assert.doesNotMatch(projectPage, /autoplay=1/);
  assert.doesNotMatch(projectPage, /section-number/);
  assert.match(projectPage, />Résumé</);
  assert.doesNotMatch(projectPage, /Email me/);
});

test("homepage uses accessible hover video previews", async () => {
  const page = await read("app/page.tsx");
  const rail = await read("app/components/ProjectRail.tsx");
  const preview = await read("app/components/HoverVideoPreview.tsx");
  const css = await read("app/globals.css");

  assert.match(page, /ProjectRail/);
  assert.match(rail, /HoverVideoPreview/);
  assert.match(preview, /onPointerEnter/);
  assert.match(preview, /onPointerLeave/);
  assert.match(preview, /\(hover: hover\)/);
  assert.match(preview, /prefers-reduced-motion: reduce/);
  assert.match(preview, /autoplay=1/);
  assert.match(preview, /mute=1/);
  assert.match(preview, /youtube-nocookie\.com/);
  assert.match(css, /\.hover-video-preview/);
});

test("project case studies describe the verified work and ownership clearly", async () => {
  const projects = await read("lib/projects.ts");
  const projectPage = await read("app/projects/[slug]/page.tsx");

  assert.match(projects, /development:/);
  assert.match(projectPage, /How it developed/);

  assert.match(projects, /DylanoSpks\/Tiny-Spider-Tiny-Home/);
  assert.match(projects, /surface normal/);
  assert.match(projects, /SpringJoint/);
  assert.match(projects, /screen-space edge-detection outline/);
  assert.match(projects, /I did not create the art assets/);

  assert.match(projects, /call 112/);
  assert.match(projects, /compression depth, rhythm, and active CPR time/);
  assert.match(projects, /pillow/);

  assert.match(projects, /thirty years in(?:to)? the future/);
  assert.match(projects, /bridge's weight limit/);
  assert.match(projects, /I did not create the art assets/);
});

test("repository source contains no stale public identity", async () => {
  const files = await Promise.all([
    read("app/page.tsx"),
    read("app/projects/[slug]/page.tsx"),
    read("lib/projects.ts"),
    read("README.md"),
  ]);
  assert.doesNotMatch(files.join("\n"), /lvmbrxu|vladlambru\.wixsite\.com/i);
});

test("security guidance uses a private reporting route", async () => {
  const security = await read("SECURITY.md");
  assert.match(security, /v\.lambru@st\.hanze\.nl/);
  assert.match(security, /do not open a public issue/i);
});

test("public repository readmes point recruiters to the current portfolio", async () => {
  const names = ["VRLifeSupport-Block2", "Makers-Fair", "CyberSecurity-InfraRED", "Unreal-Elective", "Vladut-Andrei-Lambru"];
  for (const name of names) {
    const markdown = await read(`../repo-readmes/${name}/README.md`);
    assert.match(markdown, /https:\/\/vladut-andrei-lambru\.github\.io\/Portfolio\//, name);
    assert.match(markdown, /v\.lambru@st\.hanze\.nl/, name);
  }
});

test("public CV is a one-page project-first document with an editable source", async () => {
  const pdf = new URL("../public/files/vladut-andrei-lambru-resume.pdf", import.meta.url);
  const docx = new URL("../public/files/vladut-andrei-lambru-resume.docx", import.meta.url);
  await access(docx);
  const { stdout: info } = await execFileAsync("pdfinfo", [pdf.pathname]);
  const { stdout: content } = await execFileAsync("pdftotext", [pdf.pathname, "-"]);

  assert.match(info, /Pages:\s+1/);
  for (const phrase of ["Virtual Life Support", "Tiny Spider Tiny Home", "Maker's Fair", "Unity", "C#", "VR/XR", "Git", "February 2027", "vladut-andrei-lambru.github.io/Portfolio"])
    assert.match(content, new RegExp(phrase.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "i"), phrase);
  assert.doesNotMatch(content, /Europass|lvmbrxu|date of birth|nationality|passionate|energetic|always up for a challenge/i);
});
