import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Github,
    Linkedin,
    Mail,
    Phone,
    MapPin,
    ExternalLink,
    Code2,
    Sparkles,
    Terminal,
    Zap,
    Smartphone,
    Database,
    Layers,
    Server,
    Download,
    Sun,
    Moon,
    Play,
    Menu,
    X,
    CheckCircle2,
    Copy,
    Globe,
    Briefcase,
    GraduationCap,
    Send,
    Flame,
    ArrowUpRight,
    ShieldCheck,
    Cpu,
    Activity,
    Clock,
    Calendar,
    Loader2
} from 'lucide-react';
import confetti from 'canvas-confetti';
import ParticleBackground from './components/ParticleBackground';
import { InteractiveTerminal } from './components/InteractiveTerminal';
import { EngineeringMetrics } from './components/EngineeringMetrics';
import { PageLoader } from './components/PageLoader';
import kaleabPortrait from './assets/kaleab_portrait.jpg';

// Section Heading Component
const SectionHeading = ({ children, subtitle, align = "center", badge = null }) => (
    <div className="section-header" style={{ marginBottom: '48px', textAlign: align }}>
        {badge && (
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                style={{ marginBottom: '12px' }}
            >
                <span className="status-pill" style={{ color: 'var(--accent-primary)', borderColor: 'rgba(99, 102, 241, 0.3)', background: 'rgba(99, 102, 241, 0.08)' }}>
                    <Sparkles size={14} /> {badge}
                </span>
            </motion.div>
        )}
        <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="accent-text"
            style={{ fontSize: 'clamp(2rem, 5vw, 3.4rem)', fontWeight: 900, marginBottom: '14px', letterSpacing: '-0.03em', lineHeight: 1.15 }}
        >
            {children}
        </motion.h2>
        {subtitle && (
            <motion.p
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.15 }}
                style={{ color: 'var(--text-muted)', fontSize: 'clamp(0.95rem, 2vw, 1.15rem)', maxWidth: '750px', margin: align === "center" ? '0 auto' : '0', lineHeight: 1.6 }}
            >
                {subtitle}
            </motion.p>
        )}
        <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: '80px' }}
            viewport={{ once: true }}
            transition={{ delay: 0.25, duration: 0.7 }}
            style={{ height: '4px', background: 'linear-gradient(90deg, var(--accent-primary), var(--accent-secondary), var(--accent-tertiary))', margin: align === "center" ? '20px auto 0' : '20px 0 0', borderRadius: '4px' }}
        />
    </div>
);

// Card Component
const Card = ({ children, className = "", noPadding = false, delay = 0, style = {}, ...props }) => (
    <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.98 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, amount: 0.08 }}
        transition={{ duration: 0.55, delay, ease: [0.16, 1, 0.3, 1] }}
        whileHover={{ y: -4, transition: { duration: 0.2 } }}
        className={`glass-card ${className}`}
        style={{
            padding: noPadding ? '0' : 'clamp(20px, 3.5vw, 32px)',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            ...style
        }}
        {...props}
    >
        {children}
    </motion.div>
);

const App = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [scrolled, setScrolled] = useState(false);
    const [isDarkMode, setIsDarkMode] = useState(true);
    const [activeFilter, setActiveFilter] = useState('all');
    const [toastMessage, setToastMessage] = useState(null);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [selectedVideo, setSelectedVideo] = useState(null);
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });
    const [formStatus, setFormStatus] = useState('idle'); // 'idle' | 'sending' | 'success' | 'error'

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 800);

        const handleScroll = () => setScrolled(window.scrollY > 30);
        window.addEventListener('scroll', handleScroll, { passive: true });

        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'light') {
            setIsDarkMode(false);
            document.body.classList.remove('dark');
            document.body.classList.add('light');
        } else {
            setIsDarkMode(true);
            document.body.classList.remove('light');
            document.body.classList.add('dark');
        }

        const handleKeyDown = (e) => {
            if (e.key === 'Escape') {
                setSelectedVideo(null);
                setIsMobileMenuOpen(false);
            }
        };
        window.addEventListener('keydown', handleKeyDown);

        return () => {
            clearTimeout(timer);
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, []);

    const toggleTheme = () => {
        setIsDarkMode(!isDarkMode);
        document.body.classList.toggle('light');
        localStorage.setItem('theme', !isDarkMode ? 'dark' : 'light');
    };

    const showToast = (text) => {
        setToastMessage(text);
        setTimeout(() => setToastMessage(null), 3200);
    };

    const copyToClipboard = (text, label) => {
        navigator.clipboard.writeText(text);
        showToast(`${label} copied to clipboard! 📋`);
        handleConfetti();
    };

    const handleConfetti = () => {
        confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 },
            colors: isDarkMode ? ['#6366f1', '#06b6d4', '#ec4899'] : ['#4f46e5', '#0891b2', '#0f172a']
        });
    };

    const handleSubmitMessage = async (e) => {
        e.preventDefault();
        setFormStatus('sending');

        try {
            const response = await fetch("https://formsubmit.co/ajax/kaleabmezgebe4@gmail.com", {
                method: "POST",
                headers: { 
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    name: formData.name,
                    email: formData.email,
                    message: formData.message,
                    _subject: `New Portfolio Inquiry from ${formData.name}`,
                    _captcha: "false"
                })
            });

            const result = await response.json().catch(() => null);

            if (response.ok) {
                setFormStatus('success');
                handleConfetti();
                showToast("Message dispatched directly to Kaleab's inbox! 🚀");
                setFormData({ name: '', email: '', message: '' });
            } else {
                throw new Error(result?.message || "Endpoint requires email confirmation");
            }
        } catch (err) {
            // Instant fallback: open user's email client draft pre-filled with their message
            setFormStatus('success');
            handleConfetti();
            showToast("Opening email draft to kaleabmezgebe4@gmail.com 🚀");
            const mailtoUrl = `mailto:kaleabmezgebe4@gmail.com?subject=${encodeURIComponent(`Project Inquiry from ${formData.name}`)}&body=${encodeURIComponent(`Hi Kaleab,\n\n${formData.message}\n\nFrom: ${formData.name} (${formData.email})`)}`;
            window.location.href = mailtoUrl;
            setFormData({ name: '', email: '', message: '' });
        }
    };

    // Projects Dataset
    const projects = [
        {
            title: "Axumite Ride — Passenger & Driver Mobile App",
            category: "mobile",
            problem: "Real-time state synchronization, live driver GPS tracking, and instant payment settlement in low-bandwidth network zones.",
            solution: "Architected cross-platform Flutter applications for passengers and drivers with SignalR real-time stream synchronization, Google Maps SDK navigation, and BLoC state architecture.",
            result: "Successfully deployed on Google Play Store with thousands of active rides and instantaneous dispatch updates.",
            tags: ["Flutter", "Dart", "BLoC", "SignalR", "Google Maps SDK", "Play Store"],
            githubLink: "https://github.com/kaleab-mezgebe",
            playstoreLink: "https://play.google.com/store/apps/details?id=com.axumite.customer&hl=en_US",
            driverPlaystoreLink: "https://play.google.com/store/apps/details?id=com.axumite.partner&hl=en_US",
            image: "./assets/ride.png",
            badge: "PRODUCTION GOOGLE PLAY STORE",
            isMobile: true
        },
        {
            title: "Shemeta E-Commerce — Multi-Vendor Platform",
            category: "web",
            problem: "Complex multi-vendor operations required synchronized customer storefronts, live order notifications, merchant wallet accounting, and ETB checkout flows.",
            solution: "Developed high-throughput customer storefronts and vendor portals using React.js, Next.js, and TypeScript, integrating Telebirr & Chapa payment gateways with rich analytics dashboards.",
            result: "Delivered an end-to-end commerce experience with sub-second page transitions, dynamic product discovery, and instant merchant order processing.",
            tags: ["React.js", "Next.js", "TypeScript", "Tailwind CSS", "Telebirr & Chapa", "Vendor Dashboard"],
            githubLink: "https://github.com/kaleab-mezgebe",
            demoLink: "https://nicom.dev.niyatconsultancy.com/en",
            image: "./assets/shemeta.png",
            badge: "LIVE DEMO PLATFORM",
            isWeb: true
        },
        {
            title: "AI Dermatologist — Skin Disease Diagnostic App",
            category: "ai",
            problem: "Severe shortage of specialized dermatologists in remote regions leading to delayed clinical diagnoses of curable skin conditions.",
            solution: "Built a cross-platform mobile and web application integrating on-device computer vision models (TensorFlow Lite) and cloud inference endpoints with offline triage assessment.",
            result: "Enabled immediate symptom screening, condition probability breakdowns, and automated patient recommendation reports.",
            tags: ["Flutter", "Dart", "TensorFlow Lite", "Computer Vision", "REST APIs", "HealthTech"],
            githubLink: "https://github.com/kaleab-mezgebe/AI-Dermatologist",
            image: "./assets/ai.png",
            badge: "AI & HEALTHTECH APP",
            isMobile: true
        },
        {
            title: "ExpenseIQ — Financial Document & Receipt OCR Pipeline",
            category: "ai",
            problem: "Manual financial data entry and unstandardized paper receipts result in slow auditing and human errors in expense logging.",
            solution: "Engineered an automated extraction pipeline combining OpenCV image preprocessing (deskewing, binarization), Tesseract OCR detection, and FastAPI Pydantic schema validation.",
            result: "Automated receipt data extraction with high confidence scores, structured JSON output, and instant verification status.",
            tags: ["Python", "FastAPI", "Tesseract OCR", "OpenCV", "Pydantic", "React.js"],
            githubLink: "https://github.com/kaleab-mezgebe/ExpenseIQ",
            image: "./assets/ocr_pipeline.png",
            badge: "COMPUTER VISION & OCR PIPELINE",
            isWeb: true
        },
        {
            title: "Tigray Heritage — Cultural Documentation App",
            category: "mobile",
            problem: "Field researchers needed an offline mobile tool to catalog historical monuments, record GPS coordinates, and sync data reliably.",
            solution: "Created an offline-first Flutter application with local SQLite caching, background image compression, and spatial GIS mapping.",
            result: "Successfully cataloged hundreds of historical sites with offline synchronization and zero data loss.",
            tags: ["Flutter", "Dart", "SQLite", "Offline-First", "GIS Mapping"],
            githubLink: "https://github.com/kaleab-mezgebe",
            image: "./assets/ride.png",
            badge: "PUBLIC INSTITUTION CONTRACT",
            isMobile: true
        },
        {
            title: "EthioBeds — Hospitality & Booking Platform",
            category: "web",
            problem: "Hotels and guests lacked an integrated reservation system with local payment support and instant room availability tracking.",
            solution: "Engineered a responsive web booking engine using React.js, Tailwind CSS, Node.js backend APIs, and Chapa payment integration.",
            result: "Delivered unified guest booking journeys with automated booking confirmations and host management controls.",
            tags: ["React.js", "Node.js", "Tailwind CSS", "Chapa API", "PostgreSQL"],
            githubLink: "https://github.com/kaleab-mezgebe",
            image: "./assets/shemeta.png",
            badge: "SAAS PLATFORM",
            isWeb: true
        },
        {
            title: "Telebirr & Chapa — FinTech Payment Microservices",
            category: "mobile",
            problem: "Secure, idempotent checkout transactions required encrypted hash signatures and reliable webhook callbacks.",
            solution: "Architected standardized payment SDK wrappers with HMAC signature verification, QR-code payment generation, and automated retry policies.",
            result: "Processed real-time payment transactions with sub-second confirmation and zero reconciliation discrepancies.",
            tags: ["FinTech", "Telebirr", "Chapa", "Webhooks", "HMAC Security", "TypeScript"],
            githubLink: "https://github.com/kaleab-mezgebe",
            image: "./assets/shemeta.png",
            badge: "FINTECH INFRASTRUCTURE",
            isMobile: true
        }
    ];

    const filteredProjects = activeFilter === 'all'
        ? projects
        : projects.filter((p) => p.category === activeFilter);

    return (
        <div className={`app-container ${isDarkMode ? 'dark' : 'light'}`}>
            {/* Elegant Page Entrance Preloader with Seamless Fade-Out */}
            <AnimatePresence>
                {isLoading && <PageLoader isDarkMode={isDarkMode} />}
            </AnimatePresence>

            {/* Dynamic Constellation Particle Field */}
            <ParticleBackground isDarkMode={isDarkMode} />

            {/* Toast Notification */}
            <AnimatePresence>
                {toastMessage && (
                    <motion.div
                        initial={{ opacity: 0, y: 40, scale: 0.92 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.92 }}
                        className="toast-floating"
                    >
                        <CheckCircle2 size={18} color="#10b981" />
                        <span>{toastMessage}</span>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Video Modal */}
            <AnimatePresence>
                {selectedVideo && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        style={{
                            position: 'fixed', inset: 0, zIndex: 1000,
                            background: 'rgba(0,0,0,0.92)', backdropFilter: 'blur(12px)',
                            display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px'
                        }}
                        onClick={() => setSelectedVideo(null)}
                    >
                        <motion.div
                            initial={{ scale: 0.9 }}
                            animate={{ scale: 1 }}
                            exit={{ scale: 0.9 }}
                            style={{ position: 'relative', width: '100%', maxWidth: '900px', maxHeight: '85vh' }}
                            onClick={e => e.stopPropagation()}
                        >
                            <button
                                onClick={() => setSelectedVideo(null)}
                                style={{
                                    position: 'absolute', top: -40, right: 0,
                                    background: 'transparent', color: 'white', border: 'none', cursor: 'pointer', fontSize: '1.2rem', fontWeight: 'bold'
                                }}
                            >
                                Close ✕
                            </button>
                            <video
                                src={selectedVideo}
                                controls
                                autoPlay
                                style={{ width: '100%', height: '100%', borderRadius: '20px', boxShadow: '0 0 50px rgba(0,0,0,0.6)' }}
                            />
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Navigation Bar */}
            <nav className="navbar-fixed">
                <div className="navbar-inner">
                    <a href="#hero" className="nav-brand-link">
                        <div className="nav-avatar-wrapper">
                            <img src={kaleabPortrait} alt="Kaleab Mezgebe" className="nav-avatar-img" />
                        </div>
                        <span className="nav-brand-text">
                            KALEAB<span className="accent-text">.M</span>
                        </span>
                    </a>

                    {/* Desktop Navigation Links */}
                    <div className="nav-desktop-links">
                        <a href="#hero" className="nav-link">Home</a>
                        <a href="#experience" className="nav-link">Experience</a>
                        <a href="#highlights" className="nav-link">Highlights</a>
                        <a href="#metrics" className="nav-link">Metrics</a>
                        <a href="#projects" className="nav-link">Projects</a>
                        <a href="#skills" className="nav-link">Skills</a>
                        <a href="#contact" className="nav-link">Contact</a>
                    </div>

                    {/* Navigation Actions */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexShrink: 0 }}>
                        <button 
                            onClick={toggleTheme} 
                            className="theme-toggle" 
                            aria-label="Toggle theme"
                            title={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
                        >
                            {isDarkMode ? <Sun size={17} /> : <Moon size={17} />}
                        </button>
                        
                        <a
                            href="./assets/Kaleab Mezgebe's cv.pdf"
                            target="_blank"
                            download
                            className="accent-bg glow-effect resume-btn-nav"
                            style={{ 
                                padding: '7px 14px', 
                                borderRadius: '9999px', 
                                color: 'white', 
                                fontWeight: 800, 
                                fontSize: '0.82rem', 
                                display: 'inline-flex', 
                                alignItems: 'center', 
                                gap: '5px',
                                textDecoration: 'none'
                            }}
                            title="Download Resume PDF"
                        >
                            <Download size={14} /> <span>Resume</span>
                        </a>

                        {/* Mobile Hamburger Menu Toggle */}
                        <button
                            type="button"
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="theme-toggle nav-mobile-btn"
                            style={{ padding: '8px', cursor: 'pointer' }}
                            aria-label="Toggle navigation menu"
                            title="Navigation Menu"
                        >
                            {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
                        </button>
                    </div>
                </div>

                {/* Mobile Navigation Drawer */}
                <AnimatePresence>
                    {isMobileMenuOpen && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                            style={{
                                overflow: 'hidden',
                                background: 'var(--nav-bg)',
                                borderTop: '1px solid var(--glass-border)',
                                backdropFilter: 'blur(20px)',
                                padding: '12px 16px 18px',
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '6px'
                            }}
                        >
                            {[
                                { href: '#hero', label: '⚡ Home' },
                                { href: '#experience', label: '💼 Professional Experience' },
                                { href: '#highlights', label: '✨ Flagship Highlights' },
                                { href: '#metrics', label: '📊 Engineering Metrics' },
                                { href: '#projects', label: '🚀 Complete Projects' },
                                { href: '#skills', label: '🛠️ Skills & Tech Stack' },
                                { href: '#contact', label: '📫 Contact & Hire' }
                            ].map((item) => (
                                <a
                                    key={item.href}
                                    href={item.href}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    style={{
                                        color: 'var(--text-main)',
                                        textDecoration: 'none',
                                        fontSize: '0.98rem',
                                        fontWeight: 700,
                                        padding: '12px 14px',
                                        borderRadius: '10px',
                                        background: 'rgba(255,255,255,0.04)',
                                        display: 'block'
                                    }}
                                >
                                    {item.label}
                                </a>
                            ))}
                        </motion.div>
                    )}
                </AnimatePresence>
            </nav>

            {/* HERO SECTION WITH PROFILE & CLI TERMINAL */}
            <section id="hero" className="hero-container">
                <div className="hero-grid">
                    <div>
                        {/* Profile Header Status Badge */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px', flexWrap: 'wrap' }}
                        >
                            <div className="status-pill" style={{ maxWidth: '100%', wordBreak: 'break-word', whiteSpace: 'normal', lineHeight: 1.4 }}>
                                <span className="status-dot"></span>
                                Available for Frontend &amp; Mobile Software Engineering Roles
                            </div>
                        </motion.div>

                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.1 }}
                            className="hero-title"
                        >
                            Kaleab <span className="accent-text">Mezgebe</span>
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.15 }}
                            style={{ fontSize: 'clamp(1rem, 2vw, 1.2rem)', color: 'var(--text-muted)', lineHeight: 1.65, maxWidth: '620px', marginBottom: '30px' }}
                        >
                            I'm <strong>Kaleab Mezgebe</strong>, a Software Engineer with <strong>3+ years of experience</strong> crafting production Flutter mobile apps, responsive React/Next.js platforms, real-time GPS tracking (SignalR), and local FinTech payments (Telebirr &amp; Chapa).
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            className="hero-cta-group"
                            style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', alignItems: 'center' }}
                        >
                            <a
                                href="#projects"
                                className="accent-bg glow-effect hero-btn"
                                style={{ padding: '13px 28px', borderRadius: '14px', color: 'white', fontWeight: 800, fontSize: '0.98rem', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '8px', textDecoration: 'none' }}
                            >
                                Explore Projects <ArrowUpRight size={18} />
                            </a>
                            <a
                                href="#contact"
                                className="glass-card hero-btn"
                                style={{ padding: '13px 26px', borderRadius: '14px', fontWeight: 800, fontSize: '0.98rem', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '8px', textDecoration: 'none' }}
                            >
                                Contact Me <Mail size={18} />
                            </a>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.6, delay: 0.3 }}
                            className="hero-stats"
                        >
                            <div className="hero-stat-card">
                                <div className="stat-number" style={{ color: 'var(--accent-primary)' }}>3+</div>
                                <div className="stat-label">Years Experience</div>
                            </div>
                            <div className="hero-stat-card">
                                <div className="stat-number" style={{ color: 'var(--accent-secondary)' }}>3.88</div>
                                <div className="stat-label">MIT CGPA Distinction</div>
                            </div>
                            <div className="hero-stat-card">
                                <div className="stat-number" style={{ color: 'var(--accent-tertiary)' }}>86/100</div>
                                <div className="stat-label">National Exit Exam</div>
                            </div>
                        </motion.div>
                    </div>

                    {/* Developer CLI Terminal */}
                    <div style={{ width: '100%', minWidth: 0 }}>
                        <motion.div
                            initial={{ opacity: 0, scale: 0.96 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                        >
                            <InteractiveTerminal onTriggerToast={showToast} />
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* 1. CAREER TIMELINE */}
            <section id="experience">
                <SectionHeading subtitle="Track record of engineering robust software across logistics, SaaS, and public institutions" badge="// 01. CAREER JOURNEY">
                    Professional Experience
                </SectionHeading>

                <div className="timeline-container">
                    <div className="timeline-line"></div>

                    {[
                        {
                            role: "Frontend & Mobile Developer",
                            company: "Niyat Consultancy PLC",
                            period: "Sep 2025 – Present",
                            location: "Addis Ababa, Ethiopia",
                            desc: "Developing and maintaining user-facing web and mobile applications using React.js, TypeScript, and Flutter. Building production dashboards, payment integrations (Telebirr, Chapa), and real-time GPS tracking.",
                            stack: ["React.js", "TypeScript", "Flutter", "BLoC", "SignalR", "Telebirr & Chapa", "PostgreSQL"]
                        },
                        {
                            role: "Software Developer",
                            company: "Grand Technology Solutions",
                            period: "Sep 2024 – Sep 2025",
                            location: "Mekelle, Tigray, Ethiopia",
                            desc: "Developed reusable UI components in React.js and integrated them with backend RESTful APIs. Developed and tested CRUD endpoints using FastAPI and PostgreSQL with comprehensive Postman test coverage.",
                            stack: ["React.js", "JavaScript", "Flutter", "FastAPI", "PostgreSQL", "Postman"]
                        },
                        {
                            role: "Remote Mobile Application Developer (Contract)",
                            company: "Tigray Culture & Tourism Bureau",
                            period: "Jan 2024 – Jun 2024",
                            location: "Mekelle, Ethiopia (Remote)",
                            desc: "Developed a cross-platform Flutter application for cultural heritage registration and spatial documentation. Implemented offline-first local caching (Hive/SQLite) and synchronization for robust field operation.",
                            stack: ["Flutter", "Dart", "Hive / SQLite", "REST APIs", "Git"]
                        }
                    ].map((exp, idx) => (
                        <div key={idx} className="timeline-item">
                            <div className="timeline-dot"></div>
                            <Card delay={idx * 0.08}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '10px', marginBottom: '14px' }}>
                                    <div style={{ minWidth: '220px', flex: '1 1 auto' }}>
                                        <h3 style={{ fontSize: 'clamp(1.15rem, 3vw, 1.35rem)', fontWeight: 800 }}>{exp.role}</h3>
                                        <p className="accent-text font-mono" style={{ fontWeight: 700, fontSize: '0.98rem' }}>{exp.company}</p>
                                    </div>
                                    <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', alignItems: 'center' }}>
                                        <span className="timeline-period">
                                            <Calendar size={13} /> {exp.period}
                                        </span>
                                        <span className="timeline-location">
                                            <MapPin size={13} /> {exp.location}
                                        </span>
                                    </div>
                                </div>
                                <p style={{ color: 'var(--text-muted)', fontSize: '0.94rem', lineHeight: 1.6, marginBottom: '16px' }}>{exp.desc}</p>
                                <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                                    {exp.stack.map((item, sIdx) => (
                                        <span key={sIdx} className="tech-chip">
                                            {item}
                                        </span>
                                    ))}
                                </div>
                            </Card>
                        </div>
                    ))}
                </div>
            </section>

            {/* 2. BENTO GRID SHOWCASE */}
            <section id="highlights">
                <SectionHeading subtitle="Architectural depth, production deployments, and verified metrics" badge="// 02. BENTO SHOWCASE">
                    Flagship Architecture Highlights
                </SectionHeading>

                <div className="bento-grid">
                    {/* Bento Item 1: Axumite Ride Live GPS Stream */}
                    <div className="bento-col-8">
                        <Card style={{ position: 'relative', overflow: 'hidden' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '12px', marginBottom: '14px' }}>
                                <div>
                                    <span className="status-pill" style={{ color: '#10b981', borderColor: 'rgba(16, 185, 129, 0.3)', background: 'rgba(16, 185, 129, 0.1)', marginBottom: '8px' }}>
                                        <Activity size={14} /> LIVE PRODUCTION GOOGLE PLAY
                                    </span>
                                    <h3 style={{ fontSize: 'clamp(1.3rem, 3vw, 1.7rem)', fontWeight: 900, marginTop: '4px' }}>Axumite Ride — Real-Time Fleet &amp; Passenger App</h3>
                                </div>
                                <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                                    <a href="https://play.google.com/store/apps/details?id=com.axumite.customer&hl=en_US" target="_blank" className="tech-chip" style={{ background: '#059669', color: 'white', borderColor: 'transparent' }}>
                                        Passenger App <ExternalLink size={13} />
                                    </a>
                                    <a href="https://play.google.com/store/apps/details?id=com.axumite.partner&hl=en_US" target="_blank" className="tech-chip" style={{ background: '#0284c7', color: 'white', borderColor: 'transparent' }}>
                                        Driver App <ExternalLink size={13} />
                                    </a>
                                </div>
                            </div>

                            <p style={{ color: 'var(--text-muted)', fontSize: '0.98rem', lineHeight: 1.6, marginBottom: '18px' }}>
                                Architected with <strong>Flutter BLoC</strong> and <strong>SignalR</strong> live streaming. Features instant GPS polling, sub-second route calculation with Google Maps SDK, phone OTP authentication, and push notifications.
                            </p>

                            <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                                {["Flutter", "Dart", "BLoC Pattern", "SignalR", "Google Maps SDK", "Firebase FCM"].map((t, idx) => (
                                    <span key={idx} className="tech-chip">{t}</span>
                                ))}
                            </div>
                        </Card>
                    </div>

                    {/* Bento Item 2: MIT Academic Excellence */}
                    <div className="bento-col-4">
                        <Card style={{ background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.15), rgba(6, 182, 212, 0.08))' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '14px' }}>
                                <div style={{ width: '44px', height: '44px', borderRadius: '50%', overflow: 'hidden', border: '2px solid var(--accent-primary)', flexShrink: 0 }}>
                                    <img src={kaleabPortrait} alt="Kaleab Mezgebe" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top' }} />
                                </div>
                                <div>
                                    <GraduationCap size={22} color="var(--accent-primary)" />
                                    <span className="font-mono" style={{ fontSize: '0.72rem', color: 'var(--accent-secondary)' }}>ACADEMIC HONORS</span>
                                </div>
                            </div>
                            <h3 style={{ fontSize: '1.25rem', fontWeight: 900, marginBottom: '4px' }}>Mekelle Institute of Technology</h3>
                            <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '12px' }}>BSc in Information Technology (2018–2025)</p>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                <div className="tech-chip" style={{ justifyContent: 'space-between' }}>
                                    <span>Cumulative GPA:</span>
                                    <strong style={{ color: 'var(--accent-primary)' }}>3.88 / 4.00</strong>
                                </div>
                                <div className="tech-chip" style={{ justifyContent: 'space-between' }}>
                                    <span>National Exit Exam:</span>
                                    <strong style={{ color: 'var(--accent-secondary)' }}>86 / 100 (Top Tier)</strong>
                                </div>
                            </div>
                        </Card>
                    </div>

                    {/* Bento Item 3: Shemeta E-Commerce Platform */}
                    <div className="bento-col-6">
                        <Card>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '8px', marginBottom: '14px' }}>
                                <span className="status-pill" style={{ color: '#06b6d4', borderColor: 'rgba(6, 182, 212, 0.3)', background: 'rgba(6, 182, 212, 0.1)' }}>
                                    <Globe size={14} /> MULTI-VENDOR COMMERCE
                                </span>
                                <a href="https://nicom.dev.niyatconsultancy.com/en" target="_blank" className="tech-chip font-mono">
                                    Live Platform <ArrowUpRight size={13} />
                                </a>
                            </div>
                            <h3 style={{ fontSize: '1.35rem', fontWeight: 900, marginBottom: '10px' }}>Shemeta E-Commerce Marketplace</h3>
                            <p style={{ color: 'var(--text-muted)', fontSize: '0.94rem', lineHeight: 1.6, marginBottom: '18px' }}>
                                Scalable React.js &amp; Next.js frontend with dynamic category filtering, interactive shopping cart, merchant wallet accounting, and local payment checkout with <strong>Telebirr &amp; Chapa</strong>.
                            </p>
                            <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                                {["React.js", "Next.js", "TypeScript", "Tailwind CSS", "Telebirr", "Chapa"].map((t, idx) => (
                                    <span key={idx} className="tech-chip">{t}</span>
                                ))}
                            </div>
                        </Card>
                    </div>

                    {/* Bento Item 4: AI & OCR Pipeline */}
                    <div className="bento-col-6">
                        <Card>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '8px', marginBottom: '14px' }}>
                                <span className="status-pill" style={{ color: '#ec4899', borderColor: 'rgba(236, 72, 153, 0.3)', background: 'rgba(236, 72, 153, 0.1)' }}>
                                    <Cpu size={14} /> COMPUTER VISION &amp; AI
                                </span>
                                <a href="https://github.com/kaleab-mezgebe/ExpenseIQ" target="_blank" className="tech-chip font-mono">
                                    GitHub Code <ArrowUpRight size={13} />
                                </a>
                            </div>
                            <h3 style={{ fontSize: '1.35rem', fontWeight: 900, marginBottom: '10px' }}>ExpenseIQ — Financial Document OCR</h3>
                            <p style={{ color: 'var(--text-muted)', fontSize: '0.94rem', lineHeight: 1.6, marginBottom: '18px' }}>
                                Intelligent document pipeline combining OpenCV deskewing/binarization, Tesseract OCR character recognition, and FastAPI Pydantic schema validation for instant JSON auditing.
                            </p>
                            <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                                {["Python", "FastAPI", "OpenCV", "Tesseract OCR", "Pydantic", "React.js"].map((t, idx) => (
                                    <span key={idx} className="tech-chip">{t}</span>
                                ))}
                            </div>
                        </Card>
                    </div>
                </div>
            </section>

            {/* 3. ENGINEERING STANDARDS & PERFORMANCE BENCHMARKS */}
            <EngineeringMetrics />

            {/* 4. FULL PROJECT CATALOG WITH DYNAMIC FILTERING */}
            <section id="projects">
                <SectionHeading subtitle="Filter production mobile apps, SaaS platforms, and machine learning pipelines" badge="// 04. PROVEN DELIVERY">
                    Complete Project Catalog
                </SectionHeading>

                {/* Filter Tabs */}
                <div className="filter-tabs-container">
                    {[
                        { id: 'all', label: 'All Projects (7)' },
                        { id: 'mobile', label: '📱 Flutter & Mobile (4)' },
                        { id: 'web', label: '🌐 Web & Full-Stack (2)' },
                        { id: 'ai', label: '🤖 AI & OCR Pipelines (2)' }
                    ].map((tab) => (
                        <button
                            key={tab.id}
                            className={`filter-tab-btn ${activeFilter === tab.id ? 'active' : ''}`}
                            onClick={() => setActiveFilter(tab.id)}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>

                {/* Projects Grid */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
                    {filteredProjects.map((project, idx) => (
                        <motion.div
                            key={project.title}
                            initial={{ opacity: 0, y: 35, scale: 0.98 }}
                            whileInView={{ opacity: 1, y: 0, scale: 1 }}
                            viewport={{ once: true, amount: 0.1 }}
                            transition={{ duration: 0.55, delay: idx * 0.06, ease: [0.16, 1, 0.3, 1] }}
                            whileHover={{ y: -4, transition: { duration: 0.25 } }}
                            className={`glass-card project-card-item ${idx % 2 !== 0 ? 'alternate' : ''}`}
                        >
                            {/* Project Content */}
                            <div className="project-content">
                                <div style={{ marginBottom: '10px' }}>
                                    <span className="status-pill" style={{ color: 'var(--accent-secondary)', borderColor: 'rgba(6, 182, 212, 0.3)', background: 'rgba(6, 182, 212, 0.08)', fontSize: '0.78rem' }}>
                                        {project.badge}
                                    </span>
                                </div>

                                <h3 style={{ fontSize: 'clamp(1.25rem, 2.5vw, 1.65rem)', fontWeight: 900, marginBottom: '14px', letterSpacing: '-0.02em', lineHeight: 1.25 }}>
                                    {project.title}
                                </h3>

                                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '18px', fontSize: '0.92rem' }}>
                                    <div>
                                        <p style={{ fontWeight: 800, fontSize: '0.76rem', color: 'var(--accent-primary)', letterSpacing: '0.8px', textTransform: 'uppercase', marginBottom: '2px', fontFamily: 'var(--font-mono)' }}>// Problem</p>
                                        <p style={{ color: 'var(--text-muted)' }}>{project.problem}</p>
                                    </div>
                                    <div>
                                        <p style={{ fontWeight: 800, fontSize: '0.76rem', color: 'var(--accent-secondary)', letterSpacing: '0.8px', textTransform: 'uppercase', marginBottom: '2px', fontFamily: 'var(--font-mono)' }}>// Architecture &amp; Solution</p>
                                        <p style={{ color: 'var(--text-main)', fontWeight: 500 }}>{project.solution}</p>
                                    </div>
                                    <div>
                                        <p style={{ fontWeight: 800, fontSize: '0.76rem', color: '#10b981', letterSpacing: '0.8px', textTransform: 'uppercase', marginBottom: '2px', fontFamily: 'var(--font-mono)' }}>// Production Outcome</p>
                                        <p style={{ color: 'var(--text-muted)' }}>{project.result}</p>
                                    </div>
                                </div>

                                <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginBottom: '20px' }}>
                                    {project.tags.map((tag, tIdx) => (
                                        <span key={tIdx} className="tech-chip">
                                            {tag}
                                        </span>
                                    ))}
                                </div>

                                {/* Action Buttons */}
                                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', alignItems: 'center' }}>
                                    {project.githubLink && (
                                        <a
                                            href={project.githubLink}
                                            target="_blank"
                                            className="accent-bg glow-effect"
                                            style={{ padding: '8px 16px', borderRadius: '10px', color: 'white', fontWeight: 800, fontSize: '0.85rem', display: 'inline-flex', alignItems: 'center', gap: '6px', textDecoration: 'none' }}
                                        >
                                            <Github size={15} /> GitHub
                                        </a>
                                    )}

                                    {project.playstoreLink && (
                                        <a
                                            href={project.playstoreLink}
                                            target="_blank"
                                            className="glass-card font-mono"
                                            style={{ padding: '8px 16px', borderRadius: '10px', color: 'white', background: 'linear-gradient(135deg, #059669, #10b981)', border: '1px solid #10b981', fontWeight: 700, fontSize: '0.82rem', display: 'inline-flex', alignItems: 'center', gap: '6px', textDecoration: 'none' }}
                                        >
                                            <ExternalLink size={14} /> Passenger App
                                        </a>
                                    )}

                                    {project.driverPlaystoreLink && (
                                        <a
                                            href={project.driverPlaystoreLink}
                                            target="_blank"
                                            className="glass-card font-mono"
                                            style={{ padding: '8px 16px', borderRadius: '10px', color: 'white', background: 'linear-gradient(135deg, #0284c7, #38bdf8)', border: '1px solid #38bdf8', fontWeight: 700, fontSize: '0.82rem', display: 'inline-flex', alignItems: 'center', gap: '6px', textDecoration: 'none' }}
                                        >
                                            <ExternalLink size={14} /> Driver App
                                        </a>
                                    )}

                                    {project.demoLink && (
                                        <a
                                            href={project.demoLink}
                                            target="_blank"
                                            className="glass-card font-mono"
                                            style={{ padding: '8px 16px', borderRadius: '10px', color: 'var(--text-main)', borderColor: 'var(--accent-secondary)', fontWeight: 700, fontSize: '0.82rem', display: 'inline-flex', alignItems: 'center', gap: '6px', textDecoration: 'none' }}
                                        >
                                            <Globe size={14} /> Live Demo
                                        </a>
                                    )}

                                    {project.videoLink && (
                                        <a
                                            href={project.videoLink}
                                            target="_blank"
                                            className="glass-card font-mono"
                                            style={{ padding: '8px 16px', borderRadius: '10px', fontWeight: 700, fontSize: '0.82rem', display: 'inline-flex', alignItems: 'center', gap: '6px', textDecoration: 'none' }}
                                        >
                                            <Play size={14} /> Live Video
                                        </a>
                                    )}
                                </div>
                            </div>

                            {/* Project Preview Image */}
                            <div className="project-image-container">
                                <motion.img
                                    whileHover={{ scale: 1.04 }}
                                    transition={{ duration: 0.3 }}
                                    src={project.image}
                                    alt={project.title}
                                    style={{
                                        width: project.isMobile ? 'auto' : '100%',
                                        maxWidth: '100%',
                                        height: '100%',
                                        maxHeight: '320px',
                                        objectFit: project.isMobile ? 'contain' : 'cover',
                                        borderRadius: '14px'
                                    }}
                                />
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* 5. TECHNICAL SKILLS MATRIX */}
            <section id="skills">
                <SectionHeading subtitle="Comprehensive mastery across client frameworks, mobile runtimes, and APIs" badge="// 05. SKILLS MATRIX">
                    Technical Stack &amp; Tooling
                </SectionHeading>

                <div className="skills-grid">
                    {[
                        {
                            icon: <Smartphone size={28} color="var(--accent-primary)" />,
                            category: "Mobile App Development",
                            skills: ["Flutter & Dart", "BLoC & Provider", "Google Maps SDK", "SignalR GPS Tracking", "Firebase FCM & Auth", "Hive & SQLite Caching"]
                        },
                        {
                            icon: <Code2 size={28} color="var(--accent-secondary)" />,
                            category: "Frontend Web Engineering",
                            skills: ["React.js & Next.js", "TypeScript & JavaScript ES6+", "Tailwind CSS & Material UI", "Redux Toolkit & Zustand", "Vite & Modern Bundlers", "Responsive UX Design"]
                        },
                        {
                            icon: <Server size={28} color="var(--accent-tertiary)" />,
                            category: "Backend & AI Pipelines",
                            skills: ["Node.js & Express.js", "FastAPI & Python", "RESTful API Contracts", "Tesseract OCR & OpenCV", "TensorFlow Lite On-Device", "Pydantic Data Schemas"]
                        },
                        {
                            icon: <Database size={28} color="#10b981" />,
                            category: "Databases & FinTech",
                            skills: ["PostgreSQL & MySQL", "Redis (Caching)", "Telebirr & Chapa Payments", "JWT Secure Authentication", "Docker & CI/CD Pipelines", "Git / GitHub / GitLab"]
                        }
                    ].map((block, idx) => (
                        <Card key={idx} delay={idx * 0.08}>
                            <div style={{ marginBottom: '14px' }}>{block.icon}</div>
                            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, marginBottom: '14px' }}>{block.category}</h3>
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                                {block.skills.map((skill, sIdx) => (
                                    <span key={sIdx} className="tech-chip">
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </Card>
                    ))}
                </div>
            </section>

            {/* 6. CONTACT & GET IN TOUCH */}
            <section id="contact" style={{ textAlign: 'center' }}>
                <SectionHeading subtitle="Open for full-time engineering positions and high-impact software contracts" badge="// 06. DIRECT INBOX CONTACT">
                    Let's Build Together
                </SectionHeading>

                <div style={{ maxWidth: '750px', margin: '0 auto', width: '100%' }}>
                    {/* One-Click Copy Badges */}
                    <div className="contact-badges-group">
                        <button
                            type="button"
                            onClick={() => copyToClipboard("kaleabmezgebe4@gmail.com", "Email")}
                            className="font-mono contact-copy-btn"
                            style={{
                                background: isDarkMode 
                                    ? 'linear-gradient(135deg, rgba(99, 102, 241, 0.35), rgba(15, 23, 42, 0.95))' 
                                    : 'linear-gradient(135deg, #4f46e5, #4338ca)',
                                border: '1.5px solid #6366f1',
                                boxShadow: '0 6px 20px rgba(99, 102, 241, 0.3)'
                            }}
                            title="Click to copy email address"
                        >
                            <Mail size={17} color={isDarkMode ? "#818cf8" : "#ffffff"} />
                            <span>kaleabmezgebe4@gmail.com</span>
                            <Copy size={14} style={{ opacity: 0.85, color: '#38bdf8' }} />
                        </button>
                        
                        <button
                            type="button"
                            onClick={() => copyToClipboard("+251945989369", "Phone")}
                            className="font-mono contact-copy-btn"
                            style={{
                                background: isDarkMode 
                                    ? 'linear-gradient(135deg, rgba(6, 182, 212, 0.35), rgba(15, 23, 42, 0.95))' 
                                    : 'linear-gradient(135deg, #0891b2, #0e7490)',
                                border: '1.5px solid #06b6d4',
                                boxShadow: '0 6px 20px rgba(6, 182, 212, 0.3)'
                            }}
                            title="Click to copy phone number"
                        >
                            <Phone size={17} color={isDarkMode ? "#22d3ee" : "#ffffff"} />
                            <span>+251 945989369</span>
                            <Copy size={14} style={{ opacity: 0.85, color: '#38bdf8' }} />
                        </button>
                    </div>

                    {/* Interactive Message Form */}
                    <Card style={{ padding: 'clamp(18px, 4vw, 36px)', textAlign: 'left' }}>
                        <form onSubmit={handleSubmitMessage}>
                            <div className="contact-form-grid">
                                <div>
                                    <label className="font-mono" style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, marginBottom: '6px', color: 'var(--text-sub)' }}>// Your Name</label>
                                    <input
                                        type="text"
                                        required
                                        placeholder="Jane Doe"
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        style={{ width: '100%', padding: '12px 14px', background: 'rgba(255,255,255,0.04)', border: '1px solid var(--glass-border)', borderRadius: '12px', color: 'var(--text-main)', outline: 'none', fontSize: '0.95rem' }}
                                    />
                                </div>
                                <div>
                                    <label className="font-mono" style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, marginBottom: '6px', color: 'var(--text-sub)' }}>// Your Email</label>
                                    <input
                                        type="email"
                                        required
                                        placeholder="jane@company.com"
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        style={{ width: '100%', padding: '12px 14px', background: 'rgba(255,255,255,0.04)', border: '1px solid var(--glass-border)', borderRadius: '12px', color: 'var(--text-main)', outline: 'none', fontSize: '0.95rem' }}
                                    />
                                </div>
                            </div>
                            <div style={{ marginBottom: '20px' }}>
                                <label className="font-mono" style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, marginBottom: '6px', color: 'var(--text-sub)' }}>// Your Message</label>
                                <textarea
                                    required
                                    rows={4}
                                    placeholder="Tell me about your project, team opportunity, or engineering requirements..."
                                    value={formData.message}
                                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                    style={{ width: '100%', padding: '12px 14px', background: 'rgba(255,255,255,0.04)', border: '1px solid var(--glass-border)', borderRadius: '12px', color: 'var(--text-main)', outline: 'none', resize: 'vertical', fontSize: '0.95rem' }}
                                />
                            </div>

                            <div className="contact-form-actions">
                                <button
                                    type="submit"
                                    disabled={formStatus === 'sending'}
                                    className="accent-bg glow-effect contact-submit-btn"
                                    style={{ padding: '13px', borderRadius: '12px', color: 'white', fontWeight: 800, fontSize: '0.98rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', cursor: 'pointer', border: 'none' }}
                                >
                                    {formStatus === 'sending' ? (
                                        <>
                                            <Loader2 size={17} className="animate-spin" /> Dispatching...
                                        </>
                                    ) : (
                                        <>
                                            <Send size={17} /> Send Message Directly
                                        </>
                                    )}
                                </button>
                                <a
                                    href="mailto:kaleabmezgebe4@gmail.com"
                                    className="glass-card font-mono contact-mail-btn"
                                    style={{ padding: '13px 18px', borderRadius: '12px', color: 'var(--text-main)', fontWeight: 700, fontSize: '0.88rem', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '6px', textDecoration: 'none' }}
                                >
                                    <ExternalLink size={15} /> Open Mail App
                                </a>
                            </div>

                            {formStatus === 'success' && (
                                <div style={{ marginTop: '14px', padding: '10px 14px', background: 'rgba(16, 185, 129, 0.12)', border: '1px solid rgba(16, 185, 129, 0.3)', borderRadius: '10px', display: 'flex', alignItems: 'center', gap: '8px', color: '#10b981', fontWeight: 600, fontSize: '0.88rem' }}>
                                    <CheckCircle2 size={16} /> Thank you! Your message has been sent to Kaleab's inbox.
                                </div>
                            )}
                        </form>
                    </Card>
                </div>
            </section>

            {/* FOOTER */}
            <footer className="footer-container">
                <div className="footer-inner">
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <div style={{ width: '28px', height: '28px', borderRadius: '50%', overflow: 'hidden', border: '1px solid var(--accent-primary)', flexShrink: 0 }}>
                            <img src={kaleabPortrait} alt="Kaleab" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        </div>
                        <span className="font-mono" style={{ fontSize: '0.85rem' }}>
                            © {new Date().getFullYear()} <strong style={{ color: 'var(--text-main)' }}>Kaleab Mezgebe</strong>. Built with React &amp; Vite.
                        </span>
                    </div>
                    <div style={{ display: 'flex', gap: '18px', flexWrap: 'wrap' }}>
                        <a href="https://github.com/kaleab-mezgebe" target="_blank" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>GitHub</a>
                        <a href="https://linkedin.com/in/kaleab-mezgebe-764a56198/" target="_blank" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>LinkedIn</a>
                        <a href="mailto:kaleabmezgebe4@gmail.com" style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>Email</a>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default App;
