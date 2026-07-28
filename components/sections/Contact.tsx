"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "../ui/Button";
import { Mail, MapPin, Loader2, CheckCircle2, AlertCircle } from "lucide-react";
import { FaGithub, FaLinkedin, FaInstagram, FaWhatsapp } from "react-icons/fa6";

export const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setStatus("error");
      setErrorMessage("Please fill in all fields.");
      return;
    }

    setStatus("loading");
    setErrorMessage("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok || data.error) {
        throw new Error(data.error || "Failed to send message.");
      }

      setStatus("success");
      setFormData({ name: "", email: "", message: "" });

      // Hilangkan notifikasi hijau secara otomatis setelah 3.5 detik dengan efek smooth fade out
      setTimeout(() => {
        setStatus("idle");
      }, 3500);
    } catch (err: unknown) {
      setStatus("error");
      if (err instanceof Error) {
        setErrorMessage(err.message);
      } else {
        setErrorMessage("An unexpected error occurred. Please try again.");
      }
    }
  };

  return (
    <section id="contact" className="py-24">
      <div className="container mx-auto px-6">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={{
            hidden: { opacity: 0, y: 50 },
            visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
          }}
          className="flex flex-col lg:flex-row gap-16 items-stretch"
        >
          {/* Header Left Side */}
          <div className="w-full lg:w-5/12 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-4 mb-4">
                <span className="text-primary font-mono text-sm tracking-wider uppercase">04 / Contact</span>
                <motion.div 
                  className="h-[1px] w-12 sm:w-24 bg-primary/30 origin-left"
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
                Get In <span className="text-primary">Touch</span>
              </motion.h2>
              <p className="text-zinc-400 text-lg mb-8 leading-relaxed">
                Have a project in mind or just want to say hi? Feel free to send me a message!
              </p>
            </div>

            {/* Contact Info Block */}
            <div className="space-y-6 pt-6 border-t border-zinc-800/80 mt-auto">
              <div className="space-y-4">
                <a 
                  href="mailto:laodemuhikhsan18@gmail.com" 
                  className="flex items-center gap-3 text-zinc-300 hover:text-primary transition-colors group text-sm font-medium"
                >
                  <div className="p-2.5 rounded-lg bg-zinc-900 border border-zinc-800 text-primary group-hover:border-primary/50 transition-colors">
                    <Mail size={18} />
                  </div>
                  <span>laodemuhikhsan18@gmail.com</span>
                </a>

                <a 
                  href="https://wa.me/6281242310477" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-zinc-300 hover:text-primary transition-colors group text-sm font-medium"
                >
                  <div className="p-2.5 rounded-lg bg-zinc-900 border border-zinc-800 text-primary group-hover:border-primary/50 transition-colors">
                    <FaWhatsapp size={18} />
                  </div>
                  <span>+62 812-4231-0477</span>
                </a>

                <a 
                  href="https://maps.google.com/?q=Bandung,+Indonesia" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-zinc-300 hover:text-primary transition-colors group text-sm font-medium"
                >
                  <div className="p-2.5 rounded-lg bg-zinc-900 border border-zinc-800 text-primary group-hover:border-primary/50 transition-colors">
                    <MapPin size={18} />
                  </div>
                  <span>Bandung, Indonesia (WIB / GMT+7)</span>
                </a>
              </div>

              {/* Social Links */}
              <div className="pt-2">
                <p className="text-xs text-zinc-500 uppercase tracking-widest mb-3 font-mono">Connect elsewhere</p>
                <div className="flex items-center gap-3 text-zinc-400">
                  <a href="https://github.com/Limzy71" target="_blank" rel="noopener noreferrer" className="p-2.5 bg-zinc-900 border border-zinc-800 rounded-lg hover:text-primary hover:border-primary/50 transition-colors">
                    <FaGithub size={16} />
                  </a>
                  <a href="https://www.linkedin.com/in/laodemuhikhsanmbala/" target="_blank" rel="noopener noreferrer" className="p-2.5 bg-zinc-900 border border-zinc-800 rounded-lg hover:text-primary hover:border-primary/50 transition-colors">
                    <FaLinkedin size={16} />
                  </a>
                  <a href="https://www.instagram.com/ikhsanlaode_/" target="_blank" rel="noopener noreferrer" className="p-2.5 bg-zinc-900 border border-zinc-800 rounded-lg hover:text-primary hover:border-primary/50 transition-colors">
                    <FaInstagram size={16} />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Form Right Side */}
          <div className="w-full lg:w-7/12 flex flex-col justify-between">
            <form className="space-y-6 flex flex-col h-full justify-between" onSubmit={handleSubmit}>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium text-zinc-300">Name</label>
                  <input
                    type="text"
                    id="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    suppressHydrationWarning
                    className="w-full px-4 py-3 rounded-xl bg-zinc-900/60 border border-zinc-800 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-foreground placeholder:text-zinc-600"
                    placeholder="John Doe"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium text-zinc-300">Email</label>
                  <input
                    type="email"
                    id="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    suppressHydrationWarning
                    className="w-full px-4 py-3 rounded-xl bg-zinc-900/60 border border-zinc-800 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-foreground placeholder:text-zinc-600"
                    placeholder="john@example.com"
                  />
                </div>
              </div>
              
              <div className="space-y-2 flex-1 flex flex-col">
                <label htmlFor="message" className="text-sm font-medium text-zinc-300">Message</label>
                <textarea
                  id="message"
                  rows={7}
                  value={formData.message}
                  onChange={handleChange}
                  required
                  suppressHydrationWarning
                  className="w-full flex-1 px-4 py-3 rounded-xl bg-zinc-900/60 border border-zinc-800 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-foreground placeholder:text-zinc-600 resize-none min-h-[160px]"
                  placeholder="Tell me about your project..."
                ></textarea>
              </div>

              {/* Status Notifications dengan AnimatePresence (Smooth Fade In & Fade Out) */}
              <AnimatePresence mode="wait">
                {status === "success" && (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                    className="flex items-center gap-3 p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-sm"
                  >
                    <CheckCircle2 size={20} className="shrink-0" />
                    <span>Your message has been sent successfully! I&apos;ll get back to you as soon as possible.</span>
                  </motion.div>
                )}

                {status === "error" && (
                  <motion.div
                    key="error"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                    className="flex items-center gap-3 p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 text-sm"
                  >
                    <AlertCircle size={20} className="shrink-0" />
                    <span>{errorMessage || "Failed to send message. Please try again."}</span>
                  </motion.div>
                )}
              </AnimatePresence>

              <Button
                type="submit"
                disabled={status === "loading"}
                className="w-full shadow-none hover:shadow-[0_0_20px_rgba(34,211,238,0.3)] bg-primary text-zinc-950 font-bold hover:bg-primary/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {status === "loading" ? (
                  <span className="flex items-center gap-2">
                    <Loader2 className="animate-spin" size={18} />
                    Sending Message...
                  </span>
                ) : (
                  "Send Message"
                )}
              </Button>
            </form>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
