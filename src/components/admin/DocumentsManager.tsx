import { useTranslations } from 'next-intl';
import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';
import { TrashIcon, DocumentArrowUpIcon, DocumentIcon } from '@heroicons/react/24/outline';

type Document = {
    id: string;
    name: string;
    url: string;
    type: string;
    created_at: string;
};

interface DocumentsManagerProps {
    projectId: string;
}

export default function DocumentsManager({ projectId }: DocumentsManagerProps) {
    const t = useTranslations('Admin.Documents');
    const [documents, setDocuments] = useState<Document[]>([]);
    const [loading, setLoading] = useState(true);
    const [uploading, setUploading] = useState(false);
    const supabase = createClient();

    // Fetch Documents
    const fetchDocuments = async () => {
        try {
            const { data, error } = await supabase
                .from('project_documents')
                .select('*')
                .eq('project_id', projectId)
                .order('created_at', { ascending: false });

            if (error) throw error;
            setDocuments(data || []);
        } catch (error) {
            console.error('Error fetching documents:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (projectId) fetchDocuments();
    }, [projectId]);

    // Upload Document
    const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files || !e.target.files[0]) return;

        const file = e.target.files[0];
        setUploading(true);

        try {
            const fileExt = file.name.split('.').pop();
            const fileName = `${Math.random()}.${fileExt}`;
            const filePath = `${projectId}/${fileName}`;

            // 1. Upload to Storage
            const { error: uploadError } = await supabase.storage
                .from('documents') // Make sure this bucket exists!
                .upload(filePath, file);

            if (uploadError) throw uploadError;

            const { data: { publicUrl } } = supabase.storage
                .from('documents')
                .getPublicUrl(filePath);

            // 2. Add to Metadata Table
            const { data, error: insertError } = await supabase
                .from('project_documents')
                .insert({
                    project_id: projectId,
                    name: file.name, // Use original filename as title
                    url: publicUrl,
                    type: 'PDF' // Simplification, could be dynamic
                })
                .select()
                .single();

            if (insertError) throw insertError;

            setDocuments([data, ...documents]);
        } catch (error) {
            console.error('Error uploading document:', error);
            alert('Error al subir el documento. (¿Existe el bucket "documents"?)');
        } finally {
            setUploading(false);
            // Reset input
            e.target.value = '';
        }
    };

    // Delete Document
    const handleDelete = async (id: string) => {
        if (!confirm(t('deleteConfirm'))) return;

        try {
            const { error } = await supabase
                .from('project_documents')
                .delete()
                .eq('id', id);

            if (error) throw error;

            setDocuments(documents.filter(d => d.id !== id));
        } catch (error) {
            console.error('Error deleting document:', error);
            alert('Error al eliminar documento.');
        }
    };

    if (loading) return <div className="text-gray-400">Loading...</div>;

    return (
        <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
            <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-white">{t('title')}</h3>
                <div className="relative">
                    <input
                        type="file"
                        accept=".pdf,.doc,.docx"
                        onChange={handleUpload}
                        disabled={uploading}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed"
                    />
                    <button className="flex items-center gap-2 bg-gray-700 hover:bg-gray-600 text-white px-3 py-1.5 rounded-md text-sm transition-colors">
                        <DocumentArrowUpIcon className="h-4 w-4" />
                        {uploading ? 'Uploading...' : t('upload')}
                    </button>
                </div>
            </div>

            {/* List of Documents */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {documents.length === 0 && (
                    <p className="col-span-full text-gray-500 text-sm italic">{t('noDocuments')}</p>
                )}
                {documents.map((doc) => (
                    <div key={doc.id} className="flex items-center justify-between bg-gray-700/30 p-3 rounded-lg border border-gray-700 group">
                        <div className="flex items-center gap-3 overflow-hidden">
                            <DocumentIcon className="h-6 w-6 text-yellow-500 shrink-0" />
                            <div className="min-w-0">
                                <p className="text-sm font-medium text-white truncate pr-2" title={doc.name}>{doc.name}</p>
                                <p className="text-xs text-gray-400">{new Date(doc.created_at).toLocaleDateString()}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <a
                                href={doc.url}
                                target="_blank"
                                rel="noreferrer"
                                className="text-gray-400 hover:text-white p-1"
                                title="Ver documento"
                            >
                                <DocumentArrowUpIcon className="h-4 w-4 rotate-45" />
                            </a>
                            <button
                                onClick={() => handleDelete(doc.id)}
                                className="text-gray-400 hover:text-red-400 p-1"
                                title="Eliminar documento"
                            >
                                <TrashIcon className="h-4 w-4" />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
