import { useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import Header from '@/components/common/Header';
import Icon from '@/components/ui/AppIcon';
import Link from 'next/link';
import ServicesInteractive from './components/ServicesInteractive';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Services.metadata' });

  return {
    title: t('title'),
    description: t('description')
  };
}

export default function ServicesPage() {
  const t = useTranslations('Services');

  const services = [
    {
      icon: 'HomeModernIcon',
      title: t('servicesList.items.residential.title'),
      description: t('servicesList.items.residential.description'),
      features: [
        t('servicesList.items.residential.features.0'),
        t('servicesList.items.residential.features.1'),
        t('servicesList.items.residential.features.2'),
        t('servicesList.items.residential.features.3'),
        t('servicesList.items.residential.features.4'),
        t('servicesList.items.residential.features.5')
      ],
      timeline: t('servicesList.items.residential.timeline'),
      priceRange: t('servicesList.items.residential.priceRange')
    },
    {
      icon: 'BuildingOfficeIcon',
      title: t('servicesList.items.commercial.title'),
      description: t('servicesList.items.commercial.description'),
      features: [
        t('servicesList.items.commercial.features.0'),
        t('servicesList.items.commercial.features.1'),
        t('servicesList.items.commercial.features.2'),
        t('servicesList.items.commercial.features.3'),
        t('servicesList.items.commercial.features.4'),
        t('servicesList.items.commercial.features.5')
      ],
      timeline: t('servicesList.items.commercial.timeline'),
      priceRange: t('servicesList.items.commercial.priceRange')
    },
    {
      icon: 'PaintBrushIcon',
      title: t('servicesList.items.interior.title'),
      description: t('servicesList.items.interior.description'),
      features: [
        t('servicesList.items.interior.features.0'),
        t('servicesList.items.interior.features.1'),
        t('servicesList.items.interior.features.2'),
        t('servicesList.items.interior.features.3'),
        t('servicesList.items.interior.features.4'),
        t('servicesList.items.interior.features.5')
      ],
      timeline: t('servicesList.items.interior.timeline'),
      priceRange: t('servicesList.items.interior.priceRange')
    },
    {
      icon: 'WrenchScrewdriverIcon',
      title: t('servicesList.items.renovation.title'),
      description: t('servicesList.items.renovation.description'),
      features: [
        t('servicesList.items.renovation.features.0'),
        t('servicesList.items.renovation.features.1'),
        t('servicesList.items.renovation.features.2'),
        t('servicesList.items.renovation.features.3'),
        t('servicesList.items.renovation.features.4'),
        t('servicesList.items.renovation.features.5')
      ],
      timeline: t('servicesList.items.renovation.timeline'),
      priceRange: t('servicesList.items.renovation.priceRange')
    },
    {
      icon: 'MapIcon',
      title: t('servicesList.items.urban.title'),
      description: t('servicesList.items.urban.description'),
      features: [
        t('servicesList.items.urban.features.0'),
        t('servicesList.items.urban.features.1'),
        t('servicesList.items.urban.features.2'),
        t('servicesList.items.urban.features.3'),
        t('servicesList.items.urban.features.4'),
        t('servicesList.items.urban.features.5')
      ],
      timeline: t('servicesList.items.urban.timeline'),
      priceRange: t('servicesList.items.urban.priceRange')
    },
    {
      icon: 'DocumentCheckIcon',
      title: t('servicesList.items.consulting.title'),
      description: t('servicesList.items.consulting.description'),
      features: [
        t('servicesList.items.consulting.features.0'),
        t('servicesList.items.consulting.features.1'),
        t('servicesList.items.consulting.features.2'),
        t('servicesList.items.consulting.features.3'),
        t('servicesList.items.consulting.features.4'),
        t('servicesList.items.consulting.features.5')
      ],
      timeline: t('servicesList.items.consulting.timeline'),
      priceRange: t('servicesList.items.consulting.priceRange')
    }
  ];

  const processSteps = [
    {
      number: '01',
      title: t('process.steps.0.title'),
      description: t('process.steps.0.description'),
      duration: t('process.steps.0.duration'),
      icon: 'ChatBubbleLeftRightIcon'
    },
    {
      number: '02',
      title: t('process.steps.1.title'),
      description: t('process.steps.1.description'),
      duration: t('process.steps.1.duration'),
      icon: 'PencilSquareIcon'
    },
    {
      number: '03',
      title: t('process.steps.2.title'),
      description: t('process.steps.2.description'),
      duration: t('process.steps.2.duration'),
      icon: 'DocumentTextIcon'
    },
    {
      number: '04',
      title: t('process.steps.3.title'),
      description: t('process.steps.3.description'),
      duration: t('process.steps.3.duration'),
      icon: 'CubeIcon'
    },
    {
      number: '05',
      title: t('process.steps.4.title'),
      description: t('process.steps.4.description'),
      duration: t('process.steps.4.duration'),
      icon: 'ClipboardDocumentCheckIcon'
    },
    {
      number: '06',
      title: t('process.steps.5.title'),
      description: t('process.steps.5.description'),
      duration: t('process.steps.5.duration'),
      icon: 'BuildingOffice2Icon'
    }
  ];

  const comparisonFeatures = [
    { name: t('comparison.table.features.initialConsultation'), basic: true, standard: true, premium: true },
    { name: t('comparison.table.features.preliminaryStudy'), basic: true, standard: true, premium: true },
    { name: t('comparison.table.features.basicRenders'), basic: true, standard: true, premium: true },
    { name: t('comparison.table.features.basicProject'), basic: true, standard: true, premium: true },
    { name: t('comparison.table.features.executionProject'), basic: false, standard: true, premium: true },
    { name: t('comparison.table.features.photorealisticRenders'), basic: false, standard: true, premium: true },
    { name: t('comparison.table.features.virtualTour'), basic: false, standard: false, premium: true },
    { name: t('comparison.table.features.licensing'), basic: false, standard: true, premium: true },
    { name: t('comparison.table.features.siteSupervision'), basic: false, standard: false, premium: true },
    { name: t('comparison.table.features.energyCertification'), basic: false, standard: true, premium: true },
    { name: t('comparison.table.features.landscaping'), basic: false, standard: false, premium: true },
    { name: t('comparison.table.features.customFurniture'), basic: false, standard: false, premium: true },
    { name: t('comparison.table.features.postConstructionAdvice'), basic: false, standard: true, premium: true },
    { name: t('comparison.table.features.extendedWarranty'), basic: false, standard: false, premium: true }
  ];

  const projectTypes = [
    { id: 'residential', name: t('calculator.types.residential'), baseTimeline: 24, icon: 'HomeIcon' },
    { id: 'commercial', name: t('calculator.types.commercial'), baseTimeline: 32, icon: 'BuildingStorefrontIcon' },
    { id: 'interior', name: t('calculator.types.interior'), baseTimeline: 12, icon: 'SparklesIcon' },
    { id: 'renovation', name: t('calculator.types.renovation'), baseTimeline: 16, icon: 'WrenchIcon' }
  ];

  const availableDates = [
    '25 Ene',
    '27 Ene',
    '29 Ene',
    '01 Feb',
    '03 Feb',
    '05 Feb',
    '08 Feb',
    '10 Feb'
  ];

  const guides = [
    {
      id: 'guide-1',
      title: t('guides.items.guide1.title'),
      description: t('guides.items.guide1.description'),
      pages: 24,
      fileSize: '3.2 MB',
      coverImage: "https://images.unsplash.com/photo-1542621334-a254cf47733d",
      coverAlt: 'Modern architectural blueprint with ruler and pencil on white desk'
    },
    {
      id: 'guide-2',
      title: t('guides.items.guide2.title'),
      description: t('guides.items.guide2.description'),
      pages: 18,
      fileSize: '2.8 MB',
      coverImage: "https://img.rocket.new/generatedImages/rocket_gen_img_1e3a8cbb3-1769164898846.png",
      coverAlt: 'Green sustainable building with vertical gardens and solar panels'
    },
    {
      id: 'guide-3',
      title: t('guides.items.guide3.title'),
      description: t('guides.items.guide3.description'),
      pages: 16,
      fileSize: '2.1 MB',
      coverImage: "https://images.unsplash.com/photo-1584346881556-19b8804d414f",
      coverAlt: 'Calculator and financial documents on wooden desk with coffee cup'
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="pt-20">
        <section className="relative py-20 lg:py-32 bg-gradient-to-br from-primary via-primary/95 to-secondary overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-0 w-96 h-96 bg-accent rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent rounded-full blur-3xl"></div>
          </div>

          <div className="relative max-w-7xl mx-auto px-6 lg:px-12">
            <div className="max-w-4xl">
              <div className="inline-flex items-center space-x-2 px-4 py-2 bg-accent/20 rounded-full mb-6">
                <Icon name="SparklesIcon" size={20} className="text-accent" />
                <span className="font-body text-sm font-body-semibold text-accent uppercase tracking-wide">
                  {t('hero.badge')}
                </span>
              </div>

              <h1 className="font-headline text-4xl lg:text-6xl font-headline-bold text-primary-foreground mb-6">
                {t('hero.title')}
              </h1>

              <p className="font-body text-xl font-body-regular text-primary-foreground/90 mb-8 leading-relaxed">
                {t('hero.description')}
              </p>

              <div className="flex flex-wrap gap-4">
                <Link
                  href="/contact"
                  className="inline-flex items-center px-8 py-4 bg-accent text-accent-foreground rounded-lg font-cta text-base font-cta-semibold transition-smooth hover:bg-accent/90 hover:shadow-architectural hover:-translate-y-0.5"
                >
                  <Icon name="CalendarIcon" size={20} className="mr-2" />
                  {t('hero.cta_consultation')}
                </Link>
                <Link
                  href="/portfolio-gallery"
                  className="inline-flex items-center px-8 py-4 bg-primary-foreground/10 text-primary-foreground rounded-lg font-cta text-base font-cta-semibold transition-smooth hover:bg-primary-foreground/20 backdrop-blur-sm"
                >
                  <Icon name="RectangleStackIcon" size={20} className="mr-2" />
                  {t('hero.cta_portfolio')}
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 lg:py-32">
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-5xl font-headline-bold mb-6 text-white">
                {t('intro.title')}
              </h2>
              <p className="font-body text-lg font-body-regular text-secondary max-w-3xl mx-auto">
                {t('intro.description')}
              </p>
            </div>

            <ServicesInteractive
              services={services}
              processSteps={processSteps}
              comparisonFeatures={comparisonFeatures}
              projectTypes={projectTypes}
              availableDates={availableDates}
              guides={guides}
            />
          </div>
        </section>

        <section className="py-20 lg:py-32 bg-muted/30">
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="inline-flex items-center space-x-2 px-4 py-2 bg-accent/10 rounded-full mb-6">
                  <Icon name="ShieldCheckIcon" size={20} className="text-accent" />
                  <span className="font-body text-sm font-body-semibold text-accent uppercase tracking-wide">
                    {t('quality.badge')}
                  </span>
                </div>

                <h2 className="text-3xl lg:text-4xl font-headline-bold mb-6 text-white">
                  {t('quality.title')}
                </h2>

                <p className="font-body text-lg font-body-regular text-secondary mb-8">
                  {t('quality.description')}
                </p>

                <div className="space-y-4">
                  {[
                    { icon: 'AcademicCapIcon', text: t('quality.items.0') },
                    { icon: 'DocumentCheckIcon', text: t('quality.items.1') },
                    { icon: 'UserGroupIcon', text: t('quality.items.2') },
                    { icon: 'ClockIcon', text: t('quality.items.3') }
                  ].map((item, index) => (
                    <div key={index} className="flex items-start space-x-4">
                      <div className="flex-shrink-0 w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center">
                        <Icon name={item.icon as any} size={24} className="text-accent" />
                      </div>
                      <div className="flex-1 pt-2">
                        <p className="font-body text-base font-body-regular text-text-primary">
                          {item.text}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                {[
                  { number: '150+', label: t('quality.stats.projects') },
                  { number: '98%', label: t('quality.stats.satisfaction') },
                  { number: '15+', label: t('quality.stats.experience') },
                  { number: '25+', label: t('quality.stats.awards') }
                ].map((stat, index) => (
                  <div key={index} className="bg-card rounded-lg p-8 shadow-architectural text-center">
                    <span className="font-headline text-4xl font-headline-bold text-accent block mb-2">
                      {stat.number}
                    </span>
                    <span className="font-body text-sm font-body-regular text-secondary">
                      {stat.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 lg:py-32 bg-gradient-to-br from-accent via-accent/95 to-accent/90">
          <div className="max-w-4xl mx-auto px-6 lg:px-12 text-center">
            <Icon name="ChatBubbleBottomCenterTextIcon" size={48} className="text-accent-foreground mx-auto mb-6" />

            <h2 className="font-headline text-3xl lg:text-4xl font-headline-bold text-accent-foreground mb-6">
              {t('cta.title')}
            </h2>

            <p className="font-body text-lg font-body-regular text-accent-foreground/90 mb-8">
              {t('cta.description')}
            </p>

            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center px-8 py-4 bg-accent-foreground text-accent rounded-lg font-cta text-base font-cta-semibold transition-smooth hover:bg-accent-foreground/90 hover:shadow-architectural hover:-translate-y-0.5"
              >
                <Icon name="PhoneIcon" size={20} className="mr-2" />
                {t('cta.contact')}
              </Link>
              <Link
                href="/project-case-studies"
                className="inline-flex items-center px-8 py-4 bg-accent-foreground/10 text-accent-foreground rounded-lg font-cta text-base font-cta-semibold transition-smooth hover:bg-accent-foreground/20 backdrop-blur-sm"
              >
                <Icon name="BookOpenIcon" size={20} className="mr-2" />
                {t('cta.caseStudies')}
              </Link>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-primary text-primary-foreground py-12">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="font-headline text-lg font-headline-bold mb-4">LCDREAM.ARQ</h3>
              <p className="font-body text-sm font-body-regular text-primary-foreground/80">
                Transformando espacios con visión y creatividad desde 2009
              </p>
            </div>

            <div>
              <h4 className="font-body text-sm font-body-semibold mb-4 uppercase tracking-wide">Navegación</h4>
              <ul className="space-y-2">
                {[
                  { label: 'Inicio', href: '/homepage' },
                  { label: 'Portfolio', href: '/portfolio-gallery' },
                  { label: 'Casos de Estudio', href: '/project-case-studies' },
                  { label: 'Sobre Nosotros', href: '/about' }
                ].map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="font-body text-sm font-body-regular text-primary-foreground/80 hover:text-accent transition-smooth"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-body text-sm font-body-semibold mb-4 uppercase tracking-wide">Servicios</h4>
              <ul className="space-y-2">
                {[
                  t('servicesList.items.residential.title'),
                  t('servicesList.items.commercial.title'),
                  t('servicesList.items.renovation.title'),
                  t('servicesList.items.consulting.title')
                ].map((service) => (
                  <li key={service}>
                    <span className="font-body text-sm font-body-regular text-primary-foreground/80">
                      {service}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-body text-sm font-body-semibold mb-4 uppercase tracking-wide">Contacto</h4>
              <ul className="space-y-2">
                <li className="flex items-start space-x-2">
                  <Icon name="EnvelopeIcon" size={16} className="text-accent mt-1 flex-shrink-0" />
                  <span className="font-body text-sm font-body-regular text-primary-foreground/80">
                    info@lcdream.arq
                  </span>
                </li>
                <li className="flex items-start space-x-2">
                  <Icon name="PhoneIcon" size={16} className="text-accent mt-1 flex-shrink-0" />
                  <span className="font-body text-sm font-body-regular text-primary-foreground/80">
                    +34 912 345 678
                  </span>
                </li>
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-primary-foreground/20 text-center">
            <p className="font-body text-sm font-body-regular text-primary-foreground/60">
              © {new Date().getFullYear()} LCDREAM.ARQ. Todos los derechos reservados.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}