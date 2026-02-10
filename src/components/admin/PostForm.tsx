'use client';

import { useTranslations } from 'next-intl';
import { useState, useEffect } from 'react';
import { PhotoIcon } from '@heroicons/react/24/solid';
import { Link, useRouter } from '@/i18n/routing';
import { createClient } from '@/lib/supabase/client';

interface PostFormProps {
    initialData?: any;
}

export default function PostForm({ initialData }: PostFormProps) {
    const t = useTranslations('Admin.Blog.form');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [file, setFile] = useState<File | null>(null);
    const [isChanged, setIsChanged] = useState(false);
    const router = useRouter();
    const supabase = createClient();

    // Helper to safely get localized string from JSONB
    const getLocStr = (val: any) => {
        if (!val) return '';
        if (typeof val === 'string') return val;
        return val.es || val.en || '';
    };

    const [formData, setFormData] = useState({
        title: '',
        slug: '',
        excerpt: '',
        content: '',
        category: '',
        tags: '',
        status: 'draft'
    });

    useEffect(() => {
        if (initialData) {
            setFormData({
                title: getLocStr(initialData.title),
                slug: initialData.slug || '',
                excerpt: getLocStr(initialData.excerpt),
                content: getLocStr(initialData.content),
                category: initialData.category || '',
                tags: initialData.tags ? initialData.tags.join(', ') : '',
                status: initialData.published ? 'published' : 'draft'
            });
        }
    }, [initialData]);

    // Auto-generate slug from title if slug is empty
    useEffect(() => {
        if (!initialData && formData.title && !formData.slug) {
            const slug = formData.title
                .toLowerCase()
                .replace(/[^a-z0-9]+/g, '-')
                .replace(/(^-|-$)+/g, '');
            setFormData(prev => ({ ...prev, slug }));
        }
    }, [formData.title, formData.slug, initialData]);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setFile(e.target.files[0]);
            setIsChanged(true);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        setIsChanged(true);
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            let imageUrl = initialData?.cover_image || null;

            if (file) {
                const fileExt = file.name.split('.').pop();
                const fileName = `${Math.random()}.${fileExt}`;
                const filePath = `${fileName}`;

                const { error: uploadError } = await supabase.storage
                    .from('blog')
                    .upload(filePath, file);

                if (uploadError) throw uploadError;

                const { data: { publicUrl } } = supabase.storage
                    .from('blog')
                    .getPublicUrl(filePath);

                imageUrl = publicUrl;
            }

            // Simple localization strategy: use same text for ES/EN for now if user types plain text
            // In a real app, you'd have tabs for ES/EN.
            // Here we assume the input is Spanish (primary) and we copy to English or append (EN).
            const payload = {
                title: { es: formData.title, en: formData.title },
                slug: formData.slug,
                excerpt: { es: formData.excerpt, en: formData.excerpt },
                content: { es: formData.content, en: formData.content },
                cover_image: imageUrl,
                category: formData.category,
                tags: formData.tags.split(',').map(tag => tag.trim()).filter(Boolean),
                published: formData.status === 'published',
                updated_at: new Date().toISOString(),
                ...(formData.status === 'published' && !initialData?.published_at ? { published_at: new Date().toISOString() } : {})
            };

            let error;

            if (initialData?.id) {
                const { error: updateError } = await supabase
                    .from('posts')
                    .update(payload)
                    .eq('id', initialData.id);
                error = updateError;
            } else {
                const { error: insertError } = await supabase
                    .from('posts')
                    .insert(payload);
                error = insertError;
            }

            if (error) throw error;

            alert(initialData ? t('alerts.updated') : t('alerts.created'));
            router.push('/admin/blog');
            router.refresh();

        } catch (error) {
            console.error('Error:', error);
            alert(t('alerts.error'));
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-8 divide-y divide-gray-700 bg-gray-800 p-8 rounded-xl border border-gray-700">
            <div className="space-y-8 divide-y divide-gray-700">
                <div>
                    <div>
                        <h3 className="text-base font-semibold leading-6 text-white">
                            {initialData ? t('editInfo') : t('titleInfo')}
                        </h3>
                        <p className="mt-1 text-sm text-gray-400">{t('subtitleInfo')}</p>
                    </div>

                    <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                        <div className="sm:col-span-4">
                            <label htmlFor="title" className="block text-sm font-medium leading-6 text-white">
                                {t('title')}
                            </label>
                            <div className="mt-2">
                                <input
                                    type="text"
                                    name="title"
                                    id="title"
                                    required
                                    value={formData.title}
                                    onChange={handleChange}
                                    className="block w-full rounded-md border-0 bg-gray-700/50 py-2.5 text-white shadow-sm ring-1 ring-inset ring-gray-600 focus:ring-2 focus:ring-inset focus:ring-yellow-500 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>

                        <div className="sm:col-span-4">
                            <label htmlFor="slug" className="block text-sm font-medium leading-6 text-white">
                                {t('slug')}
                            </label>
                            <div className="mt-2">
                                <input
                                    type="text"
                                    name="slug"
                                    id="slug"
                                    required
                                    value={formData.slug}
                                    onChange={handleChange}
                                    className="block w-full rounded-md border-0 bg-gray-700/50 py-2.5 text-white shadow-sm ring-1 ring-inset ring-gray-600 focus:ring-2 focus:ring-inset focus:ring-yellow-500 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>

                        <div className="sm:col-span-3">
                            <label htmlFor="category" className="block text-sm font-medium leading-6 text-white">
                                {t('category')}
                            </label>
                            <div className="mt-2">
                                <input
                                    type="text"
                                    name="category"
                                    id="category"
                                    value={formData.category}
                                    onChange={handleChange}
                                    className="block w-full rounded-md border-0 bg-gray-700/50 py-2.5 text-white shadow-sm ring-1 ring-inset ring-gray-600 focus:ring-2 focus:ring-inset focus:ring-yellow-500 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>

                        <div className="sm:col-span-3">
                            <label htmlFor="status" className="block text-sm font-medium leading-6 text-white">
                                {t('status')}
                            </label>
                            <div className="mt-2">
                                <select
                                    id="status"
                                    name="status"
                                    value={formData.status}
                                    onChange={handleChange}
                                    className="block w-full rounded-md border-0 bg-gray-700/50 py-3 text-white shadow-sm ring-1 ring-inset ring-gray-600 focus:ring-2 focus:ring-inset focus:ring-yellow-500 sm:text-sm sm:leading-6"
                                >
                                    <option value="draft">{t('draft')}</option>
                                    <option value="published">{t('published')}</option>
                                </select>
                            </div>
                        </div>

                        <div className="col-span-full">
                            <label htmlFor="excerpt" className="block text-sm font-medium leading-6 text-white">
                                {t('excerpt')}
                            </label>
                            <div className="mt-2">
                                <textarea
                                    id="excerpt"
                                    name="excerpt"
                                    rows={3}
                                    value={formData.excerpt}
                                    onChange={handleChange}
                                    className="block w-full rounded-md border-0 bg-gray-700/50 py-2.5 text-white shadow-sm ring-1 ring-inset ring-gray-600 placeholder:text-gray-500 focus:ring-2 focus:ring-inset focus:ring-yellow-500 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>

                        <div className="col-span-full">
                            <label htmlFor="content" className="block text-sm font-medium leading-6 text-white">
                                {t('content')}
                            </label>
                            <div className="mt-2">
                                <textarea
                                    id="content"
                                    name="content"
                                    rows={10}
                                    value={formData.content}
                                    onChange={handleChange}
                                    className="block w-full rounded-md border-0 bg-gray-700/50 py-2.5 text-white shadow-sm ring-1 ring-inset ring-gray-600 placeholder:text-gray-500 focus:ring-2 focus:ring-inset focus:ring-yellow-500 sm:text-sm sm:leading-6 font-mono"
                                />
                            </div>
                        </div>

                        <div className="col-span-full">
                            <label htmlFor="tags" className="block text-sm font-medium leading-6 text-white">
                                {t('tags')}
                            </label>
                            <div className="mt-2">
                                <input
                                    type="text"
                                    name="tags"
                                    id="tags"
                                    value={formData.tags}
                                    onChange={handleChange}
                                    placeholder={t('placeholders.tags')}
                                    className="block w-full rounded-md border-0 bg-gray-700/50 py-2.5 text-white shadow-sm ring-1 ring-inset ring-gray-600 focus:ring-2 focus:ring-inset focus:ring-yellow-500 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>

                        <div className="col-span-full">
                            <label htmlFor="cover-photo" className="block text-sm font-medium leading-6 text-white">
                                {t('coverImage')}
                            </label>
                            {initialData?.cover_image && (
                                <div className="mb-4">
                                    <p className="text-xs text-gray-400 mb-2">{t('currentImage')}</p>
                                    <img src={initialData.cover_image} alt="Cover" className="h-32 rounded-lg object-cover" />
                                </div>
                            )}
                            <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-600 px-6 py-10 hover:border-gray-500 transition-colors cursor-pointer relative">
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleFileChange}
                                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                                />
                                <div className="text-center">
                                    {file ? (
                                        <div className="text-yellow-500 font-semibold">{file.name}</div>
                                    ) : (
                                        <>
                                            <PhotoIcon className="mx-auto h-12 w-12 text-gray-500" aria-hidden="true" />
                                            <div className="mt-4 flex text-sm leading-6 text-gray-400">
                                                <span className="relative rounded-md font-semibold text-yellow-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-yellow-500 focus-within:ring-offset-2 hover:text-yellow-400">
                                                    {t('imageHelper')}
                                                </span>
                                            </div>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="pt-8 flex items-center justify-end gap-x-6">
                <Link href="/admin/blog" className="text-sm font-semibold leading-6 text-white hover:text-gray-300">
                    {t('cancel')}
                </Link>
                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="rounded-md bg-yellow-500 px-6 py-2.5 text-sm font-semibold text-black shadow-sm hover:bg-yellow-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                >
                    {isSubmitting ? t('saving') : (initialData ? t('update') : t('save'))}
                </button>
            </div>
        </form>
    );
}
