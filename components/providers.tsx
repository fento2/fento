'use client';

import { ThemeProvider } from 'next-themes';
import { Navbar } from './core/navbar';
import { Footer } from './core/footer';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <Navbar />
      {children}
      <Footer />
    </ThemeProvider>
  );
}
