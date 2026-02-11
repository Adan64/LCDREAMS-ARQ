import { useTranslations } from 'next-intl';
import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';
import { TrashIcon, PlusIcon } from '@heroicons/react/24/outline';

type Phase = {
    id: string;
    name: string;
    status: string;
    date: string;
    order: number;
};

interface PhasesManagerProps {
    projectId: string;
}

export default function PhasesManager({ projectId }: PhasesManagerProps) {
    const t = useTranslations('Admin.Phases');
    const [phases, setPhases] = useState<Phase[]>([]);
    const [loading, setLoading] = useState(true);
    const [newPhaseName, setNewPhaseName] = useState('');
    const [newPhaseStatus, setNewPhaseStatus] = useState('Pendiente');
    const [newPhaseDate, setNewPhaseDate] = useState('');
    const supabase = createClient();

    // Fetch Phases
    const fetchPhases = async () => {
        try {
            const { data, error } = await supabase
                .from('project_phases')
                .select('*')
                .eq('project_id', projectId)
                .order('order', { ascending: true });

            if (error) throw error;
            setPhases(data || []);
        } catch (error) {
            console.error('Error fetching phases:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (projectId) fetchPhases();
    }, [projectId]);

    // Add Phase
    const handleAddPhase = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newPhaseName) return;

        try {
            const newOrder = phases.length + 1;
            const { data, error } = await supabase
                .from('project_phases')
                .insert({
                    project_id: projectId,
                    name: newPhaseName,
                    status: newPhaseStatus,
                    date: newPhaseDate || null,
                    order: newOrder
                })
                .select()
                .single();

            if (error) throw error;

            setPhases([...phases, data]);
            setNewPhaseName('');
            setNewPhaseDate('');
            setNewPhaseStatus('Pendiente');
        } catch (error) {
            console.error('Error adding phase:', error);
            alert('Error al añadir la fase.');
        }
    };

    // Delete Phase
    const handleDeletePhase = async (id: string) => {
        if (!confirm(t('deleteConfirm'))) return;

        try {
            const { error } = await supabase
                .from('project_phases')
                .delete()
                .eq('id', id);

            if (error) throw error;

            setPhases(phases.filter(p => p.id !== id));
        } catch (error) {
            console.error('Error deleting phase:', error);
            alert('Error al eliminar la fase.');
        }
    };

    if (loading) return <div className="text-gray-400">Loading...</div>;

    return (
        <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
            <h3 className="text-lg font-semibold text-white mb-4">{t('title')}</h3>

            {/* List of Phases */}
            <div className="space-y-3 mb-6">
                {phases.length === 0 && (
                    <p className="text-gray-500 text-sm italic">No phases yet.</p>
                )}
                {phases.map((phase) => (
                    <div key={phase.id} className="flex items-center justify-between bg-gray-700/30 p-3 rounded-lg border border-gray-700">
                        <div className="flex items-center gap-4">
                            <span className="flex items-center justify-center w-6 h-6 rounded-full bg-gray-700 text-xs text-gray-400 font-mono">
                                {phase.order}
                            </span>
                            <div>
                                <p className="text-sm font-medium text-white">{phase.name}</p>
                                <div className="flex items-center gap-2 text-xs text-gray-400 mt-1">
                                    <span className={`px-1.5 py-0.5 rounded ${phase.status === 'Completado' ? 'bg-green-500/20 text-green-400' :
                                        phase.status === 'En Progreso' ? 'bg-blue-500/20 text-blue-400' :
                                            'bg-gray-600 text-gray-400'
                                        }`}>
                                        {phase.status === 'Completado' ? t('completed') :
                                            phase.status === 'En Progreso' ? t('in_progress') :
                                                t('pending')}
                                    </span>
                                    {phase.date && <span>• {new Date(phase.date).toLocaleDateString()}</span>}
                                </div>
                            </div>
                        </div>
                        <button
                            onClick={() => handleDeletePhase(phase.id)}
                            className="text-gray-500 hover:text-red-400 transition-colors"
                            title="Delete"
                        >
                            <TrashIcon className="h-5 w-5" />
                        </button>
                    </div>
                ))}
            </div>

            {/* Add New Phase Form */}
            <form onSubmit={handleAddPhase} className="mt-4 pt-4 border-t border-gray-700">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 items-end">
                    <div className="col-span-1 lg:col-span-2">
                        <label className="block text-xs text-gray-400 mb-1">{t('phaseName')}</label>
                        <input
                            type="text"
                            placeholder={t('phaseName')}
                            value={newPhaseName}
                            onChange={(e) => setNewPhaseName(e.target.value)}
                            className="block w-full rounded-md border-0 bg-gray-700/50 py-2 text-white shadow-sm ring-1 ring-inset ring-gray-600 placeholder:text-gray-500 focus:ring-2 focus:ring-inset focus:ring-yellow-500 sm:text-sm sm:leading-6"
                        />
                    </div>
                    <div>
                        <label className="block text-xs text-gray-400 mb-1">{t('status')}</label>
                        <select
                            value={newPhaseStatus}
                            onChange={(e) => setNewPhaseStatus(e.target.value)}
                            className="block w-full rounded-md border-0 bg-gray-700/50 py-2 text-white shadow-sm ring-1 ring-inset ring-gray-600 focus:ring-2 focus:ring-inset focus:ring-yellow-500 sm:text-sm sm:leading-6"
                        >
                            <option>Pendiente</option>
                            <option>En Progreso</option>
                            <option>Completado</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-xs text-gray-400 mb-1">{t('date') || 'Fecha'}</label>
                        <input
                            type="date"
                            value={newPhaseDate}
                            onChange={(e) => setNewPhaseDate(e.target.value)}
                            className="block w-full rounded-md border-0 bg-gray-700/50 py-2 text-white shadow-sm ring-1 ring-inset ring-gray-600 focus:ring-2 focus:ring-inset focus:ring-yellow-500 sm:text-sm sm:leading-6"
                        />
                    </div>
                </div>
                <div className="mt-4 flex justify-end">
                    <button
                        type="submit"
                        disabled={!newPhaseName}
                        className="flex items-center gap-2 bg-yellow-500 px-4 py-2 rounded-md text-sm font-semibold text-black shadow-sm hover:bg-yellow-400 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                    >
                        <PlusIcon className="h-5 w-5" />
                        {t('add') || 'Añadir Fase'}
                    </button>
                </div>
            </form>
        </div>
    );
}
