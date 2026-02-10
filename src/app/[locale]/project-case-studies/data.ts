export interface Project {
  id: string;
  key: string; // Translation key
  heroImage: string;
  heroImageAlt: string;
  location: string;
  year: string;
  stats: {
    area: string;
    duration: string;
    budget: string;
    certification: string;
  };
  beforeAfter?: {
    beforeImage: string;
    afterImage: string;
  };
  processImages: string[];
  materialKeys: string[];
  materialImages: Record<string, string>;
  galleryImages: { key: string; url: string }[];
}

export const projects: Project[] = [
  {
    id: "villa-mediterranean",
    key: "villa-mediterranean",
    heroImage: "https://img.rocket.new/generatedImages/rocket_gen_img_1f0e7fb75-1767893206100.png",
    heroImageAlt: "Vista exterior de villa mediterránea moderna con piscina infinita",
    location: "Costa del Sol, Spain",
    year: "2025",
    stats: {
      area: "450 m²",
      duration: "18 meses",
      budget: "€2.5M",
      certification: "LEED Gold"
    },
    beforeAfter: {
      beforeImage: "https://img.rocket.new/generatedImages/rocket_gen_img_18b2b0a35-1769455081296.png",
      afterImage: "https://images.unsplash.com/photo-1716483714417-c23efa1bd67c"
    },
    processImages: [
      "https://img.rocket.new/generatedImages/rocket_gen_img_1c0171d2c-1767430156416.png",
      "https://img.rocket.new/generatedImages/rocket_gen_img_1e7d9d14b-1764654649679.png",
      "https://img.rocket.new/generatedImages/rocket_gen_img_16f483d33-1769455078226.png",
      "https://images.unsplash.com/photo-1604336979624-f5f90aa94d7d"
    ],
    materialKeys: ['limestone', 'teak', 'glass', 'concrete', 'ceramic', 'steel'],
    materialImages: {
      limestone: "https://images.unsplash.com/photo-1688984955491-41db1d95e7df",
      teak: "https://img.rocket.new/generatedImages/rocket_gen_img_1bbf76e27-1768395637600.png",
      glass: "https://images.unsplash.com/photo-1655034723500-8427b4eb4ac8",
      concrete: "https://img.rocket.new/generatedImages/rocket_gen_img_17ed919e1-1764775755678.png",
      ceramic: "https://images.unsplash.com/photo-1709373222160-e1ca38b68e8e",
      steel: "https://images.unsplash.com/photo-1594477464105-445814a832a1"
    },
    galleryImages: [
      { key: 'facade', url: "https://images.unsplash.com/photo-1642329873337-24a26c287cce" },
      { key: 'living', url: "https://images.unsplash.com/photo-1606137036070-aea56eae1052" },
      { key: 'kitchen', url: "https://img.rocket.new/generatedImages/rocket_gen_img_14142eac2-1764678676520.png" },
      { key: 'bedroom', url: "https://img.rocket.new/generatedImages/rocket_gen_img_17d8ac43a-1766837430470.png" },
      { key: 'bathroom', url: "https://images.unsplash.com/photo-1728016280671-3c0ce314d744" },
      { key: 'terrace', url: "https://images.unsplash.com/photo-1579232350083-17659168da11" }
    ]
  },
  {
    id: "office-tech-madrid",
    key: "office-tech-madrid",
    heroImage: "https://images.unsplash.com/photo-1689232781358-99b0e797c6b2",
    heroImageAlt: "Oficinas Tech Hub Madrid",
    location: "Madrid, Spain",
    year: "2024",
    stats: {
      area: "1200 m²",
      duration: "12 meses",
      budget: "€1.8M",
      certification: "BREEAM Excellent"
    },
    // Using placeholders for sections not fully mocked in JSON yet
    beforeAfter: undefined,
    processImages: [
      "https://images.unsplash.com/photo-1503387762-592deb58ef4e", // sketch
      "https://images.unsplash.com/photo-1581094794320-c917758e6fbb", // model
      "https://images.unsplash.com/photo-1504307651254-35680f356dfd", // build
      "https://images.unsplash.com/photo-1497366216548-37526070297c"  // finish
    ],
    materialKeys: ['glass', 'steel', 'concrete'],
    materialImages: {
      glass: "https://images.unsplash.com/photo-1655034723500-8427b4eb4ac8",
      steel: "https://images.unsplash.com/photo-1594477464105-445814a832a1",
      concrete: "https://img.rocket.new/generatedImages/rocket_gen_img_17ed919e1-1764775755678.png"
    },
    galleryImages: [
      { key: 'facade', url: "https://images.unsplash.com/photo-1497366811353-6870744d04b2" },
      { key: 'living', url: "https://images.unsplash.com/photo-1497366216548-37526070297c" },
      { key: 'kitchen', url: "https://images.unsplash.com/photo-1580261450046-d0a30080dc9b" }
    ]
  },
  {
    id: "loft-industrial-valencia",
    key: "loft-industrial-valencia",
    heroImage: "https://images.unsplash.com/photo-1507149442471-c16d3947aaeb",
    heroImageAlt: "Loft Industrial Valencia",
    location: "Valencia, Spain",
    year: "2023",
    stats: {
      area: "180 m²",
      duration: "8 meses",
      budget: "€350k",
      certification: "Energy Class A"
    },
    processImages: [
      "https://images.unsplash.com/photo-1503387762-592deb58ef4e",
      "https://images.unsplash.com/photo-1581094794320-c917758e6fbb",
      "https://images.unsplash.com/photo-1504307651254-35680f356dfd",
      "https://images.unsplash.com/photo-1507149442471-c16d3947aaeb"
    ],
    materialKeys: ['concrete', 'steel', 'teak'],
    materialImages: {
      concrete: "https://img.rocket.new/generatedImages/rocket_gen_img_17ed919e1-1764775755678.png",
      steel: "https://images.unsplash.com/photo-1594477464105-445814a832a1",
      teak: "https://img.rocket.new/generatedImages/rocket_gen_img_1bbf76e27-1768395637600.png"
    },
    galleryImages: [
      { key: 'living', url: "https://images.unsplash.com/photo-1507149442471-c16d3947aaeb" },
      { key: 'kitchen', url: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c" },
      { key: 'bedroom', url: "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf" }
    ]
  }
];

export function getProjectById(id: string): Project | undefined {
  return projects.find(p => p.id === id);
}
