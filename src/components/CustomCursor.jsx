import React, { useEffect, useState, useRef } from 'react';

export const CustomCursor = ({ isDarkMode = true }) => {
    const [isHovered, setIsHovered] = useState(false);
    const [isClicked, setIsClicked] = useState(false);
    const [isVisible, setIsVisible] = useState(false);

    const cursorDotRef = useRef(null);
    const cursorRingRef = useRef(null);
    const spotlightRef = useRef(null);

    const pos = useRef({ x: -100, y: -100 });
    const target = useRef({ x: -100, y: -100 });

    useEffect(() => {
        // Disable on touch-only devices
        if (typeof window === 'undefined' || window.matchMedia('(pointer: coarse)').matches) {
            return;
        }

        const handleMouseMove = (e) => {
            target.current = { x: e.clientX, y: e.clientY };
            if (!isVisible) setIsVisible(true);

            // Update ambient spotlight smoothly
            if (spotlightRef.current) {
                spotlightRef.current.style.transform = `translate3d(${e.clientX - 250}px, ${e.clientY - 250}px, 0)`;
            }

            // Check if hovering interactive element
            const targetEl = e.target;
            const interactiveEl = targetEl && targetEl.closest && targetEl.closest('a, button, input, textarea, .glass-card, .tech-chip, .filter-tab-btn, .status-pill, [role="button"]');
            
            setIsHovered(!!interactiveEl);
        };

        const handleMouseDown = () => setIsClicked(true);
        const handleMouseUp = () => setIsClicked(false);
        const handleMouseLeave = () => setIsVisible(false);
        const handleMouseEnter = () => setIsVisible(true);

        window.addEventListener('mousemove', handleMouseMove, { passive: true });
        window.addEventListener('mousedown', handleMouseDown);
        window.addEventListener('mouseup', handleMouseUp);
        document.documentElement.addEventListener('mouseleave', handleMouseLeave);
        document.documentElement.addEventListener('mouseenter', handleMouseEnter);

        // Smooth Lerp Animation Loop for ultra-fluid focus ring tracking
        let animId;
        const render = () => {
            pos.current.x += (target.current.x - pos.current.x) * 0.2;
            pos.current.y += (target.current.y - pos.current.y) * 0.2;

            if (cursorRingRef.current) {
                cursorRingRef.current.style.transform = `translate3d(${pos.current.x}px, ${pos.current.y}px, 0) translate(-50%, -50%)`;
            }

            if (cursorDotRef.current) {
                cursorDotRef.current.style.transform = `translate3d(${target.current.x}px, ${target.current.y}px, 0) translate(-50%, -50%)`;
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
    }, [isVisible]);

    if (!isVisible) return null;

    const accentColor = isDarkMode ? '#38bdf8' : '#4f46e5';

    return (
        <>
            {/* Ambient Background Cursor Spotlight */}
            <div
                ref={spotlightRef}
                style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '500px',
                    height: '500px',
                    borderRadius: '50%',
                    background: isDarkMode
                        ? 'radial-gradient(circle, rgba(99, 102, 241, 0.10) 0%, rgba(6, 182, 212, 0.04) 40%, transparent 65%)'
                        : 'radial-gradient(circle, rgba(79, 70, 229, 0.07) 0%, transparent 55%)',
                    pointerEvents: 'none',
                    zIndex: 0,
                    willChange: 'transform'
                }}
            />

            {/* Precision Laser Inner Dot */}
            <div
                ref={cursorDotRef}
                style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: isHovered ? '6px' : '7px',
                    height: isHovered ? '6px' : '7px',
                    borderRadius: '50%',
                    backgroundColor: isHovered ? '#ec4899' : accentColor,
                    boxShadow: `0 0 12px ${isHovered ? '#ec4899' : accentColor}`,
                    pointerEvents: 'none',
                    zIndex: 9999,
                    willChange: 'transform',
                    transition: 'width 0.2s ease, height 0.2s ease, background-color 0.2s ease'
                }}
            />

            {/* Interactive Smooth Cyber Focus Ring */}
            <div
                ref={cursorRingRef}
                style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: isHovered ? '52px' : (isClicked ? '22px' : '34px'),
                    height: isHovered ? '52px' : (isClicked ? '22px' : '34px'),
                    borderRadius: '50%',
                    border: isHovered 
                        ? `2px solid ${isDarkMode ? '#38bdf8' : '#6366f1'}` 
                        : `1.5px solid ${isDarkMode ? 'rgba(99, 102, 241, 0.45)' : 'rgba(79, 70, 229, 0.35)'}`,
                    background: isHovered 
                        ? (isDarkMode ? 'rgba(56, 189, 248, 0.08)' : 'rgba(99, 102, 241, 0.08)')
                        : 'transparent',
                    boxShadow: isHovered 
                        ? `0 0 20px rgba(56, 189, 248, 0.4), inset 0 0 10px rgba(99, 102, 241, 0.2)` 
                        : '0 0 8px rgba(99, 102, 241, 0.12)',
                    backdropFilter: isHovered ? 'blur(1px)' : 'none',
                    pointerEvents: 'none',
                    zIndex: 9998,
                    willChange: 'transform',
                    transition: 'width 0.2s cubic-bezier(0.2, 0.8, 0.2, 1), height 0.2s cubic-bezier(0.2, 0.8, 0.2, 1), border 0.2s ease, background 0.2s ease, box-shadow 0.2s ease'
                }}
            />
        </>
    );
};
