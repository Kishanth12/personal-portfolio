"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { assets } from "@/assets/assets";
import { sendContact } from "@/src/services/contact.service";
import { useTheme } from "../context/ThemaeContext";

const Contact: React.FC = () => {
  const { isDarkMode } = useTheme();
  const [result, setResult] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setResult("Sending...");

    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      await sendContact({
        name: formData.get("name") as string,
        email: formData.get("email") as string,
        message: formData.get("message") as string,
      });
      setResult("success");
      form.reset();
      setTimeout(() => setResult(""), 3000);
    } catch (err) {
      setResult("error");
      setTimeout(() => setResult(""), 3000);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 1 }}
      id="contact"
      className="w-full px-[12%] py-20 scroll-mt-5 relative overflow-hidden"
    >
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className={`absolute top-40 left-20 w-96 h-96 rounded-full blur-3xl opacity-10 ${
            isDarkMode ? "bg-lime-500" : "bg-lime-300"
          }`}
        ></div>
        <div
          className={`absolute bottom-20 right-20 w-80 h-80 rounded-full blur-3xl opacity-10 ${
            isDarkMode ? "bg-purple-500" : "bg-purple-300"
          }`}
        ></div>
        <div
          className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full blur-3xl opacity-5 ${
            isDarkMode ? "bg-emerald-500" : "bg-emerald-300"
          }`}
        ></div>
      </div>

      {/* Section Header */}
      <div className="relative z-10 text-center mb-16">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <motion.p
            className={`text-sm uppercase tracking-widest mb-3 font-semibold ${
              isDarkMode ? "text-lime-400" : "text-lime-600"
            }`}
          >
            💬 Get In Touch
          </motion.p>
          <motion.h2
            className={`text-5xl md:text-6xl font-bold font-ovo mb-4 ${
              isDarkMode ? "text-white" : "text-gray-900"
            }`}
          >
            Let's{" "}
            <span className="bg-gradient-to-r from-lime-400 to-emerald-500 bg-clip-text text-transparent">
              Connect
            </span>
          </motion.h2>
          <motion.p
            className={`text-lg max-w-2xl mx-auto ${
              isDarkMode ? "text-gray-400" : "text-gray-600"
            }`}
          >
            Have a project in mind? Let's discuss how we can work together
          </motion.p>
        </motion.div>
      </div>

      {/* Contact Form Card */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="max-w-3xl mx-auto relative z-10"
      >
        <div
          className={`relative rounded-3xl shadow-2xl p-8 md:p-12 backdrop-blur-sm ${
            isDarkMode
              ? "bg-gradient-to-br from-gray-800/90 to-gray-900/90 border border-gray-700"
              : "bg-white/90 border border-gray-100"
          }`}
        >
          {/* Decorative Corner Elements */}
          <div className="absolute top-0 left-0 w-20 h-20 border-t-4 border-l-4 border-lime-400 rounded-tl-3xl opacity-50"></div>
          <div className="absolute bottom-0 right-0 w-20 h-20 border-b-4 border-r-4 border-emerald-500 rounded-br-3xl opacity-50"></div>

          <motion.form onSubmit={onSubmit} className="space-y-6">
            {/* Name Input */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <label
                className={`block text-sm font-semibold mb-2 ${
                  isDarkMode ? "text-gray-300" : "text-gray-700"
                }`}
              >
                Your Name
              </label>
              <div className="relative group">
                <div
                  className={`absolute inset-0 rounded-xl bg-gradient-to-r from-lime-400 to-emerald-500 opacity-0 group-hover:opacity-20 transition-opacity duration-300 blur-sm`}
                ></div>
                <input
                  name="name"
                  type="text"
                  placeholder="Kishanth"
                  required
                  className={`relative w-full px-5 py-4 rounded-xl border-2 transition-all duration-300 focus:outline-none focus:border-lime-400 focus:scale-[1.02] ${
                    isDarkMode
                      ? "bg-gray-900/50 border-gray-700 text-white placeholder-gray-500 focus:bg-gray-900"
                      : "bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-400 focus:bg-white"
                  }`}
                />
              </div>
            </motion.div>

            {/* Email Input */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
              <label
                className={`block text-sm font-semibold mb-2 ${
                  isDarkMode ? "text-gray-300" : "text-gray-700"
                }`}
              >
                Email Address
              </label>
              <div className="relative group">
                <div
                  className={`absolute inset-0 rounded-xl bg-gradient-to-r from-lime-400 to-emerald-500 opacity-0 group-hover:opacity-20 transition-opacity duration-300 blur-sm`}
                ></div>
                <input
                  name="email"
                  type="email"
                  placeholder="kishanth@example.com"
                  required
                  className={`relative w-full px-5 py-4 rounded-xl border-2 transition-all duration-300 focus:outline-none focus:border-lime-400 focus:scale-[1.02] ${
                    isDarkMode
                      ? "bg-gray-900/50 border-gray-700 text-white placeholder-gray-500 focus:bg-gray-900"
                      : "bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-400 focus:bg-white"
                  }`}
                />
              </div>
            </motion.div>

            {/* Message Textarea */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
            >
              <label
                className={`block text-sm font-semibold mb-2 ${
                  isDarkMode ? "text-gray-300" : "text-gray-700"
                }`}
              >
                Your Message
              </label>
              <div className="relative group">
                <div
                  className={`absolute inset-0 rounded-xl bg-gradient-to-r from-lime-400 to-emerald-500 opacity-0 group-hover:opacity-20 transition-opacity duration-300 blur-sm`}
                ></div>
                <textarea
                  name="message"
                  rows={6}
                  placeholder="Connect with me...."
                  required
                  className={`relative w-full px-5 py-4 rounded-xl border-2 transition-all duration-300 focus:outline-none focus:border-lime-400 focus:scale-[1.02] resize-none ${
                    isDarkMode
                      ? "bg-gray-900/50 border-gray-700 text-white placeholder-gray-500 focus:bg-gray-900"
                      : "bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-400 focus:bg-white"
                  }`}
                />
              </div>
            </motion.div>

            {/* Submit Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex flex-col items-center gap-4"
            >
              <motion.button
                type="submit"
                disabled={isLoading}
                whileHover={{ scale: isLoading ? 1 : 1.05 }}
                whileTap={{ scale: isLoading ? 1 : 0.95 }}
                className={`relative group w-full md:w-auto px-10 py-4 rounded-xl font-bold text-lg transition-all duration-300 shadow-2xl overflow-hidden ${
                  isLoading ? "cursor-not-allowed opacity-70" : "cursor-pointer"
                } ${
                  isDarkMode
                    ? "bg-gradient-to-r from-lime-400 to-emerald-500 text-black"
                    : "bg-gradient-to-r from-gray-900 to-gray-800 text-white"
                }`}
              >
                <span className="relative z-10 flex items-center justify-center gap-3">
                  {isLoading ? (
                    <>
                      <svg
                        className="animate-spin w-5 h-5"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Sending...
                    </>
                  ) : (
                    <>
                      Send Message
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
                          d="M14 5l7 7m0 0l-7 7m7-7H3"
                        />
                      </svg>
                    </>
                  )}
                </span>

                {/* Animated Background */}
                {!isLoading && (
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
                )}
              </motion.button>

              {/* Success/Error Messages */}
              <AnimatePresence mode="wait">
                {result === "success" && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8, y: -10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.8, y: -10 }}
                    className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-400 to-emerald-500 text-white rounded-full shadow-lg"
                  >
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <span className="font-semibold">
                      Message sent successfully!
                    </span>
                  </motion.div>
                )}

                {result === "error" && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8, y: -10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.8, y: -10 }}
                    className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-red-400 to-rose-500 text-white rounded-full shadow-lg"
                  >
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <span className="font-semibold">
                      Failed to send. Try again!
                    </span>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </motion.form>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className={`mt-12 pt-8 border-t ${
              isDarkMode ? "border-gray-700" : "border-gray-200"
            }`}
          >
            <div className="flex flex-wrap justify-center gap-8">
              <motion.div
                whileHover={{ scale: 1.05, y: -5 }}
                className="flex items-center gap-3"
              >
                <div
                  className={`p-3 rounded-full ${
                    isDarkMode ? "bg-gray-700" : "bg-gray-100"
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
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <div>
                  <p
                    className={`text-xs font-semibold ${
                      isDarkMode ? "text-gray-400" : "text-gray-500"
                    }`}
                  >
                    Email
                  </p>
                  <p
                    className={`font-medium ${
                      isDarkMode ? "text-white" : "text-gray-900"
                    }`}
                  >
                    kishanthshanth12@example.com
                  </p>
                </div>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05, y: -5 }}
                className="flex items-center gap-3"
              >
                <div
                  className={`p-3 rounded-full ${
                    isDarkMode ? "bg-gray-700" : "bg-gray-100"
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
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                </div>
                <div>
                  <p
                    className={`text-xs font-semibold ${
                      isDarkMode ? "text-gray-400" : "text-gray-500"
                    }`}
                  >
                    Location
                  </p>
                  <p
                    className={`font-medium ${
                      isDarkMode ? "text-white" : "text-gray-900"
                    }`}
                  >
                    Batticaloa,SriLanka
                  </p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Contact;
