import React from 'react';
import { useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import Link from 'next/link';
import Header from '@/components/common/Header';
import FooterSection from '@/app/[locale]/homepage/components/FooterSection';
import CTASection from './components/CTASection';
import AppImage from '@/components/ui/AppImage';
import Icon from '@/components/ui/AppIcon';
import { projects } from './data';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'ProjectCaseStudies.metadata' });

  return {
    title: t('title'),
    description: t('description'),
  };
}

export default function ProjectCaseStudiesIndexPage() {
  const t = useTranslations('ProjectCaseStudies');

  return (
    <main className="min-h-screen bg-background">
      <Header />

      <div className="pt-32 pb-16 lg:pt-40 lg:pb-24 px-6 lg:px-12 max-w-7xl mx-auto">
        <div className="text-center mb-16 lg:mb-24">
          <h1 className="text-4xl lg:text-6xl font-headline-bold mb-6 text-neutral-50">
            {t('metadata.title').split('-')[0].trim()}
          </h1>
          <p className="font-body text-xl text-text-secondary max-w-3xl mx-auto">
            {t('metadata.description')}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-24">
          {projects.map((project) => (
            <Link
              key={project.id}
              href={`project-case-studies/${project.id}`}
              className="group block"
            >
              <article className="bg-card rounded-lg overflow-hidden border border-white/5 hover:border-accent/50 transition-colors duration-300 h-full flex flex-col">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <AppImage
                    src={project.heroImage}
                    alt={t(`projects.${project.key}.hero.imageAlt`)}
                    className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors duration-300" />

                  <div className="absolute top-4 left-4 bg-background/90 backdrop-blur-sm px-3 py-1 rounded-full border border-white/10">
                    <span className="text-xs font-body-semibold text-text-primary">
                      {t(`projects.${project.key}.hero.category`)}
                    </span>
                  </div>
                </div>

                <div className="p-6 flex-1 flex flex-col">
                  <div className="flex items-center space-x-2 text-text-secondary mb-3">
                    <Icon name="MapPinIcon" size={16} className="text-accent" />
                    <span className="text-sm font-body">
                      {t(`projects.${project.key}.hero.location`)}
                    </span>
                  </div>

                  <h2 className="text-xl font-headline-bold text-neutral-50 mb-3 group-hover:text-accent transition-colors">
                    {t(`projects.${project.key}.hero.title`)}
                  </h2>

                  <p className="text-text-secondary text-sm font-body line-clamp-3 mb-6 flex-1">
                    {t(`projects.${project.key}.overview.challenge`)}
                  </p>

                  <div className="flex items-center justify-between pt-4 border-t border-white/5">
                    <span className="text-accent font-body-semibold text-sm flex items-center">
                      {t('common.related.viewCaseStudy')}
                      <Icon name="ArrowRightIcon" size={16} className="ml-2 transition-transform group-hover:translate-x-1" />
                    </span>
                    <span className="text-text-secondary text-xs font-body">
                      {project.year}
                    </span>
                  </div>
                </div>
              </article>
            </Link>
          ))}
        </div>

        <CTASection />
      </div>

      <FooterSection />
    </main>
  );
}