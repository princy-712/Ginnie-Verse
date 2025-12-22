"use client";
import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import Link from "next/link";

const HeroSection = () => {
  return (
    <section className="relative flex flex-col-reverse md:flex-row items-center justify-between px-6 md:px-16 pt-36 pb-20 text-foreground overflow-hidden">
      
      {/* --- Left Side Text --- */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        viewport={{ once: true }}
        className="w-full md:w-1/2 mt-10 md:mt-0 md:pr-12 text-center md:text-left space-y-6 z-10"
      >
        <h1 className="text-4xl md:text-6xl font-bold leading-tight">
          Unleash the Power of{" "}
          <span className="text-primary drop-shadow-[0_0_15px_rgba(108,71,255,0.8)]">
            GinnieVerse
          </span>
        </h1>

        <p className="text-lg text-muted-foreground max-w-md mx-auto md:mx-0">
          Your AI companion that builds resumes, quizzes your skills, and prepares you for your dream job.
        </p>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, ease: "easeOut", delay: 0.2 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row gap-4 justify-center md:justify-start"
        >
          <Link href="/dashboard"><Button
            size="lg"
            className="rounded-xl bg-primary text-primary-foreground hover:scale-105 hover:bg-primary/90 transition-transform duration-300"
          >
            Get Started
          </Button>
          </Link>
          <Link href="/dashboard"><Button
            size="lg"
            variant="outline"
            className="rounded-xl border-border text-foreground hover:bg-accent/10 hover:scale-105 transition-transform duration-300"
          >
            Learn More
          </Button></Link>
        </motion.div>
      </motion.div>

      {/* --- Right Side Magical Lamp Image --- */}
      <motion.div
        initial={{ opacity: 0, x: 80 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        viewport={{ once: true }}
        className="w-full md:w-1/2 flex justify-center md:justify-end relative"
      >
        {/* Floating Glow Aura */}
        <motion.div
          animate={{
            y: [0, -15, 0],
            scale: [1, 1.02, 1],
            filter: [
              "drop-shadow(0 0 20px rgba(108,71,255,0.5))",
              "drop-shadow(0 0 40px rgba(108,71,255,0.8))",
              "drop-shadow(0 0 20px rgba(108,71,255,0.5))",
            ],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <Image
            src="/finallamp.jpg"
            alt="Genie Lamp"
            width={600}
            height={600}
            className="object-contain select-none rounded-2xl pointer-events-none"
            priority
          />
        </motion.div>

        {/* Background gradient glow to blend image edges */}
        <div className="absolute inset-0 bg-linear-to-r from-transparent via-transparent to-black/60 pointer-events-none" />
      </motion.div>

      {/* Subtle floating particles / aura (optional aesthetic touch) */}
      <div className="absolute -z-10 inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(108,71,255,0.15),transparent_60%)] blur-3xl"></div>

    </section>
    
  );
};

export default HeroSection;