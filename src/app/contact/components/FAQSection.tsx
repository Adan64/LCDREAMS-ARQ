'use client';

import React, { useState, useEffect } from 'react';
import Icon from '@/components/ui/AppIcon';

interface FAQ {
  id: string;
  question: string;
  answer: string;
}

interface FAQSectionProps {
  className?: string;
}

const FAQSection = ({ className = '' }: FAQSectionProps) => {
  const [isHydrated, setIsHydrated] = useState(false);
  const [openFAQ, setOpenFAQ] = useState<string | null>(null);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  const faqs: FAQ[] = [
    {
      id: '1',
      question: 'What should I prepare for the initial consultation?',
      answer: 'Bring any inspiration images, rough sketches, site photos, and a list of your requirements and budget range. We\'ll discuss your vision, timeline, and project scope to determine the best approach for your needs.'
    },
    {
      id: '2',
      question: 'How long does the design process typically take?',
      answer: 'The timeline varies based on project complexity. Residential projects typically take 3-6 months for design development, while commercial projects may require 6-12 months. We\'ll provide a detailed timeline during your consultation.'
    },
    {
      id: '3',
      question: 'Do you work on projects outside of Madrid?',
      answer: 'Yes, we work on projects throughout Spain and internationally. For projects outside Madrid, we may schedule additional site visits and coordinate with local contractors to ensure seamless execution.'
    },
    {
      id: '4',
      question: 'What are your fees and payment structure?',
      answer: 'Our fees are project-based and depend on scope, complexity, and services required. We typically structure payments in phases: initial consultation, design development, construction documentation, and construction administration. Detailed fee proposals are provided after the initial consultation.'
    },
    {
      id: '5',
      question: 'Can you help with permits and approvals?',
      answer: 'Absolutely. We handle all necessary permits, zoning approvals, and regulatory compliance as part of our comprehensive service. Our team has extensive experience navigating local building codes and regulations.'
    },
    {
      id: '6',
      question: 'Do you provide construction management services?',
      answer: 'Yes, we offer full construction administration services, including contractor selection, bid review, site supervision, and quality control throughout the construction phase to ensure your project is built according to design specifications.'
    }
  ];

  const toggleFAQ = (id: string) => {
    if (!isHydrated) return;
    setOpenFAQ(openFAQ === id ? null : id);
  };

  return (
    <section className={`py-16 lg:py-24 bg-card ${className}`}>
      <div className="max-w-4xl mx-auto px-6 lg:px-12">
        <div className="text-center mb-12">
          <h2 className="font-headline text-3xl md:text-4xl font-headline-bold text-primary mb-4">
            Frequently Asked Questions
          </h2>
          <p className="font-body text-lg text-text-secondary">
            Quick answers to common questions about our services and process
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq) => (
            <div
              key={faq.id}
              className="bg-background rounded-lg border border-border overflow-hidden transition-smooth hover:shadow-architectural"
            >
              <button
                onClick={() => toggleFAQ(faq.id)}
                disabled={!isHydrated}
                className="w-full px-6 py-4 flex items-center justify-between text-left transition-smooth hover:bg-muted disabled:opacity-50"
              >
                <span className="font-body text-base font-body-semibold text-primary pr-4">
                  {faq.question}
                </span>
                <Icon
                  name="ChevronDownIcon"
                  size={20}
                  className={`text-accent flex-shrink-0 transition-smooth ${
                    openFAQ === faq.id ? 'rotate-180' : ''
                  }`}
                />
              </button>
              
              {openFAQ === faq.id && (
                <div className="px-6 pb-4 pt-2 border-t border-border">
                  <p className="font-body text-base text-text-secondary leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="font-body text-base text-text-secondary mb-4">
            Still have questions? We're here to help.
          </p>
          <a
            href="mailto:contact@lcdream.arq"
            className="inline-flex items-center font-body text-base font-body-semibold text-accent hover:text-accent/80 transition-smooth"
          >
            <Icon name="EnvelopeIcon" size={18} className="mr-2" />
            Send us an email
          </a>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;