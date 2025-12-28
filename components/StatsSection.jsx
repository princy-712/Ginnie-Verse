"use client";

import { motion } from "framer-motion";

export default function StatsSection() {
  const stats = [
    { value: "50+", label: "Industries Covered" },
    { value: "1000+", label: "Interview Questions" },
    { value: "95%", label: "Success Rate" },
    { value: "24/7", label: "AI Support" },
  ];

  return (
    <section className="w-full py-12 md:py-24  bg-muted/50 py-28">
      <div className="container mx-auto px-4 md:px-6">

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="flex flex-col items-center justify-center space-y-2"
            >
              {/* Number */}
              <h3 className="text-4xl md:text-5xl font-semibold text-white tracking-tight">
                {stat.value}
              </h3>

              {/* Label */}
              <p className="mt-2 text-sm md:text-base text-gray-400">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}