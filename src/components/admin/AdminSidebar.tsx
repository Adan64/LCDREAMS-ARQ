'use client';

import { Link } from '@/i18n/routing';
import { usePathname } from 'next/navigation';
import {
  HomeIcon,
  FolderIcon as oFolderIcon,
  DocumentTextIcon,
  Cog6ToothIcon,
  UsersIcon,
  ArrowLeftOnRectangleIcon
} from '@heroicons/react/24/outline';
import clsx from 'clsx';

// Wrapper to avoid naming conflict if needed, though aliasing above handles it
function FolderIcon(props: any) {
  return <oFolderIcon {...props} />
}

const navigation = [
  { name: 'Dashboard', href: '/admin', icon: HomeIcon },
  { name: 'Proyectos', href: '/admin/projects', icon: FolderIcon },
  { name: 'Blog / Noticias', href: '/admin/blog', icon: DocumentTextIcon },
  { name: 'Usuarios', href: '/admin/users', icon: UsersIcon },
  { name: 'Configuración', href: '/admin/settings', icon: Cog6ToothIcon },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-gray-900 px-6 pb-4 w-64 min-h-screen border-r border-gray-800">
      <div className="flex h-16 shrink-0 items-center">
        <span className="text-xl font-bold text-white tracking-wider">LCDREAM<span className="text-yellow-500">.ADMIN</span></span>
      </div>
      <nav className="flex flex-1 flex-col">
        <ul role="list" className="flex flex-1 flex-col gap-y-7">
          <li>
            <ul role="list" className="-mx-2 space-y-1">
              {navigation.map((item) => {
                const isActive = pathname.includes(item.href) && (item.href !== '/admin' || pathname.endsWith('/admin'));
                return (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      className={clsx(
                        isActive
                          ? 'bg-gray-800 text-yellow-500'
                          : 'text-gray-400 hover:text-white hover:bg-gray-800',
                        'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold transition-colors duration-200'
                      )}
                    >
                      <item.icon className="h-6 w-6 shrink-0" aria-hidden="true" />
                      {item.name}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </li>
          <li className="mt-auto">
            <Link
              href="/"
              className="group -mx-2 flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 text-gray-400 hover:bg-gray-800 hover:text-white"
            >
              <ArrowLeftOnRectangleIcon className="h-6 w-6 shrink-0" aria-hidden="true" />
              Volver al Sitio
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}
