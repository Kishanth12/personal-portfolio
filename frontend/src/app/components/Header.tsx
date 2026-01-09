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
}

interface HeaderProps {
  profile: Profile;
}

const Header: React.FC<HeaderProps> = ({ profile }) => {
  const { isDarkMode } = useTheme();

  return (
    <div className="relative w-full h-screen flex items-center justify-center overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
          className={`absolute top-20 left-20 w-72 h-72 rounded-full blur-3xl opacity-20 ${
            isDarkMode ? "bg-lime-500" : "bg-lime-300"
          }`}
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            rotate: [90, 0, 90],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear",
          }}
          className={`absolute bottom-20 right-20 w-96 h-96 rounded-full blur-3xl opacity-20 ${
            isDarkMode ? "bg-purple-500" : "bg-purple-300"
          }`}
        />
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            x: [0, 50, 0],
            y: [0, -50, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full blur-3xl opacity-10 ${
            isDarkMode ? "bg-emerald-500" : "bg-emerald-300"
          }`}
        />
      </div>

      {/* Main Content */}
      <div className="relative z-10 w-11/12 max-w-4xl text-center mx-auto px-4">
        {/* Profile Image with Glow */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{
            duration: 0.8,
            type: "spring",
            stiffness: 100,
          }}
          className="relative inline-block mb-6"
        >
          {/* Animated Ring */}
          <motion.div
            animate={{
              rotate: 360,
              scale: [1, 1.1, 1],
            }}
            transition={{
              rotate: { duration: 20, repeat: Infinity, ease: "linear" },
              scale: { duration: 2, repeat: Infinity, ease: "easeInOut" },
            }}
            className="absolute inset-0 rounded-full bg-gradient-to-r from-lime-400 via-emerald-500 to-purple-500 blur-xl opacity-60"
            style={{
              width: "140px",
              height: "140px",
              left: "-10px",
              top: "-10px",
            }}
          />

          {/* Profile Picture */}
          <motion.div whileHover={{ scale: 1.05 }} className="relative">
            <div className="w-28 h-28 md:w-32 md:h-32 rounded-full overflow-hidden border-4 border-white dark:border-gray-800 shadow-2xl mt-14">
              <Image
                src={profile.profilePic || assets.user_image}
                alt={profile.name}
                width={128}
                height={128}
                className="object-cover"
              />
            </div>
          </motion.div>
        </motion.div>

        {/* Greeting */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <motion.h3
            className={`text-lg md:text-xl font-semibold mb-3 ${
              isDarkMode ? "text-gray-300" : "text-gray-700"
            }`}
          >
            Hi! I'm{" "}
            <span className="bg-gradient-to-r from-lime-400 to-emerald-500 bg-clip-text text-transparent font-bold">
              {profile.name}
            </span>{" "}
            <motion.span
              animate={{ rotate: [0, 14, -8, 14, 0] }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                repeatDelay: 1,
              }}
              className="inline-block"
            >
              👋
            </motion.span>
          </motion.h3>
        </motion.div>

        {/* Role/Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          <h1
            className={`text-3xl sm:text-4xl md:text-5xl font-bold font-ovo mb-4 leading-tight ${
              isDarkMode ? "text-white" : "text-gray-900"
            }`}
          >
            <span className="bg-gradient-to-r from-lime-400 to-emerald-500 bg-clip-text text-transparent">
              {profile.role}
            </span>
          </h1>
        </motion.div>

        {/* Bio */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.6 }}
        >
          <p
            className={`text-sm md:text-base max-w-2xl mx-auto leading-relaxed font-ovo mb-6 ${
              isDarkMode ? "text-gray-400" : "text-gray-600"
            }`}
          >
            {profile.bio}
          </p>
        </motion.div>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.6 }}
          className="flex flex-wrap items-center justify-center gap-4 mb-8"
        >
          <motion.a
            href="#contact"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`group relative px-8 py-4 rounded-full font-bold text-lg overflow-hidden ${
              isDarkMode
                ? "bg-gradient-to-r from-lime-400 to-emerald-500 text-black"
                : "bg-gradient-to-r from-gray-900 to-gray-800 text-white"
            } shadow-lg hover:shadow-2xl transition-shadow duration-300`}
          >
            <span className="relative z-10 flex items-center gap-2">
              Get In Touch
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
            </span>
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
              animate={{ x: ["-200%", "200%"] }}
              transition={{
                repeat: Infinity,
                duration: 3,
                ease: "linear",
              }}
            />
          </motion.a>

          <motion.a
            href="#myWork"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`px-8 py-4 rounded-full font-bold text-lg backdrop-blur-sm transition-all duration-300 ${
              isDarkMode
                ? "bg-white/10 text-white border-2 border-white/20 hover:bg-white/20 hover:border-lime-400"
                : "bg-black/5 text-gray-900 border-2 border-gray-300 hover:bg-black/10 hover:border-lime-400"
            }`}
          >
            View My Work
          </motion.a>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
        >
         
        </motion.div>
      </div>
    </div>
  );
};

export default Header;
