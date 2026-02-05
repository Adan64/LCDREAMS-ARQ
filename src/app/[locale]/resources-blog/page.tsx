import type { Metadata } from 'next';
import Header from '@/components/common/Header';
import BlogHero from './components/BlogHero';
import FeaturedArticles from './components/FeaturedArticles';
import ArticleGrid from './components/ArticleGrid';
import NewsletterSection from './components/NewsletterSection';

export const metadata: Metadata = {
  title: 'Resources & Blog - LCDREAM.ARQ',
  description: 'Explora artículos sobre tendencias arquitectónicas, sostenibilidad, innovación y consejos prácticos para clientes. Contenido educativo de expertos en arquitectura.',
};

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