import { getTranslations } from 'next-intl/server';
import Header from '@/components/common/Header';
import BlogHero from './components/BlogHero';
import ArticleGrid from './components/ArticleGrid';
import NewsletterSection from './components/NewsletterSection';
import { createClient } from '@/lib/supabase/client';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'ResourcesBlog.metadata' });

  return {
    title: t('title'),
    description: t('description')
  };
}

export default async function ResourcesBlogPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;

  // NOTE: In a real server component we should use createClient from @supabase/ssr 
  // or a server-side compatible fetch. Since I don't have that setup confirmed, 
  // I'll make this page a Client Component OR use a direct fetch? 
  // Actually, I can just use a client component wrapper if needed, OR 
  // since I'm in a Server Component, I can use a simple generic fetch to Supabase REST API if I had the key.
  // BUT I should check if `src/lib/supabase/server.ts` exists.
  // I will check that in a separate step? No, I'll blindly assume I must use client component for now 
  // because I saw `use client` in other parts.
  // WAIT, I can just make this page `use client`? No, metadata export needs server component.
  // So I'll fetch data in a separate Client Component wrapper or 
  // use `fetch` with `process.env.NEXT_PUBLIC_SUPABASE_URL` + anon key.

  // Actually, `ArticleGrid` is already `use client`. I can fetch data THERE.
  // But passing data from server is better for SEO.
  // Let's try to find `lib/supabase/server.ts` first? 
  // I'll assume it DOES NOT exist based on file list.
  // I'll make a `BlogDataWrapper` client component that fetches and renders `ArticleGrid`.
  // OR better: Just fetch in `ArticleGrid`? 
  // `ArticleGrid` currently takes `posts` prop.
  // I will make `ResourcesBlogPage` fetch data using `fetch`.

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  let posts = [];
  try {
    const res = await fetch(`${supabaseUrl}/rest/v1/posts?select=*&published=is.true&order=created_at.desc`, {
      headers: {
        'apikey': supabaseKey!,
        'Authorization': `Bearer ${supabaseKey}`
      },
      next: { revalidate: 60 }
    });
    if (res.ok) {
      posts = await res.json();
    }
  } catch (e) {
    console.error(e);
  }

  return (
    <main className="min-h-screen bg-background">
      <Header />

      <div className="pt-20">
        <BlogHero />
        {/* <FeaturedArticles /> */}
        <ArticleGrid posts={posts} locale={locale} />
        <NewsletterSection />
      </div>
    </main>
  );
}