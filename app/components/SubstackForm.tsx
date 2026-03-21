import { Check, ArrowRight } from "lucide-react";

interface SubstackFormProps {
  substackUrl: string;
  subscriberCount?: string;
}

const bullets = [
  "Casos reales de campañas (con números, no teoría)",
  "Detrás de escena de Chawoora y Craiber",
  "Estrategias que aplico antes de publicarlas en redes",
];

export default function SubstackForm({ substackUrl, subscriberCount }: SubstackFormProps) {
  return (
    <section className="w-full bg-black text-white border-t-4 border-[var(--accent)]">
      <div className="max-w-5xl mx-auto px-4 py-24">
        <p className="text-xs font-black uppercase tracking-[0.3em] text-[var(--accent)] mb-6">
          MI NEWSLETTER EN SUBSTACK
        </p>
        <h2 className="text-4xl md:text-6xl font-black tracking-tighter leading-none mb-6 text-white">
          ESTRATEGIAS QUE<br />
          <span className="text-[var(--accent)]">NO PUBLICO EN REDES.</span>
        </h2>
        <p className="text-xl text-white/70 max-w-2xl mb-10 font-medium">
          Cada semana: lo que estoy aprendiendo construyendo mis ventures, campañas que están funcionando ahora mismo y lo que nadie del gremio se atreve a publicar.
        </p>

        <ul className="flex flex-col gap-4 mb-12">
          {bullets.map((bullet, i) => (
            <li key={i} className="flex items-start gap-3 text-white/80 font-medium">
              <Check className="w-5 h-5 text-[var(--accent)] mt-0.5 shrink-0" />
              {bullet}
            </li>
          ))}
        </ul>

        <a
          href={substackUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-3 px-10 py-5 bg-white text-black font-black text-lg uppercase tracking-wide hover:bg-[var(--accent)] hover:text-white transition-all"
        >
          SUSCRIBIRME GRATIS <ArrowRight className="w-5 h-5" />
        </a>

        {subscriberCount && (
          <p className="mt-6 text-sm text-white/40 font-medium">
            {subscriberCount} suscriptores. Sin spam. Sin bullshit.
          </p>
        )}
      </div>
    </section>
  );
}
