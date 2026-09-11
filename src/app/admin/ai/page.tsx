import Link from "next/link"

const sections = [
  { label: "Hero Config", href: "/admin/ai/hero-config", desc: "AI platform hero banner" },
  { label: "Site Config", href: "/admin/ai/site-config", desc: "Global site configuration" },
  { label: "Capabilities", href: "/admin/ai/capabilities", desc: "AI capability listings" },
  { label: "Capabilities Config", href: "/admin/ai/capabilities-config", desc: "Capability section settings" },
  { label: "Case Studies", href: "/admin/ai/case-studies", desc: "AI case studies" },
  { label: "Insights", href: "/admin/ai/insights", desc: "AI insights and articles" },
  { label: "Intelligence Suite", href: "/admin/ai/intelligence-suite", desc: "Intelligence suite features" },
  { label: "Platforms", href: "/admin/ai/platforms", desc: "Platform integrations" },
  { label: "Dual Vision", href: "/admin/ai/dual-vision", desc: "Dual vision section" },
  { label: "Assessment Config", href: "/admin/ai/assessment-config", desc: "Assessment tool settings" },
  { label: "About Config", href: "/admin/ai/about-config", desc: "About page content" },
  { label: "Contact Config", href: "/admin/ai/contact-config", desc: "Contact form settings" },
  { label: "COI Config", href: "/admin/ai/coi-config", desc: "COI section settings" },
  { label: "Cost Config", href: "/admin/ai/cost-config", desc: "Pricing / cost section" },
  { label: "ROI Config", href: "/admin/ai/roi-config", desc: "ROI calculator settings" },
]

export default function AiDashboard() {
  return (
    <div style={{ minHeight: "100vh", background: "#F8FAFC", padding: "40px 32px" }}>
      <div style={{ maxWidth: 1000, margin: "0 auto" }}>
        <div style={{ marginBottom: 32 }}>
          <Link href="/admin" style={{ fontSize: 13, color: "#7C3AED", textDecoration: "none", fontWeight: 500 }}>
            ? Back to Hub
          </Link>
        </div>
        <div style={{ marginBottom: 32 }}>
          <span style={{ background: "#EDE9FE", color: "#6D28D9", fontSize: 11, fontWeight: 700, borderRadius: 4, padding: "4px 10px", letterSpacing: "0.1em" }}>AI</span>
          <h1 style={{ fontSize: 30, fontWeight: 800, color: "#0F172A", marginTop: 8, marginBottom: 6 }}>Flowtaris.ai Admin</h1>
          <p style={{ color: "#64748B", fontSize: 14 }}>Edit all sections of the AI intelligence platform.</p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: 16 }}>
          {sections.map(s => (
            <Link key={s.href} href={s.href} style={{ textDecoration: "none" }}>
              <div style={{ background: "#fff", borderRadius: 10, border: "1px solid #E2E8F0", padding: "20px 22px", cursor: "pointer", boxShadow: "0 1px 4px rgba(0,0,0,0.05)" }}>
                <div style={{ fontWeight: 600, color: "#0F172A", fontSize: 15, marginBottom: 4 }}>{s.label}</div>
                <div style={{ fontSize: 12, color: "#94A3B8" }}>{s.desc}</div>
                <div style={{ marginTop: 12, fontSize: 12, fontWeight: 600, color: "#7C3AED" }}>Edit ?</div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
