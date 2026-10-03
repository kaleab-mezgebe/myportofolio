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
    Search,
    Globe,
    Briefcase,
    GraduationCap,
    Send,
    Flame,
    ArrowUpRight,
    Command,
    ShieldCheck,
    Cpu,
    Activity,
    Compass,
    Volume2,
    VolumeX,
    Loader2
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { soundFx } from './utils/sound';
import ParticleBackground from './components/ParticleBackground';
import { InteractiveLab } from './components/InteractiveLab';
import { InteractiveTerminal } from './components/InteractiveTerminal';
import { EngineeringMetrics } from './components/EngineeringMetrics';
import { CodeArchitecturePreview } from './components/CodeArchitecturePreview';
import kaleabPortrait from './assets/kaleab_portrait.jpg';

// Section Heading Component
const SectionHeading = ({ children, subtitle, align = "center", badge = null }) => (
    <div className="section-header" style={{ marginBottom: '56px', textAlign: align }}>
        {badge && (
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                style={{ marginBottom: '14px' }}
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
            style={{ fontSize: 'clamp(2.2rem, 5vw, 3.6rem)', fontWeight: 900, marginBottom: '16px', letterSpacing: '-0.03em' }}
        >
            {children}
        </motion.h2>
        {subtitle && (
            <motion.p
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                style={{ color: 'var(--text-muted)', fontSize: '1.15rem', maxWidth: '750px', margin: align === "center" ? '0 auto' : '0', lineHeight: 1.6 }}
            >
                {subtitle}
            </motion.p>
        )}
        <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: '80px' }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.8 }}
            style={{ height: '4px', background: 'linear-gradient(90deg, var(--accent-primary), var(--accent-secondary), var(--accent-tertiary))', margin: align === "center" ? '24px auto 0' : '24px 0 0', borderRadius: '4px' }}
        />
    </div>
);

// Card Component
const Card = ({ children, className = "", noPadding = false, delay = 0, style = {}, ...props }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.5, delay }}
        className={`glass-card ${className}`}
        style={{
            padding: noPadding ? '0' : '32px',
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
    const [scrolled, setScrolled] = useState(false);
    const [isDarkMode, setIsDarkMode] = useState(true);
    const [soundEnabled, setSoundEnabled] = useState(false);
    const [activeFilter, setActiveFilter] = useState('all');
    const [toastMessage, setToastMessage] = useState(null);
    const [isCmdOpen, setIsCmdOpen] = useState(false);
    const [selectedVideo, setSelectedVideo] = useState(null);
    const [cmdSearch, setCmdSearch] = useState('');
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });
    const [formStatus, setFormStatus] = useState('idle'); // 'idle' | 'sending' | 'success' | 'error'

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 40);
        window.addEventListener('scroll', handleScroll);

        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'light') {
            setIsDarkMode(false);
            document.body.classList.add('light');
        }

        // Global Cmd + K shortcut
        const handleKeyDown = (e) => {
            if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
                e.preventDefault();
                setIsCmdOpen((prev) => !prev);
            }
            if (e.key === 'Escape') {
                setIsCmdOpen(false);
                setSelectedVideo(null);
            }
        };
        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, []);

    const toggleTheme = () => {
        soundFx.playClick();
        setIsDarkMode(!isDarkMode);
        document.body.classList.toggle('light');
        localStorage.setItem('theme', !isDarkMode ? 'dark' : 'light');
    };

    const toggleSound = () => {
        const newState = soundFx.toggleSound();
        setSoundEnabled(newState);
        showToast(newState ? 'Tactile Sound Effects ON 🔊' : 'Sound Effects Muted 🔇');
    };

    const showToast = (text) => {
        setToastMessage(text);
        setTimeout(() => setToastMessage(null), 3500);
    };

    const copyToClipboard = (text, label) => {
        soundFx.playClick();
        navigator.clipboard.writeText(text);
        showToast(`${label} copied to clipboard! 📋`);
        handleConfetti();
    };

    const handleConfetti = () => {
        soundFx.playSuccess();
        confetti({
            particleCount: 130,
            spread: 75,
            origin: { y: 0.6 },
            colors: isDarkMode ? ['#6366f1', '#06b6d4', '#ec4899'] : ['#4f46e5', '#0891b2', '#0f172a']
        });
    };

    const handleSubmitMessage = async (e) => {
        e.preventDefault();
        soundFx.playClick();
        setFormStatus('sending');

        try {
            // Send to FormSubmit endpoint with JSON response format
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
                    _subject: `New Portfolio Message from ${formData.name}`,
                    _template: "table"
                })
            });

            if (response.ok) {
                setFormStatus('success');
                handleConfetti();
                showToast("Message dispatched directly to Kaleab's inbox! 🚀");
                setFormData({ name: '', email: '', message: '' });
            } else {
                throw new Error("API dispatch error");
            }
        } catch (err) {
            // Fallback: Open prefilled mailto client directly
            setFormStatus('success');
            handleConfetti();
            showToast("Opening email client draft... 🚀");
            const mailtoUrl = `mailto:kaleabmezgebe4@gmail.com?subject=${encodeURIComponent(`Project Inquiry from ${formData.name}`)}&body=${encodeURIComponent(`Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`)}`;
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
            title: "Financial Document & Receipt OCR Pipeline",
            category: "ai",
            problem: "Manual financial data entry and unstandardized paper receipts result in slow auditing and human errors in expense logging.",
            solution: "Engineered an automated extraction pipeline combining OpenCV image preprocessing (deskewing, binarization), Tesseract OCR detection, and FastAPI Pydantic schema validation.",
            result: "Automated receipt data extraction with high confidence scores, structured JSON output, and instant verification status.",
            tags: ["Python", "FastAPI", "Tesseract OCR", "OpenCV", "Pydantic", "React.js"],
            githubLink: "https://github.com/kaleab-mezgebe",
            image: "./assets/ocr_pipeline.png",
            badge: "COMPUTER VISION & OCR PIPELINE",
            isWeb: true
        },
        {
            title: "EthioBeds — Hotel & Guesthouse Booking Platform",
            category: "web",
            problem: "Finding safe, verified, and affordable lodging across Ethiopian cities was fragmented without central availability verification.",
            solution: "Architected a full-stack accommodation reservation SaaS with Node.js/Express.js, PostgreSQL relational schemas, JWT authentication, and a responsive React frontend.",
            result: "Launched a trusted marketplace serving verified lodging providers and property seekers with live room availability tracking.",
            tags: ["React.js", "Node.js", "Express.js", "PostgreSQL", "JWT Auth", "Production SaaS"],
            githubLink: "https://github.com/kaleab-mezgebe",
            demoLink: "https://ethiobeds.com",
            image: "./assets/ethiobeds.png",
            badge: "LIVE PRODUCTION SAAS",
            isWeb: true
        },
        {
            title: "CBEBirr App Clone (FinTech UI)",
            category: "mobile",
            problem: "FinTech apps demand high-fidelity micro-interactions and secure visual state flows to build consumer trust.",
            solution: "Engineered a pixel-perfect CBEBirr mobile experience clone in Flutter with custom animations, balance conceal toggles, and seamless transaction views.",
            result: "Showcased high-performance UI engineering with smooth 60fps mobile transitions and state feedback.",
            tags: ["Flutter", "FinTech UI", "State Management", "Micro-Animations"],
            githubLink: "https://github.com/kaleab-mezgebe/cbe_birr",
            videoLink: "https://www.linkedin.com/posts/kaleab-mezgebe-764a56198_cbe-birr-app-clone-in-flutter-practice-activity-7410324964827987968-PKSr",
            image: "./assets/cbebirr.png",
            badge: "FINTECH UI ENGINEERING",
            isMobile: true
        },
        {
            title: "Tigray Cultural Property Hub",
            category: "mobile",
            problem: "Historical monuments and cultural properties were vulnerable to being uncatalogued or lost without spatial GIS and descriptive records.",
            solution: "Built a cross-platform Flutter field application with offline-first caching (Hive/SQLite) for data collectors in remote areas.",
            result: "Digitized 1,000+ cultural asset records with spatial coordinates and comprehensive metadata.",
            tags: ["Flutter", "Dart", "Offline-First", "GIS", "Social Impact"],
            githubLink: "https://github.com/kaleab-mezgebe/TCPH-",
            image: "./assets/tcph.png",
            badge: "DIGITALIZATION & HERITAGE",
            isMobile: true
        }
    ];

    const filteredProjects = activeFilter === 'all'
        ? projects
        : projects.filter((p) => p.category === activeFilter);

    // Command palette actions
    const commandActions = [
        { label: "Navigate: Home Hero", action: () => { window.location.href = "#hero"; setIsCmdOpen(false); } },
        { label: "Navigate: Architecture Demos", action: () => { window.location.href = "#architecture-demos"; setIsCmdOpen(false); } },
        { label: "Navigate: Engineering Standards", action: () => { window.location.href = "#metrics"; setIsCmdOpen(false); } },
        { label: "Navigate: Production Code Inspector", action: () => { window.location.href = "#code-standards"; setIsCmdOpen(false); } },
        { label: "Navigate: Flagship Highlights", action: () => { window.location.href = "#highlights"; setIsCmdOpen(false); } },
        { label: "Navigate: Projects Showcase", action: () => { window.location.href = "#projects"; setIsCmdOpen(false); } },
        { label: "Navigate: Technical Stack", action: () => { window.location.href = "#skills"; setIsCmdOpen(false); } },
        { label: "Navigate: Experience Timeline", action: () => { window.location.href = "#experience"; setIsCmdOpen(false); } },
        { label: "Navigate: Contact Me", action: () => { window.location.href = "#contact"; setIsCmdOpen(false); } },
        { label: "Copy Email (kaleabmezgebe4@gmail.com)", action: () => { copyToClipboard("kaleabmezgebe4@gmail.com", "Email"); setIsCmdOpen(false); } },
        { label: "Copy Phone (+251 945989369)", action: () => { copyToClipboard("+251945989369", "Phone"); setIsCmdOpen(false); } },
        { label: "Download Latest CV (PDF)", action: () => { window.open("./assets/Kaleab Mezgebe's cv.pdf", "_blank"); setIsCmdOpen(false); } },
        { label: "Toggle Dark / Light Theme", action: () => { toggleTheme(); setIsCmdOpen(false); } },
        { label: "Toggle Audio Feedback", action: () => { toggleSound(); setIsCmdOpen(false); } },
        { label: "Open GitHub Profile", action: () => { window.open("https://github.com/kaleab-mezgebe", "_blank"); setIsCmdOpen(false); } },
        { label: "Open LinkedIn Profile", action: () => { window.open("https://linkedin.com/in/kaleab-mezgebe-764a56198/", "_blank"); setIsCmdOpen(false); } }
    ];

    const filteredCommands = commandActions.filter(c => c.label.toLowerCase().includes(cmdSearch.toLowerCase()));

    return (
        <div className={`app-container ${isDarkMode ? 'dark' : 'light'}`}>
            {/* Dynamic Constellation Particle Field */}
            <ParticleBackground isDarkMode={isDarkMode} />

            {/* Toast Notification */}
            <AnimatePresence>
                {toastMessage && (
                    <motion.div
                        initial={{ opacity: 0, y: 50, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.9 }}
                        className="toast-floating"
                    >
                        <CheckCircle2 size={20} color="#10b981" />
                        <span>{toastMessage}</span>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Command Palette Modal */}
            <AnimatePresence>
                {isCmdOpen && (
                    <div className="cmd-palette-backdrop" onClick={() => setIsCmdOpen(false)}>
                        <motion.div
                            initial={{ scale: 0.95, opacity: 0, y: -20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.95, opacity: 0, y: -20 }}
                            className="cmd-palette-modal"
                            onClick={e => e.stopPropagation()}
                        >
                            <div className="cmd-input-wrapper">
                                <Search size={20} color="var(--accent-primary)" />
                                <input
                                    type="text"
                                    placeholder="Type a command or search (e.g., 'lab', 'projects', 'resume', 'hire')..."
                                    className="cmd-input"
                                    value={cmdSearch}
                                    onChange={(e) => setCmdSearch(e.target.value)}
                                    autoFocus
                                />
                                <span className="font-mono" style={{ fontSize: '0.78rem', color: 'var(--text-muted)', background: 'rgba(255,255,255,0.08)', padding: '3px 8px', borderRadius: '6px' }}>ESC</span>
                            </div>
                            <div style={{ maxHeight: '350px', overflowY: 'auto', padding: '8px 0' }}>
                                {filteredCommands.length > 0 ? (
                                    filteredCommands.map((cmd, idx) => (
                                        <div
                                            key={idx}
                                            className="cmd-item"
                                            onClick={cmd.action}
                                        >
                                            <span style={{ fontSize: '0.95rem', fontWeight: 600 }}>{cmd.label}</span>
                                            <ArrowUpRight size={16} style={{ opacity: 0.5 }} />
                                        </div>
                                    ))
                                ) : (
                                    <div style={{ padding: '24px', textAlign: 'center', color: 'var(--text-muted)' }}>
                                        No commands found matching "{cmdSearch}"
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    </div>
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
                            display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px'
                        }}
                        onClick={() => setSelectedVideo(null)}
                    >
                        <motion.div
                            initial={{ scale: 0.85, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            style={{ width: '90%', maxWidth: '900px', position: 'relative', aspectRatio: '16/9' }}
                            onClick={e => e.stopPropagation()}
                        >
                            <button
                                onClick={() => setSelectedVideo(null)}
                                style={{
                                    position: 'absolute', top: -45, right: 0,
                                    background: 'transparent', color: 'white', border: 'none', cursor: 'pointer', fontSize: '1.2rem', fontWeight: 'bold'
                                }}
                            >
                                Close ✕
                            </button>
                            <video
                                src={selectedVideo}
                                controls
                                autoPlay
                                style={{ width: '100%', height: '100%', borderRadius: '24px', boxShadow: '0 0 50px rgba(0,0,0,0.6)' }}
                            />
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Navigation Bar */}
            <nav className="navbar-fixed">
                <div className="navbar-inner">
                    <a href="#hero" style={{ display: 'flex', alignItems: 'center', gap: '12px', textDecoration: 'none' }}>
                        <div style={{ width: '42px', height: '42px', borderRadius: '50%', overflow: 'hidden', border: '2px solid var(--accent-primary)', boxShadow: '0 0 15px var(--accent-glow)', flexShrink: 0 }}>
                            <img src={kaleabPortrait} alt="Kaleab Mezgebe" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top' }} />
                        </div>
                        <span style={{ fontWeight: 900, fontSize: '1.15rem', letterSpacing: '-0.5px', color: 'var(--text-main)' }}>
                            KALEAB<span className="accent-text">.M</span>
                        </span>
                    </a>

                    {/* Desktop Navigation Links */}
                    <div style={{ display: 'flex', gap: '4px', alignItems: 'center' }} className="hidden md:flex">
                        <a href="#hero" className="nav-link">Home</a>
                        <a href="#highlights" className="nav-link">Highlights</a>
                        <a href="#architecture-demos" className="nav-link">Architecture</a>
                        <a href="#projects" className="nav-link">Projects</a>
                        <a href="#skills" className="nav-link">Skills</a>
                        <a href="#experience" className="nav-link">Experience</a>
                        <a href="#contact" className="nav-link">Contact</a>
                    </div>

                    {/* Quick Tools */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <button
                            onClick={toggleSound}
                            className={`sound-toggle-btn ${soundEnabled ? 'active' : ''}`}
                            title="Toggle Web Audio SFX"
                        >
                            {soundEnabled ? <Volume2 size={15} /> : <VolumeX size={15} />}
                            <span className="hidden sm:inline">{soundEnabled ? 'SFX ON' : 'SFX'}</span>
                        </button>
                        <button
                            onClick={() => setIsCmdOpen(true)}
                            className="status-pill"
                            style={{ cursor: 'pointer', background: 'rgba(255,255,255,0.05)', color: 'var(--text-sub)', borderColor: 'var(--glass-border)', padding: '6px 10px' }}
                            title="Command Palette (Cmd+K)"
                        >
                            <Command size={14} />
                            <span className="hidden sm:inline">⌘K</span>
                        </button>
                        <button onClick={toggleTheme} className="theme-toggle" aria-label="Toggle theme">
                            {isDarkMode ? <Sun size={17} /> : <Moon size={17} />}
                        </button>
                        <a
                            href="./assets/Kaleab Mezgebe's cv.pdf"
                            target="_blank"
                            download
                            className="accent-bg glow-effect"
                            style={{ padding: '8px 16px', borderRadius: '9999px', color: 'white', fontWeight: 800, fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '6px' }}
                        >
                            <Download size={14} /> Resume
                        </a>
                    </div>
                </div>
            </nav>

            {/* HERO SECTION WITH PROFILE PHOTO & CLI TERMINAL */}
            <section id="hero" className="hero-container">
                <div className="hero-grid">
                    <div>
                        {/* Profile Header Badge with User Portrait */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '24px', flexWrap: 'wrap' }}
                        >
                            <div style={{ position: 'relative', width: '56px', height: '56px', borderRadius: '50%', padding: '2px', background: 'linear-gradient(135deg, var(--accent-primary), var(--accent-secondary), var(--accent-tertiary))', boxShadow: '0 0 20px var(--accent-glow)' }}>
                                <img
                                    src={kaleabPortrait}
                                    alt="Kaleab Mezgebe"
                                    style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover', objectPosition: 'center top' }}
                                />
                                <span style={{ position: 'absolute', bottom: '1px', right: '1px', width: '13px', height: '13px', borderRadius: '50%', background: '#10b981', border: '2px solid var(--bg-dark)' }} />
                            </div>

                            <div className="status-pill">
                                <span className="status-dot"></span>
                                Available for Frontend &amp; Mobile Software Engineering Roles
                            </div>
                        </motion.div>

                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.1 }}
                            className="hero-title"
                        >
                            Engineering <span className="accent-text">High-Velocity</span> Mobile &amp; Modern Web Architectures.
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            style={{ fontSize: 'clamp(1.1rem, 2vw, 1.25rem)', color: 'var(--text-muted)', lineHeight: 1.7, maxWidth: '620px', marginBottom: '36px' }}
                        >
                            I'm <strong>Kaleab Mezgebe</strong>, a Software Engineer with <strong>3+ years of experience</strong> crafting production Flutter mobile apps, responsive React/Next.js platforms, real-time tracking (SignalR), and local FinTech payments (Telebirr &amp; Chapa).
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.3 }}
                            style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', alignItems: 'center' }}
                        >
                            <a
                                href="#projects"
                                className="accent-bg glow-effect"
                                style={{ padding: '14px 32px', borderRadius: '16px', color: 'white', fontWeight: 800, fontSize: '1.05rem', display: 'inline-flex', alignItems: 'center', gap: '10px' }}
                            >
                                Explore Projects <ArrowUpRight size={18} />
                            </a>
                            <a
                                href="#contact"
                                className="glass-card"
                                style={{ padding: '14px 28px', borderRadius: '16px', fontWeight: 800, fontSize: '1.05rem', display: 'inline-flex', alignItems: 'center', gap: '8px' }}
                            >
                                Contact Me <Mail size={18} />
                            </a>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.8, delay: 0.4 }}
                            className="hero-stats"
                        >
                            <div>
                                <div className="stat-number" style={{ color: 'var(--accent-primary)' }}>3+</div>
                                <div className="stat-label">Years Experience</div>
                            </div>
                            <div style={{ width: '1px', height: '45px', background: 'var(--glass-border)' }}></div>
                            <div>
                                <div className="stat-number" style={{ color: 'var(--accent-secondary)' }}>3.88</div>
                                <div className="stat-label">MIT CGPA Distinction</div>
                            </div>
                            <div style={{ width: '1px', height: '45px', background: 'var(--glass-border)' }}></div>
                            <div>
                                <div className="stat-number" style={{ color: 'var(--accent-tertiary)' }}>86/100</div>
                                <div className="stat-label">National Exit Exam</div>
                            </div>
                        </motion.div>
                    </div>

                    {/* Interactive CLI Developer Terminal */}
                    <div>
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.8 }}
                        >
                            <InteractiveTerminal onTriggerToast={showToast} />
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* 1. BENTO GRID SHOWCASE */}
            <section id="highlights">
                <SectionHeading subtitle="Architectural depth, production deployments, and verified metrics" badge="// 01. BENTO SHOWCASE">
                    Flagship Architecture Highlights
                </SectionHeading>

                <div className="bento-grid">
                    {/* Bento Item 1: Axumite Ride Live GPS Stream */}
                    <div className="bento-col-8">
                        <Card style={{ position: 'relative', overflow: 'hidden' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'gap', gap: '12px', marginBottom: '16px' }}>
                                <div>
                                    <span className="status-pill" style={{ color: '#10b981', borderColor: 'rgba(16, 185, 129, 0.3)', background: 'rgba(16, 185, 129, 0.1)', marginBottom: '8px' }}>
                                        <Activity size={14} /> LIVE PRODUCTION GOOGLE PLAY
                                    </span>
                                    <h3 style={{ fontSize: '1.8rem', fontWeight: 900 }}>Axumite Ride — Real-Time Fleet &amp; Passenger App</h3>
                                </div>
                                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                                    <a href="https://play.google.com/store/apps/details?id=com.axumite.customer&hl=en_US" target="_blank" className="tech-chip" style={{ background: '#059669', color: 'white', borderColor: 'transparent' }}>
                                        Passenger App <ExternalLink size={14} />
                                    </a>
                                    <a href="https://play.google.com/store/apps/details?id=com.axumite.partner&hl=en_US" target="_blank" className="tech-chip" style={{ background: '#0284c7', color: 'white', borderColor: 'transparent' }}>
                                        Driver App <ExternalLink size={14} />
                                    </a>
                                </div>
                            </div>

                            <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem', lineHeight: 1.6, marginBottom: '20px' }}>
                                Architected with <strong>Flutter BLoC</strong> and <strong>SignalR</strong> live streaming. Features instant GPS polling, sub-second route calculation with Google Maps SDK, phone OTP authentication, and push notifications.
                            </p>

                            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                                {["Flutter", "Dart", "BLoC Pattern", "SignalR", "Google Maps SDK", "Firebase FCM"].map((t, idx) => (
                                    <span key={idx} className="tech-chip">{t}</span>
                                ))}
                            </div>
                        </Card>
                    </div>

                    {/* Bento Item 2: MIT Academic Excellence */}
                    <div className="bento-col-4">
                        <Card style={{ background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.15), rgba(6, 182, 212, 0.08))' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '16px' }}>
                                <div style={{ width: '48px', height: '48px', borderRadius: '50%', overflow: 'hidden', border: '2px solid var(--accent-primary)', flexShrink: 0 }}>
                                    <img src={kaleabPortrait} alt="Kaleab Mezgebe" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top' }} />
                                </div>
                                <div>
                                    <GraduationCap size={24} color="var(--accent-primary)" />
                                    <span className="font-mono" style={{ fontSize: '0.75rem', color: 'var(--accent-secondary)' }}>ACADEMIC HONORS</span>
                                </div>
                            </div>
                            <h3 style={{ fontSize: '1.35rem', fontWeight: 900, marginBottom: '6px' }}>Mekelle Institute of Technology</h3>
                            <p style={{ color: 'var(--text-muted)', fontSize: '0.90rem', marginBottom: '14px' }}>BSc in Information Technology (2018–2025)</p>
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
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                                <span className="status-pill" style={{ color: '#06b6d4', borderColor: 'rgba(6, 182, 212, 0.3)', background: 'rgba(6, 182, 212, 0.1)' }}>
                                    <Globe size={14} /> MULTI-VENDOR COMMERCE
                                </span>
                                <a href="https://nicom.dev.niyatconsultancy.com/en" target="_blank" className="tech-chip font-mono">
                                    nicom.dev.niyatconsultancy.com <ArrowUpRight size={14} />
                                </a>
                            </div>
                            <h3 style={{ fontSize: '1.5rem', fontWeight: 900, marginBottom: '12px' }}>Shemeta E-Commerce Marketplace</h3>
                            <p style={{ color: 'var(--text-muted)', fontSize: '0.98rem', lineHeight: 1.6, marginBottom: '20px' }}>
                                Scalable React.js &amp; Next.js frontend with dynamic category filtering, interactive shopping cart, merchant wallet accounting, and local payment checkout with <strong>Telebirr &amp; Chapa</strong>.
                            </p>
                            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                                {["React.js", "Next.js", "TypeScript", "Tailwind CSS", "Telebirr", "Chapa"].map((t, idx) => (
                                    <span key={idx} className="tech-chip">{t}</span>
                                ))}
                            </div>
                        </Card>
                    </div>

                    {/* Bento Item 4: AI & OCR Pipeline */}
                    <div className="bento-col-6">
                        <Card>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                                <span className="status-pill" style={{ color: '#ec4899', borderColor: 'rgba(236, 72, 153, 0.3)', background: 'rgba(236, 72, 153, 0.1)' }}>
                                    <Cpu size={14} /> COMPUTER VISION &amp; AI
                                </span>
                                <a href="https://github.com/kaleab-mezgebe" target="_blank" className="tech-chip font-mono">
                                    GitHub Code <ArrowUpRight size={14} />
                                </a>
                            </div>
                            <h3 style={{ fontSize: '1.5rem', fontWeight: 900, marginBottom: '12px' }}>Financial Document OCR Extraction</h3>
                            <p style={{ color: 'var(--text-muted)', fontSize: '0.98rem', lineHeight: 1.6, marginBottom: '20px' }}>
                                Intelligent document pipeline combining OpenCV deskewing/binarization, Tesseract OCR character recognition, and FastAPI Pydantic schema validation for instant JSON auditing.
                            </p>
                            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                                {["Python", "FastAPI", "OpenCV", "Tesseract OCR", "Pydantic", "React.js"].map((t, idx) => (
                                    <span key={idx} className="tech-chip">{t}</span>
                                ))}
                            </div>
                        </Card>
                    </div>
                </div>
            </section>

            {/* 2. INTERACTIVE SYSTEM ARCHITECTURE LAB */}
            <InteractiveLab />

            {/* 3. ENGINEERING STANDARDS & PERFORMANCE BENCHMARKS */}
            <EngineeringMetrics />

            {/* 4. PRODUCTION CODE INSPECTOR */}
            <CodeArchitecturePreview onTriggerToast={showToast} />

            {/* 5. FULL PROJECT CATALOG WITH DYNAMIC FILTERING */}
            <section id="projects">
                <SectionHeading subtitle="Filter production mobile apps, SaaS platforms, and machine learning pipelines" badge="// 05. PROVEN DELIVERY">
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
                            onClick={() => { soundFx.playClick(); setActiveFilter(tab.id); }}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>

                {/* Projects Grid */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '36px' }}>
                    {filteredProjects.map((project, idx) => (
                        <motion.div
                            key={project.title}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: idx * 0.1 }}
                            className={`glass-card ${idx % 2 !== 0 ? 'alternate' : ''}`}
                            style={{ padding: '36px', display: 'grid', gridTemplateColumns: '1.1fr 0.9fr', gap: '40px', alignItems: 'center' }}
                        >
                            {/* Project Content */}
                            <div>
                                <div style={{ marginBottom: '12px' }}>
                                    <span className="status-pill" style={{ color: 'var(--accent-secondary)', borderColor: 'rgba(6, 182, 212, 0.3)', background: 'rgba(6, 182, 212, 0.08)', fontSize: '0.8rem' }}>
                                        {project.badge}
                                    </span>
                                </div>

                                <h3 style={{ fontSize: '1.75rem', fontWeight: 900, marginBottom: '18px', letterSpacing: '-0.02em', lineHeight: 1.25 }}>
                                    {project.title}
                                </h3>

                                <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginBottom: '24px', fontSize: '0.98rem' }}>
                                    <div>
                                        <p style={{ fontWeight: 800, fontSize: '0.80rem', color: 'var(--accent-primary)', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '2px', fontFamily: 'var(--font-mono)' }}>// Problem</p>
                                        <p style={{ color: 'var(--text-muted)' }}>{project.problem}</p>
                                    </div>
                                    <div>
                                        <p style={{ fontWeight: 800, fontSize: '0.80rem', color: 'var(--accent-secondary)', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '2px', fontFamily: 'var(--font-mono)' }}>// Architecture &amp; Solution</p>
                                        <p style={{ color: 'var(--text-main)', fontWeight: 500 }}>{project.solution}</p>
                                    </div>
                                    <div>
                                        <p style={{ fontWeight: 800, fontSize: '0.80rem', color: '#10b981', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '2px', fontFamily: 'var(--font-mono)' }}>// Production Outcome</p>
                                        <p style={{ color: 'var(--text-muted)' }}>{project.result}</p>
                                    </div>
                                </div>

                                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '24px' }}>
                                    {project.tags.map((tag, tIdx) => (
                                        <span key={tIdx} className="tech-chip">
                                            {tag}
                                        </span>
                                    ))}
                                </div>

                                {/* Action Buttons */}
                                <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', alignItems: 'center' }}>
                                    {project.githubLink && (
                                        <a
                                            href={project.githubLink}
                                            target="_blank"
                                            className="accent-bg glow-effect"
                                            style={{ padding: '10px 22px', borderRadius: '12px', color: 'white', fontWeight: 800, fontSize: '0.9rem', display: 'inline-flex', alignItems: 'center', gap: '8px' }}
                                        >
                                            <Github size={16} /> GitHub Code
                                        </a>
                                    )}

                                    {project.playstoreLink && (
                                        <a
                                            href={project.playstoreLink}
                                            target="_blank"
                                            className="glass-card font-mono"
                                            style={{ padding: '10px 20px', borderRadius: '12px', color: 'white', background: 'linear-gradient(135deg, #059669, #10b981)', border: '1px solid #10b981', fontWeight: 700, fontSize: '0.85rem', display: 'inline-flex', alignItems: 'center', gap: '8px' }}
                                        >
                                            <ExternalLink size={16} /> Passenger App
                                        </a>
                                    )}

                                    {project.driverPlaystoreLink && (
                                        <a
                                            href={project.driverPlaystoreLink}
                                            target="_blank"
                                            className="glass-card font-mono"
                                            style={{ padding: '10px 20px', borderRadius: '12px', color: 'white', background: 'linear-gradient(135deg, #0284c7, #38bdf8)', border: '1px solid #38bdf8', fontWeight: 700, fontSize: '0.85rem', display: 'inline-flex', alignItems: 'center', gap: '8px' }}
                                        >
                                            <ExternalLink size={16} /> Driver App
                                        </a>
                                    )}

                                    {project.demoLink && (
                                        <a
                                            href={project.demoLink}
                                            target="_blank"
                                            className="glass-card font-mono"
                                            style={{ padding: '10px 20px', borderRadius: '12px', color: 'var(--text-main)', borderColor: 'var(--accent-secondary)', fontWeight: 700, fontSize: '0.85rem', display: 'inline-flex', alignItems: 'center', gap: '8px' }}
                                        >
                                            <Globe size={16} /> Live Demo
                                        </a>
                                    )}

                                    {project.videoLink && (
                                        <a
                                            href={project.videoLink}
                                            target="_blank"
                                            className="glass-card font-mono"
                                            style={{ padding: '10px 20px', borderRadius: '12px', fontWeight: 700, fontSize: '0.85rem', display: 'inline-flex', alignItems: 'center', gap: '8px' }}
                                        >
                                            <Play size={16} /> Live Video
                                        </a>
                                    )}
                                </div>
                            </div>

                            {/* Project Preview Image */}
                            <div style={{ width: '100%', height: '360px', borderRadius: '20px', overflow: 'hidden', background: 'rgba(15, 23, 42, 0.6)', border: '1px solid var(--glass-border)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <img
                                    src={project.image}
                                    alt={project.title}
                                    style={{
                                        width: project.isMobile ? 'auto' : '100%',
                                        height: '100%',
                                        objectFit: project.isMobile ? 'contain' : 'cover',
                                        borderRadius: '16px'
                                    }}
                                />
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* 6. TECHNICAL SKILLS MATRIX */}
            <section id="skills">
                <SectionHeading subtitle="Comprehensive mastery across client frameworks, mobile runtimes, and APIs" badge="// 06. SKILLS MATRIX">
                    Technical Stack &amp; Tooling
                </SectionHeading>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
                    {[
                        {
                            icon: <Smartphone size={30} color="var(--accent-primary)" />,
                            category: "Mobile App Development",
                            skills: ["Flutter & Dart", "BLoC & Provider", "Google Maps SDK", "SignalR GPS Tracking", "Firebase FCM & Auth", "Hive & SQLite Caching"]
                        },
                        {
                            icon: <Code2 size={30} color="var(--accent-secondary)" />,
                            category: "Frontend Web Engineering",
                            skills: ["React.js & Next.js", "TypeScript & JavaScript ES6+", "Tailwind CSS & Material UI", "Redux Toolkit & Zustand", "Vite & Modern Bundlers", "Responsive UX Design"]
                        },
                        {
                            icon: <Server size={30} color="var(--accent-tertiary)" />,
                            category: "Backend & AI Pipelines",
                            skills: ["Node.js & Express.js", "FastAPI & Python", "RESTful API Contracts", "Tesseract OCR & OpenCV", "TensorFlow Lite On-Device", "Pydantic Data Schemas"]
                        },
                        {
                            icon: <Database size={30} color="#10b981" />,
                            category: "Databases & FinTech",
                            skills: ["PostgreSQL & MySQL", "Redis (Caching)", "Telebirr & Chapa Payments", "JWT Secure Authentication", "Docker & CI/CD Pipelines", "Git / GitHub / GitLab"]
                        }
                    ].map((block, idx) => (
                        <Card key={idx} delay={idx * 0.1}>
                            <div style={{ marginBottom: '18px' }}>{block.icon}</div>
                            <h3 style={{ fontSize: '1.3rem', fontWeight: 800, marginBottom: '16px' }}>{block.category}</h3>
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
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

            {/* 7. CAREER TIMELINE */}
            <section id="experience">
                <SectionHeading subtitle="Track record of engineering robust software across logistics, SaaS, and public institutions" badge="// 07. CAREER JOURNEY">
                    Professional Experience
                </SectionHeading>

                <div className="timeline-container">
                    <div className="timeline-line"></div>

                    {[
                        {
                            role: "Frontend & Mobile Developer",
                            company: "Niyat Consultancy PLC",
                            period: "Sep 2025 – Present | Addis Ababa",
                            desc: "Developing and maintaining user-facing web and mobile applications using React.js, TypeScript, and Flutter. Building production dashboards, payment integrations (Telebirr, Chapa), and real-time GPS tracking.",
                            stack: ["React.js", "TypeScript", "Flutter", "BLoC", "SignalR", "Telebirr & Chapa", "PostgreSQL"]
                        },
                        {
                            role: "Software Developer",
                            company: "Grand Technology Solutions",
                            period: "Sep 2024 – Sep 2025 | Addis Ababa",
                            desc: "Developed reusable UI components in React.js and integrated them with backend RESTful APIs. Developed and tested CRUD endpoints using FastAPI and PostgreSQL with comprehensive Postman test coverage.",
                            stack: ["React.js", "JavaScript", "Flutter", "FastAPI", "PostgreSQL", "Postman"]
                        },
                        {
                            role: "Remote Mobile Application Developer (Contract)",
                            company: "Tigray Culture & Tourism Bureau",
                            period: "Jan 2024 – Jun 2024 | Mekelle (Remote)",
                            desc: "Developed a cross-platform Flutter application for cultural heritage registration and spatial documentation. Implemented offline-first local caching (Hive/SQLite) and synchronization for robust field operation.",
                            stack: ["Flutter", "Dart", "Hive / SQLite", "REST APIs", "Git"]
                        }
                    ].map((exp, idx) => (
                        <div key={idx} className="timeline-item">
                            <div className="timeline-dot"></div>
                            <Card delay={idx * 0.1}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', flexWrap: 'wrap', gap: '8px', marginBottom: '12px' }}>
                                    <div>
                                        <h3 style={{ fontSize: '1.35rem', fontWeight: 800 }}>{exp.role}</h3>
                                        <p className="accent-text font-mono" style={{ fontWeight: 700, fontSize: '1.05rem' }}>{exp.company}</p>
                                    </div>
                                    <span className="timeline-period">
                                        {exp.period}
                                    </span>
                                </div>
                                <p style={{ color: 'var(--text-muted)', fontSize: '1rem', lineHeight: 1.6, marginBottom: '20px' }}>{exp.desc}</p>
                                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
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

            {/* 8. CONTACT & GET IN TOUCH */}
            <section id="contact" style={{ textAlign: 'center' }}>
                <SectionHeading subtitle="Open for full-time engineering positions and high-impact software contracts" badge="// 08. DIRECT INBOX CONTACT">
                    Let's Build Together
                </SectionHeading>

                <div style={{ maxWidth: '750px', margin: '0 auto' }}>
                    {/* One-Click Copy Badges */}
                    <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', flexWrap: 'wrap', marginBottom: '36px' }}>
                        <button
                            onClick={() => copyToClipboard("kaleabmezgebe4@gmail.com", "Email")}
                            className="glass-card font-mono"
                            style={{ padding: '14px 24px', display: 'flex', alignItems: 'center', gap: '10px', fontWeight: 700, fontSize: '0.95rem', cursor: 'pointer' }}
                        >
                            <Mail size={18} color="var(--accent-primary)" />
                            <span>kaleabmezgebe4@gmail.com</span>
                            <Copy size={15} style={{ opacity: 0.6 }} />
                        </button>
                        <button
                            onClick={() => copyToClipboard("+251945989369", "Phone")}
                            className="glass-card font-mono"
                            style={{ padding: '14px 24px', display: 'flex', alignItems: 'center', gap: '10px', fontWeight: 700, fontSize: '0.95rem', cursor: 'pointer' }}
                        >
                            <Phone size={18} color="var(--accent-secondary)" />
                            <span>+251 945989369</span>
                            <Copy size={15} style={{ opacity: 0.6 }} />
                        </button>
                    </div>

                    {/* Interactive Message Form (Active Direct Inbox) */}
                    <Card style={{ padding: '40px', textAlign: 'left' }}>
                        <form onSubmit={handleSubmitMessage}>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
                                <div>
                                    <label className="font-mono" style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, marginBottom: '8px', color: 'var(--text-sub)' }}>// Your Name</label>
                                    <input
                                        type="text"
                                        required
                                        placeholder="Jane Doe"
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        style={{ width: '100%', padding: '12px 16px', background: 'rgba(255,255,255,0.04)', border: '1px solid var(--glass-border)', borderRadius: '12px', color: 'var(--text-main)', outline: 'none' }}
                                    />
                                </div>
                                <div>
                                    <label className="font-mono" style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, marginBottom: '8px', color: 'var(--text-sub)' }}>// Your Email</label>
                                    <input
                                        type="email"
                                        required
                                        placeholder="jane@company.com"
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        style={{ width: '100%', padding: '12px 16px', background: 'rgba(255,255,255,0.04)', border: '1px solid var(--glass-border)', borderRadius: '12px', color: 'var(--text-main)', outline: 'none' }}
                                    />
                                </div>
                            </div>
                            <div style={{ marginBottom: '24px' }}>
                                <label className="font-mono" style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, marginBottom: '8px', color: 'var(--text-sub)' }}>// Your Message</label>
                                <textarea
                                    required
                                    rows={4}
                                    placeholder="Tell me about your project, team opportunity, or engineering requirements..."
                                    value={formData.message}
                                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                    style={{ width: '100%', padding: '12px 16px', background: 'rgba(255,255,255,0.04)', border: '1px solid var(--glass-border)', borderRadius: '12px', color: 'var(--text-main)', outline: 'none', resize: 'vertical' }}
                                />
                            </div>

                            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                                <button
                                    type="submit"
                                    disabled={formStatus === 'sending'}
                                    className="accent-bg glow-effect"
                                    style={{ flex: 1, padding: '14px', borderRadius: '12px', color: 'white', fontWeight: 800, fontSize: '1.05rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', cursor: 'pointer', border: 'none' }}
                                >
                                    {formStatus === 'sending' ? (
                                        <>
                                            <Loader2 size={18} className="animate-spin" /> Dispatching to Inbox...
                                        </>
                                    ) : (
                                        <>
                                            <Send size={18} /> Send to kaleabmezgebe4@gmail.com
                                        </>
                                    )}
                                </button>
                                <a
                                    href="mailto:kaleabmezgebe4@gmail.com"
                                    className="glass-card font-mono"
                                    style={{ padding: '14px 20px', borderRadius: '12px', color: 'var(--text-main)', fontWeight: 700, fontSize: '0.90rem', display: 'inline-flex', alignItems: 'center', gap: '8px', textDecoration: 'none' }}
                                >
                                    <ExternalLink size={16} /> Open Mail App
                                </a>
                            </div>

                            {formStatus === 'success' && (
                                <div style={{ marginTop: '16px', padding: '12px 16px', background: 'rgba(16, 185, 129, 0.12)', border: '1px solid rgba(16, 185, 129, 0.3)', borderRadius: '10px', display: 'flex', alignItems: 'center', gap: '10px', color: '#10b981', fontWeight: 600, fontSize: '0.92rem' }}>
                                    <CheckCircle2 size={18} /> Thank you! Your message has been sent to Kaleab's inbox.
                                </div>
                            )}
                        </form>
                    </Card>
                </div>
            </section>

            {/* FOOTER */}
            <footer style={{ borderTop: '1px solid var(--glass-border)', padding: '40px 24px', textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.9rem', position: 'relative', zIndex: 1 }}>
                <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <div style={{ width: '28px', height: '28px', borderRadius: '50%', overflow: 'hidden', border: '1px solid var(--accent-primary)' }}>
                            <img src={kaleabPortrait} alt="Kaleab" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        </div>
                        <span className="font-mono">
                            © {new Date().getFullYear()} <strong style={{ color: 'var(--text-main)' }}>Kaleab Mezgebe Fissaha</strong>. Built with React &amp; Vite.
                        </span>
                    </div>
                    <div style={{ display: 'flex', gap: '20px' }}>
                        <a href="https://github.com/kaleab-mezgebe" target="_blank" style={{ color: 'var(--text-muted)' }}>GitHub</a>
                        <a href="https://linkedin.com/in/kaleab-mezgebe-764a56198/" target="_blank" style={{ color: 'var(--text-muted)' }}>LinkedIn</a>
                        <a href="mailto:kaleabmezgebe4@gmail.com" style={{ color: 'var(--text-muted)' }}>Email</a>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default App;
