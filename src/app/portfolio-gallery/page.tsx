import type { Metadata } from 'next';
import Header from '@/components/common/Header';
import StatsBar from './components/StatsBar';
import PortfolioGalleryInteractive from './components/PortfolioGalleryInteractive';
import Icon from '@/components/ui/AppIcon';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Galería de Proyectos - ArchiVision',
  description: 'Explore nuestra colección de proyectos arquitectónicos excepcionales que abarcan diseño residencial, comercial, urbanismo y diseño interior, demostrando excelencia en cada detalle.',
};

const PortfolioGalleryPage = () => {
  const stats = [
    { icon: 'BuildingOffice2Icon', value: '150+', label: 'Proyectos Completados' },
    { icon: 'UserGroupIcon', value: '200+', label: 'Clientes Satisfechos' },
    { icon: 'TrophyIcon', value: '25+', label: 'Premios Ganados' },
    { icon: 'GlobeAltIcon', value: '15+', label: 'Países' },
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
                  Nuestro Portafolio
                </span>
              </div>
              
              <h1 className="font-headline text-5xl md:text-6xl font-headline-bold mb-6">
                Galería de Proyectos
              </h1>
              
              <p className="font-body text-xl font-body-regular opacity-90 mb-8">
                Descubra nuestra colección de proyectos arquitectónicos que transforman espacios en experiencias excepcionales. Cada diseño refleja nuestro compromiso con la excelencia, la innovación y la sostenibilidad.
              </p>

              <div className="flex flex-wrap gap-4">
                <Link
                  href="/contact"
                  className="inline-flex items-center space-x-2 px-6 py-3 font-cta text-base font-cta-semibold text-accent-foreground bg-accent rounded-md transition-smooth hover:bg-accent/90 hover:shadow-architectural hover:-translate-y-0.5"
                >
                  <span>Iniciar un Proyecto</span>
                  <Icon name="ArrowRightIcon" size={20} />
                </Link>
                
                <Link
                  href="/services"
                  className="inline-flex items-center space-x-2 px-6 py-3 font-cta text-base font-cta-semibold text-primary-foreground bg-transparent border-2 border-primary-foreground rounded-md transition-smooth hover:bg-primary-foreground hover:text-primary"
                >
                  <span>Ver Servicios</span>
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
                  ¿Tiene un Proyecto en Mente?
                </h2>
                
                <p className="font-body text-lg font-body-regular opacity-90 mb-8">
                  Transformemos su visión en realidad. Nuestro equipo está listo para crear espacios excepcionales que superen sus expectativas.
                </p>
                
                <Link
                  href="/contact"
                  className="inline-flex items-center space-x-2 px-8 py-4 font-cta text-base font-cta-semibold text-primary bg-primary-foreground rounded-md transition-smooth hover:bg-accent hover:text-accent-foreground hover:shadow-elevated hover:-translate-y-0.5"
                >
                  <span>Agendar Consulta Gratuita</span>
                  <Icon name="CalendarDaysIcon" size={20} />
                </Link>
              </div>
            </div>
          </div>
        </section>

        <footer className="bg-primary text-primary-foreground py-12">
          <div className="max-w-7xl mx-auto px-6 lg:px-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
              <div>
                <div className="flex items-center space-x-3 mb-4">
                  <svg
                    width="40"
                    height="40"
                    viewBox="0 0 48 48"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M24 4L4 16V32L24 44L44 32V16L24 4Z"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-primary-foreground"
                    />
                    <path
                      d="M24 4V44M4 16L44 32M44 16L4 32"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-accent"
                    />
                  </svg>
                  <span className="font-headline text-2xl font-headline-bold">ArchiVision</span>
                </div>
                <p className="font-body text-sm font-body-regular opacity-80">
                  Transformando espacios con visión y creatividad desde 2010.
                </p>
              </div>

              <div>
                <h3 className="font-headline text-lg font-headline-bold mb-4">Enlaces Rápidos</h3>
                <ul className="space-y-2">
                  <li>
                    <Link href="/homepage" className="font-body text-sm font-body-regular opacity-80 hover:opacity-100 hover:text-accent transition-smooth">
                      Inicio
                    </Link>
                  </li>
                  <li>
                    <Link href="/services" className="font-body text-sm font-body-regular opacity-80 hover:opacity-100 hover:text-accent transition-smooth">
                      Servicios
                    </Link>
                  </li>
                  <li>
                    <Link href="/about" className="font-body text-sm font-body-regular opacity-80 hover:opacity-100 hover:text-accent transition-smooth">
                      Sobre Nosotros
                    </Link>
                  </li>
                  <li>
                    <Link href="/contact" className="font-body text-sm font-body-regular opacity-80 hover:opacity-100 hover:text-accent transition-smooth">
                      Contacto
                    </Link>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="font-headline text-lg font-headline-bold mb-4">Contacto</h3>
                <ul className="space-y-3">
                  <li className="flex items-start space-x-2">
                    <Icon name="MapPinIcon" size={20} className="text-accent flex-shrink-0 mt-0.5" />
                    <span className="font-body text-sm font-body-regular opacity-80">
                      Calle Arquitectura 123, Barcelona, España
                    </span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <Icon name="PhoneIcon" size={20} className="text-accent flex-shrink-0" />
                    <span className="font-body text-sm font-body-regular opacity-80">
                      +34 912 345 678
                    </span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <Icon name="EnvelopeIcon" size={20} className="text-accent flex-shrink-0" />
                    <span className="font-body text-sm font-body-regular opacity-80">
                      info@archivision.es
                    </span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="pt-8 border-t border-primary-foreground/20 text-center">
              <p className="font-body text-sm font-body-regular opacity-80">
                &copy; {new Date().getFullYear()} ArchiVision. Todos los derechos reservados.
              </p>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
};

export default PortfolioGalleryPage;