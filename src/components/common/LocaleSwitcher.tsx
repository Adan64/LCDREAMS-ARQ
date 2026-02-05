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
        <label className="border-2 rounded">
            <p className="sr-only">{t('label')}</p>
            <select
                defaultValue={locale}
                className="bg-transparent py-2"
                onChange={onSelectChange}
                disabled={isPending}
            >
                <option value="es">{t('locale', { locale: 'es' })}</option>
                <option value="en">{t('locale', { locale: 'en' })}</option>
                <option value="pt">{t('locale', { locale: 'pt' })}</option>
            </select>
        </label>
    );
}
