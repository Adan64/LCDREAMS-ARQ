'use client';

import React, { useState } from 'react';
import Icon from '@/components/ui/AppIcon';
import { useTranslations } from 'next-intl';

interface FAQSectionProps {
  className?: string;
}

const FAQSection = ({ className = '' }: FAQSectionProps) => {
  const t = useTranslations('Contact.faq');
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const faqs = [
    {
      question: t('items.1.question'),
      answer: t('items.1.answer')
    },
    {
      question: t('items.2.question'),
      answer: t('items.2.answer')
    },
    {
      question: t('items.3.question'),
      answer: t('items.3.answer')
    },
    {
      question: t('items.4.question'),
      answer: t('items.4.answer')
    },
    {
      question: t('items.5.question'),
      answer: t('items.5.answer')
    },
    {
      question: t('items.6.question'),
      answer: t('items.6.answer')
    }
  ];

  return (
    <section className={`py-20 lg:py-32 bg-lcdream-dark-bg border-t border-lcdream-gold/10 ${className}`}>
      <div className="max-w-4xl mx-auto px-6 lg:px-12">
        <div className="text-center mb-16">
          <h2 className="font-headline text-3xl lg:text-4xl font-headline-bold text-lcdream-gold mb-4">
            {t('title')}
          </h2>
          <p className="font-body text-xl text-lcdream-gray-light">
            {t('description')}
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className={`border rounded-lg overflow-hidden transition-all duration-300 ${openIndex === index ? 'shadow-md border-lcdream-gold' : 'border-lcdream-gold/20 hover:border-lcdream-gold/50'
                }`}
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full flex items-center justify-between p-6 text-left bg-black/20 focus:outline-none"
              >
                <span className={`font-headline text-lg font-headline-semibold transition-colors ${openIndex === index ? 'text-lcdream-gold' : 'text-white'
                  }`}>
                  {faq.question}
                </span>
                <span className={`flex-shrink-0 ml-4 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${openIndex === index ? 'bg-lcdream-gold text-black rotate-180' : 'bg-lcdream-gray-dark text-lcdream-gray-light'
                  }`}>
                  <Icon name="ChevronDownIcon" size={16} />
                </span>
              </button>

              <div
                className={`overflow-hidden transition-all duration-300 ease-in-out ${openIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                  }`}
              >
                <div className="p-6 pt-0 border-t border-transparent">
                  <p className="font-body text-base text-lcdream-gray-light leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <p className="font-body text-lg text-lcdream-gray-light mb-4">
            {t('footer')}
          </p>
          <a
            href="mailto:info@lcdream.arq"
            className="inline-flex items-center font-cta text-base font-cta-semibold text-lcdream-gold hover:text-lcdream-gold-light transition-smooth"
          >
            {t('email')}
            <Icon name="ArrowRightIcon" size={16} className="ml-2" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;