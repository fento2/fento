'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

export default function NotFound() {
  return (
    <main className="bg-ink text-bone min-h-screen flex flex-col items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center"
      >
        <h1 className="font-helvetica text-7xl sm:text-8xl lg:text-9xl leading-none mb-8 uppercase">
          404
        </h1>
        <p className="font-helvetica text-4xl sm:text-5xl uppercase tracking-tight mb-12">
          / NOT FOUND
        </p>

        <Link href="/">
          <button className="bg-brutal text-ink font-helvetica text-lg uppercase tracking-tight py-4 px-8 hover:bg-bone hover:text-ink transition-colors duration-100">
            [ GO HOME ↗ ]
          </button>
        </Link>
      </motion.div>
    </main>
  );
}
