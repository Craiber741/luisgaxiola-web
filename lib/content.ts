export type ContentPost = {
  platform: "blog" | "substack" | "youtube" | "instagram";
  title: string;
  excerpt: string;
  date: string;
  image: string | null;
  url: string;
};

// Headers de navegador: los runners de CI (GitHub Actions) reciben respuestas vacías
// de YouTube/Substack cuando el fetch no manda un User-Agent realista.
const FETCH_OPTS = {
  headers: {
    "User-Agent":
      "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120 Safari/537.36",
    Accept: "application/json, text/xml, application/rss+xml, */*",
  },
} as const;

// Fallbacks con contenido REAL capturado de los feeds. Se usan si una descarga falla
// o regresa vacía en el build, para que la sección nunca quede en blanco.
const FALLBACK_BLOG: ContentPost[] = [
  {
    platform: "blog",
    title: "Cómo Crear Variaciones con Diferentes Hooks sin Perder el Anuncio Original",
    excerpt:
      "Cambiar el hook es la forma más efectiva de revivir un anuncio. Aprende a crear 4 variaciones de hook sin modi...",
    date: "2026-05-25",
    image: "https://blog.luisgaxiola.com/wp-content/uploads/2026/05/variaciones-hooks.jpg",
    url: "https://blog.luisgaxiola.com/como-crear-variaciones-con-diferentes-hooks-sin-perder-el-anuncio-original/",
  },
  {
    platform: "blog",
    title: "Por Qué Simplificar tu Cuenta de Anuncios Mejora los Resultados",
    excerpt:
      "Tener 40 anuncios activos no es escalar, es fragmentar el presupuesto. Cómo simplificar tu cuenta y por qué es...",
    date: "2026-05-25",
    image:
      "https://blog.luisgaxiola.com/wp-content/uploads/2026/05/simplificar-cuenta-anuncios.jpg",
    url: "https://blog.luisgaxiola.com/por-que-simplificar-tu-cuenta-de-anuncios-mejora-los-resultados/",
  },
  {
    platform: "blog",
    title: "Meta Ads: Guía de Optimización Operativa [11 Posts]",
    excerpt:
      "La mayoría de los problemas en Meta Ads no son de creatividad ni de presupuesto. Son de estructura y de criter...",
    date: "2026-05-25",
    image: null,
    url: "https://blog.luisgaxiola.com/meta-ads-guia-de-optimizacion-operativa-11-posts/",
  },
];

const FALLBACK_SUBSTACK: ContentPost[] = [
  {
    platform: "substack",
    title: "Calcule cuánto dinero podía ganar de Freelance y la respuesta desilusiona",
    excerpt: "La empresa de 1 persona",
    date: "2026-03-24",
    image:
      "https://substackcdn.com/image/fetch/$s_!bQAr!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F0fb26e6b-24f0-4fd2-91bd-e4fe57a6efea_899x1599.jpeg",
    url: "https://laempresade1persona.substack.com/p/calcule-cuanto-dinero-podia-ganar",
  },
  {
    platform: "substack",
    title: "Ser freelance me prometió libertad y solo me entregó ansiedad",
    excerpt: "La empresa de 1 persona — Capitulo #1",
    date: "2026-03-23",
    image:
      "https://substackcdn.com/image/fetch/$s_!OUMG!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F289b09af-8fd2-41c3-92e8-e40ea3682b95_899x1599.jpeg",
    url: "https://laempresade1persona.substack.com/p/ser-freelance-me-prometio-libertad",
  },
];

const FALLBACK_YT: ContentPost[] = [
  {
    platform: "youtube",
    title: "El ERROR número 1 al crear tus campañas de marketing 💸",
    excerpt:
      "¿No sabes qué objetivo elegir para tus campañas de anuncios? 🤔 La regla de oro es simple: alinea tu publicidad...",
    date: "2026-06-07",
    image: "https://i.ytimg.com/vi/A9e-Rk1OCtM/mqdefault.jpg",
    url: "https://www.youtube.com/watch?v=A9e-Rk1OCtM",
  },
  {
    platform: "youtube",
    title: "Meta Premia la variedad de formatos",
    excerpt: "",
    date: "2026-06-02",
    image: "https://i.ytimg.com/vi/VnaCMmDHxfk/mqdefault.jpg",
    url: "https://www.youtube.com/watch?v=VnaCMmDHxfk",
  },
  {
    platform: "youtube",
    title: "NO TIRES TU DINERO. Como comprar seguidores reales de forma correcta",
    excerpt:
      "¿Buscando cómo comprar seguidores reales en Instagram sin usar bots ni aplicaciones falsas? En este tutorial t...",
    date: "2026-06-01",
    image: "https://i.ytimg.com/vi/2uPqFhk4JgI/mqdefault.jpg",
    url: "https://www.youtube.com/watch?v=2uPqFhk4JgI",
  },
];

function stripHtml(html: string): string {
  return html
    .replace(/<[^>]*>/g, "")
    .replace(/&amp;/g, "&")
    .replace(/&nbsp;/g, " ")
    .replace(/&#8230;/g, "...")
    .replace(/&#8217;/g, "'")
    .replace(/&#8216;/g, "'")
    .replace(/\s+/g, " ")
    .trim();
}

function parseCdata(str: string): string {
  return str.replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, "$1").trim();
}

function parseRssItems(xml: string, limit: number) {
  const items = [...xml.matchAll(/<item>([\s\S]*?)<\/item>/g)];
  return items.slice(0, limit).map(([, content]) => {
    const title = parseCdata(content.match(/<title>([\s\S]*?)<\/title>/)?.[1] || "");
    const link = (
      content.match(/<link>(https?:\/\/[^<]+)<\/link>/)?.[1] ||
      content.match(/<guid[^>]*>(https?:\/\/[^<]+)<\/guid>/)?.[1] ||
      ""
    ).trim();
    const pubDate = content.match(/<pubDate>([\s\S]*?)<\/pubDate>/)?.[1]?.trim() || "";
    const description = parseCdata(
      content.match(/<description>([\s\S]*?)<\/description>/)?.[1] || ""
    );
    const enclosureUrl = content.match(/<enclosure[^>]*url="([^"]*)"[^>]*/)?.[1] || null;
    const mediaThumbnail =
      content.match(/<media:thumbnail[^>]*url="([^"]*)"[^>]*/)?.[1] || null;
    const image = enclosureUrl || mediaThumbnail || null;
    return { title, link, pubDate, description, image };
  });
}

export async function getWordPressPosts(): Promise<ContentPost[]> {
  try {
    const res = await fetch(
      "https://blog.luisgaxiola.com/wp-json/wp/v2/posts?_embed&per_page=3&status=publish",
      FETCH_OPTS
    );
    if (!res.ok) return FALLBACK_BLOG;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const posts: any[] = await res.json();
    if (!posts.length) return FALLBACK_BLOG;
    return posts.map((post) => {
      const rawExcerpt = stripHtml(post.excerpt?.rendered || "");
      return {
        platform: "blog" as const,
        title: stripHtml(post.title?.rendered || ""),
        excerpt: rawExcerpt.length > 110 ? rawExcerpt.slice(0, 110) + "..." : rawExcerpt,
        date: post.date?.slice(0, 10) || "",
        image: post._embedded?.["wp:featuredmedia"]?.[0]?.source_url || null,
        url: post.link || "",
      };
    });
  } catch {
    return FALLBACK_BLOG;
  }
}

export async function getSubstackPosts(): Promise<ContentPost[]> {
  try {
    const res = await fetch("https://laempresade1persona.substack.com/feed", FETCH_OPTS);
    if (!res.ok) return FALLBACK_SUBSTACK;
    const xml = await res.text();
    const items = parseRssItems(xml, 3);
    if (!items.length) return FALLBACK_SUBSTACK;
    return items.map((item) => {
      const rawDesc = stripHtml(item.description);
      return {
        platform: "substack" as const,
        title: item.title,
        excerpt: rawDesc.length > 110 ? rawDesc.slice(0, 110) + "..." : rawDesc,
        date: item.pubDate ? new Date(item.pubDate).toISOString().slice(0, 10) : "",
        image: item.image,
        url: item.link,
      };
    });
  } catch {
    return FALLBACK_SUBSTACK;
  }
}

const YT_CHANNEL_ID = "UCAHAbnHvqLHp0qeQXXgIFUA";

export async function getYouTubePosts(): Promise<ContentPost[]> {
  try {
    const res = await fetch(
      `https://www.youtube.com/feeds/videos.xml?channel_id=${YT_CHANNEL_ID}`,
      FETCH_OPTS
    );
    if (!res.ok) return FALLBACK_YT;
    const xml = await res.text();
    const entries = [...xml.matchAll(/<entry>([\s\S]*?)<\/entry>/g)];
    if (!entries.length) return FALLBACK_YT;
    return entries.slice(0, 3).map(([, content]) => {
      const title = parseCdata(
        content.match(/<title>([\s\S]*?)<\/title>/)?.[1] || ""
      );
      const videoId =
        content.match(/<yt:videoId>([\s\S]*?)<\/yt:videoId>/)?.[1]?.trim() || "";
      const published =
        content.match(/<published>([\s\S]*?)<\/published>/)?.[1]?.trim() || "";
      const summary = parseCdata(
        content.match(/<media:description>([\s\S]*?)<\/media:description>/)?.[1] || ""
      );
      const rawSummary = stripHtml(summary);
      return {
        platform: "youtube" as const,
        title,
        excerpt: rawSummary.length > 110 ? rawSummary.slice(0, 110) + "..." : rawSummary,
        date: published ? published.slice(0, 10) : "",
        image: videoId ? `https://i.ytimg.com/vi/${videoId}/mqdefault.jpg` : null,
        url: videoId ? `https://www.youtube.com/watch?v=${videoId}` : "https://www.youtube.com/@luis.gaxiola1",
      };
    });
  } catch {
    return FALLBACK_YT;
  }
}

// Instagram no tiene RSS público: se usa la API oficial de Meta (Graph API).
// Requiere dos secretos en el entorno del build (GitHub Actions):
//   IG_USER_ID       → ID numérico de la cuenta de Instagram Business
//   IG_ACCESS_TOKEN  → token de acceso (idealmente de System User, no expira)
// Si los secretos no están configurados, regresa [] y el sitio sigue funcionando
// (solo se muestra la tarjeta de "seguir perfil").
export async function getInstagramPosts(): Promise<ContentPost[]> {
  const userId = process.env.IG_USER_ID;
  const token = process.env.IG_ACCESS_TOKEN;
  if (!userId || !token) return [];
  try {
    const fields = "caption,media_type,media_url,permalink,thumbnail_url,timestamp";
    const res = await fetch(
      `https://graph.facebook.com/v21.0/${userId}/media?fields=${fields}&limit=3&access_token=${token}`,
      FETCH_OPTS
    );
    if (!res.ok) return [];
    const data = await res.json();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const items: any[] = data?.data || [];
    return items.slice(0, 3).map((m) => {
      const caption = stripHtml(m.caption || "");
      return {
        platform: "instagram" as const,
        title: caption
          ? caption.length > 80
            ? caption.slice(0, 80) + "..."
            : caption
          : "Nuevo post en Instagram",
        excerpt: caption.length > 110 ? caption.slice(0, 110) + "..." : "",
        date: m.timestamp ? m.timestamp.slice(0, 10) : "",
        image:
          m.media_type === "VIDEO" ? m.thumbnail_url || null : m.media_url || null,
        url: m.permalink || "https://www.instagram.com/luisgaxiolavibemarketing/",
      };
    });
  } catch {
    return [];
  }
}
