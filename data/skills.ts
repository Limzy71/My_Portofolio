export interface SkillCategory {
  category: string;
  items: string[];
}

export const skills: SkillCategory[] = [
  {
    category: "Frontend",
    items: ["HTML 5 / CSS3", "Tailwind CSS", "JavaScript / TypeScript", "React", "Next.js"],
  },
  {
    category: "Backend",
    items: ["Laravel", "PHP", "Java", "MySQL", "PostgreSQL", "Supabase"],
  },
  {
    category: "Mobile & Tools",
    items: ["Flutter", "Dart", "Android Studio", "Git", "Laravel Herd", "Aseprite", "Inkscape"],
  },
];
