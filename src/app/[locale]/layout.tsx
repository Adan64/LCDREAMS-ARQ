import React from 'react';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import '../../styles/index.css';
import { Metadata, Viewport } from 'next';
import { Analytics } from "@vercel/analytics/next";
import IntroAnimation from '@/components/ui/IntroAnimation';
import ScrollProgressBar from '@/components/ui/ScrollProgressBar';
import FloatingWhatsApp from '@/components/ui/FloatingWhatsApp';

export const viewport: Viewport = {
    width: 'device-width',
    initialScale: 1,
};

export const metadata: Metadata = {
    metadataBase: new URL(
        process.env.NEXT_PUBLIC_APP_URL || 
        (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'https://lcdreams-arq.vercel.app')
    ),
    title: 'LCDREAM.ARQ - Arquitectura e Interiores',
    description: 'Estudio de arquitectura e interiores especializado en diseño de lujo y elegancia',
    icons: {
        icon: [
            { url: '/favicon.png', type: 'image/png' }
        ],
        apple: [
            { url: '/favicon.png', type: 'image/png' }
        ]
    },
    openGraph: {
        title: 'LCDREAM.ARQ - Arquitectura e Interiores',
        description: 'Estudio de arquitectura e interiores especializado en diseño de lujo y elegancia',
        url: '/',
        siteName: 'LCDREAM.ARQ',
        images: [
            {
                url: '/assets/images/logo.png',
                width: 400,
                height: 400,
                alt: 'LCDREAM.ARQ - Arquitectura e Interiores',
            },
        ],
        locale: 'es_ES',
        type: 'website',
    },
    twitter: {
        card: 'summary', // Note: "summary" creates a smaller square card next to text instead of "summary_large_image"
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
                    <Analytics />
                    <FloatingWhatsApp />
                </NextIntlClientProvider>
            </body>
        </html>
    );
}
