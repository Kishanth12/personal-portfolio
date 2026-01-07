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

interface HeaderProps {
  profile: Profile;
}

const Header: React.FC<HeaderProps> = ({ profile }) => {
  const { isDarkMode } = useTheme();

  return (
    <div className="w-11/12 max-w-3xl text-center mx-auto h-screen flex flex-col items-center justify-center gap-4">
      <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ duration: 0.8 }}>
        <Image
          src={profile.profilePic}
          alt={profile.name}
          width={128}
          height={128}
          className="rounded-full"
        />
      </motion.div>

      <h3 className={`text-xl md:text-2xl font-ovo ${isDarkMode ? "text-white" : ""}`}>
        Hi! I'm {profile.name} 👋
      </h3>

      <h1 className={`text-3xl sm:text-6xl font-ovo ${isDarkMode ? "text-white" : ""}`}>
        {profile.role}
      </h1>

      <p className={`max-w-2xl font-ovo ${isDarkMode ? "text-white/80" : "text-gray-700"}`}>
        {profile.bio}
      </p>
    </div>
  );
};

export default Header;
