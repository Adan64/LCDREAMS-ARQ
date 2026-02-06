import { Link } from '@/i18n/routing';
import { PencilSquareIcon, TrashIcon } from '@heroicons/react/24/outline';

const projects = [
    { id: 1, title: 'Casa en la Playa', client: 'Familia Pérez', status: 'En Construcción', date: '2025-01-15' },
    { id: 2, title: 'Oficinas TechHub', client: 'Innovate Corp', status: 'Diseño', date: '2025-02-01' },
    { id: 3, title: 'Restaurante El Jardín', client: 'Chef Mario', status: 'Completado', date: '2024-11-20' },
    { id: 4, title: 'Residencia Monteverde', client: 'Sr. Gómez', status: 'Licencia', date: '2024-12-10' },
];

export default function AdminProjectsPage() {
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
                        {projects.map((project) => (
                            <tr key={project.id} className="hover:bg-gray-700/50 transition-colors">
                                <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-white sm:pl-6">{project.title}</td>
                                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-300">{project.client}</td>
                                <td className="whitespace-nowrap px-3 py-4 text-sm">
                                    <span className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset ${project.status === 'Completado' ? 'bg-green-400/10 text-green-400 ring-green-400/20' :
                                        project.status === 'En Construcción' ? 'bg-blue-400/10 text-blue-400 ring-blue-400/20' :
                                            'bg-yellow-400/10 text-yellow-400 ring-yellow-400/20'
                                        }`}>
                                        {project.status}
                                    </span>
                                </td>
                                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-400">{project.date}</td>
                                <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                                    <div className="flex justify-end gap-3">
                                        <button className="text-gray-400 hover:text-white transition-colors"><PencilSquareIcon className="h-5 w-5" /></button>
                                        <button className="text-gray-400 hover:text-red-400 transition-colors"><TrashIcon className="h-5 w-5" /></button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
