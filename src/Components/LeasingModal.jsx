import React from 'react'
import { motion, useScroll, useTransform } from "motion/react";
import {
    ChevronDown, X, Calendar, Users, MapPin, ArrowRight,
    Sparkles, Menu, ShoppingBag, Utensils, Star, Zap, Building2
} from "lucide-react";
const LeasingModal = ({ setShowLeasing, showLeasing, Modal }) => {
    return (
        <div>
            <Modal show={showLeasing} onClose={() => setShowLeasing(false)} title="Leasing Opportunities">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {[
                        { category: "Luxury Flagship", icon: "✦", color: "from-amber-500 to-yellow-600", desc: "Premium storefront in our dedicated luxury wing. Direct access to high-net-worth shoppers.", details: ["Avg HHI $150K+", "Private entrance option", "White-glove tenant support", "Co-marketing included"] },
                        { category: "Standard Retail", icon: "◆", color: "from-blue-500 to-indigo-600", desc: "High-visibility inline spaces across 5.6M sq ft. Flexible lease terms for brands of every size.", details: ["Sizes from 800–50,000 sq ft", "Flexible lease terms", "Foot traffic guarantees", "Signage support"] },
                        { category: "F&B Concepts", icon: "●", color: "from-orange-500 to-red-600", desc: "Prime dining positions across food courts, inline, and experiential restaurant zones.", details: ["All-day traffic", "Outdoor terrace options", "Ghost kitchen support", "Event catering tie-ins"] },
                        { category: "Pop-Up & Activations", icon: "▲", color: "from-green-500 to-emerald-600", desc: "Short-term, high-impact spaces for brand launches, product drops, and seasonal campaigns.", details: ["1 day to 6 months", "Custom buildouts", "Built-in audience", "Social amplification"] },
                    ].map((tier, i) => (
                        <motion.div
                            key={tier.category}
                            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4, delay: i * 0.1 }}
                            className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-white/30 transition-all"
                        >
                            <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${tier.color} flex items-center justify-center text-white text-lg font-bold mb-4`}>
                                {tier.icon}
                            </div>
                            <h3 className="text-xl font-bold text-white mb-2">{tier.category}</h3>
                            <p className="text-white/60 text-sm mb-4 leading-relaxed">{tier.desc}</p>
                            <ul className="space-y-1">
                                {tier.details.map(d => (
                                    <li key={d} className="flex items-center gap-2 text-white/70 text-sm">
                                        <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0" />{d}
                                    </li>
                                ))}
                            </ul>
                            <button className={`mt-5 w-full bg-gradient-to-r ${tier.color} text-white py-2.5 rounded-full text-sm font-semibold hover:shadow-lg transition-all`}>
                                Inquire Now
                            </button>
                        </motion.div>
                    ))}
                </div>
            </Modal>
        </div>
    )
}

export default LeasingModal
