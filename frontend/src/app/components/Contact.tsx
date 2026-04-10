"use client";

import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { useTheme } from "../context/ThemaeContext";
import { sendContact } from "@/src/services/contact.service";
import { Canvas, useFrame } from "@react-three/fiber";
import { Sphere, MeshDistortMaterial, Float, Environment } from "@react-three/drei";
import * as THREE from "three";

function AnimatedBlob({ isDarkMode }: { isDarkMode: boolean }) {
  const meshRef = useRef<THREE.Mesh>(null!);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.getElapsedTime() * 0.2;
      meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.3;
    }
  });

  return (
    <Float speed={2} rotationIntensity={2} floatIntensity={3}>
      <mesh ref={meshRef} scale={1.5}>
        <sphereGeometry args={[1, 64, 64]} />
        <MeshDistortMaterial
          color={isDarkMode ? "#06b6d4" : "#0ea5e9"}
          envMapIntensity={isDarkMode ? 1 : 0.8}
          clearcoat={1}
          clearcoatRoughness={0.1}
          metalness={0.9}
          roughness={0.1}
          distort={0.4}
          speed={2}
          transparent
          opacity={0.8}
        />
      </mesh>
      {/* Inner glowing core */}
      <mesh scale={1.2}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshBasicMaterial color={isDarkMode ? "#a3e635" : "#84cc16"} wireframe />
      </mesh>
    </Float>
  );
}

const Contact: React.FC = () => {
  const { isDarkMode } = useTheme();
  const [result, setResult] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setResult("Sending payload to central server...");

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
      setTimeout(() => setResult(""), 4000);
    } catch (err) {
      setResult("error");
      setTimeout(() => setResult(""), 4000);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div id="contact" className="w-full relative min-h-screen py-40 flex items-center justify-center overflow-hidden bg-transparent z-10">

      {/* 3D WebGL Background restricted to contact section */}
      <div className="absolute inset-x-0 bottom-0 h-full w-full lg:w-1/2 lg:right-0 lg:left-auto pointer-events-none opacity-50 z-[-1]">
        <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
          <ambientLight intensity={isDarkMode ? 0.5 : 1} />
          <directionalLight position={[10, 10, 5]} intensity={2} color="#a3e635" />
          <directionalLight position={[-10, -10, -5]} intensity={1} color="#06b6d4" />
          <AnimatedBlob isDarkMode={isDarkMode} />

        </Canvas>
      </div>

      <div className="w-full max-w-7xl mx-auto px-[5%] md:px-[8%] grid lg:grid-cols-2 gap-16 relative z-10">

        {/* Text Section */}
        <div className="flex flex-col justify-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, type: "spring" }}
          >
            <p className={`text-sm uppercase tracking-[0.4em] font-black mb-4 ${isDarkMode ? "text-lime-400" : "text-lime-600"}`}>
              GET IN TOUCH            </p>
            <h2 className={`text-6xl md:text-8xl font-black font-space mb-6 leading-none tracking-tighter ${isDarkMode ? "text-white" : "text-gray-900"}`}>
              Let's Connect <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">CONTACT</span>
            </h2>
            <p className={`text-lg max-w-md leading-relaxed ${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
              Have a project in mind? Let's discuss how we can work together
            </p>

            <div className="mt-12 space-y-6">
              {[
                { label: "Direct Comms", value: "kishanthshanth12@gmail.com" },
                { label: "Coordinates", value: "Batticaloa, Sri Lanka" }
              ].map((item, i) => (
                <div key={i} className="flex flex-col group">
                  <span className={`text-xs uppercase tracking-widest font-black mb-1 ${isDarkMode ? "text-gray-600" : "text-gray-400"}`}>{item.label}</span>
                  <span className={`text-xl font-bold transition-colors ${isDarkMode ? "text-gray-300 group-hover:text-lime-400" : "text-gray-700 group-hover:text-lime-600"}`}>{item.value}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Form Form Section */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, rotateY: 30 }}
          whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, type: "spring" }}
          className="relative perspective-1000"
        >
          <div className={`p-8 md:p-12 rounded-3xl backdrop-blur-xl border ${isDarkMode ? "bg-gray-900/40 border-gray-800 shadow-[0_0_50px_rgba(0,0,0,0.5)]" : "bg-white/60 border-gray-200 shadow-2xl"}`}>
            <form onSubmit={onSubmit} className="flex flex-col gap-6 relative z-10">
              <div className="grid md:grid-cols-2 gap-6">
                <input
                  name="name"
                  type="text"
                  placeholder="Your [NAME]"
                  required
                  className={`w-full bg-transparent border-b-2 py-4 px-2 font-bold focus:outline-none transition-colors ${isDarkMode ? "border-gray-800 text-white focus:border-cyan-400 placeholder:text-gray-700" : "border-gray-200 text-gray-900 focus:border-cyan-600 placeholder:text-gray-400"}`}
                />
                <input
                  name="email"
                  type="email"
                  placeholder="Your [EMAIL]"
                  required
                  className={`w-full bg-transparent border-b-2 py-4 px-2 font-bold focus:outline-none transition-colors ${isDarkMode ? "border-gray-800 text-white focus:border-cyan-400 placeholder:text-gray-700" : "border-gray-200 text-gray-900 focus:border-cyan-600 placeholder:text-gray-400"}`}
                />
              </div>
              <textarea
                name="message"
                placeholder="LEAVE A MESSAGE [MESSAGE]..."
                required
                rows={4}
                className={`w-full bg-transparent border-b-2 py-4 px-2 font-bold focus:outline-none transition-colors resize-none ${isDarkMode ? "border-gray-800 text-white focus:border-cyan-400 placeholder:text-gray-700" : "border-gray-200 text-gray-900 focus:border-cyan-600 placeholder:text-gray-400"}`}
              />

              <div className="mt-8 flex items-center justify-between">
                <div className="h-6">
                  {result === "success" && <span className="text-lime-400 font-bold tracking-widest text-sm">MESSAGE SENT SUCCESSFUL ✓</span>}
                  {result === "error" && <span className="text-red-500 font-bold tracking-widest text-sm">MESSAGE SENT FAILED ✗</span>}
                  {isLoading && <span className="text-cyan-400 font-bold tracking-widest text-sm animate-pulse">{result}</span>}
                </div>

                <motion.button
                  type="submit"
                  disabled={isLoading}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`px-10 py-4 rounded-xl font-black tracking-widest text-sm overflow-hidden relative group ${isLoading ? 'opacity-50' : ''} ${isDarkMode ? "bg-white text-black" : "bg-gray-900 text-white"}`}
                >
                  <span className="relative z-10">SEND MESSAGE</span>
                  <div className={`absolute inset-0 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300 ${isDarkMode ? "bg-gradient-to-r from-lime-400 to-cyan-400" : "bg-gradient-to-r from-lime-500 to-emerald-500"}`} />
                </motion.button>
              </div>
            </form>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Contact;
