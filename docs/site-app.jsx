/* =====================================================================
   IMAGINAL · SITE — Canonical home (no canvas wrapper)
   ===================================================================== */

function App() {
  return (
    <div style={{ background: C.bone, minHeight: "100vh" }}>
      <HomeVariationB />
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
