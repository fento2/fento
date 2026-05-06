'use client';

import Link from 'next/link';

export function Footer() {
  return (
    <footer className="mt-auto bg-ink text-bone border-t-2 border-bone">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between">
          {/* Left - Copyright */}
          <div className="text-sm font-mono">
            FT © 2025
          </div>

          {/* Right - Links */}
          <div className="flex gap-6 text-sm font-mono">
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-brutal transition-colors duration-100"
            >
              → GITHUB
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-brutal transition-colors duration-100"
            >
              → LINKEDIN
            </a>
            <a
              href="mailto:ftonrate91@gmail.com"
              className="hover:text-brutal transition-colors duration-100"
            >
              → EMAIL
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
