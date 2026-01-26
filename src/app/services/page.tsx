import type { Metadata } from 'next';
import Header from '@/components/common/Header';
import Icon from '@/components/ui/AppIcon';
import Link from 'next/link';
import ServicesInteractive from './components/ServicesInteractive';

export const metadata: Metadata = {
  title: 'Servicios - LCDREAM.ARQ',
  description: 'Descubre nuestra gama completa de servicios arquitectónicos, desde diseño residencial hasta proyectos comerciales y urbanismo. Proceso transparente, plazos claros y resultados excepcionales.'
};

export default function ServicesPage() {
  const services = [
  {
    icon: 'HomeModernIcon',
    title: 'Arquitectura Residencial',
    description: 'Diseño de viviendas unifamiliares, adosados y edificios residenciales que combinan funcionalidad, estética y sostenibilidad.',
    features: [
    'Diseño arquitectónico completo',
    'Planos de construcción y detalles técnicos',
    'Gestión de permisos y licencias',
    'Supervisión de obra',
    'Certificación energética',
    'Diseño de espacios exteriores'],

    timeline: '4-8 meses',
    priceRange: '€15.000 - €50.000'
  },
  {
    icon: 'BuildingOfficeIcon',
    title: 'Arquitectura Comercial',
    description: 'Proyectos comerciales que optimizan la experiencia del cliente y reflejan la identidad de tu marca.',
    features: [
    'Análisis de necesidades comerciales',
    'Diseño de espacios funcionales',
    'Optimización de flujos de trabajo',
    'Cumplimiento normativo comercial',
    'Diseño de fachadas corporativas',
    'Proyectos llave en mano'],

    timeline: '6-12 meses',
    priceRange: '€25.000 - €100.000'
  },
  {
    icon: 'PaintBrushIcon',
    title: 'Diseño de Interiores',
    description: 'Transformación de espacios interiores con soluciones creativas que mejoran la funcionalidad y el confort.',
    features: [
    'Distribución y optimización de espacios',
    'Selección de materiales y acabados',
    'Diseño de mobiliario a medida',
    'Iluminación arquitectónica',
    'Renders 3D fotorrealistas',
    'Coordinación con proveedores'],

    timeline: '2-4 meses',
    priceRange: '€8.000 - €30.000'
  },
  {
    icon: 'WrenchScrewdriverIcon',
    title: 'Reformas Integrales',
    description: 'Renovación completa de espacios existentes con enfoque en modernización y eficiencia energética.',
    features: [
    'Estudio de viabilidad técnica',
    'Proyecto de reforma completo',
    'Gestión de licencias de obra',
    'Dirección de obra especializada',
    'Control de calidad y plazos',
    'Certificados finales de obra'],

    timeline: '3-6 meses',
    priceRange: '€12.000 - €40.000'
  },
  {
    icon: 'MapIcon',
    title: 'Urbanismo y Planificación',
    description: 'Desarrollo de planes urbanísticos y estudios de viabilidad para proyectos de mayor escala.',
    features: [
    'Estudios de viabilidad urbanística',
    'Planes parciales y especiales',
    'Proyectos de urbanización',
    'Estudios de impacto ambiental',
    'Gestión administrativa completa',
    'Asesoramiento legal urbanístico'],

    timeline: '8-18 meses',
    priceRange: '€30.000 - €150.000'
  },
  {
    icon: 'DocumentCheckIcon',
    title: 'Consultoría y Asesoramiento',
    description: 'Servicios de consultoría especializada para optimizar proyectos existentes o en fase de planificación.',
    features: [
    'Análisis de proyectos existentes',
    'Asesoramiento técnico especializado',
    'Estudios de viabilidad económica',
    'Informes periciales',
    'Auditorías energéticas',
    'Planes de mantenimiento'],

    timeline: '1-3 meses',
    priceRange: '€3.000 - €15.000'
  }];


  const processSteps = [
  {
    number: '01',
    title: 'Consulta Inicial',
    description: 'Reunión para conocer tus necesidades, objetivos y presupuesto. Analizamos la viabilidad del proyecto y establecemos las bases de colaboración.',
    duration: '1-2 semanas',
    icon: 'ChatBubbleLeftRightIcon'
  },
  {
    number: '02',
    title: 'Estudio Preliminar',
    description: 'Desarrollo de propuestas conceptuales con bocetos y renders 3D. Presentación de alternativas y refinamiento según tus preferencias.',
    duration: '2-4 semanas',
    icon: 'PencilSquareIcon'
  },
  {
    number: '03',
    title: 'Proyecto Básico',
    description: 'Elaboración de planos detallados, memorias técnicas y presupuestos. Definición completa del alcance del proyecto.',
    duration: '4-8 semanas',
    icon: 'DocumentTextIcon'
  },
  {
    number: '04',
    title: 'Proyecto de Ejecución',
    description: 'Desarrollo de toda la documentación técnica necesaria para la construcción. Detalles constructivos, instalaciones y especificaciones.',
    duration: '6-10 semanas',
    icon: 'CubeIcon'
  },
  {
    number: '05',
    title: 'Tramitación',
    description: 'Gestión de permisos, licencias y autorizaciones necesarias ante organismos oficiales. Seguimiento hasta la aprobación.',
    duration: '8-16 semanas',
    icon: 'ClipboardDocumentCheckIcon'
  },
  {
    number: '06',
    title: 'Dirección de Obra',
    description: 'Supervisión técnica durante la construcción. Control de calidad, plazos y presupuesto. Coordinación con contratistas.',
    duration: 'Según proyecto',
    icon: 'BuildingOffice2Icon'
  }];


  const comparisonFeatures = [
  { name: 'Consulta inicial', basic: true, standard: true, premium: true },
  { name: 'Estudio preliminar', basic: true, standard: true, premium: true },
  { name: 'Renders 3D básicos', basic: true, standard: true, premium: true },
  { name: 'Proyecto básico', basic: true, standard: true, premium: true },
  { name: 'Proyecto de ejecución', basic: false, standard: true, premium: true },
  { name: 'Renders 3D fotorrealistas', basic: false, standard: true, premium: true },
  { name: 'Recorrido virtual 360°', basic: false, standard: false, premium: true },
  { name: 'Tramitación de licencias', basic: false, standard: true, premium: true },
  { name: 'Dirección de obra', basic: false, standard: false, premium: true },
  { name: 'Certificación energética', basic: false, standard: true, premium: true },
  { name: 'Diseño de paisajismo', basic: false, standard: false, premium: true },
  { name: 'Mobiliario a medida', basic: false, standard: false, premium: true },
  { name: 'Asesoramiento post-obra', basic: false, standard: true, premium: true },
  { name: 'Garantía extendida', basic: false, standard: false, premium: true }];


  const projectTypes = [
  { id: 'residential', name: 'Residencial', baseTimeline: 24, icon: 'HomeIcon' },
  { id: 'commercial', name: 'Comercial', baseTimeline: 32, icon: 'BuildingStorefrontIcon' },
  { id: 'interior', name: 'Interiores', baseTimeline: 12, icon: 'SparklesIcon' },
  { id: 'renovation', name: 'Reforma', baseTimeline: 16, icon: 'WrenchIcon' }];


  const availableDates = [
  '25 Ene',
  '27 Ene',
  '29 Ene',
  '01 Feb',
  '03 Feb',
  '05 Feb',
  '08 Feb',
  '10 Feb'];


  const guides = [
  {
    id: 'guide-1',
    title: 'Guía Completa de Planificación',
    description: 'Todo lo que necesitas saber antes de iniciar tu proyecto arquitectónico.',
    pages: 24,
    fileSize: '3.2 MB',
    coverImage: "https://images.unsplash.com/photo-1542621334-a254cf47733d",
    coverAlt: 'Modern architectural blueprint with ruler and pencil on white desk'
  },
  {
    id: 'guide-2',
    title: 'Sostenibilidad en Arquitectura',
    description: 'Estrategias y mejores prácticas para proyectos eco-eficientes.',
    pages: 18,
    fileSize: '2.8 MB',
    coverImage: "https://img.rocket.new/generatedImages/rocket_gen_img_1e3a8cbb3-1769164898846.png",
    coverAlt: 'Green sustainable building with vertical gardens and solar panels'
  },
  {
    id: 'guide-3',
    title: 'Presupuestos y Costes',
    description: 'Cómo estimar y controlar el presupuesto de tu proyecto.',
    pages: 16,
    fileSize: '2.1 MB',
    coverImage: "https://images.unsplash.com/photo-1584346881556-19b8804d414f",
    coverAlt: 'Calculator and financial documents on wooden desk with coffee cup'
  }];


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
                  Servicios Profesionales
                </span>
              </div>

              <h1 className="font-headline text-4xl lg:text-6xl font-headline-bold text-primary-foreground mb-6">
                Transformamos tus ideas en espacios extraordinarios
              </h1>

              <p className="font-body text-xl font-body-regular text-primary-foreground/90 mb-8 leading-relaxed">
                Ofrecemos una gama completa de servicios arquitectónicos con un enfoque personalizado, desde el concepto inicial hasta la entrega final. Cada proyecto es único y merece una atención excepcional.
              </p>

              <div className="flex flex-wrap gap-4">
                <Link
                  href="/contact"
                  className="inline-flex items-center px-8 py-4 bg-accent text-accent-foreground rounded-lg font-cta text-base font-cta-semibold transition-smooth hover:bg-accent/90 hover:shadow-architectural hover:-translate-y-0.5">

                  <Icon name="CalendarIcon" size={20} className="mr-2" />
                  Reservar Consulta
                </Link>
                <Link
                  href="/portfolio-gallery"
                  className="inline-flex items-center px-8 py-4 bg-primary-foreground/10 text-primary-foreground rounded-lg font-cta text-base font-cta-semibold transition-smooth hover:bg-primary-foreground/20 backdrop-blur-sm">

                  <Icon name="RectangleStackIcon" size={20} className="mr-2" />
                  Ver Portfolio
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 lg:py-32">
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <div className="text-center mb-16">
              <h2 className="font-headline text-3xl lg:text-5xl font-headline-bold text-primary mb-6">
                Nuestros Servicios
              </h2>
              <p className="font-body text-lg font-body-regular text-secondary max-w-3xl mx-auto">
                Soluciones arquitectónicas integrales adaptadas a cada tipo de proyecto y necesidad
              </p>
            </div>

            <ServicesInteractive
              services={services}
              processSteps={processSteps}
              comparisonFeatures={comparisonFeatures}
              projectTypes={projectTypes}
              availableDates={availableDates}
              guides={guides} />

          </div>
        </section>

        <section className="py-20 lg:py-32 bg-muted/30">
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="inline-flex items-center space-x-2 px-4 py-2 bg-accent/10 rounded-full mb-6">
                  <Icon name="ShieldCheckIcon" size={20} className="text-accent" />
                  <span className="font-body text-sm font-body-semibold text-accent uppercase tracking-wide">
                    Garantía de Calidad
                  </span>
                </div>

                <h2 className="font-headline text-3xl lg:text-4xl font-headline-bold text-primary mb-6">
                  Comprometidos con la excelencia
                </h2>

                <p className="font-body text-lg font-body-regular text-secondary mb-8">
                  Todos nuestros servicios están respaldados por certificaciones profesionales, seguros de responsabilidad civil y un equipo con más de 15 años de experiencia en el sector.
                </p>

                <div className="space-y-4">
                  {[
                  { icon: 'AcademicCapIcon', text: 'Arquitectos colegiados y certificados' },
                  { icon: 'DocumentCheckIcon', text: 'Cumplimiento normativo garantizado' },
                  { icon: 'UserGroupIcon', text: 'Equipo multidisciplinar especializado' },
                  { icon: 'ClockIcon', text: 'Compromiso con plazos establecidos' }].
                  map((item, index) =>
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
                  )}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                {[
                { number: '150+', label: 'Proyectos completados' },
                { number: '98%', label: 'Satisfacción del cliente' },
                { number: '15+', label: 'Años de experiencia' },
                { number: '25+', label: 'Premios y reconocimientos' }].
                map((stat, index) =>
                <div key={index} className="bg-card rounded-lg p-8 shadow-architectural text-center">
                    <span className="font-headline text-4xl font-headline-bold text-accent block mb-2">
                      {stat.number}
                    </span>
                    <span className="font-body text-sm font-body-regular text-secondary">
                      {stat.label}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 lg:py-32 bg-gradient-to-br from-accent via-accent/95 to-accent/90">
          <div className="max-w-4xl mx-auto px-6 lg:px-12 text-center">
            <Icon name="ChatBubbleBottomCenterTextIcon" size={48} className="text-accent-foreground mx-auto mb-6" />
            
            <h2 className="font-headline text-3xl lg:text-4xl font-headline-bold text-accent-foreground mb-6">
              ¿Listo para comenzar tu proyecto?
            </h2>

            <p className="font-body text-lg font-body-regular text-accent-foreground/90 mb-8">
              Agenda una consulta gratuita y descubre cómo podemos transformar tu visión en realidad
            </p>

            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center px-8 py-4 bg-accent-foreground text-accent rounded-lg font-cta text-base font-cta-semibold transition-smooth hover:bg-accent-foreground/90 hover:shadow-architectural hover:-translate-y-0.5">

                <Icon name="PhoneIcon" size={20} className="mr-2" />
                Contactar Ahora
              </Link>
              <Link
                href="/project-case-studies"
                className="inline-flex items-center px-8 py-4 bg-accent-foreground/10 text-accent-foreground rounded-lg font-cta text-base font-cta-semibold transition-smooth hover:bg-accent-foreground/20 backdrop-blur-sm">

                <Icon name="BookOpenIcon" size={20} className="mr-2" />
                Ver Casos de Estudio
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
                { label: 'Sobre Nosotros', href: '/about' }].
                map((link) =>
                <li key={link.href}>
                    <Link
                    href={link.href}
                    className="font-body text-sm font-body-regular text-primary-foreground/80 hover:text-accent transition-smooth">

                      {link.label}
                    </Link>
                  </li>
                )}
              </ul>
            </div>

            <div>
              <h4 className="font-body text-sm font-body-semibold mb-4 uppercase tracking-wide">Servicios</h4>
              <ul className="space-y-2">
                {[
                'Arquitectura Residencial',
                'Diseño Comercial',
                'Reformas Integrales',
                'Consultoría'].
                map((service) =>
                <li key={service}>
                    <span className="font-body text-sm font-body-regular text-primary-foreground/80">
                      {service}
                    </span>
                  </li>
                )}
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
    </div>);

}