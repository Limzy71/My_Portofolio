"use client";
import { motion } from "framer-motion";
import { IconType } from "react-icons";
import {
  SiHtml5,
  SiCss,
  SiTailwindcss,
  SiJavascript,
  SiTypescript,
  SiReact,
  SiNextdotjs,
  SiLaravel,
  SiPhp,
  SiMysql,
  SiPostgresql,
  SiSupabase,
  SiFlutter,
  SiDart,
  SiGit,
  SiAseprite,
  SiInkscape,
} from "react-icons/si";
import { FaJava } from "react-icons/fa6";
import { Code2 } from "lucide-react";

// Logo SVG Laravel Herd
const LaravelHerdIcon = ({ size = 18 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="shrink-0">
    <path d="M4 3.5C4 2.67157 4.67157 2 5.5 2H8.5C9.32843 2 10 2.67157 10 3.5V9.5H14V3.5C14 2.67157 14.6716 2 15.5 2H18.5C19.3284 2 20 2.67157 20 3.5V20.5C20 21.3284 19.3284 22 18.5 22H15.5C14.6716 22 14 21.3284 14 20.5V14.5H10V20.5C10 21.3284 9.32843 22 8.5 22H5.5C4.67157 22 4 21.3284 4 20.5V3.5Z" fill="#FF2D20"/>
    <path d="M14 2H18.5C19.3284 2 20 2.67157 20 3.5V10.5L14 14.5V2Z" fill="#B91C1C" opacity="0.75"/>
  </svg>
);

interface SkillBadgeProps {
  name: string;
}

interface SkillConfig {
  icon?: IconType | typeof Code2 | typeof LaravelHerdIcon;
  imageSrc?: string;
  imageSize?: number;
  color: string;
  secondIcon?: IconType;
}

const skillConfigMap: Record<string, SkillConfig> = {
  "HTML 5 / CSS3": { icon: SiHtml5, secondIcon: SiCss, color: "#E34F26" },
  "Tailwind CSS": { icon: SiTailwindcss, color: "#06B6D4" },
  "JavaScript / TypeScript": { icon: SiJavascript, secondIcon: SiTypescript, color: "#F7DF1E" },
  "React": { icon: SiReact, color: "#61DAFB" },
  "Next.js": { icon: SiNextdotjs, color: "#FFFFFF" },
  "Laravel": { icon: SiLaravel, color: "#FF2D20" },
  "PHP": { icon: SiPhp, color: "#777BB4" },
  "Java": { icon: FaJava, color: "#ED8B00" },
  "MySQL": { icon: SiMysql, color: "#4479A1" },
  "PostgreSQL": { icon: SiPostgresql, color: "#4169E1" },
  "Supabase": { icon: SiSupabase, color: "#3ECF8E" },
  "Flutter": { icon: SiFlutter, color: "#02569B" },
  "Dart": { icon: SiDart, color: "#0175C2" },

  // === DI SINI TEMPAT MENGATUR UKURAN GAMBAR ANDROID STUDIO ===
  "Android Studio": { imageSrc: "/icons/android-studio.png", imageSize: 22, color: "#3DDC84" },

  "Git": { icon: SiGit, color: "#F05032" },
  "Laravel Herd": { icon: LaravelHerdIcon, color: "#FF2D20" },
  "Herd": { icon: LaravelHerdIcon, color: "#FF2D20" },
  "Aseprite": { icon: SiAseprite, color: "#927DB9" },
  "Inkscape": { icon: SiInkscape, color: "#E0E0E0" },
};

export const SkillBadge = ({ name }: SkillBadgeProps) => {
  const config = skillConfigMap[name] || { icon: Code2, color: "#22d3ee" };
  const PrimaryIcon = config.icon || Code2;
  const SecondIcon = config.secondIcon;
  const imgSize = config.imageSize || 22;

  return (
    <motion.div
      className="px-3.5 py-2 rounded-xl bg-zinc-900/90 border border-zinc-800 text-sm font-medium text-zinc-300 flex items-center gap-2.5 cursor-default group/badge"
      whileHover={{
        y: -3,
        borderColor: config.color,
        boxShadow: `0 0 16px ${config.color}40`,
        color: "#ffffff",
      }}
      transition={{ duration: 0.15, ease: "easeOut" }}
    >
      <div className="flex items-center gap-1.5 shrink-0">
        {config.imageSrc ? (
          <img
            src={config.imageSrc}
            alt={name}
            style={{ width: `${imgSize}px`, height: `${imgSize}px` }}
            className="object-contain shrink-0 transition-transform duration-150 ease-out group-hover/badge:scale-110"
          />
        ) : (
          <PrimaryIcon
            size={18}
            style={{ color: config.color }}
            className="transition-transform duration-150 ease-out group-hover/badge:scale-110 shrink-0"
          />
        )}

        {SecondIcon && (
          <SecondIcon
            size={18}
            style={{ color: name.includes("TypeScript") ? "#3178C6" : "#1572B6" }}
            className="transition-transform duration-150 ease-out group-hover/badge:scale-110 shrink-0"
          />
        )}
      </div>
      <span className="leading-none">{name}</span>
    </motion.div>
  );
};
