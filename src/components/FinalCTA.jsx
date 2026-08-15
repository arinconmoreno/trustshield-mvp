import { ArrowRight } from "lucide-react";
import { trackEvent } from "../utils/analytics";

export default function FinalCTA() {
  return (
    <section id="cta-final" style={styles.section}>
      <div style={styles.card} className="final-cta-card">
        <div>
          <span style={styles.kicker}>Agenda tu diagnóstico</span>
          <h2 style={styles.title}>Descubre qué le falta a tu empresa para competir por su próximo contrato</h2>
        </div>

        <a
          href="#cta-final"
          style={styles.button}
          onClick={() => trackEvent("cta_final")}
        >
          Agenda una auditoría de 15 minutos
          <ArrowRight size={18} />
        </a>
      </div>
    </section>
  );
}

const styles = {
  section: {
    maxWidth: 1200,
    margin: "0 auto",
    padding: "72px 24px 96px",
  },
  card: {
    background: "linear-gradient(135deg, rgba(14, 165, 233, 0.16), rgba(16, 185, 129, 0.12))",
    border: "1px solid rgba(103, 232, 249, 0.25)",
    borderRadius: 24,
    padding: "38px 30px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 20,
    boxShadow: "0 18px 35px rgba(14, 165, 233, 0.12)",
  },
  kicker: {
    display: "inline-block",
    color: "#67e8f9",
    fontSize: 12,
    fontWeight: 700,
    letterSpacing: "0.08em",
    textTransform: "uppercase",
  },
  title: {
    marginTop: 12,
    color: "#f8fafc",
    fontSize: "clamp(2rem, 3vw, 3rem)",
    letterSpacing: "-0.05em",
    maxWidth: 760,
    fontWeight: 800,
  },
  button: {
    display: "inline-flex",
    alignItems: "center",
    gap: 10,
    textDecoration: "none",
    background: "linear-gradient(135deg, #0ea5e9, #10b981)",
    color: "#f8fafc",
    padding: "16px 22px",
    borderRadius: 14,
    fontSize: 15,
    fontWeight: 700,
    whiteSpace: "nowrap",
    boxShadow: "0 18px 35px rgba(16, 185, 129, 0.22)",
  },
};
