"use client";

import { useEffect, useRef, useState } from "react";

export default function AnimatedCounter({
  target,
  prefix = "",
  suffix = "",
  decimals = 0,
  inView,
  className = "text-4xl md:text-5xl font-black tracking-tighter text-white",
}: {
  target: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  inView: boolean;
  className?: string;
}) {
  const [count, setCount] = useState(0);
  const started = useRef(false);

  useEffect(() => {
    if (!inView || started.current) return;
    started.current = true;

    const duration = 1600;
    const steps = 50;
    const increment = target / steps;
    let current = 0;
    const interval = setInterval(() => {
      current += increment;
      if (current >= target) {
        setCount(target);
        clearInterval(interval);
      } else {
        setCount(current);
      }
    }, duration / steps);

    return () => clearInterval(interval);
  }, [inView, target]);

  const formatted = count.toLocaleString("es-MX", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });

  return (
    <span className={className}>
      {prefix}
      {formatted}
      {suffix}
    </span>
  );
}
