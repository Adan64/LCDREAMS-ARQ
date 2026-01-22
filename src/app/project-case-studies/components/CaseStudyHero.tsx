import React from 'react';
import AppImage from '@/components/ui/AppImage';

interface CaseStudyHeroProps {
  title: string;
  category: string;
  location: string;
  year: string;
  heroImage: string;
  heroImageAlt: string;
}

const CaseStudyHero = ({ title, category, location, year, heroImage, heroImageAlt }: CaseStudyHeroProps) => {
  return (
    <section className="relative h-[60vh] lg:h-[70vh] w-full overflow-hidden bg-black">
      <div className="absolute inset-0">
        <AppImage
          src={heroImage}
          alt={heroImageAlt}
          className="w-full h-full object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/95 via-black/80 to-black/60" />
      </div>
      
      <div className="relative h-full flex items-end">
        <div className="w-full px-6 lg:px-12 pb-16">
          <div className="max-w-4xl">
            <div className="flex items-center space-x-4 mb-4">
              <span className="px-4 py-1.5 bg-accent/90 text-accent-foreground font-body text-sm font-body-semibold rounded-full">
                {category}
              </span>
              <span className="text-white/80 font-body text-sm">
                {location} • {year}
              </span>
            </div>
            <h1 className="font-headline text-5xl lg:text-7xl font-headline-bold text-lcdream-white mb-6 leading-tight">
              {title}
            </h1>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CaseStudyHero;