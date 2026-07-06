import Image from "next/image";

export default function Historia() {
  return (
    <section className="lg-section">
      <div className="lg-container">
        <span className="lg-eyebrow">Quién soy</span>
        <p className="lg-lead">
          Soy de Mexicali. Empecé haciendo publicidad para negocios de aquí (dentistas, seguros,
          restaurantes) antes de que esto de “hacer anuncios en Facebook” sonara a algo serio.
        </p>
        <Image
          className="lg-inline-photo"
          src="/images/luis/working.jpg"
          alt="Luis Gaxiola trabajando"
          width={640}
          height={420}
          unoptimized
        />
        <p>
          Con los años vi el mismo patrón una y otra vez: dueños de negocio pagándole a una agencia
          mes tras mes, recibiendo reportes llenos de “impresiones”, “clics” y “alcance”… pero sin que
          nadie les dijera lo único que importa: cuántos clientes nuevos entraron y cuánto costó cada uno.
        </p>
        <p>
          Me tocó revisar cuentas donde una parte del presupuesto se iba en tráfico que nunca iba a
          comprar, y donde los leads llegaban y nadie los contactaba hasta horas después. El dinero
          estaba ahí. El problema es que nadie lo estaba midiendo de verdad.
        </p>
        <p>
          Ahí decidí trabajar distinto: cada peso que inviertes lo puedo rastrear hasta un cliente
          real. Por eso, antes de hablarte de precios, primero quiero saber si tu negocio de verdad
          necesita esto. Por eso las 4 preguntas de abajo: toman 1 minuto.
        </p>
      </div>
    </section>
  );
}
