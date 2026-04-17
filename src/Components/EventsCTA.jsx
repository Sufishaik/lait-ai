import React from 'react'
import { motion, useScroll, useTransform } from "motion/react";
import {
    ChevronDown, X, Calendar, Users, MapPin, ArrowRight,
    Sparkles, Menu, ShoppingBag, Utensils, Star, Zap, Building2
} from "lucide-react";
const EventsCTA = ({ setShowEventsModal, setShowSponsorship }) => {
    return (
        <div>
            <section id="events" className="py-36 md:py-52 px-6 md:px-12 bg-gradient-to-br from-amber-500 via-orange-600 to-red-600 text-white relative overflow-hidden">
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.15),transparent_60%)]" />
                </div>
                <div className="max-w-5xl mx-auto text-center relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }} transition={{ duration: 1 }}
                    >
                        <h2 className="text-5xl md:text-7xl lg:text-9xl font-black mb-8 tracking-tighter leading-none">
                            HOST YOUR<br />NEXT EVENT
                        </h2>
                        <p className="text-xl md:text-3xl mb-12 font-light leading-relaxed">
                            Product launches. Concerts. Activations.<br />40M eyeballs. World-class infrastructure.
                        </p>
                        <motion.button
                            onClick={() => setShowEventsModal(true)}
                            whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                            className="bg-white text-orange-600 px-12 py-6 rounded-full text-xl font-black hover:bg-white/95 transition-all duration-300 shadow-2xl inline-flex items-center gap-3"
                        >
                            Explore Event Spaces <ArrowRight className="w-7 h-7" />
                        </motion.button>

                        <div className="grid grid-cols-3 gap-8 mt-16 pt-16 border-t border-white/20">
                            {[
                                { value: "365+", label: "Events annually" },
                                { value: "50K", label: "Max capacity" },
                                { value: "24/7", label: "Production support" },
                            ].map((s, i) => (
                                <motion.div key={s.label}
                                    initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }}
                                >
                                    <div className="text-4xl md:text-6xl font-black mb-2">{s.value}</div>
                                    <div className="text-base md:text-lg text-white/85">{s.label}</div>
                                </motion.div>
                            ))}
                        </div>

                        <div className="mt-12">
                            <button
                                onClick={() => setShowSponsorship(true)}
                                className="text-white/80 underline underline-offset-4 text-sm hover:text-white transition-colors"
                            >
                                View Sponsorship & Partnership Tiers →
                            </button>
                        </div>
                    </motion.div>
                </div>
            </section>
        </div>
    )
}

export default EventsCTA
