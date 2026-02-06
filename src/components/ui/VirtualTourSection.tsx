'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import VirtualTourViewer from '@/components/ui/VirtualTourViewer';

interface VirtualTourSectionProps {
    className?: string;
}

/**
 * Virtual Tour Section component that showcases featured project tours.
 * Add this to portfolio-gallery or project-case-studies pages.
 * 
 * To add a new tour:
 * 1. Add panorama image to public/tours/{project-id}/panorama.jpg
 * 2. Add thumbnail to public/tours/{project-id}/thumbnail.jpg
 * 3. Add an entry to the `tours` array below
 */
const VirtualTourSection: React.FC<VirtualTourSectionProps> = ({ className = '' }) => {
    const t = useTranslations('Portfolio.virtualTours');

    // Featured tours configuration
    // TODO: Replace with real panorama images (8000x4000px JPEG/WebP)
    const tours = [
        {
            id: 'studio',
            title: t('studioTitle'),
            panoramaUrl: '/tours/studio/pexels-amar-35483495.jpg',
            thumbnailUrl: '/tours/studio/pexels-amar-35483495.jpg'
        },
        // Add more tours as needed:
        // {
        //   id: 'villa-mediterranea',
        //   title: 'Villa Mediterránea',
        //   panoramaUrl: '/tours/villa-mediterranea/panorama.jpg',
        //   thumbnailUrl: '/tours/villa-mediterranea/thumbnail.jpg'
        // },
    ];

    return (
        <section className={`py-16 ${className}`}>
            <div className="max-w-7xl mx-auto px-6 lg:px-12">
                {/* Section Header */}
                <div className="text-center mb-12">
                    <span className="inline-block px-4 py-1.5 bg-lcdream-gold/10 text-lcdream-gold text-sm font-cta-semibold rounded-full mb-4">
                        {t('badge')}
                    </span>
                    <h2 className="font-headline text-3xl lg:text-4xl font-headline-bold text-white mb-4">
                        {t('title')}
                    </h2>
                    <p className="text-lcdream-gray-light max-w-2xl mx-auto">
                        {t('description')}
                    </p>
                </div>

                {/* Tours Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {tours.map((tour) => (
                        <VirtualTourViewer
                            key={tour.id}
                            title={tour.title}
                            panoramaUrl={tour.panoramaUrl}
                            thumbnailUrl={tour.thumbnailUrl}
                            autoRotate
                        />
                    ))}
                </div>

                {/* Info Note */}
                <div className="mt-8 text-center">
                    <p className="text-lcdream-gray text-sm">
                        {t('hint')}
                    </p>
                </div>
            </div>
        </section>
    );
};

export default VirtualTourSection;
