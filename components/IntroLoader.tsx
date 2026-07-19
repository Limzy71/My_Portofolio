"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export const IntroLoader = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [textIndex, setTextIndex] = useState(0);
  const [displayText1, setDisplayText1] = useState("");
  const [displayText2, setDisplayText2] = useState("");
  const [displayName, setDisplayName] = useState("");

  const fullText1 = "> initializing portfolio...";
  const fullText2 = "> loading experience...";
  const nameText = "LA ODE MUH. IKHSAN MBALA";

  const finishIntro = () => {
    document.body.style.overflow = "";
    setIsLoading(false);
    if (typeof window !== "undefined") {
      window.dispatchEvent(new Event("introFinished"));
    }
  };

  useEffect(() => {
    // Force scroll to top on reload
    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }
    window.scrollTo(0, 0);

    // Check prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) {
      setIsLoading(false);
      if (typeof window !== "undefined") {
        window.dispatchEvent(new Event("introFinished"));
      }
      return;
    }

    // Disable scrolling while intro plays
    document.body.style.overflow = "hidden";

    let isCancelled = false;

    // Step 1: Type text 1 (20ms per char)
    let i = 0;
    const timer1 = setInterval(() => {
      if (isCancelled) return;
      if (i <= fullText1.length) {
        setDisplayText1(fullText1.slice(0, i));
        i++;
      } else {
        clearInterval(timer1);
        setTimeout(() => setTextIndex(1), 100);
      }
    }, 20);

    return () => {
      isCancelled = true;
      clearInterval(timer1);
    };
  }, []);

  useEffect(() => {
    if (textIndex !== 1) return;

    // Step 2: Type text 2 (20ms per char)
    let i = 0;
    const timer2 = setInterval(() => {
      if (i <= fullText2.length) {
        setDisplayText2(fullText2.slice(0, i));
        i++;
      } else {
        clearInterval(timer2);
        setTimeout(() => setTextIndex(2), 120);
      }
    }, 20);

    return () => clearInterval(timer2);
  }, [textIndex]);

  useEffect(() => {
    if (textIndex !== 2) return;

    // Step 3: Type developer name character-by-character (20ms per char)
    let i = 0;
    const timer3 = setInterval(() => {
      if (i <= nameText.length) {
        setDisplayName(nameText.slice(0, i));
        i++;
      } else {
        clearInterval(timer3);
        setTextIndex(3);
      }
    }, 20);

    return () => clearInterval(timer3);
  }, [textIndex]);

  useEffect(() => {
    if (textIndex !== 3) return;

    // Pause briefly after name finishes typing before closing loader
    const finishTimeout = setTimeout(() => {
      finishIntro();
    }, 800);

    return () => clearTimeout(finishTimeout);
  }, [textIndex]);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          id="intro-loader"
          key="intro-loader"
          initial={{ opacity: 1, scale: 1 }}
          exit={{
            opacity: 0,
            scale: 0.95,
            transition: { duration: 0.4, ease: "easeInOut" },
          }}
          onClick={finishIntro}
          className="fixed inset-0 z-[100] bg-background flex flex-col items-center justify-center cursor-pointer select-none p-6 font-mono"
          suppressHydrationWarning
        >
          <div className="max-w-xl w-full flex flex-col items-start space-y-3 text-sm sm:text-base text-zinc-300">
            <div className="flex items-center min-h-[24px]">
              <span>{displayText1}</span>
              {textIndex === 0 && (
                <span className="animate-pulse text-primary font-bold ml-1">_</span>
              )}
            </div>

            <div className="flex items-center min-h-[24px]">
              <span>{displayText2}</span>
              {textIndex === 1 && (
                <span className="animate-pulse text-primary font-bold ml-1">_</span>
              )}
            </div>

            <div className="flex items-center min-h-[32px] pt-1">
              {textIndex >= 2 && (
                <span className="font-syne font-bold text-base sm:text-xl md:text-2xl text-primary tracking-normal sm:tracking-wider whitespace-nowrap">
                  {displayName}
                </span>
              )}
              {textIndex >= 2 && (
                <span className="animate-pulse text-primary font-bold ml-1 text-base sm:text-xl md:text-2xl">_</span>
              )}
            </div>
          </div>

          <div className="absolute bottom-8 text-xs text-zinc-600 tracking-widest uppercase">
            Click anywhere to skip
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
