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

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 1 }}
      id="skills"
      className="w-full px-[12%] py-10 scroll-mt-10"
    >
      <motion.h2 className="text-center text-5xl font-ovo">My Skills</motion.h2>
      <motion.p className="text-center max-w-2xl mx-auto mt-5 mb-12 font-ovo">
        I am a Full Stack Developer. Here are the technologies and skills I use
        to build scalable and efficient web applications.
      </motion.p>

      {/* Display skills grouped by category */}
      <div className="space-y-12">
        {Object.entries(groupedSkills).map(([category, categorySkills]) => (
          <motion.div
            key={category}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            {/* Category Title */}
            <h3
              className={`text-xl font-bold mb-6 font-ovo ${
                isDarkMode ? "text-white" : "text-gray-800"
              }`}
            >
              {category.toUpperCase()}
            </h3>

            {/* Skills Grid */}
            <motion.div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 xl:grid-cols-6 gap-3">
              {categorySkills.map((skill) => (
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  key={skill._id}
                  className={`flex flex-col items-center text-center border border-gray-400 rounded-lg p-2 cursor-pointer hover:-translate-y-1 duration-500 hover:shadow-md ${
                    isDarkMode
                      ? "hover:bg-dark-hover hover:shadow-white"
                      : "hover:bg-lightHover"
                  }`}
                >
                  {/* Skill Icon */}
                  {skill.image && !imageErrors.has(skill._id) ? (
                    <Image
                      src={skill.image}
                      alt={skill.name}
                      width={50}
                      height={50}
                      className="mb-1"
                      onError={() => handleImageError(skill._id)}
                    />
                  ) : (
                    <div
                      className={`w-8 h-8 mb-1 rounded-full flex items-center justify-center text-sm font-bold ${
                        isDarkMode
                          ? "bg-gray-700 text-white"
                          : "bg-gray-200 text-gray-700"
                      }`}
                    >
                      {skill.name.charAt(0).toUpperCase()}
                    </div>
                  )}

                  <h3
                    className={`text-xs font-semibold ${
                      isDarkMode ? "text-white" : "text-gray-700"
                    }`}
                  >
                    {skill.name}
                  </h3>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default Services;
