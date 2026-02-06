import { createClient } from '@/lib/supabase/server';

export default async function TestDbPage() {
    const supabase = await createClient();

    // Attempt to fetch projects
    const { data: projects, error } = await supabase
        .from('projects')
        .select('*');

    return (
        <div className="p-12 text-white bg-gray-900 min-h-screen">
            <h1 className="text-3xl font-bold mb-6">Prueba de Conexión Supabase</h1>

            {error ? (
                <div className="bg-red-500/20 text-red-200 p-4 rounded border border-red-500">
                    <h2 className="font-bold">Error:</h2>
                    <pre>{JSON.stringify(error, null, 2)}</pre>
                </div>
            ) : (
                <div className="space-y-4">
                    <div className="bg-green-500/20 text-green-200 p-4 rounded border border-green-500">
                        <h2 className="font-bold">¡Conexión Exitosa!</h2>
                        <p>Se encontraron {projects?.length} proyectos en la base de datos.</p>
                    </div>

                    <div className="grid gap-4 mt-8">
                        {projects?.map((project) => (
                            <div key={project.id} className="bg-gray-800 p-4 rounded border border-gray-700">
                                <h3 className="font-bold text-xl">{project.title['es'] || project.title}</h3>
                                <p className="text-gray-400">Cliente: {project.client}</p>
                                <p className="text-gray-400">Estado: {project.status}</p>
                                <div className="mt-2 text-xs text-gray-500">ID: {project.id}</div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
