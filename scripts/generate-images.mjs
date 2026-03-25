import OpenAI from "openai";
import { writeFileSync, mkdirSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUTPUT_DIR = join(__dirname, "../public/images/salon");
mkdirSync(OUTPUT_DIR, { recursive: true });

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const IMAGES = [
  {
    file: "hero.jpg",
    size: "1792x1024",
    prompt:
      "Luxury beauty salon interior at night. Dark moody atmosphere with warm golden lighting. Elegant black marble counters, gold fixtures, large mirrors with soft backlighting, velvet chairs. Professional high-end salon. Cinematic photography, ultra realistic, no people.",
  },
  {
    file: "gallery-1.jpg",
    size: "1024x1024",
    prompt:
      "Professional hair salon result: beautiful woman with perfect balayage hair color, warm caramel and honey tones, glossy and healthy hair, studio lighting, clean white background, beauty photography.",
  },
  {
    file: "gallery-2.jpg",
    size: "1024x1024",
    prompt:
      "Professional hair salon result: young latina woman with a fresh stylish haircut, sleek blowout, rich dark brown hair with subtle highlights, professional beauty photography, studio lighting.",
  },
  {
    file: "gallery-3.jpg",
    size: "1024x1024",
    prompt:
      "Perfect nail art close-up: elegant nude and gold manicure on feminine hands, glossy finish, professional nail salon result, macro photography, clean aesthetic.",
  },
  {
    file: "gallery-4.jpg",
    size: "1024x1024",
    prompt:
      "Professional hair salon result: woman with gorgeous voluminous curls, rich auburn red hair color, salon quality blowout, beauty photography, warm studio lighting.",
  },
  {
    file: "gallery-5.jpg",
    size: "1024x1024",
    prompt:
      "Beautiful eyelash extension result close-up: perfectly applied natural-looking eyelash extensions on a woman's closed eye, professional beauty salon result, macro photography, clean aesthetic.",
  },
  {
    file: "gallery-6.jpg",
    size: "1024x1024",
    prompt:
      "Professional hair color transformation: woman with stunning platinum blonde hair, expert bleaching and toning result, sleek and shiny, salon quality, beauty photography.",
  },
  {
    file: "about.jpg",
    size: "1024x1024",
    prompt:
      "Professional beauty salon team photo: three smiling latina female hairstylists in a modern luxury salon, wearing elegant black uniforms, warm welcoming atmosphere, professional photography.",
  },
];

async function downloadImage(url, filePath) {
  const res = await fetch(url);
  const buffer = await res.arrayBuffer();
  writeFileSync(filePath, Buffer.from(buffer));
}

async function main() {
  console.log(`\n🎨 Generando ${IMAGES.length} imágenes con DALL-E 3...\n`);

  for (const img of IMAGES) {
    process.stdout.write(`  ⏳ ${img.file}...`);
    try {
      const response = await client.images.generate({
        model: "dall-e-3",
        prompt: img.prompt,
        size: img.size,
        quality: "hd",
        n: 1,
      });

      const url = response.data[0].url;
      const filePath = join(OUTPUT_DIR, img.file);
      await downloadImage(url, filePath);
      console.log(` ✅`);
    } catch (err) {
      console.log(` ❌ Error: ${err.message}`);
    }

    // Pequeña pausa para no saturar la API
    await new Promise((r) => setTimeout(r, 1000));
  }

  console.log("\n✨ Imágenes guardadas en public/images/salon/\n");
}

main();
