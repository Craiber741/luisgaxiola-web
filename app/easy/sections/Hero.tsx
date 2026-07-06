"use client";

import Image from "next/image";
import { QuizCTA } from "../tracking";

export default function Hero() {
  return (
    <section className="lg-section">
      <div className="lg-container">
        <h1>Anuncios que sí te traen clientes, no solo “likes”</h1>
        <p className="lg-lead">
          He manejado más de $4 millones de pesos... perdón, de dólares, en publicidad para
          negocios como el tuyo. La diferencia conmigo: te digo cuántos clientes nuevos te
          llegaron, no cuánta gente “vio” tu anuncio.
        </p>

        <div className="lg-photo">
          <Image
            src="/images/luis/hero.jpg"
            alt="Luis Gaxiola, media buyer"
            width={360}
            height={450}
            priority
            unoptimized
          />
        </div>

        <div style={{ marginTop: 36 }}>
          <QuizCTA source="hero" label="¿Mi negocio califica?" />
          <p style={{ fontSize: 14, marginTop: 12, marginBottom: 0 }}>
            4 preguntas. Un minuto. Sin compromiso.
          </p>
        </div>
      </div>
    </section>
  );
}
