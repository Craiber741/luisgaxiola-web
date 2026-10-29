import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getSubstackPosts } from "@/lib/content";
import { NEWSLETTERS, NewsletterCard, CierreCTA, JsonLd, SITE_URL, btnPrimary, btnGhost, eyebrow, h2, sinPlaceholder } from "./components/site";

const proof = [
  { value: "+$4M", label: "USD invertidos en anuncios" },
  { value: "+$45M", label: "en ventas generadas para clientes" },
  { value: "7+", label: "años comprando medios" },
];

const pasos = [
  { n: "01", title: "Aplicas", desc: "Cuatro preguntas. Te toma dos minutos." },
  { n: "02", title: "Diagnóstico", desc: "Una llamada para ver tu cuenta y tus números. Si no veo cómo ayudarte, te lo digo ahí." },
  { n: "03", title: "Trabajamos", desc: "Sesiones semanales sobre tu cuenta, con WhatsApp directo entre una y otra." },
];

export default async function Home() {
  const posts = (await Promise.all(NEWSLETTERS.map((n) => getSubstackPosts(n.url, [])))).map(sinPlaceholder);

  return (
    <main>
      <JsonLd data={{ "@context": "https://schema.org", "@type": "WebSite", name: "Luis Gaxiola", url: SITE_URL, inLanguage: "es-MX" }} />

      {/* Hero */}
      <section className="max-w-6xl mx-auto px-4 md:px-8 pt-16 md:pt-28 pb-20 md:pb-32 grid md:grid-cols-[1.4fr_1fr] gap-12 md:gap-20 items-end">
        <div>
          <h1 className="mb-10">
            <span className="reveal block text-xs uppercase tracking-[0.3em] text-white/50 mb-10">
              Luis Gaxiola · Media buyer y trafficker digital
            </span>
            <span className="reveal block font-semibold text-5xl sm:text-6xl md:text-8xl leading-[1] tracking-[-0.04em]" style={{ animationDelay: "120ms" }}>
              Lo que aprendí invirtiendo <span className="text-accent">+$4M USD</span> en anuncios.
            </span>
          </h1>
          <p className="reveal text-lg md:text-xl text-white/70 max-w-xl leading-relaxed mb-12" style={{ animationDelay: "240ms" }}>
            Lo escribo en dos newsletters gratuitas. Y con pocos dueños de negocio a la vez lo trabajo uno a uno,
            sobre su cuenta de Meta, Google o TikTok Ads y sus números.
          </p>
          <div className="reveal flex flex-col sm:flex-row gap-4" style={{ animationDelay: "360ms" }}>
            <Link href="/newsletters" className={btnPrimary}>
              Leer las newsletters <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href="/asesoria" className={btnGhost}>Asesoría 1 a 1</Link>
          </div>
        </div>
        <div className="reveal relative max-w-sm md:max-w-none" style={{ animationDelay: "200ms" }}>
          <Image
            src="/images/luis/hero.jpg"
            alt="Luis Gaxiola, media buyer y trafficker digital"
            width={864}
            height={1152}
            className="w-full object-cover grayscale contrast-125 brightness-90"
            style={{ aspectRatio: "4/5" }}
            priority
            unoptimized
          />
          <div className="absolute inset-0 ring-1 ring-inset ring-white/10" />
        </div>
      </section>

      {/* Proof */}
      <section className="border-y border-white/10">
        <div className="max-w-6xl mx-auto px-4 md:px-8 grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-white/10">
          {proof.map((p) => (
            <div key={p.label} className="py-10 sm:px-8 sm:first:pl-0">
              <p className="font-semibold tracking-tight text-5xl md:text-6xl mb-2">{p.value}</p>
              <p className="text-sm text-white/50">{p.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Newsletters */}
      <section className="max-w-6xl mx-auto px-4 md:px-8 py-24 md:py-36">
        <p className={eyebrow}>01 · Newsletters</p>
        <h2 className={`${h2} max-w-3xl mb-16 md:mb-24`}>Escribo para dos tipos de lector. Las dos son gratis.</h2>
        <div className="grid md:grid-cols-2 gap-px bg-white/10 border border-white/10">
          {NEWSLETTERS.map((n, i) => (
            <NewsletterCard key={n.name} n={n} posts={posts[i]} />
          ))}
        </div>
      </section>

      {/* Asesoría */}
      <section className="bg-panel border-y border-white/10">
        <div className="max-w-6xl mx-auto px-4 md:px-8 py-24 md:py-36">
          <p className={eyebrow}>02 · Asesoría 1 a 1</p>
          <h2 className={`${h2} max-w-4xl mb-10`}>
            Para dueños que ya invierten en publicidad y quieren decidir con criterio propio.
          </h2>
          <p className="text-lg text-white/70 max-w-2xl leading-relaxed mb-20">
            Trabajo directo contigo sobre tu cuenta de anuncios, tu oferta y tus números. Tú o tu equipo ejecutan.
            Yo te digo qué mover primero y por qué.
          </p>
          <div className="grid md:grid-cols-3 gap-px bg-white/10 border border-white/10 mb-16">
            {pasos.map((p) => (
              <div key={p.n} className="bg-panel p-8 md:p-10">
                <p className="font-semibold text-accent text-2xl mb-6">{p.n}</p>
                <h3 className="font-semibold tracking-tight text-3xl mb-3">{p.title}</h3>
                <p className="text-white/60 leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/asesoria#aplicar" className={btnPrimary}>
              Aplicar <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href="/asesoria" className={btnGhost}>Cómo funciona</Link>
          </div>
        </div>
      </section>

      {/* Sobre mí */}
      <section className="max-w-6xl mx-auto px-4 md:px-8 py-24 md:py-36 grid md:grid-cols-[1fr_1.4fr] gap-12 md:gap-20 items-center">
        <Image
          src="/images/luis/cafe.jpg"
          alt="Luis Gaxiola"
          width={600}
          height={750}
          className="w-full max-w-sm object-cover grayscale contrast-125 brightness-90"
          style={{ aspectRatio: "4/5" }}
          unoptimized
        />
        <div>
          <p className={eyebrow}>03 · Sobre mí</p>
          <h2 className={`${h2} mb-8`}>Soy Luis Gaxiola.</h2>
          <div className="space-y-5 text-lg text-white/70 leading-relaxed mb-10">
            <p>
              Nací en Mexicali y vivo en Guadalajara. Llevo más de siete años comprando anuncios para negocios en
              México y Estados Unidos.
            </p>
            <p>
              Hoy dirijo Craiber, una agencia de marketing con IA, y Chawoora, que atiende a los clientes de un
              negocio con IA. Lo que escribo sale de esas cuentas.
            </p>
          </div>
          <Link href="/sobre-mi" className={btnGhost}>Mi historia completa</Link>
        </div>
      </section>

      <CierreCTA />
    </main>
  );
}
