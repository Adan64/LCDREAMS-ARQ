import React from 'react';
import AppImage from '@/components/ui/AppImage';
import { useTranslations } from 'next-intl';

interface Material {
  name: string;
  description: string;
  image: string;
  imageAlt: string;
  properties: string[];
}

interface MaterialsShowcaseProps {
  materials: Material[];
}

const MaterialsShowcase = ({ materials }: MaterialsShowcaseProps) => {
  const t = useTranslations('ProjectCaseStudies.materials');
  return (
    <section className="py-16 lg:py-24 bg-muted">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="text-center mb-16">
          <h2 className="font-headline text-3xl lg:text-4xl font-headline-bold mb-4 text-white">
            {t('title')}
          </h2>
          <p className="font-body text-lg text-text-secondary max-w-3xl mx-auto">
            {t('description')}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {materials.map((material, index) => (
            <div key={index} className="bg-card rounded-lg overflow-hidden shadow-architectural transition-smooth hover:shadow-elevated hover:-translate-y-1">
              <div className="relative h-64 overflow-hidden">
                <AppImage
                  src={material.image}
                  alt={material.imageAlt}
                  className="w-full h-full object-cover transition-smooth hover:scale-105"
                />
              </div>

              <div className="p-6">
                <h3 className="font-headline text-xl font-headline-bold mb-3 text-yellow-300">
                  {material.name}
                </h3>

                <p className="font-body text-sm text-text-secondary mb-4 leading-relaxed">
                  {material.description}
                </p>

                <div className="space-y-2">
                  {material.properties.map((property, propIndex) => (
                    <div key={propIndex} className="flex items-center space-x-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-accent flex-shrink-0" />
                      <span className="font-body text-sm text-text-primary">
                        {property}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MaterialsShowcase;