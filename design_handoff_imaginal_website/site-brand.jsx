/* =====================================================================
   IMAGINAL · SITE · Shared brand components
   ===================================================================== */

const { useState, useEffect, useRef, useMemo } = React;

const C = {
  ink: "#13171c",
  bone: "#f3f2eb",
  bone2: "#ecebe4",
  cell: "#c8504c",
  slate: "#5b6370",
  mute: "#9aa0a6",
  rule: "#d8d6cc",
  ruleSoft: "#e2e0d6"
};

const F = {
  display: "Cormorant Garamond, serif",
  body: "Newsreader, serif",
  mono: "IBM Plex Mono, monospace"
};

/* ---------- WORDMARK ---------- */
function Wordmark({ fg = C.ink, width = 280 }) {
  const W = 1000,H = 240;
  const lineY = 110;
  const outlineStroke = 1.6;
  const id = useMemo(() => `wm-${Math.random().toString(36).slice(2, 8)}`, []);
  return (
    <svg viewBox={`0 0 ${W} ${H}`} width={width} height={width * H / W} style={{ display: "block" }} xmlns="http://www.w3.org/2000/svg">
      <defs>
        <clipPath id={`${id}-a`}><rect x="0" y="0" width={W} height={lineY} /></clipPath>
        <clipPath id={`${id}-b`}><rect x="0" y={lineY} width={W} height={H - lineY} /></clipPath>
      </defs>
      <g clipPath={`url(#${id}-a)`}>
        <text x="20" y="170" fontFamily={F.display} fontStyle="italic" fontWeight="500" fontSize="200" fill="none" stroke={fg} strokeWidth={outlineStroke} strokeLinejoin="round" letterSpacing="-2">imaginal</text>
      </g>
      <g clipPath={`url(#${id}-b)`}>
        <text x="20" y="170" fontFamily={F.display} fontStyle="italic" fontWeight="500" fontSize="200" fill={fg} letterSpacing="-2">imaginal</text>
      </g>
      <line x1="20" y1={lineY} x2="980" y2={lineY} stroke={fg} strokeWidth={1.4 * 0.7} />
    </svg>);
}

/* ---------- IMAGINAL CELL (animated) ---------- */
function ImaginalCell({ accent = C.cell, ink = C.ink, cols = 14, rows = 4, size = 18, animate = true, pattern = "threshold" }) {
  const PATTERNS = {
    threshold: [[4, 0], [7, 1], [8, 1], [3, 2], [10, 2], [11, 2], [6, 3], [9, 3]],
    sparse: [[5, 1], [9, 2], [12, 1], [3, 3]],
    dense: [[2, 0], [5, 0], [9, 1], [10, 1], [12, 0], [3, 2], [7, 2], [10, 2], [5, 3], [8, 3], [11, 3]]
  };
  const activated = PATTERNS[pattern] || PATTERNS.threshold;
  const lookup = new Set(activated.map(([c, r]) => `${c}_${r}`));
  const w = Math.sqrt(3) * size;
  const h = 2 * size;
  const xStep = w;
  const yStep = h * 0.75;
  const padX = w * 0.5;
  const padY = size * 0.5;
  const svgW = (cols - 1) * xStep + w + padX * 2 + w / 2;
  const svgH = (rows - 1) * yStep + h + padY * 2;

  const [tick, setTick] = useState(0);
  useEffect(() => {
    if (!animate) return;
    let raf;
    const start = performance.now();
    const loop = (t) => {setTick(t - start);raf = requestAnimationFrame(loop);};
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [animate]);

  function hexPoints(cx, cy, s) {
    const pts = [];
    for (let i = 0; i < 6; i++) {
      const a = Math.PI / 3 * i + Math.PI / 6;
      pts.push(`${cx + s * Math.cos(a)},${cy + s * Math.sin(a)}`);
    }
    return pts.join(" ");
  }

  const hexes = [];
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const offsetX = r % 2 === 1 ? xStep / 2 : 0;
      const cx = padX + c * xStep + offsetX + w / 2;
      const cy = padY + r * yStep + h / 2;
      const active = lookup.has(`${c}_${r}`);
      const idx = c + r * cols;
      const revealMs = 60 * idx + (active ? 400 : 100);
      const reveal = animate ? Math.max(0, Math.min(1, (tick - revealMs) / 600)) : 1;
      let op = reveal;
      if (active && animate) op = reveal * (0.85 + 0.15 * Math.sin(tick / 1200 + idx * 0.4));
      hexes.push(
        <polygon
          key={`${c}_${r}`}
          points={hexPoints(cx, cy, size)}
          fill={active ? accent : "transparent"}
          stroke={active ? accent : ink}
          strokeOpacity={active ? 1 : 0.22}
          strokeWidth={1}
          style={{ opacity: op }} />);
    }
  }

  // animated activation count
  const total = cols * rows;
  const finalCount = activated.length;
  const visibleCount = animate ?
  activated.filter((_, i) => tick > 60 * (i * 2) + 400).length :
  finalCount;
  const pct = Math.round(visibleCount / total * 100);

  return { svg:
    <svg viewBox={`0 0 ${svgW} ${svgH}`} width="100%" height="auto" preserveAspectRatio="xMidYMid meet" style={{ display: "block" }} xmlns="http://www.w3.org/2000/svg">
      {hexes}
    </svg>, pct, finalCount, total };
}

function CellGraphic(props) {
  return ImaginalCell(props).svg;
}

/* ---------- PLATE (figure frame) ---------- */
function Plate({ fig, tag, children, dark }) {
  const bg = dark ? C.ink : C.bone;
  const fg = dark ? C.bone : C.ink;
  const meta = dark ? C.mute : C.slate;
  const ruleC = dark ? "#2a2f36" : C.ruleSoft;
  return (
    <div style={{ border: `1px solid ${dark ? "#2a2f36" : C.rule}`, background: bg, color: fg, position: "relative" }}>
      <div style={{ display: "flex", justifyContent: "space-between", padding: "14px 20px", color: meta, fontFamily: F.mono, fontSize: 10, letterSpacing: "0.14em", textTransform: "uppercase", borderBottom: `1px solid ${ruleC}` }}>
        <span>{fig}</span>
        <span>{tag}</span>
      </div>
      <div style={{ padding: "28px 24px" }}>
        {children}
      </div>
    </div>);
}

/* ---------- ANIMATED CELL WITH HEADER ---------- */
function CellPlate({ fig = "Fig. 02 — Imaginal cells, T=0", cols = 14, rows = 4, size = 18, animate = true, dark, pattern = "threshold" }) {
  const result = ImaginalCell({ cols, rows, size, animate, pattern, ink: dark ? C.bone : C.ink });
  return (
    <Plate fig={fig} tag={`Activation: ${result.pct}%`} dark={dark}>
      {result.svg}
      <div style={{ textAlign: "center", marginTop: 14, fontFamily: F.body, fontStyle: "italic", color: dark ? C.mute : C.slate, fontSize: 13 }}>
        <span style={{ fontFamily: F.mono, fontStyle: "normal", fontSize: 9, letterSpacing: ".14em", textTransform: "uppercase", margin: "0 6px" }}>latent</span>·
        <span style={{ fontFamily: F.mono, fontStyle: "normal", fontSize: 9, letterSpacing: ".14em", textTransform: "uppercase", margin: "0 6px" }}>activating</span>·
        <span style={{ fontFamily: F.mono, fontStyle: "normal", fontSize: 9, letterSpacing: ".14em", textTransform: "uppercase", margin: "0 6px" }}>activated</span>
      </div>
    </Plate>);
}

/* ---------- SECTION HEADER ---------- */
function SectionHead({ ix, label, tag, dark }) {
  const slate = dark ? C.mute : C.slate;
  const ruleC = dark ? "#2a2f36" : C.rule;
  return (
    <div style={{ display: "grid", gridTemplateColumns: "80px 1fr 140px", gap: 24, padding: "24px 0 18px", borderTop: `1px solid ${ruleC}`, color: slate, fontFamily: F.mono, fontSize: 11, letterSpacing: ".14em", textTransform: "uppercase", alignItems: "baseline" }}>
      <span>{ix}</span>
      <span>{label}</span>
      <span style={{ textAlign: "right", width: "140px" }}>{tag}</span>
    </div>);
}

/* ---------- NAV BAR ---------- */
function NavBar({ active = "home", dark }) {
  const fg = dark ? C.bone : C.ink;
  const meta = dark ? C.mute : C.slate;
  const items = [
  { id: "home", label: "Home" },
  { id: "philosophy", label: "Philosophy" },
  { id: "team", label: "Team" },
  { id: "problems", label: "Problems Worth Solving" },
  { id: "offering", label: "Offering" },
  { id: "trust", label: "On Trust" },
  { id: "notes", label: "Field Notes" }];

  return (
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", padding: "22px 0 18px", borderBottom: `1px solid ${dark ? "#2a2f36" : C.rule}` }}>
      <div style={{ display: "flex", alignItems: "baseline", gap: 14 }}>
        <Wordmark width={150} fg={fg} />
        <span style={{ fontFamily: F.mono, fontSize: 10, letterSpacing: ".14em", textTransform: "uppercase", color: meta }}>Est. 2017</span>
      </div>
      <div style={{ display: "flex", gap: 22, flexWrap: "wrap", justifyContent: "flex-end" }}>
        {items.map((it) =>
        <a key={it.id} href={`#${it.id}`} style={{ fontFamily: F.mono, fontSize: 11, letterSpacing: ".14em", textTransform: "uppercase", color: it.id === active ? fg : meta, position: "relative", paddingBottom: 4, borderBottom: it.id === active ? `1px solid ${fg}` : "1px solid transparent", textDecoration: "none", whiteSpace: "nowrap" }}>
            {it.label}
          </a>
        )}
      </div>
    </div>);
}

/* ---------- COPY DATA (placeholders — replace with real spreadsheet content) ---------- */
const COPY = {
  tagline: "The line where the hidden becomes visible — and stays.",
  premise: "Imaginal helps purpose-led founders build ventures through the growth stage. Since 2017, we have taken more than 300 ventures through Scale-Up and Investment programs — most of them women-led, many built in cleantech and healthcare, all of them serious about the work scale actually requires.",
  proof: [
  { n: "300+", label: "ventures supported" },
  { n: "$30.4m", label: "Total funds raised by ventures in 2023–2025 cohorts" },
  { n: "$2.5m", label: "Avg funds raised per venture in 2023–2025 cohorts" },
  { n: "70+", label: "Investors engaged in programs and direct venture meetings" }],

  programs: [
  { code: "01", name: "Scale-Up Program", duration: "12 weeks", body: "Our flagship. Periodized cohort program for founders past seed who are preparing to scale. Combines Human Dynamics with Business Mechanics — the inner work scale asks of you and the outer infrastructure that makes it durable.", tag: "Cohort-based · Free with partner support" },
  { code: "02", name: "Investment Program", duration: "Built alongside Scale-Up", body: "Curation of Funds: graduates of the Scale-Up Program pitch to invited VCs and family offices. In our March 2025 Curation, 2 of 6 finalist ventures secured funding above $5M.", tag: "Selective · Following Scale-Up" },
  { code: "03", name: "Growth Strategy Series", duration: "2026 · expanded", body: "A long-form strategy engagement for founders past first product fit, designed around the human dynamics of scaling teams. Building on a decade of Curation work.", tag: "New for 2026" },
  { code: "04", name: "Founder Sprints", duration: "2 days · offsite", body: "Just-in-time advisory — we immerse with you in a single problem, end with a working answer, and return you to running the business. One founder at a time.", tag: "On request · Intensive" }],

  testimonials: [
  { quote: "The scale-up program was a key part in setting the foundation for Mimosa’s growth this year. It was so important that I brought team members from Mimosa to participate. If you are launching a commercial product, I highly recommend you participate.", who: "Karen Cross — Founder & CEO · Mimosa Diagnostics" },
  { quote: "The Atlantic Canada Health Solutions Scale-Up Program provided an exceptional learning opportunity for DeCell Technologies Inc. to implement sustainable growth strategies. They created a supportive and interactive environment with peers to test learned evidence-based techniques. This has built the necessary foundation to realize our vision and impact global patient care.", who: "Sean Margueratt, MASc., PEng. · CEO & Cofounder, DeCell Technologies Inc." }],

  notes: [
  { n: "No. 014", date: "2026 · IV · 12", title: "On not coaching toward outcomes." },
  { n: "No. 013", date: "2026 · III · 28", title: "What the spreadsheet cannot say." },
  { n: "No. 012", date: "2026 · III · 02", title: "Periodization, borrowed from rowing." }]

};

Object.assign(window, { C, F, Wordmark, ImaginalCell, CellGraphic, CellPlate, Plate, SectionHead, NavBar, COPY });