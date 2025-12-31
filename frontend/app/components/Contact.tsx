import { assets } from "@/assets/assets";
import Image from "next/image";
import React from "react";
import { motion } from "framer-motion";

interface ContactProps {
  isDarkMode: boolean;
}
const Contact: React.FC<ContactProps> = ({ isDarkMode }) => {
  const [result, setResult] = React.useState("");

  const onSubmit = async (event: any) => {
    event.preventDefault();
    setResult("Sending....");
    const formData = new FormData(event.target);

    formData.append("access_key", "77de7fff-645d-4191-8f48-d023351fc21f");

    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();

    if (data.success) {
      setResult("Form Submitted Successfully");
      event.target.reset();
    } else {
      console.log("Error", data);
      setResult(data.message);
    }
  };
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 1 }}
      id="contact"
      className={`w-full px-[12%] py-10 scroll-mt-20  ${
        isDarkMode ? "bg-[#11001f]" : ""
      }`}
    >
      <motion.h4
        initial={{ y: -20, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="text-center mb-2 text-lg font-ovo"
      >
        Connect With Me
      </motion.h4>
      <motion.h2
        initial={{ y: -20, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="text-center text-5xl font-ovo"
      >
        Get in Touch
      </motion.h2>
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.7 }}
        className="text-center max-w-2xl mx-auto mt-5 mb-12 font-ovo"
      >
        Have a project in mind, or just want to say hi? I’d love to hear from
        you! Feel free to reach out through the contact form or directly using
        the details below.
      </motion.p>
      <motion.form
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.9 }}
        className="max-w-2xl mx-auto"
        onSubmit={onSubmit}
      >
        <div className="grid grid-cols-auto gap-6 mt-10 mb-8">
          <motion.input
            initial={{ x: -50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 1.1 }}
            name="name"
            type="text"
            placeholder="Your Name"
            required
            className={`flex-1 p-3 outline-none border-[0.5px] border-gray-700 rounded-md  ${
              isDarkMode ? "bg-dark-hover/30 border-white/90" : ""
            }`}
          />
          <motion.input
            initial={{ x: 50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 1.2 }}
            name="email"
            type="email"
            placeholder="Your Email"
            required
            className={`flex-1 p-3 outline-none border-[0.5px] border-gray-700 rounded-md ${
              isDarkMode ? "bg-dark-hover/30 border-white/90" : ""
            }`}
          />
        </div>
        <motion.textarea
          initial={{ y: 100, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.3 }}
          name="message"
          className={`w-full p-4 outline-none border-[0.5px] border-gray-700 rounded-md  mb-6 ${
            isDarkMode ? "bg-dark-hover/30 border-white/90" : ""
          }`}
          rows={6}
          placeholder="Enter Your Message"
          required
        ></motion.textarea>
        <motion.button
          whileHover={{scale:1.05} }
          transition={{ duration: 0.3}}
          className={`py-3 px-8 w-max flex items-center justify-between gap-2 bg-black/80 text-white rounded-full mx-auto hover:bg-black duration-500 ${
            isDarkMode
              ? "bg-transparent border-[0.5px] hover:bg-dark-hover/20"
              : ""
          }`}
          type="submit"
        >
          Submit Now
          <Image src={assets.right_arrow_white} alt="" className="w-4" />
        </motion.button>
        <p className="mt-4">{result}</p>
      </motion.form>
    </motion.div>
  );
};

export default Contact;
