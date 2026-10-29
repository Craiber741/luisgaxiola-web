import Link from "next/link";
import { btnPrimary } from "./components/site";

export default function NotFound() {
  return (
    <main className="max-w-6xl mx-auto px-4 md:px-8 py-32 md:py-48">
      <p className="text-xs uppercase tracking-[0.3em] text-accent mb-6">404</p>
      <h1 className="font-semibold tracking-tight text-4xl md:text-6xl mb-12 max-w-2xl">Esta página no existe o ya no está aquí.</h1>
      <Link href="/" className={btnPrimary}>Ir al inicio</Link>
    </main>
  );
}
