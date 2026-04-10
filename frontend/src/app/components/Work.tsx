"use client";

import { motion, useScroll, useTransform, useSpring, useMotionValue } from "framer-motion";
import { useTheme } from "../context/ThemaeContext";
import { useRef, useState } from "react";
import Image from "next/image";

export interface Project {
  _id: string;
  title: string;
  description: string;
  techStack: string[];
  githubUrl: string;
  liveUrl?: string;
  image: string;
  featured?: boolean;
}

interface WorkProps {
  projects: Project[];
}

const Deep3DProjectCard: React.FC<{ project: Project; index: number; isDarkMode: boolean }> = ({ project, index, isDarkMode }) => {
  const cardRef = useRef<HTMLDivElement>(null);

  // Advanced 3D Hover Parallax
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useTransform(mouseY, [-400, 400], [25, -25]); // Aggressive tilt
  const rotateY = useTransform(mouseX, [-400, 400], [-25, 25]);
  const translateZ = useTransform(mouseX, [-400, 0, 400], [-30, 80, -30]);

  const springRotateX = useSpring(rotateX, { stiffness: 150, damping: 20 });
  const springRotateY = useSpring(rotateY, { stiffness: 150, damping: 20 });
  const springTranslateZ = useSpring(translateZ, { stiffness: 100, damping: 25 });

  // Scroll Parallax
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"]
  });
  const y = useTransform(scrollYProgress, [0, 1], [150, -150]);

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

  return (
    <motion.div
      ref={cardRef}
      style={{ y, perspective: 1500 }}
      className={`w-full max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-10 md:gap-20 relative  ${index % 2 !== 0 ? "md:flex-row-reverse" : ""}`}
    >
      {/* 3D Image Container */}
      <div
        className="w-full md:w-3/5 h-[400px] md:h-[500px] relative cursor-crosshair group"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <motion.div
          style={{
            rotateX: springRotateX,
            rotateY: springRotateY,
            z: springTranslateZ,
            transformStyle: "preserve-3d"
          }}
          className="w-full h-full relative z-10"
        >
          {/* Base Layer */}
          <div className={`absolute inset-0 rounded-3xl border-2 overflow-hidden shadow-2xl transition-colors duration-500 ${isDarkMode ? "border-gray-800 bg-gray-900 shadow-lime-400/10" : "border-gray-200 bg-white"}`}>
            {project.image ? (
              <Image
                src={project.image}
                alt={project.title}
                fill
                className="object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-500"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-lime-400/20 to-cyan-400/20 flex items-center justify-center font-space text-4xl text-gray-400">No Image</div>
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-950/20 to-transparent opacity-80 mix-blend-multiply" />
          </div>

          {/* Floating UI Layer (z-axis pushed out) */}
          <motion.div
            style={{ transform: "translateZ(80px)" }}
            className="absolute inset-0 flex flex-col justify-end p-8 md:p-12 pointer-events-none"
          >
            <div className="flex flex-wrap gap-3 mb-4">
              {project.techStack?.slice(0, 4).map((tech, i) => (
                <span key={i} className={`px-4 py-1.5 rounded-full text-xs font-bold backdrop-blur-md border ${isDarkMode ? "bg-black/50 border-lime-400/30 text-lime-400" : "bg-white/80 border-lime-500 text-lime-700"}`}>
                  {tech}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Extreme floating badge overlay */}
          {project.featured && (
            <motion.div
              style={{ transform: "translateZ(120px) translateX(-20px) translateY(-20px)" }}
              className="absolute top-0 right-0 w-24 h-24 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center shadow-[0_0_50px_rgba(6,182,212,0.6)] border-4 border-gray-950"
            >
              <span className="font-space font-black text-white transform -rotate-12">FEATURED</span>
            </motion.div>
          )}
        </motion.div>
      </div>

      {/* Info Container */}
      <div className="w-full md:w-2/5 flex flex-col">
        <motion.div
          initial={{ opacity: 0, x: index % 2 === 0 ? 50 : -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, type: "spring" }}
        >
          <div className="text-[10px] uppercase font-black tracking-[0.3em] mb-4 text-cyan-500">
            Project {String(index + 1).padStart(2, '0')}
          </div>
          <h3 className={`text-3xl md:text-4xl lg:text-5xl font-black font-space mb-6 leading-none tracking-tight ${isDarkMode ? "text-white" : "text-gray-900"}`}>
            {project.title}
          </h3>
          <p className={`text-base md:text-lg mb-8 leading-relaxed border-l-2 pl-4 ${isDarkMode ? "text-gray-400 border-gray-800" : "text-gray-600 border-gray-200"}`}>
            {project.description}
          </p>

          <div className="flex gap-4">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={`relative px-8 py-3 rounded-xl font-bold transition-all hover:scale-105 ${isDarkMode ? "bg-lime-400 text-black shadow-[0_0_20px_rgba(163,230,53,0.3)]" : "bg-gray-900 text-white"}`}
              >
                Launch App
              </a>
            )}
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`px-8 py-3 rounded-xl font-bold transition-all hover:scale-105 border-2 ${isDarkMode ? "border-gray-800 text-white hover:border-cyan-400 hover:text-cyan-400" : "border-gray-200 text-gray-900 hover:border-lime-500"}`}
            >
              Source Code
            </a>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

const Work: React.FC<WorkProps> = ({ projects }) => {
  const { isDarkMode } = useTheme();

  // Sort featured projects first
  const sortedProjects = [...projects].sort((a, b) => {
    if (a.featured && !b.featured) return -1;
    if (!a.featured && b.featured) return 1;
    return 0;
  });

  return (
    <div id="myWork" className="w-full relative py-40 overflow-hidden bg-transparent z-10">

      {/* 3D Background Number Overlays */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden select-none flex flex-col justify-between opacity-[0.03] z-[-1]">
        <h1 className="text-[30vw] font-black font-space leading-none tracking-tighter text-white whitespace-nowrap ml-[-10vw]">PROJECTS</h1>
        <h1 className="text-[30vw] font-black font-space leading-none tracking-tighter text-white whitespace-nowrap ml-[20vw]">ARCHIVE</h1>
      </div>

      <div className="px-[5%] md:px-[8%]">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-24"
        >
          <h2 className={`text-6xl md:text-8xl font-black font-space ${isDarkMode ? "text-white" : "text-gray-900"}`}>
            MY <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">Works</span>
          </h2>
        </motion.div>

        {sortedProjects.map((project, index) => (
          <Deep3DProjectCard
            key={project._id}
            project={project}
            index={index}
            isDarkMode={isDarkMode}
          />
        ))}
      </div>
    </div>
  );
};

export default Work;
