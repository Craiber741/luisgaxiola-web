import type { Metadata } from "next";
import AsesoriaForm from "../components/AsesoriaForm";
import { JsonLd, SITE_URL, eyebrow, h2 } from "../components/site";

export const metadata: Metadata = {
  title: "Asesoría 1 a 1 en Meta Ads, Google Ads y TikTok Ads",
  description:
    "Asesoría 1 a 1 con Luis Gaxiola, media buyer y trafficker digital. Revisamos tu cuenta de anuncios y tus números para que decidas con criterio propio. Por aplicación.",
  alternates: { canonical: "/asesoria" },
};

const pasos = [
  { n: "01", title: "Aplicas", desc: "Cuatro preguntas. Te toma dos minutos." },
  { n: "02", title: "Diagnóstico", desc: "Una llamada para ver tu cuenta y tus números. Si no veo cómo ayudarte, te lo digo ahí." },
  { n: "03", title: "Trabajamos", desc: "Sesiones semanales sobre tu cuenta, con WhatsApp directo entre una y otra." },
];

const incluye = [
  "Revisión de tus campañas en vivo, dentro de tu cuenta.",
  "Qué apagar, qué escalar y qué probar después, con el porqué de cada cosa.",
  "Preguntas concretas para tu agencia o tu equipo, si alguien más opera la cuenta.",
  "WhatsApp directo entre sesiones para decisiones que no pueden esperar a la siguiente llamada.",
];

const faqs = [
  {
    q: "¿Cuánto cuesta?",
    a: "Depende de cuánto inviertes y de qué tan seguido necesitas revisar la cuenta. Te doy el precio en la llamada de diagnóstico, antes de que decidas nada.",
  },
  {
    q: "¿Tú me llevas las campañas?",
    a: "No. En la asesoría la cuenta la operas tú o tu equipo, y yo dirijo. Si quieres que alguien la opere completa, eso lo hace Craiber, mi agencia.",
  },
  {
    q: "¿En qué plataformas?",
    a: "Meta Ads (Facebook e Instagram), Google Ads y TikTok Ads.",
  },
  {
    q: "Ya tengo agencia. ¿Me sirve?",
    a: "Sí. Revisamos lo que te reporta la agencia contra lo que de verdad pasa en la cuenta y en tus ventas, y llegas a la siguiente junta con preguntas concretas.",
  },
  {
    q: "¿Trabajas con negocios fuera de México?",
    a: "Sí. Trabajo con negocios en México y en Estados Unidos.",
  },
  {
    q: "¿Y si no califico?",
    a: "Te lo digo en la llamada y te recomiendo por dónde empezar. A veces la respuesta es leer El MedIA Buyer unas semanas antes de gastar en asesoría.",
  },
];

export default function Asesoria() {
  return (
    <main>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Service",
          name: "Asesoría 1 a 1 en publicidad digital",
          serviceType: "Asesoría en Meta Ads, Google Ads y TikTok Ads",
          url: `${SITE_URL}/asesoria`,
          provider: { "@type": "Person", name: "Luis Gaxiola", url: SITE_URL },
          areaServed: [{ "@type": "Country", name: "México" }, { "@type": "Country", name: "Estados Unidos" }],
          availableLanguage: "es",
        }}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
        }}
      />

      <section className="max-w-6xl mx-auto px-4 md:px-8 pt-16 md:pt-28 pb-20">
        <p className={`reveal ${eyebrow}`}>Asesoría 1 a 1 · Por aplicación</p>
        <h1 className="reveal font-semibold text-5xl md:text-7xl leading-[1.02] tracking-[-0.04em] max-w-5xl mb-10" style={{ animationDelay: "120ms" }}>
          Asesoría en Meta, Google y TikTok Ads para dueños que quieren decidir con criterio propio.
        </h1>
        <p className="reveal text-lg md:text-xl text-white/70 max-w-2xl leading-relaxed" style={{ animationDelay: "240ms" }}>
          Trabajo directo contigo sobre tu cuenta de anuncios, tu oferta y tus números. Tú o tu equipo ejecutan.
          Yo te digo qué mover primero y por qué.
        </p>
      </section>

      <section className="max-w-6xl mx-auto px-4 md:px-8 pb-24">
        <div className="grid md:grid-cols-3 gap-px bg-white/10 border border-white/10">
          {pasos.map((p) => (
            <div key={p.n} className="bg-coal p-8 md:p-10">
              <p className="font-semibold text-accent text-2xl mb-6">{p.n}</p>
              <h2 className="font-semibold tracking-tight text-3xl mb-3">{p.title}</h2>
              <p className="text-white/60 leading-relaxed">{p.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-panel border-y border-white/10">
        <div className="max-w-6xl mx-auto px-4 md:px-8 py-24 md:py-32 grid md:grid-cols-2 gap-16 md:gap-20">
          <div>
            <p className={eyebrow}>Qué incluye</p>
            <ul className="divide-y divide-white/10 border-y border-white/10 mb-16">
              {incluye.map((x) => (
                <li key={x} className="py-5 text-white/80 leading-relaxed">{x}</li>
              ))}
            </ul>
            <p className={eyebrow}>Es para ti si</p>
            <p className="text-white/80 leading-relaxed mb-10">
              Ya pautas en Meta o Google Ads y te cansaste de depender de lo que te reporta la agencia. Quieres
              entender tu cuenta lo suficiente para tomar tú las decisiones.
            </p>
            <p className={eyebrow}>No es para ti si</p>
            <p className="text-white/80 leading-relaxed">
              Todavía no vendes, o buscas que alguien te lleve las campañas completas. Para eso está{" "}
              <a href="https://craiber.com" target="_blank" rel="noopener noreferrer" className="underline decoration-white/30 underline-offset-4 hover:decoration-accent">Craiber</a>, mi agencia.
            </p>
          </div>
          <div id="aplicar" className="scroll-mt-28 border border-white/10 p-8 md:p-10 bg-coal self-start">
            <h2 className="font-semibold tracking-tight text-3xl mb-2">Aplica</h2>
            <p className="text-sm text-white/50 mb-8">Trabajo con pocos dueños a la vez. Leo cada aplicación.</p>
            <AsesoriaForm />
          </div>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 md:px-8 py-24 md:py-32">
        <p className={eyebrow}>Preguntas frecuentes</p>
        <h2 className={`${h2} mb-12`}>Lo que me preguntan antes de aplicar.</h2>
        <div className="divide-y divide-white/10 border-y border-white/10">
          {faqs.map((f) => (
            <details key={f.q} className="group py-6">
              <summary className="flex justify-between items-center gap-6 cursor-pointer list-none text-lg font-medium">
                {f.q}
                <span className="text-accent text-2xl leading-none transition-transform group-open:rotate-45">+</span>
              </summary>
              <p className="mt-4 text-white/60 leading-relaxed max-w-2xl">{f.a}</p>
            </details>
          ))}
        </div>
      </section>
    </main>
  );
}
