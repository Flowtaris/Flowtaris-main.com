/* eslint-disable @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars, react/no-unescaped-entities */
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function ComplianceAdminPage() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState<"idle"|"success"|"error">("idle");

  useEffect(() => {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 8000);
    fetch("/api/net-cms", { signal: controller.signal })
      .then((res) => {
        if (!res.ok) throw new Error(`API error: ${res.status}`);
        return res.json();
      })
      .then((json) => {
        if (json && json.error) throw new Error(json.error);
        if (!json.complianceVault) json.complianceVault = {};
        json.complianceVault.hero = json.complianceVault.hero || {badge:"",titleLine1:"",titleAccent:"",titleLine2:"",description:""};
        json.complianceVault.philosophy = json.complianceVault.philosophy || {title:"",paragraphs:[]};
        json.complianceVault.policies = json.complianceVault.policies || [];
        json.complianceVault.faqs = json.complianceVault.faqs || [];
        json.complianceVault.telemetry = json.complianceVault.telemetry || {title:"",logs:[]};
        setData(json);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to load CMS config:", err);
        // Use hardcoded fallback so the page always renders
        setData({ header:{logoText:"Flowtaris",logoSubText:"",logoTagline:"Accountability Engine",navLinks:[],statusChip:"All Systems Nominal",ctaText:"Get Started",ctaLink:"https://flowtaris.com/contact"}, hero:{h1Line1:"Raw Data",h1Line2:"Zero Spin.",h1Line3:"Real Results.",bodyText:"Live telemetry from Flowtaris enterprise integrations.",stats:[],ctaPrimaryText:"Explore Telemetry",ctaPrimaryLink:"#telemetry",ctaSecondaryText:"View Architecture",ctaSecondaryLink:"/architecture"}, footer:{platformLinks:[],companyLinks:[],ecosystemLinks:[],contactBtnText:"Consult an Architect",contactBtnLink:"https://flowtaris.com/contact"}, performance:{tagline:"// live_metrics.query()",title:"Deterministic Performance",description:"Real numbers from production.",payloadSuccessRate:99.99,payloadSuccessRateLabel:"Payload Success Rate",payloadSuccessRateDesc:"30-Day Rolling Window",metrics:[]}, ctaSection:{tagline:"Ready to Build",title:"Stop Guessing.",description:"",primaryBtnText:"Consult an Architect",primaryBtnLink:"https://flowtaris.com/contact",secondaryBtnText:"Explore Observatory",secondaryBtnLink:"/integration-observatory"}, standardSection:{tagline:"The Flowtaris Standard",title:"Engineering Over Marketing.",description:"",cards:[]}, transparencySection:{tagline:"Operational Transparency",title:"Real Dashboards.",descPara1:"",descPara2:"",stats:[],images:{main:"/control-room.jpg",sub1:"/dashboard.jpg",sub2:"/roi-chart.jpg"}}, faqSection:{tagline:"Technical Knowledge Base",title:"Engineering FAQ",faqs:[]}, complianceVault:{hero:{badge:"",titleLine1:"",titleAccent:"",titleLine2:"",description:""},philosophy:{title:"",paragraphs:[]},policies:[],faqs:[],telemetry:{title:"",logs:[]}}, roiLedger:{hero:{badge:"",titleLine1:"",titleAccent:"",titleLine2:"",description:""},philosophy:{title:"",paragraphs:[]},facts:[],faqs:[]}, deliveryStandards:{hero:{badge:"",titleLine1:"",titleAccent:"",titleLine2:"",description:""},manifesto:{title:"",paragraphs:[]},nodes:[],faqs:[]}, observatory:{hero:{badge:"",titleLine1:"",titleAccent:"",titleLine2:"",description:""},gridNodes:[],faqs:[],architecture:{title:"",paragraphs:[]}} });
        setLoading(false);
      })
      .finally(() => clearTimeout(timeout));
  }, []);

  const handleHeroChange = (key: string, value: string) => {
    setData((prev: any) => ({
      ...prev,
      complianceVault: { ...prev.complianceVault, hero: { ...prev.complianceVault.hero, [key]: value } }
    }));
  };

  const handlePhilosophyChange = (key: string, value: string | string[]) => {
    setData((prev: any) => ({
      ...prev,
      complianceVault: { ...prev.complianceVault, philosophy: { ...prev.complianceVault.philosophy, [key]: value } }
    }));
  };

  const handlePolicyChange = (index: number, key: string, value: string) => {
    setData((prev: any) => {
      const newPolicies = [...prev.complianceVault.policies];
      newPolicies[index] = { ...newPolicies[index], [key]: value };
      return {
        ...prev,
        complianceVault: { ...prev.complianceVault, policies: newPolicies }
      };
    });
  };

  const handleFAQChange = (index: number, key: string, value: string) => {
    setData((prev: any) => {
      const newFaqs = [...prev.complianceVault.faqs];
      newFaqs[index] = { ...newFaqs[index], [key]: value };
      return {
        ...prev,
        complianceVault: { ...prev.complianceVault, faqs: newFaqs }
      };
    });
  };

  const handleTelemetryLogsChange = (value: string) => {
    const logsArray = value.split('\n').filter(log => log.trim() !== '');
    setData((prev: any) => ({
      ...prev,
      complianceVault: { 
        ...prev.complianceVault, 
        telemetry: { ...prev.complianceVault.telemetry, logs: logsArray } 
      }
    }));
  };

  const handleSave = async () => {
    setSaving(true);
    setSaveStatus("idle");
    try {
      const res = await fetch("/api/net-cms", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        setSaveStatus("success");
        setTimeout(() => setSaveStatus("idle"), 3000);
      } else {
        alert("Failed to save.");
      }
    } catch (e) {
      alert("Failed to save.");
    }
    setSaving(false);
  };

  if (loading || !data) return <div className="text-gray-400">Loading configuration...</div>;

  return (
    <div className="pb-24 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="mb-8">
        <Link href="/admin/net" className="text-blue-400 hover:text-blue-300 text-sm flex items-center gap-2 mb-4">
          ← Back to Dashboard
        </Link>
        <h1 className="text-3xl font-bold text-white flex items-center gap-3">
          <span className="p-2 bg-blue-500/10 text-blue-400 rounded-lg"></span>
          Compliance Vault Configuration
        </h1>
        <p className="text-gray-400 mt-2">Manage the compliance page: Hero, Philosophy, Facts, FAQs, and Live Telemetry.</p>
      </div>

      {/* Hero Section */}
      <div className="bg-[#151c2f] border border-white/5 rounded-2xl overflow-hidden mb-8 shadow-xl">
        <div className="px-6 py-4 border-b border-white/5 flex items-center gap-2">
          <h2 className="font-semibold text-white">Hero Section</h2>
        </div>
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Badge Text</label>
            <input type="text" className="w-full bg-[#0a1128] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:border-blue-500 outline-none" 
              value={data.complianceVault.hero.badge} onChange={(e) => handleHeroChange('badge', e.target.value)} />
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Title Line 1</label>
            <input type="text" className="w-full bg-[#0a1128] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:border-blue-500 outline-none" 
              value={data.complianceVault.hero.titleLine1} onChange={(e) => handleHeroChange('titleLine1', e.target.value)} />
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Title Accent (Gold)</label>
            <input type="text" className="w-full bg-[#0a1128] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:border-blue-500 outline-none" 
              value={data.complianceVault.hero.titleAccent} onChange={(e) => handleHeroChange('titleAccent', e.target.value)} />
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Title Line 2</label>
            <input type="text" className="w-full bg-[#0a1128] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:border-blue-500 outline-none" 
              value={data.complianceVault.hero.titleLine2} onChange={(e) => handleHeroChange('titleLine2', e.target.value)} />
          </div>
          <div className="md:col-span-2">
            <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Description</label>
            <textarea rows={3} className="w-full bg-[#0a1128] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:border-blue-500 outline-none" 
              value={data.complianceVault.hero.description} onChange={(e) => handleHeroChange('description', e.target.value)} />
          </div>
        </div>
      </div>

      {/* Philosophy Section */}
      <div className="bg-[#151c2f] border border-white/5 rounded-2xl overflow-hidden mb-8 shadow-xl">
        <div className="px-6 py-4 border-b border-white/5 flex items-center gap-2">
          <h2 className="font-semibold text-white">Philosophy (Sticky Left Column)</h2>
        </div>
        <div className="p-6 space-y-6">
          <div>
            <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Section Title</label>
            <input type="text" className="w-full bg-[#0a1128] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:border-blue-500 outline-none" 
              value={data.complianceVault.philosophy.title} onChange={(e) => handlePhilosophyChange('title', e.target.value)} />
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Paragraphs (One per line)</label>
            <textarea rows={6} className="w-full bg-[#0a1128] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:border-blue-500 outline-none" 
              value={data.complianceVault.philosophy.paragraphs.join('\n')} 
              onChange={(e) => handlePhilosophyChange('paragraphs', e.target.value.split('\n'))} />
          </div>
        </div>
      </div>

      {/* Policies / Facts Section */}
      <div className="bg-[#151c2f] border border-white/5 rounded-2xl overflow-hidden mb-8 shadow-xl">
        <div className="px-6 py-4 border-b border-white/5 flex items-center gap-2">
          <h2 className="font-semibold text-white">Hard Facts (Scrolling Right Column)</h2>
        </div>
        <div className="p-6 space-y-6">
          {data.complianceVault.policies.map((policy: any, index: number) => (
            <div key={index} className="bg-[#1a233a] p-4 rounded-xl border border-white/5 space-y-4">
              <div className="flex gap-4">
                <div className="w-24">
                  <label className="block text-[10px] text-gray-500 uppercase mb-1">ID / Number</label>
                  <input type="text" className="w-full bg-[#0a1128] border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:border-blue-500 outline-none" 
                    value={policy.id} onChange={(e) => handlePolicyChange(index, 'id', e.target.value)} />
                </div>
                <div className="flex-1">
                  <label className="block text-[10px] text-gray-500 uppercase mb-1">Title</label>
                  <input type="text" className="w-full bg-[#0a1128] border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:border-blue-500 outline-none" 
                    value={policy.title} onChange={(e) => handlePolicyChange(index, 'title', e.target.value)} />
                </div>
              </div>
              <div>
                <label className="block text-[10px] text-gray-500 uppercase mb-1">Content</label>
                <textarea rows={3} className="w-full bg-[#0a1128] border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:border-blue-500 outline-none" 
                  value={policy.content} onChange={(e) => handlePolicyChange(index, 'content', e.target.value)} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Live Telemetry Section */}
      <div className="bg-[#151c2f] border border-white/5 rounded-2xl overflow-hidden mb-8 shadow-xl">
        <div className="px-6 py-4 border-b border-white/5 flex items-center gap-2">
          <h2 className="font-semibold text-white">Live Audit Telemetry Stream</h2>
        </div>
        <div className="p-6 space-y-6">
          <div>
            <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Terminal Header Title</label>
            <input type="text" className="w-full bg-[#0a1128] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:border-blue-500 outline-none" 
              value={data.complianceVault.telemetry.title} 
              onChange={(e) => setData((prev: any) => ({...prev, complianceVault: {...prev.complianceVault, telemetry: {...prev.complianceVault.telemetry, title: e.target.value}}}))} />
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Stream Logs (One per line)</label>
            <textarea rows={8} className="w-full bg-[#0a1128] font-mono border border-white/10 rounded-xl px-4 py-3 text-sm text-emerald-400 focus:border-blue-500 outline-none" 
              value={data.complianceVault.telemetry.logs.join('\n')} 
              onChange={(e) => handleTelemetryLogsChange(e.target.value)} />
          </div>
        </div>
      </div>

      {/* FAQs Section */}
      <div className="bg-[#151c2f] border border-white/5 rounded-2xl overflow-hidden mb-8 shadow-xl">
        <div className="px-6 py-4 border-b border-white/5 flex items-center gap-2">
          <h2 className="font-semibold text-white">FAQs</h2>
        </div>
        <div className="p-6 space-y-6">
          {data.complianceVault.faqs.map((faq: any, index: number) => (
            <div key={index} className="bg-[#1a233a] p-4 rounded-xl border border-white/5 space-y-4">
              <div>
                <label className="block text-[10px] text-gray-500 uppercase mb-1">Question</label>
                <input type="text" className="w-full bg-[#0a1128] border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:border-blue-500 outline-none" 
                  value={faq.question} onChange={(e) => handleFAQChange(index, 'question', e.target.value)} />
              </div>
              <div>
                <label className="block text-[10px] text-gray-500 uppercase mb-1">Answer</label>
                <textarea rows={3} className="w-full bg-[#0a1128] border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:border-blue-500 outline-none" 
                  value={faq.answer} onChange={(e) => handleFAQChange(index, 'answer', e.target.value)} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Sticky Save Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-[#0a1128]/80 backdrop-blur-xl border-t border-white/10 p-4 z-50">
        <div className="max-w-7xl mx-auto flex justify-between items-center px-2">
          <p className="text-sm text-gray-400">Changes reflect on the live site in a maximum of 60 seconds.</p>
          <button
            onClick={handleSave}
            disabled={saving}
            className="px-6 py-2.5 bg-blue-600 text-white rounded-lg font-bold text-sm shadow-[0_0_15px_rgba(37,99,235,0.4)] hover:bg-blue-500 transition-all disabled:opacity-50 flex items-center gap-2"
          >
            {saving ? "Saving..." : "Save Configuration"}
          </button>
        </div>
      </div>
    </div>
  );
}


