'use client';

import React, { useState } from 'react';
import { useTranslations } from 'next-intl';
import { useRouter } from '@/i18n/routing';
import { motion } from 'framer-motion';
import { getProjectByCode } from '@/data/mock-client-portal';
import Header from '@/components/common/Header';
import AppIcon from '@/components/ui/AppIcon';

export default function ClientPortalLoginPage() {
    const t = useTranslations('ClientPortal.login');
    const router = useRouter();
    const [accessCode, setAccessCode] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        try {
            // Simulate network request
            const project = await getProjectByCode(accessCode.trim());

            if (project) {
                // In a real app, we would set a session cookie here
                // For this demo, we just redirect with the project ID
                router.push({
                    pathname: '/client-portal/dashboard',
                    query: { p: project.id }
                } as any);
            } else {
                setError(t('error'));
            }
        } catch (err) {
            setError(t('error'));
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <main className="min-h-screen bg-background relative overflow-hidden flex flex-col">
            <Header />

            {/* Background Effects */}
            <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-lcdream-charcoal/90 z-10" />
                {/* Abstract architectural lines */}
                <div className="absolute top-0 right-0 w-1/2 h-full border-l border-white/5 transform -skew-x-12 opacity-30" />
                <div className="absolute top-0 left-1/4 w-px h-full bg-gradient-to-b from-transparent via-lcdream-gold/20 to-transparent" />
            </div>

            <div className="flex-1 flex items-center justify-center relative z-20 px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="w-full max-w-md"
                >
                    <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-8 md:p-12 rounded-2xl shadow-2xl">
                        <div className="text-center mb-10">
                            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-lcdream-gold/10 mb-6">
                                <AppIcon name="KeyIcon" className="w-8 h-8 text-lcdream-gold" />
                            </div>
                            <h1 className="font-headline text-3xl font-headline-bold text-white mb-2">
                                {t('title')}
                            </h1>
                            <p className="text-lcdream-gray-light">
                                {t('subtitle')}
                            </p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                        <AppIcon name="HashtagIcon" className="w-5 h-5 text-lcdream-gray" />
                                    </div>
                                    <input
                                        type="text"
                                        value={accessCode}
                                        onChange={(e) => setAccessCode(e.target.value.toUpperCase())}
                                        placeholder={t('codePlaceholder')}
                                        className="w-full bg-white/5 border border-white/10 text-white placeholder-lcdream-gray pl-12 pr-4 py-4 rounded-lg focus:outline-none focus:border-lcdream-gold transition-colors font-mono tracking-wider"
                                        required
                                    />
                                </div>
                                {error && (
                                    <motion.p
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: 'auto' }}
                                        className="text-red-400 text-sm mt-2 flex items-center gap-2"
                                    >
                                        <AppIcon name="ExclamationCircleIcon" className="w-4 h-4" />
                                        {error}
                                    </motion.p>
                                )}
                            </div>

                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full bg-lcdream-gold text-lcdream-charcoal font-cta-semibold py-4 rounded-lg hover:bg-white transition-all transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                            >
                                {isLoading ? (
                                    <span className="w-5 h-5 border-2 border-lcdream-charcoal/30 border-t-lcdream-charcoal rounded-full animate-spin" />
                                ) : (
                                    <>
                                        {t('button')}
                                        <AppIcon name="ArrowRightIcon" className="w-5 h-5" />
                                    </>
                                )}
                            </button>
                        </form>

                        {/* Demo Hint */}
                        <div className="mt-8 pt-6 border-t border-white/5 text-center">
                            <p className="text-xs text-lcdream-gray font-mono bg-white/5 inline-block px-3 py-1 rounded">
                                💡 {t('hint')}
                            </p>
                        </div>
                    </div>
                </motion.div>
            </div>
        </main>
    );
}
