import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const read = (path) => readFile(new URL(`../${path}`, import.meta.url), "utf8");

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
  assert.match(css, /--surface:\s*#151a26/i);
  assert.match(css, /--surface-raised:\s*#1c2230/i);
  assert.match(css, /--text:\s*#f2f4f8/i);
  assert.match(css, /--muted:\s*#a7b0c0/i);
  assert.match(css, /--accent-violet:\s*#8b7cff/i);
  assert.match(css, /--accent-blue:\s*#45c4ff/i);
  assert.doesNotMatch(css, /accent-magenta/i);
  assert.match(css, /prefers-reduced-motion:\s*reduce/);
  assert.match(css, /caret-color:\s*transparent/);
  assert.match(css, /\.project-card:nth-child\(2\)/);
  assert.match(css, /\.portrait-frame:hover img/);
});

test("homepage copy is direct and recruiter-facing", async () => {
  const page = await read("app/page.tsx");
  assert.match(page, /Technical Game Designer & Gameplay Programmer/);
  assert.match(page, /Unity, C# and VR development/);
  assert.match(page, /Selected projects/);
  assert.match(page, /Role and tools/);
  assert.doesNotMatch(page, /actually talk through|what broke|before they can explain it|finished developer/i);
});

test("homepage avoids numbered template sections", async () => {
  const page = await read("app/page.tsx");
  assert.doesNotMatch(page, /section-number/);
  assert.doesNotMatch(page, />0[123]</);
});

test("project pages support video without fake UI", async () => {
  const projectPage = await read("app/projects/[slug]/page.tsx");
  const projectData = await read("lib/projects.ts");
  assert.match(projectData, /"youtube"\s*\|\s*"vimeo"\s*\|\s*"mp4"/);
  assert.match(projectPage, /youtube-nocookie\.com/);
  assert.match(projectPage, /referrerPolicy="strict-origin-when-cross-origin"/);
  assert.doesNotMatch(projectPage, /section-number/);
  assert.match(projectPage, />Résumé</);
  assert.doesNotMatch(projectPage, /Email me/);
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
