'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { CheckIcon } from '@heroicons/react/24/solid';

export default function WhyUsSection() {
    const t = useTranslations('About.whyUs');
    const items = [0, 1, 2, 3, 4];

    return (
        <section className="py-20 bg-accent/5">
            <div className="container mx-auto px-4">
                <div className="max-w-4xl mx-auto text-center mb-16">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-4xl md:text-5xl font-playfair text-foreground mb-6"
                    >
                        {t('title')}
                    </motion.h2>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
                    {items.map((index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="bg-background p-6 rounded-sm border border-primary/10 shadow-sm flex items-start space-x-4 hover:border-primary/30 transition-colors"
                        >
                            <div className="bg-primary/10 p-2 rounded-full mt-1">
                                <CheckIcon className="w-5 h-5 text-primary" />
                            </div>
                            <p className="text-lg text-foreground font-medium">{t(`items.${index}`)}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
