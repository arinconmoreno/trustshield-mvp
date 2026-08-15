import { ArrowRight, ShieldCheck } from "lucide-react";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <header style={styles.header} className="site-header">
      <div style={styles.inner} className="site-header-inner">
        <Link to="/" style={styles.brand} aria-label="TrustShield inicio">
          <div style={styles.brandBadge}>
            <ShieldCheck size={18} color="#fff" />
          </div>
          <div>
            <div style={styles.brandText}>TrustShield</div>
            <div style={styles.brandSub}>AI compliance</div>
          </div>
        </Link>

        <nav style={styles.nav} aria-label="Navegación principal" className="site-nav">
          <a href="#inicio" style={styles.navLink}>Inicio</a>
          <a href="#como-funciona" style={styles.navLink}>Cómo funciona</a>
          <Link to="/demo" style={styles.navLink}>Demo</Link>
          <a href="#cta-final" style={styles.navLink}>Agendar diagnóstico</a>
        </nav>

        <Link to="/#cta-final" style={styles.ctaButton} className="site-cta">
          Agenda un diagnóstico
          <ArrowRight size={16} />
        </Link>
      </div>
    </header>
  );
}

const styles = {
  header: {
    position: "sticky",
    top: 0,
    zIndex: 50,
    backdropFilter: "blur(16px)",
    background: "rgba(11, 15, 26, 0.72)",
    borderBottom: "1px solid rgba(148, 163, 184, 0.15)",
  },
  inner: {
    maxWidth: 1200,
    margin: "0 auto",
    padding: "16px 24px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 16,
  },
  brand: {
    display: "flex",
    alignItems: "center",
    gap: 12,
    color: "#e2e8f0",
    textDecoration: "none",
  },
  brandBadge: {
    width: 36,
    height: 36,
    borderRadius: 10,
    background: "linear-gradient(135deg, #06b6d4, #8b5cf6)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    boxShadow: "0 10px 20px rgba(6, 182, 212, 0.25)",
  },
  brandText: {
    fontSize: 18,
    fontWeight: 700,
    letterSpacing: "-0.04em",
  },
  brandSub: {
    fontSize: 10,
    letterSpacing: "0.14em",
    textTransform: "uppercase",
    color: "#06b6d4",
    fontWeight: 700,
  },
  nav: {
    display: "flex",
    alignItems: "center",
    gap: 26,
  },
  navLink: {
    color: "#cbd5e1",
    textDecoration: "none",
    fontSize: 14,
    fontWeight: 500,
  },
  ctaButton: {
    display: "inline-flex",
    alignItems: "center",
    gap: 8,
    textDecoration: "none",
    color: "#f8fafc",
    background: "linear-gradient(135deg, #0ea5e9, #10b981)",
    padding: "10px 16px",
    borderRadius: 12,
    fontWeight: 600,
    fontSize: 13,
    boxShadow: "0 12px 30px rgba(16, 185, 129, 0.3)",
  },
};
