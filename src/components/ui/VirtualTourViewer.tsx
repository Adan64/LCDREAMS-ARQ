'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { useTranslations } from 'next-intl';

interface VirtualTourViewerProps {
    panoramaUrl: string;
    thumbnailUrl?: string;
    title: string;
    className?: string;
    autoRotate?: boolean;
}

/**
 * A lightweight 360° panorama viewer using CSS transforms.
 * Supports mouse drag, touch gestures, and fullscreen mode.
 * 
 * Recommended panorama format:
 * - Type: Equirectangular projection
 * - Resolution: 8000x4000px (8K) or 4000x2000px (4K minimum)
 * - Format: JPEG or WebP for best compression
 * - Size: 2-5MB maximum for good loading performance
 */
const VirtualTourViewer: React.FC<VirtualTourViewerProps> = ({
    panoramaUrl,
    thumbnailUrl,
    title,
    className = '',
    autoRotate = false
}) => {
    const t = useTranslations('VirtualTour');
    const containerRef = useRef<HTMLDivElement>(null);
    const [isOpen, setIsOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [loadProgress, setLoadProgress] = useState(0);
    const [rotation, setRotation] = useState({ x: 0, y: 0 });
    const [isDragging, setIsDragging] = useState(false);
    const [lastPosition, setLastPosition] = useState({ x: 0, y: 0 });
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [zoom, setZoom] = useState(75); // Field of view in degrees

    // Auto-rotate effect
    useEffect(() => {
        if (!isOpen || !autoRotate || isDragging) return;

        const interval = setInterval(() => {
            setRotation(prev => ({
                ...prev,
                y: prev.y + 0.1
            }));
        }, 16);

        return () => clearInterval(interval);
    }, [isOpen, autoRotate, isDragging]);

    // Simulate loading progress
    useEffect(() => {
        if (!isOpen) return;

        const img = new Image();
        img.onload = () => {
            setIsLoading(false);
            setLoadProgress(100);
        };
        img.onerror = () => {
            setIsLoading(false);
        };

        // Simulate progress
        const interval = setInterval(() => {
            setLoadProgress(prev => Math.min(prev + 10, 90));
        }, 100);

        img.src = panoramaUrl;

        return () => clearInterval(interval);
    }, [isOpen, panoramaUrl]);

    // Handle mouse/touch drag
    const handleStart = useCallback((clientX: number, clientY: number) => {
        setIsDragging(true);
        setLastPosition({ x: clientX, y: clientY });
    }, []);

    const handleMove = useCallback((clientX: number, clientY: number) => {
        if (!isDragging) return;

        const deltaX = clientX - lastPosition.x;
        const deltaY = clientY - lastPosition.y;

        setRotation(prev => ({
            x: Math.max(-85, Math.min(85, prev.x - deltaY * 0.3)),
            y: prev.y + deltaX * 0.3
        }));

        setLastPosition({ x: clientX, y: clientY });
    }, [isDragging, lastPosition]);

    const handleEnd = useCallback(() => {
        setIsDragging(false);
    }, []);

    // Mouse events
    const handleMouseDown = (e: React.MouseEvent) => handleStart(e.clientX, e.clientY);
    const handleMouseMove = (e: React.MouseEvent) => handleMove(e.clientX, e.clientY);
    const handleMouseUp = () => handleEnd();

    // Touch events
    const handleTouchStart = (e: React.TouchEvent) => {
        if (e.touches.length === 1) {
            handleStart(e.touches[0].clientX, e.touches[0].clientY);
        }
    };
    const handleTouchMove = (e: React.TouchEvent) => {
        if (e.touches.length === 1) {
            handleMove(e.touches[0].clientX, e.touches[0].clientY);
        }
    };
    const handleTouchEnd = () => handleEnd();

    // Zoom with scroll
    const handleWheel = (e: React.WheelEvent) => {
        e.preventDefault();
        setZoom(prev => Math.max(30, Math.min(120, prev + e.deltaY * 0.05)));
    };

    // Fullscreen toggle
    const toggleFullscreen = async () => {
        if (!containerRef.current) return;

        if (!document.fullscreenElement) {
            await containerRef.current.requestFullscreen();
            setIsFullscreen(true);
        } else {
            await document.exitFullscreen();
            setIsFullscreen(false);
        }
    };

    // Reset view
    const resetView = () => {
        setRotation({ x: 0, y: 0 });
        setZoom(75);
    };

    return (
        <>
            {/* Trigger Button/Card */}
            <button
                onClick={() => setIsOpen(true)}
                className={`group relative overflow-hidden rounded-xl bg-lcdream-charcoal border border-lcdream-gold/20 hover:border-lcdream-gold/50 transition-all duration-300 ${className}`}
            >
                {thumbnailUrl ? (
                    <img
                        src={thumbnailUrl}
                        alt={title}
                        className="w-full h-48 object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
                    />
                ) : (
                    <div className="w-full h-48 bg-gradient-to-br from-lcdream-charcoal to-black flex items-center justify-center">
                        <svg className="w-16 h-16 text-lcdream-gold/50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                        </svg>
                    </div>
                )}

                {/* 360° Badge */}
                <div className="absolute top-3 right-3 px-3 py-1.5 bg-lcdream-gold text-black text-xs font-cta-semibold rounded-full flex items-center gap-1.5">
                    <svg className="w-4 h-4 animate-spin-slow" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                    360°
                </div>

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-4">
                    <h3 className="font-headline text-lg font-headline-semibold text-white mb-1">{title}</h3>
                    <p className="text-lcdream-gold text-sm flex items-center gap-1.5 group-hover:gap-2.5 transition-all">
                        {t('startTour')}
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                    </p>
                </div>
            </button>

            {/* Fullscreen Modal */}
            {isOpen && (
                <div className="fixed inset-0 z-50 bg-black">
                    {/* Header */}
                    <div className="absolute top-0 left-0 right-0 z-10 p-4 bg-gradient-to-b from-black/80 to-transparent">
                        <div className="flex items-center justify-between max-w-7xl mx-auto">
                            <div>
                                <h2 className="font-headline text-xl font-headline-semibold text-white">{title}</h2>
                                <p className="text-lcdream-gray-light text-sm">{t('dragToExplore')}</p>
                            </div>
                            <div className="flex items-center gap-2">
                                <button
                                    onClick={resetView}
                                    className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
                                    title={t('resetView')}
                                >
                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                                    </svg>
                                </button>
                                <button
                                    onClick={toggleFullscreen}
                                    className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
                                    title={isFullscreen ? t('exitFullscreen') : t('fullscreen')}
                                >
                                    {isFullscreen ? (
                                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 9V4.5M9 9H4.5M9 9L3.75 3.75M9 15v4.5M9 15H4.5M9 15l-5.25 5.25M15 9h4.5M15 9V4.5M15 9l5.25-5.25M15 15h4.5M15 15v4.5m0-4.5l5.25 5.25" />
                                        </svg>
                                    ) : (
                                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" />
                                        </svg>
                                    )}
                                </button>
                                <button
                                    onClick={() => setIsOpen(false)}
                                    className="p-2 rounded-full bg-white/10 hover:bg-red-500/50 text-white transition-colors"
                                    title={t('close')}
                                >
                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Panorama Viewer */}
                    <div
                        ref={containerRef}
                        className="w-full h-full cursor-grab active:cursor-grabbing overflow-hidden"
                        onMouseDown={handleMouseDown}
                        onMouseMove={handleMouseMove}
                        onMouseUp={handleMouseUp}
                        onMouseLeave={handleMouseUp}
                        onTouchStart={handleTouchStart}
                        onTouchMove={handleTouchMove}
                        onTouchEnd={handleTouchEnd}
                        onWheel={handleWheel}
                    >
                        {isLoading ? (
                            <div className="w-full h-full flex flex-col items-center justify-center bg-lcdream-charcoal">
                                <div className="w-16 h-16 mb-4 relative">
                                    <svg className="w-full h-full animate-spin" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                        <path className="opacity-75 text-lcdream-gold" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                    </svg>
                                </div>
                                <div className="w-48 h-2 bg-lcdream-charcoal-light rounded-full overflow-hidden">
                                    <div
                                        className="h-full bg-lcdream-gold transition-all duration-300"
                                        style={{ width: `${loadProgress}%` }}
                                    />
                                </div>
                                <p className="text-lcdream-gray-light mt-2 text-sm">{t('loading')} {loadProgress}%</p>
                            </div>
                        ) : (
                            <div
                                className="w-full h-full"
                                style={{
                                    backgroundImage: `url(${panoramaUrl})`,
                                    backgroundSize: `${400 * (75 / zoom)}% auto`,
                                    backgroundPosition: `${50 + rotation.y * 0.5}% ${50 - rotation.x * 0.5}%`,
                                    transition: isDragging ? 'none' : 'background-position 0.1s ease-out'
                                }}
                            />
                        )}
                    </div>

                    {/* Controls hint */}
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-2 bg-black/50 rounded-full text-white/70 text-sm backdrop-blur-sm">
                        {t('controls')}
                    </div>

                    {/* Zoom indicator */}
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 flex flex-col items-center gap-2">
                        <button
                            onClick={() => setZoom(prev => Math.max(30, prev - 10))}
                            className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
                        >
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                            </svg>
                        </button>
                        <div className="w-1 h-24 bg-white/20 rounded-full overflow-hidden">
                            <div
                                className="w-full bg-lcdream-gold transition-all"
                                style={{ height: `${((120 - zoom) / 90) * 100}%` }}
                            />
                        </div>
                        <button
                            onClick={() => setZoom(prev => Math.min(120, prev + 10))}
                            className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
                        >
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                            </svg>
                        </button>
                    </div>
                </div>
            )}
        </>
    );
};

export default VirtualTourViewer;
