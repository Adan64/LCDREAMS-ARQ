'use client';

import React, { useState } from 'react';
import AppImage from '@/components/ui/AppImage';
import Icon from '@/components/ui/AppIcon';
import { useTranslations } from 'next-intl';

interface GalleryImage {
  url: string;
  alt: string;
  caption: string;
}

interface ProjectGalleryProps {
  images: GalleryImage[];
}

const ProjectGallery = ({ images }: ProjectGalleryProps) => {
  const t = useTranslations('ProjectCaseStudies.gallery');
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  const openLightbox = (index: number) => {
    setSelectedImage(index);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setSelectedImage(null);
    document.body.style.overflow = 'unset';
  };

  const navigateImage = (direction: 'prev' | 'next') => {
    if (selectedImage === null) return;

    if (direction === 'prev') {
      setSelectedImage(selectedImage === 0 ? images.length - 1 : selectedImage - 1);
    } else {
      setSelectedImage(selectedImage === images.length - 1 ? 0 : selectedImage + 1);
    }
  };

  return (
    <section className="py-16 lg:py-24 bg-background">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-headline-bold mb-4 text-neutral-50">
            {t('title')}
          </h2>
          <p className="font-body text-lg text-text-secondary">
            {t('description')}
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {images.map((image, index) =>
            <button
              key={index}
              onClick={() => openLightbox(index)}
              className="relative h-80 rounded-lg overflow-hidden group cursor-pointer">

              <AppImage
                src={image.url}
                alt={image.alt}
                className="w-full h-full object-cover transition-smooth group-hover:scale-105" />

              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-smooth flex items-end p-6">
                <p className="font-body text-sm text-white">
                  {image.caption}
                </p>
              </div>
            </button>
          )}
        </div>
      </div>

      {selectedImage !== null &&
        <div className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4">
          <button
            onClick={closeLightbox}
            className="absolute top-6 right-6 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 transition-smooth flex items-center justify-center"
            aria-label={t('controls.close')}>

            <Icon name="XMarkIcon" size={24} className="text-white" />
          </button>

          <button
            onClick={() => navigateImage('prev')}
            className="absolute left-6 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 transition-smooth flex items-center justify-center"
            aria-label={t('controls.prev')}>

            <Icon name="ChevronLeftIcon" size={24} className="text-white" />
          </button>

          <button
            onClick={() => navigateImage('next')}
            className="absolute right-6 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 transition-smooth flex items-center justify-center"
            aria-label={t('controls.next')}>

            <Icon name="ChevronRightIcon" size={24} className="text-white" />
          </button>

          <div className="max-w-6xl w-full">
            <div className="relative h-[70vh] rounded-lg overflow-hidden mb-4">
              <AppImage
                src={images[selectedImage].url}
                alt={images[selectedImage].alt}
                className="w-full h-full object-contain" />

            </div>
            <p className="font-body text-base text-white text-center">
              {images[selectedImage].caption}
            </p>
            <p className="font-body text-sm text-white/60 text-center mt-2">
              {selectedImage + 1} / {images.length}
            </p>
          </div>
        </div>
      }
    </section>);

};

export default ProjectGallery;