"use client";
import { motion } from "framer-motion";
import { Button } from "../ui/Button";
import { Download } from "lucide-react";
import Image from "next/image";

export const About = () => {
  return (
    <section id="about" className="py-24">
      <div className="container mx-auto px-6">
        <motion.div 
          className="flex flex-col lg:flex-row items-center gap-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={{
            hidden: { opacity: 0, y: 50 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
          }}
        >
          <div className="w-full lg:w-5/12 relative mx-auto lg:mx-0">
            <div className="aspect-square max-w-sm mx-auto rounded-2xl bg-zinc-900/50 relative overflow-hidden flex items-center justify-center shadow-2xl border border-white/5">
              <Image 
                src="/profile.jpg" 
                alt="Ikhsan Mbala" 
                fill
                className="object-cover"
              />
              {/* Cinematic Vignette & Bottom Light Glow */}
              <div className="absolute inset-0 shadow-[inset_0_0_50px_rgba(0,0,0,0.5)] pointer-events-none" />
              <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-primary/20 to-transparent pointer-events-none mix-blend-overlay" />
            </div>
            <div className="absolute -bottom-6 -right-2 md:right-10 w-32 h-32 bg-primary/20 rounded-full blur-2xl z-[-1]" />
          </div>

          <div className="w-full lg:w-7/12">
            <div className="flex items-center gap-4 mb-4">
              <span className="text-primary font-mono text-sm tracking-wider uppercase">01 / About</span>
              <motion.div 
                className="h-[1px] w-12 sm:w-32 bg-primary/30 origin-left"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
              />
            </div>
            <motion.h2 
              className="text-3xl md:text-5xl font-bold font-syne mb-6 text-foreground tracking-tight"
              initial={{ filter: "blur(6px)", opacity: 0, y: 15 }}
              whileInView={{ filter: "blur(0px)", opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              About <span className="text-primary">Me</span>
            </motion.h2>
            <p className="text-zinc-400 text-lg mb-8 leading-relaxed text-justify hyphens-auto">
              I am a Full-Stack and Mobile Developer dedicated to building scalable and maintainable applications. My professional journey focuses on creating clean architectures and robust engineering solutions. Beyond traditional web and mobile development, I also explore my creative versatility through Game Art, bringing unique digital experiences to life.
            </p>
            <a href="/CV_La_Ode_Muh_Ikhsan_Mbala_Software_Engineer.pdf" target="_blank" rel="noopener noreferrer">
              <Button variant="outline" className="gap-2">
                <Download size={18} />
                View CV
              </Button>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
