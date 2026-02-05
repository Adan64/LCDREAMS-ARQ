import React from 'react';
import Link from 'next/link';
import Icon from '@/components/ui/AppIcon';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    company: [
      { label: 'Sobre Nosotros', href: '/about' },
      { label: 'Servicios', href: '/services' },
      { label: 'Portafolio', href: '/portfolio-gallery' },
      { label: 'Casos de Estudio', href: '/project-case-studies' },
    ],
    resources: [
      { label: 'Blog', href: '/homepage#blog' },
      { label: 'Guías de Diseño', href: '/homepage#resources' },
      { label: 'Preguntas Frecuentes', href: '/homepage#faq' },
      { label: 'Contacto', href: '/contact' },
    ],
    social: [
      { name: 'Instagram', icon: 'CameraIcon', href: '#' },
      { name: 'LinkedIn', icon: 'BriefcaseIcon', href: '#' },
      { name: 'Facebook', icon: 'UserGroupIcon', href: '#' },
      { name: 'Pinterest', icon: 'PhotoIcon', href: '#' },
    ],
  };

  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          <div>
            <Link href="/homepage" className="inline-flex items-center space-x-3 mb-6">
              <svg
                width="40"
                height="40"
                viewBox="0 0 48 48"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M24 4L4 16V32L24 44L44 32V16L24 4Z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-primary-foreground"
                />
                <path
                  d="M24 4V44M4 16L44 32M44 16L4 32"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-accent"
                />
              </svg>
              <span className="font-headline text-xl font-headline-bold">
LCDREAM.ARQ
              </span>
            </Link>
            <p className="font-body text-sm text-primary-foreground/70 leading-relaxed">
              Transformando espacios con visión y creatividad. Excelencia arquitectónica que mejora la vida humana.
            </p>
          </div>

          <div>
            <h3 className="font-headline text-base font-headline-bold mb-4">
              Empresa
            </h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="font-body text-sm text-primary-foreground/70 hover:text-accent transition-smooth"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-headline text-base font-headline-bold mb-4">
              Recursos
            </h3>
            <ul className="space-y-3">
              {footerLinks.resources.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="font-body text-sm text-primary-foreground/70 hover:text-accent transition-smooth"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-headline text-base font-headline-bold mb-4">
              Síguenos
            </h3>
            <div className="flex space-x-3">
              {footerLinks.social.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  className="w-10 h-10 rounded-full bg-primary-foreground/10 hover:bg-accent/20 flex items-center justify-center transition-smooth"
                  aria-label={social.name}
                >
                  <Icon name={social.icon as any} size={20} className="text-primary-foreground" />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-primary-foreground/10">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="font-body text-sm text-primary-foreground/60">
              © {currentYear} LCDREAM.ARQ. Todos los derechos reservados.
            </p>
            <div className="flex space-x-6">
              <Link
                href="#"
                className="font-body text-sm text-primary-foreground/60 hover:text-accent transition-smooth"
              >
                Privacidad
              </Link>
              <Link
                href="#"
                className="font-body text-sm text-primary-foreground/60 hover:text-accent transition-smooth"
              >
                Términos
              </Link>
              <Link
                href="#"
                className="font-body text-sm text-primary-foreground/60 hover:text-accent transition-smooth"
              >
                Cookies
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;