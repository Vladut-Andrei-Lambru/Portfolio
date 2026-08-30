import type { Project } from "./projects";

type Presentation = {
  category: string;
  theme: "theme-blue" | "theme-violet" | "theme-amber";
  stack: string;
  roleSummary: string;
  highlight: string;
  alt: string;
};

const presentation: Record<string, Presentation> = {
  "virtual-life-support": {
    category: "Client VR training prototype",
    theme: "theme-blue",
    stack: "Unity · C# · Meta Quest",
    roleSummary: "CPR interaction and hand validation · BPM, depth and quality feedback · Reusable scenario progression logic",
    highlight: "11/12 · Selected as the strongest of five prototypes",
    alt: "Virtual Life Support CPR training scene running on a Meta Quest headset",
  },
  "tiny-spider-tiny-home": {
    category: "3D traversal game",
    theme: "theme-violet",
    stack: "Unity · C#",
    roleSummary: "Traversal across floors, walls and slopes · Web-swing and camera behaviour · Player interaction flow and prompts",
    highlight: "Surface movement · Web swing · Camera · Interaction",
    alt: "Tiny Spider Tiny Home gameplay showing the spider inside a student room",
  },
  "makers-fair": {
    category: "VR construction game",
    theme: "theme-amber",
    stack: "Unity · C# · Meta Quest 3",
    roleSummary: "Runtime construction groups · Hammer, nail and wheel interactions · Physics-based success and failure test",
    highlight: "Runtime structures · Physical tools · Stress test",
    alt: "Maker’s Fair VR construction scene with planks, nails and tools",
  },
};

export function getPresentation(project: Project) {
  return presentation[project.slug];
}

export function getDisplayLinks(project: Project) {
  if (project.slug === "makers-fair") {
    return [{ label: "GitHub repository", href: "https://github.com/Vladut-Andrei-Lambru/Makers-Fair" }];
  }
  if (project.slug === "tiny-spider-tiny-home") {
    return [
      { label: "GitHub repository", href: "https://github.com/DylanoSpks/Tiny-Spider-Tiny-Home" },
      { label: "Download Windows build", href: "https://www.dropbox.com/scl/fi/wrz5v9rhpgfmupac32r56/TinySpiderTinyHome.exe?rlkey=kox9tyhxfy50000pahcybk43i&st=15tt0pub&dl=0" },
    ];
  }
  return project.links;
}
