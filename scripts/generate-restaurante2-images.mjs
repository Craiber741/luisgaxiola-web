import { GoogleGenAI } from "@google/genai";
import { writeFileSync, mkdirSync, existsSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
const __dirname = dirname(fileURLToPath(import.meta.url));
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

const SETS = [
  {
    dir: "restaurante2",
    images: [
      { file: "hero.jpg", prompt: "Vibrant casual Mexican taqueria restaurant interior, colorful tiles, warm Edison bulbs, wooden tables and benches, chalkboard menu, lively street food atmosphere, wide angle photography, no people." },
      { file: "food-1.jpg", prompt: "Perfect street-style tacos al pastor on a wooden board, colorful toppings, fresh cilantro, chopped onion, lime wedge, salsa roja, warm lighting, food photography." },
      { file: "food-2.jpg", prompt: "Crispy golden quesadilla cut in half showing melted cheese and grilled chicken, served on colorful Mexican ceramic plate, food photography." },
      { file: "food-3.jpg", prompt: "Traditional Mexican agua fresca drinks in colorful pitchers, hibiscus and tamarind, rustic wooden table, bright natural lighting, food photography." },
      { file: "gallery-1.jpg", prompt: "Lively Mexican taqueria dining area, warm lights, colorful painted walls with murals, happy atmosphere, editorial restaurant photography, no people." },
      { file: "chef.jpg", prompt: "Mexican taquero chef in traditional apron slicing meat from a trompo spit, warm kitchen lighting, action shot, no face." },
    ],
  },
  {
    dir: "restaurante3",
    images: [
      { file: "hero.jpg", prompt: "Elegant Italian trattoria interior, rustic wooden beams, warm candlelight, exposed brick walls, wine bottles on shelves, checkered tablecloths, romantic atmosphere, professional photography, no people." },
      { file: "food-1.jpg", prompt: "Handmade pasta carbonara served in a rustic ceramic bowl, creamy sauce, crispy guanciale, black pepper, parmesan shavings, Italian fine dining photography." },
      { file: "food-2.jpg", prompt: "Authentic Neapolitan pizza margherita fresh from wood-fired oven, charred crust, buffalo mozzarella, fresh basil, on a wooden peel, Italian food photography." },
      { file: "food-3.jpg", prompt: "Elegant Italian tiramisu in a glass, layers of mascarpone and espresso-soaked ladyfingers, cocoa dusting, fine dining presentation, dark background." },
      { file: "gallery-1.jpg", prompt: "Intimate Italian trattoria table setting for two, candles, wine glasses, rustic plates, fresh flowers in small vase, warm romantic lighting." },
      { file: "chef.jpg", prompt: "Italian chef in white uniform and apron tossing fresh pasta dough, rustic kitchen background, flour in the air, action photography, no face visible." },
    ],
  },
];

async function main() {
  for (const set of SETS) {
    const dir = join(__dirname, `../public/images/${set.dir}`);
    mkdirSync(dir, { recursive: true });
    const pending = set.images.filter((img) => !existsSync(join(dir, img.file)));
    if (pending.length === 0) { console.log(`✅ ${set.dir}: todas las imágenes ya existen.`); continue; }
    console.log(`\n🎨 Generando ${pending.length} imágenes para ${set.dir}...\n`);
    for (const img of pending) {
      process.stdout.write(`  ⏳ ${set.dir}/${img.file}...`);
      try {
        const r = await ai.models.generateImages({ model: "imagen-4.0-fast-generate-001", prompt: img.prompt, config: { numberOfImages: 1, outputMimeType: "image/jpeg" } });
        writeFileSync(join(dir, img.file), Buffer.from(r.generatedImages[0].image.imageBytes, "base64"));
        console.log(` ✅`);
      } catch (e) { console.log(` ❌ ${e.message}`); }
      await new Promise(r => setTimeout(r, 400));
    }
  }
  console.log("\n✨ Listo!\n");
}
main();
