const FAQS = [
  {
    q: "¿Por qué se paga por separado el inicio y lo mensual?",
    a: "Lo primero es armar todo (tu página, tus anuncios, la parte técnica). Lo segundo es que yo esté revisando y mejorando tus resultados cada semana. Es como construir una casa y luego pagar el mantenimiento: son dos cosas distintas.",
  },
  {
    q: "¿Cuánto tardo en ver resultados?",
    a: "Para ver resultados claros y estables, normalmente entre 2 y 4 semanas. La publicidad necesita juntar datos antes de optimizar bien, y me tomo esos primeros días para encontrar qué anuncio funciona.",
  },
  {
    q: "¿Qué necesito de mi lado para empezar?",
    a: "Que me des acceso a tu cuenta de anuncios de Facebook, que sepas cuánto quieres gastar al mes, y 30 minutos para platicar.",
  },
  {
    q: "¿La página y el dominio son míos?",
    a: "Sí, están incluidos mientras trabajamos juntos. Si en algún momento decides seguir por tu cuenta, te paso todo.",
  },
];

export default function FAQ() {
  return (
    <section className="lg-section">
      <div className="lg-container">
        <h2>Preguntas frecuentes</h2>
        <div>
          {FAQS.map((item) => (
            <div key={item.q} className="lg-faq-item">
              <h3>{item.q}</h3>
              <p>{item.a}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
