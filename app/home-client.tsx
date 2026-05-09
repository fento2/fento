'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { HeroCarousel } from '@/components/core/hero-carousel';
import { HeroSlideShell } from '@/components/core/hero-slide-shell';
import { ArticleMeta } from '@/lib/articles';

// Tambah slide baru = tambah <> ... </> di array ini. HTML/JSX bebas, termasuk background-nya.
const heroSlides = [
  // ─── Slide 1 ──────────────────────────────────────────────────────────────
  <HeroSlideShell
    slideNumber="01"
    label="INTRO"
    marker="INDEX.HTML"
    background={
      <Image
        src="/home/hero.jpg"
        alt="bg-hero"
        fill
        priority
        className="object-cover"
      />
    }
  >
    <div className="relative z-10 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-20 lg:py-30 flex-1 flex items-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full"
      >
        <div className="flex gap-2 mb-4 flex-wrap items-center justify-between">
          <div className="inline-block bg-brutal text-ink px-3 py-1">
            <span className="font-extrabold text-white text-xs tracking-widest">EST. 2025</span>
          </div>
        </div>

        <h1 className="text-[2.75rem] sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl leading-[0.92] mb-8 uppercase tracking-tight sm:tracking-wide lg:tracking-widest font-extrabold text-white wrap-break-word">
          I build<br />
          the{' '}
          <span className="relative inline-block px-2 sm:px-3 -rotate-6">
            <span className="absolute inset-x-0 -bottom-2 -top-2 sm:-bottom-3 sm:-top-3 md:-bottom-8 md:-top-8 bg-brutal" />
            <span className="relative z-10">whole</span>
          </span>
          <br />
          <span className="relative z-40">damn thing.</span>
        </h1>

        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between mt-8 gap-6">
          <div className="text-brutal text-lg sm:text-xl max-w-md">
            <div className="leading-tight">
              <span className="font-extralight">FENDRY</span>{' '}
              <span className="font-extrabold">TONRATE</span>
            </div>
            <p className="font-mono text-xs sm:text-sm leading-snug text-bone mt-2">
              Frontend, backend, the boring parts in between. No fluff, just shipping.
            </p>
          </div>

          <Link href="/project" className="shrink-0">
            <Button className="font-helvetica text-sm h-auto py-4 px-6 bg-white text-black hover:bg-brutal hover:text-white rounded-none tracking-wider transition-colors duration-100">
              SEE THE WORK ↓
            </Button>
          </Link>
        </div>
      </motion.div>
    </div>
  </HeroSlideShell>,

  // ─── Slide 2 ──────────────────────────────────────────────────────────────
  <HeroSlideShell
    slideNumber="02"
    label="JOURNAL"
    marker="NOTES.LOG"
    overlayClassName="absolute inset-0 z-1 bg-linear-to-tl from-black/95 via-black/60 to-black/10 pointer-events-none"
    background={
      <video
        src="/home/hero.mp4"
        muted
        playsInline
        preload="metadata"
        className="absolute inset-0 w-full h-full object-cover"
      />
    }
  >
    {/* Konten utama — align kanan-bawah */}
    <div className="relative z-10 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-20 lg:py-30 flex-1 flex items-end justify-end">
      <motion.div
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full sm:max-w-2xl text-right"
      >
        {/* Tagline DI ATAS headline (kebalik dari slide 1) */}
        <p className="font-mono text-xs sm:text-sm leading-snug text-bone/80 mb-6 sm:ml-auto sm:max-w-sm">
          → Lessons, rants, and the parts no tutorial covers.
          <br />
          Written between commits.
        </p>

        {/* Headline — italic + underline brutal, bukan kotak miring */}
        <h1 className="font-helvetica italic text-4xl sm:text-6xl md:text-7xl lg:text-8xl leading-[0.95] mb-8 lowercase tracking-tighter font-black text-white">
          notes from{' '}
          <span className="relative inline-block">
            <span className="relative z-10">the build</span>
            <span className="absolute left-0 right-0 bottom-1 sm:bottom-2 h-2 sm:h-3 bg-brutal -z-0" />
          </span>
          <br />
          <span className="text-brutal not-italic font-extralight tracking-widest text-2xl sm:text-3xl md:text-4xl uppercase">
            — what i ship & why.
          </span>
        </h1>

        {/* Button outline + arrow icon, di kanan-bawah */}
        <div className="flex justify-end items-center gap-4">
          <span className="font-mono text-[10px] tracking-widest text-bone/50 hidden sm:block">
            /articles
          </span>
          <Link href="/articles" className="shrink-0">
            <Button className="font-helvetica text-sm h-auto py-4 px-6 bg-transparent text-white border-2 border-white hover:bg-brutal hover:border-brutal hover:text-white rounded-none tracking-wider transition-colors duration-100">
              READ THE JOURNAL ↗
            </Button>
          </Link>
        </div>
      </motion.div>
    </div>
  </HeroSlideShell>,
];

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
      <section className="relative overflow-hidden bg-ink">
        {/* Hero Carousel — background + foreground content per slide. Edit `heroSlides` above. */}
        <HeroCarousel slides={heroSlides} className="h-screen" autoplayDelay={10000} />

        {/* Full-width separator between Hero and Stats */}
        <div className="relative z-10 w-full h-2 bg-ink" />

        {/* Stats strip — pinned to bottom of hero viewport */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative z-10 grid grid-cols-2 sm:grid-cols-4 bg-ink text-bone"
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
      </section>

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
