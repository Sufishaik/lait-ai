import React from 'react'
import { motion, useScroll, useTransform } from "motion/react";
import {
    ChevronDown, X, Calendar, Users, MapPin, ArrowRight,
    Sparkles, Menu, ShoppingBag, Utensils, Star, Zap, Building2
} from "lucide-react";
const SponsorshipModal = ({ showSponsorship, setShowSponsorship, setShowEventsModal, Modal }) => {
    return (
        <div>
            < Modal show={showSponsorship} onClose={() => setShowSponsorship(false)} title="Sponsorship & Partnerships">
                <div className="space-y-4">
                    {[
                        { tier: "Title Partner", price: "$5M+/yr", color: "from-yellow-400 to-amber-500", perks: ["Naming rights on major venue", "All activation zones included", "Dedicated brand ambassador program", "Exclusive category rights", "Annual media value $15M+"] },
                        { tier: "Premier Partner", price: "$1M–$5M/yr", color: "from-gray-300 to-gray-400", perks: ["Category exclusivity", "Digital + physical branding", "10+ activation days/year", "Co-branded campaigns", "Event headline opportunities"] },
                        { tier: "Associate Partner", price: "$250K–$1M/yr", color: "from-orange-400 to-orange-600", perks: ["Branded zones in key areas", "5 activation days/year", "Social media features", "Email list access", "Seasonal campaign slots"] },
                    ].map((tier, i) => (
                        <motion.div
                            key={tier.tier}
                            initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.4, delay: i * 0.1 }}
                            className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-white/30 transition-all"
                        >
                            <div className="flex items-center justify-between mb-4">
                                <div>
                                    <div className={`inline-block bg-gradient-to-r ${tier.color} bg-clip-text text-transparent text-xl font-black`}>{tier.tier}</div>
                                    <div className="text-white/50 text-sm mt-1">{tier.price}</div>
                                </div>
                                <button className={`bg-gradient-to-r ${tier.color} text-black px-5 py-2 rounded-full text-sm font-bold hover:shadow-lg transition-all`}>
                                    Get Proposal
                                </button>
                            </div>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                                {tier.perks.map(p => (
                                    <div key={p} className="flex items-start gap-2 text-white/70 text-xs">
                                        <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0 mt-1" />{p}
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </div>
                <div className="mt-8 text-center">
                    <p className="text-white/50 text-sm mb-4">Custom packages available for all budgets</p>
                    <button
                        onClick={() => { setShowSponsorship(false); setShowEventsModal(true); }}
                        className="bg-gradient-to-r from-amber-500 to-orange-600 text-white px-8 py-3 rounded-full font-semibold hover:shadow-lg transition-all"
                    >
                        Contact Our Partnerships Team
                    </button>
                </div>
            </Modal>
        </div>
    )
}

export default SponsorshipModal
