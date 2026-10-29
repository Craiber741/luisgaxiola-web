import type { Metadata } from "next";
import Image from "next/image";
import { eyebrow, h2, CierreCTA } from "../components/site";

export const metadata: Metadata = {
  title: { absolute: "Luis Gaxiola, media buyer y trafficker digital | Sobre mí" },
  description:
    "Luis Gaxiola es media buyer y trafficker digital con más de 7 años y +$4M USD invertidos en Meta Ads, Google Ads y TikTok Ads para negocios en México y Estados Unidos.",
  alternates: { canonical: "/sobre-mi" },
};

const plataformas = ["Meta Ads", "Google Ads", "TikTok Ads", "Go High Level"];

const empresas = [
  {
    name: "Craiber",
    href: "https://craiber.com",
    desc: "Agencia de marketing con IA. SEO, Meta Ads, Google Ads y sitios web, operados por el equipo.",
  },
  {
    name: "Chawoora",
    href: "https://chawoora.com",
    desc: "Atención a clientes con IA. Junta WhatsApp, Instagram y correo en un solo lugar para que ningún lead se quede sin respuesta.",
  },
];

export default function SobreMi() {
  return (
    <main>
      <section className="max-w-6xl mx-auto px-4 md:px-8 pt-16 md:pt-28 pb-24 md:pb-32 grid md:grid-cols-[1.4fr_1fr] gap-12 md:gap-20 items-end">
        <div>
          <p className={`reveal ${eyebrow}`}>Sobre mí</p>
          <h1 className="reveal font-semibold text-5xl md:text-7xl leading-[1.02] tracking-[-0.04em] mb-10" style={{ animationDelay: "120ms" }}>
            Luis Gaxiola, media buyer y trafficker digital.
          </h1>
          <p className="reveal text-lg md:text-xl text-white/70 leading-relaxed max-w-xl" style={{ animationDelay: "240ms" }}>
            Compro anuncios para negocios desde hace más de siete años. Llevo más de $4M USD invertidos en Meta,
            Google y TikTok Ads, con clientes en México y Estados Unidos.
          </p>
        </div>
        <Image
          src="/images/luis/working.jpg"
          alt="Luis Gaxiola trabajando en campañas de anuncios"
          width={800}
          height={1000}
          className="reveal w-full max-w-sm md:max-w-none object-cover grayscale contrast-125 brightness-90"
          style={{ aspectRatio: "4/5", animationDelay: "200ms" }}
          priority
          unoptimized
        />
      </section>

      <section className="border-y border-white/10 bg-panel">
        <div className="max-w-4xl mx-auto px-4 md:px-8 py-24 md:py-32">
          <p className={eyebrow}>Qué hago</p>
          <h2 className={`${h2} mb-10`}>Media buyer, trafficker: el nombre cambia, el trabajo es el mismo.</h2>
          <div className="space-y-6 text-lg text-white/70 leading-relaxed">
            <p>
              En Estados Unidos le dicen media buyer. En buena parte de Latinoamérica, trafficker. Es quien decide dónde
              se pone el dinero de publicidad, cuánto, con qué anuncio y a quién se le enseña. Y quien corta lo que no
              regresa ventas.
            </p>
            <p>
              Me importa una cifra por encima de todas: cuánto te cuesta conseguir un cliente y cuánto te deja. El
              alcance y los likes sirven para diagnosticar. Para decidir si la campaña funciona, no.
            </p>
          </div>
          <div className="mt-14">
            <p className="text-xs uppercase tracking-[0.2em] text-white/40 mb-4">Plataformas</p>
            <div className="flex flex-wrap gap-3">
              {plataformas.map((p) => (
                <span key={p} className="border border-white/15 px-4 py-2 text-sm text-white/80">{p}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 md:px-8 py-24 md:py-32">
        <p className={eyebrow}>De dónde vengo</p>
        <h2 className={`${h2} mb-10`}>De Mexicali a Guadalajara.</h2>
        <div className="space-y-6 text-lg text-white/70 leading-relaxed">
          <p>
            Nací en Mexicali, Baja California, y hoy vivo en Guadalajara. Empecé comprando anuncios para clientes y
            aprendí pronto que el anuncio solo acelera lo que ya existe. Si la oferta o el seguimiento están rotos, más
            presupuesto solo hace más grande el hoyo.
          </p>
          <p>
            Por eso terminé construyendo sistemas además de campañas. Hoy dirijo dos empresas, y lo que escribo en mis
            newsletters sale de sus cuentas.
          </p>
        </div>
        <div className="mt-14 grid sm:grid-cols-2 gap-px bg-white/10 border border-white/10">
          {empresas.map((e) => (
            <a key={e.name} href={e.href} target="_blank" rel="noopener noreferrer" className="group bg-coal p-8 hover:bg-panel transition-colors">
              <p className="font-semibold tracking-tight text-2xl mb-3 group-hover:text-accent transition-colors">{e.name} ↗</p>
              <p className="text-white/60 leading-relaxed">{e.desc}</p>
            </a>
          ))}
        </div>
      </section>

      <CierreCTA />
    </main>
  );
}
