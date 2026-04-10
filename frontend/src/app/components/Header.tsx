"use client";

import Image from "next/image";
import { motion, useMotionValue, useTransform, useSpring, Variants } from "framer-motion";
import { useTheme } from "../context/ThemaeContext";
import { assets } from "@/assets/assets";
import { useEffect, useState, useRef } from "react";
import { TypeAnimation } from "react-type-animation";

interface Profile {
  name: string;
  bio: string;
  role: string;
  profilePic: string;
}

interface HeaderProps {
  profile: Profile;
}

const Header: React.FC<HeaderProps> = ({ profile }) => {
  const { isDarkMode } = useTheme();
  const [mounted, setMounted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Mouse parallax tracking for ID Card
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Moderate tilt for the card
  const rotateX = useTransform(mouseY, [-400, 400], [15, -15]);
  const rotateY = useTransform(mouseX, [-400, 400], [-15, 15]);
  // Translation for floating elements over the card
  const translateZ = useTransform(mouseX, [-400, 400], [-20, 50]);

  const springRotateX = useSpring(rotateX, { stiffness: 100, damping: 30 });
  const springRotateY = useSpring(rotateY, { stiffness: 100, damping: 30 });
  const springZ = useSpring(translateZ, { stiffness: 80, damping: 30 });

  useEffect(() => { setMounted(true); }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    mouseX.set(e.clientX - centerX);
    mouseY.set(e.clientY - centerY);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  const textReveal: Variants = {
    hidden: { opacity: 0, x: -50 },
    visible: (i: number) => ({
      opacity: 1, x: 0,
      transition: { delay: 0.2 + i * 0.15, duration: 1, type: "spring" as any, stiffness: 80 }
    })
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      // Make background completely transparent to expose global R3F Canvas
      className="relative w-full min-h-[100vh] flex flex-col justify-center overflow-hidden bg-transparent z-10 pt-12 pb-12"
    >
      <div className="w-full max-w-7xl mx-auto px-[5%] md:px-[8%] grid lg:grid-cols-2 gap-12 lg:gap-8 items-center pt-10">

        {/* LEFT COLUMN: Typography Node */}
        <div className="flex flex-col items-start text-left relative z-20">

          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, type: "spring" }}
            className="flex items-center gap-3 mb-6"
          >
            <span className={`px-4 py-1.5 rounded-full text-xs font-black tracking-widest uppercase border ${isDarkMode ? "bg-cyan-950/50 border-cyan-400/30 text-cyan-400" : "bg-cyan-100 border-cyan-300 text-cyan-700"
              }`}>
              ID: {profile.name.replace(/\s+/g, "_").toUpperCase()}
            </span>
            <div className={`h-[1px] w-12 ${isDarkMode ? "bg-cyan-400/50" : "bg-cyan-600/50"}`} />
          </motion.div>

          {/* Greeting */}
          <motion.div custom={0} variants={textReveal} initial="hidden" animate="visible">
            <h3 className={`text-xl md:text-2xl font-bold mb-2 font-space tracking-wide ${isDarkMode ? "text-gray-300" : "text-gray-600"}`}>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-lime-400 to-cyan-400">
                {profile.name}
              </span>
            </h3>
          </motion.div>

          {/* Giant Role Title */}
          <motion.div custom={1} variants={textReveal} initial="hidden" animate="visible" className="mb-8">
            <h1 className={`text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] font-black font-space leading-[1.1] drop-shadow-2xl ${isDarkMode ? "text-white" : "text-gray-900"
              }`}>
              <TypeAnimation
                sequence={[
                  profile.role || "Full Stack Developer",
                  2500,
                  "Backend Developer",
                  2000,
                  "Full Stack Developer",
                  2000,
                ]}
                wrapper="span"
                speed={50}
                repeat={Infinity}
                className="gradient-text-animated block"
                style={{ textShadow: isDarkMode ? "0 0 40px rgba(163,230,53,0.3)" : "none" }}
              />
            </h1>
          </motion.div>

          {/* Bio */}
          <motion.div custom={2} variants={textReveal} initial="hidden" animate="visible" className="mb-12">
            <p className={`text-sm md:text-base max-w-xl leading-relaxed border-l-2 pl-4 ${isDarkMode ? "text-gray-400 border-lime-400/50" : "text-gray-600 border-lime-500/50"
              }`}>
              💻{profile.bio}
            </p>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div custom={3} variants={textReveal} initial="hidden" animate="visible" className="flex flex-wrap items-center gap-6">
            <motion.a
              href="#contact"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`relative px-8 py-4 rounded-xl font-black tracking-widest text-sm overflow-hidden group ${isDarkMode ? "bg-lime-400 text-black shadow-[0_0_30px_rgba(163,230,53,0.3)]" : "bg-gray-900 text-white"
                }`}
            >
              <span className="relative z-10 block">CONNECT WITH ME</span>
              <div className={`absolute inset-0 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ${isDarkMode ? "bg-white" : "bg-gradient-to-r from-lime-500 to-cyan-500"}`} />
            </motion.a>

            <motion.a
              href="#myWork"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-8 py-4 rounded-xl font-bold tracking-widest text-sm transition-all border-2 ${isDarkMode ? "border-gray-700 text-white hover:border-cyan-400 hover:text-cyan-400" : "border-gray-300 text-gray-900 hover:border-lime-500"
                }`}
            >
              VIEW MY WORKS
            </motion.a>
          </motion.div>
        </div>

        {/* RIGHT COLUMN: 3D Floating ID Card */}
        <div className="relative w-full h-[500px] flex items-center justify-center lg:justify-end perspective-[2000px] mt-10 lg:mt-0 lg:ml-12 xl:ml-16 lg:translate-x-6 xl:translate-x-10">

          <motion.div
            initial={{ scale: 0.8, opacity: 0, rotateY: 90 }}
            animate={{ scale: 1, opacity: 1, rotateY: 0 }}
            transition={{ duration: 1.5, type: "spring", stiffness: 50 }}
            style={{
              rotateX: springRotateX,
              rotateY: springRotateY,
              transformStyle: "preserve-3d"
            }}
            className="relative w-full max-w-[320px] lg:max-w-[380px] aspect-[3/4] z-20 mx-auto"
          >
            {/* The Glass Card Body */}
            <div className={`absolute inset-0 rounded-[2rem] border overflow-hidden backdrop-blur-md shadow-2xl transition-colors duration-500 ${isDarkMode
              ? "bg-gray-900/40 border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5),_0_0_40px_rgba(6,182,212,0.15)]"
              : "bg-white/60 border-gray-200 shadow-[0_20px_50px_rgba(0,0,0,0.1)]"
              }`}>

              {/* Decorative Tech Lines */}
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-400 to-lime-400" />
              <div className="absolute top-6 right-6 w-2 h-2 rounded-full bg-red-500 animate-pulse" />

              {/* Profile Image Space */}
              <div className="absolute inset-x-4 top-4 bottom-[25%] rounded-2xl overflow-hidden bg-gray-950/50">
                <Image
                  src={assets.user_image}
                  alt={profile.name}
                  fill
                  className="object-cover opacity-90 transition-transform duration-[10s] hover:scale-110 filter hover:saturate-150"
                  style={{ filter: "contrast(1.1) brightness(0.9)" }}
                />

                {/* Scanner Line Effect */}
                <motion.div
                  className="absolute left-0 right-0 h-1 bg-cyan-400/50 shadow-[0_0_10px_#06b6d4]"
                  animate={{ top: ["0%", "100%", "0%"] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                />
              </div>

              {/* Card Footer Info */}
              <div className="absolute inset-x-0 bottom-0 h-[25%] p-6 flex flex-col justify-end">
                <div className="flex justify-between items-end">
                  <div>
                    <h4 className={`font-space font-black text-xl leading-none mb-1 ${isDarkMode ? "text-white" : "text-gray-900"}`}>
                      {profile.name}
                    </h4>
                    <span className={`text-[10px] uppercase tracking-widest font-bold ${isDarkMode ? "text-cyan-400" : "text-cyan-600"}`}>
                      IT PROFESSIONAL 
                    </span>
                  </div>
                  {/* Decorative Barcode */}
                  <div className="h-8 flex gap-1 opacity-50">
                    {[2, 4, 1, 3, 5, 2, 1, 4].map((width, i) => (
                      <div key={i} className={`h-full bg-current`} style={{ width: `${width}px` }} />
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Floating Holographic Elements over the Card */}
            <motion.div
              style={{ transform: "translateZ(60px)", x: springZ }}
              className={`absolute -top-6 -left-6 p-4 rounded-xl backdrop-blur-md border shadow-xl ${isDarkMode ? "bg-black/60 border-lime-400/30" : "bg-white/80 border-lime-400/50"
                }`}
            >
            </motion.div>

            <motion.div
              style={{ transform: "translateZ(80px)", y: springZ }}
              className={`absolute -bottom-6 -right-6 p-4 rounded-xl backdrop-blur-md border shadow-xl ${isDarkMode ? "bg-black/60 border-cyan-400/30" : "bg-white/80 border-cyan-400/50"
                }`}
            >
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-cyan-400 rounded-full animate-ping" />
                <span className={`text-[10px] font-black tracking-widest ${isDarkMode ? "text-cyan-400" : "text-cyan-600"}`}>ACTIVE CONNECTION</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Header;
