import Link from "next/link";

export default function Terminos() {
  return (
    <div className="min-h-screen bg-white text-gray-800 py-16 px-4">
      <div className="max-w-3xl mx-auto">
        <Link href="javascript:history.back()" className="text-sm text-gray-400 hover:text-gray-700 mb-8 inline-block">← Regresar</Link>
        <h1 className="text-3xl font-bold mb-2">Términos y Condiciones</h1>
        <p className="text-gray-400 text-sm mb-10">Última actualización: {new Date().getFullYear()}</p>

        <div className="space-y-8 text-sm leading-relaxed text-gray-600">
          <section>
            <h2 className="font-bold text-gray-800 text-base mb-2">1. Aceptación de los términos</h2>
            <p>Al acceder y utilizar este sitio web, usted acepta estar sujeto a estos Términos y Condiciones. Si no está de acuerdo con alguno de estos términos, le rogamos que no utilice nuestro sitio.</p>
          </section>
          <section>
            <h2 className="font-bold text-gray-800 text-base mb-2">2. Servicios</h2>
            <p>Los precios mostrados en este sitio son orientativos y pueden variar. El precio final será confirmado al momento de su cita. Nos reservamos el derecho de modificar nuestros servicios y precios sin previo aviso.</p>
          </section>
          <section>
            <h2 className="font-bold text-gray-800 text-base mb-2">3. Citas y cancelaciones</h2>
            <p>Le pedimos que notifique la cancelación de su cita con al menos 24 horas de anticipación. Las ausencias sin previo aviso podrán resultar en restricciones para futuras reservaciones. Las citas son personales e intransferibles.</p>
          </section>
          <section>
            <h2 className="font-bold text-gray-800 text-base mb-2">4. Responsabilidad</h2>
            <p>No nos hacemos responsables por reacciones alérgicas a productos cuando el cliente no ha informado previamente sobre sus alergias conocidas. Es responsabilidad del cliente comunicar cualquier condición de salud relevante antes del servicio.</p>
          </section>
          <section>
            <h2 className="font-bold text-gray-800 text-base mb-2">5. Propiedad intelectual</h2>
            <p>Todo el contenido de este sitio web, incluyendo textos, imágenes y logotipos, está protegido por derechos de autor. Queda prohibida su reproducción sin autorización expresa.</p>
          </section>
          <section>
            <h2 className="font-bold text-gray-800 text-base mb-2">6. Ley aplicable</h2>
            <p>Estos términos se rigen por las leyes de los Estados Unidos Mexicanos. Cualquier disputa será resuelta ante los tribunales competentes de la ciudad donde opera el establecimiento.</p>
          </section>
        </div>
      </div>
    </div>
  );
}
