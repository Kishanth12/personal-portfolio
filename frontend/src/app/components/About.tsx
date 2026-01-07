"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useTheme } from "../context/ThemaeContext";

interface Profile {
  name: string;
  bio: string;
  role: string;
  profilePic: string;
}

interface AboutProps {
  profile: Profile;
}

const About: React.FC<AboutProps> = ({ profile }) => {
  const { isDarkMode } = useTheme();

  return (
    <motion.div
      id="about"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className={`w-full px-[12%] py-10 scroll-mt-20 ${
        isDarkMode ? "bg-[#11001f] text-white" : ""
      }`}
    >
      <motion.h4 className="text-center mb-2 text-lg font-ovo">
        Introduction
      </motion.h4>
      <motion.h2 className="text-center text-5xl font-ovo">About Me</motion.h2>

      <div className="flex flex-col lg:flex-row items-center gap-20 my-20">
        <Image
          src={profile.profilePic}
          alt={profile.name}
          width={300}
          height={300}
          className="rounded-3xl"
        />

        <div className="flex-1">
          <p className="mb-10 max-w-2xl font-ovo">{profile.bio}</p>
          <p
            className={`text-sm ${
              isDarkMode ? "text-white/80" : "text-gray-500"
            }`}
          >
            Role: {profile.role}
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default About;
