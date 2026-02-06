'use client';

import React, { useState } from 'react';
import Icon from '@/components/ui/AppIcon';
import AppImage from '@/components/ui/AppImage';
import { useTranslations } from 'next-intl';

interface Guide {
  id: string;
  title: string;
  description: string;
  pages: number;
  fileSize: string;
  coverImage: string;
  coverAlt: string;
}

interface DownloadableGuideProps {
  guides: Guide[];
}

const DownloadableGuide = ({ guides }: DownloadableGuideProps) => {
  const t = useTranslations('Services.guides');
  const [downloadingId, setDownloadingId] = useState<string | null>(null);

  const handleDownload = (id: string) => {
    setDownloadingId(id);
    // Simulate download
    setTimeout(() => {
      setDownloadingId(null);
    }, 2000);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {guides.map((guide) => (
        <div key={guide.id} className="group bg-card rounded-lg overflow-hidden shadow-architectural hover:-translate-y-1 transition-smooth border border-border/50">
          <div className="relative h-48 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10" />
            <img
              src={guide.coverImage}
              alt={guide.coverAlt}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute bottom-4 left-4 z-20">
              <div className="inline-flex items-center space-x-2 text-white/80 text-xs font-body font-body-medium mb-1">
                <Icon name="DocumentTextIcon" size={14} />
                <span>{guide.pages} {t('pages')}</span>
                <span>•</span>
                <span>{guide.fileSize}</span>
              </div>
            </div>
          </div>

          <div className="p-6">
            <h3 className="font-headline text-lg font-headline-bold text-card-foreground mb-2 group-hover:text-accent transition-colors">
              {guide.title}
            </h3>
            <p className="font-body text-sm font-body-regular text-muted-foreground mb-6 line-clamp-2">
              {guide.description}
            </p>

            <button
              onClick={() => handleDownload(guide.id)}
              disabled={downloadingId === guide.id}
              className="w-full py-2 px-4 bg-muted text-muted-foreground rounded-lg font-cta text-sm font-cta-semibold hover:bg-accent hover:text-accent-foreground transition-all flex items-center justify-center space-x-2 group-hover:bg-accent group-hover:text-accent-foreground"
            >
              {downloadingId === guide.id ? (
                <>
                  <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                  <span>{t('downloading')}</span>
                </>
              ) : (
                <>
                  <Icon name="ArrowDownTrayIcon" size={16} />
                  <span>{t('download')}</span>
                </>
              )}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DownloadableGuide;