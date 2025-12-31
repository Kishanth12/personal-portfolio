"use client";
import { useEffect, useState } from "react";
import About from "./components/About";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import Header from "./components/Header";
import NavBar from "./components/NavBar";
import Services from "./components/Services";
import Work from "./components/Work";

export default function Home() {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

  // Check saved theme or system preference
  useEffect(() => {
    if (
      localStorage.theme === "dark" ||
      (!("theme" in localStorage) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
      setIsDarkMode(true);
    } else {
      setIsDarkMode(false);
    }
  }, []);

  useEffect(() => {
    const root = document.documentElement; // <html>
    if (isDarkMode) {
      root.classList.add("dark-theme");
      root.classList.remove("light-theme");
      localStorage.theme = "dark";
    } else {
      root.classList.add("light-theme");
      root.classList.remove("dark-theme");
      localStorage.theme = "light";
    }
  }, [isDarkMode]);

  return (
    <div>
      <NavBar isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
      <Header isDarkMode={isDarkMode} />
      <About isDarkMode={isDarkMode} />
      <Services isDarkMode={isDarkMode} />
      <Work isDarkMode={isDarkMode} />
      <Contact isDarkMode={isDarkMode} />
      <Footer isDarkMode={isDarkMode} />
    </div>
  );
}
