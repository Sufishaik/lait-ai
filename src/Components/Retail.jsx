import React from 'react'
import { motion, useScroll, useTransform } from "motion/react";
import {
    ChevronDown, X, Calendar, Users, MapPin, ArrowRight,
    Sparkles, Menu, ShoppingBag, Utensils, Star, Zap, Building2
} from "lucide-react";
const Retail = ({ setShowLeasing }) => {
    return (
        <div>
            <section id="retail" className="relative py-28 md:py-40 px-6 md:px-12 bg-black text-white overflow-hidden">
                <div className="absolute inset-0">
                    <img
                        src="https://images.unsplash.com/photo-1661260178494-48ed9714c77c?w=1600&q=80"
                        alt="Retail floor"
                        className="w-full h-full object-cover opacity-25"
                        loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-black via-black/80 to-black" />
                </div>

                <div className="max-w-7xl mx-auto relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.8 }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-4xl md:text-6xl lg:text-8xl font-black mb-6 tracking-tight leading-tight">
                            TURN YOUR BRAND<br />INTO AN EXPERIENCE
                        </h2>
                        <p className="text-lg md:text-xl text-white/70 max-w-3xl mx-auto font-light">
                            Join 500+ global brands creating unforgettable retail moments
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-12">
                        {["NIKE", "APPLE", "LULULEMON", "LOUIS VUITTON", "NORDSTROM",
                            "SEPHORA", "TESLA", "GUCCI", "OMEGA", "BURBERRY"].map((brand, i) => (
                                <motion.div
                                    key={brand}
                                    initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }}
                                    viewport={{ once: true, margin: "-100px" }}
                                    transition={{ duration: 0.4, delay: i * 0.04 }}
                                    whileHover={{ scale: 1.08, backgroundColor: "rgba(255,255,255,0.12)" }}
                                    className="aspect-square flex items-center justify-center p-4 rounded-xl bg-white/5 border border-white/10 hover:border-white/30 transition-all duration-300 cursor-pointer"
                                >
                                    <span className="text-xs md:text-sm font-bold tracking-wider text-center">{brand}</span>
                                </motion.div>
                            ))}
                    </div>

                    <motion.div
                        initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }} transition={{ duration: 0.8 }}
                        className="flex flex-col sm:flex-row gap-4 justify-center"
                    >
                        <button
                            onClick={() => setShowLeasing(true)}
                            className="bg-gradient-to-r from-amber-500 to-orange-600 text-white px-10 py-5 rounded-full text-lg font-bold hover:shadow-2xl hover:scale-105 transition-all duration-300 inline-flex items-center gap-3"
                        >
                            Explore Leasing Opportunities <ArrowRight className="w-5 h-5" />
                        </button>
                    </motion.div>
                </div>
            </section>
        </div>
    )
}

export default Retail
