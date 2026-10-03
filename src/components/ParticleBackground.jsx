import React, { useEffect, useRef } from 'react';

const ParticleBackground = ({ isDarkMode = true }) => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        let animationFrameId;

        let width = (canvas.width = window.innerWidth);
        let height = (canvas.height = window.innerHeight);

        const handleResize = () => {
            if (!canvas) return;
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
        };
        window.addEventListener('resize', handleResize);

        const mouse = { x: null, y: null, radius: 150 };

        const handleMouseMove = (e) => {
            mouse.x = e.clientX;
            mouse.y = e.clientY;
        };

        const handleMouseLeave = () => {
            mouse.x = null;
            mouse.y = null;
        };

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseleave', handleMouseLeave);

        // Particle definitions
        const particleCount = Math.min(Math.floor((width * height) / 18000), 65);
        const particles = [];
        const symbols = ['{ }', '=>', 'BLoC', '01', 'TS', 'λ', '⚡', 'Flutter', 'React', 'async'];

        for (let i = 0; i < particleCount; i++) {
            particles.push({
                x: Math.random() * width,
                y: Math.random() * height,
                vx: (Math.random() - 0.5) * 0.45,
                vy: (Math.random() - 0.5) * 0.45,
                radius: Math.random() * 1.8 + 1,
                symbol: Math.random() > 0.65 ? symbols[Math.floor(Math.random() * symbols.length)] : null,
                opacity: Math.random() * 0.4 + 0.15,
                baseOpacity: Math.random() * 0.35 + 0.15
            });
        }

        const draw = () => {
            ctx.clearRect(0, 0, width, height);

            const dotColor = isDarkMode ? 'rgba(99, 102, 241, ' : 'rgba(79, 70, 229, ';
            const lineColor = isDarkMode ? 'rgba(6, 182, 212, ' : 'rgba(8, 145, 178, ';

            for (let i = 0; i < particles.length; i++) {
                const p = particles[i];

                p.x += p.vx;
                p.y += p.vy;

                if (p.x < 0) p.x = width;
                if (p.x > width) p.x = 0;
                if (p.y < 0) p.y = height;
                if (p.y > height) p.y = 0;

                // Mouse interaction
                if (mouse.x !== null && mouse.y !== null) {
                    const dx = mouse.x - p.x;
                    const dy = mouse.y - p.y;
                    const dist = Math.sqrt(dx * dx + dy * dy);
                    if (dist < mouse.radius) {
                        const force = (mouse.radius - dist) / mouse.radius;
                        p.x -= (dx / dist) * force * 1.5;
                        p.y -= (dy / dist) * force * 1.5;
                        p.opacity = Math.min(p.baseOpacity + 0.4, 0.9);
                    } else {
                        p.opacity = p.baseOpacity;
                    }
                }

                // Draw Particle or Symbol
                if (p.symbol) {
                    ctx.font = '10px "JetBrains Mono", monospace';
                    ctx.fillStyle = dotColor + p.opacity + ')';
                    ctx.fillText(p.symbol, p.x, p.y);
                } else {
                    ctx.beginPath();
                    ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
                    ctx.fillStyle = dotColor + p.opacity + ')';
                    ctx.fill();
                }

                // Connect nearby particles
                for (let j = i + 1; j < particles.length; j++) {
                    const p2 = particles[j];
                    const dx = p.x - p2.x;
                    const dy = p.y - p2.y;
                    const dist = Math.sqrt(dx * dx + dy * dy);

                    if (dist < 110) {
                        const alpha = (1 - dist / 110) * 0.22;
                        ctx.beginPath();
                        ctx.moveTo(p.x, p.y);
                        ctx.lineTo(p2.x, p2.y);
                        ctx.strokeStyle = lineColor + alpha + ')';
                        ctx.lineWidth = 0.8;
                        ctx.stroke();
                    }
                }
            }

            animationFrameId = requestAnimationFrame(draw);
        };

        draw();

        return () => {
            window.removeEventListener('resize', handleResize);
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseleave', handleMouseLeave);
            cancelAnimationFrame(animationFrameId);
        };
    }, [isDarkMode]);

    return (
        <canvas
            ref={canvasRef}
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100vw',
                height: '100vh',
                pointerEvents: 'none',
                zIndex: 0,
                opacity: isDarkMode ? 0.75 : 0.45
            }}
        />
    );
};

export default ParticleBackground;
