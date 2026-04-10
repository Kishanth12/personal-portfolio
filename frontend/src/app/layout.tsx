import type { Metadata } from "next";
import { Outfit, Ovo, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "./context/ThemaeContext";

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const ovo = Ovo({
  subsets: ["latin"],
  weight: ["400"],
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-space-grotesk",
});

export const metadata: Metadata = {
  title: "Portfolio — Kishanth | Full Stack Developer",
  description: "Full Stack Developer crafting exceptional digital experiences with modern technologies.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${outfit.className} ${ovo.className} ${spaceGrotesk.variable} relative antialiased leading-8 overflow-x-hidden light:light-theme dark:dark-theme`}
      >
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
