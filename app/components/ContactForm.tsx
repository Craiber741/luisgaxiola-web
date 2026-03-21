"use client";

import { useState } from "react";
import { Send, CheckCircle2, AlertCircle } from "lucide-react";

interface ContactFormProps {
    serviceName?: string;
}

export default function ContactForm({ serviceName = "General" }: ContactFormProps) {
    const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
    const [message, setMessage] = useState("");

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setStatus("loading");

        const formData = new FormData(e.currentTarget);
        formData.append("service", serviceName);
        formData.append("subject", serviceName === "General" ? "Consulta General" : `Interés en ${serviceName}`);

        try {
            const response = await fetch("/contact.php", {
                method: "POST",
                body: formData,
            });

            const result = await response.json();

            if (response.ok) {
                setStatus("success");
                setMessage(result.message);
                (e.target as HTMLFormElement).reset();
            } else {
                setStatus("error");
                setMessage(result.message || "Algo salió mal. Por favor intenta de nuevo.");
            }
        } catch (error) {
            setStatus("error");
            setMessage("Error de conexión. Por favor revisa tu internet.");
        }
    }

    return (
        <div className="w-full bg-black text-white p-8 md:p-12 border-l-8 border-[var(--accent)]">
            <h2 className="text-3xl md:text-4xl font-black mb-6 uppercase">
                {serviceName === "General" ? "Hablemos de negocios" : `Escala tu ${serviceName}`}
            </h2>
            <p className="text-white/70 mb-8 font-medium italic">
                Solo para quienes buscan resultados reales. No perdamos el tiempo.
            </p>

            {status === "success" ? (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                    <CheckCircle2 className="w-16 h-16 text-[var(--accent)] mb-4" />
                    <h3 className="text-2xl font-bold mb-2">MENSAJE RECIBIDO.</h3>
                    <p className="text-white/60">Revisaré tu caso personalmente. Espera noticias pronto.</p>
                </div>
            ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="flex flex-col gap-2">
                            <label htmlFor="name" className="text-xs font-black uppercase tracking-widest text-[var(--accent)]">Nombre</label>
                            <input
                                required
                                type="text"
                                id="name"
                                name="name"
                                placeholder="Tu nombre"
                                className="bg-white/5 border border-white/10 p-4 font-bold focus:outline-none focus:border-[var(--accent)] transition-colors placeholder:text-white/20"
                            />
                        </div>
                        <div className="flex flex-col gap-2">
                            <label htmlFor="email" className="text-xs font-black uppercase tracking-widest text-[var(--accent)]">Email</label>
                            <input
                                required
                                type="email"
                                id="email"
                                name="email"
                                placeholder="tu@email.com"
                                className="bg-white/5 border border-white/10 p-4 font-bold focus:outline-none focus:border-[var(--accent)] transition-colors placeholder:text-white/20"
                            />
                        </div>
                    </div>
                    <div className="flex flex-col gap-2">
                        <label htmlFor="message" className="text-xs font-black uppercase tracking-widest text-[var(--accent)]">Cuéntame de tu proyecto</label>
                        <textarea
                            required
                            id="message"
                            name="message"
                            rows={4}
                            placeholder="¿Cuál es tu facturación actual y tu meta?"
                            className="bg-white/5 border border-white/10 p-4 font-bold focus:outline-none focus:border-[var(--accent)] transition-colors placeholder:text-white/20 resize-none"
                        ></textarea>
                    </div>

                    {status === "error" && (
                        <div className="flex items-center gap-2 text-red-500 font-bold bg-red-500/10 p-4">
                            <AlertCircle className="w-5 h-5" />
                            <span>{message}</span>
                        </div>
                    )}

                    <button
                        disabled={status === "loading"}
                        className="w-full py-4 bg-[var(--accent)] text-white font-black text-lg hover:brightness-110 transition-all flex items-center justify-center gap-2 uppercase tracking-tighter disabled:opacity-50 disabled:cursor-wait"
                    >
                        {status === "loading" ? "ENVIANDO..." : "ENVIAR CONSULTA ESTRATÉGICA"}
                        <Send className="w-5 h-5" />
                    </button>
                </form>
            )}
        </div>
    );
}
