'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

const allProjects = [
  {
    number: '01',
    title: 'Indonesia Region API',
    tech: 'NODE · EXPRESS · PRISMA · POSTGRES',
    category: 'API',
    bgColor: 'bg-brutal',
    textColor: 'text-bone',
  },
  {
    number: '02',
    title: 'Hotel Site Redesign',
    tech: 'NEXT · REACT · TAILWIND',
    category: 'WEB',
    bgColor: 'bg-bone',
    textColor: 'text-ink',
  },
  {
    number: '03',
    title: 'E-Commerce Platform',
    tech: 'NEXT · STRIPE · POSTGRES',
    category: 'WEB',
    bgColor: 'bg-ink',
    textColor: 'text-bone',
  },
  {
    number: '04',
    title: 'Mobile Fitness App',
    tech: 'REACT NATIVE · FIREBASE',
    category: 'MOBILE',
    bgColor: 'bg-brutal',
    textColor: 'text-bone',
  },
  {
    number: '05',
    title: 'Analytics Dashboard',
    tech: 'NEXT · RECHARTS · POSTGRES',
    category: 'WEB',
    bgColor: 'bg-bone',
    textColor: 'text-ink',
  },
  {
    number: '06',
    title: 'Payment Gateway Integration',
    tech: 'NODE · STRIPE API',
    category: 'API',
    bgColor: 'bg-ink',
    textColor: 'text-bone',
  },
  {
    number: '07',
    title: 'Social Media Platform',
    tech: 'NEXT · WEBSOCKETS · POSTGRES',
    category: 'WEB',
    bgColor: 'bg-brutal',
    textColor: 'text-bone',
  },
  {
    number: '08',
    title: 'Real-Time Notifications',
    tech: 'NODE · REDIS · SOCKET.IO',
    category: 'API',
    bgColor: 'bg-bone',
    textColor: 'text-ink',
  },
];

const categories = ['ALL', 'WEB', 'API', 'MOBILE'];

export default function Project() {
  const [activeCategory, setActiveCategory] = useState('ALL');

  const filtered =
    activeCategory === 'ALL' ? allProjects : allProjects.filter((p) => p.category === activeCategory);

  return (
    <main className="bg-bone text-ink">
      {/* Hero */}
      <section className="border-b-4 border-ink">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="font-helvetica text-6xl sm:text-7xl lg:text-9xl leading-[0.92] uppercase">
              SELECTED WORK
            </h1>
            <p className="text-lg mt-6 opacity-80">{allProjects.length} PROJECTS</p>
          </motion.div>
        </div>
      </section>

      {/* Filter Row */}
      <section className="border-b-4 border-ink px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex gap-2 flex-wrap">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 font-helvetica text-xs tracking-widest uppercase transition-colors duration-100 border-2 border-ink ${activeCategory === cat ? 'bg-brutal text-bone' : 'bg-bone text-ink hover:bg-ink hover:text-bone'}`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto space-y-0">
          {filtered.map((project, idx) => (
            <motion.div
              key={project.number}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className={`${project.bgColor} ${project.textColor} p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center gap-6 group cursor-pointer hover:bg-ink hover:text-bone transition-colors duration-100 border-4 border-ink`}
            >
              <div className="font-helvetica text-sm tracking-tight shrink-0">[{project.number}]</div>
              <div className="flex-1">
                <h3 className="font-helvetica text-2xl sm:text-3xl mb-2 tracking-tight uppercase leading-none">
                  {project.title}
                </h3>
                <p className="font-helvetica text-xs sm:text-sm uppercase tracking-wide opacity-80">
                  {project.tech}
                </p>
              </div>
              <div className="text-3xl sm:text-4xl font-helvetica shrink-0">→</div>
            </motion.div>
          ))}
        </div>
      </section>
    </main>
  );
}
