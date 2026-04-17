import React from 'react'
import { motion, useScroll, useTransform } from "motion/react";
import {
    ChevronDown, X, Calendar, Users, MapPin, ArrowRight,
    Sparkles, Menu, ShoppingBag, Utensils, Star, Zap, Building2
} from "lucide-react";
const EventModal = ({ showEventsModal, setShowEventsModal, Modal }) => {
    return (
        <div>
            <Modal show={showEventsModal} onClose={() => setShowEventsModal(false)} title="Event Spaces">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">
                    {[
                        { name: "Grand Rotunda", capacity: "10,000+", area: "50,000 sq ft", img: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=800&q=80", features: ["Central atrium", "360° visibility", "Premium AV", "Full production support"] },
                        { name: "Entertainment Pavilion", capacity: "5,000", area: "30,000 sq ft", img: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=800&q=80", features: ["Stage rigging", "Live performance setup", "VIP lounges", "Backstage facilities"] },
                        { name: "Brand Activation Zones", capacity: "2,000–5,000", area: "10K–25K sq ft", img: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&q=80", features: ["High foot traffic", "Flexible duration", "Custom buildouts", "Experiential marketing"] },
                        { name: "Corporate Event Suites", capacity: "500–2,000", area: "5K–15K sq ft", img: "https://images.unsplash.com/photo-1511578314322-379afb476865?w=800&q=80", features: ["Premium catering", "Private access", "AV equipment", "Dedicated event staff"] },
                    ].map((v, i) => (
                        <motion.div
                            key={v.name}
                            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4, delay: i * 0.1 }}
                            className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:border-white/30 transition-all duration-300"
                        >
                            <div className="relative h-48">
                                <img src={v.img} alt={v.name} className="w-full h-full object-cover" loading="lazy" />
                                <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent" />
                            </div>
                            <div className="p-6">
                                <h3 className="text-xl font-bold text-white mb-3">{v.name}</h3>
                                <div className="flex gap-4 mb-4 text-white/60 text-sm">
                                    <span className="flex items-center gap-1"><Users className="w-4 h-4" />{v.capacity}</span>
                                    <span className="flex items-center gap-1"><MapPin className="w-4 h-4" />{v.area}</span>
                                </div>
                                <ul className="space-y-1 mb-5">
                                    {v.features.map((f) => (
                                        <li key={f} className="flex items-center gap-2 text-white/70 text-sm">
                                            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 shrink-0" />{f}
                                        </li>
                                    ))}
                                </ul>
                                <button className="w-full bg-gradient-to-r from-amber-500 to-orange-600 text-white py-2.5 rounded-full text-sm font-semibold hover:shadow-lg transition-all">
                                    Request Information
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </div>


                <div className="bg-white/5 border border-white/10 rounded-2xl p-8">
                    <h3 className="text-2xl font-bold text-white mb-6">Book Your Event</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <input type="text" placeholder="Full Name" className="bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:border-amber-400 transition-colors text-sm" />
                        <input type="email" placeholder="Email Address" className="bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:border-amber-400 transition-colors text-sm" />
                        <input type="tel" placeholder="Phone Number" className="bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:border-amber-400 transition-colors text-sm" />
                        <input type="text" placeholder="Company Name" className="bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:border-amber-400 transition-colors text-sm" />
                    </div>
                    <textarea placeholder="Tell us about your event..." rows={3} className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder:text-white/40 focus:outline-none focus:border-amber-400 transition-colors mb-4 resize-none text-sm" />
                    <button className="w-full bg-gradient-to-r from-amber-500 to-orange-600 text-white py-4 rounded-full font-bold hover:shadow-2xl transition-all inline-flex items-center justify-center gap-2">
                        Submit Inquiry <Calendar className="w-4 h-4" />
                    </button>
                    <p className="text-center text-white/40 text-xs mt-4">Our events team responds within 24 hours</p>
                </div>
            </Modal>
        </div>
    )
}

export default EventModal
