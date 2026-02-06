import { useTranslations } from 'next-intl';
import Icon from '@/components/ui/AppIcon';

interface PhilosophyPrinciple {
  icon: string;
  title: string;
  description: string;
}

interface DesignPhilosophyProps {
  className?: string;
}

const DesignPhilosophy = ({ className = '' }: DesignPhilosophyProps) => {
  const t = useTranslations('About.philosophy');

  const principles: PhilosophyPrinciple[] = [
    {
      icon: "LightBulbIcon",
      title: t('principles.humanCentered.title'),
      description: t('principles.humanCentered.description')
    },
    {
      icon: "SparklesIcon",
      title: t('principles.timelessAesthetics.title'),
      description: t('principles.timelessAesthetics.description')
    },
    {
      icon: "GlobeAltIcon",
      title: t('principles.sustainableInnovation.title'),
      description: t('principles.sustainableInnovation.description')
    },
    {
      icon: "CubeTransparentIcon",
      title: t('principles.contextualIntegration.title'),
      description: t('principles.contextualIntegration.description')
    }
  ];

  return (
    <section className="py-20 lg:py-32 bg-lcdream-dark-bg">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="text-center mb-16">
          <span className="font-body text-sm font-body-semibold text-lcdream-gold uppercase tracking-wider mb-4 block">
            {t('subtitle')}
          </span>
          <h2 className="font-headline text-4xl lg:text-5xl font-headline-bold text-lcdream-white mb-6 leading-tight">
            {t('title')}
          </h2>
          <p className="font-body text-lg text-lcdream-gray-light font-body-regular leading-relaxed mb-8">
            {t('description')}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          {principles.map((principle, index) => (
            <div key={index} className="bg-black rounded-lg p-8 shadow-subtle border border-lcdream-gold/20 hover:border-lcdream-gold/40 transition-smooth">
              <div className="w-16 h-16 bg-lcdream-gold/10 rounded-full flex items-center justify-center mb-6 border border-lcdream-gold/30">
                <Icon name={principle.icon as any} size={32} className="text-lcdream-gold" />
              </div>
              <h3 className="font-headline text-xl font-headline-semibold text-lcdream-gold mb-3">
                {principle.title}
              </h3>
              <p className="font-body text-base text-lcdream-gray-light font-body-regular leading-relaxed">
                {principle.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DesignPhilosophy;