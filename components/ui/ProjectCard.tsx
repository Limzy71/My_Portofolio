"use client";
import { Project } from "@/data/projects";
import { motion } from "framer-motion";
import { ExternalLink, Code } from "lucide-react";
import Link from "next/link";

interface ProjectCardProps {
  project: Project;
  compact?: boolean;
}

export const ProjectCard = ({ project, compact = false }: ProjectCardProps) => {
  return (
    <motion.div 
      className="group rounded-2xl bg-card border border-border overflow-hidden flex flex-col h-full hover:shadow-[0_0_20px_rgba(34,211,238,0.15)] transition-colors"
      whileHover={{ y: -4, borderColor: "#22d3ee" }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
    >
      {!compact && (
        <div className="relative h-48 w-full overflow-hidden bg-zinc-800 shrink-0">
          <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent z-10 opacity-80" />
          <div className="w-full h-full flex items-center justify-center text-zinc-500 bg-zinc-900 text-sm">
            [Image: {project.image}]
          </div>
        </div>
      )}
      
      <div className={`${compact ? 'p-5' : 'p-6'} flex flex-col flex-grow relative z-20`}>
        <div className="flex justify-between items-start mb-2 gap-4">
          <h3 className={`${compact ? 'text-lg' : 'text-xl'} font-bold font-syne text-foreground group-hover:text-cyan-300 transition-colors`}>
            {project.title}
          </h3>
          <div className="flex flex-col items-end gap-2 shrink-0">
            {project.isOnPlayStore && (
              <span className="text-[10px] px-2 py-0.5 rounded bg-green-500/10 border border-green-500/20 text-green-400 whitespace-nowrap">
                Play Store
              </span>
            )}
            {project.role && (
              <span className="text-[10px] px-2 py-0.5 rounded bg-primary/10 border border-primary/20 text-primary whitespace-nowrap">
                {project.role}
              </span>
            )}
          </div>
        </div>
        
        <p className={`text-sm text-zinc-400 mb-4 flex-grow ${compact ? 'line-clamp-2' : ''}`}>
          {project.description}
        </p>
        
        <div className="flex flex-wrap gap-2 mb-6">
          {project.techStack.map((tech) => (
            <span key={tech} className="text-xs px-2 py-1 rounded-full bg-zinc-800/80 border border-zinc-700 text-zinc-300">
              {tech}
            </span>
          ))}
        </div>
        
        <div className="flex items-center gap-4 mt-auto">
          {project.isLive && project.liveUrl && (
            <Link href={project.liveUrl} target="_blank" className="flex items-center gap-2 text-sm font-medium text-primary hover:underline">
              <ExternalLink size={16} />
              Live Demo
            </Link>
          )}
          <Link href={project.githubUrl} target="_blank" className="flex items-center gap-2 text-sm font-medium text-foreground hover:text-primary transition-colors">
            <Code size={16} />
            View Code
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

