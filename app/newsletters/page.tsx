import type { Metadata } from "next";
import Link from "next/link";
import { getSubstackPosts } from "@/lib/content";
import { NEWSLETTERS, NewsletterCard, JsonLd, SITE_URL, eyebrow, h2, btnGhost, sinPlaceholder } from "../components/site";

export const metadata: Metadata = {
  title: "Newsletters: El MedIA Buyer y La empresa de 1 persona",
  description:
    "Dos newsletters gratuitas de Luis Gaxiola, media buyer. El MedIA Buyer, para dueños que ya invierten en ads, y La empresa de 1 persona, sobre construir un negocio sin equipo.",
  alternates: { canonical: "/newsletters" },
};

export default async function Newsletters() {
  const posts = (await Promise.all(NEWSLETTERS.map((n) => getSubstackPosts(n.url, [])))).map(sinPlaceholder);

  return (
    <main>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "ItemList",
          itemListElement: NEWSLETTERS.map((n, i) => ({
            "@type": "ListItem",
            position: i + 1,
            item: { "@type": "Periodical", name: n.name, url: n.url, description: n.hook, author: { "@type": "Person", name: "Luis Gaxiola", url: SITE_URL } },
          })),
        }}
      />

      <section className="max-w-6xl mx-auto px-4 md:px-8 pt-16 md:pt-28 pb-20">
        <p className={`reveal ${eyebrow}`}>Newsletters · Gratis</p>
        <h1 className="reveal font-semibold text-5xl md:text-7xl leading-[1.02] tracking-[-0.04em] max-w-4xl mb-10" style={{ animationDelay: "120ms" }}>
          Lo que aprendo con dinero real, escrito antes de que salga en redes.
        </h1>
        <p className="reveal text-lg md:text-xl text-white/70 max-w-2xl leading-relaxed" style={{ animationDelay: "240ms" }}>
          Escribo dos newsletters en Substack. Una es para quien ya invierte en anuncios. La otra es para quien quiere
          un negocio que no dependa de contratar gente. Puedes leer las dos o quedarte con la que te toque.
        </p>
      </section>

      <section className="max-w-6xl mx-auto px-4 md:px-8 pb-24 md:pb-32">
        <div className="grid md:grid-cols-2 gap-px bg-white/10 border border-white/10">
          {NEWSLETTERS.map((n, i) => (
            <NewsletterCard key={n.name} n={n} posts={posts[i]} detailed />
          ))}
        </div>
      </section>

      <section className="bg-panel border-t border-white/10">
        <div className="max-w-6xl mx-auto px-4 md:px-8 py-24 md:py-32 grid md:grid-cols-[1.4fr_1fr] gap-10 items-end">
          <div>
            <p className={eyebrow}>¿Prefieres que lo veamos en tu cuenta?</p>
            <h2 className={h2}>Lo que escribo aquí, aplicado a tus números.</h2>
          </div>
          <Link href="/asesoria" className={`${btnGhost} md:justify-self-end`}>Ver la asesoría 1 a 1</Link>
        </div>
      </section>
    </main>
  );
}
