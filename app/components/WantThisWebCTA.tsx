import Link from "next/link";
import { Sparkles } from "lucide-react";

export default function WantThisWebCTA() {
  return (
    <Link
      href="/webs"
      className="fixed bottom-28 right-4 z-40 flex items-center gap-2 bg-[var(--accent)] text-white text-sm font-bold px-4 py-2.5 rounded-full shadow-lg hover:brightness-110 transition-all hover:scale-105"
      aria-label="Quiero esta web"
    >
      <Sparkles className="w-4 h-4" />
      ¿Quieres esta web?
    </Link>
  );
}
