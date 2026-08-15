import { ArrowRight, Cloud, FileCheck2, ScanSearch } from "lucide-react";

const steps = [
  {
    icon: Cloud,
    title: "Conecta tu entorno",
    text: "AWS, Microsoft 365, Google Workspace y GitHub.",
  },
  {
    icon: ScanSearch,
    title: "Analizamos tus controles",
    text: "Cruzamos ISO 27001 y SAGRILAFT para detectar brechas y priorizar riesgos.",
  },
  {
    icon: FileCheck2,
    title: "Recibe evidencias listas",
    text: "Evidencias preparadas para auditorías y procesos SECOP II en horas.",
  },
];

export default function HowItWorks() {
  return (
    <section id="como-funciona" style={styles.section} className="how-section">
      <div style={styles.headerWrap}>
        <span style={styles.kicker}>Cómo funciona</span>
        <h2 style={styles.title}>Tres pasos para salir más rápido de la complejidad normativa</h2>
      </div>

      <div style={styles.grid} className="how-grid">
        {steps.map((step, index) => {
          const Icon = step.icon;
          return (
            <div key={step.title} style={styles.card}>
              <div style={styles.number}>{index + 1}</div>
              <div style={styles.iconWrap}>
                <Icon size={22} color="#67e8f9" />
              </div>
              <h3 style={styles.cardTitle}>{step.title}</h3>
              <p style={styles.cardText}>{step.text}</p>
              {index < steps.length - 1 && <ArrowRight style={styles.arrow} size={18} color="#94a3b8" />}
            </div>
          );
        })}
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
    background: "rgba(6, 182, 212, 0.1)",
    border: "1px solid rgba(6, 182, 212, 0.24)",
    color: "#67e8f9",
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
    maxWidth: 760,
    fontWeight: 800,
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
    gap: 22,
  },
  card: {
    position: "relative",
    background: "rgba(15, 23, 42, 0.7)",
    border: "1px solid rgba(148, 163, 184, 0.2)",
    borderRadius: 20,
    padding: 26,
  },
  number: {
    position: "absolute",
    top: 16,
    right: 18,
    fontSize: 28,
    fontWeight: 800,
    letterSpacing: "-0.06em",
    color: "rgba(103, 232, 249, 0.28)",
  },
  iconWrap: {
    width: 52,
    height: 52,
    borderRadius: 14,
    background: "rgba(6, 182, 212, 0.11)",
    border: "1px solid rgba(6, 182, 212, 0.2)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 18,
  },
  cardTitle: {
    fontSize: 24,
    letterSpacing: "-0.04em",
    color: "#f8fafc",
    marginBottom: 12,
    fontWeight: 700,
  },
  cardText: {
    color: "#cbd5e1",
    fontSize: 16,
    lineHeight: 1.7,
  },
  arrow: {
    position: "absolute",
    right: 20,
    bottom: 18,
  },
};
