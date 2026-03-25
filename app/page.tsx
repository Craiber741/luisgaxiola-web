import Link from "next/link";
import { ArrowRight, ExternalLink } from "lucide-react";
import ContactForm from "./components/ContactForm";
import SubstackForm from "./components/SubstackForm";

const SUBSTACK_URL = "https://elmediabuyer.substack.com/";

const ventures = [
  {
    tag: "SAAS · OMNICANAL",
    name: "CHAWOORA",
    description:
      "Sistema de comunicación omnicanal para negocios que corren ads. Centraliza WhatsApp, email e Instagram DMs en un solo lugar para que nunca pierdas un lead caliente.",
    cta: "Conocer Chawoora",
    href: "https://chawoora.com",
  },
  {
    tag: "COMUNIDAD · MARKETING",
    name: "CRAIBER",
    description:
      "La comunidad de Vibe Marketing para founders y marketers que quieren vender más usando IA, creatividad y sistemas — no solo ads.",
    cta: "Entrar a Craiber",
    href: "https://craiber.com",
  },
];

const services = [
  { title: "Media Buying (Ads)", desc: "Meta, TikTok y Google Ads. Gestión avanzada con IA.", slug: "media-buying" },
  { title: "Consultoría Estratégica", desc: "Auditoría de 360°. Detecto por qué no vendes.", slug: "consultoria" },
  { title: "Mentoría 1 a 1", desc: "Acceso directo a mi cerebro y mis estrategias.", slug: "mentoria" },
];

export default function Home() {
  return (
    <main className="flex flex-col bg-white selection:bg-[var(--accent)] selection:text-white">

      {/* Hero */}
      <section className="w-full max-w-5xl mx-auto px-4 flex flex-col items-start justify-center min-h-[88vh] py-16 space-y-8">
        <p className="text-xs font-black uppercase tracking-[0.3em] text-black/40">
          ENTREPRENEUR · MEDIA BUYER · BUILDER
        </p>
        <h1 className="text-5xl md:text-8xl font-black tracking-tighter leading-none text-black">
          CONSTRUYO<br />
          SISTEMAS QUE<br />
          <span className="text-[var(--accent)]">GENERAN DINERO.</span>
        </h1>
        <p className="text-xl md:text-2xl text-black/80 max-w-2xl font-medium">
          Más de $45M generados en ventas para mis clientes. Ahora construyo Chawoora y Craiber
          — y te cuento todo en mi newsletter.
        </p>
        <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
          <a
            href={SUBSTACK_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-4 bg-[var(--accent)] text-white font-bold text-lg hover:brightness-110 transition-all flex items-center justify-center gap-2 uppercase tracking-wide"
          >
            SUSCRÍBETE GRATIS <ArrowRight className="w-5 h-5" />
          </a>
          <Link
            href="#servicios"
            className="px-8 py-4 border-2 border-black font-bold text-lg hover:bg-black hover:text-white transition-colors flex items-center justify-center gap-2 uppercase"
          >
            VER MIS SERVICIOS
          </Link>
        </div>
      </section>

      {/* Ventures */}
      <section className="w-full bg-gray-50 border-t border-gray-200">
        <div className="max-w-5xl mx-auto px-4 py-24">
          <p className="text-xs font-black uppercase tracking-[0.3em] text-black/40 mb-4">
            MIS VENTURES
          </p>
          <h2 className="text-3xl md:text-5xl font-black tracking-tighter mb-16 text-black">
            LO QUE ESTOY CONSTRUYENDO
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {ventures.map((v) => (
              <div
                key={v.name}
                className="p-8 border border-gray-200 bg-white hover:border-[var(--accent)] hover:shadow-[0_0_30px_-10px_var(--accent)] transition-all"
              >
                <span className="inline-block text-xs font-black uppercase tracking-widest bg-[var(--accent)]/10 text-[var(--accent)] px-3 py-1 mb-6">
                  {v.tag}
                </span>
                <h3 className="text-3xl font-black mb-4 text-black">{v.name}</h3>
                <p className="text-black/70 font-medium mb-8 leading-relaxed">{v.description}</p>
                <a
                  href={v.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-bold flex items-center gap-2 text-[var(--accent)] hover:gap-3 transition-all"
                >
                  {v.cta} <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Substack CTA */}
      <SubstackForm substackUrl={SUBSTACK_URL} />

      {/* Services (secondary) */}
      <section id="servicios" className="w-full scroll-mt-16">
        <div className="max-w-5xl mx-auto px-4 py-24 border-t border-gray-200">
          <p className="text-xs font-black uppercase tracking-[0.3em] text-black/40 mb-4">
            MIS SERVICIOS
          </p>
          <h2 className="text-3xl md:text-4xl font-black mb-3 text-black uppercase">CÓMO TE AYUDO</h2>
          <p className="text-black/50 font-medium mb-16">Para los que ya saben lo que quieren.</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
            {services.map((service, i) => (
              <Link
                key={i}
                href={`/servicios/${service.slug}`}
                className="group p-8 border border-gray-200 hover:border-[var(--accent)] transition-all hover:shadow-[0_0_30px_-10px_var(--accent)] bg-white"
              >
                <h3 className="text-2xl font-black mb-4 uppercase text-black">{service.title}</h3>
                <p className="text-black/70 mb-8 font-medium">{service.desc}</p>
                <span className="font-bold flex items-center gap-2 text-[var(--accent)] group-hover:translate-x-2 transition-transform">
                  DETALLES <ArrowRight className="w-5 h-5" />
                </span>
              </Link>
            ))}
          </div>

          <section id="contacto" className="scroll-mt-24">
            <ContactForm />
          </section>
        </div>
      </section>

    </main>
  );
}
