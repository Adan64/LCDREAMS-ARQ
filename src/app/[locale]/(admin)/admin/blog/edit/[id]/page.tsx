import { getTranslations } from 'next-intl/server';
import EditPostClient from './EditPostClient';

export default async function EditPostPage({ params }: { params: { id: string } }) {
    const t = await getTranslations('Admin.Blog');

    return <EditPostClient id={params.id} title={t.raw('editPost')} subtitle={t.raw('form.subtitleInfo')} />;
}
