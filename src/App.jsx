import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "motion/react";
import { useEffect, useState, useCallback, useRef } from "react";
import {
  ChevronRight, ChevronLeft, X, Send, ArrowRight, Sparkles, Star,
  ShoppingBag, Coffee, Music, Phone, Mail, Globe, BarChart2,
  MapPin, Users, Calendar, DollarSign, Zap, Building2,
  Layers, Heart, Award, Shield, Play,
  ChevronDown, TrendingUp, Menu
} from "lucide-react";

/* ── Fonts ── */
(() => {
  const l = document.createElement("link");
  l.rel = "stylesheet";
  l.href = "https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Tenor+Sans&family=DM+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300&family=DM+Mono:wght@400;500&display=swap";
  document.head.appendChild(l);
})();

const css = document.createElement("style");
css.textContent = `
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
:root{
  --gold:#D4A843;--gold2:#C47B1A;--gold-dim:#8A6820;
  --offwhite:#F2EDE4;--dark:#050403;--mid:#0d0b08;--card:#111009;
  --serif:'Tenor Sans',serif;--display:'Bebas Neue',sans-serif;
  --body:'DM Sans',sans-serif;--mono:'DM Mono',monospace;
}
html,body{overflow:hidden;background:#050403;}
@media(min-width:1024px){html,body{cursor:none}}
::-webkit-scrollbar{width:3px}::-webkit-scrollbar-thumb{background:var(--gold)}
input,textarea,select{font-family:var(--body);background:none;color:#fff}
input::placeholder,textarea::placeholder{color:rgba(255,255,255,0.28)}
option{background:#111009}
@keyframes shimmer{0%{background-position:-400% center}100%{background-position:400% center}}
@keyframes ticker{0%{transform:translateX(0)}100%{transform:translateX(-50%)}}
@keyframes pulse{0%,100%{opacity:.5;transform:scale(1)}50%{opacity:1;transform:scale(1.3)}}
@keyframes breathe{0%,100%{transform:scale(1) translate(0,0)}33%{transform:scale(1.04) translate(-8px,6px)}66%{transform:scale(.98) translate(6px,-4px)}}
@keyframes fadeInUp{from{opacity:0;transform:translateY(32px)}to{opacity:1;transform:translateY(0)}}
@keyframes scanline{0%{top:-4px}100%{top:100%}}
.shimmer-gold{
  background:linear-gradient(90deg,#D4A843 0%,#fffae0 35%,#C47B1A 55%,#D4A843 100%);
  background-size:300% auto;-webkit-background-clip:text;-webkit-text-fill-color:transparent;
  animation:shimmer 4s linear infinite;
}
.ticker-wrap{overflow:hidden;white-space:nowrap}
.ticker{display:inline-block;animation:ticker 30s linear infinite}
input[type=range]{-webkit-appearance:none;height:3px;background:rgba(255,255,255,.1);border-radius:2px;outline:none;cursor:pointer}
input[type=range]::-webkit-slider-thumb{-webkit-appearance:none;width:18px;height:18px;border-radius:50%;background:var(--gold);cursor:pointer;box-shadow:0 0 8px rgba(212,168,67,.5)}

/* ── Responsive base ── */
.slide-two-col{display:grid;grid-template-columns:1fr 1fr;height:100%}
.slide-two-col-left{display:grid;grid-template-columns:340px 1fr;height:100%}
@media(max-width:768px){
  .slide-two-col{grid-template-columns:1fr!important;grid-template-rows:auto 1fr;overflow-y:auto}
  .slide-two-col-left{grid-template-columns:1fr!important;grid-template-rows:auto 1fr;overflow-y:auto}
  html,body{overflow:auto}
}
`;
document.head.appendChild(css);

const GOLD = "#D4A843", GOLD2 = "#C47B1A", DARK = "#050403";
const HERO_VID = "https://res.cloudinary.com/dbkwncgz5/video/upload/v1776394613/13748223_3840_2160_30fps_fbzbr6.mp4";
const ENT_VID = "https://res.cloudinary.com/dbkwncgz5/video/upload/v1776394272/istockphoto-849418708-640_adpp_is_for5k3.mp4";

const IMG = {
  retail: "https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?w=1800&q=95",
  luxury: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1800&q=95",
  dining: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1800&q=95",
  events: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=1800&q=95",
  story: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1800&q=95",
  hub_why: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=900&q=85",
  hub_ret: "https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?w=900&q=85",
  hub_ent: "https://images.unsplash.com/photo-1493676304819-0d7a8d026dcf?w=900&q=85",
  hub_spo: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=900&q=85",
  hub_mom: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=900&q=85",
  hub_con: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=900&q=85",
  ret_1: "https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=800&q=85",
  ret_2: "https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?w=800&q=85",
  ret_3: "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=800&q=85",
  ret_4: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&q=85",
};

/* ── Responsive hook ── */
function useBreakpoint() {
  const [bp, setBp] = useState({ isMobile: false, isTablet: false, isDesktop: true });
  useEffect(() => {
    const check = () => {
      const w = window.innerWidth;
      setBp({ isMobile: w < 640, isTablet: w >= 640 && w < 1024, isDesktop: w >= 1024 });
    };
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);
  return bp;
}

const SECTIONS = [
  { id: "home", label: "Home", color: GOLD },
  { id: "why", label: "Why MOA", color: "#C9915A" },
  { id: "retail", label: "Retail", color: "#B8875C" },
  { id: "entertainment", label: "Entertainment", color: "#5A7ABD" },
  { id: "sponsorship", label: "Sponsorship", color: "#4A9A7A" },
  { id: "moment", label: "★ Moment", color: GOLD },
  { id: "contact", label: "Contact", color: "#8B9EA8" },
];

const SLIDES = [
  { id: "hero", section: "home", label: "Overview" },
  { id: "scale", section: "why", label: "Scale" },
  { id: "audience", section: "why", label: "Audience" },
  { id: "retail", section: "retail", label: "Retail" },
  { id: "luxury", section: "retail", label: "Luxury" },
  { id: "dining", section: "retail", label: "Dining" },
  { id: "entertain", section: "entertainment", label: "Entertainment" },
  { id: "events", section: "entertainment", label: "Events" },
  { id: "sponsor", section: "sponsorship", label: "Sponsorship" },
  { id: "moment-map", section: "moment", label: "Zone Map" },
  { id: "moment-roi", section: "moment", label: "ROI Calculator" },
  { id: "moment-why", section: "moment", label: "Why It Works" },
  { id: "contact", section: "contact", label: "Contact" },
];

function Counter({ to, prefix = "", suffix = "", duration = 1.6, delay = 0, decimals = 0 }) {
  const [val, setVal] = useState(0);
  const raf = useRef(null);
  useEffect(() => {
    const t = setTimeout(() => {
      const start = Date.now();
      const step = () => {
        const p = Math.min((Date.now() - start) / (duration * 1000), 1);
        const e = 1 - Math.pow(1 - p, 3);
        setVal(+(e * to).toFixed(decimals));
        if (p < 1) raf.current = requestAnimationFrame(step);
      };
      raf.current = requestAnimationFrame(step);
    }, delay * 1000);
    return () => { clearTimeout(t); cancelAnimationFrame(raf.current); };
  }, [to]);
  return <>{prefix}{decimals > 0 ? val.toFixed(decimals) : val.toLocaleString()}{suffix}</>;
}

function Cursor() {
  const { isDesktop } = useBreakpoint();
  const mx = useMotionValue(-100), my = useMotionValue(-100);
  const sx = useSpring(mx, { stiffness: 800, damping: 40 });
  const sy = useSpring(my, { stiffness: 800, damping: 40 });
  const [big, setBig] = useState(false);
  useEffect(() => {
    if (!isDesktop) return;
    const mm = e => { mx.set(e.clientX); my.set(e.clientY); };
    const mo = e => setBig(!!e.target.closest("button,a,[data-mag]"));
    window.addEventListener("mousemove", mm);
    window.addEventListener("mouseover", mo);
    return () => { window.removeEventListener("mousemove", mm); window.removeEventListener("mouseover", mo); };
  }, [isDesktop]);
  if (!isDesktop) return null;
  return (
    <motion.div style={{
      position: "fixed", top: 0, left: 0, x: sx, y: sy, zIndex: 9999, pointerEvents: "none",
      translateX: "-50%", translateY: "-50%",
      width: big ? 44 : 10, height: big ? 44 : 10, borderRadius: "50%",
      background: big ? "transparent" : GOLD,
      border: big ? `1.5px solid ${GOLD}` : "none",
      mixBlendMode: "difference", transition: "width .18s,height .18s,background .18s"
    }} />
  );
}

function CinematicIntro({ onDone }) {
  const [phase, setPhase] = useState("video");
  const [vidErr, setVidErr] = useState(false);
  useEffect(() => { const t = setTimeout(() => setPhase("gate"), 2800); return () => clearTimeout(t); }, []);

  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 900 }}>
      <div style={{ position: "absolute", inset: 0, overflow: "hidden" }}>
        {!vidErr
          ? <video autoPlay muted loop playsInline onError={() => setVidErr(true)}
            style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}>
            <source src={HERO_VID} type="video/mp4" />
          </video>
          : <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at 35% 55%,#1e1208,#050403 70%)" }} />
        }
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom,rgba(5,4,3,.55) 0%,rgba(5,4,3,.15) 40%,rgba(5,4,3,.85) 100%)" }} />
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at 50% 50%,transparent 30%,rgba(5,4,3,.5) 100%)" }} />
        <div style={{ position: "absolute", inset: 0, opacity: .025, backgroundImage: `linear-gradient(${GOLD} 1px,transparent 1px),linear-gradient(90deg,${GOLD} 1px,transparent 1px)`, backgroundSize: "90px 90px" }} />
        <div style={{ position: "absolute", left: 0, right: 0, height: 4, background: `linear-gradient(to bottom,transparent,${GOLD}18,transparent)`, animation: "scanline 4s linear infinite", zIndex: 2, pointerEvents: "none" }} />
      </div>

      <AnimatePresence>
        {phase === "video" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, scale: 1.05 }} transition={{ duration: 1 }}
            style={{ position: "absolute", inset: 0, zIndex: 5, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "0 24px" }}>
            {[0, 1, 2].map(i => (
              <motion.div key={i} initial={{ opacity: 0, scale: .5 }} animate={{ opacity: [0, .2, 0], scale: [.5, 2.2, 3] }}
                transition={{ delay: i * .4 + .3, duration: 2.5, ease: "easeOut" }}
                style={{ position: "absolute", top: "50%", left: "50%", width: `clamp(180px,${280 + i * 120}px,${280 + i * 120}px)`, height: `clamp(180px,${280 + i * 120}px,${280 + i * 120}px)`, borderRadius: "50%", border: `1px solid ${GOLD}`, transform: "translate(-50%,-50%)", pointerEvents: "none" }} />
            ))}
            <motion.div initial={{ opacity: 0, scale: .6 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: .2, duration: .9 }} style={{ marginBottom: 20 }}>
              <MOAStar size={56} />
            </motion.div>
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: .5 }}
              style={{ fontSize: "clamp(8px,1.5vw,10px)", color: GOLD, letterSpacing: "0.28em", textTransform: "uppercase", fontFamily: "var(--body)", fontWeight: 700, marginBottom: 14, textAlign: "center" }}>
              Mall of America
            </motion.p>
            <motion.h1 initial={{ opacity: 0, y: 48 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .6, duration: 1, ease: [.16, 1, .3, 1] }}
              style={{ fontFamily: "var(--display)", fontSize: "clamp(52px,11vw,148px)", lineHeight: .86, color: "#fff", textTransform: "uppercase", textAlign: "center", marginBottom: 16 }}>
              More Than<br /><span className="shimmer-gold">A Mall.</span>
            </motion.h1>
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.1 }}
              style={{ fontSize: "clamp(11px,1.4vw,14px)", color: "rgba(255,255,255,.38)", letterSpacing: "0.06em", fontFamily: "var(--body)", fontWeight: 300, textAlign: "center" }}>
              Official Brand Partnership Deck · 2025
            </motion.p>
            <motion.button initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.4 }}
              data-mag onClick={() => setPhase("gate")}
              style={{ position: "absolute", bottom: 24, right: 20, padding: "8px 16px", borderRadius: 3, background: "rgba(255,255,255,.06)", border: "1px solid rgba(255,255,255,.14)", color: "rgba(255,255,255,.45)", fontSize: 10, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", cursor: "pointer", fontFamily: "var(--body)" }}>
              Skip →
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {phase === "gate" && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: .9 }}
            style={{ position: "absolute", inset: 0, zIndex: 10, background: "rgba(5,4,3,.82)", backdropFilter: "blur(8px)" }}>
            <PersonalizationGate onEnter={onDone} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}


function PersonalizationGate({ onEnter }) {
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState(null);
  const [step, setStep] = useState(1);
  const cats = ["Retail / Fashion", "Luxury / Premium", "F&B / Dining", "Entertainment", "Sponsorship", "Events & Activations"];
  const proceed = () => {
    if (step === 1 && brand.trim()) setStep(2);
    if (step === 2 && category) onEnter({ brand: brand.trim(), category });
  };
  return (
    <div style={{ height: "100%", display: "flex", alignItems: "center", justifyContent: "center", padding: "24px 20px", overflowY: "auto" }}>
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none", background: "radial-gradient(ellipse at 50% 50%,rgba(212,168,67,.07) 0%,transparent 60%)" }} />
      <div style={{ position: "absolute", inset: 0, opacity: .025, pointerEvents: "none", backgroundImage: `linear-gradient(${GOLD} 1px,transparent 1px),linear-gradient(90deg,${GOLD} 1px,transparent 1px)`, backgroundSize: "80px 80px" }} />
      <div style={{ position: "relative", zIndex: 2, width: "100%", maxWidth: 520 }}>
        <motion.div initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: .1, duration: .7 }}>
          <MOAStar size={44} style={{ marginBottom: 20 }} />
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
            <div style={{ width: 36, height: 1.5, background: `linear-gradient(to right,${GOLD},transparent)` }} />
            <span style={{ fontSize: "clamp(7px,1.5vw,9px)", color: GOLD, letterSpacing: "0.28em", textTransform: "uppercase", fontWeight: 700, fontFamily: "var(--body)" }}>
              Official Brand Partnership Deck · 2025
            </span>
          </div>
          <h1 style={{ fontFamily: "var(--display)", fontSize: "clamp(42px,8vw,88px)", lineHeight: .88, color: "#fff", textTransform: "uppercase", marginBottom: 10 }}>
            Let's Make<br />This <span className="shimmer-gold">Yours.</span>
          </h1>
          <p style={{ fontSize: "clamp(12px,1.5vw,13px)", color: "rgba(255,255,255,.38)", lineHeight: 1.65, marginBottom: 24, fontFamily: "var(--body)" }}>
            We personalize this deck to your brand. Takes 20 seconds.
          </p>
          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div key="s1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                <label style={{ fontSize: 9, color: "rgba(255,255,255,.35)", letterSpacing: "0.18em", textTransform: "uppercase", display: "block", marginBottom: 8, fontFamily: "var(--body)" }}>
                  Your Brand / Company Name
                </label>
                <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                  <input value={brand} onChange={e => setBrand(e.target.value)} onKeyDown={e => e.key === "Enter" && proceed()} autoFocus
                    placeholder="e.g. Nike, Sephora, Grand Hyatt…"
                    style={{ flex: "1 1 200px", padding: "14px 16px", borderRadius: 4, fontSize: 16, fontWeight: 500, background: "rgba(255,255,255,.06)", border: `1px solid ${brand ? GOLD + "66" : "rgba(255,255,255,.12)"}`, color: "#fff", outline: "none", transition: "border .2s", fontFamily: "var(--body)" }} />
                  <GoldButton large onClick={proceed} disabled={!brand.trim()}>Next <ArrowRight size={14} /></GoldButton>
                </div>
              </motion.div>
            )}
            {step === 2 && (
              <motion.div key="s2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                <label style={{ fontSize: 9, color: "rgba(255,255,255,.35)", letterSpacing: "0.18em", textTransform: "uppercase", display: "block", marginBottom: 10, fontFamily: "var(--body)" }}>
                  What brings {brand} here?
                </label>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(140px,1fr))", gap: 7, marginBottom: 18 }}>
                  {cats.map(c => (
                    <button key={c} data-mag onClick={() => setCategory(c)} style={{ padding: "12px 10px", borderRadius: 4, fontSize: "clamp(10px,1.5vw,11px)", fontWeight: 600, background: category === c ? `${GOLD}22` : "rgba(255,255,255,.05)", border: `1px solid ${category === c ? GOLD : "rgba(255,255,255,.1)"}`, color: category === c ? GOLD : "rgba(255,255,255,.5)", cursor: "pointer", transition: "all .2s", textAlign: "center", lineHeight: 1.3, fontFamily: "var(--body)" }}>{c}</button>
                  ))}
                </div>
                <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                  <button onClick={() => setStep(1)} style={{ padding: "11px 18px", background: "none", border: "1px solid rgba(255,255,255,.15)", borderRadius: 4, color: "rgba(255,255,255,.4)", cursor: "pointer", fontSize: 11, fontFamily: "var(--body)" }}>← Back</button>
                  <GoldButton large onClick={proceed} disabled={!category} style={{ flex: 1, justifyContent: "center", minWidth: 160 }}>
                    Open {brand}'s Deck <ArrowRight size={14} />
                  </GoldButton>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
        <div style={{ display: "flex", gap: 6, justifyContent: "center", marginTop: 24 }}>
          {[1, 2].map(s => (<div key={s} style={{ width: s === step ? 24 : 6, height: 6, borderRadius: 3, background: s === step ? GOLD : "rgba(255,255,255,.15)", transition: "all .3s" }} />))}
        </div>
      </div>
    </div>
  );
}


export default function App() {
  const [phase, setPhase] = useState("intro");
  const [persona, setPersona] = useState(null);
  const [view, setView] = useState("hub");
  const [idx, setIdx] = useState(0);
  const [dir, setDir] = useState(1);
  const [aiOpen, setAiOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);
  const [navOpen, setNavOpen] = useState(false);
  const [animKey, setAnimKey] = useState(0);
  const [activeSection, setActiveSection] = useState("home");
  const { isMobile, isTablet, isDesktop } = useBreakpoint();

  const handleEnter = useCallback((p) => { setPersona(p); setPhase("deck"); }, []);

  const goTo = useCallback((i, d = null) => {
    if (i === idx || i < 0 || i >= SLIDES.length) return;
    setDir(d ?? (i > idx ? 1 : -1));
    setIdx(i); setAnimKey(k => k + 1);
    setActiveSection(SLIDES[i].section);
  }, [idx]);

  const goToSection = useCallback((sectionId) => {
    const i = SLIDES.findIndex(s => s.section === sectionId);
    if (i !== -1) { setActiveSection(sectionId); setIdx(i); setAnimKey(k => k + 1); setView("section"); setNavOpen(false); }
  }, []);

  const goToSlide = useCallback((slideIdx) => {
    setIdx(slideIdx); setAnimKey(k => k + 1);
    setActiveSection(SLIDES[slideIdx].section); setView("section"); setNavOpen(false);
  }, []);

  useEffect(() => {
    const fn = e => {
      if (aiOpen || contactOpen || view === "hub") return;
      if (e.key === "ArrowRight" || e.key === "ArrowDown") goTo(idx + 1);
      if (e.key === "ArrowLeft" || e.key === "ArrowUp") goTo(idx - 1);
      if (e.key === "Escape") setView("hub");
    };
    window.addEventListener("keydown", fn);
    return () => window.removeEventListener("keydown", fn);
  }, [idx, goTo, aiOpen, contactOpen, view]);

  const cur = SLIDES[idx];
  const curSection = SECTIONS.find(s => s.id === cur.section);
  const sectionSlides = SLIDES.filter(s => s.section === cur.section);
  const sectionPos = sectionSlides.findIndex(s => s.id === cur.id);
  const sectionProgress = sectionSlides.length > 1 ? (sectionPos / (sectionSlides.length - 1)) * 100 : 100;

  if (phase === "intro") return (
    <>
      <Cursor />
      <CinematicIntro onDone={handleEnter} />
    </>
  );

  const BOTTOM_H = isMobile ? 48 : 52;
  const TOP_H = isMobile ? 48 : 52;

  return (
    <div style={{ position: "fixed", inset: 0, background: DARK, fontFamily: "var(--body)", overflow: "hidden" }}>
      <Cursor />


      <TopNav sections={SECTIONS} slides={SLIDES} idx={idx} activeSection={activeSection}
        goToSection={goToSection} goToSlide={goToSlide} persona={persona}
        view={view} onHubClick={() => setView("hub")}
        navOpen={navOpen} setNavOpen={setNavOpen}
        isMobile={isMobile} isTablet={isTablet} />

      <AnimatePresence>
        {navOpen && (
          <motion.div initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }} transition={{ type: "tween", duration: .28 }}
            style={{ position: "fixed", top: TOP_H, right: 0, bottom: 0, width: "min(300px,85vw)", background: "rgba(8,6,4,.98)", backdropFilter: "blur(20px)", zIndex: 150, borderLeft: "1px solid rgba(255,255,255,.08)", overflowY: "auto" }}>
            {SECTIONS.filter(s => s.id !== "home").map(sec => {
              const secSlides = SLIDES.filter(s => s.section === sec.id);
              return (
                <div key={sec.id}>
                  <button onClick={() => goToSection(sec.id)} style={{ width: "100%", padding: "14px 20px", background: activeSection === sec.id ? `${sec.color}14` : "none", border: "none", borderLeft: `3px solid ${activeSection === sec.id ? sec.color : "transparent"}`, textAlign: "left", color: activeSection === sec.id ? "#fff" : "rgba(255,255,255,.5)", fontSize: 11, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", cursor: "pointer", fontFamily: "var(--body)" }}>
                    {sec.label}
                  </button>
                  {secSlides.length > 1 && secSlides.map(sl => {
                    const si = SLIDES.findIndex(s => s.id === sl.id);
                    return (
                      <button key={sl.id} onClick={() => goToSlide(si)} style={{ width: "100%", padding: "9px 20px 9px 36px", background: "none", border: "none", borderLeft: `1px solid ${sec.color}30`, textAlign: "left", color: "rgba(255,255,255,.35)", fontSize: 10, cursor: "pointer", fontFamily: "var(--body)", display: "block" }}>
                        {sl.label}
                      </button>
                    );
                  })}
                </div>
              );
            })}
            <div style={{ padding: "16px 20px", borderTop: "1px solid rgba(255,255,255,.06)", display: "flex", flexDirection: "column", gap: 8 }}>
              <button onClick={() => { setAiOpen(true); setNavOpen(false); }} style={{ padding: "10px 14px", borderRadius: 3, background: "rgba(212,168,67,.1)", border: `1px solid ${GOLD}40`, color: GOLD, fontSize: 10, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", cursor: "pointer", display: "flex", alignItems: "center", gap: 6, fontFamily: "var(--body)" }}>
                <Sparkles size={11} /> Ask AI
              </button>
              <button onClick={() => { setContactOpen(true); setNavOpen(false); }} style={{ padding: "10px 14px", borderRadius: 3, background: `linear-gradient(135deg,${GOLD},${GOLD2})`, border: "none", color: "#000", fontSize: 10, fontWeight: 800, letterSpacing: "0.08em", textTransform: "uppercase", cursor: "pointer", fontFamily: "var(--body)" }}>
                Get In Touch
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      {navOpen && <div onClick={() => setNavOpen(false)} style={{ position: "fixed", inset: 0, zIndex: 140 }} />}


      <AnimatePresence mode="wait">
        {view === "hub" && (
          <motion.div key="hub" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, scale: .97 }} transition={{ duration: .45 }}
            style={{ position: "absolute", left: 0, right: 0, top: TOP_H, bottom: 0, overflowY: "auto" }}>
            <HubView persona={persona} onSelect={goToSection} openAI={() => setAiOpen(true)} openContact={() => setContactOpen(true)} isMobile={isMobile} isTablet={isTablet} />
          </motion.div>
        )}
        {view === "section" && (
          <motion.div key="section" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: .35 }}
            style={{ position: "absolute", left: 0, right: 0, top: TOP_H, bottom: BOTTOM_H, overflowY: isDesktop ? "hidden" : "auto" }}>
            <AnimatePresence custom={dir} mode="wait">
              <SlideWrapper key={cur.id} id={cur.id} dir={dir} animKey={animKey}
                openAI={() => setAiOpen(true)} openContact={() => setContactOpen(true)}
                goTo={goTo} idx={idx} persona={persona} isMobile={isMobile} isTablet={isTablet} />
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>


      {view === "section" && (
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: BOTTOM_H, background: "rgba(5,4,3,0.95)", backdropFilter: "blur(24px)", borderTop: "1px solid rgba(255,255,255,0.06)", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 14px", zIndex: 100 }}>
          <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: "rgba(255,255,255,.04)" }}>
            <motion.div animate={{ width: `${sectionProgress}%` }} transition={{ duration: .4, ease: "easeOut" }}
              style={{ height: "100%", background: `linear-gradient(90deg,${curSection?.color || GOLD},${GOLD2})` }} />
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <button data-mag onClick={() => setView("hub")} style={{ display: "flex", alignItems: "center", gap: 4, padding: "5px 8px", background: "rgba(255,255,255,.05)", border: "1px solid rgba(255,255,255,.1)", borderRadius: 3, color: "rgba(255,255,255,.4)", fontSize: 8, cursor: "pointer", fontFamily: "var(--body)", letterSpacing: "0.06em", textTransform: "uppercase" }}>
              <ChevronLeft size={9} /> Hub
            </button>
            <NavBtn onClick={() => goTo(idx - 1)} disabled={idx === 0}><ChevronLeft size={13} /></NavBtn>
            <NavBtn onClick={() => goTo(idx + 1)} disabled={idx === SLIDES.length - 1}><ChevronRight size={13} /></NavBtn>
            {!isMobile && (
              <span style={{ fontSize: 10, color: "rgba(255,255,255,.22)", fontFamily: "var(--mono)", letterSpacing: "0.1em" }}>
                {String(sectionPos + 1).padStart(2, "0")} / {String(sectionSlides.length).padStart(2, "0")}
              </span>
            )}
            <div style={{ display: "flex", gap: 3, marginLeft: 4 }}>
              {sectionSlides.map(s => {
                const si = SLIDES.indexOf(s);
                return <button key={s.id} data-mag onClick={() => goTo(si)} style={{ width: si === idx ? 16 : 5, height: 5, borderRadius: 3, background: si === idx ? curSection?.color || GOLD : "rgba(255,255,255,.15)", border: "none", cursor: "pointer", transition: "all .25s" }} />;
              })}
            </div>
          </div>
          {!isMobile && (
            <span style={{ fontSize: 9, color: "rgba(255,255,255,.3)", letterSpacing: "0.1em", textTransform: "uppercase", fontWeight: 600, position: "absolute", left: "50%", transform: "translateX(-50%)" }}>
              {curSection?.label}
            </span>
          )}
          <div style={{ display: "flex", gap: 6 }}>
            <button data-mag onClick={() => setAiOpen(true)} style={{ padding: "5px 10px", borderRadius: 3, background: "rgba(212,168,67,.1)", border: `1px solid ${GOLD}40`, color: GOLD, fontSize: 9, fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase", cursor: "pointer", display: "flex", alignItems: "center", gap: 4 }}>
              <Sparkles size={10} /> {!isMobile && "Ask "}AI
            </button>
            <button data-mag onClick={() => setContactOpen(true)} style={{ padding: "5px 12px", borderRadius: 3, background: `linear-gradient(135deg,${GOLD},${GOLD2})`, border: "none", color: "#000", fontSize: 9, fontWeight: 800, letterSpacing: "0.06em", textTransform: "uppercase", cursor: "pointer" }}>
              {isMobile ? "Contact" : "Get In Touch"}
            </button>
          </div>
        </div>
      )}

      <AnimatePresence>{aiOpen && <AIPanel onClose={() => setAiOpen(false)} persona={persona} isMobile={isMobile} />}</AnimatePresence>
      <AnimatePresence>{contactOpen && <ContactModal onClose={() => setContactOpen(false)} persona={persona} />}</AnimatePresence>
    </div>
  );
}


const HUB_TILES = [
  { id: "why", label: "Why MOA", sub: "Scale · Audience · Reach", stat: "40M+", statLabel: "Annual Visitors", color: "#C9915A", img: IMG.hub_why, icon: <BarChart2 size={16} /> },
  { id: "retail", label: "Retail", sub: "Flagship · Inline · Pop-Up", stat: "500+", statLabel: "Brand Partners", color: "#B8875C", img: IMG.hub_ret, icon: <ShoppingBag size={16} /> },
  { id: "entertainment", label: "Entertainment", sub: "Theme Park · Aquarium · Concerts", stat: "5M+", statLabel: "Visits/yr", color: "#5A7ABD", img: IMG.hub_ent, icon: <Play size={16} /> },
  { id: "sponsorship", label: "Sponsorship", sub: "Title · Premier · Associate", stat: "$5M+", statLabel: "Top Tier Value", color: "#4A9A7A", img: IMG.hub_spo, icon: <Award size={16} /> },
  { id: "moment", label: "★ The Moment", sub: "Zone Map · ROI Calculator", stat: "3.2×", statLabel: "Avg Partner ROI", color: GOLD, img: IMG.hub_mom, icon: <Star size={16} /> },
  { id: "contact", label: "Let's Partner", sub: "Start the conversation", stat: "24h", statLabel: "Response Time", color: "#8B9EA8", img: IMG.hub_con, icon: <Send size={16} /> },
];

function HubView({ persona, onSelect, openAI, openContact, isMobile, isTablet }) {
  const [hovered, setHovered] = useState(null);
  const cols = isMobile ? "repeat(2,1fr)" : isTablet ? "repeat(2,1fr)" : "repeat(3,1fr)";

  return (
    <div style={{ position: "relative", minHeight: "100%", background: DARK, paddingBottom: 16 }}>
      <div style={{ position: "fixed", inset: 0, zIndex: 0, background: "radial-gradient(ellipse at 20% 50%,rgba(212,168,67,.06) 0%,transparent 50%),radial-gradient(ellipse at 80% 50%,rgba(74,154,122,.04) 0%,transparent 50%)", pointerEvents: "none" }} />
      <div style={{ position: "fixed", inset: 0, opacity: .025, zIndex: 0, backgroundImage: `linear-gradient(${GOLD} 1px,transparent 1px),linear-gradient(90deg,${GOLD} 1px,transparent 1px)`, backgroundSize: "60px 60px", pointerEvents: "none" }} />


      <div style={{ position: "relative", zIndex: 2, padding: `16px 5% ${isMobile ? "12px" : "14px"}`, display: "flex", alignItems: isMobile ? "flex-start" : "flex-end", justifyContent: "space-between", flexWrap: "wrap", gap: 10 }}>
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .6 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
            <div style={{ width: 24, height: 1.5, background: `linear-gradient(to right,${GOLD},transparent)` }} />
            <span style={{ fontSize: "clamp(7px,1.5vw,8px)", color: GOLD, letterSpacing: "0.22em", textTransform: "uppercase", fontWeight: 700 }}>
              Partnership Deck · {persona.brand}
            </span>
          </div>
          <h1 style={{ fontFamily: "var(--display)", fontSize: "clamp(22px,3.5vw,44px)", color: "#fff", textTransform: "uppercase", lineHeight: .9 }}>
            Choose Your <span className="shimmer-gold">Journey</span>
          </h1>
        </motion.div>
        {!isMobile && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: .4 }} style={{ display: "flex", gap: 8 }}>
            <button data-mag onClick={openAI} style={{ padding: "7px 14px", borderRadius: 3, background: "rgba(212,168,67,.1)", border: `1px solid ${GOLD}40`, color: GOLD, fontSize: 10, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", cursor: "pointer", display: "flex", alignItems: "center", gap: 6 }}>
              <Sparkles size={11} /> Ask AI
            </button>
            <button data-mag onClick={openContact} style={{ padding: "7px 16px", borderRadius: 3, background: `linear-gradient(135deg,${GOLD},${GOLD2})`, border: "none", color: "#000", fontSize: 10, fontWeight: 800, letterSpacing: "0.08em", textTransform: "uppercase", cursor: "pointer" }}>
              Get In Touch
            </button>
          </motion.div>
        )}
      </div>


      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .2 }}
        onClick={() => onSelect("home")} data-mag
        style={{ position: "relative", zIndex: 2, margin: `0 5% ${isMobile ? "6px" : "3px"}`, height: isMobile ? 56 : 68, overflow: "hidden", borderRadius: 4, cursor: "pointer", border: `1px solid ${GOLD}30`, background: "linear-gradient(135deg,#1a1005,#0a0806)" }}>
        <video autoPlay muted loop playsInline style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", opacity: .28 }}>
          <source src={HERO_VID} type="video/mp4" />
        </video>
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to right,rgba(5,4,3,.9) 0%,rgba(5,4,3,.2) 100%)" }} />
        <div style={{ position: "relative", zIndex: 2, height: "100%", display: "flex", alignItems: "center", justifyContent: "space-between", padding: `0 ${isMobile ? "14px" : "24px"}` }}>
          <div style={{ display: "flex", alignItems: "center", gap: isMobile ? 10 : 14 }}>
            <MOAStar size={isMobile ? 20 : 26} />
            <div>
              <div style={{ fontSize: 7, color: GOLD, letterSpacing: "0.2em", textTransform: "uppercase", fontWeight: 700, marginBottom: 2 }}>Start Here</div>
              <div style={{ fontFamily: "var(--display)", fontSize: isMobile ? 14 : 20, color: "#fff", lineHeight: 1, textTransform: "uppercase" }}>
                {isMobile ? "More Than A Mall" : "More Than A Mall — The Full Story"}
              </div>
            </div>
          </div>
          {!isMobile && (
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              {[["#1", "US Destination"], ["40M+", "Visitors"], ["5.6M sqft", "Space"]].map(([v, l]) => (
                <div key={l} style={{ textAlign: "center", padding: "5px 12px", borderLeft: `1px solid ${GOLD}30` }}>
                  <div style={{ fontFamily: "var(--display)", fontSize: 16, color: GOLD, lineHeight: 1 }}>{v}</div>
                  <div style={{ fontSize: 7, color: "rgba(255,255,255,.3)", textTransform: "uppercase", letterSpacing: "0.08em" }}>{l}</div>
                </div>
              ))}
              <ArrowRight size={14} style={{ color: GOLD, marginLeft: 6 }} />
            </div>
          )}
          {isMobile && <ArrowRight size={14} style={{ color: GOLD }} />}
        </div>
      </motion.div>

      <div style={{ position: "relative", zIndex: 2, display: "grid", gridTemplateColumns: cols, gap: 3, padding: "0 5% 8px" }}>
        {HUB_TILES.map((tile, i) => (
          <motion.div key={tile.id}
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: .08 + i * .06, duration: .5, ease: [.16, 1, .3, 1] }}
            onMouseEnter={() => setHovered(tile.id)} onMouseLeave={() => setHovered(null)}
            onClick={() => onSelect(tile.id)} data-mag
            style={{ position: "relative", overflow: "hidden", cursor: "pointer", borderRadius: 4, border: `1px solid ${hovered === tile.id ? tile.color + "60" : "rgba(255,255,255,.06)"}`, transition: "border-color .3s", minHeight: isMobile ? 140 : isTablet ? 160 : 0, aspectRatio: isMobile ? "auto" : "auto" }}>
            <img src={tile.img} alt="" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", filter: "saturate(.5) contrast(1.05) brightness(.72)", transform: hovered === tile.id ? "scale(1.06)" : "scale(1)", transition: "transform .7s cubic-bezier(.16,1,.3,1)" }} />
            <div style={{ position: "absolute", inset: 0, background: hovered === tile.id ? `linear-gradient(to top,rgba(5,4,3,.97) 0%,rgba(5,4,3,.4) 60%,${tile.color}18 100%)` : "linear-gradient(to top,rgba(5,4,3,.94) 0%,rgba(5,4,3,.58) 60%,rgba(5,4,3,.18) 100%)", transition: "background .4s" }} />
            <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: tile.color, opacity: hovered === tile.id ? 1 : .3, transition: "opacity .3s" }} />
            <div style={{ position: "relative", zIndex: 2, height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: isMobile ? "12px 12px" : "14px 16px" }}>
              <div style={{ color: hovered === tile.id ? tile.color : "rgba(255,255,255,.3)", transition: "color .3s" }}>{tile.icon}</div>
              <div>
                <div style={{ fontFamily: "var(--display)", fontSize: `clamp(18px,${isMobile ? "5" : "2.6"}vw,34px)`, color: tile.color, lineHeight: 1, marginBottom: 2, filter: hovered === tile.id ? `drop-shadow(0 0 10px ${tile.color}60)` : "none", transition: "filter .3s" }}>{tile.stat}</div>
                <div style={{ fontSize: "clamp(6px,1.2vw,8px)", color: "rgba(255,255,255,.28)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 4 }}>{tile.statLabel}</div>
                <h3 style={{ fontFamily: "var(--display)", fontSize: `clamp(13px,${isMobile ? "3.5" : "1.9"}vw,22px)`, color: "#fff", textTransform: "uppercase", lineHeight: 1, marginBottom: 3 }}>{tile.label}</h3>
                <p style={{ fontSize: "clamp(7px,1.2vw,9px)", color: "rgba(255,255,255,.28)", lineHeight: 1.4 }}>{tile.sub}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}


function TopNav({ sections, slides, idx, activeSection, goToSection, goToSlide, persona, view, onHubClick, navOpen, setNavOpen, isMobile, isTablet }) {
  const [hover, setHover] = useState(null);
  const curSection = sections.find(s => s.id === activeSection);
  return (
    <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: isMobile ? 48 : 52, zIndex: 200, background: "rgba(5,4,3,0.97)", backdropFilter: "blur(24px)", borderBottom: "1px solid rgba(255,255,255,0.07)", display: "flex", alignItems: "center" }}>
      <button data-mag onClick={onHubClick} style={{ width: isMobile ? 44 : 54, height: "100%", display: "flex", alignItems: "center", justifyContent: "center", background: "none", border: "none", borderRight: "1px solid rgba(255,255,255,.07)", cursor: "pointer", flexShrink: 0 }}>
        <MOAStar size={isMobile ? 22 : 26} />
      </button>
      <div style={{ padding: `0 ${isMobile ? "10px" : "14px"}`, borderRight: "1px solid rgba(255,255,255,.07)", height: "100%", display: "flex", flexDirection: "column", justifyContent: "center", flexShrink: 0 }}>
        <div style={{ fontSize: 7, color: "rgba(255,255,255,.25)", letterSpacing: "0.1em", textTransform: "uppercase" }}>Prepared for</div>
        <div style={{ fontSize: isMobile ? 10 : 12, fontWeight: 700, color: GOLD, letterSpacing: "0.03em", maxWidth: isMobile ? 80 : 140, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{persona.brand}</div>
      </div>

      {!isMobile && !isTablet && (
        <>
          <button data-mag onClick={onHubClick} style={{ height: "100%", padding: "0 12px", background: view === "hub" ? `${GOLD}12` : "none", border: "none", borderBottom: `2px solid ${view === "hub" ? GOLD : "transparent"}`, color: view === "hub" ? GOLD : "rgba(255,255,255,.35)", fontSize: 9, fontWeight: 700, letterSpacing: "0.07em", textTransform: "uppercase", cursor: "pointer", transition: "all .2s", flexShrink: 0 }}>
            ⊞ All
          </button>
          <div style={{ display: "flex", height: "100%", flex: 1, overflow: "hidden" }}>
            {sections.filter(s => s.id !== "home").map(sec => {
              const isActive = activeSection === sec.id && view === "section";
              const secSlides = slides.filter(s => s.section === sec.id);
              return (
                <div key={sec.id} style={{ position: "relative" }} onMouseEnter={() => setHover(sec.id)} onMouseLeave={() => setHover(null)}>
                  <button data-mag onClick={() => goToSection(sec.id)} style={{ height: 52, padding: "0 11px", background: "none", border: "none", borderBottom: `2px solid ${isActive ? sec.color : "transparent"}`, color: isActive ? "#fff" : "rgba(255,255,255,.35)", fontSize: 9, fontWeight: isActive ? 700 : 500, letterSpacing: "0.07em", textTransform: "uppercase", cursor: "pointer", transition: "all .2s", whiteSpace: "nowrap" }}>
                    {sec.label}
                  </button>
                  <AnimatePresence>
                    {hover === sec.id && secSlides.length > 1 && (
                      <motion.div initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -4 }}
                        style={{ position: "absolute", top: "100%", left: 0, background: "rgba(8,6,4,.98)", backdropFilter: "blur(20px)", border: `1px solid ${sec.color}30`, borderRadius: "0 0 4px 4px", minWidth: 140, zIndex: 300, overflow: "hidden" }}>
                        {secSlides.map(sl => {
                          const si = slides.findIndex(s => s.id === sl.id);
                          return (
                            <button key={sl.id} data-mag onClick={() => goToSlide(si)} style={{ width: "100%", padding: "9px 14px", background: "none", border: "none", borderLeft: `2px solid ${sec.color}50`, textAlign: "left", color: "rgba(255,255,255,.5)", fontSize: 10, cursor: "pointer", transition: "all .15s", letterSpacing: "0.04em", display: "block" }}
                              onMouseEnter={e => { e.currentTarget.style.color = "#fff"; e.currentTarget.style.background = `${sec.color}10`; }}
                              onMouseLeave={e => { e.currentTarget.style.color = "rgba(255,255,255,.5)"; e.currentTarget.style.background = "none"; }}>
                              {sl.label}
                            </button>
                          );
                        })}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </>
      )}


      {isTablet && (
        <button data-mag onClick={onHubClick} style={{ height: "100%", padding: "0 12px", background: view === "hub" ? `${GOLD}12` : "none", border: "none", borderBottom: `2px solid ${view === "hub" ? GOLD : "transparent"}`, color: view === "hub" ? GOLD : "rgba(255,255,255,.35)", fontSize: 9, fontWeight: 700, letterSpacing: "0.07em", textTransform: "uppercase", cursor: "pointer", transition: "all .2s" }}>
          ⊞ All Sections
        </button>
      )}

      <div style={{ flex: 1 }} />


      <div style={{ padding: "0 10px", borderLeft: "1px solid rgba(255,255,255,.07)", flexShrink: 0, height: "100%", display: "flex", alignItems: "center", gap: 8 }}>
        {!isMobile && (
          <div style={{ padding: "3px 8px", borderRadius: 2, background: `${curSection?.color || GOLD}15`, border: `1px solid ${curSection?.color || GOLD}40`, fontSize: 7, color: curSection?.color || GOLD, letterSpacing: "0.1em", textTransform: "uppercase", fontWeight: 700, maxWidth: 100, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
            {persona.category}
          </div>
        )}
        {(isMobile || isTablet) && (
          <button onClick={() => setNavOpen(!navOpen)} style={{ width: 34, height: 34, display: "flex", alignItems: "center", justifyContent: "center", background: navOpen ? `${GOLD}18` : "rgba(255,255,255,.05)", border: `1px solid ${navOpen ? GOLD + "50" : "rgba(255,255,255,.1)"}`, borderRadius: 3, color: navOpen ? GOLD : "rgba(255,255,255,.5)", cursor: "pointer" }}>
            {navOpen ? <X size={15} /> : <Menu size={15} />}
          </button>
        )}
      </div>
    </div>
  );
}

const V = {
  enter: d => ({ opacity: 0, x: d > 0 ? 32 : -32, scale: .99 }),
  center: { opacity: 1, x: 0, scale: 1, transition: { duration: .5, ease: [.16, 1, .3, 1] } },
  exit: d => ({ opacity: 0, x: d > 0 ? -32 : 32, scale: .99, transition: { duration: .3, ease: [.16, 1, .3, 1] } }),
};

function SlideWrapper({ id, dir, animKey, openAI, openContact, goTo, idx, persona, isMobile, isTablet }) {
  const p = { openAI, openContact, goTo, idx, animKey, persona, isMobile, isTablet };
  const map = {
    "hero": <SlideHero {...p} />, "scale": <SlideScale {...p} />, "audience": <SlideAudience {...p} />,
    "retail": <SlideRetail {...p} />, "luxury": <SlideLuxury {...p} />, "dining": <SlideDining {...p} />,
    "entertain": <SlideEntertain {...p} />, "events": <SlideEvents {...p} />, "sponsor": <SlideSponsor {...p} />,
    "moment-map": <SlideMomentMap {...p} />, "moment-roi": <SlideMomentROI {...p} />, "moment-why": <SlideMomentWhy {...p} />,
    "contact": <SlideContact {...p} />,
  };
  return (
    <motion.div key={id} custom={dir} variants={V} initial="enter" animate="center" exit="exit"
      style={{ position: "absolute", inset: 0 }}>
      {map[id]}
    </motion.div>
  );
}



function SlideHero({ goTo, openAI, animKey, persona, isMobile }) {
  const [err, setErr] = useState(false);
  return (
    <div style={{ position: "relative", width: "100%", height: "100%", overflow: "hidden" }}>
      {!err ? <video autoPlay muted loop playsInline onError={() => setErr(true)} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}><source src={HERO_VID} type="video/mp4" /></video>
        : <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at 35% 55%,#1e1208,#050403 70%)" }} />}
      <div style={{ position: "absolute", inset: 0, background: isMobile ? "rgba(5,4,3,.8)" : "linear-gradient(to right,rgba(5,4,3,.93) 0%,rgba(5,4,3,.5) 55%,rgba(5,4,3,.15) 100%)" }} />
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top,rgba(5,4,3,.88) 0%,transparent 45%)" }} />
      <div style={{ position: "absolute", inset: 0, opacity: .025, backgroundImage: `linear-gradient(${GOLD} 1px,transparent 1px),linear-gradient(90deg,${GOLD} 1px,transparent 1px)`, backgroundSize: "90px 90px" }} />

      <motion.div key={animKey + "pb"} initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .8 }}
        style={{ position: "absolute", top: 0, right: 0, padding: "8px 16px", borderBottom: "1px solid rgba(255,255,255,.06)", borderLeft: "1px solid rgba(255,255,255,.06)", background: "rgba(5,4,3,.7)", backdropFilter: "blur(12px)" }}>
        <span style={{ fontSize: 8, color: "rgba(255,255,255,.3)", letterSpacing: "0.12em" }}>Prepared for </span>
        <span style={{ fontSize: 8, color: GOLD, fontWeight: 700, letterSpacing: "0.08em" }}>{persona.brand}</span>
      </motion.div>

      <div style={{ position: "relative", zIndex: 10, height: "100%", display: "flex", flexDirection: "column", justifyContent: isMobile ? "flex-end" : "center", padding: isMobile ? "0 6% 8%" : "0 6% 0 7%" }}>
        <motion.div key={animKey + "a"} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .1 }}
          style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: isMobile ? 14 : 22 }}>
          <div style={{ width: 36, height: 1.5, background: `linear-gradient(to right,${GOLD},transparent)` }} />
          <span style={{ fontSize: 8, color: GOLD, letterSpacing: "0.22em", textTransform: "uppercase", fontWeight: 700 }}>Official Brand Partnership · 2025</span>
        </motion.div>
        <motion.h1 key={animKey + "b"} initial={{ opacity: 0, y: 44 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .18, duration: .85, ease: [.16, 1, .3, 1] }}
          style={{ fontFamily: "var(--display)", fontSize: "clamp(52px,12vw,148px)", lineHeight: .88, color: "#fff", textTransform: "uppercase", marginBottom: 12 }}>
          More<br />Than<br /><span className="shimmer-gold">A Mall.</span>
        </motion.h1>
        <motion.p key={animKey + "c"} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: .5 }}
          style={{ fontSize: "clamp(12px,1.6vw,17px)", color: "rgba(255,255,255,.42)", fontWeight: 300, maxWidth: 460, lineHeight: 1.7, marginBottom: 24 }}>
          40 million visitors. 500+ world-class brands. The most powerful retail platform in North America — and now it's {persona.brand}'s stage.
        </motion.p>
        <motion.div key={animKey + "d"} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .72 }}
          style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          <GoldButton large onClick={() => goTo(SLIDES.findIndex(s => s.section === "why"))}>
            See Opportunity <ArrowRight size={14} />
          </GoldButton>
          <button data-mag onClick={openAI} style={{ padding: "11px 16px", borderRadius: 3, background: "rgba(255,255,255,.06)", border: "1px solid rgba(255,255,255,.14)", color: "#fff", fontSize: 10, fontWeight: 600, letterSpacing: "0.07em", textTransform: "uppercase", cursor: "pointer", display: "flex", alignItems: "center", gap: 7, backdropFilter: "blur(10px)" }}>
            <Sparkles size={12} style={{ color: GOLD }} /> Ask AI
          </button>
        </motion.div>
      </div>

      {!isMobile && (
        <motion.div key={animKey + "e"} initial={{ opacity: 0, x: 32 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: .55, duration: .8 }}
          style={{ position: "absolute", right: 40, bottom: "8%", display: "flex", flexDirection: "column", gap: 1 }}>
          {[["40M+", "Annual Visitors"], ["$200", "Avg Per-Visit Spend"], ["3.2h", "Avg Dwell Time"], ["#1", "US Destination"]].map(([v, l]) => (
            <div key={l} style={{ padding: "11px 16px", background: "rgba(5,4,3,.72)", backdropFilter: "blur(20px)", borderLeft: `2px solid ${GOLD}`, borderBottom: "1px solid rgba(255,255,255,.04)" }}>
              <div style={{ fontFamily: "var(--display)", fontSize: "clamp(20px,2.8vw,38px)", color: GOLD, lineHeight: 1 }}>{v}</div>
              <div style={{ fontSize: 8, color: "rgba(255,255,255,.38)", letterSpacing: "0.1em", textTransform: "uppercase", marginTop: 3 }}>{l}</div>
            </div>
          ))}
        </motion.div>
      )}
    </div>
  );
}

function SlideScale({ animKey, isMobile }) {
  const stats = [
    { v: 40, suffix: "M+", label: "Annual Visitors", sub: "More than most US cities", dark: true },
    { v: 5.6, suffix: "M sqft", label: "Total Space", sub: "Largest retail in the US", decimals: 1 },
    { v: 4.2, prefix: "$", suffix: "B", label: "Economic Impact", sub: "Statewide annually", decimals: 1 },
    { v: 500, suffix: "+", label: "Brand Partners", sub: "World-class global mix" },
  ];
  return (
    <div style={{ position: "relative", width: "100%", height: "100%", background: "#fff", overflow: isMobile ? "auto" : "hidden", display: "flex", flexDirection: "column" }}>
      <video autoPlay muted loop playsInline style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", opacity: .06, filter: "grayscale(1)", zIndex: 0 }}>
        <source src={HERO_VID} type="video/mp4" />
      </video>
      <div style={{ flex: isMobile ? "0 0 auto" : "0 0 36%", position: "relative", zIndex: 1, overflow: "hidden", background: "linear-gradient(135deg,#0a0806 0%,#141009 100%)", padding: isMobile ? "40px 7% 24px" : undefined, minHeight: isMobile ? 160 : undefined }}>
        <img src={IMG.story} alt="" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", opacity: .16 }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom,transparent 30%,#fff 100%)" }} />
        <div style={{ position: "relative", zIndex: 2, height: "100%", display: "flex", flexDirection: "column", justifyContent: "flex-end", padding: isMobile ? 0 : "0 7% 24px" }}>
          <motion.div key={animKey} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
              <div style={{ width: 36, height: 2, background: GOLD2 }} />
              <span style={{ fontSize: 9, color: GOLD2, letterSpacing: "0.25em", textTransform: "uppercase", fontWeight: 700 }}>Why MOA</span>
            </div>
            <h2 style={{ fontFamily: "var(--display)", fontSize: "clamp(28px,5vw,68px)", color: "#fff", lineHeight: .9, textTransform: "uppercase" }}>The Numbers Don't Lie</h2>
          </motion.div>
        </div>
      </div>
      <div style={{ flex: 1, zIndex: 1, position: "relative", background: "#fff", display: "flex", flexDirection: "column" }}>
        <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr 1fr" : "repeat(4,1fr)", gap: 1, flex: 1 }}>
          {stats.map((s, i) => (
            <motion.div key={s.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .1 + i * .07 }}
              style={{ padding: "clamp(12px,2vw,26px)", background: s.dark ? "#0a0806" : "#f7f3eb", borderBottom: `3px solid ${GOLD}`, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
              <div style={{ fontFamily: "var(--display)", fontSize: "clamp(24px,4vw,60px)", color: s.dark ? GOLD : "#0a0806", lineHeight: 1, marginBottom: 6 }}>
                {s.prefix || ""}<Counter to={s.v} suffix={s.suffix} delay={.2 + i * .07} decimals={s.decimals || 0} />
              </div>
              <div>
                <div style={{ fontSize: "clamp(9px,1.2vw,11px)", fontWeight: 700, color: s.dark ? "rgba(255,255,255,.75)" : "#222", marginBottom: 2 }}>{s.label}</div>
                <div style={{ fontSize: "clamp(7px,1vw,9px)", color: s.dark ? "rgba(255,255,255,.3)" : "#999" }}>{s.sub}</div>
              </div>
            </motion.div>
          ))}
        </div>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: .6 }}
          style={{ display: "flex", gap: 1, flexWrap: isMobile ? "wrap" : "nowrap" }}>
          {[["$200+", "Avg Spend"], ["365", "Days/Year"], ["100+", "Countries"], ["12K", "Jobs"], ["3.2h", "Dwell"]].map(([v, l]) => (
            <div key={l} style={{ flex: isMobile ? "1 1 30%" : 1, padding: "10px 10px", background: "#111009" }}>
              <div style={{ fontFamily: "var(--mono)", fontSize: "clamp(11px,1.8vw,19px)", color: GOLD }}>{v}</div>
              <div style={{ fontSize: 7, color: "rgba(255,255,255,.3)", textTransform: "uppercase", letterSpacing: "0.07em", marginTop: 2 }}>{l}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}

function SlideAudience({ animKey, persona, isMobile }) {
  const [activeDemo, setActiveDemo] = useState(0);
  const demos = [
    { title: "Income", icon: <DollarSign size={14} />, stat: "70%", sub: "HHI $85K+", detail: "Seven in ten MOA visitors earn above $85K household income — well above the national median." },
    { title: "Intent", icon: <TrendingUp size={14} />, stat: "84%", sub: "Purchase intent", detail: "84% of visitors arrive with a specific purchase in mind. This isn't browsing — it's buying." },
    { title: "Origin", icon: <Globe size={14} />, stat: "55%", sub: "Out-of-state", detail: "More than half of visitors travel from outside Minnesota, including guests from 100+ countries." },
    { title: "Gender", icon: <Users size={14} />, stat: "62%", sub: "Female-led visits", detail: "62% of shopping decisions are led by female visitors — MOA's highest-converting demographic." },
  ];
  return (
    <div style={{ position: "relative", width: "100%", height: "100%", background: "#0a0806", overflow: isMobile ? "auto" : "hidden", display: isMobile ? "block" : "grid", gridTemplateColumns: "1fr 1fr" }}>
      <video autoPlay muted loop playsInline style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", opacity: .05, filter: "grayscale(1)", zIndex: 0 }}>
        <source src={ENT_VID} type="video/mp4" />
      </video>
      <div style={{ position: "relative", zIndex: 1, display: "flex", flexDirection: "column", justifyContent: "center", padding: isMobile ? "24px 6%" : "0 6% 0 7%", borderRight: isMobile ? "none" : "1px solid rgba(255,255,255,.06)", borderBottom: isMobile ? "1px solid rgba(255,255,255,.06)" : "none" }}>
        <motion.div key={animKey} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
            <div style={{ width: 36, height: 2, background: GOLD }} /><span style={{ fontSize: 9, color: GOLD, letterSpacing: "0.25em", textTransform: "uppercase", fontWeight: 700 }}>Our Audience</span>
          </div>
          <h2 style={{ fontFamily: "var(--display)", fontSize: "clamp(30px,5vw,72px)", color: "#fff", lineHeight: .88, textTransform: "uppercase", marginBottom: 18 }}>
            {persona.brand}'s<br />Ideal Customer<br />Is Already <span className="shimmer-gold">Here</span>
          </h2>
          <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            {demos.map((d, i) => (
              <motion.button key={d.title} data-mag onClick={() => setActiveDemo(i)}
                initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: .1 + i * .07 }}
                style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 14px", background: activeDemo === i ? `${GOLD}12` : "rgba(255,255,255,.04)", border: `1px solid ${activeDemo === i ? GOLD + "40" : "rgba(255,255,255,.07)"}`, borderLeft: `3px solid ${activeDemo === i ? GOLD : "transparent"}`, borderRadius: 4, cursor: "pointer", transition: "all .2s", textAlign: "left" }}>
                <div style={{ color: activeDemo === i ? GOLD : "rgba(255,255,255,.3)", flexShrink: 0 }}>{d.icon}</div>
                <div style={{ flex: 1 }}><div style={{ fontSize: 11, fontWeight: 700, color: activeDemo === i ? "#fff" : "rgba(255,255,255,.5)" }}>{d.title}</div></div>
                <div style={{ fontFamily: "var(--display)", fontSize: 20, color: activeDemo === i ? GOLD : "rgba(255,255,255,.25)", lineHeight: 1 }}>{d.stat}</div>
                <div style={{ fontSize: 8, color: "rgba(255,255,255,.25)" }}>{d.sub}</div>
              </motion.button>
            ))}
          </div>
        </motion.div>
      </div>
      <div style={{ display: "flex", position: "relative", zIndex: 1, flexDirection: "column", justifyContent: "center", padding: isMobile ? "24px 6%" : "0 7% 0 5%" }}>
        <AnimatePresence mode="wait">
          <motion.div key={activeDemo} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }} transition={{ duration: .35 }}>
            <div style={{ width: 52, height: 52, borderRadius: "50%", background: `radial-gradient(circle,${GOLD}30,${GOLD}08)`, border: `2px solid ${GOLD}40`, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 14, color: GOLD }}>{demos[activeDemo].icon}</div>
            <div style={{ fontFamily: "var(--display)", fontSize: "clamp(44px,7vw,90px)", color: GOLD, lineHeight: 1, marginBottom: 6 }}>{demos[activeDemo].stat}</div>
            <div style={{ fontSize: 13, fontWeight: 700, color: "#fff", marginBottom: 10 }}>{demos[activeDemo].sub}</div>
            <p style={{ fontSize: 12, color: "rgba(255,255,255,.45)", lineHeight: 1.75, maxWidth: 340, marginBottom: 20 }}>{demos[activeDemo].detail}</p>
            <div style={{ display: "flex", gap: 5 }}>
              {demos.map((_, i) => (<div key={i} style={{ width: i === activeDemo ? 20 : 5, height: 5, borderRadius: 3, background: i === activeDemo ? GOLD : "rgba(255,255,255,.15)", transition: "all .3s" }} />))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

function SlideRetail({ animKey, openContact, persona, isMobile }) {
  const [activeTab, setActiveTab] = useState("flagship");
  const tabs = {
    flagship: { label: "Flagship", size: "5,000–50,000 sq ft", term: "1–10 year lease", benefit: "Premium corner positioning, anchor status, exclusivity negotiation", img: IMG.ret_1 },
    inline: { label: "Inline", size: "800–5,000 sq ft", term: "6 months–5 years", benefit: "High-traffic corridors, flexible fit-out, proven category adjacency", img: IMG.ret_2 },
    popup: { label: "Pop-Up", size: "Flex formats", term: "1 day–6 months", benefit: "Test-and-learn, seasonal activations, launch events, product drops", img: IMG.ret_3 },
    kiosk: { label: "Kiosk / RMU", size: "50–300 sq ft", term: "Monthly rolling", benefit: "Lowest barrier to entry, highest-traffic zones, immediate presence", img: IMG.ret_4 },
  };
  const t = tabs[activeTab];
  return (
    <div style={{ position: "relative", width: "100%", height: "100%", background: "#0c0a07", overflow: isMobile ? "auto" : "hidden", display: isMobile ? "block" : "grid", gridTemplateColumns: "320px 1fr" }}>
      <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", padding: isMobile ? "24px 6%" : "0 5% 0 7%", borderRight: isMobile ? "none" : "1px solid rgba(255,255,255,.06)" }}>
        <motion.div key={animKey} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
            <div style={{ width: 36, height: 2, background: GOLD }} /><span style={{ fontSize: 9, color: GOLD, letterSpacing: "0.25em", textTransform: "uppercase", fontWeight: 700 }}>Retail</span>
          </div>
          <h2 style={{ fontFamily: "var(--display)", fontSize: "clamp(28px,4.5vw,58px)", color: "#fff", lineHeight: .88, textTransform: "uppercase", marginBottom: 16 }}>
            Find the Right Format for <span className="shimmer-gold">{persona.brand}</span>
          </h2>
          <div style={{ display: "flex", flexDirection: "column", gap: 4, marginBottom: 16 }}>
            {Object.entries(tabs).map(([k, v]) => (
              <button key={k} data-mag onClick={() => setActiveTab(k)} style={{ padding: "9px 12px", borderRadius: 3, textAlign: "left", background: activeTab === k ? `${GOLD}12` : "rgba(255,255,255,.04)", border: `1px solid ${activeTab === k ? GOLD + "40" : "rgba(255,255,255,.07)"}`, borderLeft: `3px solid ${activeTab === k ? GOLD : "transparent"}`, cursor: "pointer", transition: "all .2s", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <span style={{ fontSize: 11, fontWeight: 700, color: activeTab === k ? GOLD : "rgba(255,255,255,.5)" }}>{v.label}</span>
                <span style={{ fontSize: 8, color: "rgba(255,255,255,.3)", fontFamily: "var(--mono)" }}>{v.size}</span>
              </button>
            ))}
          </div>
          <GoldButton onClick={openContact}>Inquire About Space <ArrowRight size={12} /></GoldButton>
        </motion.div>
      </div>
      <div style={{ position: isMobile ? "relative" : "relative", minHeight: isMobile ? 240 : undefined, overflow: "hidden" }}>
        <AnimatePresence mode="wait">
          <motion.div key={activeTab} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} style={{ position: "absolute", inset: 0 }}>
            <img src={t.img} alt={t.label} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", filter: "saturate(.65)" }} />
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top,rgba(5,4,3,.97) 0%,rgba(5,4,3,.3) 60%,rgba(5,4,3,.1) 100%)" }} />
            <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "5%" }}>
              <div style={{ display: "flex", gap: 8, marginBottom: 12, flexWrap: "wrap" }}>
                {[["Size", t.size], ["Term", t.term]].map(([k, v]) => (
                  <div key={k} style={{ padding: "10px 14px", background: "rgba(5,4,3,.78)", backdropFilter: "blur(12px)", border: `1px solid ${GOLD}30`, borderRadius: 3, flex: "1 1 120px" }}>
                    <div style={{ fontSize: 8, color: GOLD, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 4 }}>{k}</div>
                    <div style={{ fontSize: 12, fontWeight: 700, color: "#fff" }}>{v}</div>
                  </div>
                ))}
              </div>
              <div style={{ padding: "12px 14px", background: "rgba(5,4,3,.82)", backdropFilter: "blur(12px)", border: "1px solid rgba(255,255,255,.08)", borderRadius: 3 }}>
                <div style={{ fontSize: 8, color: "rgba(255,255,255,.4)", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 4 }}>Key Benefit</div>
                <div style={{ fontSize: 12, color: "#fff", lineHeight: 1.55 }}>{t.benefit}</div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

function SlideLuxury({ animKey, openContact, isMobile }) {
  const brands = ["LOUIS VUITTON", "GUCCI", "PRADA", "CHANEL", "HERMÈS", "TIFFANY & CO.", "ROLEX", "CARTIER", "BURBERRY", "BALENCIAGA", "OMEGA", "COACH", "FENDI", "BOTTEGA VENETA"];
  return (
    <div style={{ position: "relative", width: "100%", height: "100%", overflow: isMobile ? "auto" : "hidden", background: "linear-gradient(135deg,#0a0805 0%,#1a1206 100%)" }}>
      <img src={IMG.luxury} alt="" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", opacity: .12 }} />
      <div style={{ position: "absolute", inset: 0, backgroundImage: `repeating-linear-gradient(45deg,${GOLD}07 0px,${GOLD}07 1px,transparent 1px,transparent 56px)` }} />
      <div style={{ position: "relative", zIndex: 2, height: isMobile ? "auto" : "100%", display: "flex", flexDirection: "column", justifyContent: "center", padding: isMobile ? "24px 6%" : "0 7%" }}>
        <motion.div key={animKey} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
            <div style={{ width: 36, height: 2, background: GOLD }} /><span style={{ fontSize: 9, color: GOLD, letterSpacing: "0.25em", textTransform: "uppercase", fontWeight: 700 }}>Luxury Wing</span>
          </div>
          <h2 style={{ fontFamily: "var(--display)", fontSize: "clamp(36px,6.5vw,86px)", color: "#fff", lineHeight: .88, textTransform: "uppercase", marginBottom: 14 }}>
            The Finest Company in <span className="shimmer-gold">North America</span>
          </h2>
          <p style={{ fontSize: "clamp(11px,1.4vw,13px)", color: "rgba(255,255,255,.38)", maxWidth: 480, lineHeight: 1.65, marginBottom: 20 }}>
            MOA's luxury corridor hosts 100+ premium tenants. 70% of visitors earn $85K+ household income.
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 8, marginBottom: 20, maxWidth: 420 }}>
            {[["100+", "Luxury Tenants"], ["$500+", "Avg Transaction"], ["70%", "HHI $85K+"]].map(([v, l]) => (
              <div key={l} style={{ padding: "12px 14px", background: `${GOLD}0d`, border: `1px solid ${GOLD}28`, textAlign: "center", borderRadius: 3 }}>
                <div style={{ fontFamily: "var(--display)", fontSize: "clamp(18px,2.8vw,34px)", color: GOLD, lineHeight: 1, marginBottom: 4 }}>{v}</div>
                <div style={{ fontSize: 7, color: "rgba(255,255,255,.38)", textTransform: "uppercase", letterSpacing: "0.07em" }}>{l}</div>
              </div>
            ))}
          </div>
          <div className="ticker-wrap" style={{ marginBottom: 18, padding: "10px 0", borderTop: "1px solid rgba(255,255,255,.06)", borderBottom: "1px solid rgba(255,255,255,.06)" }}>
            <div className="ticker">{[...brands, ...brands].map((b, i) => (<span key={i} style={{ display: "inline-block", padding: "0 20px", fontSize: 9, fontWeight: 700, color: "rgba(255,255,255,.25)", letterSpacing: "0.12em" }}>{b}</span>))}</div>
          </div>
          <GoldButton outline onClick={openContact}>Request Luxury Leasing Info <ArrowRight size={12} /></GoldButton>
        </motion.div>
      </div>
    </div>
  );
}

function SlideDining({ animKey, openContact, isMobile }) {
  const [expanded, setExpanded] = useState(null);
  const concepts = [
    { name: "Fine Dining", count: "15+", icon: <Award size={14} />, detail: "White-tablecloth restaurants and chef-driven concepts. Average check $80+." },
    { name: "Fast Casual", count: "35+", icon: <Coffee size={14} />, detail: "The volume engine. High throughput, brand exposure to repeat visitors 4–8× per month." },
    { name: "Food Hall", count: "Global Flavors", icon: <Globe size={14} />, detail: "MOA's international food hall. Longest average dwell time in the building." },
    { name: "Bar & Lounge", count: "8+", icon: <Music size={14} />, detail: "Evening economy. Extends dwell time. Ideal for spirits, wine, and lifestyle brand activations." },
  ];
  return (
    <div style={{ position: "relative", width: "100%", height: "100%", overflow: isMobile ? "auto" : "hidden" }}>
      <img src={IMG.dining} alt="" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }} />
      <div style={{ position: "absolute", inset: 0, background: isMobile ? "rgba(5,4,3,.88)" : "linear-gradient(to right,rgba(5,4,3,.92) 42%,rgba(5,4,3,.2) 100%)" }} />
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top,rgba(5,4,3,.7) 0%,transparent 50%)" }} />
      <div style={{ position: "relative", zIndex: 2, height: isMobile ? "auto" : "100%", display: "flex", alignItems: isMobile ? "flex-start" : "center", padding: isMobile ? "24px 6%" : "0 7%" }}>
        <motion.div key={animKey} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} style={{ maxWidth: 540, width: "100%" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
            <div style={{ width: 36, height: 2, background: "#E8630A" }} /><span style={{ fontSize: 9, color: "#E8630A", letterSpacing: "0.25em", textTransform: "uppercase", fontWeight: 700 }}>Dining & Lifestyle</span>
          </div>
          <h2 style={{ fontFamily: "var(--display)", fontSize: "clamp(36px,6vw,82px)", color: "#fff", lineHeight: .88, textTransform: "uppercase", marginBottom: 12 }}>
            Where Food Becomes Destination
          </h2>
          <p style={{ fontSize: 12, color: "rgba(255,255,255,.45)", lineHeight: 1.65, marginBottom: 16 }}>80+ restaurants across 15 cuisines. Diners stay 3× longer and spend 2.4× more.</p>
          <div style={{ display: "flex", flexDirection: "column", gap: 4, marginBottom: 16 }}>
            {concepts.map((c, i) => (
              <motion.div key={c.name} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: .1 + i * .07 }}>
                <button data-mag onClick={() => setExpanded(expanded === i ? null : i)} style={{ width: "100%", display: "flex", alignItems: "center", gap: 10, padding: "10px 12px", background: expanded === i ? "rgba(232,99,10,.12)" : "rgba(5,4,3,.6)", backdropFilter: "blur(12px)", border: `1px solid ${expanded === i ? "#E8630A40" : "rgba(255,255,255,.08)"}`, borderRadius: 3, cursor: "pointer", transition: "all .2s" }}>
                  <div style={{ color: "#E8630A", flexShrink: 0 }}>{c.icon}</div>
                  <div style={{ flex: 1, textAlign: "left" }}><div style={{ fontSize: 11, fontWeight: 700, color: "#fff" }}>{c.name}</div></div>
                  <div style={{ fontFamily: "var(--mono)", fontSize: 11, color: "#E8630A" }}>{c.count}</div>
                  <div style={{ color: "rgba(255,255,255,.3)", transform: expanded === i ? "rotate(180deg)" : "none", transition: "transform .2s" }}><ChevronDown size={12} /></div>
                </button>
                <AnimatePresence>
                  {expanded === i && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} style={{ overflow: "hidden" }}>
                      <div style={{ padding: "10px 12px", background: "rgba(232,99,10,.06)", border: "1px solid rgba(232,99,10,.15)", borderTop: "none", fontSize: 11, color: "rgba(255,255,255,.5)", lineHeight: 1.65 }}>{c.detail}</div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
          <GoldButton onClick={openContact}>Explore F&B Partnership <ArrowRight size={12} /></GoldButton>
        </motion.div>
      </div>
    </div>
  );
}

function SlideEntertain({ animKey, openContact, isMobile }) {
  const [err, setErr] = useState(false);
  const [activeAtt, setActiveAtt] = useState(0);
  const atts = [
    { icon: <Zap size={18} />, title: "Nickelodeon Universe", sub: "8-acre indoor theme park · 27 rides · 5M+ annual visitors", color: "#FFA500", stat: "5M+", statLabel: "Annual Visitors" },
    { icon: <Globe size={18} />, title: "SEA LIFE Aquarium", sub: "10,000+ sea creatures · Walk-through ocean tunnel", color: "#0096FF", stat: "1.2M+", statLabel: "Tickets/Year" },
    { icon: <Music size={18} />, title: "Concert Hall", sub: "3,000 capacity · Concert-grade acoustics", color: "#A855F7", stat: "200+", statLabel: "Shows/Year" },
    { icon: <Building2 size={18} />, title: "Expo Center", sub: "200,000 sq ft · Up to 50,000 attendees", color: "#22C55E", stat: "365+", statLabel: "Event Days/Year" },
  ];
  const a = atts[activeAtt];
  return (
    <div style={{ position: "relative", width: "100%", height: "100%", overflow: isMobile ? "auto" : "hidden" }}>
      {!err ? <video autoPlay muted loop playsInline onError={() => setErr(true)} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", opacity: .42 }}><source src={ENT_VID} type="video/mp4" /></video>
        : <img src="https://images.unsplash.com/photo-1493676304819-0d7a8d026dcf?w=1600&q=80" alt="" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", opacity: .35 }} />}
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom,rgba(5,4,3,.65) 0%,rgba(5,4,3,.2) 40%,rgba(5,4,3,.95) 100%)" }} />
      <div style={{ position: "relative", zIndex: 2, height: isMobile ? "auto" : "100%", display: "flex", flexDirection: "column", justifyContent: "flex-end", padding: isMobile ? "24px 6%" : "5% 7%" }}>
        <motion.div key={animKey} initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
            <div style={{ width: 36, height: 2, background: "#5A7ABD" }} /><span style={{ fontSize: 9, color: "#5A7ABD", letterSpacing: "0.25em", textTransform: "uppercase", fontWeight: 700 }}>Entertainment</span>
          </div>
          <h2 style={{ fontFamily: "var(--display)", fontSize: "clamp(40px,8vw,100px)", color: "#fff", lineHeight: .88, textTransform: "uppercase", marginBottom: 18 }}>Beyond Shopping</h2>
          <div style={{ display: "flex", gap: 2, marginBottom: 8 }}>
            {atts.map((att, i) => (
              <motion.button key={att.title} data-mag onClick={() => setActiveAtt(i)}
                style={{ flex: 1, padding: isMobile ? "10px 6px" : "12px 8px", background: activeAtt === i ? "rgba(5,4,3,.88)" : "rgba(5,4,3,.52)", backdropFilter: "blur(20px)", borderTop: `2px solid ${activeAtt === i ? att.color : "rgba(255,255,255,.1)"}`, border: "none", cursor: "pointer", transition: "all .25s", textAlign: "left" }}>
                <div style={{ color: activeAtt === i ? att.color : "rgba(255,255,255,.3)", marginBottom: 4, transition: "color .2s" }}>{att.icon}</div>
                <div style={{ fontSize: 8, fontWeight: 700, color: activeAtt === i ? "#fff" : "rgba(255,255,255,.38)", letterSpacing: "0.04em", transition: "color .2s" }}>{att.title.split(" ")[0]}</div>
              </motion.button>
            ))}
          </div>
          <AnimatePresence mode="wait">
            <motion.div key={activeAtt} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
              style={{ padding: "14px 16px", background: "rgba(5,4,3,.82)", backdropFilter: "blur(20px)", border: `1px solid ${a.color}30`, borderRadius: "0 0 4px 4px", display: "flex", alignItems: "center", gap: 14, flexWrap: "wrap" }}>
              <div style={{ flex: 1, minWidth: 160 }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: "#fff", marginBottom: 3 }}>{a.title}</div>
                <div style={{ fontSize: 10, color: "rgba(255,255,255,.45)", lineHeight: 1.5 }}>{a.sub}</div>
              </div>
              <div style={{ textAlign: "right", flexShrink: 0 }}>
                <div style={{ fontFamily: "var(--display)", fontSize: 28, color: a.color, lineHeight: 1 }}>{a.stat}</div>
                <div style={{ fontSize: 8, color: "rgba(255,255,255,.3)", textTransform: "uppercase" }}>{a.statLabel}</div>
              </div>
              <button data-mag onClick={openContact} style={{ padding: "7px 12px", background: a.color, border: "none", borderRadius: 3, color: "#000", fontSize: 9, fontWeight: 800, cursor: "pointer", flexShrink: 0 }}>Partner →</button>
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
}

function SlideEvents({ animKey, openContact, persona, isMobile }) {
  const events = [
    { brand: "Nike", event: "Air Max Day Activation", year: "2024", att: "12,000+" },
    { brand: "Samsung", event: "Galaxy Launch Event", year: "2024", att: "8,500+" },
    { brand: "Disney", event: "Wish Premiere Experience", year: "2023", att: "22,000+" },
    { brand: "Taylor Swift", event: "Eras Tour Pop-Up", year: "2023", att: "40,000+" },
    { brand: "NFL", event: "Super Bowl Week Hub", year: "2022", att: "50,000+" },
    { brand: "Porsche", event: "Taycan World Launch", year: "2022", att: "6,000+" },
  ];
  return (
    <div style={{ position: "relative", width: "100%", height: "100%", overflow: isMobile ? "auto" : "hidden", display: isMobile ? "block" : "grid", gridTemplateColumns: "1fr 1fr" }}>
      <video autoPlay muted loop playsInline style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", opacity: .22, filter: "saturate(.6)" }}><source src={HERO_VID} type="video/mp4" /></video>
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg,rgba(10,5,16,.97) 0%,rgba(5,3,8,.92) 100%)" }} />
      <div style={{ position: "relative", zIndex: 2, display: "flex", flexDirection: "column", justifyContent: "center", padding: isMobile ? "24px 6%" : "0 6% 0 7%", borderRight: isMobile ? "none" : "1px solid rgba(255,255,255,.05)" }}>
        <motion.div key={animKey} initial={{ opacity: 0, x: -18 }} animate={{ opacity: 1, x: 0 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
            <div style={{ width: 36, height: 2, background: "#8B6BA8" }} /><span style={{ fontSize: 9, color: "#8B6BA8", letterSpacing: "0.25em", textTransform: "uppercase", fontWeight: 700 }}>Events & Activations</span>
          </div>
          <h2 style={{ fontFamily: "var(--display)", fontSize: "clamp(30px,5vw,66px)", color: "#fff", lineHeight: .88, textTransform: "uppercase", marginBottom: 14 }}>
            The World's Best Brands Trust <span style={{ color: "#8B6BA8" }}>This Stage</span>
          </h2>
          <p style={{ fontSize: 11, color: "rgba(255,255,255,.38)", lineHeight: 1.7, marginBottom: 16 }}>365+ events annually. Up to 50,000 guests. Imagine what {persona.brand} could do here.</p>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 6, marginBottom: 16 }}>
            {[["365+", "Events/Year"], ["50K", "Max Capacity"], ["200K sqft", "Event Space"], ["24/7", "Support"]].map(([v, l]) => (
              <div key={l} style={{ padding: "9px 10px", background: "rgba(139,107,168,.1)", border: "1px solid rgba(139,107,168,.22)", borderRadius: 3 }}>
                <div style={{ fontFamily: "var(--display)", fontSize: "clamp(16px,2.5vw,30px)", color: "#8B6BA8", lineHeight: 1, marginBottom: 2 }}>{v}</div>
                <div style={{ fontSize: 7, color: "rgba(255,255,255,.3)", textTransform: "uppercase", letterSpacing: "0.07em" }}>{l}</div>
              </div>
            ))}
          </div>
          <GoldButton onClick={openContact}>Plan {persona.brand}'s Event <ArrowRight size={12} /></GoldButton>
        </motion.div>
      </div>
      <div style={{ position: "relative", zIndex: 2, display: "flex", flexDirection: "column", justifyContent: "center", padding: isMobile ? "0 6% 24px" : "0 7% 0 5%" }}>
        <div style={{ fontSize: 8, fontWeight: 700, color: "rgba(255,255,255,.25)", letterSpacing: "0.14em", textTransform: "uppercase", marginBottom: 10 }}>Past Activations</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 1 }}>
          {events.map((e, i) => (
            <motion.div key={e.brand} initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: .18 + i * .07 }}
              style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 12px", background: "rgba(255,255,255,.03)", borderLeft: `2px solid rgba(139,107,168,${.45 - i * .05})`, transition: "all .2s" }}
              onMouseEnter={el => el.currentTarget.style.background = "rgba(139,107,168,.08)"}
              onMouseLeave={el => el.currentTarget.style.background = "rgba(255,255,255,.03)"}>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 11, fontWeight: 700, color: "#fff" }}>{e.brand}</div>
                <div style={{ fontSize: 8, color: "rgba(255,255,255,.3)" }}>{e.event}</div>
              </div>
              <div style={{ textAlign: "right" }}>
                <div style={{ fontSize: 11, color: "#8B6BA8", fontWeight: 700, fontFamily: "var(--mono)" }}>{e.att}</div>
                <div style={{ fontSize: 7, color: "rgba(255,255,255,.2)" }}>{e.year}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

function SlideSponsor({ animKey, openContact, persona, isMobile }) {
  const [activeTier, setActiveTier] = useState(1);
  const tiers = [
    { tier: "Title Partner", price: "$5M+/yr", color: GOLD, perks: ["Naming rights on major venue", "All activation zones", "Exclusive category rights", "Media value $15M+", "VIP hospitality suite"] },
    { tier: "Premier Partner", price: "$1M–$5M/yr", color: "#C0C8D0", perks: ["Category exclusivity", "Digital + physical branding", "10+ activation days/yr", "Co-branded campaigns", "Custom analytics dashboard"] },
    { tier: "Associate", price: "$250K–$1M/yr", color: "#C47B1A", perks: ["Branded zones", "5 activation days/yr", "Social media features", "Email: 1×/yr"] },
  ];
  const t = tiers[activeTier];
  return (
    <div style={{ position: "relative", width: "100%", height: "100%", background: "#060504", overflow: isMobile ? "auto" : "hidden", display: isMobile ? "block" : "grid", gridTemplateColumns: "1fr 1fr" }}>
      <video autoPlay muted loop playsInline style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", opacity: .07, filter: "grayscale(1) sepia(.3)", zIndex: 0 }}><source src={HERO_VID} type="video/mp4" /></video>
      <div style={{ position: "absolute", inset: 0, backgroundImage: `radial-gradient(circle at 25% 50%,rgba(212,168,67,.05) 0%,transparent 55%),radial-gradient(circle at 75% 50%,rgba(74,154,122,.03) 0%,transparent 55%)` }} />
      <div style={{ position: "relative", zIndex: 2, display: "flex", flexDirection: "column", justifyContent: "center", padding: isMobile ? "24px 6%" : "0 5% 0 7%", borderRight: isMobile ? "none" : "1px solid rgba(255,255,255,.06)" }}>
        <motion.div key={animKey} initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
            <div style={{ width: 36, height: 2, background: "#4A9A7A" }} /><span style={{ fontSize: 9, color: "#4A9A7A", letterSpacing: "0.25em", textTransform: "uppercase", fontWeight: 700 }}>Sponsorship</span>
          </div>
          <h2 style={{ fontFamily: "var(--display)", fontSize: "clamp(30px,5vw,68px)", color: "#fff", lineHeight: .88, textTransform: "uppercase", marginBottom: 18 }}>
            Partner With <span className="shimmer-gold">40 Million</span> People
          </h2>
          <div style={{ display: "flex", flexDirection: "column", gap: 5, marginBottom: 16 }}>
            {tiers.map((ti, i) => (
              <button key={ti.tier} data-mag onClick={() => setActiveTier(i)} style={{ display: "flex", alignItems: "center", gap: 12, padding: "11px 14px", borderRadius: 4, background: activeTier === i ? `${ti.color}14` : "rgba(255,255,255,.04)", border: `1px solid ${activeTier === i ? ti.color + "44" : "rgba(255,255,255,.08)"}`, borderLeft: `3px solid ${activeTier === i ? ti.color : "transparent"}`, cursor: "pointer", transition: "all .2s", textAlign: "left" }}>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 12, fontWeight: 700, color: activeTier === i ? "#fff" : "rgba(255,255,255,.45)" }}>{ti.tier}</div>
                  <div style={{ fontSize: 9, color: ti.color, fontFamily: "var(--mono)", opacity: activeTier === i ? 1 : .5 }}>{ti.price}</div>
                </div>
                {activeTier === i && <div style={{ width: 6, height: 6, borderRadius: "50%", background: ti.color }} />}
              </button>
            ))}
          </div>
          <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
            {[["300+", "Screens"], ["2.8M", "Social"], ["1.1M", "Email"], ["500M+", "Impressions"]].map(([v, l]) => (
              <div key={l} style={{ flex: "1 1 60px", padding: "7px 6px", background: "rgba(255,255,255,.04)", borderRadius: 3, textAlign: "center" }}>
                <div style={{ fontFamily: "var(--mono)", fontSize: "clamp(10px,1.4vw,14px)", color: GOLD }}>{v}</div>
                <div style={{ fontSize: 7, color: "rgba(255,255,255,.28)", textTransform: "uppercase", marginTop: 2 }}>{l}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
      <div style={{ position: "relative", zIndex: 2, display: "flex", flexDirection: "column", justifyContent: "center", padding: isMobile ? "0 6% 24px" : "0 7% 0 5%" }}>
        <AnimatePresence mode="wait">
          <motion.div key={activeTier} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
            style={{ padding: "22px 20px", background: "rgba(255,255,255,.04)", border: `1px solid ${t.color}30`, borderTop: `3px solid ${t.color}`, borderRadius: 4 }}>
            <div style={{ fontFamily: "var(--display)", fontSize: 24, color: t.color, marginBottom: 4 }}>{t.tier}</div>
            <div style={{ fontFamily: "var(--mono)", fontSize: 11, color: "rgba(255,255,255,.35)", marginBottom: 16 }}>{t.price}</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 6, marginBottom: 18 }}>
              {t.perks.map(p => (<div key={p} style={{ display: "flex", gap: 8, fontSize: 11, color: "rgba(255,255,255,.55)", alignItems: "flex-start" }}><span style={{ color: t.color, flexShrink: 0, marginTop: 2 }}>✦</span>{p}</div>))}
            </div>
            <button data-mag onClick={openContact} style={{ width: "100%", padding: "10px 0", background: t.color, border: "none", borderRadius: 3, color: "#000", fontSize: 10, fontWeight: 800, cursor: "pointer", letterSpacing: "0.09em", textTransform: "uppercase" }}>
              Get {persona.brand}'s Proposal →
            </button>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}


function SlideMomentMap({ animKey, openContact, persona, goTo, idx, isMobile }) {
  const [zone, setZone] = useState(null);
  const zones = [
    { id: "north", label: "North Garden", x: 200, y: 60, r: 36, color: GOLD, type: "Fashion & Lifestyle", visitors: "12M/yr", desc: "The highest per-sq-ft revenue corridor in MOA. 180 premium storefronts anchored by aspirational fashion and lifestyle brands." },
    { id: "west", label: "West Market", x: 62, y: 200, r: 36, color: "#7EC9A0", type: "Entertainment Hub", visitors: "14M/yr", desc: "Home to Nickelodeon Universe and SEA LIFE Aquarium. Highest-traffic zone by dwell time — family-first, highest spend-per-visit." },
    { id: "east", label: "East Broadway", x: 338, y: 200, r: 36, color: "#9B7FD4", type: "Luxury Wing", visitors: "6M/yr", desc: "MOA's luxury corridor. Rolex. Louis Vuitton. Hermès. 100+ curated luxury tenants serving the most affluent segment." },
    { id: "south", label: "South Avenue", x: 200, y: 338, r: 36, color: "#E8630A", type: "Dining & Retail", visitors: "8M/yr", desc: "MOA's largest dining concentration. Dwell-time leader driven by F&B foot traffic. The perfect co-marketing environment." },
    { id: "center", label: "Central Atrium", x: 200, y: 200, r: 50, color: "#C9A84C", type: "Event Epicenter", visitors: "All 40M", desc: "The Grand Rotunda. 50,000-person capacity. Every visitor passes through — the most visible activation zone in North America." },
  ];
  const az = zones.find(z => z.id === zone);

  return (
    <div style={{ position: "relative", width: "100%", height: "100%", background: "#060504", overflow: isMobile ? "auto" : "hidden", display: isMobile ? "block" : "grid", gridTemplateColumns: "1fr 1fr" }}>
      <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at 25% 50%,rgba(212,168,67,.06) 0%,transparent 55%)" }} />

      <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", position: "relative", zIndex: 2, borderRight: isMobile ? "none" : "1px solid rgba(255,255,255,.06)", borderBottom: isMobile ? "1px solid rgba(255,255,255,.06)" : "none", padding: isMobile ? "24px 6%" : "3% 5%" }}>
        <div style={{ position: "absolute", top: 12, left: 12, display: "flex", alignItems: "center", gap: 6, padding: "4px 10px", background: `rgba(212,168,67,.1)`, border: `1px solid ${GOLD}40`, borderRadius: 2, zIndex: 2 }}>
          <Star size={10} style={{ color: GOLD }} />
          <span style={{ fontSize: 7, color: GOLD, letterSpacing: "0.18em", textTransform: "uppercase", fontWeight: 700 }}>I Need to Be Here · 1/3</span>
        </div>
        <motion.div key={animKey} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} style={{ width: "100%", maxWidth: 400, marginTop: isMobile ? 32 : 0 }}>
          <h2 style={{ fontFamily: "var(--display)", fontSize: "clamp(26px,4vw,52px)", color: "#fff", lineHeight: .9, textTransform: "uppercase", marginBottom: 6 }}>
            Your Zone.<br /><span className="shimmer-gold">Your Audience.</span>
          </h2>
          <p style={{ fontSize: 10, color: "rgba(255,255,255,.35)", marginBottom: 16 }}>Click any zone to see where {persona.brand} fits best.</p>
          <svg viewBox="0 0 400 400" style={{ width: "100%", height: "auto" }}>
            <defs>
              <pattern id="g3" width="20" height="20" patternUnits="userSpaceOnUse"><path d="M20 0L0 0 0 20" fill="none" stroke={`${GOLD}08`} strokeWidth=".5" /></pattern>
              <filter id="glow3"><feGaussianBlur stdDeviation="5" result="b" /><feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge></filter>
            </defs>
            <rect width="400" height="400" fill="url(#g3)" />
            <rect x="22" y="22" width="356" height="356" rx="14" fill="rgba(255,255,255,.02)" stroke={`${GOLD}18`} strokeWidth="1.5" />
            <rect x="177" y="22" width="46" height="356" fill="rgba(255,255,255,.015)" stroke="rgba(255,255,255,.03)" strokeWidth=".5" />
            <rect x="22" y="177" width="356" height="46" fill="rgba(255,255,255,.015)" stroke="rgba(255,255,255,.03)" strokeWidth=".5" />
            {[["N", 200, 12], ["S", 200, 396], ["E", 396, 200], ["W", 6, 200]].map(([d, x, y]) => (
              <text key={d} x={x} y={y} textAnchor="middle" dominantBaseline="middle" fill={`${GOLD}35`} fontSize="8" fontFamily="var(--mono)">{d}</text>
            ))}
            {zones.map(z => (
              <g key={z.id} onClick={() => setZone(z.id === zone ? null : z.id)} style={{ cursor: "pointer" }}>
                {zone === z.id && (<circle cx={z.x} cy={z.y} r={z.r + 18} fill="none" stroke={z.color} strokeWidth=".8" filter="url(#glow3)"><animate attributeName="r" values={`${z.r + 10};${z.r + 24};${z.r + 10}`} dur="2.2s" repeatCount="indefinite" /><animate attributeName="opacity" values=".5;0;.5" dur="2.2s" repeatCount="indefinite" /></circle>)}
                <circle cx={z.x} cy={z.y} r={z.r} fill={zone === z.id ? z.color + "25" : z.color + "0c"} stroke={zone === z.id ? z.color : z.color + "50"} strokeWidth={zone === z.id ? 2 : 1} style={{ transition: "all .3s", filter: zone === z.id ? `drop-shadow(0 0 12px ${z.color}60)` : "" }} />
                <text x={z.x} y={z.y} textAnchor="middle" dominantBaseline="middle" fill={zone === z.id ? z.color : z.color + "85"} fontSize={z.id === "center" ? 7.5 : 6.5} fontWeight="700" fontFamily="var(--mono)" style={{ pointerEvents: "none" }}>{z.id === "center" ? "ATRIUM" : z.id.toUpperCase()}</text>
              </g>
            ))}
          </svg>
          <p style={{ fontSize: 7, color: "rgba(255,255,255,.16)", letterSpacing: "0.14em", textTransform: "uppercase", marginTop: 8, textAlign: "center" }}>Click any zone to explore</p>
        </motion.div>
      </div>

      <div style={{ position: "relative", zIndex: 2, display: "flex", flexDirection: "column", justifyContent: "center", padding: isMobile ? "20px 6% 24px" : "3% 6% 3% 5%" }}>
        <div style={{ position: "absolute", top: 12, right: 12, display: "flex", alignItems: "center", gap: 5 }}>
          <span style={{ fontSize: 7, color: "rgba(255,255,255,.25)", letterSpacing: "0.1em" }}>Next: ROI</span>
          <button data-mag onClick={() => goTo(idx + 1)} style={{ width: 26, height: 26, borderRadius: 3, background: "rgba(255,255,255,.06)", border: "1px solid rgba(255,255,255,.1)", display: "flex", alignItems: "center", justifyContent: "center", color: "rgba(255,255,255,.5)", cursor: "pointer" }}><ChevronRight size={12} /></button>
        </div>
        <AnimatePresence mode="wait">
          {!az ? (
            <motion.div key="list" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <h3 style={{ fontFamily: "var(--display)", fontSize: "clamp(24px,3.5vw,48px)", color: "#fff", lineHeight: .9, textTransform: "uppercase", marginBottom: 12 }}>5.6M Sq Ft.<br />5 Zones.<br /><span className="shimmer-gold">One Decision.</span></h3>
              <p style={{ fontSize: 11, color: "rgba(255,255,255,.38)", marginBottom: 14, lineHeight: 1.6 }}>Select a zone to see where {persona.brand} fits best.</p>
              <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                {zones.map(z => (
                  <button key={z.id} data-mag onClick={() => setZone(z.id)}
                    style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 12px", marginBottom: 0, background: "rgba(255,255,255,.04)", border: `1px solid ${z.color}18`, borderLeft: `3px solid ${z.color}`, borderRadius: 3, cursor: "pointer", textAlign: "left", transition: "all .2s" }}
                    onMouseEnter={e => { e.currentTarget.style.background = `${z.color}0d`; }}
                    onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,.04)"; }}>
                    <div style={{ width: 8, height: 8, borderRadius: "50%", background: z.color, flexShrink: 0 }} />
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 11, fontWeight: 700, color: "#fff" }}>{z.label}</div>
                      <div style={{ fontSize: 8, color: "rgba(255,255,255,.28)" }}>{z.type}</div>
                    </div>
                    <div style={{ fontFamily: "var(--mono)", fontSize: 10, color: z.color }}>{z.visitors}</div>
                    <ArrowRight size={10} style={{ color: "rgba(255,255,255,.2)" }} />
                  </button>
                ))}
              </div>
            </motion.div>
          ) : (
            <motion.div key={az.id} initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }}>
              <button onClick={() => setZone(null)} style={{ display: "flex", alignItems: "center", gap: 5, background: "none", border: "none", color: "rgba(255,255,255,.3)", cursor: "pointer", fontSize: 8, marginBottom: 14, letterSpacing: "0.07em", textTransform: "uppercase" }}><ChevronLeft size={10} /> All Zones</button>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
                <div style={{ width: 12, height: 12, borderRadius: "50%", background: az.color, boxShadow: `0 0 18px ${az.color}90` }} />
                <h3 style={{ fontFamily: "var(--display)", fontSize: "clamp(24px,4vw,52px)", color: "#fff", lineHeight: .92, textTransform: "uppercase" }}>{az.label}</h3>
              </div>
              <div style={{ display: "inline-flex", padding: "3px 10px", marginBottom: 14, background: `${az.color}15`, border: `1px solid ${az.color}40`, borderRadius: 2 }}>
                <span style={{ fontSize: 8, color: az.color, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase" }}>{az.type}</span>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 7, marginBottom: 14 }}>
                {[["Annual Traffic", az.visitors], ["Zone Type", az.type]].map(([k, v]) => (
                  <div key={k} style={{ padding: "10px 12px", background: `${az.color}0f`, border: `1px solid ${az.color}28`, borderRadius: 3 }}>
                    <div style={{ fontSize: 7, color: az.color, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 4 }}>{k}</div>
                    <div style={{ fontSize: 11, fontWeight: 700, color: "#fff", fontFamily: "var(--mono)" }}>{v}</div>
                  </div>
                ))}
              </div>
              <p style={{ fontSize: 11, color: "rgba(255,255,255,.45)", lineHeight: 1.75, marginBottom: 16 }}>{az.desc}</p>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                <GoldButton onClick={() => goTo(idx + 1)} outline>Model ROI <ArrowRight size={12} /></GoldButton>
                <GoldButton onClick={openContact}>Inquire Now <ArrowRight size={12} /></GoldButton>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}


function SlideMomentROI({ animKey, openContact, persona, goTo, idx, isMobile }) {
  const [roiType, setRoiType] = useState("sponsorship");
  const [inv, setInv] = useState(500000);
  const [dur, setDur] = useState(6);
  const mults = {
    sponsorship: { roi: 3.2, reach: 18e6, pr: 2.4, label: "Sponsorship" },
    retail: { roi: 4.1, reach: 12e6, pr: 1.8, label: "Retail Lease" },
    events: { roi: 5.8, reach: 25e3, pr: 3.2, label: "Event Hosting" },
    popup: { roi: 2.9, reach: 8e5, pr: 1.5, label: "Pop-Up" }
  };
  const m = mults[roiType];
  const ret = Math.round(inv * m.roi);
  const reach = Math.round(m.reach * (dur / 12) * (inv / 5e5));
  const pr = Math.round(inv * m.pr);
  const fmt = n => n >= 1e9 ? `$${(n / 1e9).toFixed(1)}B` : n >= 1e6 ? `$${(n / 1e6).toFixed(1)}M` : n >= 1e3 ? `$${Math.round(n / 1e3)}K` : `$${n}`;
  const fmtN = n => n >= 1e6 ? `${(n / 1e6).toFixed(1)}M` : n >= 1e3 ? `${Math.round(n / 1e3)}K` : `${n}`;

  return (
    <div style={{ position: "relative", width: "100%", height: "100%", background: "#060504", overflow: isMobile ? "auto" : "hidden", display: isMobile ? "block" : "grid", gridTemplateColumns: "1fr 1.1fr" }}>
      <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at 70% 50%,rgba(212,168,67,.07) 0%,transparent 55%)" }} />
      <div style={{ position: "relative", zIndex: 2, display: "flex", flexDirection: "column", justifyContent: "center", padding: isMobile ? "24px 6%" : "0 6% 0 7%", borderRight: isMobile ? "none" : "1px solid rgba(255,255,255,.06)" }}>
        <div style={{ position: "absolute", top: 12, left: 12, display: "flex", alignItems: "center", gap: 6, padding: "4px 10px", background: `rgba(212,168,67,.1)`, border: `1px solid ${GOLD}40`, borderRadius: 2 }}>
          <Star size={10} style={{ color: GOLD }} />
          <span style={{ fontSize: 7, color: GOLD, letterSpacing: "0.18em", textTransform: "uppercase", fontWeight: 700 }}>I Need to Be Here · 2/3</span>
        </div>
        <motion.div key={animKey} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} style={{ marginTop: isMobile ? 32 : 0 }}>
          <h2 style={{ fontFamily: "var(--display)", fontSize: "clamp(28px,4.2vw,58px)", color: "#fff", lineHeight: .9, textTransform: "uppercase", marginBottom: 8 }}>
            Model {persona.brand}'s <span className="shimmer-gold">Return.</span>
          </h2>
          <p style={{ fontSize: 10, color: "rgba(255,255,255,.35)", marginBottom: 20, lineHeight: 1.6 }}>Move the sliders. Watch your return update in real time.</p>
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <div>
              <div style={{ fontSize: 8, color: GOLD, letterSpacing: "0.2em", textTransform: "uppercase", fontWeight: 700, marginBottom: 8 }}>Partnership Type</div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 5 }}>
                {Object.entries(mults).map(([k, v]) => (
                  <button key={k} data-mag onClick={() => setRoiType(k)} style={{ padding: "9px 8px", borderRadius: 3, fontSize: "clamp(9px,1.5vw,10px)", fontWeight: 700, background: roiType === k ? GOLD : "rgba(255,255,255,.05)", color: roiType === k ? "#000" : "rgba(255,255,255,.45)", border: `1px solid ${roiType === k ? GOLD : "rgba(255,255,255,.08)"}`, cursor: "pointer", transition: "all .2s" }}>{v.label}</button>
                ))}
              </div>
            </div>
            <div>
              <div style={{ fontSize: 8, color: "rgba(255,255,255,.38)", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 8 }}>
                Investment <span style={{ color: GOLD, fontFamily: "var(--mono)", fontSize: 13 }}>{fmt(inv)}</span>
              </div>
              <input type="range" min={50000} max={5000000} step={50000} value={inv} onChange={e => setInv(+e.target.value)} style={{ width: "100%" }} />
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 7.5, color: "rgba(255,255,255,.18)", marginTop: 4 }}><span>$50K</span><span>$5M</span></div>
            </div>
            <div>
              <div style={{ fontSize: 8, color: "rgba(255,255,255,.38)", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 8 }}>
                Duration <span style={{ color: GOLD, fontFamily: "var(--mono)", fontSize: 13 }}>{dur} months</span>
              </div>
              <input type="range" min={1} max={24} step={1} value={dur} onChange={e => setDur(+e.target.value)} style={{ width: "100%" }} />
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 7.5, color: "rgba(255,255,255,.18)", marginTop: 4 }}><span>1 mo</span><span>24 mo</span></div>
            </div>
          </div>
        </motion.div>
      </div>
      <div style={{ position: "relative", zIndex: 2, display: "flex", flexDirection: "column", justifyContent: "center", padding: isMobile ? "0 6% 24px" : "0 7% 0 5%" }}>
        <div style={{ position: "absolute", top: 12, right: 12, display: "flex", alignItems: "center", gap: 5 }}>
          <span style={{ fontSize: 7, color: "rgba(255,255,255,.25)", letterSpacing: "0.1em" }}>Next: Why It Works</span>
          <button data-mag onClick={() => goTo(idx + 1)} style={{ width: 26, height: 26, borderRadius: 3, background: "rgba(255,255,255,.06)", border: "1px solid rgba(255,255,255,.1)", display: "flex", alignItems: "center", justifyContent: "center", color: "rgba(255,255,255,.5)", cursor: "pointer" }}><ChevronRight size={12} /></button>
        </div>
        <motion.div key={ret + roiType} initial={{ scale: .94, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: .35 }}
          style={{ padding: "22px 20px", borderRadius: 4, background: `linear-gradient(135deg,${GOLD}14,${GOLD2}08)`, border: `1px solid ${GOLD}28`, textAlign: "center", marginBottom: 10, marginTop: isMobile ? 32 : 0 }}>
          <div style={{ fontSize: 7, color: GOLD, letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 8 }}>Estimated Total Return for {persona.brand}</div>
          <div style={{ fontFamily: "var(--display)", fontSize: "clamp(44px,7vw,88px)", color: GOLD, lineHeight: 1, marginBottom: 5 }}>{fmt(ret)}</div>
          <div style={{ fontSize: 10, color: "rgba(255,255,255,.32)" }}>{m.roi.toFixed(1)}× on {fmt(inv)} · {dur} months</div>
        </motion.div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 6, marginBottom: 12 }}>
          {[{ l: "Est. Reach", v: fmtN(reach) + " people", c: "#5A7ABD" }, { l: "PR Value", v: fmt(pr), c: "#7EC9A0" }, { l: "Impressions", v: fmtN(reach * 3), c: "#9B7FD4" }, { l: "ROI", v: `${m.roi.toFixed(1)}×`, c: GOLD }].map(item => (
            <motion.div key={item.l} initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ padding: "10px 12px", borderRadius: 4, background: "rgba(255,255,255,.04)", border: `1px solid ${item.c}1e` }}>
              <div style={{ fontSize: 7, color: item.c, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 3 }}>{item.l}</div>
              <div style={{ fontFamily: "var(--mono)", fontSize: "clamp(12px,1.8vw,20px)", fontWeight: 500, color: "#fff" }}>{item.v}</div>
            </motion.div>
          ))}
        </div>
        <GoldButton large onClick={openContact} style={{ justifyContent: "center" }}>Get {persona.brand}'s Custom Proposal <ArrowRight size={14} /></GoldButton>
      </div>
    </div>
  );
}

function SlideMomentWhy({ animKey, openContact, persona, isMobile }) {
  return (
    <div style={{ position: "relative", width: "100%", height: "100%", background: "#060504", overflow: isMobile ? "auto" : "hidden" }}>
      <video autoPlay muted loop playsInline style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", opacity: .12, filter: "grayscale(1)" }}><source src={HERO_VID} type="video/mp4" /></video>
      <div style={{ position: "absolute", inset: 0, background: "rgba(6,5,4,.88)" }} />
      <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at 50% 40%,rgba(212,168,67,.07) 0%,transparent 60%)" }} />
      <div style={{ position: "relative", zIndex: 2, height: isMobile ? "auto" : "100%", display: "flex", flexDirection: "column", justifyContent: "center", padding: isMobile ? "48px 6% 24px" : "0 6%" }}>
        <div style={{ position: "absolute", top: 12, left: 12, display: "flex", alignItems: "center", gap: 6, padding: "4px 10px", background: `rgba(212,168,67,.1)`, border: `1px solid ${GOLD}40`, borderRadius: 2 }}>
          <Star size={10} style={{ color: GOLD }} />
          <span style={{ fontSize: 7, color: GOLD, letterSpacing: "0.18em", textTransform: "uppercase", fontWeight: 700 }}>I Need to Be Here · 3/3</span>
        </div>
        <motion.div key={animKey} initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
            <div style={{ width: 36, height: 2, background: GOLD }} />
            <span style={{ fontSize: 8, color: GOLD, letterSpacing: "0.25em", textTransform: "uppercase", fontWeight: 700 }}>Why This Creates the Reaction</span>
          </div>
          <h2 style={{ fontFamily: "var(--display)", fontSize: "clamp(32px,5.5vw,76px)", color: "#fff", lineHeight: .88, textTransform: "uppercase", marginBottom: 20 }}>
            The Moment<br />{persona.brand}<br /><span className="shimmer-gold">Says Yes.</span>
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1.2fr 1fr 1fr", gap: 10, marginBottom: 16 }}>
            <div style={{ padding: "18px 16px", borderRadius: 4, background: `${GOLD}0e`, border: `1px solid ${GOLD}24` }}>
              <Star size={14} style={{ color: GOLD, marginBottom: 10 }} />
              <h3 style={{ fontFamily: "var(--display)", fontSize: 18, color: "#fff", marginBottom: 8, lineHeight: 1, textTransform: "uppercase" }}>Why It Works</h3>
              <p style={{ fontSize: 11, color: "rgba(255,255,255,.5)", lineHeight: 1.8 }}>
                You moved the slider to your number. The return updated in real time. In that moment, the question stopped being <em style={{ color: "rgba(255,255,255,.75)" }}>"can we afford this?"</em> and became <em style={{ color: GOLD, fontStyle: "normal", fontWeight: 700 }}>"how soon can we start?"</em>
                <br /><br />
                The zone map made it spatial — <em style={{ color: "rgba(255,255,255,.75)" }}>your floor, your activation</em>. The calculator made it financial. MOA isn't an opportunity anymore. It's <span style={{ color: GOLD, fontWeight: 700 }}>{persona.brand}'s stage.</span>
              </p>
            </div>
            {[
              { i: <BarChart2 size={12} />, t: "Real Numbers", b: `Every figure is indexed to MOA's verified 2024 partner data. When ${persona.brand} sees the return, that's what partners actually achieved.` },
              { i: <Heart size={12} />, t: "From Interest to Urgency", b: `When return exceeds investment, the conversation changes. Our leasing team is ready — space in the right zones doesn't stay open long.` },
            ].map((item, i) => (
              <div key={item.t} style={{ padding: "16px 14px", borderRadius: 4, background: "rgba(255,255,255,.04)", border: "1px solid rgba(255,255,255,.07)", display: "flex", flexDirection: "column", gap: 8 }}>
                <div style={{ color: GOLD }}>{item.i}</div>
                <div style={{ fontSize: 12, fontWeight: 700, color: "#fff" }}>{item.t}</div>
                <div style={{ fontSize: 11, color: "rgba(255,255,255,.4)", lineHeight: 1.65 }}>{item.b}</div>
              </div>
            ))}
          </div>
          <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(3,1fr)", gap: 10 }}>
            {[
              { brand: "Nike", quote: "The activation reached 12,000 people in a single weekend. Nothing matched that density.", role: "VP Brand Partnerships" },
              { brand: "Samsung", quote: "MOA gave us a launch platform that generated more earned media than our entire paid campaign.", role: "Director, Experiential" },
              { brand: "Grand Hyatt", quote: "The sponsorship drove measurable bookings from out-of-state visitors within 30 days.", role: "Director of Marketing" },
            ].map(t => (
              <div key={t.brand} style={{ paddingLeft: 12, borderLeft: `2px solid ${GOLD}40` }}>
                <div style={{ fontSize: 10, color: "rgba(255,255,255,.5)", lineHeight: 1.7, fontStyle: "italic", marginBottom: 4 }}>"{t.quote}"</div>
                <div style={{ fontSize: 9, color: GOLD, fontWeight: 700 }}>{t.brand}</div>
                <div style={{ fontSize: 7, color: "rgba(255,255,255,.25)" }}>{t.role}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}

/* ── CONTACT ── */
function SlideContact({ animKey, openContact, persona, isMobile }) {
  const [err, setErr] = useState(false);
  return (
    <div style={{ position: "relative", width: "100%", height: "100%", overflow: "hidden" }}>
      {!err ? <video autoPlay muted loop playsInline onError={() => setErr(true)} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}><source src={HERO_VID} type="video/mp4" /></video>
        : <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at 50% 50%,#1a1005,#050403 70%)" }} />}
      <div style={{ position: "absolute", inset: 0, background: "rgba(5,4,3,0.76)" }} />
      <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at 50% 60%,rgba(212,168,67,0.08) 0%,transparent 60%)" }} />
      <div style={{ position: "absolute", inset: 0, opacity: .025, backgroundImage: `linear-gradient(${GOLD} 1px,transparent 1px),linear-gradient(90deg,${GOLD} 1px,transparent 1px)`, backgroundSize: "90px 90px" }} />
      <div style={{ position: "relative", zIndex: 2, height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", padding: isMobile ? "0 8%" : "0 12%" }}>
        <motion.div key={animKey} initial={{ opacity: 0, y: 32 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .9, ease: [.16, 1, .3, 1] }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 18, justifyContent: "center" }}>
            <div style={{ width: 28, height: 1.5, background: `linear-gradient(to right,transparent,${GOLD})` }} />
            <span style={{ fontSize: 8, color: GOLD, letterSpacing: "0.28em", textTransform: "uppercase", fontWeight: 700 }}>The Next Step</span>
            <div style={{ width: 28, height: 1.5, background: `linear-gradient(to left,transparent,${GOLD})` }} />
          </div>
          <h2 style={{ fontFamily: "var(--display)", fontSize: "clamp(44px,10vw,128px)", color: "#fff", lineHeight: .88, textTransform: "uppercase", marginBottom: 24, letterSpacing: "0.01em" }}>
            <span className="shimmer-gold">{persona.brand}.</span><br />40 Million<br />People.<br />One Call.
          </h2>
          <p style={{ fontSize: "clamp(12px,1.5vw,16px)", color: "rgba(255,255,255,.42)", lineHeight: 1.7, marginBottom: 28, maxWidth: 420, margin: "0 auto 28px" }}>
            Your category. Your zone. Your audience. Let's make it real.
          </p>
          <GoldButton large onClick={openContact} style={{ justifyContent: "center", padding: "14px 32px", fontSize: 12 }}>
            Start the Conversation <ArrowRight size={16} />
          </GoldButton>
          <div style={{ marginTop: 18, display: "flex", alignItems: "center", gap: 6, justifyContent: "center" }}>
            <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#4ade80", animation: "pulse 2s infinite" }} />
            <span style={{ fontSize: 8, color: "rgba(255,255,255,.22)", letterSpacing: "0.06em" }}>Response within 24 hours · partnerships@mallofamerica.com</span>
          </div>
        </motion.div>
      </div>
    </div>
  );
}


function AIPanel({ onClose, persona, isMobile }) {
  const [msgs, setMsgs] = useState([{ role: "assistant", content: `Hi ${persona.brand} — I'm the MOA Partnership AI. Ask me about pricing, traffic, which zone fits ${persona.category}, what brands like yours have done here, or anything else.` }]);
  const [inp, setInp] = useState("");
  const [loading, setLoading] = useState(false);
  const endRef = useRef(null);
  const SYSTEM = `You are a sharp, knowledgeable Mall of America brand partnership consultant speaking with a representative from ${persona.brand}, interested in ${persona.category}. Key facts: 40M+ annual visitors, 5.6M sq ft, #1 US destination, Bloomington MN. 500+ partners. Sponsorship tiers: Title $5M+/yr, Premier $1-5M/yr, Associate $250K-1M/yr. Demographics: 70% HHI $85K+, 3.2hr dwell, 55% out-of-state. ROI benchmarks: Sponsorship 3.2x, Retail 4.1x, Events 5.8x. Be specific, confident, under 3 paragraphs, always close with a concrete next step.`;

  const send = async () => {
    if (!inp.trim() || loading) return;
    const um = { role: "user", content: inp };
    setMsgs(p => [...p, um]); setInp(""); setLoading(true);
    try {
      const r = await fetch("https://api.anthropic.com/v1/messages", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ model: "claude-sonnet-4-20250514", max_tokens: 1000, system: SYSTEM, messages: [...msgs, um].map(m => ({ role: m.role, content: m.content })) }) });
      const d = await r.json();
      setMsgs(p => [...p, { role: "assistant", content: d.content?.[0]?.text || "Try again." }]);
    } catch { setMsgs(p => [...p, { role: "assistant", content: "Connection issue. Email partnerships@mallofamerica.com" }]); }
    setLoading(false);
  };
  useEffect(() => { endRef.current?.scrollIntoView({ behavior: "smooth" }); }, [msgs, loading]);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      style={{ position: "fixed", inset: 0, zIndex: 500, background: "rgba(5,4,3,.97)", backdropFilter: "blur(28px)", display: "flex", flexDirection: "column" }}>
      <div style={{ height: 54, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 20px", borderBottom: "1px solid rgba(255,255,255,.07)", flexShrink: 0 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 32, height: 32, borderRadius: "50%", background: `linear-gradient(135deg,${GOLD},${GOLD2})`, display: "flex", alignItems: "center", justifyContent: "center" }}><Sparkles size={14} style={{ color: "#000" }} /></div>
          <div>
            <div style={{ fontSize: 12, fontWeight: 700, color: "#fff" }}>MOA Partnership AI</div>
            <div style={{ fontSize: 7, color: GOLD, letterSpacing: "0.1em" }}>Tailored for {persona.brand} · Powered by Claude</div>
          </div>
        </div>
        <button data-mag onClick={onClose} style={{ width: 30, height: 30, borderRadius: 4, background: "rgba(255,255,255,.06)", border: "1px solid rgba(255,255,255,.1)", color: "rgba(255,255,255,.5)", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}><X size={12} /></button>
      </div>
      <div style={{ flex: 1, overflowY: "auto", padding: "16px 20px", display: "flex", flexDirection: "column", gap: 10, maxWidth: 680, margin: "0 auto", width: "100%" }}>
        {msgs.map((m, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} style={{ display: "flex", justifyContent: m.role === "user" ? "flex-end" : "flex-start" }}>
            <div style={{ maxWidth: "85%", padding: "10px 14px", borderRadius: m.role === "user" ? "10px 10px 2px 10px" : "10px 10px 10px 2px", background: m.role === "user" ? `linear-gradient(135deg,${GOLD},${GOLD2})` : "rgba(255,255,255,.06)", color: m.role === "user" ? "#000" : "rgba(255,255,255,.8)", fontSize: "clamp(12px,1.5vw,13px)", lineHeight: 1.65, fontWeight: m.role === "user" ? 600 : 400, border: m.role === "assistant" ? "1px solid rgba(255,255,255,.08)" : "none" }}>
              {m.content}
            </div>
          </motion.div>
        ))}
        {loading && (<div style={{ display: "flex", gap: 5, padding: "8px 12px" }}>{[0, 1, 2].map(i => <motion.div key={i} animate={{ opacity: [.3, 1, .3] }} transition={{ duration: 1, delay: i * .2, repeat: Infinity }} style={{ width: 6, height: 6, borderRadius: "50%", background: GOLD }} />)}</div>)}
        <div ref={endRef} />
      </div>
      {msgs.length === 1 && (
        <div style={{ padding: "0 20px 10px", maxWidth: 680, margin: "0 auto", width: "100%" }}>
          <p style={{ fontSize: 8, color: "rgba(255,255,255,.18)", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 6 }}>Try asking</p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
            {[`Best zone for ${persona.brand}?`, `ROI on a $1M deal?`, "How does a pop-up work?", `Has a brand like ${persona.brand} done this?`].map(q => (
              <button key={q} data-mag onClick={() => setInp(q)} style={{ padding: "4px 11px", borderRadius: 20, background: "rgba(255,255,255,.05)", border: "1px solid rgba(255,255,255,.1)", color: "rgba(255,255,255,.45)", fontSize: 10, cursor: "pointer", transition: "all .2s" }}
                onMouseEnter={e => { e.target.style.borderColor = GOLD; e.target.style.color = GOLD; }}
                onMouseLeave={e => { e.target.style.borderColor = "rgba(255,255,255,.1)"; e.target.style.color = "rgba(255,255,255,.45)"; }}>
                {q}
              </button>
            ))}
          </div>
        </div>
      )}
      <div style={{ padding: "12px 20px", borderTop: "1px solid rgba(255,255,255,.06)", maxWidth: 680, margin: "0 auto", width: "100%", flexShrink: 0 }}>
        <div style={{ display: "flex", gap: 8 }}>
          <input value={inp} onChange={e => setInp(e.target.value)} onKeyDown={e => e.key === "Enter" && send()}
            placeholder={`Ask about ${persona.brand}'s MOA opportunity…`}
            style={{ flex: 1, padding: "11px 14px", borderRadius: 4, background: "rgba(255,255,255,.06)", border: "1px solid rgba(255,255,255,.1)", color: "#fff", fontSize: "clamp(12px,1.5vw,13px)", outline: "none" }} />
          <button data-mag onClick={send} disabled={loading || !inp.trim()} style={{ width: 44, height: 44, borderRadius: 4, background: `linear-gradient(135deg,${GOLD},${GOLD2})`, border: "none", cursor: loading || !inp.trim() ? "default" : "pointer", display: "flex", alignItems: "center", justifyContent: "center", opacity: loading || !inp.trim() ? .4 : 1, transition: "opacity .2s" }}>
            <Send size={14} style={{ color: "#000" }} />
          </button>
        </div>
      </div>
    </motion.div>
  );
}

function ContactModal({ onClose, persona }) {
  const [sent, setSent] = useState(false);
  const categoryMap = { "Retail / Fashion": "Retail Leasing", "Luxury / Premium": "Retail Leasing", "F&B / Dining": "Dining", "Entertainment": "Events", "Sponsorship": "Sponsorship", "Events & Activations": "Events" };
  const [interest, setInterest] = useState(categoryMap[persona.category] || "Other");
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      style={{ position: "fixed", inset: 0, zIndex: 500, background: "rgba(5,4,3,.96)", backdropFilter: "blur(24px)", display: "flex", alignItems: "center", justifyContent: "center", padding: 16, overflowY: "auto" }}
      onClick={e => { if (e.target === e.currentTarget) onClose(); }}>
      <motion.div initial={{ scale: .94, y: 18 }} animate={{ scale: 1, y: 0 }}
        style={{ width: "100%", maxWidth: 480, background: "rgba(255,255,255,.04)", border: "1px solid rgba(255,255,255,.1)", borderRadius: 6, padding: "28px 24px", position: "relative", margin: "auto" }}>
        <button data-mag onClick={onClose} style={{ position: "absolute", top: 12, right: 12, width: 28, height: 28, borderRadius: 4, background: "rgba(255,255,255,.06)", border: "1px solid rgba(255,255,255,.1)", color: "rgba(255,255,255,.45)", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}><X size={12} /></button>
        {sent ? (
          <div style={{ textAlign: "center", padding: "14px 0" }}>
            <motion.div initial={{ scale: .7 }} animate={{ scale: 1 }} transition={{ type: "spring", bounce: .5 }}
              style={{ width: 44, height: 44, borderRadius: "50%", background: `linear-gradient(135deg,${GOLD},${GOLD2})`, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 12px" }}>
              <Star size={18} style={{ color: "#000" }} />
            </motion.div>
            <h3 style={{ fontFamily: "var(--display)", fontSize: 24, color: "#fff", marginBottom: 8 }}>Message Received</h3>
            <p style={{ fontSize: 12, color: "rgba(255,255,255,.38)", lineHeight: 1.65 }}>We'll have a proposal for <strong style={{ color: "rgba(255,255,255,.65)" }}>{persona.brand}</strong> within 24 hours.</p>
          </div>
        ) : (
          <>
            <h3 style={{ fontFamily: "var(--display)", fontSize: 20, color: "#fff", marginBottom: 4, lineHeight: 1 }}>Get {persona.brand}'s Proposal</h3>
            <p style={{ fontSize: 10, color: "rgba(255,255,255,.3)", marginBottom: 12 }}>Your interest in {persona.category} has been pre-selected.</p>
            <div style={{ marginBottom: 10 }}>
              <div style={{ fontSize: 8, color: "rgba(255,255,255,.3)", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: 6 }}>Partnership Interest</div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
                {["Retail Leasing", "Sponsorship", "Events", "Pop-Up", "Dining", "Other"].map(o => (
                  <button key={o} data-mag onClick={() => setInterest(o)} style={{ padding: "4px 10px", borderRadius: 3, fontSize: 9, fontWeight: 700, background: interest === o ? GOLD : "rgba(255,255,255,.05)", color: interest === o ? "#000" : "rgba(255,255,255,.4)", border: `1px solid ${interest === o ? GOLD : "rgba(255,255,255,.1)"}`, cursor: "pointer", transition: "all .2s" }}>{o}</button>
                ))}
              </div>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 5, marginBottom: 5 }}>
              {["Full Name", "Company", "Email", "Phone"].map(ph => (
                <input key={ph} placeholder={ph} defaultValue={ph === "Company" ? persona.brand : ""}
                  style={{ padding: "10px 12px", borderRadius: 3, background: "rgba(255,255,255,.05)", border: "1px solid rgba(255,255,255,.1)", color: "#fff", fontSize: 12, outline: "none" }} />
              ))}
            </div>
            <textarea placeholder="Tell us about your goals…" rows={3}
              style={{ width: "100%", padding: "10px 12px", borderRadius: 3, background: "rgba(255,255,255,.05)", border: "1px solid rgba(255,255,255,.1)", color: "#fff", fontSize: 12, outline: "none", resize: "none", marginBottom: 10 }} />
            <button data-mag onClick={() => setSent(true)} style={{ width: "100%", padding: "11px 0", borderRadius: 3, background: `linear-gradient(135deg,${GOLD},${GOLD2})`, color: "#000", fontSize: 11, fontWeight: 800, border: "none", cursor: "pointer", letterSpacing: "0.1em", textTransform: "uppercase" }}>
              Send Message →
            </button>
            <p style={{ textAlign: "center", fontSize: 8, color: "rgba(255,255,255,.16)", marginTop: 8 }}>Response within 24 hours · Confidential</p>
          </>
        )}
      </motion.div>
    </motion.div>
  );
}

/* ── Shared ── */
function GoldButton({ children, onClick, large = false, outline = false, disabled = false, style = {} }) {
  return (
    <motion.button data-mag onClick={onClick} disabled={disabled}
      whileHover={!disabled ? { scale: 1.025 } : {}} whileTap={!disabled ? { scale: .975 } : {}}
      style={{ padding: large ? "11px 20px" : "7px 14px", borderRadius: 3, background: outline ? "transparent" : disabled ? "rgba(212,168,67,.3)" : `linear-gradient(135deg,${GOLD},${GOLD2})`, color: outline ? GOLD : "#000", border: outline ? `1px solid ${GOLD}` : "none", fontSize: large ? 11 : 10, fontWeight: 800, letterSpacing: "0.09em", textTransform: "uppercase", cursor: disabled ? "default" : "pointer", display: "inline-flex", alignItems: "center", gap: 6, fontFamily: "var(--body)", opacity: disabled ? .5 : 1, ...style }}>
      {children}
    </motion.button>
  );
}

function NavBtn({ children, onClick, disabled }) {
  return (
    <button data-mag onClick={onClick} disabled={disabled} style={{ width: 28, height: 28, borderRadius: 3, border: "1px solid rgba(255,255,255,.1)", background: "rgba(255,255,255,.04)", display: "flex", alignItems: "center", justifyContent: "center", color: disabled ? "rgba(255,255,255,.18)" : "#fff", cursor: disabled ? "default" : "pointer" }}>
      {children}
    </button>
  );
}

function MOAStar({ size = 28, style: extraStyle = {} }) {
  return (
    <svg viewBox="0 0 100 100" style={{ width: size, height: size, flexShrink: 0, ...extraStyle }}>
      <defs><linearGradient id="sg2" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stopColor="#D4A843" /><stop offset="100%" stopColor="#C47B1A" /></linearGradient></defs>
      <polygon points="50,8 62,36 92,36 69,54 78,82 50,64 22,82 31,54 8,36 38,36" fill="url(#sg2)" />
    </svg>
  );
}