"use client";

import { QuizCTA } from "../tracking";

export default function ServicioPrecio() {
  return (
    <section className="lg-section">
      <div className="lg-container">
        <div className="lg-rule" />
        <h2>Así es como trabajamos juntos</h2>

        <div className="lg-card" style={{ marginBottom: 14 }}>
          <p className="lg-price" style={{ marginBottom: 14 }}>
            Primero, arranco: $10,000 pesos (pago único)
          </p>
          <p style={{ marginTop: 0, marginBottom: 14 }}>Esto es todo lo que incluye:</p>
          <ul className="lg-check">
            <li>Tu página dedicada, hecha para captar clientes (no un anuncio genérico).</li>
            <li>Tus 3 anuncios armados y listos para salir.</li>
            <li>Configuración de tu cuenta de anuncios de Meta, bien hecha desde cero.</li>
            <li>Conexión de datos con Meta (Pixel + CAPI) para medir clientes de verdad.</li>
            <li>Sistema de captación: cada lead te llega directo a WhatsApp.</li>
            <li>Dominio y hospedaje de tu página, incluidos mientras estés conmigo.</li>
          </ul>
        </div>

        <div className="lg-card">
          <p className="lg-price" style={{ marginBottom: 8 }}>
            Después, el mantenimiento: $5,000 pesos al mes
          </p>
          <p style={{ margin: 0 }}>
            Yo reviso tus anuncios todos los días, apago lo que no sirve, te mando reportes que sí
            entiendes, y voy ajustando para mejorar resultados.
          </p>
        </div>

        <div className="lg-notice">
          <p className="lg-notice-title">Cómo se cobra (léelo, es importante)</p>
          <p style={{ margin: 0 }}>
            Para protegerte a ti y protegerme a mí, tanto el arranque como la mensualidad se cobran
            de forma automática a una tarjeta. Andar esperando y persiguiendo pagos cansa a todos, y
            prefiero usar ese tiempo en traerte clientes, no en cobrarte.
          </p>
        </div>

        <div className="lg-warn">
          <p style={{ marginBottom: 8 }}>
            <strong>Esto no es para ti si...</strong>
          </p>
          <p style={{ margin: 0 }}>
            Gastas menos de $8,000 pesos al mes en publicidad · esperas resultados en menos de un
            mes · quieres 10 anuncios diferentes en vez de los 3 que sí funcionan.
          </p>
        </div>

        <div style={{ marginTop: 28 }}>
          <QuizCTA source="pricing" label="Responder 4 preguntas rápidas" />
        </div>
      </div>
    </section>
  );
}
