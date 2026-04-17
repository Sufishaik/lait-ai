import VideoDemo from "https://drive.google.com/file/d/12ldGaVKfq7aUyyfkrmLraLSQec5VRVS6/view?usp=sharing"



import { motion, useScroll, useTransform } from "motion/react";
import { useEffect, useState } from "react";
import { ChevronDown, X, Calendar, Users, MapPin, ArrowRight, Sparkles } from "lucide-react";

export default function App() {
    const { scrollY } = useScroll();
    const [activeSection, setActiveSection] = useState("home");
    const [showEventsModal, setShowEventsModal] = useState(false);

    const navBg = useTransform(
        scrollY,
        [0, 100],
        ["rgba(255, 255, 255, 0)", "rgba(255, 255, 255, 0.98)"]
    );

    const heroScale = useTransform(scrollY, [0, 500], [1, 1.1]);
    const heroOpacity = useTransform(scrollY, [0, 300], [1, 0]);

    useEffect(() => {
        const handleScroll = () => {
            const sections = ["home", "why", "retail", "luxury", "dining", "entertainment", "events"];
            const current = sections.find((section) => {
                const element = document.getElementById(section);
                if (element) {
                    const rect = element.getBoundingClientRect();
                    return rect.top <= 150 && rect.bottom >= 150;
                }
                return false;
            });
            if (current) setActiveSection(current);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const scrollToSection = (id) => {
        const element = document.getElementById(id);
        element?.scrollIntoView({ behavior: "smooth" });
    };

    return (
        <div className="bg-white text-black overflow-x-hidden">
            {/* Navigation */}
            <motion.nav
                style={{ backgroundColor: navBg }}
                className="fixed top-0 left-0 right-0 z-50 px-6 md:px-12 py-5 backdrop-blur-xl shadow-sm"
            >
                <div className="max-w-7xl mx-auto flex items-center justify-between">
                    {/* Logo */}
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 relative">
                            <svg viewBox="0 0 100 100" className="w-full h-full">
                                <polygon points="50,10 61,35 88,35 67,52 76,77 50,60 24,77 33,52 12,35 39,35"
                                    fill="url(#starGradient)" />
                                <defs>
                                    <linearGradient id="starGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                        <stop offset="0%" style={{ stopColor: '#dc2626', stopOpacity: 1 }} />
                                        <stop offset="25%" style={{ stopColor: '#ea580c', stopOpacity: 1 }} />
                                        <stop offset="50%" style={{ stopColor: '#ca8a04', stopOpacity: 1 }} />
                                        <stop offset="75%" style={{ stopColor: '#16a34a', stopOpacity: 1 }} />
                                        <stop offset="100%" style={{ stopColor: '#2563eb', stopOpacity: 1 }} />
                                    </linearGradient>
                                </defs>
                            </svg>
                        </div>
                        <span className="font-bold text-lg tracking-tight text-black">
                            Mall of America
                        </span>
                    </div>

                    {/* Nav Links */}
                    <div className="hidden md:flex items-center gap-8">
                        {[
                            { label: "Home", id: "home" },
                            { label: "Why MOA", id: "why" },
                            { label: "Retail", id: "retail" },
                            { label: "Entertainment", id: "entertainment" },
                        ].map((item) => (
                            <button
                                key={item.id}
                                onClick={() => scrollToSection(item.id)}
                                className={`text-sm tracking-wide transition-all ${activeSection === item.id
                                    ? "opacity-100 font-semibold text-black"
                                    : "opacity-60 hover:opacity-100 text-black"
                                    }`}
                            >
                                {item.label}
                            </button>
                        ))}
                        <button
                            onClick={() => setShowEventsModal(true)}
                            className="bg-gradient-to-r from-amber-600 to-orange-600 text-white px-6 py-2.5 rounded-full text-sm font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300"
                        >
                            Book Event
                        </button>
                    </div>
                </div>
            </motion.nav>

            {/* HERO SECTION - CINEMATIC ENTRANCE */}
            <section id="home" className="relative h-screen w-full overflow-hidden">
                {/* Video Background - Replace image with <video> tag */}
                <motion.div
                    style={{ scale: heroScale, opacity: heroOpacity }}
                    className="absolute inset-0"
                >
                    <video autoPlay muted loop playsInline className="w-full h-full object-cover">
                        <source src={VideoDemo} type="video/mp4" />
                    </video>

                    <div className="w-full h-full bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
                        <img
                            src="https://images.unsplash.com/photo-1649184046382-b815f1f43d06?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYWxsJTIwb2YlMjBhbWVyaWNhJTIwYWVyaWFsJTIwdmlld3xlbnwxfHx8fDE3NzYzNTY5NTJ8MA&ixlib=rb-4.1.0&q=80&w=1080"
                            alt="Mall of America"
                            className="w-full h-full object-cover opacity-60"
                        />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/70" />
                </motion.div>

                <div className="relative z-20 h-full flex flex-col items-center justify-center px-6 md:px-8 text-center">
                    {/* Animated Star Logo */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.5, rotate: -180 }}
                        animate={{ opacity: 1, scale: 1, rotate: 0 }}
                        transition={{ duration: 1.2, ease: "easeOut" }}
                        className="mb-10"
                    >
                        <div className="w-24 h-24 md:w-32 md:h-32 drop-shadow-2xl">
                            <svg viewBox="0 0 100 100" className="w-full h-full">
                                <polygon points="50,10 61,35 88,35 67,52 76,77 50,60 24,77 33,52 12,35 39,35"
                                    fill="url(#starGradient2)" />
                                <defs>
                                    <linearGradient id="starGradient2" x1="0%" y1="0%" x2="100%" y2="100%">
                                        <stop offset="0%" style={{ stopColor: '#dc2626', stopOpacity: 1 }} />
                                        <stop offset="25%" style={{ stopColor: '#ea580c', stopOpacity: 1 }} />
                                        <stop offset="50%" style={{ stopColor: '#ca8a04', stopOpacity: 1 }} />
                                        <stop offset="75%" style={{ stopColor: '#16a34a', stopOpacity: 1 }} />
                                        <stop offset="100%" style={{ stopColor: '#2563eb', stopOpacity: 1 }} />
                                    </linearGradient>
                                </defs>
                            </svg>
                        </div>
                    </motion.div>

                    {/* Staggered Text Animation */}
                    <div className="max-w-6xl">
                        <motion.h1
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.3 }}
                            className="text-5xl md:text-7xl lg:text-9xl font-black mb-6 tracking-tighter leading-none text-white"
                        >
                            MORE THAN A MALL
                        </motion.h1>

                        <motion.h2
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.6 }}
                            className="text-3xl md:text-5xl lg:text-6xl font-bold mb-8 tracking-tight leading-tight text-white/95"
                        >
                            A Global Sales Platform
                        </motion.h2>

                        <motion.p
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.9 }}
                            className="text-xl md:text-2xl lg:text-3xl text-white/85 mb-12 font-light max-w-4xl mx-auto leading-relaxed"
                        >
                            Where 40 million visitors meet the world's most powerful brands
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 1.2 }}
                            className="flex flex-col sm:flex-row gap-6 justify-center"
                        >
                            <button
                                onClick={() => scrollToSection("why")}
                                className="bg-white text-black px-10 py-5 rounded-full text-lg font-bold hover:bg-white/90 hover:scale-105 transition-all duration-300 shadow-2xl"
                            >
                                Explore Opportunity
                            </button>
                            <button
                                onClick={() => setShowEventsModal(true)}
                                className="bg-white/10 backdrop-blur-md border-2 border-white text-white px-10 py-5 rounded-full text-lg font-bold hover:bg-white/20 hover:scale-105 transition-all duration-300"
                            >
                                Host Your Event
                            </button>
                        </motion.div>
                    </div>

                    {/* Scroll Indicator */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1, delay: 1.8 }}
                        className="absolute bottom-12 left-1/2 transform -translate-x-1/2"
                    >
                        <motion.button
                            onClick={() => scrollToSection("why")}
                            animate={{ y: [0, 10, 0] }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                            className="flex flex-col items-center gap-2 text-white/80 hover:text-white transition-colors"
                        >
                            <span className="text-sm font-medium tracking-wider">SCROLL TO EXPLORE</span>
                            <ChevronDown className="w-6 h-6" />
                        </motion.button>
                    </motion.div>
                </div>
            </section>

            {/* WHY MALL OF AMERICA - SALES PITCH */}
            <section id="why" className="py-32 md:py-40 px-6 md:px-12 bg-white">
                <div className="max-w-7xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.8 }}
                        className="text-center mb-20"
                    >
                        <h2 className="text-5xl md:text-6xl lg:text-7xl font-black mb-8 tracking-tight leading-tight">
                            WHERE BRANDS MEET<br />THEIR AUDIENCE
                        </h2>
                        <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto font-light leading-relaxed">
                            40 million annual visitors. Premium demographics. Unmatched foot traffic. Your brand belongs here.
                        </p>
                    </motion.div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10">
                        {[
                            {
                                value: "40M+",
                                label: "Annual Visitors",
                                sublabel: "Higher than most cities",
                                delay: 0
                            },
                            {
                                value: "5.6M",
                                label: "Square Feet",
                                sublabel: "Largest mall in the US",
                                delay: 0.1
                            },
                            {
                                value: "$200+",
                                label: "Avg Spend/Visit",
                                sublabel: "Premium purchasing power",
                                delay: 0.2
                            },
                            {
                                value: "365",
                                label: "Days Open",
                                sublabel: "Year-round traffic",
                                delay: 0.3
                            },
                        ].map((stat) => (
                            <motion.div
                                key={stat.label}
                                initial={{ opacity: 0, y: 40, scale: 0.9 }}
                                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                                viewport={{ once: true, margin: "-100px" }}
                                transition={{ duration: 0.6, delay: stat.delay }}
                                whileHover={{ scale: 1.05 }}
                                className="text-center p-8 rounded-2xl bg-gradient-to-br from-gray-50 to-white border border-gray-100 hover:shadow-2xl transition-all duration-300"
                            >
                                <div className="text-5xl md:text-6xl lg:text-7xl font-black mb-4 bg-gradient-to-br from-amber-600 to-orange-600 bg-clip-text text-transparent">
                                    {stat.value}
                                </div>
                                <div className="text-lg md:text-xl font-bold mb-2 text-black">
                                    {stat.label}
                                </div>
                                <div className="text-sm md:text-base text-gray-500">
                                    {stat.sublabel}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* RETAIL - VIDEO SECTION */}
            <section id="retail" className="relative py-32 md:py-40 px-6 md:px-12 bg-black text-white overflow-hidden">
                {/* Background Video/Image */}
                <div className="absolute inset-0">
                    {/* 
            ADD VIDEO HERE:
            <video autoPlay muted loop playsInline className="w-full h-full object-cover opacity-40">
              <source src="/videos/retail-experience.mp4" type="video/mp4" />
            </video>
          */}
                    <img
                        src="https://images.unsplash.com/photo-1661260178494-48ed9714c77c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzaG9wcGluZyUyMG1hbGwlMjBpbnRlcmlvciUyMHBlb3BsZXxlbnwxfHx8fDE3NzYzNTY5NTJ8MA&ixlib=rb-4.1.0&q=80&w=1080"
                        alt="Retail"
                        className="w-full h-full object-cover opacity-30"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-black via-black/80 to-black" />
                </div>

                <div className="max-w-7xl mx-auto relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.8 }}
                        className="text-center mb-20"
                    >
                        <h2 className="text-5xl md:text-6xl lg:text-8xl font-black mb-8 tracking-tight leading-tight">
                            TURN YOUR BRAND<br />INTO AN EXPERIENCE
                        </h2>
                        <p className="text-xl md:text-2xl text-white/80 max-w-4xl mx-auto font-light leading-relaxed">
                            Join 500+ global brands creating unforgettable retail moments
                        </p>
                    </motion.div>

                    {/* Brand Showcase */}
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-6 md:gap-8 mb-16">
                        {[
                            "NIKE",
                            "APPLE",
                            "LULULEMON",
                            "LOUIS VUITTON",
                            "NORDSTROM",
                            "SEPHORA",
                            "TESLA",
                            "GUCCI",
                            "OMEGA",
                            "BURBERRY"
                        ].map((brand, index) => (
                            <motion.div
                                key={brand}
                                initial={{ opacity: 0, scale: 0.8 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true, margin: "-100px" }}
                                transition={{ duration: 0.5, delay: index * 0.05 }}
                                whileHover={{ scale: 1.1, backgroundColor: "rgba(255,255,255,0.15)" }}
                                className="aspect-square flex items-center justify-center p-6 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-white/30 transition-all duration-300 cursor-pointer"
                            >
                                <span className="text-sm md:text-base font-bold tracking-wider text-center">
                                    {brand}
                                </span>
                            </motion.div>
                        ))}
                    </div>

                    {/* Leasing CTA */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="text-center"
                    >
                        <button className="bg-gradient-to-r from-amber-600 to-orange-600 text-white px-12 py-6 rounded-full text-xl font-bold hover:shadow-2xl hover:scale-105 transition-all duration-300 inline-flex items-center gap-3">
                            Explore Leasing Opportunities
                            <ArrowRight className="w-6 h-6" />
                        </button>
                    </motion.div>
                </div>
            </section>

            {/* LUXURY POSITIONING */}
            <section id="luxury" className="py-32 md:py-40 px-6 md:px-12 bg-gradient-to-br from-gray-50 to-white">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.8 }}
                        >
                            <div className="inline-flex items-center gap-2 bg-amber-100 text-amber-800 px-4 py-2 rounded-full text-sm font-semibold mb-6">
                                <Sparkles className="w-4 h-4" />
                                <span>Luxury Positioning</span>
                            </div>

                            <h2 className="text-5xl md:text-6xl lg:text-7xl font-black mb-8 tracking-tight leading-tight">
                                PREMIUM<br />FLAGSHIP<br />SPACES
                            </h2>

                            <p className="text-xl md:text-2xl text-gray-600 mb-10 font-light leading-relaxed">
                                High-net-worth shoppers seeking luxury experiences. Your flagship deserves this audience.
                            </p>

                            <div className="space-y-4 mb-10">
                                {[
                                    { metric: "70%", label: "Affluent demographics" },
                                    { metric: "$500+", label: "Luxury avg transaction" },
                                    { metric: "100+", label: "Premium brands" },
                                ].map((item, index) => (
                                    <motion.div
                                        key={item.label}
                                        initial={{ opacity: 0, x: -30 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.6, delay: index * 0.1 }}
                                        whileHover={{ x: 10 }}
                                        className="flex items-center gap-6 p-6 bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300"
                                    >
                                        <div className="text-4xl font-black text-amber-600">{item.metric}</div>
                                        <div className="text-lg font-semibold text-gray-700">{item.label}</div>
                                    </motion.div>
                                ))}
                            </div>

                            <button className="bg-black text-white px-10 py-5 rounded-full text-lg font-bold hover:bg-gray-900 hover:scale-105 transition-all duration-300 shadow-lg">
                                Request Luxury Leasing Info
                            </button>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.8 }}
                            className="relative h-[600px] md:h-[700px] rounded-2xl overflow-hidden group"
                        >
                            <img
                                src="https://images.unsplash.com/photo-1769981653696-5ce5a59263bf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBmYXNoaW9uJTIwYm91dGlxdWUlMjBzdG9yZXxlbnwxfHx8fDE3NzYyNzAwNDl8MA&ixlib=rb-4.1.0&q=80&w=1080"
                                alt="Luxury"
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* DINING EXPERIENCE */}
            <section id="dining" className="py-32 md:py-40 px-6 md:px-12 bg-white">
                <div className="max-w-7xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.8 }}
                        className="text-center mb-20"
                    >
                        <h2 className="text-5xl md:text-6xl lg:text-7xl font-black mb-8 tracking-tight">
                            DINING AS A DESTINATION
                        </h2>
                        <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto font-light">
                            80+ restaurants. All-day traffic. Premium spending power.
                        </p>
                    </motion.div>

                    {/* Dining Grid */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        {[
                            "https://images.unsplash.com/photo-1513772457252-c0417654a2a0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaW5lJTIwZGluaW5nJTIwcmVzdGF1cmFudCUyMGVsZWdhbnR8ZW58MXx8fHwxNzc2MzIwNDAyfDA&ixlib=rb-4.1.0&q=80&w=1080",
                            "https://images.unsplash.com/photo-1774635800472-41eaa93c1453?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdXNoaSUyMGphcGFuZXNlJTIwZm9vZCUyMHBsYXR0ZXJ8ZW58MXx8fHwxNzc2MjU5ODE2fDA&ixlib=rb-4.1.0&q=80&w=1080",
                            "https://images.unsplash.com/photo-1513772457252-c0417654a2a0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaW5lJTIwZGluaW5nJTIwcmVzdGF1cmFudCUyMGVsZWdhbnR8ZW58MXx8fHwxNzc2MzIwNDAyfDA&ixlib=rb-4.1.0&q=80&w=1080",
                            "https://images.unsplash.com/photo-1774635800472-41eaa93c1453?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdXNoaSUyMGphcGFuZXNlJTIwZm9vZCUyMHBsYXR0ZXJ8ZW58MXx8fHwxNzc2MjU5ODE2fDA&ixlib=rb-4.1.0&q=80&w=1080",
                        ].map((img, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, scale: 0.8 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true, margin: "-100px" }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                whileHover={{ scale: 1.05, zIndex: 10 }}
                                className="relative h-64 md:h-80 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300"
                            >
                                <img
                                    src={img}
                                    alt={`Dining ${index + 1}`}
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ENTERTAINMENT - BIG VIDEO SECTION */}
            <section id="entertainment" className="relative py-40 md:py-52 px-6 md:px-12 bg-black text-white overflow-hidden">
                {/* Background Video */}
                <div className="absolute inset-0">
                    {/* 
            ADD ENTERTAINMENT VIDEO HERE:
            <video autoPlay muted loop playsInline className="w-full h-full object-cover opacity-50">
              <source src="/videos/entertainment.mp4" type="video/mp4" />
            </video>
          */}
                    <img
                        src="https://images.unsplash.com/photo-1581003014628-16de2108de2c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuaWNrZWxvZGVvbiUyMHVuaXZlcnNlJTIwdGhlbWUlMjBwYXJrfGVufDF8fHx8MTc3NjM1Njk1M3ww&ixlib=rb-4.1.0&q=80&w=1080"
                        alt="Entertainment"
                        className="w-full h-full object-cover opacity-40"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-black via-black/70 to-black" />
                </div>

                <div className="max-w-7xl mx-auto relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 1 }}
                        className="text-center mb-20"
                    >
                        <h2 className="text-5xl md:text-7xl lg:text-9xl font-black mb-10 tracking-tighter leading-none">
                            BEYOND<br />SHOPPING
                        </h2>
                        <p className="text-2xl md:text-3xl lg:text-4xl text-white/90 font-light max-w-4xl mx-auto leading-relaxed">
                            8 acres of theme park. Indoor water park. Live concerts. Brand activations.
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
                        {[
                            {
                                title: "Nickelodeon Universe",
                                subtitle: "8-Acre Indoor Theme Park",
                                stat: "5M+ annual visitors",
                            },
                            {
                                title: "SEA LIFE Aquarium",
                                subtitle: "10,000+ Sea Creatures",
                                stat: "Interactive experiences",
                            },
                            {
                                title: "Live Event Venue",
                                subtitle: "Concerts & Brand Activations",
                                stat: "50K max capacity",
                            },
                        ].map((item, index) => (
                            <motion.div
                                key={item.title}
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-100px" }}
                                transition={{ duration: 0.6, delay: index * 0.2 }}
                                whileHover={{ scale: 1.05 }}
                                className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-8 md:p-10 hover:bg-white/10 hover:border-white/30 transition-all duration-300"
                            >
                                <h3 className="text-3xl md:text-4xl font-black mb-3">{item.title}</h3>
                                <p className="text-xl text-white/70 mb-4">{item.subtitle}</p>
                                <div className="text-amber-400 font-semibold text-lg">{item.stat}</div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* EVENTS CTA */}
            <section id="events" className="py-40 md:py-52 px-6 md:px-12 bg-gradient-to-br from-amber-600 via-orange-600 to-red-600 text-white relative overflow-hidden">
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1),transparent_50%)]" />
                </div>

                <div className="max-w-5xl mx-auto text-center relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 1 }}
                    >
                        <h2 className="text-5xl md:text-7xl lg:text-9xl font-black mb-10 tracking-tighter leading-none">
                            HOST YOUR<br />NEXT EVENT
                        </h2>

                        <p className="text-2xl md:text-3xl lg:text-4xl mb-16 font-light leading-relaxed">
                            Product launches. Concerts. Activations.<br />40M eyeballs. World-class infrastructure.
                        </p>

                        <motion.button
                            onClick={() => setShowEventsModal(true)}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="bg-white text-orange-600 px-16 py-7 rounded-full text-2xl font-black hover:bg-white/95 transition-all duration-300 shadow-2xl inline-flex items-center gap-4"
                        >
                            Explore Event Spaces
                            <ArrowRight className="w-8 h-8" />
                        </motion.button>

                        {/* Stats */}
                        <div className="grid grid-cols-3 gap-8 mt-20 pt-20 border-t border-white/20">
                            {[
                                { value: "365+", label: "Events annually" },
                                { value: "50K", label: "Max capacity" },
                                { value: "24/7", label: "Production support" },
                            ].map((stat, index) => (
                                <motion.div
                                    key={stat.label}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.6, delay: index * 0.1 }}
                                >
                                    <div className="text-5xl md:text-6xl font-black mb-3">{stat.value}</div>
                                    <div className="text-lg md:text-xl text-white/90">{stat.label}</div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-black text-white py-16 px-6 md:px-12 border-t border-white/10">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
                        <div>
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-10 h-10">
                                    <svg viewBox="0 0 100 100" className="w-full h-full">
                                        <polygon points="50,10 61,35 88,35 67,52 76,77 50,60 24,77 33,52 12,35 39,35"
                                            fill="url(#starGradient3)" />
                                        <defs>
                                            <linearGradient id="starGradient3" x1="0%" y1="0%" x2="100%" y2="100%">
                                                <stop offset="0%" style={{ stopColor: '#dc2626', stopOpacity: 1 }} />
                                                <stop offset="25%" style={{ stopColor: '#ea580c', stopOpacity: 1 }} />
                                                <stop offset="50%" style={{ stopColor: '#ca8a04', stopOpacity: 1 }} />
                                                <stop offset="75%" style={{ stopColor: '#16a34a', stopOpacity: 1 }} />
                                                <stop offset="100%" style={{ stopColor: '#2563eb', stopOpacity: 1 }} />
                                            </linearGradient>
                                        </defs>
                                    </svg>
                                </div>
                                <span className="font-bold text-lg">Mall of America</span>
                            </div>
                            <p className="text-sm text-white/60 leading-relaxed">
                                The nation's premier retail and entertainment destination
                            </p>
                        </div>

                        <div>
                            <h4 className="font-bold mb-4 text-lg">Leasing</h4>
                            <ul className="space-y-3 text-sm text-white/60">
                                <li className="hover:text-white cursor-pointer transition-colors">Retail Spaces</li>
                                <li className="hover:text-white cursor-pointer transition-colors">Luxury Flagship</li>
                                <li className="hover:text-white cursor-pointer transition-colors">F&B Opportunities</li>
                                <li className="hover:text-white cursor-pointer transition-colors">Pop-Up Activations</li>
                            </ul>
                        </div>

                        <div>
                            <h4 className="font-bold mb-4 text-lg">Events</h4>
                            <ul className="space-y-3 text-sm text-white/60">
                                <li className="hover:text-white cursor-pointer transition-colors">Product Launches</li>
                                <li className="hover:text-white cursor-pointer transition-colors">Corporate Events</li>
                                <li className="hover:text-white cursor-pointer transition-colors">Concerts & Shows</li>
                                <li className="hover:text-white cursor-pointer transition-colors">Brand Activations</li>
                            </ul>
                        </div>

                        <div>
                            <h4 className="font-bold mb-4 text-lg">Contact</h4>
                            <ul className="space-y-3 text-sm text-white/60">
                                <li>Bloomington, Minnesota</li>
                                <li>leasing@mallofamerica.com</li>
                                <li>events@mallofamerica.com</li>
                                <li>(952) 883-8800</li>
                            </ul>
                        </div>
                    </div>

                    <div className="border-t border-white/10 pt-8 text-center">
                        <p className="text-sm text-white/50">
                            © 2026 Mall of America. 40 million annual visitors. 5.6 million square feet. America's largest entertainment destination.
                        </p>
                    </div>
                </div>
            </footer>

            {/* EVENTS MODULE MODAL - PHASE 2 EXPANDABILITY */}
            {showEventsModal && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 bg-black/90 backdrop-blur-lg z-[100] overflow-y-auto"
                >
                    <div className="min-h-screen py-12 px-6 md:px-12">
                        <div className="max-w-6xl mx-auto">
                            {/* Header */}
                            <div className="flex items-center justify-between mb-12">
                                <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tight">
                                    Event Spaces
                                </h2>
                                <button
                                    onClick={() => setShowEventsModal(false)}
                                    className="w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
                                >
                                    <X className="w-6 h-6 text-white" />
                                </button>
                            </div>

                            {/* Venue Cards */}
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
                                {[
                                    {
                                        name: "Grand Rotunda",
                                        capacity: "10,000+",
                                        area: "50,000 sq ft",
                                        image: "https://images.unsplash.com/photo-1649184046382-b815f1f43d06?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYWxsJTIwb2YlMjBhbWVyaWNhJTIwYWVyaWFsJTIwdmlld3xlbnwxfHx8fDE3NzYzNTY5NTJ8MA&ixlib=rb-4.1.0&q=80&w=1080",
                                        features: ["Central atrium", "360° visibility", "Premium AV", "Full production support"]
                                    },
                                    {
                                        name: "Entertainment Pavilion",
                                        capacity: "5,000",
                                        area: "30,000 sq ft",
                                        image: "https://images.unsplash.com/photo-1648260029310-5f1da359af9d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb25jZXJ0JTIwY3Jvd2QlMjBmZXN0aXZhbCUyMGxpZ2h0c3xlbnwxfHx8fDE3NzYzNTY5NTd8MA&ixlib=rb-4.1.0&q=80&w=1080",
                                        features: ["Stage rigging", "Live performance setup", "VIP lounges", "Backstage facilities"]
                                    },
                                    {
                                        name: "Brand Activation Zones",
                                        capacity: "2,000-5,000",
                                        area: "10,000-25,000 sq ft",
                                        image: "https://images.unsplash.com/photo-1661260178494-48ed9714c77c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzaG9wcGluZyUyMG1hbGwlMjBpbnRlcmlvciUyMHBlb3BsZXxlbnwxfHx8fDE3NzYzNTY5NTJ8MA&ixlib=rb-4.1.0&q=80&w=1080",
                                        features: ["High foot traffic", "Flexible duration", "Custom buildouts", "Experiential marketing"]
                                    },
                                    {
                                        name: "Corporate Event Suites",
                                        capacity: "500-2,000",
                                        area: "5,000-15,000 sq ft",
                                        image: "https://images.unsplash.com/photo-1513772457252-c0417654a2a0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaW5lJTIwZGluaW5nJTIwcmVzdGF1cmFudCUyMGVsZWdhbnR8ZW58MXx8fHwxNzc2MzIwNDAyfDA&ixlib=rb-4.1.0&q=80&w=1080",
                                        features: ["Premium catering", "Private access", "AV equipment", "Dedicated event staff"]
                                    },
                                ].map((venue, index) => (
                                    <motion.div
                                        key={venue.name}
                                        initial={{ opacity: 0, y: 30 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.5, delay: index * 0.1 }}
                                        whileHover={{ scale: 1.02 }}
                                        className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl overflow-hidden hover:border-white/30 transition-all duration-300"
                                    >
                                        <div className="relative h-64">
                                            <img src={venue.image} alt={venue.name} className="w-full h-full object-cover" />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent" />
                                        </div>
                                        <div className="p-8">
                                            <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">{venue.name}</h3>
                                            <div className="flex items-center gap-6 mb-6 text-white/70">
                                                <div className="flex items-center gap-2">
                                                    <Users className="w-5 h-5" />
                                                    <span>{venue.capacity}</span>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <MapPin className="w-5 h-5" />
                                                    <span>{venue.area}</span>
                                                </div>
                                            </div>
                                            <div className="space-y-2 mb-6">
                                                {venue.features.map((feature, idx) => (
                                                    <div key={idx} className="flex items-center gap-2 text-white/80 text-sm">
                                                        <div className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                                                        <span>{feature}</span>
                                                    </div>
                                                ))}
                                            </div>
                                            <button className="w-full bg-gradient-to-r from-amber-600 to-orange-600 text-white px-6 py-3 rounded-full font-semibold hover:shadow-lg transition-all duration-300">
                                                Request Information
                                            </button>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>

                            {/* Contact Form */}
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: 0.4 }}
                                className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-8 md:p-12"
                            >
                                <h3 className="text-3xl md:text-4xl font-bold text-white mb-8">Book Your Event</h3>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                                    <input
                                        type="text"
                                        placeholder="Full Name"
                                        className="bg-white/10 border border-white/20 rounded-lg px-6 py-4 text-white placeholder:text-white/50 focus:outline-none focus:border-amber-500 transition-colors"
                                    />
                                    <input
                                        type="email"
                                        placeholder="Email Address"
                                        className="bg-white/10 border border-white/20 rounded-lg px-6 py-4 text-white placeholder:text-white/50 focus:outline-none focus:border-amber-500 transition-colors"
                                    />
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                                    <input
                                        type="tel"
                                        placeholder="Phone Number"
                                        className="bg-white/10 border border-white/20 rounded-lg px-6 py-4 text-white placeholder:text-white/50 focus:outline-none focus:border-amber-500 transition-colors"
                                    />
                                    <input
                                        type="text"
                                        placeholder="Company Name"
                                        className="bg-white/10 border border-white/20 rounded-lg px-6 py-4 text-white placeholder:text-white/50 focus:outline-none focus:border-amber-500 transition-colors"
                                    />
                                </div>

                                <textarea
                                    placeholder="Tell us about your event..."
                                    rows={4}
                                    className="w-full bg-white/10 border border-white/20 rounded-lg px-6 py-4 text-white placeholder:text-white/50 focus:outline-none focus:border-amber-500 transition-colors mb-6 resize-none"
                                />

                                <button className="w-full bg-gradient-to-r from-amber-600 to-orange-600 text-white px-8 py-5 rounded-full text-lg font-bold hover:shadow-2xl transition-all duration-300 inline-flex items-center justify-center gap-3">
                                    Submit Inquiry
                                    <Calendar className="w-5 h-5" />
                                </button>

                                <p className="text-center text-white/60 text-sm mt-6">
                                    Our events team will respond within 24 hours
                                </p>
                            </motion.div>
                        </div>
                    </div>
                </motion.div>
            )}
        </div>
    );
}
