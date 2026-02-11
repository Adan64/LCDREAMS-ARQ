import {createNavigation} from 'next-intl/navigation';
import {defineRouting} from 'next-intl/routing';

export const routing = defineRouting({
  locales: ['es', 'en', 'pt'],
  defaultLocale: 'es',
  localePrefix: 'always',
  pathnames: {
    '/': '/',
    '/homepage': '/homepage',
    '/about': '/about',
    '/services': '/services',
    '/portfolio-gallery': '/portfolio-gallery',
    '/project-case-studies': '/project-case-studies',
    '/resources-blog': '/resources-blog',
    '/contact': '/contact',
    '/privacy': '/privacy',
    '/terms': '/terms',
    '/cookies': '/cookies',
    '/legal': '/legal',
    '/client-portal': '/client-portal',
    '/client-portal/dashboard': '/client-portal/dashboard',
    '/admin': '/admin',
    '/admin/blog': '/admin/blog',
    '/admin/blog/new': '/admin/blog/new',
    '/admin/blog/edit/[id]': '/admin/blog/edit/[id]',
    '/admin/projects': '/admin/projects',
    '/admin/projects/new': '/admin/projects/new',
    '/admin/projects/[id]': '/admin/projects/[id]',
    '/admin/users': '/admin/users',
    '/admin/settings': '/admin/settings'
  }
});

export const {Link, redirect, usePathname, useRouter} =
  createNavigation(routing);
