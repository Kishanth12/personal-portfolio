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
  email:string;
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
      className={`w-full px-[12%] py-10 scroll-mt-10 ${
        isDarkMode ? "bg-[#11001f] text-white" : ""
      }`}
    >
      <motion.h4 className="text-center mb-2 text-lg font-ovo">
        Introduction
      </motion.h4>
      <motion.h2 className="text-center text-5xl font-ovo">About Me</motion.h2>

      <div className="flex flex-col lg:flex-row items-center gap-20 my-20">
        {/* Profile Image */}
        <Image
          src={profile.profilePic}
          alt={profile.name}
          width={300}
          height={300}
          className="rounded-3xl shadow-lg"
        />

        {/* Bio Section */}
        <motion.div
          className="flex-1 -translate-y-6 lg:-translate-y-10 flex flex-col items-start gap-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Bio Text */}
          <p className="mb-4 max-w-2xl font-ovo">{profile.bio}</p>
          <p
            className={`text-sm ${
              isDarkMode ? "text-white/80" : "text-gray-500"
            }`}
          >
            Role: {profile.role}
          </p>

          {/* Social Links */}
          <div className="flex items-center gap-4 mt-4">
            {/* GitHub */}
            {profile.github && (
              <a
                href={profile.github}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:scale-110 transition-transform"
              >
                <Image
                  src={assets.github} // your GitHub icon
                  alt="GitHub"
                  width={60}
                  height={60}
                  className="rounded-[40px]"
                />
              </a>
            )}

            {/* LinkedIn */}
            {profile.linkedin && (
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:scale-110 transition-transform"
              >
                <Image
                  src={assets.linkedin} // your LinkedIn icon
                  alt="LinkedIn"
                  width={90}
                  height={90}
                />
              </a>
            )}
             {profile.email && (
              <a
                href={profile.email}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:scale-110 transition-transform"
              >
                <Image
                  src={assets.email} // your LinkedIn icon
                  alt="mail"
                  width={60}
                  height={60}
                />
              </a>
            )}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default About;
