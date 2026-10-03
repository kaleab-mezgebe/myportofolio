import React from 'react';
import { motion } from 'framer-motion';
import {
    Activity,
    ShieldCheck,
    Cpu,
    Smartphone,
    Layers,
    Clock,
    Flame,
    CheckCircle2,
    TrendingUp,
    Zap
} from 'lucide-react';

export const EngineeringMetrics = () => {
    const metrics = [
        {
            value: "60 FPS",
            label: "Smooth Mobile Frame Budget",
            detail: "Zero UI thread jank achieved with BLoC event isolation and granular Flutter widget rebuild pruning.",
            icon: <Smartphone size={24} color="#6366f1" />,
            badge: "UI FLUIDITY"
        },
        {
            value: "99.8%",
            label: "Production Crash-Free Rate",
            detail: "Battle-tested on Google Play Store with comprehensive try-catch wrappers and Sentry error boundaries.",
            icon: <ShieldCheck size={24} color="#10b981" />,
            badge: "RELIABILITY"
        },
        {
            value: "< 180ms",
            label: "SignalR GPS Stream Latency",
            detail: "Sub-second live driver coordinate synchronization across low-bandwidth cellular connections.",
            icon: <Zap size={24} color="#06b6d4" />,
            badge: "REAL-TIME"
        },
        {
            value: "100%",
            label: "Type Safety & Schema Integrity",
            detail: "End-to-end type contracts across TypeScript interfaces, Dart models, and Pydantic validation schemas.",
            icon: <Cpu size={24} color="#ec4899" />,
            badge: "CONTRACTS"
        }
    ];

    return (
        <section id="metrics" style={{ position: 'relative', zIndex: 1 }}>
            <div className="section-header">
                <div style={{ marginBottom: '14px' }}>
                    <span className="status-pill" style={{ color: 'var(--accent-tertiary)', borderColor: 'rgba(236, 72, 153, 0.3)', background: 'rgba(236, 72, 153, 0.08)' }}>
                        <Flame size={14} /> // 03. ENGINEERING EXCELLENCE
                    </span>
                </div>
                <h2 className="accent-text" style={{ fontSize: 'clamp(2.2rem, 5vw, 3.6rem)', fontWeight: 900, marginBottom: '16px', letterSpacing: '-0.03em' }}>
                    Production-Grade Engineering Standards
                </h2>
                <p style={{ color: 'var(--text-muted)', fontSize: '1.15rem', maxWidth: '750px', margin: '0 auto', lineHeight: 1.6 }}>
                    Every line of code is engineered for high throughput, sub-second latency, maintainable architecture, and zero-downtime execution.
                </p>
                <div style={{ width: '80px', height: '4px', background: 'linear-gradient(90deg, var(--accent-primary), var(--accent-secondary), var(--accent-tertiary))', margin: '24px auto 0', borderRadius: '4px' }} />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
                {metrics.map((m, idx) => (
                    <motion.div
                        key={idx}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: idx * 0.1 }}
                        className="glass-card"
                        style={{ padding: '32px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}
                    >
                        <div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                                <div style={{ padding: '10px', borderRadius: '12px', background: 'rgba(255,255,255,0.05)', display: 'inline-flex' }}>
                                    {m.icon}
                                </div>
                                <span className="font-mono" style={{ fontSize: '0.72rem', color: 'var(--text-muted)', background: 'rgba(255,255,255,0.05)', padding: '2px 8px', borderRadius: '6px' }}>
                                    {m.badge}
                                </span>
                            </div>
                            <div className="font-display" style={{ fontSize: '2.5rem', fontWeight: 900, marginBottom: '8px', color: 'var(--text-main)' }}>
                                {m.value}
                            </div>
                            <h3 style={{ fontSize: '1.15rem', fontWeight: 800, marginBottom: '10px', color: 'var(--accent-secondary)' }}>
                                {m.label}
                            </h3>
                            <p style={{ color: 'var(--text-muted)', fontSize: '0.92rem', lineHeight: 1.6 }}>
                                {m.detail}
                            </p>
                        </div>
                    </motion.div>
                ))}
            </div>
        </section>
    );
};
