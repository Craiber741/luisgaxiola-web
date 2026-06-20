"use client";

import { useRef } from "react";
import Image from "next/image";
import { ArrowLeft, ArrowRight, ExternalLink } from "lucide-react";
import type { ContentPost } from "@/lib/content";
import AnimatedSection from "./AnimatedSection";

interface ContentHubProps {
  wpPosts: ContentPost[];
  substackPosts: ContentPost[];
  ytPosts: ContentPost[];
}

const platformConfig = {
  blog: {
    label: "BLOG",
    color: "#2563eb",
    bg: "bg-[#2563eb]",
    border: "hover:border-[#2563eb]",
    shadow: "hover:shadow-[0_0_24px_-8px_#2563eb]",
    cta: "Leer artículo",
  },
  substack: {
    label: "NEWSLETTER",
    color: "#f97316",
    bg: "bg-[#f97316]",
    border: "hover:border-[#f97316]",
    shadow: "hover:shadow-[0_0_24px_-8px_#f97316]",
    cta: "Leer newsletter",
  },
  youtube: {
    label: "YOUTUBE",
    color: "#dc2626",
    bg: "bg-[#dc2626]",
    border: "hover:border-[#dc2626]",
    shadow: "hover:shadow-[0_0_24px_-8px_#dc2626]",
    cta: "Ver video",
  },
};

function formatDate(dateStr: string): string {
  if (!dateStr) return "";
  try {
    return new Date(dateStr).toLocaleDateString("es-MX", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  } catch {
    return dateStr;
  }
}

function PostCard({ post }: { post: ContentPost }) {
  const cfg = platformConfig[post.platform];
  return (
    <a
      href={post.url}
      target="_blank"
      rel="noopener noreferrer"
      className={`group shrink-0 w-[268px] flex flex-col border border-gray-200 bg-white transition-all duration-300 ${cfg.border} ${cfg.shadow}`}
      style={{ borderTopWidth: "3px", borderTopColor: cfg.color }}
    >
      {/* Thumbnail */}
      <div className="w-full h-40 bg-gray-100 overflow-hidden relative">
        {post.image ? (
          <Image
            src={post.image}
            alt={post.title}
            fill
            className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
            unoptimized
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center" style={{ backgroundColor: cfg.color + "15" }}>
            <span className="text-xs font-black uppercase tracking-widest" style={{ color: cfg.color }}>
              {cfg.label}
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-5 gap-3">
        <span
          className={`self-start text-[10px] font-black uppercase tracking-widest text-white px-2 py-0.5 ${cfg.bg}`}
        >
          {cfg.label}
        </span>

        <h3 className="text-sm font-black leading-snug text-black line-clamp-3 group-hover:text-gray-700 transition-colors">
          {post.title}
        </h3>

        {post.excerpt && (
          <p className="text-xs text-black/60 leading-relaxed line-clamp-3">{post.excerpt}</p>
        )}

        <div className="mt-auto flex items-center justify-between pt-2 border-t border-gray-100">
          {post.date && (
            <span className="text-[10px] text-black/40 font-medium">{formatDate(post.date)}</span>
          )}
          <span
            className="text-[10px] font-black uppercase flex items-center gap-1 transition-all group-hover:gap-2"
            style={{ color: cfg.color }}
          >
            {cfg.cta} <ArrowRight className="w-3 h-3" />
          </span>
        </div>
      </div>
    </a>
  );
}

function InstagramCard() {
  return (
    <a
      href="https://www.instagram.com/luisgaxiolavibemarketing/"
      target="_blank"
      rel="noopener noreferrer"
      className="group shrink-0 w-[268px] flex flex-col border border-gray-200 bg-white transition-all duration-300 hover:border-[#7c3aed] hover:shadow-[0_0_24px_-8px_#7c3aed]"
      style={{ borderTopWidth: "3px", borderTopColor: "#7c3aed" }}
    >
      {/* Gradient cover */}
      <div
        className="w-full h-40 flex items-center justify-center"
        style={{
          background: "linear-gradient(135deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)",
        }}
      >
        <svg viewBox="0 0 24 24" className="w-12 h-12 fill-white opacity-90">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
        </svg>
      </div>

      <div className="flex flex-col flex-1 p-5 gap-3">
        <span className="self-start text-[10px] font-black uppercase tracking-widest text-white px-2 py-0.5 bg-[#bc1888]">
          INSTAGRAM
        </span>

        <h3 className="text-sm font-black leading-snug text-black">
          @luisgaxiolavibemarketing
        </h3>

        <p className="text-xs text-black/60 leading-relaxed">
          Estrategias de marketing, detrás de cámaras y contenido exclusivo en Instagram.
        </p>

        <div className="mt-auto flex items-center justify-end pt-2 border-t border-gray-100">
          <span className="text-[10px] font-black uppercase flex items-center gap-1 transition-all group-hover:gap-2 text-[#7c3aed]">
            SEGUIR <ExternalLink className="w-3 h-3" />
          </span>
        </div>
      </div>
    </a>
  );
}

export default function ContentHub({ wpPosts, substackPosts, ytPosts }: ContentHubProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const allPosts: ContentPost[] = [
    ...wpPosts,
    ...ytPosts,
    ...substackPosts,
  ];

  const scroll = (dir: "left" | "right") => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollBy({ left: dir === "right" ? 300 : -300, behavior: "smooth" });
  };

  return (
    <section id="contenido" className="w-full scroll-mt-20 border-t border-gray-200">
      <div className="max-w-5xl mx-auto px-4 py-24">
        <AnimatedSection>
          <div className="flex items-end justify-between mb-12">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.3em] text-black/40 mb-4">
                MI CONTENIDO
              </p>
              <h2 className="text-3xl md:text-5xl font-black tracking-tighter text-black leading-none">
                LO QUE PUBLICO<br />
                <span className="text-[var(--accent)]">CADA SEMANA.</span>
              </h2>
            </div>

            {/* Prev/Next buttons */}
            <div className="hidden md:flex items-center gap-2">
              <button
                onClick={() => scroll("left")}
                className="w-10 h-10 border-2 border-black flex items-center justify-center hover:bg-black hover:text-white transition-colors"
                aria-label="Anterior"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>
              <button
                onClick={() => scroll("right")}
                className="w-10 h-10 border-2 border-black flex items-center justify-center hover:bg-black hover:text-white transition-colors"
                aria-label="Siguiente"
              >
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </AnimatedSection>

        {/* Carousel */}
        <div
          ref={scrollRef}
          className="flex gap-5 overflow-x-auto pb-4"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {allPosts.map((post, i) => (
            <PostCard key={i} post={post} />
          ))}
          <InstagramCard />
        </div>

        {/* Platform links */}
        <AnimatedSection delay={0.1} className="mt-10 flex flex-wrap gap-4">
          <a href="https://blog.luisgaxiola.com" target="_blank" rel="noopener noreferrer" className="text-xs font-black uppercase tracking-widest text-[#2563eb] hover:underline">Blog →</a>
          <a href="https://www.youtube.com/@luis.gaxiola1" target="_blank" rel="noopener noreferrer" className="text-xs font-black uppercase tracking-widest text-[#dc2626] hover:underline">YouTube →</a>
          <a href="https://laempresade1persona.substack.com" target="_blank" rel="noopener noreferrer" className="text-xs font-black uppercase tracking-widest text-[#f97316] hover:underline">Newsletter →</a>
          <a href="https://www.instagram.com/luisgaxiolavibemarketing/" target="_blank" rel="noopener noreferrer" className="text-xs font-black uppercase tracking-widest text-[#7c3aed] hover:underline">Instagram →</a>
        </AnimatedSection>
      </div>
    </section>
  );
}
