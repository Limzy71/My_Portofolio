"use client";
import { motion, AnimatePresence, useMotionValue, useSpring, Variants } from "framer-motion";
import { projects, Category, Project } from "@/data/projects";
import { useState, useRef, useEffect, useCallback } from "react";
import { ArrowRight, ExternalLink, Code } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const rowVariants: Variants = {
  hidden: { opacity: 0, height: 0 },
  visible: (i: number) => ({ 
    opacity: 1, 
    height: "auto", 
    transition: { 
      height: { duration: 0.35, ease: "easeInOut" },
      opacity: { duration: 0.35, ease: "easeInOut", delay: i * 0.05 }
    } 
  }),
  exit: { 
    opacity: 0, 
    height: 0, 
    transition: { 
      height: { duration: 0.35, ease: "easeInOut" },
      opacity: { duration: 0.2 }
    } 
  }
};

const ProjectRow = ({ 
  project, 
  index, 
  isExpanded, 
  onToggle,
  onHover
}: { 
  project: Project; 
  index: number; 
  isExpanded: boolean; 
  onToggle: () => void;
  onHover: (p: Project) => void;
}) => {
  return (
    <motion.div 
      custom={index}
      data-project-title={project.title}
      className="group relative border-b border-zinc-800/80 last:border-0 hover:border-zinc-600 transition-colors overflow-hidden"
      onMouseEnter={() => onHover(project)}
      variants={rowVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      layout="position"
    >
      <div 
        className="py-6 lg:py-8 cursor-pointer flex flex-col"
        onClick={onToggle}
      >
        <div className="flex items-center justify-between gap-4 relative z-10">
          <div className="flex items-center gap-4 sm:gap-6 lg:gap-10 flex-grow min-w-0">
            <span className="text-zinc-500 font-mono text-sm sm:text-base border border-zinc-800 p-2 px-3 rounded-md shrink-0 transition-colors group-hover:border-zinc-600 bg-zinc-950">
              {String(index + 1).padStart(2, '0')}
            </span>
            <div className="flex flex-col gap-1.5 min-w-0">
              <div className="flex flex-wrap items-center gap-3">
                <h3 className="text-xl sm:text-2xl lg:text-[26px] font-bold font-syne text-foreground group-hover:text-primary transition-colors">
                  {project.title}
                </h3>
                {project.role && (
                  <span className="hidden sm:inline-flex text-[11px] px-2.5 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary whitespace-nowrap">
                    {project.role}
                  </span>
                )}
                {project.isOnPlayStore && (
                  <span className="hidden sm:inline-flex text-[11px] px-2.5 py-1 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 whitespace-nowrap">
                    Live on Play Store
                  </span>
                )}
              </div>
              {/* Mobile fallback badges */}
              <div className="flex sm:hidden flex-wrap gap-2 mt-1">
                {project.role && (
                  <span className="text-[11px] px-2.5 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary whitespace-nowrap">
                    {project.role}
                  </span>
                )}
                {project.isOnPlayStore && (
                  <span className="text-[11px] px-2.5 py-1 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 whitespace-nowrap">
                    Live on Play Store
                  </span>
                )}
              </div>
              <div className="flex flex-wrap gap-x-3 gap-y-1 mt-1">
                {project.techStack.map(t => (
                  <span key={t} className="text-xs lg:text-sm text-zinc-500 group-hover:text-zinc-400 transition-colors">{t}</span>
                ))}
              </div>
            </div>
          </div>
          <div className="shrink-0 p-3 lg:p-4 rounded-full border border-zinc-800 group-hover:border-primary group-hover:text-primary transition-colors text-zinc-400 bg-zinc-950">
            <ArrowRight size={24} className={`transition-transform duration-300 ${isExpanded ? 'rotate-90' : 'rotate-0'}`} />
          </div>
        </div>
        
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.35, ease: "easeInOut" }}
              className="overflow-hidden"
            >
              <div className="pt-8 pb-2 lg:pl-[5.25rem]">
                {/* Mobile Image */}
                <div className="block lg:hidden w-full h-56 mb-6 rounded-xl overflow-hidden border border-zinc-800 shadow-lg relative">
                  <Image src={project.image} alt={project.title} fill className="object-cover" />
                </div>
                
                <p className="text-zinc-400 text-sm lg:text-base leading-relaxed mb-8 max-w-3xl">
                  {project.description}
                </p>

                <div className="flex flex-wrap items-center gap-4">
                  {project.isLive && project.liveUrl && (
                    <Link href={project.liveUrl} target="_blank" onClick={e => e.stopPropagation()} className="flex items-center gap-2 px-6 py-3 rounded-full bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors">
                      <ExternalLink size={16} />
                      {project.isOnPlayStore ? 'View on Play Store' : 'Live Demo'}
                    </Link>
                  )}
                  {project.githubUrl && (
                    <Link href={project.githubUrl} target="_blank" onClick={e => e.stopPropagation()} className="flex items-center gap-2 px-6 py-3 rounded-full border border-zinc-700 text-foreground hover:border-zinc-500 transition-colors text-sm font-medium">
                      <Code size={16} />
                      View Code
                    </Link>
                  )}
                  {project.itchUrl && (
                    <Link href={project.itchUrl} target="_blank" onClick={e => e.stopPropagation()} className="flex items-center gap-2 px-6 py-3 rounded-full bg-[#fa5c5c] text-white text-sm font-medium hover:bg-[#ff7575] transition-colors shadow-[0_0_15px_rgba(250,92,92,0.3)]">
                      <ExternalLink size={16} />
                      Play on Itch.io
                    </Link>
                  )}

                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

const ProjectImage = ({ project }: { project: Project }) => {
  const [error, setError] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.15 }}
      className="w-full h-full"
    >
      {!error ? (
        <Image
          src={project.image}
          alt=""
          fill
          className="object-cover"
          onError={() => setError(true)}
        />
      ) : (
        <div className="w-full h-full bg-zinc-800 flex items-center justify-center text-5xl font-bold font-syne text-zinc-600">
          {project.title.charAt(0)}
        </div>
      )}
    </motion.div>
  );
};

export const Projects = () => {
  const [filter, setFilter] = useState<Category | "all">("all");
  const [expandedProject, setExpandedProject] = useState<string | null>(null);
  const [hoveredProject, setHoveredProject] = useState<Project | null>(null);
  const isHoveringRef = useRef(false);
  
  // Performance-optimized motion values with responsive spring physics
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothX = useSpring(mouseX, { stiffness: 150, damping: 18, mass: 0.15 });
  const smoothY = useSpring(mouseY, { stiffness: 150, damping: 18, mass: 0.15 });
  
  const [isFlipped, setIsFlipped] = useState(false);
  const [isFlippedYTop, setIsFlippedYTop] = useState(false);
  const [isFlippedYBottom, setIsFlippedYBottom] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const lastMousePosRef = useRef<{ clientX: number; clientY: number } | null>(null);

  const updateMousePosition = useCallback((clientX: number, clientY: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    
    // Check if mouse is outside container vertical bounds
    if (clientY < rect.top || clientY > rect.bottom || clientX < rect.left || clientX > rect.right) {
      setHoveredProject(null);
      isHoveringRef.current = false;
      return;
    }

    // Check which project row element is under the cursor
    const el = document.elementFromPoint(clientX, clientY);
    const projectRow = el?.closest('[data-project-title]');
    if (projectRow) {
      const title = projectRow.getAttribute('data-project-title');
      const found = projects.find(p => p.title === title);
      if (found) {
        setHoveredProject(found);
      }
    } else {
      setHoveredProject(null);
      isHoveringRef.current = false;
      return;
    }

    const imageWidth = 320;
    const imageHeight = 200;
    const padding = 35;
    const edgeMargin = 55; // Safety margin to trigger flips before touching hard bounds
    const flipBuffer = 70; // Hysteresis buffer
    const threshold = window.innerWidth - imageWidth - edgeMargin;
    
    // Buffer-aware horizontal flip check
    let nextIsFlipped = isFlipped;
    if (!isFlipped && clientX > threshold) {
      nextIsFlipped = true;
    } else if (isFlipped && clientX < threshold - flipBuffer) {
      nextIsFlipped = false;
    }
    
    if (nextIsFlipped !== isFlipped) {
      setIsFlipped(nextIsFlipped);
    }
    
    const relativeX = clientX - rect.left;
    const relativeY = clientY - rect.top;

    // Buffer-aware vertical flip check (considering both Viewport & Container bounds)
    const topThresholdView = imageHeight / 2 + edgeMargin; // 155px
    const bottomThresholdView = window.innerHeight - (imageHeight / 2 + edgeMargin);
    const bottomThresholdRect = rect.height - (imageHeight / 2 + edgeMargin);

    let nextIsFlippedYTop = isFlippedYTop;
    if (!isFlippedYTop && (clientY < topThresholdView || relativeY < topThresholdView)) {
      nextIsFlippedYTop = true;
    } else if (isFlippedYTop && clientY > topThresholdView + flipBuffer && relativeY > topThresholdView + flipBuffer) {
      nextIsFlippedYTop = false;
    }

    let nextIsFlippedYBottom = isFlippedYBottom;
    if (!isFlippedYBottom && (clientY > bottomThresholdView || relativeY > bottomThresholdRect)) {
      nextIsFlippedYBottom = true;
    } else if (isFlippedYBottom && clientY < bottomThresholdView - flipBuffer && relativeY < bottomThresholdRect - flipBuffer) {
      nextIsFlippedYBottom = false;
    }

    if (nextIsFlippedYTop !== isFlippedYTop) setIsFlippedYTop(nextIsFlippedYTop);
    if (nextIsFlippedYBottom !== isFlippedYBottom) setIsFlippedYBottom(nextIsFlippedYBottom);

    const targetOffsetX = nextIsFlipped ? -imageWidth - padding : padding;
    let targetX = relativeX + targetOffsetX;
    
    let targetY = relativeY - imageHeight / 2; // Default centered
    if (nextIsFlippedYTop) {
      targetY = relativeY + padding; // Hang below cursor
    } else if (nextIsFlippedYBottom) {
      targetY = relativeY - imageHeight - padding; // Hang above cursor
    }
    
    targetY = Math.max(0, Math.min(targetY, rect.height - imageHeight));
    targetX = Math.max(0, Math.min(targetX, rect.width - imageWidth));
    
    if (!isHoveringRef.current) {
      mouseX.jump(targetX);
      mouseY.jump(targetY);
      smoothX.jump(targetX);
      smoothY.jump(targetY);
      isHoveringRef.current = true;
    } else {
      mouseX.set(targetX);
      mouseY.set(targetY);
    }
  }, [isFlipped, isFlippedYTop, isFlippedYBottom, mouseX, mouseY, smoothX, smoothY]);

  const handleMouseMove = (e: React.MouseEvent | React.PointerEvent) => {
    if (typeof window !== 'undefined' && window.innerWidth < 1024) return;
    lastMousePosRef.current = { clientX: e.clientX, clientY: e.clientY };
    updateMousePosition(e.clientX, e.clientY);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (lastMousePosRef.current && isHoveringRef.current) {
        // On touch devices, do not update position to keep it glued to the screen.
        // This allows it to scroll naturally with the page container.
        if (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) {
          return;
        }
        updateMousePosition(lastMousePosRef.current.clientX, lastMousePosRef.current.clientY);
      }
    };

    const handleGlobalPointerDown = (e: PointerEvent) => {
      if (typeof window !== 'undefined' && window.innerWidth < 1024) return;
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setHoveredProject(null);
        isHoveringRef.current = false;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("pointerdown", handleGlobalPointerDown);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("pointerdown", handleGlobalPointerDown);
    };
  }, [updateMousePosition]);

  const tabs: { label: string; value: Category | "all" }[] = [
    { label: "All", value: "all" },
    { label: "Web", value: "Web" },
    { label: "Mobile", value: "Mobile" },
    { label: "Desktop", value: "Desktop" },
    { label: "Game Art", value: "Game" },
  ];

  const filteredProjects = projects.filter(
    (project) => filter === "all" || project.category === filter
  );

  return (
    <section id="projects" className="py-24">
      <div className="container mx-auto px-6">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={{
            hidden: { opacity: 0, y: 50 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
          }}
          className="mb-12"
        >
          <div className="flex items-center gap-4 mb-4">
            <span className="text-primary font-mono text-sm tracking-wider uppercase">03 / Work</span>
            <motion.div 
              className="h-[1px] w-12 sm:w-32 bg-primary/30 origin-left"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
            />
          </div>
          <motion.h2 
            className="text-3xl md:text-5xl font-bold font-syne text-foreground mb-4 tracking-tight"
            initial={{ filter: "blur(6px)", opacity: 0, y: 15 }}
            whileInView={{ filter: "blur(0px)", opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            Featured <span className="text-primary">Work</span>
          </motion.h2>
          <p className="text-zinc-400 max-w-xl text-lg">
            A selection of my recent projects. Choose a category to filter the portfolio.
          </p>
        </motion.div>

        {/* Filters */}
        <div className="relative mb-8">
          <div className="flex overflow-x-auto pb-4 -mx-6 px-6 lg:mx-0 lg:px-0 lg:flex-wrap lg:overflow-x-visible gap-2 md:gap-4 snap-x no-scrollbar">
            {tabs.map((tab) => (
              <button
                key={tab.value}
                onClick={() => {
                  setFilter(tab.value);
                  setExpandedProject(null);
                }}
                suppressHydrationWarning
                className={`relative px-6 py-2 rounded-full text-sm font-medium transition-colors ${
                filter === tab.value
                  ? "text-primary-foreground border-transparent"
                  : "bg-card border border-border text-zinc-400 hover:text-primary hover:border-primary/50"
              }`}
            >
              {filter === tab.value && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute inset-0 bg-primary rounded-full shadow-[0_0_15px_rgba(34,211,238,0.4)]"
                  initial={false}
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
              <span className="relative z-10">{tab.label}</span>
            </button>
          ))}
          </div>
          <div className="absolute top-0 right-[-24px] lg:right-0 bottom-4 w-16 bg-gradient-to-l from-background to-transparent pointer-events-none lg:hidden" />
        </div>

        {/* Editorial List */}
        <div 
          ref={containerRef}
          className="border-t border-zinc-800/80 relative"
          onPointerMove={handleMouseMove}
          onPointerDown={handleMouseMove}
          onPointerLeave={() => {
            setHoveredProject(null);
            isHoveringRef.current = false;
          }}
        >
          {/* Editorial List */}
          <div className="w-full flex flex-col relative z-10">
            <AnimatePresence initial={false}>
              {filteredProjects.map((project, index) => (
                <ProjectRow 
                  key={project.title} 
                  project={project} 
                  index={index} 
                  isExpanded={expandedProject === project.title}
                  onToggle={() => setExpandedProject(expandedProject === project.title ? null : project.title)}
                  onHover={setHoveredProject}
                />
              ))}
            </AnimatePresence>
          </div>

          {/* Shared Floating Image */}
          <motion.div
            className="hidden lg:block pointer-events-none absolute z-50 overflow-hidden rounded-xl shadow-2xl border border-zinc-700/50 bg-zinc-900"
            style={{ 
              x: smoothX, 
              y: smoothY,
              top: 0, 
              left: 0 
            }}
            initial={{ opacity: 0, scale: 0.9, width: 320, height: 200 }}
            animate={{
              opacity: hoveredProject && (expandedProject !== hoveredProject?.title || (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches)) ? 1 : 0,
              scale: hoveredProject && (expandedProject !== hoveredProject?.title || (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches)) ? 1 : 0.9,
              rotate: hoveredProject && (expandedProject !== hoveredProject?.title || (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches)) ? (!isFlipped ? 3 : -3) : 0,
              width: (hoveredProject?.category === "Mobile" || (hoveredProject?.category === "Game" && hoveredProject?.title !== "Cyber Infiltrator")) ? 220 : 320,
              height: (hoveredProject?.category === "Mobile" || (hoveredProject?.category === "Game" && hoveredProject?.title !== "Cyber Infiltrator")) ? 385 : 200,
            }}
            transition={{ 
              type: "spring",
              stiffness: 300,
              damping: 25,
              mass: 0.8
            }}
          >
            <AnimatePresence>
              {hoveredProject && (expandedProject !== hoveredProject?.title || (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches)) && (
                <motion.div
                  key={hoveredProject.title}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.15 }}
                  className="absolute inset-0 w-full h-full"
                >
                  <ProjectImage project={hoveredProject} />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
