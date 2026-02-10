import PostForm from '@/components/admin/PostForm';
import { getTranslations } from 'next-intl/server';

export default async function NewPostPage() {
  const t = await getTranslations('Admin.Blog');

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white mb-2">{t('newPost')}</h1>
        <p className="text-gray-400">{t('form.subtitleInfo')}</p>
      </div>

      <PostForm />
    </div>
  );
}
