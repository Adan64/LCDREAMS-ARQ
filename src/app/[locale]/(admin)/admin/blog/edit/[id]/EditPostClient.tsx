'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';
import PostForm from '@/components/admin/PostForm';

export default function EditPostClient({ id, title, subtitle }: { id: string, title: string, subtitle: string }) {
    const [post, setPost] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const supabase = createClient();

    useEffect(() => {
        const fetchPost = async () => {
            const { data, error } = await supabase
                .from('posts')
                .select('*')
                .eq('id', id)
                .single();

            if (error) {
                console.error('Error fetching post:', error);
            } else {
                setPost(data);
            }
            setLoading(false);
        };

        if (id) fetchPost();
    }, [id]);

    if (loading) return <div className="text-gray-400">Loading...</div>;
    if (!post) return <div className="text-red-400">Post not found.</div>;

    return (
        <div>
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-white mb-2">{title}</h1>
                <p className="text-gray-400">{subtitle}</p>
            </div>

            <PostForm initialData={post} />
        </div>
    );
}
