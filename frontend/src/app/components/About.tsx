"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useTheme } from "../context/ThemaeContext";
import { assets } from "@/assets/assets";

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

const About: React.FC<AboutProps> = ({ profile }) => {
  const { isDarkMode } = useTheme();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  const socialLinks = [
    {
      name: "GitHub",
      url: profile.github,
      icon: assets.github,
      size: 50,
    },
    {
      name: "LinkedIn",
      url: profile.linkedin,
      icon: assets.linkedin,
      size: 70,
    },
    {
      name: "Email",
      url: `mailto:${profile.email}`,
      icon: assets.email,
      size: 50,
    },
  ];

  return (
    <motion.div
      id="about"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 1 }}
      viewport={{ once: true }}
      className="relative w-full px-[12%] py-20 scroll-mt-10 overflow-hidden"
    >
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className={`absolute top-40 right-10 w-96 h-96 rounded-full blur-3xl opacity-10 ${
            isDarkMode ? "bg-lime-500" : "bg-lime-300"
          }`}
        ></div>
        <div
          className={`absolute bottom-20 left-10 w-80 h-80 rounded-full blur-3xl opacity-10 ${
            isDarkMode ? "bg-purple-500" : "bg-purple-300"
          }`}
        ></div>
      </div>

      {/* Section Header */}
      <div className="relative z-10 text-center mb-16">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <motion.p
            className={`text-sm uppercase tracking-widest mb-3 font-semibold ${
              isDarkMode ? "text-lime-400" : "text-lime-600"
            }`}
          >
            👨‍💻 Get To Know Me
          </motion.p>
          <motion.h2
            className={`text-5xl md:text-6xl font-bold font-ovo mb-4 ${
              isDarkMode ? "text-white" : "text-gray-900"
            }`}
          >
            About{" "}
            <span className="bg-gradient-to-r from-lime-400 to-emerald-500 bg-clip-text text-transparent">
              Me
            </span>
          </motion.h2>
        </motion.div>
      </div>

      {/* Main Content */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="relative z-10 flex flex-col lg:flex-row items-center gap-12 lg:gap-20"
      >
        {/* Profile Image Section */}
        <motion.div variants={itemVariants} className="flex-shrink-0 relative">
          {/* Decorative Frame */}
          <div className="relative">
            {/* Animated Gradient Border */}
            <motion.div
              animate={{
                rotate: 360,
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: "linear",
              }}
              className="absolute -inset-4 rounded-3xl bg-gradient-to-r from-lime-400 via-emerald-500 to-purple-500 opacity-20 blur-2xl"
            />

            {/* Main Image Container */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
              className={`relative rounded-3xl overflow-hidden shadow-2xl border-4 ${
                isDarkMode
                  ? "border-gray-700 shadow-lime-500/20"
                  : "border-gray-200 shadow-xl"
              }`}
            >
              <Image
                src={profile.profilePic}
                alt={profile.name}
                width={400}
                height={400}
                className="object-cover"
              />

              {/* Overlay Gradient on Hover */}
              <motion.div
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                className="absolute inset-0 bg-gradient-to-t from-lime-400/20 to-transparent"
              />
            </motion.div>

            {/* Floating Badge */}
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              whileInView={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.5, type: "spring" }}
              className={`absolute -bottom-4 -right-4 px-6 py-3 rounded-full font-bold shadow-2xl ${
                isDarkMode
                  ? "bg-gradient-to-r from-lime-400 to-emerald-500 text-black"
                  : "bg-gradient-to-r from-gray-900 to-gray-800 text-white"
              }`}
            >
              Available for Work 🚀
            </motion.div>
          </div>
        </motion.div>

        {/* Bio Section */}
        <motion.div variants={itemVariants} className="flex-1 space-y-6">
          {/* Role Badge */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className={`inline-flex items-center gap-2 px-5 py-2 rounded-full backdrop-blur-sm ${
              isDarkMode
                ? "bg-lime-400/20 border border-lime-400/30"
                : "bg-lime-50 border border-lime-200"
            }`}
          >
            <span
              className={`text-sm font-bold ${
                isDarkMode ? "text-lime-400" : "text-lime-600"
              }`}
            >
              💼 {profile.role}
            </span>
          </motion.div>

          {/* Bio Text */}
          <motion.div
            variants={itemVariants}
            className={`space-y-4 text-base md:text-lg leading-relaxed ${
              isDarkMode ? "text-gray-300" : "text-gray-700"
            }`}
          >
            <p className="font-ovo">{profile.bio}</p>
          </motion.div>

          {/* Stats Grid
          <motion.div
            variants={itemVariants}
            className="grid grid-cols-3 gap-4 py-6"
          >
            {[
              { label: "Projects", value: "50+" },
              { label: "Experience", value: "4+ Months" },
              { label: "Happy Clients", value: "100%" },
            ].map((stat, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05, y: -5 }}
                className={`text-center p-4 rounded-2xl backdrop-blur-sm ${
                  isDarkMode
                    ? "bg-gray-800/50 border border-gray-700"
                    : "bg-white/80 border border-gray-200"
                }`}
              >
                <div
                  className={`text-2xl md:text-3xl font-bold mb-1 ${
                    isDarkMode ? "text-lime-400" : "text-lime-600"
                  }`}
                >
                  {stat.value}
                </div>
                <div
                  className={`text-xs md:text-sm ${
                    isDarkMode ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </motion.div> */}

          {/* Current Work Experience */}
          <motion.div
            variants={itemVariants}
            className={`p-6 rounded-2xl backdrop-blur-sm border ${
              isDarkMode
                ? "bg-gradient-to-br from-gray-800/50 to-gray-900/50 border-gray-700"
                : "bg-gradient-to-br from-white to-gray-50 border-gray-200"
            }`}
          >
            <div className="flex items-start gap-4">
              <div
                className={`p-3 rounded-xl ${
                  isDarkMode
                    ? "bg-lime-400/20 border border-lime-400/30"
                    : "bg-lime-50 border border-lime-200"
                }`}
              >
                <svg
                  className={`w-6 h-6 ${
                    isDarkMode ? "text-lime-400" : "text-lime-600"
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h4
                    className={`font-bold text-lg ${
                      isDarkMode ? "text-white" : "text-gray-900"
                    }`}
                  >
                    Backend Developer
                  </h4>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      isDarkMode
                        ? "bg-lime-400/20 text-lime-400"
                        : "bg-lime-100 text-lime-700"
                    }`}
                  >
                    Current
                  </span>
                </div>
                <p
                  className={`font-semibold mb-1 ${
                    isDarkMode ? "text-gray-300" : "text-gray-700"
                  }`}
                >
                  Gamage Recruiters Pvt Ltd
                </p>
                <p
                  className={`text-sm ${
                    isDarkMode ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  September 2025- March 2026
                </p>
              </div>
            </div>
          </motion.div>

          {/* Social Links */}
          <motion.div variants={itemVariants}>
            <h3
              className={`text-lg font-bold mb-4 ${
                isDarkMode ? "text-white" : "text-gray-900"
              }`}
            >
              Connect with me
            </h3>
            <div className="flex flex-wrap gap-4">
              {socialLinks.map(
                (social) =>
                  social.url && (
                    <motion.a
                      key={social.name}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.1, y: -5 }}
                      whileTap={{ scale: 0.95 }}
                      className={`group relative p-4 rounded-2xl backdrop-blur-sm transition-all duration-300 ${
                        isDarkMode
                          ? "bg-gray-800/50 hover:bg-lime-400/20 border border-gray-700 hover:border-lime-400"
                          : "bg-white hover:bg-lime-50 border border-gray-200 hover:border-lime-400"
                      } shadow-lg hover:shadow-lime-500/20`}
                    >
                      {/* Glow Effect */}
                      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-lime-400 to-emerald-500 opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-300"></div>

                      <Image
                        src={social.icon}
                        alt={social.name}
                        width={social.size}
                        height={social.size}
                        className="relative z-10 transition-transform duration-300 group-hover:scale-110 rounded-2xl"
                      />
                    </motion.a>
                  ),
              )}
            </div>
          </motion.div>

          {/* Download Resume Button */}
          <motion.div variants={itemVariants} className="flex gap-4">
            <motion.a
              href="/Kishanth_Atputharasa_Resume.pdf"
              download="Kishanth_Atputharasa_Resume.pdf"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`inline-flex items-center gap-3 px-8 py-4 rounded-xl font-bold text-base transition-all duration-300 shadow-lg hover:shadow-2xl ${
                isDarkMode
                  ? "bg-gray-800 hover:bg-gray-700 text-white border-2 border-gray-700 hover:border-lime-400"
                  : "bg-white hover:bg-gray-50 text-gray-900 border-2 border-gray-200 hover:border-lime-400"
              }`}
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
                  d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              Download CV
            </motion.a>
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default About;
