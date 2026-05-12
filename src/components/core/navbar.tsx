'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { Logo } from './logo';
import { ThemeToggle } from './theme-toggle';
import { MobileSidebar } from './mobile-sidebar';
import { cn } from '@/lib/utils';

const navItems = [
  { href: '/', label: 'HOME' },
  { href: '/about', label: 'ABOUT' },
  { href: '/project', label: 'WORK' },
  { href: '/articles', label: 'ARTICLES' },
  { href: '/contact', label: 'CONTACT' },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === '/';

  const isTransparent = isHome && !isScrolled && !isOpen;

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <nav className={cn("fixed w-full top-0 z-50 transition-colors duration-200", {
        "bg-transparent! md:bg-transparent": isTransparent,
        "bg-background": !isTransparent,
      })}>
        <div className="flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8">
          {/* Left - Logo */}
          <Link href="/" className="shrink-0">
            <Logo size="md" className={cn({
              "text-white md:text-white": isTransparent
            })} />
          </Link>

          {/* Center - Desktop Nav */}
          <div className="hidden md:flex flex-1 justify-center gap-0">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "px-4 py-2 text-xs font-black  tracking-tight transition-colors duration-100",
                    isTransparent ? "text-white" : "text-foreground",
                    // Hover
                    isTransparent ? "hover:bg-white/15" : "hover:bg-accent hover:text-accent-foreground",
                    // Active
                    isActive && (isTransparent
                      ? "bg-white/20 text-white"
                      : "bg-accent text-accent-foreground"
                    )
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>

          {/* Right - Theme Toggle & Mobile Menu */}
          <div className="flex items-center gap-4 shrink-0">
            <div className="hidden md:block">
              <ThemeToggle transparent={isTransparent} />
            </div>

            {/* Mobile Hamburger */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={cn(
                "md:hidden w-11 h-11 border-[1.5px] flex items-center justify-center focus-visible:outline-2 focus-visible:outline-brutal transition-colors duration-200",
                isTransparent
                  ? "border-white/50 bg-white/10"
                  : "border-border bg-background"
              )}
              aria-label="Menu"
            >
              <div className="flex flex-col justify-center items-center gap-1">
                {/* Top line */}
                <motion.div
                  animate={isOpen ? { rotate: 45, y: 5.5 } : { rotate: 0, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className={cn("w-4 h-[1.5px]", isTransparent ? "bg-white" : "bg-foreground", {
                    "w-7": isOpen
                  })}
                />
                {/* Middle line */}
                <motion.div
                  animate={isOpen ? { opacity: 0 } : { opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  className={cn("w-4 h-[1.5px]", isTransparent ? "bg-white" : "bg-foreground")}
                />
                {/* Bottom line */}
                <motion.div
                  animate={isOpen ? { rotate: -45, y: -5.5 } : { rotate: 0, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className={cn("w-4 h-[1.5px]", isTransparent ? "bg-white" : "bg-foreground", {
                    "w-7": isOpen
                  })}
                />
              </div>
            </button>
          </div>
        </div>
      </nav>

      <MobileSidebar
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        navigationLinks={navItems}
      >
        <ThemeToggle />
      </MobileSidebar>
    </>
  );
}
