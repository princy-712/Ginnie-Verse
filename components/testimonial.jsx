"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { testimonial } from "@/data/testimonial";

export default function TestimonialsSection() {
  return (
    <section className="w-full py-20 md:py-28 bg-background">
      <div className="container mx-auto px-4 md:px-6">

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white">
            Loved by Professionals Worldwide
          </h2>
          <p className="mt-4 text-gray-400 max-w-2xl mx-auto">
            Real stories from people who transformed their careers with Genie-Verse.
          </p>
        </motion.div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonial.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.15 }}
              viewport={{ once: true }}
              className="
                relative
                rounded-xl
                p-6
                bg-[#0b0b1f]
                border
                border-purple-500/10
                hover:border-purple-500/40
                transition
              "
            >
              {/* Glow */}
              <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-purple-500/10 to-cyan-500/10 blur-xl opacity-0 hover:opacity-100 transition" />

              {/* Quote */}
              <p className="relative text-gray-300 text-sm leading-relaxed mb-6">
                “{item.quote}”
              </p>

              {/* Author */}
              <div className="relative flex items-center gap-4">
                <Image
                  src={item.image}
                  alt={item.author}
                  width={48}
                  height={48}
                  className="rounded-full border border-purple-500/30"
                />
                <div>
                  <p className="text-white font-semibold">{item.author}</p>
                  <p className="text-xs text-gray-400">
                    {item.role} • {item.company}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
