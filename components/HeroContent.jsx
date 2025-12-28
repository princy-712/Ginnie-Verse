"use client";
import React from "react";
import { motion } from "framer-motion";
import { slideInFromLeft } from "@/utils/motion";

const HeroContent = () => {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      className="
        absolute inset-0
        flex flex-col
        items-center
        justify-center
        text-center
        z-[20]
        translate-y-20
      "
    >
      {/* Main Heading */}
      <motion.h1
        variants={slideInFromLeft(0.5)}
        className="text-5xl md:text-6xl font-bold text-white max-w-[800px]"
      >
        AI{" "}
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-500">
          Genie
        </span>{" "}
        For Professionals
      </motion.h1>

      {/* Description */}
      <motion.div
        variants={slideInFromLeft(0.8)}
        className="mt-6 max-w-[700px] space-y-1"
      >
        <p className="text-gray-400">
          Genie-Verse helps you grow professionally with AI-powered tools for
        </p>
        <p className="text-gray-400">
          resume building, interview preparation, and personalized career
        </p>
        <p className="text-gray-400">
          insights — all designed to help you succeed faster.
        </p>
      </motion.div>

      {/* CTA Buttons */}
      <motion.div
        variants={slideInFromLeft(1)}
        className="mt-8 flex gap-4"
      >
        <a
          href="/"
          className="
            px-6 py-3 rounded-lg
            bg-gradient-to-r from-purple-500 to-cyan-500
            text-white font-medium
            hover:opacity-90 transition
          "
        >
          Learn More
        </a>

        <a
          href="/sign-up"
          className="
            px-6 py-3 rounded-lg
            border border-purple-500/50
            text-white font-medium
            hover:bg-purple-500/10 transition
          "
        >
          Get Started
        </a>
      </motion.div>
    </motion.div>
  );
};

export default HeroContent;
