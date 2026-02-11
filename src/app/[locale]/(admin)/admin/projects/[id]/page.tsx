'use client';

import { useEffect, useState } from 'react';
import { useRouter } from '@/i18n/routing';
import { createClient } from '@/lib/supabase/client';
import ProjectForm from '@/components/admin/ProjectForm';
import PhasesManager from '@/components/admin/PhasesManager';
import DocumentsManager from '@/components/admin/DocumentsManager';
import { useParams } from 'next/navigation';

export default function EditProjectPage() {
    const params = useParams();
    const id = params.id as string;
    const router = useRouter();
    const supabase = createClient();

    const [project, setProject] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProject = async () => {
            if (!id) return;

            try {
                const { data, error } = await supabase
                    .from('projects')
                    .select('*')
                    .eq('id', id)
                    .single();

                if (error) throw error;
                setProject(data);
            } catch (error) {
                console.error("Error fetching project:", error);
                alert("Proyecto no encontrado");
                router.push('/admin/projects');
            } finally {
                setLoading(false);
            }
        };

        fetchProject();
    }, [id, router]);

    if (loading) return <div className="text-white p-8">Cargando proyecto...</div>;
    if (!project) return null;

    return (
        <div className="max-w-6xl mx-auto space-y-8 pb-20 px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-white mb-2">Editar Proyecto</h1>
                    <p className="text-gray-400 text-sm">Gestiona la información, fases y documentos del proyecto.</p>
                </div>
            </div>

            {/* Stacked Layout for Maximum Width */}
            <div className="space-y-8">
                <ProjectForm initialData={project} />
                <PhasesManager projectId={project.id} />
                <DocumentsManager projectId={project.id} />
            </div>
        </div>
    );
}
