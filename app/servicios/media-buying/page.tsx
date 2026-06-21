import type { Metadata } from "next";
import { ArrowDown } from "lucide-react";
import LiveAdsStats from "@/app/components/LiveAdsStats";
import Quiz from "@/app/components/Quiz";
import { getAdsStatsByNiche } from "@/lib/ads";

export const metadata: Metadata = {
  title: "Media Buying con Luis Gaxiola | Meta Ads con datos reales",
  description:
    "Gestión de campañas de Meta Ads con datos reales, no corazonadas. Haz el quiz de 2 minutos y descubre si tu negocio califica.",
};

export default async function MediaBuyingLanding() {
  const adsStats = await getAdsStatsByNiche();

  return (
    <main className="flex flex-col bg-white">
      {/* Marca mínima */}
      <div className="w-full px-5 pt-6">
        <a
          href="/"
          className="text-xs font-black uppercase tracking-[0.3em] text-black/40 hover:text-black transition-colors"
        >
          Luis Gaxiola
        </a>
      </div>

      {/* Hero */}
      <section className="px-5 pt-14 pb-16 md:pt-20 md:pb-20 max-w-3xl mx-auto w-full">
        <p className="text-xs font-black uppercase tracking-[0.3em] text-[var(--accent)] mb-5">
          Media Buying · Meta Ads
        </p>
        <h1 className="text-4xl md:text-6xl font-black tracking-tighter leading-[1.02] text-black mb-6">
          Deja de quemar dinero en anuncios que no venden.
        </h1>
        <p className="text-lg md:text-xl text-black/70 font-medium leading-relaxed mb-10">
          Gestiono tus campañas como gestiono las mías: con datos reales, no corazonadas.
          Los números de abajo son de esta semana — en vivo.
        </p>
        <a
          href="#quiz"
          className="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-8 py-5 bg-[var(--accent)] text-white font-black text-lg uppercase tracking-tighter hover:brightness-110 transition-all"
        >
          Empezar quiz · 2 min
          <ArrowDown className="w-5 h-5" />
        </a>
        <p className="text-xs text-black/40 font-medium mt-4">
          4 preguntas. Sin compromiso. Te digo si puedo ayudarte.
        </p>
      </section>

      {/* Prueba social: stats en vivo */}
      <LiveAdsStats data={adsStats} />

      {/* Quiz */}
      <section id="quiz" className="px-5 py-16 md:py-24 max-w-2xl mx-auto w-full scroll-mt-6">
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-black tracking-tighter text-black mb-3">
            ¿Tu negocio califica?
          </h2>
          <p className="text-black/50 font-medium">
            Respóndeme 4 cosas y lo vemos.
          </p>
        </div>
        <Quiz serviceName="Media Buying" />
      </section>

      {/* CTA sticky en móvil */}
      <a
        href="#quiz"
        className="md:hidden fixed bottom-0 inset-x-0 z-40 bg-[var(--accent)] text-white text-center font-black uppercase tracking-tighter py-4 shadow-[0_-4px_20px_-5px_rgba(0,0,0,0.3)]"
      >
        Empezar quiz · 2 min
      </a>
      <div className="h-16 md:hidden" aria-hidden />
    </main>
  );
}
