'use client';

import React, { useState } from 'react';
import AppImage from '@/components/ui/AppImage';
import { useTranslations } from 'next-intl';

interface BeforeAfterSliderProps {
  beforeImage: string;
  beforeImageAlt: string;
  afterImage: string;
  afterImageAlt: string;
  title: string;
}

const BeforeAfterSlider = ({ beforeImage, beforeImageAlt, afterImage, afterImageAlt, title }: BeforeAfterSliderProps) => {
  const t = useTranslations('ProjectCaseStudies.common.beforeAfter');
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);

  const handleMove = (clientX: number, rect: DOMRect) => {
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    const percent = Math.max(0, Math.min((x / rect.width) * 100, 100));
    setSliderPosition(percent);
  };

  const handleMouseDown = () => setIsDragging(true);
  const handleMouseUp = () => setIsDragging(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    const rect = e.currentTarget.getBoundingClientRect();
    handleMove(e.clientX, rect);
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    const rect = e.currentTarget.getBoundingClientRect();
    handleMove(e.touches[0].clientX, rect);
  };

  return (
    <section className="py-16 lg:py-24 bg-muted">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <h2 className="text-3xl lg:text-4xl font-headline-bold mb-8 text-center text-[rgba(247,247,247,1)]">
          {title}
        </h2>

        <div
          className="relative w-full h-[400px] lg:h-[600px] overflow-hidden rounded-lg cursor-ew-resize select-none"
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseUp}
          onTouchStart={handleMouseDown}
          onTouchEnd={handleMouseUp}
          onTouchMove={handleTouchMove}
        >
          <div className="absolute inset-0">
            <AppImage
              src={afterImage}
              alt={afterImageAlt}
              className="w-full h-full object-cover"
            />
            <div className="absolute top-4 right-4 px-4 py-2 bg-accent text-accent-foreground font-body text-sm font-body-semibold rounded-full">
              {t('after')}
            </div>
          </div>

          <div
            className="absolute inset-0 overflow-hidden"
            style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
          >
            <AppImage
              src={beforeImage}
              alt={beforeImageAlt}
              className="w-full h-full object-cover"
            />
            <div className="absolute top-4 left-4 px-4 py-2 bg-secondary text-secondary-foreground font-body text-sm font-body-semibold rounded-full">
              {t('before')}
            </div>
          </div>

          <div
            className="absolute top-0 bottom-0 w-1 bg-white shadow-elevated"
            style={{ left: `${sliderPosition}%` }}
          >
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-elevated flex items-center justify-center">
              <div className="flex space-x-1">
                <div className="w-0.5 h-6 bg-primary" />
                <div className="w-0.5 h-6 bg-primary" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BeforeAfterSlider;