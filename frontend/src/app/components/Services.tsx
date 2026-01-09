"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useTheme } from "../context/ThemaeContext";
import { useState, useMemo } from "react";

export interface SkillFromApi {
  _id: string;
  name: string;
  category: string;
  image?: string;
}

interface ServicesProps {
  skills: SkillFromApi[];
}

const Services: React.FC<ServicesProps> = ({ skills }) => {
  const { isDarkMode } = useTheme();
  const [imageErrors, setImageErrors] = useState<Set<string>>(new Set());

  const handleImageError = (skillId: string) => {
    setImageErrors((prev) => new Set(prev).add(skillId));
  };

  // Group skills by category
  const groupedSkills = useMemo(() => {
    const grouped: { [key: string]: SkillFromApi[] } = {};
    skills.forEach((skill) => {
      if (!grouped[skill.category]) {
        grouped[skill.category] = [];
      }
      grouped[skill.category].push(skill);
    });
    return grouped;
  }, [skills]);

  const categoryIcons: { [key: string]: React.ReactNode } = {
    Frontend: (
      <svg
        className="w-6 h-6"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
        />
      </svg>
    ),
    Backend: (
      <svg
        className="w-6 h-6"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01"
        />
      </svg>
    ),
    Database: (
      <svg
        className="w-6 h-6"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4"
        />
      </svg>
    ),
    Tools: (
      <svg
        className="w-6 h-6"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
        />
      </svg>
    ),
  };

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 1 }}
      id="skills"
      className="w-full px-[12%] py-20 scroll-mt-10 relative overflow-hidden"
    >
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className={`absolute top-20 right-10 w-72 h-72 rounded-full blur-3xl opacity-10 ${
            isDarkMode ? "bg-lime-500" : "bg-lime-300"
          }`}
        ></div>
        <div
          className={`absolute bottom-20 left-10 w-96 h-96 rounded-full blur-3xl opacity-10 ${
            isDarkMode ? "bg-emerald-500" : "bg-emerald-300"
          }`}
        ></div>
      </div>

      {/* Section Header */}
      <div className="relative z-10 text-center mb-16">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <motion.p
            className={`text-sm uppercase tracking-widest mb-3 font-semibold ${
              isDarkMode ? "text-lime-400" : "text-lime-600"
            }`}
          >
            ⚡ My Expertise
          </motion.p>
          <motion.h2
            className={`text-5xl md:text-6xl font-bold font-ovo mb-4 ${
              isDarkMode ? "text-white" : "text-gray-900"
            }`}
          >
            Technical{" "}
            <span className="bg-gradient-to-r from-lime-400 to-emerald-500 bg-clip-text text-transparent">
              Skills
            </span>
          </motion.h2>
          <motion.p
            className={`text-lg max-w-2xl mx-auto ${
              isDarkMode ? "text-gray-400" : "text-gray-600"
            }`}
          >
            A comprehensive toolkit for building modern, scalable web
            applications
          </motion.p>
        </motion.div>
      </div>

      {/* Skills by Category */}
      <div className="relative z-10 space-y-16">
        {Object.entries(groupedSkills).map(
          ([category, categorySkills], categoryIndex) => (
            <motion.div
              key={category}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={container}
            >
              {/* Category Header */}
              <motion.div
                variants={itemVariants}
                className="flex items-center gap-4 mb-8"
              >
                <div
                  className={`p-3 rounded-xl ${
                    isDarkMode
                      ? "bg-gradient-to-br from-lime-400/20 to-emerald-500/20 border border-lime-400/30"
                      : "bg-gradient-to-br from-lime-50 to-emerald-50 border border-lime-200"
                  }`}
                >
                  <div
                    className={isDarkMode ? "text-lime-400" : "text-lime-600"}
                  >
                    {categoryIcons[category] || categoryIcons.Tools}
                  </div>
                </div>
                <div>
                  <h3
                    className={`text-2xl md:text-3xl font-bold font-ovo ${
                      isDarkMode ? "text-white" : "text-gray-900"
                    }`}
                  >
                    {category}
                  </h3>
                  <p
                    className={`text-sm ${
                      isDarkMode ? "text-gray-400" : "text-gray-600"
                    }`}
                  >
                    {categorySkills.length}{" "}
                    {categorySkills.length === 1 ? "skill" : "skills"}
                  </p>
                </div>
              </motion.div>

              {/* Skills Grid */}
              <motion.div
                variants={container}
                className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4"
              >
                {categorySkills.map((skill, index) => (
                  <motion.div
                    key={skill._id}
                    variants={itemVariants}
                    whileHover={{ y: -8, scale: 1.05 }}
                    whileTap={{ scale: 0.98 }}
                    className={`group relative flex flex-col items-center justify-center p-6 rounded-2xl cursor-pointer transition-all duration-300 ${
                      isDarkMode
                        ? "bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 hover:border-lime-400 hover:shadow-lg hover:shadow-lime-400/20"
                        : "bg-white border border-gray-200 hover:border-lime-400 hover:shadow-xl hover:shadow-lime-400/20"
                    }`}
                  >
                    {/* Hover Glow Effect */}
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-lime-400/0 to-emerald-500/0 group-hover:from-lime-400/10 group-hover:to-emerald-500/10 transition-all duration-300"></div>

                    {/* Skill Icon/Image */}
                    <div className="relative z-10 mb-3">
                      {skill.image && !imageErrors.has(skill._id) ? (
                        <div className="relative w-16 h-16 transition-transform duration-300 group-hover:scale-110">
                          <Image
                            src={skill.image}
                            alt={skill.name}
                            fill
                            className="object-contain rounded-2xl"
                            onError={() => handleImageError(skill._id)}
                          />
                        </div>
                      ) : (
                        <div
                          className={`w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold transition-all duration-300 group-hover:scale-110 ${
                            isDarkMode
                              ? "bg-gradient-to-br from-lime-400/20 to-emerald-500/20 text-lime-400 border-2 border-lime-400/30"
                              : "bg-gradient-to-br from-lime-50 to-emerald-50 text-lime-600 border-2 border-lime-200"
                          }`}
                        >
                          {skill.name.charAt(0).toUpperCase()}
                        </div>
                      )}
                    </div>

                    {/* Skill Name */}
                    <h4
                      className={`relative z-10 text-sm font-semibold text-center transition-colors duration-300 ${
                        isDarkMode
                          ? "text-gray-300 group-hover:text-lime-400"
                          : "text-gray-700 group-hover:text-lime-600"
                      }`}
                    >
                      {skill.name}
                    </h4>

                    {/* Animated Border on Hover */}
                    <motion.div
                      className="absolute inset-0 rounded-2xl border-2 border-transparent"
                      whileHover={{
                        borderColor: isDarkMode
                          ? "rgb(163, 230, 53)"
                          : "rgb(132, 204, 22)",
                      }}
                      transition={{ duration: 0.3 }}
                    />
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          )
        )}
      </div>

      {/* Stats Section */}
      {/* <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        viewport={{ once: true }}
        className="relative z-10 mt-20"
      >
        <div
          className={`p-8 rounded-3xl backdrop-blur-sm ${
            isDarkMode
              ? "bg-gradient-to-br from-gray-800/50 to-gray-900/50 border border-gray-700"
              : "bg-gradient-to-br from-white/80 to-gray-50/80 border border-gray-200"
          }`}
        ></div>
      </motion.div> */}
    </motion.div>
  );
};

export default Services;
