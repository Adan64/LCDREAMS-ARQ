import type { Metadata } from 'next';
import Header from '@/components/common/Header';
import { useTranslations } from 'next-intl';
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
import FooterSection from '@/app/[locale]/homepage/components/FooterSection';

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
  const t = useTranslations('ProjectCaseStudies');

  const heroData = {
    title: t('hero.title'),
    category: t('hero.category'),
    location: t('hero.location'),
    year: "2025",
    heroImage: "https://img.rocket.new/generatedImages/rocket_gen_img_1f0e7fb75-1767893206100.png",
    heroImageAlt: t('hero.imageAlt')
  };

  const projectStats: ProjectStat[] = [
    { icon: "HomeModernIcon", label: t('overview.stats.area'), value: "450 m²" },
    { icon: "ClockIcon", label: t('overview.stats.duration'), value: "18 meses" },
    { icon: "CurrencyEuroIcon", label: t('overview.stats.budget'), value: "€2.5M" },
    { icon: "StarIcon", label: t('overview.stats.certification'), value: "LEED Gold" }
  ];

  const overviewData = {
    challenge: t('overview.challenge.description'),
    solution: t('overview.solution.description'),
    outcome: t('overview.outcome.description'),
    stats: projectStats
  };

  const beforeAfterData = {
    beforeImage: "https://img.rocket.new/generatedImages/rocket_gen_img_18b2b0a35-1769455081296.png",
    beforeImageAlt: t('beforeAfter.beforeAlt'),
    afterImage: "https://images.unsplash.com/photo-1716483714417-c23efa1bd67c",
    afterImageAlt: t('beforeAfter.afterAlt'),
    title: t('beforeAfter.title')
  };

  const processIcons = ["LightBulbIcon", "PencilSquareIcon", "DocumentCheckIcon", "WrenchScrewdriverIcon"];
  const processImages = [
    "https://img.rocket.new/generatedImages/rocket_gen_img_1c0171d2c-1767430156416.png",
    "https://img.rocket.new/generatedImages/rocket_gen_img_1e7d9d14b-1764654649679.png",
    "https://img.rocket.new/generatedImages/rocket_gen_img_16f483d33-1769455078226.png",
    "https://images.unsplash.com/photo-1604336979624-f5f90aa94d7d"
  ];

  const processSteps: ProcessStep[] = [0, 1, 2, 3].map(index => ({
    phase: t(`process.steps.${index}.phase`),
    title: t(`process.steps.${index}.title`),
    description: t(`process.steps.${index}.description`),
    image: processImages[index],
    imageAlt: t(`process.steps.${index}.alt`),
    icon: processIcons[index]
  }));

  const materialKeys = ['limestone', 'teak', 'glass', 'concrete', 'ceramic', 'steel'];
  const materialImages = {
    limestone: "https://images.unsplash.com/photo-1688984955491-41db1d95e7df",
    teak: "https://img.rocket.new/generatedImages/rocket_gen_img_1bbf76e27-1768395637600.png",
    glass: "https://images.unsplash.com/photo-1655034723500-8427b4eb4ac8",
    concrete: "https://img.rocket.new/generatedImages/rocket_gen_img_17ed919e1-1764775755678.png",
    ceramic: "https://images.unsplash.com/photo-1709373222160-e1ca38b68e8e",
    steel: "https://images.unsplash.com/photo-1594477464105-445814a832a1"
  };

  const materials: Material[] = materialKeys.map(key => ({
    name: t(`materials.items.${key}.name`),
    description: t(`materials.items.${key}.description`),
    image: materialImages[key as keyof typeof materialImages],
    imageAlt: t(`materials.items.${key}.alt`),
    properties: [
      t(`materials.items.${key}.props.0`),
      t(`materials.items.${key}.props.1`),
      t(`materials.items.${key}.props.2`)
    ]
  }));

  const testimonialData = {
    clientName: t('testimonial.name'),
    clientRole: t('testimonial.role'),
    clientImage: "https://img.rocket.new/generatedImages/rocket_gen_img_1c0007e95-1763295050768.png",
    clientImageAlt: t('testimonial.alt'),
    testimonial: t('testimonial.text'),
    videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ"
  };

  const galleryDefaultImages = [
    { key: 'facade', url: "https://images.unsplash.com/photo-1642329873337-24a26c287cce" },
    { key: 'living', url: "https://images.unsplash.com/photo-1606137036070-aea56eae1052" },
    { key: 'kitchen', url: "https://img.rocket.new/generatedImages/rocket_gen_img_14142eac2-1764678676520.png" },
    { key: 'bedroom', url: "https://img.rocket.new/generatedImages/rocket_gen_img_17d8ac43a-1766837430470.png" },
    { key: 'bathroom', url: "https://images.unsplash.com/photo-1728016280671-3c0ce314d744" },
    { key: 'terrace', url: "https://images.unsplash.com/photo-1579232350083-17659168da11" }
  ];

  const galleryImages: GalleryImage[] = galleryDefaultImages.map(item => ({
    url: item.url,
    alt: t(`gallery.alts.${item.key}`),
    caption: t(`gallery.captions.${item.key}`)
  }));

  const sustainabilityKeys = [
    { key: 'solar', icon: 'BoltIcon' },
    { key: 'water', icon: 'BeakerIcon' },
    { key: 'insulation', icon: 'HomeIcon' },
    { key: 'bioclimatic', icon: 'SunIcon' }
  ];

  const sustainabilityFeatures: SustainabilityFeature[] = sustainabilityKeys.map(item => ({
    icon: item.icon,
    title: t(`sustainability.features.${item.key}.title`),
    description: t(`sustainability.features.${item.key}.description`),
    impact: t(`sustainability.features.${item.key}.impact`)
  }));

  const certifications = [
    "LEED Gold Certified",
    "Passivhaus Standard",
    "BREEAM Excellent",
    "Energy Star"
  ];

  const relatedDefaultProjects = [
    { id: "urban-loft", key: 'loft', image: "https://images.unsplash.com/photo-1507149442471-c16d3947aaeb" },
    { id: "eco-resort", key: 'resort', image: "https://images.unsplash.com/photo-1643496500440-950729b16141" },
    { id: "corporate-headquarters", key: 'office', image: "https://images.unsplash.com/photo-1689232781358-99b0e797c6b2" }
  ];

  const relatedProjects: RelatedProject[] = relatedDefaultProjects.map(project => ({
    id: project.id,
    title: t(`related.items.${project.key}.title`),
    category: t(`related.items.${project.key}.category`),
    image: project.image,
    imageAlt: t(`related.items.${project.key}.alt`),
    location: t(`related.items.${project.key}.location`)
  }));

  const resourcesKeys = [
    { key: 'specs', fileSize: "2.4 MB", icon: 'DocumentTextIcon' },
    { key: 'certs', fileSize: "1.8 MB", icon: 'ShieldCheckIcon' },
    { key: 'images', fileSize: "45 MB", icon: 'PhotoIcon' },
    { key: 'maintenance', fileSize: "3.2 MB", icon: 'WrenchScrewdriverIcon' }
  ];

  const downloadableResources: Resource[] = resourcesKeys.map(res => ({
    title: t(`resources.items.${res.key}.title`),
    description: t(`resources.items.${res.key}.description`),
    fileSize: res.fileSize,
    icon: res.icon
  }));

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

      <FooterSection />
    </main>
  );
}