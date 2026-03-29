"use client";
import { motion } from "framer-motion";

// This component ensures consistent animation behavior between server and client
export const MotionDiv = ({ children, className, ...props }) => {
  return (
    <motion.div
      className={className}
      initial={false}
      whileInView="visible"
      viewport={{ once: true }}
      {...props}
    >
      {children}
    </motion.div>
  );
};
