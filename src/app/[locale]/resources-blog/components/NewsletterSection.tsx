'use client';

import React, { useState } from 'react';
import Icon from '@/components/ui/AppIcon';

import { useTranslations } from 'next-intl';

const NewsletterSection = () => {
  const t = useTranslations('ResourcesBlog.newsletter');
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Newsletter subscription logic would be implemented here
    setTimeout(() => {
      setIsSubmitted(true);
      setIsSubmitting(false);
      setTimeout(() => {
        setIsSubmitted(false);
        setEmail('');
      }, 3000);
    }, 500);
  };

  return (
    <section className="py-20 lg:py-32 bg-gradient-to-br from-black via-lcdream-dark-bg to-black relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(212,175,55,0.1),transparent_50%)]" />
      <div className="max-w-4xl mx-auto px-6 lg:px-12 text-center">
        <div className="mb-8">
          <Icon name="EnvelopeIcon" size={48} className="text-accent mx-auto mb-4" />
          <h2 className="font-headline text-4xl lg:text-5xl font-headline-bold text-lcdream-white mb-6 leading-tight text-center">
            {t('title')}
          </h2>
          <p className="font-body text-lg text-lcdream-gray-light font-body-regular leading-relaxed text-center mb-10 max-w-2xl mx-auto">
            {t('description')}
          </p>
        </div>

        {isSubmitted ? (
          <div className="bg-success/20 border border-success text-white px-6 py-4 rounded-lg inline-flex items-center space-x-2">
            <Icon name="CheckCircleIcon" size={24} />
            <span className="font-body font-body-semibold">{t('success')}</span>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="max-w-xl mx-auto">
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t('placeholder')}
                required
                className="flex-1 px-6 py-4 bg-black border border-lcdream-gold/30 rounded-md sm:rounded-l-md sm:rounded-r-none font-body text-base text-lcdream-white placeholder-lcdream-gray-light focus:outline-none focus:ring-2 focus:ring-lcdream-gold focus:border-transparent transition-smooth"
              />
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-8 py-4 bg-lcdream-gold text-black font-cta text-base font-cta-semibold rounded-md sm:rounded-l-none sm:rounded-r-md transition-smooth hover:bg-lcdream-gold-light hover:shadow-gold disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? t('sending') : t('subscribe')}
              </button>
            </div>
            <p className="mt-4 font-body text-sm font-body-regular text-white/70">
              {t('disclaimer')}
            </p>
          </form>
        )}
      </div>
    </section>
  );
};

export default NewsletterSection;