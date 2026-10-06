export type ProjectVideo = {
  type: "youtube" | "vimeo" | "mp4";
  src: string;
  title: string;
  poster?: string;
};
export type Project = {
  slug: string;
  title: string;
  year: string;
  engine: string;
  duration: string;
  team: string;
  featuredOrder?: 1 | 2 | 3 | 4 | 5;
  hero: string;
  images: string[];
  videos?: ProjectVideo[];
  summary: string;
  contribution: string;
  brief: string;
  development: string;
  role: string;
  tags: string[];
  links: { label: string; href: string }[];
  systems: { title: string; description: string; details: string[] }[];
  outcome: string;
  learning: string;
  roleLabel?: string;
  language?: string;
  challenge?: { problem: string; decision: string; result: string };
  furtherWork?: string;
};

export const projects: Project[] = [
  {
    slug: "virtual-life-support",
    title: "Virtual Life Support",
    year: "2026",
    engine: "Unity VR · Meta Quest",
    duration: "8 weeks",
    team: "5 people",
    roleLabel: "Gameplay programmer",
    language: "C#",
    featuredOrder: 2,
    challenge: {
      "problem": "The scenario needed to guide a complete emergency response without making every interaction depend directly on the next script.",
      "decision": "I used configurable prerequisite flags to unlock behaviours and objects. Scenario progression stays separate from the compression measurements and final feedback.",
      "result": "Research and testing shaped a complete scenario, from the emergency call to the AED and ambulance. Trainers and CPR-trained testers could follow the sequence while receiving live feedback."
    },
    furtherWork: "A next step would be stronger validation of tracking and compression measurements against a physical training manikin. The pillow gave resistance during testing, but the prototype does not establish clinical accuracy.",
    hero: "/images/virtual-life-support/01.png",
    images: [
      "/images/virtual-life-support/hero.jpg",
      "/images/virtual-life-support/01.png",
      "/images/virtual-life-support/02.png",
      "/images/virtual-life-support/03.png",
      "/images/virtual-life-support/04.png",
      "/images/virtual-life-support/05.png",
    ],
    videos: [
      {
        type: "youtube",
        src: "tFO7g93U6ew",
        title: "Virtual Life Support Project",
      },
    ],
    contribution:
      "Hand tracking, chest compression, live feedback and scenario progression.",
    summary:
      "A hand-tracked VR scenario designed to help CPR-trained people feel more confident using those skills in an emergency.",
    brief:
      "Virtual Life Support asked our university team to explore how VR could help people who had already completed CPR training feel more prepared to act in real life. The goal was not to replace the course or teach the procedure from the beginning. It was to let someone practise the decisions, pressure and physical sequence of an emergency in a safe setting. We chose a public playground because it gave us room for bystanders, noise and interruptions rather than presenting CPR as an isolated exercise.",
    development:
      "We first interviewed CPR trainers and people with practical experience. That research changed the scenario: the player must call 112, ask a bystander to bring an AED and only then begin compressions. A barking dog and nearby children create interruptions that have to be handled without abandoning the casualty. When the AED arrives, the player exposes the chest and wipes away blood before placing the pads—a step we added after noticing that wet conditions were missing from the company's existing scenario. We tested the final build with CPR-trained coworkers, used their feedback for the last adjustments and kept the live monitor visible so players could correct their rhythm and depth while practising, not only after finishing.",
    role: "I worked mainly on the programming: hand placement, chest compressions, scenario logic, gestures, the live CPR monitor and the results screen. I also helped turn research findings into concrete interactions. This was a five-person project, and the final prototype was a team result.",
    tags: ["Unity", "C#", "VR", "Hand tracking", "User testing"],
    links: [
      { label: "GitHub", href: "https://github.com/Vladut-Andrei-Lambru/VRLifeSupport-Block2" },
      { label: "Virtual Life Support", href: "https://virtuallifesupport.eu/" },
      {
        label: "LinkedIn project post",
        href: "https://www.linkedin.com/feed/update/urn:li:activity:7419451513338548224/",
      },
    ],
    systems: [
      {
        title: "Hand-tracked chest compressions",
        description:
          "Both hands must be in the correct position before a compression is accepted. Hand movement is translated into compression depth, while the monitor reports rhythm and depth during the exercise.",
        details: [
          "Two-hand placement checks",
          "Continuous compression depth",
          "Immediate rhythm and depth feedback",
        ],
      },
      {
        title: "A complete CPR sequence",
        description:
          "A flag-based scenario system keeps the training steps in order. The player must call 112, ask someone to bring an AED and begin CPR before later events can happen. A barking dog and nearby children interrupt the exercise; once the AED arrives, the player exposes and dries the chest, follows its instructions and continues until the ambulance arrives.",
        details: [
          "Ordered actions without one long script",
          "Dog and children as interruptions",
          "AED preparation includes drying blood from the chest",
        ],
      },
      {
        title: "Progress and scoring stay separate",
        description:
          "Scenario flags decide which actions and events can happen, but they do not inflate the performance score. The result is based on compression depth, rhythm, and active CPR time. An in-world monitor gives immediate feedback, followed by a results screen after the scenario.",
        details: [
          "Separate scenario and scoring logic",
          "Live in-world monitor",
          "Post-scenario performance summary",
        ],
      },
    ],
    outcome:
      "We did not have access to a CPR manikin, so we used a pillow to give testers physical resistance while keeping the hand-tracked interaction visible in VR. The prototype received 11/12 and was selected as the strongest of five student prototypes. Our company contact told us the result was substantially better than he had expected from the brief.",
    learning:
      "The research mattered most when it changed the interaction. Adding the wet or bloody chest step, separating scenario progress from scoring and keeping feedback visible during CPR all came from looking beyond the first version of the idea.",
  },
  {
    slug: "tiny-spider-tiny-home",
    title: "Tiny Spider Tiny Home",
    year: "2025",
    engine: "Unity",
    duration: "15 weeks",
    team: "5 people",
    roleLabel: "Gameplay programmer",
    language: "C#",
    featuredOrder: 1,
    challenge: {
      "problem": "The main movement challenge was detecting transitions between floors, walls and ceilings while keeping the camera understandable. Separate rules for each surface would have made those transitions harder to maintain.",
      "decision": "I used surface normals to align the spider and project camera-relative input. The camera keeps zero roll, and crawling pauses during the SpringJoint web swing so the movement systems do not compete.",
      "result": "The final controller supports traversal around the student room, with a camera that checks for furniture between it and the spider. Corners and surface transitions remained the main areas to tune."
    },
    furtherWork: "The next improvement would be consolidating surface detection into one shared result for movement and visual alignment, then testing difficult corners and the handoff between swinging and crawling.",
    hero: "/images/tiny-spider/05.png",
    images: [
      "/images/tiny-spider/hero.jpg",
      "/images/tiny-spider/01.png",
      "/images/tiny-spider/02.png",
      "/images/tiny-spider/03.png",
      "/images/tiny-spider/04.png",
      "/images/tiny-spider/05.png",
      "/images/tiny-spider/06.png",
      "/images/tiny-spider/07.png",
      "/images/tiny-spider/08.png",
    ],
    videos: [
      {
        type: "youtube",
        src: "vG7jiHwuDTQ",
        title: "Tiny Spider Tiny Home gameplay",
      },
      {
        type: "youtube",
        src: "CfQb3SuM-Os",
        title: "Tiny Spider Tiny Home intro",
      },
    ],
    contribution:
      "Surface movement, web swinging, camera collision and appliance interactions.",
    summary:
      "A third-person game about a spider racing through a student room to switch off appliances before the tenant comes home.",
    brief:
      "Our client-style university brief asked for a game that could make young people more aware of everyday energy waste. We wanted the message to affect the play instead of appearing as a list of facts. The player becomes a spider living in a student's room. The tenant keeps leaving appliances on, the bills are becoming unaffordable and eviction would leave the spider without a warm home. That gives a small character a clear personal reason to save electricity rather than making the player act because a tutorial tells them to.",
    development:
      "A short introduction establishes the stakes, then the student leaves for university and a timer starts. The player has to climb furniture, walls and ceilings, swing across gaps and reach every appliance before the tenant returns. Each switch changes the room and advances the objective. The powered heater also launches the spider into the air, but loses that behaviour once it is switched off, turning the energy state into a movement tool as well as a task. We planned a larger game, but team problems forced us to reduce the scope. We chose to finish one detailed room and concentrate on the part that made the project distinct: readable third-person movement across any surface.",
    role: "I built the movement, surface detection, camera collision, web swing and appliance interactions in C#. I also worked on the level design, UI/UX, intro flow and smaller interactions such as the active heater launching the spider. I implemented the screen-space edge-detection outline used for the cartoon look. I did not create the art assets; this was a team project.",
    tags: ["Unity", "C#", "Character controller", "Camera", "Physics"],
    links: [
      {
        label: "Team GitHub repository",
        href: "https://github.com/DylanoSpks/Tiny-Spider-Tiny-Home",
      },
      {
        label: "Download build",
        href: "https://www.dropbox.com/scl/fi/wrz5v9rhpgfmupac32r56/TinySpiderTinyHome.exe?rlkey=kox9tyhxfy50000pahcybk43i&st=15tt0pub&dl=0",
      },
    ],
    systems: [
      {
        title: "One controller for every surface",
        description:
          "The controller uses raycasts to find the current surface normal, aligns the spider to it and projects camera-relative movement onto that plane. Floors, walls and ceilings therefore use the same movement rules instead of separate modes.",
        details: [
          "Raycast and sphere-cast surface checks",
          "Movement projected onto the surface",
          "Custom force keeps the spider attached",
        ],
      },
      {
        title: "A camera that stays readable",
        description:
          "The spider turns to match the surface, but the third-person camera does not roll with it. Mouse orbit stays level, vertical movement is clamped and a line cast pulls the camera in when furniture blocks the view.",
        details: [
          "Independent camera orientation",
          "Collision-aware follow distance",
          "Smoothed spider alignment at corners",
        ],
      },
      {
        title: "Web swing and room interactions",
        description:
          "The web attaches at the point selected through the camera and creates a SpringJoint for the swing. Normal crawling pauses while the web is attached. Appliances share a common interaction route, while individual objects can still behave differently—the powered heater, for example, launches the spider upward.",
        details: [
          "Physics-based SpringJoint swing",
          "Reusable interaction interface",
          "Object-specific responses",
        ],
      },
    ],
    outcome:
      "The finished room combines a timed objective with movement that makes the player think at a spider's scale. We had planned to expand the game, but team issues forced us to reduce the scope and finish the strongest part: traversal through one detailed student room.",
    learning:
      "The difficult part was not making the spider move once; it was keeping that movement predictable at corners, on ceilings and around furniture. Treating every crawlable wall as a surface and keeping the camera independent from the spider's roll made the final controller much easier to read.",
  },

  {
    slug: "no-click-sherlock",
    title: "No Click, Sherlock",
    year: "2026",
    engine: "Unity",
    duration: "15 weeks",
    team: "6 people",
    roleLabel: "Lead programmer",
    language: "C#",
    featuredOrder: 3,
    challenge: {
      "problem": "Three different minigames had to respond to earlier choices and return the player to the correct point in the narrative. Scene changes could not lose progress or replay the opening every time.",
      "decision": "I stored dialogue outcomes in shared game state and used a save system to record completed minigames, the return spawn and pending story events before switching scenes.",
      "result": "The final build connects NPC conversations, minigames, cutscenes and persistent progress into one playable flow. A dialogue decision can change later platforms or disruptive pop-ups."
    },
    furtherWork: "Further work would focus on testing interrupted scene transitions and saved-game recovery, and separating dialogue presentation from its state changes as the number of conversations grows.",
    hero: "/images/no-click-sherlock/image5.png",
    images: [
      "/images/no-click-sherlock/hero1.png",
      "/images/no-click-sherlock/image1.png",
      "/images/no-click-sherlock/image2.png",
      "/images/no-click-sherlock/image3.png",
      "/images/no-click-sherlock/image4.png",
      "/images/no-click-sherlock/image5.png",
      "/images/no-click-sherlock/image6.png",
      "/images/no-click-sherlock/image7.png",
      "/images/no-click-sherlock/image8.png",
      "/images/no-click-sherlock/image9.png",
      "/images/no-click-sherlock/image10.png",
      "/images/no-click-sherlock/image11.png",
    ],
    contribution:
      "Lead programming: dialogue, three minigames, UI and save systems.",
    summary:
      "A narrative cybersecurity game with three minigames shaped by the player’s dialogue choices.",
    videos: [
      {
        type: "youtube",
        src: "0pFMkyml9g4",
        title: "No Click, Sherlock - team InfraRED",
      },
    ],
    brief:
      "The game was developed in collaboration with the University of Groningen to help staff recognise common cybersecurity risks and scams. It had to work for both technical and non-technical players and be short enough to complete during a lunch break or at home.",
    development:
      "The game connects a narrative hub to three mechanically different challenges. Players move through the world by clicking valid NavMesh positions, approach NPCs and make dialogue choices that are stored in a shared game state. Those choices can change later challenges, such as introducing moving platforms or increasing disruptive pop-ups. The minigames cover a procedural platform run, a block-placement puzzle with hidden fingerprint clues and a browser investigation where collected evidence is assembled into a password. Completing a challenge records progress, loads the correct scene and returns the player to the appropriate point in the story.",
    role: "As lead programmer, I handled the core Unity and C# implementation and managed the team’s GitHub workflow. I built the player movement, NPC interactions, dialogue flow, minigames, UI, animations, cutscenes, save system and scene transitions. My focus was keeping each mechanic understandable while connecting the player’s decisions to later gameplay.",
    tags: [
      "Unity",
      "C#",
      "Gameplay programming",
      "Procedural generation",
      "UI/UX",
      "Save systems",
    ],
    links: [
      {
        label: "GitHub",
        href: "https://github.com/Vladut-Andrei-Lambru/CyberSecurity-InfraRED",
      },
    ],
    systems: [
      {
        title: "Procedural security run",
        description:
          "The first minigame is an automatically bouncing platform challenge. Climbing increases the player’s security percentage, while falling removes progress and returns the player to the last safe platform. Reaching full security starts a second phase where identification items must be collected. Items that will be used later on.",
        details: [
          "CharacterController movement with one-way platforms",
          "Platforms generated ahead of the player and removed below the camera",
          "NPC choices can introduce moving platforms",
        ],
      },
      {
        title: "Solvable block puzzle",
        description:
          "The second minigame uses an 8×8 grid where players place block groups and clear complete rows or columns. Some blocks contain fingerprint clues, fingerprints that signify the staff's digital footprint such as RUG Staff page and social media.",
        details: [
          "Grid and occupied-cell validation",
          "Independent row and column clearing",
          "Look-ahead generator tests whether a set of pieces can be placed",
        ],
      },
      {
        title: "Clue-based password investigation",
        description:
          "The final minigame uses clues collected in the earlier challenges. Players inspect staff IDs and browser pages to identify the administrator and assemble a password from the evidence. This is a fictional puzzle about exposed personal information, rather than a real password-cracking tool.",
        details: [
          "Reusable browser pages with fade transitions",
          "Inventory prevents duplicate clues",
          "Submission unlocks only when the password is valid",
          "NPC choices can introduce disruptive pop-ups",
        ],
      },
    ],
    outcome:
      "The final build connects a narrative hub, NPC decisions, three minigames, cutscenes and persistent progress into one playable experience. Finishing a minigame records the result and returns the player to the correct point in the story.",
    learning:
      "This was my largest programming responsibility in a team project so far. It taught me how to separate a game into reusable systems, carry state between scenes and make very different minigames feel like parts of the same experience.",
  },

  {
    slug: "makers-fair",
    title: "Maker’s Fair",
    year: "2025",
    engine: "Unity VR · Meta Quest 3",
    duration: "8 weeks",
    team: "5 people",
    roleLabel: "Lead programmer",
    language: "C#",
    challenge: {
      "problem": "Connected planks became unstable when players grabbed and moved the construction quickly. The VR grab movement and joint constraints could pull the same parts in conflicting directions.",
      "decision": "While grabbed, one plank leads and the other group members become kinematic followers. On release, they return to dynamic bodies and their joints are rebuilt. Groups merge as new parts are connected.",
      "result": "This approach made manipulation more manageable within the finished woodworking level and supported the cart-building and bridge-test loop. It deliberately trades fully physical behaviour during grabbing for control."
    },
    furtherWork: "For larger constructions, the all-pairs joint setup would need revisiting. Connecting only adjacent parts and testing repeated grab/release cycles would reduce unnecessary constraints and expose stability limits.",
    hero: "/images/makers-fair/02.png",
    images: [
      "/images/makers-fair/hero.jpg",
      "/images/makers-fair/01.jpg",
      "/images/makers-fair/02.png",
      "/images/makers-fair/03.png",
      "/images/makers-fair/04.png",
    ],
    videos: [
      { type: "youtube", src: "34psfsuSL3U", title: "Maker's Fair part 1" },
      { type: "youtube", src: "B_9jCtzeDWo", title: "Maker's Fair part 2" },
    ],
    contribution:
      "Lead programming: construction physics, player guidance and the bridge challenge.",
    summary:
      "A VR construction game where the player builds a cart from planks, nails and wheels, then tests it against a bridge's weight limit.",
    brief:
      "Maker's Fair is set thirty years in the future, after automated systems have made everyday craft skills almost disappear. Woodworking and metalworking are no longer passed down because people rarely need to make or repair anything themselves. A group of older makers organises a fair to put those skills back into people's hands. The full idea included several craft areas, but within eight weeks we chose to complete one woodworking game rather than build several shallow demonstrations.",
    development:
      "The player receives planks, wheels, nails and a hammer and has to construct a cart that can cross a bridge. Our first prototype deliberately gave very little instruction because we wanted the freedom of building with LEGO. Testing showed that players enjoyed experimenting but could not tell what the game understood. We kept the open construction and added blueprints plus contextual holograms, such as showing a possible wheel position when one is picked up. Once the building interaction worked, we added a reason to make deliberate choices: every component has weight and the finished cart must stay below the bridge's load limit. The final challenge therefore tests both whether the cart holds together and whether the player built efficiently.",
    role: "I was the lead programmer and built the construction mechanics, level flow, guidance and UI/UX. I also worked on the level design and final bridge challenge. I did not create the art assets; the project was made by a five-person team.",
    tags: [
      "Unity",
      "C#",
      "VR physics",
      "XR Interaction Toolkit",
      "Technical design",
    ],
    links: [
      {
        label: "GitHub",
        href: "https://github.com/Vladut-Andrei-Lambru/Makers-Fair",
      },
    ],
    systems: [
      {
        title: "Building without fixed recipes",
        description:
          "The player can position planks, hammer nails and attach wheels instead of selecting a finished cart. The system keeps connected parts together while still allowing the object to react to gravity and player movement.",
        details: [
          "Runtime construction groups",
          "Hammer and nail validation",
          "Player-positioned parts",
        ],
      },
      {
        title: "Making experimentation understandable",
        description:
          "The first version gave almost no guidance because we wanted to give players freedom, like building with LEGO. Playtests showed that this was too vague, so we added blueprints and contextual holograms—for example, picking up a wheel reveals a possible attachment point.",
        details: [
          "Feedback added after playtesting",
          "Contextual placement holograms",
          "Guidance without removing free building",
        ],
      },
      {
        title: "Stable plank connections",
        description:
          "Joining several player-positioned planks into one physics object was the hardest problem. Early carts separated or became unstable as gravity, wheels and new parts affected the joints. I repeatedly adjusted how groups merge and when objects behave physically until the cart could survive the final test.",
        details: [
          "Dynamic group merging",
          "Controlled physics-state changes",
          "Repeated stress testing",
        ],
      },
    ],
    outcome:
      "Every plank, wheel and nail contributes weight. The cart must stay below the bridge's weight limit and remain intact long enough to cross. That constraint turned an open construction toy into a clear final challenge.",
    learning:
      "Open-ended building needs readable feedback, especially in VR. The project also taught me that stable physics often comes from carefully controlling when connected objects are simulated, not simply increasing joint strength.",
  },
];

export const orderedProjects = [...projects].sort((a, b) => {
  const aOrder = a.featuredOrder ?? Number.POSITIVE_INFINITY;
  const bOrder = b.featuredOrder ?? Number.POSITIVE_INFINITY;
  return aOrder - bOrder;
});

export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug);
}
