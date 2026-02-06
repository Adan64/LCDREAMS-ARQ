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
    '/legal': '/legal'
  }
});

export const {Link, redirect, usePathname, useRouter} =
  createNavigation(routing);
