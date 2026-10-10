export type ProjectVideo = {
  type: "youtube" | "vimeo" | "mp4";
  src: string;
  title: string;
  poster?: string;
};

export type ProjectEvidence = {
  type: "image" | "video";
  src: string;
  title: string;
  caption: string;
  width: number;
  height: number;
  poster?: string;
};

export type Project = {
  slug: string;
  title: string;
  year: string;
  engine: string;
  duration: string;
  team: string;
  featuredOrder?: 1 | 2 | 3 | 4 | 5 | 6;
  hero: string;
  images: string[];
  videos?: ProjectVideo[];
  evidence?: ProjectEvidence[];
  summary: string;
  contribution: string;
  brief: string;
  development: string;
  role: string;
  testingNote?: string;
  iterations?: {
    title: string;
    observation: string;
    change: string;
    result: string;
  }[];
  tags: string[];
  links: {
    label: string;
    href: string;
  }[];
  systems: {
    title: string;
    description: string;
    details: string[];
  }[];
  outcome: string;
  learning: string;
  roleLabel?: string;
  language?: string;
  challenge?: {
    problem: string;
    decision: string;
    result: string;
  };
  furtherWork?: string;
  documentation?: {
    report: string;
    summary: string;
    diagrams: {
      src: string;
      title: string;
      caption: string;
      width: number;
      height: number;
    }[];
  };
};

export const projects: Project[] = [
  {
    slug: "virtual-life-support",
    evidence: [
      {
        type: "video",
        src: "/videos/virtual-life-support/early-gesture-prototype.mp4",
        title: "Early gesture experiment",
        caption:
          "Early gesture experiment recorded on a phone. Supporting development evidence; low-resolution footage.",
        width: 464,
        height: 832,
        poster:
          "/images/virtual-life-support/early-gesture-prototype-poster.jpg",
      },
      {
        type: "image",
        src: "/images/virtual-life-support/evidence-animation-integration.png",
        title: "Integrating character animations",
        caption:
          "Animator transition setup used to integrate team-created character animations.",
        width: 1101,
        height: 384,
      },
      {
        type: "image",
        src: "/images/virtual-life-support/evidence-cpr-interaction.jpg",
        title: "Hand-tracked compressions",
        caption:
          "Hand-tracked chest interaction in the recorded emergency scenario.",
        width: 1280,
        height: 720,
      },
      {
        type: "image",
        src: "/images/virtual-life-support/evidence-results-feedback.jpg",
        title: "Compression feedback after a run",
        caption:
          "The prototype result panel reports compression measurements after the scenario. These prototype measurements have not been clinically validated.",
        width: 1280,
        height: 720,
      },
      {
        type: "video",
        src: "/videos/virtual-life-support/aed-interaction-demo.mp4",
        title: "AED interaction in motion",
        caption: "AED interaction from the scenario demonstration.",
        width: 854,
        height: 480,
        poster: "/images/virtual-life-support/aed-interaction-demo-poster.jpg",
      },
      {
        type: "image",
        src: "/images/virtual-life-support/evidence-aed-interaction.jpg",
        title: "AED pad placement",
        caption: "AED interaction and pad placement in the recorded scenario.",
        width: 1280,
        height: 720,
      },
    ],
    title: "Virtual Life Support",
    year: "2026",
    engine: "Unity VR · Meta Quest",
    duration: "8 weeks",
    team: "5 people",
    roleLabel: "Lead programmer",
    language: "C#",
    featuredOrder: 2,
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
      "Lead programming: hand-tracked CPR, progression, feedback, UI, animation integration and level design.",
    summary:
      "A hand-tracked VR scenario designed to help CPR-trained people feel more confident using those skills in an emergency.",
    brief:
      "Develop a VR scenario with Virtual Life Support for people who have already completed CPR training. The aim was to practise emergency decisions and the physical sequence under pressure.",
    development:
      "Research with CPR-trained people informed a playground emergency with bystanders, an AED and distractions. I translated the scenario flowchart into prerequisite flags, prototyped gestures with simple objects and integrated the interactions into a complete playable loop.",
    role: "I led programming for hand tracking, chest compressions, gestures, scenario progression and performance feedback. I implemented world-space UI, integrated animations created by teammates and contributed to level design. My earlier Red Cross CPR courses informed the interaction prototypes; research and headset testing informed the revisions.",
    iterations: [
      {
        title: "From a flowchart to coordinated interactions",
        observation:
          "Research highlighted the difficulty of making decisions and directing bystanders under pressure, alongside performing CPR.",
        change:
          "I used prerequisite and completion flags to connect the scenario. Point-and-hold interactions delegate tasks, while a two-hand stop-and-push gesture signals crowd control.",
        result:
          "Interactions report progress without directly controlling every later script. Configured prerequisites coordinate bystanders, distractions and AED actions.",
      },
      {
        title: "Making feedback readable during CPR",
        observation:
          "First-time VR users needed help understanding the interaction. Think-aloud testing with CPR-certified participants also exposed unclear guidance and object placement.",
        change:
          "We revised tutorials, immediate compression feedback and scene placement. I positioned the world-space monitor and important objects so players could check feedback with less head movement.",
        result:
          "The revised scenario presents rhythm and depth feedback during compressions and a performance summary afterwards. Participants reported that the distractions created pressure; this feedback does not establish training effectiveness.",
      },
      {
        title: "Changing interactions for physical comfort",
        observation:
          "The breathing-check prototype required an uncomfortable close head position. Chest compressions in mid-air also lacked resistance.",
        change:
          "We removed the breathing-check interaction. For demo day, we supplied a pillow for players to press against during hand-tracked compressions.",
        result:
          "The final prototype uses the revised interaction sequence and the demo adds physical resistance. Validation against a training manikin remains further work.",
      },
    ],
    testingNote:
      "Participant testing documents are kept private at their request. Feedback is summarised here without identifying participants.",
    tags: ["Unity", "C#", "VR", "Hand tracking", "User testing"],
    links: [
      {
        label: "GitHub",
        href: "https://github.com/Vladut-Andrei-Lambru/VRLifeSupport-Block2",
      },
      {
        label: "Virtual Life Support",
        href: "https://virtuallifesupport.eu/",
      },
      {
        label: "LinkedIn project post",
        href: "https://www.linkedin.com/feed/update/urn:li:activity:7419451513338548224/",
      },
    ],
    systems: [
      {
        title: "Hand-tracked chest compressions",
        description:
          "Both hands must be in the configured position before a compression is accepted. Hand movement drives compression depth; the in-world monitor reports depth and rhythm during the exercise.",
        details: [
          "Two-hand placement checks",
          "Continuous compression depth",
          "Immediate rhythm and depth feedback",
        ],
      },
      {
        title: "Guided emergency response",
        description:
          "Configurable prerequisite flags connect calling 112, delegating AED retrieval, CPR and chest preparation. Bystander and distraction behaviours use scenario progress and timing settings. Point-and-hold confirmation and the two-hand gesture provide different ways to interact with the scene.",
        details: [
          "Prerequisites coordinate actions and events",
          "Hold confirmation limits accidental selection",
          "Gesture arming and cooldown control activation",
        ],
      },
      {
        title: "Feedback across the scenario and results",
        description:
          "Scenario progress stays separate from compression measurements. A world-space monitor displays live feedback, while the completed run's metrics are retained for the results scene. Restarting clears the stored run.",
        details: [
          "Separate progression and performance feedback",
          "World-space tutorials and monitor",
          "Run metrics carried into the results scene",
        ],
      },
    ],
    challenge: {
      problem:
        "The scenario needed to guide a complete emergency response without making every interaction depend directly on the next script.",
      decision:
        "I used configurable prerequisite flags to unlock behaviours and objects. Scenario progression stays separate from the compression measurements and final feedback.",
      result:
        "Configured prerequisites unlock scenario actions independently of the compression score. This lets the sequence change without treating completed tasks as better CPR performance.",
    },
    outcome:
      "Delivered a playable hand-tracked emergency scenario in eight weeks, assessed at 9.2/10 (11/12 assessment points). At demo day, the client praised its immersion and the amount delivered. Participants described the distractions as disruptive and overwhelming, matching the scenario's intended pressure.",
    learning:
      "A working desktop prototype did not guarantee a comfortable or understandable headset interaction. Early integration of team assets and repeated headset checks helped expose guidance, tracking and placement problems before the final demonstration.",
    furtherWork:
      "A next step would be stronger validation of tracking and compression measurements against a physical training manikin. The pillow gave resistance during testing, but the prototype does not establish clinical accuracy.",
  },
  {
    slug: "tiny-spider-tiny-home",
    title: "Tiny Spider Tiny Home",
    year: "2025",
    engine: "Unity",
    duration: "15 weeks",
    team: "5 people",
    roleLabel: "Lead programmer",
    language: "C#",
    featuredOrder: 1,
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
      "Lead programming: surface movement, web swinging, camera, interactions, UI/UX and level design.",
    summary:
      "A third-person game about a spider racing through a student room to switch off appliances before the tenant comes home.",
    brief:
      "Build a game about everyday energy waste. The player is a spider switching off appliances before a student returns home, combining a timed objective with traversal around a room.",
    development:
      "We reduced the scope to one detailed room and concentrated on traversal. Appliance states affect both the objective and movement: the powered heater launches the spider, but stops doing so when switched off.",
    role: "I led programming and built surface traversal, web swinging, camera collision and appliance interactions. I also worked on level design, UI/UX, the intro flow and the screen-space outline effect. Teammates created the art assets.",
    iterations: [
      {
        title: "Finishing the strongest part of the game",
        observation:
          "The team originally planned a larger game, but the available scope had to be reduced.",
        change:
          "We focused on one detailed student room. I concentrated on surface traversal, the camera, web swinging and appliance interactions.",
        result:
          "The finished room supports the timed objective and movement across floors, walls and ceilings. Corners and the swing-to-crawl handoff remain priorities for further testing.",
      },
    ],
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
    challenge: {
      problem:
        "The main movement challenge was detecting transitions between floors, walls and ceilings while keeping the camera understandable. Separate rules for each surface would have made those transitions harder to maintain.",
      decision:
        "I used surface normals to align the spider and project camera-relative input. The camera keeps zero roll, and crawling pauses during the SpringJoint web swing so the movement systems do not compete.",
      result:
        "The final controller supports traversal around the student room, with a camera that checks for furniture between it and the spider. Corners and surface transitions remained the main areas to tune.",
    },
    outcome:
      "Delivered a playable room combining floor, wall and ceiling traversal, web swinging and a timed appliance objective.",
    learning:
      "The difficult work was keeping traversal predictable at corners and making the camera readable on ceilings. Surface normals for crawling and independent camera roll made those behaviours easier to tune.",
    furtherWork:
      "The next improvement would be consolidating surface detection into one shared result for movement and visual alignment, then testing difficult corners and the handoff between swinging and crawling.",
  },
  {
    slug: "no-click-sherlock",
    evidence: [
      {
        type: "image",
        src: "/images/no-click-sherlock/evidence-navigation-cue.png",
        title: "Making destinations easier to find",
        caption:
          "The destination building highlights when the player approaches it.",
        width: 697,
        height: 586,
      },
      {
        type: "video",
        src: "/videos/no-click-sherlock/dialogue-and-navigation.mp4",
        title: "Dialogue and hub navigation",
        caption: "Dialogue choice followed by movement through the hub.",
        width: 854,
        height: 480,
        poster: "/images/no-click-sherlock/dialogue-and-navigation-poster.jpg",
      },
      {
        type: "image",
        src: "/images/no-click-sherlock/evidence-dialogue-choice.jpg",
        title: "Choices before the challenge",
        caption:
          "Dialogue presents a choice before the player enters the security challenge.",
        width: 1920,
        height: 1080,
      },
      {
        type: "image",
        src: "/images/no-click-sherlock/evidence-password-entry.jpg",
        title: "Returning to password entry",
        caption:
          "The investigation interface returns to password entry after inspecting clues.",
        width: 1360,
        height: 768,
      },
      {
        type: "video",
        src: "/videos/no-click-sherlock/clue-investigation.mp4",
        title: "Investigating profiles and clues",
        caption: "Fictional profiles and clues in the final investigation.",
        width: 854,
        height: 482,
        poster: "/images/no-click-sherlock/clue-investigation-poster.jpg",
      },
      {
        type: "image",
        src: "/images/no-click-sherlock/evidence-clue-investigation.jpg",
        title: "Inspecting identity clues",
        caption:
          "The final investigation presents fictional staff profiles and collected identity clues.",
        width: 1360,
        height: 768,
      },
    ],
    title: "No Click, Sherlock",
    year: "2026",
    engine: "Unity",
    duration: "15 weeks",
    team: "6 people",
    roleLabel: "Lead programmer",
    language: "C#",
    featuredOrder: 5,
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
    videos: [
      {
        type: "youtube",
        src: "0pFMkyml9g4",
        title: "No Click, Sherlock - team InfraRED",
      },
    ],
    contribution:
      "Lead programming: dialogue, minigames, final investigation, UI/UX, animation integration and saves.",
    summary:
      "A narrative cybersecurity game where dialogue choices affect two minigames and clues feed into a final account investigation.",
    brief:
      "Develop a short cybersecurity game with the University of Groningen for staff with different levels of gaming experience. The story and connected challenges introduce risks around exposed personal information.",
    development:
      "The initial competitive phishing concept was broadened after research into staff concerns, including privacy and digital footprints. An early phone-voting prototype was dropped because its setup did not fit the final experience. We built a narrative hub, two minigames and a final investigation, then revised navigation and clue presentation through testing.",
    role: "I led programming in a six-person team and managed the GitHub workflow. I implemented movement, dialogue, minigames, the final investigation, saves, scene transitions and UI. I also integrated team-created animations and contributed to level design. I divided programming work, handled complex integration tasks and helped keep the scope achievable.",
    iterations: [
      {
        title: "Reducing setup and broadening the concept",
        observation:
          "The early concept concentrated on competitive phishing. A phone-voting prototype introduced additional network and device setup, while research identified wider concerns around privacy and exposed information.",
        change:
          "We dropped phone voting and developed a connected single-player story with security challenges and a final investigation.",
        result:
          "The delivered game uses one local gameplay flow. Dialogue choices affect later challenge behaviour, and collected clues connect the minigames to the investigation.",
      },
      {
        title: "Showing players where to go next",
        observation:
          "Observational testing with university staff exposed differences in gaming familiarity. Some players wandered through the hub without finding the next challenge.",
        change:
          "We revised the map and guidance. I added a proximity-triggered destination highlight and connected conversations, scene transitions and clearer objective UI.",
        result:
          "The final hub gives a visible destination cue instead of relying only on players remembering instructions. Approximately 15 teaching and administrative staff tested before demo day.",
      },
      {
        title: "Making clues and password entry understandable",
        observation:
          "Plain text did not make important clues obvious, and the original drag-and-drop password interaction did not suit every tester.",
        change:
          "I added highlighted clue tooltips and manual password entry alongside drag and drop. Revised feedback explains what was collected, what is missing and whether an entry is valid.",
        result:
          "The final investigation supports both input methods and makes clue discovery more explicit. These changes came from observed interaction problems rather than an assumption that all players would use the interface the same way.",
      },
    ],
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
          "An automatically bouncing platform challenge generates platforms ahead of the player. Height increases security progress, falling returns the player to a safe platform, and reaching full security starts an identification-item phase.",
        details: [
          "CharacterController movement with one-way platforms",
          "Platforms generated ahead of the player and removed below the camera",
          "NPC choices can introduce moving platforms",
        ],
      },
      {
        title: "Solvable block puzzle",
        description:
          "Players place block groups on an 8x8 grid and clear complete rows or columns. Some blocks reveal fingerprint clues representing a staff member's exposed digital footprint.",
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
      "Delivered two minigames and a connected final investigation with dialogue, cutscenes and saved progress. Testing with approximately 15 University of Groningen staff members informed navigation cues, clue tooltips and an additional password input method.",
    learning:
      "Testing with the intended audience exposed assumptions that our own gaming experience hid. Leading implementation also taught me to make integration milestones, task dependencies and blocked work visible earlier.",
    furtherWork:
      "I would record observations more consistently and run follow-up tests on navigation, password input and saved-game recovery. Evaluating what participants learn about cybersecurity would be a separate next step.",
  },
  {
    slug: "combat-progression",
    title: "Combat Progression",
    year: "2026",
    engine: "Unity · FPS Microgame",
    duration: "Programming focus track",
    team: "Solo project",
    roleLabel: "Gameplay programmer",
    language: "C#",
    featuredOrder: 3,
    hero: "/images/combat-progression/hero.jpg",
    images: [
      "/images/combat-progression/hero.jpg",
      "/images/combat-progression/01-progression-hud.png",
      "/images/combat-progression/02-double-jump-choice.png",
      "/images/combat-progression/03-adrenaline-crit-choice.png",
      "/images/combat-progression/04-critical-hit.png",
    ],
    videos: [
      {
        type: "youtube",
        src: "IYEl75zwmiI",
        title: "Combat Progression - gameplay showcase",
      },
      {
        type: "youtube",
        src: "S86hHtONtAE",
        title: "Combat Progression - Movement Upgrades Path",
      },
      {
        type: "youtube",
        src: "AiwOlmBLiNU",
        title: "Combat Progression - Weapons Upgrade Path",
      },
    ],
    contribution:
      "XP progression, upgrade selection, movement abilities, weapon upgrades, HUD feedback and enemy respawning.",
    summary:
      "A solo progression system built on Unity’s FPS Microgame. Defeating enemies earns XP and unlocks choices between movement abilities and weapon upgrades.",
    brief:
      "Extend an existing FPS codebase with three ranks of upgrades. Each rank offers one movement choice and one shooting choice, giving players different ways to develop their combat abilities.",
    development:
      "Research into XP and ability systems led to two cards per rank rather than a full skill tree. UML distinguished new, modified and reused classes. Iteration focused on menu input conflicts, jump and dash timing, and tuning the active runtime weapon.",
    role: "I independently designed and implemented XP progression, rank data, upgrade selection, movement abilities, weapon tuning, HUD feedback and enemy respawning. I worked on UI/UX and level design and modified the template controller and projectile handling. Unity's FPS Microgame supplied the original FPS foundation and visual assets.",
    iterations: [
      {
        title: "Making upgrade selection respond to input",
        observation:
          "The upgrade menu initially did not respond to mouse input because the template's pause UI was still active.",
        change:
          "I made sure only one UI system was active during selection and explicitly unlocked the cursor when opening the upgrade menu.",
        result:
          "The player can select a card and resume combat with its effect applied. The report documents the conflict and fix; consolidating pause ownership remains further work.",
      },
      {
        title: "Preventing two jumps from firing together",
        observation:
          "The initial double-jump integration could trigger the ground jump and extra jump together. Dash also needed controlled timing without overlapping movement.",
        change:
          "I separated the jump method, gated the extra jump on the airborne state and reset it on landing. Dash uses the existing input route and stops a previous dash before starting another.",
        result:
          "The revised logic distinguishes the first jump from the mid-air jump and prevents overlapping dash routines. These changes are documented in the development report.",
      },
      {
        title: "Making weapon upgrades noticeable",
        observation:
          "The first cooling adjustments barely changed how the weapon felt during gameplay.",
        change:
          "I tested different tuning values and increased the changes until the cooling upgrade was noticeable. The effect is applied to the active runtime weapon instance.",
        result:
          "The weapon-path video shows the resulting upgrade behaviour. The report explains how the tuning changed from the initial values.",
      },
    ],
    tags: [
      "Unity",
      "C#",
      "Gameplay systems",
      "ScriptableObjects",
      "Technical design",
    ],
    links: [
      {
        label: "GitHub",
        href: "https://github.com/Vladut-Andrei-Lambru/FocusTrack",
      },
      {
        label: "Research & development report",
        href: "/files/combat-progression-report.pdf",
      },
      {
        label: "Download Build",
        href: "/files/Ft-GameProgrammingBuild_Vladut-Andrei_Lambru-487791.zip",
      },
    ],
    documentation: {
      report: "/files/combat-progression-report.pdf",
      summary:
        "The accompanying report documents my learning goals, research references, requirements, technical design, development iterations and reflection. These diagrams show how the progression feature connects to the FPS template.",
      diagrams: [
        {
          src: "/images/combat-progression/06-progression-flow.png",
          title: "Progression flow",
          caption:
            "The route from enemy health and XP rewards to rank selection, upgrade application and HUD feedback.",
          width: 590,
          height: 790,
        },
        {
          src: "/images/combat-progression/05-system-diagram.png",
          title: "Integration with the FPS template",
          caption:
            "Red marks classes created for the feature, yellow marks existing classes modified, and green marks existing classes reused.",
          width: 949,
          height: 1051,
        },
      ],
    },
    systems: [
      {
        title: "XP and rank progression",
        description:
          "Defeating enemies awards XP and advances the player toward the next upgrade choice. ProgressionManager retains excess XP after a level-up and publishes an event that RankUpgradeSystem uses to open the appropriate menu.",
        details: [
          "Configurable XP rewards on enemies",
          "XP carry-over after levelling up",
          "Level-up events connect progression to upgrade selection",
          "HUD displays progress and unlocked upgrades",
        ],
      },
      {
        title: "Upgrade choices driven by rank data",
        description:
          "Each RankDefinition ScriptableObject stores a movement choice and a shooting choice, including their titles, descriptions and upgrade IDs. The menu reads that data, pauses combat and lets the player select one. UpgradeApplier connects the selection to its gameplay effect.",
        details: [
          "Three ranks with two choices per rank",
          "Card content configured through ScriptableObjects",
          "Separate progression, presentation and application responsibilities",
          "Unlock state retained during the run",
        ],
      },
      {
        title: "Gameplay effects and combat feedback",
        description:
          "Separate components implement dash, double jump and a kill-triggered speed boost. Weapon tuning changes recovery values on the active instance; critical damage emits an event for HUD feedback. A scene-level respawn manager replaces defeated enemies.",
        details: [
          "Cooldowns and landing checks control movement abilities",
          "Weapon tiers start from captured base values",
          "Critical Protocol enables a 10% chance of five-times damage",
          "Replacement spawning uses delayed requests and NavMesh positions",
        ],
      },
    ],
    outcome:
      "The prototype supports three upgrade choices, including dash, double jump, a kill-triggered speed boost, weapon recovery and critical damage. The videos demonstrate separate movement and weapon paths.",
    learning:
      "Integration required tracing the template's input, pause, movement and weapon lifecycle. Events and ScriptableObject data helped separate progression, presentation and gameplay effects.",
    furtherWork:
      "My next steps would be to queue upgrade selections when one XP reward crosses several levels, consolidate pause handling and improve the interfaces between the progression feature and template code. I would also expand testing around ability timing, repeated unlocks and spawn validation.",
  },
  {
    slug: "makers-fair",
    evidence: [
      {
        type: "image",
        src: "/images/makers-fair/evidence-early-plank-prototype.png",
        title: "Early plank assembly",
        caption:
          "Early plank assembly prototype in the Unity editor, before the final level presentation.",
        width: 2533,
        height: 1310,
      },
      {
        type: "image",
        src: "/images/makers-fair/evidence-nailing-feedback.png",
        title: "Hammer and nail feedback",
        caption: "Hammer and nail interaction on player-positioned planks.",
        width: 2551,
        height: 1373,
      },
      {
        type: "video",
        src: "/videos/makers-fair/wheel-placement-prototype.mp4",
        title: "Wheel placement in motion",
        caption:
          "Wheel placement and attachment preview in a Unity editor development recording.",
        width: 764,
        height: 438,
        poster: "/images/makers-fair/wheel-placement-prototype-poster.jpg",
      },
      {
        type: "image",
        src: "/images/makers-fair/evidence-wheel-placement.png",
        title: "Wheel attachment preview",
        caption:
          "A nearby wheel attachment point displays a placement preview.",
        width: 2552,
        height: 1243,
      },
      {
        type: "video",
        src: "/videos/makers-fair/bridge-failure-prototype.mp4",
        title: "Bridge failure prototype",
        caption:
          "Bridge-test prototype and failure response. Development recording, not a full final playthrough.",
        width: 854,
        height: 480,
        poster: "/images/makers-fair/bridge-failure-prototype-poster.jpg",
      },
      {
        type: "image",
        src: "/images/makers-fair/evidence-cart-manipulation.jpg",
        title: "Moving the connected cart",
        caption: "A connected cart manipulated during development testing.",
        width: 764,
        height: 438,
      },
    ],
    title: "Maker’s Fair",
    year: "2025",
    engine: "Unity VR · Meta Quest 3",
    duration: "8 weeks",
    team: "5 people",
    roleLabel: "Lead programmer",
    language: "C#",
    featuredOrder: 6,
    hero: "/images/makers-fair/02.png",
    images: [
      "/images/makers-fair/hero.jpg",
      "/images/makers-fair/01.jpg",
      "/images/makers-fair/02.png",
      "/images/makers-fair/03.png",
      "/images/makers-fair/04.png",
    ],
    videos: [
      {
        type: "youtube",
        src: "34psfsuSL3U",
        title: "Maker's Fair part 1",
      },
      {
        type: "youtube",
        src: "B_9jCtzeDWo",
        title: "Maker's Fair part 2",
      },
    ],
    contribution:
      "Lead programming: construction physics, player guidance and the bridge challenge.",
    summary:
      "A VR construction game where the player builds a cart from planks, nails and wheels, then tests it against a bridge's weight limit.",
    brief:
      "Build a VR construction experience where players assemble a cart from planks, nails and wheels, then cross a bridge without exceeding its weight limit.",
    development:
      "The team moved from an AI detective concept to a hands-on woodworking experience, then narrowed the scope to one cart-building challenge. I prototyped grabbing and nailing, removed fixed plank sockets to allow player placement, and used guided wheel attachment points to keep assembly manageable.",
    role: "I led programming for construction mechanics, UI/UX, level flow and the bridge challenge, and contributed to level design. I integrated team art and modified existing menu functionality. My focus was connecting the construction prototype to a playable cart-building goal.",
    iterations: [
      {
        title: "Opening up plank placement",
        observation:
          "The early nailing prototype used fixed plank sockets, which limited how players could assemble their construction.",
        change:
          "I removed those plank sockets so players could position and nail planks themselves. Wheels retained predefined attachment points with nearby placement previews.",
        result:
          "Plank layout is player-directed, while wheel attachment stays constrained. This balances construction freedom with a clearer assembly interaction.",
      },
      {
        title: "Controlling physics during VR grabbing",
        observation:
          "Early connected parts wobbled or separated as joints responded to rapid hand movement.",
        change:
          "During a grab, connected followers become kinematic and track a leader. Releasing the group restores dynamic bodies and rebuilds its joints.",
        result:
          "The cart can be manipulated as a connected group. The tradeoff is reduced physical simulation while grabbed; larger groups and repeated grab/release cycles still need testing.",
      },
      {
        title: "Giving construction a clear final test",
        observation:
          "The broader crafting concept needed a concrete goal within the time available.",
        change:
          "We focused on building a cart and sending it across a bridge. The challenge totals construction mass and uses a configured weight limit to decide the result.",
        result:
          "The prototype connects assembly to a pass-or-fail bridge challenge. Limited time for final testing left stability and guidance as priorities for further work.",
      },
    ],
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
        title: "Free plank placement with guided wheel attachment",
        description:
          "Players position planks and hammer nails to form connected groups. Wheels attach at predefined locations; a nearby valid socket displays a placement preview before snapping the wheel into place.",
        details: [
          "Player-positioned planks and nail validation",
          "Runtime construction groups",
          "Proximity-based wheel placement previews",
        ],
      },
      {
        title: "Controlled group manipulation",
        description:
          "While grabbed, a leader drives connected kinematic followers using stored local positions and rotations. Release restores dynamic physics and rebuilds the group's joints, allowing the assembled cart to respond to the scene.",
        details: [
          "Leader and follower transform offsets",
          "Kinematic bodies during grabbing",
          "Dynamic bodies and joints after release",
        ],
      },
      {
        title: "Materials, bridge challenge and results",
        description:
          "Material dispensers replenish parts after grabbing. The final challenge sums construction mass and compares it with the bridge limit; a stored result carries the outcome into the results flow.",
        details: [
          "Delayed material replenishment with visual feedback",
          "Construction mass determines the bridge outcome",
          "Result retained between scenes",
        ],
      },
    ],
    outcome:
      "Delivered a VR woodworking prototype with player-positioned planks, guided wheel attachment and a final bridge weight challenge. Final testing was limited, so the project demonstrates the construction approach rather than comprehensive stability validation.",
    learning:
      "VR construction required explicit control over when physics acts on connected parts. I also learned to integrate team assets earlier and reserve time for headset testing instead of leaving integration and validation until the end.",
    furtherWork:
      "I would first test repeated grabbing, release and wheel attachment with representative users. For larger constructions, connecting adjacent parts instead of all pairs would reduce unnecessary constraints and make stability limits easier to investigate.",
  },
  {
    slug: "time-rewind",
    title: "Time Rewind",
    year: "2026",
    engine: "Unreal Engine 5.7",
    duration: "Unreal elective",
    team: "Solo project",
    roleLabel: "Gameplay programmer",
    language: "C++ and Blueprints",
    featuredOrder: 4,
    hero: "/images/time-rewind/hero.jpg",
    images: [
      "/images/time-rewind/hero.jpg",
      "/images/time-rewind/01-player-mode.png",
      "/images/time-rewind/02-cube-retrieval.png",
      "/images/time-rewind/03-platform-traversal.png",
      "/images/time-rewind/04-laser-plate.png",
    ],
    contribution:
      "C++ recording and playback, Blueprint puzzles, mode selection, UI, level design and testing.",
    summary:
      "A solo Unreal puzzle prototype where players reverse recorded movement to recover a cube, restore fallen platforms and manipulate laser barriers.",
    brief:
      "Turn a reusable rewind mechanic into a puzzle tool. Players reverse recorded movement to recover a cube, restore fallen platforms and use the cube's previous route to control laser barriers.",
    development:
      "The first version demonstrated rewind but needed a gameplay purpose. I connected it to a door, platform section and laser room. Playtesting exposed pickup conflicts and unclear mode unlocks, leading to cooldowns, history resets, world-space hints and stronger feedback.",
    role: "I built the reusable C++ rewind component and its Blueprint integration, then designed the puzzle level and implemented cube interactions, doors, platforms, plates and lasers. I also developed UI and feedback and documented technical tests and three playtesters. Unreal's third-person template provided the starting assets.",
    iterations: [
      {
        title: "From a mechanic demo to a puzzle course",
        observation:
          "Feedback on the first version showed that reversing movement needed a stronger gameplay purpose.",
        change:
          "I added a cube-operated door, falling platforms and a laser puzzle that uses the cube's recorded path. Platforms mode unlocks when the first door opens.",
        result:
          "Rewind is needed to recover the cube, restore a crossing and move the cube between pressure plates. The level gives the reusable C++ component a concrete gameplay role.",
      },
      {
        title: "Fixing pickup and stale-history conflicts",
        observation:
          "Tests found immediate cube recollection after a throw, pickup during rewind and playback returning to frames from an earlier throw.",
        change:
          "I added a short pickup cooldown, blocked pickup while the cube is rewinding and cleared history on a new throw.",
        result:
          "Test cases T9 and T10 changed from Fail to Pass on retest; T11 changed from Partial Pass to Pass. The linked test plan records the original failures and fixes.",
      },
      {
        title: "Explaining mode unlocks and the final puzzle",
        observation:
          "Two of the three testers needed extra hints before changes: Platforms mode was easy to miss, and the final room did not explain why the cube's previous route mattered.",
        change:
          "I added world-space platform and laser-room hints, clarified the mode-aware history bar and improved interaction feedback.",
        result:
          "The third tester completed the level after the extra hints were added. This is a small qualitative playtest; empty-history messaging and rapid-input UI flicker remain limitations.",
      },
    ],
    tags: [
      "Unreal Engine",
      "C++",
      "Blueprints",
      "Gameplay systems",
      "Puzzle design",
      "User testing",
    ],
    links: [
      {
        label: "GitHub",
        href: "https://github.com/Vladut-Andrei-Lambru/TimeRewindUE5",
      },
      {
        label: "Test plan and evaluation",
        href: "/files/time-rewind-test-plan.pdf",
      },
    ],
    documentation: {
      report: "/files/time-rewind-test-plan.pdf",
      summary:
        "The test plan documents 25 technical and gameplay test cases, initial failures, fixes, retest results and observations from three playtesters. It covers rewind behaviour, cube interactions, mode filtering, doors, platforms, laser puzzles, UI, audio and remaining limitations.",
      diagrams: [],
    },
    systems: [
      {
        title: "Reusable recording and reverse playback",
        description:
          "URewindComponentCPP records snapshots containing an actor's transform, linear velocity, angular velocity and physics simulation state. Each component maintains a bounded history. During rewind, normal character movement or physics simulation is disabled and snapshots are applied from newest to oldest.",
        details: [
          "Shared FRewindFrame structure for recorded actor state",
          "Configurable recording interval and history capacity",
          "Consumed snapshots removed during playback",
          "Playback stops when the stored history is exhausted",
        ],
      },
      {
        title: "Cube pickup, throwing and history management",
        description:
          "The cube connects the level's puzzles. While held, it is hidden and its physics, gravity and collision are disabled. Throwing restores its physical behaviour and sends it in the camera direction. Testing exposed conflicts between pickup and rewind, so I added a pickup cooldown after throwing, prevented collection during rewind and cleared old history on a new throw.",
        details: [
          "Physics and collision disabled while the cube is held",
          "Camera-directed throw",
          "Short cooldown prevents immediate recollection",
          "Pickup checks whether the cube is rewinding",
          "New throws clear history from earlier interactions",
        ],
      },
      {
        title: "Technical testing and player feedback",
        description:
          "I documented 25 test cases covering the mechanic and its use throughout the level. Tests included physics restoration, empty history, rapid input, cube pickup, mode filtering, puzzle completion and missing references. Three testers also played without being given the full solution. Their confusion around Platforms mode and the final laser room led to additional hints and stronger feedback.",
        details: [
          "Initial failures and retest results recorded",
          "Full level flow tested from start to finish",
          "Three observed playtesters",
          "Two testers needed extra guidance before the hint changes",
          "Empty-history feedback and rapid-input UI flicker remain areas to improve",
        ],
      },
    ],
    outcome:
      "Delivered a connected puzzle course and documented 25 technical and gameplay test cases. Three playtesters informed changes to guidance and feedback; empty-history messaging and rapid-input UI behaviour remain areas to improve.",
    learning:
      "A technically working feature still needs a reason to use it. Building the whole level exposed interaction conflicts that isolated playback tests missed, while player observations revealed where the mechanic needed explanation.",
    furtherWork:
      "I would first improve feedback when no rewind history is available and reduce UI flicker during rapid mode changes. For a larger level, I would investigate recording only moving actors, compressing snapshot data and using an adaptive recording rate. I would retain the recorded-path behaviour that the cube puzzles rely on and test any optimisation against those solutions.",
  },
];

export const orderedProjects = [...projects].sort(
  (a, b) => (a.featuredOrder ?? Infinity) - (b.featuredOrder ?? Infinity),
);

export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug);
}
