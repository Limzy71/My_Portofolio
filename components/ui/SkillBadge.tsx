"use client";
import { motion } from "framer-motion";

interface SkillBadgeProps {
  name: string;
}

export const SkillBadge = ({ name }: SkillBadgeProps) => {
  return (
    <motion.div 
      className="px-4 py-2 rounded-full bg-zinc-900 border border-zinc-800 text-sm font-medium text-zinc-300 flex items-center justify-center cursor-default transition-colors"
      whileHover={{ 
        y: -2, 
        borderColor: "#22d3ee",
        boxShadow: "0 0 15px rgba(34,211,238, 0.3)",
        color: "#22d3ee"
      }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
    >
      {name}
    </motion.div>
  );
};
