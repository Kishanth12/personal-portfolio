"use client";

import Image from "next/image";
import { assets } from "@/assets/assets";
import { useEffect, useState } from "react";
import { useTheme } from "../context/ThemaeContext";

const NavBar: React.FC = () => {
  const { isDarkMode, toggleDarkMode } = useTheme();
  const [isScroll, setIsScroll] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScroll(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <div className="fixed top-0 right-0 w-11/12 -z-10 -translate-y-[80%] dark:hidden">
        <Image src={assets.header_bg_color} alt="" className="w-full" />
      </div>

      <nav
        className={`w-full fixed px-5 lg:px-8 xl:px-[8%] flex items-center justify-between z-50 transition-colors duration-300 ${
          isScroll ? "backdrop-blur-lg shadow-sm" : ""
        } ${isDarkMode ? "bg-[#11001f] text-white" : "bg-white text-black"}`}
      >
        <a href="#top">
          <Image
            src={isDarkMode ? assets.logokishdark : assets.logokish}
            alt="logo"
            className="w-40 cursor-pointer mr-14"
          />
        </a>

        <ul
          className={`hidden md:flex items-center gap-6 lg:gap-8 rounded-full px-12 py-3 transition-colors duration-300 ${
            isScroll
              ? ""
              : `${
                  isDarkMode
                    ? "bg-[#11001f] text-white border border-white/50"
                    : "bg-white text-black shadow-sm bg-opacity-50"
                }`
          }`}
        >
          <li>
            <a href="#top">Home</a>
          </li>
          <li>
            <a href="#about">About me</a>
          </li>
          <li>
            <a href="#skills">Skills</a>
          </li>
          <li>
            <a href="#myWork">My Work</a>
          </li>
          <li>
            <a href="#contact">Contact me</a>
          </li>
        </ul>

        <div className="flex items-center gap-6">
          <button onClick={toggleDarkMode}>
            <Image
              src={isDarkMode ? assets.sun_icon : assets.moon_icon}
              alt=""
              className="w-6"
            />
          </button>

          <a
            href="#contact"
            className="hidden lg:flex items-center gap-3 px-10 py-2.5 border border-gray-500 rounded-full dark:border-white/50"
          >
            Contact
            <Image
              src={isDarkMode ? assets.arrow_icon_dark : assets.arrow_icon}
              alt="arrow"
              className="w-3"
            />
          </a>

          <button
            onClick={() => setIsMenuOpen(true)}
            className="block md:hidden ml-3 cursor-pointer"
          >
            <Image
              src={isDarkMode ? assets.menu_white : assets.menu_black}
              alt=""
              className="w-6"
            />
          </button>
        </div>

        <ul
          className={`flex md:hidden flex-col gap-4 py-20 px-10 fixed top-0 bottom-0 w-64 z-50 h-screen
            transition-transform transition-colors duration-500
            ${
              isMenuOpen
                ? "right-0 translate-x-0"
                : "-right-64 translate-x-full"
            }
            ${isDarkMode ? "bg-[#2b034b] text-white" : "bg-rose-50 text-black"}
          `}
        >
          <div
            className="absolute right-6 top-6"
            onClick={() => setIsMenuOpen(false)}
          >
            <Image
              src={isDarkMode ? assets.close_white : assets.close_black}
              alt="close"
              className="w-5 cursor-pointer"
            />
          </div>

          <li>
            <a href="#top" onClick={() => setIsMenuOpen(false)}>
              Home
            </a>
          </li>
          <li>
            <a href="#about" onClick={() => setIsMenuOpen(false)}>
              About me
            </a>
          </li>
          <li>
            <a href="#services" onClick={() => setIsMenuOpen(false)}>
              Services
            </a>
          </li>
          <li>
            <a href="#myWork" onClick={() => setIsMenuOpen(false)}>
              My Work
            </a>
          </li>
          <li>
            <a href="#contact" onClick={() => setIsMenuOpen(false)}>
              Contact me
            </a>
          </li>
        </ul>
      </nav>
    </>
  );
};

export default NavBar;
