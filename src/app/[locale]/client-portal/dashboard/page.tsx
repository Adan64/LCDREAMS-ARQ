'use client';

import React, { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import Header from '@/components/common/Header';
import AppIcon from '@/components/ui/AppIcon';
import { motion } from 'framer-motion';
import { createClient } from '@/lib/supabase/client';

// Define types for our data
type Project = {
    id: string;
    title: any; // jsonb
    client: string;
    status: string;
    cover_image: string;
    address: string; // We might need to map this or add it to DB if missing
    progress: number;
    start_date: string;
    estimated_completion: string;
    images: string[];
    // Linked Profile
    profiles?: {
        full_name: string;
    };
    // Computed/Derived for UI
    code?: string;
};

type Phase = {
    id: string;
    name: string;
    description: string;
    status: 'pending' | 'current' | 'completed';
    date: string;
};

type Document = {
    id: string;
    title: string;
    type: string;
    url: string;
    size: string;
    date: string; // created_at
};

export default function ClientDashboardPage() {
    const t = useTranslations('ClientPortal.dashboard');
    const searchParams = useSearchParams();
    const router = useRouter();
    const projectId = searchParams.get('p');
    const supabase = createClient();

    // State
    const [allProjects, setAllProjects] = useState<Project[]>([]);
    const [project, setProject] = useState<Project | null>(null);
    const [phases, setPhases] = useState<Phase[]>([]);
    const [documents, setDocuments] = useState<Document[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // 1. Get Current User
                const { data: { user } } = await supabase.auth.getUser();

                if (!user) {
                    console.warn('No user found in Dashboard, redirecting to Portal Home');
                    router.push('/client-portal');
                    return;
                }

                // 2. Fetch ALL Assigned Projects for this User
                const { data: userProjects, error: projectsError } = await supabase
                    .from('projects')
                    .select('*, profiles(full_name)')
                    .eq('client_id', user.id);

                if (projectsError) throw projectsError;

                const projectsList = userProjects || [];
                setAllProjects(projectsList);

                // 3. Determine Project Selection Logic
                let targetProject: Project | undefined;

                if (projectId) {
                    // Case A: Specific project requested via URL
                    targetProject = projectsList.find(p => p.id === projectId);
                } else if (projectsList.length === 1) {
                    // Case B: Only one project exists - Auto-select it
                    targetProject = projectsList[0];
                }
                // Case C: Multiple projects and no ID selected -> targetProject remains undefined, showing Selection Grid

                // 4. If a project is selected, fetch its details (Phases & Docs)
                if (targetProject) {
                    setProject(targetProject);

                    // Fetch Phases
                    const { data: phasesData } = await supabase
                        .from('project_phases')
                        .select('*')
                        .eq('project_id', targetProject.id)
                        .order('order', { ascending: true });

                    // Fetch Documents
                    const { data: docsData } = await supabase
                        .from('project_documents')
                        .select('*')
                        .eq('project_id', targetProject.id)
                        .order('created_at', { ascending: false });

                    setPhases(phasesData || []);
                    setDocuments(docsData || []);
                } else {
                    // No specific project selected (showing grid)
                    setProject(null);
                }

            } catch (error) {
                console.error("Error fetching dashboard data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [projectId, router]);

    const handleSelectProject = (id: string) => {
        // Update URL to include project ID
        router.push(`/client-portal/dashboard?p=${id}`);
    };

    const handleBackToProjects = () => {
        router.push('/client-portal/dashboard');
    };

    // DEBUG LOGGING
    useEffect(() => {
        console.log('Dashboard State:', { loading, userFound: !!project || allProjects.length > 0, projectCount: allProjects.length });
    }, [loading, allProjects, project]);


    if (loading) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center">
                <div className="w-8 h-8 border-4 border-yellow-500 border-t-transparent rounded-full animate-spin" />
            </div>
        );
    }

    // STATE: No Projects Found
    if (allProjects.length === 0) {
        return (
            <main className="min-h-screen bg-muted/30 flex flex-col">
                <Header />
                <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
                    <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-200 max-w-md w-full">
                        <div className="w-16 h-16 bg-yellow-100 text-yellow-600 rounded-full flex items-center justify-center mx-auto mb-4">
                            <AppIcon name="FolderIcon" className="w-8 h-8" />
                        </div>
                        <h1 className="text-xl font-bold text-gray-900 mb-2">No tienes proyectos asignados</h1>
                        <p className="text-gray-500 mb-6">
                            Tu cuenta de cliente está activa, pero aún no se ha vinculado ningún proyecto. Por favor, contacta con la administración.
                        </p>
                        <button
                            onClick={() => router.push('/')}
                            className="text-sm text-yellow-600 font-semibold hover:underline"
                        >
                            Volver al inicio
                        </button>
                    </div>
                </div>
            </main>
        );
    }

    // STATE: Project Selection Grid (Multiple Projects)
    if (!project) {
        return (
            <main className="min-h-screen bg-muted/30 flex flex-col">
                <Header />
                <div className="flex-1 max-w-7xl mx-auto w-full px-6 lg:px-12 pt-24 pb-12">
                    <div className="mb-8">
                        <h1 className="text-3xl font-headline-bold text-lcdream-charcoal mb-2">Mis Proyectos</h1>
                        <p className="text-gray-500">Selecciona un proyecto para ver sus detalles y progreso.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {allProjects.map((p) => {
                            const pName = (p.title as any)['es'] || p.title;
                            return (
                                <div
                                    key={p.id}
                                    onClick={() => handleSelectProject(p.id)}
                                    className="group bg-white rounded-xl shadow-sm overflow-hidden border border-gray-200 hover:shadow-md hover:border-lcdream-gold/50 transition-all cursor-pointer"
                                >
                                    <div className="h-48 relative overflow-hidden">
                                        <div className="absolute inset-0 bg-gray-900/10 group-hover:bg-gray-900/0 transition-colors z-10" />
                                        <img
                                            src={p.cover_image || '/images/placeholder.jpg'}
                                            alt={pName}
                                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                        />
                                        <div className="absolute top-4 right-4 z-20">
                                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-white/90 text-gray-800 shadow-sm backdrop-blur-sm">
                                                {p.status}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="p-6">
                                        <h3 className="text-lg font-bold text-gray-900 group-hover:text-lcdream-gold transition-colors mb-2">{pName}</h3>
                                        <div className="flex justify-between items-center text-sm text-gray-500 mt-4">
                                            <span className="flex items-center gap-1">
                                                <AppIcon name="ClockIcon" className="w-4 h-4" />
                                                Inicio: {new Date(p.start_date).toLocaleDateString()}
                                            </span>
                                            <span className="font-semibold text-gray-900">{p.progress}%</span>
                                        </div>
                                        <div className="w-full bg-gray-100 rounded-full h-1.5 mt-2 overflow-hidden">
                                            <div className="bg-lcdream-gold h-1.5 rounded-full" style={{ width: `${p.progress}%` }} />
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </main>
        );
    }

    // STATE: Single Project Dashboard (Original View)
    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1 }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
    };

    // Determine Client Name: Use linked profile name first, fall back to legacy text
    const clientName = (project as any).profiles?.full_name || project.client || 'Cliente';

    // Show "Back to Projects" if user has multiple projects
    const showBackButton = allProjects.length > 1;

    return (
        <main className="min-h-screen bg-muted/30 pb-20">
            <Header />

            {/* Project Header */}
            <div className="bg-lcdream-charcoal text-white pt-24 pb-12 px-6 lg:px-12 relative overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <img src={project.cover_image || '/images/placeholder.jpg'} alt="Project Cover" className="w-full h-full object-cover opacity-20" />
                    <div className="absolute inset-0 bg-gradient-to-t from-lcdream-charcoal via-lcdream-charcoal/80 to-transparent" />
                </div>

                <div className="max-w-7xl mx-auto relative z-10">
                    {showBackButton && (
                        <button
                            onClick={handleBackToProjects}
                            className="mb-6 flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors group"
                        >
                            <AppIcon name="ArrowLeftIcon" className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                            Volver a mis proyectos
                        </button>
                    )}

                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                        <div>
                            <div className="inline-flex items-center gap-2 bg-lcdream-gold/20 text-lcdream-gold px-3 py-1 rounded-full text-xs font-semibold mb-4">
                                <span className="w-2 h-2 rounded-full bg-lcdream-gold animate-pulse" />
                                {project.status /* Translate status if needed */}
                            </div>
                            <h1 className="font-headline text-3xl md:text-5xl font-headline-bold mb-2">
                                {/* Handle JSON title safely */}
                                {(project.title as any)['es'] || project.title}
                            </h1>
                            <p className="text-lcdream-gray-light flex items-center gap-2">
                                <AppIcon name="UserIcon" className="w-4 h-4" />
                                {clientName}
                            </p>
                        </div>

                        <div className="bg-white/5 backdrop-blur-sm border border-white/10 p-6 rounded-xl min-w-[280px]">
                            <p className="text-lcdream-gray text-sm mb-2">{t('progress')}</p>
                            <div className="flex items-end gap-2 mb-2">
                                <span className="text-4xl font-headline-bold text-lcdream-gold">{project.progress || 0}%</span>
                                <span className="text-sm text-lcdream-gray mb-1.5">completado</span>
                            </div>
                            <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                                <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: `${project.progress || 0}%` }}
                                    transition={{ duration: 1.5, ease: "easeOut" }}
                                    className="h-full bg-lcdream-gold"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-6 lg:px-12 -mt-8 relative z-20">
                <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={containerVariants}
                    className="grid grid-cols-1 lg:grid-cols-3 gap-8"
                >
                    {/* Left Column: Timeline & Photos */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Timeline */}
                        <motion.div variants={itemVariants} className="bg-white rounded-xl shadow-sm p-8 border border-gray-200">
                            <h2 className="font-headline text-xl font-headline-bold mb-6 flex items-center gap-2 text-lcdream-charcoal">
                                <AppIcon name="ClockIcon" className="w-5 h-5 text-lcdream-gold" />
                                {t('phases')}
                            </h2>
                            {phases.length === 0 ? (
                                <p className="text-gray-500 italic">No hay fases registradas aún.</p>
                            ) : (
                                <div className="space-y-6">
                                    {phases.map((phase, index) => (
                                        <div key={phase.id} className="flex gap-4 relative">
                                            {/* Activity Line */}
                                            {index !== phases.length - 1 && (
                                                <div className="absolute left-[15px] top-8 bottom-[-24px] w-0.5 bg-gray-100" />
                                            )}

                                            {/* Status Dot */}
                                            <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 z-10 ${phase.status === 'completed' ? 'bg-green-100 text-green-600' :
                                                phase.status === 'current' ? 'bg-lcdream-gold text-white ring-4 ring-lcdream-gold/20' :
                                                    'bg-gray-100 text-gray-400'
                                                }`}>
                                                {phase.status === 'completed' ? (
                                                    <AppIcon name="CheckIcon" className="w-4 h-4" />
                                                ) : (
                                                    <span className="text-xs font-bold">{index + 1}</span>
                                                )}
                                            </div>

                                            {/* Content */}
                                            <div className="flex-1 pt-1">
                                                <div className="flex justify-between items-start">
                                                    <h3 className={`font-semibold ${phase.status === 'current' ? 'text-lcdream-charcoal' : 'text-gray-600'
                                                        }`}>
                                                        {phase.name}
                                                    </h3>
                                                    {phase.date && (
                                                        <span className="text-xs font-mono text-gray-400 bg-gray-50 px-2 py-1 rounded">
                                                            {phase.date}
                                                        </span>
                                                    )}
                                                </div>
                                                {phase.description && (
                                                    <p className="text-sm text-gray-500 mt-1">
                                                        {phase.description}
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </motion.div>

                        {/* Photo Gallery - Using project.images if available */}
                        <motion.div variants={itemVariants} className="bg-white rounded-xl shadow-sm p-8 border border-gray-200">
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="font-headline text-xl font-headline-bold flex items-center gap-2 text-lcdream-charcoal">
                                    <AppIcon name="CameraIcon" className="w-5 h-5 text-lcdream-gold" />
                                    {t('gallery')}
                                </h2>
                            </div>

                            {!project.images || project.images.length === 0 ? (
                                <p className="text-gray-500 italic">No hay fotos disponibles.</p>
                            ) : (
                                <div className="grid grid-cols-2 gap-4">
                                    {project.images.map((url, idx) => (
                                        <div key={idx} className="group relative aspect-video rounded-lg overflow-hidden bg-gray-100 cursor-pointer">
                                            <img
                                                src={url}
                                                alt={`Project photo ${idx}`}
                                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                            />
                                        </div>
                                    ))}
                                </div>
                            )}
                        </motion.div>
                    </div>

                    {/* Right Column: Docs & Info */}
                    <div className="lg:col-span-1 space-y-8">
                        {/* Documents */}
                        <motion.div variants={itemVariants} className="bg-white rounded-xl shadow-sm p-8 border border-gray-200">
                            <h2 className="font-headline text-xl font-headline-bold mb-6 flex items-center gap-2 text-lcdream-charcoal">
                                <AppIcon name="DocumentTextIcon" className="w-5 h-5 text-lcdream-gold" />
                                {t('documents')}
                            </h2>
                            {documents.length === 0 ? (
                                <p className="text-gray-500 italic">No hay documentos.</p>
                            ) : (
                                <div className="space-y-4">
                                    {documents.map((doc) => (
                                        <div key={doc.id} className="flex items-center gap-3 p-3 rounded-lg border border-gray-100 hover:border-lcdream-gold/30 hover:bg-orange-50/30 transition-all group cursor-pointer" onClick={() => window.open(doc.url, '_blank')}>
                                            <div className="w-10 h-10 rounded-lg bg-red-50 flex items-center justify-center text-red-500 flex-shrink-0">
                                                <span className="text-xs font-bold uppercase">{doc.type || 'PDF'}</span>
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="text-sm font-semibold text-gray-700 truncate group-hover:text-lcdream-charcoal">{doc.title}</p>
                                                <p className="text-xs text-gray-400">{new Date(doc.date).toLocaleDateString()} • {doc.size || 'N/A'}</p>
                                            </div>
                                            <AppIcon name="ArrowDownTrayIcon" className="w-4 h-4 text-gray-300 group-hover:text-lcdream-gold" />
                                        </div>
                                    ))}
                                </div>
                            )}
                        </motion.div>

                        {/* Client Card */}
                        <motion.div variants={itemVariants} className="bg-lcdream-charcoal p-8 rounded-xl text-white">
                            <div className="flex items-center gap-4 mb-6">
                                <div className="w-12 h-12 rounded-full bg-lcdream-gold flex items-center justify-center font-bold text-lcdream-charcoal text-xl">
                                    {clientName.charAt(0) || 'C'}
                                </div>
                                <div>
                                    <p className="text-sm text-lcdream-gray-light">Área Privada</p>
                                    <p className="font-semibold">{clientName}</p>
                                </div>
                            </div>
                            <div className="space-y-3 text-sm text-lcdream-gray-light font-mono">
                                <div className="flex justify-between">
                                    <span>Código:</span>
                                    <span className="text-white">{(project as any).access_code || '---'}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Inicio:</span>
                                    <span className="text-white">{project.start_date || '---'}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Entrega Est.:</span>
                                    <span className="text-white">{project.estimated_completion || '---'}</span>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </motion.div>
            </div>
        </main>
    );
}
