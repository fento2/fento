'use client';

import Link from 'next/link';
import { Logo } from './logo';

const linkGroups = [
  {
    title: 'WORK',
    links: [
      { label: 'Projects', href: '/project' },
      { label: 'Case Studies', href: '/project' },
      { label: 'Articles', href: '/articles' },
      { label: 'Archive', href: '/articles' },
    ],
  },
  {
    title: 'ABOUT',
    links: [
      { label: 'Profile', href: '/about' },
      { label: 'Experience', href: '/about' },
      { label: 'Stack', href: '/about' },
      { label: 'Contact', href: '/contact' },
    ],
  },
  {
    title: 'CONNECT',
    links: [
      { label: 'GitHub', href: 'https://github.com', external: true },
      { label: 'LinkedIn', href: 'https://linkedin.com', external: true },
      { label: 'X / Twitter', href: 'https://x.com', external: true },
      { label: 'Email', href: 'mailto:ftonrate91@gmail.com' },
    ],
  },
  {
    title: 'RESOURCES',
    links: [
      { label: 'Resume', href: '/resume.pdf', external: true },
      { label: 'Uses', href: '/about' },
      { label: 'Colophon', href: '/about' },
      { label: 'RSS', href: '/feed.xml', external: true },
    ],
  },
];

export function Footer() {
  return (
    <footer className="mt-auto bg-background text-foreground border-t-2 border-border">
      <div className=" mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top — Big CTA */}
        <div className="py-16 md:py-24 border-b border-border/30">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8">
            <div>
              <p className="text-xs font-mono tracking-widest text-muted-foreground mb-4">
                [ LET&apos;S BUILD ]
              </p>
              <h2 className="font-helvetica text-5xl sm:text-6xl md:text-7xl lg:text-8xl leading-[0.9] text-foreground">
                Got a project?<br />
                <span className="text-brutal">Let&apos;s talk.</span>
              </h2>
            </div>
            <Link
              href="/contact"
              className="group inline-flex items-center gap-3 self-start md:self-end shrink-0 px-6 py-4 bg-brutal text-white font-mono text-sm tracking-wider border-2 border-brutal hover:bg-background hover:text-foreground hover:border-foreground transition-colors duration-150"
            >
              START A CONVERSATION
              <span className="transition-transform duration-150 group-hover:translate-x-1">→</span>
            </Link>
          </div>
        </div>


        {/* Middle — Link Grid */}
        <div className="py-12 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 border-b border-border/30">


          {linkGroups.map((group) => (
            <div key={group.title}>
              <h3 className="text-xs font-mono tracking-widest text-muted-foreground mb-4">
                {group.title}
              </h3>
              <ul className="space-y-2.5">
                {group.links.map((link) => (
                  <li key={link.label}>
                    {link.external ? (
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-foreground hover:text-brutal transition-colors duration-100 inline-flex items-center gap-1"
                      >
                        {link.label}
                        <span className="text-muted-foreground text-xs">↗</span>
                      </a>
                    ) : (
                      <Link
                        href={link.href}
                        className="text-sm text-foreground hover:text-brutal transition-colors duration-100"
                      >
                        {link.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}


        </div>

        <div className="flex justify-center mt-12">

          <div className='flex'>
            <Logo size='4xl' />
          </div>

        </div>

        {/* Bottom — Meta Row */}
        <div className="py-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4 text-xs font-mono text-muted-foreground">
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            <span>© 2026 FT. ALL RIGHTS RESERVED.</span>
            <Link href="/privacy" className="hover:text-foreground transition-colors">
              PRIVACY
            </Link>
            <Link href="/terms" className="hover:text-foreground transition-colors">
              TERMS
            </Link>
            <Link href="/sitemap.xml" className="hover:text-foreground transition-colors">
              SITEMAP
            </Link>
          </div>
          <div className="flex items-center gap-4">
            <span className="tracking-widest">ID · EN</span>
            <span className="text-muted-foreground/50">/</span>
            <span>v1.0.0</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
