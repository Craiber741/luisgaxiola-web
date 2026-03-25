import Link from "next/link";

export default function Privacidad() {
  return (
    <div className="min-h-screen bg-white text-gray-800 py-16 px-4">
      <div className="max-w-3xl mx-auto">
        <Link href="javascript:history.back()" className="text-sm text-gray-400 hover:text-gray-700 mb-8 inline-block">← Regresar</Link>
        <h1 className="text-3xl font-bold mb-2">Política de Privacidad</h1>
        <p className="text-gray-400 text-sm mb-10">Última actualización: {new Date().getFullYear()}</p>

        <div className="space-y-8 text-sm leading-relaxed text-gray-600">
          <section>
            <h2 className="font-bold text-gray-800 text-base mb-2">1. Información que recopilamos</h2>
            <p>Recopilamos información que usted nos proporciona directamente, como nombre, número de teléfono, correo electrónico y cualquier otra información que decida compartir al contactarnos o agendar una cita a través de nuestros formularios o WhatsApp.</p>
          </section>
          <section>
            <h2 className="font-bold text-gray-800 text-base mb-2">2. Uso de la información</h2>
            <p>Utilizamos la información recopilada para: (a) responder a sus consultas y agendar citas, (b) enviarle información sobre nuestros servicios, promociones y novedades, (c) mejorar nuestros servicios y la experiencia del usuario en nuestro sitio web.</p>
          </section>
          <section>
            <h2 className="font-bold text-gray-800 text-base mb-2">3. Protección de datos</h2>
            <p>Implementamos medidas de seguridad para proteger su información personal. No vendemos, intercambiamos ni transferimos su información de identificación personal a terceros sin su consentimiento, excepto cuando sea necesario para operar nuestro negocio o cuando la ley lo requiera.</p>
          </section>
          <section>
            <h2 className="font-bold text-gray-800 text-base mb-2">4. Cookies</h2>
            <p>Nuestro sitio web puede utilizar cookies para mejorar la experiencia del usuario. Puede optar por configurar su navegador para rechazar cookies, aunque esto podría afectar algunas funciones del sitio.</p>
          </section>
          <section>
            <h2 className="font-bold text-gray-800 text-base mb-2">5. Sus derechos</h2>
            <p>Conforme a la Ley Federal de Protección de Datos Personales en Posesión de los Particulares (LFPDPPP), usted tiene derecho a acceder, rectificar, cancelar u oponerse al tratamiento de sus datos personales. Para ejercer estos derechos, contáctenos directamente.</p>
          </section>
          <section>
            <h2 className="font-bold text-gray-800 text-base mb-2">6. Cambios en esta política</h2>
            <p>Nos reservamos el derecho de actualizar esta política de privacidad en cualquier momento. Le notificaremos sobre cambios significativos publicando la nueva versión en nuestro sitio web.</p>
          </section>
        </div>
      </div>
    </div>
  );
}
