"use client";

import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";

export default function HowItWorks({ steps }) {
  return (
    <section className="w-full py-16 md:py-24 lg:py-32 bg-background py-24">
      <div className="container mx-auto px-4 md:px-6">

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight mb-4">
            How It Works
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Follow these simple steps to get started and advance your career.
          </p>
        </motion.div>

        {/* Steps Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.15 }}
              viewport={{ once: true }}
              className="h-full"
            >
              <Card
                className="
                  h-full
                  min-h-[260px]
                  bg-transparent
                  border-3xl border-gray-800
                  hover:border-primary
                  transition-all
                  duration-300
                  rounded-2xl
                "
              >
                <CardContent className="flex flex-col items-center text-center justify-center gap-4 p-6 h-full">
                  
                  {/* Icon */}
                  <div className="text-purple-500 text-4xl">
                    {step.icon}
                  </div>

                  {/* Title */}
                  <h3 className="text-2xl font-semibold text-white">
                    {step.title}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-400 text-sm leading-relaxed">
                    {step.description}
                  </p>

                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
