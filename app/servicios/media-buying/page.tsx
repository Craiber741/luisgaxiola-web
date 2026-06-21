import type { Metadata } from "next";
import { ArrowDown, Check, X, ChevronDown } from "lucide-react";
import LiveAdsStats from "@/app/components/LiveAdsStats";
import Quiz from "@/app/components/Quiz";
import { getAdsStatsByNiche } from "@/lib/ads";

export const metadata: Metadata = {
  title: "Media Buying con Luis Gaxiola | Meta Ads con datos reales",
  description:
    "Gestiono tus campañas de Meta e Instagram Ads con datos reales, no corazonadas. Haz el quiz de 2 minutos y vemos si te puedo ayudar.",
};

const STEPS = [
  {
    n: "1",
    t: "Contestas el quiz",
    d: "Cuatro preguntas para entender tu negocio y a dónde quieres llegar. Dos minutos.",
  },
  {
    n: "2",
    t: "Reviso tu caso",
    d: "Lo veo yo, no un asistente. Si no creo que pueda ayudarte, te lo digo de frente.",
  },
  {
    n: "3",
    t: "Armamos el plan",
    d: "Si encajamos, definimos la estrategia y echamos a andar tus campañas.",
  },
];

const FAQS = [
  {
    q: "¿Cuánto cuesta?",
    a: "No manejo precio de catálogo. Depende de tu negocio, tu meta y cuánto vas a invertir en ads. Contesta el quiz y te paso una propuesta a tu medida.",
  },
  {
    q: "¿En cuánto tiempo veo resultados?",
    a: "Las campañas empiezan a soltar datos en los primeros días. Los buenos resultados llegan optimizando semana con semana. No te prometo milagros de la noche a la mañana.",
  },
  {
    q: "¿Cuánto necesito invertir en anuncios?",
    a: "Depende de tu giro y de a dónde quieres llegar. Si apenas empiezas, te digo con qué presupuesto tiene sentido arrancar para no tirar el dinero.",
  },
  {
    q: "¿Trabajas con mi tipo de negocio?",
    a: "He llevado cuentas de inmobiliaria, dental, restaurantes, salud, estética y más (los ves arriba, en vivo). Si tu giro no aparece, dímelo en el quiz y te digo si te puedo ayudar.",
  },
  {
    q: "¿Qué incluye?",
    a: "Tus campañas en Meta e Instagram de punta a punta: estrategia, estructura de cuenta, optimización constante y reportes claros de lo que de verdad importa.",
  },
  {
    q: "¿Por qué tú y no una agencia más barata?",
    a: "Conmigo hablas directo con quien mueve tus campañas, no con un becario rotando entre 30 cuentas. Y los números de arriba son reales, actualizados todos los días.",
  },
];

const FOR_YOU = [
  "Ya tienes un negocio con clientes y algo que vender que jala.",
  "Quieres más ventas, no solo likes.",
  "Estás listo para invertir en publicidad.",
];
const NOT_FOR_YOU = [
  "Apenas arrancas y todavía no tienes una oferta clara.",
  "Buscas resultados de la noche a la mañana sin meter presupuesto.",
];

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
      <section className="px-5 pt-12 pb-12 md:pt-20 md:pb-16 max-w-3xl mx-auto w-full">
        <p className="text-xs font-black uppercase tracking-[0.3em] text-[var(--accent)] mb-5">
          Media Buying · Meta e Instagram Ads
        </p>
        <h1 className="text-4xl md:text-6xl font-black tracking-tighter leading-[1.02] text-black mb-6">
          Convierte tus anuncios en clientes reales.
        </h1>
        <p className="text-lg md:text-xl text-black/70 font-medium leading-relaxed mb-8">
          Soy Luis Gaxiola. Llevo años corriendo campañas de Meta para negocios locales y
          marcas que venden todos los días. Aquí abajo te enseño números de esta semana.
          En vivo, no testimonios inventados.
        </p>
        <a
          href="#quiz"
          className="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-8 py-5 bg-[var(--accent)] text-white font-black text-lg uppercase tracking-tighter hover:brightness-110 transition-all"
        >
          Empezar quiz · 2 min
          <ArrowDown className="w-5 h-5" />
        </a>
        <p className="text-xs text-black/40 font-medium mt-4">
          4 preguntas rápidas. Sin compromiso. Si no te puedo ayudar, te lo digo.
        </p>
      </section>

      {/* Tira de credibilidad */}
      <section className="border-y border-gray-200 bg-gray-50">
        <div className="max-w-3xl mx-auto px-5 py-6 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-center">
          <span className="text-sm font-black text-black">
            +$45M <span className="text-black/50 font-bold">generados para clientes</span>
          </span>
          <span className="text-sm font-black text-black">
            50+ <span className="text-black/50 font-bold">negocios</span>
          </span>
          <span className="text-sm font-black text-black">
            7 años <span className="text-black/50 font-bold">corriendo ads</span>
          </span>
        </div>
      </section>

      {/* Prueba social: stats en vivo */}
      <LiveAdsStats data={adsStats} />

      {/* Cómo trabajamos */}
      <section className="px-5 py-16 md:py-20 max-w-3xl mx-auto w-full">
        <h2 className="text-3xl md:text-4xl font-black tracking-tighter text-black mb-10">
          Cómo trabajamos
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {STEPS.map((s) => (
            <div key={s.n} className="border-t-2 border-[var(--accent)] pt-4">
              <span className="text-4xl font-black text-black/15">{s.n}</span>
              <h3 className="text-lg font-black text-black mt-1 mb-2">{s.t}</h3>
              <p className="text-black/60 font-medium text-sm leading-relaxed">{s.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Para quién es */}
      <section className="px-5 py-16 md:py-20 bg-gray-50 border-y border-gray-200">
        <div className="max-w-3xl mx-auto w-full">
          <h2 className="text-3xl md:text-4xl font-black tracking-tighter text-black mb-10">
            ¿Esto es para ti?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white border border-gray-200 p-6">
              <p className="text-xs font-black uppercase tracking-widest text-[var(--accent)] mb-4">
                Sí, si…
              </p>
              <ul className="space-y-3">
                {FOR_YOU.map((t) => (
                  <li key={t} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-[var(--accent)] flex-shrink-0 mt-0.5" />
                    <span className="text-black/70 font-medium text-sm">{t}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-white border border-gray-200 p-6">
              <p className="text-xs font-black uppercase tracking-widest text-black/40 mb-4">
                Mejor no, si…
              </p>
              <ul className="space-y-3">
                {NOT_FOR_YOU.map((t) => (
                  <li key={t} className="flex items-start gap-3">
                    <X className="w-5 h-5 text-black/30 flex-shrink-0 mt-0.5" />
                    <span className="text-black/50 font-medium text-sm">{t}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="px-5 py-16 md:py-20 max-w-3xl mx-auto w-full">
        <h2 className="text-3xl md:text-4xl font-black tracking-tighter text-black mb-8">
          Preguntas que me hacen seguido
        </h2>
        <div className="divide-y divide-gray-200 border-t border-b border-gray-200">
          {FAQS.map((f) => (
            <details key={f.q} className="group">
              <summary className="flex items-center justify-between gap-4 cursor-pointer list-none py-5">
                <span className="font-black text-black text-base md:text-lg">{f.q}</span>
                <ChevronDown className="w-5 h-5 text-[var(--accent)] flex-shrink-0 transition-transform group-open:rotate-180" />
              </summary>
              <p className="text-black/60 font-medium leading-relaxed pb-5 -mt-1">
                {f.a}
              </p>
            </details>
          ))}
        </div>
      </section>

      {/* Quiz */}
      <section id="quiz" className="px-5 py-16 md:py-24 max-w-2xl mx-auto w-full scroll-mt-6">
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-black tracking-tighter text-black mb-3">
            ¿Vemos si te puedo ayudar?
          </h2>
          <p className="text-black/50 font-medium">Respóndeme 4 cosas y lo platicamos.</p>
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
