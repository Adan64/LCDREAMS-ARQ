'use client';

import React, { useState } from 'react';
import { useTranslations } from 'next-intl';
import Icon from '@/components/ui/AppIcon';

export default function DirectContactForm() {
  const t = useTranslations('Homepage.ContactForm');
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('sending');
    const form = e.currentTarget;
    const data = new FormData(form);

    try {
      // Usamos un formspree genérico de demostración temporal. 
      // Reemplaza "x..." con el hash de tu cuenta real de Formspree.
      const response = await fetch('https://formspree.io/f/mqbqpnwd', {
        method: 'POST',
        body: data,
        headers: {
          'Accept': 'application/json'
        }
      });
      if (response.ok) {
        setStatus('success');
        form.reset();
      } else {
        setStatus('error');
      }
    } catch (error) {
      setStatus('error');
    }
  };

  return (
    <div className="bg-lcdream-dark-bg/80 backdrop-blur-md p-8 lg:p-10 rounded-xl border border-lcdream-gold/20 shadow-elevated relative overflow-hidden">
      {/* Decoro de fondo */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-lcdream-gold/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-32 h-32 bg-lcdream-gold/5 rounded-full blur-3xl" />

      {status === 'success' ? (
        <div className="flex flex-col items-center justify-center py-12 text-center h-full relative z-10">
          <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mb-6">
            <Icon name="CheckCircleIcon" size={32} className="text-green-500" />
          </div>
          <h3 className="font-headline text-2xl font-headline-semibold text-lcdream-white mb-2">
            {t('successTitle')}
          </h3>
          <p className="font-body text-lcdream-gray-light">
            {t('successMessage')}
          </p>
          <button 
            onClick={() => setStatus('idle')}
            className="mt-8 text-lcdream-gold font-body text-sm hover:underline"
          >
            Enviar otro mensaje
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6 relative z-10 w-full">
          <div>
            <label htmlFor="name" className="block text-sm font-body text-lcdream-gray-light mb-2">
              {t('name')} *
            </label>
            <input
              type="text"
              id="name"
              name="name"
              required
              className="w-full bg-black border border-lcdream-gold/30 rounded-md px-4 py-3 text-lcdream-white focus:outline-none focus:border-lcdream-gold focus:ring-1 focus:ring-lcdream-gold transition-colors font-body"
              placeholder="Ej. John Doe"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="email" className="block text-sm font-body text-lcdream-gray-light mb-2">
                {t('email')} *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                className="w-full bg-black border border-lcdream-gold/30 rounded-md px-4 py-3 text-lcdream-white focus:outline-none focus:border-lcdream-gold focus:ring-1 focus:ring-lcdream-gold transition-colors font-body"
                placeholder="email@empresa.com"
              />
            </div>
            <div>
              <label htmlFor="phone" className="block text-sm font-body text-lcdream-gray-light mb-2">
                {t('phone')}
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                className="w-full bg-black border border-lcdream-gold/30 rounded-md px-4 py-3 text-lcdream-white focus:outline-none focus:border-lcdream-gold focus:ring-1 focus:ring-lcdream-gold transition-colors font-body"
                placeholder="+595 9XX XXX XXX"
              />
            </div>
          </div>

          <div>
            <label htmlFor="message" className="block text-sm font-body text-lcdream-gray-light mb-2">
              {t('message')} *
            </label>
            <textarea
              id="message"
              name="message"
              required
              rows={4}
              className="w-full bg-black border border-lcdream-gold/30 rounded-md px-4 py-3 text-lcdream-white focus:outline-none focus:border-lcdream-gold focus:ring-1 focus:ring-lcdream-gold transition-colors font-body resize-none"
              placeholder={t('message')}
            ></textarea>
          </div>

          {status === 'error' && (
            <div className="text-red-400 text-sm font-body p-3 bg-red-900/20 rounded border border-red-500/30 flex items-center">
               <Icon name="ExclamationCircleIcon" size={16} className="mr-2" />
              {t('errorTitle')}: {t('errorMessage')}
            </div>
          )}

          <button
            type="submit"
            disabled={status === 'sending'}
            className="w-full inline-flex items-center justify-center px-8 py-4 bg-lcdream-gold text-black font-cta text-base font-cta-semibold rounded-md transition-smooth hover:bg-lcdream-gold-light hover:shadow-gold disabled:opacity-70 disabled:cursor-not-allowed group duration-300"
          >
            {status === 'sending' ? (
              <span className="flex items-center">
                 <Icon name="ArrowPathIcon" size={20} className="mr-2 animate-spin" />
                 {t('sending')}
              </span>
            ) : (
              <span className="flex items-center">
                 {t('submit')}
                 <Icon name="PaperAirplaneIcon" size={20} className="ml-2 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </span>
            )}
          </button>
        </form>
      )}
    </div>
  );
}
