export type ContentPost = {
  platform: "blog" | "substack" | "youtube";
  title: string;
  excerpt: string;
  date: string;
  image: string | null;
  url: string;
};

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
      "https://blog.luisgaxiola.com/wp-json/wp/v2/posts?_embed&per_page=3&status=publish"
    );
    if (!res.ok) return [];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const posts: any[] = await res.json();
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
    return [];
  }
}

export async function getSubstackPosts(): Promise<ContentPost[]> {
  try {
    const res = await fetch("https://elmediabuyer.substack.com/feed");
    if (!res.ok) return [];
    const xml = await res.text();
    const items = parseRssItems(xml, 3);
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
    return [];
  }
}

const YT_CHANNEL_ID = "UCAHAbnHvqLHp0qeQXXgIFUA";

export async function getYouTubePosts(): Promise<ContentPost[]> {
  try {
    const res = await fetch(
      `https://www.youtube.com/feeds/videos.xml?channel_id=${YT_CHANNEL_ID}`
    );
    if (!res.ok) return [];
    const xml = await res.text();
    const entries = [...xml.matchAll(/<entry>([\s\S]*?)<\/entry>/g)];
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
    return [];
  }
}
