'use client';

import React, { useState } from 'react';
import AppImage from '@/components/ui/AppImage';
import Icon from '@/components/ui/AppIcon';
import { useTranslations } from 'next-intl';

interface ClientTestimonialProps {
  clientName: string;
  clientRole: string;
  clientImage: string;
  clientImageAlt: string;
  testimonial: string;
  videoUrl?: string;
}

const ClientTestimonial = ({ clientName, clientRole, clientImage, clientImageAlt, testimonial, videoUrl }: ClientTestimonialProps) => {
  const t = useTranslations('ProjectCaseStudies.testimonial');
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  return (
    <section className="py-16 lg:py-24 bg-background">
      <div className="max-w-5xl mx-auto px-6 lg:px-12">
        <div className="text-center mb-12">
          <h2 className="font-headline text-3xl lg:text-4xl font-headline-bold mb-4 text-white">
            {t('title')}
          </h2>
        </div>

        <div className="bg-card rounded-lg p-8 lg:p-12 shadow-architectural">
          <div className="flex flex-col items-center text-center mb-8">
            <div className="relative w-24 h-24 rounded-full overflow-hidden mb-4 shadow-elevated">
              <AppImage
                src={clientImage}
                alt={clientImageAlt}
                className="w-full h-full object-cover"
              />
            </div>

            <h3 className="text-xl font-headline-bold mb-1 text-yellow-300">
              {clientName}
            </h3>
            <p className="font-body text-sm text-text-secondary">
              {clientRole}
            </p>
          </div>

          <div className="relative mb-8">
            <Icon name="ChatBubbleLeftRightIcon" size={48} className="text-accent/20 absolute -top-4 -left-4" />
            <blockquote className="font-quote text-lg lg:text-xl text-text-primary leading-relaxed italic relative z-10 pl-8">
              {testimonial}
            </blockquote>
          </div>

          {videoUrl && (
            <div className="mt-8">
              {!isVideoPlaying ? (
                <button
                  onClick={() => setIsVideoPlaying(true)}
                  className="w-full relative h-64 lg:h-80 rounded-lg overflow-hidden group"
                >
                  <AppImage
                    src={clientImage}
                    alt={`Video testimonial thumbnail for ${clientName}`}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-smooth flex items-center justify-center">
                    <div className="w-20 h-20 rounded-full bg-accent flex items-center justify-center transition-smooth group-hover:scale-110">
                      <Icon name="PlayIcon" size={32} className="text-accent-foreground ml-1" />
                    </div>
                  </div>
                </button>
              ) : (
                <div className="relative h-64 lg:h-80 rounded-lg overflow-hidden">
                  <iframe
                    src={videoUrl}
                    className="w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    title={`Video testimonial from ${clientName}`}
                  />
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default ClientTestimonial;