"use client";
import { motion } from "framer-motion";
import { skills } from "@/data/skills";
import { SkillBadge } from "../ui/SkillBadge";
import { Sparkles, LayoutTemplate, Server, Smartphone } from "lucide-react";

export const Skills = () => {
  return (
    <section id="skills" className="py-24">
      <div className="container mx-auto px-6">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={{
            hidden: { opacity: 0, y: 50 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
          }}
          className="mb-16"
        >
          <div className="flex items-center gap-4 mb-4">
            <span className="text-primary font-mono text-sm tracking-wider uppercase">02 / Skills</span>
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
            Technical <span className="text-primary">Skills</span>
          </motion.h2>
          <p className="text-zinc-400 max-w-xl text-lg text-justify hyphens-auto">
            A comprehensive overview of my technical expertise and the tools I use to build modern digital products.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skills.map((skillGroup, index) => {
            let Icon = Sparkles;
            let style = { bg: "bg-zinc-500/10", text: "text-zinc-400 border-zinc-500/20" };
            
            if (skillGroup.category === "Frontend") {
              Icon = LayoutTemplate;
              style = { bg: "bg-teal-500/10", text: "text-teal-400 border-teal-500/20" };
            } else if (skillGroup.category === "Backend") {
              Icon = Server;
              style = { bg: "bg-orange-500/10", text: "text-orange-400 border-orange-500/20" };
            } else if (skillGroup.category === "Mobile & Tools") {
              Icon = Smartphone;
              style = { bg: "bg-blue-500/10", text: "text-blue-400 border-blue-500/20" };
            }

            return (
              <motion.div
                key={skillGroup.category}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { 
                    opacity: 1, 
                    y: 0, 
                    transition: { duration: 0.5, delay: index * 0.1, staggerChildren: 0.04 } 
                  }
                }}
                className="group bg-zinc-900/60 border border-zinc-800 rounded-2xl p-6 flex flex-col items-start transition-all duration-300 ease-out hover:-translate-y-1 hover:border-[#22d3ee] hover:shadow-[0_10px_24px_rgba(0,0,0,0.35)]"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div 
                    className={`p-2 rounded-lg border ${style.bg} ${style.text} transition-transform duration-300 ease-out group-hover:scale-[1.05]`}
                  >
                    <Icon size={20} />
                  </div>
                  <h3 className="text-xl font-bold text-foreground text-left">{skillGroup.category}</h3>
                </div>
                <div className="flex flex-wrap gap-3 justify-start">
                  {skillGroup.items.map((item, idx) => (
                    <motion.div
                      key={item}
                      variants={{
                        hidden: { opacity: 0, scale: 0.8 },
                        visible: { 
                          opacity: 1, 
                          scale: 1, 
                          transition: { type: "spring", stiffness: 300, damping: 20 } 
                        }
                      }}
                    >
                      <SkillBadge name={item} />
                    </motion.div>
                  ))}
                </div>
            </motion.div>
          );
          })}
        </div>
      </div>
    </section>
  );
};
