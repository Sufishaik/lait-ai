import React from 'react'
import { motion, useScroll, useTransform } from "motion/react";
import {
    ChevronDown, X, Calendar, Users, MapPin, ArrowRight,
    Sparkles, Menu, ShoppingBag, Utensils, Star, Zap, Building2
} from "lucide-react";
const Hero = ({ videoRef, videoError, heroScale, heroOpacity, setVideoError, VIDEO_SRC, scrollToSection, setShowEventsModal }) => {
    return (
        <div>
            <section id="home" className="relative h-screen w-full overflow-hidden">
                <motion.div style={{ scale: heroScale, opacity: heroOpacity }} className="absolute inset-0">

                    {!videoError ? (
                        <video
                            ref={videoRef}
                            autoPlay muted loop playsInline
                            onError={() => setVideoError(true)}
                            className="w-full h-full object-cover"
                        >
                            <source src={VIDEO_SRC} type="video/mp4" />
                        </video>
                    ) : (
                        <img
                            src=""
                            alt="Mall of America"
                            className="w-full h-full object-cover"
                        />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/40 to-black/75" />
                </motion.div>

                <div className="relative z-20 h-full flex flex-col items-center justify-center px-6 text-center">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.5, rotate: -180 }}
                        animate={{ opacity: 1, scale: 1, rotate: 0 }}
                        transition={{ duration: 1.2, ease: "easeOut" }}
                        className="mb-8"
                    >
                        <div className="w-20 h-20 md:w-28 md:h-28 drop-shadow-2xl mx-auto">
                            <svg viewBox="0 0 100 100">
                                <defs>
                                    <linearGradient id="lg2" x1="0%" y1="0%" x2="100%" y2="100%">
                                        <stop offset="0%" stopColor="#dc2626" />
                                        <stop offset="25%" stopColor="#ea580c" />
                                        <stop offset="50%" stopColor="#ca8a04" />
                                        <stop offset="75%" stopColor="#16a34a" />
                                        <stop offset="100%" stopColor="#2563eb" />
                                    </linearGradient>
                                </defs>
                                <polygon points="50,10 61,35 88,35 67,52 76,77 50,60 24,77 33,52 12,35 39,35" fill="url(#lg2)" />
                            </svg>
                        </div>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                        className="text-5xl md:text-7xl lg:text-9xl font-black mb-4 tracking-tighter leading-none text-white"
                    >
                        MORE THAN A MALL
                    </motion.h1>

                    <motion.h2
                        initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.6 }}
                        className="text-2xl md:text-4xl lg:text-5xl font-bold mb-6 tracking-tight text-white/95"
                    >
                        A Global Sales Platform
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.9 }}
                        className="text-lg md:text-2xl text-white/85 mb-10 font-light max-w-3xl mx-auto"
                    >
                        Where 40 million visitors meet the world's most powerful brands
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 1.2 }}
                        className="flex flex-col sm:flex-row gap-4 justify-center"
                    >
                        <button
                            onClick={() => scrollToSection("why")}
                            className="bg-white text-black px-8 py-4 rounded-full text-base font-bold hover:bg-white/90 hover:scale-105 transition-all duration-300 shadow-2xl"
                        >
                            Explore Opportunity
                        </button>
                        <button
                            onClick={() => setShowEventsModal(true)}
                            className="bg-white/10 backdrop-blur-md border-2 border-white text-white px-8 py-4 rounded-full text-base font-bold hover:bg-white/20 hover:scale-105 transition-all duration-300"
                        >
                            Host Your Event
                        </button>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                        transition={{ duration: 1, delay: 1.8 }}
                        className="absolute bottom-10 left-1/2 -translate-x-1/2"
                    >
                        <motion.button
                            onClick={() => scrollToSection("why")}
                            animate={{ y: [0, 10, 0] }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                            className="flex flex-col items-center gap-2 text-white/75 hover:text-white transition-colors"
                        >
                            <span className="text-xs font-medium tracking-widest uppercase">Scroll to Explore</span>
                            <ChevronDown className="w-5 h-5" />
                        </motion.button>
                    </motion.div>
                </div>
            </section>
        </div>
    )
}

export default Hero
