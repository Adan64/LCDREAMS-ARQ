'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslations } from 'next-intl';
import Icon from '@/components/ui/AppIcon';

interface StyleQuizModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type OptionKey = 'A' | 'B' | 'C' | 'D';
type ResultKey = 'Minimalista' | 'Sustentable' | 'Contemporaneo' | 'Industrial';

export default function StyleQuizModal({ isOpen, onClose }: StyleQuizModalProps) {
  const t = useTranslations('Homepage.Quiz.modal');
  const [step, setStep] = useState(0); // 0 = start, 1-5 = questions, 6 = processing, 7 = result
  const [answers, setAnswers] = useState<OptionKey[]>([]);
  const [selectedOption, setSelectedOption] = useState<OptionKey | null>(null);
  const [finalResult, setFinalResult] = useState<ResultKey>('Minimalista');
  const [formStatus, setFormStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  // Reset state when modal is opened/closed
  useEffect(() => {
    if (!isOpen) {
      setTimeout(() => {
        setStep(0);
        setAnswers([]);
        setFormStatus('idle');
      }, 300);
    }
  }, [isOpen]);

  // Handle auto-progress when analyzing
  useEffect(() => {
    if (step === 6) {
      // Calculate result based on first 4 questions only (Q5 is about plot)
      const counts = { A: 0, B: 0, C: 0, D: 0 };
      answers.slice(0, 4).forEach(a => { if (a) counts[a]++ });
      let maxKey: OptionKey = 'A';
      let maxCount = 0;
      (Object.keys(counts) as OptionKey[]).forEach(k => {
        if (counts[k] > maxCount) {
          maxCount = counts[k];
          maxKey = k;
        }
      });
      
      const resultMap: Record<OptionKey, ResultKey> = {
        A: 'Minimalista',
        B: 'Sustentable',
        C: 'Contemporaneo',
        D: 'Industrial'
      };

      setFinalResult(resultMap[maxKey]);

      const timer = setTimeout(() => {
        setStep(7);
      }, 2500);
      return () => clearTimeout(timer);
    }
  }, [step, answers]);

  const handleOptionSelect = (option: OptionKey) => {
    setSelectedOption(option);
    setTimeout(() => {
      setAnswers(prev => {
        const newAnswers = [...prev];
        newAnswers[step - 1] = option;
        return newAnswers;
      });
      setStep(s => s + 1);
      setSelectedOption(null);
    }, 400); // 400ms delay to show the checkmark and animation
  };

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormStatus('sending');
    const form = e.currentTarget;
    const data = new FormData(form);

    // Add Q5 answer manually (if it exists)
    const q5Answer = answers[4] ? String(t(`questions.5.options.${answers[4]}` as any)) : 'No especificado';
    data.append('terreno', q5Answer);
    data.append('quiz_result', String(t(`results.${finalResult}`)));
    data.append('subject', 'Nuevo Lead - Test de Estilo Arquitectónico');

    // Preparar el Payload
    const payload = {
      name: data.get('name'),
      email: data.get('email'),
      phone: data.get('phone'),
      styleResult: String(t(`results.${finalResult}`)),
      landStatus: q5Answer
    };

    try {
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });
      
      const responseData = await response.json();

      if (response.ok && responseData.success) {
        setFormStatus('success');
      } else {
        setFormStatus('error');
        console.error("API Error: ", responseData);
      }
    } catch (error) {
      console.error('Error enviando lead:', error);
      setFormStatus('error');
    }
  };

  if (!isOpen) return null;

  const containerVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.4, ease: "easeOut" } },
    exit: { opacity: 0, scale: 0.95, transition: { duration: 0.3 } }
  };

  const contentVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.4, delay: 0.1 } },
    exit: { opacity: 0, x: -20, transition: { duration: 0.3 } }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 overflow-hidden">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/60 backdrop-blur-md"
        />

        {/* Modal Container */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="relative w-full max-w-2xl bg-lcdream-dark-bg border border-lcdream-gold/20 rounded-2xl shadow-elevated overflow-hidden flex flex-col max-h-[90vh]"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 w-10 h-10 flex items-center justify-center rounded-full bg-black/50 text-lcdream-gray-light hover:text-white transition-colors"
          >
            <Icon name="XMarkIcon" size={24} />
          </button>

          {/* Progress Bar (only in questions) */}
          {step > 0 && step < 6 && (
            <div className="absolute top-0 left-0 w-full h-1 bg-lcdream-gold/10">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${(step / 5) * 100}%` }}
                className="h-full bg-lcdream-gold"
              />
            </div>
          )}

          <div className="p-8 sm:p-12 flex-1 overflow-y-auto custom-scrollbar relative z-0">
            <AnimatePresence mode="wait">
              {/* STEP 0: INTRO */}
              {step === 0 && (
                <motion.div
                  key="step-0"
                  variants={contentVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="flex flex-col items-center justify-center h-full text-center py-10"
                >
                  <div className="w-20 h-20 bg-lcdream-gold/10 rounded-full flex items-center justify-center mb-6">
                    <Icon name="SparklesIcon" size={40} className="text-lcdream-gold" />
                  </div>
                  <h2 className="font-headline text-3xl sm:text-4xl font-headline-bold text-white mb-4">
                    {t('title')}
                  </h2>
                  <p className="font-body text-lcdream-gray-light text-lg mb-10 max-w-md mx-auto">
                    {t('introSubtitle')}
                  </p>
                  <button
                    onClick={() => setStep(1)}
                    className="px-8 py-4 bg-lcdream-gold text-black font-cta text-base font-cta-semibold rounded-md transition-smooth hover:bg-lcdream-gold-light hover:shadow-gold flex items-center"
                  >
                    {t('buttons.start')}
                    <Icon name="ArrowRightIcon" size={20} className="ml-2" />
                  </button>
                </motion.div>
              )}

              {/* STEPS 1-5: QUESTIONS */}
              {step > 0 && step < 6 && (
                <motion.div
                  key={`step-${step}`}
                  variants={contentVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="flex flex-col h-full justify-center py-4"
                >
                  <span className="text-lcdream-gold font-body text-sm font-body-semibold uppercase tracking-wider mb-4 block">
                    Pregunta {step} de 5
                  </span>
                  <h3 className="font-headline text-2xl sm:text-3xl font-headline-semibold text-white mb-8 leading-tight">
                    {t(`questions.${step}.question` as any)}
                  </h3>
                  
                  <div className={`grid gap-4 ${step === 5 ? 'grid-cols-1' : 'grid-cols-1 sm:grid-cols-2'}`}>
                    {(step === 5 ? ['A', 'B', 'C'] as OptionKey[] : ['A', 'B', 'C', 'D'] as OptionKey[]).map((option) => {
                      const dynamicImages: Record<number, Record<string, string>> = {
                        1: {
                          A: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=600&auto=format&fit=crop',
                          B: 'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=600&auto=format&fit=crop',
                          C: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=600&auto=format&fit=crop',
                          D: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=600&auto=format&fit=crop'
                        },
                        2: {
                          A: 'https://images.unsplash.com/photo-1517646287270-a5a9ca602518?q=80&w=600&auto=format&fit=crop', // Concrete texture close-up
                          B: 'https://images.unsplash.com/photo-1546412414-8035e1776c9a?q=80&w=600&auto=format&fit=crop', // Wood texture
                          C: 'https://images.unsplash.com/photo-1509343256512-d77a5cb3791d?q=80&w=600&auto=format&fit=crop', // Glass/steel facade texture
                          D: 'https://images.unsplash.com/photo-1534430480872-3498386e7856?q=80&w=600&auto=format&fit=crop' // Brick texture
                        },
                        3: {
                          A: 'https://images.unsplash.com/photo-1616486029423-aaa4789e8c9a?q=80&w=600&auto=format&fit=crop', // Minimalist living
                          B: 'https://images.unsplash.com/photo-1600607686527-6fb886090705?q=80&w=600&auto=format&fit=crop',
                          C: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?q=80&w=600&auto=format&fit=crop',
                          D: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=600&auto=format&fit=crop'
                        },
                        4: {
                          A: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=600&auto=format&fit=crop',
                          B: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=600&auto=format&fit=crop',
                          C: 'https://images.unsplash.com/photo-1511216335778-7cb8f49fa7a3?q=80&w=600&auto=format&fit=crop',
                          D: 'https://images.unsplash.com/photo-1448630360428-65456885c650?q=80&w=600&auto=format&fit=crop'
                        }
                      };
                      
                      const imageUrl = step < 5 ? dynamicImages[step][option] : '';
                      const isSelected = selectedOption === option;

                      return (
                        <button
                          key={option}
                          onClick={() => !selectedOption && handleOptionSelect(option)}
                          className={`w-full text-left rounded-xl border transition-all group overflow-hidden relative
                            ${isSelected ? 'border-green-500 ring-1 ring-green-500' : 'border-lcdream-white/10 hover:border-lcdream-gold'}
                            ${step === 5 ? 'p-6 bg-black/40 hover:bg-lcdream-white/5 flex items-center' : 'h-40 sm:h-48'}`}
                        >
                          {step < 5 && (
                            <>
                              <div 
                                className={`absolute inset-0 bg-cover bg-center transition-all duration-700 opacity-40
                                  ${isSelected ? 'scale-110 opacity-60' : 'group-hover:scale-110 group-hover:opacity-50'}`}
                                style={{ backgroundImage: `url(${imageUrl})` }}
                              />
                              <div className={`absolute inset-0 bg-gradient-to-t transition-colors duration-500
                                ${isSelected ? 'from-green-900/80 via-black/70 to-transparent' : 'from-black via-black/80 to-transparent'}`} 
                              />
                            </>
                          )}
                          <div className={`relative z-10 flex items-center justify-between w-full h-full ${step === 5 ? '' : 'p-6 items-end'}`}>
                            <div className="flex items-center w-full">
                              <div className={`w-8 h-8 rounded-full border flex items-center justify-center mr-4 flex-shrink-0 backdrop-blur-sm transition-colors duration-500
                                ${isSelected ? 'border-green-500 text-green-500 bg-green-500/10' : 'border-lcdream-white/50 text-white group-hover:border-lcdream-gold group-hover:text-lcdream-gold bg-black/50'}`}>
                                {option}
                              </div>
                              <span className={`font-body font-body-medium transition-colors text-base sm:text-lg
                                ${isSelected ? 'text-white' : 'text-lcdream-white group-hover:text-white'}`}>
                                {t(`questions.${step}.options.${option}` as any)}
                              </span>
                            </div>

                            {/* Checkmark animation on select */}
                            <AnimatePresence>
                              {isSelected && (
                                <motion.div
                                  initial={{ scale: 0, opacity: 0 }}
                                  animate={{ scale: 1, opacity: 1 }}
                                  exit={{ scale: 0, opacity: 0 }}
                                  className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0 ml-4"
                                >
                                  <Icon name="CheckIcon" size={14} className="text-white" />
                                </motion.div>
                              )}
                            </AnimatePresence>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </motion.div>
              )}

              {/* STEP 6: PROCESSING */}
              {step === 6 && (
                <motion.div
                  key="step-6"
                  variants={contentVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="flex flex-col items-center justify-center h-full text-center py-20"
                >
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                    className="w-16 h-16 border-4 border-lcdream-gold/30 border-t-lcdream-gold rounded-full mb-8"
                  />
                  <h3 className="font-headline text-2xl text-white">
                    {t('processing')}
                  </h3>
                </motion.div>
              )}

              {/* STEP 7: RESULT & FORM */}
              {step === 7 && (
                <motion.div
                  key="step-6"
                  variants={contentVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="flex flex-col h-full py-4 text-center"
                >
                  {formStatus === 'success' ? (
                    <div className="flex flex-col items-center justify-center py-10">
                      <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mb-6">
                        <Icon name="CheckCircleIcon" size={40} className="text-green-500" />
                      </div>
                      <h3 className="font-headline text-2xl font-headline-semibold text-white mb-4">
                        {t('form.success')}
                      </h3>
                      <button
                        onClick={onClose}
                        className="mt-8 px-8 py-4 bg-lcdream-white/10 hover:bg-lcdream-white/20 text-white font-cta rounded-md transition-colors"
                      >
                        {t('buttons.close')}
                      </button>
                    </div>
                  ) : (
                    <>
                      <div className="mb-10 text-center">
                        <h3 className="font-headline text-2xl sm:text-3xl font-headline-bold text-lcdream-gold mb-4">
                          {t('resultTitle', { result: t(`results.${finalResult}` as any) })}
                        </h3>
                        <p className="font-body font-body-semibold text-white max-w-md mx-auto mb-2 text-lg">
                          {t(`results_desc.${finalResult}` as any)}
                        </p>
                        <p className="font-body text-lcdream-gray-light max-w-md mx-auto">
                          {t('resultSubtitle')}
                        </p>
                      </div>

                      <div className="bg-black/50 p-6 sm:p-8 rounded-xl border border-lcdream-white/10 text-left">
                        <div className="flex items-center justify-center space-x-2 text-lcdream-gold text-sm font-body font-body-semibold mb-6 bg-lcdream-gold/10 p-3 rounded-lg border border-lcdream-gold/20">
                           <Icon name="FireIcon" size={20} />
                           <span>{t('form.scarcity')}</span>
                        </div>
                        <form onSubmit={handleFormSubmit} className="space-y-5">
                          <div>
                            <label htmlFor="quiz_name" className="block text-sm font-body text-lcdream-gray-light mb-2">
                              {t('form.name')} *
                            </label>
                            <input
                              type="text"
                              id="quiz_name"
                              name="name"
                              required
                              className="w-full bg-black border border-lcdream-white/20 rounded-md px-4 py-3 text-white focus:outline-none focus:border-lcdream-gold focus:ring-1 focus:ring-lcdream-gold transition-colors font-body"
                            />
                          </div>

                          <div>
                            <label htmlFor="quiz_email" className="block text-sm font-body text-lcdream-gray-light mb-2">
                              {t('form.email')} *
                            </label>
                            <input
                              type="email"
                              id="quiz_email"
                              name="email"
                              required
                              className="w-full bg-black border border-lcdream-white/20 rounded-md px-4 py-3 text-white focus:outline-none focus:border-lcdream-gold focus:ring-1 focus:ring-lcdream-gold transition-colors font-body"
                            />
                          </div>

                          <div>
                            <label htmlFor="quiz_phone" className="block text-sm font-body text-lcdream-gray-light mb-2">
                              {t('form.phone')}
                            </label>
                            <input
                              type="tel"
                              id="quiz_phone"
                              name="phone"
                              className="w-full bg-black border border-lcdream-white/20 rounded-md px-4 py-3 text-white focus:outline-none focus:border-lcdream-gold focus:ring-1 focus:ring-lcdream-gold transition-colors font-body"
                            />
                          </div>

                          {formStatus === 'error' && (
                            <div className="text-red-400 text-sm font-body p-3 bg-red-900/20 rounded border border-red-500/30 flex items-center">
                              <Icon name="ExclamationCircleIcon" size={16} className="mr-2" />
                              Ocurrió un error. Inténtalo de nuevo.
                            </div>
                          )}

                          <button
                            type="submit"
                            disabled={formStatus === 'sending'}
                            className="w-full px-8 py-4 bg-lcdream-gold text-black font-cta text-base font-cta-semibold rounded-md transition-smooth hover:bg-lcdream-gold-light hover:shadow-gold disabled:opacity-70 disabled:cursor-not-allowed flex justify-center items-center mt-4"
                          >
                            {formStatus === 'sending' ? (
                              <Icon name="ArrowPathIcon" size={20} className="animate-spin" />
                            ) : (
                              t('form.submit')
                            )}
                          </button>
                        </form>
                      </div>
                    </>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
