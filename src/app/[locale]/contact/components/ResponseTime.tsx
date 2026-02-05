import React from 'react';
import Icon from '@/components/ui/AppIcon';

interface ResponseTimeProps {
  className?: string;
}

const ResponseTime = ({ className = '' }: ResponseTimeProps) => {
  const responseInfo = [
    {
      icon: 'ClockIcon',
      title: '24-Hour Response',
      description: 'We respond to all inquiries within one business day'
    },
    {
      icon: 'ChatBubbleLeftRightIcon',
      title: 'Personalized Attention',
      description: 'Every inquiry receives individual attention from our team'
    },
    {
      icon: 'ShieldCheckIcon',
      title: 'Confidential & Secure',
      description: 'Your information is protected and never shared with third parties'
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