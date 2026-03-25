/**
 * Genera TODAS las imágenes faltantes de todos los demos.
 * Usa 7 segundos entre imágenes para respetar el rate limit de Imagen 4 (10 req/min).
 */
import { GoogleGenAI } from "@google/genai";
import { writeFileSync, mkdirSync, existsSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const BASE = join(__dirname, "../public/images");
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

const SETS = [
  {
    dir: "salon3",
    images: [
      { file: "hero.jpg",      prompt: "Vibrant trendy Gen-Z beauty salon interior, hot pink neon sign, black walls, holographic mirrors, colorful styling chairs, bold and energetic atmosphere, professional wide shot photography." },
      { file: "gallery-1.jpg", prompt: "Bold hair color result: young woman with vivid electric blue and purple split-dye hair, black background, dramatic studio lighting, beauty editorial photography." },
      { file: "gallery-2.jpg", prompt: "Trendy Gen-Z nail art: vibrant multicolor geometric nail art design on short nails, bright colorful background, macro photography." },
      { file: "gallery-3.jpg", prompt: "Young woman with a fresh textured wolf cut hairstyle, platinum blonde with pink streaks, bold beauty photography, black background." },
      { file: "about.jpg",     prompt: "Three young diverse stylists in a trendy colorful salon, wearing black outfits, smiling confidently, vibrant and fun atmosphere, professional photography." },
    ],
  },
  {
    dir: "restaurante2",
    images: [
      { file: "food-3.jpg",    prompt: "Traditional Mexican agua fresca drinks in colorful pitchers, hibiscus and tamarind, rustic wooden table, bright natural lighting, food photography." },
      { file: "gallery-1.jpg", prompt: "Lively Mexican taqueria dining area, warm lights, colorful painted walls with murals, happy atmosphere, editorial restaurant photography, no people." },
      { file: "chef.jpg",      prompt: "Mexican taquero in traditional apron with tongs near a meat trompo spit, warm kitchen lighting, no face visible." },
    ],
  },
  {
    dir: "restaurante3",
    images: [
      { file: "hero.jpg",      prompt: "Elegant Italian trattoria interior, rustic wooden beams, warm candlelight, exposed brick walls, wine bottles on shelves, checkered tablecloths, romantic atmosphere, professional photography, no people." },
      { file: "food-1.jpg",    prompt: "Handmade pasta carbonara served in a rustic ceramic bowl, creamy sauce, crispy guanciale, black pepper, parmesan shavings, Italian fine dining photography." },
      { file: "food-2.jpg",    prompt: "Authentic Neapolitan pizza margherita fresh from wood-fired oven, charred crust, buffalo mozzarella, fresh basil, on a wooden peel, Italian food photography." },
      { file: "food-3.jpg",    prompt: "Elegant Italian tiramisu in a glass, layers of mascarpone and espresso-soaked ladyfingers, cocoa dusting, fine dining presentation, dark background." },
      { file: "gallery-1.jpg", prompt: "Intimate Italian trattoria table setting for two, candles, wine glasses, rustic plates, fresh flowers in small vase, warm romantic lighting." },
      { file: "chef.jpg",      prompt: "Italian chef in white uniform tossing fresh pasta dough, rustic kitchen background, flour in the air, action photography, no face visible." },
    ],
  },
  {
    dir: "electricista",
    images: [
      { file: "service-3.jpg", prompt: "Modern LED lighting installation in a commercial space, bright clean ceiling lights, professional interior photography." },
      { file: "team.jpg",      prompt: "Team of three professional electricians in matching navy blue uniforms with safety equipment, standing in front of electrical equipment, professional photography." },
      { file: "emergency.jpg", prompt: "Dramatic close-up of electrical sparks from a damaged wire outlet on a wall, emergency concept, dark moody lighting." },
    ],
  },
  {
    dir: "mecanico",
    images: [
      { file: "hero.jpg",      prompt: "Professional auto mechanic workshop interior, clean organized garage with car lift, orange and black color scheme, professional tools on wall, wide angle photography, no people." },
      { file: "service-1.jpg", prompt: "Close-up of mechanic hands changing car engine oil with a wrench, dark automotive workshop, professional action photography." },
      { file: "service-2.jpg", prompt: "Professional tire change service, mechanic removing car wheel with pneumatic wrench, automotive workshop, professional photography." },
      { file: "service-3.jpg", prompt: "Mechanic using diagnostic laptop connected to a modern car engine bay, technical automotive service, professional photography." },
      { file: "team.jpg",      prompt: "Two professional auto mechanics in matching orange coveralls, standing in a clean modern garage workshop, confident poses, professional photography." },
      { file: "hero2.jpg",     prompt: "Shiny sports car on a hydraulic lift in a modern clean auto repair shop, dramatic lighting, wide angle automotive photography." },
    ],
  },
];

async function main() {
  const pending = [];
  for (const set of SETS) {
    const dir = join(BASE, set.dir);
    mkdirSync(dir, { recursive: true });
    for (const img of set.images) {
      if (!existsSync(join(dir, img.file))) {
        pending.push({ dir, ...img });
      }
    }
  }

  if (pending.length === 0) {
    console.log("\n✅ Todas las imágenes ya existen.\n");
    return;
  }

  console.log(`\n🎨 Generando ${pending.length} imágenes faltantes (7s entre cada una)...\n`);

  let ok = 0, fail = 0;
  for (const img of pending) {
    const name = `${img.dir.split("/").pop()}/${img.file}`;
    process.stdout.write(`  ⏳ ${name}...`);
    try {
      const r = await ai.models.generateImages({
        model: "imagen-4.0-fast-generate-001",
        prompt: img.prompt,
        config: { numberOfImages: 1, outputMimeType: "image/jpeg" },
      });
      writeFileSync(join(img.dir, img.file), Buffer.from(r.generatedImages[0].image.imageBytes, "base64"));
      console.log(` ✅`);
      ok++;
    } catch (e) {
      const msg = e.message.includes("RESOURCE_EXHAUSTED") ? "rate limit" : e.message.slice(0, 60);
      console.log(` ❌ ${msg}`);
      fail++;
    }
    await new Promise(r => setTimeout(r, 7000)); // 7s = ~8 req/min, bajo el límite de 10
  }

  console.log(`\n✨ Listo: ${ok} generadas, ${fail} fallidas.\n`);
}

main();
