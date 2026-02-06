import React from 'react';
import { useTranslations } from 'next-intl';
import Icon from '@/components/ui/AppIcon';

interface ResponseTimeProps {
  className?: string;
}

const ResponseTime = ({ className = '' }: ResponseTimeProps) => {
  const t = useTranslations('Contact.responseTime');

  const responseInfo = [
    {
      icon: 'ClockIcon',
      title: t('title1'),
      description: t('desc1')
    },
    {
      icon: 'ChatBubbleLeftRightIcon',
      title: t('title2'),
      description: t('desc2')
    },
    {
      icon: 'ShieldCheckIcon',
      title: t('title3'),
      description: t('desc3')
    }
  ];

  return (
    <section className={`py-12 bg-muted ${className}`}>
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {responseInfo.map((info, index) => (
            <div key={index} className="flex items-start space-x-4">
              <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center flex-shrink-0">
                <Icon name={info.icon as any} size={20} className="text-accent" />
              </div>
              <div>
                <h3 className="font-body text-base font-body-semibold text-primary mb-1">
                  {info.title}
                </h3>
                <p className="font-body text-sm text-text-secondary">
                  {info.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ResponseTime;