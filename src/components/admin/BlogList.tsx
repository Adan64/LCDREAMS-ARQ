'use client';

import { useTranslations } from 'next-intl';
import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';
import { Link, useRouter } from '@/i18n/routing';
import { PlusIcon, PencilSquareIcon, TrashIcon } from '@heroicons/react/24/outline';

type Post = {
    id: string;
    title: any; // JSONB
    published: boolean;
    created_at: string;
    author_id: string;
    published_at: string | null;
    slug: string;
};

export default function BlogList() {
    const t = useTranslations('Admin.Blog');
    const [posts, setPosts] = useState<Post[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const supabase = createClient();
    const router = useRouter();

    const fetchPosts = async () => {
        try {
            const { data, error } = await supabase
                .from('posts')
                .select('*')
                .order('created_at', { ascending: false });

            if (error) throw error;
            setPosts(data || []);
        } catch (error) {
            console.error('Error fetching posts:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPosts();
    }, []);

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this post?')) return;

        try {
            const { error } = await supabase
                .from('posts')
                .delete()
                .eq('id', id);

            if (error) throw error;
            setPosts(posts.filter(post => post.id !== id));
        } catch (error) {
            console.error('Error deleting post:', error);
            alert('Error deleting post.');
        }
    };

    const getLocStr = (json: any) => {
        if (!json) return '';
        if (typeof json === 'string') return json;
        return json.es || json.en || '';
    };

    const filteredPosts = posts.filter(post => {
        const title = getLocStr(post.title).toLowerCase();
        return title.includes(searchTerm.toLowerCase());
    });

    if (loading) return <div className="text-gray-400">Loading posts...</div>;

    return (
        <div className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden">
            <div className="p-6 border-b border-gray-700 flex flex-col sm:flex-row justify-between gap-4 items-center">
                <div className="w-full sm:w-auto">
                    <input
                        type="text"
                        placeholder={t('searchPlaceholder')}
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full sm:w-64 rounded-md border-0 bg-gray-700/50 py-2 pl-4 text-white placeholder:text-gray-500 focus:ring-2 focus:ring-inset focus:ring-yellow-500 sm:text-sm"
                    />
                </div>
                <Link
                    href="/admin/blog/new"
                    className="flex items-center gap-2 bg-yellow-500 hover:bg-yellow-400 text-black px-4 py-2 rounded-md text-sm font-semibold transition-colors w-full sm:w-auto justify-center"
                >
                    <PlusIcon className="h-5 w-5" />
                    {t('newPost')}
                </Link>
            </div>

            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-700">
                    <thead className="bg-gray-900/50">
                        <tr>
                            <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-white sm:pl-6">{t('table.title')}</th>
                            <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-white">{t('table.status')}</th>
                            <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-white">{t('table.date')}</th>
                            <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                                <span className="sr-only">{t('table.actions')}</span>
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-700 bg-gray-800">
                        {filteredPosts.length === 0 ? (
                            <tr>
                                <td colSpan={4} className="py-8 text-center text-gray-400 text-sm">
                                    No posts found.
                                </td>
                            </tr>
                        ) : (
                            filteredPosts.map((post) => (
                                <tr key={post.id} className="hover:bg-gray-700/30 transition-colors">
                                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-white sm:pl-6">
                                        <div className="flex flex-col">
                                            <span>{getLocStr(post.title)}</span>
                                            <span className="text-xs text-gray-500 font-normal mt-0.5">/{post.slug}</span>
                                        </div>
                                    </td>
                                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-300">
                                        <span className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ring-1 ring-inset ${post.published
                                            ? 'bg-green-400/10 text-green-400 ring-green-400/20'
                                            : 'bg-yellow-400/10 text-yellow-500 ring-yellow-400/20'
                                            }`}>
                                            {post.published ? t('form.published') : t('form.draft')}
                                        </span>
                                    </td>
                                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-300">
                                        {new Date(post.created_at).toLocaleDateString()}
                                    </td>
                                    <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                                        <div className="flex items-center justify-end gap-3">
                                            <Link
                                                href={`/admin/blog/edit/${post.id}` as any}
                                                className="text-yellow-500 hover:text-yellow-400 transition-colors"
                                                title={t('editPost')}
                                            >
                                                <PencilSquareIcon className="h-5 w-5" />
                                            </Link>
                                            <button
                                                onClick={() => handleDelete(post.id)}
                                                className="text-gray-500 hover:text-red-400 transition-colors"
                                                title="Delete"
                                            >
                                                <TrashIcon className="h-5 w-5" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
