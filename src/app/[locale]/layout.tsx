import React from 'react';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import '../../styles/index.css';
import { Metadata, Viewport } from 'next';
import IntroAnimation from '@/components/ui/IntroAnimation';
import ScrollProgressBar from '@/components/ui/ScrollProgressBar';export const viewport: Viewport = {
    width: 'device-width',
    initialScale: 1,
};

export const metadata: Metadata = {
    metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'https://lcdream.arq'),
    title: 'LCDREAM.ARQ - Arquitectura e Interiores',
    description: 'Estudio de arquitectura e interiores especializado en diseño de lujo y elegancia',
    icons: {
        icon: [
            { url: '/favicon.png', type: 'image/png' }
        ],
    },
    openGraph: {
        title: 'LCDREAM.ARQ - Arquitectura e Interiores',
        description: 'Estudio de arquitectura e interiores especializado en diseño de lujo y elegancia',
        url: '/',
        siteName: 'LCDREAM.ARQ',
        images: [
            {
                url: '/assets/images/logo.png',
                width: 1200,
                height: 630,
                alt: 'LCDREAM.ARQ - Arquitectura e Interiores',
            },
        ],
        locale: 'es_ES',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'LCDREAM.ARQ - Arquitectura e Interiores',
        description: 'Estudio de arquitectura e interiores especializado en diseño de lujo y elegancia',
        images: ['/assets/images/logo.png'],
    },
};

export default async function LocaleLayout({
    children,
    params
}: {
    children: React.ReactNode;
    params: Promise<{ locale: string }>;
}) {
    const { locale } = await params;
    const messages = await getMessages();

    return (
        <html lang={locale}>
            <body>
                <NextIntlClientProvider messages={messages}>
                    <ScrollProgressBar />
                    <IntroAnimation />
                    {children}
                </NextIntlClientProvider>
            </body>
        </html>
    );
}
