import { motion, useScroll, useTransform } from "motion/react";
import { useEffect, useState, useRef } from "react";
import {
  ChevronDown, X, Calendar, Users, MapPin, ArrowRight,
  Sparkles, Menu, ShoppingBag, Utensils, Star, Zap, Building2
} from "lucide-react";

import Dining1 from "./assets/Dining1.jpg"
import Dining2 from "./assets/Dining3.jpg"


import Hero from "./Components/Hero";
import WhyMoa from "./Components/WhyMoa";
import Retail from "./Components/Retail";
import Luxury from "./Components/Luxury";
import Dining from "./Components/Dining";
import Entertainment from "./Components/Entertainment";
import EventsCTA from "./Components/EventsCTA";
import Footer from "./Components/Footer";
import EventModal from "./Components/EventModal";
import LeasingModal from "./Components/LeasingModal";
import SponsorshipModal from "./Components/SponsorshipModal";
const VideoDemo = "https://res.cloudinary.com/dbkwncgz5/video/upload/v1776394613/13748223_3840_2160_30fps_fbzbr6.mp4"
const VIDEO_SRC = VideoDemo;

const NAV_ITEMS = [
  { label: "Why MOA", id: "why" },
  { label: "Retail", id: "retail" },
  { label: "Luxury", id: "luxury" },
  { label: "Dining", id: "dining" },
  { label: "Entertainment", id: "entertainment" },
  { label: "Events", id: "events" },
];


const DINING_IMAGES = [
  Dining1,
  Dining2,
  "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&q=80",
  "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&q=80",
  "https://images.unsplash.com/photo-1565299507177-b0ac66763828?w=800&q=80",
];

export default function App() {
  const { scrollY } = useScroll();
  const [activeSection, setActiveSection] = useState("home");
  const [showEventsModal, setShowEventsModal] = useState(false);
  const [showLeasing, setShowLeasing] = useState(false);
  const [showSponsorship, setShowSponsorship] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const videoRef = useRef(null);

  const navBg = useTransform(
    scrollY,
    [0, 100],
    ["rgba(0,0,0,0)", "rgba(255,255,255,0.98)"]
  );
  const navTextColor = useTransform(scrollY, [0, 100], ["#ffffff", "#000000"]);
  const heroScale = useTransform(scrollY, [0, 500], [1, 1.1]);
  const heroOpacity = useTransform(scrollY, [0, 300], [1, 0]);

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["home", "why", "retail", "luxury", "dining", "entertainment", "events"];
      const current = sections.find((id) => {
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          return rect.top <= 150 && rect.bottom >= 150;
        }
        return false;
      });
      if (current) setActiveSection(current);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when modal open
  useEffect(() => {
    document.body.style.overflow =
      showEventsModal || showLeasing || showSponsorship ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [showEventsModal, showLeasing, showSponsorship]);

  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMobileMenuOpen(false);
  };


  function Modal({ show, onClose, title, children }) {
    if (!show) return null;
    return (
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/90 backdrop-blur-lg z-[100] overflow-y-auto"
        onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
      >
        <div className="min-h-screen py-10 px-6 md:px-12">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center justify-between mb-10">
              <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight">{title}</h2>
              <button
                onClick={onClose}
                className="w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
                aria-label="Close"
              >
                <X className="w-5 h-5 text-white" />
              </button>
            </div>
            {children}
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="bg-white text-black overflow-x-hidden">

      {/* ─── NAVIGATION ─── */}
      <motion.nav
        style={{ backgroundColor: navBg }}
        className="fixed top-0 left-0 right-0 z-50 px-6 md:px-12 py-4 backdrop-blur-xl shadow-sm transition-shadow"
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo */}
          <button onClick={() => scrollToSection("home")} className="flex items-center gap-3">
            <div className="w-9 h-9">
              <svg viewBox="0 0 100 100">
                <defs>
                  <linearGradient id="lg1" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#dc2626" />
                    <stop offset="50%" stopColor="#ca8a04" />
                    <stop offset="100%" stopColor="#2563eb" />
                  </linearGradient>
                </defs>
                <polygon points="50,10 61,35 88,35 67,52 76,77 50,60 24,77 33,52 12,35 39,35" fill="url(#lg1)" />
              </svg>
            </div>
            <motion.span style={{ color: navTextColor }} className="font-bold text-lg tracking-tight">
              Mall of America
            </motion.span>
          </button>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-6">
            {NAV_ITEMS.map((item) => (
              <motion.button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                style={{ color: navTextColor }}
                className={`text-sm tracking-wide transition-all ${activeSection === item.id ? "font-semibold" : "opacity-60 hover:opacity-100"}`}
              >
                {item.label}
              </motion.button>
            ))}
            <button
              onClick={() => setShowEventsModal(true)}
              className="bg-gradient-to-r from-amber-500 to-orange-600 text-white px-5 py-2 rounded-full text-sm font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300"
            >
              Book Event
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <motion.div style={{ color: navTextColor }}>
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </motion.div>
          </button>
        </div>

        {/* Mobile Dropdown */}
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:hidden bg-white border-t border-gray-100 py-4 px-6 space-y-3"
          >
            {NAV_ITEMS.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="block w-full text-left text-sm font-medium text-black py-2 hover:text-amber-600 transition-colors"
              >
                {item.label}
              </button>
            ))}
            <button
              onClick={() => { setShowEventsModal(true); setMobileMenuOpen(false); }}
              className="w-full bg-gradient-to-r from-amber-500 to-orange-600 text-white px-5 py-2.5 rounded-full text-sm font-semibold mt-2"
            >
              Book Event
            </button>
          </motion.div>
        )}
      </motion.nav>

      {/* ─── HERO ─── */}
      <Hero videoRef={videoRef} videoError={videoError} heroScale={heroScale} heroOpacity={heroOpacity} setVideoError={setVideoError} VIDEO_SRC={VIDEO_SRC} scrollToSection={scrollToSection} setShowEventsModal={setShowEventsModal} />

      {/* ─── WHY MOA ─── */}
      <WhyMoa />

      {/* ─── RETAIL ─── */}
      <Retail setShowLeasing={setShowLeasing} />

      {/* ─── LUXURY ─── */}
      <Luxury setShowLeasing={setShowLeasing} />


      {/* ─── DINING ─── */}
      <Dining DINING_IMAGES={DINING_IMAGES} />

      {/* ─── ENTERTAINMENT ─── */}
      <Entertainment setShowEventsModal={setShowEventsModal} />

      {/* ─── EVENTS CTA ─── */}
      <EventsCTA setShowEventsModal={setShowEventsModal} setShowSponsorship={setShowSponsorship} />

      {/* ─── FOOTER ─── */}
      <Footer setShowLeasing={setShowLeasing} setShowEventsModal={setShowEventsModal} />

      {/* ─── EVENTS MODAL ─── */}
      <EventModal Modal={Modal} setShowEventsModal={setShowEventsModal} showEventsModal={showEventsModal} />

      {/* ─── LEASING MODAL ─── */}
      <LeasingModal Modal={Modal} showLeasing={showLeasing} setShowLeasing={setShowLeasing} />

      {/* ─── SPONSORSHIP MODAL ─── */}
      <SponsorshipModal showSponsorship={showSponsorship} setShowSponsorship={setShowSponsorship} setShowEventsModal={setShowEventsModal} Modal={Modal} />

    </div>
  );
}

