import OpenAI from "openai";
import { writeFileSync, mkdirSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUTPUT_DIR = join(__dirname, "../public/images/restaurante");
mkdirSync(OUTPUT_DIR, { recursive: true });

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const IMAGES = [
  {
    file: "hero.jpg",
    size: "1536x1024",
    prompt:
      "Upscale contemporary Mexican restaurant interior at night. Dark moody atmosphere, warm candlelight and Edison bulbs, exposed brick walls with terracotta accents, dark wood tables set with elegant plates and glassware, soft spotlights on the bar area, lush hanging plants. Cinematic photography, ultra realistic, no people.",
  },
  {
    file: "food-1.jpg",
    size: "1024x1024",
    prompt:
      "Gourmet Mexican taco al pastor plated elegantly on a dark slate plate, vertical spit-roasted pork with charred pineapple, fresh cilantro, micro greens, chili salsa dots, fine dining presentation, professional food photography, dark moody background, dramatic side lighting.",
  },
  {
    file: "food-2.jpg",
    size: "1024x1024",
    prompt:
      "Luxurious Mexican mole negro served over duck breast, dark glossy sauce, gold leaf garnish, pumpkin seeds, micro herbs, elegant dark ceramic plate, fine dining plating, professional food photography, dark dramatic background.",
  },
  {
    file: "food-3.jpg",
    size: "1024x1024",
    prompt:
      "Upscale Mexican ceviche in a martini glass, fresh shrimp and fish, cucumber, tomato, avocado crema swirl, crispy tostada chip, lime wedge, micro herbs, fine dining presentation, professional food photography, clean dark background.",
  },
  {
    file: "food-4.jpg",
    size: "1024x1024",
    prompt:
      "Elegant artisan cocktail with mezcal, smoked rim, fresh herbs, edible flowers, served in a crystal coupe glass on a dark marble bar counter. Professional cocktail photography, dark moody atmosphere, bokeh background with warm lights.",
  },
  {
    file: "gallery-1.jpg",
    size: "1024x1024",
    prompt:
      "Intimate restaurant table setting for two, warm candlelight, elegant tableware with linen napkins, crystal wine glasses, fresh flowers centerpiece, dark wood table, cozy romantic atmosphere, fine dining restaurant interior, professional photography.",
  },
  {
    file: "gallery-2.jpg",
    size: "1024x1024",
    prompt:
      "Upscale restaurant bar area, dark polished wood bar top, artisanal bottles display with warm backlighting, terracotta and copper accents, lush tropical plants, ambient warm light. Interior design photography, no people.",
  },
  {
    file: "gallery-3.jpg",
    size: "1024x1024",
    prompt:
      "Private dining room in an upscale Mexican restaurant, long dark wood table with elegant chairs, dramatic pendant lights, stone wall with ambient sconces, a large mirror reflecting candlelight. Professional interior photography.",
  },
  {
    file: "chef.jpg",
    size: "1024x1024",
    prompt:
      "Professional Latino male chef in a modern restaurant kitchen, wearing a white chef coat, plating a gourmet dish with precision and focus, warm kitchen lights, blurred stainless steel kitchen in background. Professional portrait photography.",
  },
];

async function main() {
  console.log(`\n🎨 Generando ${IMAGES.length} imágenes para restaurante con gpt-image-1...\n`);

  for (const img of IMAGES) {
    process.stdout.write(`  ⏳ ${img.file}...`);
    try {
      const response = await client.images.generate({
        model: "gpt-image-1",
        prompt: img.prompt,
        size: img.size,
        quality: "high",
        n: 1,
      });

      const b64 = response.data[0].b64_json;
      const filePath = join(OUTPUT_DIR, img.file);
      writeFileSync(filePath, Buffer.from(b64, "base64"));
      console.log(` ✅`);
    } catch (err) {
      console.log(` ❌ Error: ${err.message}`);
    }

    await new Promise((r) => setTimeout(r, 1000));
  }

  console.log("\n✨ Imágenes guardadas en public/images/restaurante/\n");
}

main();
