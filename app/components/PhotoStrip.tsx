"use client";

import Image from "next/image";

const photos = [
  { src: "/images/luis/outdoor.jpg", alt: "Luis con su perro en el parque", rotate: "-rotate-1" },
  { src: "/images/luis/formal.jpg", alt: "Luis en sesión formal", rotate: "rotate-1" },
  { src: "/images/luis/sofa.jpg", alt: "Luis en casa", rotate: "-rotate-1" },
  { src: "/images/luis/coworking.jpg", alt: "Luis en coworking", rotate: "rotate-1" },
  { src: "/images/luis/selfie.jpg", alt: "Selfie de Luis", rotate: "-rotate-1" },
  { src: "/images/luis/working.jpg", alt: "Luis trabajando", rotate: "rotate-1" },
  // Duplicate for seamless loop
  { src: "/images/luis/outdoor.jpg", alt: "Luis con su perro en el parque", rotate: "-rotate-1" },
  { src: "/images/luis/formal.jpg", alt: "Luis en sesión formal", rotate: "rotate-1" },
  { src: "/images/luis/sofa.jpg", alt: "Luis en casa", rotate: "-rotate-1" },
  { src: "/images/luis/coworking.jpg", alt: "Luis en coworking", rotate: "rotate-1" },
  { src: "/images/luis/selfie.jpg", alt: "Selfie de Luis", rotate: "-rotate-1" },
  { src: "/images/luis/working.jpg", alt: "Luis trabajando", rotate: "rotate-1" },
];

export default function PhotoStrip() {
  return (
    <section className="w-full overflow-hidden bg-gray-50 border-t border-gray-200 py-12">
      <div className="mb-8 max-w-5xl mx-auto px-4">
        <p className="text-xs font-black uppercase tracking-[0.3em] text-black/30">
          UN POCO DE MÍ
        </p>
      </div>

      <div
        className="flex gap-5 w-max animate-marquee hover:[animation-play-state:paused]"
        style={{ willChange: "transform" }}
      >
        {photos.map((photo, i) => (
          <div
            key={i}
            className={`shrink-0 w-52 md:w-64 overflow-hidden bg-white shadow-md ${photo.rotate} transition-transform hover:rotate-0 hover:scale-105 hover:shadow-xl`}
            style={{ transition: "transform 0.3s ease, box-shadow 0.3s ease" }}
          >
            <Image
              src={photo.src}
              alt={photo.alt}
              width={256}
              height={320}
              className="w-full object-cover object-top"
              style={{ aspectRatio: "4/5" }}
              unoptimized
            />
          </div>
        ))}
      </div>
    </section>
  );
}
