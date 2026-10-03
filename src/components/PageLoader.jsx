import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Terminal, Cpu } from 'lucide-react';

export const PageLoader = ({ isDarkMode }) => {
    return (
        <motion.div
            initial={{ opacity: 1 }}
            exit={{ 
                opacity: 0, 
                scale: 1.04, 
                filter: 'blur(10px)',
                transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } 
            }}
            style={{
                position: 'fixed',
                inset: 0,
                zIndex: 99999,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                background: isDarkMode ? '#05070f' : '#f8fafc',
                color: isDarkMode ? '#ffffff' : '#0f172a',
                overflow: 'hidden',
                pointerEvents: 'none'
            }}
        >
            {/* Background Ambient Glow */}
            <motion.div
                animate={{
                    scale: [1, 1.25, 1],
                    opacity: [0.35, 0.7, 0.35]
                }}
                transition={{
                    duration: 2.2,
                    repeat: Infinity,
                    ease: 'easeInOut'
                }}
                style={{
                    position: 'absolute',
                    width: '420px',
                    height: '420px',
                    borderRadius: '50%',
                    background: 'radial-gradient(circle, rgba(99, 102, 241, 0.38) 0%, rgba(6, 182, 212, 0.15) 50%, transparent 70%)',
                    filter: 'blur(45px)',
                    zIndex: 0
                }}
            />

            {/* Glowing Cyber Core */}
            <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <div style={{ position: 'relative', width: '96px', height: '96px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '24px' }}>
                    {/* Outer Rotating Neon Ring */}
                    <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 3.5, repeat: Infinity, ease: 'linear' }}
                        style={{
                            position: 'absolute',
                            inset: 0,
                            borderRadius: '50%',
                            border: '2px dashed #6366f1',
                            boxShadow: '0 0 25px rgba(99, 102, 241, 0.45)'
                        }}
                    />

                    {/* Counter Rotating Inner Ring */}
                    <motion.div
                        animate={{ rotate: -360 }}
                        transition={{ duration: 5, repeat: Infinity, ease: 'linear' }}
                        style={{
                            position: 'absolute',
                            inset: '8px',
                            borderRadius: '50%',
                            border: '1.5px solid rgba(6, 182, 212, 0.6)',
                            borderTopColor: 'transparent',
                            borderRightColor: 'transparent'
                        }}
                    />

                    {/* Core Monogram */}
                    <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: [0.95, 1.05, 0.95], opacity: 1 }}
                        transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
                        style={{
                            width: '56px',
                            height: '56px',
                            borderRadius: '16px',
                            background: 'linear-gradient(135deg, #6366f1, #06b6d4)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            boxShadow: '0 8px 30px rgba(99, 102, 241, 0.6)',
                            color: '#ffffff',
                            fontWeight: 900,
                            fontSize: '1.25rem',
                            fontFamily: 'var(--font-mono)'
                        }}
                    >
                        KM
                    </motion.div>
                </div>

                {/* Loading Typography */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15 }}
                    style={{ textAlign: 'center', marginBottom: '16px' }}
                >
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginBottom: '6px' }}>
                        <span className="font-mono" style={{ fontSize: '0.9rem', fontWeight: 800, letterSpacing: '2px', color: isDarkMode ? '#ffffff' : '#0f172a' }}>
                            KALEAB MEZGEBE
                        </span>
                    </div>
                    <p className="font-mono" style={{ fontSize: '0.75rem', color: '#06b6d4', letterSpacing: '1.5px', textTransform: 'uppercase' }}>
                        Production Software Engineer
                    </p>
                </motion.div>

                {/* Progress Loading Bar */}
                <div
                    style={{
                        width: '200px',
                        height: '3px',
                        borderRadius: '6px',
                        background: isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.08)',
                        overflow: 'hidden',
                        position: 'relative'
                    }}
                >
                    <motion.div
                        initial={{ x: '-100%' }}
                        animate={{ x: '100%' }}
                        transition={{
                            duration: 1.2,
                            repeat: Infinity,
                            ease: 'easeInOut'
                        }}
                        style={{
                            width: '60%',
                            height: '100%',
                            background: 'linear-gradient(90deg, #6366f1, #06b6d4, #ec4899)',
                            boxShadow: '0 0 10px #06b6d4'
                        }}
                    />
                </div>
            </div>
        </motion.div>
    );
};
