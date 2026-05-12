'use client';

import { Footer } from '@/components/core/footer';
import { Navbar } from '@/components/core/navbar';
import { ThemeProvider } from 'next-themes';

export function AppProvider({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <Navbar />
      {children}
      <Footer />
    </ThemeProvider>
  );
}
