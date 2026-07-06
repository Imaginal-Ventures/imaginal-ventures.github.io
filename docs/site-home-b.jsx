/* =====================================================================
   IMAGINAL · HOME (canonical)
   Magazine spread layout. Built from variation B; now the only home.

   Sections:
     §00  Hero (split: dark cell panel | tagline + lede)
     §00  Proof numbers
     §01  Premise (Erin note)
     §02  Problems Worth Solving (the three problems we meet)
     §03  Programs (12-week block + 4 offerings)
     §04  Trust Pulse (external diagnostic on cbosystem.com)
     §05  Testimony (double quote)
     §06  Field Notes (Substack)
     §07  CTA + footer
   ===================================================================== */

/* ---------- 12-week periodization (moved from variation C) ---------- */
function PeriodizationStrip() {
  const weeks = Array.from({ length: 12 }, (_, i) => i + 1);
  const phase = (w) => w <= 4 ? "base" : w <= 8 ? "build" : w <= 10 ? "peak" : "recover";
  const heights = { base: 36, build: 48, peak: 76, recover: 28 };
  const colors = {
    base: "rgba(91,99,112,0.20)",
    build: "rgba(91,99,112,0.34)",
    peak: C.cell,
    recover: "rgba(91,99,112,0.20)"
  };
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(12, 1fr)", gap: 6 }}>
      {weeks.map((w) => {
        const ph = phase(w);
        return (
          <div key={w} style={{ textAlign: "center" }}>
            <div style={{ fontFamily: F.mono, fontSize: 9, letterSpacing: ".14em", color: C.mute, marginBottom: 6 }}>W{String(w).padStart(2, "0")}</div>
            <div style={{
              height: heights[ph],
              background: colors[ph],
              border: ph === "peak" ? `1px solid ${C.cell}` : `1px solid ${C.rule}`
            }} />
          </div>);
      })}
    </div>);
}

function PhaseLabel({ label, sub, accent }) {
  return (
    <div style={{ borderTop: `1px solid ${accent ? C.cell : C.rule}`, paddingTop: 8 }}>
      <p style={{ fontFamily: F.mono, fontSize: 11, letterSpacing: ".14em", textTransform: "uppercase", color: accent ? C.cell : C.slate, margin: 0 }}>{label}</p>
      <p style={{ fontFamily: F.body, fontStyle: "italic", fontSize: 13, color: C.slate, margin: "4px 0 0" }}>{sub}</p>
    </div>);
}

/* ---------- Local data: programs, problems, field notes ---------- */
const PROGRAMS = [
{
  code: "01",
  name: "Growth Strategy Sprint",
  duration: "Design Sprint · 3–5 days",
  body: "Close the growth strategy gap that sits upstream of funding. Determine what is genuinely desirable, financially viable, and operationally feasible as a venture, before you raise your next round.\n\nParticipants in growth strategy cohorts are eligible for The Pitch Lab, a curated group of investors matched to the cohort's sector focus.",
  tag: "By cohort or custom engagements"
},
{
  code: "02",
  name: "Team Scaling Sprint",
  duration: "Design Sprint · 3–5 days",
  body: "Develop a people roadmap that is as critical to success as product roadmaps were to securing first pilot customers. Identify essential team capabilities, assess current capacity, and model future scenarios based on customer needs.\n\nFounders determine how to offload key responsibilities over time, and develop tools to attract, secure and retain essential people.",
  tag: "By cohort or custom engagements"
},
{
  code: "03",
  name: "Advisory",
  duration: "Consult · Ongoing",
  body: "Our strategic relationship picks up where the sprint ends, or begins where a founder needs a thinking partner most. We work directly with founders navigating the shift from traction to scale on the decision that lever growth: capital strategy, team architecture, and moving from founder-led to leadership-led. \nAdvisory is powered by the Conscious Business Operating System, Imaginal's OS platform that integrates the business mechanics of scale with the human dynamics systems that enable teams to implement with velocity.",
  tag: "Entry · Initial consult"
},
{
  code: "04",
  name: "Leadership Offsite",
  duration: "Offsite · 2–3 days",
  body: "Custom-designed offsites that turn a leadership group into a leadership team. Designed for the founder who needs to shift from owning everything — from being the bottleneck to building collective capability.\n\nWe work with teams who recognize that making decisions together about their future reduces co-founder conflict, and improves their ability to implement with velocity.",
  tag: "Custom engagements"
}];


const PROBLEMS = [
{
  ix: "I",
  label: "Capital",
  headline: "We need capital. On terms we can live with.",
  body: "How much. From whom. Against what expectations. And what we'll have to build together, over five years, to create value and achieve sustainable scale.",
  meets: "Growth Strategy Sprint"
},
{
  ix: "II",
  label: "Team",
  headline: "The team that got us here can't get us there alone.",
  body: "The business is scaling faster than you can add people to it. The next phase needs a leadership group that can decide together, disagree together, and carry weight you've been carrying alone.",
  meets: "Team Scaling Sprint"
},
{
  ix: "III",
  label: "Stage",
  headline: "Moving from product build to business build.",
  body: "The product is real. The team is good. But the company has not yet become the business it needs to be — and the next year is the one where that transition either happens, or doesn't.",
  meets: "Leadership Offsite"
}];


// Populated at build time by .github/workflows/update-substack-notes.yml from the
// live Substack feed (see notes-data.js). Falls back to these placeholders if that
// file hasn't run yet or fails to load.
const NOTES = window.NOTES_DATA || [
{ n: "No. 003", date: "2026 · V · 14", title: "Capital Readiness Series #1: Telus Global Ventures", href: "https://imaginalventures.substack.com/" },
{ n: "No. 002", date: "2026 · IV · 30", title: "There’s no SLA in marriage. Co-founders can do better.", href: "https://imaginalventures.substack.com/" },
{ n: "No. 001", date: "2026 · IV · 12", title: "On the Value of Art & Science.", href: "https://imaginalventures.substack.com/" }];


/* ---------- Team — founders / partners ---------- */
const TEAM = [
{
  id: "erin",
  name: "Erin O'Keefe Graham",
  role: "Managing Partner",
  bio: "Erin O'Keefe Graham helps founders bridge the gap between traction and scale. Alongside her work at Imaginal, she is a 10-year angel investor, a member of East Valley Ventures, and an LP with Women's Equity Lab Atlantic.\n\nPrior to Imaginal, Erin led the deep tech incubator at Dalhousie University, growing venture pipeline as a feeder to CDL Atlantic and CDL Oceans, and seeing more than 400 jobs created in the region as part of alumni ventures.\n\nHer career has spanned transaction-driven marketing (IPO roadshows, brand acquisitions), global brand strategy and culture (Interbrand, KPMG Intl), and venture building across Toronto and Nova Scotia's startup ecosystems.\n\nErin's development of brand culture and behaviour transformation methodologies at Interbrand moved her from Toronto to New York headquarters and drove adoption of her tools across global B2B clients. As head of global brand for KPMG Intl, Erin managed 150 country firms as customers and rolled out purpose globally as a driver of employer brand.\n\nErin shifted her consulting practice from large enterprise to small businesses in 2018, where growth and change happen quickly, and businesses only survive through determined, intentional leadership.",
  quote: "Leadership is relationship: when we focus on human dynamics, we set a venture in motion for sustainable scale.",
  img: "images/erin-okeefe-graham-managing-partner-imaginal.jpg",
  fit: "cover",
  position: "50% 25%"
},
{
  id: "partner",
  name: "Dorothy Spence",
  role: "Founding Partner",
  bio: "Dorothy Spence works with founders and leaders who want to build businesses that perform from the inside out — where purpose and commercial return reinforce each other rather than compete.\n\nAs Founding Partner of Imaginal Ventures and creator of the Conscious Business Operating System, Dorothy brings together two things most advisory firms keep separate: the rigour of business mechanics and the depth of human dynamics. She works primarily with healthtech and cleantech founders, and with women innovators building companies that are meant to last.\n\nHer path to this work spans three chapters. She began analytically — an engineering degree, an MBA, and her first company as co-founder and CEO of a national healthtech firm scaled across Canada. A second chapter brought a deliberate turn inward: coaching certification, deep study in human development, and years working on the inner dimensions of leadership.\n\nThose two worlds came together at a global business advisory firm in London. She left to found Imaginal Ventures, where she created the Conscious Business Operating System — now applied with over 300 businesses across Canada, the US, and Europe. Dorothy has served on advisory boards for Canada Health Infoway and the Atlantic Canada Economic Council, as a board member at Mount Saint Vincent University, and is completing the Canadian Council of Innovators Governance program.",
  quote: "Businesses don't transform — people do. And leaders go first.",
  img: "images/dorothy-spence-founding-partner-imaginal.jpg",
  fit: "cover",
  position: "50% 12%"
}];


/* ---------- The three Imaginal values — from brand guidelines ---------- */
const VALUES = [
{ ix: "i.", name: "Art & Science", slot: "value-art-science", caption: "Botanical / scientific plate — data meets craft", credit: "Image: Biodiversity Heritage Library · Young, Charlotte M. · 1858", img: "images/botanical-illustration-plants-domestic-economy-imaginal.jpg", imgPosition: "50% 35%", body: "We combine data-driven and neuroscience-informed methods with arts and creativity to enable inventive solutions.\n\nWe lever human responses to both art and science — both as a means to learning and processing, and as tools for creating lasting customer and employee relationships." },
{ ix: "ii.", name: "Candid Curiosity", slot: "value-candid-curiosity", caption: "Vintage art / music graphic — play and inquiry", credit: "Image: Weezer, Pinkerton · 1997", img: "images/weezer-pinkerton-album-cover-imaginal.webp", imgPosition: "50% 0%", body: "We will always be candid and foster curiosity in our work together. Clear is kind.\n\nCuriosity is the gateway to growth. Founders access growth and uncover blind spots when they have advisors who tell them the truth." },
{ ix: "iii.", name: "Effortful Growth", slot: "value-effortful-growth", caption: "Warm working image — sustained effort", credit: "Image: Radiohead, OK Computer · 1997", img: "images/radiohead-ok-computer-album-cover-imaginal.webp", imgPosition: "50% 0%", body: "We foster effortful growth for optimal performance at the human, team, and organization level.\n\nThe hardest things are worth doing. Founders work on decision-making collaboratively so they can forge relationships for the long term." }];


/* ---------- HOME ---------- */
function HomeVariationB() {
  return (
    <div style={{ maxWidth: 1280, margin: "0 auto", fontFamily: F.body, background: C.bone, color: C.ink }}>

      <div className="nav-sticky-wrap" style={{ padding: "0 64px" }}>
        <NavBar active="home" />
      </div>

      {/* HERO — split 50/50 */}
      <section className="hero-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1.1fr", borderBottom: `1px solid ${C.rule}`, minHeight: 720 }}>
        {/* Left: dark panel with cell graphic */}
        <div className="hero-dark" style={{ background: C.ink, color: C.bone, padding: "72px 56px", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
          <div style={{ display: "flex", justifyContent: "space-between", color: C.mute, fontFamily: F.mono, fontSize: 11, letterSpacing: ".14em", textTransform: "uppercase" }}>
            <span>Fig. 02 — Imaginal cells, T=0</span>
            <span> · 2026</span>
          </div>
          <div style={{ margin: "auto 0", width: "100%" }}>
            <CellGraphic cols={12} rows={4} size={26} ink={C.bone} animate={true} />
          </div>
          <div className="hero-caption" style={{ borderTop: `1px solid #2a2f36`, paddingTop: 18, color: C.mute, fontFamily: F.mono, fontSize: 10, letterSpacing: ".14em", textTransform: "uppercase", display: "flex", justifyContent: "space-between" }}>
            <span>Latent · activating · activated</span>
            <span>Three states, one form.</span>
          </div>
        </div>

        {/* Right: copy */}
        <div className="hero-copy" style={{ padding: "72px 64px", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
          <div>
            <p style={{ fontFamily: F.mono, fontSize: 11, letterSpacing: ".14em", textTransform: "uppercase", color: C.cell, margin: 0 }}>Imaginal · for purpose-led founders</p>
            <h1 className="hero-h1" style={{ fontFamily: F.display, fontStyle: "italic", fontWeight: 500, fontSize: 88, lineHeight: 1.02, letterSpacing: "-0.02em", margin: "20px 0 28px", textWrap: "pretty" }}>
              Build the business<br className="hero-break" />{" "}
              that <em style={{ color: C.cell }}>lasts the growth.</em>
            </h1>
            <p style={{ fontSize: 19, lineHeight: 1.55, color: C.slate, margin: 0, maxWidth: 540 }}>Imaginal helps brilliant CEOs gain the clarity and confidence to scale their purpose-led venture into a sustainable business. Since 2017, we've helped more than 300 ventures, 20 cohorts do the work, with intention.

            </p>
          </div>
          <div style={{ display: "flex", gap: 14, marginTop: 36 }}>
            <a href="#contact" style={{ fontFamily: F.mono, fontSize: 11, letterSpacing: ".18em", textTransform: "uppercase", background: C.ink, color: C.bone, padding: "16px 24px", textDecoration: "none" }}>Begin a conversation →</a>
            <a href="#offering" style={{ fontFamily: F.mono, fontSize: 11, letterSpacing: ".18em", textTransform: "uppercase", border: `1px solid ${C.ink}`, padding: "16px 24px", color: C.ink, textDecoration: "none" }}>The Offering</a>
          </div>
        </div>
      </section>

      <div style={{ padding: "0 64px" }}>

        {/* PROOF NUMBERS */}
        <section style={{ padding: "48px 0 32px" }}>
          <div className="proof-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 0 }}>
            {COPY.proof.map((p, i) =>
            <div key={i} className="proof-item" style={{ borderRight: i < 3 ? `1px solid ${C.rule}` : "none", padding: "16px 24px" }}>
                <div className="proof-num" style={{ fontFamily: F.display, fontStyle: "italic", fontWeight: 500, fontSize: 64, lineHeight: 1, color: C.cell, letterSpacing: "-0.02em" }}>{p.n}</div>
                <div style={{ fontFamily: F.mono, fontSize: 10, letterSpacing: ".14em", textTransform: "uppercase", color: C.slate, marginTop: 14 }}>{p.label}</div>
              </div>
            )}
          </div>
        </section>

        {/* §01 PHILOSOPHY */}
        <section id="philosophy" style={{ padding: "48px 0 64px" }}>
          <SectionHead ix="§ 01" label="Philosophy" tag="" />

          {/* Found-image plate — the editorial opener for Philosophy.
                                                       Drop a botanical, anatomical, or scientific drawing in. */}
          <div style={{ marginTop: 32, marginBottom: 40, border: `1px solid ${C.rule}`, background: C.bone2 }}>
            <div style={{ display: "flex", justifyContent: "space-between", padding: "12px 18px", borderBottom: `1px solid ${C.ruleSoft}`, fontFamily: F.mono, fontSize: 10, letterSpacing: ".14em", textTransform: "uppercase", color: C.slate }}>
              <span>Fig. 03 — Found plate · Philosophy</span>
              <span></span>
            </div>
            <img
              src="images/japanese-butterfly-plate-rhopalocera-nihonica-imaginal.jpg"
              alt="Vintage Japanese butterfly illustration plate, Rhopalocera Nihonica, printed in Yokohama circa 1886–1889"
              style={{ display: "block", width: "100%", height: 380, objectFit: "cover" }} />
            
            <div style={{ padding: "10px 18px", fontFamily: F.body, fontStyle: "italic", fontSize: 13, color: C.slate, borderTop: `1px solid ${C.ruleSoft}` }}>Source - Yokohama: Printed at the Office of the "Japan mail", Published by the author, 1886–1889.</div>
          </div>

          <div className="philosophy-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, paddingTop: 12, fontFamily: "\"Cormorant Garamond\"" }}>
            <div style={{ borderTop: `2px solid ${C.cell}`, paddingTop: 24 }}>
              <p style={{ fontFamily: F.display, fontStyle: "italic", fontWeight: 500, fontSize: 32, lineHeight: 1.2, margin: 0, whiteSpace: "pre-line" }}>{`Ventures don’t achieve sustainable scale by accident.

They get there by being as intentional about building the business as they have been in building the product.

Imaginal exists for this work.`}</p>
            </div>
            <div>
              <p style={{ fontFamily: F.body, fontSize: 17, lineHeight: 1.65, color: C.slate, margin: 0, whiteSpace: "pre-line" }}>{`Imaginal cells carry the genetic blueprint for an organism’s future form. They lie dormant until conditions are right for transformation. Existing structures must dissolve for the new form to emerge.

Ventures with traction are in this interim stage of growth: the founder is carrying a vision that the current organization can’t yet carry out. The team is a group of capable individuals, but they lack collective capability.

Growth-stage ventures need to activate a blueprint for scale that’s unique to their business. It requires a founder who can see the future clearly and build toward it deliberately. And it requires a shift from a founder-dependent startup to a team with collective capability, designed to create greater value and impact together.`}</p>
              <p style={{ fontFamily: F.mono, fontSize: 11, letterSpacing: ".14em", textTransform: "uppercase", color: C.mute, marginTop: 28 }}>Erin O'Keefe Graham · Managing Partner</p>
            </div>
          </div>

          {/* Three Imaginal Values — the texture of how we show up */}
          <div style={{ marginTop: 72, paddingTop: 28, borderTop: `1px solid ${C.ink}` }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 28, fontFamily: F.mono, fontSize: 11, letterSpacing: ".14em", textTransform: "uppercase", color: C.slate }}>
              <span>Three values · how we show up</span>
              <span style={{ color: C.mute }}>What founders experience</span>
            </div>
            <p style={{ fontFamily: F.display, fontStyle: "italic", fontWeight: 500, fontSize: 28, lineHeight: 1.25, color: C.ink, maxWidth: 880, margin: "0 0 32px", textWrap: "balance" }}>
              Our values are our beliefs in action: what founders experience when they work with us.
            </p>
            <div className="values-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 0 }}>
              {VALUES.map((v, i) => <div key={i} className="values-item" style={{ borderTop: `1px solid ${C.rule}`, borderLeft: i === 0 ? "none" : `1px solid ${C.ruleSoft}`, padding: "20px 24px 8px" }}>
                  {/* small found-image box for the value */}
                  <img
                    src={v.img}
                    alt={`${v.credit.replace(/^Image:\s*/, "")} — illustrating Imaginal's "${v.name}" value`}
                    style={{ display: "block", width: "100%", height: 150, marginBottom: 0, border: `1px solid ${C.rule}`, background: C.bone2, objectFit: "cover", objectPosition: v.imgPosition || "center" }} />
                  {/* image credit — click to edit */}
                  <div style={{ fontFamily: F.mono, fontSize: 9, letterSpacing: ".08em", textTransform: "uppercase", color: C.mute, padding: "8px 0 0", marginBottom: 18, lineHeight: 1.5 }}>
                    {v.credit}
                  </div>

                  <div style={{ fontFamily: F.display, fontStyle: "italic", fontWeight: 500, fontSize: 22, color: C.cell, lineHeight: 1, marginBottom: 6 }}>
                    {v.ix}
                  </div>
                  <h4 style={{ fontFamily: F.display, fontStyle: "italic", fontWeight: 500, fontSize: 32, lineHeight: 1.05, color: C.ink, letterSpacing: "-0.01em", margin: "0 0 16px" }}>
                    {v.name}
                  </h4>
                  <p style={{ fontFamily: F.body, fontSize: 15, lineHeight: 1.55, color: C.slate, margin: 0, whiteSpace: "pre-line" }}>{v.body}
                  </p>
                </div>)}
            </div>
          </div>
        </section>

        {/* §02 TEAM */}
        <section id="team" style={{ padding: "32px 0 64px" }}>
          <SectionHead ix="§ 02" label="Team" tag="Who you'll work with" />
          <p style={{ fontFamily: F.display, fontStyle: "italic", fontWeight: 500, fontSize: 32, lineHeight: 1.25, color: C.ink, maxWidth: 880, margin: "32px 0 40px", textWrap: "balance", whiteSpace: "pre-line" }}>
            {`Imaginal is a small practice, on purpose.
We specialize in intimate, purposeful sessions with tangible outcomes.`}
          </p>

          <div className="team-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 56 }}>
            {TEAM.map((m, i) => <div key={m.id} style={{ display: "flex", flexDirection: "column" }}>
                {/* Portrait plate */}
                <div style={{ border: `1px solid ${C.rule}`, background: C.bone2, maxWidth: 320 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", padding: "10px 16px", borderBottom: `1px solid ${C.ruleSoft}`, fontFamily: F.mono, fontSize: 10, letterSpacing: ".14em", textTransform: "uppercase", color: C.slate }}>
                    <span>Plate {String(i + 1).padStart(2, "0")} · {m.name === "[ Partner name ]" ? "—" : m.name.split(" ")[0]}</span>
                    <span>Portrait</span>
                  </div>
                  <img
                  src={m.img}
                  alt={`Portrait of ${m.name}, ${m.role} at Imaginal`}
                  style={{ display: "block", height: 380, width: "100%", objectFit: m.fit || "contain", objectPosition: m.position || "50% 30%" }} />

                </div>

                {/* Identification line */}
                <div style={{ marginTop: 24, display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
                  <h3 style={{ fontFamily: F.display, fontStyle: "italic", fontWeight: 500, fontSize: 40, lineHeight: 1.05, letterSpacing: "-0.01em", margin: 0, color: C.ink }}>{m.name}</h3>
                  <span style={{ fontFamily: F.mono, fontSize: 11, letterSpacing: ".14em", textTransform: "uppercase", color: C.cell }}>§ {String(i + 1).padStart(2, "0")}</span>
                </div>
                <p style={{ fontFamily: F.mono, fontSize: 11, letterSpacing: ".18em", textTransform: "uppercase", color: C.slate, margin: "6px 0 18px" }}>{m.role}</p>

                {/* Bio */}
                <p style={{ fontFamily: F.body, fontSize: 16, lineHeight: 1.6, color: C.slate, margin: 0, whiteSpace: "pre-line" }}>{m.bio}</p>

                {/* Quote */}
                <p style={{ fontFamily: F.display, fontStyle: "italic", fontWeight: 500, fontSize: 20, lineHeight: 1.35, color: C.ink, margin: "24px 0 0", paddingLeft: 16, borderLeft: `1px solid ${C.cell}` }}>
                  {m.quote}
                </p>
              </div>
            )}
          </div>
        </section>

        {/* §03 PROBLEMS WORTH SOLVING */}
        <section id="problems" style={{ padding: "32px 0 64px" }}>
          <SectionHead ix="§ 03" label="Problems Worth Solving" tag="What founders bring us" />
          <p style={{ fontFamily: F.display, fontStyle: "italic", fontWeight: 500, fontSize: 36, lineHeight: 1.2, color: C.ink, maxWidth: 880, margin: "32px 0 36px", textWrap: "balance" }}>
            Three problems we are hearing, in nearly every founder conversation we have.
          </p>
          <div className="problems-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 1, background: C.rule, border: `1px solid ${C.rule}` }}>
            {PROBLEMS.map((p, i) =>
            <div key={i} className="problems-item" style={{ background: C.bone, padding: "36px 32px", display: "flex", flexDirection: "column", width: "355px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 18 }}>
                  <span style={{ fontFamily: F.display, fontStyle: "italic", fontWeight: 500, fontSize: 36, color: C.cell, lineHeight: 1, letterSpacing: "-0.01em" }}>{p.ix}</span>
                  <span style={{ fontFamily: F.mono, fontSize: 10, letterSpacing: ".18em", textTransform: "uppercase", color: C.mute, alignSelf: "baseline" }}>{p.label}</span>
                </div>
                <h4 style={{ fontFamily: F.display, fontStyle: "italic", fontWeight: 500, fontSize: 28, lineHeight: 1.15, margin: "0 0 16px", letterSpacing: "-0.01em", textWrap: "balance" }}>{p.headline}</h4>
                <p style={{ fontSize: 15, lineHeight: 1.55, color: C.slate, margin: 0 }}>{p.body}</p>
                <a href="#offering" className="problems-meet" style={{ fontFamily: F.mono, fontSize: 10, letterSpacing: ".14em", textTransform: "uppercase", color: C.cell, marginTop: "auto", paddingTop: 24, textDecoration: "none", display: "inline-block", width: "290px" }}>
                  We meet it with: {p.meets} →
                </a>
              </div>
            )}
          </div>
        </section>

        {/* §03 PROGRAMS — 4 cards, opened by a full-bleed editorial image */}
        <section id="offering" style={{ padding: "32px 0 64px" }}>

          {/* Full-bleed band image — "the instruments of the work".
                                                       Negative side margins break out of the 64px column padding. */}
          <div style={{ marginLeft: -64, marginRight: -64, marginBottom: 36 }}>
            <img
              src="images/elvis-costello-imperial-bedroom-album-cover-imaginal.webp"
              alt="Elvis Costello and the Attractions, Imperial Bedroom album cover art, 1982"
              style={{ display: "block", width: "100%", height: 320, objectFit: "cover" }} />
            
            <div className="band-caption" style={{ padding: "12px 64px 0", display: "flex", justifyContent: "space-between", fontFamily: F.mono, fontSize: 10, letterSpacing: ".14em", textTransform: "uppercase", color: C.mute }}>
              <span>Fig. 04 — The instruments of the work</span>
              <span>ELVIS COSTELLO AND THE ATTRACTIONS · 1982</span>
            </div>
          </div>

          <SectionHead ix="§ 04" label="Offering" tag="Four engagements" />

          <div className="programs-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 1, background: C.rule, border: `1px solid ${C.rule}`, marginTop: 36 }}>
            {PROGRAMS.map((p, i) =>
            <div key={i} style={{ background: C.bone, padding: "32px 28px", display: "flex", flexDirection: "column" }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 18 }}>
                  <span style={{ fontFamily: F.mono, fontSize: 11, letterSpacing: ".14em", textTransform: "uppercase", color: C.cell }}>№ {p.code}</span>
                  <span style={{ fontFamily: F.mono, fontSize: 10, letterSpacing: ".14em", textTransform: "uppercase", color: C.mute }}>{p.duration}</span>
                </div>
                <h4 style={{ fontFamily: F.display, fontStyle: "italic", fontWeight: 500, fontSize: 38, margin: "0 0 14px", lineHeight: 1.1, letterSpacing: "-0.01em" }}>{p.name}</h4>
                <p style={{ fontSize: 15, lineHeight: 1.55, color: C.slate, margin: 0, whiteSpace: "pre-line" }}>{p.body}</p>
                <span style={{ fontFamily: F.mono, fontSize: 10, letterSpacing: ".14em", textTransform: "uppercase", color: C.slate, marginTop: "auto", paddingTop: 24 }}>{p.tag}</span>
              </div>
            )}
          </div>
        </section>

        {/* §04 TRUST PULSE — external diagnostic */}
        <section id="trust" style={{ padding: "32px 0 64px" }}>
          <SectionHead ix="§ 05" label="On Trust" tag="A separate platform" />
          <a
            href="https://www.cbosystem.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="trust-card"
            style={{
              display: "grid",
              gridTemplateColumns: "1fr auto",
              gap: 48,
              alignItems: "center",
              marginTop: 36,
              padding: "44px 40px",
              border: `1px solid ${C.ink}`,
              background: C.bone,
              color: C.ink,
              textDecoration: "none"
            }}>
            
            <div>
              <p style={{ fontFamily: F.mono, fontSize: 11, letterSpacing: ".14em", textTransform: "uppercase", color: C.cell, margin: 0 }}>TRUST DIAGNOSTIC · CBOSYSTEM.COM ↗

              </p>
              <h3 style={{ fontFamily: F.display, fontStyle: "italic", fontWeight: 500, fontSize: 44, lineHeight: 1.05, letterSpacing: "-0.01em", margin: "14px 0 16px", textWrap: "balance" }}>If growth is the question, trust is the answer.

              </h3>
              <p style={{ fontSize: 16, lineHeight: 1.55, color: C.slate, margin: 0, maxWidth: 720 }}>The Trust Diagnostic comprises twenty-one targeted statements that reveal whether your organization is reaping a Trust Dividend or paying a Trust Tax, and offers a path forward. Built by Imaginal, hosted at cbosystem.com.

              </p>
            </div>
            <span className="trust-cta" style={{ fontFamily: F.mono, fontSize: 11, letterSpacing: ".18em", textTransform: "uppercase", background: C.ink, color: C.bone, padding: "18px 28px", display: "inline-block", whiteSpace: "nowrap" }}>TAKE THE TRUST DIAGNOSTIC →

            </span>
          </a>
        </section>

        {/* §05 DOUBLE QUOTE */}
        <section style={{ padding: "32px 0 64px" }}>
          <div className="testimonials-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, alignItems: "start" }}>
            {COPY.testimonials.map((t, i) =>
            <div key={i}>
                <span style={{ fontFamily: F.display, fontStyle: "italic", fontWeight: 600, fontSize: 100, lineHeight: 0.6, color: C.cell, display: "block", marginBottom: 18 }}>"</span>
                <p style={{ fontFamily: F.display, fontStyle: "italic", fontWeight: 500, fontSize: 26, lineHeight: 1.3, margin: 0 }}>{t.quote}</p>
                <p style={{ fontFamily: F.mono, fontSize: 10, letterSpacing: ".14em", textTransform: "uppercase", color: C.slate, marginTop: 22 }}>— {t.who}</p>
              </div>
            )}
          </div>
        </section>

        {/* §06 FIELD NOTES → SUBSTACK */}
        <section id="notes" style={{ padding: "32px 0 64px" }}>
          <SectionHead ix="§ 06" label="Field Notes" tag="From the Substack" />
          <div className="notes-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 32, paddingTop: 36 }}>
            {NOTES.map((n, i) =>
            <a key={i} href={n.href} target="_blank" rel="noopener noreferrer" style={{ borderTop: `1px solid ${C.ink}`, paddingTop: 18, color: C.ink, textDecoration: "none" }}>
                <div style={{ fontFamily: F.mono, fontSize: 10, letterSpacing: ".14em", textTransform: "uppercase", color: C.slate, display: "flex", justifyContent: "space-between" }}>
                  <span>{n.n}</span><span>{n.date}</span>
                </div>
                <h4 style={{ fontFamily: F.display, fontStyle: "italic", fontSize: 28, lineHeight: 1.15, margin: "14px 0 14px" }}>{n.title}</h4>
                <span style={{ fontFamily: F.mono, fontSize: 10, letterSpacing: ".14em", textTransform: "uppercase", color: C.cell }}>Read on Substack →</span>
              </a>
            )}
          </div>
          <div style={{ marginTop: 36, paddingTop: 20, borderTop: `1px solid ${C.rule}`, display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
            <p style={{ fontFamily: F.body, fontStyle: "italic", fontSize: 17, color: C.slate, margin: 0 }}>
              <em>Imaginal</em> — exploring the tension and complexity that comes with building a purpose-led venture. By Erin O'Keefe Graham.
            </p>
            <a href="https://imaginalventures.substack.com/" target="_blank" rel="noopener noreferrer" style={{ fontFamily: F.mono, fontSize: 11, letterSpacing: ".18em", textTransform: "uppercase", color: C.ink, textDecoration: "none", borderBottom: `1px solid ${C.ink}`, paddingBottom: 4 }}>
              Subscribe on Substack ↗
            </a>
          </div>
        </section>

        {/* §07 CTA */}
        <section id="contact" style={{ padding: "32px 0 96px" }}>
          <div className="cta-grid" style={{ background: C.ink, color: C.bone, padding: "56px 48px", display: "grid", gridTemplateColumns: "1.5fr 1fr", gap: 36, alignItems: "center" }}>
            <div>
              <p style={{ fontFamily: F.mono, fontSize: 11, letterSpacing: ".14em", textTransform: "uppercase", color: C.mute, marginBottom: 12 }}>JOIN US</p>
              <h3 className="cta-h3" style={{ fontFamily: F.display, fontStyle: "italic", fontWeight: 500, fontSize: 48, margin: 0, lineHeight: 1.05, letterSpacing: "-0.01em" }}>The conversation begins here.

              </h3>
            </div>
            <div className="cta-btn-wrap" style={{ textAlign: "right" }}>
              <a href="mailto:erin@imaginalventures.com" style={{ fontFamily: F.mono, fontSize: 11, letterSpacing: ".18em", textTransform: "uppercase", background: C.bone, color: C.ink, padding: "18px 28px", display: "inline-block", textDecoration: "none" }}>Begin →</a>
            </div>
          </div>
        </section>

        {/* FOOTER */}
        <footer style={{ padding: "48px 0 64px", color: C.slate, borderTop: `1px solid ${C.rule}` }}>
          <div className="footer-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 48, paddingTop: 32 }}>
            <div>
              <Wordmark width={150} />
              <p style={{ fontFamily: F.display, fontStyle: "italic", fontSize: 17, marginTop: 14, lineHeight: 1.35, color: C.ink }}>Build the business that lasts the growth.</p>
            </div>
            <div>
              <h6 style={{ fontFamily: F.mono, fontSize: 10, letterSpacing: ".14em", textTransform: "uppercase", color: C.mute, margin: "0 0 12px", fontWeight: 400 }}>Practice</h6>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, fontFamily: F.mono, fontSize: 11, letterSpacing: ".06em", lineHeight: 1.8 }}>
                <li>Programs</li>
                <li>Problems we solve</li>
                <li><a href="https://www.cbosystem.com/" target="_blank" rel="noopener noreferrer" style={{ color: "inherit", textDecoration: "none" }}>Trust Pulse ↗</a></li>
                <li><a href="https://imaginalventures.substack.com/" target="_blank" rel="noopener noreferrer" style={{ color: "inherit", textDecoration: "none" }}>Field Notes ↗</a></li>
                <li>Contact</li>
              </ul>
            </div>
            <div>
              <h6 style={{ fontFamily: F.mono, fontSize: 10, letterSpacing: ".14em", textTransform: "uppercase", color: C.mute, margin: "0 0 12px", fontWeight: 400 }}>Correspondence</h6>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, fontFamily: F.mono, fontSize: 11, letterSpacing: ".06em", lineHeight: 1.8 }}>
                <li>erin@imaginalventures.com</li>
                <li>Imaginal · Est. 2017</li>
              </ul>
            </div>
          </div>
        </footer>
      </div>
    </div>);
}

Object.assign(window, { HomeVariationB, PeriodizationStrip, PhaseLabel, PROGRAMS, PROBLEMS, NOTES, TEAM, VALUES });