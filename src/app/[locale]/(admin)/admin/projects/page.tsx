'use client';

import { useEffect, useState } from 'react';
import { Link, useRouter } from '@/i18n/routing';
import { PencilSquareIcon, TrashIcon } from '@heroicons/react/24/outline';
import { createClient } from '@/lib/supabase/client';

type Project = {
    id: string;
    title: any;
    client: string; // Legacy string
    client_id: string; // Foreign key
    profiles?: {    // Joined profile
        full_name: string;
        email: string;
    };
    status: string;
    created_at: string;
};

export default function AdminProjectsPage() {
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);
    const supabase = createClient();
    const router = useRouter();

    const fetchProjects = async () => {
        try {
            const { data, error } = await supabase
                .from('projects')
                .select('*, profiles(full_name, email)') // Join with profiles
                .order('created_at', { ascending: false });

            if (error) throw error;
            setProjects(data as any || []);
        } catch (error) {
            console.error('Error fetching projects:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProjects();
    }, []);

    const handleDelete = async (id: string) => {
        if (!confirm('¿Estás seguro de que quieres eliminar este proyecto?')) return;

        try {
            const { error } = await supabase
                .from('projects')
                .delete()
                .eq('id', id);

            if (error) throw error;

            // Optimistic update
            setProjects(projects.filter(p => p.id !== id));
            router.refresh();
        } catch (error) {
            console.error('Error deleting project:', error);
            alert('Error al eliminar el proyecto.');
        }
    };

    // Helper to get localized title
    const getTitle = (title: any) => {
        if (typeof title === 'string') return title;
        return title?.es || 'Sin título';
    };

    if (loading) return <div className="text-white">Cargando proyectos...</div>;

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-white">Gestión de Proyectos</h1>
                    <p className="text-gray-400 text-sm mt-1">Administra el portafolio y el estado de las obras.</p>
                </div>
                <Link href="/admin/projects/new" className="bg-yellow-500 hover:bg-yellow-400 text-black font-semibold py-2 px-4 rounded-md transition-colors inline-block text-center">
                    + Nuevo Proyecto
                </Link>
            </div>

            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 rounded-lg border border-gray-700">
                <table className="min-w-full divide-y divide-gray-700 bg-gray-800">
                    <thead className="bg-gray-900">
                        <tr>
                            <th className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-white sm:pl-6">Proyecto</th>
                            <th className="px-3 py-3.5 text-left text-sm font-semibold text-white">Cliente</th>
                            <th className="px-3 py-3.5 text-left text-sm font-semibold text-white">Estado</th>
                            <th className="px-3 py-3.5 text-left text-sm font-semibold text-white">Fecha</th>
                            <th className="relative py-3.5 pl-3 pr-4 sm:pr-6"><span className="sr-only">Acciones</span></th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-700 bg-gray-800">
                        {projects.length === 0 ? (
                            <tr>
                                <td colSpan={5} className="py-8 text-center text-gray-500">
                                    No hay proyectos aún.
                                </td>
                            </tr>
                        ) : (
                            projects.map((project) => (
                                <tr key={project.id} className="hover:bg-gray-700/50 transition-colors">
                                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-white sm:pl-6">
                                        {getTitle(project.title)}
                                    </td>
                                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-300">
                                        {/* Display Profile Name OR legacy client string OR placeholder */}
                                        {project.profiles?.full_name || project.client || <span className="text-gray-500 italic">Sin Asignar</span>}
                                    </td>
                                    <td className="whitespace-nowrap px-3 py-4 text-sm">
                                        <span className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset ${project.status === 'Completado' ? 'bg-green-400/10 text-green-400 ring-green-400/20' :
                                            project.status === 'En Construcción' ? 'bg-blue-400/10 text-blue-400 ring-blue-400/20' :
                                                'bg-yellow-400/10 text-yellow-400 ring-yellow-400/20'
                                            }`}>
                                            {project.status}
                                        </span>
                                    </td>
                                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-400">
                                        {new Date(project.created_at).toLocaleDateString()}
                                    </td>
                                    <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                                        <div className="flex justify-end gap-3">
                                            <Link href={`/admin/projects/${project.id}` as any} className="text-gray-400 hover:text-white transition-colors">
                                                <PencilSquareIcon className="h-5 w-5" />
                                            </Link>
                                            <button
                                                onClick={() => handleDelete(project.id)}
                                                className="text-gray-400 hover:text-red-400 transition-colors"
                                            >
                                                <TrashIcon className="h-5 w-5" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
