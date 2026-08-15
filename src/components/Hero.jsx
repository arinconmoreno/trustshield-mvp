import { ArrowRight, PlayCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { trackEvent } from "../utils/analytics";

export default function Hero() {
  return (
    <section id="inicio" style={styles.section}>
      <div style={styles.grid} className="hero-grid">
        <div>
          <span style={styles.kicker}>Cumplimiento para licitaciones y auditorías</span>
          <h1 style={styles.title}>Gana licitaciones y supera auditorías en horas, no semanas</h1>
          <p style={styles.subtitle}>
            TrustShield ayuda a empresas que venden al Estado o a grandes organizaciones a demostrar
            cumplimiento ISO 27001 y SAGRILAFT en horas, para que puedan competir por contratos sin
            depender de consultorías costosas.
          </p>

          <div style={styles.actions}>
            <a href="#cta-final" style={styles.primaryButton} onClick={() => trackEvent("cta_hero")}>
              Agenda un diagnóstico de cumplimiento (15 min)
              <ArrowRight size={18} />
            </a>

            <Link
              to="/demo"
              style={styles.secondaryButton}
              onClick={() => trackEvent("ver_demo", { source: "hero" })}
            >
              <PlayCircle size={18} />
              Ver demostración
            </Link>
          </div>

          <div style={styles.pillRow}>
            <span style={styles.pill}>ISO 27001</span>
            <span style={styles.pill}>SAGRILAFT</span>
            <span style={styles.pill}>SECOP II</span>
          </div>
        </div>

        <div style={styles.previewCard} className="hero-preview">
          <div style={styles.previewTop}>
            <div style={styles.dot} />
            <div style={styles.dot} />
            <div style={styles.dot} />
          </div>

          <div style={styles.previewContent}>
            <div style={styles.panelRow}>
              <div>
                <div style={styles.label}>Cumplimiento</div>
                <div style={styles.bigStat}>78%</div>
              </div>
              <div style={styles.statusBadge}>En línea</div>
            </div>

            <div style={styles.barGroup}>
              <div style={styles.barRow}><span>ISO 27001</span><strong>78%</strong></div>
              <div style={styles.barTrack}><div style={styles.barFillGreen} /></div>

              <div style={styles.barRow}><span>SAGRILAFT</span><strong>52%</strong></div>
              <div style={styles.barTrack}><div style={styles.barFillAmber} /></div>
            </div>

            <div style={styles.list}>
              <div style={styles.listItem}><span style={styles.check}>✓</span> Evidencias listas en horas</div>
              <div style={styles.listItem}><span style={styles.check}>✓</span> Riesgos priorizados</div>
              <div style={styles.listItem}><span style={styles.check}>✓</span> Reporte SECOP II listo</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

const styles = {
  section: {
    maxWidth: 1200,
    margin: "0 auto",
    padding: "72px 24px 32px",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "1.2fr 0.8fr",
    gap: 32,
    alignItems: "center",
  },
  kicker: {
    display: "inline-block",
    background: "rgba(6, 182, 212, 0.12)",
    border: "1px solid rgba(6, 182, 212, 0.35)",
    color: "#67e8f9",
    borderRadius: 999,
    padding: "8px 14px",
    fontSize: 12,
    fontWeight: 700,
    letterSpacing: "0.08em",
    textTransform: "uppercase",
  },
  title: {
    marginTop: 18,
    marginBottom: 18,
    fontSize: "clamp(2.5rem, 4vw, 4.2rem)",
    lineHeight: 1.05,
    letterSpacing: "-0.06em",
    color: "#f8fafc",
    maxWidth: 650,
    fontWeight: 800,
  },
  subtitle: {
    maxWidth: 700,
    fontSize: 20,
    lineHeight: 1.7,
    color: "#cbd5e1",
  },
  actions: {
    display: "flex",
    alignItems: "center",
    gap: 16,
    flexWrap: "wrap",
    marginTop: 28,
  },
  primaryButton: {
    display: "inline-flex",
    alignItems: "center",
    gap: 10,
    textDecoration: "none",
    background: "linear-gradient(135deg, #0ea5e9, #10b981)",
    color: "#f8fafc",
    padding: "16px 24px",
    borderRadius: 14,
    fontSize: 15,
    fontWeight: 700,
    boxShadow: "0 18px 35px rgba(16, 185, 129, 0.22)",
  },
  secondaryButton: {
    display: "inline-flex",
    alignItems: "center",
    gap: 10,
    textDecoration: "none",
    background: "rgba(15, 23, 42, 0.7)",
    border: "1px solid rgba(148, 163, 184, 0.32)",
    color: "#e2e8f0",
    padding: "15px 20px",
    borderRadius: 14,
    fontSize: 15,
    fontWeight: 600,
  },
  pillRow: {
    display: "flex",
    gap: 12,
    flexWrap: "wrap",
    marginTop: 28,
  },
  pill: {
    background: "rgba(30, 41, 59, 0.8)",
    border: "1px solid rgba(148, 163, 184, 0.2)",
    color: "#cbd5e1",
    borderRadius: 999,
    padding: "8px 12px",
    fontSize: 12,
    fontWeight: 600,
  },
  previewCard: {
    background: "linear-gradient(180deg, rgba(17, 24, 39, 0.9), rgba(15, 23, 42, 0.95))",
    border: "1px solid rgba(148, 163, 184, 0.22)",
    borderRadius: 22,
    overflow: "hidden",
    boxShadow: "0 18px 40px rgba(14, 165, 233, 0.12)",
  },
  previewTop: {
    display: "flex",
    gap: 8,
    padding: "16px 18px",
    background: "rgba(15, 23, 42, 0.9)",
    borderBottom: "1px solid rgba(148, 163, 184, 0.14)",
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: "50%",
    background: "#475569",
  },
  previewContent: {
    padding: 22,
  },
  panelRow: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  label: {
    fontSize: 12,
    color: "#94a3b8",
    letterSpacing: "0.08em",
    textTransform: "uppercase",
  },
  bigStat: {
    fontSize: 42,
    letterSpacing: "-0.06em",
    color: "#f8fafc",
    fontWeight: 800,
  },
  statusBadge: {
    background: "rgba(16, 185, 129, 0.12)",
    color: "#6ee7b7",
    border: "1px solid rgba(16, 185, 129, 0.3)",
    borderRadius: 999,
    padding: "6px 10px",
    fontSize: 11,
    fontWeight: 700,
  },
  barGroup: {
    display: "grid",
    gap: 10,
  },
  barRow: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    color: "#dbeafe",
    fontSize: 13,
  },
  barTrack: {
    height: 9,
    width: "100%",
    background: "rgba(148, 163, 184, 0.2)",
    borderRadius: 999,
    overflow: "hidden",
  },
  barFillGreen: {
    height: "100%",
    width: "78%",
    background: "linear-gradient(90deg, #10b981, #34d399)",
    borderRadius: 999,
  },
  barFillAmber: {
    height: "100%",
    width: "52%",
    background: "linear-gradient(90deg, #f59e0b, #fbbf24)",
    borderRadius: 999,
  },
  list: {
    marginTop: 24,
    display: "grid",
    gap: 12,
  },
  listItem: {
    display: "flex",
    alignItems: "center",
    gap: 10,
    color: "#dbeafe",
    fontSize: 13,
    fontWeight: 600,
  },
  check: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    width: 18,
    height: 18,
    borderRadius: "50%",
    background: "rgba(16, 185, 129, 0.15)",
    color: "#6ee7b7",
    fontSize: 12,
  },
};
