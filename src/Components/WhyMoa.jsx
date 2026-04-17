import React from 'react'
import { motion, useScroll, useTransform } from "motion/react";
import {
    ChevronDown, X, Calendar, Users, MapPin, ArrowRight,
    Sparkles, Menu, ShoppingBag, Utensils, Star, Zap, Building2
} from "lucide-react";
const WhyMoa = () => {
    return (
        <div>
            <section id="why" className="py-28 md:py-40 px-6 md:px-12 bg-white">
                <div className="max-w-7xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.8 }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-4xl md:text-6xl lg:text-7xl font-black mb-6 tracking-tight leading-tight">
                            WHERE BRANDS MEET<br />THEIR AUDIENCE
                        </h2>
                        <p className="text-lg md:text-xl text-gray-500 max-w-2xl mx-auto font-light">
                            40 million annual visitors. Premium demographics. Unmatched foot traffic.
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                        {[
                            { value: "40M+", label: "Annual Visitors", sublabel: "More than most US cities", delay: 0 },
                            { value: "5.6M", label: "Square Feet", sublabel: "Largest mall in the US", delay: 0.1 },
                            { value: "$200+", label: "Avg Spend/Visit", sublabel: "Premium purchasing power", delay: 0.2 },
                            { value: "365", label: "Days Open", sublabel: "Year-round foot traffic", delay: 0.3 },
                        ].map((s) => (
                            <motion.div
                                key={s.label}
                                initial={{ opacity: 0, y: 40, scale: 0.9 }}
                                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                                viewport={{ once: true, margin: "-100px" }}
                                transition={{ duration: 0.6, delay: s.delay }}
                                whileHover={{ scale: 1.05 }}
                                className="text-center p-6 md:p-8 rounded-2xl bg-gradient-to-br from-gray-50 to-white border border-gray-100 hover:shadow-2xl transition-all duration-300"
                            >
                                <div className="text-4xl md:text-6xl font-black mb-3 bg-gradient-to-br from-amber-500 to-orange-600 bg-clip-text text-transparent">
                                    {s.value}
                                </div>
                                <div className="text-base md:text-lg font-bold mb-1">{s.label}</div>
                                <div className="text-xs md:text-sm text-gray-400">{s.sublabel}</div>
                            </motion.div>
                        ))}
                    </div>


                    <motion.div
                        initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.2 }}
                        className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6"
                    >
                        {[
                            { icon: <MapPin className="w-6 h-6" />, title: "Bloomington, MN", body: "Minutes from MSP Airport. 60% of US population within a 1-day drive." },
                            { icon: <Users className="w-6 h-6" />, title: "Regional Draw", body: "Visitors from all 50 states and 100+ countries every year." },
                            { icon: <Star className="w-6 h-6" />, title: "Premium Demographics", body: "70% affluent households. Avg HHI $85K+. High propensity to spend." },
                        ].map((c) => (
                            <div key={c.title} className="flex gap-4 p-6 rounded-2xl bg-gray-50 border border-gray-100">
                                <div className="text-amber-500 mt-1 shrink-0">{c.icon}</div>
                                <div>
                                    <div className="font-bold text-base mb-1">{c.title}</div>
                                    <div className="text-sm text-gray-500 leading-relaxed">{c.body}</div>
                                </div>
                            </div>
                        ))}
                    </motion.div>
                </div>
            </section>
        </div>
    )
}

export default WhyMoa
