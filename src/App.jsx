import { motion, AnimatePresence } from "motion/react";
import { useEffect, useState, useCallback, useRef } from "react";
import {
  ChevronLeft, ChevronRight, X, Calendar, Users, MapPin,
  ArrowRight, Sparkles, Utensils, Star, Zap, Building2, Menu,
  ChevronDown, Phone, Mail, Globe, Award, TrendingUp, Heart,
  ShoppingBag, Coffee, Music, Camera, Car, Wifi, Shield, Clock,
  DollarSign, BarChart2, Target, Layers, Play, Volume2
} from "lucide-react";


const _fl = document.createElement("link");
_fl.rel = "stylesheet";
_fl.href = "https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400;1,700&family=DM+Sans:wght@300;400;500;600;700&family=DM+Mono:wght@400;500&display=swap";
document.head.appendChild(_fl);



const HERO_VIDEO = "https://res.cloudinary.com/dbkwncgz5/video/upload/v1776394613/13748223_3840_2160_30fps_fbzbr6.mp4";
const ENTERTAIN_VIDEO = "https://res.cloudinary.com/dbkwncgz5/video/upload/v1776394272/istockphoto-849418708-640_adpp_is_for5k3.mp4";


const SECTIONS = [
  {
    id: "home", label: "Home", icon: <Star size={13} />,
    slides: [
      { id: "hero", type: "hero" },
      { id: "intro-video", type: "intro-video" },
    ]
  },
  {
    id: "why-moa", label: "Why MOA", icon: <TrendingUp size={13} />,
    slides: [
      { id: "why-stats", type: "why-stats" },
      { id: "why-location", type: "why-location" },
      { id: "why-audience", type: "why-audience" },
      { id: "why-media", type: "why-media" },
    ]
  },
  {
    id: "retail", label: "Retail", icon: <ShoppingBag size={13} />,
    slides: [
      { id: "retail-hero", type: "retail-hero" },
      { id: "retail-brands", type: "retail-brands" },
      { id: "retail-categories", type: "retail-categories" },
      { id: "retail-leasing", type: "retail-leasing" },
      { id: "retail-popup", type: "retail-popup" },
    ]
  },
  {
    id: "luxury", label: "Luxury", icon: <Award size={13} />,
    slides: [
      { id: "luxury-hero", type: "luxury-hero" },
      { id: "luxury-metrics", type: "luxury-metrics" },
      { id: "luxury-brands", type: "luxury-brands" },
    ]
  },
  {
    id: "dining", label: "Dining", icon: <Coffee size={13} />,
    slides: [
      { id: "dining-hero", type: "dining-hero" },
      { id: "dining-concepts", type: "dining-concepts" },
      { id: "dining-stats", type: "dining-stats" },
    ]
  },
  {
    id: "entertainment", label: "Entertainment", icon: <Music size={13} />,
    slides: [
      { id: "ent-hero", type: "ent-hero" },
      { id: "ent-venues", type: "ent-venues" },
      { id: "ent-nickelodeon", type: "ent-nickelodeon" },
      { id: "ent-aquarium", type: "ent-aquarium" },
    ]
  },
  {
    id: "events", label: "Events", icon: <Calendar size={13} />,
    slides: [
      { id: "events-hero", type: "events-hero" },
      { id: "events-spaces", type: "events-spaces" },
      { id: "events-production", type: "events-production" },
      { id: "events-past", type: "events-past" },
    ]
  },
  {
    id: "sponsorship", label: "Sponsorship", icon: <Target size={13} />,
    slides: [
      { id: "sponsor-intro", type: "sponsor-intro" },
      { id: "sponsor-tiers", type: "sponsor-tiers" },
      { id: "sponsor-digital", type: "sponsor-digital" },
      { id: "sponsor-activation", type: "sponsor-activation" },
    ]
  },
  {
    id: "data", label: "Data & Insights", icon: <BarChart2 size={13} />,
    slides: [
      { id: "data-overview", type: "data-overview" },
      { id: "data-demographics", type: "data-demographics" },
      { id: "data-dwell", type: "data-dwell" },
    ]
  },
  {
    id: "contact", label: "Contact", icon: <Phone size={13} />,
    slides: [
      { id: "contact-team", type: "contact-team" },
      { id: "contact-form", type: "contact-form" },
    ]
  },
];

const ALL = SECTIONS.flatMap((sec, si) =>
  sec.slides.map((sl, li) => ({ ...sl, si, li }))
);


const V = {
  enter: d => ({ opacity: 0, x: d > 0 ? 80 : -80, scale: 0.96 }),
  center: { opacity: 1, x: 0, scale: 1, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
  exit: d => ({ opacity: 0, x: d > 0 ? -80 : 80, scale: 0.96, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } }),
};



export default function App() {
  const [idx, setIdx] = useState(0);
  const [dir, setDir] = useState(1);
  const [modal, setModal] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [expandedSec, setExpandedSec] = useState(null);

  const cur = ALL[idx];
  const sec = SECTIONS[cur.si];

  const goTo = useCallback((i) => {
    if (i === idx || i < 0 || i >= ALL.length) return;
    setDir(i > idx ? 1 : -1);
    setIdx(i);
  }, [idx]);

  const goSec = useCallback((si) => {
    const i = ALL.findIndex(s => s.si === si);
    goTo(i);
    setSidebarOpen(false);
  }, [goTo]);

  const goSlide = useCallback((slideId) => {
    const i = ALL.findIndex(s => s.id === slideId);
    if (i >= 0) { goTo(i); setSidebarOpen(false); }
  }, [goTo]);

  useEffect(() => {
    if (modal) return;
    const fn = e => {
      if (e.key === "ArrowRight" || e.key === "ArrowDown") goTo(idx + 1);
      if (e.key === "ArrowLeft" || e.key === "ArrowUp") goTo(idx - 1);
      if (e.key === "Escape") setSidebarOpen(false);
    };
    window.addEventListener("keydown", fn);
    return () => window.removeEventListener("keydown", fn);
  }, [idx, goTo, modal]);

  useEffect(() => { document.body.style.overflow = "hidden"; }, []);

  const secSlides = ALL.filter(s => s.si === cur.si);
  const F = { fontFamily: "'DM Sans', sans-serif" };


  useEffect(() => { setExpandedSec(cur.si); }, [cur.si]);

  return (
    <div style={{ position: "fixed", inset: 0, background: "#080808", display: "flex", alignItems: "center", justifyContent: "center", ...F }}>
      <div style={{
        position: "relative", display: "flex", flexDirection: "column",
        width: "min(100vw, calc(100vh * 16/9))",
        height: "min(100vh, calc(100vw * 9/16))",
        boxShadow: "0 0 100px rgba(0,0,0,0.9)",
      }}>


        <div style={{
          height: 48, background: "rgba(6,6,6,0.98)", borderBottom: "1px solid rgba(255,255,255,0.06)",
          display: "flex", alignItems: "center", justifyContent: "space-between",
          padding: "0 16px", flexShrink: 0, zIndex: 50, position: "relative"
        }}>


          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <button onClick={() => setSidebarOpen(!sidebarOpen)} style={{
              width: 34, height: 34, display: "flex", flexDirection: "column",
              alignItems: "center", justifyContent: "center", gap: 4,
              background: sidebarOpen ? "rgba(255,255,255,0.08)" : "transparent",
              border: "1px solid rgba(255,255,255,0.08)", borderRadius: 4, cursor: "pointer", transition: "all 0.2s"
            }}>
              <motion.span animate={{ rotate: sidebarOpen ? 45 : 0, y: sidebarOpen ? 8 : 0 }} style={{ display: "block", width: 14, height: 1.5, background: "#fff", borderRadius: 2 }} />
              <motion.span animate={{ opacity: sidebarOpen ? 0 : 1 }} style={{ display: "block", width: 14, height: 1.5, background: "#fff", borderRadius: 2 }} />
              <motion.span animate={{ rotate: sidebarOpen ? -45 : 0, y: sidebarOpen ? -8 : 0 }} style={{ display: "block", width: 14, height: 1.5, background: "#fff", borderRadius: 2 }} />
            </button>
            <button onClick={() => goSec(0)} style={{ display: "flex", alignItems: "center", gap: 8, background: "none", border: "none", cursor: "pointer" }}>
              <MOALogo size={22} />
              <div>
                <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: "0.12em", color: "#fff", textTransform: "uppercase", lineHeight: 1 }}>Mall of America</div>
                <div style={{ fontSize: 8, color: "rgba(255,255,255,0.35)", letterSpacing: "0.1em", textTransform: "uppercase" }}>Brand Partnership Deck</div>
              </div>
            </button>
          </div>

          <div style={{ position: "absolute", left: "50%", transform: "translateX(-50%)", display: "flex", alignItems: "center", gap: 6 }}>
            <span style={{ fontSize: 9, fontWeight: 600, color: "rgba(255,255,255,0.3)", letterSpacing: "0.1em", textTransform: "uppercase" }}>{sec.label}</span>
            <span style={{ color: "rgba(255,255,255,0.15)", fontSize: 9 }}>›</span>
            <span style={{ fontSize: 9, fontWeight: 500, color: "rgba(255,255,255,0.55)", letterSpacing: "0.06em" }}>
              {cur.id.split("-").map(w => w[0].toUpperCase() + w.slice(1)).join(" ")}
            </span>
          </div>


          <button onClick={() => setModal("contact")} style={{
            fontSize: 9, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase",
            padding: "6px 16px", borderRadius: 3, background: "linear-gradient(135deg,#c9a227,#e8630a)",
            color: "#fff", border: "none", cursor: "pointer"
          }}>
            Get In Touch
          </button>
        </div>


        <AnimatePresence>
          {sidebarOpen && (
            <>
              <motion.div
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                onClick={() => setSidebarOpen(false)}
                style={{ position: "absolute", inset: 0, zIndex: 55, background: "rgba(0,0,0,0.6)", top: 48 }}
              />
              <motion.div
                initial={{ x: "-100%" }} animate={{ x: 0 }} exit={{ x: "-100%" }}
                transition={{ type: "tween", duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
                style={{
                  position: "absolute", left: 0, top: 48, bottom: 0, zIndex: 60,
                  width: "clamp(200px, 28%, 280px)",
                  background: "rgba(8,8,8,0.99)", borderRight: "1px solid rgba(255,255,255,0.07)",
                  overflowY: "auto", display: "flex", flexDirection: "column"
                }}>

                <div style={{ padding: "16px 16px 10px", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                  <div style={{ fontSize: 8, fontWeight: 700, letterSpacing: "0.16em", color: "rgba(255,255,255,0.2)", textTransform: "uppercase", marginBottom: 4 }}>Navigation</div>
                  <div style={{ fontSize: 11, color: "rgba(255,255,255,0.45)" }}>{ALL.length} slides across {SECTIONS.length} sections</div>
                </div>

                <div style={{ flex: 1, padding: "8px 0" }}>
                  {SECTIONS.map((s, si) => {
                    const isActiveSec = cur.si === si;
                    const isExpanded = expandedSec === si;
                    const secSlideList = ALL.filter(sl => sl.si === si);
                    return (
                      <div key={s.id}>
                        <button
                          onClick={() => { setExpandedSec(isExpanded ? null : si); if (!isExpanded) goSec(si); }}
                          style={{
                            width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between",
                            padding: "9px 16px", background: isActiveSec ? "rgba(255,255,255,0.05)" : "transparent",
                            border: "none", cursor: "pointer", transition: "all 0.15s",
                            borderLeft: isActiveSec ? "2px solid #c9a227" : "2px solid transparent"
                          }}>
                          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                            <span style={{ color: isActiveSec ? "#c9a227" : "rgba(255,255,255,0.3)" }}>{s.icon}</span>
                            <span style={{ fontSize: 11, fontWeight: isActiveSec ? 700 : 500, color: isActiveSec ? "#fff" : "rgba(255,255,255,0.5)", letterSpacing: "0.03em" }}>{s.label}</span>
                          </div>
                          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                            <span style={{ fontSize: 8, color: "rgba(255,255,255,0.2)", fontWeight: 600 }}>{secSlideList.length}</span>
                            <motion.div animate={{ rotate: isExpanded ? 180 : 0 }} transition={{ duration: 0.2 }}>
                              <ChevronDown size={10} style={{ color: "rgba(255,255,255,0.25)" }} />
                            </motion.div>
                          </div>
                        </button>
                        <AnimatePresence>
                          {isExpanded && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.22 }} style={{ overflow: "hidden" }}>
                              {secSlideList.map((sl, li) => {
                                const isCurrentSlide = sl.id === cur.id;
                                const label = sl.id.split("-").slice(1).join(" ") || sl.id;
                                return (
                                  <button key={sl.id} onClick={() => goSlide(sl.id)}
                                    style={{
                                      width: "100%", display: "flex", alignItems: "center", gap: 10,
                                      padding: "7px 16px 7px 36px", background: isCurrentSlide ? "rgba(201,162,39,0.08)" : "transparent",
                                      border: "none", cursor: "pointer", textAlign: "left", transition: "all 0.15s"
                                    }}>
                                    <span style={{ fontSize: 8, color: isCurrentSlide ? "#c9a227" : "rgba(255,255,255,0.2)", fontWeight: 700, minWidth: 14 }}>
                                      {String(li + 1).padStart(2, "0")}
                                    </span>
                                    <span style={{ fontSize: 10, color: isCurrentSlide ? "#c9a227" : "rgba(255,255,255,0.38)", fontWeight: isCurrentSlide ? 600 : 400, textTransform: "capitalize" }}>
                                      {label}
                                    </span>
                                    {isCurrentSlide && <div style={{ marginLeft: "auto", width: 4, height: 4, borderRadius: "50%", background: "#c9a227" }} />}
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

                <div style={{ padding: 14, borderTop: "1px solid rgba(255,255,255,0.05)" }}>
                  <button onClick={() => { setModal("contact"); setSidebarOpen(false); }} style={{
                    width: "100%", padding: "8px 0", borderRadius: 4, background: "linear-gradient(135deg,#c9a227,#e8630a)",
                    color: "#fff", fontSize: 10, fontWeight: 700, border: "none", cursor: "pointer", letterSpacing: "0.08em", textTransform: "uppercase"
                  }}>Schedule a Meeting</button>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>


        <div style={{ position: "relative", flex: 1, overflow: "hidden", background: "#000" }}>
          <AnimatePresence custom={dir} mode="wait">
            <motion.div key={cur.id} custom={dir} variants={V} initial="enter" animate="center" exit="exit"
              style={{ position: "absolute", inset: 0 }}>
              <SlideRenderer type={cur.type} openModal={setModal} goNext={() => goTo(idx + 1)} goPrev={() => goTo(idx - 1)} />
            </motion.div>
          </AnimatePresence>


          {idx > 0 && (
            <button onClick={() => goTo(idx - 1)} style={{
              position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)",
              zIndex: 20, width: 34, height: 34, borderRadius: 4,
              background: "rgba(0,0,0,0.6)", border: "1px solid rgba(255,255,255,0.1)",
              display: "flex", alignItems: "center", justifyContent: "center",
              color: "#fff", cursor: "pointer", backdropFilter: "blur(10px)"
            }}>
              <ChevronLeft size={14} />
            </button>
          )}

          {idx < ALL.length - 1 && (
            <button onClick={() => goTo(idx + 1)} style={{
              position: "absolute", right: 10, top: "50%", transform: "translateY(-50%)",
              zIndex: 20, width: 34, height: 34, borderRadius: 4,
              background: "rgba(0,0,0,0.6)", border: "1px solid rgba(255,255,255,0.1)",
              display: "flex", alignItems: "center", justifyContent: "center",
              color: "#fff", cursor: "pointer", backdropFilter: "blur(10px)"
            }}>
              <ChevronRight size={14} />
            </button>
          )}


          <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 2, background: "rgba(255,255,255,0.05)", zIndex: 10 }}>
            <motion.div
              style={{ height: "100%", background: "linear-gradient(90deg,#c9a227,#e8630a)", borderRadius: 1 }}
              animate={{ width: `${((idx + 1) / ALL.length) * 100}%` }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            />
          </div>
        </div>


        <div style={{
          height: 38, background: "rgba(6,6,6,0.98)", borderTop: "1px solid rgba(255,255,255,0.06)",
          display: "flex", alignItems: "center", justifyContent: "space-between",
          padding: "0 14px", flexShrink: 0, zIndex: 50
        }}>

          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <span style={{ fontSize: 8, fontWeight: 700, letterSpacing: "0.14em", color: "#c9a227", textTransform: "uppercase" }}>{sec.label}</span>
            <div style={{ display: "flex", gap: 3 }}>
              {secSlides.map(sl => {
                const a = sl.id === cur.id;
                return (
                  <button key={sl.id} onClick={() => goTo(ALL.findIndex(s => s.id === sl.id))}
                    style={{ width: a ? 16 : 4, height: 4, borderRadius: 2, background: a ? "#c9a227" : "rgba(255,255,255,0.18)", border: "none", cursor: "pointer", padding: 0, transition: "all 0.3s" }} />
                );
              })}
            </div>
          </div>

          <div style={{ position: "absolute", left: "50%", transform: "translateX(-50%)", display: "flex", gap: 4 }}>
            {SECTIONS.map((s, si) => {
              const a = cur.si === si;
              return (
                <button key={s.id} onClick={() => goSec(si)}
                  style={{ width: a ? 16 : 4, height: 4, borderRadius: 2, background: a ? "#c9a227" : "rgba(255,255,255,0.15)", border: "none", cursor: "pointer", padding: 0, transition: "all 0.3s" }} />
              );
            })}
          </div>


          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ fontSize: 9, color: "rgba(255,255,255,0.22)", fontVariantNumeric: "tabular-nums", letterSpacing: "0.05em", fontFamily: "'DM Mono', monospace" }}>
              {String(idx + 1).padStart(2, "0")} / {String(ALL.length).padStart(2, "0")}
            </span>
            {[
              { fn: () => goTo(idx - 1), disabled: idx === 0, icon: <ChevronLeft size={11} /> },
              { fn: () => goTo(idx + 1), disabled: idx === ALL.length - 1, icon: <ChevronRight size={11} /> }
            ].map(({ fn, disabled, icon }, i) => (
              <button key={i} onClick={fn} disabled={disabled}
                style={{
                  width: 22, height: 22, borderRadius: 3,
                  background: disabled ? "rgba(255,255,255,0.03)" : "rgba(255,255,255,0.08)",
                  border: "1px solid rgba(255,255,255,0.08)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  color: disabled ? "rgba(255,255,255,0.12)" : "#fff", cursor: disabled ? "default" : "pointer"
                }}>{icon}</button>
            ))}
          </div>
        </div>
      </div>

      <ContactModal show={modal === "contact"} onClose={() => setModal(null)} />
      <LeasingModal show={modal === "leasing"} onClose={() => setModal(null)} />
      <EventModal show={modal === "events"} onClose={() => setModal(null)} />
      <SponsorModal show={modal === "sponsorship"} onClose={() => setModal(null)} />
    </div>
  );
}


const PD = { fontFamily: "'Playfair Display', serif" };

function MOALogo({ size = 24 }) {
  return (
    <svg viewBox="0 0 100 100" style={{ width: size, height: size }}>
      <defs>
        <linearGradient id="moa-g" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#c9a227" />
          <stop offset="100%" stopColor="#e8630a" />
        </linearGradient>
      </defs>
      <polygon points="50,8 62,36 92,36 69,54 78,82 50,64 22,82 31,54 8,36 38,36" fill="url(#moa-g)" />
    </svg>
  );
}

function Slide({ bg = "#000", children, style = {} }) {
  return (
    <div style={{
      width: "100%", height: "100%", background: bg, overflow: "hidden",
      display: "flex", flexDirection: "column", justifyContent: "center",
      padding: "4% 7%", boxSizing: "border-box", ...style
    }}>
      {children}
    </div>
  );
}

function Tag({ children, color = "#c9a227" }) {
  return (
    <div style={{ display: "inline-flex", alignItems: "center", gap: 8, marginBottom: "2.5%" }}>
      <div style={{ width: 18, height: 2, background: color }} />
      <span style={{ fontSize: "clamp(7px,0.8vw,9px)", fontWeight: 700, letterSpacing: "0.18em", textTransform: "uppercase", color }}>{children}</span>
    </div>
  );
}

function H({ children, dark = true, size = "lg", italic = false }) {
  const fs = { xl: "clamp(28px,7vw,88px)", lg: "clamp(18px,4.2vw,54px)", md: "clamp(14px,2.6vw,32px)", sm: "clamp(12px,2vw,24px)" }[size] || "clamp(18px,4.2vw,54px)";
  return (
    <h2 style={{
      ...PD, fontSize: fs, fontWeight: 700, fontStyle: italic ? "italic" : "normal",
      color: dark ? "#fff" : "#111", lineHeight: 0.94, letterSpacing: "-0.02em",
      textTransform: "uppercase", margin: 0, marginBottom: "2%"
    }}>{children}</h2>
  );
}

function Sub({ children, dark = true }) {
  return (
    <p style={{ fontSize: "clamp(8px,1.05vw,13px)", color: dark ? "rgba(255,255,255,0.45)" : "#777", fontWeight: 300, lineHeight: 1.65, margin: 0, marginBottom: "3%" }}>
      {children}
    </p>
  );
}

function GoldBtn({ onClick, children, outline = false }) {
  return (
    <motion.button onClick={onClick} whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}
      style={{
        background: outline ? "transparent" : "linear-gradient(135deg,#c9a227,#e8630a)",
        color: outline ? "#c9a227" : "#fff",
        border: outline ? "1px solid #c9a227" : "none",
        padding: "clamp(7px,1vw,11px) clamp(16px,2.4vw,28px)",
        borderRadius: 3, fontSize: "clamp(8px,0.85vw,10px)", fontWeight: 700,
        letterSpacing: "0.1em", textTransform: "uppercase", cursor: "pointer",
        display: "inline-flex", alignItems: "center", gap: 6
      }}>{children}</motion.button>
  );
}

function Metric({ value, label, sub, accent = "#c9a227" }) {
  return (
    <div style={{ textAlign: "center", padding: "clamp(12px,2vw,24px) clamp(8px,1.5vw,18px)", borderRadius: 8, background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}>
      <div style={{ fontSize: "clamp(22px,3.5vw,44px)", fontWeight: 900, color: accent, lineHeight: 1, marginBottom: "6%" }}>{value}</div>
      <div style={{ fontSize: "clamp(8px,1vw,12px)", fontWeight: 700, color: "#fff", marginBottom: "3%", letterSpacing: "0.04em" }}>{label}</div>
      {sub && <div style={{ fontSize: "clamp(6px,0.75vw,9px)", color: "rgba(255,255,255,0.3)" }}>{sub}</div>}
    </div>
  );
}

function CardGrid({ children, cols = 3 }) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: `repeat(${cols},1fr)`, gap: "clamp(6px,1.1vw,14px)", marginTop: "3%" }}>
      {children}
    </div>
  );
}


function SlideRenderer({ type, openModal, goNext, goPrev }) {
  const p = { openModal, goNext, goPrev };
  const map = {
    "hero": <SlideHero {...p} />,
    "intro-video": <SlideIntroVideo {...p} />,
    "why-stats": <SlideWhyStats />,
    "why-location": <SlideWhyLocation />,
    "why-audience": <SlideWhyAudience />,
    "why-media": <SlideWhyMedia />,
    "retail-hero": <SlideRetailHero {...p} />,
    "retail-brands": <SlideRetailBrands {...p} />,
    "retail-categories": <SlideRetailCategories {...p} />,
    "retail-leasing": <SlideRetailLeasing {...p} />,
    "retail-popup": <SlideRetailPopup {...p} />,
    "luxury-hero": <SlideLuxuryHero {...p} />,
    "luxury-metrics": <SlideLuxuryMetrics {...p} />,
    "luxury-brands": <SlideLuxuryBrands {...p} />,
    "dining-hero": <SlideDiningHero />,
    "dining-concepts": <SlideDiningConcepts />,
    "dining-stats": <SlideDiningStats />,
    "ent-hero": <SlideEntHero {...p} />,
    "ent-venues": <SlideEntVenues {...p} />,
    "ent-nickelodeon": <SlideEntNick />,
    "ent-aquarium": <SlideEntAquarium />,
    "events-hero": <SlideEventsHero {...p} />,
    "events-spaces": <SlideEventsSpaces {...p} />,
    "events-production": <SlideEventsProduction />,
    "events-past": <SlideEventsPast {...p} />,
    "sponsor-intro": <SlideSponsorIntro {...p} />,
    "sponsor-tiers": <SlideSponsorTiers {...p} />,
    "sponsor-digital": <SlideSponsorDigital />,
    "sponsor-activation": <SlideSponsorActivation {...p} />,
    "data-overview": <SlideDataOverview />,
    "data-demographics": <SlideDataDemographics />,
    "data-dwell": <SlideDataDwell />,
    "contact-team": <SlideContactTeam {...p} />,
    "contact-form": <SlideContactForm {...p} />,
  };
  return map[type] || null;
}


function SlideHero({ openModal, goNext }) {
  const [err, setErr] = useState(false);
  return (
    <div style={{ position: "relative", width: "100%", height: "100%", overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center" }}>
      {!err
        ? <video autoPlay muted loop playsInline onError={() => setErr(true)} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}><source src={HERO_VIDEO} type="video/mp4" /></video>
        : <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg,#1a0f00,#000)" }} />
      }
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom,rgba(0,0,0,0.35) 0%,rgba(0,0,0,0.15) 40%,rgba(0,0,0,0.82) 100%)" }} />

      {/* Decorative lines */}
      <div style={{ position: "absolute", top: "15%", left: "7%", width: 1, height: "60%", background: "rgba(201,162,39,0.15)" }} />
      <div style={{ position: "absolute", top: "15%", right: "7%", width: 1, height: "60%", background: "rgba(201,162,39,0.15)" }} />

      <div style={{ position: "relative", zIndex: 10, textAlign: "center", padding: "0 12%", maxWidth: "100%" }}>
        <motion.div initial={{ opacity: 0, scale: 0.5, rotate: -180 }} animate={{ opacity: 1, scale: 1, rotate: 0 }} transition={{ duration: 1.2, ease: "easeOut" }}
          style={{ marginBottom: "3.5%", display: "flex", justifyContent: "center" }}>
          <MOALogo size={64} />
        </motion.div>
        <motion.p initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
          style={{ fontSize: "clamp(7px,0.9vw,11px)", letterSpacing: "0.3em", textTransform: "uppercase", color: "#c9a227", marginBottom: "2%" }}>
          Official Brand Partnership Deck 2025
        </motion.p>
        <motion.h1 initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.3 }}
          style={{ ...PD, fontSize: "clamp(32px,9vw,112px)", fontWeight: 700, color: "#fff", lineHeight: 0.88, letterSpacing: "-0.025em", textTransform: "uppercase", margin: "0 0 3%" }}>
          More<br /><em style={{ fontStyle: "italic", color: "#c9a227" }}>Than</em><br />A Mall
        </motion.h1>
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}
          style={{ fontSize: "clamp(9px,1.4vw,17px)", color: "rgba(255,255,255,0.5)", fontWeight: 300, letterSpacing: "0.08em", marginBottom: "4.5%" }}>
          Where 40 million visitors meet the world's most powerful brands
        </motion.p>
        <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.1 }}
          style={{ display: "flex", gap: "clamp(6px,1.2vw,14px)", justifyContent: "center" }}>
          <GoldBtn onClick={goNext}>Explore Deck <ArrowRight size={12} /></GoldBtn>
          <GoldBtn onClick={() => openModal("contact")} outline>Schedule a Meeting</GoldBtn>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2 }}
        style={{ position: "absolute", bottom: "10%", left: "50%", transform: "translateX(-50%)", textAlign: "center", cursor: "pointer" }} onClick={goNext}>
        <div style={{ fontSize: "clamp(6px,0.75vw,9px)", letterSpacing: "0.22em", textTransform: "uppercase", color: "rgba(255,255,255,0.3)", marginBottom: 8 }}>Scroll</div>
        <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 1.6, repeat: Infinity }}
          style={{ width: 1, height: 28, background: "rgba(255,255,255,0.25)", margin: "0 auto" }} />
      </motion.div>
    </div>
  );
}

function SlideIntroVideo({ goNext }) {
  return (
    <div style={{ width: "110%", height: "100%", background: "#000", display: "grid", gridTemplateColumns: "1fr 1fr" }}>
      <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", padding: "0 8%" }}>
        <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7 }}>
          <Tag>Our Story</Tag>
          <H size="xl">America's<br /><em style={{ fontStyle: "italic", color: "#c9a227" }}>Greatest</em><br />Destination</H>
          <Sub>Founded in 1992, Mall of America is more than retail — it's a living, breathing cultural platform hosting 40 million people from every corner of the globe every single year.</Sub>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: "6%" }}>
            {[["1992", "Founded"], ["500+", "Brands"], ["32", "Years of growth"], ["#1", "US destination"]].map(([v, l]) => (
              <div key={l} style={{ padding: "10px 14px", borderRadius: 6, background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)" }}>
                <div style={{ fontSize: "clamp(14px,2vw,22px)", fontWeight: 900, color: "#c9a227" }}>{v}</div>
                <div style={{ fontSize: "clamp(7px,0.85vw,10px)", color: "rgba(255,255,255,0.4)", textTransform: "uppercase", letterSpacing: "0.06em", marginTop: 3 }}>{l}</div>
              </div>
            ))}
          </div>
          <GoldBtn onClick={goNext}>Discover Why MOA <ArrowRight size={12} /></GoldBtn>
        </motion.div>
      </div>
      <div style={{ position: "relative", overflow: "hidden" }}>
        <img src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=900&q=80" alt="Mall" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to right, rgba(0,0,0,0.5) 0%, transparent 40%)" }} />
        <div style={{ position: "absolute", bottom: "8%", right: "8%", padding: "12px 18px", borderRadius: 8, background: "rgba(0,0,0,0.75)", backdropFilter: "blur(12px)", border: "1px solid rgba(201,162,39,0.3)" }}>
          <div style={{ fontSize: "clamp(14px,2vw,22px)", fontWeight: 900, color: "#c9a227" }}>5.6M</div>
          <div style={{ fontSize: 9, color: "rgba(255,255,255,0.5)", textTransform: "uppercase", letterSpacing: "0.08em" }}>Square Feet</div>
        </div>
      </div>
    </div>
  );
}

function SlideWhyStats() {
  const stats = [
    { v: "40M+", l: "Annual Visitors", s: "More than most US cities" },
    { v: "5.6M", l: "Square Feet", s: "Largest retail in the US" },
    { v: "$4.2B", l: "Annual Revenue Impact", s: "Statewide economic output" },
    { v: "12,000", l: "Jobs Created", s: "Direct & indirect employment" },
  ];
  return (
    <div style={{ width: "100%", height: "100%", background: "#fff", display: "flex", flexDirection: "column", justifyContent: "center", padding: "5% 7%" }}>
      <Tag color="#c9a227">By The Numbers</Tag>
      <H dark={false} size="lg">The Scale of<br />Mall of America</H>
      <Sub dark={false}>A destination unlike anything else in North America — and the numbers prove it.</Sub>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: "clamp(6px,1.2vw,16px)", marginTop: "2%" }}>
        {stats.map((s, i) => (
          <motion.div key={s.l} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1, duration: 0.5 }} whileHover={{ scale: 1.04, y: -4 }}>
            <div style={{ textAlign: "center", padding: "clamp(12px,2vw,24px)", borderRadius: 10, background: "#f8f5ef", border: "1px solid #ece8e0" }}>
              <div style={{ fontSize: "clamp(22px,3.5vw,44px)", fontWeight: 900, color: "#c9a227", marginBottom: "6%" }}>{s.v}</div>
              <div style={{ fontSize: "clamp(8px,1vw,12px)", fontWeight: 700, color: "#111", marginBottom: "4%" }}>{s.l}</div>
              <div style={{ fontSize: "clamp(6px,0.8vw,10px)", color: "#999" }}>{s.s}</div>
            </div>
          </motion.div>
        ))}
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "clamp(6px,1.2vw,16px)", marginTop: "clamp(6px,1.2vw,16px)" }}>
        {[["$200+", "Avg Spend per Visit"], ["365", "Days Open Yearly"], ["100+", "Countries Represented"]].map(([v, l]) => (
          <div key={l} style={{ padding: "clamp(8px,1.2vw,14px)", borderRadius: 8, background: "#111", display: "flex", alignItems: "center", gap: 14 }}>
            <div style={{ fontSize: "clamp(16px,2.5vw,30px)", fontWeight: 900, color: "#c9a227", minWidth: "max-content" }}>{v}</div>
            <div style={{ fontSize: "clamp(7px,0.9vw,11px)", color: "rgba(255,255,255,0.6)", fontWeight: 500, textTransform: "uppercase", letterSpacing: "0.05em" }}>{l}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function SlideWhyLocation() {
  return (
    <Slide bg="#0e0e0e">
      <Tag>Strategic Location</Tag>
      <H size="lg">At the Center<br />of Everything</H>
      <Sub>Bloomington, MN — minutes from MSP International Airport, accessible to 60% of the US population within a one-day drive.</Sub>
      <CardGrid cols={3}>
        {[
          { icon: <MapPin size={18} />, title: "MSP Airport", body: "8 minutes from Terminal 1. Direct access for 40M+ passengers annually. International gateway." },
          { icon: <Car size={18} />, title: "Highway Access", body: "Intersects I-494, I-35W, and MN-77. 20,000+ parking spaces. Free shuttle network." },
          { icon: <Globe size={18} />, title: "National Draw", body: "Visitors from all 50 states and 100+ countries. 35% of visitors travel 150+ miles." },
          { icon: <Users size={18} />, title: "Metro Population", body: "3.7M metro residents within 30-minute reach. Upper Midwest's #1 retail hub." },
          { icon: <Wifi size={18} />, title: "Connected Campus", body: "Full 5G coverage. Smart parking. Digital wayfinding throughout the entire campus." },
          { icon: <Shield size={18} />, title: "Safe & Welcoming", body: "Award-winning security. Family-first environment. Consistently rated top US destination." },
        ].map((c, i) => (
          <motion.div key={c.title} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}
            style={{ padding: "clamp(12px,1.8vw,20px)", borderRadius: 10, background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)" }}>
            <div style={{ color: "#c9a227", marginBottom: "10%", opacity: 0.85 }}>{c.icon}</div>
            <div style={{ fontSize: "clamp(10px,1.2vw,14px)", fontWeight: 700, color: "#fff", marginBottom: "5%" }}>{c.title}</div>
            <div style={{ fontSize: "clamp(7px,0.9vw,11px)", color: "rgba(255,255,255,0.4)", lineHeight: 1.65 }}>{c.body}</div>
          </motion.div>
        ))}
      </CardGrid>
    </Slide>
  );
}

function SlideWhyAudience() {
  const bars = [
    { label: "Age 18–34", pct: 38, color: "#c9a227" },
    { label: "Age 35–54", pct: 32, color: "#e8630a" },
    { label: "Age 55+", pct: 18, color: "#a16207" },
    { label: "Under 18", pct: 12, color: "#78350f" },
  ];
  return (
    <div style={{ width: "100%", height: "100%", background: "#fff", display: "grid", gridTemplateColumns: "1fr 1fr" }}>
      <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", padding: "5% 6% 5% 7%", borderRight: "1px solid #ece8e0" }}>
        <Tag color="#c9a227">Our Audience</Tag>
        <H dark={false} size="lg">Premium<br />Demographics</H>
        <Sub dark={false}>Our visitors aren't just shoppers — they're high-intent consumers with premium purchasing power.</Sub>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginTop: "3%" }}>
          {[["70%", "Affluent HH $85K+"], ["62%", "Female-led Shopping"], ["55%", "Out-of-state Visitors"], ["3.2h", "Average Dwell Time"]].map(([v, l]) => (
            <div key={l} style={{ padding: "12px 14px", borderRadius: 8, background: "#f8f5ef", border: "1px solid #ece8e0" }}>
              <div style={{ fontSize: "clamp(16px,2.3vw,28px)", fontWeight: 900, color: "#c9a227" }}>{v}</div>
              <div style={{ fontSize: "clamp(7px,0.85vw,10px)", color: "#777", textTransform: "uppercase", letterSpacing: "0.05em", marginTop: 4 }}>{l}</div>
            </div>
          ))}
        </div>
      </div>
      <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", padding: "5% 7% 5% 6%" }}>
        <div style={{ fontSize: "clamp(9px,1.1vw,13px)", fontWeight: 700, color: "#111", marginBottom: "6%", textTransform: "uppercase", letterSpacing: "0.08em" }}>Age Breakdown</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          {bars.map((b, i) => (
            <div key={b.label}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                <span style={{ fontSize: "clamp(8px,0.95vw,11px)", color: "#555", fontWeight: 500 }}>{b.label}</span>
                <span style={{ fontSize: "clamp(8px,0.95vw,11px)", color: "#111", fontWeight: 700 }}>{b.pct}%</span>
              </div>
              <div style={{ height: 8, background: "#ece8e0", borderRadius: 4, overflow: "hidden" }}>
                <motion.div initial={{ width: 0 }} animate={{ width: `${b.pct}%` }} transition={{ delay: i * 0.12, duration: 0.7, ease: "easeOut" }}
                  style={{ height: "100%", background: b.color, borderRadius: 4 }} />
              </div>
            </div>
          ))}
        </div>
        <div style={{ marginTop: "8%", padding: "14px 16px", borderRadius: 10, background: "#f8f5ef", border: "1px solid #ece8e0" }}>
          <div style={{ fontSize: "clamp(8px,1vw,12px)", fontWeight: 700, color: "#111", marginBottom: 6 }}>Top Visitor Origins</div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
            {["Minnesota", "Wisconsin", "Illinois", "Iowa", "North Dakota", "Canada", "China", "UK"].map(s => (
              <span key={s} style={{ fontSize: "clamp(7px,0.8vw,9px)", padding: "3px 8px", borderRadius: 3, background: "#fff", border: "1px solid #ddd", color: "#555" }}>{s}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function SlideWhyMedia() {
  return (
    <Slide bg="#0a0a0a">
      <Tag>Media & Reach</Tag>
      <H size="lg">Your Brand,<br />Amplified</H>
      <Sub>MOA's media ecosystem reaches far beyond the mall walls — digital, social, PR, and experiential all working together for partners.</Sub>
      <CardGrid cols={4}>
        {[
          { icon: <Camera size={16} />, value: "2.8M", label: "Social Followers", sub: "Across all platforms", color: "#c9a227" },
          { icon: <Globe size={16} />, value: "4.2M", label: "Monthly Web Visitors", sub: "mall.mallfamerica.com", color: "#e8630a" },
          { icon: <Mail size={16} />, value: "1.1M", label: "Email Subscribers", sub: "Targeted, opted-in", color: "#a16207" },
          { icon: <TrendingUp size={16} />, value: "500M+", label: "Annual Media Impressions", sub: "PR & earned media", color: "#c9a227" },
        ].map((c, i) => (
          <motion.div key={c.label} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.1 }}
            style={{ padding: "clamp(12px,2vw,22px)", borderRadius: 10, background: "rgba(255,255,255,0.04)", border: `1px solid ${c.color}22`, textAlign: "center" }}>
            <div style={{ color: c.color, marginBottom: "12%", display: "flex", justifyContent: "center" }}>{c.icon}</div>
            <div style={{ fontSize: "clamp(18px,2.8vw,36px)", fontWeight: 900, color: c.color, marginBottom: "5%" }}>{c.value}</div>
            <div style={{ fontSize: "clamp(8px,0.95vw,11px)", fontWeight: 700, color: "#fff", marginBottom: "4%" }}>{c.label}</div>
            <div style={{ fontSize: "clamp(6px,0.75vw,9px)", color: "rgba(255,255,255,0.3)" }}>{c.sub}</div>
          </motion.div>
        ))}
      </CardGrid>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginTop: 14 }}>
        {[
          { label: "On-site Digital Screens", value: "300+ displays throughout the mall campus" },
          { label: "Co-Marketing Programs", value: "Email, social, paid media, and PR amplification" },
        ].map(item => (
          <div key={item.label} style={{ padding: "12px 16px", borderRadius: 8, background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", display: "flex", gap: 12 }}>
            <div style={{ width: 3, background: "#c9a227", borderRadius: 2, flexShrink: 0 }} />
            <div>
              <div style={{ fontSize: "clamp(8px,0.9vw,11px)", fontWeight: 700, color: "#fff", marginBottom: 4 }}>{item.label}</div>
              <div style={{ fontSize: "clamp(7px,0.8vw,10px)", color: "rgba(255,255,255,0.4)" }}>{item.value}</div>
            </div>
          </div>
        ))}
      </div>
    </Slide>
  );
}

function SlideRetailHero({ openModal }) {
  return (
    <div style={{ position: "relative", width: "100%", height: "100%", overflow: "hidden", display: "grid", gridTemplateColumns: "1fr 1fr" }}>
      <div style={{ position: "absolute", inset: 0 }}>
        <img src="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=1600&q=80" alt="" style={{ width: "100%", height: "100%", objectFit: "cover", opacity: 0.12 }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to right,rgba(0,0,0,0.96) 50%,rgba(0,0,0,0.5) 100%)" }} />
      </div>
      <div style={{ position: "relative", zIndex: 10, display: "flex", alignItems: "center", padding: "0 8%" }}>
        <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7 }}>
          <Tag>Retail</Tag>
          <H size="xl">Turn Your<br />Brand Into<br /><em style={{ fontStyle: "italic", color: "#c9a227" }}>An Experience</em></H>
          <Sub>Join 500+ global brands creating unforgettable retail moments across 5.6 million sq ft of premium floor space.</Sub>
          <div style={{ display: "flex", gap: 8 }}>
            <GoldBtn onClick={() => openModal("leasing")}>Explore Leasing <ArrowRight size={12} /></GoldBtn>
            <GoldBtn onClick={() => openModal("contact")} outline>Talk to Us</GoldBtn>
          </div>
        </motion.div>
      </div>
      <div style={{ position: "relative", zIndex: 10, display: "flex", alignItems: "center", padding: "0 6% 0 2%" }}>
        <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}
          style={{ width: "100%", display: "flex", flexDirection: "column", gap: 10 }}>
          {[
            { v: "500+", l: "Global Brands", d: "From fast fashion to flagship luxury" },
            { v: "5.6M", l: "Square Feet", d: "Largest retail space in the United States" },
            { v: "40M+", l: "Annual Footfall", d: "Premium, high-intent shoppers" },
            { v: "#1", l: "US Retail Destination", d: "Consistently ranked top destination" },
          ].map(item => (
            <div key={item.l} style={{ display: "flex", alignItems: "center", gap: 14, padding: "10px 16px", borderRadius: 8, background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
              <div style={{ fontSize: "clamp(16px,2.2vw,26px)", fontWeight: 900, color: "#c9a227", minWidth: "max-content" }}>{item.v}</div>
              <div>
                <div style={{ fontSize: "clamp(9px,1vw,12px)", fontWeight: 700, color: "#fff" }}>{item.l}</div>
                <div style={{ fontSize: "clamp(7px,0.8vw,10px)", color: "rgba(255,255,255,0.35)" }}>{item.d}</div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}

function SlideRetailBrands({ openModal }) {
  const brands = ["NIKE", "APPLE", "LULULEMON", "LOUIS VUITTON", "NORDSTROM", "SEPHORA", "TESLA", "GUCCI", "OMEGA", "BURBERRY", "H&M", "ZARA", "UNIQLO", "COACH", "TIFFANY & CO.", "MICHAEL KORS", "ROLEX", "RALPH LAUREN", "ANTHROPOLOGIE", "FREE PEOPLE", "BANANA REPUBLIC", "GAP", "J.CREW", "BROOKS BROTHERS"];
  return (
    <Slide bg="#111">
      <Tag>Retail Partners</Tag>
      <H size="md">500+ World-Class Brand Partners</H>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(8,1fr)", gap: "clamp(3px,0.6vw,7px)", marginTop: "2%", marginBottom: "3%" }}>
        {brands.map((b, i) => (
          <motion.div key={b} initial={{ opacity: 0, scale: 0.7 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.025, duration: 0.3 }}
            whileHover={{ scale: 1.08, background: "rgba(201,162,39,0.1)", borderColor: "rgba(201,162,39,0.3)" }}
            style={{ aspectRatio: "2/1", display: "flex", alignItems: "center", justifyContent: "center", borderRadius: 6, background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)", cursor: "pointer", transition: "all 0.2s" }}>
            <span style={{ fontSize: "clamp(5px,0.65vw,8px)", fontWeight: 700, letterSpacing: "0.04em", textAlign: "center", color: "rgba(255,255,255,0.55)", padding: "0 4px" }}>{b}</span>
          </motion.div>
        ))}
      </div>
      <div style={{ display: "flex", justifyContent: "center", gap: 10 }}>
        <GoldBtn onClick={() => openModal("leasing")}>View Leasing Opportunities</GoldBtn>
      </div>
    </Slide>
  );
}

function SlideRetailCategories() {
  const cats = [
    { name: "Fashion & Apparel", count: "150+ stores", img: "https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=400&q=70" },
    { name: "Luxury & Jewelry", count: "40+ stores", img: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=400&q=70" },
    { name: "Tech & Electronics", count: "25+ stores", img: "https://images.unsplash.com/photo-1550009158-9ebf69173e03?w=400&q=70" },
    { name: "Home & Lifestyle", count: "30+ stores", img: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&q=70" },
    { name: "Beauty & Wellness", count: "45+ stores", img: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400&q=70" },
    { name: "Sports & Outdoors", count: "20+ stores", img: "https://images.unsplash.com/photo-1517963879433-6ad2b056d712?w=400&q=70" },
  ];
  return (
    <Slide bg="#0e0e0e" style={{ padding: "3% 5%" }}>
      <Tag>Retail Categories</Tag>
      <H size="md">A Category for<br />Every Brand</H>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(6,1fr)", gap: "clamp(4px,0.8vw,10px)", marginTop: "2%", flex: 1 }}>
        {cats.map((c, i) => (
          <motion.div key={c.name} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
            style={{ borderRadius: 8, overflow: "hidden", position: "relative", cursor: "pointer" }} whileHover={{ scale: 1.03 }}>
            <img src={c.img} alt={c.name} style={{ width: "100%", height: "100%", objectFit: "cover", opacity: 0, transition: "opacity 0.4s" }} onLoad={e => e.target.style.opacity = 0.7} />
            <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top,rgba(0,0,0,0.85) 0%,transparent 50%)" }} />
            <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "0 10px 10px" }}>
              <div style={{ fontSize: "clamp(7px,0.9vw,11px)", fontWeight: 700, color: "#fff", marginBottom: 3 }}>{c.name}</div>
              <div style={{ fontSize: "clamp(6px,0.75vw,9px)", color: "#c9a227", fontWeight: 600 }}>{c.count}</div>
            </div>
          </motion.div>
        ))}
      </div>
    </Slide>
  );
}

function SlideRetailLeasing({ openModal }) {
  const options = [
    { cat: "Flagship Store", size: "5,000–50,000 sq ft", color: "#c9a227", desc: "Anchor position with maximum visibility. Prime corners, multi-level options, and exclusive wing opportunities." },
    { cat: "Inline Retail", size: "800–5,000 sq ft", color: "#e8630a", desc: "High-traffic corridor placements. Flexible configurations for all retail formats." },
    { cat: "Kiosk & Cart", size: "100–500 sq ft", color: "#a16207", desc: "Center-court and mall-corridor positions. Seasonal and permanent options available." },
    { cat: "Pop-Up & Activation", size: "1 day–6 months", color: "#78350f", desc: "Short-term high-impact spaces. Product launches, drops, and seasonal campaigns." },
  ];
  return (
    <Slide bg="#f8f5ef" style={{ padding: "4% 7%" }}>
      <Tag color="#c9a227">Leasing Options</Tag>
      <H dark={false} size="md">Find Your<br />Perfect Space</H>
      <Sub dark={false}>From flagship flagships to flash pop-ups — we have a space that fits your brand strategy and budget.</Sub>
      <CardGrid cols={4}>
        {options.map((o, i) => (
          <motion.div key={o.cat} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
            style={{ padding: "clamp(14px,2vw,22px)", borderRadius: 10, background: "#fff", boxShadow: "0 4px 20px rgba(0,0,0,0.08)", borderTop: `3px solid ${o.color}` }}>
            <div style={{ fontSize: "clamp(10px,1.2vw,14px)", fontWeight: 800, color: "#111", marginBottom: 6 }}>{o.cat}</div>
            <div style={{ fontSize: "clamp(8px,0.9vw,11px)", color: o.color, fontWeight: 600, marginBottom: 10 }}>{o.size}</div>
            <p style={{ fontSize: "clamp(7px,0.85vw,10px)", color: "#666", lineHeight: 1.65, margin: "0 0 14px" }}>{o.desc}</p>
            <button onClick={() => openModal("leasing")} style={{ width: "100%", padding: "6px 0", borderRadius: 4, background: o.color, color: "#fff", fontSize: 9, fontWeight: 700, border: "none", cursor: "pointer", letterSpacing: "0.07em", textTransform: "uppercase" }}>
              Inquire →
            </button>
          </motion.div>
        ))}
      </CardGrid>
    </Slide>
  );
}

function SlideRetailPopup({ openModal }) {
  return (
    <div style={{ width: "100%", height: "100%", background: "#111", display: "grid", gridTemplateColumns: "1fr 1fr" }}>
      <div style={{ position: "relative", overflow: "hidden" }}>
        <img src="https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?w=900&q=80" alt="Pop-up" style={{ width: "100%", height: "100%", objectFit: "cover", opacity: 0.7 }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to right,transparent 60%,#111 100%)" }} />
        <div style={{ position: "absolute", top: "8%", left: "8%", padding: "8px 14px", borderRadius: 4, background: "#c9a227" }}>
          <span style={{ fontSize: 9, fontWeight: 700, color: "#000", textTransform: "uppercase", letterSpacing: "0.1em" }}>Pop-Up Spotlight</span>
        </div>
      </div>
      <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", padding: "0 8% 0 6%" }}>
        <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7 }}>
          <Tag>Pop-Up & Activations</Tag>
          <H size="lg">Test, Launch,<br /><em style={{ fontStyle: "italic", color: "#c9a227" }}>& Activate</em></H>
          <Sub>Short-term retail doesn't mean short-term impact. Our pop-up spaces put your brand in front of millions — instantly.</Sub>
          <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: "5%" }}>
            {["Turnkey buildout support", "Built-in 40M+ audience", "Social amplification package", "1-day to 6-month terms", "Launch event support", "Data & analytics reporting"].map(item => (
              <div key={item} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: "clamp(8px,1vw,12px)", color: "rgba(255,255,255,0.65)" }}>
                <div style={{ width: 4, height: 4, borderRadius: "50%", background: "#c9a227", flexShrink: 0 }} />
                {item}
              </div>
            ))}
          </div>
          <GoldBtn onClick={() => openModal("leasing")}>Book a Pop-Up Space</GoldBtn>
        </motion.div>
      </div>
    </div>
  );
}


function SlideLuxuryHero({ openModal }) {
  return (
    <div style={{ width: "100%", height: "100%", display: "grid", gridTemplateColumns: "1fr 1fr", overflow: "hidden" }}>
      <div style={{ background: "linear-gradient(160deg,#0a0805,#1e1508)", display: "flex", alignItems: "center", padding: "0 8%" }}>
        <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
          <Tag color="#c9a227">Luxury Wing</Tag>
          <H size="xl">Premium<br />Flagship<br /><em style={{ fontStyle: "italic", color: "#c9a227" }}>Spaces</em></H>
          <Sub>A dedicated luxury corridor designed to attract and retain high-net-worth shoppers. Your flagship deserves this audience.</Sub>
          <GoldBtn onClick={() => openModal("leasing")} outline>Request Luxury Leasing</GoldBtn>
        </motion.div>
      </div>
      <motion.div initial={{ opacity: 0, scale: 1.05 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1 }}
        style={{ position: "relative", overflow: "hidden" }}>
        <img src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=900&q=80" alt="Luxury" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to right,rgba(10,8,5,0.5) 0%,transparent 50%)" }} />
        <div style={{ position: "absolute", bottom: "8%", right: "8%", padding: "14px 18px", borderRadius: 8, background: "rgba(0,0,0,0.8)", backdropFilter: "blur(14px)", border: "1px solid rgba(201,162,39,0.4)" }}>
          <div style={{ fontSize: "clamp(16px,2.4vw,30px)", fontWeight: 900, color: "#c9a227", marginBottom: 4 }}>100+</div>
          <div style={{ fontSize: 9, color: "rgba(255,255,255,0.5)", textTransform: "uppercase", letterSpacing: "0.1em" }}>Luxury Tenants</div>
        </div>
      </motion.div>
    </div>
  );
}

function SlideLuxuryMetrics({ openModal }) {
  return (
    <Slide bg="#f8f5ef" style={{ padding: "4% 7%" }}>
      <Tag color="#92400e">Luxury by the Numbers</Tag>
      <H dark={false} size="lg">Premium Demographics,<br />Premium Results</H>
      <CardGrid cols={3}>
        {[
          { v: "70%", l: "Affluent Visitors", d: "Avg HHI $85K+", extra: "Premium purchasing power" },
          { v: "$500+", l: "Luxury Avg Transaction", d: "Per luxury wing visit", extra: "3x higher than general retail" },
          { v: "100+", l: "Luxury Brand Tenants", d: "Curated high-end mix", extra: "From accessible to ultra-premium" },
        ].map((item, i) => (
          <motion.div key={item.l} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.12 }}
            style={{ padding: "clamp(18px,3vw,36px)", borderRadius: 12, background: "#fff", boxShadow: "0 4px 30px rgba(0,0,0,0.1)", textAlign: "center" }}>
            <div style={{ fontSize: "clamp(28px,4.5vw,56px)", fontWeight: 900, color: "#92400e", marginBottom: "5%" }}>{item.v}</div>
            <div style={{ fontSize: "clamp(9px,1.1vw,13px)", fontWeight: 800, color: "#111", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: "3%" }}>{item.l}</div>
            <div style={{ fontSize: "clamp(7px,0.85vw,10px)", color: "#999", marginBottom: "4%" }}>{item.d}</div>
            <div style={{ fontSize: "clamp(7px,0.85vw,10px)", color: "#92400e", fontWeight: 600, padding: "4px 10px", borderRadius: 4, background: "#fef3c7", display: "inline-block" }}>{item.extra}</div>
          </motion.div>
        ))}
      </CardGrid>
      <div style={{ textAlign: "center", marginTop: "4%" }}>
        <GoldBtn onClick={() => openModal("leasing")}>Request Luxury Leasing Info</GoldBtn>
      </div>
    </Slide>
  );
}

function SlideLuxuryBrands({ openModal }) {
  const luxBrands = ["LOUIS VUITTON", "GUCCI", "PRADA", "CHANEL", "HERMES", "TIFFANY & CO.", "ROLEX", "CARTIER", "BURBERRY", "BALENCIAGA", "OMEGA", "COACH", "MICHAEL KORS", "KATE SPADE", "MARC JACOBS", "FENDI"];
  return (
    <Slide bg="#0a0805">
      <Tag color="#c9a227">Luxury Tenants</Tag>
      <H size="md">Our Luxury<br />Brand Roster</H>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(8,1fr)", gap: "clamp(4px,0.7vw,9px)", marginTop: "3%", marginBottom: "4%" }}>
        {luxBrands.map((b, i) => (
          <motion.div key={b} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.04 }}
            style={{ aspectRatio: "2/1", display: "flex", alignItems: "center", justifyContent: "center", borderRadius: 6, background: "rgba(201,162,39,0.07)", border: "1px solid rgba(201,162,39,0.18)", cursor: "pointer" }}>
            <span style={{ fontSize: "clamp(5px,0.65vw,8px)", fontWeight: 700, color: "rgba(201,162,39,0.75)", textAlign: "center", padding: "0 4px", letterSpacing: "0.04em" }}>{b}</span>
          </motion.div>
        ))}
      </div>
      <div style={{ textAlign: "center" }}>
        <GoldBtn onClick={() => openModal("leasing")}>Inquire About Luxury Placement</GoldBtn>
      </div>
    </Slide>
  );
}

function SlideDiningHero() {
  return (
    <div style={{ width: "100%", height: "100%", position: "relative", overflow: "hidden" }}>
      <img src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1600&q=80" alt="Dining" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to right, rgba(0,0,0,0.88) 45%, rgba(0,0,0,0.3) 100%)" }} />
      <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", padding: "0 8%" }}>
        <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }}>
          <Tag>Dining & Lifestyle</Tag>
          <H size="xl">Where Food<br />Becomes<br /><em style={{ fontStyle: "italic", color: "#e8630a" }}>Destination</em></H>
          <Sub>80+ restaurants spanning global cuisines. From quick service to fine dining — every palate, every occasion.</Sub>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 10, maxWidth: "80%" }}>
            {[["80+", "Restaurants"], ["15+", "Cuisines"], ["3.2h", "Avg Dwell"]].map(([v, l]) => (
              <div key={l} style={{ padding: "10px 14px", borderRadius: 8, background: "rgba(255,255,255,0.08)", backdropFilter: "blur(10px)", border: "1px solid rgba(255,255,255,0.15)", textAlign: "center" }}>
                <div style={{ fontSize: "clamp(16px,2.2vw,26px)", fontWeight: 900, color: "#e8630a" }}>{v}</div>
                <div style={{ fontSize: 9, color: "rgba(255,255,255,0.55)", textTransform: "uppercase", letterSpacing: "0.06em", marginTop: 3 }}>{l}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}

function SlideDiningConcepts() {
  const concepts = [
    { name: "Fine Dining", desc: "Full-service restaurants with chef-driven menus", img: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=500&q=70", count: "12 options" },
    { name: "Fast Casual", desc: "Premium quick-service concepts", img: "https://images.unsplash.com/photo-1565299507177-b0ac66763828?w=500&q=70", count: "30+ options" },
    { name: "Food Court", desc: "All-day high-traffic dining destinations", img: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=500&q=70", count: "25+ options" },
    { name: "Specialty & Café", desc: "Unique concepts, bakeries & coffee shops", img: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=500&q=70", count: "15+ options" },
  ];
  return (
    <Slide bg="#fff" style={{ padding: "4% 5%" }}>
      <Tag color="#e8630a">Dining Concepts</Tag>
      <H dark={false} size="md">Every Dining<br />Experience Covered</H>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 10, marginTop: "2%", flex: 1 }}>
        {concepts.map((c, i) => (
          <motion.div key={c.name} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
            style={{ borderRadius: 10, overflow: "hidden", boxShadow: "0 4px 20px rgba(0,0,0,0.1)", display: "flex", flexDirection: "column" }}>
            <div style={{ height: "55%", position: "relative", overflow: "hidden" }}>
              <img src={c.img} alt={c.name} style={{ width: "100%", height: "100%", objectFit: "cover", opacity: 0, transition: "opacity 0.4s" }} onLoad={e => e.target.style.opacity = 1} />
            </div>
            <div style={{ flex: 1, padding: "14px 14px 16px", background: "#fff" }}>
              <div style={{ fontSize: "clamp(9px,1.1vw,13px)", fontWeight: 800, color: "#111", marginBottom: 4 }}>{c.name}</div>
              <div style={{ fontSize: "clamp(7px,0.85vw,10px)", color: "#777", lineHeight: 1.55, marginBottom: 8 }}>{c.desc}</div>
              <div style={{ fontSize: "clamp(7px,0.8vw,10px)", color: "#e8630a", fontWeight: 700 }}>{c.count}</div>
            </div>
          </motion.div>
        ))}
      </div>
    </Slide>
  );
}

function SlideDiningStats() {
  return (
    <Slide bg="#1a0a00">
      <Tag color="#e8630a">Dining Performance</Tag>
      <H size="md">Dining Drives<br />Dwell Time</H>
      <Sub>Visitors who dine at MOA stay 3x longer and spend 2.4x more than non-diners. Dining isn't a feature — it's a strategy.</Sub>
      <CardGrid cols={3}>
        {[
          { v: "3x", l: "Higher Dwell Time", d: "Diners vs. non-diners" },
          { v: "2.4x", l: "Higher Spend", d: "Per visit for dining visitors" },
          { v: "42%", l: "Return Visits", d: "Driven by F&B experience" },
        ].map((item, i) => (
          <motion.div key={item.l} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.12 }}
            style={{ padding: "clamp(16px,2.5vw,30px)", borderRadius: 10, background: "rgba(232,99,10,0.08)", border: "1px solid rgba(232,99,10,0.25)", textAlign: "center" }}>
            <div style={{ fontSize: "clamp(26px,4vw,50px)", fontWeight: 900, color: "#e8630a", marginBottom: "5%" }}>{item.v}</div>
            <div style={{ fontSize: "clamp(9px,1.1vw,13px)", fontWeight: 700, color: "#fff", marginBottom: "3%" }}>{item.l}</div>
            <div style={{ fontSize: "clamp(7px,0.85vw,10px)", color: "rgba(255,255,255,0.4)" }}>{item.d}</div>
          </motion.div>
        ))}
      </CardGrid>
      <div style={{ marginTop: "4%", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
        {[
          { label: "Peak Dining Hours", value: "11am–2pm & 5pm–8pm daily — guaranteed traffic" },
          { label: "F&B Partnership Opportunities", value: "Co-branded activations, tastings, and dining events" },
        ].map(item => (
          <div key={item.label} style={{ padding: "12px 16px", borderRadius: 8, background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)" }}>
            <div style={{ fontSize: "clamp(8px,0.9vw,11px)", fontWeight: 700, color: "#e8630a", marginBottom: 5 }}>{item.label}</div>
            <div style={{ fontSize: "clamp(7px,0.85vw,10px)", color: "rgba(255,255,255,0.45)", lineHeight: 1.55 }}>{item.value}</div>
          </div>
        ))}
      </div>
    </Slide>
  );
}

function SlideEntHero({ openModal }) {
  return (
    <div style={{ position: "relative", width: "100%", height: "100%", overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <video autoPlay muted loop playsInline style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", opacity: 0.5 }}>
        <source src={ENTERTAIN_VIDEO} type="video/mp4" />
      </video>
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom,rgba(0,0,0,0.55) 0%,rgba(0,0,0,0.2) 50%,rgba(0,0,0,0.85) 100%)" }} />
      <div style={{ position: "relative", zIndex: 10, textAlign: "center", padding: "0 10%" }}>
        <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9 }}>
          <Tag>Entertainment</Tag>
          <H size="xl">Beyond<br /><em style={{ fontStyle: "italic", color: "#c9a227" }}>Shopping</em></H>
          <p style={{ fontSize: "clamp(9px,1.4vw,16px)", color: "rgba(255,255,255,0.6)", fontWeight: 300, maxWidth: "50%", margin: "0 auto 5%" }}>
            8 acres of theme park · Indoor water park · Live concerts · Brand activations · Seasonal spectaculars
          </p>
          <div style={{ display: "flex", justifyContent: "center", gap: 10 }}>
            <GoldBtn onClick={() => openModal("events")}>Explore Venue Capabilities</GoldBtn>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

function SlideEntVenues({ openModal }) {
  return (
    <Slide bg="#0d0d0d">
      <Tag>World-Class Venues</Tag>
      <H size="md">Entertainment<br />Infrastructure</H>
      <CardGrid cols={2}>
        {[
          { icon: <Zap size={18} />, title: "Nickelodeon Universe", sub: "8-Acre Indoor Theme Park", stat: "5M+ annual visitors", desc: "The largest indoor theme park in North America. 27 rides, 7 roller coasters." },
          { icon: <Star size={18} />, title: "SEA LIFE Aquarium", sub: "10,000+ Sea Creatures", stat: "Interactive experiences", desc: "Immersive ocean tunnel, touch pools, and educational programs for all ages." },
          { icon: <Music size={18} />, title: "Performing Arts Center", sub: "Concert-grade Stage & Pit", stat: "3,000 capacity", desc: "Full production infrastructure. World-class acoustics. International touring acts." },
          { icon: <Building2 size={18} />, title: "Expo & Convention Hall", sub: "200,000 sq ft Flexible Space", stat: "Trade shows & conferences", desc: "Fully configurable. Loading docks, AV infrastructure, catering on-site." },
        ].map((item, i) => (
          <motion.div key={item.title} initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
            whileHover={{ background: "rgba(255,255,255,0.07)" }}
            style={{ padding: "clamp(14px,2vw,22px)", borderRadius: 10, background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", transition: "background 0.2s", display: "flex", gap: 14 }}>
            <div style={{ color: "#c9a227", flexShrink: 0, marginTop: 2 }}>{item.icon}</div>
            <div>
              <div style={{ fontSize: "clamp(10px,1.3vw,15px)", fontWeight: 700, color: "#fff", marginBottom: 3 }}>{item.title}</div>
              <div style={{ fontSize: "clamp(7px,0.85vw,10px)", color: "rgba(255,255,255,0.4)", marginBottom: 5 }}>{item.sub}</div>
              <div style={{ fontSize: "clamp(7px,0.85vw,10px)", color: "#c9a227", fontWeight: 600, marginBottom: 6 }}>{item.stat}</div>
              <div style={{ fontSize: "clamp(7px,0.85vw,10px)", color: "rgba(255,255,255,0.45)", lineHeight: 1.55 }}>{item.desc}</div>
            </div>
          </motion.div>
        ))}
      </CardGrid>
      <div style={{ textAlign: "center", marginTop: "3%" }}>
        <GoldBtn onClick={() => openModal("events")} outline>Book a Venue →</GoldBtn>
      </div>
    </Slide>
  );
}

function SlideEntNick() {
  return (
    <div style={{ width: "100%", height: "100%", background: "linear-gradient(135deg,#0a1520,#001a2e)", display: "grid", gridTemplateColumns: "1fr 1fr" }}>
      <div style={{ position: "relative", overflow: "hidden" }}>
        <img src="https://images.unsplash.com/photo-1568777036215-a0f9bc9f9f35?w=900&q=80" alt="Rides" style={{ width: "100%", height: "100%", objectFit: "cover", opacity: 0.65 }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to right,transparent 50%,#001a2e 100%)" }} />
      </div>
      <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", padding: "0 8% 0 4%" }}>
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
          <div style={{ display: "inline-flex", padding: "3px 10px", borderRadius: 3, background: "rgba(255,107,0,0.15)", border: "1px solid rgba(255,107,0,0.3)", marginBottom: "3%" }}>
            <span style={{ fontSize: 8, fontWeight: 700, color: "#ff6b00", letterSpacing: "0.12em", textTransform: "uppercase" }}>Nickelodeon Universe</span>
          </div>
          <H size="lg">The Largest<br />Indoor Theme<br /><em style={{ fontStyle: "italic", color: "#c9a227" }}>Park in the US</em></H>
          <Sub>27 rides. 7 roller coasters. An 8-acre spectacle that makes MOA a must-visit family destination.</Sub>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
            {[["27", "Rides & Attractions"], ["7", "Roller Coasters"], ["5M+", "Annual Visitors"], ["8 Acres", "of Indoor Adventure"]].map(([v, l]) => (
              <div key={l} style={{ padding: "10px 12px", borderRadius: 8, background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}>
                <div style={{ fontSize: "clamp(14px,2vw,22px)", fontWeight: 900, color: "#c9a227" }}>{v}</div>
                <div style={{ fontSize: 8, color: "rgba(255,255,255,0.4)", textTransform: "uppercase", letterSpacing: "0.05em", marginTop: 3 }}>{l}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}

function SlideEntAquarium() {
  return (
    <div style={{ width: "100%", height: "100%", background: "linear-gradient(135deg,#000d1a,#001533)", display: "grid", gridTemplateColumns: "1fr 1fr" }}>
      <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", padding: "0 8%" }}>
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
          <div style={{ display: "inline-flex", padding: "3px 10px", borderRadius: 3, background: "rgba(0,150,255,0.15)", border: "1px solid rgba(0,150,255,0.3)", marginBottom: "3%" }}>
            <span style={{ fontSize: 8, fontWeight: 700, color: "#0096ff", letterSpacing: "0.12em", textTransform: "uppercase" }}>SEA LIFE Aquarium</span>
          </div>
          <H size="lg">10,000+<br />Sea Creatures<br /><em style={{ fontStyle: "italic", color: "#0096ff" }}>& Counting</em></H>
          <Sub>An immersive ocean experience that draws families, school groups, and experiential seekers — year-round.</Sub>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {["360° ocean tunnel walk-through", "Interactive touch pools", "Educational programming & school partnerships", "VIP behind-the-scenes experiences"].map(item => (
              <div key={item} style={{ display: "flex", gap: 8, fontSize: "clamp(8px,1vw,12px)", color: "rgba(255,255,255,0.6)", alignItems: "center" }}>
                <div style={{ width: 4, height: 4, borderRadius: "50%", background: "#0096ff", flexShrink: 0 }} />
                {item}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
      <div style={{ position: "relative", overflow: "hidden" }}>
        <img src="https://images.unsplash.com/photo-1544552866-d3ed42536cfd?w=900&q=80" alt="Aquarium" style={{ width: "100%", height: "100%", objectFit: "cover", opacity: 0.6 }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to right,#000d1a 0%,transparent 40%)" }} />
      </div>
    </div>
  );
}

function SlideEventsHero({ openModal }) {
  return (
    <div style={{ position: "relative", width: "100%", height: "100%", overflow: "hidden", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg,#92400e 0%,#b45309 40%,#dc2626 100%)" }} />
      <div style={{ position: "absolute", inset: 0, background: "radial-gradient(circle at 50% 50%,rgba(255,255,255,0.07) 0%,transparent 65%)" }} />
      {/* Decorative rings */}
      {[180, 300, 420].map((size, i) => (
        <motion.div key={i} animate={{ rotate: i % 2 === 0 ? 360 : -360 }} transition={{ duration: 20 + i * 8, repeat: Infinity, ease: "linear" }}
          style={{ position: "absolute", width: size, height: size, borderRadius: "50%", border: "1px solid rgba(255,255,255,0.06)", top: "50%", left: "50%", transform: "translate(-50%,-50%)" }} />
      ))}
      <div style={{ position: "relative", zIndex: 10, textAlign: "center", padding: "0 10%" }}>
        <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9 }}>
          <Tag color="rgba(255,255,255,0.6)">Events</Tag>
          <H size="xl">Host Your<br /><em style={{ fontStyle: "italic", color: "rgba(255,255,255,0.85)" }}>Next Event</em></H>
          <p style={{ fontSize: "clamp(9px,1.3vw,16px)", color: "rgba(255,255,255,0.7)", marginBottom: "4%" }}>
            Product launches · Concerts · Activations · Galas · Trade shows
          </p>
          <GoldBtn onClick={() => openModal("events")}>Explore Event Spaces</GoldBtn>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "clamp(8px,2vw,24px)", marginTop: "5%", paddingTop: "4%", borderTop: "1px solid rgba(255,255,255,0.18)" }}>
            {[["365+", "Events annually"], ["50,000", "Max capacity"], ["24/7", "Production support"]].map(([v, l]) => (
              <div key={l} style={{ textAlign: "center" }}>
                <div style={{ fontSize: "clamp(18px,3vw,38px)", fontWeight: 900, color: "#fff", marginBottom: "4%" }}>{v}</div>
                <div style={{ fontSize: "clamp(7px,0.9vw,10px)", color: "rgba(255,255,255,0.5)", textTransform: "uppercase", letterSpacing: "0.1em" }}>{l}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}

function SlideEventsSpaces({ openModal }) {
  const spaces = [
    { name: "Grand Rotunda", cap: "10,000+", area: "50,000 sq ft", img: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=600&q=70" },
    { name: "Entertainment Pavilion", cap: "5,000", area: "30,000 sq ft", img: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=600&q=70" },
    { name: "Brand Activation Zone", cap: "2,000–5,000", area: "10K–25K sq ft", img: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=600&q=70" },
    { name: "Corporate Suite", cap: "500–2,000", area: "5K–15K sq ft", img: "https://images.unsplash.com/photo-1511578314322-379afb476865?w=600&q=70" },
  ];
  return (
    <Slide bg="#0d0d0d" style={{ padding: "3% 5%" }}>
      <Tag>Event Spaces</Tag>
      <H size="md">World-Class<br />Venues for Every Event</H>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 10, marginTop: "2%", flex: 1 }}>
        {spaces.map((v, i) => (
          <motion.div key={v.name} initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.09 }}
            style={{ borderRadius: 10, overflow: "hidden", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", display: "flex", flexDirection: "column" }}>
            <div style={{ flex: 1, position: "relative", overflow: "hidden" }}>
              <img src={v.img} alt={v.name} style={{ width: "100%", height: "100%", objectFit: "cover", opacity: 0, transition: "opacity 0.4s" }} onLoad={e => e.target.style.opacity = 0.8} />
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top,rgba(0,0,0,0.7),transparent)" }} />
            </div>
            <div style={{ padding: "12px 14px 14px" }}>
              <div style={{ fontSize: "clamp(9px,1.1vw,13px)", fontWeight: 700, color: "#fff", marginBottom: 4 }}>{v.name}</div>
              <div style={{ display: "flex", gap: 8, fontSize: 9, color: "rgba(255,255,255,0.35)", marginBottom: 10 }}>
                <span>{v.cap} guests</span><span>·</span><span>{v.area}</span>
              </div>
              <button onClick={() => openModal("events")} style={{ width: "100%", padding: "5px 0", borderRadius: 3, background: "linear-gradient(135deg,#c9a227,#e8630a)", color: "#fff", fontSize: 9, fontWeight: 700, border: "none", cursor: "pointer", letterSpacing: "0.06em", textTransform: "uppercase" }}>
                Request Info
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </Slide>
  );
}

function SlideEventsProduction() {
  return (
    <Slide bg="#111">
      <Tag>Production Capabilities</Tag>
      <H size="md">Full-Service<br />Event Production</H>
      <Sub>MOA's in-house events team handles everything — so your brand experience runs flawlessly from concept to closing.</Sub>
      <CardGrid cols={3}>
        {[
          { icon: <Volume2 size={16} />, title: "Audio/Visual", items: ["Concert-grade sound systems", "LED video walls & screens", "Broadcast-ready infrastructure", "Lighting rigs & production"] },
          { icon: <Layers size={16} />, title: "Buildout & Design", items: ["Custom set construction", "Branded environment design", "Turnkey installation", "Strike & storage services"] },
          { icon: <Shield size={16} />, title: "Operations", items: ["Dedicated event manager", "Security & crowd control", "Permitting & compliance", "24/7 production support"] },
        ].map((c, i) => (
          <motion.div key={c.title} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
            style={{ padding: "clamp(14px,2vw,22px)", borderRadius: 10, background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
            <div style={{ color: "#c9a227", marginBottom: "8%" }}>{c.icon}</div>
            <div style={{ fontSize: "clamp(10px,1.2vw,14px)", fontWeight: 700, color: "#fff", marginBottom: "8%" }}>{c.title}</div>
            {c.items.map(item => (
              <div key={item} style={{ display: "flex", gap: 7, fontSize: "clamp(7px,0.85vw,10px)", color: "rgba(255,255,255,0.5)", marginBottom: "5%" }}>
                <span style={{ color: "#c9a227" }}>·</span>{item}
              </div>
            ))}
          </motion.div>
        ))}
      </CardGrid>
    </Slide>
  );
}

function SlideEventsPast({ openModal }) {
  return (
    <Slide bg="#f8f5ef" style={{ padding: "4% 7%" }}>
      <Tag color="#c9a227">Event History</Tag>
      <H dark={false} size="md">Trusted by the<br />World's Biggest Brands</H>
      <Sub dark={false}>From intimate brand activations to 50,000-person spectaculars — MOA has hosted them all.</Sub>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 12, marginTop: "3%", marginBottom: "4%" }}>
        {[
          { brand: "Nike", event: "Air Max Day Activation", year: "2024", attendees: "12,000+" },
          { brand: "Samsung", event: "Galaxy Launch Event", year: "2024", attendees: "8,500+" },
          { brand: "Disney", event: "Wish Premiere Experience", year: "2023", attendees: "22,000+" },
          { brand: "Taylor Swift", event: "Eras Tour Pop-Up", year: "2023", attendees: "40,000+" },
          { brand: "NFL", event: "Super Bowl Week", year: "2022", attendees: "50,000+" },
          { brand: "Porsche", event: "Taycan World Launch", year: "2022", attendees: "6,000+" },
        ].map((e, i) => (
          <motion.div key={e.brand + e.year} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.08 }}
            style={{ padding: "14px 16px", borderRadius: 10, background: "#fff", boxShadow: "0 4px 16px rgba(0,0,0,0.08)", display: "flex", flexDirection: "column", gap: 4 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
              <div style={{ fontSize: "clamp(10px,1.2vw,14px)", fontWeight: 800, color: "#111" }}>{e.brand}</div>
              <div style={{ fontSize: 8, color: "#999", fontWeight: 600 }}>{e.year}</div>
            </div>
            <div style={{ fontSize: "clamp(8px,0.9vw,11px)", color: "#555" }}>{e.event}</div>
            <div style={{ fontSize: "clamp(8px,0.9vw,11px)", color: "#c9a227", fontWeight: 700, marginTop: 4 }}>{e.attendees} attendees</div>
          </motion.div>
        ))}
      </div>
      <div style={{ textAlign: "center" }}>
        <GoldBtn onClick={() => openModal("events")}>Plan Your Event</GoldBtn>
      </div>
    </Slide>
  );
}


function SlideSponsorIntro({ openModal }) {
  return (
    <div style={{ width: "100%", height: "100%", background: "#0a0a0a", display: "grid", gridTemplateColumns: "1fr 1fr" }}>
      <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", padding: "0 8%" }}>
        <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }}>
          <Tag>Partnerships</Tag>
          <H size="xl">Partner with<br />40 Million<br /><em style={{ fontStyle: "italic", color: "#c9a227" }}>People</em></H>
          <Sub>MOA's sponsorship platform puts your brand at the center of America's greatest retail and entertainment destination.</Sub>
          <GoldBtn onClick={() => openModal("sponsorship")}>View Sponsorship Tiers <ArrowRight size={12} /></GoldBtn>
        </motion.div>
      </div>
      <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", padding: "0 8% 0 4%", gap: 10 }}>
        {[
          { label: "Brand Visibility", value: "300+ digital screens + experiential touchpoints across the campus" },
          { label: "Category Exclusivity", value: "Own your category — no competing brands in your space" },
          { label: "Co-Marketing", value: "Access to 2.8M social followers, 1.1M email subscribers, and earned PR" },
          { label: "Data & Insights", value: "Post-activation reports with reach, dwell, and conversion metrics" },
        ].map((item, i) => (
          <motion.div key={item.label} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }}
            style={{ padding: "12px 16px", borderRadius: 8, background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)", display: "flex", gap: 12 }}>
            <div style={{ width: 2, background: "#c9a227", borderRadius: 2, flexShrink: 0 }} />
            <div>
              <div style={{ fontSize: "clamp(9px,1vw,12px)", fontWeight: 700, color: "#fff", marginBottom: 4 }}>{item.label}</div>
              <div style={{ fontSize: "clamp(7px,0.85vw,10px)", color: "rgba(255,255,255,0.4)", lineHeight: 1.55 }}>{item.value}</div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function SlideSponsorTiers({ openModal }) {
  const tiers = [
    { tier: "Title Partner", price: "$5M+/yr", color: "#c9a227", perks: ["Naming rights on major venue", "All activation zones", "Brand ambassador program", "Exclusive category rights", "Media value $15M+", "VIP hospitality suite", "First-right-of-refusal"] },
    { tier: "Premier Partner", price: "$1M–$5M/yr", color: "#9ca3af", perks: ["Category exclusivity", "Digital + physical branding", "10+ activation days", "Co-branded campaigns", "Event headline opps", "Email campaigns (3/yr)"] },
    { tier: "Associate Partner", price: "$250K–$1M/yr", color: "#e8630a", perks: ["Branded zones", "5 activation days/yr", "Social media features", "Email access (1/yr)", "Seasonal slots", "Data reporting"] },
  ];
  return (
    <Slide bg="#0a0a0a">
      <Tag>Sponsorship Tiers</Tag>
      <H size="md">Investment Levels<br />& Benefits</H>
      <CardGrid cols={3}>
        {tiers.map((t, i) => (
          <motion.div key={t.tier} initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.12 }}
            style={{ padding: "clamp(14px,2vw,22px)", borderRadius: 10, background: "rgba(255,255,255,0.04)", border: `1px solid ${t.color}40`, display: "flex", flexDirection: "column" }}>
            <div style={{ fontSize: "clamp(11px,1.4vw,16px)", fontWeight: 800, color: t.color, marginBottom: "2%" }}>{t.tier}</div>
            <div style={{ fontSize: "clamp(8px,0.9vw,11px)", color: "rgba(255,255,255,0.3)", marginBottom: "6%" }}>{t.price}</div>
            <div style={{ flex: 1 }}>
              {t.perks.map(p => (
                <div key={p} style={{ display: "flex", gap: 6, fontSize: "clamp(7px,0.85vw,10px)", color: "rgba(255,255,255,0.55)", marginBottom: "4%" }}>
                  <span style={{ color: t.color, flexShrink: 0 }}>·</span>{p}
                </div>
              ))}
            </div>
            <button onClick={() => openModal("sponsorship")} style={{ width: "100%", marginTop: "8%", padding: "7px 0", borderRadius: 4, background: t.color, color: "#000", fontSize: 9, fontWeight: 700, border: "none", cursor: "pointer", letterSpacing: "0.06em", textTransform: "uppercase" }}>
              Get Proposal
            </button>
          </motion.div>
        ))}
      </CardGrid>
    </Slide>
  );
}

function SlideSponsorDigital() {
  return (
    <Slide bg="#0d0d0d">
      <Tag>Digital Sponsorship</Tag>
      <H size="md">Own the<br />Digital Experience</H>
      <Sub>300+ screens, a 40M-person captive audience, and digital programs built for measurable impact.</Sub>
      <CardGrid cols={2}>
        {[
          { icon: <BarChart2 size={16} />, title: "Digital Signage Network", items: ["300+ high-res displays throughout MOA", "Targeted by zone, time, and audience", "Dynamic content & real-time updates", "Full creative services available"] },
          { icon: <Globe size={16} />, title: "Online & Social", items: ["Sponsored content on MOA social (2.8M)", "Featured placement on mall.com (4.2M/mo)", "Co-branded email campaigns (1.1M list)", "Influencer partnership programs"] },
          { icon: <Target size={16} />, title: "App & Mobile", items: ["Featured placement in MOA app", "Push notification sponsorships", "Digital offers & loyalty integration", "Geo-targeted activation triggers"] },
          { icon: <TrendingUp size={16} />, title: "Measurement & ROI", items: ["Foot traffic attribution reporting", "Dwell time & engagement metrics", "Digital impression reporting", "Post-campaign ROI dashboard"] },
        ].map((c, i) => (
          <motion.div key={c.title} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.09 }}
            style={{ padding: "clamp(12px,1.8vw,20px)", borderRadius: 10, background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)", display: "flex", gap: 12 }}>
            <div style={{ color: "#c9a227", flexShrink: 0, marginTop: 2 }}>{c.icon}</div>
            <div>
              <div style={{ fontSize: "clamp(10px,1.2vw,14px)", fontWeight: 700, color: "#fff", marginBottom: "6%" }}>{c.title}</div>
              {c.items.map(item => (
                <div key={item} style={{ display: "flex", gap: 6, fontSize: "clamp(7px,0.8vw,10px)", color: "rgba(255,255,255,0.45)", marginBottom: "4%" }}>
                  <span style={{ color: "#c9a227" }}>·</span>{item}
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </CardGrid>
    </Slide>
  );
}

function SlideSponsorActivation({ openModal }) {
  return (
    <Slide bg="#fff" style={{ padding: "4% 7%" }}>
      <Tag color="#c9a227">Activation Gallery</Tag>
      <H dark={false} size="md">Bring Your Brand<br />to Life at MOA</H>
      <Sub dark={false}>From immersive brand worlds to live experiences — our activation spaces are built for impact.</Sub>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 12, marginTop: "2%", flex: 1 }}>
        {[
          { title: "Product Launch Stage", img: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=600&q=70", tag: "HIGH IMPACT" },
          { title: "Brand Experience Zone", img: "https://images.unsplash.com/photo-1511578314322-379afb476865?w=600&q=70", tag: "IMMERSIVE" },
          { title: "Sampling & Demo Hub", img: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=600&q=70", tag: "DIRECT REACH" },
        ].map((item, i) => (
          <motion.div key={item.title} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.1 }}
            style={{ borderRadius: 10, overflow: "hidden", boxShadow: "0 4px 20px rgba(0,0,0,0.12)", position: "relative" }}>
            <img src={item.img} alt={item.title} style={{ width: "100%", height: "80%", objectFit: "cover", display: "block", opacity: 0, transition: "opacity 0.4s" }} onLoad={e => e.target.style.opacity = 1} />
            <div style={{ position: "absolute", top: 10, left: 10, padding: "3px 10px", borderRadius: 3, background: "#c9a227" }}>
              <span style={{ fontSize: 7, fontWeight: 700, color: "#000", letterSpacing: "0.1em" }}>{item.tag}</span>
            </div>
            <div style={{ padding: "12px 14px", background: "#fff" }}>
              <div style={{ fontSize: "clamp(9px,1.1vw,13px)", fontWeight: 700, color: "#111" }}>{item.title}</div>
            </div>
          </motion.div>
        ))}
      </div>
      <div style={{ textAlign: "center", marginTop: "3%" }}>
        <GoldBtn onClick={() => openModal("sponsorship")}>Discuss a Custom Activation</GoldBtn>
      </div>
    </Slide>
  );
}

function SlideDataOverview() {
  return (
    <Slide bg="#0a0a0a">
      <Tag>Data & Insights</Tag>
      <H size="md">Data-Driven<br />Partnership Decisions</H>
      <Sub>Every MOA partnership comes with access to real data — so you know exactly what your investment delivers.</Sub>
      <CardGrid cols={4}>
        {[
          { icon: <Users size={16} />, label: "Visitor Counts", value: "Real-time footfall", color: "#c9a227" },
          { icon: <Clock size={16} />, label: "Dwell Time", value: "By zone & hour", color: "#e8630a" },
          { icon: <DollarSign size={16} />, label: "Spend Data", value: "Category & tenant", color: "#a16207" },
          { icon: <Target size={16} />, label: "Conversion", value: "Activation attribution", color: "#c9a227" },
        ].map((c, i) => (
          <motion.div key={c.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
            style={{ padding: "clamp(14px,2vw,22px)", borderRadius: 10, background: "rgba(255,255,255,0.04)", border: `1px solid ${c.color}22`, textAlign: "center" }}>
            <div style={{ color: c.color, display: "flex", justifyContent: "center", marginBottom: "12%" }}>{c.icon}</div>
            <div style={{ fontSize: "clamp(9px,1.1vw,13px)", fontWeight: 700, color: "#fff", marginBottom: "4%" }}>{c.label}</div>
            <div style={{ fontSize: "clamp(7px,0.85vw,10px)", color: "rgba(255,255,255,0.4)" }}>{c.value}</div>
          </motion.div>
        ))}
      </CardGrid>
      <div style={{ marginTop: 14, padding: "18px 20px", borderRadius: 10, background: "rgba(201,162,39,0.06)", border: "1px solid rgba(201,162,39,0.2)" }}>
        <div style={{ fontSize: "clamp(9px,1.1vw,13px)", fontWeight: 700, color: "#c9a227", marginBottom: 8 }}>What Partners Receive</div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 10 }}>
          {["Monthly foot traffic reports", "Activation performance dashboards", "Competitive category insights", "Audience profile breakdowns"].map(item => (
            <div key={item} style={{ display: "flex", gap: 6, fontSize: "clamp(7px,0.85vw,10px)", color: "rgba(255,255,255,0.5)" }}>
              <span style={{ color: "#c9a227" }}>·</span>{item}
            </div>
          ))}
        </div>
      </div>
    </Slide>
  );
}

function SlideDataDemographics() {
  return (
    <Slide bg="#fff" style={{ padding: "4% 7%" }}>
      <Tag color="#c9a227">Audience Analytics</Tag>
      <H dark={false} size="md">Know Your<br />Audience Before<br />You Arrive</H>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginTop: "3%", flex: 1 }}>
        <div>
          <div style={{ fontSize: "clamp(9px,1vw,12px)", fontWeight: 700, color: "#111", marginBottom: 14, textTransform: "uppercase", letterSpacing: "0.08em" }}>Household Income</div>
          {[
            { label: "$150K+", pct: 22, color: "#92400e" },
            { label: "$100–149K", pct: 28, color: "#b45309" },
            { label: "$75–99K", pct: 20, color: "#c9a227" },
            { label: "Under $75K", pct: 30, color: "#e8630a" },
          ].map((b, i) => (
            <div key={b.label} style={{ marginBottom: 10 }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 5 }}>
                <span style={{ fontSize: "clamp(7px,0.9vw,11px)", color: "#555" }}>{b.label}</span>
                <span style={{ fontSize: "clamp(7px,0.9vw,11px)", color: "#111", fontWeight: 700 }}>{b.pct}%</span>
              </div>
              <div style={{ height: 7, background: "#f0ece4", borderRadius: 4, overflow: "hidden" }}>
                <motion.div initial={{ width: 0 }} animate={{ width: `${b.pct}%` }} transition={{ delay: i * 0.1, duration: 0.7 }}
                  style={{ height: "100%", background: b.color, borderRadius: 4 }} />
              </div>
            </div>
          ))}
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {[
            { label: "Purchase Intent", value: "84%", sub: "Visitors come with intent to buy" },
            { label: "Brand Discovery", value: "62%", sub: "Discover new brands during visit" },
            { label: "Return Rate", value: "71%", sub: "Return within 90 days" },
            { label: "Recommendation Rate", value: "88%", sub: "Recommend MOA to others" },
          ].map((item, i) => (
            <motion.div key={item.label} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }}
              style={{ padding: "12px 16px", borderRadius: 8, background: "#f8f5ef", border: "1px solid #ece8e0", display: "flex", alignItems: "center", gap: 14 }}>
              <div style={{ fontSize: "clamp(18px,2.5vw,30px)", fontWeight: 900, color: "#c9a227", minWidth: "max-content" }}>{item.value}</div>
              <div>
                <div style={{ fontSize: "clamp(9px,1vw,12px)", fontWeight: 700, color: "#111" }}>{item.label}</div>
                <div style={{ fontSize: "clamp(7px,0.8vw,10px)", color: "#888" }}>{item.sub}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </Slide>
  );
}

function SlideDataDwell() {
  const hours = [
    { h: "9am", v: 15 }, { h: "10am", v: 30 }, { h: "11am", v: 55 },
    { h: "12pm", v: 85 }, { h: "1pm", v: 92 }, { h: "2pm", v: 88 },
    { h: "3pm", v: 75 }, { h: "4pm", v: 70 }, { h: "5pm", v: 82 },
    { h: "6pm", v: 90 }, { h: "7pm", v: 78 }, { h: "8pm", v: 55 },
    { h: "9pm", v: 30 }, { h: "10pm", v: 12 },
  ];
  const max = Math.max(...hours.map(h => h.v));
  return (
    <Slide bg="#0e0e0e">
      <Tag>Foot Traffic</Tag>
      <H size="md">Peak Traffic<br />Patterns</H>
      <Sub>Understand exactly when your audience is here — and plan your activations accordingly.</Sub>
      <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "flex-end", marginTop: "2%" }}>
        <div style={{ display: "flex", alignItems: "flex-end", gap: "clamp(2px,0.6vw,7px)", height: "clamp(80px,12vw,150px)" }}>
          {hours.map((h, i) => (
            <div key={h.h} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
              <motion.div
                initial={{ height: 0 }} animate={{ height: `${(h.v / max) * 100}%` }}
                transition={{ delay: i * 0.04, duration: 0.5, ease: "easeOut" }}
                style={{ width: "100%", background: h.v > 80 ? "linear-gradient(to top,#c9a227,#e8630a)" : "rgba(201,162,39,0.35)", borderRadius: "3px 3px 0 0", minHeight: 4 }}
              />
              <span style={{ fontSize: "clamp(5px,0.65vw,8px)", color: "rgba(255,255,255,0.3)", transform: "rotate(-35deg)", transformOrigin: "center", whiteSpace: "nowrap" }}>{h.h}</span>
            </div>
          ))}
        </div>
        <div style={{ marginTop: 16, display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 10 }}>
          {[
            { label: "Peak Hours", value: "12pm – 7pm", sub: "Consistently highest traffic" },
            { label: "Weekend Premium", value: "+42%", sub: "Fri–Sun vs. weekday avg" },
            { label: "Holiday Multiplier", value: "3–5x", sub: "During Thanksgiving–New Year" },
          ].map(item => (
            <div key={item.label} style={{ padding: "10px 14px", borderRadius: 8, background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)" }}>
              <div style={{ fontSize: "clamp(14px,2vw,22px)", fontWeight: 900, color: "#c9a227", marginBottom: 4 }}>{item.value}</div>
              <div style={{ fontSize: "clamp(8px,0.95vw,11px)", fontWeight: 700, color: "#fff", marginBottom: 3 }}>{item.label}</div>
              <div style={{ fontSize: "clamp(6px,0.75vw,9px)", color: "rgba(255,255,255,0.35)" }}>{item.sub}</div>
            </div>
          ))}
        </div>
      </div>
    </Slide>
  );
}

function SlideContactTeam({ openModal }) {
  const team = [
    { name: "Sarah Chen", title: "VP of Brand Partnerships", email: "s.chen@moa.com", dept: "Sponsorship & Enterprise" },
    { name: "Marcus Williams", title: "Director of Retail Leasing", email: "m.williams@moa.com", dept: "Retail & Luxury" },
    { name: "Priya Patel", title: "Events & Activations Lead", email: "p.patel@moa.com", dept: "Events & Entertainment" },
    { name: "James Rivera", title: "Head of Dining Partnerships", email: "j.rivera@moa.com", dept: "F&B & Lifestyle" },
  ];
  return (
    <Slide bg="#0a0a0a">
      <Tag>Our Team</Tag>
      <H size="md">Meet the<br />Partnerships Team</H>
      <Sub>Dedicated experts who know MOA inside out — and who are ready to build something great with you.</Sub>
      <CardGrid cols={4}>
        {team.map((p, i) => (
          <motion.div key={p.name} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
            style={{ padding: "clamp(14px,2vw,22px)", borderRadius: 10, background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", textAlign: "center" }}>
            <div style={{ width: "clamp(36px,5vw,56px)", height: "clamp(36px,5vw,56px)", borderRadius: "50%", background: "linear-gradient(135deg,#c9a227,#e8630a)", margin: "0 auto clamp(8px,1.5vw,16px)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span style={{ fontSize: "clamp(12px,2vw,22px)", fontWeight: 800, color: "#fff" }}>{p.name[0]}</span>
            </div>
            <div style={{ fontSize: "clamp(9px,1.1vw,13px)", fontWeight: 700, color: "#fff", marginBottom: 4 }}>{p.name}</div>
            <div style={{ fontSize: "clamp(7px,0.85vw,10px)", color: "#c9a227", fontWeight: 600, marginBottom: 4 }}>{p.title}</div>
            <div style={{ fontSize: "clamp(6px,0.75vw,9px)", color: "rgba(255,255,255,0.3)", marginBottom: 10 }}>{p.dept}</div>
            <div style={{ fontSize: "clamp(6px,0.75vw,9px)", color: "rgba(255,255,255,0.4)" }}>{p.email}</div>
          </motion.div>
        ))}
      </CardGrid>
      <div style={{ textAlign: "center", marginTop: "4%" }}>
        <GoldBtn onClick={() => openModal("contact")}>Schedule a Meeting with Our Team</GoldBtn>
      </div>
    </Slide>
  );
}

function SlideContactForm({ openModal }) {
  return (
    <div style={{ width: "100%", height: "100%", background: "linear-gradient(135deg,#0a0805,#1e1508)", display: "grid", gridTemplateColumns: "1fr 1fr" }}>
      <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", padding: "0 8%" }}>
        <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }}>
          <MOALogo size={48} />
          <div style={{ marginTop: "4%" }}>
            <H size="lg">Let's Build<br /><em style={{ fontStyle: "italic", color: "#c9a227" }}>Something</em><br />Together</H>
          </div>
          <Sub>Whether you're a brand exploring retail, a company planning an event, or a partner seeking sponsorship — we want to hear from you.</Sub>
          <div style={{ display: "flex", flexDirection: "column", gap: 12, marginTop: "4%" }}>
            {[
              { icon: <Phone size={14} />, label: "1 (952) 883-8800" },
              { icon: <Mail size={14} />, label: "partnerships@mallofamerica.com" },
              { icon: <MapPin size={14} />, label: "60 E Broadway, Bloomington, MN 55425" },
            ].map(item => (
              <div key={item.label} style={{ display: "flex", alignItems: "center", gap: 10, fontSize: "clamp(8px,1vw,12px)", color: "rgba(255,255,255,0.6)" }}>
                <div style={{ color: "#c9a227" }}>{item.icon}</div>
                {item.label}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
      <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", padding: "0 8% 0 4%" }}>
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
          <div style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 12, padding: "clamp(16px,2.5vw,28px)" }}>
            <div style={{ fontSize: "clamp(11px,1.4vw,16px)", fontWeight: 700, color: "#fff", marginBottom: 14 }}>Send Us a Message</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 8 }}>
              {["Full Name", "Company", "Email", "Phone"].map(ph => (
                <input key={ph} placeholder={ph} style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 5, padding: "9px 12px", color: "#fff", fontSize: 11, outline: "none", fontFamily: "'DM Sans',sans-serif", width: "100%", boxSizing: "border-box" }} />
              ))}
            </div>
            <select style={{ width: "100%", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 5, padding: "9px 12px", color: "rgba(255,255,255,0.6)", fontSize: 11, outline: "none", fontFamily: "'DM Sans',sans-serif", marginBottom: 8 }}>
              <option>I'm interested in...</option>
              <option>Retail Leasing</option>
              <option>Sponsorship / Partnership</option>
              <option>Event Hosting</option>
              <option>Brand Activation</option>
              <option>Other</option>
            </select>
            <textarea placeholder="Tell us about your project..." rows={3} style={{ width: "100%", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 5, padding: "9px 12px", color: "#fff", fontSize: 11, outline: "none", resize: "none", marginBottom: 12, boxSizing: "border-box", fontFamily: "'DM Sans',sans-serif" }} />
            <button style={{ width: "100%", padding: "11px 0", borderRadius: 5, background: "linear-gradient(135deg,#c9a227,#e8630a)", color: "#fff", fontSize: 11, fontWeight: 700, border: "none", cursor: "pointer", letterSpacing: "0.09em", textTransform: "uppercase" }}>
              Submit →
            </button>
            <p style={{ textAlign: "center", fontSize: 9, color: "rgba(255,255,255,0.2)", marginTop: 8, marginBottom: 0 }}>We respond within 24 hours</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

function ModalShell({ show, onClose, title, children }) {
  if (!show) return null;
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      style={{ position: "fixed", inset: 0, zIndex: 1000, background: "rgba(0,0,0,0.95)", backdropFilter: "blur(20px)", overflowY: "auto", fontFamily: "'DM Sans',sans-serif" }}
      onClick={e => { if (e.target === e.currentTarget) onClose(); }}>
      <div style={{ maxWidth: 920, margin: "0 auto", padding: "24px 16px" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 24 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <MOALogo size={22} />
            <h2 style={{ fontSize: "clamp(14px,2.2vw,24px)", fontWeight: 800, color: "#fff", margin: 0, textTransform: "uppercase", letterSpacing: "0.04em" }}>{title}</h2>
          </div>
          <button onClick={onClose} style={{ width: 34, height: 34, borderRadius: 4, background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", cursor: "pointer" }}>
            <X size={14} />
          </button>
        </div>
        {children}
      </div>
    </motion.div>
  );
}

function ContactModal({ show, onClose }) {
  return (
    <ModalShell show={show} onClose={onClose} title="Contact Partnerships">
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: "#fff", marginBottom: 4 }}>Get in Touch</div>
          {[["Retail Leasing", "marcus.williams@moa.com", "#c9a227"], ["Events & Activations", "priya.patel@moa.com", "#e8630a"], ["Sponsorship", "sarah.chen@moa.com", "#a16207"], ["General Inquiries", "partnerships@moa.com", "#c9a227"]].map(([dept, email, color]) => (
            <div key={dept} style={{ padding: "12px 14px", borderRadius: 8, background: "rgba(255,255,255,0.04)", border: `1px solid ${color}22` }}>
              <div style={{ fontSize: 11, fontWeight: 700, color, marginBottom: 4 }}>{dept}</div>
              <div style={{ fontSize: 10, color: "rgba(255,255,255,0.45)" }}>{email}</div>
            </div>
          ))}
        </div>
        <div style={{ background: "rgba(255,255,255,0.04)", borderRadius: 10, padding: 18, border: "1px solid rgba(255,255,255,0.08)" }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: "#fff", marginBottom: 14 }}>Quick Inquiry</div>
          {["Name", "Email", "Company", "Phone"].map(ph => (
            <input key={ph} placeholder={ph} style={{ width: "100%", marginBottom: 8, background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 5, padding: "9px 12px", color: "#fff", fontSize: 11, outline: "none", fontFamily: "'DM Sans',sans-serif", boxSizing: "border-box" }} />
          ))}
          <textarea placeholder="How can we help?" rows={3} style={{ width: "100%", background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 5, padding: "9px 12px", color: "#fff", fontSize: 11, outline: "none", resize: "none", marginBottom: 10, boxSizing: "border-box", fontFamily: "'DM Sans',sans-serif" }} />
          <button style={{ width: "100%", padding: 10, borderRadius: 5, background: "linear-gradient(135deg,#c9a227,#e8630a)", color: "#fff", fontSize: 11, fontWeight: 700, border: "none", cursor: "pointer", letterSpacing: "0.08em", textTransform: "uppercase" }}>Send Message</button>
        </div>
      </div>
    </ModalShell>
  );
}

function LeasingModal({ show, onClose }) {
  const tiers = [
    { cat: "Luxury Flagship", color: "#c9a227", desc: "Premium storefront in our dedicated luxury wing. Direct access to high-net-worth shoppers.", details: ["Avg HHI $150K+", "Private entrance option", "White-glove support", "Co-marketing included"] },
    { cat: "Standard Retail", color: "#3b82f6", desc: "High-visibility spaces across 5.6M sq ft. Flexible lease terms for brands of every size.", details: ["800–50,000 sq ft", "Flexible lease terms", "Foot traffic guarantees", "Signage support"] },
    { cat: "F&B Concepts", color: "#e8630a", desc: "Prime dining positions across food courts, inline, and experiential restaurant zones.", details: ["All-day traffic", "Outdoor terrace options", "Ghost kitchen support", "Event tie-ins"] },
    { cat: "Pop-Up & Activations", color: "#10b981", desc: "Short-term, high-impact spaces for launches, product drops, and seasonal campaigns.", details: ["1 day to 6 months", "Custom buildouts", "Built-in audience", "Social amplification"] },
  ];
  return (
    <ModalShell show={show} onClose={onClose} title="Leasing Opportunities">
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
        {tiers.map((t, i) => (
          <motion.div key={t.cat} initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }}
            style={{ padding: 18, borderRadius: 10, background: "rgba(255,255,255,0.04)", border: `1px solid ${t.color}28` }}>
            <div style={{ width: 6, height: 6, borderRadius: "50%", background: t.color, marginBottom: 10 }} />
            <div style={{ fontSize: 13, fontWeight: 700, color: "#fff", marginBottom: 6 }}>{t.cat}</div>
            <p style={{ fontSize: 11, color: "rgba(255,255,255,0.45)", lineHeight: 1.6, marginBottom: 10 }}>{t.desc}</p>
            {t.details.map(d => <div key={d} style={{ fontSize: 10, color: "rgba(255,255,255,0.55)", marginBottom: 4, display: "flex", gap: 5 }}><span style={{ color: t.color }}>·</span>{d}</div>)}
            <button style={{ width: "100%", marginTop: 12, padding: "7px 0", borderRadius: 3, background: t.color, color: "#000", fontSize: 10, fontWeight: 700, border: "none", cursor: "pointer", letterSpacing: "0.07em", textTransform: "uppercase" }}>Inquire Now</button>
          </motion.div>
        ))}
      </div>
    </ModalShell>
  );
}

function EventModal({ show, onClose }) {
  const venues = [
    { name: "Grand Rotunda", cap: "10,000+", area: "50,000 sq ft", img: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=600&q=70" },
    { name: "Entertainment Pavilion", cap: "5,000", area: "30,000 sq ft", img: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=600&q=70" },
    { name: "Brand Activation Zone", cap: "2,000–5,000", area: "10K–25K sq ft", img: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=600&q=70" },
    { name: "Corporate Suite", cap: "500–2,000", area: "5K–15K sq ft", img: "https://images.unsplash.com/photo-1511578314322-379afb476865?w=600&q=70" },
  ];
  return (
    <ModalShell show={show} onClose={onClose} title="Event Spaces">
      <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: 12, marginBottom: 16 }}>
        {venues.map((v, i) => (
          <motion.div key={v.name} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }}
            style={{ borderRadius: 10, overflow: "hidden", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
            <div style={{ height: 120, background: "#222", position: "relative" }}>
              <img src={v.img} alt={v.name} style={{ width: "100%", height: "100%", objectFit: "cover", opacity: 0, transition: "opacity 0.4s" }} onLoad={e => e.target.style.opacity = 1} />
            </div>
            <div style={{ padding: 14 }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: "#fff", marginBottom: 6 }}>{v.name}</div>
              <div style={{ fontSize: 10, color: "rgba(255,255,255,0.4)", marginBottom: 10 }}>{v.cap} guests · {v.area}</div>
              <button style={{ width: "100%", padding: "6px 0", borderRadius: 3, background: "linear-gradient(135deg,#c9a227,#e8630a)", color: "#fff", fontSize: 10, fontWeight: 700, border: "none", cursor: "pointer", letterSpacing: "0.07em", textTransform: "uppercase" }}>Request Info</button>
            </div>
          </motion.div>
        ))}
      </div>
      <div style={{ padding: 20, borderRadius: 10, background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
        <div style={{ fontSize: 14, fontWeight: 700, color: "#fff", marginBottom: 14 }}>Plan Your Event</div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 8 }}>
          {["Full Name", "Email", "Phone", "Company"].map(ph => (
            <input key={ph} placeholder={ph} style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 5, padding: "9px 12px", color: "#fff", fontSize: 11, outline: "none", fontFamily: "'DM Sans',sans-serif" }} />
          ))}
        </div>
        <textarea placeholder="Tell us about your event..." rows={3} style={{ width: "100%", background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 5, padding: "9px 12px", color: "#fff", fontSize: 11, outline: "none", resize: "none", marginBottom: 10, boxSizing: "border-box", fontFamily: "'DM Sans',sans-serif" }} />
        <button style={{ width: "100%", padding: 10, borderRadius: 5, background: "linear-gradient(135deg,#c9a227,#e8630a)", color: "#fff", fontSize: 12, fontWeight: 700, border: "none", cursor: "pointer", letterSpacing: "0.09em", textTransform: "uppercase" }}>Submit Inquiry</button>
      </div>
    </ModalShell>
  );
}

function SponsorModal({ show, onClose }) {
  const tiers = [
    { tier: "Title Partner", price: "$5M+/yr", color: "#c9a227", perks: ["Naming rights on venue", "All activation zones", "Brand ambassador", "Exclusive category", "Media value $15M+"] },
    { tier: "Premier Partner", price: "$1M–$5M/yr", color: "#9ca3af", perks: ["Category exclusivity", "Digital + physical", "10+ activation days", "Co-branded campaigns", "Event headlines"] },
    { tier: "Associate Partner", price: "$250K–$1M/yr", color: "#e8630a", perks: ["Branded zones", "5 activation days", "Social features", "Email access", "Seasonal slots"] },
  ];
  return (
    <ModalShell show={show} onClose={onClose} title="Sponsorship Tiers">
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 12, marginBottom: 18 }}>
        {tiers.map((t, i) => (
          <motion.div key={t.tier} initial={{ opacity: 0, x: -14 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }}
            style={{ padding: 18, borderRadius: 10, background: "rgba(255,255,255,0.04)", border: `1px solid ${t.color}30` }}>
            <div style={{ fontSize: 13, fontWeight: 800, color: t.color, marginBottom: 3 }}>{t.tier}</div>
            <div style={{ fontSize: 10, color: "rgba(255,255,255,0.3)", marginBottom: 12 }}>{t.price}</div>
            {t.perks.map(p => <div key={p} style={{ fontSize: 10, color: "rgba(255,255,255,0.55)", marginBottom: 5, display: "flex", gap: 5 }}><span style={{ color: t.color }}>·</span>{p}</div>)}
            <button style={{ width: "100%", marginTop: 12, padding: "6px 0", borderRadius: 3, background: t.color, color: "#000", fontSize: 10, fontWeight: 700, border: "none", cursor: "pointer", letterSpacing: "0.07em", textTransform: "uppercase" }}>Get Proposal</button>
          </motion.div>
        ))}
      </div>
      <div style={{ textAlign: "center" }}>
        <p style={{ fontSize: 10, color: "rgba(255,255,255,0.25)", marginBottom: 12 }}>Custom packages available for all budgets</p>
        <GoldBtn onClick={onClose}>Contact Partnerships Team</GoldBtn>
      </div>
    </ModalShell>
  );
}