const problems = [
  {
    title: "Semanas preparando evidencias",
    text: "Equipos técnicos dedicados a capturas de pantalla, documentos y auditorías manuales.",
  },
  {
    title: "Licitaciones perdidas",
    text: "Evidencias incompletas o entregadas fuera de tiempo generan descalificación.",
  },
  {
    title: "Consultorías costosas",
    text: "Dependencia de terceros para demostrar cumplimiento regulatorio.",
  },
];

export default function ProblemSection() {
  return (
    <section id="problema" style={styles.section} className="problem-section">
      <div style={styles.headerWrap}>
        <span style={styles.kicker}>El problema</span>
        <h2 style={styles.title}>El cumplimiento no debería retrasar oportunidades de negocio</h2>
      </div>

      <div style={styles.grid} className="problem-grid">
        {problems.map((problem) => (
          <article key={problem.title} style={styles.card}>
            <div style={styles.badge}>⚠</div>
            <h3 style={styles.cardTitle}>{problem.title}</h3>
            <p style={styles.cardText}>{problem.text}</p>
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
    background: "rgba(245, 158, 11, 0.1)",
    border: "1px solid rgba(245, 158, 11, 0.24)",
    color: "#fbbf24",
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
    maxWidth: 700,
    fontWeight: 800,
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
    gap: 22,
  },
  card: {
    background: "rgba(15, 23, 42, 0.7)",
    border: "1px solid rgba(148, 163, 184, 0.2)",
    borderRadius: 20,
    padding: 26,
  },
  badge: {
    width: 42,
    height: 42,
    borderRadius: 12,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "rgba(245, 158, 11, 0.15)",
    color: "#fbbf24",
    fontSize: 18,
    marginBottom: 16,
  },
  cardTitle: {
    color: "#f8fafc",
    fontSize: 22,
    letterSpacing: "-0.04em",
    marginBottom: 12,
    fontWeight: 700,
  },
  cardText: {
    color: "#cbd5e1",
    fontSize: 16,
    lineHeight: 1.7,
  },
};
