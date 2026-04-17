import React from 'react'
import { motion, useScroll, useTransform } from "motion/react";
import {
    ChevronDown, X, Calendar, Users, MapPin, ArrowRight,
    Sparkles, Menu, ShoppingBag, Utensils, Star, Zap, Building2
} from "lucide-react";
import LuxuryImage from "../assets/Luxury-image.jpg"
const Luxury = ({ setShowLeasing }) => {
    return (
        <div>
            <section id="luxury" className="py-28 md:py-40 px-6 md:px-12 bg-gradient-to-br from-gray-50 to-white">
                <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.8 }}
                    >
                        <div className="inline-flex items-center gap-2 bg-amber-100 text-amber-800 px-4 py-2 rounded-full text-sm font-semibold mb-6">
                            <Sparkles className="w-4 h-4" /> Luxury Positioning
                        </div>
                        <h2 className="text-4xl md:text-6xl lg:text-7xl font-black mb-6 tracking-tight leading-tight">
                            PREMIUM<br />FLAGSHIP<br />SPACES
                        </h2>
                        <p className="text-lg text-gray-500 mb-8 font-light leading-relaxed">
                            High-net-worth shoppers seeking luxury experiences. Your flagship deserves this audience.
                        </p>
                        <div className="space-y-3 mb-8">
                            {[
                                { metric: "70%", label: "Affluent demographics" },
                                { metric: "$500+", label: "Luxury avg transaction" },
                                { metric: "100+", label: "Premium brands" },
                            ].map((item, i) => (
                                <motion.div
                                    key={item.label}
                                    initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }}
                                    whileHover={{ x: 8 }}
                                    className="flex items-center gap-5 p-5 bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300"
                                >
                                    <div className="text-3xl font-black text-amber-500">{item.metric}</div>
                                    <div className="font-semibold text-gray-700">{item.label}</div>
                                </motion.div>
                            ))}
                        </div>
                        <button
                            onClick={() => setShowLeasing(true)}
                            className="bg-black text-white px-8 py-4 rounded-full text-base font-bold hover:bg-gray-900 hover:scale-105 transition-all duration-300 shadow-lg"
                        >
                            Request Luxury Leasing Info
                        </button>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.8 }}
                        className="relative h-[500px] md:h-[650px] rounded-2xl overflow-hidden group"
                    >
                        <img
                            src={LuxuryImage}
                            alt="Luxury fashion boutique"
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                            loading="lazy"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    </motion.div>
                </div>
            </section>

        </div>
    )
}

export default Luxury
