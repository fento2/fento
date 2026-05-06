'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Logo } from './logo';
import { ThemeToggle } from './theme-toggle';
import { cn } from '@/lib/utils';

const navItems = [
  { href: '/', label: 'HOME', number: '001' },
  { href: '/about', label: 'ABOUT', number: '002' },
  { href: '/project', label: 'WORK', number: '003' },
  { href: '/articles', label: 'ARTICLES', number: '004' },
  { href: '/contact', label: 'CONTACT', number: '005' },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);


  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);


  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };



  return (
    <>
      <nav className={cn("fixed w-full top-0 z-99999", {
        "bg-bone": isScrolled,
      })}>
        <div className="flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8">
          {/* Left - Logo */}
          <Link href="/" className="shrink-0">
            <Logo size="md" className={cn({
              "text-bone dark:bg-bone": !isScrolled
            })} />
          </Link>

          {/* Center - Desktop Nav */}
          <div className="hidden md:flex flex-1 justify-center gap-0">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`px-4 py-2 border-l-[1.5px] border-ink text-xs font-black tracking-tight transition-colors duration-100 ${isActive(item.href)
                  ? 'bg-brutal text-bone'
                  : 'bg-bone text-ink hover:bg-ink hover:text-bone'
                  }`}
              >
                {item.number} / {item.label}
              </Link>
            ))}
          </div>

          {/* Right - Theme Toggle & Mobile Menu */}
          <div className="flex items-center gap-4 shrink-0">
            <div className="hidden md:block">
              <ThemeToggle />
            </div>

            {/* Mobile Hamburger */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden w-6 h-6 border-[1.5px] border-ink bg-bone flex items-center justify-center"
              aria-label="Menu"
            >
              <div className="flex flex-col justify-center items-center gap-1">
                <div className="w-3 h-[1.5px] bg-ink" />
                <div className="w-3 h-[1.5px] bg-ink" />
                <div className="w-3 h-[1.5px] bg-ink" />
              </div>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Side Menu */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 z-30 bg-black/50 md:hidden"
            />

            {/* Sidebar */}
            <motion.div
              initial={{ x: -400 }}
              animate={{ x: 0 }}
              exit={{ x: -400 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="fixed left-0 top-0 h-screen w-72 z-40 bg-bone border-r-4 border-ink flex flex-col md:hidden overflow-y-auto"
            >
              {/* Close Button */}
              <div className="flex items-center justify-between h-16 px-6 border-b-4 border-ink">
                <Logo size="sm" />
                <button
                  onClick={() => setIsOpen(false)}
                  className="w-6 h-6 border-[1.5px] border-ink bg-bone flex items-center justify-center hover:bg-ink hover:text-bone transition-colors"
                  aria-label="Close"
                >
                  <span className="text-xl font-black">×</span>
                </button>
              </div>

              {/* Nav Items */}
              <div className="flex flex-col flex-1">
                {navItems.map((item, idx) => {
                  const backgrounds = ['bg-bone', 'bg-ink', 'bg-brutal'];
                  const bgClass = backgrounds[idx % 3];
                  const textColor =
                    bgClass === 'bg-ink'
                      ? 'text-bone'
                      : bgClass === 'bg-brutal'
                        ? 'text-bone'
                        : 'text-ink';

                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      className={`flex items-center justify-center h-16 border-b-4 border-ink text-sm font-black tracking-tight ${bgClass} ${textColor} transition-colors`}
                    >
                      {item.number} / {item.label}
                    </Link>
                  );
                })}
              </div>

              {/* Theme Toggle at Bottom */}
              <div className="border-t-4 border-ink p-4 bg-bone flex items-center justify-center">
                <ThemeToggle />
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
