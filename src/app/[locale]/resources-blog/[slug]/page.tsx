import { getTranslations } from 'next-intl/server';
import AppImage from '@/components/ui/AppImage';
import Header from '@/components/common/Header';
import NewsletterSection from '@/app/[locale]/resources-blog/components/NewsletterSection';
import { CalendarIcon } from '@heroicons/react/24/outline';
import { notFound } from 'next/navigation';

export async function generateMetadata({ params }: { params: Promise<{ locale: string, slug: string }> }) {
    const { locale, slug } = await params;

    // Fetch post for metadata
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    try {
        const res = await fetch(`${supabaseUrl}/rest/v1/posts?slug=eq.${slug}&select=title,excerpt,cover_image`, {
            headers: {
                'apikey': supabaseKey!,
                'Authorization': `Bearer ${supabaseKey}`
            },
            next: { revalidate: 60 }
        });

        if (res.ok) {
            const posts = await res.json();
            const post = posts[0];
            if (post) {
                const title = post.title[locale] || post.title['es'] || post.title['en'];
                const desc = post.excerpt[locale] || post.excerpt['es'] || post.excerpt['en'];
                return {
                    title: `${title} | LCDREAM.ARQ`,
                    description: desc,
                    openGraph: {
                        images: post.cover_image ? [post.cover_image] : []
                    }
                };
            }
        }
    } catch (e) {
        console.error(e);
    }

    return {
        title: 'Blog | LCDREAM.ARQ'
    };
}

export default async function BlogPostPage({ params }: { params: Promise<{ locale: string, slug: string }> }) {
    const { locale, slug } = await params;
    const t = await getTranslations('ResourcesBlog');

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    let post = null;
    try {
        const res = await fetch(`${supabaseUrl}/rest/v1/posts?slug=eq.${slug}&select=*`, {
            headers: {
                'apikey': supabaseKey!,
                'Authorization': `Bearer ${supabaseKey}`
            },
            next: { revalidate: 60 }
        });

        if (res.ok) {
            const posts = await res.json();
            post = posts[0];
        }
    } catch (e) {
        console.error(e);
    }

    if (!post) {
        notFound();
    }

    const getLocStr = (val: any) => {
        if (!val) return '';
        if (typeof val === 'string') return val;
        return val[locale] || val['es'] || val['en'] || '';
    };

    const title = getLocStr(post.title);
    const content = getLocStr(post.content);
    const date = new Date(post.created_at).toLocaleDateString(locale === 'es' ? 'es-ES' : 'en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    return (
        <main className="min-h-screen bg-black text-white">
            <Header />

            {/* Hero Section with Cover Image */}
            <div className="relative h-[60vh] w-full overflow-hidden">
                {post.cover_image && (
                    <AppImage
                        src={post.cover_image}
                        alt={title}
                        className="w-full h-full object-cover"
                        width={1920}
                        height={1080}
                        priority
                    />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />

                <div className="absolute bottom-0 left-0 w-full p-8 lg:p-16">
                    <div className="max-w-4xl mx-auto">
                        {post.category && (
                            <span className="inline-block px-4 py-1.5 bg-yellow-500 text-black text-xs font-bold uppercase tracking-wider mb-6 rounded-sm">
                                {post.category}
                            </span>
                        )}
                        <h1 className="text-4xl lg:text-6xl font-bold leading-tight mb-4 text-white shadow-sm">
                            {title}
                        </h1>
                        <div className="flex items-center gap-4 text-gray-300 text-sm">
                            <div className="flex items-center gap-2">
                                <CalendarIcon className="w-5 h-5 text-yellow-500" />
                                <span>{date}</span>
                            </div>
                            {/* Author could go here */}
                        </div>
                    </div>
                </div>
            </div>

            {/* Content Section */}
            <div className="max-w-3xl mx-auto px-6 py-16 lg:py-24">
                <div
                    className="prose prose-invert prose-lg max-w-none prose-headings:font-bold prose-headings:text-white prose-p:text-gray-300 prose-a:text-yellow-500 hover:prose-a:text-yellow-400 prose-strong:text-white prose-li:text-gray-300"
                    dangerouslySetInnerHTML={{ __html: content }}
                />

                {/* Tags */}
                {post.tags && post.tags.length > 0 && (
                    <div className="mt-16 pt-8 border-t border-gray-800">
                        <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wide mb-4">
                            Tags
                        </h3>
                        <div className="flex flex-wrap gap-2">
                            {post.tags.map((tag: string) => (
                                <span key={tag} className="px-3 py-1 bg-gray-900 border border-gray-700 rounded-full text-sm text-gray-300">
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            <NewsletterSection />
        </main>
    );
}
