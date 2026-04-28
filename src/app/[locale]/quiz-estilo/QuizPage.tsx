'use client';

import React from 'react';
import StyleQuizModal from '@/components/ui/StyleQuizModal';
import { useTranslations } from 'next-intl';

export default function QuizPage() {
  const t = useTranslations('Homepage.Quiz.modal');

  return (
    <div className="min-h-screen bg-black pt-24 pb-12 bg-grid-white/[0.02] relative">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(212,175,55,0.05),transparent_70%)] pointer-events-none" />
      <div className="max-w-4xl mx-auto px-4 relative z-10">
        <div className="text-center mb-8">
          <h1 className="font-headline text-3xl sm:text-4xl text-white font-headline-bold mb-4">
            {t('title')}
          </h1>
          <p className="font-body text-lcdream-gray-light max-w-2xl mx-auto">
            {t('introSubtitle')}
          </p>
        </div>
        
        <StyleQuizModal 
          isOpen={true} 
          onClose={() => {}} 
          isEmbedded={true} 
        />
      </div>
    </div>
  );
}
