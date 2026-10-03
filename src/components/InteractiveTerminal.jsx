import React, { useState, useRef, useEffect } from 'react';
import { Terminal as TerminalIcon, Sparkles, Send, Copy, ArrowRight, CornerDownLeft, HelpCircle, Code, Briefcase, Award, Zap } from 'lucide-react';
import confetti from 'canvas-confetti';
import { soundFx } from '../utils/sound';

export const InteractiveTerminal = ({ onTriggerToast }) => {
    const [history, setHistory] = useState([
        { type: 'system', text: '⚡ Kaleab Mezgebe Developer Console [zsh session]' },
        { 
            type: 'prompt_hint', 
            text: 'Type a command below or click any quick action above to inspect my engineering background.' 
        }
    ]);
    const [inputVal, setInputVal] = useState('');
    const [commandHistory, setCommandHistory] = useState([]);
    const [historyIndex, setHistoryIndex] = useState(-1);
    const terminalBodyRef = useRef(null);
    const inputRef = useRef(null);

    const scrollToTerminalBottom = () => {
        if (terminalBodyRef.current) {
            terminalBodyRef.current.scrollTop = terminalBodyRef.current.scrollHeight;
        }
    };

    useEffect(() => {
        scrollToTerminalBottom();
    }, [history]);

    const executeCommand = (cmdText) => {
        const raw = cmdText.trim();
        if (!raw) return;

        const cmd = raw.toLowerCase();
        soundFx.playClick();

        setCommandHistory((prev) => [...prev, raw]);
        setHistoryIndex(-1);

        const newEntries = [{ type: 'user', text: `$ ${raw}` }];

        if (cmd === 'help') {
            newEntries.push({
                type: 'output',
                text: `Available commands: skills  •  projects  •  stats  •  contact  •  sudo hire  •  clear`
            });
        } else if (cmd === 'skills') {
            newEntries.push({
                type: 'output',
                text: `[PRODUCTION TECH STACK]
  📱 Mobile:    Flutter • Dart • BLoC • SignalR • Google Maps SDK • Hive
  🌐 Frontend:  React.js • Next.js • TypeScript • Tailwind CSS • Redux
  ⚙️ Backend:   FastAPI • Python • Node.js • Express.js • PostgreSQL
  🤖 AI / Vision: Tesseract OCR • OpenCV • TensorFlow Lite • Pydantic
  💳 FinTech:   Telebirr Payment Gateway • Chapa API • JWT Auth`
            });
        } else if (cmd === 'projects') {
            newEntries.push({
                type: 'output',
                text: `[FLAGSHIP PRODUCTION PROJECTS]
  1. Axumite Ride       - Real-Time Fleet & Passenger App (Flutter • Play Store)
  2. Shemeta Commerce   - Multi-Vendor Platform with Telebirr & Chapa (React/Next)
  3. AI Dermatologist   - Skin Disease Diagnosis Mobile App (TensorFlow Lite)
  4. OCR Receipt Engine - Financial Document & Receipt Data Pipeline (FastAPI)
  5. EthioBeds SaaS     - Hotel & Guesthouse Booking Platform (Full-Stack)`
            });
        } else if (cmd === 'stats') {
            newEntries.push({
                type: 'output',
                text: `[VERIFIED PERFORMANCE & ACADEMIC STATS]
  • Professional Experience: 3+ Years Production Delivery
  • MIT University CGPA:     3.88 / 4.00 (Distinction)
  • National Exit Exam:      86 / 100 (Top Percentile)
  • Mobile Frame Budget:     60 FPS Jitter-Free UI Thread
  • Crash-Free Rate:         99.8% on Production Play Store`
            });
        } else if (cmd.includes('hire') || cmd === 'sudo hire') {
            confetti({
                particleCount: 150,
                spread: 80,
                origin: { y: 0.6 }
            });
            soundFx.playSuccess();
            onTriggerToast?.("Direct contact protocol initiated! kaleabmezgebe4@gmail.com 🚀");
            newEntries.push({
                type: 'success',
                text: `🎉 Opening direct email draft to kaleabmezgebe4@gmail.com...
Phone: +251 945989369 | Location: Addis Ababa, Ethiopia`
            });
            setTimeout(() => {
                window.location.href = 'mailto:kaleabmezgebe4@gmail.com?subject=Engineering%20Opportunity%20for%20Kaleab%20Mezgebe';
            }, 800);
        } else if (cmd === 'contact') {
            navigator.clipboard.writeText('kaleabmezgebe4@gmail.com');
            onTriggerToast?.('kaleabmezgebe4@gmail.com copied to clipboard!');
            newEntries.push({
                type: 'output',
                text: `[DIRECT CONTACT CHANNELS]
  • Portfolio: https://kaleab-mezgebe.github.io/myportofolio/
  • Email:     kaleabmezgebe4@gmail.com (Copied to clipboard!)
  • Phone:     +251 945989369
  • GitHub:    https://github.com/kaleab-mezgebe
  • LinkedIn:  https://linkedin.com/in/kaleab-mezgebe-764a56198/`
            });
        } else if (cmd === 'curl cv' || cmd === 'cv' || cmd === 'resume') {
            soundFx.playBeep(1000);
            window.open("./assets/Kaleab Mezgebe's cv.pdf", '_blank');
            newEntries.push({
                type: 'success',
                text: `HTTP/2 200 OK -> Downloading Kaleab_Mezgebe_CV.pdf...`
            });
        } else if (cmd === 'clear') {
            setHistory([]);
            setInputVal('');
            inputRef.current?.focus({ preventScroll: true });
            return;
        } else {
            newEntries.push({
                type: 'error',
                text: `zsh: command not found: "${raw}". Type "help" to see valid commands.`
            });
        }

        setHistory((prev) => [...prev, ...newEntries]);
        setInputVal('');

        // Strictly focus input without scrolling outer page
        setTimeout(() => {
            inputRef.current?.focus({ preventScroll: true });
            scrollToTerminalBottom();
        }, 30);
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            executeCommand(inputVal);
        } else if (e.key === 'ArrowUp') {
            if (commandHistory.length > 0) {
                const nextIdx = historyIndex + 1 < commandHistory.length ? historyIndex + 1 : historyIndex;
                setHistoryIndex(nextIdx);
                setInputVal(commandHistory[commandHistory.length - 1 - nextIdx]);
            }
        } else if (e.key === 'ArrowDown') {
            if (historyIndex > 0) {
                const nextIdx = historyIndex - 1;
                setHistoryIndex(nextIdx);
                setInputVal(commandHistory[commandHistory.length - 1 - nextIdx]);
            } else if (historyIndex === 0) {
                setHistoryIndex(-1);
                setInputVal('');
            }
        }
    };

    const quickActions = [
        { cmd: 'help', label: 'help', icon: <HelpCircle size={13} />, bg: '#6366f1', text: '#ffffff', glow: 'rgba(99, 102, 241, 0.45)' },
        { cmd: 'skills', label: 'skills', icon: <Code size={13} />, bg: '#06b6d4', text: '#ffffff', glow: 'rgba(6, 182, 212, 0.45)' },
        { cmd: 'projects', label: 'projects', icon: <Briefcase size={13} />, bg: '#10b981', text: '#ffffff', glow: 'rgba(16, 185, 129, 0.45)' },
        { cmd: 'stats', label: 'stats', icon: <Award size={13} />, bg: '#f59e0b', text: '#ffffff', glow: 'rgba(245, 158, 11, 0.45)' },
        { cmd: 'sudo hire', label: 'sudo hire', icon: <Zap size={13} />, bg: '#ec4899', text: '#ffffff', glow: 'rgba(236, 72, 153, 0.45)' }
    ];

    return (
        <div 
            className="terminal-window" 
            style={{ display: 'flex', flexDirection: 'column', height: '100%', minHeight: '390px', cursor: 'text' }}
            onClick={(e) => {
                inputRef.current?.focus({ preventScroll: true });
            }}
        >
            {/* Terminal Header with Exact Requested Title & Vivid Visible Chips */}
            <div className="terminal-header" style={{ justifyContent: 'space-between', flexWrap: 'wrap', gap: '10px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div className="terminal-dots">
                        <span className="terminal-dot-btn" style={{ background: '#ef4444' }}></span>
                        <span className="terminal-dot-btn" style={{ background: '#f59e0b' }}></span>
                        <span className="terminal-dot-btn" style={{ background: '#10b981' }}></span>
                    </div>
                    {/* Colorful Syntax-Highlighted Prompt */}
                    <span className="font-mono" style={{ fontSize: '0.84rem', letterSpacing: '0.3px', display: 'flex', alignItems: 'center', gap: '2px' }}>
                        <span style={{ color: '#4ade80', fontWeight: 800 }}>kaleab</span>
                        <span style={{ color: '#94a3b8' }}>@</span>
                        <span style={{ color: '#38bdf8', fontWeight: 800 }}>macbook-pro</span>
                        <span style={{ color: '#94a3b8' }}>:</span>
                        <span style={{ color: '#c084fc', fontWeight: 700 }}>~/portfolio</span>
                        <span style={{ color: '#fbbf24', fontWeight: 700, marginLeft: '4px' }}>(zsh)</span>
                    </span>
                </div>

                {/* Highly Visible, Solid-Colored Action Chips */}
                <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                    {quickActions.map((item) => (
                        <button
                            key={item.cmd}
                            type="button"
                            onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                executeCommand(item.cmd);
                            }}
                            className="font-mono"
                            style={{
                                background: item.bg,
                                border: '1px solid rgba(255,255,255,0.3)',
                                color: item.text,
                                padding: '4px 10px',
                                borderRadius: '6px',
                                fontSize: '0.78rem',
                                fontWeight: 800,
                                cursor: 'pointer',
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '4px',
                                boxShadow: `0 2px 8px ${item.glow}`,
                                transition: 'all 0.15s ease'
                            }}
                            title={`Run '$ ${item.cmd}'`}
                        >
                            {item.icon}
                            <span>{item.label}</span>
                        </button>
                    ))}
                </div>
            </div>

            {/* Terminal Log Body */}
            <div ref={terminalBodyRef} className="terminal-body" style={{ flex: 1, overflowY: 'auto', maxHeight: '340px' }}>
                {history.map((item, idx) => (
                    <div key={idx} style={{ marginBottom: '8px' }}>
                        {item.type === 'user' && (
                            <div style={{ color: '#38bdf8', fontWeight: 700, fontSize: '0.90rem' }}>{item.text}</div>
                        )}
                        {item.type === 'system' && (
                            <div style={{ color: '#a5b4fc', fontSize: '0.86rem', fontWeight: 600 }}>{item.text}</div>
                        )}
                        {item.type === 'prompt_hint' && (
                            <div style={{ color: '#94a3b8', fontSize: '0.82rem', margin: '4px 0 8px' }}>{item.text}</div>
                        )}
                        {item.type === 'output' && (
                            <pre style={{ color: '#cbd5e1', whiteSpace: 'pre-wrap', margin: '2px 0', fontSize: '0.85rem', lineHeight: 1.6 }}>{item.text}</pre>
                        )}
                        {item.type === 'success' && (
                            <pre style={{ color: '#10b981', whiteSpace: 'pre-wrap', fontWeight: 700, margin: '2px 0', fontSize: '0.85rem' }}>{item.text}</pre>
                        )}
                        {item.type === 'error' && (
                            <div style={{ color: '#f87171', fontSize: '0.85rem' }}>{item.text}</div>
                        )}
                    </div>
                ))}
            </div>

            {/* Terminal Prompt Input with Autofocus & No Window Jump */}
            <div style={{ padding: '12px 16px', background: 'rgba(0,0,0,0.5)', borderTop: '1px solid var(--glass-border)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ color: '#10b981', fontWeight: 800, fontFamily: 'var(--font-mono)' }}>$</span>
                <input
                    ref={inputRef}
                    type="text"
                    value={inputVal}
                    onChange={(e) => setInputVal(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Type command ('skills', 'projects', 'stats', 'hire')..."
                    style={{
                        flex: 1,
                        background: 'transparent',
                        border: 'none',
                        outline: 'none',
                        color: 'white',
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.9rem'
                    }}
                />
                <button
                    type="button"
                    onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        executeCommand(inputVal);
                    }}
                    style={{ background: 'transparent', border: 'none', color: 'var(--accent-primary)', cursor: 'pointer', display: 'flex', alignItems: 'center', padding: '4px' }}
                    title="Run Command"
                >
                    <CornerDownLeft size={16} />
                </button>
            </div>
        </div>
    );
};
