import React, { useState, useRef, useEffect } from 'react';
import { Terminal as TerminalIcon, Sparkles, Send, Copy, ArrowRight, CornerDownLeft, HelpCircle, Code, Briefcase, Award, Zap } from 'lucide-react';
import confetti from 'canvas-confetti';
import { soundFx } from '../utils/sound';

export const InteractiveTerminal = ({ onTriggerToast }) => {
    const [history, setHistory] = useState([
        { type: 'system', text: '⚡ Kaleab Mezgebe Developer Console [zsh session]' },
        { 
            type: 'help_intro', 
            text: 'Type a command or click any quick action below:' 
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
                type: 'help_menu',
                text: `Available interactive commands:`
            });
        } else if (cmd === 'skills') {
            newEntries.push({
                type: 'output',
                text: `[CORE PRODUCTION STACK]
  Mobile:    Flutter / Dart / BLoC / SignalR / Google Maps SDK
  Frontend:  React.js / Next.js / TypeScript / Tailwind CSS / Redux
  Backend:   FastAPI / Python / Node.js / Express.js / PostgreSQL
  AI / OCR:  Tesseract OCR / OpenCV / TensorFlow Lite / Pydantic
  FinTech:   Telebirr Payment Gateway / Chapa API / JWT Security`
            });
        } else if (cmd === 'projects') {
            newEntries.push({
                type: 'projects_list',
                text: `[PRODUCTION RELEASES]`
            });
        } else if (cmd === 'stats') {
            newEntries.push({
                type: 'output',
                text: `[VERIFIED PERFORMANCE METRICS]
  • Experience:          3+ Years Production Delivery
  • MIT University CGPA: 3.88 / 4.00 (Distinction)
  • National Exit Exam:  86 / 100 (Top Percentile)
  • Mobile Frame Budget: 60 FPS Jitter-Free Rendering
  • Crash-Free Sessions: 99.8% on Production Play Store`
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
                text: `🎉 sudo access granted! Opening email draft to kaleabmezgebe4@gmail.com...
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
  • Email:    kaleabmezgebe4@gmail.com (Copied to clipboard!)
  • Phone:    +251 945989369
  • GitHub:   https://github.com/kaleab-mezgebe
  • LinkedIn: https://linkedin.com/in/kaleab-mezgebe-764a56198/`
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
                text: `zsh: command not found: "${raw}". Type "help" to see available commands.`
            });
        }

        setHistory((prev) => [...prev, ...newEntries]);
        setInputVal('');

        // Focus the input smoothly without scrolling the page window
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
        { cmd: 'help', label: 'help', icon: <HelpCircle size={13} />, bg: '#4f46e5', border: '#818cf8', text: '#ffffff' },
        { cmd: 'skills', label: 'skills', icon: <Code size={13} />, bg: '#0891b2', border: '#22d3ee', text: '#ffffff' },
        { cmd: 'stats', label: 'stats', icon: <Award size={13} />, bg: '#059669', border: '#34d399', text: '#ffffff' },
        { cmd: 'sudo hire', label: 'sudo hire', icon: <Zap size={13} />, bg: '#d97706', border: '#fbbf24', text: '#ffffff' }
    ];

    return (
        <div 
            className="terminal-window" 
            style={{ display: 'flex', flexDirection: 'column', height: '100%', minHeight: '390px', cursor: 'text' }}
            onClick={() => inputRef.current?.focus({ preventScroll: true })}
        >
            {/* Terminal Header with Exact Requested Title & Vivid Visible Chips */}
            <div className="terminal-header" style={{ justifyContent: 'space-between', flexWrap: 'wrap', gap: '10px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div className="terminal-dots">
                        <span className="terminal-dot-btn" style={{ background: '#ef4444' }}></span>
                        <span className="terminal-dot-btn" style={{ background: '#f59e0b' }}></span>
                        <span className="terminal-dot-btn" style={{ background: '#10b981' }}></span>
                    </div>
                    <span className="font-mono" style={{ fontSize: '0.82rem', color: '#f1f5f9', fontWeight: 700, letterSpacing: '0.3px' }}>
                        kaleab@macbook-pro: ~/portfolio (zsh)
                    </span>
                </div>

                {/* Highly Visible, Solid-Colored Action Chips */}
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
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
                                border: `1px solid ${item.border}`,
                                color: item.text,
                                padding: '4px 12px',
                                borderRadius: '8px',
                                fontSize: '0.80rem',
                                fontWeight: 800,
                                cursor: 'pointer',
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '5px',
                                boxShadow: `0 2px 10px ${item.bg}40`,
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
                    <div key={idx} style={{ marginBottom: '10px' }}>
                        {item.type === 'user' && (
                            <div style={{ color: '#38bdf8', fontWeight: 700, fontSize: '0.92rem' }}>{item.text}</div>
                        )}
                        {item.type === 'system' && (
                            <div style={{ color: '#a5b4fc', fontSize: '0.88rem', fontWeight: 600 }}>{item.text}</div>
                        )}
                        {item.type === 'help_intro' && (
                            <div style={{ margin: '6px 0', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                <p style={{ color: '#cbd5e1', fontSize: '0.85rem', margin: 0 }}>{item.text}</p>
                                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                                    {quickActions.map((q) => (
                                        <button
                                            key={q.cmd}
                                            type="button"
                                            onClick={(e) => {
                                                e.preventDefault();
                                                e.stopPropagation();
                                                executeCommand(q.cmd);
                                            }}
                                            style={{
                                                background: q.bg,
                                                border: `1px solid ${q.border}`,
                                                color: q.text,
                                                fontFamily: 'var(--font-mono)',
                                                fontSize: '0.80rem',
                                                fontWeight: 800,
                                                padding: '5px 12px',
                                                borderRadius: '6px',
                                                cursor: 'pointer',
                                                display: 'inline-flex',
                                                alignItems: 'center',
                                                gap: '5px',
                                                boxShadow: `0 2px 8px ${q.bg}40`
                                            }}
                                        >
                                            {q.icon}
                                            <span>{q.cmd}</span>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}
                        {item.type === 'help_menu' && (
                            <div style={{ background: 'rgba(255,255,255,0.03)', padding: '14px', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.08)' }}>
                                <div style={{ color: '#ec4899', fontWeight: 800, marginBottom: '10px', fontSize: '0.88rem' }}>// INTERACTIVE COMMANDS MENU</div>
                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))', gap: '8px' }}>
                                    {[
                                        { cmd: 'skills', desc: 'Core tech stack & framework mastery', color: '#06b6d4' },
                                        { cmd: 'projects', desc: 'Browse live production apps', color: '#ec4899' },
                                        { cmd: 'stats', desc: 'Academic & performance benchmarks', color: '#10b981' },
                                        { cmd: 'contact', desc: 'Copy email & phone numbers', color: '#a5b4fc' },
                                        { cmd: 'curl cv', desc: 'Download verified resume PDF', color: '#f59e0b' },
                                        { cmd: 'sudo hire', desc: 'Initiate direct hiring invitation', color: '#ec4899' },
                                        { cmd: 'clear', desc: 'Clear terminal screen', color: '#94a3b8' }
                                    ].map((c) => (
                                        <div
                                            key={c.cmd}
                                            onClick={(e) => {
                                                e.preventDefault();
                                                e.stopPropagation();
                                                executeCommand(c.cmd);
                                            }}
                                            style={{
                                                padding: '8px 12px',
                                                background: 'rgba(255,255,255,0.05)',
                                                border: `1px solid ${c.color}60`,
                                                borderRadius: '8px',
                                                cursor: 'pointer',
                                                display: 'flex',
                                                flexDirection: 'column',
                                                transition: 'all 0.15s ease'
                                            }}
                                        >
                                            <strong style={{ color: c.color, fontSize: '0.85rem' }}>$ {c.cmd}</strong>
                                            <span style={{ color: 'var(--text-muted)', fontSize: '0.74rem' }}>{c.desc}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                        {item.type === 'projects_list' && (
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                                <span style={{ color: '#ec4899', fontWeight: 700 }}>{item.text}</span>
                                {[
                                    { name: '1. Axumite Ride (Passenger & Driver App)', tag: 'Flutter • SignalR • Live Play Store', link: '#projects' },
                                    { name: '2. Shemeta E-Commerce Platform', tag: 'React.js • Telebirr & Chapa • Live Demo', link: '#projects' },
                                    { name: '3. AI Dermatologist Diagnostic App', tag: 'Flutter • TensorFlow Lite • Computer Vision', link: '#projects' },
                                    { name: '4. Financial Document & Receipt OCR Pipeline', tag: 'FastAPI • Tesseract • OpenCV', link: '#projects' },
                                    { name: '5. EthioBeds Accommodation SaaS', tag: 'React.js • Node.js • PostgreSQL', link: '#projects' }
                                ].map((p, pIdx) => (
                                    <a
                                        key={pIdx}
                                        href={p.link}
                                        onClick={(e) => {
                                            e.stopPropagation();
                                        }}
                                        style={{
                                            padding: '8px 12px',
                                            background: 'rgba(255,255,255,0.03)',
                                            border: '1px solid rgba(255,255,255,0.08)',
                                            borderRadius: '6px',
                                            textDecoration: 'none',
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            alignItems: 'center',
                                            color: '#f8fafc'
                                        }}
                                    >
                                        <div>
                                            <div style={{ fontWeight: 700, fontSize: '0.82rem' }}>{p.name}</div>
                                            <div style={{ color: 'var(--text-muted)', fontSize: '0.72rem' }}>{p.tag}</div>
                                        </div>
                                        <ArrowRight size={14} color="#06b6d4" />
                                    </a>
                                ))}
                            </div>
                        )}
                        {item.type === 'output' && (
                            <pre style={{ color: '#cbd5e1', whiteSpace: 'pre-wrap', margin: '2px 0', fontSize: '0.85rem' }}>{item.text}</pre>
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
                    placeholder="Type command ('help', 'projects', 'stats', 'hire')..."
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
