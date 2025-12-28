"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { ChevronDown } from "lucide-react";

export default function Faqs({ faqs }) {
  const [activeIndex, setActiveIndex] = useState(null);

  return (
    <section className="w-full py-20 md:py-28 bg-background">
      <div className="container mx-auto px-4 md:px-6 max-w-4xl">

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white">
            Frequently Asked Questions
          </h2>
          <p className="mt-4 text-gray-400">
            Everything you need to know about Sensai
          </p>
        </motion.div>

        {/* FAQ List */}
        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = activeIndex === index;

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="
                  rounded-xl
                  border
                  border-purple-500/20
                  bg-[#0b0b1f]
                  overflow-hidden
                "
              >
                {/* Question */}
                <button
                  onClick={() =>
                    setActiveIndex(isOpen ? null : index)
                  }
                  className="
                    w-full
                    flex
                    items-center
                    justify-between
                    px-6
                    py-5
                    text-left
                    text-white
                    font-medium
                    hover:bg-purple-500/5
                    transition
                  "
                >
                  <span>{faq.question}</span>
                  <ChevronDown
                    className={`h-5 w-5 transition-transform ${
                      isOpen ? "rotate-180 text-purple-400" : "text-gray-400"
                    }`}
                  />
                </button>

                {/* Answer */}
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                      <div className="px-6 pb-5 text-gray-400 text-sm leading-relaxed">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
