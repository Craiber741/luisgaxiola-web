import { GoogleGenAI } from "@google/genai";
import { writeFileSync, mkdirSync, existsSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
const __dirname = dirname(fileURLToPath(import.meta.url));
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

const SETS = [
  {
    dir: "electricista",
    images: [
      { file: "hero.jpg", prompt: "Professional electrician in navy blue uniform with safety helmet installing electrical panel in a modern building, dramatic yellow work lighting, professional photography, no face visible." },
      { file: "service-1.jpg", prompt: "Close-up of organized modern electrical panel with circuit breakers, clean professional installation, industrial photography." },
      { file: "service-2.jpg", prompt: "Electrician hands connecting wires with precision tools, electrical installation work, warm workshop lighting, professional macro photography." },
      { file: "service-3.jpg", prompt: "Modern LED lighting installation in a commercial space, bright clean ceiling lights, professional interior photography." },
      { file: "team.jpg", prompt: "Team of three professional electricians in matching navy blue uniforms with safety equipment, standing in front of electrical equipment, professional photography." },
      { file: "emergency.jpg", prompt: "Dramatic close-up of electrical sparks from a damaged wire outlet on a wall, emergency concept, dark moody lighting." },
    ],
  },
  {
    dir: "mecanico",
    images: [
      { file: "hero.jpg", prompt: "Professional auto mechanic workshop interior, clean organized garage with car lift, orange and black color scheme, professional tools on wall, wide angle photography, no people." },
      { file: "service-1.jpg", prompt: "Close-up of mechanic hands changing a car engine oil with a wrench, dark automotive workshop, professional action photography." },
      { file: "service-2.jpg", prompt: "Professional tire change service, mechanic removing car wheel with pneumatic wrench, automotive workshop, professional photography." },
      { file: "service-3.jpg", prompt: "Mechanic using diagnostic laptop connected to a modern car engine bay, technical automotive service, professional photography." },
      { file: "team.jpg", prompt: "Two professional auto mechanics in matching orange coveralls, standing in a clean modern garage workshop, confident poses, professional photography." },
      { file: "hero2.jpg", prompt: "Shiny sports car on a hydraulic lift in a modern clean auto repair shop, dramatic lighting, wide angle automotive photography." },
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
