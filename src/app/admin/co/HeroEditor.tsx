"use client";

import { useState, useEffect } from "react";

const DEFAULTS = {
  eyebrow: "FLOWTARIS",
  heroTitle: "WE DON'T JUST\nDELIVER SYSTEMS.\nWE MAKE THE\nDECISIONS BEHIND THEM\nVISIBLE.",
  heroSubtitle: "Engineering complex systems for companies where reliability, judgment, and execution matter.",
  heroImage: "/hero_image.png",
  ctaText: "EXPLORE OUR JUDGMENT →",
  ctaLink: "#judgment",
};

export default function HeroEditor({ site }: { site: string }) {
  const [eyebrow, setEyebrow] = useState(DEFAULTS.eyebrow);
  const [heroTitle, setHeroTitle] = useState(DEFAULTS.heroTitle);
  const [heroSubtitle, setHeroSubtitle] = useState(DEFAULTS.heroSubtitle);
  const [heroImage, setHeroImage] = useState(DEFAULTS.heroImage);
  const [ctaText, setCtaText] = useState(DEFAULTS.ctaText);
  const [ctaLink, setCtaLink] = useState(DEFAULTS.ctaLink);
  const [isUploadingImage, setIsUploadingImage] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState<{ type: "success" | "error"; message: string } | null>(null);

  useEffect(() => { fetchData(); }, [site]);

  // Clear save status after 4 seconds
  useEffect(() => {
    if (saveStatus) {
      const timer = setTimeout(() => setSaveStatus(null), 4000);
      return () => clearTimeout(timer);
    }
  }, [saveStatus]);

  async function fetchData() {
    setLoading(true);
    try {
      const res = await fetch(`/api/admin-content/${site}?table=page_content&id=home`);
      const { data, message, error } = await res.json();
      
      if (data && data.length > 0 && data[0].content) {
        setEyebrow(data[0].content.eyebrow || DEFAULTS.eyebrow);
        setHeroTitle(data[0].content.heroTitle || DEFAULTS.heroTitle);
        setHeroSubtitle(data[0].content.heroSubtitle || DEFAULTS.heroSubtitle);
        setHeroImage(data[0].content.heroImage || DEFAULTS.heroImage);
        setCtaText(data[0].content.ctaText || DEFAULTS.ctaText);
        setCtaLink(data[0].content.ctaLink || DEFAULTS.ctaLink);
      } else {
        if (message) console.warn(message);
        resetToDefaults();
      }
    } catch (err) {
      console.error("Failed to fetch", err);
      resetToDefaults();
    }
    setLoading(false);
  }

  async function save() {
    setSaving(true);
    setSaveStatus(null);
    try {
      const res = await fetch(`/api/admin-content/${site}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          table: "page_content",
          record: {
            id: "home",
            content: { eyebrow, heroTitle, heroSubtitle, heroImage, ctaText, ctaLink },
            updated_at: new Date().toISOString(),
          }
        }),
      });
      const { error } = await res.json();
      if (error) {
        setSaveStatus({ type: "error", message: "Error saving: " + error });
      } else {
        setSaveStatus({ type: "success", message: `Hero content saved! Changes will appear on flowtaris.${site}.` });
      }
    } catch (err) {
      setSaveStatus({ type: "error", message: "Network error while saving." });
    }
    setSaving(false);
  }

  async function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    if (!e.target.files || e.target.files.length === 0) return;
    const file = e.target.files[0];
    setIsUploadingImage(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await fetch("/api/upload", { method: "POST", body: formData });
      const data = await res.json();
      if (data.url) setHeroImage(data.url);
      else setSaveStatus({ type: "error", message: data.error || "Failed to upload image" });
    } catch { setSaveStatus({ type: "error", message: "Error uploading image" }); }
    finally { setIsUploadingImage(false); e.target.value = ""; }
  }

  async function handleRemoveImage() {
    if (heroImage && heroImage.startsWith("/uploads/")) {
      try { await fetch("/api/upload", { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ url: heroImage }) }); }
      catch (err) { console.error("Error deleting image file", err); }
    }
    setHeroImage("");
  }

  function resetToDefaults() {
    setEyebrow(DEFAULTS.eyebrow);
    setHeroTitle(DEFAULTS.heroTitle);
    setHeroSubtitle(DEFAULTS.heroSubtitle);
    setHeroImage(DEFAULTS.heroImage);
    setCtaText(DEFAULTS.ctaText);
    setCtaLink(DEFAULTS.ctaLink);
  }

  if (loading) return <div style={{ padding: 40, color: "#6B7280" }}>Loading hero content...</div>;

  const inputStyle = {
    width: "100%",
    background: "#F9FAFB",
    border: "1px solid #D1D5DB",
    padding: "10px 14px",
    borderRadius: 8,
    fontSize: 14,
    fontFamily: "inherit",
    color: "#111827",
    outline: "none",
    transition: "border-color 0.2s",
  };

  const labelStyle = {
    display: "block",
    marginBottom: 6,
    fontSize: 13,
    fontWeight: 600 as const,
    color: "#374151",
    textTransform: "uppercase" as const,
    letterSpacing: "0.5px",
  };

  const hintStyle = {
    fontSize: 12,
    color: "#9CA3AF",
    marginTop: 4,
  };

  return (
    <div style={{ maxWidth: 1100 }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 28 }}>
        <div>
          <h1 style={{ fontSize: 24, fontWeight: "bold", color: "#111827", marginBottom: 4 }}>Homepage & Hero</h1>
          <p style={{ color: "#6B7280", fontSize: 14 }}>Edit all the content in the hero section of your homepage.</p>
        </div>
      </div>

      {/* Save Status Banner */}
      {saveStatus && (
        <div style={{
          padding: "12px 16px",
          borderRadius: 8,
          marginBottom: 20,
          fontSize: 14,
          fontWeight: 500,
          background: saveStatus.type === "success" ? "#ECFDF5" : "#FEF2F2",
          color: saveStatus.type === "success" ? "#065F46" : "#991B1B",
          border: `1px solid ${saveStatus.type === "success" ? "#A7F3D0" : "#FECACA"}`,
        }}>
          {saveStatus.message}
        </div>
      )}

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 28, alignItems: "start" }}>

        {/* ── Left Column: Form Fields ── */}
        <div style={{ background: "#fff", borderRadius: 12, padding: 28, boxShadow: "0 1px 3px rgba(0,0,0,0.05)", border: "1px solid #E5E7EB" }}>
          <h2 style={{ fontSize: 16, fontWeight: 600, color: "#111827", marginBottom: 20, paddingBottom: 12, borderBottom: "1px solid #F3F4F6" }}>Content Fields</h2>

          {/* Eyebrow */}
          <div style={{ marginBottom: 20 }}>
            <label style={labelStyle}>Eyebrow Text</label>
            <input
              type="text"
              value={eyebrow}
              onChange={(e) => setEyebrow(e.target.value)}
              style={inputStyle}
              placeholder="e.g. FLOWTARIS"
            />
            <p style={hintStyle}>Small text above the main headline.</p>
          </div>

          {/* Hero Title */}
          <div style={{ marginBottom: 20 }}>
            <label style={labelStyle}>Hero Title</label>
            <textarea
              value={heroTitle}
              onChange={(e) => setHeroTitle(e.target.value)}
              style={{ ...inputStyle, height: 130, resize: "vertical" }}
              placeholder="Main headline text..."
            />
            <p style={hintStyle}>Use line breaks for formatting. Each line appears on a new line on the page.</p>
          </div>

          {/* Hero Subtitle */}
          <div style={{ marginBottom: 20 }}>
            <label style={labelStyle}>Hero Subtitle</label>
            <textarea
              value={heroSubtitle}
              onChange={(e) => setHeroSubtitle(e.target.value)}
              style={{ ...inputStyle, height: 80, resize: "vertical" }}
              placeholder="Supporting description text..."
            />
            <p style={hintStyle}>The supporting paragraph below the headline.</p>
          </div>

          {/* CTA Button Text */}
          <div style={{ marginBottom: 20 }}>
            <label style={labelStyle}>CTA Button Text</label>
            <input
              type="text"
              value={ctaText}
              onChange={(e) => setCtaText(e.target.value)}
              style={inputStyle}
              placeholder="e.g. EXPLORE OUR JUDGMENT →"
            />
            <p style={hintStyle}>The label on the call-to-action button.</p>
          </div>

          {/* CTA Button Link */}
          <div style={{ marginBottom: 20 }}>
            <label style={labelStyle}>CTA Button Link</label>
            <input
              type="text"
              value={ctaLink}
              onChange={(e) => setCtaLink(e.target.value)}
              style={inputStyle}
              placeholder="e.g. #judgment or /contact"
            />
            <p style={hintStyle}>Where the button navigates to. Use # for same-page anchors or / for other pages.</p>
          </div>

          {/* Hero Image */}
          <div style={{ marginBottom: 24 }}>
            <label style={labelStyle}>Hero Image</label>
            {heroImage ? (
              <div>
                <img src={heroImage} alt="Hero Preview" style={{ width: "100%", maxHeight: 180, objectFit: "cover", borderRadius: 8, border: "1px solid #E5E7EB", marginBottom: 10 }} />
                <div style={{ display: "flex", gap: 10 }}>
                  <button onClick={handleRemoveImage} style={{ background: "#FEE2E2", color: "#B91C1C", padding: "7px 14px", border: "none", borderRadius: 6, cursor: "pointer", fontSize: 13, fontWeight: 500 }}>Remove</button>
                  <label style={{ background: "#F3F4F6", color: "#374151", padding: "7px 14px", border: "none", borderRadius: 6, cursor: "pointer", fontSize: 13, fontWeight: 500, display: "inline-block" }}>
                    {isUploadingImage ? "Uploading..." : "Change Image"}
                    <input type="file" accept="image/*" onChange={handleImageUpload} style={{ display: "none" }} disabled={isUploadingImage} />
                  </label>
                </div>
              </div>
            ) : (
              <div style={{ padding: 20, border: "2px dashed #D1D5DB", borderRadius: 8, textAlign: "center" }}>
                <p style={{ fontSize: 13, color: "#6B7280", marginBottom: 10 }}>No image selected</p>
                <label style={{ background: "#2563EB", color: "#fff", padding: "7px 14px", border: "none", borderRadius: 6, cursor: "pointer", fontSize: 13, fontWeight: 500, display: "inline-block" }}>
                  {isUploadingImage ? "Uploading..." : "Upload Image"}
                  <input type="file" accept="image/*" onChange={handleImageUpload} style={{ display: "none" }} disabled={isUploadingImage} />
                </label>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div style={{ display: "flex", gap: 12, paddingTop: 16, borderTop: "1px solid #F3F4F6" }}>
            <button
              onClick={save}
              disabled={saving}
              style={{
                background: saving ? "#93C5FD" : "#2563EB",
                color: "#fff",
                padding: "10px 24px",
                border: "none",
                borderRadius: 8,
                cursor: saving ? "not-allowed" : "pointer",
                fontWeight: 600,
                fontSize: 14,
                transition: "background 0.2s",
              }}
            >
              {saving ? "Saving..." : "Save Changes"}
            </button>
            <button
              onClick={resetToDefaults}
              style={{ background: "#F3F4F6", color: "#374151", padding: "10px 20px", border: "none", borderRadius: 8, cursor: "pointer", fontWeight: 500, fontSize: 14 }}
            >
              Reset to Defaults
            </button>
          </div>
        </div>

        {/* ── Right Column: Live Preview ── */}
        <div style={{ background: "#fff", borderRadius: 12, padding: 28, boxShadow: "0 1px 3px rgba(0,0,0,0.05)", border: "1px solid #E5E7EB", position: "sticky", top: 20 }}>
          <h2 style={{ fontSize: 16, fontWeight: 600, color: "#111827", marginBottom: 20, paddingBottom: 12, borderBottom: "1px solid #F3F4F6" }}>Live Preview</h2>

          <div style={{ background: "#FAF9F6", borderRadius: 8, padding: 24, border: "1px solid #E5E7EB" }}>
            {/* Preview: Eyebrow */}
            <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: "2px", color: "#92785C", display: "block", marginBottom: 12 }}>
              {eyebrow || "FLOWTARIS"}
            </span>

            {/* Preview: Title */}
            <h1 style={{ fontSize: 20, fontWeight: 800, lineHeight: 1.15, color: "#0B1120", marginBottom: 12, textTransform: "uppercase" }}>
              {heroTitle ? heroTitle.split(/\\n|\n/).map((line, i, arr) => (
                <span key={i}>{line}{i < arr.length - 1 && <br />}</span>
              )) : "YOUR HEADLINE HERE"}
            </h1>

            {/* Preview: Subtitle */}
            <p style={{ fontSize: 13, color: "#555", lineHeight: 1.5, marginBottom: 16 }}>
              {heroSubtitle || "Your subtitle text here."}
            </p>

            {/* Preview: CTA */}
            <div style={{
              display: "inline-block",
              background: "#0B1120",
              color: "#fff",
              padding: "8px 16px",
              fontSize: 11,
              fontWeight: 600,
              letterSpacing: "1px",
              borderRadius: 0,
              marginBottom: 16,
            }}>
              {ctaText || "BUTTON TEXT"}
            </div>

            {/* Preview: Image */}
            {heroImage && (
              <div style={{ marginTop: 12 }}>
                <img src={heroImage} alt="Hero" style={{ width: "100%", borderRadius: 8, objectFit: "cover", maxHeight: 200 }} />
              </div>
            )}
          </div>

          <p style={{ fontSize: 11, color: "#9CA3AF", marginTop: 12, textAlign: "center" }}>
            This is a scaled-down preview. Actual page may differ slightly.
          </p>
        </div>
      </div>
    </div>
  );
}
