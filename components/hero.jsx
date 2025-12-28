"use client";
import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import Link from "next/link";
import HeroContent from "./HeroContent";

const HeroSection = () => {
  return (
    <section className="relative flex flex-col h-full w-full" id="about-me">
      <video
        autoPlay
        muted
        loop
        className="rotate-180 absolute top-[-340px]  h-full w-full left-0 z-[1] object-cover "
      >
        <source src="/blackhole.mp4" type="video/mp4" />
      </video>
      <HeroContent />
    
    </section>
    
  );
};

export default HeroSection;