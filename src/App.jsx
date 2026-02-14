import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Github,
    Linkedin,
    Mail,
    MapPin,
    Phone,
    ExternalLink,
    Code2,
    Sparkles,
    Terminal,
    Zap,
    Hash,
    Smartphone,
    Database,
    Layers,
    ChevronDown,
    Briefcase,
    GraduationCap,
    Globe,
    Download,
    Sun,
    Moon,
    Server,
    Play
} from 'lucide-react';
import confetti from 'canvas-confetti';

// Shared Components
const SectionHeading = ({ children, subtitle, align = "center" }) => (
    <div className="section-header" style={{ marginBottom: '60px', textAlign: align }}>
        <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="accent-text"
            style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: 800, marginBottom: '12px' }}
        >
            {children}
        </motion.h2>
        {subtitle && (
            <motion.p
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                style={{ color: 'var(--text-muted)', fontSize: '1.2rem', maxWidth: '700px', margin: align === "center" ? '0 auto' : '0' }}
            >
                {subtitle}
            </motion.p>
        )}
        <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: '80px' }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.8 }}
            style={{ height: '5px', background: 'var(--accent-primary)', margin: align === "center" ? '20px auto 0' : '20px 0 0', borderRadius: '4px' }}
        />
    </div>
);

const Card = ({ children, className = "", noPadding = false, delay = 0 }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.5, delay }}
        whileHover={{ y: -10, scale: 1.02 }}
        className={`glass-card card-hover ${className}`}
        style={{ padding: noPadding ? '0' : '32px', transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)', height: '100%', display: 'flex', flexDirection: 'column' }}
    >
        {children}
    </motion.div>
);

const App = () => {
    const [scrolled, setScrolled] = useState(false);
    const [isDarkMode, setIsDarkMode] = useState(true);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener('scroll', handleScroll);

        // Load theme
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'light') {
            setIsDarkMode(false);
            document.body.classList.add('light');
        }

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const toggleTheme = () => {
        setIsDarkMode(!isDarkMode);
        document.body.classList.toggle('light');
        localStorage.setItem('theme', !isDarkMode ? 'dark' : 'light');
    };

    const handleConfetti = () => {
        confetti({
            particleCount: 150,
            spread: 80,
            origin: { y: 0.6 },
            colors: isDarkMode ? ['#3b82f6', '#06b6d4', '#f8fafc'] : ['#2563eb', '#0891b2', '#0f172a']
        });
    };

    const [formData, setFormData] = useState({ name: '', email: '', message: '' });
    const [selectedVideo, setSelectedVideo] = useState(null);

    const VideoModal = ({ videoSrc, onClose }) => (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
                position: 'fixed', inset: 0, zIndex: 1000,
                background: 'rgba(0,0,0,0.9)', backdropFilter: 'blur(10px)',
                display: 'flex', alignItems: 'center', justifyContent: 'center', p: 4
            }}
            onClick={onClose}
        >
            <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                style={{ width: '90%', maxWidth: '1000px', position: 'relative', aspectRatio: '16/9' }}
                onClick={e => e.stopPropagation()}
            >
                <button
                    onClick={onClose}
                    style={{
                        position: 'absolute', top: -40, right: 0,
                        background: 'transparent', color: 'white', border: 'none', cursor: 'pointer', fontSize: '1.2rem', fontWeight: 'bold'
                    }}
                >
                    Close ✕
                </button>
                <video
                    src={videoSrc}
                    controls
                    autoPlay
                    style={{ width: '100%', height: '100%', borderRadius: '24px', boxShadow: '0 0 50px rgba(0,0,0,0.5)' }}
                />
            </motion.div>
        </motion.div>
    );


    return (
        <div className={`app-container ${isDarkMode ? 'dark' : 'light'}`}>
            <AnimatePresence>
                {selectedVideo && <VideoModal videoSrc={selectedVideo} onClose={() => setSelectedVideo(null)} />}
            </AnimatePresence>
            {/* Background Decor */}
            <div style={{ position: 'fixed', top: '10%', left: '-5%', width: '600px', height: '600px', background: 'var(--accent-primary)', filter: 'blur(180px)', opacity: isDarkMode ? 0.08 : 0.05, zIndex: -1 }}></div>
            <div style={{ position: 'fixed', bottom: '10%', right: '-5%', width: '500px', height: '500px', background: 'var(--accent-secondary)', filter: 'blur(180px)', opacity: isDarkMode ? 0.08 : 0.05, zIndex: -1 }}></div>

            {/* Navigation */}
            <nav style={{
                position: 'fixed', top: 0, width: '100%', zIndex: 100,
                padding: scrolled ? '12px 6%' : '24px 6%',
                background: scrolled ? 'var(--nav-bg)' : 'transparent',
                backdropFilter: scrolled ? 'blur(12px)' : 'none',
                borderBottom: scrolled ? '1px solid var(--glass-border)' : 'none',
                transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                display: 'flex', justifyContent: 'space-between', alignItems: 'center'
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '32px' }}>
                    <div
                        style={{
                            width: '45px', height: '45px',
                            overflow: 'hidden',
                            cursor: 'pointer'
                        }}
                        onClick={handleConfetti}
                    >
                        <img src="/assets/myphoto.png" alt="Profile" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                    </div>
                    <a href="#hero" style={{ fontWeight: 900, fontSize: '1.2rem', letterSpacing: '-0.5px', color: 'var(--text-main)', textDecoration: 'none' }}>
                        Home
                    </a>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '40px' }}>
                    <div style={{ display: 'flex', gap: '32px', fontWeight: 600 }} className="nav-links">
                        <a href="#projects" className="nav-link">Portfolio</a>
                        <a href="#experience" className="nav-link">Experience</a>
                        <a href="#services" className="nav-link">Services</a>
                        <a href="#about" className="nav-link">About</a>
                        <a href="#contact" className="nav-link">Contact</a>
                    </div>

                    <button onClick={toggleTheme} className="theme-toggle" title="Toggle Theme">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={isDarkMode ? 'moon' : 'sun'}
                                initial={{ y: 10, opacity: 0, rotate: -45 }}
                                animate={{ y: 0, opacity: 1, rotate: 0 }}
                                exit={{ y: -10, opacity: 0, rotate: 45 }}
                                transition={{ duration: 0.2 }}
                            >
                                {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
                            </motion.div>
                        </AnimatePresence>
                    </button>
                </div>
            </nav>

            <section id="hero" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', padding: '120px 6% 60px 6%', position: 'relative' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '60px', alignItems: 'center', width: '100%' }}>
                    {/* Left Content */}
                    <div style={{ textAlign: 'left' }}>
                        <motion.h1
                            initial={{ opacity: 0, x: -30 }}
                            animate={{ opacity: 1, x: 0 }}
                            style={{ fontSize: 'clamp(3rem, 8vw, 6rem)', fontWeight: 900, lineHeight: 1, marginBottom: '20px', letterSpacing: '-0.02em', position: 'relative' }}
                        >
                            Kaleab<br />Mezgebe
                            <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: '120px' }}
                                transition={{ delay: 0.5, duration: 0.8 }}
                                style={{ height: '6px', background: 'var(--accent-primary)', marginTop: '10px', borderRadius: '3px' }}
                            />
                        </motion.h1>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            style={{ marginTop: '40px', maxWidth: '550px' }}
                        >
                            <div style={{ marginBottom: '25px' }}>
                                <span style={{
                                    fontSize: '0.9rem',
                                    fontWeight: 700,
                                    color: 'var(--accent-primary)',
                                    textTransform: 'uppercase',
                                    letterSpacing: '2px'
                                }}>
                                    <h2>Mobile Application Developer</h2>
                                </span>
                                {/* <h3 style={{ fontSize: '2.4rem', fontWeight: 900, marginTop: '10px', lineHeight: 1.1, color: 'var(--text-main)', letterSpacing: '-0.02em' }}>
                                    Limitless creativity meets technical excellence.
                                </h3> */}
                            </div>

                            <p style={{ fontSize: '1.25rem', color: 'var(--text-muted)', lineHeight: '1.7', marginBottom: '40px' }}>
                                Mastering cross-platform <span style={{ color: 'var(--text-main)', fontWeight: 600 }}>Mobile and Web Development</span> skills to transform ideas into attractive digital visuals.
                            </p>

                            <div style={{ display: 'flex', gap: '60px', alignItems: 'center' }}>

                                <div style={{ width: '1px', height: '60px', background: 'var(--glass-border)' }} />
                                <div>
                                    <div style={{ fontSize: '3rem', fontWeight: 900, color: 'var(--accent-secondary)', lineHeight: 1 }}>1.5+</div>
                                    <div style={{ fontSize: '0.85rem', fontWeight: 700, opacity: 0.6, marginTop: '8px', textTransform: 'uppercase', letterSpacing: '1px' }}>Years Practical Exp.</div>
                                </div>
                            </div>
                        </motion.div>
                    </div>

                    {/* Right Image Container */}
                    <div style={{ position: 'relative', display: 'flex', justifyContent: 'center' }}>
                        {/* Background Splatter/Glows - Expanded and more visible */}
                        <motion.div
                            animate={{
                                scale: [1, 1.3, 1],
                                opacity: [0.2, 0.4, 0.2],
                                x: [0, 50, 0],
                                y: [0, -30, 0]
                            }}
                            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                            style={{
                                position: 'absolute', top: '-10%', right: '-30%',
                                width: '500px', height: '500px',
                                background: 'var(--accent-primary)', filter: 'blur(120px)',
                                borderRadius: '50%', zIndex: 0,
                                opacity: 0.3
                            }}
                        />
                        <motion.div
                            animate={{
                                scale: [1.3, 1, 1.3],
                                opacity: [0.15, 0.3, 0.15],
                                x: [0, -60, 0],
                                y: [0, 40, 0]
                            }}
                            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
                            style={{
                                position: 'absolute', bottom: '-15%', left: '-35%',
                                width: '450px', height: '450px',
                                background: 'var(--accent-secondary)', filter: 'blur(110px)',
                                borderRadius: '50%', zIndex: 0,
                                opacity: 0.2
                            }}
                        />

                        {/* Floating Symbols Splatter - Spreading Widely Around */}
                        <div style={{ position: 'absolute', inset: -180, zIndex: 1, pointerEvents: 'none' }}>
                            {[
                                { Icon: Code2, top: '10%', left: '15%', delay: 0, size: 32 },
                                { Icon: Sparkles, top: '80%', left: '10%', delay: 0.5, size: 28 },
                                { Icon: Terminal, top: '25%', right: '10%', delay: 1, size: 30 },
                                { Icon: Zap, bottom: '20%', right: '15%', delay: 1.5, size: 34 },
                                { Icon: Hash, top: '55%', left: '-5%', delay: 2, size: 28 },
                                { Icon: Code2, bottom: '5%', right: '40%', delay: 2.5, size: 24 },
                                { Icon: Sparkles, top: '5%', right: '40%', delay: 3, size: 22 },
                                { Icon: Terminal, bottom: '50%', right: '-15%', delay: 3.5, size: 26 },
                                { Icon: Zap, top: '45%', left: '-10%', delay: 4, size: 24 },
                            ].map(({ Icon, size, ...pos }, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, scale: 0 }}
                                    animate={{
                                        opacity: [0.4, 0.8, 0.4],
                                        scale: [1, 1.25, 1],
                                        y: [0, -50, 0],
                                        rotate: [0, 15, -15, 0]
                                    }}
                                    transition={{
                                        duration: 6,
                                        repeat: Infinity,
                                        delay: pos.delay,
                                        ease: "easeInOut"
                                    }}
                                    style={{ position: 'absolute', color: 'var(--accent-primary)', ...pos }}
                                >
                                    <Icon size={size || 24} />
                                </motion.div>
                            ))}
                        </div>

                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.8 }}
                            style={{
                                width: '380px', height: '480px', borderRadius: '32px',
                                // background: 'transparent',
                                overflow: 'hidden', position: 'relative',
                                // boxShadow: '0 20px 40px rgba(0,0,0,0.3)',
                                zIndex: 2
                            }}
                        >
                            <img
                                src="/assets/myphoto.png"
                                alt="Kaleab Mezgebe"
                                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                            />
                            {/* Integration Gradient Overlay */}
                            <div style={{
                                position: 'absolute', inset: 0,
                                // background: 'linear-gradient(to bottom, transparent 95%, var(--bg-dark) 100%), linear-gradient(to right, transparent 98%, var(--bg-dark) 100%), linear-gradient(to left, transparent 98%, var(--bg-dark) 100%)',
                                pointerEvents: 'none',
                                opacity: 0.6
                            }} />
                        </motion.div>


                        {/* Floating Links Card (The big one in the middle-bottom) with Colorful Splatter */}
                        <motion.div
                            initial={{ y: 50, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.6 }}
                            className="glass-card"
                            style={{
                                position: 'absolute', bottom: '-40px',
                                padding: '16px 32px', display: 'flex', gap: '24px',
                                alignItems: 'center', background: 'rgba(15, 23, 42, 0.9)',
                                borderRadius: '16px', border: '1px solid var(--glass-border)',
                                boxShadow: '0 20px 40px rgba(0,0,0,0.4)',
                                zIndex: 4
                            }}
                        >
                            {/* Card Splatter Effect */}
                            <div style={{ position: 'absolute', bottom: -5, left: '20%', right: '20%', height: '5px', background: 'linear-gradient(90deg, transparent, var(--accent-primary), var(--accent-secondary), transparent)', filter: 'blur(10px)', opacity: 0.5 }} />

                            <a href="https://github.com/kaleab-mezgebe" target="_blank" style={{ display: 'flex', alignItems: 'center', gap: '10px', background: 'white', color: 'black', padding: '10px 20px', borderRadius: '8px', fontWeight: 800 }}>
                                <Github size={20} /> GitHub
                            </a>
                            <a href="https://linkedin.com/in/kaleab-mezgebe-764a56198/" target="_blank" style={{ display: 'flex', alignItems: 'center', gap: '10px', background: '#0077b5', color: 'white', padding: '10px 20px', borderRadius: '8px', fontWeight: 800 }}>
                                <Linkedin size={20} /> LinkedIn
                            </a>
                            <a href="mailto:kaleabmezgebe4@gmail.com" style={{ display: 'flex', alignItems: 'center', gap: '10px', background: '#ea4335', color: 'white', padding: '10px 20px', borderRadius: '8px', fontWeight: 800 }}>
                                <Mail size={20} /> Email
                            </a>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* About Me Section - Dribbble Style */}
            <section id="about" style={{ textAlign: 'center', maxWidth: '900px', margin: '0 auto', padding: '120px 24px' }}>
                <SectionHeading subtitle="Combining academic excellence with professional technical mastery" align="center">About Me</SectionHeading>

                <div style={{ marginTop: '60px', display: 'flex', flexDirection: 'column', gap: '80px', alignItems: 'center', textAlign: 'center' }}>
                    {/* Bio & Stats */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        style={{ maxWidth: '700px' }}
                    >
                        <h3 style={{ fontSize: '2.2rem', fontWeight: 900, marginBottom: '24px', lineHeight: 1.2, letterSpacing: '-0.02em' }}>
                            IT Graduate from Mekelle Institute of Technology with <span className="accent-text">limitless creativity!</span>
                        </h3>
                        <p style={{ fontSize: '1.2rem', color: 'var(--text-muted)', lineHeight: '1.8', marginBottom: '40px' }}>
                            Mastering cross-platform <span style={{ color: 'var(--text-main)', fontWeight: 600 }}>mobile and web development</span> skills to transform ideas into attractive digital visuals.
                            Combining academic excellence with 1.5+ years of practical technical expertise to create meaningful, high-performance works.
                        </p>

                        <div style={{ display: 'inline-flex', gap: '60px', padding: '20px 40px', background: 'rgba(255,255,255,0.03)', borderRadius: '20px', border: '1px solid var(--glass-border)' }}>
                            <div>
                                <div style={{ fontSize: '2.5rem', fontWeight: 900, color: 'var(--accent-primary)', lineHeight: 1 }}>3.88</div>
                                <div style={{ fontSize: '0.85rem', fontWeight: 700, opacity: 0.6, marginTop: '8px', textTransform: 'uppercase', letterSpacing: '1px' }}>CGPA Excellence</div>
                            </div>
                            <div style={{ width: '1px', height: '50px', background: 'var(--glass-border)' }} />
                            <div>
                                <div style={{ fontSize: '2.5rem', fontWeight: 900, color: 'var(--accent-secondary)', lineHeight: 1 }}>1.5+</div>
                                <div style={{ fontSize: '0.85rem', fontWeight: 700, opacity: 0.6, marginTop: '8px', textTransform: 'uppercase', letterSpacing: '1px' }}>Years Experience</div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Custom Skill Bars - Wide & Creative */}
                    <div style={{ width: '100%', maxWidth: '800px', display: 'flex', flexDirection: 'column', gap: '35px' }}>
                        {[
                            { name: "Flutter", level: 98, icon: Smartphone },
                            { name: "React", level: 95, icon: Code2 },
                            { name: "Node.js", level: 90, icon: Server },
                            { name: "PHP", level: 85, icon: Database },
                            { name: "GitHub/GitLab", level: 92, icon: Github }
                        ].map((skill, idx) => (
                            <div key={idx} style={{ position: 'relative' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px', alignItems: 'center' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                        {skill.icon && <skill.icon size={18} style={{ color: 'var(--accent-primary)' }} />}
                                        <p style={{ fontWeight: 800, fontSize: '1.1rem' }}>{skill.name}</p>
                                    </div>
                                    <span style={{ fontWeight: 700, color: 'var(--accent-secondary)' }}>{skill.level}%</span>
                                </div>
                                <div style={{ height: '6px', background: 'rgba(255,255,255,0.05)', borderRadius: '3px', position: 'relative', overflow: 'hidden' }}>
                                    <motion.div
                                        initial={{ width: 0 }}
                                        whileInView={{ width: `${skill.level}%` }}
                                        transition={{ duration: 1.5, delay: idx * 0.1, ease: "easeOut" }}
                                        style={{
                                            height: '100%',
                                            background: 'linear-gradient(90deg, var(--accent-primary), var(--accent-secondary))',
                                            borderRadius: '3px',
                                            position: 'relative',
                                            boxShadow: '0 0 20px var(--accent-primary)'
                                        }}
                                    >
                                        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.5), transparent)', opacity: 0.3 }} />
                                    </motion.div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>


            {/* Experience Section */}
            <section id="experience">
                <SectionHeading subtitle="My professional journey and key technical contributions" align="center">Professional Experience</SectionHeading>
                <div style={{ position: 'relative', maxWidth: '1000px', margin: '0 auto' }}>
                    {/* Vertical Line */}
                    <div style={{ position: 'absolute', left: '20px', top: '0', bottom: '0', width: '2px', background: 'linear-gradient(to bottom, var(--accent-primary), var(--accent-secondary), transparent)' }}></div>

                    {[
                        {
                            role: "Mobile App Developer",
                            company: "Niyat Consultancy",
                            period: "July 2025 – Present",
                            description: "Building and maintaining scalable mobile applications using Flutter. Developing production-ready features for client-facing mobile systems. Applying clean architecture and reusable component patterns.",
                            insights: [
                                "Mastered Flutter Bloc for complex state-driven UI logic.",
                                "Implemented hexagonal architecture for better testability.",
                                "Optimized app performance for low-bandwidth environments."
                            ],
                            tags: ["Flutter", "Clean Architecture", "MVP Delivery", "Ride-Sharing"]
                        },
                        {
                            role: "Full-Stack Developer",
                            company: "Ethiobeds Pension Reservation System",
                            period: "Jan 2025 – March 2025",
                            description: "Developed a complete pension reservation platform used by real customers. Built responsive booking interfaces with React, and developed backend with Node.js/Express. Implemented full client–server data flow and database integration.",
                            insights: [
                                "Engineered secure JWT-based authentication workflows.",
                                "Designed scalable MySQL schemas for reservation logic.",
                                "Delivered a production-grade CMS for property owners."
                            ],
                            tags: ["React.js", "Node.js", "MySQL", "Production Delivery"]
                        },
                        {
                            role: "Mobile App Developer (Intern)",
                            company: "Grand Technology Solutions",
                            period: "Nov 2024 – Feb 2025",
                            description: "Developed Tigray Youth Association Member Management System (TYAMMS). Built mobile interfaces with Flutter and integrated backend APIs. Participated in full lifecycle development and testing.",
                            insights: [
                                "Collaborated in Agile sprints for rapid feature deployment.",
                                "Bridged legacy SQL data with modern RESTful APIs.",
                                "Enhanced UI consistency across various Android devices."
                            ],
                            tags: ["Flutter", "Node.js", "Express", "MySQL"]
                        },
                        {
                            role: "Mobile App Developer (Contract)",
                            company: "Tigray Culture and Tourism Bureau",
                            period: "March 2024 – June 2024",
                            description: "Built Flutter application for cultural heritage registration. Digitized manual registration processes and integrated MySQL backend services, significantly improving operational efficiency.",
                            insights: [
                                "Translated offline paper workflows into digital UX.",
                                "Implemented local caching for data resilience in remote areas.",
                                "Digitized 1000+ records with high geospatial accuracy."
                            ],
                            tags: ["Flutter", "Digitalization", "Heritage Registration"]
                        }
                    ].map((exp, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            style={{ marginBottom: '40px', paddingLeft: '60px', position: 'relative' }}
                        >
                            <div style={{
                                position: 'absolute', left: '10px', top: '0', width: '22px', height: '22px',
                                borderRadius: '50%', background: 'var(--bg-dark)', border: '4px solid var(--accent-primary)',
                                zIndex: 2, boxShadow: '0 0 15px var(--accent-glow)'
                            }}></div>

                            <Card style={{ padding: '32px' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '16px', flexWrap: 'wrap', gap: '12px' }}>
                                    <div>
                                        <h3 style={{ fontSize: '1.4rem', fontWeight: 800 }}>{exp.role}</h3>
                                        <p className="accent-text" style={{ fontWeight: 700, fontSize: '1.1rem' }}>{exp.company}</p>
                                    </div>
                                    <div style={{ background: 'rgba(59, 130, 246, 0.1)', padding: '6px 16px', borderRadius: '10px', fontSize: '0.9rem', color: 'var(--accent-primary)', fontWeight: 700 }}>
                                        {exp.period}
                                    </div>
                                </div>
                                <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem', marginBottom: '16px', lineHeight: '1.6' }}>{exp.description}</p>

                                <div style={{ marginBottom: '20px' }}>
                                    <p style={{ fontWeight: 800, fontSize: '0.85rem', color: 'var(--accent-primary)', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '12px' }}>Key Experiences</p>
                                    <ul style={{ listStyle: 'none', padding: 0 }}>
                                        {exp.insights.map((insight, idx) => (
                                            <li key={idx} style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--text-main)', fontSize: '0.95rem', marginBottom: '8px' }}>
                                                <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--accent-primary)' }}></div>
                                                {insight}
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                                    {exp.tags.map(tag => (
                                        <span key={tag} style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid var(--glass-border)', padding: '4px 12px', borderRadius: '8px', fontSize: '0.8rem', fontWeight: 600 }}>{tag}</span>
                                    ))}
                                </div>
                            </Card>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Services Section */}
            <section id="services">
                <SectionHeading subtitle="Results-oriented services tailored for modern digital needs" align="center">Professional Services</SectionHeading>
                <div className="grid-auto">
                    {[
                        { icon: <Smartphone />, title: "Mobile App Development", desc: "Building high-performance, native-feel iOS and Android apps using Flutter. Focused on smooth animations and robust state management." },
                        { icon: <Globe />, title: "Modern Web Solutions", desc: "Developing scalable, responsive web architectures using React.js. Ensuring split-second load times and intuitive user journeys." },
                        { icon: <Database />, title: "Full-Stack Engineering", desc: "Designing secure, high-throughput backend systems with Node.js and Express. Architecting data schemas that scale." },
                        { icon: <Layers />, title: "UI/UX Technical Design", desc: "Translating complex designs into pixel-perfect code while ensuring the highest standards of accessibility and interaction design." }
                    ].map((s, i) => (
                        <Card key={i}>
                            <div className="accent-text" style={{ marginBottom: '24px' }}>{React.cloneElement(s.icon, { size: 40 })}</div>
                            <h3 style={{ marginBottom: '16px', fontSize: '1.5rem', fontWeight: 800 }}>{s.title}</h3>
                            <p style={{ color: 'var(--text-muted)', fontSize: '1rem', lineHeight: '1.6' }}>{s.desc}</p>
                        </Card>
                    ))}
                </div>
            </section>

            {/* Featured Projects - Problem/Solution/Result */}
            <section id="projects">
                <SectionHeading subtitle="Documenting the journey from complex problems to high-impact solutions" align="center">Portfolio Showcase</SectionHeading>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '80px' }}>
                    {/* Project Loop with staggered reveals */}
                    {[
                        {
                            title: "Niyat Ride App (MVP)",
                            problem: "The ride-sharing market requires ultra-reliable real-time state updates (trips, locations) to ensure user trust and commercial feasibility.",
                            solution: "Architected and developed a Flutter MVP implementing complex booking flows, trip states, and real-time UI synchronization using the Bloc pattern.",
                            result: "Demonstrated commercial feasibility through a working prototype, enabling successful market entry and client validation.",
                            tags: ["Flutter", "Bloc", "Architecture", "Real-time"],
                            link: "https://github.com/kaleab-mezgebe/ride_mobile-",
                            image: "/assets/ride.png",
                            type: "COMMERCIAL MVP",
                            localVideo: "/assets/ride_vedio.mp4"
                        },
                        {
                            title: "CBEBirr App Clone (FinTech UI)",
                            problem: "Modern FinTech requires extremely fluid and intuitive user interfaces to handle complex financial transactions simply.",
                            solution: "Replicated the CBEBirr mobile experience using Flutter, focusing on high-fidelity animations and secure-feeling UI components.",
                            result: "Demonstrated technical proficiency in creating complex, high-performance mobile interfaces for financial services.",
                            tags: ["Flutter", "FinTech", "UI/UX", "Mobile"],
                            link: "https://github.com/kaleab-mezgebe/cbe_birr",
                            demoLink: "https://www.linkedin.com/posts/kaleab-mezgebe-764a56198_cbe-birr-app-clone-in-flutter-practice-activity-7410324964827987968-PKSr?utm_source=share&utm_medium=member_desktop&rcm=ACoAAC5t-bwBhhi4m3cAxBFDoKwSu4ZPJnGon3o", // Keeping demoLink for logic backward compatibility if needed, though videoLink is used in UI
                            videoLink: "https://www.linkedin.com/posts/kaleab-mezgebe-764a56198_cbe-birr-app-clone-in-flutter-practice-activity-7410324964827987968-PKSr?utm_source=share&utm_medium=member_desktop&rcm=ACoAAC5t-bwBhhi4m3cAxBFDoKwSu4ZPJnGon3o",
                            image: "/assets/cbebirr.png",
                            type: "UI ENGINEERING"
                        },
                        {
                            title: "Ethiobeds (PensionFinder)",
                            problem: "Finding safe, verified, and affordable accommodations in Ethiopia was complex due to the lack of a centralized administrative verification system.",
                            solution: "Architected a robust platform featuring verified property listings, safety-standard audits, and a multi-tier subscription model for providers and seekers.",
                            result: "Established a trusted marketplace with verified safety standards and licensed providers, simplifying the search for thousands of users.",
                            tags: ["React", "Security", "SaaS", "Trust & Safety"],
                            link: "https://ethiobeds.com",
                            githubLink: "https://github.com/kaleab-mezgebe",
                            demoLink: "https://ethiobeds.com",
                            image: "/assets/ethiobeds.png",
                            type: "PRODUCTION SAAS",
                            isWeb: true
                        },
                        {
                            title: "TYAMMS",
                            problem: "Tigray Youth Association faced logistical bottlenecks in managing thousands of members manually across multiple regions.",
                            solution: "Digitized operations with a robust member management platform, enabling real-time data tracking and member engagement monitoring.",
                            result: "Reduced operational overhead by 40% and improved data accuracy for youth initiative planning.",
                            tags: ["Operations", "Digitization", "Data Management"],
                            link: "https://github.com/kaleab-mezgebe/tyamms",
                            image: "/assets/tyamms.png",
                            type: "ENTERPRISE SOLUTION"
                        },
                        {
                            title: "AI Dermatologist",
                            problem: "Limited access to specialized dermatological care in rural areas leads to late diagnosis of treatable skin conditions.",
                            solution: "Developed an AI-powered diagnostic tool (Web & Mobile) using computer vision models to provide instant skin assessment and medical guidance.",
                            result: "Created a bridge for early medical intervention, significantly lowering the barrier to initial health screenings.",
                            tags: ["AI", "Flutter", "Computer Vision", "HealthTech"],
                            link: "https://github.com/kaleab-mezgebe/AI-Dermatologist",
                            image: "/assets/ai.png",
                            type: "INNOVATION PROJECT"
                        },
                        {
                            title: "Tigray Cultural Property Hub",
                            problem: "Cultural heritage sites and properties were at risk of being uncatalogued or lost due to lack of spatial and descriptive documentation.",
                            solution: "Built a cultural heritage metadata hub with spatial tracking and detailed property documentation capabilities.",
                            result: "Secured digital records for hundreds of sites, aiding in preservation and international recognition of cultural assets.",
                            tags: ["GIS", "Preservation", "Metadata"],
                            link: "https://github.com/kaleab-mezgebe/TCPH-",
                            image: "/assets/tcph.png",

                            type: "SOCIAL IMPACT"
                        },

                        {
                            title: "Hdyat E-Commerce",
                            problem: "Traditional makers often lack direct access to broader markets, relying on intermediaries that reduce their profit margins.",
                            solution: "Developed a multi-vendor web platform connecting traditional clothes and jewelry makers directly with customers.",
                            result: "Empowered local artisans with a direct-to-consumer channel, increasing their market reach and profitability.",
                            tags: ["React", "Node.js", "Multi-vendor", "E-commerce"],
                            link: "https://github.com/kaleab-mezgebe",
                            image: "/assets/hdyat.png",

                            type: "E-COMMERCE PLATFORM",
                            isWeb: true,

                        },

                    ].map((project, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.6, delay: idx * 0.1 }}
                            className="project-grid"
                            style={{
                                display: 'grid',
                                gridTemplateColumns: project.isWeb
                                    ? (idx % 2 === 0 ? '1fr 1.6fr' : '1.6fr 1fr') // Web: More space for image
                                    : (idx % 2 === 0 ? '1.3fr 1fr' : '1fr 1.3fr'), // Mobile: More space for text
                                gap: '48px',
                                alignItems: 'center'
                            }}
                        >
                            <div style={{ order: idx % 2 === 0 ? 0 : 1 }}>
                                <motion.div
                                    whileHover={{ scale: 1.05, rotate: idx % 2 === 0 ? 1 : -1 }}
                                    className="project-image-placeholder glow-effect-hover"
                                    onClick={() => {
                                        if (project.localVideo) {
                                            setSelectedVideo(project.localVideo);
                                        } else {
                                            window.open(project.link, '_blank');
                                        }
                                    }}
                                    style={{
                                        position: 'relative',
                                        height: project.isWeb ? '450px' : '600px', borderRadius: '32px',
                                        width: project.isWeb ? '750px' : '500px',
                                        boxShadow: '0 30px 60px -12px rgba(0,0,0,0.3)',
                                        transition: 'all 0.5s ease',
                                        overflow: 'hidden',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        background: 'transparent',
                                        padding: '40px',
                                        border: '1px solid rgba(255,255,255,0.05)',
                                        cursor: 'pointer'
                                    }}
                                >
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        whileHover={{ opacity: 1 }}
                                        style={{
                                            position: 'absolute',
                                            inset: 0,
                                            background: 'rgba(0,0,0,0.6)',
                                            zIndex: 10,
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            flexDirection: 'column',
                                            borderRadius: '32px'
                                        }}
                                    >
                                        {project.localVideo ? (
                                            <>
                                                <Play size={48} color="white" style={{ marginBottom: '16px' }} />
                                                <p style={{ color: 'white', fontWeight: 800, fontSize: '1.2rem', letterSpacing: '1px' }}>WATCH DEMO</p>
                                            </>
                                        ) : (
                                            <>
                                                <Github size={48} color="white" style={{ marginBottom: '16px' }} />
                                                <p style={{ color: 'white', fontWeight: 800, fontSize: '1.2rem', letterSpacing: '1px' }}>CLICK TO VIEW</p>
                                            </>
                                        )}
                                    </motion.div>
                                    {project.image ? (
                                        <img
                                            src={project.image}
                                            alt={project.title}
                                            style={{
                                                maxWidth: '100%', maxHeight: '100%',
                                                objectFit: 'contain',
                                                filter: 'desaturate(0.02) contrast(1.05)',
                                                transition: 'all 0.5s ease',
                                                borderRadius: '40px',
                                                boxShadow: '0 20px 40px rgba(0,0,0,0.5)',
                                                display: 'block'
                                            }}
                                            className="project-image"
                                        />
                                    ) : (
                                        <div style={{ textAlign: 'center', opacity: 0.4, zIndex: 1, position: 'relative' }}>
                                            {project.title.includes("Mobile") || project.title.includes("Ride") ? <Smartphone size={100} className="accent-text" /> : <Globe size={100} className="accent-text" />}
                                            <p style={{ marginTop: '24px', fontWeight: 900, letterSpacing: '4px' }}>ENHANCED PREVIEW</p>
                                        </div>
                                    )}

                                </motion.div>
                            </div>
                            <div>
                                <motion.h3
                                    initial={{ opacity: 0, x: idx % 2 === 0 ? 20 : -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.3 }}
                                    style={{ fontSize: '2.5rem', fontWeight: 900, marginBottom: '32px', letterSpacing: '-0.03em' }}
                                >
                                    {project.title}
                                </motion.h3>

                                <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', marginBottom: '40px' }}>
                                    <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 0.4 }}>
                                        <p style={{ fontWeight: 800, fontSize: '0.9rem', color: 'var(--accent-primary)', marginBottom: '4px', letterSpacing: '1px' }}>THE CHALLENGE</p>
                                        <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem' }}>{project.problem}</p>
                                    </motion.div>
                                    <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 0.5 }}>
                                        <p style={{ fontWeight: 800, fontSize: '0.9rem', color: 'var(--accent-primary)', marginBottom: '4px', letterSpacing: '1px' }}>THE SOLUTION</p>
                                        <p style={{ color: 'var(--text-main)', fontSize: '1.05rem', fontWeight: 500 }}>{project.solution}</p>
                                    </motion.div>
                                    <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 0.6 }}>
                                        <p style={{ fontWeight: 800, fontSize: '0.9rem', color: 'var(--accent-primary)', marginBottom: '4px', letterSpacing: '1px' }}>THE IMPACT</p>
                                        <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem' }}>{project.result}</p>
                                    </motion.div>
                                </div>

                                <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                                    <motion.a
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        href={project.link} target="_blank" className="accent-bg glow-effect" style={{ padding: '16px 32px', borderRadius: '16px', color: 'white', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '10px' }}>
                                        GITHUB <Github size={20} />
                                    </motion.a>
                                    {project.localVideo && (
                                        <motion.button
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                            onClick={() => setSelectedVideo(project.localVideo)}
                                            className="glass-card"
                                            style={{
                                                padding: '16px 32px',
                                                borderRadius: '16px',
                                                color: 'var(--text-main)',
                                                fontWeight: 800,
                                                display: 'flex',
                                                alignItems: 'center',
                                                gap: '10px',
                                                border: '1px solid var(--accent-primary)',
                                                cursor: 'pointer'
                                            }}
                                        >
                                            WATCH DEMO <Play size={20} />
                                        </motion.button>
                                    )}
                                    {project.videoLink && (
                                        <motion.a
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                            href={project.videoLink} target="_blank" className="glass-card" style={{ padding: '16px 32px', borderRadius: '16px', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '10px' }}>
                                            LIVE VIDEO <ExternalLink size={20} />
                                        </motion.a>
                                    )}
                                    {project.title.includes("Ethiobeds") && (
                                        <motion.a
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                            href={project.link} target="_blank" className="glass-card" style={{ padding: '16px 32px', borderRadius: '16px', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '10px' }}>
                                            LIVE DEMO <ExternalLink size={20} />
                                        </motion.a>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Endorsements & References */}
            <section id="endorsements" style={{ background: 'rgba(59, 130, 246, 0.03)', borderRadius: '60px', padding: '100px 60px' }}>
                <SectionHeading subtitle="Verified feedback and professional references from industry leaders" align="center">Professional Endorsements</SectionHeading>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '40px' }}>
                    {[
                        {
                            quote: "Kaleab delivered an exceptional MVP for our ride-sharing platform. His technical depth in Flutter and commitment to timeline was impressive.",
                            author: "Gebru Gidey",
                            role: "CEO — Grand Technology Solutions",
                            contact: "📞 +251935279104 | grandtechnology16@gmail.com"
                        },
                        {
                            quote: "The cultural heritage app built by Kaleab significantly improved our operational efficiency. A truly dedicated and detail-oriented developer.",
                            author: "Dr. Atsbiha Gebreezgabher",
                            role: "Head — Tigray Culture and Tourism Bureau",
                            contact: "✉️ atsbital2@gmail.com"
                        },
                        {
                            quote: "One of the most detail-oriented developers I've collaborated with. His CGPA 3.88 is a clear reflection of his professional work ethics.",
                            author: "Mekelle University MIT",
                            role: "Faculty/Colleague Feedback",
                            contact: "Verified Academic Achievement"
                        }
                    ].map((t, i) => (
                        <Card key={i} style={{ position: 'relative', padding: '48px' }}>
                            <div style={{ fontSize: '4rem', color: 'var(--accent-primary)', opacity: 0.15, position: 'absolute', top: '10px', left: '20px', fontFamily: 'serif' }}>"</div>
                            <p style={{ fontSize: '1.2rem', fontStyle: 'italic', color: 'var(--text-main)', marginBottom: '32px', position: 'relative', zIndex: 1, lineHeight: '1.6' }}>{t.quote}</p>
                            <div>
                                <p style={{ fontWeight: 900, fontSize: '1.2rem', color: 'var(--accent-primary)' }}>{t.author}</p>
                                <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', fontWeight: 700, marginBottom: '8px' }}>{t.role}</p>
                                <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem', borderTop: '1px solid var(--glass-border)', paddingTop: '12px', marginTop: '12px' }}>{t.contact}</p>
                            </div>
                        </Card>
                    ))}
                </div>
            </section>

            {/* Languages */}
            <section id="languages" style={{ padding: '80px 0', textAlign: 'center' }}>
                <SectionHeading align="center" subtitle="Global communication proficiency">Language Mastery</SectionHeading>
                <div style={{ display: 'flex', gap: '24px', justifyContent: 'center', flexWrap: 'wrap' }}>
                    {[
                        { lang: "English", level: "Professional Working Proficiency" },
                        { lang: "Tigrigna", level: "Native Proficiency" },
                        { lang: "Amharic", level: "Native Proficiency" }
                    ].map((l, i) => (
                        <motion.div
                            key={i}
                            whileHover={{ scale: 1.05 }}
                            className="glass-card"
                            style={{ padding: '24px 48px', borderRadius: '20px', border: '1px solid var(--accent-primary)', background: 'rgba(59, 130, 246, 0.05)' }}
                        >
                            <p style={{ fontWeight: 900, fontSize: '1.4rem', marginBottom: '4px' }}>{l.lang}</p>
                            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', fontWeight: 600 }}>{l.level}</p>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Contact Section */}
            <section id="contact" style={{ textAlign: 'center' }}>
                <SectionHeading subtitle="Ready to translate your vision into a scalable digital product?" align="center">Let's Connect</SectionHeading>
                <div style={{ maxWidth: '900px', margin: '0 auto' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px', marginBottom: '40px' }}>
                        <Card>
                            <Mail className="accent-text" style={{ marginBottom: '16px' }} size={32} />
                            <h4 style={{ marginBottom: '8px' }}>Email</h4>
                            <a href="mailto:kaleabmezgebe4@gmail.com" style={{ color: 'var(--text-muted)', fontWeight: 600 }}>kaleabmezgebe4@gmail.com</a>
                        </Card>
                        <Card>
                            <Phone className="accent-text" style={{ marginBottom: '16px' }} size={32} />
                            <h4 style={{ marginBottom: '8px' }}>Direct Call</h4>
                            <p style={{ color: 'var(--text-muted)', fontWeight: 600 }}>+251945989369</p>
                        </Card>
                        <Card>
                            <MapPin className="accent-text" style={{ marginBottom: '16px' }} size={32} />
                            <h4 style={{ marginBottom: '8px' }}>Location</h4>
                            <p style={{ color: 'var(--text-muted)', fontWeight: 600 }}>Addis Ababa, Ethiopia</p>
                        </Card>
                    </div>

                    <Card style={{ padding: '60px' }}>
                        <h3 style={{ fontSize: '2rem', marginBottom: '32px' }}>Send a Quick Message</h3>
                        <div>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
                                <input
                                    type="text"
                                    placeholder="Name"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    style={{ background: 'var(--glass-border)', border: '1px solid var(--glass-border)', padding: '16px', borderRadius: '12px', color: 'var(--text-main)', width: '100%', outline: 'none' }}
                                />
                                <input
                                    type="email"
                                    placeholder="Email"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    style={{ background: 'var(--glass-border)', border: '1px solid var(--glass-border)', padding: '16px', borderRadius: '12px', color: 'var(--text-main)', width: '100%', outline: 'none' }}
                                />
                            </div>
                            <textarea
                                placeholder="Tell me about your project..."
                                rows="5"
                                value={formData.message}
                                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                style={{ width: '100%', background: 'var(--glass-border)', border: '1px solid var(--glass-border)', padding: '16px', borderRadius: '12px', color: 'var(--text-main)', marginBottom: '32px', outline: 'none', fontFamily: 'inherit' }}
                            ></textarea>
                            <a
                                href={`mailto:kaleabmezgebe4@gmail.com?subject=${encodeURIComponent(`Portfolio Contact from ${formData.name}`)}&body=${encodeURIComponent(`Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`)}`}
                                className="accent-bg glow-effect"
                                style={{
                                    display: 'block',
                                    width: '100%',
                                    padding: '20px',
                                    borderRadius: '16px',
                                    color: 'white',
                                    fontWeight: 900,
                                    fontSize: '1.2rem',
                                    letterSpacing: '1px',
                                    textAlign: 'center',
                                    textDecoration: 'none',
                                    cursor: 'pointer'
                                }}
                            >
                                SEND MESSAGE
                            </a>
                        </div>
                        <div style={{ display: 'flex', gap: '16px', alignItems: 'center', justifyContent: 'center', marginTop: '40px' }}>
                            <a href="https://www.linkedin.com/in/kaleab-mezgebe-764a56198/" target="_blank" style={{ color: 'var(--text-muted)' }}>Connect on LinkedIn</a>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginTop: '40px' }}>
                            <a href="mailto:kaleabmezgebe4@gmail.com" className="accent-bg glow-effect" style={{ padding: '20px 48px', borderRadius: '18px', color: 'white', fontWeight: 800, fontSize: '1.1rem' }}>
                                Start Conversation
                            </a>
                            <a
                                href="/assets/Kaleab Mezgebe's cv.pdf"
                                target="_blank"
                                rel="noopener noreferrer"
                                download
                                className="glass-card"
                                style={{ padding: '20px 48px', borderRadius: '18px', fontWeight: 800, fontSize: '1.1rem', display: 'flex', alignItems: 'center', gap: '10px', textDecoration: 'none', color: 'inherit' }}
                            >
                                <Download size={20} /> Download Resume
                            </a>
                        </div>
                    </Card>
                </div>
            </section>

            <footer style={{ padding: '80px 6%', borderTop: '1px solid var(--glass-border)', background: 'var(--bg-dark)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', flexWrap: 'wrap', gap: '60px', maxWidth: '1200px', margin: '0 auto' }}>
                    <div style={{ maxWidth: '400px' }}>
                        <div style={{ fontWeight: 900, fontSize: '1.8rem', marginBottom: '20px' }}>KALEAB<span className="accent-text">.MEZGEBE</span></div>
                        <p style={{ color: 'var(--text-muted)', lineHeight: '1.8' }}>Dedicated Software Developer specializing in Flutter and React. Building scalable solutions for the global digital economy.</p>
                    </div>
                    <div style={{ display: 'flex', gap: '100px', flexWrap: 'wrap' }}>
                        <div>
                            <h4 style={{ marginBottom: '24px', fontWeight: 800 }}>NAVIGATION</h4>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', color: 'var(--text-muted)' }}>
                                <a href="#hero">Home</a>
                                <a href="#about">About</a>
                                <a href="#projects">Portfolio</a>
                                <a href="#contact">Contact</a>
                            </div>
                        </div>
                        <div>
                            <h4 style={{ marginBottom: '24px', fontWeight: 800 }}>SOCIALS</h4>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', color: 'var(--text-muted)' }}>
                                <a href="https://github.com/kaleab-mezgebe">GitHub</a>
                                <a href="https://linkedin.com/in/kaleab-mezgebe-764a56198/">LinkedIn</a>
                                <a href="https://www.linkedin.com/in/kaleab-mezgebe-764a56198/">Dribbble (Upcoming)</a>
                            </div>
                        </div>
                    </div>
                </div>
                <div style={{ marginTop: '80px', paddingTop: '40px', borderTop: '1px solid var(--glass-border)', textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                    © {new Date().getFullYear()} KALEAB MEZGEBE. ALL SYSTEMS OPERATIONAL.
                </div>
            </footer>

            <style>{`
                .nav-link { position: relative; padding: 8px 0; transition: color 0.3s ease; }
                .nav-link:hover { color: var(--text-main); }
                .nav-link::after { content: ''; position: absolute; bottom: 0; left: 0; width: 0; height: 2px; background: var(--accent-primary); transition: width 0.3s ease; }
                .nav-link:hover::after { width: 100%; }
                @media (max-width: 968px) {
                    nav { padding: 12px 4% !important; }
                    .nav-links { display: none !important; }
                    section { padding: 80px 24px; }
                    .project-image-placeholder { height: 300px !important; }
                    #hero h1 { font-size: 3rem !important; }
                    footer > div:first-child { flex-direction: column !important; gap: 40px !important; }
                }
            `}</style>
        </div>
    );
};

export default App;
