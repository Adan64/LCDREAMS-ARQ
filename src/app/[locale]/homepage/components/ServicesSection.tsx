import React from 'react';
import { Link } from '@/i18n/routing';
import Icon from '@/components/ui/AppIcon';
import { useTranslations } from 'next-intl';

interface Service {
  id: number;
  icon: string;
  title: string;
  description: string;
  features: string[];
}

const ServicesSection = () => {
  const t = useTranslations('Homepage.Services');

  const services: Service[] = [
    {
      id: 1,
      icon: "HomeModernIcon",
      title: t('items.1.title'),
      description: t('items.1.description'),
      features: [t('items.1.features.0'), t('items.1.features.1'), t('items.1.features.2')]
    },
    {
      id: 2,
      icon: "BuildingOfficeIcon",
      title: t('items.2.title'),
      description: t('items.2.description'),
      features: [t('items.2.features.0'), t('items.2.features.1'), t('items.2.features.2')]
    },
    {
      id: 3,
      icon: "MapIcon",
      title: t('items.3.title'),
      description: t('items.3.description'),
      features: [t('items.3.features.0'), t('items.3.features.1'), t('items.3.features.2')]
    }
  ];

  return (
    <section className="py-20 lg:py-32 bg-black">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="text-center mb-16">
          <h2 className="font-headline text-4xl lg:text-5xl font-headline-bold text-lcdream-white mb-6 leading-tight text-center">
            {t('title')}
          </h2>
          <p className="font-body text-lg lg:text-xl text-lcdream-gray-light font-body-regular leading-relaxed text-center max-w-3xl mx-auto">
            {t('subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {services.map((service) => (
            <div
              key={service.id}
              className="group bg-lcdream-dark-bg rounded-lg p-8 shadow-subtle transition-smooth hover:shadow-gold hover:-translate-y-2 border border-lcdream-gold/10 hover:border-lcdream-gold/30"
            >
              <div className="w-16 h-16 bg-lcdream-gold/10 rounded-lg flex items-center justify-center mb-6 group-hover:bg-lcdream-gold/20 transition-smooth border border-lcdream-gold/20">
                <Icon name={service.icon as any} size={32} className="text-lcdream-gold" />
              </div>

              <h3 className="font-headline text-2xl font-headline-semibold text-lcdream-white mb-4 group-hover:text-lcdream-gold transition-smooth">
                {service.title}
              </h3>

              <p className="font-body text-base text-lcdream-gray-light font-body-regular leading-relaxed mb-6">
                {service.description}
              </p>

              <ul className="space-y-3 mb-6">
                {service.features.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <Icon
                      name="CheckCircleIcon"
                      size={20}
                      className="text-lcdream-gold mr-2 mt-0.5 flex-shrink-0"
                    />
                    <span className="font-body text-sm text-lcdream-gray-light font-body-regular">
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              <Link
                href="/services"
                className="inline-flex items-center font-body text-sm font-body-semibold text-lcdream-gold transition-smooth group-hover:translate-x-1"
              >
                {t('cta.learnMore')}
                <Icon name="ArrowRightIcon" size={16} className="ml-1" />
              </Link>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Link
            href="/services"
            className="inline-flex items-center px-8 py-4 bg-lcdream-gold text-lcdream-foreground font-cta text-base font-cta-semibold rounded-md transition-smooth hover:bg-lcdream-gold/90 hover:shadow-architectural hover:-translate-y-0.5"
          >
            {t('cta.viewAll')}
            <Icon name="ArrowRightIcon" size={20} className="ml-2" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;