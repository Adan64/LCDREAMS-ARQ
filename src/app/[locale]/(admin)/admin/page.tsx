import { Link } from '@/i18n/routing';

export default function AdminDashboard() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-white">Dashboard</h1>
        <p className="text-gray-400 mt-2">Bienvenido al panel de administración de LCDREAM.ARQ.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { name: 'Proyectos Activos', stat: '12', change: '+2', changeType: 'increase' },
          { name: 'Visitas Mensuales', stat: '2,450', change: '+12%', changeType: 'increase' },
          { name: 'Mensajes Nuevos', stat: '5', change: '3 sin leer', changeType: 'neutral' },
          { name: 'Artículos Blog', stat: '8', change: '+1', changeType: 'increase' },
        ].map((item) => (
          <div key={item.name} className="overflow-hidden rounded-xl bg-gray-800 px-4 py-5 shadow sm:p-6 border border-gray-700">
            <dt className="truncate text-sm font-medium text-gray-400">{item.name}</dt>
            <dd className="mt-1 text-3xl font-semibold tracking-tight text-white">{item.stat}</dd>
            <dd className="mt-2 flex items-center text-sm text-green-400">
              {item.change}
            </dd>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <h2 className="text-lg font-semibold text-white mb-4">Acciones Rápidas</h2>
          <div className="flex flex-col gap-4">
            <Link href="/admin/projects" className="flex items-center justify-between p-4 bg-gray-700/50 rounded-lg hover:bg-gray-700 transition-colors group">
              <span className="text-gray-200">Añadir Nuevo Proyecto</span>
              <span className="text-yellow-500 group-hover:translate-x-1 transition-transform">→</span>
            </Link>
            <Link href="/admin/blog" className="flex items-center justify-between p-4 bg-gray-700/50 rounded-lg hover:bg-gray-700 transition-colors group">
              <span className="text-gray-200">Publicar Artículo</span>
              <span className="text-yellow-500 group-hover:translate-x-1 transition-transform">→</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
