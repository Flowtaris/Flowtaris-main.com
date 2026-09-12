"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";

export default function WorkdayAlliancePage() {
  const [filter, setFilter] = useState<string>("ALL");
  const [copiedId, setCopiedId] = useState<number | null>(null);
  const [specialists, setSpecialists] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchSpecialists() {
      if (!supabase) { setLoading(false); return; }
      const { data } = await supabase
        .from("page_content")
        .select("content")
        .eq("id", "workday_specialists")
        .single();
        
      if (data?.content?.specialists) {
        setSpecialists(data.content.specialists);
      }
      setLoading(false);
    }
    fetchSpecialists();
  }, []);

  const handleCopy = (text: string, id: number) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const filteredSpecialists = filter === "ALL" ? specialists : specialists.filter(s => s.specialty === filter);

  return (
    <>
      {/* Contextual Navigation */}
      <div className="section dl-back-nav" style={{ paddingTop: '24px', paddingBottom: '0' }}>
        <Link href="/leverage" className="view-all" style={{ color: "var(--color-text-secondary)" }}>&larr; LEVERAGE</Link>
        <span className="view-all" style={{ color: "var(--color-text-primary)", marginLeft: '8px' }}>/ WORKDAY ALLIANCE</span>
      </div>

      {/* Alliance Hero */}
      <section className="section ev-hero" style={{ paddingTop: '120px' }}>
        <span className="eyebrow">WORKDAY &times; FLOWTARIS</span>
        <h1 className="section-heading ev-title" style={{ maxWidth: '900px' }}>
          INTEGRATION THAT<br />
          HOLDS UP IN THE<br />
          REAL WORLD.
        </h1>
        <p className="card-description ev-subtitle" style={{ maxWidth: '600px', marginTop: '24px' }}>
          Enterprise integration across Workday HCM,<br />
          Finance, and surrounding systems.
        </p>
        
        <div style={{ display: 'flex', gap: '32px', flexWrap: 'wrap', marginTop: '48px' }}>
          <span className="trust-body" style={{ fontWeight: 500, letterSpacing: '0.05em', color: 'var(--color-text-primary)' }}>WORKDAY EXTEND</span>
          <span className="trust-body" style={{ fontWeight: 500, letterSpacing: '0.05em', color: 'var(--color-text-primary)' }}>INTEGRATION CLOUD</span>
          <span className="trust-body" style={{ fontWeight: 500, letterSpacing: '0.05em', color: 'var(--color-text-primary)' }}>EIB</span>
        </div>
      </section>

      {/* Hero Visual: Enterprise Architecture */}
      <section className="section" style={{ paddingTop: '0' }}>
        <div className="ev-panel" style={{ padding: '64px', backgroundColor: 'var(--color-surface)', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <span className="card-heading" style={{ fontSize: '1.5rem', marginBottom: '32px' }}>WORKDAY &times; FLOWTARIS</span>
          
          <div style={{ display: 'flex', gap: '64px', marginBottom: '24px' }}>
            <span className="trust-body" style={{ fontWeight: 500, fontSize: '1.25rem' }}>HCM</span>
            <span className="trust-body" style={{ fontWeight: 500, fontSize: '1.25rem' }}>FINANCE</span>
          </div>
          
          <span style={{ fontSize: '2rem', color: 'var(--color-text-secondary)', marginBottom: '24px' }}>&darr;</span>
          
          <span className="section-heading" style={{ fontSize: '1.5rem', letterSpacing: '0.1em', marginBottom: '24px' }}>INTEGRATION</span>
          
          <span style={{ fontSize: '2rem', color: 'var(--color-text-secondary)', marginBottom: '24px' }}>&darr;</span>
          
          <div style={{ display: 'flex', gap: '64px' }}>
            <span className="trust-body" style={{ fontWeight: 500, fontSize: '1.25rem' }}>ERP</span>
            <span className="trust-body" style={{ fontWeight: 500, fontSize: '1.25rem' }}>DATA</span>
          </div>
        </div>
      </section>

      {/* Partner Status / Alliance Profile */}
      <section className="section" style={{ borderTop: '1px solid var(--color-structural)' }}>
        <h2 className="section-label" style={{ marginBottom: '48px' }}>ALLIANCE PROFILE</h2>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '32px', maxWidth: '800px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', borderBottom: '1px solid var(--color-structural)', paddingBottom: '16px' }}>
            <span className="trust-body" style={{ fontWeight: 500 }}>PARTNER TYPE</span>
            <span style={{ fontWeight: 500, letterSpacing: '0.05em', color: 'var(--color-text-secondary)' }}>WORKDAY ECOSYSTEM</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', borderBottom: '1px solid var(--color-structural)', paddingBottom: '16px' }}>
            <span className="trust-body" style={{ fontWeight: 500 }}>SPECIALIZATION</span>
            <span style={{ fontWeight: 500, letterSpacing: '0.05em', color: 'var(--color-text-secondary)' }}>HCM &middot; FINANCE &middot; INTEGRATION</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', borderBottom: '1px solid var(--color-structural)', paddingBottom: '16px' }}>
            <span className="trust-body" style={{ fontWeight: 500 }}>DELIVERY MODEL</span>
            <span style={{ fontWeight: 500, letterSpacing: '0.05em', color: 'var(--color-text-secondary)' }}>IMPLEMENTATION &middot; INTEGRATION &middot; ENGINEERING</span>
          </div>
        </div>
      </section>

      {/* The Joint Value */}
      <section className="section" style={{ borderTop: '1px solid var(--color-structural)' }}>
        <h2 className="section-label" style={{ marginBottom: '64px' }}>THE JOINT VALUE</h2>
        <div style={{ marginBottom: '64px' }}>
          <h3 className="section-heading" style={{ fontSize: '2.5rem', marginBottom: '16px' }}>WORKDAY IS THE SYSTEM OF RECORD.</h3>
          <h3 className="section-heading" style={{ fontSize: '2.5rem', color: 'var(--color-text-secondary)' }}>FLOWTARIS MAKES THE SURROUNDING<br />SYSTEMS WORK WITH IT.</h3>
        </div>
        
        <div className="trust-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))' }}>
          {[
            { title: "HCM", desc: "Employee Lifecycle Integration" },
            { title: "FINANCE", desc: "Financial Data Integration" },
            { title: "ENTERPRISE", desc: "ERP · CRM\nData Platforms\nCustom Systems" }
          ].map(block => (
            <div key={block.title} className="trust-card" style={{ padding: '48px', display: 'flex', flexDirection: 'column' }}>
              <h4 className="card-heading" style={{ marginBottom: '16px', fontSize: '1.25rem' }}>{block.title}</h4>
              <p className="trust-body" style={{ flexGrow: 1, whiteSpace: 'pre-line', marginBottom: '32px' }}>{block.desc}</p>
              <span style={{ fontSize: '1.5rem', color: 'var(--color-text-primary)' }}>&rarr;</span>
            </div>
          ))}
        </div>
      </section>

      {/* Where Flowtaris Fits */}
      <section className="section" style={{ borderTop: '1px solid var(--color-structural)' }}>
        <h2 className="section-label" style={{ marginBottom: '64px' }}>WHERE FLOWTARIS FITS</h2>
        
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '32px', padding: '64px', border: '1px solid var(--color-structural)', backgroundColor: 'var(--color-surface)', maxWidth: '800px', margin: '0 auto' }}>
          
          <div style={{ textAlign: 'center', width: '100%' }}>
            <span className="section-heading" style={{ display: 'block', marginBottom: '24px', letterSpacing: '0.1em' }}>WORKDAY</span>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', flexWrap: 'wrap' }}>
              {["HCM", "FINANCE", "EXTEND", "INTEGRATION CLOUD", "EIB"].map(sys => (
                <span key={sys} className="trust-body" style={{ padding: '8px 16px', border: '1px solid var(--color-structural)', backgroundColor: 'var(--color-bg)', fontSize: '0.875rem' }}>{sys}</span>
              ))}
            </div>
          </div>
          
          <span style={{ fontSize: '1.5rem', color: 'var(--color-text-secondary)' }}>&darr;</span>
          
          <div style={{ width: '100%', padding: '32px', border: '2px solid var(--color-accent)', textAlign: 'center', backgroundColor: 'var(--color-bg)' }}>
            <span className="card-heading" style={{ letterSpacing: '0.1em', marginBottom: '16px', display: 'block' }}>FLOWTARIS</span>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <span className="trust-body">Integration Engineering</span>
              <span className="trust-body">Application Engineering</span>
              <span className="trust-body">Data Engineering</span>
              <span className="trust-body">Enterprise Architecture</span>
            </div>
          </div>

          <span style={{ fontSize: '1.5rem', color: 'var(--color-text-secondary)' }}>&darr;</span>

          <div style={{ width: '100%', padding: '32px', border: '1px solid var(--color-structural)', textAlign: 'center', backgroundColor: 'var(--color-bg)' }}>
            <span className="section-heading" style={{ display: 'block', marginBottom: '24px', letterSpacing: '0.1em' }}>ENTERPRISE LANDSCAPE</span>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', flexWrap: 'wrap' }}>
              {["ERP", "CRM", "Data Platforms", "Custom Applications", "External Systems"].map(sys => (
                <span key={sys} className="trust-body" style={{ padding: '8px 16px', border: '1px solid var(--color-structural)', backgroundColor: 'var(--color-surface)', fontSize: '0.875rem' }}>{sys}</span>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* Workday Engineering (Extend vs Integration Cloud vs EIB) */}
      <section className="section" style={{ borderTop: '1px solid var(--color-structural)' }}>
        <h2 className="section-heading" style={{ fontSize: '2.5rem', marginBottom: '48px' }}>WORKDAY ENGINEERING</h2>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '64px' }}>
          {[
            { num: "01", title: "WORKDAY EXTEND", tag: "EXTEND \u2192", desc: "When the requirement belongs inside the Workday ecosystem.", subtext: "Use Workday Extend where the experience and logic belong close to the Workday platform." },
            { num: "02", title: "INTEGRATION CLOUD", tag: "INTEGRATION CLOUD \u2192", desc: "When systems need to exchange information reliably.", subtext: "Integration patterns designed around enterprise data movement, orchestration, and operational reliability." },
            { num: "03", title: "EIB", tag: "EIB \u2192", desc: "When the integration pattern calls for Workday's established business-process tooling.", subtext: "Choose the appropriate Workday-native integration mechanism instead of forcing every problem into the same pattern." }
          ].map((cap) => (
            <div key={cap.num} style={{ display: 'flex', flexDirection: 'column', gap: '16px', paddingBottom: '32px', borderBottom: '1px solid var(--color-structural)', maxWidth: '800px' }}>
              <span style={{ fontSize: '1.5rem', fontWeight: 500, color: 'var(--color-text-secondary)' }}>{cap.num}</span>
              <h3 className="section-heading" style={{ fontSize: '2rem', margin: 0 }}>{cap.title}</h3>
              <p className="trust-body" style={{ fontSize: '1.25rem', margin: '8px 0 0 0', color: 'var(--color-text-primary)' }}>{cap.desc}</p>
              <span className="card-heading" style={{ margin: '16px 0', fontSize: '0.875rem', letterSpacing: '0.05em' }}>{cap.tag}</span>
              <p className="trust-body" style={{ color: 'var(--color-text-secondary)' }}>{cap.subtext}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Decision Framework (Table) */}
      <section className="section" style={{ borderTop: '1px solid var(--color-structural)' }}>
        <h2 className="section-label" style={{ marginBottom: '48px' }}>WHICH PATTERN FITS?</h2>
        <div style={{ overflowX: 'auto', paddingBottom: '16px' }}>
          <table className="ev-table" style={{ minWidth: '600px', width: '100%', maxWidth: '900px' }}>
            <thead>
              <tr>
                <th className="ev-th" style={{ textAlign: 'left', width: '50%' }}>REQUIREMENT</th>
                <th className="ev-th" style={{ textAlign: 'left' }}>START HERE</th>
              </tr>
            </thead>
            <tbody>
              {[
                { req: "Extend the Workday experience", ans: "WORKDAY EXTEND" },
                { req: "Move data between systems", ans: "INTEGRATION CLOUD" },
                { req: "Standard Workday integration", ans: "EIB" },
                { req: "Complex enterprise integration", ans: "ARCHITECTURE REVIEW" },
                { req: "Custom application requirement", ans: "APPLICATION ENGINEERING" }
              ].map((row, i) => (
                <tr key={i} className="ev-tr">
                  <td className="ev-td" style={{ fontSize: '1.125rem' }}>{row.req}</td>
                  <td className="ev-td card-heading" style={{ color: 'var(--color-text-secondary)' }}>{row.ans}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Common Enterprise Landscapes */}
      <section className="section" style={{ borderTop: '1px solid var(--color-structural)' }}>
        <h2 className="section-label" style={{ marginBottom: '64px' }}>COMMON LANDSCAPES</h2>
        
        <div className="trust-grid">
          {[
            { 
              title: "WORKDAY HCM", 
              items: ["Payroll", "Identity", "CRM", "Data Platform"] 
            },
            { 
              title: "WORKDAY FINANCE", 
              items: ["ERP", "Procurement", "Billing", "Analytics"] 
            },
            { 
              title: "WORKDAY + ENTERPRISE", 
              items: ["Legacy Systems", "Custom Applications", "Data Warehouse", "Integration Layer"] 
            }
          ].map(landscape => (
            <div key={landscape.title} className="ev-panel" style={{ padding: '48px', backgroundColor: 'var(--color-surface)' }}>
              <h3 className="card-heading" style={{ marginBottom: '24px', letterSpacing: '0.05em' }}>{landscape.title}</h3>
              <span style={{ fontSize: '1.5rem', color: 'var(--color-text-secondary)', display: 'block', marginBottom: '24px' }}>&darr;</span>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {landscape.items.map(item => (
                  <li key={item} className="trust-body">{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Conversation Starters */}
      <section className="section" style={{ borderTop: '1px solid var(--color-structural)' }}>
        <h2 className="section-heading" style={{ fontSize: '2.5rem', marginBottom: '48px' }}>CONVERSATION STARTERS</h2>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '32px', maxWidth: '800px' }}>
          {[
            { id: 1, text: "Your Workday implementation is working -- but the systems around it are becoming the bottleneck." },
            { id: 2, text: "The question isn't whether Workday can integrate with the system. It's which integration pattern makes sense for the operating model." },
            { id: 3, text: "Before adding another integration, let's map what belongs in Workday, what belongs outside it, and where the boundary should sit." }
          ].map((prompt, index) => (
            <div key={prompt.id} className="ev-panel" style={{ padding: '32px', display: 'flex', flexDirection: 'column', gap: '16px', backgroundColor: 'var(--color-bg)' }}>
              <span className="section-label" style={{ margin: 0 }}>0{index + 1}</span>
              <p className="trust-body" style={{ fontSize: '1.25rem', fontStyle: 'italic', margin: '8px 0' }}>&quot;{prompt.text}&quot;</p>
              <button 
                onClick={() => handleCopy(prompt.text, prompt.id)} 
                className="judgment-cta" 
                style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer', alignSelf: 'flex-start' }}
              >
                {copiedId === prompt.id ? "COPIED \u2713" : "COPY \u2192"}
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Joint Delivery Model */}
      <section className="section" style={{ borderTop: '1px solid var(--color-structural)' }}>
        <h2 className="section-label" style={{ marginBottom: '64px' }}>HOW WE WORK TOGETHER</h2>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', borderLeft: '1px solid var(--color-structural)', paddingLeft: '32px', marginLeft: '16px' }}>
          {[
            { title: "WORKDAY AE", desc: "Identifies opportunity" },
            { title: "WORKDAY CONSULTANT", desc: "Defines platform requirement" },
            { title: "FLOWTARIS", desc: "Architecture + engineering" },
            { title: "JOINT DELIVERY", desc: "Implementation + integration" },
            { title: "CLIENT", desc: "Production operation" }
          ].map((step, i, arr) => (
            <div key={step.title} style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: i < arr.length - 1 ? '16px' : '0' }}>
              <span className="card-heading" style={{ textTransform: 'uppercase', fontWeight: 500, letterSpacing: '0.05em' }}>
                {step.title}
              </span>
              <p className="trust-body">{step.desc}</p>
              {i < arr.length - 1 && <span style={{ color: 'var(--color-text-secondary)', fontSize: '1.25rem', marginTop: '8px' }}>&darr;</span>}
            </div>
          ))}
        </div>
      </section>

      {/* Proven Patterns / Case Studies (Fallback to general message if no real ones) */}
      <section className="section" style={{ borderTop: '1px solid var(--color-structural)' }}>
        <h2 className="section-label" style={{ marginBottom: '48px' }}>PROVEN PATTERNS</h2>
        <div className="ev-panel" style={{ padding: '64px', backgroundColor: 'var(--color-surface)', maxWidth: '800px' }}>
          <h3 className="section-heading" style={{ fontSize: '1.5rem', marginBottom: '16px' }}>JOINT CASE STUDIES</h3>
          <p className="trust-body" style={{ color: 'var(--color-text-secondary)' }}>
            Workday-specific case studies are being added as partner-approved engagements become available.
          </p>
        </div>
      </section>

      {/* Workday Specialists */}
      <section className="section" style={{ borderTop: '1px solid var(--color-structural)' }}>
        <h2 className="section-label" style={{ marginBottom: '48px' }}>WORKDAY SPECIALISTS</h2>
        
        <div style={{ marginBottom: '48px', display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
          {["ALL", "HCM", "FINANCE", "INTEGRATION", "EXTEND"].map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              style={{
                background: 'none',
                border: '1px solid',
                borderColor: filter === f ? 'var(--color-text-primary)' : 'var(--color-structural)',
                color: filter === f ? 'var(--color-text-primary)' : 'var(--color-text-secondary)',
                padding: '8px 16px',
                cursor: 'pointer',
                fontFamily: 'inherit',
                fontSize: '0.875rem',
                fontWeight: filter === f ? 500 : 400
              }}
            >
              {f}
            </button>
          ))}
        </div>

        <div className="trust-grid">
          {loading ? (
            <div style={{ padding: '32px', color: 'var(--color-text-secondary)' }}>Loading specialists...</div>
          ) : filteredSpecialists.length === 0 ? (
            <div style={{ padding: '32px', color: 'var(--color-text-secondary)' }}>No specialists found.</div>
          ) : (
            filteredSpecialists.map(specialist => (
              <div key={specialist.id} className="trust-card" style={{ padding: '32px', backgroundColor: 'var(--color-surface)' }}>
                <h3 className="card-heading" style={{ marginBottom: '8px', fontSize: '1.25rem' }}>{specialist.name}</h3>
                <p className="trust-body" style={{ marginBottom: '16px' }}>{specialist.role}</p>
                <span className="section-label" style={{ margin: '0 0 24px 0', display: 'block', fontSize: '0.75rem' }}>{specialist.certs}</span>
                <div style={{ display: 'flex', gap: '24px' }}>
                  <Link href={`/leverage/consultants/${specialist.link}`} className="judgment-cta">PROFILE &rarr;</Link>
                </div>
              </div>
            ))
          )}
        </div>
      </section>

      {/* Deal Registration CTA */}
      <section className="section" style={{ borderTop: '1px solid var(--color-structural)' }}>
        <div className="ev-panel" style={{ padding: '64px', backgroundColor: 'var(--color-surface)', maxWidth: '900px' }}>
          <h2 className="section-heading" style={{ fontSize: '2.5rem', marginBottom: '16px' }}>HAVE A LIVE OPPORTUNITY?</h2>
          <p className="trust-body" style={{ fontSize: '1.25rem', marginBottom: '48px', color: 'var(--color-text-secondary)' }}>
            Register the opportunity and bring Flowtaris<br />
            into the conversation.
          </p>
          <Link href="/leverage/register" className="judgment-cta" style={{ fontSize: '1.125rem' }}>REGISTER A DEAL &rarr;</Link>
        </div>
      </section>

      {/* Supporting Evidence */}
      <section className="section" style={{ borderTop: '1px solid var(--color-structural)' }}>
        <h2 className="section-label" style={{ marginBottom: '48px' }}>SUPPORTING EVIDENCE</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', maxWidth: '600px' }}>
          <Link href="/evidence/security" className="card-heading" style={{ textDecoration: 'none', borderBottom: '1px solid var(--color-structural)', paddingBottom: '16px' }}>SECURITY & COMPLIANCE &rarr;</Link>
          <Link href="/evidence/operations" className="card-heading" style={{ textDecoration: 'none', borderBottom: '1px solid var(--color-structural)', paddingBottom: '16px' }}>OPERATIONS &rarr;</Link>
          <Link href="/evidence/information-security-policy" className="card-heading" style={{ textDecoration: 'none', borderBottom: '1px solid var(--color-structural)', paddingBottom: '16px' }}>INFORMATION SECURITY POLICY &rarr;</Link>
          <Link href="/evidence/legal" className="card-heading" style={{ textDecoration: 'none', borderBottom: '1px solid var(--color-structural)', paddingBottom: '16px' }}>SUBPROCESSOR LIST &rarr;</Link>
        </div>
      </section>

      {/* Related Judgment */}
      <section className="section" style={{ borderTop: '1px solid var(--color-structural)' }}>
        <h2 className="section-label" style={{ marginBottom: '48px' }}>RELATED JUDGMENT</h2>
        
        <div className="ev-panel" style={{ padding: '64px', backgroundColor: 'var(--color-bg)', maxWidth: '900px' }}>
          <span className="section-label" style={{ marginBottom: '16px', display: 'block' }}>DECISION LOG</span>
          <h3 className="section-heading" style={{ fontSize: '1.5rem', marginBottom: '16px' }}>BUILD VS. PARTNER: WHERE WE DRAW THE LINE</h3>
          <p className="trust-body" style={{ marginBottom: '32px', color: 'var(--color-text-secondary)' }}>
            Why we choose established platforms when they already solve the problem.
          </p>
          <Link href="/judgment/build-vs-partner" className="judgment-cta" style={{ marginBottom: '48px', display: 'inline-block' }}>READ &rarr;</Link>
          
          <div style={{ borderTop: '1px solid var(--color-structural)', paddingTop: '32px' }}>
            <span className="section-label" style={{ marginBottom: '16px', display: 'block' }}>PRINCIPLE</span>
            <p className="card-heading" style={{ fontSize: '1.25rem', marginBottom: '24px' }}>PARTNER WITH THE BEST. DON&apos;T BUILD THE REST.</p>
            <Link href="/principles" className="judgment-cta">EXPLORE PRINCIPLES &rarr;</Link>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="section ev-access-section" style={{ borderTop: 'none', paddingBottom: '120px' }}>
        <div className="ev-access-inner">
          <h2 className="section-heading" style={{ fontSize: '2.5rem', marginBottom: '48px' }}>
            READY TO WORK THE OPPORTUNITY?
          </h2>
          <Link href="/leverage/register" className="judgment-cta" style={{ fontSize: '1.125rem' }}>REGISTER A DEAL &rarr;</Link>
        </div>
      </section>
    </>
  );
}
