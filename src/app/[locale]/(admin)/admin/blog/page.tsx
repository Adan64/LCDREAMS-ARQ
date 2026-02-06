import { Link } from '@/i18n/routing';
import { PencilSquareIcon, TrashIcon } from '@heroicons/react/24/outline';

const posts = [
    { id: 1, title: 'Tendencias en Arquitectura Sostenible 2026', category: 'Sostenibilidad', status: 'Publicado', views: 1240 },
    { id: 2, title: 'La Importancia de la Luz Natural', category: 'Diseño', status: 'Borrador', views: 0 },
    { id: 3, title: 'Cómo elegir los materiales adecuados', category: 'Guías', status: 'Publicado', views: 856 },
];

export default function AdminBlogPage() {
    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-white">Blog & Noticias</h1>
                    <p className="text-gray-400 text-sm mt-1">Gestiona el contenido editorial del sitio.</p>
                </div>
                <Link href="/admin/blog/new" className="bg-yellow-500 hover:bg-yellow-400 text-black font-semibold py-2 px-4 rounded-md transition-colors inline-block text-center">
                    + Nuevo Artículo
                </Link>
            </div>

            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 rounded-lg border border-gray-700">
                <table className="min-w-full divide-y divide-gray-700 bg-gray-800">
                    <thead className="bg-gray-900">
                        <tr>
                            <th className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-white sm:pl-6">Título</th>
                            <th className="px-3 py-3.5 text-left text-sm font-semibold text-white">Categoría</th>
                            <th className="px-3 py-3.5 text-left text-sm font-semibold text-white">Estado</th>
                            <th className="px-3 py-3.5 text-left text-sm font-semibold text-white">Vistas</th>
                            <th className="relative py-3.5 pl-3 pr-4 sm:pr-6"><span className="sr-only">Acciones</span></th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-700 bg-gray-800">
                        {posts.map((post) => (
                            <tr key={post.id} className="hover:bg-gray-700/50 transition-colors">
                                <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-white sm:pl-6">{post.title}</td>
                                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-300">{post.category}</td>
                                <td className="whitespace-nowrap px-3 py-4 text-sm">
                                    <span className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset ${post.status === 'Publicado' ? 'bg-green-400/10 text-green-400 ring-green-400/20' :
                                        'bg-gray-400/10 text-gray-400 ring-gray-400/20'
                                        }`}>
                                        {post.status}
                                    </span>
                                </td>
                                <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-400">{post.views}</td>
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
