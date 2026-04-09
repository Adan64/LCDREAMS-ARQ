'use client';

import React, { useState } from 'react';
import { useTranslations } from 'next-intl';
import Icon from '@/components/ui/AppIcon';
import StyleQuizModal from '@/components/ui/StyleQuizModal';
import { motion } from 'framer-motion';

export default function StyleQuizBanner() {
  const t = useTranslations('Homepage.Quiz.banner');
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <section className="py-20 lg:py-24 bg-black relative overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(212,175,55,0.15),transparent_70%)]" />
        <div className="absolute top-0 right-0 w-64 h-64 bg-lcdream-gold/5 rounded-full blur-3xl opacity-50" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-lcdream-gold/5 rounded-full blur-3xl opacity-50" />

        <div className="max-w-5xl mx-auto px-6 lg:px-12 relative z-10">
          <div className="bg-lcdream-dark-bg/80 backdrop-blur-xl border border-lcdream-gold/30 rounded-3xl p-8 sm:p-12 lg:p-16 text-center shadow-gold relative overflow-hidden group">
            
            {/* Subtle hover effect on the box */}
            <div className="absolute inset-0 bg-lcdream-gold/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            
            <div className="relative z-10">
              <span className="inline-block px-4 py-1.5 bg-lcdream-gold/10 text-lcdream-gold border border-lcdream-gold/20 font-body text-xs sm:text-sm font-body-semibold rounded-full tracking-wider mb-6">
                {t('tag')}
              </span>
              
              <h2 className="font-headline text-3xl sm:text-4xl lg:text-5xl font-headline-bold text-white mb-6 leading-tight max-w-3xl mx-auto">
                {t('title')}
              </h2>
              
              <p className="font-body text-lcdream-gray-light text-base sm:text-lg lg:text-xl font-body-regular mb-10 max-w-2xl mx-auto leading-relaxed">
                {t('description')}
              </p>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsModalOpen(true)}
                className="inline-flex items-center justify-center px-8 py-5 bg-lcdream-gold text-black font-cta text-lg sm:text-xl font-cta-semibold rounded-md transition-smooth hover:shadow-gold hover:bg-lcdream-gold-light"
              >
                {t('button')}
                <Icon name="SparklesIcon" size={24} className="ml-3" />
              </motion.button>
            </div>
          </div>
        </div>
      </section>

      <StyleQuizModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </>
  );
}
