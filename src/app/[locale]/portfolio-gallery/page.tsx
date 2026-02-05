import type { Metadata } from 'next';
import { useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import Header from '@/components/common/Header';
import StatsBar from './components/StatsBar';
import PortfolioGalleryInteractive from './components/PortfolioGalleryInteractive';
import Icon from '@/components/ui/AppIcon';
import Link from 'next/link';
import FooterSection from '../homepage/components/FooterSection';

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'PortfolioGallery.metadata' });
  return {
    title: t('title'),
    description: t('description'),
  };
}

const PortfolioGalleryPage = () => {
  const t = useTranslations('PortfolioGallery');

  const stats = [
    { icon: 'BuildingOffice2Icon', value: '150+', label: t('stats.projects') },
    { icon: 'UserGroupIcon', value: '200+', label: t('stats.clients') },
    { icon: 'TrophyIcon', value: '25+', label: t('stats.awards') },
    { icon: 'GlobeAltIcon', value: '15+', label: t('stats.countries') },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="pt-20">
        <section className="relative bg-primary text-primary-foreground py-24">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{
              backgroundImage: 'linear-gradient(45deg, transparent 48%, currentColor 48%, currentColor 52%, transparent 52%)',
              backgroundSize: '20px 20px'
            }} />
          </div>

          <div className="relative max-w-7xl mx-auto px-6 lg:px-12">
            <div className="max-w-3xl">
              <div className="flex items-center space-x-2 mb-6">
                <Icon name="RectangleStackIcon" size={24} className="text-accent" />
                <span className="font-body text-sm font-body-semibold text-accent uppercase tracking-wider">
                  {t('hero.subtitle')}
                </span>
              </div>

              <h1 className="font-headline text-5xl md:text-6xl font-headline-bold mb-6">
                {t('hero.title')}
              </h1>

              <p className="font-body text-xl font-body-regular opacity-90 mb-8">
                {t('hero.description')}
              </p>

              <div className="flex flex-wrap gap-4">
                <Link
                  href="/contact"
                  className="inline-flex items-center space-x-2 px-6 py-3 font-cta text-base font-cta-semibold text-accent-foreground bg-accent rounded-md transition-smooth hover:bg-accent/90 hover:shadow-architectural hover:-translate-y-0.5"
                >
                  <span>{t('hero.startProject')}</span>
                  <Icon name="ArrowRightIcon" size={20} />
                </Link>

                <Link
                  href="/services"
                  className="inline-flex items-center space-x-2 px-6 py-3 font-cta text-base font-cta-semibold text-primary-foreground bg-transparent border-2 border-primary-foreground rounded-md transition-smooth hover:bg-primary-foreground hover:text-primary"
                >
                  <span>{t('hero.viewServices')}</span>
                  <Icon name="SparklesIcon" size={20} />
                </Link>
              </div>
            </div>
          </div>
        </section>

        <StatsBar stats={stats} />

        <section className="py-16">
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <PortfolioGalleryInteractive />
          </div>
        </section>

        <section className="bg-card py-16">
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <div className="bg-gradient-to-br from-primary to-primary/80 rounded-2xl p-12 text-center text-primary-foreground relative overflow-hidden">
              <div className="absolute inset-0 opacity-10">
                <div className="absolute inset-0" style={{
                  backgroundImage: 'radial-gradient(circle, currentColor 1px, transparent 1px)',
                  backgroundSize: '30px 30px'
                }} />
              </div>

              <div className="relative max-w-3xl mx-auto">
                <Icon name="LightBulbIcon" size={48} className="text-accent mx-auto mb-6" />

                <h2 className="font-headline text-4xl font-headline-bold mb-4">
                  {t('cta.title')}
                </h2>

                <p className="font-body text-lg font-body-regular opacity-90 mb-8">
                  {t('cta.description')}
                </p>

                <Link
                  href="/contact"
                  className="inline-flex items-center space-x-2 px-8 py-4 font-cta text-base font-cta-semibold text-primary bg-primary-foreground rounded-md transition-smooth hover:bg-accent hover:text-accent-foreground hover:shadow-elevated hover:-translate-y-0.5"
                >
                  <span>{t('cta.button')}</span>
                  <Icon name="CalendarDaysIcon" size={20} />
                </Link>
              </div>
            </div>
          </div>
        </section>

        <FooterSection />
      </main>
    </div>
  );
};

export default PortfolioGalleryPage;