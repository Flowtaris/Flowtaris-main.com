"use client";

import { useState, useEffect } from "react";

export default function LeverageEditor({ site }: { site: string }) {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, [site]);

  async function fetchData() {
    setLoading(true);
    try {
      const res = await fetch(`/api/content/${site}?table=page_content&id=leverage`);
      const { data: resData } = await res.json();
      if (resData && resData.length > 0 && resData[0].content) {
        setData(resData[0].content);
    } else {
      // Default template
      setData({
        hero: { eyebrow: "LEVERAGE", title: "HOW WE SCALE\\nWITHOUT SCALING\\nCOMPLEXITY.", subtitle: "The platforms, partnerships and specialist\\nrelationships that extend what Flowtaris\\ncan deliver.", stats: ["03 STRATEGIC ALLIANCES", "ACTIVE NETWORK"] },
        leverageModel: { title: "HOW WE CREATE LEVERAGE", items: [{ title: "PLATFORMS", desc: "Technology platforms that allow\\nus to solve complex problems faster." }, { title: "PARTNERS", desc: "Strategic relationships that expand\\ncapability and reach." }, { title: "PEOPLE", desc: "Specialists who bring depth where\\ngeneral capability isn't enough." }] },
        strategicAlliances: { title: "STRATEGIC ALLIANCES", alliances: [{ num: "01", name: "NETSUITE", desc: "ERP implementation, integration and platform engineering.", status: "[ IN DEVELOPMENT ]", href: "/leverage/netsuite" }, { num: "02", name: "COUPA", desc: "Procurement platform engineering, integration and optimization.", status: "[ IN DEVELOPMENT ]", href: "/leverage/coupa" }, { num: "03", name: "WORKDAY", desc: "Enterprise platform integration, engineering and delivery.", status: "[ IN DEVELOPMENT ]", href: "/leverage/workday" }] },
        partnershipsChange: { title: "PARTNERSHIPS SHOULD CHANGE\\nTHE OUTCOME.", subtitle: "Not the logo wall.", withoutLeverage: ["Client problem", "Flowtaris capability", "Limited delivery boundary"], withLeverage: ["Client problem", "Flowtaris", "Strategic platform / partner", "Specialist capability", "Larger solution surface"] },
        capabilityMap: { title: "CAPABILITY MAP", capabilities: [{ name: "Architecture", f: "✓", p: "✓", s: "✕" }, { name: "Integration", f: "✓", p: "✓", s: "✕" }, { name: "Platform Engineering", f: "✓", p: "✓", s: "✕" }, { name: "Data Engineering", f: "✓", p: "✕", s: "✓" }, { name: "ERP", f: "✕", p: "✓", s: "✓" }, { name: "Procurement", f: "✕", p: "✓", s: "✓" }, { name: "AI / Automation", f: "✓", p: "✕", s: "✓" }] },
        partnerRegistration: { label: "PARTNER DEAL REGISTRATION", title: "HAVE AN OPPORTUNITY?", desc: "Register it once.\\nWe'll route it to the appropriate Flowtaris\\nteam and partner relationship.", cta: "REGISTER AN OPPORTUNITY →" },
        partnerPipeline: { title: "PARTNER PIPELINE", desc: "PIPELINE DATA\\nCOMING ONLINE" },
        specialistNetwork: { label: "SPECIALIST NETWORK", title: "WHEN DEPTH MATTERS,\\nBRING IN THE RIGHT PERSON.", desc: "A curated network of specialists\\nacross platforms, engineering,\\ndata and enterprise operations.", cta: "EXPLORE SPECIALISTS →", categories: [{ label: "ERP", items: ["NetSuite", "SAP", "Workday"] }, { label: "DATA", items: ["Data Engineering", "Analytics", "AI"] }, { label: "OPERATIONS", items: ["Transformation", "Architecture", "Program Leadership"] }] },
        flowtarisNetwork: { title: "THE FLOWTARIS NETWORK", domains: [{ ext: ".CO", desc: "TRUST INFRASTRUCTURE" }, { ext: ".COM", desc: "Company / commercial presence" }, { ext: ".AI", desc: "AI systems / intelligence" }, { ext: ".NET", desc: "Client / operational infrastructure" }] },
        operatingPrinciple: "LEVERAGE IS NOT ABOUT DOING MORE.\\nIT IS ABOUT MAKING THE SAME\\nCAPABILITY REACH FURTHER.",
        finalCta: { title: "HAVE AN OPPORTUNITY\\nTHAT NEEDS MORE CAPABILITY?", desc: "Let's determine whether\\nthe right leverage already exists.", cta: "REGISTER AN OPPORTUNITY →" }
      });
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  }

  async function save() {
    try {
      const res = await fetch(`/api/content/${site}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ table: "page_content", record: { id: "leverage", content: data, updated_at: new Date().toISOString() } })
      });
      const { error } = await res.json();
      if (error) throw new Error(error);
      alert(`Leverage page saved to flowtaris.${site}!`);
    } catch (e: any) {
      alert("Error: " + e.message);
    }
  }

  const update = (section: string, key: string, value: any) => {
    setData((p: any) => ({ ...p, [section]: { ...p[section], [key]: value } }));
  };
  const updateRoot = (key: string, value: any) => {
    setData((p: any) => ({ ...p, [key]: value }));
  };

  if (loading || !data) return <div>Loading...</div>;

  return (
    <div style={{ maxWidth: 900 }}>
      <h1 style={{ fontSize: 24, fontWeight: "bold", color: "#111827", marginBottom: 24 }}>Leverage Page Content</h1>
      <button onClick={save} style={{ background: "#2563EB", color: "#fff", padding: "10px 24px", border: "none", borderRadius: 6, cursor: "pointer", fontWeight: 500, fontSize: 14, marginBottom: 24 }}>Save All Changes</button>

      {/* Hero */}
      <div style={{ background: "#fff", borderRadius: 12, padding: 32, border: "1px solid #E5E7EB", marginBottom: 24 }}>
        <h2 style={{ fontSize: 18, fontWeight: 600, marginBottom: 16 }}>Hero Section</h2>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <input value={data.hero.eyebrow} onChange={e => update("hero", "eyebrow", e.target.value)} placeholder="Eyebrow" style={{ padding: 10, border: "1px solid #D1D5DB", borderRadius: 6 }} />
          <textarea value={data.hero.title} onChange={e => update("hero", "title", e.target.value)} placeholder="Title" style={{ padding: 10, border: "1px solid #D1D5DB", borderRadius: 6, height: 80 }} />
          <textarea value={data.hero.subtitle} onChange={e => update("hero", "subtitle", e.target.value)} placeholder="Subtitle" style={{ padding: 10, border: "1px solid #D1D5DB", borderRadius: 6, height: 80 }} />
          <input value={(data.hero.stats || []).join(", ")} onChange={e => update("hero", "stats", e.target.value.split(",").map((s:string) => s.trim()))} placeholder="Stats (comma separated)" style={{ padding: 10, border: "1px solid #D1D5DB", borderRadius: 6 }} />
        </div>
      </div>

      {/* Leverage Model */}
      <div style={{ background: "#fff", borderRadius: 12, padding: 32, border: "1px solid #E5E7EB", marginBottom: 24 }}>
        <h2 style={{ fontSize: 18, fontWeight: 600, marginBottom: 16 }}>Leverage Model</h2>
        <input value={data.leverageModel.title} onChange={e => update("leverageModel", "title", e.target.value)} placeholder="Section Title" style={{ padding: 10, border: "1px solid #D1D5DB", borderRadius: 6, width: "100%", marginBottom: 16 }} />
        {(data.leverageModel.items || []).map((item: any, i: number) => (
          <div key={i} style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: 8, marginBottom: 8 }}>
            <input value={item.title} onChange={e => {
              const newItems = [...data.leverageModel.items]; newItems[i].title = e.target.value; update("leverageModel", "items", newItems);
            }} placeholder="Title" style={{ padding: 8, border: "1px solid #D1D5DB", borderRadius: 6 }} />
            <input value={item.desc} onChange={e => {
              const newItems = [...data.leverageModel.items]; newItems[i].desc = e.target.value; update("leverageModel", "items", newItems);
            }} placeholder="Description" style={{ padding: 8, border: "1px solid #D1D5DB", borderRadius: 6 }} />
          </div>
        ))}
      </div>

      {/* Strategic Alliances */}
      <div style={{ background: "#fff", borderRadius: 12, padding: 32, border: "1px solid #E5E7EB", marginBottom: 24 }}>
        <h2 style={{ fontSize: 18, fontWeight: 600, marginBottom: 16 }}>Strategic Alliances</h2>
        <input value={data.strategicAlliances.title} onChange={e => update("strategicAlliances", "title", e.target.value)} placeholder="Section Title" style={{ padding: 10, border: "1px solid #D1D5DB", borderRadius: 6, width: "100%", marginBottom: 16 }} />
        {(data.strategicAlliances.alliances || []).map((a: any, i: number) => (
          <div key={i} style={{ display: "grid", gridTemplateColumns: "40px 1fr 2fr 1fr 1fr", gap: 8, marginBottom: 8 }}>
            <input value={a.num} onChange={e => { const arr = [...data.strategicAlliances.alliances]; arr[i].num = e.target.value; update("strategicAlliances", "alliances", arr); }} placeholder="No." style={{ padding: 8, border: "1px solid #D1D5DB", borderRadius: 6 }} />
            <input value={a.name} onChange={e => { const arr = [...data.strategicAlliances.alliances]; arr[i].name = e.target.value; update("strategicAlliances", "alliances", arr); }} placeholder="Name" style={{ padding: 8, border: "1px solid #D1D5DB", borderRadius: 6 }} />
            <input value={a.desc} onChange={e => { const arr = [...data.strategicAlliances.alliances]; arr[i].desc = e.target.value; update("strategicAlliances", "alliances", arr); }} placeholder="Desc" style={{ padding: 8, border: "1px solid #D1D5DB", borderRadius: 6 }} />
            <input value={a.status} onChange={e => { const arr = [...data.strategicAlliances.alliances]; arr[i].status = e.target.value; update("strategicAlliances", "alliances", arr); }} placeholder="Status" style={{ padding: 8, border: "1px solid #D1D5DB", borderRadius: 6 }} />
            <input value={a.href} onChange={e => { const arr = [...data.strategicAlliances.alliances]; arr[i].href = e.target.value; update("strategicAlliances", "alliances", arr); }} placeholder="Link" style={{ padding: 8, border: "1px solid #D1D5DB", borderRadius: 6 }} />
          </div>
        ))}
      </div>

      {/* Partnerships Change */}
      <div style={{ background: "#fff", borderRadius: 12, padding: 32, border: "1px solid #E5E7EB", marginBottom: 24 }}>
        <h2 style={{ fontSize: 18, fontWeight: 600, marginBottom: 16 }}>Partnerships Change</h2>
        <input value={data.partnershipsChange.title} onChange={e => update("partnershipsChange", "title", e.target.value)} placeholder="Title" style={{ padding: 10, border: "1px solid #D1D5DB", borderRadius: 6, width: "100%", marginBottom: 8 }} />
        <input value={data.partnershipsChange.subtitle} onChange={e => update("partnershipsChange", "subtitle", e.target.value)} placeholder="Subtitle" style={{ padding: 10, border: "1px solid #D1D5DB", borderRadius: 6, width: "100%", marginBottom: 16 }} />
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
          <div>
            <label style={{ display: "block", marginBottom: 8, fontSize: 14 }}>Without Leverage (one per line)</label>
            <textarea value={data.partnershipsChange.withoutLeverage.join("\\n")} onChange={e => update("partnershipsChange", "withoutLeverage", e.target.value.split("\\n"))} style={{ padding: 10, border: "1px solid #D1D5DB", borderRadius: 6, width: "100%", height: 120 }} />
          </div>
          <div>
            <label style={{ display: "block", marginBottom: 8, fontSize: 14 }}>With Leverage (one per line)</label>
            <textarea value={data.partnershipsChange.withLeverage.join("\\n")} onChange={e => update("partnershipsChange", "withLeverage", e.target.value.split("\\n"))} style={{ padding: 10, border: "1px solid #D1D5DB", borderRadius: 6, width: "100%", height: 120 }} />
          </div>
        </div>
      </div>

      {/* Capability Map */}
      <div style={{ background: "#fff", borderRadius: 12, padding: 32, border: "1px solid #E5E7EB", marginBottom: 24 }}>
        <h2 style={{ fontSize: 18, fontWeight: 600, marginBottom: 16 }}>Capability Map</h2>
        <input value={data.capabilityMap.title} onChange={e => update("capabilityMap", "title", e.target.value)} placeholder="Title" style={{ padding: 10, border: "1px solid #D1D5DB", borderRadius: 6, width: "100%", marginBottom: 16 }} />
        {(data.capabilityMap.capabilities || []).map((c: any, i: number) => (
          <div key={i} style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr auto", gap: 8, marginBottom: 8, alignItems: "center" }}>
            <input value={c.name} onChange={e => { const arr = [...data.capabilityMap.capabilities]; arr[i].name = e.target.value; update("capabilityMap", "capabilities", arr); }} placeholder="Capability" style={{ padding: 8, border: "1px solid #D1D5DB", borderRadius: 6 }} />
            <select value={c.f} onChange={e => { const arr = [...data.capabilityMap.capabilities]; arr[i].f = e.target.value; update("capabilityMap", "capabilities", arr); }} style={{ padding: 8, border: "1px solid #D1D5DB", borderRadius: 6 }}>
              <option value="✓">✓ (Tick)</option>
              <option value="✕">✕ (Cross)</option>
              <option value="●">● (Filled)</option>
              <option value="○">○ (Empty)</option>
            </select>
            <select value={c.p} onChange={e => { const arr = [...data.capabilityMap.capabilities]; arr[i].p = e.target.value; update("capabilityMap", "capabilities", arr); }} style={{ padding: 8, border: "1px solid #D1D5DB", borderRadius: 6 }}>
              <option value="✓">✓ (Tick)</option>
              <option value="✕">✕ (Cross)</option>
              <option value="●">● (Filled)</option>
              <option value="○">○ (Empty)</option>
            </select>
            <select value={c.s} onChange={e => { const arr = [...data.capabilityMap.capabilities]; arr[i].s = e.target.value; update("capabilityMap", "capabilities", arr); }} style={{ padding: 8, border: "1px solid #D1D5DB", borderRadius: 6 }}>
              <option value="✓">✓ (Tick)</option>
              <option value="✕">✕ (Cross)</option>
              <option value="●">● (Filled)</option>
              <option value="○">○ (Empty)</option>
            </select>
            <button onClick={() => { const arr = [...data.capabilityMap.capabilities]; arr.splice(i, 1); update("capabilityMap", "capabilities", arr); }} style={{ background: "#EF4444", color: "#fff", border: "none", borderRadius: 4, padding: "8px 12px", cursor: "pointer" }}>Delete</button>
          </div>
        ))}
        <button onClick={() => { const arr = [...(data.capabilityMap.capabilities || []), { name: "", f: "✕", p: "✕", s: "✕" }]; update("capabilityMap", "capabilities", arr); }} style={{ marginTop: 8, background: "#111827", color: "#fff", border: "none", borderRadius: 6, padding: "8px 16px", cursor: "pointer" }}>Add Capability</button>
      </div>

      {/* Others (Partner Reg, Pipeline, Specialist, Flowtaris Network, CTA) */}
      <div style={{ background: "#fff", borderRadius: 12, padding: 32, border: "1px solid #E5E7EB", marginBottom: 24 }}>
        <h2 style={{ fontSize: 18, fontWeight: 600, marginBottom: 16 }}>Other Sections</h2>
        
        <h3 style={{ fontSize: 14, fontWeight: 600, marginTop: 16 }}>Partner Registration</h3>
        <input value={data.partnerRegistration.label} onChange={e => update("partnerRegistration", "label", e.target.value)} style={{ padding: 8, border: "1px solid #D1D5DB", borderRadius: 6, width: "100%", marginBottom: 4 }} />
        <input value={data.partnerRegistration.title} onChange={e => update("partnerRegistration", "title", e.target.value)} style={{ padding: 8, border: "1px solid #D1D5DB", borderRadius: 6, width: "100%", marginBottom: 4 }} />
        <textarea value={data.partnerRegistration.desc} onChange={e => update("partnerRegistration", "desc", e.target.value)} style={{ padding: 8, border: "1px solid #D1D5DB", borderRadius: 6, width: "100%", marginBottom: 4, height: 60 }} />
        <input value={data.partnerRegistration.cta} onChange={e => update("partnerRegistration", "cta", e.target.value)} style={{ padding: 8, border: "1px solid #D1D5DB", borderRadius: 6, width: "100%", marginBottom: 16 }} />

        <h3 style={{ fontSize: 14, fontWeight: 600, marginTop: 16 }}>Operating Principle</h3>
        <textarea value={data.operatingPrinciple} onChange={e => updateRoot("operatingPrinciple", e.target.value)} style={{ padding: 8, border: "1px solid #D1D5DB", borderRadius: 6, width: "100%", marginBottom: 16, height: 80 }} />
        
        <h3 style={{ fontSize: 14, fontWeight: 600, marginTop: 16 }}>Final CTA</h3>
        <input value={data.finalCta.title} onChange={e => update("finalCta", "title", e.target.value)} style={{ padding: 8, border: "1px solid #D1D5DB", borderRadius: 6, width: "100%", marginBottom: 4 }} />
        <textarea value={data.finalCta.desc} onChange={e => update("finalCta", "desc", e.target.value)} style={{ padding: 8, border: "1px solid #D1D5DB", borderRadius: 6, width: "100%", marginBottom: 4, height: 60 }} />
        <input value={data.finalCta.cta} onChange={e => update("finalCta", "cta", e.target.value)} style={{ padding: 8, border: "1px solid #D1D5DB", borderRadius: 6, width: "100%" }} />
      </div>

    </div>
  );
}
