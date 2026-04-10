"use client";

import { useTheme } from "../context/ThemaeContext";
import { useMemo, useState, useRef } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useInView } from "react-intersection-observer";

export interface SkillFromApi {
  _id: string;
  name: string;
  category: string;
  image?: string;
}

interface ServicesProps {
  skills: SkillFromApi[];
}

const CATEGORY_COLORS: Record<string, string> = {
  Frontend: "#06b6d4",
  Backend: "#a3e635",
  Database: "#f59e0b",
  Tools: "#c084fc",
  default: "#34d399",
};

const SkillCard = ({ skill, color, isDarkMode, index }: { skill: SkillFromApi, color: string, isDarkMode: boolean, index: number }) => {
  const cardRef = useRef<HTMLDivElement>(null);

  // Advanced Tilt Logic
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["15deg", "-15deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-15deg", "15deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = (mouseX / width) - 0.5;
    const yPct = (mouseY / height) - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      initial={{ opacity: 0, scale: 0.9, y: 30 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{
        delay: (index % 5) * 0.1,
        duration: 0.8,
        type: "spring",
        stiffness: 100,
        damping: 15
      }}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      className="perspective-[1000px]"
    >
      <motion.div
        whileHover={{ scale: 1.05 }}
        animate={{
          y: [0, -8, 0],
          transition: {
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
            delay: index * 0.2
          }
        }}
        className={`group relative flex flex-col items-center justify-center p-8 rounded-[2.5rem] border transition-all duration-500 overflow-hidden ${isDarkMode
          ? "bg-slate-900/40 border-white/5 hover:border-white/20 shadow-2xl"
          : "bg-white border-cyan-100/30 hover:border-cyan-200/50 shadow-[0_15px_40px_-15px_rgba(0,0,0,0.05)] hover:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)]"
          }`}
      >
        {/* Advanced Shine Effect */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent -translate-x-[100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-in-out" />
        </div>

        {/* Dynamic Background Glow */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-700 blur-3xl pointer-events-none"
          style={{ background: color }}
        />

        {/* Icon/Image Container with 3D Pop */}
        <div
          style={{ transform: "translateZ(50px)" }}
          className="w-24 h-24 flex items-center justify-center mb-5 transition-all duration-500 group-hover:drop-shadow-[0_10px_10px_rgba(0,0,0,0.1)]"
        >
          {skill.image ? (
            <img src={skill.image} alt={skill.name} className="w-16 h-16 object-contain p-1 filter drop-shadow-2xl transition-transform duration-500 group-hover:scale-110" />
          ) : (
            <span className={`font-black text-5xl ${isDarkMode ? "text-white" : "text-gray-900"}`}>{skill.name.charAt(0)}</span>
          )}
        </div>

        {/* Title */}
        <h3
          style={{ transform: "translateZ(30px)" }}
          className={`font-space font-black uppercase text-center leading-none transition-all duration-500 text-xl tracking-widest ${isDarkMode ? "text-white" : "text-black"
            }`}
        >
          {skill.name}
        </h3>

        {/* Category Indicator with Pulse */}
        <motion.div
          animate={{ scaleX: [1, 1.2, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="mt-4 h-1 rounded-full w-8 transition-all duration-500 group-hover:w-20"
          style={{ backgroundColor: color, boxShadow: `0 0 25px ${color}` }}
        />
      </motion.div>
    </motion.div>
  );
};

const SkillCategory = ({ category, skills, isDarkMode }: { category: string, skills: SkillFromApi[], isDarkMode: boolean }) => {
  const color = CATEGORY_COLORS[category] || CATEGORY_COLORS.default;

  return (
    <div className="mb-32 last:mb-0">
      <div className="flex items-center gap-8 mb-16 px-4">
        <motion.div
          initial={{ width: 0, opacity: 0 }}
          whileInView={{ width: "auto", opacity: 1 }}
          viewport={{ once: true }}
          className="flex items-center gap-6 overflow-hidden"
        >
          <h3 className={`text-3xl md:text-4xl font-black font-space tracking-tighter flex items-center whitespace-nowrap ${isDarkMode ? "text-white" : "text-gray-900"}`}>
            <span className="mr-4 opacity-20">/</span> {category.toUpperCase()}
          </h3>
          <div className="h-[2px] w-40 opacity-20" style={{ background: color }} />
        </motion.div>

        <div className="flex-1 h-[1px] opacity-5 bg-current" />

        <motion.div
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.3, 1, 0.3]
          }}
          transition={{ duration: 3, repeat: Infinity }}
          className="w-5 h-5 rounded-full"
          style={{ background: color, boxShadow: `0 0 20px ${color}` }}
        />
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8 px-4">
        {skills.map((skill, idx) => (
          <SkillCard
            key={skill._id}
            skill={skill}
            color={color}
            isDarkMode={isDarkMode}
            index={idx}
          />
        ))}
      </div>
    </div>
  );
};

const Services: React.FC<ServicesProps> = ({ skills }) => {
  const { isDarkMode } = useTheme();
  const { ref: sectionRef, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  // Group skills by category
  const categorizedSkills = useMemo(() => {
    const groups: Record<string, SkillFromApi[]> = {};
    skills.forEach(skill => {
      if (!groups[skill.category]) groups[skill.category] = [];
      groups[skill.category].push(skill);
    });

    const order = ["Frontend", "Backend", "Database", "Tools"];
    const orderedGroups: Record<string, SkillFromApi[]> = {};
    order.forEach(cat => {
      if (groups[cat]) orderedGroups[cat] = groups[cat];
    });

    Object.keys(groups).forEach(cat => {
      if (!order.includes(cat)) orderedGroups[cat] = groups[cat];
    });
    return orderedGroups;
  }, [skills]);

  return (
    <section
      id="skills"
      ref={sectionRef}
      className={`w-full relative py-40 transition-colors duration-1000 overflow-hidden ${isDarkMode ? "bg-[#11001f]" : "bg-white"}`}
    >
      {/* Dynamic Animated Particles Background (CSS only) */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/10 blur-[150px] animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 blur-[150px] animate-pulse delay-1000" />
      </div>

      <div className="max-w-7xl mx-auto px-[5%] md:px-[8%] relative z-10">
        {/* Professional Header */}
        <div className="mb-24">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 1 }}
            className="flex flex-col items-center md:items-start"
          >
            <div className="flex items-center gap-4 mb-6">
              <span className={`h-[1px] w-12 ${isDarkMode ? "bg-cyan-500" : "bg-cyan-600"}`} />
              <p className={`text-xs uppercase tracking-[0.8em] font-black ${isDarkMode ? "text-cyan-400" : "text-cyan-600"}`}>
                My Expertise
              </p>
            </div>

            <h2 className={`text-6xl md:text-8xl font-black font-space tracking-tighter leading-none ${isDarkMode ? "text-white" : "text-gray-900"}`}>
              TECHNICAL <span className="text-transparent bg-clip-text bg-gradient-to-r from-lime-400 via-cyan-400 to-purple-500 selection:bg-cyan-500">SKILLS</span>
            </h2>
          </motion.div>
        </div>

        {/* Semantic Bento Grid with Motion */}
        <div className="space-y-48">
          {Object.entries(categorizedSkills).map(([category, items]) => (
            <SkillCategory
              key={category}
              category={category}
              skills={items}
              isDarkMode={isDarkMode}
            />
          ))}
        </div>
      </div>

      {/* Decorative Orbs */}
      <motion.div
        animate={{
          y: [0, 50, 0],
          x: [0, 30, 0]
        }}
        transition={{ duration: 10, repeat: Infinity }}
        className="absolute top-[10%] right-[5%] w-64 h-64 bg-cyan-500/5 rounded-full blur-[100px] -z-10"
      />
      <motion.div
        animate={{
          y: [0, -60, 0],
          x: [0, -40, 0]
        }}
        transition={{ duration: 12, repeat: Infinity }}
        className="absolute bottom-[20%] left-[2%] w-80 h-80 bg-purple-500/5 rounded-full blur-[120px] -z-10"
      />
    </section>
  );
};

export default Services;