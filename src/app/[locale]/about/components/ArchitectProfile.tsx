import React from 'react';
import AppImage from '@/components/ui/AppImage';

import { useTranslations } from 'next-intl';

interface ArchitectData {
  name: string;
  title: string;
  credentials: string;
  image: string;
  alt: string;
  bio: string[];
  specializations: string[];
}

interface ArchitectProfileProps {
  className?: string;
}

const ArchitectProfile = ({ className = '' }: ArchitectProfileProps) => {
  const t = useTranslations('About.profile');

  const bioKeys = ['0', '1', '2'];
  const specializationKeys = ['0', '1', '2', '3'];

  const architect: ArchitectData = {
    name: t('name'),
    title: t('title'),
    credentials: t('credentials'),
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_16091a4bc-1763293415295.png",
    alt: t('alt'),
    bio: bioKeys.map(key => t(`bio.${key}`)),
    specializations: specializationKeys.map(key => t(`specializations.${key}`))
  };

  return (
    <section className={`py-16 lg:py-24 bg-background ${className}`}>
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="relative">
            <div className="aspect-[4/5] relative overflow-hidden rounded-lg shadow-elevated">
              <AppImage
                src={architect.image}
                alt={architect.alt}
                fill
                className="object-cover" />

            </div>
            <div className="absolute -bottom-6 -right-6 w-48 h-48 bg-accent/10 rounded-lg -z-10"></div>
          </div>

          <div>
            <div className="mb-8">
              <h2 className="font-headline text-4xl lg:text-5xl font-headline-bold text-primary mb-3">
                {architect.name}
              </h2>
              <p className="font-body text-xl font-body-semibold text-accent mb-2">
                {architect.title}
              </p>
              <p className="font-body text-base font-body-regular text-secondary">
                {architect.credentials}
              </p>
            </div>

            <div className="space-y-4 mb-8">
              {architect.bio.map((paragraph, index) =>
                <p key={index} className="font-body text-base font-body-regular text-text-primary leading-relaxed">
                  {paragraph}
                </p>
              )}
            </div>

            <div>
              <h3 className="font-headline text-xl font-headline-semibold text-primary mb-4">
                {t('specializationsTitle')}
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {architect.specializations.map((spec, index) =>
                  <div key={index} className="flex items-start space-x-2">
                    <div className="w-1.5 h-1.5 bg-accent rounded-full mt-2 flex-shrink-0"></div>
                    <span className="font-body text-sm font-body-regular text-text-primary">
                      {spec}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>);

};

export default ArchitectProfile;