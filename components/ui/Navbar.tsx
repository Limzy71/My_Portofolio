"use client";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { useState } from "react";
import { Button } from "./Button";

export const Navbar = () => {
  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 50);
  });

  const links = [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "Skill", href: "#skills" },
    { name: "Work", href: "#projects" },
    { name: "Contact", href: "#contact" },
  ];

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetId = href.replace(/.*\#/, "");
    const elem = document.getElementById(targetId);
    if (elem) {
      elem.scrollIntoView({ behavior: "smooth" });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <motion.nav
      className={`fixed left-0 right-0 z-50 transition-all duration-500 ease-in-out ${
        isScrolled
          ? "top-4 px-4 sm:px-8"
          : "top-0 px-0"
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div
        className={`mx-auto w-full flex items-center justify-between transition-all duration-500 ease-in-out ${
          isScrolled
            ? "max-w-5xl bg-zinc-950/70 backdrop-blur-md text-zinc-100 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] px-6 h-14 border border-white/10"
            : "max-w-7xl bg-transparent text-foreground rounded-none shadow-none px-6 h-20 border border-transparent"
        }`}
      >
        <a
          href="#home"
          onClick={(e) => handleScroll(e, "#home")}
          className="flex items-center text-xl font-bold tracking-tighter"
        >
          {/* Logo Image (Appears ONLY when scrolled) */}
          <div
            className={`transition-all duration-500 ease-in-out overflow-hidden whitespace-nowrap flex items-center ${
              isScrolled ? "max-w-[150px] opacity-100" : "max-w-0 opacity-0 pointer-events-none"
            }`}
          >
            <div className="relative flex items-center justify-center h-10 sm:h-12 w-auto min-w-[44px] shrink-0">
              <img
                src="/MyLogo.png"
                alt="MyLogo"
                className="h-full w-auto object-contain"
                onError={(e) => {
                  // Fallback to text if image is not added yet
                  e.currentTarget.style.display = 'none';
                  const parent = e.currentTarget.parentElement;
                  if (parent && !parent.querySelector('.fallback-text')) {
                    const span = document.createElement('span');
                    span.className = 'fallback-text text-primary font-extrabold text-lg';
                    span.innerText = 'IM';
                    parent.appendChild(span);
                  }
                }}
              />
            </div>
          </div>

          {/* Full Name (Appears ONLY when default / not scrolled) */}
          <div
            className={`transition-all duration-500 ease-in-out overflow-hidden whitespace-nowrap flex items-center ${
              isScrolled ? "max-w-0 opacity-0 pointer-events-none" : "max-w-[160px] opacity-100"
            }`}
          >
            <span className="text-foreground mr-1.5">Ikhsan</span>
            <span className="text-primary">Mbala</span>
          </div>
        </a>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          <ul className="flex items-center gap-6 text-xs sm:text-sm font-bold tracking-wider uppercase">
            {links.map((link) => (
              <li key={link.name}>
                <a
                  href={link.href}
                  onClick={(e) => handleScroll(e, link.href)}
                  className="transition-colors duration-300 text-zinc-300 hover:text-primary"
                >
                  {link.name}
                </a>
              </li>
            ))}
          </ul>
          <a href="#contact" onClick={(e) => handleScroll(e, "#contact")}>
            <Button
              variant={isScrolled ? "primary" : "outline"}
              className={`transition-all duration-500 ease-in-out ${
                isScrolled ? "px-4 py-1.5 text-xs font-bold" : "px-5 py-2 text-sm"
              }`}
            >
              Let&apos;s Connect
            </Button>
          </a>
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden p-2 transition-colors duration-300 text-zinc-300 hover:text-primary"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <div className="w-6 h-5 flex flex-col justify-between">
            <span
              className={`block h-0.5 bg-current transform transition duration-300 ${
                isMobileMenuOpen ? "rotate-45 translate-y-2" : ""
              }`}
            />
            <span
              className={`block h-0.5 bg-current transition duration-300 ${
                isMobileMenuOpen ? "opacity-0" : ""
              }`}
            />
            <span
              className={`block h-0.5 bg-current transform transition duration-300 ${
                isMobileMenuOpen ? "-rotate-45 -translate-y-2.5" : ""
              }`}
            />
          </div>
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div
          className={`md:hidden absolute left-4 right-4 p-4 flex flex-col gap-4 shadow-xl rounded-2xl transition-all duration-300 ${
            isScrolled
              ? "top-16 bg-zinc-950/95 backdrop-blur-md border border-white/10"
              : "top-20 bg-card border border-border"
          }`}
        >
          {links.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="font-bold uppercase tracking-wider text-xs py-3 px-4 text-zinc-300 hover:text-primary transition-colors"
              onClick={(e) => handleScroll(e, link.href)}
            >
              {link.name}
            </a>
          ))}
          <a href="#contact" onClick={(e) => handleScroll(e, "#contact")}>
            <Button className="w-full mt-2 text-xs py-2 transition-all duration-300">Let&apos;s Connect</Button>
          </a>
        </div>
      )}
    </motion.nav>
  );
};
