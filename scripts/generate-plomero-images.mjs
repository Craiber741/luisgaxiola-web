import { GoogleGenAI } from "@google/genai";
import { writeFileSync, mkdirSync, existsSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUTPUT_DIR = join(__dirname, "../public/images/plomero");
mkdirSync(OUTPUT_DIR, { recursive: true });

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

const IMAGES = [
  {
    file: "hero.jpg",
    prompt: "Professional plumber in a modern clean bathroom, wearing a navy blue uniform with company logo, fixing under a sink with precision tools laid out neatly. Bright natural lighting, clean white tiles, professional and trustworthy appearance. Editorial photography, wide angle, no face visible.",
  },
  {
    file: "service-1.jpg",
    prompt: "Close-up of professional plumbing pipe installation, shiny copper pipes with clean fittings, modern bathroom setting, professional quality workmanship. Macro photography, warm lighting.",
  },
  {
    file: "service-2.jpg",
    prompt: "Luxury bathroom with elegant fixtures, chrome faucets, white marble tiles, modern toilet and vanity. Interior design photography, clean and aspirational.",
  },
  {
    file: "service-3.jpg",
    prompt: "Professional drain cleaning service, high-pressure water jetting equipment, industrial hose, plumber working on exterior drainage. Professional photography, clean background.",
  },
  {
    file: "service-4.jpg",
    prompt: "Modern water heater installation, tankless gas water heater mounted on white wall, clean copper pipe connections, professional installation. Technical photography.",
  },
  {
    file: "team.jpg",
    prompt: "Team of three professional male plumbers in matching navy blue uniforms with tool belts, standing confidently in front of a service van. Professional business photography, outdoor bright light.",
  },
  {
    file: "emergency.jpg",
    prompt: "Emergency plumbing concept: dramatic close-up of water leak from burst pipe, water splashing on bathroom floor tiles, urgent atmosphere, dramatic lighting.",
  },
];

async function main() {
  const pending = IMAGES.filter((img) => !existsSync(join(OUTPUT_DIR, img.file)));
  if (pending.length === 0) { console.log("\n✅ Todas las imágenes ya existen.\n"); return; }
  console.log(`\n🎨 Generando ${pending.length} imágenes para plomero con Imagen 4...\n`);

  for (const img of pending) {
    process.stdout.write(`  ⏳ ${img.file}...`);
    try {
      const response = await ai.models.generateImages({
        model: "imagen-4.0-fast-generate-001",
        prompt: img.prompt,
        config: { numberOfImages: 1, outputMimeType: "image/jpeg" },
      });
      const b64 = response.generatedImages[0].image.imageBytes;
      writeFileSync(join(OUTPUT_DIR, img.file), Buffer.from(b64, "base64"));
      console.log(` ✅`);
    } catch (err) {
      console.log(` ❌ Error: ${err.message}`);
    }
    await new Promise((r) => setTimeout(r, 500));
  }
  console.log("\n✨ Imágenes guardadas en public/images/plomero/\n");
}

main();
