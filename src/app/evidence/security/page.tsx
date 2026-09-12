"use client";

import Link from "next/link";

export default function SecurityDossierPage() {
  return (
    <>
      {/* Contextual Navigation */}
      <div className="section dl-back-nav" style={{ paddingTop: '24px', paddingBottom: '0' }}>
        <Link href="/evidence" className="view-all" style={{ color: "var(--color-text-secondary)" }}>&larr; EVIDENCE</Link>
        <span className="view-all" style={{ color: "var(--color-text-primary)", marginLeft: '8px' }}>/ SECURITY</span>
      </div>

      {/* Security Hero */}
      <section className="section ev-hero">
        <span className="eyebrow">SECURITY</span>
        <h1 className="section-heading ev-title">HOW WE PROTECT<br />THE SYSTEMS WE OPERATE.</h1>
        <p className="card-description ev-subtitle">
          Controls, policies and operating practices<br />
          behind the security commitments we make to clients.
        </p>
        <div className="ev-stats" style={{ gap: '64px', justifyContent: 'flex-start' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <span className="ev-stat">SECURITY DOCUMENTS</span>
            <span style={{ fontSize: '1.25rem', fontWeight: 500, color: 'var(--color-text-primary)' }}>06</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <span className="ev-stat">LAST REVIEWED</span>
            <span style={{ fontSize: '1.25rem', fontWeight: 500, color: 'var(--color-text-primary)' }}>MAR 2026</span>
          </div>
        </div>
      </section>

      {/* Security At A Glance */}
      <section className="section">
        <h2 className="section-label">SECURITY AT A GLANCE</h2>
        <div className="trust-grid">
          {[
            {
              title: "INFORMATION SECURITY",
              items: ["Policy", "Governance"]
            },
            {
              title: "ACCESS CONTROL",
              items: ["Identity", "Permissions"]
            },
            {
              title: "INCIDENT RESPONSE",
              items: ["Detection", "Escalation"]
            }
          ].map(block => (
            <div key={block.title} className="trust-card" style={{ padding: '48px', backgroundColor: 'var(--color-surface)' }}>
              <h3 className="card-heading" style={{ textTransform: 'uppercase', marginBottom: '24px' }}>{block.title}</h3>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {block.items.map(item => (
                  <li key={item} className="trust-body">{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Security Framework */}
      <section className="section">
        <h2 className="section-label" style={{ marginBottom: '48px' }}>SECURITY FRAMEWORK</h2>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {[
            { num: "01", title: "GOVERN", desc: "Security policies, ownership and accountability." },
            { num: "02", title: "PREVENT", desc: "Access controls, infrastructure controls and operational safeguards." },
            { num: "03", title: "DETECT", desc: "Monitoring, logging and incident identification." },
            { num: "04", title: "RESPOND", desc: "Incident response, escalation and communication." },
            { num: "05", title: "RECOVER", desc: "Business continuity and operational recovery." },
          ].map(stage => (
            <div key={stage.num} style={{ display: 'flex', flexWrap: 'wrap', gap: '24px', alignItems: 'baseline', padding: '32px 0', borderBottom: '1px solid var(--color-structural)' }}>
              <span style={{ fontSize: '1.5rem', fontWeight: 500, color: 'var(--color-accent)', width: '120px' }}>{stage.num} &mdash;</span>
              <span style={{ fontSize: '1.5rem', fontWeight: 500, color: 'var(--color-text-primary)', width: '200px' }}>{stage.title}</span>
              <p className="trust-body" style={{ margin: 0, flex: 1, minWidth: '300px' }}>{stage.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Information Security Panel */}
      <section className="section">
        <div className="ev-panel" style={{ padding: '64px' }}>
          <span className="ev-panel-num">01</span>
          <h2 className="ev-panel-title">INFORMATION SECURITY</h2>
          <p className="ev-panel-desc" style={{ marginBottom: '64px' }}>
            The policies and controls governing how information is handled across Flowtaris systems and operations.
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '64px', marginBottom: '64px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <span className="section-label" style={{ marginBottom: 0 }}>POLICY</span>
              <span className="trust-body" style={{ fontWeight: 500, fontSize: '1.25rem' }}>Information Security Policy</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <span className="section-label" style={{ marginBottom: 0 }}>OWNER</span>
              <span className="trust-body" style={{ fontWeight: 500, fontSize: '1.25rem' }}>CTO / Security</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <span className="section-label" style={{ marginBottom: 0 }}>REVIEW</span>
              <span className="trust-body" style={{ fontWeight: 500, fontSize: '1.25rem' }}>Quarterly</span>
            </div>
          </div>
          <Link href="/evidence/#library" className="judgment-cta">VIEW DOCUMENT &rarr;</Link>
        </div>
      </section>

      {/* Access Control */}
      <section className="section">
        <h2 className="section-heading" style={{ fontSize: '2.5rem', marginBottom: '16px' }}>ACCESS CONTROL</h2>
        <span className="section-label">WHO CAN ACCESS WHAT?</span>
        <p className="card-description" style={{ maxWidth: '700px', marginBottom: '64px' }}>
          Access is governed through defined roles, least-privilege principles and controlled permissions.
        </p>
        
        <div className="trust-grid" style={{ gridTemplateColumns: '1fr 1fr' }}>
          {[
            { title: "IDENTITY", desc: "Authentication and account ownership" },
            { title: "PERMISSIONS", desc: "Role-based access" },
            { title: "REVIEWS", desc: "Periodic access review" },
            { title: "OFFBOARDING", desc: "Access removal when responsibility ends" }
          ].map(item => (
            <div key={item.title} className="trust-card" style={{ padding: '64px' }}>
              <h3 className="card-heading" style={{ textTransform: 'uppercase', marginBottom: '16px' }}>{item.title}</h3>
              <p className="trust-body">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Incident Response */}
      <section className="section">
        <h2 className="section-heading" style={{ fontSize: '2.5rem', marginBottom: '24px' }}>INCIDENT RESPONSE</h2>
        <p className="card-description" style={{ maxWidth: '600px', marginBottom: '64px', textTransform: 'uppercase', color: 'var(--color-text-secondary)' }}>
          WHEN SOMETHING GOES WRONG,<br />THE RESPONSE SHOULD ALREADY BE DEFINED.
        </p>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', borderLeft: '2px solid var(--color-structural)', paddingLeft: '32px', marginLeft: '16px' }}>
          {["DETECT", "TRIAGE", "CONTAIN", "REMEDIATE", "COMMUNICATE", "REVIEW"].map((step, i, arr) => (
            <div key={step} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <span className="card-heading" style={{ textTransform: 'uppercase', fontWeight: 500, letterSpacing: '0.05em' }}>{step}</span>
              {i < arr.length - 1 && <span style={{ color: 'var(--color-accent)', fontSize: '1.25rem' }}>&darr;</span>}
            </div>
          ))}
        </div>
      </section>

      {/* Business Continuity */}
      <section className="section">
        <h2 className="section-heading" style={{ fontSize: '2.5rem', marginBottom: '24px' }}>BUSINESS CONTINUITY</h2>
        <p className="card-description" style={{ maxWidth: '600px', marginBottom: '64px', color: 'var(--color-text-secondary)' }}>
          Operational resilience is not a statement.<br />It is a recovery plan.
        </p>

        <div className="trust-grid">
          {[
            { title: "RTO", desc: "Recovery Time Objective" },
            { title: "RPO", desc: "Recovery Point Objective" },
            { title: "RECOVERY", desc: "Operational recovery procedures" }
          ].map(item => (
            <div key={item.title} className="trust-card" style={{ padding: '64px' }}>
              <h3 className="card-heading" style={{ marginBottom: '16px', fontSize: '1.5rem' }}>{item.title}</h3>
              <p className="trust-body">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Security Documents */}
      <section className="section">
        <h2 className="section-label" style={{ marginBottom: '48px' }}>SECURITY DOCUMENTS</h2>
        <div className="ev-table-container">
          <table className="ev-table">
            <thead>
              <tr>
                <th className="ev-th">DOCUMENT</th>
                <th className="ev-th">UPDATED</th>
                <th className="ev-th" style={{ textAlign: 'right' }}>ACCESS</th>
              </tr>
            </thead>
            <tbody>
              {[
                { name: "Information Security Policy", updated: "MAR 2026", action: "VIEW" },
                { name: "Incident Response Plan", updated: "MAR 2026", action: "VIEW" },
                { name: "Business Continuity Plan", updated: "FEB 2026", action: "VIEW" },
                { name: "Access Control Policy", updated: "FEB 2026", action: "VIEW" },
                { name: "Security Overview", updated: "JAN 2026", action: "VIEW" },
                { name: "SOC 2 Report", updated: "--", action: "REQUEST" }
              ].map((doc, i) => (
                <tr key={i} className="ev-tr">
                  <td className="ev-td ev-td-name" style={{ fontSize: '1.125rem' }}>{doc.name}</td>
                  <td className="ev-td">{doc.updated}</td>
                  <td className="ev-td" style={{ textAlign: 'right' }}>
                    <Link href="/evidence/#library" className="judgment-cta ev-dl-link">{doc.action} &rarr;</Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Document Status */}
      <section className="section" style={{ paddingTop: 0 }}>
        <div style={{ display: 'flex', gap: '48px', flexWrap: 'wrap' }}>
          <span className="section-label" style={{ marginBottom: 0, color: 'var(--color-text-primary)' }}>CURRENT</span>
          <span className="section-label" style={{ marginBottom: 0, color: 'var(--color-accent)' }}>REVIEW DUE</span>
          <span className="section-label" style={{ marginBottom: 0, opacity: 0.6 }}>AVAILABLE ON REQUEST</span>
        </div>
      </section>

      {/* Security Questions */}
      <section className="section" style={{ borderTop: '1px solid var(--color-structural)' }}>
        <h2 className="section-heading" style={{ fontSize: '2rem', marginBottom: '24px' }}>LOOKING FOR SOMETHING SPECIFIC?</h2>
        <p className="card-description" style={{ maxWidth: '700px', marginBottom: '48px' }}>
          Security questionnaires, policies and supporting documentation are available through the Evidence Center.
        </p>
        <Link href="/evidence/#questionnaire" className="judgment-cta">OPEN QUESTIONNAIRE CENTER &rarr;</Link>
      </section>

      {/* Security Principle */}
      <section className="section" style={{ borderTop: '1px solid var(--color-structural)', borderBottom: '1px solid var(--color-structural)' }}>
        <h2 className="section-heading" style={{ fontSize: '3rem', marginBottom: '32px', maxWidth: '900px' }}>
          SECURITY IS AN OPERATING PROPERTY,<br />NOT A SALES CLAIM.
        </h2>
        <p className="card-description" style={{ maxWidth: '600px', marginBottom: '48px' }}>
          See how we make decisions when security and delivery come into conflict.
        </p>
        <Link href="/judgment" className="judgment-cta">READ SECURITY-RELATED DECISIONS &rarr;</Link>
      </section>

      {/* Back to Evidence */}
      <section className="section">
        <div className="dl-prev-next-inner">
          <Link href="/evidence" className="dl-nav-link dl-nav-prev">
            <span className="dl-nav-direction">&larr; BACK TO EVIDENCE</span>
          </Link>
          <div className="dl-nav-link dl-nav-next">
            <span className="dl-nav-direction">NEXT</span>
            <span className="dl-nav-title">LEGAL &rarr;</span>
          </div>
        </div>
      </section>
    </>
  );
}
