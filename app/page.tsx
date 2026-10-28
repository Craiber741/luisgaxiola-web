import Image from "next/image";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import AsesoriaForm from "./components/AsesoriaForm";
import { getSubstackPosts } from "@/lib/content";

const INSTAGRAM_URL = "https://www.instagram.com/luisgaxiolavibemarketing";

const newsletters = [
  {
    name: "El MedIA Buyer",
    url: "https://mediabuyingconia.substack.com",
    hook: "Para el dueño que ya gasta en ads y todavía no sabe por qué no funcionan.",
    body: "Una lección diaria de alguien que ha metido más de $4M USD en anuncios, con dinero de verdad. Qué preguntarle a tu agencia el lunes y cuándo apagar un anuncio que parece ganador.",
  },
  {
    name: "La empresa de 1 persona",
    url: "https://laempresade1persona.substack.com",
    hook: "Decidí construir un negocio de una persona.",
    body: "Lo voy documentando mientras pasa: qué sistemas armo y cuánto entra cada mes. También los meses en que las cuentas no salen.",
  },
];

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
  const posts = await Promise.all(newsletters.map((n) => getSubstackPosts(n.url, []))).then((all) =>
    // Substack publica un post "Próximamente" de bienvenida; no es un número real.
    all.map((list) => list.filter((p) => p.title.trim() !== "Próximamente"))
  );

  return (
    <div className="bg-[#0B0B0C] text-[#EDE9E3] selection:bg-[#FF5C00] selection:text-white">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-[#0B0B0C]/85 backdrop-blur border-b border-white/10">
        <nav className="max-w-6xl mx-auto px-4 md:px-8 h-16 flex items-center justify-between">
          <a href="#" className="font-serif text-2xl tracking-tight">Luis Gaxiola</a>
          <div className="flex items-center gap-8 text-xs uppercase tracking-[0.2em]">
            <a href="#newsletters" className="hidden md:inline text-white/60 hover:text-white transition-colors">Newsletters</a>
            <a href="#asesoria" className="hidden md:inline text-white/60 hover:text-white transition-colors">Asesoría</a>
            <a href="#sobre-mi" className="hidden md:inline text-white/60 hover:text-white transition-colors">Sobre mí</a>
            <a href="#aplicar" className="border border-white/30 px-4 py-2 hover:bg-[#EDE9E3] hover:text-[#0B0B0C] transition-colors">Aplicar</a>
          </div>
        </nav>
      </header>

      <main>
        {/* Hero */}
        <section className="max-w-6xl mx-auto px-4 md:px-8 pt-16 md:pt-28 pb-20 md:pb-32 grid md:grid-cols-[1.4fr_1fr] gap-12 md:gap-20 items-end">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-white/50 mb-10">Media buyer · Guadalajara, MX</p>
            <h1 className="font-serif text-5xl sm:text-6xl md:text-8xl leading-[0.95] tracking-tight mb-10">
              Lo que aprendí invirtiendo <em className="text-[#FF5C00]">+$4M USD</em> en anuncios.
            </h1>
            <p className="text-lg md:text-xl text-white/70 max-w-xl leading-relaxed mb-12">
              Lo escribo en dos newsletters gratuitas. Y con pocos dueños de negocio a la vez lo trabajo uno a uno,
              sobre su cuenta y sus números.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a href="#newsletters" className="inline-flex items-center justify-center gap-3 bg-[#EDE9E3] text-[#0B0B0C] px-8 py-4 text-sm uppercase tracking-[0.2em] hover:bg-[#FF5C00] hover:text-white transition-colors">
                Leer las newsletters <ArrowRight className="w-4 h-4" />
              </a>
              <a href="#asesoria" className="inline-flex items-center justify-center gap-3 border border-white/30 px-8 py-4 text-sm uppercase tracking-[0.2em] hover:border-white transition-colors">
                Asesoría 1 a 1
              </a>
            </div>
          </div>
          <div className="relative max-w-sm md:max-w-none">
            <Image
              src="/images/luis/hero.jpg"
              alt="Luis Gaxiola"
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
                <p className="font-serif text-5xl md:text-6xl mb-2">{p.value}</p>
                <p className="text-sm text-white/50">{p.label}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Newsletters */}
        <section id="newsletters" className="max-w-6xl mx-auto px-4 md:px-8 py-24 md:py-36 scroll-mt-16">
          <p className="text-xs uppercase tracking-[0.3em] text-[#FF5C00] mb-6">01 · Newsletters</p>
          <h2 className="font-serif text-4xl md:text-6xl leading-tight max-w-3xl mb-16 md:mb-24">
            Escribo para dos tipos de lector. Las dos son gratis.
          </h2>
          <div className="grid md:grid-cols-2 gap-px bg-white/10 border border-white/10">
            {newsletters.map((n, i) => (
              <article key={n.name} className="bg-[#0B0B0C] p-8 md:p-12 flex flex-col min-w-0">
                <h3 className="font-serif text-3xl md:text-4xl mb-4">{n.name}</h3>
                <p className="font-serif italic text-xl text-white/80 mb-6">“{n.hook}”</p>
                <p className="text-white/60 leading-relaxed mb-10">{n.body}</p>

                {posts[i].length > 0 && (
                  <div className="mb-10">
                    <p className="text-xs uppercase tracking-[0.2em] text-white/40 mb-4">Últimos números</p>
                    <ul className="divide-y divide-white/10 border-y border-white/10">
                      {posts[i].map((p) => (
                        <li key={p.url}>
                          <a href={p.url} target="_blank" rel="noopener noreferrer" className="group flex items-start justify-between gap-4 py-4 text-sm text-white/80 hover:text-white">
                            {p.title}
                            <ArrowUpRight className="w-4 h-4 shrink-0 text-white/30 group-hover:text-[#FF5C00]" />
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                <form action={`${n.url}/api/v1/free?nojs=true`} method="post" target="_blank" className="mt-auto flex border border-white/20 focus-within:border-[#FF5C00] transition-colors">
                  <input type="email" name="email" required placeholder="tu@correo.com" aria-label={`Correo para ${n.name}`} className="flex-1 min-w-0 bg-transparent px-4 py-4 text-sm placeholder:text-white/30 focus:outline-none" />
                  <button type="submit" className="px-5 text-xs uppercase tracking-[0.2em] bg-[#EDE9E3] text-[#0B0B0C] hover:bg-[#FF5C00] hover:text-white transition-colors">
                    Suscribirme
                  </button>
                </form>
                <a href={n.url} target="_blank" rel="noopener noreferrer" className="mt-4 text-xs text-white/40 hover:text-white/70">
                  Ver el archivo completo →
                </a>
              </article>
            ))}
          </div>
        </section>

        {/* Asesoría */}
        <section id="asesoria" className="bg-[#121214] border-y border-white/10 scroll-mt-16">
          <div className="max-w-6xl mx-auto px-4 md:px-8 py-24 md:py-36">
            <p className="text-xs uppercase tracking-[0.3em] text-[#FF5C00] mb-6">02 · Asesoría 1 a 1</p>
            <h2 className="font-serif text-4xl md:text-6xl leading-tight max-w-4xl mb-10">
              Para dueños que ya invierten en publicidad y quieren decidir con criterio propio.
            </h2>
            <p className="text-lg text-white/70 max-w-2xl leading-relaxed mb-20">
              Trabajo directo contigo sobre tu cuenta de anuncios, tu oferta y tus números. Tú o tu equipo ejecutan.
              Yo te digo qué mover primero y por qué.
            </p>

            <div className="grid md:grid-cols-3 gap-px bg-white/10 border border-white/10 mb-20">
              {pasos.map((p) => (
                <div key={p.n} className="bg-[#121214] p-8 md:p-10">
                  <p className="font-serif text-[#FF5C00] text-2xl mb-6">{p.n}</p>
                  <h3 className="font-serif text-3xl mb-3">{p.title}</h3>
                  <p className="text-white/60 leading-relaxed">{p.desc}</p>
                </div>
              ))}
            </div>

            <div className="grid md:grid-cols-2 gap-12 md:gap-20">
              <div className="space-y-10">
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-white/40 mb-3">Es para ti si</p>
                  <p className="text-white/80 leading-relaxed">
                    Ya pautas en Meta o Google Ads y te cansaste de depender de lo que te reporta la agencia. Quieres
                    entender tu cuenta lo suficiente para tomar tú las decisiones.
                  </p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-white/40 mb-3">No es para ti si</p>
                  <p className="text-white/80 leading-relaxed">
                    Todavía no vendes, o buscas que alguien te lleve las campañas completas. Para eso está{" "}
                    <a href="https://craiber.com" target="_blank" rel="noopener noreferrer" className="underline decoration-white/30 underline-offset-4 hover:decoration-[#FF5C00]">Craiber</a>, mi agencia.
                  </p>
                </div>
              </div>
              <div id="aplicar" className="scroll-mt-24 border border-white/10 p-8 md:p-10 bg-[#0B0B0C]">
                <h3 className="font-serif text-3xl mb-2">Aplica</h3>
                <p className="text-sm text-white/50 mb-8">Trabajo con pocos dueños a la vez. Leo cada aplicación.</p>
                <AsesoriaForm />
              </div>
            </div>
          </div>
        </section>

        {/* Sobre mí */}
        <section id="sobre-mi" className="max-w-6xl mx-auto px-4 md:px-8 py-24 md:py-36 scroll-mt-16 grid md:grid-cols-[1fr_1.4fr] gap-12 md:gap-20 items-center">
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
            <p className="text-xs uppercase tracking-[0.3em] text-[#FF5C00] mb-6">03 · Sobre mí</p>
            <h2 className="font-serif text-4xl md:text-5xl leading-tight mb-8">Soy Luis Gaxiola.</h2>
            <div className="space-y-5 text-lg text-white/70 leading-relaxed">
              <p>
                Nací en Mexicali y vivo en Guadalajara. Llevo más de siete años comprando anuncios para negocios en
                México y Estados Unidos.
              </p>
              <p>
                Hoy dirijo <a href="https://craiber.com" target="_blank" rel="noopener noreferrer" className="text-[#EDE9E3] underline decoration-white/30 underline-offset-4 hover:decoration-[#FF5C00]">Craiber</a>,
                una agencia de marketing con IA, y{" "}
                <a href="https://chawoora.com" target="_blank" rel="noopener noreferrer" className="text-[#EDE9E3] underline decoration-white/30 underline-offset-4 hover:decoration-[#FF5C00]">Chawoora</a>,
                que atiende a los clientes de un negocio con IA. Lo que escribo sale de esas cuentas.
              </p>
            </div>
          </div>
        </section>

        {/* Cierre */}
        <section className="border-t border-white/10">
          <div className="max-w-6xl mx-auto px-4 md:px-8 py-24 md:py-32 text-center">
            <h2 className="font-serif text-4xl md:text-6xl leading-tight mb-12">
              Empieza por leer.<br />
              <em className="text-white/60">Si después quieres hablar, aplica.</em>
            </h2>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="#newsletters" className="inline-flex items-center justify-center gap-3 bg-[#EDE9E3] text-[#0B0B0C] px-8 py-4 text-sm uppercase tracking-[0.2em] hover:bg-[#FF5C00] hover:text-white transition-colors">
                Newsletters <ArrowRight className="w-4 h-4" />
              </a>
              <a href="#aplicar" className="inline-flex items-center justify-center gap-3 border border-white/30 px-8 py-4 text-sm uppercase tracking-[0.2em] hover:border-white transition-colors">
                Aplicar a la asesoría
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-white/10">
        <div className="max-w-6xl mx-auto px-4 md:px-8 py-10 flex flex-col sm:flex-row gap-4 justify-between text-xs text-white/40">
          <p>© {new Date().getFullYear()} Luis Gaxiola</p>
          <div className="flex gap-6">
            <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className="hover:text-white">Instagram</a>
            <a href="https://blog.luisgaxiola.com" target="_blank" rel="noopener noreferrer" className="hover:text-white">Blog</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
