import Navbar from "./Navbar";
import Hero from "./Hero";
import ProblemSection from "./ProblemSection";
import HowItWorks from "./HowItWorks";
import ResultsSection from "./ResultsSection";
import FinalCTA from "./FinalCTA";

export default function LandingPage() {
  return (
    <div style={styles.page}>
      <Navbar />
      <Hero />
      <ProblemSection />
      <HowItWorks />
      <section style={styles.comparisonSection}>
        <div style={styles.comparisonInner}>
          <div style={styles.copyBlock}>
            <span style={styles.kicker}>Una sola vista para ISO 27001 y SAGRILAFT</span>
            <h2 style={styles.title}>Mientras otras herramientas muestran controles aislados, TrustShield cruza ambos marcos normativos para identificar brechas, prioridades y evidencias reutilizables.</h2>
          </div>

          <div style={styles.mockupCard}>
            <div style={styles.mockupHeader}>
              <div style={styles.pillRow}>
                <span style={styles.pill} />
                <span style={styles.pill} />
                <span style={styles.pill} />
              </div>
            </div>

            <div style={styles.tableHeader}>
              <span>Control</span>
              <span>ISO</span>
              <span>SAGRILAFT</span>
              <span>Conf.</span>
            </div>

            {[1, 2, 3].map((row) => (
              <div key={row} style={styles.tableRow}>
                <span style={styles.controlCode}>A.{row + 4}.1</span>
                <span style={styles.tagGreen}>Automatizado</span>
                <span style={styles.tagAmber}>Validación</span>
                <span style={styles.score}>92%</span>
              </div>
            ))}
          </div>
        </div>
      </section>
      <ResultsSection />
      <FinalCTA />
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    background: "radial-gradient(circle at top, rgba(14, 165, 233, 0.18), transparent 40%), #0b0f1a",
    color: "#e2e8f0",
  },
  comparisonSection: {
    maxWidth: 1200,
    margin: "0 auto",
    padding: "72px 24px",
  },
  comparisonInner: {
    display: "grid",
    gridTemplateColumns: "0.95fr 1.05fr",
    gap: 28,
    alignItems: "center",
  },
  copyBlock: {
    maxWidth: 540,
  },
  kicker: {
    display: "inline-block",
    background: "rgba(139, 92, 246, 0.12)",
    border: "1px solid rgba(139, 92, 246, 0.3)",
    color: "#c4b5fd",
    borderRadius: 999,
    padding: "8px 12px",
    fontSize: 12,
    fontWeight: 700,
    letterSpacing: "0.08em",
    textTransform: "uppercase",
  },
  title: {
    marginTop: 16,
    fontSize: "clamp(2rem, 3vw, 3rem)",
    letterSpacing: "-0.05em",
    color: "#f8fafc",
    lineHeight: 1.15,
    fontWeight: 800,
  },
  mockupCard: {
    background: "rgba(15, 23, 42, 0.82)",
    border: "1px solid rgba(148, 163, 184, 0.2)",
    borderRadius: 22,
    overflow: "hidden",
  },
  mockupHeader: {
    padding: "16px 18px",
    borderBottom: "1px solid rgba(148, 163, 184, 0.16)",
    background: "rgba(15, 23, 42, 0.9)",
  },
  pillRow: {
    display: "flex",
    gap: 8,
  },
  pill: {
    display: "block",
    width: 10,
    height: 10,
    borderRadius: "50%",
    background: "#475569",
  },
  tableHeader: {
    display: "grid",
    gridTemplateColumns: "1.2fr 1fr 1fr 0.7fr",
    gap: 12,
    padding: "16px 18px",
    color: "#94a3b8",
    fontSize: 10,
    letterSpacing: "0.08em",
    textTransform: "uppercase",
    fontWeight: 700,
    borderBottom: "1px solid rgba(148, 163, 184, 0.16)",
  },
  tableRow: {
    display: "grid",
    gridTemplateColumns: "1.2fr 1fr 1fr 0.7fr",
    gap: 12,
    alignItems: "center",
    padding: "16px 18px",
    borderBottom: "1px solid rgba(148, 163, 184, 0.12)",
  },
  controlCode: {
    color: "#67e8f9",
    fontWeight: 700,
    fontSize: 12,
  },
  tagGreen: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    background: "rgba(16, 185, 129, 0.12)",
    color: "#6ee7b7",
    border: "1px solid rgba(16, 185, 129, 0.25)",
    borderRadius: 999,
    padding: "6px 10px",
    fontSize: 11,
    fontWeight: 700,
  },
  tagAmber: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    background: "rgba(245, 158, 11, 0.12)",
    color: "#fbbf24",
    border: "1px solid rgba(245, 158, 11, 0.25)",
    borderRadius: 999,
    padding: "6px 10px",
    fontSize: 11,
    fontWeight: 700,
  },
  score: {
    color: "#f8fafc",
    fontWeight: 800,
    fontSize: 16,
    textAlign: "center",
  },
};
