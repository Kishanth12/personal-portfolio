"use client";

import Image from "next/image";
import { motion, AnimatePresence, useScroll, useTransform, useSpring, useMotionValue, Variants } from "framer-motion";
import { assets } from "@/assets/assets";
import { useEffect, useState, useRef } from "react";
import { useTheme } from "../context/ThemaeContext";

const MagneticLink = ({ children, href, isActive, isDarkMode }: any) => {
  const ref = useRef<HTMLAnchorElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useTransform(y, [-30, 30], [20, -20]);
  const rotateY = useTransform(x, [-30, 30], [-20, 20]);
  
  const springConfig = { stiffness: 150, damping: 15, mass: 0.1 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);
  const springRotateX = useSpring(rotateX, springConfig);
  const springRotateY = useSpring(rotateY, springConfig);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set(e.clientX - centerX);
    y.set(e.clientY - centerY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.a
      ref={ref}
      href={href}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        x: springX,
        y: springY,
        rotateX: springRotateX,
        rotateY: springRotateY,
        transformStyle: "preserve-3d"
      }}
      className="relative flex items-center justify-center p-2 rounded-full transition-colors"
    >
      <span style={{ transform: "translateZ(20px)" }} className="relative z-10 block">
        {children}
      </span>
    </motion.a>
  );
};

const NavBar: React.FC = () => {
  const { isDarkMode, toggleDarkMode } = useTheme();
  const [isScroll, setIsScroll] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("top");

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 300, damping: 30 });

  useEffect(() => {
    const handleScroll = () => {
      setIsScroll(window.scrollY > 50);
      const sections = [
        { name: "top", id: "top" },
        { name: "about", id: "about" },
        { name: "skills", id: "skills" },
        { name: "myWork", id: "myWork" },
        { name: "contact", id: "contact" },
      ];
      const scrollPosition = window.scrollY + 150;
      if (window.scrollY < 100) { setActiveSection("top"); return; }
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 10) {
        setActiveSection("contact"); return;
      }
      for (const section of sections) {
        const element = document.getElementById(section.id);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetHeight = element.offsetHeight;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section.name); break;
          }
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "#top", id: "top" },
    { name: "About", href: "#about", id: "about" },
    { name: "Work", href: "#myWork", id: "myWork" },
    { name: "Skills", href: "#skills", id: "skills" },
    { name: "Contact", href: "#contact", id: "contact" },
  ];

  const mobileMenuVariants: Variants = {
    hidden: { x: "100%", rotateY: -30, opacity: 0 },
    visible: { x: 0, rotateY: 0, opacity: 1, transition: { type: "spring" as any, damping: 25, stiffness: 100, staggerChildren: 0.1 } },
    exit: { x: "100%", rotateY: -30, opacity: 0, transition: { duration: 0.4 } },
  };

  const mobileLinkVariants: Variants = {
    hidden: { opacity: 0, x: 50, rotateX: 45 },
    visible: { opacity: 1, x: 0, rotateX: 0, transition: { type: "spring" as any, stiffness: 150 } },
  };

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 z-[9999] origin-left"
        style={{ scaleX, background: "linear-gradient(90deg, #a3e635, #06b6d4)" }}
      />

      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 flex items-center justify-between px-6 lg:px-16 py-4 ${
          isScroll 
            ? isDarkMode 
                ? "bg-gray-950/60 backdrop-blur-2xl border-b border-white/5 h-16 shadow-[0_10px_30px_rgba(0,0,0,0.3)]" 
                : "bg-white/60 backdrop-blur-2xl border-b border-gray-200/50 h-16 shadow-lg"
            : "bg-transparent h-24"
        }`}
      >
        <div className="flex items-center gap-6 pointer-events-auto">
          {/* Minimalist Logo */}
          <motion.a 
            href="#top" 
            whileHover={{ scale: 1.05 }}
            className="flex items-center gap-4 group"
          >
            <div className={`w-10 h-10 border-2 flex items-center justify-center font-black font-space text-base transition-all duration-500 ${
              isDarkMode ? "border-cyan-400 text-cyan-400" : "border-gray-900 text-gray-900"
            }`}>
              AK
            </div>
            <div className={`h-8 w-[1px] ${isDarkMode ? "bg-white/10" : "bg-gray-200"}`} />
            <span className={`font-space font-black tracking-[0.4em] uppercase text-[20px] ${isDarkMode ? "text-gray-400" : "text-gray-500"}`}>
              KISHANTH
            </span>
          </motion.a>
        </div>

        {/* Professional Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8 lg:gap-12 pointer-events-auto">
          {navLinks.map((link) => (
            <a 
              key={link.id} 
              href={link.href}
              className="relative group py-2"
            >
              <span className={`text-[11px] font-black tracking-[0.3em] uppercase transition-all duration-500 ${
                activeSection === link.id
                  ? isDarkMode ? "text-cyan-400" : "text-cyan-600"
                  : isDarkMode ? "text-gray-400 group-hover:text-white" : "text-gray-500 group-hover:text-black"
              }`}>
                {link.name}
              </span>
              
              {/* Minimalist Underline */}
              <motion.div 
                className={`absolute bottom-0 left-0 h-[2px] ${isDarkMode ? "bg-cyan-400" : "bg-cyan-600"}`}
                initial={false}
                animate={{ 
                  width: activeSection === link.id ? "100%" : "0%",
                  opacity: activeSection === link.id ? 1 : 0
                }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              />
            </a>
          ))}

          {/* Integrated Theme Toggle */}
          <button
            onClick={toggleDarkMode}
            className={`ml-4 p-2 rounded-full transition-all duration-300 ${isDarkMode ? "text-yellow-400 hover:bg-white/5" : "text-indigo-600 hover:bg-gray-100"}`}
          >
            <Image src={isDarkMode ? assets.sun_icon : assets.moon_icon} alt="" className="w-4" />
          </button>
        </div>
      </motion.nav>

      {/* Mobile Professional Dock */}
      <motion.div 
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 md:hidden w-fit"
      >
        <div className={`flex items-center gap-2 p-2 rounded-2xl backdrop-blur-2xl border transition-all duration-500 ${
          isDarkMode ? "bg-gray-950/90 border-white/10 shadow-2xl" : "bg-white/90 border-gray-200 shadow-xl"
        }`}>
          {navLinks.map((link) => (
            <a 
              key={link.id} 
              href={link.href}
              className={`px-4 py-2 rounded-xl transition-all duration-300 ${
                activeSection === link.id
                  ? isDarkMode ? "bg-cyan-400 text-black font-bold" : "bg-gray-900 text-white font-bold"
                  : isDarkMode ? "text-gray-400 hover:text-white" : "text-gray-500 hover:text-gray-900"
              } text-[9px] font-black tracking-widest uppercase`}
            >
              {link.name}
            </a>
          ))}
        </div>
      </motion.div>
    </>
  );
};

export default NavBar;
