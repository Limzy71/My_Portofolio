export interface SkillCategory {
  category: string;
  items: string[];
}

export const skills: SkillCategory[] = [
  {
    category: "Frontend",
    items: ["HTML 5 / CSS3", "Tailwind CSS", "React", "Next.js", "TypeScript"],
  },
  {
    category: "Backend",
    items: ["Node.js", "Laravel", "PHP"],
  },
  {
    category: "Mobile & Tools",
    items: ["Flutter", "Dart", "MySQL", "PostgreSQL", "Git", "Figma", "Aseprite", "Inkscape"],
  },
];
