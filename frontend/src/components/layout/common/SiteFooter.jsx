import { Link } from 'react-router-dom';
import AppIcon from '../../common/AppIcon';
import BrandLogo from '../../common/BrandLogo';

const footerGroups = [
  {
    title: 'Platform',
    links: [
      { label: 'Dashboard', href: '/' },
      { label: 'Services', href: '/services' },
      { label: 'Pricing', href: '/pricing' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About', href: '/about' },
      { label: 'Contact', href: '/contact' },
      { label: 'Privacy Policy', href: '#' },
    ],
  },
];

export default function SiteFooter() {
  return (
    <footer className="border-t border-outline-variant/50 bg-surface-container-low/70">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 md:grid-cols-4">
          <div className="md:col-span-2">
            <BrandLogo className="mb-5" />
            <p className="max-w-sm text-base leading-7 text-on-surface-variant">
              The complete operating system for modern educational institutions. Built for
              speed, clarity, and growth.
            </p>
          </div>

          {footerGroups.map((group) => (
            <div key={group.title}>
              <h5 className="mb-5 font-headline text-base font-extrabold text-on-surface">
                {group.title}
              </h5>
              <ul className="space-y-3">
                {group.links.map((link) => (
                  <li key={link.label}>
                    {link.href.startsWith('/') ? (
                      <Link className="text-on-surface-variant transition-colors hover:text-primary" to={link.href}>
                        {link.label}
                      </Link>
                    ) : (
                      <a className="text-on-surface-variant transition-colors hover:text-primary" href={link.href}>
                        {link.label}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-4 border-t border-outline-variant/60 pt-6 md:flex-row md:items-center">
          <p className="font-label text-xs uppercase tracking-[0.2em] text-on-surface-variant">
            © 2024 Skoolnet Inc. Digital Curator Edition.
          </p>
          <div className="flex flex-wrap gap-6">
            <a className="font-label text-xs uppercase tracking-widest text-on-surface-variant transition-colors hover:text-primary" href="#">
              Terms
            </a>
            <a className="font-label text-xs uppercase tracking-widest text-on-surface-variant transition-colors hover:text-primary" href="#">
              Status
            </a>
            <a className="font-label text-xs uppercase tracking-widest text-on-surface-variant transition-colors hover:text-primary" href="#">
              Security
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
