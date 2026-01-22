'use client';

import React, { useState } from 'react';
import Icon from '@/components/ui/AppIcon';
import AppImage from '@/components/ui/AppImage';

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
  const [downloadingId, setDownloadingId] = useState<string | null>(null);

  const handleDownload = (guideId: string) => {
    setDownloadingId(guideId);
    
    setTimeout(() => {
      setDownloadingId(null);
    }, 2000);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {guides.map((guide) => (
        <div key={guide.id} className="bg-card rounded-lg overflow-hidden shadow-architectural hover:shadow-elevated transition-smooth group">
          <div className="relative h-48 overflow-hidden">
            <AppImage
              src={guide.coverImage}
              alt={guide.coverAlt}
              className="w-full h-full object-cover group-hover:scale-105 transition-smooth"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent"></div>
            <div className="absolute bottom-4 left-4 right-4">
              <h4 className="font-headline text-lg font-headline-bold text-primary-foreground">
                {guide.title}
              </h4>
            </div>
          </div>

          <div className="p-6">
            <p className="font-body text-sm font-body-regular text-secondary mb-4">
              {guide.description}
            </p>

            <div className="flex items-center justify-between mb-4 pb-4 border-b border-border">
              <div className="flex items-center space-x-2">
                <Icon name="DocumentTextIcon" size={16} className="text-accent" />
                <span className="font-body text-xs font-body-regular text-secondary">
                  {guide.pages} páginas
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <Icon name="ArrowDownTrayIcon" size={16} className="text-accent" />
                <span className="font-body text-xs font-body-regular text-secondary">
                  {guide.fileSize}
                </span>
              </div>
            </div>

            <button
              onClick={() => handleDownload(guide.id)}
              disabled={downloadingId === guide.id}
              className="w-full py-3 px-4 bg-accent/10 text-accent rounded-lg font-body text-sm font-body-semibold transition-smooth hover:bg-accent hover:text-accent-foreground disabled:opacity-50 flex items-center justify-center space-x-2"
            >
              {downloadingId === guide.id ? (
                <>
                  <Icon name="ArrowPathIcon" size={18} className="animate-spin" />
                  <span>Descargando...</span>
                </>
              ) : (
                <>
                  <Icon name="ArrowDownTrayIcon" size={18} />
                  <span>Descargar Guía</span>
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