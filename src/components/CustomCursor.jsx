import React, { useEffect, useState, useRef } from 'react';

export const CustomCursor = ({ isDarkMode = true }) => {
    const [isHovered, setIsHovered] = useState(false);
    const [isClicked, setIsClicked] = useState(false);
    const [hasMoved, setHasMoved] = useState(false);
    const [isPointerDevice, setIsPointerDevice] = useState(false);

    const dotRef = useRef(null);
    const ringRef = useRef(null);
    const glowRef = useRef(null);

    const mousePos = useRef({ x: -200, y: -200 });
    const ringPos = useRef({ x: -200, y: -200 });
    const glowPos = useRef({ x: -200, y: -200 });

    useEffect(() => {
        // Only run on fine pointer devices (desktops, laptops with mice/trackpads)
        if (typeof window === 'undefined') return;
        const isFinePointer = window.matchMedia('(pointer: fine)').matches;
        if (!isFinePointer) return;

        setIsPointerDevice(true);

        const handleMouseMove = (e) => {
            const x = e.clientX;
            const y = e.clientY;

            if (!hasMoved) {
                // Initialize positions directly at cursor location to prevent any jump or top-left artifacts
                mousePos.current = { x, y };
                ringPos.current = { x, y };
                glowPos.current = { x, y };
                setHasMoved(true);
            } else {
                mousePos.current = { x, y };
            }

            // Immediately position inner dot for zero lag
            if (dotRef.current) {
                dotRef.current.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`;
            }

            // Detect interactive hover targets
            const targetEl = e.target;
            const isInteractive = !!(targetEl && targetEl.closest && targetEl.closest(
                'a, button, input, textarea, .glass-card, .tech-chip, .filter-tab-btn, .status-pill, .terminal-window, [role="button"]'
            ));
            setIsHovered(isInteractive);
        };

        const handleMouseDown = () => setIsClicked(true);
        const handleMouseUp = () => setIsClicked(false);
        const handleMouseLeave = () => setHasMoved(false);
        const handleMouseEnter = () => setHasMoved(true);

        window.addEventListener('mousemove', handleMouseMove, { passive: true });
        window.addEventListener('mousedown', handleMouseDown);
        window.addEventListener('mouseup', handleMouseUp);
        document.documentElement.addEventListener('mouseleave', handleMouseLeave);
        document.documentElement.addEventListener('mouseenter', handleMouseEnter);

        // Smooth physics render loop
        let animId;
        const render = () => {
            // Fluid damping for outer focus ring
            ringPos.current.x += (mousePos.current.x - ringPos.current.x) * 0.18;
            ringPos.current.y += (mousePos.current.y - ringPos.current.y) * 0.18;

            // Ambient trail glow damping
            glowPos.current.x += (mousePos.current.x - glowPos.current.x) * 0.08;
            glowPos.current.y += (mousePos.current.y - glowPos.current.y) * 0.08;

            if (ringRef.current) {
                ringRef.current.style.transform = `translate3d(${ringPos.current.x}px, ${ringPos.current.y}px, 0) translate(-50%, -50%)`;
            }

            if (glowRef.current) {
                glowRef.current.style.transform = `translate3d(${glowPos.current.x}px, ${glowPos.current.y}px, 0) translate(-50%, -50%)`;
            }

            animId = requestAnimationFrame(render);
        };
        animId = requestAnimationFrame(render);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mousedown', handleMouseDown);
            window.removeEventListener('mouseup', handleMouseUp);
            document.documentElement.removeEventListener('mouseleave', handleMouseLeave);
            document.documentElement.removeEventListener('mouseenter', handleMouseEnter);
            cancelAnimationFrame(animId);
        };
    }, [hasMoved]);

    if (!isPointerDevice || !hasMoved) {
        return null;
    }

    const primaryColor = isDarkMode ? '#6366f1' : '#4f46e5';
    const accentColor = isDarkMode ? '#06b6d4' : '#0891b2';
    const highlightColor = isDarkMode ? '#ec4899' : '#db2777';

    return (
        <div style={{ pointerEvents: 'none', position: 'fixed', inset: 0, zIndex: 99999, overflow: 'hidden' }}>
            {/* Ambient Smooth Trailing Aura */}
            <div
                ref={glowRef}
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: isHovered ? '240px' : '160px',
                    height: isHovered ? '240px' : '160px',
                    borderRadius: '50%',
                    background: isDarkMode
                        ? `radial-gradient(circle, rgba(99, 102, 241, 0.14) 0%, rgba(6, 182, 212, 0.06) 45%, transparent 70%)`
                        : `radial-gradient(circle, rgba(79, 70, 229, 0.10) 0%, rgba(8, 145, 178, 0.04) 45%, transparent 70%)`,
                    pointerEvents: 'none',
                    willChange: 'transform',
                    transition: 'width 0.3s ease, height 0.3s ease'
                }}
            />

            {/* Futuristic Fluid Interactive Orbital Ring */}
            <div
                ref={ringRef}
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: isHovered ? '46px' : (isClicked ? '24px' : '32px'),
                    height: isHovered ? '46px' : (isClicked ? '24px' : '32px'),
                    borderRadius: '50%',
                    border: isHovered
                        ? `2px solid ${highlightColor}`
                        : `1.5px solid ${isDarkMode ? 'rgba(99, 102, 241, 0.65)' : 'rgba(79, 70, 229, 0.55)'}`,
                    background: isHovered
                        ? (isDarkMode ? 'rgba(236, 72, 153, 0.12)' : 'rgba(219, 39, 119, 0.10)')
                        : 'transparent',
                    boxShadow: isHovered
                        ? `0 0 20px ${highlightColor}, inset 0 0 10px rgba(99, 102, 241, 0.3)`
                        : `0 0 10px rgba(99, 102, 241, 0.25)`,
                    backdropFilter: isHovered ? 'blur(1px)' : 'none',
                    pointerEvents: 'none',
                    willChange: 'transform',
                    transition: 'width 0.22s cubic-bezier(0.16, 1, 0.3, 1), height 0.22s cubic-bezier(0.16, 1, 0.3, 1), border 0.2s ease, background 0.2s ease, box-shadow 0.2s ease'
                }}
            />

            {/* Precision Laser Core Dot */}
            <div
                ref={dotRef}
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: isHovered ? '8px' : (isClicked ? '4px' : '6px'),
                    height: isHovered ? '8px' : (isClicked ? '4px' : '6px'),
                    borderRadius: '50%',
                    backgroundColor: isHovered ? highlightColor : accentColor,
                    boxShadow: `0 0 10px ${isHovered ? highlightColor : accentColor}`,
                    pointerEvents: 'none',
                    willChange: 'transform',
                    transition: 'width 0.15s ease, height 0.15s ease, background-color 0.2s ease, box-shadow 0.2s ease'
                }}
            />
        </div>
    );
};
