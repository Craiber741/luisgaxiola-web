"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";

const stats = [
  { prefix: "$", value: 45, suffix: "M+", label: "Generados para clientes" },
  { prefix: "", value: 7, suffix: "+", label: "Años en marketing digital" },
  { prefix: "", value: 50, suffix: "+", label: "Clientes atendidos" },
  { prefix: "", value: 3, suffix: "", label: "Ventures activos" },
];

function AnimatedCounter({
  target,
  prefix,
  suffix,
  inView,
}: {
  target: number;
  prefix: string;
  suffix: string;
  inView: boolean;
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
        setCount(Math.floor(current));
      }
    }, duration / steps);

    return () => clearInterval(interval);
  }, [inView, target]);

  return (
    <span className="text-4xl md:text-5xl font-black tracking-tighter text-white">
      {prefix}
      {count}
      {suffix}
    </span>
  );
}

export default function StatsBar() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px" });

  return (
    <section ref={ref} className="w-full bg-black border-t border-white/10">
      <div className="max-w-5xl mx-auto px-4 py-14">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4">
          {stats.map((stat, i) => (
            <div key={i} className="flex flex-col items-start gap-1">
              <AnimatedCounter
                target={stat.value}
                prefix={stat.prefix}
                suffix={stat.suffix}
                inView={inView}
              />
              <p className="text-sm text-white/50 font-medium leading-tight">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
