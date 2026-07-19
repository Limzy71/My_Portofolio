"use client";
import React from "react";
import { cn } from "@/lib/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "outline" | "ghost";
}

export const Button: React.FC<ButtonProps> = ({ className, variant = "primary", children, ...props }) => {
  const baseStyle = "inline-flex items-center justify-center px-6 py-3 rounded-full font-medium transition-all focus:outline-none";
  const variants = {
    primary: "bg-primary text-primary-foreground hover:bg-primary/90 shadow-[0_0_15px_rgba(34,211,238,0.4)] hover:shadow-[0_0_25px_rgba(34,211,238,0.6)]",
    outline: "border border-primary text-primary hover:bg-primary/10",
    ghost: "text-foreground hover:text-primary hover:bg-white/5"
  };

  return (
    <button className={cn(baseStyle, variants[variant], className)} suppressHydrationWarning {...props}>
      {children}
    </button>
  );
};
