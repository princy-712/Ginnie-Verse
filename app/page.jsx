"use client";

import React from "react";
import StarsCanvas from "@/components/StarBackground";

import HeroSection from "@/components/hero";
import FeaturesSection from "@/components/FeaturesSection";
import { features } from "@/data/features";
import HowItWorks from "@/components/HowItWorks";
import { howItWorks } from "@/data/howItWorks";
import StatsSection from "@/components/StatsSection";
import TestimonialsSection from "@/components/testimonial";
import { testimonial } from "@/data/testimonial";
import Faqs from "@/components/Faqs";
import { faqs } from "@/data/faqs";

export default function Home() {
  return (
    <main className="relative h-full w-full overflow-hidden">
      {/* Stars only on landing page */}
      <StarsCanvas />

      <section className="relative z-10 flex flex-col h-[850px] gap-40">
        <HeroSection />
      </section>

      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 space-y-20">
        <FeaturesSection features={features} />
        <StatsSection />
        <HowItWorks steps={howItWorks} />
        <TestimonialsSection />
        <Faqs faqs={faqs} />
      </div>
    </main>
  );
}
