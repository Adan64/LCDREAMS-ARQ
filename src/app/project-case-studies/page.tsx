import type { Metadata } from 'next';
import Header from '@/components/common/Header';
import CaseStudyHero from './components/CaseStudyHero';
import ProjectOverview from './components/ProjectOverview';
import BeforeAfterSlider from './components/BeforeAfterSlider';
import DesignProcess from './components/DesignProcess';
import MaterialsShowcase from './components/MaterialsShowcase';
import ClientTestimonial from './components/ClientTestimonial';
import ProjectGallery from './components/ProjectGallery';
import SustainabilityFeatures from './components/SustainabilityFeatures';
import RelatedProjects from './components/RelatedProjects';
import DownloadableResources from './components/DownloadableResources';
import CTASection from './components/CTASection';
import Footer from './components/Footer';

export const metadata: Metadata = {
  title: 'Casos de Estudio de Proyectos - LCDREAM.ARQ',
  description: 'Explora casos de estudio detallados de nuestros proyectos arquitectónicos, mostrando el proceso de diseño, soluciones innovadoras y resultados transformadores que mejoran la vida de nuestros clientes.'
};

interface ProjectStat {
  icon: string;
  label: string;
  value: string;
}

interface ProcessStep {
  phase: string;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  icon: string;
}

interface Material {
  name: string;
  description: string;
  image: string;
  imageAlt: string;
  properties: string[];
}

interface GalleryImage {
  url: string;
  alt: string;
  caption: string;
}

interface SustainabilityFeature {
  icon: string;
  title: string;
  description: string;
  impact: string;
}

interface RelatedProject {
  id: string;
  title: string;
  category: string;
  image: string;
  imageAlt: string;
  location: string;
}

interface Resource {
  title: string;
  description: string;
  fileSize: string;
  icon: string;
}

export default function ProjectCaseStudiesPage() {
  const heroData = {
    title: "Villa Mediterránea Sostenible",
    category: "Residencial de Lujo",
    location: "Costa del Sol, España",
    year: "2025",
    heroImage: "https://img.rocket.new/generatedImages/rocket_gen_img_1f0e7fb75-1767893206100.png",
    heroImageAlt: "Vista exterior de villa mediterránea moderna con piscina infinita y jardines paisajísticos al atardecer"
  };

  const projectStats: ProjectStat[] = [
  { icon: "HomeModernIcon", label: "Área Construida", value: "450 m²" },
  { icon: "ClockIcon", label: "Duración", value: "18 meses" },
  { icon: "CurrencyEuroIcon", label: "Presupuesto", value: "€2.5M" },
  { icon: "StarIcon", label: "Certificación", value: "LEED Gold" }];


  const overviewData = {
    challenge: "Los clientes buscaban una residencia familiar que combinara el lujo mediterráneo tradicional con tecnología sostenible de vanguardia, mientras maximizaba las vistas al mar y creaba espacios interiores-exteriores fluidos. El terreno en pendiente presentaba desafíos estructurales significativos que requerían soluciones innovadoras de ingeniería.",
    solution: "Diseñamos una villa de tres niveles que abraza la topografía natural, utilizando muros de contención escalonados para crear terrazas privadas en cada nivel. La orientación estratégica maximiza la luz natural y las vistas panorámicas, mientras que los grandes ventanales retráctiles difuminan los límites entre interior y exterior. Integramos sistemas de energía solar, recolección de agua de lluvia y materiales locales sostenibles.",
    outcome: "El proyecto resultó en una residencia excepcional que supera los estándares de eficiencia energética en un 40%, reduce el consumo de agua en un 60% y proporciona un ambiente de vida lujoso y confortable. La familia ahora disfruta de espacios que se adaptan perfectamente a su estilo de vida, con áreas de entretenimiento expansivas, retiros privados y conexión constante con el paisaje mediterráneo.",
    stats: projectStats
  };

  const beforeAfterData = {
    beforeImage: "https://img.rocket.new/generatedImages/rocket_gen_img_18b2b0a35-1769455081296.png",
    beforeImageAlt: "Terreno en pendiente sin desarrollar con vegetación silvestre y vista al mar",
    afterImage: "https://images.unsplash.com/photo-1716483714417-c23efa1bd67c",
    afterImageAlt: "Villa mediterránea completada con arquitectura moderna, piscina infinita y jardines paisajísticos",
    title: "Transformación del Terreno"
  };

  const processSteps: ProcessStep[] = [
  {
    phase: "Fase 01",
    title: "Análisis del Sitio y Concepto",
    description: "Realizamos un estudio exhaustivo del terreno, analizando la topografía, orientación solar, vientos predominantes y vistas. Desarrollamos múltiples conceptos de diseño que responden a las necesidades del cliente y las características únicas del sitio, presentando opciones que equilibran funcionalidad, estética y sostenibilidad.",
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_1c0171d2c-1767430156416.png",
    imageAlt: "Arquitecto revisando planos y maquetas de diseño conceptual en mesa de trabajo con laptop",
    icon: "LightBulbIcon"
  },
  {
    phase: "Fase 02",
    title: "Desarrollo del Diseño",
    description: "Refinamos el concepto seleccionado, desarrollando planos arquitectónicos detallados, elevaciones y secciones. Colaboramos estrechamente con ingenieros estructurales y consultores de sostenibilidad para integrar sistemas técnicos avanzados. Creamos visualizaciones 3D fotorrealistas para que el cliente experimente el diseño antes de la construcción.",
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_1e7d9d14b-1764654649679.png",
    imageAlt: "Pantalla de computadora mostrando modelo 3D arquitectónico detallado de villa moderna",
    icon: "PencilSquareIcon"
  },
  {
    phase: "Fase 03",
    title: "Documentación y Permisos",
    description: "Preparamos documentación técnica completa para permisos de construcción, incluyendo planos estructurales, instalaciones mecánicas, eléctricas y de plomería. Gestionamos el proceso de aprobación con las autoridades locales, asegurando el cumplimiento de todos los códigos de construcción y regulaciones ambientales.",
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_16f483d33-1769455078226.png",
    imageAlt: "Planos arquitectónicos detallados con especificaciones técnicas y sellos de aprobación",
    icon: "DocumentCheckIcon"
  },
  {
    phase: "Fase 04",
    title: "Construcción y Supervisión",
    description: "Supervisamos todas las fases de construcción, realizando visitas regulares al sitio para garantizar que el trabajo se ejecute según los planos y especificaciones. Coordinamos con contratistas, resolvemos desafíos de construcción en tiempo real y realizamos control de calidad continuo. Documentamos el progreso y mantenemos al cliente informado en cada etapa.",
    image: "https://images.unsplash.com/photo-1604336979624-f5f90aa94d7d",
    imageAlt: "Sitio de construcción activo con estructura de villa en desarrollo y equipo de construcción trabajando",
    icon: "WrenchScrewdriverIcon"
  }];


  const materials: Material[] = [
  {
    name: "Piedra Caliza Local",
    description: "Piedra natural extraída de canteras locales, proporcionando textura auténtica mediterránea y excelente aislamiento térmico.",
    image: "https://images.unsplash.com/photo-1688984955491-41db1d95e7df",
    imageAlt: "Textura detallada de pared de piedra caliza natural con tonos beige y crema",
    properties: [
    "Durabilidad excepcional",
    "Bajo impacto ambiental",
    "Aislamiento térmico natural"]

  },
  {
    name: "Madera de Teca Certificada",
    description: "Madera tropical sostenible utilizada para terrazas y elementos exteriores, resistente a la intemperie y envejecimiento elegante.",
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_1bbf76e27-1768395637600.png",
    imageAlt: "Superficie de madera de teca con vetas naturales y acabado aceitado",
    properties: [
    "Certificación FSC",
    "Resistencia a humedad",
    "Mantenimiento mínimo"]

  },
  {
    name: "Vidrio de Alto Rendimiento",
    description: "Acristalamiento de triple panel con recubrimiento de baja emisividad, maximizando luz natural mientras minimiza ganancia de calor.",
    image: "https://images.unsplash.com/photo-1655034723500-8427b4eb4ac8",
    imageAlt: "Ventanas de vidrio modernas reflejando cielo azul con marco minimalista",
    properties: [
    "Eficiencia energética",
    "Reducción de ruido",
    "Protección UV"]

  },
  {
    name: "Hormigón Pulido",
    description: "Acabado contemporáneo para pisos interiores, proporcionando masa térmica y estética minimalista sofisticada.",
    image: "https://img.rocket.new/generatedImages/rocket_gen_img_17ed919e1-1764775755678.png",
    imageAlt: "Piso de hormigón pulido con acabado liso y reflectante en tono gris claro",
    properties: [
    "Masa térmica alta",
    "Durabilidad extrema",
    "Fácil mantenimiento"]

  },
  {
    name: "Cerámica Artesanal",
    description: "Azulejos hechos a mano por artesanos locales, incorporando patrones tradicionales mediterráneos con técnicas contemporáneas.",
    image: "https://images.unsplash.com/photo-1709373222160-e1ca38b68e8e",
    imageAlt: "Mosaico de azulejos cerámicos artesanales con patrones geométricos en azul y blanco",
    properties: [
    "Producción local",
    "Diseño único",
    "Resistencia al agua"]

  },
  {
    name: "Acero Corten",
    description: "Acero resistente a la intemperie utilizado para elementos estructurales y decorativos, desarrollando pátina protectora natural.",
    image: "https://images.unsplash.com/photo-1594477464105-445814a832a1",
    imageAlt: "Panel de acero corten con pátina oxidada natural en tonos naranja y marrón",
    properties: [
    "Sin mantenimiento",
    "Estética industrial",
    "Longevidad superior"]

  }];


  const testimonialData = {
    clientName: "María González",
    clientRole: "Propietaria",
    clientImage: "https://img.rocket.new/generatedImages/rocket_gen_img_1c0007e95-1763295050768.png",
    clientImageAlt: "Mujer profesional de mediana edad con cabello castaño sonriendo en ambiente luminoso",
    testimonial: "Trabajar con LCDREAM.ARQ fue una experiencia transformadora. No solo diseñaron la casa de nuestros sueños, sino que nos educaron sobre sostenibilidad y nos ayudaron a tomar decisiones informadas en cada paso. El resultado supera todas nuestras expectativas: una casa que es hermosa, funcional y respetuosa con el medio ambiente. Cada mañana nos despertamos agradecidos por los espacios que crearon para nosotros.",
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ"
  };

  const galleryImages: GalleryImage[] = [
  {
    url: "https://images.unsplash.com/photo-1642329873337-24a26c287cce",
    alt: "Vista exterior de villa con piscina infinita al atardecer con iluminación cálida",
    caption: "Fachada principal con piscina infinita"
  },
  {
    url: "https://images.unsplash.com/photo-1606137036070-aea56eae1052",
    alt: "Sala de estar moderna con ventanales de piso a techo y muebles contemporáneos",
    caption: "Sala de estar con vistas panorámicas"
  },
  {
    url: "https://img.rocket.new/generatedImages/rocket_gen_img_14142eac2-1764678676520.png",
    alt: "Cocina gourmet con isla central, electrodomésticos de acero inoxidable y acabados de lujo",
    caption: "Cocina gourmet integrada"
  },
  {
    url: "https://img.rocket.new/generatedImages/rocket_gen_img_17d8ac43a-1766837430470.png",
    alt: "Dormitorio principal con cama king size y acceso directo a terraza privada",
    caption: "Suite principal con terraza privada"
  },
  {
    url: "https://images.unsplash.com/photo-1728016280671-3c0ce314d744",
    alt: "Baño spa con bañera independiente, ducha de lluvia y acabados en mármol",
    caption: "Baño spa con acabados premium"
  },
  {
    url: "https://images.unsplash.com/photo-1579232350083-17659168da11",
    alt: "Terraza cubierta con comedor exterior y vistas al jardín mediterráneo",
    caption: "Terraza de entretenimiento exterior"
  }];


  const sustainabilityFeatures: SustainabilityFeature[] = [
  {
    icon: "BoltIcon",
    title: "Sistema Solar Fotovoltaico",
    description: "Instalación de 40 paneles solares de alta eficiencia que generan el 85% de las necesidades energéticas de la vivienda, con sistema de almacenamiento en baterías para uso nocturno.",
    impact: "Reducción del 85% en consumo de red eléctrica"
  },
  {
    icon: "BeakerIcon",
    title: "Recolección de Agua de Lluvia",
    description: "Sistema integrado de captación y filtración de agua pluvial con capacidad de 15,000 litros, utilizado para riego de jardines y sistemas de limpieza.",
    impact: "Ahorro del 60% en consumo de agua potable"
  },
  {
    icon: "HomeIcon",
    title: "Aislamiento Térmico Avanzado",
    description: "Envolvente de edificio de alto rendimiento con aislamiento de celulosa reciclada y ventanas de triple acristalamiento, minimizando pérdidas térmicas.",
    impact: "Reducción del 70% en necesidades de climatización"
  },
  {
    icon: "SunIcon",
    title: "Diseño Bioclimático",
    description: "Orientación estratégica, voladizos calculados y ventilación cruzada natural que aprovechan las condiciones climáticas mediterráneas para confort pasivo.",
    impact: "Temperatura interior estable sin climatización activa"
  }];


  const certifications = [
  "LEED Gold Certified",
  "Passivhaus Standard",
  "BREEAM Excellent",
  "Energy Star"];


  const relatedProjects: RelatedProject[] = [
  {
    id: "urban-loft",
    title: "Loft Urbano Minimalista",
    category: "Residencial",
    image: "https://images.unsplash.com/photo-1507149442471-c16d3947aaeb",
    imageAlt: "Interior de loft moderno con techos altos, paredes de ladrillo expuesto y diseño minimalista",
    location: "Barcelona"
  },
  {
    id: "eco-resort",
    title: "Eco-Resort Costero",
    category: "Hospitalidad",
    image: "https://images.unsplash.com/photo-1643496500440-950729b16141",
    imageAlt: "Resort ecológico frente al mar con bungalows de madera y vegetación tropical",
    location: "Islas Baleares"
  },
  {
    id: "corporate-headquarters",
    title: "Sede Corporativa Sostenible",
    category: "Comercial",
    image: "https://images.unsplash.com/photo-1689232781358-99b0e797c6b2",
    imageAlt: "Edificio corporativo moderno con fachada de vidrio y jardines verticales integrados",
    location: "Madrid"
  }];


  const downloadableResources: Resource[] = [
  {
    title: "Ficha Técnica del Proyecto",
    description: "Especificaciones completas, planos y detalles técnicos",
    fileSize: "2.4 MB",
    icon: "DocumentTextIcon"
  },
  {
    title: "Certificaciones Sostenibles",
    description: "Documentación de certificaciones LEED y Passivhaus",
    fileSize: "1.8 MB",
    icon: "ShieldCheckIcon"
  },
  {
    title: "Galería de Imágenes HD",
    description: "Colección completa de fotografías profesionales",
    fileSize: "45 MB",
    icon: "PhotoIcon"
  },
  {
    title: "Guía de Mantenimiento",
    description: "Instrucciones para el cuidado de materiales y sistemas",
    fileSize: "3.2 MB",
    icon: "WrenchScrewdriverIcon"
  }];


  return (
    <main className="min-h-screen bg-background">
      <Header />
      
      <div className="pt-20">
        <CaseStudyHero {...heroData} />
        
        <ProjectOverview {...overviewData} />
        
        <BeforeAfterSlider {...beforeAfterData} />
        
        <DesignProcess steps={processSteps} />
        
        <MaterialsShowcase materials={materials} />
        
        <ClientTestimonial {...testimonialData} />
        
        <ProjectGallery images={galleryImages} />
        
        <SustainabilityFeatures
          features={sustainabilityFeatures}
          certifications={certifications} />

        
        <DownloadableResources resources={downloadableResources} />
        
        <RelatedProjects projects={relatedProjects} />
        
        <CTASection />
      </div>
      
      <Footer />
    </main>);

}