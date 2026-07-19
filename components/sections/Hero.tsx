"use client";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { Button } from "../ui/Button";
import { Download, Briefcase, LayoutGrid } from "lucide-react";
import { useState, useEffect, useRef } from "react";

export const Hero = () => {
  const roles = ["Full-Stack Developer", "Mobile Developer"];
  const [roleIndex, setRoleIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(roles[0].length);
  const [isDeleting, setIsDeleting] = useState(false);
  const [showScroll, setShowScroll] = useState(true);
  const [canAnimate, setCanAnimate] = useState(false);
  const isInitialPause = useRef(true);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setShowScroll(latest <= 50);
  });

  useEffect(() => {
    if (typeof document !== "undefined") {
      const introNode = document.getElementById("intro-loader");
      if (!introNode) {
        setCanAnimate(true);
      } else {
        const handleIntroFinished = () => setCanAnimate(true);
        window.addEventListener("introFinished", handleIntroFinished);
        return () => window.removeEventListener("introFinished", handleIntroFinished);
      }
    }
  }, []);

  useEffect(() => {
    if (!canAnimate) return;

    const targetRole = roles[roleIndex];
    const typingSpeed = isDeleting ? 40 : 80;

    if (!isDeleting && charIndex === targetRole.length) {
      const pauseDuration = isInitialPause.current ? 1500 : 2000;
      const pauseTimeout = setTimeout(() => {
        setIsDeleting(true);
        isInitialPause.current = false;
      }, pauseDuration);
      return () => clearTimeout(pauseTimeout);
    }

    if (isDeleting && charIndex === 0) {
      setIsDeleting(false);
      setRoleIndex((prev) => (prev + 1) % roles.length);
      return;
    }

    const timer = setTimeout(() => {
      setCharIndex((prev) => prev + (isDeleting ? -1 : 1));
    }, typingSpeed);

    return () => clearTimeout(timer);
  }, [charIndex, isDeleting, roleIndex, canAnimate]);

  const currentText = roles[roleIndex].substring(0, charIndex);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <section id="home" className="min-h-screen flex items-center pt-20 relative overflow-hidden">
      {/* Animated Gradient Mesh Blobs */}
      <motion.div
        animate={{
          x: [0, 100, -50, 0],
          y: [0, -100, 50, 0],
          scale: [1, 1.2, 0.8, 1],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/4 left-10 md:left-20 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[120px] pointer-events-none -z-10"
      />
      <motion.div
        animate={{
          x: [0, -100, 50, 0],
          y: [0, 50, -100, 0],
          scale: [1, 0.8, 1.2, 1],
        }}
        transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/3 left-40 md:left-80 w-[400px] h-[400px] bg-purple-500/20 rounded-full blur-[120px] pointer-events-none -z-10"
      />

      <div className="container mx-auto px-6 z-10 pl-6 lg:pl-32">
        <motion.div
          className="max-w-4xl text-left flex flex-col items-start"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={itemVariants} className="mb-6">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary border border-primary/20 text-sm font-medium">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              Open to Work
            </span>
          </motion.div>
          
          <motion.h1 variants={itemVariants} className="text-4xl sm:text-5xl md:text-6xl lg:text-6xl xl:text-7xl font-bold font-syne tracking-tight text-foreground mb-6 leading-tight sm:leading-tight md:leading-tight lg:leading-tight">
            La Ode Muh. <br/><span className="text-primary">Ikhsan Mbala</span>
          </motion.h1>

          {/* Alternating Typewriter Effect */}
          <motion.div variants={itemVariants} className="text-xl md:text-3xl text-zinc-300 font-mono mb-10 max-w-2xl flex items-center min-h-[44px]">
            <span className="text-primary font-bold mr-2">{">"}</span>
            <span>{currentText}</span>
            <span className="animate-pulse font-bold text-primary ml-1">_</span>
          </motion.div>
          
          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-center gap-4">
            <Button 
              className="w-full sm:w-auto gap-2 shadow-[0_0_15px_rgba(0,255,255,0.4)] hover:shadow-[0_0_25px_rgba(0,255,255,0.6)]"
              onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
            >
              <LayoutGrid size={18} />
              View Work
            </Button>
            <a href="/CV_La_Ode_Muh_Ikhsan_Mbala_Software_Engineer.pdf" target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto">
              <Button variant="outline" className="w-full sm:w-auto gap-2">
                <Download size={18} />
                View CV
              </Button>
            </a>
            <Button 
              variant="outline" 
              className="w-full sm:w-auto gap-2"
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            >
              <Briefcase size={18} />
              Hire Me
            </Button>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Down Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: showScroll ? 1 : 0, pointerEvents: showScroll ? 'auto' : 'none' }}
        transition={{ duration: 0.5 }}
        className="absolute bottom-8 right-8 md:right-12 lg:right-20 flex flex-col items-center gap-2 cursor-pointer z-10"
        onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
      >
        <span className="text-[10px] text-zinc-500 uppercase tracking-widest">Scroll</span>
        <div className="w-5 h-8 border-2 border-zinc-600 rounded-full flex justify-center p-1">
          <motion.div
            animate={{
              y: [0, 12, 0],
              opacity: [1, 0.5, 1],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="w-1 h-2 bg-primary rounded-full"
          />
        </div>
      </motion.div>
    </section>
  );
};
