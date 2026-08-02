import type { Metadata } from "next";
import { Inter, Syne } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/ui/Navbar";
import { Footer } from "@/components/ui/Footer";
import { IntroLoader } from "@/components/IntroLoader";
import { MotionProvider } from "@/components/MotionProvider";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });
const syne = Syne({ subsets: ["latin"], variable: "--font-syne", weight: ["400", "500", "600", "700", "800"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://ikhsanod.my.id"),
  title: {
    default: "La Ode Muh. Ikhsan Mbala | Full-Stack & Mobile Developer",
    template: "%s | La Ode Muh. Ikhsan Mbala",
  },
  description:
    "Official Portfolio of La Ode Muh. Ikhsan Mbala (ikhsanlaode), a Full-Stack Developer & Mobile Engineer specializing in React, Next.js, Laravel, PHP, Flutter, and Java.",
  keywords: [
    "La Ode Muh. Ikhsan Mbala",
    "La Ode Muh Ikhsan Mbala",
    "La Ode Muh Ikhsan",
    "ikhsanlaode",
    "Ikhsan Mbala",
    "Ikhsan La Ode",
    "Full-Stack Developer Bandung",
    "Mobile Developer Indonesia",
    "Software Engineer",
    "Portfolio Ikhsan",
  ],
  authors: [{ name: "La Ode Muh. Ikhsan Mbala", url: "https://github.com/Limzy71" }],
  creator: "La Ode Muh. Ikhsan Mbala",
  publisher: "La Ode Muh. Ikhsan Mbala",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "id_ID",
    url: "https://ikhsanod.my.id",
    title: "La Ode Muh. Ikhsan Mbala | Full-Stack & Mobile Developer",
    description:
      "Official Portfolio of La Ode Muh. Ikhsan Mbala (ikhsanlaode). Explore my projects, technical skills, and software engineering journey.",
    siteName: "La Ode Muh. Ikhsan Mbala Portfolio",
    images: [
      {
        url: "/profile.jpg",
        width: 1200,
        height: 630,
        alt: "La Ode Muh. Ikhsan Mbala",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "La Ode Muh. Ikhsan Mbala | Full-Stack & Mobile Developer",
    description:
      "Portfolio of La Ode Muh. Ikhsan Mbala (ikhsanlaode), Full-Stack & Mobile Developer.",
    images: ["/profile.jpg"],
  },
  icons: {
    icon: "/myLogo.png",
    shortcut: "/myLogo.png",
    apple: "/myLogo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Structured Data (JSON-LD) agar Google mengenali profil personal & variasi kata kunci nama
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "La Ode Muh. Ikhsan Mbala",
    alternateName: [
      "ikhsanlaode",
      "La Ode Muh Ikhsan Mbala",
      "La Ode Muh Ikhsan",
      "Ikhsan Mbala",
      "Ikhsan La Ode",
    ],
    url: "https://ikhsanod.my.id",
    image: "https://ikhsanod.my.id/profile.jpg",
    jobTitle: "Full-Stack Developer & Mobile Engineer",
    sameAs: [
      "https://github.com/Limzy71",
      "https://www.linkedin.com/in/laodemuhikhsanmbala/",
      "https://www.instagram.com/ikhsanlaode_/",
    ],
    knowsAbout: [
      "Software Engineering",
      "Web Development",
      "Mobile App Development",
      "React",
      "Next.js",
      "Laravel",
      "Flutter",
      "PHP",
      "TypeScript",
      "Java",
    ],
  };

  return (
    <html lang="id" className="dark scroll-smooth" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
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
