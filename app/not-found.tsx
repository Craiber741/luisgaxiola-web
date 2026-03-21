import Link from "next/link";

export default function NotFound() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white p-4 text-center">
            <h2 className="text-6xl font-bold mb-4 text-[var(--accent)]">404</h2>
            <p className="text-xl mb-8">Esta página no existe. Al igual que los resultados sin esfuerzo.</p>
            <Link href="/" className="px-8 py-3 bg-white text-black font-bold uppercase hover:opacity-90 transition-opacity">
                Volver al camino
            </Link>
        </div>
    );
}
