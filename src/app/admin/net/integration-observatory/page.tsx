/* eslint-disable @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars, react/no-unescaped-entities */
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function ObservatoryAdminPage() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetch("/api/net-cms")
      .then((res) => res.json())
      .then((json) => {
        setData(json);
        setLoading(false);
      });
  }, []);

  const handleHeroChange = (key: string, value: string) => {
    setData((prev: any) => ({
      ...prev,
      observatory: { ...prev.observatory, hero: { ...prev.observatory.hero, [key]: value } }
    }));
  };

  const handleArchitectureChange = (key: string, value: string | string[]) => {
    setData((prev: any) => ({
      ...prev,
      observatory: { ...prev.observatory, architecture: { ...prev.observatory.architecture, [key]: value } }
    }));
  };

  const handleNodeChange = (index: number, key: string, value: string) => {
    setData((prev: any) => {
      const newNodes = [...prev.observatory.gridNodes];
      newNodes[index] = { ...newNodes[index], [key]: value };
      return {
        ...prev,
        observatory: { ...prev.observatory, gridNodes: newNodes }
      };
    });
  };

  const handleFAQChange = (index: number, key: string, value: string) => {
    setData((prev: any) => {
      const newFaqs = [...prev.observatory.faqs];
      newFaqs[index] = { ...newFaqs[index], [key]: value };
      return {
        ...prev,
        observatory: { ...prev.observatory, faqs: newFaqs }
      };
    });
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      await fetch("/api/net-cms", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
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
          <span className="p-2 bg-cyan-500/10 text-cyan-500 rounded-lg">📡</span>
          Observatory Configuration
        </h1>
        <p className="text-gray-400 mt-2">Manage the Integration Observatory: Hero, Architecture Narrative, Telemetry Grid Nodes, and FAQs.</p>
      </div>

      {/* Hero Section */}
      <div className="bg-[#151c2f] border border-white/5 rounded-2xl overflow-hidden mb-8 shadow-xl">
        <div className="px-6 py-4 border-b border-white/5 flex items-center gap-2">
          <h2 className="font-semibold text-white">Hero Section</h2>
        </div>
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Badge Text</label>
            <input type="text" className="w-full bg-[#0a1128] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:border-cyan-500 outline-none" 
              value={data.observatory.hero.badge} onChange={(e) => handleHeroChange('badge', e.target.value)} />
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Title Line 1</label>
            <input type="text" className="w-full bg-[#0a1128] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:border-cyan-500 outline-none" 
              value={data.observatory.hero.titleLine1} onChange={(e) => handleHeroChange('titleLine1', e.target.value)} />
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Title Accent (Cyan)</label>
            <input type="text" className="w-full bg-[#0a1128] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:border-cyan-500 outline-none" 
              value={data.observatory.hero.titleAccent} onChange={(e) => handleHeroChange('titleAccent', e.target.value)} />
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Title Line 2</label>
            <input type="text" className="w-full bg-[#0a1128] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:border-cyan-500 outline-none" 
              value={data.observatory.hero.titleLine2} onChange={(e) => handleHeroChange('titleLine2', e.target.value)} />
          </div>
          <div className="md:col-span-2">
            <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Description</label>
            <textarea rows={3} className="w-full bg-[#0a1128] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:border-cyan-500 outline-none" 
              value={data.observatory.hero.description} onChange={(e) => handleHeroChange('description', e.target.value)} />
          </div>
        </div>
      </div>

      {/* Architecture Narrative Section */}
      <div className="bg-[#151c2f] border border-white/5 rounded-2xl overflow-hidden mb-8 shadow-xl">
        <div className="px-6 py-4 border-b border-white/5 flex items-center gap-2">
          <h2 className="font-semibold text-white">Architecture Narrative</h2>
        </div>
        <div className="p-6 space-y-6">
          <div>
            <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Section Title</label>
            <input type="text" className="w-full bg-[#0a1128] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:border-cyan-500 outline-none" 
              value={data.observatory.architecture.title} onChange={(e) => handleArchitectureChange('title', e.target.value)} />
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Paragraphs (One per line)</label>
            <textarea rows={6} className="w-full bg-[#0a1128] border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:border-cyan-500 outline-none" 
              value={data.observatory.architecture.paragraphs.join('\n')} 
              onChange={(e) => handleArchitectureChange('paragraphs', e.target.value.split('\n'))} />
          </div>
        </div>
      </div>

      {/* Grid Nodes Section */}
      <div className="bg-[#151c2f] border border-white/5 rounded-2xl overflow-hidden mb-8 shadow-xl">
        <div className="px-6 py-4 border-b border-white/5 flex items-center gap-2">
          <h2 className="font-semibold text-white">Telemetry Grid Nodes</h2>
        </div>
        <div className="p-6 space-y-6">
          {data.observatory.gridNodes.map((node: any, index: number) => (
            <div key={index} className="bg-[#1a233a] p-4 rounded-xl border border-white/5 space-y-4">
              <div className="flex gap-4">
                <div className="w-24">
                  <label className="block text-[10px] text-gray-500 uppercase mb-1">Node ID</label>
                  <input type="text" className="w-full bg-[#0a1128] border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:border-cyan-500 outline-none" 
                    value={node.id} onChange={(e) => handleNodeChange(index, 'id', e.target.value)} />
                </div>
                <div className="flex-1">
                  <label className="block text-[10px] text-gray-500 uppercase mb-1">Title</label>
                  <input type="text" className="w-full bg-[#0a1128] border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:border-cyan-500 outline-none" 
                    value={node.title} onChange={(e) => handleNodeChange(index, 'title', e.target.value)} />
                </div>
              </div>
              <div>
                <label className="block text-[10px] text-gray-500 uppercase mb-1">Content</label>
                <textarea rows={3} className="w-full bg-[#0a1128] border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:border-cyan-500 outline-none" 
                  value={node.content} onChange={(e) => handleNodeChange(index, 'content', e.target.value)} />
              </div>
              <div className="flex gap-4">
                <div className="flex-1">
                  <label className="block text-[10px] text-gray-500 uppercase mb-1">Large Metric (e.g. 100%)</label>
                  <input type="text" className="w-full bg-[#0a1128] border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:border-cyan-500 outline-none" 
                    value={node.metric} onChange={(e) => handleNodeChange(index, 'metric', e.target.value)} />
                </div>
                <div className="flex-1">
                  <label className="block text-[10px] text-gray-500 uppercase mb-1">Metric Label</label>
                  <input type="text" className="w-full bg-[#0a1128] border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:border-cyan-500 outline-none" 
                    value={node.metricLabel} onChange={(e) => handleNodeChange(index, 'metricLabel', e.target.value)} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* FAQs Section */}
      <div className="bg-[#151c2f] border border-white/5 rounded-2xl overflow-hidden mb-8 shadow-xl">
        <div className="px-6 py-4 border-b border-white/5 flex items-center gap-2">
          <h2 className="font-semibold text-white">Observatory FAQs</h2>
        </div>
        <div className="p-6 space-y-6">
          {data.observatory.faqs.map((faq: any, index: number) => (
            <div key={index} className="bg-[#1a233a] p-4 rounded-xl border border-white/5 space-y-4">
              <div>
                <label className="block text-[10px] text-gray-500 uppercase mb-1">Question</label>
                <input type="text" className="w-full bg-[#0a1128] border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:border-cyan-500 outline-none" 
                  value={faq.question} onChange={(e) => handleFAQChange(index, 'question', e.target.value)} />
              </div>
              <div>
                <label className="block text-[10px] text-gray-500 uppercase mb-1">Answer</label>
                <textarea rows={3} className="w-full bg-[#0a1128] border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:border-cyan-500 outline-none" 
                  value={faq.answer} onChange={(e) => handleFAQChange(index, 'answer', e.target.value)} />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Sticky Save Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-[#0a1128]/80 backdrop-blur-xl border-t border-white/10 p-4 z-50">
        <div className="max-w-7xl mx-auto flex justify-between items-center px-2">
          <p className="text-sm text-gray-400">Changes take effect on the live site immediately after saving.</p>
          <button
            onClick={handleSave}
            disabled={saving}
            className="px-6 py-2.5 bg-cyan-600 text-white rounded-lg font-bold text-sm shadow-[0_0_15px_rgba(6,182,212,0.4)] hover:bg-cyan-500 transition-all disabled:opacity-50 flex items-center gap-2"
          >
            {saving ? "Saving..." : "Save Configuration"}
          </button>
        </div>
      </div>
    </div>
  );
}


