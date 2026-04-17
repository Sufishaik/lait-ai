import React from 'react'
import { motion, useScroll, useTransform } from "motion/react";
import {
    ChevronDown, X, Calendar, Users, MapPin, ArrowRight,
    Sparkles, Menu, ShoppingBag, Utensils, Star, Zap, Building2
} from "lucide-react";
const Footer = ({ setShowLeasing, setShowEventsModal }) => {
    return (
        <div>
            <footer className="bg-black text-white py-14 px-6 md:px-12 border-t border-white/10">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-10">
                        <div>
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-8 h-8">
                                    <svg viewBox="0 0 100 100">
                                        <defs>
                                            <linearGradient id="lg3" x1="0%" y1="0%" x2="100%" y2="100%">
                                                <stop offset="0%" stopColor="#dc2626" />
                                                <stop offset="50%" stopColor="#ca8a04" />
                                                <stop offset="100%" stopColor="#2563eb" />
                                            </linearGradient>
                                        </defs>
                                        <polygon points="50,10 61,35 88,35 67,52 76,77 50,60 24,77 33,52 12,35 39,35" fill="url(#lg3)" />
                                    </svg>
                                </div>
                                <span className="font-bold">Mall of America</span>
                            </div>
                            <p className="text-xs text-white/50 leading-relaxed">
                                America's premier retail & entertainment destination
                            </p>
                        </div>
                        <div>
                            <h4 className="font-bold mb-4">Leasing</h4>
                            <ul className="space-y-2 text-sm text-white/55">
                                {["Retail Spaces", "Luxury Flagship", "F&B Opportunities", "Pop-Up Activations"].map(l => (
                                    <li key={l} className="hover:text-white cursor-pointer transition-colors" onClick={() => setShowLeasing(true)}>{l}</li>
                                ))}
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-bold mb-4">Events</h4>
                            <ul className="space-y-2 text-sm text-white/55">
                                {["Product Launches", "Corporate Events", "Concerts & Shows", "Brand Activations"].map(l => (
                                    <li key={l} className="hover:text-white cursor-pointer transition-colors" onClick={() => setShowEventsModal(true)}>{l}</li>
                                ))}
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-bold mb-4">Contact</h4>
                            <ul className="space-y-2 text-sm text-white/55">
                                <li>Bloomington, Minnesota</li>
                                <li>leasing@mallofamerica.com</li>
                                <li>events@mallofamerica.com</li>
                                <li>(952) 883-8800</li>
                            </ul>
                        </div>
                    </div>
                    <div className="border-t border-white/10 pt-6 text-center">
                        <p className="text-xs text-white/40">
                            © 2026 Mall of America® · 40M annual visitors · 5.6M sq ft · America's largest entertainment destination
                        </p>
                    </div>
                </div>
            </footer>
        </div>
    )
}

export default Footer
