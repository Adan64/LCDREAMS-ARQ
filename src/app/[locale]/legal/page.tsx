import { useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import React from 'react';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'Legal' });
    return {
        title: t('metadata.title'),
        description: t('metadata.description')
    };
}

export default function LegalPage() {
    const t = useTranslations('Legal');

    const sections = ['owner', 'activity', 'professional', 'responsibility', 'externalLinks', 'jurisdiction'] as const;

    return (
        <main className="min-h-screen bg-black pt-24 pb-16 px-6 lg:px-12">
            <div className="max-w-4xl mx-auto">
                <h1 className="font-headline text-3xl lg:text-4xl font-headline-bold text-lcdream-gold mb-4">
                    {t('title')}
                </h1>
                <p className="text-lcdream-gray-light mb-8">{t('lastUpdated')}</p>

                <div className="prose prose-lg prose-invert max-w-none">
                    <p className="text-lcdream-white mb-8 text-lg leading-relaxed">{t('intro')}</p>

                    {sections.map((section) => (
                        <section key={section} className="mb-10">
                            <h2 className="text-2xl font-headline-semibold text-lcdream-gold mt-8 mb-4 border-b border-lcdream-gold/20 pb-2">
                                {t(`${section}.title`)}
                            </h2>
                            <p className="text-lcdream-gray-light leading-relaxed">
                                {t(`${section}.description`)}
                            </p>
                        </section>
                    ))}
                </div>
            </div>
        </main>
    );
}
