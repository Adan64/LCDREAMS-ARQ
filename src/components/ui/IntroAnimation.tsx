'use client';

import React, { useState, useEffect } from 'react';

const IntroAnimation = () => {
    const [isVisible, setIsVisible] = useState(true);
    const [isFadingOut, setIsFadingOut] = useState(false);

    useEffect(() => {
        // Start fade out after 2.8s
        const fadeTimer = setTimeout(() => {
            setIsFadingOut(true);
        }, 2800);

        // Remove from DOM after fade-out completes
        const removeTimer = setTimeout(() => {
            setIsVisible(false);
        }, 3600);

        return () => {
            clearTimeout(fadeTimer);
            clearTimeout(removeTimer);
        };
    }, []);

    if (!isVisible) return null;

    return (
        <div
            className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-black"
            style={{
                opacity: isFadingOut ? 0 : 1,
                transition: 'opacity 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
                pointerEvents: isFadingOut ? 'none' : 'all',
            }}
        >
            {/* SVG architectural line drawing of a luxury mansion */}
            <svg
                viewBox="0 0 380 220"
                width="380"
                height="220"
                xmlns="http://www.w3.org/2000/svg"
                className="mb-8"
                style={{ overflow: 'visible' }}
            >
                <style>{`
                    @keyframes drawLine {
                        from { stroke-dashoffset: 1; }
                        to { stroke-dashoffset: 0; }
                    }

                    .arch-line {
                        fill: none;
                        stroke: #D4AF37;
                        stroke-width: 1.2;
                        stroke-linecap: round;
                        stroke-linejoin: round;
                        stroke-dasharray: 1;
                        stroke-dashoffset: 1;
                        pathLength: 1;
                        animation: drawLine 0.4s ease-out forwards;
                    }

                    .arch-line-thin {
                        fill: none;
                        stroke: #D4AF37;
                        stroke-width: 0.7;
                        stroke-linecap: round;
                        stroke-linejoin: round;
                        opacity: 0.5;
                        stroke-dasharray: 1;
                        stroke-dashoffset: 1;
                        pathLength: 1;
                        animation: drawLine 0.4s ease-out forwards;
                    }

                    .arch-dot {
                        fill: #D4AF37;
                        opacity: 0;
                        animation: fadeInDot 0.3s ease-out forwards;
                    }

                    @keyframes fadeInDot {
                        from { opacity: 0; transform: scale(0); }
                        to { opacity: 1; transform: scale(1); }
                    }
                `}</style>

                {/* Ground line */}
                <path className="arch-line" d="M 20 190 L 360 190" pathLength="1" style={{ animationDelay: '0.0s' }} />

                {/* Main body - left wing */}
                <path className="arch-line" d="M 30 190 L 30 145 L 120 145 L 120 190" pathLength="1" style={{ animationDelay: '0.1s' }} />

                {/* Main body - center block */}
                <path className="arch-line" d="M 115 190 L 115 120 L 265 120 L 265 190" pathLength="1" style={{ animationDelay: '0.2s' }} />

                {/* Right wing */}
                <path className="arch-line" d="M 260 190 L 260 145 L 350 145 L 350 190" pathLength="1" style={{ animationDelay: '0.3s' }} />

                {/* Roof - left wing */}
                <path className="arch-line" d="M 22 145 L 75 115 L 128 145" pathLength="1" style={{ animationDelay: '0.4s' }} />

                {/* Roof - center (pediment) */}
                <path className="arch-line" d="M 107 120 L 190 70 L 273 120" pathLength="1" style={{ animationDelay: '0.5s' }} />

                {/* Roof - right wing */}
                <path className="arch-line" d="M 252 145 L 305 115 L 358 145" pathLength="1" style={{ animationDelay: '0.6s' }} />

                {/* Chimney left */}
                <path className="arch-line" d="M 55 115 L 55 95 L 68 95 L 68 115" pathLength="1" style={{ animationDelay: '0.65s' }} />
                {/* Chimney right */}
                <path className="arch-line" d="M 312 115 L 312 95 L 325 95 L 325 115" pathLength="1" style={{ animationDelay: '0.7s' }} />

                {/* Center entrance door */}
                <path className="arch-line" d="M 172 190 L 172 158 Q 190 148 208 158 L 208 190" pathLength="1" style={{ animationDelay: '0.75s' }} />

                {/* Door arch detail */}
                <path className="arch-line-thin" d="M 175 165 Q 190 155 205 165" pathLength="1" style={{ animationDelay: '0.8s' }} />

                {/* Left wing windows */}
                <path className="arch-line" d="M 45 155 L 45 170 L 65 170 L 65 155 L 45 155" pathLength="1" style={{ animationDelay: '0.85s' }} />
                <path className="arch-line" d="M 80 155 L 80 170 L 100 170 L 100 155 L 80 155" pathLength="1" style={{ animationDelay: '0.9s' }} />

                {/* Center windows - left */}
                <path className="arch-line" d="M 125 130 L 125 150 L 150 150 L 150 130 L 125 130" pathLength="1" style={{ animationDelay: '0.95s' }} />
                {/* Center windows - right */}
                <path className="arch-line" d="M 230 130 L 230 150 L 255 150 L 255 130 L 230 130" pathLength="1" style={{ animationDelay: '1.0s' }} />
                {/* Center windows - top left */}
                <path className="arch-line" d="M 135 155 L 135 175 L 155 175 L 155 155 L 135 155" pathLength="1" style={{ animationDelay: '1.05s' }} />
                {/* Center windows - top right */}
                <path className="arch-line" d="M 225 155 L 225 175 L 245 175 L 245 155 L 225 155" pathLength="1" style={{ animationDelay: '1.1s' }} />

                {/* Right wing windows */}
                <path className="arch-line" d="M 275 155 L 275 170 L 295 170 L 295 155 L 275 155" pathLength="1" style={{ animationDelay: '1.15s' }} />
                <path className="arch-line" d="M 310 155 L 310 170 L 330 170 L 330 155 L 310 155" pathLength="1" style={{ animationDelay: '1.2s' }} />

                {/* Steps */}
                <path className="arch-line-thin" d="M 160 190 L 160 196 L 220 196 L 220 190" pathLength="1" style={{ animationDelay: '1.25s' }} />
                <path className="arch-line-thin" d="M 155 196 L 155 202 L 225 202 L 225 196" pathLength="1" style={{ animationDelay: '1.3s' }} />

                {/* Decorative column lines on center facade */}
                <path className="arch-line-thin" d="M 140 120 L 140 190" pathLength="1" style={{ animationDelay: '1.35s' }} />
                <path className="arch-line-thin" d="M 160 120 L 160 190" pathLength="1" style={{ animationDelay: '1.4s' }} />
                <path className="arch-line-thin" d="M 220 120 L 220 190" pathLength="1" style={{ animationDelay: '1.45s' }} />
                <path className="arch-line-thin" d="M 240 120 L 240 190" pathLength="1" style={{ animationDelay: '1.5s' }} />

                {/* Pediment detail / cornice */}
                <path className="arch-line-thin" d="M 115 125 L 265 125" pathLength="1" style={{ animationDelay: '1.55s' }} />

                {/* Corner ornament dots */}
                <circle className="arch-dot" cx="190" cy="70" r="3" style={{ animationDelay: '1.6s' }} />
                <circle className="arch-dot" cx="75" cy="115" r="2" style={{ animationDelay: '1.65s' }} />
                <circle className="arch-dot" cx="305" cy="115" r="2" style={{ animationDelay: '1.7s' }} />

                {/* Blueprint grid lines (very subtle) */}
                <line className="arch-line-thin" x1="20" y1="160" x2="360" y2="160" style={{ opacity: 0.15, animationDelay: '1.75s' }} />
                <line className="arch-line-thin" x1="20" y1="135" x2="360" y2="135" style={{ opacity: 0.15, animationDelay: '1.8s' }} />
                <line className="arch-line-thin" x1="190" y1="30" x2="190" y2="210" style={{ opacity: 0.15, animationDelay: '1.85s' }} />
            </svg>

            {/* Logo text */}
            <div
                style={{
                    opacity: 0,
                    animation: 'fadeInLogo 0.7s ease-out 1.9s forwards',
                }}
            >
                <style>{`
                    @keyframes fadeInLogo {
                        from { opacity: 0; transform: translateY(10px); }
                        to { opacity: 1; transform: translateY(0); }
                    }
                `}</style>
                <h1
                    className="font-headline text-3xl tracking-widest uppercase text-center"
                    style={{ color: '#D4AF37', letterSpacing: '0.3em', fontFamily: 'Georgia, serif' }}
                >
                    LCDREAM
                </h1>
                <div
                    className="text-center mt-1"
                    style={{ color: '#cccccc', fontSize: '0.75rem', letterSpacing: '0.5em', fontFamily: 'sans-serif' }}
                >
                    .ARQ — ARQUITECTURA &amp; INTERIORES
                </div>
            </div>

            {/* Subtle loading line */}
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-32 h-px bg-white/10 overflow-hidden">
                <div
                    style={{
                        height: '100%',
                        background: 'linear-gradient(90deg, transparent, #D4AF37, transparent)',
                        animation: 'loadingBar 2.5s ease-in-out 0.3s forwards',
                    }}
                />
                <style>{`
                    @keyframes loadingBar {
                        0% { transform: translateX(-100%); }
                        100% { transform: translateX(100%); }
                    }
                `}</style>
            </div>
        </div>
    );
};

export default IntroAnimation;
