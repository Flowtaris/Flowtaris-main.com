import Link from "next/link"

const sites = [
  {
    id: "com",
    name: "Flowtaris.com",
    description: "Main commercial website  hero, services, blog, careers, case studies, testimonials and more.",
    href: "/admin/com",
    accentBg: "linear-gradient(135deg, #1D4ED8, #1e3a8a)",
    accent: "#2563EB",
    badge: "PRIMARY",
    sections: ["Hero", "Services", "Blog", "Careers", "Case Studies", "Testimonials", "FAQs", "Settings"],
  },
  {
    id: "co",
    name: "Flowtaris.co",
    description: "Trust infrastructure  principles, leverage, judgment, resources and trust network.",
    href: "/admin/co",
    accentBg: "linear-gradient(135deg, #334155, #0f172a)",
    accent: "#475569",
    badge: "TRUST",
    sections: ["Hero", "Judgment", "Leverage", "Principles", "Resources", "Trust", "Workday"],
  },
  {
    id: "ai",
    name: "Flowtaris.ai",
    description: "AI intelligence platform  capabilities, case studies, insights, and AI configuration.",
    href: "/admin/ai",
    accentBg: "linear-gradient(135deg, #7C3AED, #4c1d95)",
    accent: "#7C3AED",
    badge: "AI",
    sections: ["Hero Config", "Capabilities", "Case Studies", "Insights", "Site Config", "Assessment"],
  },
]

export default function AdminHubPage() {
  return (
    <div style={{ minHeight: "100vh", background: "#F8FAFC", padding: "48px 32px" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div style={{ marginBottom: 48 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8 }}>
            <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#22C55E" }} />
            <span style={{ fontSize: 12, fontWeight: 600, color: "#6B7280", letterSpacing: "0.1em", textTransform: "uppercase" }}>
              Flowtaris Admin Hub
            </span>
          </div>
          <h1 style={{ fontSize: 36, fontWeight: 800, color: "#0F172A", marginBottom: 8 }}>
            Manage All Three Domains
          </h1>
          <p style={{ fontSize: 16, color: "#64748B", maxWidth: 560 }}>
            One login. Full control over flowtaris.com, flowtaris.co, and flowtaris.ai.
            Changes save directly to each domain&apos;s database.
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: 24, marginBottom: 48 }}>
          {sites.map((site) => (
            <Link key={site.id} href={site.href} style={{ textDecoration: "none" }}>
              <div style={{
                borderRadius: 16, overflow: "hidden", border: "1px solid #E2E8F0",
                background: "#fff", boxShadow: "0 2px 8px rgba(0,0,0,0.06)", cursor: "pointer",
              }}>
                <div style={{ background: site.accentBg, padding: "28px 28px 24px", position: "relative" }}>
                  <div style={{
                    position: "absolute", top: 16, right: 16,
                    background: "rgba(255,255,255,0.2)", borderRadius: 6,
                    padding: "4px 10px", fontSize: 10, fontWeight: 700,
                    color: "#fff", letterSpacing: "0.12em",
                  }}>
                    {site.badge}
                  </div>
                  <div style={{ fontSize: 22, fontWeight: 800, color: "#fff", marginBottom: 4 }}>
                    {site.name}
                  </div>
                  <div style={{ fontSize: 13, color: "rgba(255,255,255,0.75)", lineHeight: 1.5 }}>
                    {site.description}
                  </div>
                </div>
                <div style={{ padding: "20px 28px 24px" }}>
                  <div style={{ fontSize: 11, fontWeight: 600, color: "#9CA3AF", letterSpacing: "0.08em", marginBottom: 10 }}>
                    SECTIONS
                  </div>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                    {site.sections.map(s => (
                      <span key={s} style={{
                        fontSize: 12, background: "#F1F5F9", color: "#475569",
                        borderRadius: 4, padding: "4px 8px", fontWeight: 500,
                      }}>
                        {s}
                      </span>
                    ))}
                  </div>
                  <div style={{ marginTop: 20, fontSize: 13, fontWeight: 600, color: site.accent }}>
                    Open Editor ?
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div style={{
          background: "#fff", borderRadius: 12, padding: "16px 24px",
          border: "1px solid #E2E8F0", display: "flex", alignItems: "center", gap: 12,
        }}>
          <span style={{ fontSize: 20 }}>??</span>
          <p style={{ fontSize: 13, color: "#64748B", margin: 0 }}>
            You are authenticated as a Flowtaris admin. All changes are written directly to each domain&apos;s Supabase database.
          </p>
        </div>
      </div>
    </div>
  )
}
