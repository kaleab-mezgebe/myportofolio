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
    const bottomRef = useRef(null);
    const inputRef = useRef(null);

    const scrollToBottom = () => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
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
            inputRef.current?.focus();
            return;
        } else {
            newEntries.push({
                type: 'error',
                text: `zsh: command not found: "${raw}". Type "help" to see available commands.`
            });
        }

        setHistory((prev) => [...prev, ...newEntries]);
        setInputVal('');

        // Focus the input immediately after clicking or running
        setTimeout(() => {
            inputRef.current?.focus();
        }, 50);
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
        { cmd: 'help', label: 'help', icon: <HelpCircle size={12} />, color: '#6366f1' },
        { cmd: 'skills', label: 'skills', icon: <Code size={12} />, color: '#06b6d4' },
        { cmd: 'projects', label: 'projects', icon: <Briefcase size={12} />, color: '#ec4899' },
        { cmd: 'stats', label: 'stats', icon: <Award size={12} />, color: '#10b981' },
        { cmd: 'sudo hire', label: 'hire me', icon: <Zap size={12} />, color: '#f59e0b' }
    ];

    return (
        <div 
            className="terminal-window" 
            style={{ display: 'flex', flexDirection: 'column', height: '100%', minHeight: '390px', cursor: 'text' }}
            onClick={() => inputRef.current?.focus()}
        >
            {/* Terminal Header with High-Contrast Visible Quick Chips */}
            <div className="terminal-header" style={{ justifyContent: 'space-between', flexWrap: 'wrap', gap: '10px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div className="terminal-dots">
                        <span className="terminal-dot-btn" style={{ background: '#ef4444' }}></span>
                        <span className="terminal-dot-btn" style={{ background: '#f59e0b' }}></span>
                        <span className="terminal-dot-btn" style={{ background: '#10b981' }}></span>
                    </div>
                    <span className="font-mono" style={{ fontSize: '0.80rem', color: 'var(--text-muted)', fontWeight: 600 }}>
                        kaleab@devbox: ~/portfolio
                    </span>
                </div>

                {/* Visible Interactive Action Chips */}
                <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                    {quickActions.map((item) => (
                        <button
                            key={item.cmd}
                            onClick={(e) => {
                                e.stopPropagation();
                                executeCommand(item.cmd);
                            }}
                            className="font-mono"
                            style={{
                                background: 'rgba(255,255,255,0.08)',
                                border: `1px solid ${item.color}`,
                                color: 'white',
                                padding: '3px 10px',
                                borderRadius: '6px',
                                fontSize: '0.75rem',
                                fontWeight: 700,
                                cursor: 'pointer',
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '4px',
                                transition: 'all 0.2s ease'
                            }}
                            title={`Run '$ ${item.cmd}'`}
                        >
                            {item.icon}
                            <span>${item.cmd}</span>
                        </button>
                    ))}
                </div>
            </div>

            {/* Terminal Log Body */}
            <div className="terminal-body" style={{ flex: 1, overflowY: 'auto', maxHeight: '340px' }}>
                {history.map((item, idx) => (
                    <div key={idx} style={{ marginBottom: '10px' }}>
                        {item.type === 'user' && (
                            <div style={{ color: '#38bdf8', fontWeight: 700, fontSize: '0.90rem' }}>{item.text}</div>
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
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                executeCommand(q.cmd);
                                            }}
                                            style={{
                                                background: 'rgba(99, 102, 241, 0.15)',
                                                border: '1px solid rgba(99, 102, 241, 0.4)',
                                                color: '#e0e7ff',
                                                fontFamily: 'var(--font-mono)',
                                                fontSize: '0.78rem',
                                                padding: '4px 10px',
                                                borderRadius: '6px',
                                                cursor: 'pointer',
                                                display: 'inline-flex',
                                                alignItems: 'center',
                                                gap: '5px'
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
                            <div style={{ background: 'rgba(255,255,255,0.03)', padding: '12px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.06)' }}>
                                <div style={{ color: '#ec4899', fontWeight: 800, marginBottom: '8px', fontSize: '0.85rem' }}>// INTERACTIVE COMMANDS MENU</div>
                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '8px' }}>
                                    {[
                                        { cmd: 'skills', desc: 'Core tech stack & framework mastery' },
                                        { cmd: 'projects', desc: 'Browse live production apps' },
                                        { cmd: 'stats', desc: 'Academic & performance benchmarks' },
                                        { cmd: 'contact', desc: 'Copy email & phone numbers' },
                                        { cmd: 'curl cv', desc: 'Download verified resume PDF' },
                                        { cmd: 'sudo hire', desc: 'Initiate direct hiring invitation' },
                                        { cmd: 'clear', desc: 'Clear terminal screen' }
                                    ].map((c) => (
                                        <div
                                            key={c.cmd}
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                executeCommand(c.cmd);
                                            }}
                                            style={{
                                                padding: '6px 10px',
                                                background: 'rgba(255,255,255,0.04)',
                                                border: '1px solid rgba(255,255,255,0.1)',
                                                borderRadius: '6px',
                                                cursor: 'pointer',
                                                display: 'flex',
                                                flexDirection: 'column'
                                            }}
                                        >
                                            <strong style={{ color: '#06b6d4', fontSize: '0.82rem' }}>$ {c.cmd}</strong>
                                            <span style={{ color: 'var(--text-muted)', fontSize: '0.72rem' }}>{c.desc}</span>
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
                <div ref={bottomRef} />
            </div>

            {/* Terminal Prompt Input with Autofocus */}
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
