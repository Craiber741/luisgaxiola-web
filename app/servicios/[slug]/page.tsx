import Link from "next/link";
import { ArrowLeft, Check, AlertTriangle } from "lucide-react";
import { notFound } from "next/navigation";
import ContactForm from "@/app/components/ContactForm";

// Data simulator (in a real app this could come from a CMS or config file)
const services = {
    "media-buying": {
        title: "Media Buying (Ads)",
        headline: "TU TRÁFICO ES BASURA.",
        problem: "Estás donando dinero a Zuckerberg. Tus anuncios son genéricos, tu targeting es perezoso y tu ROAS da vergüenza.",
        solution: "Gestión de campañas en Meta, TikTok y Google Ads con IA propietaria. Estructuras probadas para escalar de $1k a $50k/mes sin romper el CPA.",
        bullets: [
            "Optimización diaria con IA (no 'set and forget').",
            "Creativos basados en Psicología de Ventas.",
            "Reportes de rentabilidad real (no vanity metrics)."
        ],
        cta: "QUIERO ESCALAR MIS ADS"
    },
    "consultoria": {
        title: "Consultoría Estratégica",
        headline: "TIENES UN CUELLO DE BOTELLA.",
        problem: "Trabajas mucho, ganas poco. Tienes un buen producto pero tu marketing no lo refleja. Estás estancado y no sabes qué palanca mover.",
        solution: "Auditoría forense de tu negocio. Encuentro exactamente dónde estás perdiendo dinero y te doy un plan paso a paso para arreglarlo.",
        bullets: [
            "Diagnóstico de Fugas de Dinero.",
            "Estrategia de Oferta Irresistible.",
            "Plan de Acción de 90 Días."
        ],
        cta: "SOLICITAR AUDITORÍA"
    },
    "mentoria": {
        title: "Mentoria 1 a 1",
        headline: "COMPRA MI CEREBRO.",
        problem: "La soledad del fundador es cara. Tomar decisiones sin feedback experto te cuesta años de prueba y error.",
        solution: "Ahorra esos años. Acceso directo a mis estrategias, mis contactos y mi experiencia de +$45M generados. Sin filtros.",
        bullets: [
            "Llamadas semanales de Estrategia Pura.",
            "Acceso directo a mi WhatsApp Personal.",
            "Revisión de tus campañas en vivo."
        ],
        cta: "APLICAR A MENTORÍA"
    }
};

export function generateStaticParams() {
    return Object.keys(services).map((slug) => ({ slug }));
}

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const service = services[slug as keyof typeof services];

    if (!service) {
        notFound();
    }

    return (
        <main className="flex min-h-screen flex-col items-center justify-center p-4 md:p-24 bg-white">
            <div className="w-full max-w-4xl">
                <Link href="/" className="inline-flex items-center text-sm font-bold text-gray-500 hover:text-black mb-12 transition-colors">
                    <ArrowLeft className="w-4 h-4 mr-2" /> VOLVER
                </Link>

                <div className="mb-16">
                    <div className="flex items-center gap-2 text-[var(--accent)] font-bold mb-4 uppercase tracking-widest text-sm">
                        <AlertTriangle className="w-4 h-4" />
                        Atención Inmediata Requerida
                    </div>
                    <h1 className="text-5xl md:text-7xl font-black tracking-tighter leading-tight mb-8 text-black">
                        {service.headline}
                    </h1>
                    <p className="text-xl md:text-2xl text-black/80 font-medium leading-relaxed border-l-4 border-[var(--accent)] pl-6">
                        {service.problem}
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mb-16">
                    <div>
                        <h2 className="text-3xl font-bold mb-6">LA SOLUCIÓN</h2>
                        <p className="text-lg text-black mb-6">
                            {service.solution}
                        </p>
                        <ul className="space-y-4">
                            {service.bullets.map((bullet, i) => (
                                <li key={i} className="flex items-start gap-3">
                                    <Check className="w-6 h-6 text-[var(--accent)] flex-shrink-0" />
                                    <span className="text-lg font-medium">{bullet}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="flex flex-col justify-center items-start">
                        <ContactForm serviceName={service.title} />
                    </div>
                </div>

            </div>
        </main>
    );
}
