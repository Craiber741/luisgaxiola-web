"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

interface AnimatedSectionProps {
  children: React.ReactNode;
  direction?: "up" | "left" | "right";
  delay?: number;
  className?: string;
}

export default function AnimatedSection({
  children,
  direction = "up",
  delay = 0,
  className,
}: AnimatedSectionProps) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });

  const initial = {
    opacity: 0,
    y: direction === "up" ? 36 : 0,
    x: direction === "left" ? -36 : direction === "right" ? 36 : 0,
  };

  return (
    <motion.div
      ref={ref}
      initial={initial}
      animate={inView ? { opacity: 1, y: 0, x: 0 } : initial}
      transition={{ duration: 0.65, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
