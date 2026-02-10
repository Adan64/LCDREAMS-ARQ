'use client';

import React from 'react';
import Icon from '@/components/ui/AppIcon';
import { useTranslations } from 'next-intl';

interface Resource {
  title: string;
  description: string;
  fileSize: string;
  icon: string;
}

interface DownloadableResourcesProps {
  resources: Resource[];
}

const DownloadableResources = ({ resources }: DownloadableResourcesProps) => {
  const t = useTranslations('ProjectCaseStudies.common.resources');
  const handleDownload = (title: string) => {
    alert(`Descargando: ${title}\n\nEsta es una demostración. En producción, esto iniciaría la descarga del archivo.`);
  };

  return (
    <section className="py-16 lg:py-24 bg-muted">
      <div className="max-w-5xl mx-auto px-6 lg:px-12">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-headline-bold mb-4 text-[rgba(253,252,252,1)]">
            {t('title')}
          </h2>
          <p className="font-body text-lg text-text-secondary">
            {t('description')}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {resources.map((resource, index) =>
            <button
              key={index}
              onClick={() => handleDownload(resource.title)}
              className="bg-card rounded-lg p-6 shadow-architectural transition-smooth hover:shadow-elevated hover:-translate-y-1 text-left group">

              <div className="flex items-start space-x-4">
                <div className="w-14 h-14 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0 group-hover:bg-accent/20 transition-smooth">
                  <Icon name={resource.icon as any} size={28} className="text-accent" />
                </div>

                <div className="flex-1">
                  <h3 className="font-headline text-lg font-headline-bold text-primary mb-2 group-hover:text-accent transition-smooth">
                    {resource.title}
                  </h3>
                  <p className="font-body text-sm text-text-secondary mb-3">
                    {resource.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="font-body text-xs text-text-secondary">
                      {resource.fileSize}
                    </span>
                    <div className="flex items-center space-x-2 text-accent">
                      <Icon name="ArrowDownTrayIcon" size={16} />
                      <span className="font-body text-sm font-body-semibold">
                        {t('download')}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </button>
          )}
        </div>
      </div>
    </section>);

};

export default DownloadableResources;