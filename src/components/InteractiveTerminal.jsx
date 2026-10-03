import React, { useState, useRef, useEffect } from 'react';
import { Terminal as TerminalIcon, Sparkles, Send, Copy, ArrowRight, CornerDownLeft } from 'lucide-react';
import confetti from 'canvas-confetti';
import { soundFx } from '../utils/sound';

export const InteractiveTerminal = ({ onTriggerToast }) => {
    const [history, setHistory] = useState([
        { type: 'system', text: '⚡ Antigravity DevTerm v3.2.0 (x86_64-apple-darwin)' },
        { type: 'system', text: 'Type "help" to see available interactive commands or click any quick chips below.' }
    ]);
    const [inputVal, setInputVal] = useState('');
    const [commandHistory, setCommandHistory] = useState([]);
    const [historyIndex, setHistoryIndex] = useState(-1);
    const bottomRef = useRef(null);

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
                type: 'output',
                text: `Available interactive commands:
  • help           - List available terminal commands
  • skills         - Inspect engineering stack & proficiency ratings
  • projects       - Browse production mobile & web applications
  • contact        - Copy email / phone / GitHub handles
  • stats          - View academic & production performance metrics
  • sudo hire      - Trigger instant interview invitation + confetti 🚀
  • curl cv        - Download Kaleab's latest verified PDF resume
  • clear          - Reset terminal screen`
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
                type: 'output',
                text: `[PRODUCTION RELEASES]
  1. Axumite Ride    - Live Play Store Passenger & Driver Fleet Apps
  2. Shemeta         - Multi-Vendor E-Commerce Platform (React/Next)
  3. AI Dermatologist- Skin Disease Screening Mobile App (TFLite)
  4. OCR Pipeline    - Automated Document & Receipt Extraction (FastAPI)
  5. EthioBeds       - Hotel & Accommodation Booking Platform (SaaS)`
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
            onTriggerToast?.("Interview invitation initiated! Let's connect at kaleabmezgebe4@gmail.com 🚀");
            newEntries.push({
                type: 'success',
                text: `🎉 sudo permissions granted! Initiating direct contact protocol...
Email: kaleabmezgebe4@gmail.com | Phone: +251 945989369
Opening direct email draft...`
            });
            setTimeout(() => {
                window.location.href = 'mailto:kaleabmezgebe4@gmail.com?subject=Interview%20Invitation%20for%20Kaleab%20Mezgebe';
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
            return;
        } else {
            newEntries.push({
                type: 'error',
                text: `zsh: command not found: ${raw}. Type "help" for valid commands.`
            });
        }

        setHistory((prev) => [...prev, ...newEntries]);
        setInputVal('');
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

    return (
        <div className="terminal-window" style={{ display: 'flex', flexDirection: 'column', height: '100%', minHeight: '380px' }}>
            <div className="terminal-header" style={{ justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div className="terminal-dots">
                        <span className="terminal-dot-btn" style={{ background: '#ef4444' }}></span>
                        <span className="terminal-dot-btn" style={{ background: '#f59e0b' }}></span>
                        <span className="terminal-dot-btn" style={{ background: '#10b981' }}></span>
                    </div>
                    <span className="font-mono" style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                        kaleab@macbook-pro: ~/portfolio (zsh)
                    </span>
                </div>
                <div style={{ display: 'flex', gap: '6px' }}>
                    {['help', 'skills', 'stats', 'sudo hire'].map((quick) => (
                        <button
                            key={quick}
                            onClick={() => executeCommand(quick)}
                            className="font-mono"
                            style={{
                                background: 'rgba(255,255,255,0.06)',
                                border: '1px solid rgba(255,255,255,0.1)',
                                color: quick.includes('hire') ? '#ec4899' : 'var(--text-sub)',
                                padding: '2px 8px',
                                borderRadius: '4px',
                                fontSize: '0.72rem',
                                cursor: 'pointer'
                            }}
                        >
                            {quick}
                        </button>
                    ))}
                </div>
            </div>

            <div className="terminal-body" style={{ flex: 1, overflowY: 'auto', maxHeight: '340px' }}>
                {history.map((item, idx) => (
                    <div key={idx} style={{ marginBottom: '8px' }}>
                        {item.type === 'user' && (
                            <div style={{ color: '#38bdf8', fontWeight: 600 }}>{item.text}</div>
                        )}
                        {item.type === 'system' && (
                            <div style={{ color: '#94a3b8', fontSize: '0.85rem' }}>{item.text}</div>
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

            {/* Terminal Prompt Input */}
            <div style={{ padding: '12px 16px', background: 'rgba(0,0,0,0.4)', borderTop: '1px solid var(--glass-border)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ color: '#10b981', fontWeight: 800, fontFamily: 'var(--font-mono)' }}>$</span>
                <input
                    type="text"
                    value={inputVal}
                    onChange={(e) => setInputVal(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Type command ('help', 'projects', 'sudo hire')..."
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
                    onClick={() => executeCommand(inputVal)}
                    style={{ background: 'transparent', border: 'none', color: 'var(--accent-primary)', cursor: 'pointer', display: 'flex', alignItems: 'center' }}
                >
                    <CornerDownLeft size={16} />
                </button>
            </div>
        </div>
    );
};
