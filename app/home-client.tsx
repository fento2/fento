'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { ArticleMeta } from '@/lib/articles';

interface Project {
  number: string;
  title: string;
  tech: string;
  bgColor: string;
  textColor: string;
  numberBg: string;
  numberText?: string;
}

interface HomeClientProps {
  projects: Project[];
  articles: ArticleMeta[];
}

export function HomeClient({ projects, articles }: HomeClientProps) {
  return (
    <main className="min-h-screen bg-bone text-ink">
      {/* Hero Section */}
      <section className="relative border-b-4 border-ink overflow-hidden">
        {/* Hero Background */}
        <Image
          src="/home/hero.jpg"
          alt="bg-hero"
          fill
          priority
          className="object-cover"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-linear-to-b from-black/90 via-black/50 to-black/10" />

        {/* Content */}


        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-30">

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Top label row */}
            <div className="flex gap-2 mb-4 flex-wrap items-center justify-between">
              <div className="inline-block bg-brutal text-ink px-3 py-1">
                <span className="font-extrabold text-white text-xs tracking-widest">EST. 2025</span>
              </div>
            </div>

            {/* Massive headline */}
            <h1 className="text-5xl sm:text-7xl lg:text-9xl leading-[0.92] mb-8 uppercase tracking-widest font-extrabold text-white">
              I build<br />
              the{' '}
              {/* Wrapper untuk kata "whole" */}
              <span className="relative inline-block px-3 -rotate-6">

                {/* Background kotak "whole" */}
                <span className="absolute inset-x-0 -bottom-3 md:-bottom-8 -top-3 md:-top-8 bg-brutal " />

                {/* Teks "whole" */}
                <span className="relative z-10">whole</span>

              </span>
              <br />

              <span className="relative z-40">damn thing.</span>
            </h1>


            {/* Bottom row: tagline + CTA */}
            <div className="flex items-center justify-between mt-8 gap-6 flex-wrap">

              <div className="inline-block text-brutal px-3 py-1 text-xl ">
                <span className='font-extralight'>
                  FENDRY
                </span>
                {" "}
                <span className='font-extrabold'>
                  TONRATE
                </span>

                {/* <p className="text-mono sm:text-lg max-w-md leading-snug text-bone">
                  Frontend, backend, the boring parts in between. No fluff, just shipping.
                </p> */}

              </div>

              <Link href="/project">
                <Button className="font-helvetica text-sm h-auto py-4 px-6 bg-bone text-ink hover:bg-brutal hover:text-bone rounded-none tracking-wider transition-colors duration-100">
                  SEE THE WORK ↓
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>

      </section>

      {/* Stats strip */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="grid grid-cols-2 sm:grid-cols-4 bg-ink text-bone"
      >
        <div className="px-6 py-5 border-r border-bone/20">
          <div className="font-helvetica text-4xl leading-none">14+</div>
          <div className="font-helvetica text-[10px] tracking-widest mt-2">PROJECTS</div>
        </div>
        <div className="px-6 py-5 sm:border-r border-bone/20">
          <div className="font-helvetica text-4xl leading-none">∞</div>
          <div className="font-helvetica text-[10px] tracking-widest mt-2">COFFEE</div>
        </div>
        <div className="px-6 py-5 border-r border-bone/20 border-t sm:border-t-0">
          <div className="font-helvetica text-4xl leading-none text-brutal">100%</div>
          <div className="font-helvetica text-[10px] tracking-widest mt-2">SHIP RATE</div>
        </div>
        <div className="px-6 py-5 border-t sm:border-t-0">
          <div className="font-helvetica text-4xl leading-none">2025</div>
          <div className="font-helvetica text-[10px] tracking-widest mt-2">SINCE</div>
        </div>
      </motion.div>

      {/* Featured Projects Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-bone">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
            className="mb-12"
          >
            <span className="font-helvetica text-xs tracking-widest uppercase mb-4 block">
              ★ FEATURED OUTPUT
            </span>
            <h2 className="font-helvetica text-5xl sm:text-6xl tracking-tighter uppercase">Latest Work</h2>
          </motion.div>

          <div className="space-y-0">
            {projects.map((project, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className={`${project.bgColor} ${project.textColor} p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center gap-6 group cursor-pointer hover:bg-ink hover:text-bone transition-colors duration-100 border-4 border-ink`}
              >
                <div
                  className={`${project.numberBg} ${project.numberText || 'text-ink'} px-3 py-1 font-helvetica text-sm shrink-0`}
                >
                  {project.number}
                </div>
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

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="mt-12 text-center"
          >
            <Link href="/project">
              <Button className="font-helvetica text-base h-auto py-4 px-8 bg-ink text-bone hover:bg-brutal hover:text-bone rounded-none tracking-wider transition-colors duration-100">
                VIEW ALL PROJECTS →
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Latest Articles Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-bone">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
            className="mb-12"
          >
            <span className="font-helvetica text-xs tracking-widest uppercase mb-4 block">
              ★ LATEST WRITING
            </span>
            <h2 className="font-helvetica text-5xl sm:text-6xl tracking-tighter uppercase">Journal</h2>
          </motion.div>

          <div className="space-y-0">
            {articles.map((article, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="border-b-2 border-ink hover:bg-ink hover:text-bone transition-colors duration-100 p-6 sm:p-8"
              >
                <div className="flex gap-6 items-start">
                  <div className="font-helvetica text-xs tracking-widest uppercase shrink-0">[A0{idx + 1}]</div>
                  <div className="flex-1">
                    <div className="font-mono text-xs uppercase tracking-widest mb-2 opacity-60">
                      {article.date} · {article.category} · {article.readingTime}
                    </div>
                    <h3 className="font-helvetica text-2xl sm:text-3xl tracking-tight uppercase leading-none mb-2">
                      {article.title}
                    </h3>
                    <p className="text-sm opacity-80">{article.excerpt}</p>
                  </div>
                  <div className="text-2xl font-helvetica shrink-0">→</div>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="mt-12 text-center"
          >
            <Link href="/articles">
              <Button className="font-helvetica text-base h-auto py-4 px-8 bg-ink text-bone hover:bg-brutal hover:text-bone rounded-none tracking-wider transition-colors duration-100">
                READ ALL ARTICLES →
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-ink text-bone border-t-4 border-ink">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <span className="font-helvetica text-xs tracking-widest uppercase mb-4 block text-brutal">
              ★ 005 / CONNECT
            </span>
            <h2 className="font-helvetica text-5xl sm:text-6xl lg:text-7xl mb-6 tracking-tighter uppercase leading-[0.92]">
              Let's Work<br />
              <span className="bg-brutal text-bone px-3 inline-block">Together</span>
            </h2>
            <p className="text-base sm:text-lg mb-12 opacity-70 max-w-md mx-auto">
              Got a project in mind? Let's build something brutal together.
            </p>

            <Link href="/contact">
              <Button className="font-helvetica text-sm h-auto py-4 px-8 bg-brutal text-bone hover:bg-bone hover:text-ink rounded-none tracking-wider transition-colors duration-100">
                TRANSMIT MESSAGE ↗
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
