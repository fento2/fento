'use client';

import { motion } from 'framer-motion';

const skills = [
  'JavaScript',
  'TypeScript',
  'React',
  'Next.js',
  'Node.js',
  'Express',
  'PostgreSQL',
  'Tailwind CSS',
  'REST APIs',
  'Web Design',
];

const timeline = [
  {
    number: '001',
    company: 'Freelance',
    role: 'Fullstack Developer',
    date: '2024 – Present',
  },
  {
    number: '002',
    company: 'Tech Startup',
    role: 'Frontend Engineer',
    date: '2023 – 2024',
  },
  {
    number: '003',
    company: 'Agency',
    role: 'Web Developer',
    date: '2022 – 2023',
  },
];

export default function About() {
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
              ABOUT
            </h1>
            <p className="text-lg mt-6 max-w-2xl opacity-80">
              Fullstack developer building from the database to the browser. Direct, minimal, no compromise.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Bio Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 border-b-4 border-ink">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
            {/* Left - Portrait Placeholder */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.4 }}
              className="bg-ink border-4 border-ink aspect-square"
            />

            {/* Right - Bio */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.4 }}
              className="space-y-6"
            >
              <p className="text-lg leading-relaxed">
                I'm a fullstack developer obsessed with shipping. I spend my time building APIs that scale, interfaces
                that work, and systems that last. No magic, no hype — just solid engineering.
              </p>

              <p className="text-lg leading-relaxed">
                I care about performance, accessibility, and clean code. The work should speak louder than the resume.
                Every project is an opportunity to prove that brutal simplicity outperforms complexity.
              </p>

              <p className="text-lg leading-relaxed">
                When I'm not coding, I'm reading about design systems, database optimization, or architectural patterns.
                Coffee helps.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Skills Grid */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 border-b-4 border-ink">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
            className="mb-12"
          >
            <h2 className="font-helvetica text-4xl sm:text-5xl tracking-tighter uppercase">Skills</h2>
          </motion.div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
            {skills.map((skill, idx) => {
              const colors = ['bg-bone border-4 border-ink text-ink', 'bg-ink text-bone', 'bg-brutal text-bone'];
              const colorClass = colors[idx % 3];

              return (
                <motion.div
                  key={skill}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  className={`${colorClass} p-4 font-helvetica text-sm tracking-tight text-center`}
                >
                  {skill}
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
            className="mb-12"
          >
            <h2 className="font-helvetica text-4xl sm:text-5xl tracking-tighter uppercase">Timeline</h2>
          </motion.div>

          <div className="space-y-8">
            {timeline.map((item) => (
              <motion.div
                key={item.number}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4 }}
                className="flex gap-8 items-start"
              >
                <div className="font-helvetica text-xl tracking-tight shrink-0 pt-1">{item.number} →</div>
                <div className="flex-1">
                  <h3 className="font-helvetica text-2xl uppercase tracking-tight mb-1">{item.company}</h3>
                  <p className="text-sm opacity-80">{item.role}</p>
                  <p className="font-mono text-xs uppercase tracking-widest mt-2 opacity-60">{item.date}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
