"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "../context/ThemaeContext";

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

const Work: React.FC<WorkProps> = ({ projects }) => {
  const { isDarkMode } = useTheme();
  const [showAll, setShowAll] = useState(false);

  // Separate featured and non-featured projects
  const featuredProjects = projects.filter((p) => p.featured);
  const regularProjects = projects.filter((p) => !p.featured);

  // Combine: featured first, then regular
  const sortedProjects = [...featuredProjects, ...regularProjects];

  // Show first 3 projects initially
  const displayedProjects = showAll
    ? sortedProjects
    : sortedProjects.slice(0, 3);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.15 },
    },
  };

  const item = {
    hidden: { opacity: 0, scale: 0.9, y: 30 },
    show: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { type: "spring" as const, stiffness: 100 },
    },
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 1 }}
      id="myWork"
      className="w-full px-[12%] py-20 scroll-mt-5 relative overflow-hidden"
    >
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className={`absolute top-20 right-10 w-72 h-72 rounded-full blur-3xl opacity-20 ${
            isDarkMode ? "bg-lime-500" : "bg-lime-300"
          }`}
        ></div>
        <div
          className={`absolute bottom-20 left-10 w-96 h-96 rounded-full blur-3xl opacity-10 ${
            isDarkMode ? "bg-purple-500" : "bg-purple-300"
          }`}
        ></div>
      </div>

      {/* Section Header */}
      <div className="relative z-10 mb-16">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <motion.p
            className={`text-sm uppercase tracking-widest mb-3 font-semibold ${
              isDarkMode ? "text-lime-400" : "text-lime-600"
            }`}
          >
            ✨ Showcase
          </motion.p>
          <motion.h2
            className={`text-5xl md:text-6xl font-bold font-ovo mb-4 ${
              isDarkMode ? "text-white" : "text-gray-900"
            }`}
          >
            Featured{" "}
            <span className="bg-gradient-to-r from-lime-400 to-emerald-500 bg-clip-text text-transparent">
              Projects
            </span>
          </motion.h2>
          <motion.p
            className={`text-lg max-w-2xl mx-auto ${
              isDarkMode ? "text-gray-400" : "text-gray-600"
            }`}
          >
            A collection of my best work, crafted with passion and precision
          </motion.p>
        </motion.div>
      </div>

      {/* Projects Grid */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative z-10"
      >
        <AnimatePresence>
          {displayedProjects.map((project, index) => (
            <motion.div
              key={project._id}
              variants={item}
              initial="hidden"
              animate="show"
              exit={{ opacity: 0, scale: 0.8, transition: { duration: 0.3 } }}
              layout
              className="group relative"
            >
              {/* Featured Badge */}
              {project.featured && (
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ type: "spring", delay: 0.2 }}
                  className="absolute -top-4 -right-4 bg-gradient-to-br from-yellow-400 to-orange-500 text-white px-5 py-2 rounded-full text-xs font-bold shadow-2xl z-20 border-2 border-white dark:border-gray-800"
                >
                  ⭐ Featured
                </motion.div>
              )}

              {/* Project Card */}
              <motion.div
                whileHover={{ y: -12, scale: 1.02 }}
                transition={{ duration: 0.4, type: "spring", stiffness: 300 }}
                className={`relative overflow-hidden rounded-3xl shadow-2xl ${
                  isDarkMode
                    ? "bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700"
                    : "bg-white border border-gray-100"
                } h-full flex flex-col backdrop-blur-sm`}
              >
                {/* Image Container with Overlay */}
                <div className="relative w-full h-72 overflow-hidden flex-shrink-0">
                  <img
                    src={project.image || "/placeholder-project.jpg"}
                    alt={project.title}
                    className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:rotate-2"
                  />

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />

                  {/* Quick Action Buttons on Image */}
                  <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-lime-400 hover:bg-lime-500 text-black p-3 rounded-full shadow-lg transform hover:scale-110 transition-all"
                        title="View Live Demo"
                      >
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                          />
                        </svg>
                      </a>
                    )}
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-white hover:bg-gray-100 text-black p-3 rounded-full shadow-lg transform hover:scale-110 transition-all"
                      title="View on GitHub"
                    >
                      <svg
                        className="w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          fillRule="evenodd"
                          d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </a>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 flex flex-col flex-grow">
                  <h3
                    className={`text-2xl font-bold mb-3 group-hover:text-lime-400 transition-colors duration-300 ${
                      isDarkMode ? "text-white" : "text-gray-900"
                    }`}
                  >
                    {project.title}
                  </h3>

                  <p
                    className={`text-sm mb-5 leading-relaxed ${
                      isDarkMode ? "text-gray-300" : "text-gray-600"
                    }`}
                  >
                    {project.description}
                  </p>

                  {/* Tech Stack with Icons */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {Array.isArray(project.techStack) &&
                      project.techStack.map((tech, i) => (
                        <motion.span
                          key={i}
                          whileHover={{ scale: 1.1, y: -2 }}
                          className={`text-xs px-4 py-2 rounded-full font-semibold backdrop-blur-sm transition-all cursor-default ${
                            isDarkMode
                              ? "bg-gray-700/80 text-lime-400 border border-gray-600 hover:border-lime-400"
                              : "bg-gradient-to-r from-lime-50 to-emerald-50 text-lime-700 border border-lime-200 hover:border-lime-400"
                          }`}
                        >
                          {tech}
                        </motion.span>
                      ))}
                  </div>

                  {/* Footer Buttons */}
                  <div className="flex gap-3 mt-auto pt-4 border-t border-gray-700 dark:border-gray-600">
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 text-center bg-gradient-to-r from-lime-400 to-emerald-500 hover:from-lime-500 hover:to-emerald-600 text-black font-bold py-3 px-4 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-lime-500/50"
                      >
                        <span className="flex items-center justify-center gap-2">
                          <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                            />
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                            />
                          </svg>
                          Live Demo
                        </span>
                      </a>
                    )}
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`flex-1 text-center font-bold py-3 px-4 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg ${
                        isDarkMode
                          ? "bg-gray-700 hover:bg-gray-600 text-white border border-gray-600 hover:border-gray-500"
                          : "bg-gray-900 hover:bg-gray-800 text-white"
                      }`}
                    >
                      <span className="flex items-center justify-center gap-2">
                        <svg
                          className="w-4 h-4"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            fillRule="evenodd"
                            d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                            clipRule="evenodd"
                          />
                        </svg>
                        GitHub
                      </span>
                    </a>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Explore More Button */}
      {sortedProjects.length > 3 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex justify-center mt-16 relative z-10"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowAll(!showAll)}
            className={`group px-10 py-5 rounded-2xl font-bold text-lg transition-all duration-500 shadow-2xl relative overflow-hidden ${
              isDarkMode
                ? "bg-gradient-to-r from-lime-400 to-emerald-500 text-black"
                : "bg-gradient-to-r from-gray-900 to-gray-800 text-white"
            }`}
          >
            <span className="relative z-10 flex items-center gap-3">
              {showAll ? (
                <>
                  <svg
                    className="w-5 h-5 transform group-hover:-translate-y-1 transition-transform"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={3}
                      d="M5 15l7-7 7 7"
                    />
                  </svg>
                  Show Less
                </>
              ) : (
                <>
                  Explore More Projects
                  <svg
                    className="w-5 h-5 transform group-hover:translate-x-1 transition-transform"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={3}
                      d="M13 7l5 5m0 0l-5 5m5-5H6"
                    />
                  </svg>
                </>
              )}
            </span>

            {/* Animated Background */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
              animate={{
                x: ["-200%", "200%"],
              }}
              transition={{
                repeat: Infinity,
                duration: 3,
                ease: "linear",
              }}
            />
          </motion.button>
        </motion.div>
      )}

      {/* Projects Count with Animation */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        className="text-center mt-8 relative z-10"
      >
        <p
          className={`text-sm font-medium ${
            isDarkMode ? "text-gray-500" : "text-gray-600"
          }`}
        >
          Showing{" "}
          <span
            className={`font-bold ${
              isDarkMode ? "text-lime-400" : "text-lime-600"
            }`}
          >
            {displayedProjects.length}
          </span>{" "}
          of{" "}
          <span
            className={`font-bold ${
              isDarkMode ? "text-lime-400" : "text-lime-600"
            }`}
          >
            {sortedProjects.length}
          </span>{" "}
          projects
        </p>
      </motion.div>
    </motion.div>
  );
};

export default Work;
