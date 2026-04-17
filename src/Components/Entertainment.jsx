import React from 'react'
import { motion, useScroll, useTransform } from "motion/react";

import {
    ChevronDown, X, Calendar, Users, MapPin, ArrowRight,
    Sparkles, Menu, ShoppingBag, Utensils, Star, Zap, Building2
} from "lucide-react";


const Entertainment = ({ setShowEventsModal }) => {
    const EntertainVideo = "https://res.cloudinary.com/dbkwncgz5/video/upload/v1776394272/istockphoto-849418708-640_adpp_is_for5k3.mp4"
    return (
        <div>
            <section id="entertainment" className="relative py-36 md:py-52 px-6 md:px-12 bg-black text-white overflow-hidden">
                <div className="absolute inset-0">
                    <video
                        autoPlay muted loop playsInline
                        className="w-full h-full object-cover opacity-120"
                    >
                        <source src={EntertainVideo} type="video/mp4" />
                    </video>
                    <div className="absolute inset-0 bg-gradient-to-b from-black via-black/70 to-black" />
                </div>

                <div className="max-w-7xl mx-auto relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }} transition={{ duration: 1 }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-5xl md:text-7xl lg:text-9xl font-black mb-8 tracking-tighter leading-none">
                            BEYOND<br />SHOPPING
                        </h2>
                        <p className="text-xl md:text-3xl text-white/85 font-light max-w-3xl mx-auto">
                            8 acres of theme park. Indoor water park. Live concerts. Brand activations.
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
                        {[
                            { icon: <Zap className="w-7 h-7" />, title: "Nickelodeon Universe", subtitle: "8-Acre Indoor Theme Park", stat: "5M+ annual visitors" },
                            { icon: <Star className="w-7 h-7" />, title: "SEA LIFE Aquarium", subtitle: "10,000+ Sea Creatures", stat: "Interactive experiences" },
                            { icon: <Building2 className="w-7 h-7" />, title: "Live Event Venue", subtitle: "Concerts & Brand Activations", stat: "50K max capacity" },
                        ].map((item, i) => (
                            <motion.div
                                key={item.title}
                                initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-100px" }}
                                transition={{ duration: 0.6, delay: i * 0.2 }}
                                whileHover={{ scale: 1.04 }}
                                className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-8 hover:bg-white/10 hover:border-white/30 transition-all duration-300"
                            >
                                <div className="text-amber-400 mb-4">{item.icon}</div>
                                <h3 className="text-2xl md:text-3xl font-black mb-2">{item.title}</h3>
                                <p className="text-white/60 mb-3">{item.subtitle}</p>
                                <div className="text-amber-400 font-semibold">{item.stat}</div>
                            </motion.div>
                        ))}
                    </div>


                    <motion.div
                        initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.4 }}
                        className="mt-12 p-8 rounded-2xl bg-white/5 border border-white/10 text-center"
                    >
                        <h3 className="text-2xl font-black mb-3 text-white">Performing Arts & Convention Center</h3>
                        <p className="text-white/60 mb-6 max-w-2xl mx-auto">
                            Dedicated performing arts venues and 200,000+ sq ft of expo space — ideal for large-scale conferences, trade shows, and headline performances.
                        </p>
                        <button
                            onClick={() => setShowEventsModal(true)}
                            className="bg-white/10 border border-white/30 text-white px-8 py-3 rounded-full font-semibold hover:bg-white/20 transition-all duration-300"
                        >
                            Explore Venue Capabilities
                        </button>
                    </motion.div>
                </div>
            </section>
        </div>
    )
}

export default Entertainment
