import { GoogleGenAI } from "@google/genai";
import { writeFileSync, mkdirSync, existsSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
const __dirname = dirname(fileURLToPath(import.meta.url));
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

const SETS = [
  {
    dir: "salon2",
    images: [
      { file: "hero.jpg", prompt: "Minimalist Japanese zen beauty spa interior, white walls, natural light wood accents, bamboo plants, stone basin, soft diffused natural lighting, serene and calming atmosphere, professional interior photography, no people." },
      { file: "gallery-1.jpg", prompt: "Close-up of hairstylist cutting woman's hair with precision scissors, blurred minimal white salon background, focus on hands and scissors, editorial beauty photography." },
      { file: "gallery-2.jpg", prompt: "Elegant hair color result: woman with sleek jet-black glossy straight hair, minimal white studio background, professional beauty photography." },
      { file: "gallery-3.jpg", prompt: "Minimalist nail art result: nude beige manicure with thin gold line detail on feminine hands, white background, macro beauty photography." },
      { file: "gallery-4.jpg", prompt: "Serene facial treatment in a zen spa, woman lying with white sheet, green face mask, cucumber slices, soft lighting, editorial spa photography." },
      { file: "about.jpg", prompt: "Team of two Japanese-inspired beauty professionals in white minimal uniforms, standing in a clean white modern salon, professional photography." },
    ],
  },
  {
    dir: "salon3",
    images: [
      { file: "hero.jpg", prompt: "Vibrant trendy Gen-Z beauty salon interior, hot pink neon sign, black walls, holographic mirrors, colorful styling chairs, bold and energetic atmosphere, professional wide shot photography." },
      { file: "gallery-1.jpg", prompt: "Bold hair color result: young woman with vivid electric blue and purple split-dye hair, black background, dramatic studio lighting, beauty editorial photography." },
      { file: "gallery-2.jpg", prompt: "Trendy Gen-Z nail art: vibrant multicolor geometric nail art design on short nails, bright colorful background, macro photography." },
      { file: "gallery-3.jpg", prompt: "Young woman with a fresh textured wolf cut hairstyle, platinum blonde with pink streaks, bold beauty photography, black background." },
      { file: "gallery-4.jpg", prompt: "Bold eyelash extension result: dramatic long voluminous eyelash extensions close-up, colorful glitter eyeshadow, beauty macro photography." },
      { file: "about.jpg", prompt: "Three young diverse stylists in a trendy colorful salon, wearing black outfits, smiling confidently, vibrant and fun atmosphere, professional photography." },
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
