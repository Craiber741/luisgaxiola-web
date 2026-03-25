import { GoogleGenAI } from "@google/genai";
import { writeFileSync, mkdirSync, existsSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUTPUT_DIR = join(__dirname, "../public/images/restaurante");
mkdirSync(OUTPUT_DIR, { recursive: true });

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

// Solo las imágenes faltantes del restaurante
const IMAGES = [
  {
    file: "gallery-3.jpg",
    prompt:
      "Private dining room in an upscale Mexican restaurant, long dark wood table with elegant chairs, dramatic pendant lights, stone wall with ambient sconces, a large mirror reflecting candlelight. Professional interior photography, no people.",
  },
  {
    file: "chef.jpg",
    prompt:
      "Professional Latino male chef in a modern restaurant kitchen, wearing a white chef coat, plating a gourmet dish with precision and focus, warm kitchen lights, blurred stainless steel kitchen in background. Professional portrait photography.",
  },
];

async function main() {
  const pending = IMAGES.filter((img) => !existsSync(join(OUTPUT_DIR, img.file)));

  if (pending.length === 0) {
    console.log("\n✅ Todas las imágenes ya existen.\n");
    return;
  }

  console.log(`\n🎨 Generando ${pending.length} imágenes con Imagen (Google)...\n`);

  for (const img of pending) {
    process.stdout.write(`  ⏳ ${img.file}...`);
    try {
      const response = await ai.models.generateImages({
        model: "imagen-4.0-fast-generate-001",
        prompt: img.prompt,
        config: { numberOfImages: 1, outputMimeType: "image/jpeg" },
      });

      const b64 = response.generatedImages[0].image.imageBytes;
      const filePath = join(OUTPUT_DIR, img.file);
      writeFileSync(filePath, Buffer.from(b64, "base64"));
      console.log(` ✅`);
    } catch (err) {
      console.log(` ❌ Error: ${err.message}`);
    }

    await new Promise((r) => setTimeout(r, 500));
  }

  console.log("\n✨ Listo!\n");
}

main();
