import { useState, useEffect } from "react";
import { Shield, ChevronRight, CheckCircle, AlertTriangle, XCircle, Activity, Cloud, Github, Mail, FileText, Users, BarChart3, Clock, Eye, Lock, Server, Zap, ArrowRight, ChevronDown, ExternalLink, Layers, Target, BookOpen } from "lucide-react";

// ─── DATA ────────────────────────────────────────────────────────────────────

const COMPANY_DEFAULTS = {
  name: "TechCo Solutions S.A.S.",
  nit: "901.456.789-2",
  sector: "Fábrica de Software & Servicios TI",
  employees: 120,
  licitaSECOP: true,
  sujetoObligado: true,
  connectors: ["AWS", "GitHub", "Google Workspace", "Microsoft 365"],
};

const FRAMEWORKS_DETECTED = [
  { id: "iso27001", name: "ISO 27001:2022", reason: "Licita en SECOP II → requiere certificación de seguridad de la información", icon: "🔒" },
  { id: "sagrilaft", name: "SAGRILAFT / Capítulo IX", reason: "Sujeto obligado ante SuperSociedades (Circular 100-000020)", icon: "⚖️" },
  { id: "iso9001", name: "ISO 9001:2015", reason: "Requerido por pliegos SECOP II para contratos de calidad TI", icon: "✅" },
];

const CONTROLS_MATRIX = [
  { id: "A.5.1", isoControl: "Políticas de Seguridad de la Información", sagrilaftReq: "Art. 9.1 – Política de cumplimiento y prevención LA/FT", isoStatus: "green", sagrilaftStatus: "green", evidence: "Política v3.2 generada automáticamente desde plantilla normativa. Hash SHA-256 verificado.", source: "RAG + Google Workspace", confidence: 0.96 },
  { id: "A.5.2", isoControl: "Revisión de las políticas de seguridad", sagrilaftReq: "Art. 9.2 – Revisión periódica del PTEE", isoStatus: "green", sagrilaftStatus: "yellow", evidence: "Última revisión: 15/Jul/2026. SAGRILAFT requiere validación del Oficial de Cumplimiento.", source: "Google Workspace", confidence: 0.72 },
  { id: "A.6.1", isoControl: "Organización interna – Roles y responsabilidades", sagrilaftReq: "Art. 9.3 – Designación de Oficial de Cumplimiento", isoStatus: "green", sagrilaftStatus: "green", evidence: "Rol de CISO mapeado. Oficial de Cumplimiento designado: María López (acta junta #47).", source: "Microsoft 365", confidence: 0.94 },
  { id: "A.8.1", isoControl: "Inventario de activos de información", sagrilaftReq: "Art. 9.5 – Inventario de riesgos y activos críticos", isoStatus: "green", sagrilaftStatus: "green", evidence: "347 activos catalogados desde AWS + GitHub. Clasificación automática por criticidad.", source: "AWS + GitHub", confidence: 0.98 },
  { id: "A.8.2", isoControl: "Clasificación de la información", sagrilaftReq: "Art. 9.6 – Segmentación de factores de riesgo", isoStatus: "yellow", sagrilaftStatus: "yellow", evidence: "Clasificación parcial. 23 repositorios sin etiqueta de sensibilidad. Requiere revisión humana.", source: "GitHub", confidence: 0.61 },
  { id: "A.9.1", isoControl: "Control de acceso – Política", sagrilaftReq: "Art. 9.4 – Controles de acceso a información sensible LA/FT", isoStatus: "green", sagrilaftStatus: "green", evidence: "IAM policies verificadas. MFA activo en 100% de cuentas privilegiadas.", source: "AWS IAM", confidence: 0.99 },
  { id: "A.9.2", isoControl: "Gestión de acceso de usuarios", sagrilaftReq: "Art. 9.9.1 – Trazabilidad de accesos a reportes PTEE", isoStatus: "green", sagrilaftStatus: "yellow", evidence: "Accesos AWS trazados. Falta vincular logs de acceso al módulo PTEE de SuperSociedades.", source: "AWS CloudTrail", confidence: 0.78 },
  { id: "A.10.1", isoControl: "Controles criptográficos", sagrilaftReq: "Art. 9.7 – Protección de datos de contrapartes", isoStatus: "green", sagrilaftStatus: "green", evidence: "TLS 1.3 en tránsito, AES-256 en reposo. Certificados válidos hasta 2027.", source: "AWS ACM", confidence: 0.97 },
  { id: "A.12.4", isoControl: "Registro y monitoreo de eventos", sagrilaftReq: "Art. 9.8 – Monitoreo de operaciones inusuales", isoStatus: "yellow", sagrilaftStatus: "red", evidence: "CloudWatch activo pero sin reglas de detección de operaciones inusuales LA/FT configuradas.", source: "AWS CloudWatch", confidence: 0.45 },
  { id: "A.14.2", isoControl: "Seguridad en procesos de desarrollo", sagrilaftReq: "N/A – Sin mapeo directo", isoStatus: "green", sagrilaftStatus: "na", evidence: "Branch protection activo. Code review obligatorio. SAST/DAST integrado en CI/CD.", source: "GitHub Actions", confidence: 0.95 },
  { id: "A.15.1", isoControl: "Seguridad en relaciones con proveedores", sagrilaftReq: "Art. 9.9.2 – Due Diligence de contrapartes", isoStatus: "yellow", sagrilaftStatus: "red", evidence: "3 de 12 proveedores sin evaluación de riesgo LA/FT. No hay integración con listas restrictivas.", source: "Manual", confidence: 0.38 },
  { id: "A.18.1", isoControl: "Cumplimiento de requisitos legales", sagrilaftReq: "Art. 9.10 – Reporte a UIAF y SuperSociedades", isoStatus: "yellow", sagrilaftStatus: "red", evidence: "Sin canal automatizado de reporte a UIAF. Proceso actual es manual vía correo.", source: "Manual", confidence: 0.29 },
];

const AGENT_TIMELINE = [
  { time: "00:00", action: "Inicio de auditoría agéntica", detail: "Perfil de TechCo Solutions cargado. Marcos detectados: ISO 27001, SAGRILAFT Cap. IX, ISO 9001.", type: "system", band: null, source: null },
  { time: "00:03", action: "Conectando con AWS (us-east-1)", detail: "Autenticación vía AssumeRole. Permisos de solo lectura verificados. Cuenta: 491***892.", type: "connector", band: "green", source: "AWS" },
  { time: "00:05", action: "Escaneando IAM Policies", detail: "47 políticas analizadas. MFA enforcement: ACTIVO. Root account MFA: ACTIVO. 0 access keys rotadas > 90 días.", type: "audit", band: "green", source: "AWS" },
  { time: "00:08", action: "Verificando cifrado en reposo", detail: "S3 buckets: 23/23 con SSE-S3. RDS instances: 4/4 con AES-256. EBS volumes: 12/12 encrypted.", type: "audit", band: "green", source: "AWS" },
  { time: "00:12", action: "Conectando con GitHub (org: techco-solutions)", detail: "OAuth App autorizada. 34 repositorios detectados en la organización.", type: "connector", band: "green", source: "GitHub" },
  { time: "00:15", action: "Auditando branch protection rules", detail: "28/34 repos con branch protection. 6 repos sin protección (3 archivados, 3 activos). Alerta generada.", type: "audit", band: "yellow", source: "GitHub" },
  { time: "00:18", action: "Verificando secrets en código", detail: "Scan de 34 repos completado. 0 secrets expuestos. Dependabot activo en 31/34 repos.", type: "audit", band: "green", source: "GitHub" },
  { time: "00:22", action: "Conectando con Google Workspace", detail: "Service account autenticado. Dominio: techco.com.co. 134 usuarios activos.", type: "connector", band: "green", source: "Google Workspace" },
  { time: "00:25", action: "Extrayendo políticas documentales", detail: "Drive corporativo escaneado. 12 documentos de política encontrados. 8 vigentes, 4 expirados.", type: "audit", band: "yellow", source: "Google Workspace" },
  { time: "00:30", action: "Cruzando controles ISO 27001 × SAGRILAFT", detail: "Matriz de 12 controles cruzados generada. Mapeo automático de equivalencias normativas completado.", type: "analysis", band: "green", source: "RAG Engine" },
  { time: "00:33", action: "⚠️ Alerta: Sin integración UIAF", detail: "No se detectó canal automatizado de reporte a la UIAF. Riesgo regulatorio ALTO para Capítulo IX. Requiere intervención humana.", type: "alert", band: "red", source: "SAGRILAFT" },
  { time: "00:35", action: "⚠️ Alerta: Due Diligence incompleto", detail: "3 proveedores sin evaluación LA/FT (Proveedor #4, #8, #11). Sin consulta a listas restrictivas OFAC/ONU.", type: "alert", band: "red", source: "SAGRILAFT" },
  { time: "00:38", action: "Generando Confidence Scoring final", detail: "ISO 27001: 78% (Banda Verde parcial). SAGRILAFT: 52% (Banda Amarilla). Score combinado: 65%.", type: "analysis", band: "yellow", source: "TrustShield Engine" },
  { time: "00:40", action: "Carpeta de evidencias SECOP II generada", detail: "42 evidencias compiladas. 28 automatizadas (Banda Verde), 8 pendientes de validación (Banda Amarilla), 6 críticas (Banda Roja).", type: "system", band: "green", source: null },
];

// ─── STYLES ──────────────────────────────────────────────────────────────────

const colors = {
  bg: "#0B0F1A",
  bgCard: "#111827",
  bgCardHover: "#1a2235",
  bgSidebar: "#070B14",
  border: "#1E293B",
  borderLight: "#334155",
  text: "#E2E8F0",
  textMuted: "#94A3B8",
  textDim: "#64748B",
  cyan: "#06B6D4",
  cyanDark: "#0E7490",
  cyanGlow: "rgba(6, 182, 212, 0.15)",
  green: "#10B981",
  greenDark: "#065F46",
  greenGlow: "rgba(16, 185, 129, 0.12)",
  amber: "#F59E0B",
  amberDark: "#92400E",
  amberGlow: "rgba(245, 158, 11, 0.12)",
  red: "#EF4444",
  redDark: "#991B1B",
  redGlow: "rgba(239, 68, 68, 0.12)",
  purple: "#8B5CF6",
};

const bandColor = (band) => {
  if (band === "green") return colors.green;
  if (band === "yellow") return colors.amber;
  if (band === "red") return colors.red;
  return colors.textDim;
};

const bandBg = (band) => {
  if (band === "green") return colors.greenGlow;
  if (band === "yellow") return colors.amberGlow;
  if (band === "red") return colors.redGlow;
  return "transparent";
};

const statusLabel = (s) => {
  if (s === "green") return "Automatizado";
  if (s === "yellow") return "Validación requerida";
  if (s === "red") return "Sin evidencia";
  if (s === "na") return "N/A";
  return s;
};

const StatusDot = ({ status, size = 8 }) => (
  <span style={{
    display: "inline-block",
    width: size, height: size,
    borderRadius: "50%",
    backgroundColor: status === "na" ? colors.textDim : bandColor(status === "yellow" ? "yellow" : status),
    boxShadow: status !== "na" ? `0 0 6px ${bandColor(status === "yellow" ? "yellow" : status)}` : "none",
  }} />
);

// ─── COMPONENTS ──────────────────────────────────────────────────────────────

function Sidebar({ active, onNavigate }) {
  const items = [
    { id: "onboarding", label: "Onboarding Agéntico", icon: Target },
    { id: "matrix", label: "Matriz Cruzada", icon: Layers },
    { id: "agent", label: "Agente Auditor", icon: Activity },
    { id: "report", label: "Reporte SECOP II", icon: FileText },
  ];
  return (
    <div style={{
      width: 260, minHeight: "100vh", background: colors.bgSidebar,
      borderRight: `1px solid ${colors.border}`, display: "flex", flexDirection: "column",
      padding: "0", position: "fixed", left: 0, top: 0, zIndex: 10,
    }}>
      <div style={{ padding: "24px 20px 20px", borderBottom: `1px solid ${colors.border}` }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{
            width: 36, height: 36, borderRadius: 8, background: `linear-gradient(135deg, ${colors.cyan}, ${colors.purple})`,
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <Shield size={20} color="#fff" />
          </div>
          <div>
            <div style={{ color: colors.text, fontWeight: 700, fontSize: 15, letterSpacing: "-0.02em" }}>TrustShield</div>
            <div style={{ color: colors.cyan, fontSize: 11, fontWeight: 500, letterSpacing: "0.05em", textTransform: "uppercase" }}>AI-Native GRC</div>
          </div>
        </div>
      </div>

      <div style={{ padding: "16px 12px", flex: 1 }}>
        <div style={{ color: colors.textDim, fontSize: 10, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", padding: "0 8px 8px", marginBottom: 4 }}>
          Centro de Confianza
        </div>
        {items.map((item) => {
          const Icon = item.icon;
          const isActive = active === item.id;
          return (
            <button key={item.id} onClick={() => onNavigate(item.id)} style={{
              width: "100%", display: "flex", alignItems: "center", gap: 10,
              padding: "10px 12px", borderRadius: 8, border: "none", cursor: "pointer",
              background: isActive ? colors.cyanGlow : "transparent",
              color: isActive ? colors.cyan : colors.textMuted,
              fontSize: 13, fontWeight: isActive ? 600 : 400,
              marginBottom: 2, transition: "all 0.15s",
              textAlign: "left", fontFamily: "inherit",
            }}>
              <Icon size={16} />
              {item.label}
            </button>
          );
        })}
      </div>

      <div style={{ padding: "16px 20px", borderTop: `1px solid ${colors.border}` }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div style={{
            width: 28, height: 28, borderRadius: 6,
            background: colors.bgCard, border: `1px solid ${colors.border}`,
            display: "flex", alignItems: "center", justifyContent: "center",
            color: colors.textMuted, fontSize: 11, fontWeight: 600,
          }}>TC</div>
          <div>
            <div style={{ color: colors.text, fontSize: 12, fontWeight: 500 }}>TechCo Solutions</div>
            <div style={{ color: colors.textDim, fontSize: 10 }}>Plan Tier 2 · Orquestador</div>
          </div>
        </div>
      </div>
    </div>
  );
}

function PageHeader({ title, subtitle, children }) {
  return (
    <div style={{ marginBottom: 28 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <div>
          <h1 style={{ color: colors.text, fontSize: 22, fontWeight: 700, margin: 0, letterSpacing: "-0.02em" }}>{title}</h1>
          {subtitle && <p style={{ color: colors.textMuted, fontSize: 13, marginTop: 6, lineHeight: 1.5 }}>{subtitle}</p>}
        </div>
        {children}
      </div>
    </div>
  );
}

function Card({ children, style = {}, glow = null }) {
  return (
    <div style={{
      background: colors.bgCard, border: `1px solid ${colors.border}`,
      borderRadius: 10, padding: 20,
      ...(glow ? { boxShadow: `0 0 20px ${glow}` } : {}),
      ...style,
    }}>{children}</div>
  );
}

function Badge({ color, bg, children }) {
  return (
    <span style={{
      display: "inline-flex", alignItems: "center", gap: 4,
      padding: "3px 10px", borderRadius: 20, fontSize: 11, fontWeight: 600,
      color: color, background: bg, letterSpacing: "0.01em",
    }}>{children}</span>
  );
}

function MetricCard({ label, value, sub, color = colors.cyan }) {
  return (
    <Card>
      <div style={{ color: colors.textDim, fontSize: 11, fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.05em" }}>{label}</div>
      <div style={{ color, fontSize: 30, fontWeight: 700, marginTop: 6, letterSpacing: "-0.03em", fontVariantNumeric: "tabular-nums" }}>{value}</div>
      {sub && <div style={{ color: colors.textMuted, fontSize: 12, marginTop: 4 }}>{sub}</div>}
    </Card>
  );
}

// ─── SCREEN 1: ONBOARDING ────────────────────────────────────────────────────

function OnboardingScreen() {
  const [step, setStep] = useState(0);
  const [company] = useState(COMPANY_DEFAULTS);

  useEffect(() => {
    if (step < 3) {
      const t = setTimeout(() => setStep(s => s + 1), 1200);
      return () => clearTimeout(t);
    }
  }, [step]);

  return (
    <div>
      <PageHeader
        title="Onboarding Agéntico"
        subtitle="El agente analiza el perfil de la organización y determina automáticamente los marcos normativos aplicables y los conectores necesarios."
      />

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 24 }}>
        <Card>
          <div style={{ color: colors.textDim, fontSize: 11, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 14 }}>Perfil Organizacional</div>
          {[
            ["Razón Social", company.name],
            ["NIT", company.nit],
            ["Sector", company.sector],
            ["Empleados", company.employees],
            ["Licita en SECOP II", company.licitaSECOP ? "Sí" : "No"],
            ["Sujeto Obligado SuperSociedades", company.sujetoObligado ? "Sí" : "No"],
          ].map(([k, v]) => (
            <div key={k} style={{ display: "flex", justifyContent: "space-between", padding: "7px 0", borderBottom: `1px solid ${colors.border}` }}>
              <span style={{ color: colors.textMuted, fontSize: 13 }}>{k}</span>
              <span style={{ color: colors.text, fontSize: 13, fontWeight: 500 }}>{String(v)}</span>
            </div>
          ))}
        </Card>

        <Card>
          <div style={{ color: colors.textDim, fontSize: 11, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 14 }}>Conectores Detectados</div>
          {company.connectors.map((c) => {
            const icons = { AWS: Cloud, GitHub: Github, "Google Workspace": Mail, "Microsoft 365": Server };
            const Icon = icons[c] || Cloud;
            return (
              <div key={c} style={{
                display: "flex", alignItems: "center", gap: 10, padding: "10px 12px",
                background: colors.cyanGlow, borderRadius: 8, marginBottom: 8,
                border: `1px solid ${colors.cyanDark}33`,
              }}>
                <Icon size={16} color={colors.cyan} />
                <span style={{ color: colors.text, fontSize: 13, fontWeight: 500, flex: 1 }}>{c}</span>
                <Badge color={colors.green} bg={colors.greenGlow}>
                  <StatusDot status="green" size={6} /> Conectado
                </Badge>
              </div>
            );
          })}
        </Card>
      </div>

      <Card glow={colors.cyanGlow} style={{ borderColor: `${colors.cyan}33` }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
          <Zap size={16} color={colors.cyan} />
          <span style={{ color: colors.cyan, fontSize: 13, fontWeight: 600 }}>Análisis del Agente — Marcos Normativos Aplicables</span>
        </div>
        {FRAMEWORKS_DETECTED.map((fw, i) => (
          <div key={fw.id} style={{
            display: "flex", alignItems: "flex-start", gap: 12, padding: "14px 0",
            borderTop: i > 0 ? `1px solid ${colors.border}` : "none",
            opacity: step > i ? 1 : 0.3, transition: "opacity 0.5s",
          }}>
            <div style={{ fontSize: 22, marginTop: 2 }}>{fw.icon}</div>
            <div style={{ flex: 1 }}>
              <div style={{ color: colors.text, fontSize: 14, fontWeight: 600 }}>{fw.name}</div>
              <div style={{ color: colors.textMuted, fontSize: 12, marginTop: 3, lineHeight: 1.5 }}>{fw.reason}</div>
            </div>
            {step > i && (
              <Badge color={colors.green} bg={colors.greenGlow}>Detectado</Badge>
            )}
          </div>
        ))}
        {step >= 3 && (
          <div style={{
            marginTop: 16, padding: "12px 16px", borderRadius: 8,
            background: `linear-gradient(135deg, ${colors.cyanGlow}, ${colors.greenGlow})`,
            border: `1px solid ${colors.cyan}33`,
            color: colors.text, fontSize: 13, lineHeight: 1.6,
          }}>
            <strong style={{ color: colors.cyan }}>Resultado del Curador Modular:</strong> TechCo Solutions requiere cumplimiento simultáneo de 3 marcos normativos. El agente ha ensamblado automáticamente los módulos de auditoría ISO 27001 (Anexo A), SAGRILAFT/Capítulo IX y ISO 9001, junto con 4 conectores de infraestructura para recolección automatizada de evidencias.
          </div>
        )}
      </Card>
    </div>
  );
}

// ─── SCREEN 2: MATRIX ────────────────────────────────────────────────────────

function MatrixScreen() {
  const [expanded, setExpanded] = useState(null);
  const greens = CONTROLS_MATRIX.filter(c => c.isoStatus === "green" && (c.sagrilaftStatus === "green" || c.sagrilaftStatus === "na")).length;
  const yellows = CONTROLS_MATRIX.filter(c => c.isoStatus === "yellow" || c.sagrilaftStatus === "yellow").length;
  const reds = CONTROLS_MATRIX.filter(c => c.sagrilaftStatus === "red").length;

  return (
    <div>
      <PageHeader
        title="Matriz de Cumplimiento Cruzada"
        subtitle="Vista unificada ISO 27001 × SAGRILAFT/Capítulo IX — El diferenciador que las plataformas globales no ofrecen para el mercado colombiano."
      />

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: 12, marginBottom: 24 }}>
        <MetricCard label="Controles mapeados" value="12" sub="ISO 27001 Anexo A" />
        <MetricCard label="Banda Verde" value={greens} sub="Evidencia automatizada" color={colors.green} />
        <MetricCard label="Banda Amarilla" value={yellows} sub="Validación humana" color={colors.amber} />
        <MetricCard label="Banda Roja" value={reds} sub="Sin evidencia" color={colors.red} />
      </div>

      <Card style={{ padding: 0, overflow: "hidden" }}>
        <div style={{
          display: "grid", gridTemplateColumns: "70px 1fr 1fr 90px 90px 60px",
          padding: "12px 16px", background: colors.bgSidebar,
          borderBottom: `1px solid ${colors.border}`,
          fontSize: 10, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em", color: colors.textDim,
        }}>
          <div>Control</div>
          <div>ISO 27001</div>
          <div>SAGRILAFT / Cap. IX</div>
          <div style={{ textAlign: "center" }}>ISO</div>
          <div style={{ textAlign: "center" }}>SAGR.</div>
          <div style={{ textAlign: "center" }}>Conf.</div>
        </div>

        {CONTROLS_MATRIX.map((row) => (
          <div key={row.id}>
            <div
              onClick={() => setExpanded(expanded === row.id ? null : row.id)}
              style={{
                display: "grid", gridTemplateColumns: "70px 1fr 1fr 90px 90px 60px",
                padding: "12px 16px", alignItems: "center",
                borderBottom: `1px solid ${colors.border}`,
                cursor: "pointer", transition: "background 0.15s",
                background: expanded === row.id ? colors.bgCardHover : "transparent",
              }}
            >
              <div style={{ color: colors.cyan, fontSize: 12, fontWeight: 600, fontFamily: "monospace" }}>{row.id}</div>
              <div style={{ color: colors.text, fontSize: 12.5, paddingRight: 12 }}>{row.isoControl}</div>
              <div style={{ color: colors.textMuted, fontSize: 12, paddingRight: 12 }}>{row.sagrilaftReq}</div>
              <div style={{ textAlign: "center" }}><Badge color={bandColor(row.isoStatus)} bg={bandBg(row.isoStatus)}><StatusDot status={row.isoStatus} size={6} /> {statusLabel(row.isoStatus).split(" ")[0]}</Badge></div>
              <div style={{ textAlign: "center" }}><Badge color={bandColor(row.sagrilaftStatus)} bg={bandBg(row.sagrilaftStatus)}><StatusDot status={row.sagrilaftStatus} size={6} /> {statusLabel(row.sagrilaftStatus).split(" ")[0]}</Badge></div>
              <div style={{ textAlign: "center", color: bandColor(row.confidence >= 0.8 ? "green" : row.confidence >= 0.6 ? "yellow" : "red"), fontSize: 13, fontWeight: 700, fontFamily: "monospace" }}>
                {Math.round(row.confidence * 100)}%
              </div>
            </div>
            {expanded === row.id && (
              <div style={{
                padding: "14px 16px 14px 86px", background: colors.bgCardHover,
                borderBottom: `1px solid ${colors.border}`,
              }}>
                <div style={{ color: colors.textMuted, fontSize: 12, lineHeight: 1.6, marginBottom: 8 }}>
                  <strong style={{ color: colors.text }}>Evidencia:</strong> {row.evidence}
                </div>
                <div style={{ display: "flex", gap: 12 }}>
                  <Badge color={colors.cyan} bg={colors.cyanGlow}>Fuente: {row.source}</Badge>
                  <Badge color={bandColor(row.confidence >= 0.8 ? "green" : row.confidence >= 0.6 ? "yellow" : "red")} bg={bandBg(row.confidence >= 0.8 ? "green" : row.confidence >= 0.6 ? "yellow" : "red")}>
                    Confianza: {Math.round(row.confidence * 100)}%
                  </Badge>
                </div>
              </div>
            )}
          </div>
        ))}
      </Card>
    </div>
  );
}

// ─── SCREEN 3: AGENT ─────────────────────────────────────────────────────────

function AgentScreen() {
  const [visibleCount, setVisibleCount] = useState(3);

  useEffect(() => {
    if (visibleCount < AGENT_TIMELINE.length) {
      const t = setTimeout(() => setVisibleCount(c => c + 1), 600);
      return () => clearTimeout(t);
    }
  }, [visibleCount]);

  const typeColors = {
    system: colors.textDim,
    connector: colors.cyan,
    audit: colors.purple,
    analysis: colors.cyan,
    alert: colors.red,
  };

  const typeLabels = {
    system: "SISTEMA",
    connector: "CONECTOR",
    audit: "AUDITORÍA",
    analysis: "ANÁLISIS",
    alert: "ALERTA",
  };

  return (
    <div>
      <PageHeader
        title="Simulación del Agente Auditor"
        subtitle="Timeline de acciones ejecutadas por el agente contra la infraestructura de TechCo Solutions. Cada acción incluye la banda de confianza asignada."
      >
        <Badge color={colors.green} bg={colors.greenGlow}>
          <Activity size={12} /> Auditoría completada en 40s
        </Badge>
      </PageHeader>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 320px", gap: 16 }}>
        <Card style={{ padding: 0, maxHeight: 620, overflowY: "auto" }}>
          {AGENT_TIMELINE.slice(0, visibleCount).map((entry, i) => (
            <div key={i} style={{
              display: "flex", gap: 14, padding: "14px 18px",
              borderBottom: `1px solid ${colors.border}`,
              opacity: i < visibleCount ? 1 : 0.3, transition: "opacity 0.4s",
              background: entry.type === "alert" ? colors.redGlow : "transparent",
            }}>
              <div style={{ minWidth: 48 }}>
                <div style={{ color: colors.textDim, fontSize: 11, fontFamily: "monospace", fontWeight: 600 }}>{entry.time}</div>
                {entry.band && (
                  <div style={{
                    width: 8, height: 8, borderRadius: "50%", marginTop: 6, marginLeft: 16,
                    background: bandColor(entry.band === "yellow" ? "yellow" : entry.band),
                    boxShadow: `0 0 8px ${bandColor(entry.band === "yellow" ? "yellow" : entry.band)}`,
                  }} />
                )}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                  <span style={{
                    fontSize: 9, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em",
                    color: typeColors[entry.type], padding: "2px 6px", borderRadius: 4,
                    background: `${typeColors[entry.type]}15`,
                  }}>{typeLabels[entry.type]}</span>
                  {entry.source && (
                    <span style={{ fontSize: 10, color: colors.textDim }}>{entry.source}</span>
                  )}
                </div>
                <div style={{ color: colors.text, fontSize: 13, fontWeight: 600, marginBottom: 3 }}>{entry.action}</div>
                <div style={{ color: colors.textMuted, fontSize: 12, lineHeight: 1.5 }}>{entry.detail}</div>
              </div>
            </div>
          ))}
          {visibleCount < AGENT_TIMELINE.length && (
            <div style={{ padding: 16, textAlign: "center" }}>
              <div style={{ display: "inline-flex", alignItems: "center", gap: 6, color: colors.cyan, fontSize: 12 }}>
                <span style={{
                  width: 6, height: 6, borderRadius: "50%", background: colors.cyan,
                  animation: "pulse 1.5s infinite",
                }} />
                Agente procesando...
              </div>
            </div>
          )}
        </Card>

        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <Card>
            <div style={{ color: colors.textDim, fontSize: 10, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 12 }}>Resumen de Bandas</div>
            {[
              { band: "green", label: "Banda Verde — Autónomo", count: AGENT_TIMELINE.filter(e => e.band === "green").length, desc: "Acciones deterministas ejecutadas sin intervención" },
              { band: "yellow", label: "Banda Amarilla — Validación", count: AGENT_TIMELINE.filter(e => e.band === "yellow").length, desc: "Requiere revisión del Oficial de Cumplimiento" },
              { band: "red", label: "Banda Roja — Crítico", count: AGENT_TIMELINE.filter(e => e.band === "red").length, desc: "Gaps regulatorios sin cobertura" },
            ].map(({ band, label, count, desc }) => (
              <div key={band} style={{ padding: "10px 12px", borderRadius: 8, background: bandBg(band), marginBottom: 8, border: `1px solid ${bandColor(band)}22` }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ color: bandColor(band), fontSize: 12, fontWeight: 600 }}>{label}</span>
                  <span style={{ color: bandColor(band), fontSize: 18, fontWeight: 700, fontFamily: "monospace" }}>{count}</span>
                </div>
                <div style={{ color: colors.textMuted, fontSize: 11, marginTop: 3 }}>{desc}</div>
              </div>
            ))}
          </Card>

          <Card>
            <div style={{ color: colors.textDim, fontSize: 10, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 12 }}>Fuentes Auditadas</div>
            {["AWS", "GitHub", "Google Workspace", "RAG Engine", "SAGRILAFT", "TrustShield Engine"].map(s => (
              <div key={s} style={{ display: "flex", alignItems: "center", gap: 8, padding: "6px 0", borderBottom: `1px solid ${colors.border}` }}>
                <StatusDot status="green" size={6} />
                <span style={{ color: colors.text, fontSize: 12 }}>{s}</span>
              </div>
            ))}
          </Card>
        </div>
      </div>
    </div>
  );
}

// ─── SCREEN 4: REPORT ────────────────────────────────────────────────────────

function ReportScreen() {
  const isoScore = 78;
  const sagrilaftScore = 52;
  const combinedScore = 65;

  const ScoreRing = ({ score, label, size = 100, color }) => {
    const circumference = 2 * Math.PI * 38;
    const offset = circumference - (score / 100) * circumference;
    return (
      <div style={{ textAlign: "center" }}>
        <svg width={size} height={size} viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="38" fill="none" stroke={colors.border} strokeWidth="6" />
          <circle cx="50" cy="50" r="38" fill="none" stroke={color} strokeWidth="6"
            strokeDasharray={circumference} strokeDashoffset={offset}
            strokeLinecap="round" transform="rotate(-90 50 50)"
            style={{ transition: "stroke-dashoffset 1s ease" }}
          />
          <text x="50" y="47" textAnchor="middle" fill={color} fontSize="22" fontWeight="700" fontFamily="monospace">{score}%</text>
          <text x="50" y="62" textAnchor="middle" fill={colors.textDim} fontSize="8" fontWeight="500">{label}</text>
        </svg>
      </div>
    );
  };

  return (
    <div>
      <PageHeader
        title="Reporte SECOP II Ready"
        subtitle="Carpeta de evidencias automatizada lista para anexar a pliegos de licitación. Formato compatible con requisitos de Colombia Compra Eficiente."
      >
        <div style={{
          padding: "8px 16px", borderRadius: 8, cursor: "pointer",
          background: `linear-gradient(135deg, ${colors.cyan}, ${colors.purple})`,
          color: "#fff", fontSize: 13, fontWeight: 600,
          display: "flex", alignItems: "center", gap: 6,
        }}>
          <FileText size={14} /> Exportar Carpeta PDF
        </div>
      </PageHeader>

      <Card glow={colors.cyanGlow} style={{ borderColor: `${colors.cyan}33`, marginBottom: 20 }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div>
            <div style={{ color: colors.text, fontSize: 16, fontWeight: 700 }}>Carpeta de Evidencias — TechCo Solutions S.A.S.</div>
            <div style={{ color: colors.textMuted, fontSize: 12, marginTop: 4 }}>
              Generada: 9 de agosto de 2026 · Auditoría agéntica #TS-2026-0847 · Marcos: ISO 27001 + SAGRILAFT Cap. IX
            </div>
          </div>
          <div style={{ display: "flex", gap: 20 }}>
            <ScoreRing score={isoScore} label="ISO 27001" color={colors.green} />
            <ScoreRing score={sagrilaftScore} label="SAGRILAFT" color={colors.amber} />
            <ScoreRing score={combinedScore} label="Combinado" color={colors.cyan} />
          </div>
        </div>
      </Card>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 20 }}>
        <Card>
          <div style={{ color: colors.textDim, fontSize: 10, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 14 }}>
            Resumen Ejecutivo para Comité de Licitaciones
          </div>
          <div style={{ color: colors.text, fontSize: 13, lineHeight: 1.7 }}>
            TechCo Solutions S.A.S. presenta un nivel de cumplimiento <strong style={{ color: colors.green }}>aceptable (78%)</strong> en
            controles ISO 27001:2022 gracias a una infraestructura cloud bien configurada en AWS con cifrado, MFA y monitoreo activo.
          </div>
          <div style={{ color: colors.text, fontSize: 13, lineHeight: 1.7, marginTop: 10 }}>
            Sin embargo, el cumplimiento SAGRILAFT/Capítulo IX presenta <strong style={{ color: colors.amber }}>brechas significativas (52%)</strong>,
            particularmente en la integración con canales de reporte UIAF, due diligence automatizado de contrapartes y monitoreo de operaciones inusuales.
          </div>
          <div style={{
            marginTop: 14, padding: "10px 14px", borderRadius: 6,
            background: colors.amberGlow, border: `1px solid ${colors.amber}22`,
            color: colors.amber, fontSize: 12, fontWeight: 500,
          }}>
            ⚠️ Recomendación: Resolver 3 controles Banda Roja antes de presentar pliego SECOP II para reducir riesgo de descalificación.
          </div>
        </Card>

        <Card>
          <div style={{ color: colors.textDim, fontSize: 10, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 14 }}>
            Desglose de Evidencias por Tipo
          </div>
          {[
            { label: "Evidencias automatizadas (Banda Verde)", count: 28, total: 42, color: colors.green },
            { label: "Pendientes de validación humana (Banda Amarilla)", count: 8, total: 42, color: colors.amber },
            { label: "Gaps críticos sin evidencia (Banda Roja)", count: 6, total: 42, color: colors.red },
          ].map(({ label, count, total, color }) => (
            <div key={label} style={{ marginBottom: 16 }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                <span style={{ color: colors.textMuted, fontSize: 12 }}>{label}</span>
                <span style={{ color, fontSize: 13, fontWeight: 700, fontFamily: "monospace" }}>{count}/{total}</span>
              </div>
              <div style={{ height: 6, borderRadius: 3, background: colors.border }}>
                <div style={{
                  height: "100%", borderRadius: 3, background: color,
                  width: `${(count / total) * 100}%`, transition: "width 1s ease",
                  boxShadow: `0 0 8px ${color}44`,
                }} />
              </div>
            </div>
          ))}

          <div style={{ marginTop: 8, padding: "10px 14px", borderRadius: 6, background: colors.bgSidebar }}>
            <div style={{ color: colors.textDim, fontSize: 10, fontWeight: 600, marginBottom: 8, textTransform: "uppercase", letterSpacing: "0.05em" }}>Anexos Generados</div>
            {[
              "Anexo A — Matriz de controles ISO 27001 con evidencias",
              "Anexo B — Reporte SAGRILAFT / Capítulo IX",
              "Anexo C — Inventario de activos y clasificación",
              "Anexo D — Logs de auditoría AWS CloudTrail",
              "Anexo E — Certificados criptográficos vigentes",
            ].map((a, i) => (
              <div key={i} style={{
                display: "flex", alignItems: "center", gap: 8, padding: "5px 0",
                borderBottom: i < 4 ? `1px solid ${colors.border}` : "none",
              }}>
                <FileText size={12} color={colors.cyan} />
                <span style={{ color: colors.text, fontSize: 12 }}>{a}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <Card>
        <div style={{ color: colors.textDim, fontSize: 10, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 14 }}>
          Plan de Remediación Priorizado — Acciones para Banda Roja
        </div>
        {[
          { control: "A.12.4", action: "Configurar reglas de detección de operaciones inusuales LA/FT en CloudWatch", urgency: "Crítica", deadline: "15 días", owner: "CISO + Oficial de Cumplimiento" },
          { control: "A.15.1", action: "Completar Due Diligence LA/FT de 3 proveedores pendientes e integrar consulta a listas OFAC/ONU", urgency: "Crítica", deadline: "20 días", owner: "Oficial de Cumplimiento" },
          { control: "A.18.1", action: "Implementar canal automatizado de reporte a UIAF vía API o SFTP", urgency: "Crítica", deadline: "30 días", owner: "CTO + Legal" },
        ].map((item, i) => (
          <div key={i} style={{
            display: "grid", gridTemplateColumns: "80px 1fr 80px 80px 180px",
            alignItems: "center", padding: "12px 0",
            borderBottom: i < 2 ? `1px solid ${colors.border}` : "none",
          }}>
            <span style={{ color: colors.cyan, fontSize: 12, fontFamily: "monospace", fontWeight: 600 }}>{item.control}</span>
            <span style={{ color: colors.text, fontSize: 12.5 }}>{item.action}</span>
            <Badge color={colors.red} bg={colors.redGlow}>{item.urgency}</Badge>
            <span style={{ color: colors.amber, fontSize: 12, fontWeight: 600, textAlign: "center" }}>{item.deadline}</span>
            <span style={{ color: colors.textMuted, fontSize: 11, textAlign: "right" }}>{item.owner}</span>
          </div>
        ))}
      </Card>
    </div>
  );
}

// ─── MAIN APP ────────────────────────────────────────────────────────────────

export default function App() {
  const [screen, setScreen] = useState("onboarding");

  const screens = {
    onboarding: OnboardingScreen,
    matrix: MatrixScreen,
    agent: AgentScreen,
    report: ReportScreen,
  };

  const ActiveScreen = screens[screen];

  return (
    <div style={{
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
      background: colors.bg, minHeight: "100vh", color: colors.text,
    }}>
      <style>{`
        * { box-sizing: border-box; margin: 0; padding: 0; }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: ${colors.bg}; }
        ::-webkit-scrollbar-thumb { background: ${colors.border}; border-radius: 3px; }
        @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.3; } }
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
      `}</style>
      <Sidebar active={screen} onNavigate={setScreen} />
      <div style={{ marginLeft: 260, padding: "28px 32px" }}>
        <ActiveScreen />
      </div>
    </div>
  );
}
