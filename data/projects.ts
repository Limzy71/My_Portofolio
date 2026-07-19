export type Category = "Web" | "Mobile" | "Desktop" | "Game";

export interface Project {
  title: string;
  description: string;
  techStack: string[];
  category: Category;
  liveUrl?: string;
  githubUrl?: string;
  itchUrl?: string;
  image: string;
  isLive: boolean;
  role?: string;
  isOnPlayStore?: boolean;
}

export const projects: Project[] = [
  {
    title: "Outventure Store",
    description: "E-commerce platform for outdoor gear and apparel with features like product browsing, shopping cart, and secure checkout.",
    techStack: ["Livewire", "Alpine.js", "Laravel", "MySQL"],
    category: "Web",
    githubUrl: "https://github.com/Naksuuuu/OutVenture",
    image: "/projects/outventure.png",
    isLive: false,
    role: "Fullstack Developer"
  },
  {
    title: "Motekar ERP",
    description: "Comprehensive enterprise ERP system automating business operations from procurement, warehouse, production, to quality control and CRM.",
    techStack: ["TypeScript", "Express", "MySQL", "Vite"],
    category: "Web",
    githubUrl: "https://github.com/Limzy71/Motekar_Bike_ERP",
    image: "/projects/Motekar_ERP.png",
    isLive: true,
    liveUrl: "https://motebike.duckdns.org",
    role: "Fullstack Developer"
  },
  {
    title: "Portfolio v2",
    description: "A high-fidelity, modern personal portfolio website to showcase technical expertise and creative versatility.",
    techStack: ["Next.js", "TypeScript", "Tailwind CSS"],
    category: "Web",
    githubUrl: "https://github.com/Limzy71/Portofolio",
    image: "/projects/Portofolio_2.png",
    isLive: true,
    liveUrl: "https://ikhsanlaode.my.id",
    role: "Fullstack Developer"
  },
  {
    title: "Laptop E-Commerce",
    description: "A dedicated online marketplace for buying and selling laptops and tech accessories.",
    techStack: ["PHP Native", "Tailwind CSS"],
    category: "Web",
    githubUrl: "https://github.com/Limzy71/pw2024_tubes_233040080",
    image: "/projects/Web_Asus.png",
    isLive: false,
    role: "Fullstack Developer"
  },
  {
    title: "Nasgor Pusdikum",
    description: "Web application for a culinary business focusing on point of sale and order management.",
    techStack: ["Bootstrap"],
    category: "Web",
    githubUrl: "https://github.com/Limzy71/Limzy71.github.io",
    image: "/projects/Nasgor_Pusdikum.png",
    isLive: true  ,
    liveUrl: "https://limzy71.github.io/",
    role: "Fullstack Developer"
  },

  {
    title: "Spendly - Pengelola Keuangan",
    description: "Flutter-based financial management application to record transactions, monitor cash flow, manage reminders, and store data locally.",
    techStack: ["Flutter", "Dart", "PostgreSQL", "Supabase"],
    category: "Mobile",
    githubUrl: "https://github.com/Limzy71/Spendly_SAB_Tubes_2026",
    image: "/projects/Spendly.jpeg",
    isLive: true,
    isOnPlayStore: true,
    liveUrl: "https://play.google.com/store/apps/details?id=com.penacode.spendly&hl=id",
    role: "Fullstack Developer & Project Manager"
  },
  {
    title: "Sistem Logistik",
    description: "A desktop-based inventory management system designed to streamline the flow of incoming and outgoing goods for retail stores. Features precise transaction tracking, automated reporting capabilities, and highly robust data persistence.",
    techStack: ["Java", "JavaFX", "MySQL"],
    category: "Desktop",
    githubUrl: "https://github.com",
    image: "/projects/PP_1.jpeg",
    isLive: false,
    role: "Fullstack Developer"
  },
  {
    title: "SIPERPUS",
    description: "Developed and integrated core security features for a Library Management System desktop application. I was responsible for implementing a secure user authentication system using password hashing (jBcrypt). Additionally, I engineered a document generation feature that allows users to seamlessly export library data and transaction reports into PDF format.",
    techStack: ["Java", "Swing", "MySQL"],
    category: "Desktop",
    githubUrl: "https://github.com",
    image: "/projects/PP_2.jpeg",
    isLive: false,
    role: "Front-end Developer"
  },
  {
    title: "Petualangan si Minus",
    description: "Petualangan si Minus is an educational math game tailored for 3rd-grade students, focusing on subtraction through fun and engaging mechanics. As the Game Programmer, I developed the core educational quiz system and implemented an accessible, simplified turn-based combat loop. Additionally, acting as a Game Artist, I designed and illustrated a variety of creative costumes for the main character, adding a delightful layer of personalization for young players.",
    techStack: ["Adobe Animate"],
    category: "Game",
    itchUrl: "https://malhikuna.itch.io/petualangan-si-minus",
    image: "/projects/Game_1.jpeg",
    isLive: false,
    role: "2D Game Artist"
  },
  {
    title: "Cyber Infiltrator",
    description: "Developed during my Informatics Engineering undergraduate studies, Cyber Infiltrator is a 2D retro-styled stealth action game that challenges players to navigate complex security systems. As the lead Game Programmer, I engineered the core gameplay logic and mobile-optimized stealth mechanics using Unity and C#, while also implementing custom shaders to achieve an authentic CRT monitor visual distortion that enhances the game's aesthetic.",
    techStack: ["Unity 6", "Aseprite", "Inkscape"],
    category: "Game",
    itchUrl: "https://malhikuna.itch.io/cyber-infiltrator",
    image: "/projects/Game_2.jpeg",
    isLive: false,
    role: "2D Game Artist"
  }
];
