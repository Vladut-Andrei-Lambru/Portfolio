export type ProjectVideo = { type: "youtube" | "vimeo" | "mp4"; src: string; title: string; poster?: string };
export type Project = {
  slug: string; title: string; year: string; engine: string; duration: string; team: string;
  hero: string; images: string[]; video?: ProjectVideo; summary: string; brief: string; role: string;
  tags: string[]; links: { label: string; href: string }[];
  systems: { title: string; description: string; details: string[] }[]; outcome: string; learning: string;
};

export const projects: Project[] = [
  {
    slug: "virtual-life-support", title: "Virtual Life Support", year: "2026", engine: "Unity VR · Meta Quest", duration: "8 weeks", team: "5 people",
    hero: "/images/virtual-life-support/hero.jpg", images: ["/images/virtual-life-support/hero.jpg", "/images/virtual-life-support/01.png"],
    summary: "A hand-tracked VR scenario designed to help CPR-trained people feel more confident using those skills in an emergency.",
    brief: "This university project was developed with Virtual Life Support, a Dutch company working in VR CPR training. We began by speaking with CPR trainers and people who had experience with the procedure. Their feedback shaped the hand placement, order of actions, distractions and feedback shown during the scenario. We built a new scenario from scratch without technical support from the company, then tested it with CPR-trained users and made a final round of changes.",
    role: "I worked mainly on the programming: hand placement, chest compressions, scenario logic, gestures, the live CPR monitor and the results screen. I also helped turn research findings into concrete interactions. This was a five-person project, and the final prototype was a team result.",
    tags: ["Unity", "C#", "VR", "Hand tracking", "User testing"],
    links: [{ label: "Virtual Life Support", href: "https://virtuallifesupport.eu/" }, { label: "LinkedIn project post", href: "https://www.linkedin.com/feed/update/urn:li:activity:7419451513338548224/" }],
    systems: [
      { title: "Hand-tracked chest compressions", description: "Both hands must be in the correct position before a compression is accepted. Hand movement is translated into compression depth, while the monitor reports rhythm and depth during the exercise.", details: ["Two-hand placement checks", "Continuous compression depth", "Immediate rhythm and depth feedback"] },
      { title: "A complete CPR sequence", description: "A flag-based scenario system keeps the training steps in order. The player must call 112, ask someone to bring an AED and begin CPR before later events can happen. A barking dog and nearby children interrupt the exercise; once the AED arrives, the player exposes and dries the chest, follows its instructions and continues until the ambulance arrives.", details: ["Ordered actions without one long script", "Dog and children as interruptions", "AED preparation includes drying blood from the chest"] },
      { title: "Progress and scoring stay separate", description: "Scenario flags decide which actions and events can happen, but they do not inflate the performance score. The result is based on compression depth, rhythm, and active CPR time. An in-world monitor gives immediate feedback, followed by a results screen after the scenario.", details: ["Separate scenario and scoring logic", "Live in-world monitor", "Post-scenario performance summary"] },
    ],
    outcome: "We did not have access to a CPR manikin, so we used a pillow to give testers physical resistance while keeping the hand-tracked interaction visible in VR. The prototype received 11/12 and was selected as the strongest of five student prototypes. Our company contact told us the result was substantially better than he had expected from the brief.",
    learning: "The research mattered most when it changed the interaction. Adding the wet or bloody chest step, separating scenario progress from scoring and keeping feedback visible during CPR all came from looking beyond the first version of the idea.",
  },
  {
    slug: "tiny-spider-tiny-home", title: "Tiny Spider Tiny Home", year: "2025", engine: "Unity", duration: "15 weeks", team: "5 people",
    hero: "/images/tiny-spider/hero.jpg", images: ["/images/tiny-spider/hero.jpg", "/images/tiny-spider/01.png", "/images/tiny-spider/02.png", "/images/tiny-spider/03.png", "/images/tiny-spider/04.png", "/images/tiny-spider/05.png", "/images/tiny-spider/06.png", "/images/tiny-spider/07.png", "/images/tiny-spider/08.png"],
    summary: "A third-person game about a spider racing through a student room to switch off appliances before the tenant comes home.",
    brief: "The brief asked us to make household energy use easier to understand through a game. The tenant is forgetful, wastes electricity and risks being evicted when the bills become unaffordable. That would also leave the spider without a warm home. After a short introduction, the player has a limited amount of time to cross the room and switch everything off before the student returns.",
    role: "I built the movement, surface detection, camera collision, web swing and appliance interactions in C#. I also worked on the level design, UI/UX, intro flow and smaller interactions such as the active heater launching the spider. I implemented the screen-space edge-detection outline used for the cartoon look. I did not create the art assets; this was a team project.",
    tags: ["Unity", "C#", "Character controller", "Camera", "Physics"],
    links: [{ label: "Team GitHub repository", href: "https://github.com/DylanoSpks/Tiny-Spider-Tiny-Home" }, { label: "Download build", href: "https://www.dropbox.com/scl/fi/wrz5v9rhpgfmupac32r56/TinySpiderTinyHome.exe?rlkey=kox9tyhxfy50000pahcybk43i&st=15tt0pub&dl=0" }],
    systems: [
      { title: "One controller for every surface", description: "The controller uses raycasts to find the current surface normal, aligns the spider to it and projects camera-relative movement onto that plane. Floors, walls and ceilings therefore use the same movement rules instead of separate modes.", details: ["Raycast and sphere-cast surface checks", "Movement projected onto the surface", "Custom force keeps the spider attached"] },
      { title: "A camera that stays readable", description: "The spider turns to match the surface, but the third-person camera does not roll with it. Mouse orbit stays level, vertical movement is clamped and a line cast pulls the camera in when furniture blocks the view.", details: ["Independent camera orientation", "Collision-aware follow distance", "Smoothed spider alignment at corners"] },
      { title: "Web swing and room interactions", description: "The web attaches at the point selected through the camera and creates a SpringJoint for the swing. Normal crawling pauses while the web is attached. Appliances share a common interaction route, while individual objects can still behave differently—the powered heater, for example, launches the spider upward.", details: ["Physics-based SpringJoint swing", "Reusable interaction interface", "Object-specific responses"] },
    ],
    outcome: "The finished room combines a timed objective with movement that makes the player think at a spider's scale. We had planned to expand the game, but team issues forced us to reduce the scope and finish the strongest part: traversal through one detailed student room.",
    learning: "The difficult part was not making the spider move once; it was keeping that movement predictable at corners, on ceilings and around furniture. Treating every crawlable wall as a surface and keeping the camera independent from the spider's roll made the final controller much easier to read.",
  },
  {
    slug: "makers-fair", title: "Maker’s Fair", year: "2025", engine: "Unity VR · Meta Quest 3", duration: "8 weeks", team: "5 people",
    hero: "/images/makers-fair/hero.jpg", images: ["/images/makers-fair/hero.jpg", "/images/makers-fair/01.jpg", "/images/makers-fair/02.png", "/images/makers-fair/03.png", "/images/makers-fair/04.png"],
    summary: "A VR construction game where the player builds a cart from planks, nails and wheels, then tests it against a bridge's weight limit.",
    brief: "The game is set thirty years into the future, after dependence on AI has caused practical skills such as woodworking and metalworking to disappear. Older makers organise a fair to teach those skills to a younger generation. We originally imagined several craft areas, but the eight-week schedule led us to build one woodworking level properly instead of several unfinished ones.",
    role: "I was the lead programmer and built the construction mechanics, level flow, guidance and UI/UX. I also worked on the level design and final bridge challenge. I did not create the art assets; the project was made by a five-person team.",
    tags: ["Unity", "C#", "VR physics", "XR Interaction Toolkit", "Technical design"], links: [{ label: "GitHub", href: "https://github.com/Vladut-Andrei-Lambru/Makers-Fair" }],
    systems: [
      { title: "Building without fixed recipes", description: "The player can position planks, hammer nails and attach wheels instead of selecting a finished cart. The system keeps connected parts together while still allowing the object to react to gravity and player movement.", details: ["Runtime construction groups", "Hammer and nail validation", "Player-positioned parts"] },
      { title: "Making experimentation understandable", description: "The first version gave almost no guidance because we wanted the freedom of building with LEGO. Playtests showed that this was too vague, so we added blueprints and contextual holograms—for example, picking up a wheel reveals a possible attachment point.", details: ["Feedback added after playtesting", "Contextual placement holograms", "Guidance without removing free building"] },
      { title: "Stable plank connections", description: "Joining several player-positioned planks into one physics object was the hardest problem. Early carts separated or became unstable as gravity, wheels and new parts affected the joints. I repeatedly adjusted how groups merge and when objects behave physically until the cart could survive the final test.", details: ["Dynamic group merging", "Controlled physics-state changes", "Repeated stress testing"] },
    ],
    outcome: "Every plank, wheel and nail contributes weight. The cart must stay below the bridge's weight limit and remain intact long enough to cross. That constraint turned an open construction toy into a clear final challenge.",
    learning: "Open-ended building needs readable feedback, especially in VR. The project also taught me that stable physics often comes from carefully controlling when connected objects are simulated, not simply increasing joint strength.",
  },
];

export function getProject(slug: string) { return projects.find((project) => project.slug === slug); }
