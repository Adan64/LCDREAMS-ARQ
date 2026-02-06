'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';

export default function DesignPhilosophy() {
  const t = useTranslations('About.philosophy');

  return (
    <section className="py-20 lg:py-32 bg-lcdream-dark-bg relative overflow-hidden">
      {/* Ambient Gradients */}
      <div className="absolute top-0 left-0 w-1/3 h-full bg-gradient-to-r from-lcdream-gold/5 to-transparent pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-1/4 h-1/2 bg-gradient-to-tl from-accent/5 to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-headline text-4xl lg:text-5xl font-headline-bold text-center mb-16 lg:mb-24 text-lcdream-white"
        >
          {t('title')}
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-8 lg:gap-16">
          {/* Mission */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="flex flex-col h-full bg-white/5 p-8 lg:p-10 border border-white/5 rounded-xl hover:bg-white/10 hover:border-lcdream-gold/20 transition-all duration-300 md:translate-y-8"
          >
            <div className="flex items-center mb-6">
              <span className="w-8 h-[1px] bg-lcdream-gold mr-4"></span>
              <h3 className="font-headline text-2xl font-headline-semibold text-lcdream-gold">
                {t('mission.title')}
              </h3>
            </div>
            <p className="font-body text-lg font-body-light text-text-secondary leading-relaxed">
              {t('mission.description')}
            </p>
          </motion.div>

          {/* Vision */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="flex flex-col h-full bg-white/5 p-8 lg:p-10 border border-white/5 rounded-xl hover:bg-white/10 hover:border-lcdream-gold/20 transition-all duration-300"
          >
            <div className="flex items-center mb-6">
              <span className="w-8 h-[1px] bg-lcdream-gold mr-4"></span>
              <h3 className="font-headline text-2xl font-headline-semibold text-lcdream-gold">
                {t('vision.title')}
              </h3>
            </div>
            <p className="font-body text-lg font-body-light text-text-secondary leading-relaxed">
              {t('vision.description')}
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}