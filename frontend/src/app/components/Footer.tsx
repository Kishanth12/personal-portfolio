"use client";

import { motion } from "framer-motion";
import { useTheme } from "../context/ThemaeContext";

interface FooterProps {
  profile: {
    name?: string;
    email: string;
    github?: string;
    linkedin?: string;
    twitter?: string;
  };
}

const Footer: React.FC<FooterProps> = ({ profile }) => {
  const { isDarkMode } = useTheme();

  return (
    <footer className={`relative w-full py-12 px-[5%] md:px-[8%] z-10 border-t ${isDarkMode ? "border-gray-900 bg-black/50" : "border-gray-200 bg-white/50"} backdrop-blur-xl`}>
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        
        {/* Brand / Name */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex items-center gap-3"
        >
          <div className={`w-3 h-3 rounded-full ${isDarkMode ? "bg-cyan-400 shadow-[0_0_10px_#06b6d4]" : "bg-cyan-500"}`} />
          <span className={`font-space font-black tracking-widest uppercase text-lg ${isDarkMode ? "text-white" : "text-gray-900"}`}>
            {profile.name || "Kishanth"}
          </span>
        </motion.div>

        {/* Status Text & Links */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="flex gap-6 items-center flex-wrap justify-center"
        >
          <span className={`text-xs uppercase tracking-widest font-bold ${isDarkMode ? "text-gray-600" : "text-gray-400"}`}>
            System Online
          </span>
          {profile.github && (
            <a href={profile.github} target="_blank" rel="noopener noreferrer" className={`text-sm font-bold hover:text-cyan-400 transition-colors ${isDarkMode ? "text-gray-400" : "text-gray-800"}`}>GITHUB</a>
          )}
          {profile.linkedin && (
            <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className={`text-sm font-bold hover:text-cyan-400 transition-colors ${isDarkMode ? "text-gray-400" : "text-gray-800"}`}>LINKEDIN</a>
          )}
          <a href="#top" onClick={(e) => { e.preventDefault(); window.scrollTo({top: 0, behavior: 'smooth'}); }} className={`text-sm font-bold hover:text-lime-400 transition-colors ${isDarkMode ? "text-gray-400" : "text-gray-800"}`}>
            SCROLL TO TOP ↑
          </a>
        </motion.div>
      </div>

      {/* Decorative Grid Line */}
      <div className="absolute top-0 left-[10%] right-[10%] h-[1px] bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent" />
    </footer>
  );
};

export default Footer;
