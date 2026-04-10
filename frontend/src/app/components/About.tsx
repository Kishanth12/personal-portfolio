"use client";

import Image from "next/image";
import { motion, useMotionValue, useSpring, useTransform, Variants } from "framer-motion";
import { useTheme } from "../context/ThemaeContext";
import { assets } from "@/assets/assets";
import { useRef } from "react";

interface Profile {
  name: string;
  bio: string;
  role: string;
  profilePic: string;
  github?: string;
  linkedin?: string;
  email: string;
}

interface AboutProps {
  profile: Profile;
}

// Reusable Magnetic Hook / logic for buttons
const useMagneticMotion = () => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 150, damping: 15 });
  const springY = useSpring(y, { stiffness: 150, damping: 15 });

  const handleMouseMove = (e: React.MouseEvent, ref: React.RefObject<HTMLElement>) => {
    if (!ref.current) return;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    x.set((e.clientX - centerX) * 0.35);
    y.set((e.clientY - centerY) * 0.35);
  };

  const reset = () => {
    x.set(0);
    y.set(0);
  };

  return { x: springX, y: springY, handleMouseMove, reset };
};

const About: React.FC<AboutProps> = ({ profile }) => {
  const { isDarkMode } = useTheme();

  // 3D Mouse Parallax for Profile Card
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const cardRef = useRef<HTMLDivElement>(null);

  const rotateX = useTransform(mouseY, [-300, 300], [10, -10]);
  const rotateY = useTransform(mouseX, [-300, 300], [-10, 10]);

  const springRotateX = useSpring(rotateX, { stiffness: 100, damping: 20 });
  const springRotateY = useSpring(rotateY, { stiffness: 100, damping: 20 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = cardRef.current?.getBoundingClientRect();
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

  // Cinematic 3D Reveal Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 50, rotateX: -15, perspective: 1000 },
    visible: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      transition: {
        duration: 0.8,
        type: "spring",
        stiffness: 80,
        damping: 12
      },
    },
  };

  const socialLinks = [
    { name: "GitHub", url: profile.github, icon: assets.github, size: 50 },
    { name: "LinkedIn", url: profile.linkedin, icon: assets.linkedin, size: 70 },
    { name: "Email", url: `https://mail.google.com/mail/?view=cm&fs=1&to=${profile.email}`, icon: assets.email, size: 50 },
  ];

  return (
    <motion.div
      id="about"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      className="relative w-full px-[5%] md:px-[8%] py-40 overflow-hidden"
    >
      {/* Dynamic 3D Atmospheric Background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-30">
        <motion.div
          animate={{
            y: [0, -40, 0],
            x: [0, 20, 0],
            scale: [1, 1.1, 1]
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className={`absolute top-20 right-[10%] w-[500px] h-[500px] rounded-full blur-[100px] ${isDarkMode ? "bg-lime-500/20" : "bg-lime-300/30"
            }`}
        />
        <motion.div
          animate={{
            y: [0, 60, 0],
            x: [0, -30, 0],
            scale: [1, 1.2, 1]
          }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className={`absolute bottom-20 left-[5%] w-[400px] h-[400px] rounded-full blur-[120px] ${isDarkMode ? "bg-purple-500/20" : "bg-purple-300/30"
            }`}
        />
      </div>

      <div className="relative z-10 text-center mb-24">
        <motion.div variants={itemVariants}>
          <h2 className={`text-6xl md:text-8xl font-black font-space tracking-tighter ${isDarkMode ? "text-white" : "text-gray-900"}`}>
            ABOUT <span className="text-transparent bg-clip-text bg-gradient-to-r from-lime-400 via-emerald-400 to-cyan-500">ME</span>
          </h2>
        </motion.div>
      </div>

      <motion.div
        variants={containerVariants}
        className="relative z-10 flex flex-col lg:flex-row items-start gap-20 lg:gap-32"
      >
        {/* Profile Image Section with 3D Parallax */}
        <motion.div
          variants={itemVariants}
          className="flex-shrink-0 relative group lg:-mt-10"
          ref={cardRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          style={{ rotateX: springRotateX, rotateY: springRotateY, perspective: 1200 }}
        >
          <div className="absolute -inset-8 rounded-[3rem] bg-gradient-to-tr from-lime-400 via-cyan-400 to-purple-500 opacity-0 group-hover:opacity-30 blur-3xl transition-opacity duration-700 active:opacity-50" />

          <motion.div
            whileHover={{ scale: 1.02 }}
            style={{
              transform: "translateZ(30px)",
              boxShadow: isDarkMode ? "0 40px 100px -20px rgba(0,0,0,0.8)" : "0 40px 100px -20px rgba(0,0,0,0.15)"
            }}
            className={`relative rounded-[2.5rem] overflow-hidden border-4 backdrop-blur-3xl transition-all duration-500 ${isDarkMode ? "border-white/10" : "border-gray-100"
              }`}
          >
            <Image
              src={profile.profilePic || assets.user_image}
              alt={profile.name}
              width={450}
              height={450}
              className="object-cover transition-transform duration-1000 group-hover:scale-110"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          </motion.div>

          {/* Floating Availability HUD Pill */}
          <motion.div
            initial={{ opacity: 0, x: 20, scale: 0.8 }}
            whileInView={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ delay: 0.8, type: "spring", stiffness: 100 }}
            style={{ transform: "translateZ(100px)" }}
            className={`absolute -bottom-4 -right-8 px-8 py-3 rounded-full font-black text-[10px] tracking-[0.2em] shadow-2xl border flex items-center gap-4 transition-colors duration-500 overflow-hidden ${isDarkMode
              ? "bg-slate-950/90 border-lime-400/30 text-lime-400 shadow-lime-900/40"
              : "bg-white/95 border-lime-500/40 text-lime-600 shadow-lime-100"
              }`}
          >
            {/* Radar Pulse Animation */}
            <div className="relative flex items-center justify-center w-3 h-3">
              <span className="absolute w-full h-full rounded-full bg-current animate-ping opacity-40" />
              <span className="relative w-2 h-2 rounded-full bg-current" />
            </div>
            <span className="whitespace-nowrap translate-y-[1px]">OPEN_FOR_COLLABORATION</span>
            
            {/* Background Glass Shine */}
            <motion.div 
              animate={{ x: ["-100%", "100%"] }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12"
            />
          </motion.div>
        </motion.div>

        {/* Bio Section */}
        <div className="flex-1 space-y-3 text-left">
          <motion.div variants={itemVariants} className="space-y-2">
            <div className={`inline-flex items-center gap-3 px-6 py-2 rounded-full backdrop-blur-md border ${isDarkMode ? "bg-lime-400/10 border-lime-400/20 text-lime-400" : "bg-lime-50 border-lime-200 text-lime-600"
              }`}>
              <span className="w-2 h-2 rounded-full bg-current animate-pulse" />
              <span className="text-xs font-black uppercase tracking-widest leading-none translate-y-[1px]">
                {profile.role}
              </span>
            </div>

            <p className={`text-xl md:text-xl font-medium leading-[1.6] ${isDarkMode ? "text-gray-300" : "text-gray-700"}`}>
              {profile.bio}
            </p>
          </motion.div>

          {/* Latest Experience Module - Cyber Professional Refinement */}
          <motion.div
            variants={itemVariants}
            className={`relative p-8 md:p-10 rounded-[2.5rem] border backdrop-blur-3xl transition-all duration-500 group overflow-hidden ${isDarkMode 
                ? "bg-slate-950/40 border-white/5 hover:border-lime-400/30 shadow-[0_0_50px_rgba(0,0,0,0.5)]" 
                : "bg-white/80 border-gray-100 hover:border-lime-500/30 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1)] hover:shadow-2xl"
              }`}
          >
            {/* Subtle Grid Pattern Overlay */}
            <div className={`absolute inset-0 opacity-[0.03] pointer-events-none ${isDarkMode ? 'invert' : ''}`} 
                 style={{ backgroundImage: 'radial-gradient(#000 0.5px, transparent 0.5px)', backgroundSize: '24px 24px' }} />

            <div className="flex flex-col md:flex-row items-center gap-10 relative z-10">
              {/* Status Pillar */}
              <div className="flex flex-col items-center">
                <div className={`w-20 h-20 rounded-3xl flex items-center justify-center border transition-all duration-500 group-hover:scale-110 group-hover:rotate-6 ${isDarkMode ? "bg-slate-800 border-white/10" : "bg-gray-50 border-gray-100"
                  }`}>
                  <svg className={`w-10 h-10 ${isDarkMode ? "text-lime-400" : "text-lime-600"}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div className="w-[2px] h-12 bg-gradient-to-b from-lime-400/50 to-transparent mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              </div>

              <div className="flex-1 space-y-2 text-center md:text-left">
                <div className="flex flex-col md:flex-row md:items-center gap-4 mb-2">
                  <h4 className={`text-2xl font-black font-space tracking-tight ${isDarkMode ? "text-white" : "text-gray-900"}`}>Backend Developer</h4>
                  <span className={`self-center md:self-auto px-4 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border transition-colors ${
                    isDarkMode ? 'bg-lime-400/10 border-lime-400/20 text-lime-400' : 'bg-lime-50 border-lime-200 text-lime-600'
                  }`}>
                    VERIFIED_CONTRACT
                  </span>
                </div>
                <p className={`text-lg font-bold leading-none ${isDarkMode ? "text-lime-400/80" : "text-lime-600"}`}>Gamage Recruiters Pvt Ltd</p>
                <div className="flex items-center justify-center md:justify-start gap-3 pt-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-current opacity-30" />
                  <p className={`text-xs tracking-[0.3em] uppercase font-black opacity-40`}>Sept 2025 — March 2026</p>
                </div>
              </div>

              {/* Advanced Call-to-Action Mini Arrow */}
              <div className="hidden lg:block opacity-0 group-hover:opacity-100 transition-all duration-500 translate-x-4 group-hover:translate-x-0">
                <svg className={`w-8 h-8 ${isDarkMode ? "text-white/20" : "text-gray-200"}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </div>
            </div>
          </motion.div>

          {/* Social Nodes */}
          <motion.div variants={itemVariants} className="space-y-6">
            <h3 className={`text-xs font-black uppercase tracking-[0.4em] opacity-100 ${isDarkMode ? "text-white" : "text-gray-900"}`}>
              <b>Social Links</b>
            </h3>
            <div className="flex flex-wrap gap-6">
              {socialLinks.map((social) => social.url && (
                <MagneticButton key={social.name}>
                  <motion.a
                    href={social.url}
                    target="_blank"
                    className={`relative w-20 h-20 rounded-3xl border-2 flex items-center justify-center transition-all ${isDarkMode ? "bg-slate-900 border-slate-700 hover:border-lime-400 shadow-black" : "bg-white border-gray-100 hover:border-lime-500 shadow-gray-200"
                      } shadow-xl`}
                  >
                    <Image src={social.icon} alt={social.name} width={40} height={40} className="rounded-lg transition-transform duration-300 group-hover:scale-110" />
                  </motion.a>
                </MagneticButton>
              ))}
            </div>
          </motion.div>

          {/* Download Action */}
          <motion.div variants={itemVariants} className="pt-6">
            <MagneticButton>
              <a
                href="/Kishanth_Atputharasa_Resume.pdf"
                download
                className={`inline-flex items-center gap-4 px-12 py-6 rounded-3xl font-black tracking-[0.3em] text-sm overflow-hidden relative group transition-all ${isDarkMode
                  ? "bg-white text-black hover:shadow-[0_0_50px_rgba(255,255,255,0.2)]"
                  : "bg-gray-900 text-white shadow-2xl"
                  }`}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-lime-400 to-cyan-400 opacity-0 group-hover:opacity-10 transition-opacity" />
                Download My Resume
                <svg className="w-5 h-5 group-hover:translate-y-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
              </a>
            </MagneticButton>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
};

// Internal Magnetic Component for clean logic injection
const MagneticButton = ({ children }: { children: React.ReactElement }) => {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 150, damping: 15 });
  const springY = useSpring(y, { stiffness: 150, damping: 15 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    x.set((e.clientX - centerX) * 0.4);
    y.set((e.clientY - centerY) * 0.4);
  };

  const reset = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={reset}
      style={{ x: springX, y: springY }}
      className="group"
    >
      {children}
    </motion.div>
  );
};

export default About;