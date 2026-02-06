'use client';

import React, { useState } from 'react';
import Icon from '@/components/ui/AppIcon';
import { useTranslations } from 'next-intl';

interface OfficeLocationProps {
  className?: string;
}

const OfficeLocation = ({ className = '' }: OfficeLocationProps) => {
  const t = useTranslations('Contact.location');
  const [showMap, setShowMap] = useState(false);
  const [activeTab, setActiveTab] = useState('reception');

  const officeInfo = [
    {
      icon: 'MapPinIcon',
      title: t('addressTitle'),
      details: [t('items.address.0'), t('items.address.1')]
    },
    {
      icon: 'ClockIcon',
      title: t('hoursTitle'),
      details: [t('items.hours.0'), t('items.hours.1'), t('items.hours.2')]
    },
    {
      icon: 'TruckIcon',
      title: t('parkingTitle'),
      details: [t('items.parking.0'), t('items.parking.1'), t('items.parking.2'), t('items.parking.3')]
    },
    {
      icon: 'SparklesIcon',
      title: t('expectTitle'),
      details: [t('items.expect.0'), t('items.expect.1'), t('items.expect.2'), t('items.expect.3')]
    }
  ];

  const tourStops = [
    {
      id: 'reception',
      title: t('virtualTour.reception'),
      description: t('virtualTour.receptionDesc'),
      image: '/images/office/reception.jpg'
    },
    {
      id: 'library',
      title: t('virtualTour.library'),
      description: t('virtualTour.libraryDesc'),
      image: '/images/office/library.jpg'
    },
    {
      id: 'studio',
      title: t('virtualTour.studio'),
      description: t('virtualTour.studioDesc'),
      image: '/images/office/studio.jpg'
    }
  ];

  return (
    <section className={`py-20 lg:py-32 bg-gray-50 ${className}`}>
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          <div>
            <h2 className="font-headline text-4xl lg:text-5xl font-headline-bold text-primary mb-6 leading-tight">
              {t('title')}
            </h2>
            <p className="font-body text-xl text-text-secondary leading-relaxed mb-12">
              {t('description')}
            </p>

            <div className="grid sm:grid-cols-2 gap-8 mb-12">
              {officeInfo.map((info, index) => (
                <div key={index} className="space-y-4">
                  <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center">
                    <Icon name={info.icon as any} size={24} className="text-accent" />
                  </div>
                  <h3 className="font-headline text-lg font-headline-semibold text-primary">
                    {info.title}
                  </h3>
                  <ul className="space-y-2">
                    {info.details.map((detail, idx) => (
                      <li key={idx} className="font-body text-base text-text-secondary">
                        {detail}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="https://maps.google.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-6 py-3 font-cta text-base font-cta-semibold text-white bg-primary rounded-md transition-smooth hover:bg-primary/90"
              >
                {t('openMaps')}
                <Icon name="ArrowTopRightOnSquareIcon" size={20} className="ml-2" />
              </a>
              <button
                onClick={() => setShowMap(!showMap)}
                className="inline-flex items-center justify-center px-6 py-3 font-cta text-base font-cta-semibold text-primary border border-primary rounded-md transition-smooth hover:bg-primary/5"
              >
                {t('virtualTour.start')}
                <Icon name="VideoCameraIcon" size={20} className="ml-2" />
              </button>
            </div>
          </div>

          <div className="relative h-[600px] bg-gray-200 rounded-lg overflow-hidden shadow-lg">
            {showMap ? (
              <div className="absolute inset-0 bg-black/90 z-20 flex flex-col items-center justify-center p-8 text-white">
                <button
                  onClick={() => setShowMap(false)}
                  className="absolute top-4 right-4 p-2 hover:bg-white/10 rounded-full transition-colors"
                >
                  <Icon name="XMarkIcon" size={24} />
                </button>
                <div className="w-full max-w-2xl text-center">
                  <h3 className="font-headline text-2xl font-headline-bold mb-4">
                    {t('virtualTour.title')}
                  </h3>
                  <p className="font-body text-lg text-gray-300 mb-8">
                    {t('virtualTour.subtitle')}
                  </p>

                  <div className="grid grid-cols-3 gap-4 mb-8">
                    {tourStops.map((stop) => (
                      <button
                        key={stop.id}
                        onClick={() => setActiveTab(stop.id)}
                        className={`p-4 rounded-lg transition-all ${activeTab === stop.id
                          ? 'bg-accent text-white'
                          : 'bg-white/10 hover:bg-white/20'
                          }`}
                      >
                        <span className="block font-headline font-headline-semibold mb-1">
                          {stop.title}
                        </span>
                      </button>
                    ))}
                  </div>

                  <div className="bg-white/10 rounded-lg p-6 backdrop-blur-sm">
                    {tourStops.map((stop) => (
                      stop.id === activeTab && (
                        <div key={stop.id} className="animate-fade-in">
                          <h4 className="font-headline text-xl font-headline-semibold mb-2">
                            {stop.title}
                          </h4>
                          <p className="font-body text-gray-300">
                            {stop.description}
                          </p>
                        </div>
                      )
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="absolute inset-0 bg-gray-300 flex items-center justify-center">
                <p className="text-gray-500">Map Placeholder</p>
              </div>
            )}
          </div>
        </div>

        <div className="mt-20 p-12 bg-primary rounded-lg text-center">
          <h2 className="font-headline text-3xl font-headline-bold text-white mb-4">
            {t('cta.title')}
          </h2>
          <p className="font-body text-lg text-gray-300 max-w-2xl mx-auto mb-8">
            {t('cta.description')}
          </p>
          <a
            href="tel:+34912345678"
            className="inline-flex items-center justify-center px-8 py-4 font-cta text-base font-cta-semibold text-primary bg-white rounded-md transition-smooth hover:bg-gray-100"
          >
            {t('cta.button')}
          </a>
        </div>
      </div>
    </section>
  );
};

export default OfficeLocation;