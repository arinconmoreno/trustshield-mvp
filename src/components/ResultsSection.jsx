const metrics = [
  "80% menos tiempo preparando auditorías y licitaciones",
  "Evidencias listas en horas",
  "Más oportunidades para competir por contratos B2B/B2G",
];

export default function ResultsSection() {
  return (
    <section style={styles.section} className="results-section">
      <div style={styles.headerWrap}>
        <span style={styles.kicker}>Resultados</span>
        <h2 style={styles.title}>Cumplir más rápido, sin perder oportunidades</h2>
      </div>

      <div style={styles.grid} className="results-grid">
        {metrics.map((metric, index) => (
          <article key={metric} style={styles.card}>
            <div style={styles.counter}>0{index + 1}</div>
            <p style={styles.metric}>{metric}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

const styles = {
  section: {
    maxWidth: 1200,
    margin: "0 auto",
    padding: "72px 24px",
  },
  headerWrap: {
    marginBottom: 26,
  },
  kicker: {
    display: "inline-block",
    background: "rgba(16, 185, 129, 0.1)",
    border: "1px solid rgba(16, 185, 129, 0.24)",
    color: "#6ee7b7",
    borderRadius: 999,
    padding: "8px 12px",
    fontSize: 12,
    fontWeight: 700,
    letterSpacing: "0.08em",
    textTransform: "uppercase",
  },
  title: {
    marginTop: 14,
    fontSize: "clamp(2rem, 3vw, 3rem)",
    letterSpacing: "-0.05em",
    color: "#f8fafc",
    maxWidth: 720,
    fontWeight: 800,
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
    gap: 22,
  },
  card: {
    background: "linear-gradient(180deg, rgba(15, 23, 42, 0.72), rgba(17, 24, 39, 0.9))",
    border: "1px solid rgba(148, 163, 184, 0.2)",
    borderRadius: 20,
    padding: 26,
    minHeight: 170,
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  counter: {
    color: "#67e8f9",
    fontSize: 36,
    fontWeight: 800,
    letterSpacing: "-0.06em",
  },
  metric: {
    color: "#f8fafc",
    fontSize: 24,
    lineHeight: 1.4,
    letterSpacing: "-0.04em",
    fontWeight: 700,
  },
};
