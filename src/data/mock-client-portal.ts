export interface ClientProfile {
  id: string;
  name: string;
  email: string;
  avatar: string;
  phone: string;
}

export interface ProjectPhase {
  id: string;
  name: string;
  status: 'completed' | 'current' | 'upcoming';
  date?: string;
  description?: string;
}

export interface ProjectDocument {
  id: string;
  title: string;
  type: 'pdf' | 'image' | 'dwg' | 'contract';
  date: string;
  size: string;
  url: string; // En el futuro será una URL de Supabase Storage
}

export interface DailyLogImage {
  id: string;
  url: string;
  caption: string;
  date: string;
}

export interface Project {
  id: string;
  clientId: string;
  code: string; // Access code for login
  title: string;
  address: string;
  coverImage: string;
  startDate: string;
  estimatedCompletion: string;
  status: 'Anteproyecto' | 'Licencia' | 'Construcción' | 'Interiorismo' | 'Finalizado';
  progress: number; // 0-100
  phases: ProjectPhase[];
  documents: ProjectDocument[];
  gallery: DailyLogImage[];
}

// MOCK DATABASE
// This simulates what we will get from Supabase later

export const MOCK_PROJECTS: Project[] = [
  {
    id: 'proj_1',
    clientId: 'client_1',
    code: 'CASA-LAGO-2024', // Login Code
    title: 'Casa del Lago',
    address: 'Av. del Lago 45, Barrio Privado Las Garzas',
    coverImage: '/images/projects/lake-house-hero.jpg', // Placeholder
    startDate: '2024-01-15',
    estimatedCompletion: '2024-12-20',
    status: 'Construcción',
    progress: 65,
    phases: [
      { id: 'ph_1', name: 'Reunión Inicial & Briefing', status: 'completed', date: '15 Ene 2024' },
      { id: 'ph_2', name: 'Anteproyecto & Concepto', status: 'completed', date: '28 Feb 2024' },
      { id: 'ph_3', name: 'Proyecto Ejecutivo', status: 'completed', date: '15 Abr 2024' },
      { id: 'ph_4', name: 'Tramitación Licencias', status: 'completed', date: '30 May 2024' },
      { id: 'ph_5', name: 'Obra Gris', status: 'current', date: 'En progreso', description: 'Levantamiento de muros y techos planta alta' },
      { id: 'ph_6', name: 'Instalaciones', status: 'upcoming', description: 'Eléctrica, sanitaria y climatización' },
      { id: 'ph_7', name: 'Acabados & Interiorismo', status: 'upcoming' },
      { id: 'ph_8', name: 'Entrega de Llaves', status: 'upcoming' }
    ],
    documents: [
      { id: 'doc_1', title: 'Contrato de Servicios.pdf', type: 'contract', date: '10 Ene 2024', size: '1.2 MB', url: '#' },
      { id: 'doc_2', title: 'Planos Aprobados v3.pdf', type: 'pdf', date: '15 Abr 2024', size: '8.5 MB', url: '#' },
      { id: 'doc_3', title: 'Presupuesto Detallado.pdf', type: 'pdf', date: '20 Abr 2024', size: '2.4 MB', url: '#' },
      { id: 'doc_4', title: 'Render Cocina 4K.jpg', type: 'image', date: '05 Mar 2024', size: '4.1 MB', url: '#' },
    ],
    gallery: [
      { id: 'img_1', url: 'https://images.unsplash.com/photo-1626290088927-4a7138096c45?q=80&w=800&auto=format&fit=crop', caption: 'Cimentación completada', date: '10 Jun 2024' },
      { id: 'img_2', url: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=800&auto=format&fit=crop', caption: 'Levantamiento de estructura metálica', date: '25 Jun 2024' },
      { id: 'img_3', url: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=800&auto=format&fit=crop', caption: 'Vista del avance planta baja', date: '15 Jul 2024' },
      { id: 'img_4', url: 'https://images.unsplash.com/photo-1590642916589-59234256a290?q=80&w=800&auto=format&fit=crop', caption: 'Inicio de albañilería segunda planta', date: '02 Ago 2024' },
    ]
  }
];

export const MOCK_CLIENT: ClientProfile = {
  id: 'client_1',
  name: 'Familia Pérez',
  email: 'contacto@familiaperez.com',
  phone: '+34 600 123 456',
  avatar: 'FP'
};

// Simulate API calls
export const getProjectByCode = async (code: string): Promise<Project | null> => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 800));
  return MOCK_PROJECTS.find(p => p.code === code) || null;
};
