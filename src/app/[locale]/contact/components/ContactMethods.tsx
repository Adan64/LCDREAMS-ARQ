'use client';

import React, { useState, useEffect } from 'react';
import Icon from '@/components/ui/AppIcon';
import { useTranslations } from 'next-intl';

interface ContactMethod {
  id: string;
  icon: string;
  title: string;
  description: string;
  value: string;
  action: string;
  href: string;
}

interface ContactMethodsProps {
  className?: string;
}

const ContactMethods = ({ className = '' }: ContactMethodsProps) => {
  const t = useTranslations('Contact.methods');
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  const contactMethods: ContactMethod[] = [
    {
      id: '1',
      icon: 'PhoneIcon',
      title: t('phone.title'),
      description: t('phone.desc'),
      value: '+595 971 954 037',
      action: t('phone.action'),
      href: 'tel:+595971954037'
    },
    {
      id: '2',
      icon: 'EnvelopeIcon',
      title: t('email.title'),
      description: t('email.desc'),
      value: 'badan4074@gmail.com',
      action: t('email.action'),
      href: 'mailto:badan4074@gmail.com'
    },
    {
      id: '3',
      icon: 'ChatBubbleLeftRightIcon',
      title: t('chat.title'),
      description: t('chat.desc'),
      value: 'WhatsApp',
      action: t('chat.action'),
      href: 'https://wa.me/595971954037'
    },
    {
      id: '4',
      icon: 'MapPinIcon',
      title: t('visit.title'),
      description: t('visit.desc'),
      value: 'Madrid, España',
      action: t('visit.action'),
      href: 'https://maps.google.com/?q=Madrid,España'
    }
  ];

  const handleMethodClick = (method: ContactMethod) => {
    if (!isHydrated) return;

    if (method.action === 'WhatsApp' || method.id === '3') {
      window.open(method.href, '_blank');
    }
  };

  return (
    <section className="py-20 lg:py-32 bg-lcdream-dark-bg">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="text-center mb-12">
          <h2 className="font-headline text-4xl lg:text-5xl font-headline-bold text-lcdream-white mb-12 leading-tight text-center">
            {t('title')}
          </h2>
          <p className="font-body text-lg text-text-secondary max-w-2xl mx-auto">
            {t('description')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {contactMethods.map((method) => (
            <div
              key={method.id}
              className="bg-black rounded-lg p-8 text-center shadow-subtle border border-lcdream-gold/10 hover:border-lcdream-gold/30 transition-smooth group"
            >
              <div className="flex flex-col h-full">
                <div className="w-16 h-16 bg-lcdream-gold/10 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-lcdream-gold/20 transition-smooth border border-lcdream-gold/30">
                  <Icon name={method.icon as any} size={32} className="text-lcdream-gold" />
                </div>

                <h3 className="font-headline text-xl font-headline-semibold text-lcdream-white mb-3 group-hover:text-lcdream-gold transition-smooth">
                  {method.title}
                </h3>

                <p className="font-body text-sm text-text-secondary mb-3">
                  {method.description}
                </p>

                <p className="font-body text-base text-lcdream-gray-light font-body-regular leading-relaxed mb-4">
                  {method.value}
                </p>

                <div className="mt-auto">
                  {method.id === '3' ? (
                    <button
                      onClick={() => handleMethodClick(method)}
                      disabled={!isHydrated}
                      className="w-full inline-flex items-center justify-center px-4 py-2 font-cta text-sm font-cta-semibold text-accent border border-accent rounded-md transition-smooth hover:bg-accent hover:text-accent-foreground disabled:opacity-50"
                    >
                      {method.action}
                      <Icon name="ArrowRightIcon" size={16} className="ml-2" />
                    </button>
                  ) : (
                    <a
                      href={method.href}
                      target={method.id === '4' ? '_blank' : undefined}
                      rel={method.id === '4' ? 'noopener noreferrer' : undefined}
                      className="w-full inline-flex items-center justify-center px-4 py-2 font-cta text-sm font-cta-semibold text-accent border border-accent rounded-md transition-smooth hover:bg-accent hover:text-accent-foreground"
                    >
                      {method.action}
                      <Icon name="ArrowRightIcon" size={16} className="ml-2" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
export default ContactMethods;