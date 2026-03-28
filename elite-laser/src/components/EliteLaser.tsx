"use client";
import { useState, useEffect, useRef } from "react";

const ADDICTIONS = [
  { id: "tabac",  label: "Tabac",      sub: "Arrêt du tabac",        icon: "🚬", desc: "La méthode laser auriculaire coupe l'envie en une séance." },
  { id: "alcool", label: "Alcool",     sub: "Réduction des envies",  icon: "🍷", desc: "Rééquilibrez votre système nerveux sans médicaments." },
  { id: "stress", label: "Stress",     sub: "Anxiété & burnout",     icon: "🧘", desc: "Retrouvez la sérénité grâce à l'auriculothérapie." },
  { id: "poids",  label: "Poids",      sub: "Gestion alimentaire",   icon: "⚖️", desc: "Réglez les dérèglements hormonaux liés à la faim." },
  { id: "sport",  label: "Motivation", sub: "Boost énergie & sport", icon: "💪", desc: "Libérez votre énergie naturelle et votre drive." },
];

const CABINETS = [
  { id: 1, city: "Lille",        addr: "12 Rue Faidherbe",  cp: "59000", emoji: "🏙️" },
  { id: 2, city: "Arras",        addr: "8 Place des Héros", cp: "62000", emoji: "⚜️" },
  { id: 3, city: "Valenciennes", addr: "3 Rue de Paris",    cp: "59300", emoji: "🌿" },
  { id: 4, city: "Douai",        addr: "15 Rue de Bellain", cp: "59500", emoji: "🏛️" },
];

const TEMOIGNAGES = [
  { name: "Sophie M.",   city: "Lille",        stars: 5, text: "Après 15 ans de tabagisme, j'ai arrêté en une seule séance. Incroyable. Je recommande sans hésiter.", tag: "Tabac" },
  { name: "Marc T.",     city: "Arras",        stars: 5, text: "Je fumais 2 paquets par jour. La séance laser a tout changé. Plus aucune envie depuis 8 mois !", tag: "Tabac" },
  { name: "Isabelle D.", city: "Valenciennes", stars: 5, text: "Mon stress chronique a disparu après 2 séances. Je dors enfin comme un bébé.", tag: "Stress" },
  { name: "Antoine R.",  city: "Douai",        stars: 5, text: "Méthode douce et efficace. Le praticien était à l'écoute. Résultats immédiats.", tag: "Poids" },
  { name: "Céline V.",   city: "Lille",        stars: 5, text: "J'avais essayé tout : patches, gommes, hypnose… Seul le laser Elite a fonctionné.", tag: "Tabac" },
  { name: "Thomas B.",   city: "Arras",        stars: 5, text: "Économies réalisées en 6 mois : 1 200€. Et surtout, je respire tellement mieux !", tag: "Tabac" },
];

const SLOTS_MATIN = ["09:00","09:30","10:00","10:30","11:00","11:30"];
const SLOTS_APREM = ["14:00","14:30","15:00","15:30","16:00","16:30","17:00","17:30"];
const JOURS       = ["Lun","Mar","Mer","Jeu","Ven","Sam"];
const MOIS_FR     = ["Janvier","Février","Mars","Avril","Mai","Juin","Juillet","Août","Septembre","Octobre","Novembre","Décembre"];

function getDaysInMonth(y: number, m: number) { return new Date(y, m + 1, 0).getDate(); }
function getFirstDay(y: number, m: number)    { return (new Date(y, m, 1).getDay() + 6) % 7; }
function formatEuro(n: number) {
  if (n >= 1000000) return `${(n/1000000).toFixed(1)}M€`;
  if (n >= 1000)    return `${(n/1000).toFixed(1)}k€`;
  return `${Math.round(n)}€`;
}

function AnimNumber({ value, duration = 800 }: { value: number; duration?: number }) {
  const [display, setDisplay] = useState(0);
  const prev = useRef(0);
  useEffect(() => {
    const start = prev.current, end = value, startTime = performance.now();
    const tick = (now: number) => {
      const p = Math.min((now - startTime) / duration, 1);
      const ease = 1 - Math.pow(1 - p, 3);
      setDisplay(start + (end - start) * ease);
      if (p < 1) requestAnimationFrame(tick);
      else prev.current = end;
    };
    requestAnimationFrame(tick);
  }, [value, duration]);
  return <span>{formatEuro(display)}</span>;
}

function ParticlesBg() {
  const particles = useRef([...Array(20)].map((_, i) => ({
    x: Math.random() * 100, y: Math.random() * 100,
    size: 1 + Math.random() * 2,
    opacity: 0.05 + Math.random() * 0.1,
    delay: i * 0.3,
  })));
  return (
    <div style={{ position:"absolute", inset:0, overflow:"hidden", pointerEvents:"none", zIndex:0 }}>
      {particles.current.map((p, i) => (
        <div key={i} style={{
          position:"absolute", borderRadius:"50%",
          width: p.size, height: p.size,
          background: "rgba(255,255,255,0.7)",
          left: `${p.x}%`, top: `${p.y}%`,
          animation: `floatP ${8 + i * 0.4}s ease-in-out ${p.delay}s infinite alternate`,
          opacity: p.opacity,
        }}/>
      ))}
    </div>
  );
}

function SmokeEffect() {
  return (
    <div style={{ position:"absolute", bottom:"15%", left:"50%", transform:"translateX(-50%)", pointerEvents:"none", zIndex:0 }}>
      {[...Array(6)].map((_, i) => (
        <div key={i} style={{
          position:"absolute",
          width: 20 + i * 18, height: 20 + i * 18,
          borderRadius:"50%",
          background: "radial-gradient(circle, rgba(255,255,255,0.06) 0%, transparent 70%)",
          bottom: 0, left: `${-50 + i * 20}px`,
          animation: `smokeUp ${5 + i * 0.8}s ease-out ${i * 0.6}s infinite`,
          filter: "blur(4px)",
        }}/>
      ))}
    </div>
  );
}

function SavingsChart({ daily }: { daily: number }) {
  const months = ["J","F","M","A","M","J","J","A","S","O","N","D"];
  const values = months.map((_, i) => daily * 30 * (i + 1));
  const max = values[values.length - 1] || 1;
  return (
    <div style={{ width:"100%" }}>
      <div style={{ display:"flex", alignItems:"flex-end", gap:3, height:72 }}>
        {values.map((v, i) => (
          <div key={i} style={{ flex:1, borderRadius:"3px 3px 0 0", minHeight:4,
            height: `${(v / max) * 68}px`,
            background: i === 11 ? "#fff" : `rgba(255,255,255,${0.1 + (i/11)*0.35})`,
            transition: "height 0.5s cubic-bezier(0.34,1.56,0.64,1)",
          }}/>
        ))}
      </div>
      <div style={{ display:"flex", marginTop:5 }}>
        {months.map((m,i) => (
          <div key={i} style={{ flex:1, textAlign:"center", fontSize:8, color:"rgba(255,255,255,0.25)" }}>{m}</div>
        ))}
      </div>
    </div>
  );
}

function Calendar({ selected, onSelect }: { selected: string; onSelect: (d: string) => void }) {
  const today = new Date();
  const [viewYear, setViewYear]   = useState(today.getFullYear());
  const [viewMonth, setViewMonth] = useState(today.getMonth());
  const days  = getDaysInMonth(viewYear, viewMonth);
  const first = getFirstDay(viewYear, viewMonth);
  const cells = [...Array(first).fill(null), ...Array(days).fill(0).map((_,i)=>i+1)];
  const isDisabled = (d: number|null) => {
    if (!d) return true;
    const dt = new Date(viewYear, viewMonth, d);
    return dt <= today || dt.getDay() === 0;
  };
  const isSelected = (d: number|null) => {
    if (!d || !selected) return false;
    return new Date(viewYear, viewMonth, d).toDateString() === new Date(selected).toDateString();
  };
  const prev = () => { if (viewMonth===0) { setViewMonth(11); setViewYear(y=>y-1); } else setViewMonth(m=>m-1); };
  const next = () => { if (viewMonth===11) { setViewMonth(0); setViewYear(y=>y+1); } else setViewMonth(m=>m+1); };
  return (
    <div style={{ userSelect:"none" }}>
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:12 }}>
        <button onClick={prev} style={{ background:"rgba(255,255,255,0.08)", border:"1px solid rgba(255,255,255,0.15)", color:"#fff", width:30, height:30, borderRadius:8, cursor:"pointer", fontSize:14 }}>‹</button>
        <span style={{ fontSize:13, fontWeight:600 }}>{MOIS_FR[viewMonth]} {viewYear}</span>
        <button onClick={next} style={{ background:"rgba(255,255,255,0.08)", border:"1px solid rgba(255,255,255,0.15)", color:"#fff", width:30, height:30, borderRadius:8, cursor:"pointer", fontSize:14 }}>›</button>
      </div>
      <div style={{ display:"grid", gridTemplateColumns:"repeat(7,1fr)", gap:2, marginBottom:4 }}>
        {JOURS.map(j=>(
          <div key={j} style={{ textAlign:"center", fontSize:9, color:"rgba(255,255,255,0.3)", padding:"3px 0" }}>{j}</div>
        ))}
      </div>
      <div style={{ display:"grid", gridTemplateColumns:"repeat(7,1fr)", gap:2 }}>
        {cells.map((d, i) => (
          <button key={i} disabled={isDisabled(d)}
            onClick={() => d && !isDisabled(d) && onSelect(new Date(viewYear, viewMonth, d).toISOString().split("T")[0])}
            style={{
              height:32, borderRadius:7, border:"none", cursor: isDisabled(d) ? "default" : "pointer",
              background: isSelected(d) ? "#fff" : (d && !isDisabled(d) ? "rgba(255,255,255,0.07)" : "transparent"),
              color: isSelected(d) ? "#131c4d" : (isDisabled(d) ? "rgba(255,255,255,0.15)" : "#fff"),
              fontWeight: isSelected(d) ? 700 : 400, fontSize:12, transition:"all 0.15s",
            }}>{d || ""}</button>
        ))}
      </div>
    </div>
  );
}

function Stepper({ step }: { step: number }) {
  const steps = ["Motif","Cabinet","Date","Infos"];
  return (
    <div style={{ display:"flex", alignItems:"center", justifyContent:"center", marginBottom:28, gap:0 }}>
      {steps.map((s, i) => (
        <div key={i} style={{ display:"flex", alignItems:"center" }}>
          <div style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:4 }}>
            <div style={{
              width:28, height:28, borderRadius:"50%",
              background: i < step ? "#fff" : (i===step ? "rgba(255,255,255,0.18)" : "rgba(255,255,255,0.06)"),
              border: i===step ? "2px solid rgba(255,255,255,0.6)" : "2px solid transparent",
              display:"flex", alignItems:"center", justifyContent:"center",
              fontSize:11, fontWeight:700,
              color: i < step ? "#131c4d" : (i===step ? "#fff" : "rgba(255,255,255,0.3)"),
              transition:"all 0.3s",
            }}>{i < step ? "✓" : i+1}</div>
            <span style={{ fontSize:8, color: i===step ? "rgba(255,255,255,0.75)" : "rgba(255,255,255,0.25)", letterSpacing:0.5, whiteSpace:"nowrap" }}>{s}</span>
          </div>
          {i < steps.length-1 && (
            <div style={{ width:32, height:1, background: i < step ? "rgba(255,255,255,0.35)" : "rgba(255,255,255,0.1)", margin:"0 3px", marginBottom:18, transition:"all 0.3s" }}/>
          )}
        </div>
      ))}
    </div>
  );
}

/* ══════════════════════════════
   MAIN
══════════════════════════════ */
export default function EliteLaser() {
  const [screen,    setScreen]    = useState("home");
  const [rdvStep,   setRdvStep]   = useState(0);
  const [confirmed, setConfirmed] = useState(false);
  const [menuOpen,  setMenuOpen]  = useState(false);
  const [heroIn,    setHeroIn]    = useState(false);
  const [liberes,   setLiberes]   = useState(1247);

  // Calculator
  const [prix,    setPrix]    = useState(11.5);
  const [paquets, setPaquets] = useState(1);
  const [annees,  setAnnees]  = useState(5);

  // RDV
  const [addiction, setAddiction] = useState<string|null>(null);
  const [cabinetId, setCabinetId] = useState<number|null>(null);
  const [dateRdv,   setDateRdv]   = useState("");
  const [slot,      setSlot]      = useState("");
  const [prenom,    setPrenom]    = useState("");
  const [nom,       setNom]       = useState("");
  const [tel,       setTel]       = useState("");
  const [email,     setEmail]     = useState("");

  useEffect(() => { setTimeout(() => setHeroIn(true), 80); }, []);
  useEffect(() => {
    const t = setInterval(() => setLiberes(n => n + Math.floor(Math.random() * 2)), 8000);
    return () => clearInterval(t);
  }, []);

  const ecoJour  = prix * paquets;
  const ecoMois  = ecoJour * 30;
  const ecoAn    = ecoJour * 365;
  const ecoTotal = ecoJour * 365 * annees;

  const navTo = (s: string) => { setScreen(s); setConfirmed(false); if(s==="rdv") setRdvStep(0); setMenuOpen(false); };
  const goRdv = (aid: string|null) => { setAddiction(aid); setRdvStep(0); setScreen("rdv"); setConfirmed(false); setMenuOpen(false); };

  const CSS = `
    @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400&family=Cormorant+Garamond:wght@300;400;600&display=swap');
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    html { -webkit-text-size-adjust: 100%; }
    body { overscroll-behavior-y: contain; }
    ::-webkit-scrollbar { width: 3px; }
    ::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.15); border-radius: 2px; }
    input[type=range] { -webkit-appearance: none; height: 3px; border-radius: 2px; outline: none; background: rgba(255,255,255,0.15); }
    input[type=range]::-webkit-slider-thumb { -webkit-appearance: none; width: 20px; height: 20px; border-radius: 50%; background: #fff; cursor: pointer; box-shadow: 0 2px 8px rgba(0,0,0,0.4); }
    input { outline: none; }
    input::placeholder { color: rgba(255,255,255,0.25); }
    button { font-family: inherit; }
    @keyframes floatP { from { transform: translateY(0) } to { transform: translateY(-25px) translateX(8px) } }
    @keyframes smokeUp { 0% { transform: translateY(0) scale(1); opacity: 0; } 30% { opacity: 1; } 100% { transform: translateY(-100px) scale(3); opacity: 0; } }
    @keyframes fadeUp { from { opacity: 0; transform: translateY(24px); } to { opacity: 1; transform: translateY(0); } }
    @keyframes scaleIn { from { opacity: 0; transform: scale(0.93); } to { opacity: 1; transform: scale(1); } }
    @keyframes pulseRing { 0%,100% { transform: translate(-50%,-50%) scale(1); opacity: .05; } 50% { transform: translate(-50%,-50%) scale(1.05); opacity: .02; } }
    @keyframes blink { 0%,100% { opacity: .5; } 50% { opacity: 1; } }
    @keyframes checkPop { 0% { transform: scale(0); } 70% { transform: scale(1.2); } 100% { transform: scale(1); } }
    .c-hover:hover { opacity: .85; }
    .btn-menu:hover { background: rgba(255,255,255,0.12) !important; }
  `;

  const inputStyle: React.CSSProperties = {
    background: "rgba(255,255,255,0.06)",
    border: "1px solid rgba(255,255,255,0.15)",
    borderRadius: 12,
    padding: "14px 16px",
    color: "#fff",
    fontSize: 16,
    fontFamily: "inherit",
    width: "100%",
  };

  const cabinet = CABINETS.find(c => c.id === cabinetId);
  const addict  = ADDICTIONS.find(a => a.id === addiction);

  return (
    <div style={{ minHeight: "100vh", background: "#131c4d", fontFamily: "'Cormorant Garamond', Georgia, serif", color: "#fff", overflowX: "hidden" }}>
      <style>{CSS}</style>

      {/* ── NAV ── */}
      <nav style={{ position: "sticky", top: 0, zIndex: 300, background: "rgba(8,12,40,0.97)", backdropFilter: "blur(20px)", borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
        <div style={{ height: 56, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 18px" }}>
          <button onClick={() => navTo("home")} style={{ background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: 9 }}>
            <div style={{ width: 34, height: 34, borderRadius: "50%", border: "1.5px solid rgba(255,255,255,0.5)", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Playfair Display'", fontStyle: "italic", fontSize: 13, color: "#fff" }}>ÉL</div>
            <span style={{ fontSize: 13, letterSpacing: 2.5, color: "#fff", fontWeight: 600, textTransform: "uppercase" }}>Elite Laser</span>
          </button>
          <button onClick={() => setMenuOpen(o => !o)} style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.14)", borderRadius: 10, width: 42, height: 42, cursor: "pointer", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 5 }}>
            <span style={{ display: "block", width: 18, height: 2, background: "#fff", borderRadius: 2, transition: "transform 0.25s", transform: menuOpen ? "rotate(45deg) translate(0,7px)" : "none" }}/>
            <span style={{ display: "block", width: 18, height: 2, background: "#fff", borderRadius: 2, transition: "opacity 0.25s", opacity: menuOpen ? 0 : 1 }}/>
            <span style={{ display: "block", width: 18, height: 2, background: "#fff", borderRadius: 2, transition: "transform 0.25s", transform: menuOpen ? "rotate(-45deg) translate(0,-7px)" : "none" }}/>
          </button>
        </div>
        <div style={{ overflow: "hidden", maxHeight: menuOpen ? 240 : 0, transition: "max-height 0.35s cubic-bezier(0.4,0,0.2,1)", borderTop: menuOpen ? "1px solid rgba(255,255,255,0.07)" : "none" }}>
          {[
            { id: "home",       icon: "🏠", label: "Accueil",      sub: "Page principale" },
            { id: "calculator", icon: "💰", label: "Calculateur",  sub: "Vos économies sans tabac" },
            { id: "rdv",        icon: "📅", label: "Rendez-vous",  sub: "Réservez votre séance" },
          ].map(item => (
            <button key={item.id} className="btn-menu" onClick={() => navTo(item.id)} style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between", background: screen === item.id ? "rgba(255,255,255,0.07)" : "transparent", border: "none", borderBottom: "1px solid rgba(255,255,255,0.05)", color: "#fff", padding: "15px 20px", cursor: "pointer", textAlign: "left", transition: "background 0.2s" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <span style={{ fontSize: 20 }}>{item.icon}</span>
                <div>
                  <div style={{ fontSize: 15, fontWeight: 600, letterSpacing: 1 }}>{item.label}</div>
                  <div style={{ fontSize: 11, color: "rgba(255,255,255,0.35)", marginTop: 2 }}>{item.sub}</div>
                </div>
              </div>
              <span style={{ fontSize: 18, color: "rgba(255,255,255,0.4)", opacity: screen === item.id ? 1 : 0 }}>●</span>
            </button>
          ))}
        </div>
      </nav>

      {/* ════════════ HOME ════════════ */}
      {screen === "home" && (<>
        {/* HERO */}
        <section style={{ position: "relative", minHeight: "92vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", padding: "70px 22px 60px", background: "radial-gradient(ellipse 130% 110% at 50% 0%, #1e2d7d 0%, #131c4d 55%, #080e2e 100%)", overflow: "hidden" }}>
          <ParticlesBg/>
          <SmokeEffect/>
          {[340,560,760].map((s,i) => (
            <div key={i} style={{ position: "absolute", width: s, height: s, borderRadius: "50%", border: "1px solid rgba(255,255,255,0.04)", top: "50%", left: "50%", animation: `pulseRing ${4+i*1.2}s ease-in-out ${i*0.5}s infinite` }}/>
          ))}
          <div style={{ position: "relative", zIndex: 1, opacity: heroIn ? 1 : 0, animation: heroIn ? "fadeUp 0.7s ease both" : "none" }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.14)", borderRadius: 30, padding: "7px 18px", marginBottom: 26, fontSize: 12 }}>
              <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#4ade80", display: "inline-block", animation: "blink 2s ease infinite" }}/>
              <span style={{ color: "rgba(255,255,255,0.7)", letterSpacing: 0.5 }}><strong style={{ color: "#fff" }}>{liberes.toLocaleString("fr-FR")}</strong> personnes libérées · 4,9★ Google</span>
            </div>
            <h1 style={{ fontFamily: "'Playfair Display'", fontSize: "clamp(34px,8vw,74px)", fontWeight: 900, lineHeight: 1.05, marginBottom: 18, textShadow: "0 4px 30px rgba(0,0,0,0.4)", animation: "fadeUp 0.7s ease 0.1s both" }}>
              Votre vie libre<br/>
              <em style={{ fontWeight: 400, color: "rgba(255,255,255,0.72)" }}>commence ici</em>
            </h1>
            <p style={{ fontSize: "clamp(15px,2.5vw,18px)", color: "rgba(255,255,255,0.58)", maxWidth: 480, margin: "0 auto 32px", lineHeight: 1.8, fontWeight: 300, animation: "fadeUp 0.7s ease 0.2s both" }}>
              Vos réflexologues experts en <strong style={{ color: "rgba(255,255,255,0.88)" }}>auriculothérapie laser</strong> pour vous libérer définitivement de vos dépendances.
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 12, alignItems: "center", animation: "fadeUp 0.7s ease 0.3s both" }}>
              <button className="c-hover" onClick={() => goRdv("tabac")} style={{ background: "#fff", color: "#131c4d", border: "none", padding: "17px 44px", borderRadius: 50, fontWeight: 700, fontSize: 14, letterSpacing: 2, textTransform: "uppercase", cursor: "pointer", transition: "opacity 0.2s", boxShadow: "0 8px 32px rgba(0,0,0,0.35)", fontFamily: "inherit" }}>
                Prendre Rendez-vous →
              </button>
              <button className="c-hover" onClick={() => navTo("calculator")} style={{ background: "transparent", color: "#fff", border: "1px solid rgba(255,255,255,0.3)", padding: "15px 36px", borderRadius: 50, fontSize: 14, letterSpacing: 1.5, textTransform: "uppercase", cursor: "pointer", transition: "opacity 0.2s", fontFamily: "inherit" }}>
                Calculer mes économies 💰
              </button>
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 0, justifyContent: "center", marginTop: 48, animation: "fadeUp 0.7s ease 0.4s both" }}>
              {[{n:"4,9★",l:"Note Google"},{n:"+750",l:"Avis vérifiés"},{n:"4",l:"Cabinets"},{n:"1 séance",l:"Souvent suffit"}].map(s => (
                <div key={s.n} style={{ textAlign: "center", padding: "10px 18px" }}>
                  <div style={{ fontFamily: "'Playfair Display'", fontSize: 20, fontWeight: 700 }}>{s.n}</div>
                  <div style={{ fontSize: 10, color: "rgba(255,255,255,0.35)", letterSpacing: 1.5, marginTop: 3, textTransform: "uppercase" }}>{s.l}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ADDICTIONS */}
        <section style={{ padding: "64px 20px", background: "#0d1339" }}>
          <div style={{ textAlign: "center", marginBottom: 40 }}>
            <p style={{ fontSize: 10, letterSpacing: 4, color: "rgba(255,255,255,0.3)", textTransform: "uppercase", marginBottom: 10 }}>Notre méthode</p>
            <h2 style={{ fontFamily: "'Playfair Display'", fontSize: "clamp(22px,5vw,38px)", fontWeight: 700, marginBottom: 12 }}>Auriculothérapie Laser</h2>
            <p style={{ color: "rgba(255,255,255,0.45)", maxWidth: 400, margin: "0 auto", fontSize: 15, lineHeight: 1.8, fontWeight: 300 }}>Une approche douce, non invasive.<br/>Résultats dès la première séance.</p>
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 12, justifyContent: "center", maxWidth: 800, margin: "0 auto" }}>
            {ADDICTIONS.map((a, i) => (
              <div key={a.id} onClick={() => goRdv(a.id)} style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 18, padding: "24px 18px", cursor: "pointer", transition: "all 0.3s", flex: "1 1 130px", minWidth: 130, maxWidth: 175, textAlign: "center", animation: `scaleIn 0.4s ease ${i*0.07}s both` }}>
                <div style={{ fontSize: 28, marginBottom: 10 }}>{a.icon}</div>
                <div style={{ fontFamily: "'Playfair Display'", fontSize: 16, fontWeight: 700, marginBottom: 5 }}>{a.label}</div>
                <div style={{ fontSize: 11, color: "rgba(255,255,255,0.4)", lineHeight: 1.5 }}>{a.desc}</div>
              </div>
            ))}
          </div>
        </section>

        {/* TÉMOIGNAGES */}
        <section style={{ padding: "64px 20px", background: "#131c4d" }}>
          <div style={{ textAlign: "center", marginBottom: 40 }}>
            <p style={{ fontSize: 10, letterSpacing: 4, color: "rgba(255,255,255,0.3)", textTransform: "uppercase", marginBottom: 10 }}>Ce qu&apos;ils en disent</p>
            <h2 style={{ fontFamily: "'Playfair Display'", fontSize: "clamp(20px,5vw,36px)", fontWeight: 700 }}>+750 avis 5 étoiles</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))", gap: 14, maxWidth: 860, margin: "0 auto" }}>
            {TEMOIGNAGES.map((t, i) => (
              <div key={i} style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 16, padding: "22px 20px", animation: `scaleIn 0.4s ease ${i*0.06}s both` }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10 }}>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: 14 }}>{t.name}</div>
                    <div style={{ fontSize: 11, color: "rgba(255,255,255,0.35)", marginTop: 2 }}>📍 {t.city}</div>
                  </div>
                  <span style={{ background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 20, padding: "3px 10px", fontSize: 10, color: "rgba(255,255,255,0.55)", alignSelf: "flex-start" }}>{t.tag}</span>
                </div>
                <div style={{ color: "#f1c40f", fontSize: 12, marginBottom: 8, letterSpacing: 2 }}>{"★".repeat(t.stars)}</div>
                <p style={{ fontSize: 13, color: "rgba(255,255,255,0.6)", lineHeight: 1.7, fontStyle: "italic" }}>&ldquo;{t.text}&rdquo;</p>
              </div>
            ))}
          </div>
        </section>

        {/* FOOTER CTA */}
        <section style={{ padding: "64px 20px", textAlign: "center", background: "radial-gradient(ellipse at center, #1e2d7d 0%, #080e2e 70%)", position: "relative", overflow: "hidden" }}>
          <ParticlesBg/>
          <div style={{ position: "relative", zIndex: 1 }}>
            <h2 style={{ fontFamily: "'Playfair Display'", fontSize: "clamp(24px,5vw,44px)", fontWeight: 700, marginBottom: 14 }}>Prêt à changer de vie ?</h2>
            <p style={{ color: "rgba(255,255,255,0.5)", marginBottom: 32, fontSize: 16, fontWeight: 300 }}>Rejoignez les {liberes.toLocaleString("fr-FR")} personnes déjà libérées.</p>
            <button className="c-hover" onClick={() => goRdv(null)} style={{ background: "#fff", color: "#131c4d", border: "none", padding: "18px 48px", borderRadius: 50, fontWeight: 700, fontSize: 14, letterSpacing: 2, textTransform: "uppercase", cursor: "pointer", transition: "opacity 0.2s", boxShadow: "0 8px 40px rgba(0,0,0,0.4)", fontFamily: "inherit" }}>
              Prendre Rendez-vous →
            </button>
          </div>
        </section>

        <footer style={{ background: "#06091e", padding: "28px 20px", textAlign: "center", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
          <div style={{ fontFamily: "'Playfair Display'", fontSize: 17, marginBottom: 6, color: "rgba(255,255,255,0.6)", fontStyle: "italic" }}>Elite Laser</div>
          <div style={{ fontSize: 10, color: "rgba(255,255,255,0.2)", letterSpacing: 2, textTransform: "uppercase" }}>Hauts-de-France · 4 Cabinets · Auriculothérapie Laser</div>
        </footer>
      </>)}

      {/* ════════════ CALCULATOR ════════════ */}
      {screen === "calculator" && (
        <div style={{ maxWidth: 580, margin: "0 auto", padding: "44px 20px", animation: "fadeUp 0.5s ease both" }}>
          <p style={{ fontSize: 10, letterSpacing: 4, color: "rgba(255,255,255,0.3)", textTransform: "uppercase", marginBottom: 8 }}>Simulateur</p>
          <h2 style={{ fontFamily: "'Playfair Display'", fontSize: 28, fontWeight: 700, marginBottom: 6 }}>Vos économies sans tabac</h2>
          <p style={{ color: "rgba(255,255,255,0.4)", marginBottom: 36, fontSize: 15, lineHeight: 1.7 }}>Déplacez les curseurs pour calculer.</p>

          {[
            { icon:"🛒", label:"Prix du paquet", val:prix, set:setPrix, min:5, max:20, step:0.5, suffix:"€" },
            { icon:"🚬", label:"Paquets par jour", val:paquets, set:setPaquets, min:0.5, max:5, step:0.5, suffix:" /jour" },
            { icon:"📅", label:"Années fumeur", val:annees, set:setAnnees, min:1, max:40, step:1, suffix:" ans" },
          ].map(sl => (
            <div key={sl.label} style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 16, padding: "20px 22px", marginBottom: 12, animation: "scaleIn 0.4s ease both" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
                <span style={{ fontSize: 14, color: "rgba(255,255,255,0.6)" }}>{sl.icon} {sl.label}</span>
                <span style={{ fontFamily: "'Playfair Display'", fontSize: 22, fontWeight: 700, background: "rgba(255,255,255,0.08)", borderRadius: 10, padding: "2px 14px" }}>{sl.val}{sl.suffix}</span>
              </div>
              <input type="range" min={sl.min} max={sl.max} step={sl.step} value={sl.val} onChange={e => sl.set(parseFloat(e.target.value))} style={{ width: "100%" }}/>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 10, color: "rgba(255,255,255,0.2)", marginTop: 5 }}>
                <span>{sl.min}{sl.suffix}</span><span>{sl.max}{sl.suffix}</span>
              </div>
            </div>
          ))}

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, margin: "24px 0" }}>
            {[
              { label:"Par jour",    val:ecoJour  },
              { label:"Par mois",   val:ecoMois  },
              { label:"Par an",     val:ecoAn    },
            ].map(r => (
              <div key={r.label} style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 16, padding: "20px 16px", textAlign: "center" }}>
                <div style={{ fontSize: 10, color: "rgba(255,255,255,0.35)", letterSpacing: 2, textTransform: "uppercase", marginBottom: 8 }}>{r.label}</div>
                <div style={{ fontFamily: "'Playfair Display'", fontSize: 26, fontWeight: 900 }}><AnimNumber value={r.val}/></div>
              </div>
            ))}
            <div style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.18)", borderRadius: 16, padding: "20px 16px", textAlign: "center", gridColumn: "1/-1" }}>
              <div style={{ fontSize: 10, color: "rgba(255,255,255,0.4)", letterSpacing: 2, textTransform: "uppercase", marginBottom: 8 }}>Sur {annees} ans</div>
              <div style={{ fontFamily: "'Playfair Display'", fontSize: 40, fontWeight: 900 }}><AnimNumber value={ecoTotal}/></div>
              <div style={{ fontSize: 11, color: "rgba(255,255,255,0.35)", marginTop: 4 }}>total cumulé</div>
            </div>
          </div>

          <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 16, padding: "20px 22px", marginBottom: 18 }}>
            <div style={{ fontSize: 12, color: "rgba(255,255,255,0.4)", marginBottom: 10 }}>Progression sur 12 mois ↗</div>
            <SavingsChart daily={ecoJour}/>
          </div>

          <div style={{ background: "linear-gradient(135deg, rgba(30,45,125,0.4), rgba(8,14,46,0.5))", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 16, padding: "20px 22px", marginBottom: 28 }}>
            <div style={{ fontSize: 13, color: "rgba(255,255,255,0.5)", marginBottom: 12 }}>Avec <strong style={{ color: "#fff" }}><AnimNumber value={ecoAn}/></strong> par an vous pourriez :</div>
            {[
              (n:number) => `✈️  ${Math.max(1,Math.floor(n/400))} voyage${Math.floor(n/400)>1?"s":""} en Europe`,
              (n:number) => `🏖️  ${Math.max(1,Math.floor(n/1200))} semaine${Math.floor(n/1200)>1?"s":""} aux Maldives`,
              (n:number) => `📱  ${Math.max(1,Math.floor(n/900))} iPhone${Math.floor(n/900)>1?"s":""} dernier modèle`,
            ].map((fn, i) => (
              <div key={i} style={{ fontSize: 14, color: "rgba(255,255,255,0.65)", marginBottom: 7 }}>{fn(ecoAn)}</div>
            ))}
          </div>

          <button className="c-hover" onClick={() => goRdv("tabac")} style={{ width: "100%", background: "#fff", color: "#131c4d", border: "none", padding: "18px", borderRadius: 50, fontWeight: 700, fontSize: 13, letterSpacing: 2, textTransform: "uppercase", cursor: "pointer", transition: "opacity 0.2s", fontFamily: "inherit", boxShadow: "0 8px 30px rgba(0,0,0,0.4)" }}>
            Arrêter maintenant — Prendre RDV →
          </button>
        </div>
      )}

      {/* ════════════ RDV ════════════ */}
      {screen === "rdv" && !confirmed && (
        <div style={{ maxWidth: 580, margin: "0 auto", padding: "44px 20px", animation: "fadeUp 0.5s ease both" }}>
          <p style={{ fontSize: 10, letterSpacing: 4, color: "rgba(255,255,255,0.3)", textTransform: "uppercase", marginBottom: 8 }}>Consultation</p>
          <h2 style={{ fontFamily: "'Playfair Display'", fontSize: 26, fontWeight: 700, marginBottom: 28 }}>Votre rendez-vous</h2>
          <Stepper step={rdvStep}/>

          {/* STEP 0 — Addiction */}
          {rdvStep === 0 && (
            <div style={{ animation: "scaleIn 0.35s ease both" }}>
              <p style={{ fontSize: 14, color: "rgba(255,255,255,0.5)", marginBottom: 18, lineHeight: 1.7 }}>Pour quelle raison souhaitez-vous consulter ?</p>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                {ADDICTIONS.map(a => (
                  <button key={a.id} onClick={() => { setAddiction(a.id); setRdvStep(1); }} style={{ background: addiction===a.id ? "rgba(255,255,255,0.13)" : "rgba(255,255,255,0.04)", border: addiction===a.id ? "1px solid rgba(255,255,255,0.4)" : "1px solid rgba(255,255,255,0.09)", borderRadius: 14, padding: "18px 16px", cursor: "pointer", textAlign: "left", transition: "all 0.2s", color: "#fff" }}>
                    <div style={{ fontSize: 24, marginBottom: 7 }}>{a.icon}</div>
                    <div style={{ fontFamily: "'Playfair Display'", fontSize: 15, fontWeight: 700, marginBottom: 3 }}>{a.label}</div>
                    <div style={{ fontSize: 11, color: "rgba(255,255,255,0.38)" }}>{a.sub}</div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* STEP 1 — Cabinet */}
          {rdvStep === 1 && (
            <div style={{ animation: "scaleIn 0.35s ease both" }}>
              <p style={{ fontSize: 14, color: "rgba(255,255,255,0.5)", marginBottom: 18 }}>Choisissez votre cabinet :</p>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 24 }}>
                {CABINETS.map(c => (
                  <button key={c.id} onClick={() => { setCabinetId(c.id); setRdvStep(2); }} style={{ background: cabinetId===c.id ? "rgba(255,255,255,0.12)" : "rgba(255,255,255,0.04)", border: cabinetId===c.id ? "1px solid rgba(255,255,255,0.38)" : "1px solid rgba(255,255,255,0.09)", borderRadius: 14, padding: "18px 16px", cursor: "pointer", textAlign: "left", transition: "all 0.2s", color: "#fff" }}>
                    <div style={{ fontSize: 22, marginBottom: 7 }}>{c.emoji}</div>
                    <div style={{ fontFamily: "'Playfair Display'", fontSize: 16, fontWeight: 700, marginBottom: 3 }}>{c.city}</div>
                    <div style={{ fontSize: 11, color: "rgba(255,255,255,0.38)", lineHeight: 1.5 }}>{c.addr}<br/>{c.cp}</div>
                  </button>
                ))}
              </div>
              <button onClick={() => setRdvStep(0)} style={{ background: "none", border: "none", color: "rgba(255,255,255,0.38)", cursor: "pointer", fontSize: 13 }}>← Retour</button>
            </div>
          )}

          {/* STEP 2 — Date & Slot */}
          {rdvStep === 2 && (
            <div style={{ animation: "scaleIn 0.35s ease both" }}>
              <p style={{ fontSize: 14, color: "rgba(255,255,255,0.5)", marginBottom: 18 }}>Choisissez une date et un créneau :</p>
              <div style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.09)", borderRadius: 16, padding: "18px 16px", marginBottom: 12 }}>
                <Calendar selected={dateRdv} onSelect={setDateRdv}/>
              </div>
              <div style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.09)", borderRadius: 16, padding: "18px 16px", marginBottom: 20 }}>
                <div style={{ fontSize: 10, color: "rgba(255,255,255,0.35)", letterSpacing: 2, marginBottom: 10 }}>MATIN</div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 14 }}>
                  {SLOTS_MATIN.map(s => (
                    <button key={s} onClick={() => setSlot(s)} style={{ background: slot===s ? "#fff" : "rgba(255,255,255,0.07)", border: slot===s ? "none" : "1px solid rgba(255,255,255,0.12)", color: slot===s ? "#131c4d" : "#fff", borderRadius: 8, padding: "8px 12px", cursor: "pointer", fontSize: 13, fontWeight: slot===s ? 700 : 400, transition: "all 0.15s" }}>{s}</button>
                  ))}
                </div>
                <div style={{ fontSize: 10, color: "rgba(255,255,255,0.35)", letterSpacing: 2, marginBottom: 10 }}>APRÈS-MIDI</div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                  {SLOTS_APREM.map(s => (
                    <button key={s} onClick={() => setSlot(s)} style={{ background: slot===s ? "#fff" : "rgba(255,255,255,0.07)", border: slot===s ? "none" : "1px solid rgba(255,255,255,0.12)", color: slot===s ? "#131c4d" : "#fff", borderRadius: 8, padding: "8px 12px", cursor: "pointer", fontSize: 13, fontWeight: slot===s ? 700 : 400, transition: "all 0.15s" }}>{s}</button>
                  ))}
                </div>
              </div>
              <div style={{ display: "flex", gap: 10 }}>
                <button onClick={() => setRdvStep(1)} style={{ background: "none", border: "none", color: "rgba(255,255,255,0.38)", cursor: "pointer", fontSize: 13 }}>← Retour</button>
                <button disabled={!dateRdv || !slot} onClick={() => setRdvStep(3)} style={{ flex: 1, background: dateRdv&&slot ? "rgba(255,255,255,0.12)" : "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.18)", color: dateRdv&&slot ? "#fff" : "rgba(255,255,255,0.28)", borderRadius: 50, padding: "14px", cursor: dateRdv&&slot ? "pointer" : "default", fontSize: 13, letterSpacing: 1, transition: "all 0.3s", fontFamily: "inherit" }}>
                  Continuer →
                </button>
              </div>
            </div>
          )}

          {/* STEP 3 — Infos perso */}
          {rdvStep === 3 && (
            <div style={{ animation: "scaleIn 0.35s ease both" }}>
              <div style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.09)", borderRadius: 12, padding: "13px 16px", marginBottom: 18, fontSize: 13, color: "rgba(255,255,255,0.55)", lineHeight: 2 }}>
                {addict?.icon} {addict?.label} · {cabinet?.emoji} {cabinet?.city} · 📅 {dateRdv && new Date(dateRdv).toLocaleDateString("fr-FR",{day:"numeric",month:"long"})} à {slot}
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 10 }}>
                <input type="text" placeholder="Prénom *" value={prenom} onChange={e => setPrenom(e.target.value)} style={inputStyle}/>
                <input type="text" placeholder="Nom *" value={nom} onChange={e => setNom(e.target.value)} style={inputStyle}/>
              </div>
              <input type="tel" placeholder="Téléphone *" value={tel} onChange={e => setTel(e.target.value)} style={{ ...inputStyle, marginBottom: 10 }}/>
              <input type="email" placeholder="Email (optionnel)" value={email} onChange={e => setEmail(e.target.value)} style={{ ...inputStyle, marginBottom: 22 }}/>
              <div style={{ display: "flex", gap: 10 }}>
                <button onClick={() => setRdvStep(2)} style={{ background: "none", border: "none", color: "rgba(255,255,255,0.38)", cursor: "pointer", fontSize: 13 }}>← Retour</button>
                <button disabled={!prenom||!nom||!tel} onClick={() => setConfirmed(true)} style={{ flex: 1, background: prenom&&nom&&tel ? "#fff" : "rgba(255,255,255,0.07)", color: prenom&&nom&&tel ? "#131c4d" : "rgba(255,255,255,0.28)", border: "none", borderRadius: 50, padding: "17px", fontWeight: 700, fontSize: 13, letterSpacing: 2, textTransform: "uppercase", cursor: prenom&&nom&&tel ? "pointer" : "default", transition: "all 0.3s", fontFamily: "inherit", boxShadow: prenom&&nom&&tel ? "0 8px 28px rgba(0,0,0,0.35)" : "none" }}>
                  Confirmer →
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ── CONFIRMATION ── */}
      {screen === "rdv" && confirmed && (
        <div style={{ maxWidth: 500, margin: "70px auto", padding: "0 22px", textAlign: "center", animation: "fadeUp 0.6s ease both" }}>
          <div style={{ width: 84, height: 84, borderRadius: "50%", background: "rgba(74,222,128,0.1)", border: "2px solid rgba(74,222,128,0.35)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 36, margin: "0 auto 26px", animation: "checkPop 0.5s cubic-bezier(0.34,1.56,0.64,1) both" }}>✓</div>
          <h2 style={{ fontFamily: "'Playfair Display'", fontSize: 28, fontWeight: 700, marginBottom: 12 }}>Rendez-vous confirmé !</h2>
          <p style={{ color: "rgba(255,255,255,0.52)", marginBottom: 26, lineHeight: 1.9, fontSize: 15 }}>
            Bonjour <strong style={{ color: "#fff" }}>{prenom} {nom}</strong>, votre séance est le{" "}
            <strong style={{ color: "#fff" }}>{new Date(dateRdv).toLocaleDateString("fr-FR",{weekday:"long",day:"numeric",month:"long"})}</strong>{" "}
            à <strong style={{ color: "#fff" }}>{slot}</strong> — {cabinet?.city}.
          </p>
          <div style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.09)", borderRadius: 16, padding: "20px 22px", marginBottom: 22, fontSize: 14, color: "rgba(255,255,255,0.58)", lineHeight: 2, textAlign: "left" }}>
            📱 SMS de confirmation → <strong style={{ color: "#fff" }}>{tel}</strong><br/>
            ⏰ Arrivez 5 min avant votre séance<br/>
            📍 {cabinet?.addr}, {cabinet?.cp} {cabinet?.city}
          </div>
          <button className="c-hover" onClick={() => { setScreen("home"); setConfirmed(false); setRdvStep(0); }} style={{ background: "transparent", color: "rgba(255,255,255,0.55)", border: "1px solid rgba(255,255,255,0.18)", padding: "13px 32px", borderRadius: 50, fontSize: 12, letterSpacing: 2, textTransform: "uppercase", cursor: "pointer", transition: "opacity 0.2s", fontFamily: "inherit" }}>
            ← Retour à l&apos;accueil
          </button>
        </div>
      )}
    </div>
  );
}
