import React from 'react'
import { motion, useScroll, useTransform } from "motion/react";
import {
    ChevronDown, X, Calendar, Users, MapPin, ArrowRight,
    Sparkles, Menu, ShoppingBag, Utensils, Star, Zap, Building2
} from "lucide-react";
const Dining = ({ DINING_IMAGES }) => {
    return (
        <div>
            <section id="dining" className="py-28 md:py-40 px-6 md:px-12 bg-white">
                <div className="max-w-7xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.8 }}
                        className="text-center mb-16"
                    >
                        <div className="inline-flex items-center gap-2 bg-orange-100 text-orange-700 px-4 py-2 rounded-full text-sm font-semibold mb-6">
                            <Utensils className="w-4 h-4" /> Dining & Lifestyle
                        </div>
                        <h2 className="text-4xl md:text-6xl lg:text-7xl font-black mb-6 tracking-tight">
                            DINING AS A DESTINATION
                        </h2>
                        <p className="text-lg md:text-xl text-gray-500 max-w-2xl mx-auto font-light">
                            80+ restaurants. All-day traffic. Premium spending power.
                        </p>
                    </motion.div>


                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {DINING_IMAGES.map((img, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, scale: 0.85 }} whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true, margin: "-100px" }}
                                transition={{ duration: 0.5, delay: i * 0.1 }}
                                whileHover={{ scale: 1.04, zIndex: 10 }}
                                className="relative h-56 md:h-72 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300"
                            >
                                <img src={img} alt={`Dining option ${i + 1}`} className="w-full h-full object-cover" loading="lazy" />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />
                            </motion.div>
                        ))}
                    </div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.3 }}
                        className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 text-center"
                    >
                        {[
                            { stat: "80+", label: "Restaurants & Cafes" },
                            { stat: "15+", label: "Cuisine Categories" },
                            { stat: "3x", label: "Higher Dwell Time vs avg mall" },
                        ].map((item) => (
                            <div key={item.label} className="p-6 rounded-2xl bg-orange-50 border border-orange-100">
                                <div className="text-3xl font-black text-orange-500 mb-2">{item.stat}</div>
                                <div className="text-sm font-semibold text-gray-600">{item.label}</div>
                            </div>
                        ))}
                    </motion.div>
                </div>
            </section>
        </div>
    )
}

export default Dining
