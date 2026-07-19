"use client";

import { useState, useEffect } from "react";
import { FaGithub, FaLinkedin, FaInstagram } from "react-icons/fa6";
import { ArrowUp } from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

export const Footer = () => {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show back to top button after scrolling past hero section (approx 500px)
      if (window.scrollY > 500) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
    e.preventDefault();
    if (sectionId === "home") {
      scrollToTop();
      return;
    }
    const element = document.getElementById(sectionId);
    if (element) {
      const navHeight = 80;
      const elementPosition = element.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({
        top: elementPosition - navHeight,
        behavior: "smooth"
      });
    }
  };

  return (
    <footer className="bg-background relative border-t border-zinc-800/50 pt-16 pb-8">
      {/* Back to Top Button */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={scrollToTop}
            className="fixed bottom-6 right-6 lg:bottom-10 lg:right-10 z-50 p-3 bg-zinc-900 border border-primary/50 text-primary rounded-full shadow-[0_0_15px_rgba(34,211,238,0.2)] hover:bg-primary/10 transition-colors"
            aria-label="Back to Top"
          >
            <ArrowUp size={20} />
          </motion.button>
        )}
      </AnimatePresence>

      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-8 mb-16">
          {/* Column 1: Brand & Tagline */}
          <div>
            <Link href="/" onClick={(e) => scrollToSection(e, "home")} className="inline-block mb-4">
              <span className="text-2xl font-bold font-syne text-foreground tracking-tight">
                Ikhsan <span className="text-primary">Mbala</span>
              </span>
            </Link>
            <p className="text-sm text-zinc-500 max-w-sm leading-relaxed">
              Building digital experiences, one line of code at a time.
            </p>
          </div>

          {/* Column 2: Navigation */}
          <div className="lg:justify-self-center">
            <h4 className="text-xs font-mono text-zinc-600 tracking-widest uppercase mb-6">Navigation</h4>
            <ul className="flex flex-col gap-4">
              {[
                { label: 'Home', id: 'home' },
                { label: 'About', id: 'about' },
                { label: 'Skill', id: 'skills' },
                { label: 'Work', id: 'projects' },
                { label: 'Contact', id: 'contact' },
              ].map((item) => (
                <li key={item.label}>
                  <a 
                    href={`#${item.id}`}
                    onClick={(e) => scrollToSection(e, item.id)}
                    className="text-sm text-zinc-400 hover:text-primary transition-colors"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Get In Touch */}
          <div className="lg:justify-self-end">
            <h4 className="text-xs font-mono text-zinc-600 tracking-widest uppercase mb-6">Get In Touch</h4>
            <div className="flex flex-col gap-2 mb-6">
              <a 
                href="mailto:laodemuhikhsan18@gmail.com" 
                className="inline-block text-sm text-zinc-400 hover:text-primary transition-colors"
              >
                laodemuhikhsan18@gmail.com
              </a>
              <a 
                href="https://wa.me/6281242310477" 
                target="_blank" rel="noopener noreferrer"
                className="inline-block text-sm text-zinc-400 hover:text-primary transition-colors"
              >
                +62 812-4231-0477
              </a>
              <a 
                href="https://maps.google.com/?q=Bandung,+Indonesia" 
                target="_blank" rel="noopener noreferrer"
                className="inline-block text-sm text-zinc-400 hover:text-primary transition-colors"
              >
                Bandung, Indonesia (WIB / GMT+7)
              </a>
            </div>
            <div className="flex items-center gap-4">
              <a href="https://github.com/Limzy71" target="_blank" rel="noopener noreferrer" className="text-zinc-500 hover:text-primary transition-colors" aria-label="GitHub">
                <FaGithub size={20} />
              </a>
              <a href="https://www.linkedin.com/in/laodemuhikhsanmbala/" target="_blank" rel="noopener noreferrer" className="text-zinc-500 hover:text-primary transition-colors" aria-label="LinkedIn">
                <FaLinkedin size={20} />
              </a>
              <a href="https://www.instagram.com/ikhsanlaode_/" target="_blank" rel="noopener noreferrer" className="text-zinc-500 hover:text-primary transition-colors" aria-label="Instagram">
                <FaInstagram size={20} />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Row */}
        <div className="pt-8 pb-24 lg:pb-0 border-t border-zinc-800/50 flex flex-col sm:flex-row items-center justify-between gap-4 sm:pr-16 lg:pr-24">
          <p className="text-xs text-zinc-600">
            © {new Date().getFullYear()} Ikhsan Mbala. All rights reserved.
          </p>
          
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-zinc-900 border border-zinc-800 w-fit">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            <span className="text-[10px] uppercase font-mono tracking-wider text-zinc-400">
              Open to Work
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
