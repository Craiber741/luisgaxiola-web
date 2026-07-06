// Métricas reales de la marca (mismas que en la home / StatsBar del sitio).
const STATS = [
  { num: "$45M+", label: "Generados en ventas para clientes" },
  { num: "7+", label: "Años en marketing digital" },
  { num: "50+", label: "Negocios atendidos" },
  { num: "3", label: "Negocios propios en marcha" },
];

export default function Stats() {
  return (
    <section className="lg-section">
      <div className="lg-container">
        <div className="lg-stats">
          {STATS.map((s) => (
            <div key={s.label}>
              <div className="lg-stat-num">
                <span>{s.num}</span>
              </div>
              <div className="lg-stat-label">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
