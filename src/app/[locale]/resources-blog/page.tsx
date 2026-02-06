import { getTranslations } from 'next-intl/server';
import Header from '@/components/common/Header';
import BlogHero from './components/BlogHero';
import FeaturedArticles from './components/FeaturedArticles';
import ArticleGrid from './components/ArticleGrid';
import NewsletterSection from './components/NewsletterSection';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'ResourcesBlog.metadata' });

  return {
    title: t('title'),
    description: t('description')
  };
}

export default function ResourcesBlogPage() {
  return (
    <main className="min-h-screen bg-background">
      <Header />

      <div className="pt-20">
        <BlogHero />
        <FeaturedArticles />
        <ArticleGrid />
        <NewsletterSection />
      </div>
    </main>
  );
}