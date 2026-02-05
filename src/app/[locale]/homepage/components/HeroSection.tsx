'use client';

import React, { useState, useEffect } from 'react';
import { Link } from '@/i18n/routing';
import AppImage from '@/components/ui/AppImage';
import Icon from '@/components/ui/AppIcon';
import { useTranslations } from 'next-intl';

interface Project {
  id: number;
  title: string;
  category: string;
  location: string;
  image: string;
  alt: string;
  description: string;
}

const HeroSection = () => {
  const t = useTranslations('Homepage.Hero');
  const [currentSlide, setCurrentSlide] = useState(0);

  const featuredProjects: Project[] = [
    {
      id: 1,
      title: t('slides.1.title'),
      category: t('slides.1.category'),
      location: t('slides.1.location'),
      image: "https://img.rocket.new/generatedImages/rocket_gen_img_1f0e7fb75-1767893206100.png",
      alt: "Modern white Mediterranean villa",
      description: t('slides.1.description')
    },
    {
      id: 2,
      title: t('slides.2.title'),
      category: t('slides.2.category'),
      location: t('slides.2.location'),
      image: "https://images.unsplash.com/photo-1605261810990-6b0c79de1175",
      alt: "Sleek modern glass office building",
      description: t('slides.2.description')
    },
    {
      id: 3,
      title: t('slides.3.title'),
      category: t('slides.3.category'),
      location: t('slides.3.location'),
      image: "https://images.unsplash.com/photo-1665522557472-bff4ff75c7d9",
      alt: "Minimalist urban home",
      description: t('slides.3.description')
    }
  ];


  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % featuredProjects.length);
    }, 6000);

    return () => clearInterval(interval);
  }, [featuredProjects.length]);

  const handlePrevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + featuredProjects.length) % featuredProjects.length);
  };

  const handleNextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % featuredProjects.length);
  };

  const handleDotClick = (index: number) => {
    setCurrentSlide(index);
  };

  return (
    <section className="relative h-screen w-full overflow-hidden">
      {featuredProjects.map((project, index) =>
        <div
          key={project.id}
          className={`absolute inset-0 transition-opacity duration-1000 ${index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'}`
          }>

          <div className="relative h-full w-full">
            <AppImage
              src={project.image}
              alt={project.alt}
              className="w-full h-full object-cover"
              priority={index === 0} />

            <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/70 to-transparent" />
          </div>

          <div className="absolute inset-0 flex items-center z-20">
            <div className="w-full px-6 lg:px-12 max-w-7xl mx-auto">
              <div className="max-w-3xl">
                <div className="mb-4 flex items-center space-x-3">
                  <span className="px-4 py-1.5 bg-lcdream-gold text-black font-body text-sm font-body-semibold rounded-full shadow-gold">
                    {project.category}
                  </span>
                  <span className="flex items-center text-lcdream-white font-body text-sm">
                    <Icon name="MapPinIcon" size={16} className="mr-1" />
                    {project.location}
                  </span>
                </div>

                <h1 className="font-headline text-5xl lg:text-7xl font-headline-bold text-lcdream-white mb-6 leading-tight">
                  {project.title}
                </h1>

                <p className="font-body text-xl lg:text-2xl text-lcdream-gray-light font-body-regular mb-8 leading-relaxed">
                  {project.description}
                </p>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Link
                    href="/portfolio-gallery"
                    className="inline-flex items-center justify-center px-8 py-4 bg-lcdream-gold text-black font-cta text-base font-cta-semibold rounded-md transition-smooth hover:bg-lcdream-gold-light hover:shadow-gold hover:-translate-y-0.5">

                    {t('cta.portfolio')}
                    <Icon name="ArrowRightIcon" size={20} className="ml-2" />
                  </Link>
                  <Link
                    href="/contact"
                    className="inline-flex items-center justify-center px-8 py-4 bg-lcdream-white/10 backdrop-blur-sm text-lcdream-white border-2 border-lcdream-gold/50 font-cta text-base font-cta-semibold rounded-md transition-smooth hover:bg-lcdream-white/20 hover:border-lcdream-gold">

                    {t('cta.schedule')}
                    <Icon name="CalendarIcon" size={20} className="ml-2" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <button
        onClick={handlePrevSlide}
        className="absolute left-6 top-1/2 -translate-y-1/2 z-30 w-12 h-12 flex items-center justify-center bg-lcdream-gold/20 backdrop-blur-sm text-lcdream-gold rounded-full transition-smooth hover:bg-lcdream-gold/30 hover:scale-110 border border-lcdream-gold/30"
        aria-label={t('aria.prev')}>

        <Icon name="ChevronLeftIcon" size={24} />
      </button>

      <button
        onClick={handleNextSlide}
        className="absolute right-6 top-1/2 -translate-y-1/2 z-30 w-12 h-12 flex items-center justify-center bg-lcdream-gold/20 backdrop-blur-sm text-lcdream-gold rounded-full transition-smooth hover:bg-lcdream-gold/30 hover:scale-110 border border-lcdream-gold/30"
        aria-label={t('aria.next')}>

        <Icon name="ChevronRightIcon" size={24} />
      </button>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex items-center space-x-3">
        {featuredProjects.map((_, index) =>
          <button
            key={index}
            onClick={() => handleDotClick(index)}
            className={`w-3 h-3 rounded-full transition-smooth ${index === currentSlide ?
                'bg-lcdream-gold w-8 shadow-gold' :
                'bg-lcdream-white/40 hover:bg-lcdream-white/60'}`
            }
            aria-label={t('aria.dot', { index: index + 1 })} />

        )}
      </div>
    </section>);

};

export default HeroSection;