import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import type { ContentPost } from "@/lib/content";

export const SITE_URL = "https://luisgaxiola.com";
export const INSTAGRAM_URL = "https://www.instagram.com/luisgaxiolavibemarketing";
export const YOUTUBE_URL = "https://www.youtube.com/channel/UCAHAbnHvqLHp0qeQXXgIFUA";
export const BLOG_URL = "https://blog.luisgaxiola.com";

export const NEWSLETTERS = [
  {
    name: "El MedIA Buyer",
    url: "https://mediabuyingconia.substack.com",
    hook: "Para el dueño que ya gasta en ads y todavía no sabe por qué no funcionan.",
    body: "Una lección diaria de alguien que ha metido más de $4M USD en anuncios, con dinero de verdad. Qué preguntarle a tu agencia el lunes y cuándo apagar un anuncio que parece ganador.",
    paraQuien: "Dueños de negocio que ya pagan anuncios en Meta, Google o TikTok, o que le pagan a una agencia para que lo haga.",
  },
  {
    name: "La empresa de 1 persona",
    url: "https://laempresade1persona.substack.com",
    hook: "Decidí construir un negocio de una persona.",
    body: "Lo voy documentando mientras pasa: qué sistemas armo y cuánto entra cada mes. También los meses en que las cuentas no salen.",
    paraQuien: "Freelancers y consultores que quieren ganar más sin contratar un equipo ni vender más horas.",
  },
];

// sameAs del schema Person: perfiles que son de Luis.
export const SAME_AS = [INSTAGRAM_URL, YOUTUBE_URL, BLOG_URL, ...NEWSLETTERS.map((n) => n.url)];

const nav = [
  { label: "Newsletters", href: "/newsletters" },
  { label: "Asesoría", href: "/asesoria" },
  { label: "Sobre mí", href: "/sobre-mi" },
];

export const btnPrimary =
  "inline-flex items-center justify-center gap-3 bg-ink text-coal px-8 py-4 text-sm uppercase tracking-[0.2em] hover:bg-accent hover:text-white transition-colors";
export const btnGhost =
  "inline-flex items-center justify-center gap-3 border border-white/30 px-8 py-4 text-sm uppercase tracking-[0.2em] hover:border-white transition-colors";
export const eyebrow = "text-xs uppercase tracking-[0.3em] text-accent mb-6";
export const h2 = "font-semibold tracking-tight text-4xl md:text-6xl leading-[1.05]";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 bg-coal/85 backdrop-blur border-b border-white/10">
      <nav className="max-w-6xl mx-auto px-4 md:px-8 h-16 flex items-center justify-between gap-6">
        <Link href="/" className="font-semibold text-lg tracking-tight shrink-0">Luis Gaxiola</Link>
        <div className="flex items-center gap-5 md:gap-8 text-[11px] md:text-xs uppercase tracking-[0.15em] md:tracking-[0.2em] min-w-0">
          {nav.map((l) => (
            <Link key={l.href} href={l.href} className="hidden sm:inline text-white/60 hover:text-white transition-colors">{l.label}</Link>
          ))}
          <Link href="/asesoria#aplicar" className="border border-white/30 px-4 py-2 hover:bg-ink hover:text-coal transition-colors shrink-0">Aplicar</Link>
        </div>
      </nav>
      {/* En móvil los links van en una segunda fila. */}
      <div className="sm:hidden flex justify-between px-4 pb-3 text-[11px] uppercase tracking-[0.15em] text-white/60">
        {nav.map((l) => (
          <Link key={l.href} href={l.href} className="hover:text-white">{l.label}</Link>
        ))}
      </div>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="border-t border-white/10">
      <div className="max-w-6xl mx-auto px-4 md:px-8 py-12 grid gap-8 sm:grid-cols-[1fr_auto] text-sm">
        <div>
          <p className="font-semibold tracking-tight text-lg mb-2">Luis Gaxiola</p>
          <p className="text-white/50">Media buyer y trafficker digital. Guadalajara, México.</p>
        </div>
        <div className="flex flex-wrap gap-x-6 gap-y-2 text-white/50">
          {nav.map((l) => (
            <Link key={l.href} href={l.href} className="hover:text-white">{l.label}</Link>
          ))}
          <a href={BLOG_URL} target="_blank" rel="noopener noreferrer" className="hover:text-white">Blog</a>
          <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className="hover:text-white">Instagram</a>
          <a href={YOUTUBE_URL} target="_blank" rel="noopener noreferrer" className="hover:text-white">YouTube</a>
          <Link href="/privacidad" className="hover:text-white">Privacidad</Link>
        </div>
      </div>
      <p className="max-w-6xl mx-auto px-4 md:px-8 pb-10 text-xs text-white/30">© {new Date().getFullYear()} Luis Gaxiola</p>
    </footer>
  );
}

export function NewsletterCard({ n, posts, detailed = false }: { n: (typeof NEWSLETTERS)[number]; posts: ContentPost[]; detailed?: boolean }) {
  return (
    <article className="bg-coal p-8 md:p-12 flex flex-col min-w-0">
      <h3 className="font-semibold tracking-tight text-3xl md:text-4xl mb-4">{n.name}</h3>
      <p className="text-lg text-white/80 mb-6">“{n.hook}”</p>
      <p className="text-white/60 leading-relaxed mb-6">{n.body}</p>
      {detailed && (
        <p className="text-white/60 leading-relaxed mb-6">
          <span className="text-white/40 uppercase tracking-[0.2em] text-xs block mb-2">Para quién</span>
          {n.paraQuien}
        </p>
      )}

      {posts.length > 0 && (
        <div className="my-4 mb-10">
          <p className="text-xs uppercase tracking-[0.2em] text-white/40 mb-4">Últimos números</p>
          <ul className="divide-y divide-white/10 border-y border-white/10">
            {posts.map((p) => (
              <li key={p.url}>
                <a href={p.url} target="_blank" rel="noopener noreferrer" className="group flex items-start justify-between gap-4 py-4 text-sm text-white/80 hover:text-white">
                  {p.title}
                  <ArrowUpRight className="w-4 h-4 shrink-0 text-white/30 group-hover:text-accent" />
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}

      <a href={n.url} target="_blank" rel="noopener noreferrer" className={`mt-auto ${btnPrimary}`}>
        Suscribirme gratis <ArrowUpRight className="w-4 h-4" />
      </a>
    </article>
  );
}

export function CierreCTA() {
  return (
    <section className="border-t border-white/10">
      <div className="max-w-6xl mx-auto px-4 md:px-8 py-24 md:py-32 text-center">
        <h2 className={`${h2} mb-12`}>
          Empieza por leer.<br />
          <span className="text-white/50">Si después quieres hablar, aplica.</span>
        </h2>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/newsletters" className={btnPrimary}>
            Newsletters <ArrowRight className="w-4 h-4" />
          </Link>
          <Link href="/asesoria#aplicar" className={btnGhost}>Aplicar a la asesoría</Link>
        </div>
      </div>
    </section>
  );
}

export function JsonLd({ data }: { data: object }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}

// Substack publica un post "Próximamente" de bienvenida; no es un número real.
export function sinPlaceholder(posts: ContentPost[]) {
  return posts.filter((p) => p.title.trim() !== "Próximamente");
}
