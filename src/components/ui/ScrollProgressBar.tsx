'use client';

import React, { useState, useEffect } from 'react';

const ScrollProgressBar = () => {
    const [scrollProgress, setScrollProgress] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = window.scrollY;
            const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
            setScrollProgress(progress);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll();

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div
            className="fixed top-0 left-0 right-0 z-[100] h-[3px] bg-transparent pointer-events-none"
            aria-hidden="true"
        >
            <div
                className="h-full transition-[width] duration-75 ease-out"
                style={{
                    width: `${scrollProgress}%`,
                    background: 'linear-gradient(90deg, #D4AF37 0%, #FFD700 50%, #D4AF37 100%)',
                    boxShadow: '0 0 8px rgba(212, 175, 55, 0.8), 0 0 16px rgba(212, 175, 55, 0.4)',
                }}
            />
        </div>
    );
};

export default ScrollProgressBar;
