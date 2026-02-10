'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import AppImage from '@/components/ui/AppImage';
import { CalendarIcon, ClockIcon } from '@heroicons/react/24/outline'; // Adjust import if needed
import { useTranslations } from 'next-intl';

interface Post {
  id: string;
  title: any;
  slug: string;
  excerpt: any;
  category: string;
  created_at: string;
  cover_image: string | null;
  author_id?: string;
}

interface ArticleGridProps {
  posts: Post[];
  locale: string;
}

const ArticleGrid = ({ posts, locale }: ArticleGridProps) => {
  const t = useTranslations('ResourcesBlog.grid');
  const [activeCategory, setActiveCategory] = useState('all');

  // Extract unique categories from posts, plus 'all'
  const categories = useMemo(() => {
    const uniqueCats = Array.from(new Set(posts.map(p => p.category).filter(Boolean)));
    return ['all', ...uniqueCats];
  }, [posts]);

  const getLocStr = (val: any) => {
    if (!val) return '';
    if (typeof val === 'string') return val;
    return val[locale] || val['es'] || val['en'] || '';
  };

  const filteredPosts = activeCategory === 'all'
    ? posts
    : posts.filter(post => post.category === activeCategory);

  return (
    <section className="py-20 lg:py-32 bg-black min-h-screen">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="mb-12">
          <h2 className="font-headline text-3xl lg:text-4xl font-headline-bold text-white mb-8">
            {t('title')}
          </h2>

          <div className="flex flex-wrap gap-4 mb-12">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-6 py-3 text-sm font-semibold rounded-md transition-all ${activeCategory === cat
                  ? 'bg-yellow-500 text-black shadow-lg shadow-yellow-500/20'
                  : 'bg-gray-800 text-gray-400 border border-gray-700 hover:border-yellow-500/50 hover:text-yellow-500'
                  }`}
              >
                {cat === 'all' ? t('categories.all') : cat}
              </button>
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.map((post) => (
            <Link
              key={post.id}
              href={`/resources-blog/${post.slug}`}
              className="group bg-gray-900 rounded-lg overflow-hidden border border-white/5 hover:border-yellow-500/30 transition-all duration-300 flex flex-col h-full"
            >
              <div className="relative h-48 overflow-hidden w-full bg-gray-800">
                {post.cover_image ? (
                  <AppImage
                    src={post.cover_image}
                    alt={getLocStr(post.title)}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    width={800}
                    height={450}
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gray-800 text-gray-600">
                    No Image
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
                {post.category && (
                  <span className="absolute top-4 left-4 px-3 py-1 bg-yellow-500/90 text-black text-xs font-bold uppercase tracking-wide rounded-sm shadow-sm backdrop-blur-sm">
                    {post.category}
                  </span>
                )}
              </div>

              <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-yellow-500 transition-colors line-clamp-2">
                  {getLocStr(post.title)}
                </h3>
                <p className="text-sm text-gray-400 mb-6 line-clamp-3 flex-grow">
                  {getLocStr(post.excerpt)}
                </p>

                <div className="flex items-center justify-between text-xs text-gray-500 pt-4 border-t border-gray-800 mt-auto">
                  <div className="flex items-center gap-1.5">
                    <CalendarIcon className="w-4 h-4" />
                    <span>
                      {new Date(post.created_at).toLocaleDateString(locale === 'es' ? 'es-ES' : 'en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </span>
                  </div>
                  {/* Read time placeholder or calculation could go here */}
                </div>
              </div>
            </Link>
          ))}
        </div>

        {filteredPosts.length === 0 && (
          <div className="text-center text-gray-500 py-12">
            {t('noArticles') || "No articles found."}
          </div>
        )}
      </div>
    </section>
  );
};

export default ArticleGrid;