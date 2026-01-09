"use client";

import Image from "next/image";
import { assets } from "@/assets/assets";
import { useTheme } from "../context/ThemaeContext";

interface FooterProps {
  profile: {
    email: string;
    github?: string;
    linkedin?: string;
  };
}

const Footer: React.FC<FooterProps> = ({ profile }) => {
  const { isDarkMode } = useTheme();

  return (
    <footer
      className={`mt-20 px-6 py-12 ${
        isDarkMode ? "bg-[#11001f] text-gray-200" : "bg-gray-100 text-gray-700"
      }`}
    >
      {/* Top Section: Logo + Email */}
      <div className="flex flex-col items-center gap-4">

        {/* Email */}
        <div className="flex items-center gap-2 text-sm sm:text-base">
          <Image
            src={isDarkMode ? assets.mail_icon_dark : assets.mail_icon}
            alt="mail"
            className="w-5 h-5"
          />
          <span>{profile.email}</span>
        </div>
      </div>

      {/* Divider */}
      <div
        className={`w-full border-t mt-8 ${
          isDarkMode ? "border-gray-600" : "border-gray-400"
        }`}
      ></div>

      {/* Bottom Section: Copy + Social Links */}
      <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-sm sm:text-base">
          © 2025 Kishanth. All rights reserved
        </p>

        <ul className="flex items-center gap-6">
          {profile.github && (
            <li>
              <a
                target="_blank"
                rel="noopener noreferrer"
                href={profile.github}
                className={`transition-colors duration-300 hover:text-black ${
                  isDarkMode ? "hover:text-white" : ""
                }`}
              >
                GitHub
              </a>
            </li>
          )}
          {profile.linkedin && (
            <li>
              <a
                target="_blank"
                rel="noopener noreferrer"
                href={profile.linkedin}
                className={`transition-colors duration-300 hover:text-black ${
                  isDarkMode ? "hover:text-white" : ""
                }`}
              >
                LinkedIn
              </a>
            </li>
          )}
        </ul>
      </div>
    </footer>
  );
};

export default Footer;
