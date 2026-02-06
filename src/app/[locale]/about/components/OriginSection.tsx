'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';

export default function OriginSection() {
    const t = useTranslations('About.origin');

    return (
        <section className="py-20 lg:py-32 bg-lcdream-dark-bg relative overflow-hidden">
            {/* Ambient Gradients - Matching Styles */}
            <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-lcdream-gold/5 to-transparent pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-1/4 h-1/2 bg-gradient-to-tr from-accent/5 to-transparent pointer-events-none" />

            <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-10">
                <div className="text-center mb-20">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="font-headline text-lg font-headline-semibold text-lcdream-gold uppercase tracking-widest mb-4"
                    >
                        {t('title')}
                    </motion.h2>
                    <motion.h3
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="font-headline text-4xl lg:text-5xl font-headline-bold text-lcdream-white mb-8 leading-tight"
                    >
                        {t('subtitle')}
                    </motion.h3>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="font-body text-lg font-body-regular text-text-secondary max-w-3xl mx-auto leading-relaxed"
                    >
                        {t('description')}
                    </motion.p>
                </div>

                {/* Contributions Grid */}
                <div className="grid md:grid-cols-2 gap-8 lg:gap-12 mb-20">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 }}
                        className="bg-white/5 p-8 lg:p-10 border border-white/5 rounded-xl hover:bg-white/10 hover:border-lcdream-gold/20 transition-all duration-300 group"
                    >
                        <h4 className="font-headline text-2xl font-headline-medium text-lcdream-white mb-6 group-hover:text-lcdream-gold transition-colors">
                            LC Arquitectura
                        </h4>
                        <p className="font-body text-base font-body-regular text-text-secondary leading-relaxed">
                            {t('lc_contribution')}
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 }}
                        className="bg-white/5 p-8 lg:p-10 border border-white/5 rounded-xl hover:bg-white/10 hover:border-lcdream-gold/20 transition-all duration-300 group"
                    >
                        <h4 className="font-headline text-2xl font-headline-medium text-lcdream-white mb-6 group-hover:text-lcdream-gold transition-colors">
                            Dream.arq
                        </h4>
                        <p className="font-body text-base font-body-regular text-text-secondary leading-relaxed">
                            {t('dream_contribution')}
                        </p>
                    </motion.div>
                </div>

                {/* Synergy & Closing */}
                <div className="max-w-4xl mx-auto text-center space-y-12">
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.4 }}
                        className="font-headline text-2xl md:text-3xl text-lcdream-white font-headline-regular italic leading-relaxed"
                    >
                        <span className="text-lcdream-gold opacity-60">"</span>
                        {t('synergy')}
                        <span className="text-lcdream-gold opacity-60">"</span>
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, scale: 0 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.5 }}
                        className="h-px w-32 bg-gradient-to-r from-transparent via-lcdream-gold to-transparent mx-auto opacity-50"
                    />

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.6 }}
                        className="font-body text-lg font-body-light text-text-secondary leading-relaxed"
                    >
                        {t('closing')}
                    </motion.p>
                </div>
            </div>
        </section>
    );
}
