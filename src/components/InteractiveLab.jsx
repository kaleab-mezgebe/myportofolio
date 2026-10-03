import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Activity,
    Radio,
    CreditCard,
    Cpu,
    Zap,
    Play,
    RotateCcw,
    CheckCircle2,
    Shield,
    FileText,
    Layers,
    MapPin,
    Navigation,
    Clock,
    Sparkles,
    ArrowRight
} from 'lucide-react';
import { soundFx } from '../utils/sound';

export const InteractiveLab = () => {
    const [activeTab, setActiveTab] = useState('signalr'); // 'signalr' | 'fintech' | 'ocr'

    // --- Demo 1: SignalR GPS Stream State ---
    const [isStreaming, setIsStreaming] = useState(true);
    const [driverCoord, setDriverCoord] = useState({ x: 35, y: 40, angle: 45 });
    const [routeIndex, setRouteIndex] = useState(0);
    const [streamLogs, setStreamLogs] = useState([
        { time: '13:42:01.120', type: 'CONNECT', msg: 'SignalR Hub connected: wss://api.axumite.com/rideHub' },
        { time: '13:42:01.144', type: 'BLOC', msg: 'RideBloc: StreamSubscription<DriverLocation> active' },
        { time: '13:42:01.198', type: 'GPS', msg: 'Broadcasting coords: 9.0222° N, 38.7468° E (Bole Medhanialem)' }
    ]);
    const [packetCount, setPacketCount] = useState(48);
    const [latency, setLatency] = useState(24);

    // Waypoints for Addis Ababa simulation
    const waypoints = [
        { name: 'Bole Medhanialem', x: 25, y: 30, angle: 45 },
        { name: 'Atlas Junction', x: 45, y: 35, angle: 20 },
        { name: 'Kazanchis Business Hub', x: 60, y: 55, angle: 90 },
        { name: 'Meskel Square', x: 75, y: 70, angle: 135 },
        { name: 'Mexico Square', x: 50, y: 80, angle: 225 },
        { name: 'Sarbet Terminal', x: 30, y: 65, angle: 270 }
    ];

    useEffect(() => {
        if (!isStreaming) return;
        const interval = setInterval(() => {
            setRouteIndex((prev) => {
                const next = (prev + 1) % waypoints.length;
                const target = waypoints[next];
                setDriverCoord({ x: target.x, y: target.y, angle: target.angle });
                
                const now = new Date().toISOString().substring(11, 23);
                const newLog = {
                    time: now,
                    type: 'GPS_STREAM',
                    msg: `Stream packet #${packetCount + 1}: ${target.name} [${target.x}, ${target.y}] (Δt: ${Math.floor(Math.random() * 8 + 18)}ms)`
                };
                setStreamLogs((logs) => [newLog, ...logs.slice(0, 5)]);
                setPacketCount((c) => c + 1);
                setLatency(Math.floor(Math.random() * 12 + 18));
                return next;
            });
        }, 1800);
        return () => clearInterval(interval);
    }, [isStreaming, packetCount]);

    // --- Demo 2: FinTech Payment State ---
    const [paymentProvider, setPaymentProvider] = useState('telebirr'); // 'telebirr' | 'chapa'
    const [amount, setAmount] = useState('450.00');
    const [paymentStep, setPaymentStep] = useState('idle'); // 'idle' | 'signing' | 'processing' | 'verified'
    const [txHash, setTxHash] = useState('');

    const handleSimulatePayment = () => {
        soundFx.playClick();
        setPaymentStep('signing');
        const mockHash = '0x' + Array.from({ length: 24 }, () => Math.floor(Math.random() * 16).toString(16)).join('');
        setTxHash(mockHash);

        setTimeout(() => {
            setPaymentStep('processing');
            soundFx.playBeep(980, 0.08);
            setTimeout(() => {
                setPaymentStep('verified');
                soundFx.playSuccess();
            }, 1000);
        }, 800);
    };

    const resetPayment = () => {
        soundFx.playClick();
        setPaymentStep('idle');
    };

    // --- Demo 3: AI OCR State ---
    const [ocrFilter, setOcrFilter] = useState('raw'); // 'raw' | 'binarized' | 'boxes' | 'json'
    const [selectedDoc, setSelectedDoc] = useState('telebirr_receipt');

    const sampleDocs = {
        telebirr_receipt: {
            title: 'Telebirr SuperApp Merchant Payment',
            merchant: 'Niyat Tech Retail PLC',
            amount: 'ETB 1,850.00',
            txnId: 'TB-99824-2026',
            confidence: '99.4%',
            date: '2026-10-03 11:20:15',
            rawText: `TELEBIRR TRANSACTION RECEIPT
Merchant: NIYAT TECH RETAIL PLC
Account: +251 945 *** 369
Trans ID: TB-99824-2026
Amount: 1,850.00 ETB
Fee: 0.00 ETB
Status: COMPLETED / SETTLED
Timestamp: 2026-10-03 11:20:15`
        },
        commercial_invoice: {
            title: 'Ethiopian Customs Tax Invoice',
            merchant: 'Grand Logistics Solutions',
            amount: 'ETB 14,200.50',
            txnId: 'INV-ET-88319',
            confidence: '98.8%',
            date: '2026-09-28 16:45:00',
            rawText: `TAX INVOICE / VOUCHER
Grand Logistics Solutions
TIN: 0048291034
Invoice No: INV-ET-88319
Items: Enterprise React & Flutter Software License
Total Payable: ETB 14,200.50
VAT 15%: ETB 1,852.24
Status: PAID`
        }
    };

    return (
        <section id="interactive-lab" style={{ position: 'relative', zIndex: 1 }}>
            <div className="section-header">
                <div style={{ marginBottom: '14px' }}>
                    <span className="status-pill" style={{ color: 'var(--accent-secondary)', borderColor: 'rgba(6, 182, 212, 0.3)', background: 'rgba(6, 182, 212, 0.08)' }}>
                        <Zap size={14} /> // 02. SYSTEM ARCHITECTURE LAB
                    </span>
                </div>
                <h2 className="accent-text" style={{ fontSize: 'clamp(2.2rem, 5vw, 3.6rem)', fontWeight: 900, marginBottom: '16px', letterSpacing: '-0.03em' }}>
                    Interactive System Playground
                </h2>
                <p style={{ color: 'var(--text-muted)', fontSize: '1.15rem', maxWidth: '750px', margin: '0 auto', lineHeight: 1.6 }}>
                    Test and interact in real-time with live simulations of the production architectures I engineer: WebSocket streaming, FinTech webhooks, and Computer Vision OCR.
                </p>
                <div style={{ width: '80px', height: '4px', background: 'linear-gradient(90deg, var(--accent-primary), var(--accent-secondary), var(--accent-tertiary))', margin: '24px auto 0', borderRadius: '4px' }} />
            </div>

            {/* Sandbox Tab Switcher */}
            <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', marginBottom: '36px', flexWrap: 'wrap' }}>
                <button
                    onClick={() => { soundFx.playClick(); setActiveTab('signalr'); }}
                    className={`filter-tab-btn ${activeTab === 'signalr' ? 'active' : ''}`}
                    style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
                >
                    <Radio size={16} /> Real-Time SignalR GPS Stream
                </button>
                <button
                    onClick={() => { soundFx.playClick(); setActiveTab('fintech'); }}
                    className={`filter-tab-btn ${activeTab === 'fintech' ? 'active' : ''}`}
                    style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
                >
                    <CreditCard size={16} /> FinTech Gateway Engine (Telebirr/Chapa)
                </button>
                <button
                    onClick={() => { soundFx.playClick(); setActiveTab('ocr'); }}
                    className={`filter-tab-btn ${activeTab === 'ocr' ? 'active' : ''}`}
                    style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
                >
                    <Cpu size={16} /> Computer Vision OCR Extractor
                </button>
            </div>

            {/* DEMO 1: SIGNALR GPS SIMULATION */}
            {activeTab === 'signalr' && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="glass-card"
                    style={{ padding: '36px' }}
                >
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '32px' }}>
                        {/* Interactive Radar & Map Canvas */}
                        <div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                    <span className="status-dot"></span>
                                    <h3 style={{ fontSize: '1.3rem', fontWeight: 800 }}>Axumite Ride Live GPS Radar</h3>
                                </div>
                                <button
                                    onClick={() => { soundFx.playClick(); setIsStreaming(!isStreaming); }}
                                    className="tech-chip font-mono"
                                    style={{
                                        cursor: 'pointer',
                                        background: isStreaming ? 'rgba(16, 185, 129, 0.15)' : 'rgba(239, 68, 68, 0.15)',
                                        borderColor: isStreaming ? '#10b981' : '#ef4444',
                                        color: isStreaming ? '#10b981' : '#ef4444'
                                    }}
                                >
                                    {isStreaming ? '● Stream Active' : '⏸ Stream Paused'}
                                </button>
                            </div>

                            {/* Simulated GPS Radar Grid */}
                            <div
                                style={{
                                    height: '320px',
                                    borderRadius: '20px',
                                    background: 'radial-gradient(circle at center, rgba(6, 182, 212, 0.15) 0%, rgba(3, 7, 18, 0.95) 75%)',
                                    border: '1px solid rgba(6, 182, 212, 0.3)',
                                    position: 'relative',
                                    overflow: 'hidden',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }}
                            >
                                {/* Radar concentric circles */}
                                <div style={{ position: 'absolute', width: '260px', height: '260px', borderRadius: '50%', border: '1px dashed rgba(6, 182, 212, 0.2)' }} />
                                <div style={{ position: 'absolute', width: '180px', height: '180px', borderRadius: '50%', border: '1px solid rgba(6, 182, 212, 0.25)' }} />
                                <div style={{ position: 'absolute', width: '100px', height: '100px', borderRadius: '50%', border: '1px solid rgba(6, 182, 212, 0.35)' }} />
                                
                                {/* Crosshairs */}
                                <div style={{ position: 'absolute', width: '100%', height: '1px', background: 'rgba(6, 182, 212, 0.15)' }} />
                                <div style={{ position: 'absolute', height: '100%', width: '1px', background: 'rgba(6, 182, 212, 0.15)' }} />

                                {/* Waypoint markers */}
                                {waypoints.map((wp, idx) => (
                                    <div
                                        key={idx}
                                        style={{
                                            position: 'absolute',
                                            left: `${wp.x}%`,
                                            top: `${wp.y}%`,
                                            transform: 'translate(-50%, -50%)',
                                            display: 'flex',
                                            flexDirection: 'column',
                                            alignItems: 'center',
                                            gap: '4px'
                                        }}
                                    >
                                        <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: routeIndex === idx ? '#ec4899' : 'rgba(255,255,255,0.3)', boxShadow: routeIndex === idx ? '0 0 10px #ec4899' : 'none' }} />
                                        <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', background: 'rgba(0,0,0,0.6)', padding: '1px 4px', borderRadius: '4px', whiteSpace: 'nowrap' }}>
                                            {wp.name.split(' ')[0]}
                                        </span>
                                    </div>
                                ))}

                                {/* Animated Driver Car Marker */}
                                <motion.div
                                    animate={{ left: `${driverCoord.x}%`, top: `${driverCoord.y}%`, rotate: driverCoord.angle }}
                                    transition={{ type: 'spring', damping: 25, stiffness: 60 }}
                                    style={{
                                        position: 'absolute',
                                        transform: 'translate(-50%, -50%)',
                                        zIndex: 10,
                                        width: '32px',
                                        height: '32px',
                                        borderRadius: '50%',
                                        background: 'linear-gradient(135deg, #06b6d4, #6366f1)',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        boxShadow: '0 0 20px #06b6d4'
                                    }}
                                >
                                    <Navigation size={18} color="#ffffff" />
                                </motion.div>
                            </div>

                            {/* Telemetry Metrics */}
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px', marginTop: '16px' }}>
                                <div className="tech-chip" style={{ justifyContent: 'center', flexDirection: 'column', padding: '10px' }}>
                                    <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>STREAM LATENCY</span>
                                    <strong style={{ color: '#10b981', fontSize: '1.1rem' }}>{latency} ms</strong>
                                </div>
                                <div className="tech-chip" style={{ justifyContent: 'center', flexDirection: 'column', padding: '10px' }}>
                                    <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>PACKETS DISPATCHED</span>
                                    <strong style={{ color: '#06b6d4', fontSize: '1.1rem' }}>{packetCount}</strong>
                                </div>
                                <div className="tech-chip" style={{ justifyContent: 'center', flexDirection: 'column', padding: '10px' }}>
                                    <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>BLOC STATE</span>
                                    <strong style={{ color: '#ec4899', fontSize: '0.95rem' }}>LocationSynced</strong>
                                </div>
                            </div>
                        </div>

                        {/* Live WebSocket Event Stream Log */}
                        <div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                                <h3 style={{ fontSize: '1.3rem', fontWeight: 800 }}>SignalR Stream Log (BLoC Event Bus)</h3>
                                <span className="font-mono" style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>ws://127.0.0.1:8080</span>
                            </div>

                            <div
                                className="font-mono"
                                style={{
                                    height: '320px',
                                    background: 'var(--bg-terminal)',
                                    borderRadius: '16px',
                                    border: '1px solid var(--glass-border)',
                                    padding: '16px',
                                    overflowY: 'auto',
                                    fontSize: '0.82rem',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: '10px'
                                }}
                            >
                                {streamLogs.map((log, i) => (
                                    <div key={i} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '8px' }}>
                                        <div style={{ display: 'flex', gap: '8px', alignItems: 'center', marginBottom: '2px' }}>
                                            <span style={{ color: '#94a3b8' }}>[{log.time}]</span>
                                            <span
                                                style={{
                                                    color: log.type === 'GPS_STREAM' ? '#06b6d4' : log.type === 'BLOC' ? '#ec4899' : '#10b981',
                                                    fontWeight: 700,
                                                    fontSize: '0.75rem',
                                                    background: 'rgba(255,255,255,0.06)',
                                                    padding: '1px 6px',
                                                    borderRadius: '4px'
                                                }}
                                            >
                                                {log.type}
                                            </span>
                                        </div>
                                        <p style={{ color: '#e2e8f0', margin: 0, wordBreak: 'break-word' }}>{log.msg}</p>
                                    </div>
                                ))}
                            </div>

                            <div style={{ marginTop: '16px', display: 'flex', gap: '10px' }}>
                                <button
                                    onClick={() => {
                                        soundFx.playBeep(1100);
                                        const next = (routeIndex + 1) % waypoints.length;
                                        setRouteIndex(next);
                                        setDriverCoord(waypoints[next]);
                                    }}
                                    className="accent-bg glow-effect"
                                    style={{ flex: 1, padding: '12px', borderRadius: '12px', color: 'white', fontWeight: 700, fontSize: '0.9rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
                                >
                                    <Navigation size={16} /> Dispatch Next Waypoint
                                </button>
                                <button
                                    onClick={() => {
                                        soundFx.playClick();
                                        setStreamLogs([{ time: new Date().toISOString().substring(11, 23), type: 'FLUSH', msg: 'Stream buffer cleared' }]);
                                    }}
                                    className="tech-chip"
                                    style={{ padding: '12px 18px', cursor: 'pointer' }}
                                >
                                    <RotateCcw size={16} /> Clear Logs
                                </button>
                            </div>
                        </div>
                    </div>
                </motion.div>
            )}

            {/* DEMO 2: FINTECH GATEWAY ENGINE */}
            {activeTab === 'fintech' && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="glass-card"
                    style={{ padding: '36px' }}
                >
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '32px' }}>
                        {/* Interactive Checkout Configurator */}
                        <div>
                            <h3 style={{ fontSize: '1.4rem', fontWeight: 800, marginBottom: '16px' }}>FinTech Webhook &amp; Settlement Simulator</h3>
                            <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', marginBottom: '24px' }}>
                                Simulates the exact payment pipeline I built in <strong>Shemeta E-Commerce</strong> and <strong>Axumite Ride</strong> with RSA-SHA256 signature calculation and async state progression.
                            </p>

                            {/* Gateway Selectors */}
                            <label className="font-mono" style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, marginBottom: '8px', color: 'var(--text-sub)' }}>
                                // Select Gateway Provider
                            </label>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '20px' }}>
                                <button
                                    onClick={() => { soundFx.playClick(); setPaymentProvider('telebirr'); }}
                                    className="glass-card"
                                    style={{
                                        padding: '16px',
                                        cursor: 'pointer',
                                        borderColor: paymentProvider === 'telebirr' ? '#10b981' : 'var(--glass-border)',
                                        background: paymentProvider === 'telebirr' ? 'rgba(16, 185, 129, 0.12)' : 'var(--bg-card)',
                                        textAlign: 'center'
                                    }}
                                >
                                    <span style={{ fontWeight: 800, fontSize: '1.05rem', color: paymentProvider === 'telebirr' ? '#10b981' : 'var(--text-main)' }}>
                                        Telebirr Gateway
                                    </span>
                                    <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', margin: '4px 0 0' }}>SuperApp USSD / QR Pay</p>
                                </button>
                                <button
                                    onClick={() => { soundFx.playClick(); setPaymentProvider('chapa'); }}
                                    className="glass-card"
                                    style={{
                                        padding: '16px',
                                        cursor: 'pointer',
                                        borderColor: paymentProvider === 'chapa' ? '#06b6d4' : 'var(--glass-border)',
                                        background: paymentProvider === 'chapa' ? 'rgba(6, 182, 212, 0.12)' : 'var(--bg-card)',
                                        textAlign: 'center'
                                    }}
                                >
                                    <span style={{ fontWeight: 800, fontSize: '1.05rem', color: paymentProvider === 'chapa' ? '#06b6d4' : 'var(--text-main)' }}>
                                        Chapa API
                                    </span>
                                    <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', margin: '4px 0 0' }}>Cards &amp; Local Mobile Money</p>
                                </button>
                            </div>

                            {/* Amount Input */}
                            <label className="font-mono" style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, marginBottom: '8px', color: 'var(--text-sub)' }}>
                                // Transaction Amount (ETB)
                            </label>
                            <div style={{ display: 'flex', gap: '10px', marginBottom: '24px' }}>
                                <input
                                    type="number"
                                    value={amount}
                                    onChange={(e) => setAmount(e.target.value)}
                                    style={{
                                        flex: 1,
                                        padding: '14px 18px',
                                        background: 'rgba(255,255,255,0.04)',
                                        border: '1px solid var(--glass-border)',
                                        borderRadius: '12px',
                                        color: 'var(--text-main)',
                                        fontSize: '1.1rem',
                                        fontWeight: 700,
                                        fontFamily: 'var(--font-mono)'
                                    }}
                                />
                                <span className="tech-chip" style={{ fontSize: '1rem', fontWeight: 800 }}>ETB</span>
                            </div>

                            {paymentStep === 'idle' ? (
                                <button
                                    onClick={handleSimulatePayment}
                                    className="accent-bg glow-effect"
                                    style={{ width: '100%', padding: '16px', borderRadius: '14px', color: 'white', fontWeight: 800, fontSize: '1.05rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}
                                >
                                    <Zap size={18} /> Initiate Cryptographic Checkout
                                </button>
                            ) : (
                                <button
                                    onClick={resetPayment}
                                    className="tech-chip"
                                    style={{ width: '100%', padding: '16px', cursor: 'pointer', justifyContent: 'center', fontSize: '1rem', fontWeight: 700 }}
                                >
                                    <RotateCcw size={18} /> Reset Simulator
                                </button>
                            )}
                        </div>

                        {/* Visual State Pipeline & Verification Stream */}
                        <div style={{ background: 'var(--bg-terminal)', padding: '24px', borderRadius: '20px', border: '1px solid var(--glass-border)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                            <div>
                                <h4 className="font-mono" style={{ fontSize: '0.95rem', color: 'var(--accent-secondary)', marginBottom: '16px' }}>
                                    // BLoC &amp; Webhook Lifecycle State
                                </h4>

                                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                                    {/* Step 1 */}
                                    <div style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
                                        <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: paymentStep !== 'idle' ? '#10b981' : 'rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 800, fontSize: '0.8rem' }}>
                                            1
                                        </div>
                                        <div>
                                            <strong style={{ fontSize: '0.95rem' }}>Generate Client Payload &amp; Nonce</strong>
                                            <p style={{ color: 'var(--text-muted)', fontSize: '0.82rem', margin: '2px 0 0' }}>Encrypt merchant params + timestamp</p>
                                        </div>
                                    </div>

                                    {/* Step 2 */}
                                    <div style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
                                        <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: paymentStep === 'processing' || paymentStep === 'verified' ? '#10b981' : 'rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 800, fontSize: '0.8rem' }}>
                                            2
                                        </div>
                                        <div>
                                            <strong style={{ fontSize: '0.95rem' }}>Dispatch Async Webhook Hook</strong>
                                            <p style={{ color: 'var(--text-muted)', fontSize: '0.82rem', margin: '2px 0 0' }}>POST /api/v1/payments/telebirr-notify</p>
                                        </div>
                                    </div>

                                    {/* Step 3 */}
                                    <div style={{ display: 'flex', gap: '14px', alignItems: 'flex-start' }}>
                                        <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: paymentStep === 'verified' ? '#10b981' : 'rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 800, fontSize: '0.8rem' }}>
                                            3
                                        </div>
                                        <div>
                                            <strong style={{ fontSize: '0.95rem' }}>Verify SHA256 Signature &amp; Settle Wallet</strong>
                                            <p style={{ color: 'var(--text-muted)', fontSize: '0.82rem', margin: '2px 0 0' }}>Emit PaymentSuccessState() in Flutter/React</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Status Card Output */}
                            <div style={{ marginTop: '24px', padding: '16px', background: 'rgba(255,255,255,0.03)', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.08)' }}>
                                {paymentStep === 'idle' && (
                                    <p className="font-mono" style={{ color: 'var(--text-muted)', fontSize: '0.85rem', margin: 0 }}>
                                        Waiting for checkout trigger...
                                    </p>
                                )}
                                {paymentStep === 'signing' && (
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                        <div className="status-dot" style={{ background: '#f59e0b' }}></div>
                                        <span className="font-mono" style={{ color: '#f59e0b', fontSize: '0.85rem' }}>Calculating RSA-2048 Signatures...</span>
                                    </div>
                                )}
                                {paymentStep === 'processing' && (
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                        <div className="status-dot" style={{ background: '#06b6d4' }}></div>
                                        <span className="font-mono" style={{ color: '#06b6d4', fontSize: '0.85rem' }}>Awaiting Webhook Callback from {paymentProvider.toUpperCase()}...</span>
                                    </div>
                                )}
                                {paymentStep === 'verified' && (
                                    <div>
                                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#10b981', fontWeight: 800, marginBottom: '6px' }}>
                                            <CheckCircle2 size={18} /> SETTLEMENT CONFIRMED (200 OK)
                                        </div>
                                        <p className="font-mono" style={{ fontSize: '0.78rem', color: '#94a3b8', margin: 0, wordBreak: 'break-all' }}>
                                            Signature: {txHash}
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </motion.div>
            )}

            {/* DEMO 3: COMPUTER VISION OCR EXTRACTOR */}
            {activeTab === 'ocr' && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="glass-card"
                    style={{ padding: '36px' }}
                >
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '32px' }}>
                        {/* Sample Document & Filter Controller */}
                        <div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                                <h3 style={{ fontSize: '1.4rem', fontWeight: 800 }}>OCR Vision Pipeline Inspector</h3>
                                <span className="status-pill" style={{ color: '#ec4899', borderColor: 'rgba(236,72,153,0.3)' }}>FastAPI + OpenCV</span>
                            </div>

                            <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', marginBottom: '20px' }}>
                                Inspect the multi-stage image transformation process used in my <strong>Financial Document &amp; Receipt Pipeline</strong>: grayscale deskewing, Otsu adaptive binarization, and Pydantic schema parsing.
                            </p>

                            {/* Document Selector */}
                            <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
                                <button
                                    onClick={() => { soundFx.playClick(); setSelectedDoc('telebirr_receipt'); }}
                                    className={`tech-chip ${selectedDoc === 'telebirr_receipt' ? 'active' : ''}`}
                                    style={{ flex: 1, justifyContent: 'center', cursor: 'pointer' }}
                                >
                                    🧾 Telebirr Receipt
                                </button>
                                <button
                                    onClick={() => { soundFx.playClick(); setSelectedDoc('commercial_invoice'); }}
                                    className={`tech-chip ${selectedDoc === 'commercial_invoice' ? 'active' : ''}`}
                                    style={{ flex: 1, justifyContent: 'center', cursor: 'pointer' }}
                                >
                                    📄 Tax Invoice
                                </button>
                            </div>

                            {/* Processing Layer Filters */}
                            <label className="font-mono" style={{ display: 'block', fontSize: '0.82rem', fontWeight: 700, marginBottom: '10px', color: 'var(--text-sub)' }}>
                                // Processing Pipeline Filter
                            </label>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '24px' }}>
                                {[
                                    { id: 'raw', label: '1. Raw Image' },
                                    { id: 'binarized', label: '2. OpenCV Adaptive Binarize' },
                                    { id: 'boxes', label: '3. Tesseract Bounding Boxes' },
                                    { id: 'json', label: '4. Validated Pydantic JSON' }
                                ].map((step) => (
                                    <button
                                        key={step.id}
                                        onClick={() => { soundFx.playBeep(800 + (step.id === 'json' ? 400 : 100)); setOcrFilter(step.id); }}
                                        className="tech-chip font-mono"
                                        style={{
                                            cursor: 'pointer',
                                            justifyContent: 'center',
                                            borderColor: ocrFilter === step.id ? 'var(--accent-primary)' : 'var(--glass-border)',
                                            background: ocrFilter === step.id ? 'rgba(99, 102, 241, 0.15)' : 'transparent',
                                            color: ocrFilter === step.id ? 'white' : 'var(--text-muted)'
                                        }}
                                    >
                                        {step.label}
                                    </button>
                                ))}
                            </div>

                            <div className="tech-chip" style={{ justifyContent: 'space-between', padding: '12px 16px' }}>
                                <span style={{ color: 'var(--text-muted)' }}>OCR Extraction Confidence:</span>
                                <strong style={{ color: '#10b981', fontSize: '1.1rem' }}>{sampleDocs[selectedDoc].confidence}</strong>
                            </div>
                        </div>

                        {/* Interactive Visual Output Viewport */}
                        <div style={{ background: 'var(--bg-terminal)', padding: '24px', borderRadius: '20px', border: '1px solid var(--glass-border)', display: 'flex', flexDirection: 'column' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                                <h4 className="font-mono" style={{ fontSize: '0.9rem', color: '#a5b4fc', margin: 0 }}>
                                    // Visualizer: {ocrFilter.toUpperCase()} MODE
                                </h4>
                                <span className="font-mono" style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                                    {sampleDocs[selectedDoc].txnId}
                                </span>
                            </div>

                            <div
                                style={{
                                    flex: 1,
                                    minHeight: '260px',
                                    borderRadius: '12px',
                                    background: ocrFilter === 'binarized' ? '#000000' : 'rgba(255,255,255,0.02)',
                                    border: '1px dashed rgba(255,255,255,0.15)',
                                    padding: '20px',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'center',
                                    color: ocrFilter === 'binarized' ? '#ffffff' : 'var(--text-main)',
                                    fontFamily: 'var(--font-mono)',
                                    fontSize: '0.85rem',
                                    overflowY: 'auto'
                                }}
                            >
                                {ocrFilter === 'raw' && (
                                    <pre style={{ whiteSpace: 'pre-wrap', lineHeight: 1.6, color: '#e2e8f0' }}>
                                        {sampleDocs[selectedDoc].rawText}
                                    </pre>
                                )}

                                {ocrFilter === 'binarized' && (
                                    <div style={{ color: '#00ff66', textShadow: '0 0 5px #00ff66' }}>
                                        <p style={{ fontSize: '0.75rem', color: '#888', marginBottom: '8px' }}>[OpenCV Mat: cv::threshold(src, dst, 0, 255, THRESH_BINARY | THRESH_OTSU)]</p>
                                        <pre style={{ whiteSpace: 'pre-wrap', lineHeight: 1.6 }}>
                                            {sampleDocs[selectedDoc].rawText}
                                        </pre>
                                    </div>
                                )}

                                {ocrFilter === 'boxes' && (
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                        <div style={{ border: '1px solid #ec4899', padding: '6px', borderRadius: '4px', background: 'rgba(236,72,153,0.1)' }}>
                                            <span style={{ color: '#ec4899', fontSize: '0.72rem' }}>[BBOX: MERCHANT]</span> <strong>{sampleDocs[selectedDoc].merchant}</strong>
                                        </div>
                                        <div style={{ border: '1px solid #10b981', padding: '6px', borderRadius: '4px', background: 'rgba(16,185,129,0.1)' }}>
                                            <span style={{ color: '#10b981', fontSize: '0.72rem' }}>[BBOX: AMOUNT_DUE]</span> <strong>{sampleDocs[selectedDoc].amount}</strong>
                                        </div>
                                        <div style={{ border: '1px solid #06b6d4', padding: '6px', borderRadius: '4px', background: 'rgba(6,182,212,0.1)' }}>
                                            <span style={{ color: '#06b6d4', fontSize: '0.72rem' }}>[BBOX: TXN_ID]</span> <strong>{sampleDocs[selectedDoc].txnId}</strong>
                                        </div>
                                    </div>
                                )}

                                {ocrFilter === 'json' && (
                                    <pre style={{ color: '#38bdf8', lineHeight: 1.5, margin: 0 }}>
{`{
  "merchant_name": "${sampleDocs[selectedDoc].merchant}",
  "total_amount": "${sampleDocs[selectedDoc].amount}",
  "transaction_id": "${sampleDocs[selectedDoc].txnId}",
  "validation_status": "CONFIRMED",
  "confidence_score": ${parseFloat(sampleDocs[selectedDoc].confidence) / 100},
  "extracted_at": "${sampleDocs[selectedDoc].date}"
}`}
                                    </pre>
                                )}
                            </div>
                        </div>
                    </div>
                </motion.div>
            )}
        </section>
    );
};
