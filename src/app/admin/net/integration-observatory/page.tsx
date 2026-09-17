/* eslint-disable @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars, react/no-unescaped-entities */
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function ObservatoryAdminPage() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState<"idle"|"success"|"error">("idle");

  useEffect(() => {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 8000);
    fetch("/api/net-cms", { signal: controller.signal })
      .then((res) => { if (!res.ok) throw new Error(`API error: ${res.status}`); return res.json(); })
      .then((json) => {
        if (json && json.error) throw new Error(json.error);
        if (!json.observatory) json.observatory = {};
        json.observatory.hero = json.observatory.hero || {badge:"",titleLine1:"",titleAccent:"",titleLine2:"",description:""};
        json.observatory.architecture = json.observatory.architecture || {title:"",paragraphs:[]};
        json.observatory.gridNodes = json.observatory.gridNodes || [];
        json.observatory.faqs = json.observatory.faqs || [];
        setData(json); setLoading(false);
      })
      .catch(() => {
        setData({ observatory:{hero:{badge:"",titleLine1:"",titleAccent:"",titleLine2:"",description:""},architecture:{title:"",paragraphs:[]},gridNodes:[],faqs:[]} });
        setLoading(false);
      })
      .finally(() => clearTimeout(timeout));
  }, []);

  const update = (path: string[], value: any) => setData((prev: any) => {
    const next = { ...prev };
    let cur: any = next;
    for (let i = 0; i < path.length - 1; i++) { 
      const k = path[i] as string; 
      cur[k] = { ...cur[k] }; 
      cur = cur[k]; 
    }
    cur[path[path.length - 1] as string] = value;
    return next;
  });

  const ob = () => data.observatory;

  // Grid Nodes handlers
  const setNode = (i: number, k: string, v: string) => { const a = [...ob().gridNodes]; a[i] = {...a[i],[k]:v}; update(["observatory","gridNodes"],a); };
  const addNode = () => update(["observatory","gridNodes"], [...ob().gridNodes, { id: `T-0${ob().gridNodes.length+1}`, title: "", content: "", metric: "", metricLabel: "" }]);
  const removeNode = (i: number) => update(["observatory","gridNodes"], ob().gridNodes.filter((_:any,idx:number) => idx !== i));

  // FAQs handlers
  const setFaq = (i: number, k: string, v: string) => { const a = [...ob().faqs]; a[i] = {...a[i],[k]:v}; update(["observatory","faqs"],a); };
  const addFaq = () => update(["observatory","faqs"], [...ob().faqs, { question: "", answer: "" }]);
  const removeFaq = (i: number) => update(["observatory","faqs"], ob().faqs.filter((_:any,idx:number) => idx !== i));

  const handleSave = async () => {
    setSaving(true); setSaveStatus("idle");
    try {
      const res = await fetch("/api/net-cms", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
      if (res.ok) { setSaveStatus("success"); setTimeout(() => setSaveStatus("idle"), 3000); }
      else setSaveStatus("error");
    } catch { setSaveStatus("error"); }
    setSaving(false);
  };

  if (loading || !data) return <div className="text-gray-400 p-8">Loading configuration...</div>;

  return (
    <div className="pb-24 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="mb-8">
        <Link href="/admin/net" className="text-blue-400 hover:text-blue-300 text-sm flex items-center gap-2 mb-4">← Back to Dashboard</Link>
        <h1 className="text-3xl font-bold text-white flex items-center gap-3">
          <span className="p-2 bg-cyan-500/10 text-cyan-500 rounded-lg">📡</span>
          Observatory Configuration
        </h1>
        <p className="text-gray-400 mt-2">Manage the Integration Observatory: Hero, Architecture Narrative, Telemetry Grid Nodes, and FAQs.</p>
      </div>

      {/* Hero Section */}
      <div className="bg-[#151c2f] border border-white/5 rounded-2xl overflow-hidden mb-8 shadow-xl">
        <div className="px-6 py-4 border-b border-white/5"><h2 className="font-semibold text-white">Hero Section</h2></div>
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          {[["Badge Text","badge"],["Title Line 1","titleLine1"],["Title Accent (Cyan)","titleAccent"],["Title Line 2","titleLine2"]].map(([lbl,k]) => (
            <div key={k}>
              <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">{lbl}</label>
              <input type="text" className="w-full bg-[#0a1128] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:border-cyan-500 outline-none"
                value={ob().hero[k as string]} onChange={(e) => update(["observatory","hero"], {...ob().hero, [k as string]: e.target.value})} />
            </div>
          ))}
          <div className="md:col-span-2">
            <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Description</label>
            <textarea rows={3} className="w-full bg-[#0a1128] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:border-cyan-500 outline-none"
              value={ob().hero.description} onChange={(e) => update(["observatory","hero"], {...ob().hero, description: e.target.value})} />
          </div>
        </div>
      </div>

      {/* Architecture Narrative Section */}
      <div className="bg-[#151c2f] border border-white/5 rounded-2xl overflow-hidden mb-8 shadow-xl">
        <div className="px-6 py-4 border-b border-white/5"><h2 className="font-semibold text-white">Architecture Narrative</h2></div>
        <div className="p-6 space-y-6">
          <div>
            <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Section Title</label>
            <input type="text" className="w-full bg-[#0a1128] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:border-cyan-500 outline-none"
              value={ob().architecture.title} onChange={(e) => update(["observatory","architecture"], {...ob().architecture, title: e.target.value})} />
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Paragraphs (One per line)</label>
            <textarea rows={6} className="w-full bg-[#0a1128] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:border-cyan-500 outline-none"
              value={ob().architecture.paragraphs.join('\n')}
              onChange={(e) => update(["observatory","architecture"], {...ob().architecture, paragraphs: e.target.value.split('\n')})} />
          </div>
        </div>
      </div>

      {/* Grid Nodes Section */}
      <div className="bg-[#151c2f] border border-white/5 rounded-2xl overflow-hidden mb-8 shadow-xl">
        <div className="px-6 py-4 border-b border-white/5 flex items-center justify-between">
          <h2 className="font-semibold text-white">Telemetry Grid Nodes</h2>
          <button onClick={addNode} className="flex items-center gap-1.5 text-xs font-bold text-cyan-400 hover:text-cyan-300 bg-cyan-500/10 hover:bg-cyan-500/20 px-3 py-1.5 rounded-lg transition-all">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 5v14M5 12h14"/></svg>
            Add Node
          </button>
        </div>
        <div className="p-6 space-y-4">
          {ob().gridNodes.length === 0 && <p className="text-gray-500 text-sm text-center py-4">No nodes yet. Click "Add Node" to create one.</p>}
          {ob().gridNodes.map((node: any, index: number) => (
            <div key={index} className="bg-[#1a233a] p-4 rounded-xl border border-white/5 space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-xs font-bold text-gray-500 uppercase">Node {index + 1}</span>
                <button onClick={() => removeNode(index)} className="text-xs text-red-400 hover:text-red-300 bg-red-500/10 hover:bg-red-500/20 px-2.5 py-1 rounded-lg transition-all flex items-center gap-1">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M18 6L6 18M6 6l12 12"/></svg>
                  Remove
                </button>
              </div>
              <div className="flex gap-4">
                <div className="w-24">
                  <label className="block text-[10px] text-gray-500 uppercase mb-1">Node ID</label>
                  <input type="text" className="w-full bg-[#0a1128] border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:border-cyan-500 outline-none"
                    value={node.id} onChange={(e) => setNode(index, 'id', e.target.value)} />
                </div>
                <div className="flex-1">
                  <label className="block text-[10px] text-gray-500 uppercase mb-1">Title</label>
                  <input type="text" className="w-full bg-[#0a1128] border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:border-cyan-500 outline-none"
                    value={node.title} onChange={(e) => setNode(index, 'title', e.target.value)} />
                </div>
              </div>
              <div>
                <label className="block text-[10px] text-gray-500 uppercase mb-1">Content</label>
                <textarea rows={3} className="w-full bg-[#0a1128] border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:border-cyan-500 outline-none"
                  value={node.content} onChange={(e) => setNode(index, 'content', e.target.value)} />
              </div>
              <div className="flex gap-4">
                <div className="flex-1">
                  <label className="block text-[10px] text-gray-500 uppercase mb-1">Large Metric (e.g. 100%)</label>
                  <input type="text" className="w-full bg-[#0a1128] border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:border-cyan-500 outline-none"
                    value={node.metric} onChange={(e) => setNode(index, 'metric', e.target.value)} />
                </div>
                <div className="flex-1">
                  <label className="block text-[10px] text-gray-500 uppercase mb-1">Metric Label</label>
                  <input type="text" className="w-full bg-[#0a1128] border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:border-cyan-500 outline-none"
                    value={node.metricLabel} onChange={(e) => setNode(index, 'metricLabel', e.target.value)} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* FAQs Section */}
      <div className="bg-[#151c2f] border border-white/5 rounded-2xl overflow-hidden mb-8 shadow-xl">
        <div className="px-6 py-4 border-b border-white/5 flex items-center justify-between">
          <h2 className="font-semibold text-white">Observatory FAQs</h2>
          <button onClick={addFaq} className="flex items-center gap-1.5 text-xs font-bold text-cyan-400 hover:text-cyan-300 bg-cyan-500/10 hover:bg-cyan-500/20 px-3 py-1.5 rounded-lg transition-all">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 5v14M5 12h14"/></svg>
            Add FAQ
          </button>
        </div>
        <div className="p-6 space-y-4">
          {ob().faqs.length === 0 && <p className="text-gray-500 text-sm text-center py-4">No FAQs yet. Click "Add FAQ" to create one.</p>}
          {ob().faqs.map((faq: any, index: number) => (
            <div key={index} className="bg-[#1a233a] p-4 rounded-xl border border-white/5 space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-xs font-bold text-gray-500 uppercase">FAQ {index + 1}</span>
                <button onClick={() => removeFaq(index)} className="text-xs text-red-400 hover:text-red-300 bg-red-500/10 hover:bg-red-500/20 px-2.5 py-1 rounded-lg transition-all flex items-center gap-1">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M18 6L6 18M6 6l12 12"/></svg>
                  Remove
                </button>
              </div>
              <div>
                <label className="block text-[10px] text-gray-500 uppercase mb-1">Question</label>
                <input type="text" className="w-full bg-[#0a1128] border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:border-cyan-500 outline-none"
                  value={faq.question} onChange={(e) => setFaq(index, 'question', e.target.value)} />
              </div>
              <div>
                <label className="block text-[10px] text-gray-500 uppercase mb-1">Answer</label>
                <textarea rows={3} className="w-full bg-[#0a1128] border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:border-cyan-500 outline-none"
                  value={faq.answer} onChange={(e) => setFaq(index, 'answer', e.target.value)} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Sticky Save Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-[#0a1128]/90 backdrop-blur-xl border-t border-white/10 p-4 z-50">
        <div className="max-w-7xl mx-auto flex justify-between items-center px-2">
          <p className="text-sm text-gray-400">
            {saveStatus === "success" && <span className="text-emerald-400 font-semibold">✓ Saved successfully!</span>}
            {saveStatus === "error" && <span className="text-red-400 font-semibold">✗ Save failed. Try again.</span>}
            {saveStatus === "idle" && "Changes reflect on the live site in a maximum of 60 seconds."}
          </p>
          <button onClick={handleSave} disabled={saving}
            className="px-6 py-2.5 bg-cyan-600 text-white rounded-lg font-bold text-sm shadow-[0_0_15px_rgba(6,182,212,0.4)] hover:bg-cyan-500 transition-all disabled:opacity-50 flex items-center gap-2">
            {saving ? "Saving..." : "Save Configuration"}
          </button>
        </div>
      </div>
    </div>
  );
}
