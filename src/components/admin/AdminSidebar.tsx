'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { usePathname } from 'next/navigation';
import {
  HomeIcon,
  FolderIcon,
  DocumentTextIcon,
  Cog6ToothIcon,
  UsersIcon,
  ArrowLeftOnRectangleIcon
} from '@heroicons/react/24/outline';
import clsx from 'clsx';

export default function AdminSidebar() {
  const t = useTranslations('Admin.Sidebar');
  const pathname = usePathname();

  const navigation = [
    { name: t('dashboard'), href: '/admin', icon: HomeIcon },
    { name: t('projects'), href: '/admin/projects', icon: FolderIcon },
    { name: t('blog'), href: '/admin/blog', icon: DocumentTextIcon },
    { name: t('users'), href: '/admin/users', icon: UsersIcon },
    { name: t('settings'), href: '/admin/settings', icon: Cog6ToothIcon },
  ];

  return (
    <div className="flex flex-col gap-y-5 overflow-y-auto bg-gray-900 border-r border-gray-800 min-h-screen transition-all duration-300 ease-in-out w-20 hover:w-64 group z-50">

      {/* Logo Section */}
      <div className="flex h-16 shrink-0 items-center justify-center px-4 overflow-hidden whitespace-nowrap">
        <span className="text-xl font-bold text-white tracking-wider flex items-center gap-1">
          LC
          <span className="text-yellow-500">.</span>
          <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 w-0 group-hover:w-auto overflow-hidden">
            DREAM<span className="text-yellow-500">.ADMIN</span>
          </span>
        </span>
      </div>

      <nav className="flex flex-1 flex-col px-3">
        <ul role="list" className="flex flex-1 flex-col gap-y-7">
          <li>
            <ul role="list" className="space-y-2">
              {navigation.map((item) => {
                const isActive = pathname.includes(item.href) && (item.href !== '/admin' || pathname.endsWith('/admin'));
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href as any}
                      className={clsx(
                        isActive
                          ? 'bg-gray-800 text-yellow-500'
                          : 'text-gray-400 hover:text-white hover:bg-gray-800',
                        'flex items-center gap-x-3 rounded-md p-3 text-sm font-semibold transition-colors duration-200 whitespace-nowrap overflow-hidden'
                      )}
                    >
                      <item.icon className="h-6 w-6 shrink-0" aria-hidden="true" />
                      <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-75">
                        {item.name}
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </li>
          <li className="mt-auto">
            <Link
              href="/"
              className="flex items-center gap-x-3 rounded-md p-3 text-sm font-semibold text-gray-400 hover:bg-gray-800 hover:text-white whitespace-nowrap overflow-hidden"
            >
              <ArrowLeftOnRectangleIcon className="h-6 w-6 shrink-0" aria-hidden="true" />
              <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-75">
                {t('backToSite')}
              </span>
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}
