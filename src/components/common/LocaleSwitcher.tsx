'use client';

import { useLocale, useTranslations } from 'next-intl';
import { usePathname, useRouter } from '@/i18n/routing';
import { ChangeEvent, useTransition } from 'react';

export default function LocaleSwitcher() {
    const t = useTranslations('LocaleSwitcher');
    const locale = useLocale();
    const router = useRouter();
    const pathname = usePathname();
    const [isPending, startTransition] = useTransition();

    function onSelectChange(event: ChangeEvent<HTMLSelectElement>) {
        const nextLocale = event.target.value;
        startTransition(() => {
            router.replace(pathname, { locale: nextLocale });
        });
    }

    return (
        <label className="border-2 border-lcdream-gold/30 rounded-md hover:border-lcdream-gold/60 transition-smooth">
            <p className="sr-only">{t('label')}</p>
            <select
                defaultValue={locale}
                className="bg-lcdream-dark-bg text-lcdream-gold py-2 px-3 rounded-md cursor-pointer focus:outline-none focus:ring-2 focus:ring-lcdream-gold/50"
                onChange={onSelectChange}
                disabled={isPending}
            >
                <option value="es" className="bg-lcdream-dark-bg text-lcdream-gold">{t('locale', { locale: 'es' })}</option>
                <option value="en" className="bg-lcdream-dark-bg text-lcdream-gold">{t('locale', { locale: 'en' })}</option>
                <option value="pt" className="bg-lcdream-dark-bg text-lcdream-gold">{t('locale', { locale: 'pt' })}</option>
            </select>
        </label>
    );
}
