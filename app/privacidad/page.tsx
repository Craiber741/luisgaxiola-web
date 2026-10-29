import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Política de privacidad",
  alternates: { canonical: "/privacidad" },
  robots: { index: false },
};

const secciones = [
  {
    t: "Qué datos recopilo",
    p: "Los que tú me das: nombre, negocio, inversión en anuncios y lo que escribas en el formulario de aplicación o por WhatsApp. Si te suscribes a una newsletter, Substack guarda tu correo bajo su propia política de privacidad.",
  },
  {
    t: "Para qué los uso",
    p: "Para responder tu aplicación, agendar la llamada de diagnóstico y darte seguimiento. No vendo ni comparto tus datos con terceros, salvo cuando la ley lo requiera.",
  },
  {
    t: "Cookies y medición",
    p: "Este sitio usa el píxel de Meta para medir visitas y aplicaciones. Puedes bloquear cookies desde tu navegador; el sitio seguirá funcionando.",
  },
  {
    t: "Tus derechos",
    p: "Conforme a la Ley Federal de Protección de Datos Personales en Posesión de los Particulares, puedes pedir acceso, rectificación, cancelación u oposición al uso de tus datos escribiendo a hola@luisgaxiola.com.",
  },
  {
    t: "Cambios",
    p: "Si esta política cambia, la versión vigente es la que está publicada en esta página.",
  },
];

export default function Privacidad() {
  return (
    <main className="max-w-3xl mx-auto px-4 md:px-8 py-20 md:py-28">
      <h1 className="font-semibold tracking-tight text-4xl md:text-5xl mb-12">Política de privacidad</h1>
      <div className="space-y-10">
        {secciones.map((s) => (
          <section key={s.t}>
            <h2 className="font-semibold text-lg mb-3">{s.t}</h2>
            <p className="text-white/60 leading-relaxed">{s.p}</p>
          </section>
        ))}
      </div>
    </main>
  );
}
