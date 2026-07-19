import type { Metadata } from "next";
import { Inter, Syne } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/ui/Navbar";
import { Footer } from "@/components/ui/Footer";
import Link from "next/link";
import { IntroLoader } from "@/components/IntroLoader";
import { MotionProvider } from "@/components/MotionProvider";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });
const syne = Syne({ subsets: ["latin"], variable: "--font-syne", weight: ["400", "500", "600", "700", "800"] });

export const metadata: Metadata = {
  title: "La Ode Muh. Ikhsan Mbala - Tech Portfolio",
  description: "Portfolio of La Ode Muh. Ikhsan Mbala, a Full-Stack and Mobile Developer.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth" suppressHydrationWarning>
      <body className={`${inter.variable} ${syne.variable} font-sans antialiased bg-background text-foreground`} suppressHydrationWarning>
        <IntroLoader />
        {/* Background Diagonal Hatching Pattern */}
        <div className="fixed inset-0 z-[-1] opacity-[0.03]" style={{ backgroundImage: "repeating-linear-gradient(45deg, #ffffff 0, #ffffff 1px, transparent 1px, transparent 20px)" }}></div>
        <MotionProvider>
          <Navbar />
          {children}
          <Footer />
        </MotionProvider>
      </body>
    </html>
  );
}

