export default function Captacion() {
  return (
    <section className="lg-section">
      <div className="lg-container">
        <div className="lg-rule" />
        <h2>Y no mando tu dinero a cualquier lado</h2>
        <p className="lg-lead">
          La mayoría de los negocios corren “anuncios de mensaje a WhatsApp” o los formularios que
          se llenan dentro de Facebook. Se ven baratos, pero traen contactos de muy baja calidad.
        </p>

        <div className="lg-vs">
          <div className="lg-vs-bad">
            <span className="lg-vs-tag">✕ Lo que hacen los demás</span>
            <p>
              Anuncios de mensaje y formularios de Facebook: llegan muchos contactos, pero la mayoría
              no leyó nada, no contesta, o ni se acuerda de haberte escrito.
            </p>
          </div>
          <div className="lg-vs-good">
            <span className="lg-vs-tag">✓ Lo que hago yo</span>
            <p>
              Te construyo una página hecha para tu negocio, que explica tu oferta y filtra: el que
              te contacta ya sabe qué haces, cuánto cuesta y por qué. Menos contactos, pero de verdad.
            </p>
          </div>
        </div>

        <div className="lg-card" style={{ marginTop: 20 }}>
          <p style={{ color: "var(--lg-text)", fontWeight: 700, marginBottom: 12 }}>
            Además, conecto tus datos con Meta
          </p>
          <ul className="lg-check">
            <li>El Pixel de Meta, instalado y funcionando de verdad.</li>
            <li>La API de conversiones (CAPI), para que no se pierda ningún dato.</li>
            <li>Cada cliente que llega queda registrado y medido.</li>
          </ul>
          <p style={{ margin: "14px 0 0" }}>
            Con eso Meta deja de adivinar: aprende quién sí te compra y sale a buscar más gente
            parecida.
          </p>
        </div>
      </div>
    </section>
  );
}
