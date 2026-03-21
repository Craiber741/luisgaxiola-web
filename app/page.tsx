import Link from "next/link";
import { ArrowRight, CheckCircle, TrendingUp, Zap } from "lucide-react";
import ContactForm from "./components/ContactForm";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-4 md:p-24 bg-white selection:bg-[var(--accent)] selection:text-white">

      {/* Hero Section */}
      <section className="w-full max-w-5xl flex flex-col items-start justify-center min-h-[80vh] space-y-8">
        <h1 className="text-5xl md:text-8xl font-black tracking-tighter leading-none text-black">
          CONVIERTO ADS<br />
          <span className="text-[var(--accent)]">EN DINERO.</span>
        </h1>
        <p className="text-xl md:text-2xl text-black/80 max-w-2xl font-medium">
          Media Buyer Profesional. +$4M invertidos. +$45M generados.
          <br className="hidden md:block" />
          No busco likes. Busco rentabilidad bruta.
        </p>
        <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto">
          <Link
            href="#servicios"
            className="px-8 py-4 bg-[var(--accent)] text-white font-bold text-lg hover:brightness-110 transition-all flex items-center justify-center gap-2 uppercase tracking-wide"
          >
            ESCALAR MI NEGOCIO <ArrowRight className="w-5 h-5" />
          </Link>
          <a
            href="https://blog.luisgaxiola.com"
            className="px-8 py-4 border-2 border-black font-bold text-lg hover:bg-black hover:text-white transition-colors flex items-center justify-center gap-2 uppercase"
          >
            LEER MI VLOG
          </a>
        </div>
      </section>

      {/* Story / Authority Section */}
      <section className="w-full max-w-5xl py-24 border-t border-gray-200">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 text-lg text-black">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-[var(--accent)]">NO SOY UN GURÚ.</h2>
            <h3 className="text-2xl font-bold mb-4 text-black">Soy un operador de campañas.</h3>
            <p className="mb-4">
              Llevo más de una década gestionando campañas en Meta, TikTok y Google Ads. He invertido más de <strong>$4 Millones de USD</strong> y generado más de <strong>$45 Millones de USD</strong> en ventas.
            </p>
            <p className="mb-4">
              Mi filosofía es simple: <strong>Especialización sobre diversificación.</strong> Solo acepto 2 clientes nuevos al mes. Si tu negocio no está listo para escalar, te lo digo. Prefiero perder un cliente a perder mi reputación.
            </p>
            <p className="font-bold">
              Marketing basado en datos. Sin "bullshit". Sin métricas de vanidad.
            </p>
          </div>
          <div className="flex flex-col gap-8 justify-center bg-gray-50 p-8 rounded-lg border border-gray-100">
            <div className="flex flex-col gap-2">
              <span className="text-5xl font-black text-[var(--accent)]">+$45M</span>
              <span className="font-bold text-xl uppercase tracking-wider">Ventas Generadas</span>
            </div>
            <div className="flex flex-col gap-2">
              <span className="text-5xl font-black text-[var(--accent)]">+$4M</span>
              <span className="font-bold text-xl uppercase tracking-wider">Inversión Gestionada</span>
            </div>
            <div className="flex flex-col gap-2">
              <span className="text-5xl font-black text-[var(--accent)]">High-ROI</span>
              <span className="font-bold text-xl uppercase tracking-wider">Hospitales, Ecom & Servicios</span>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="servicios" className="w-full max-w-5xl py-24 border-t border-gray-200">
        <h2 className="text-4xl md:text-6xl font-black mb-16 text-center text-black uppercase">CÓMO TE AYUDO</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
          {[
            { title: "Media Buying (Ads)", desc: "Meta, TikTok y Google Ads. Gestión avanzada con IA.", slug: "media-buying" },
            { title: "Consultoría Estratégica", desc: "Auditoría de 360°. Detecto por qué no vendes.", slug: "consultoria" },
            { title: "Mentoria 1 a 1", desc: "Acceso directo a mi cerebro y mis estrategias.", slug: "mentoria" }
          ].map((service, i) => (
            <Link
              key={i}
              href={`/servicios/${service.slug}`}
              className="group p-8 border border-gray-200 hover:border-[var(--accent)] transition-all hover:shadow-[0_0_30px_-10px_var(--accent)] relative overflow-hidden bg-white"
            >
              <h3 className="text-2xl font-black mb-4 uppercase text-black">{service.title}</h3>
              <p className="text-black/70 mb-8 font-medium">{service.desc}</p>
              <span className="font-bold flex items-center gap-2 text-[var(--accent)] group-hover:translate-x-2 transition-transform">
                DETALLES <ArrowRight className="w-5 h-5" />
              </span>
            </Link>
          ))}
        </div>

        {/* Contact Form Section */}
        <section id="contacto" className="scroll-mt-24">
          <ContactForm />
        </section>
      </section>

    </main>
  );
}
