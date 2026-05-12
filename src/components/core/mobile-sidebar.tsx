'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

interface MobileSidebarProps {
    isOpen: boolean;
    onClose: () => void;
    navigationLinks: Array<{ href: string; label: string }>;
    children?: React.ReactNode;
}

export function MobileSidebar({
    isOpen,
    onClose,
    navigationLinks,
    children,
}: MobileSidebarProps) {
    const pathname = usePathname();

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/50 z-10 md:hidden"
                    />

                    {/* Sidebar */}
                    <motion.div
                        initial={{ x: -300 }}
                        animate={{ x: 0 }}
                        exit={{ x: -300 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                        className="fixed top-16 left-0 h-[calc(100vh-4rem)] w-64 bg-background border-r border-border z-50 md:hidden overflow-y-auto"
                    >


                        {/* Navigation Links */}
                        <nav className="px-4 space-y-2">
                            {navigationLinks.map((link, index) => (
                                <motion.div
                                    key={link.href}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    transition={{ delay: index * 0.05 }}
                                >
                                    <Link
                                        href={link.href}
                                        className={cn(
                                            "block px-4 py-3 text-xs font-black tracking-tight transition-colors duration-100",
                                            pathname === link.href
                                                ? "bg-accent text-accent-foreground"
                                                : "text-foreground hover:bg-accent/20"
                                        )}
                                        onClick={onClose}
                                    >
                                        {link.label}
                                    </Link>
                                </motion.div>
                            ))}
                        </nav>

                        {/* Additional Content (e.g., Theme Toggle) */}
                        {children && (
                            <motion.div
                                className="px-4 py-6 border-t border-border mt-6"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ delay: 0.3 }}
                            >
                                <p className="text-xs font-syne font-semibold text-muted-foreground mb-3">THEME</p>
                                {children}
                            </motion.div>
                        )}
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
