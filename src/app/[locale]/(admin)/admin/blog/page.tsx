import BlogList from '@/components/admin/BlogList';
import { getTranslations } from 'next-intl/server';

export default async function BlogPage() {
    const t = await getTranslations('Admin.Blog');

    return (
        <div>
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-white mb-2">{t('title')}</h1>
                <p className="text-gray-400">{t('subtitle')}</p>
            </div>

            <BlogList />
        </div>
    );
}
