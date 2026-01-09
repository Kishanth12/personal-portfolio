"use client";

import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { assets } from "@/assets/assets";
import { useEffect, useState } from "react";
import { useTheme } from "../context/ThemaeContext";

const NavBar: React.FC = () => {
  const { isDarkMode, toggleDarkMode } = useTheme();
  const [isScroll, setIsScroll] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("top");

  // Scroll handler
  useEffect(() => {
    const handleScroll = () => {
      // 1. Handle background blur
      setIsScroll(window.scrollY > 50);

      // 2. Map your navigation items to their actual HTML IDs
      const sections = [
        { name: "top", id: "top" },
        { name: "about", id: "about" },
        { name: "skills", id: "skills" },
        { name: "myWork", id: "myWork" },
        { name: "contact", id: "contact" },
      ];

      const scrollPosition = window.scrollY + 150; // Offset for navbar height

      // 3. Special case: If at the very top, force "top" active
      if (window.scrollY < 100) {
        setActiveSection("top");
        return;
      }

      // 4. Special case: If at the very bottom, force "contact" active
      if (
        window.innerHeight + window.scrollY >=
        document.body.offsetHeight - 10
      ) {
        setActiveSection("contact");
        return;
      }

      // 5. General scroll detection
      for (const section of sections) {
        const element = document.getElementById(section.id);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetHeight = element.offsetHeight;

          if (
            scrollPosition >= offsetTop &&
            scrollPosition < offsetTop + offsetHeight
          ) {
            setActiveSection(section.name);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "#top" },
    { name: "About", href: "#about" },
    { name: "Work", href: "#myWork" },
    { name: "Skills", href: "#skills" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <>
      {/* Decorative Background */}
      <div className="fixed top-0 right-0 w-11/12 -z-10 -translate-y-[80%] dark:hidden">
        <Image src={assets.header_bg_color} alt="" className="w-full" />
      </div>

      {/* Navbar */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className={`w-full fixed top-0 px-5 lg:px-8 xl:px-[8%] py-4 flex items-center justify-between z-50 transition-all duration-300 ${
          isScroll
            ? `backdrop-blur-md shadow-lg ${
                isDarkMode
                  ? "bg-gray-900/90 border-b border-gray-800"
                  : "bg-white/90 border-b border-gray-200"
              }`
            : "bg-transparent"
        }`}
      >
        {/* Logo */}
        <motion.a
          href="#top"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="relative z-10"
        >
          <Image
            src={isDarkMode ? assets.logokishdark : assets.logokish}
            alt="logo"
            className="w-32 md:w-40 cursor-pointer"
          />
        </motion.a>

        {/* Desktop Navigation */}
        <motion.ul
          className={`hidden md:flex items-center gap-2 rounded-full px-8 py-3 transition-all duration-300 ${
            isScroll
              ? `${
                  isDarkMode
                    ? "bg-gray-800/50 backdrop-blur-sm border border-gray-700"
                    : "bg-white/80 backdrop-blur-sm shadow-lg border border-gray-200"
                }`
              : `${
                  isDarkMode
                    ? "bg-gray-900/70 backdrop-blur-sm border border-gray-700"
                    : "bg-white/70 backdrop-blur-sm shadow-md border border-gray-200"
                }`
          }`}
        >
          {navLinks.map((link) => (
            <li key={link.name} className="relative">
              {link.name === "Home" ? (
                <motion.a
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault(); // prevent default jump
                    window.scrollTo({ top: 0, behavior: "smooth" }); // scroll to top
                    setActiveSection("top"); // force active
                  }}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 relative z-10 ${
                    activeSection === "top"
                      ? "text-black"
                      : isDarkMode
                      ? "text-gray-300 hover:text-lime-400"
                      : "text-gray-700 hover:text-lime-600"
                  }`}
                >
                  {link.name}

                  {activeSection === "top" && (
                    <motion.div
                      layoutId="activeSection"
                      className="absolute inset-0 bg-gradient-to-r from-lime-400 to-emerald-500 rounded-full -z-10 pointer-events-none"
                      transition={{
                        type: "spring",
                        stiffness: 380,
                        damping: 30,
                      }}
                    />
                  )}
                </motion.a>
              ) : (
                <motion.a
                  href={link.href}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 relative z-10 ${
                    activeSection === link.href.slice(1)
                      ? "text-black"
                      : isDarkMode
                      ? "text-gray-300 hover:text-lime-400"
                      : "text-gray-700 hover:text-lime-600"
                  }`}
                >
                  {link.name}

                  {/* Active Background */}
                  {activeSection === link.href.slice(1) && (
                    <motion.div
                      layoutId="activeSection"
                      className="absolute inset-0 bg-gradient-to-r from-lime-400 to-emerald-500 rounded-full -z-10 pointer-events-none"
                      transition={{
                        type: "spring",
                        stiffness: 380,
                        damping: 30,
                      }}
                    />
                  )}
                </motion.a>
              )}
            </li>
          ))}
        </motion.ul>

        {/* Right Side Actions */}
        <div className="flex items-center gap-4">
          {/* Dark Mode Toggle */}
          <motion.button
            onClick={toggleDarkMode}
            whileHover={{ scale: 1.1, rotate: 180 }}
            whileTap={{ scale: 0.9 }}
            className={`p-2 rounded-full transition-all duration-300 ${
              isDarkMode
                ? "bg-gray-800 hover:bg-gray-700"
                : "bg-gray-100 hover:bg-gray-200"
            }`}
          >
            <Image
              src={isDarkMode ? assets.sun_icon : assets.moon_icon}
              alt="theme toggle"
              className="w-5 h-5"
            />
          </motion.button>

          {/* Contact Button (Desktop) */}
          <motion.a
            href="#contact"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`hidden lg:flex items-center gap-2 px-6 py-2.5 rounded-full font-medium text-sm transition-all duration-300 ${
              isDarkMode
                ? "bg-gradient-to-r from-lime-400 to-emerald-500 text-black hover:shadow-lg hover:shadow-lime-500/50"
                : "bg-gradient-to-r from-gray-900 to-gray-800 text-white hover:shadow-lg hover:shadow-gray-900/50"
            }`}
          >
            Contact
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
                d="M13 7l5 5m0 0l-5 5m5-5H6"
              />
            </svg>
          </motion.a>

          {/* Mobile Menu Button */}
          <motion.button
            onClick={() => setIsMenuOpen(true)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className={`block md:hidden p-2 rounded-lg transition-all duration-300 ${
              isDarkMode
                ? "bg-gray-800 hover:bg-gray-700"
                : "bg-gray-100 hover:bg-gray-200"
            }`}
          >
            <Image
              src={isDarkMode ? assets.menu_white : assets.menu_black}
              alt="menu"
              className="w-6 h-6"
            />
          </motion.button>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMenuOpen(false)}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden"
            />

            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className={`fixed top-0 right-0 bottom-0 w-80 z-50 shadow-2xl ${
                isDarkMode
                  ? "bg-gradient-to-br from-gray-900 to-black"
                  : "bg-gradient-to-br from-white to-gray-50"
              }`}
            >
              <motion.button
                onClick={() => setIsMenuOpen(false)}
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                className={`absolute right-6 top-6 p-2 rounded-full transition-all duration-300 ${
                  isDarkMode
                    ? "bg-gray-800 hover:bg-gray-700"
                    : "bg-gray-100 hover:bg-gray-200"
                }`}
              >
                <Image
                  src={isDarkMode ? assets.close_white : assets.close_black}
                  alt="close"
                  className="w-5 h-5"
                />
              </motion.button>

              <div className="flex flex-col h-full justify-center px-8">
                <motion.ul
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="space-y-6"
                >
                  {navLinks.map((link, index) => (
                    <motion.li
                      key={link.name}
                      initial={{ opacity: 0, x: 50 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 * index }}
                    >
                      <motion.a
                        href={link.href}
                        onClick={() => {
                          setIsMenuOpen(false);
                          // fix Home in mobile menu
                          if (link.name === "Home") {
                            window.scrollTo({ top: 0, behavior: "smooth" });
                            setActiveSection("top");
                          }
                        }}
                        whileHover={{ x: 10 }}
                        className={`block text-2xl font-bold transition-all duration-300 ${
                          activeSection ===
                          (link.name === "Home" ? "top" : link.href.slice(1))
                            ? "bg-gradient-to-r from-lime-400 to-emerald-500 bg-clip-text text-transparent"
                            : isDarkMode
                            ? "text-gray-300 hover:text-lime-400"
                            : "text-gray-700 hover:text-lime-600"
                        }`}
                      >
                        {link.name}
                      </motion.a>
                    </motion.li>
                  ))}
                </motion.ul>

                {/* Social Links */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                  className="mt-12 pt-8 border-t border-gray-700 dark:border-gray-700"
                >
                  <p
                    className={`text-sm mb-4 ${
                      isDarkMode ? "text-gray-400" : "text-gray-600"
                    }`}
                  >
                    Connect with me
                  </p>
                  <div className="flex gap-4">
                    {[
                      { icon: assets.github, href: "#" },
                      { icon: assets.linkedin, href: "#" },
                      { icon: assets.email, href: "#contact" },
                    ].map((social, index) => (
                      <motion.a
                        key={index}
                        href={social.href}
                        whileHover={{ scale: 1.1, y: -5 }}
                        whileTap={{ scale: 0.9 }}
                        className={`p-3 rounded-xl transition-all duration-300 ${
                          isDarkMode
                            ? "bg-gray-800 hover:bg-gray-700"
                            : "bg-gray-100 hover:bg-gray-200"
                        }`}
                      >
                        <Image
                          src={social.icon}
                          alt="social"
                          width={24}
                          height={24}
                        />
                      </motion.a>
                    ))}
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default NavBar;
