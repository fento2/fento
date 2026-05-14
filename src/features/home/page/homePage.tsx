'use client';

import { motion, useScroll, useTransform, useSpring, useMotionValue, useVelocity, animate, useInView } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { HeroCarousel } from '@/features/home/components/hero-carousel';
import { HeroSlideShell } from '@/features/home/components/hero-slide-shell';
import { WorkCarousel } from '@/features/home/components/work-carousel';
import { ArticleMeta } from '@/lib/articles';
import type { WorkProject } from '@/features/home/components/work-carousel';
import {
    EASE_BRUTAL,
    EASE_OUT_EXPO,
    fadeUp,
    staggerParent,
    diagonalStagger,
    viewportOnce,
} from '@/features/home/lib/motion';
import { Magnetic, MarqueeRow, WordReveal } from '@/features/home/components/motion-bits';

// ─── Mock data ────────────────────────────────────────────────────────────
const marqueeWords = [
    'SHIP FAST',
    'BREAK NOTHING',
    'NO FLUFF',
    'SHIP AGAIN',
    'TYPESAFE',
    'PIXEL HONEST',
    'BUILD WEIRD',
    'COMMIT OFTEN',
];

const services = [
    {
        no: '/01',
        title: 'FULLSTACK BUILDS',
        desc: 'End-to-end product work. From schema to pixel, one head, one repo.',
        tag: 'NEXT · NODE · POSTGRES',
    },
    {
        no: '/02',
        title: 'INTERFACE DESIGN',
        desc: 'Brutalist, motion-first, opinionated. Interfaces that look like they ship.',
        tag: 'FIGMA · TAILWIND · MOTION',
    },
    {
        no: '/03',
        title: 'API & INFRA',
        desc: 'REST, queues, jobs, the unsexy bits that keep the lights on.',
        tag: 'PRISMA · REDIS · DOCKER',
    },
    {
        no: '/04',
        title: 'PERFORMANCE',
        desc: 'Lighthouse 100s. Bundle audits. Render budgets. No magic, just measure.',
        tag: 'LIGHTHOUSE · WPT · TRACES',
    },
];

const stackTicker = [
    'TYPESCRIPT', 'NEXT.JS', 'REACT', 'NODE', 'POSTGRES', 'PRISMA',
    'TAILWIND', 'FRAMER MOTION', 'DOCKER', 'REDIS', 'TRPC', 'ZOD',
    'VITEST', 'PLAYWRIGHT', 'GIT', 'LINUX',
];

const testimonials = [
    {
        quote: 'Shipped in three weeks what the last team couldn\'t in three months.',
        name: 'A. NAKAMURA',
        role: 'CTO · LATTICE LABS',
    },
    {
        quote: 'Talks like a designer, codes like a backend. Rare combo.',
        name: 'M. PUTRI',
        role: 'PRODUCT LEAD · KOPI.IO',
    },
    {
        quote: 'Refactored our auth flow without breaking a single session. Magic.',
        name: 'D. RAHMAN',
        role: 'STAFF ENG · NUSANTARA',
    },
];

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
                    <div className="inline-block bg-sun text-ink px-3 py-1">
                        <span className="font-extrabold text-ink text-xs tracking-widest">EST. 2025</span>
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
                        <p className="font-mono text-xs sm:text-sm leading-snug text-white mt-2">
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
                <p className="font-mono text-xs sm:text-sm leading-snug text-white/80 mb-6 sm:ml-auto sm:max-w-sm">
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

interface HomeClientProps {
    projects: WorkProject[];
    articles: ArticleMeta[];
}

// Scroll-driven number counter with a brutalist "lock-in" kick on finish
function AnimatedCounter({ to, suffix = '' }: { to: number; suffix?: string }) {
    const ref = useRef<HTMLSpanElement>(null);
    const inView = useInView(ref, { once: true, margin: '-50px' });
    const mv = useMotionValue(0);
    const [display, setDisplay] = useState(0);
    const [kicked, setKicked] = useState(false);

    useEffect(() => {
        if (!inView) return;
        const controls = animate(mv, to, {
            duration: 1.8,
            ease: EASE_OUT_EXPO,
            onUpdate: (v) => setDisplay(Math.floor(v)),
            onComplete: () => setKicked(true),
        });
        return () => controls.stop();
    }, [inView, to, mv]);

    return (
        <motion.span
            ref={ref}
            animate={kicked ? { scale: [1, 1.18, 1], skewX: [0, -6, 0] } : undefined}
            transition={{ duration: 0.35, ease: EASE_BRUTAL }}
            className="inline-block"
        >
            {display}
            {suffix}
        </motion.span>
    );
}


// 3D tilt card following cursor — perspective transform
function TiltCard({ children, className = '' }: { children: React.ReactNode; className?: string }) {
    const ref = useRef<HTMLDivElement>(null);
    const rx = useMotionValue(0);
    const ry = useMotionValue(0);
    const srx = useSpring(rx, { stiffness: 220, damping: 18 });
    const sry = useSpring(ry, { stiffness: 220, damping: 18 });

    const onMove = (e: React.MouseEvent) => {
        const el = ref.current;
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const px = (e.clientX - rect.left) / rect.width - 0.5;
        const py = (e.clientY - rect.top) / rect.height - 0.5;
        ry.set(px * 14);
        rx.set(-py * 14);
    };
    const onLeave = () => {
        rx.set(0);
        ry.set(0);
    };

    return (
        <motion.div
            ref={ref}
            onMouseMove={onMove}
            onMouseLeave={onLeave}
            style={{ rotateX: srx, rotateY: sry, transformPerspective: 1000 }}
            className={className}
        >
            {children}
        </motion.div>
    );
}

export function HomePage({ projects, articles }: HomeClientProps) {
    const aboutRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress: aboutProgress } = useScroll({
        target: aboutRef,
        offset: ['start end', 'end start'],
    });
    const aboutY = useTransform(aboutProgress, [0, 1], ['-15%', '15%']);
    const aboutYSmooth = useSpring(aboutY, { stiffness: 100, damping: 30 });
    const bigTextX = useTransform(aboutProgress, [0, 1], ['10%', '-30%']);

    // Featured Projects parallax bg
    const projectsRef = useRef<HTMLElement>(null);
    const { scrollYProgress: projectsProgress } = useScroll({
        target: projectsRef,
        offset: ['start end', 'end start'],
    });
    const projectsBgY = useTransform(projectsProgress, [0, 1], ['-20%', '20%']);
    const projectsNumX = useTransform(projectsProgress, [0, 1], ['-10%', '-50%']);

    // Articles parallax
    const articlesRef = useRef<HTMLElement>(null);
    const { scrollYProgress: articlesProgress } = useScroll({
        target: articlesRef,
        offset: ['start end', 'end start'],
    });
    const articlesBgY = useTransform(articlesProgress, [0, 1], ['-15%', '15%']);

    return (
        <main className="min-h-screen bg-bone text-ink overflow-x-clip">
            {/* Hero Section */}
            <section className="relative overflow-hidden bg-bone text-ink">
                {/* Hero Carousel — background + foreground content per slide. Edit `heroSlides` above. */}
                <HeroCarousel slides={heroSlides} className="h-screen" autoplayDelay={10000} />


                {/* Stats strip — animated counters on scroll */}
                <motion.div
                    variants={staggerParent(0.09, 0.15)}
                    initial="hidden"
                    whileInView="show"
                    viewport={viewportOnce}
                    className="relative z-10 grid grid-cols-2 sm:grid-cols-4 bg-bone text-ink border-t-2 border-ink"
                >
                    {[
                        { v: 50, suffix: '+', label: 'PROJECTS SHIPPED', tag: '/01', hover: 'hover:bg-brutal', accent: 'text-brutal', tick: 'bg-brutal' },
                        { v: 3, suffix: 'yr', label: 'EXPERIENCE', tag: '/02', hover: 'hover:bg-sun', accent: 'text-ink', tick: 'bg-sun' },
                        { v: 12, suffix: '+', label: 'TECH STACKS', tag: '/03', hover: 'hover:bg-cyan', accent: 'text-ink', tick: 'bg-cyan' },
                    ].map((s, i) => (
                        <motion.div
                            key={s.label}
                            variants={fadeUp}
                            whileHover={{ y: -2 }}
                            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                            className={`group relative overflow-hidden px-6 py-7 border-r border-ink/20 ${i >= 2 ? 'border-t sm:border-t-0' : ''} ${s.hover} transition-colors duration-200`}
                        >
                            {/* top accent bar */}
                            <div aria-hidden className={`pointer-events-none absolute inset-x-0 top-0 h-0.75 ${s.tick} origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out`} />
                            {/* corner tag */}
                            <div className="flex items-start justify-between mb-3">
                                <span className="font-mono text-[10px] tracking-widest text-ink/40 group-hover:text-white/70 transition-colors">
                                    {s.tag}
                                </span>
                                <motion.span
                                    aria-hidden
                                    initial={{ scale: 0, rotate: -45 }}
                                    whileInView={{ scale: 1, rotate: 0 }}
                                    viewport={viewportOnce}
                                    transition={{ delay: 0.4 + i * 0.08, type: 'spring', stiffness: 300, damping: 14 }}
                                    className={`w-2 h-2 ${s.tick} group-hover:bg-white`}
                                />
                            </div>
                            <div className={`font-helvetica text-5xl font-bold leading-none ${s.accent} group-hover:text-white transition-colors`}>
                                <AnimatedCounter to={s.v} />
                                <span className="text-2xl">{s.suffix}</span>
                            </div>
                            <div className="font-helvetica text-[10px] tracking-widest mt-3 text-ink/60 group-hover:text-white/80">{s.label}</div>
                        </motion.div>
                    ))}
                    <motion.div
                        variants={fadeUp}
                        whileHover={{ y: -2 }}
                        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                        className="group relative overflow-hidden px-6 py-7 border-t sm:border-t-0 hover:bg-brutal transition-colors duration-200"
                    >
                        <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-0.75 bg-brutal origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out" />
                        <div className="flex items-start justify-between mb-3">
                            <span className="font-mono text-[10px] tracking-widest text-ink/40 group-hover:text-white/70 transition-colors">/04</span>
                            <motion.span
                                aria-hidden
                                animate={{ scale: [1, 1.4, 1] }}
                                transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
                                className="w-2 h-2 bg-brutal group-hover:bg-white"
                            />
                        </div>
                        <motion.div
                            animate={{ rotate: [0, 360] }}
                            transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
                            className="font-helvetica text-5xl font-bold leading-none text-brutal group-hover:text-white inline-block transition-colors"
                        >
                            ∞
                        </motion.div>
                        <div className="font-helvetica text-[10px] tracking-widest mt-3 text-ink/60 group-hover:text-white/80">PROBLEMS SOLVED</div>
                    </motion.div>
                </motion.div>
            </section>


            {/* Marquee strip — brutalist scrolling words with bg image */}
            <section className="group/marquee relative bg-bone text-ink border-y-2 border-ink overflow-hidden py-5">
                {/* Background image with red wash */}
                <div aria-hidden className="absolute inset-0 opacity-25">
                    <Image src="/home/hero.jpg" alt="" fill className="object-cover" sizes="100vw" />
                </div>
                <div aria-hidden className="absolute inset-0 bg-linear-to-r from-ink via-ink/40 to-ink" />
                <div aria-hidden className="absolute inset-0 bg-brutal mix-blend-multiply opacity-20" />

                <MarqueeRow duration={30} className="relative flex gap-12 whitespace-nowrap">
                    {[...marqueeWords, ...marqueeWords, ...marqueeWords, ...marqueeWords].map((w, i) => (
                        <span
                            key={i}
                            className="font-helvetica text-5xl sm:text-7xl font-extrabold uppercase tracking-tighter flex items-center gap-12"
                        >
                            {w}
                            <span className="text-brutal text-6xl leading-none">✦</span>
                        </span>
                    ))}
                </MarqueeRow>
            </section>

            {/* Featured Projects Section */}
            <section ref={projectsRef} className="relative py-24 px-4 sm:px-6 lg:px-8 bg-bone text-ink overflow-hidden">
                {/* Parallax background grid texture */}
                <motion.div
                    style={{ y: projectsBgY }}
                    className="pointer-events-none absolute inset-0 opacity-[0.04]"
                    aria-hidden
                >
                    <div
                        className="w-full h-[140%]"
                        style={{
                            backgroundImage:
                                'repeating-linear-gradient(0deg, transparent 0 39px, currentColor 39px 40px), repeating-linear-gradient(90deg, transparent 0 39px, currentColor 39px 40px)',
                        }}
                    />
                </motion.div>

                {/* Giant horizontal-scrolling number */}
                <motion.div
                    style={{ x: projectsNumX }}
                    className="pointer-events-none absolute -top-8 left-0 whitespace-nowrap font-helvetica text-[18vw] font-black uppercase tracking-tighter text-ink/6 leading-none"
                    aria-hidden
                >
                    /WORK · /WORK · /WORK
                </motion.div>

                <div className="relative max-w-6xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 0.4 }}
                        className="mb-12 flex items-end justify-between gap-6 flex-wrap"
                    >
                        <div>
                            <span className="font-helvetica text-xs tracking-widest uppercase mb-4 block">
                                ★ FEATURED OUTPUT
                            </span>
                            <h2 className="font-helvetica text-5xl sm:text-6xl tracking-tighter uppercase">
                                <WordReveal text="Latest Work" />
                            </h2>
                        </div>
                        <div className="font-mono text-xs tracking-widest text-ink/50 flex items-center gap-2">
                            <span className="w-2 h-2 bg-cyan rounded-full animate-pulse ring-2 ring-cyan/40" />
                            DRAG · SCROLL · TAP
                        </div>
                    </motion.div>

                    <WorkCarousel projects={projects} />

                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 0.4, delay: 0.1 }}
                        className="mt-12 text-center"
                    >
                        <Link href="/project">
                            <Button className="font-helvetica text-base h-auto py-4 px-8 bg-ink text-bone hover:bg-brutal hover:text-white rounded-none tracking-wider transition-colors duration-100">
                                VIEW ALL PROJECTS →
                            </Button>
                        </Link>
                    </motion.div>
                </div>
            </section>

            {/* Services grid — 2x2 brutalist */}
            <section className="relative bg-bone text-ink py-24 px-4 sm:px-6 lg:px-8 border-t-2 border-ink overflow-hidden">
                {/* Animated dot grid */}
                <div
                    aria-hidden
                    className="pointer-events-none absolute inset-0"
                    style={{
                        backgroundImage: 'radial-gradient(circle, currentColor 1px, transparent 1px)',
                        backgroundSize: '24px 24px',
                        opacity: 0.15,
                    }}
                />
                {/* Drifting red spotlight */}
                <motion.div
                    aria-hidden
                    animate={{ x: ['-20%', '120%'], y: ['10%', '60%', '10%'] }}
                    transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
                    className="pointer-events-none absolute top-0 w-[40vw] h-[40vw] rounded-full blur-3xl"
                    style={{ background: 'radial-gradient(circle, rgba(220,38,38,0.35), transparent 70%)' }}
                />
                {/* Diagonal stripe accent */}
                <div
                    aria-hidden
                    className="pointer-events-none absolute -top-12 -right-12 w-96 h-96 opacity-[0.04]"
                    style={{
                        backgroundImage: 'repeating-linear-gradient(45deg, currentColor 0 2px, transparent 2px 14px)',
                    }}
                />

                <div className="relative max-w-6xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4 }}
                        className="mb-12 flex items-end justify-between gap-6 flex-wrap"
                    >
                        <div>
                            <span className="font-helvetica text-xs tracking-widest uppercase mb-4 block text-brutal">
                                ★ WHAT I DO
                            </span>
                            <h2 className="font-helvetica text-5xl sm:text-6xl tracking-tighter uppercase">
                                <WordReveal text="Services" />
                            </h2>
                        </div>
                        <p className="font-mono text-xs text-ink/60 max-w-xs">
                            // four lanes. one person. zero handoff overhead.
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 border-l border-t border-ink/20">
                        {services.map((s, i) => {
                            const panelBg = ['bg-brutal', 'bg-sun', 'bg-cyan', 'bg-brutal'][i];
                            const ghostColor = ['text-brutal/10', 'text-sun/15', 'text-cyan/15', 'text-brutal/10'][i];
                            return (
                                <motion.div
                                    key={s.no}
                                    initial={{ opacity: 0, y: 40, clipPath: 'inset(0 0 100% 0)' }}
                                    whileInView={{ opacity: 1, y: 0, clipPath: 'inset(0 0 0% 0)' }}
                                    viewport={viewportOnce}
                                    transition={{ duration: 0.7, delay: diagonalStagger(i, 2, 0.09), ease: EASE_BRUTAL }}
                                    className="group relative p-8 sm:p-10 border-r border-b border-ink/20 overflow-hidden cursor-pointer"
                                >
                                    {/* Ghost number behind */}
                                    <span
                                        aria-hidden
                                        className={`pointer-events-none absolute -right-4 -bottom-10 font-helvetica text-[12rem] sm:text-[14rem] font-black leading-none tracking-tighter ${ghostColor} transition-transform duration-700 ease-out group-hover:scale-110 group-hover:-translate-y-2 group-hover:text-white/15`}
                                    >
                                        {s.no.replace('/', '')}
                                    </span>
                                    {/* Diagonal panel reveal */}
                                    <div
                                        aria-hidden
                                        className={`absolute inset-0 ${panelBg} transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] origin-bottom-left -skew-y-3 translate-y-full group-hover:translate-y-0 group-hover:skew-y-0`}
                                    />
                                    <div className="relative z-10">
                                        <div className="flex items-start justify-between mb-8">
                                            <span className="font-mono text-xs tracking-widest text-ink/40 group-hover:text-ink transition-colors">
                                                {s.no}
                                            </span>
                                            <motion.span
                                                whileHover={{ rotate: 45, scale: 1.15 }}
                                                transition={{ type: 'spring', stiffness: 320, damping: 14 }}
                                                className="text-2xl inline-block group-hover:rotate-45 transition-transform duration-300"
                                            >
                                                ↗
                                            </motion.span>
                                        </div>
                                        <h3 className="font-helvetica text-3xl sm:text-4xl font-extrabold uppercase tracking-tight mb-4 leading-none transition-transform duration-500 group-hover:-translate-y-1 group-hover:text-ink">
                                            {s.title}
                                        </h3>
                                        <p className="text-sm text-ink/70 group-hover:text-ink/90 mb-6 max-w-sm transition-colors duration-300">{s.desc}</p>
                                        <p className="font-mono text-[10px] tracking-widest text-ink/40 group-hover:text-ink/70 uppercase transition-colors duration-300 inline-block border border-ink/20 group-hover:border-ink/40 px-2 py-1">
                                            {s.tag}
                                        </p>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Parallax About Section */}
            <section ref={aboutRef} className="relative bg-bone text-ink overflow-hidden py-32 px-4 sm:px-6 lg:px-8">
                {/* Subtle background image */}
                <div aria-hidden className="pointer-events-none absolute inset-0 opacity-[0.08]">
                    <Image src="/home/hero.jpg" alt="" fill className="object-cover grayscale" sizes="100vw" />
                </div>
                <motion.div
                    style={{ x: bigTextX }}
                    className="pointer-events-none absolute top-1/2 -translate-y-1/2 left-0 whitespace-nowrap font-helvetica text-[20vw] font-black uppercase tracking-tighter text-ink/5 leading-none"
                >
                    BUILT BY HAND · BUILT BY HAND ·
                </motion.div>

                <div className="relative max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                    <motion.div
                        style={{ y: aboutYSmooth }}
                        initial={{ clipPath: 'inset(100% 0 0 0)' }}
                        whileInView={{ clipPath: 'inset(0% 0 0 0)' }}
                        viewport={viewportOnce}
                        transition={{ duration: 1.1, ease: EASE_BRUTAL }}
                        className="lg:col-span-5 relative aspect-4/5 overflow-hidden bg-ink"
                    >
                        <Image
                            src="/home/hero.jpg"
                            alt="portrait"
                            fill
                            className="object-cover grayscale transition-transform duration-[1.2s] ease-out hover:scale-105"
                            sizes="(max-width: 1024px) 100vw, 40vw"
                        />
                        <div className="absolute inset-0 bg-linear-to-t from-ink/70 via-ink/10 to-transparent" />

                        {/* Corner brackets */}
                        <div aria-hidden className="absolute top-3 left-3 w-6 h-6 border-t-2 border-l-2 border-brutal" />
                        <div aria-hidden className="absolute top-3 right-3 w-6 h-6 border-t-2 border-r-2 border-brutal" />
                        <div aria-hidden className="absolute bottom-3 left-3 w-6 h-6 border-b-2 border-l-2 border-brutal" />
                        <div aria-hidden className="absolute bottom-3 right-3 w-6 h-6 border-b-2 border-r-2 border-brutal" />

                        {/* Top crosshair label */}
                        <div className="absolute top-5 left-5 right-5 flex items-center justify-between z-10 font-mono text-[10px] tracking-widest text-bone/70 uppercase">
                            <span>FRAME · 01</span>
                            <span>50.2°N / 0.1°W</span>
                        </div>

                        <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between z-10">
                            <span className="font-mono text-[10px] tracking-widest text-bone uppercase">
                                /portrait · 2026
                            </span>
                            <motion.span
                                animate={{ scale: [1, 1.06, 1] }}
                                transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
                                className="bg-sun text-ink px-2 py-0.5 font-mono text-[10px] tracking-widest font-bold flex items-center gap-1.5"
                            >
                                <span className="w-1.5 h-1.5 bg-ink rounded-full" />
                                AVAILABLE
                            </motion.span>
                        </div>
                    </motion.div>

                    <div className="lg:col-span-7">
                        <motion.span
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="font-helvetica text-xs tracking-widest uppercase mb-6 block"
                        >
                            ★ ABOUT THE OPERATOR
                        </motion.span>
                        <h2 className="font-helvetica text-4xl sm:text-5xl lg:text-6xl uppercase tracking-tighter font-extrabold leading-[0.95] mb-8">
                            <WordReveal text="One head." className="block" />
                            <span className="block">
                                <WordReveal text="One " delay={0.1} />
                                <span className="bg-ink text-bone px-2 inline-block">
                                    <WordReveal text="repo." delay={0.18} />
                                </span>
                            </span>
                            <span className="block">
                                <WordReveal text="Zero " delay={0.26} />
                                <span className="text-brutal">
                                    <WordReveal text="handoff " delay={0.32} />
                                </span>
                                <WordReveal text="tax." delay={0.4} />
                            </span>
                        </h2>
                        <motion.p
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                            className="text-lg leading-relaxed mb-6 max-w-xl"
                        >
                            I&apos;m Fendry — full-stack engineer based in Indonesia. I design, build,
                            and ship the whole product. No design-to-dev throwovers, no Jira purgatory.
                        </motion.p>
                        <motion.p
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.3 }}
                            className="font-mono text-sm text-ink/60 max-w-xl mb-8"
                        >
                            // currently: building weird internal tools, refactoring auth flows,
                            // and writing about what I learn between commits.
                        </motion.p>

                        <div className="grid grid-cols-3 border-t-2 border-ink">
                            {[
                                { k: 'BASED', v: 'JKT/REMOTE' },
                                { k: 'STATUS', v: 'AVAILABLE Q3' },
                                { k: 'RESPONSE', v: '< 24H' },
                            ].map((x) => (
                                <div key={x.k} className="py-4 border-r border-ink last:border-r-0">
                                    <div className="font-mono text-[10px] tracking-widest text-ink/50 mb-1">{x.k}</div>
                                    <div className="font-helvetica text-sm font-bold tracking-wide">{x.v}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Tech Ticker — infinite scroll */}
            <section className="bg-bone text-ink border-y-2 border-ink py-6 overflow-hidden">
                <MarqueeRow duration={40} className="flex gap-8 whitespace-nowrap">
                    {[...stackTicker, ...stackTicker, ...stackTicker].map((t, i) => {
                        const variants = [
                            { accent: 'text-brutal', hover: 'hover:text-brutal' },
                            { accent: 'text-sun', hover: 'hover:text-sun' },
                            { accent: 'text-cyan', hover: 'hover:text-cyan' },
                        ];
                        const v = variants[i % 3];
                        return (
                            <span key={i} className={`font-mono text-sm tracking-widest uppercase flex items-center gap-8 ${v.hover} transition-colors duration-200`}>
                                <span className={v.accent}>[</span>
                                {t}
                                <span className={v.accent}>]</span>
                            </span>
                        );
                    })}
                </MarqueeRow>
            </section>

            {/* Testimonials */}
            <section className="relative bg-bone text-ink py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
                {/* Background image with blend */}
                <div aria-hidden className="pointer-events-none absolute inset-0 opacity-10">
                    <Image
                        src="/home/hero.jpg"
                        alt=""
                        fill
                        className="object-cover grayscale"
                        sizes="100vw"
                    />
                    <div className="absolute inset-0 bg-bone/60 mix-blend-lighten" />
                </div>
                {/* Floating giant quote mark */}
                <motion.div
                    aria-hidden
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    animate={{ y: [0, -20, 0] }}
                    transition={{ y: { duration: 6, repeat: Infinity, ease: 'easeInOut' } }}
                    className="pointer-events-none absolute -top-10 right-10 font-helvetica text-[28rem] leading-none text-brutal/10 font-black select-none"
                >
                    &ldquo;
                </motion.div>

                <div className="relative max-w-6xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="mb-12"
                    >
                        <span className="font-helvetica text-xs tracking-widest uppercase mb-4 block">
                            ★ WORD ON THE STREET
                        </span>
                        <h2 className="font-helvetica text-5xl sm:text-6xl tracking-tighter uppercase">
                            <WordReveal text="Receipts" />
                        </h2>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border-l-2 border-t-2 border-ink">
                        {testimonials.map((t, i) => {
                            const accent = ['bg-brutal', 'bg-sun', 'bg-cyan'][i % 3];
                            const quoteColor = ['text-brutal', 'text-sun', 'text-cyan'][i % 3];
                            const offset = ['md:translate-y-0', 'md:translate-y-4', 'md:-translate-y-2'][i % 3];
                            return (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 40, clipPath: 'inset(0 0 100% 0)' }}
                                    whileInView={{ opacity: 1, y: 0, clipPath: 'inset(0 0 0% 0)' }}
                                    viewport={viewportOnce}
                                    transition={{ duration: 0.7, delay: i * 0.12, ease: EASE_BRUTAL }}
                                    whileHover={{ y: -8 }}
                                    className={`relative p-8 border-r-2 border-b-2 border-ink group hover:bg-ink hover:text-bone transition-colors duration-200 ${offset}`}
                                >
                                    {/* Top accent bar with rotating color */}
                                    <motion.div
                                        aria-hidden
                                        className={`absolute -top-1 left-0 h-1 ${accent} origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out`}
                                        style={{ width: '100%' }}
                                    />
                                    {/* Index marker */}
                                    <div className="flex items-start justify-between mb-2">
                                        <span className="font-mono text-[10px] tracking-widest opacity-50">
                                            /R0{i + 1}
                                        </span>
                                        <motion.span
                                            aria-hidden
                                            initial={{ scale: 0 }}
                                            whileInView={{ scale: 1 }}
                                            viewport={viewportOnce}
                                            transition={{ delay: 0.4 + i * 0.12, type: 'spring', stiffness: 280, damping: 14 }}
                                            className={`w-2 h-2 ${accent}`}
                                        />
                                    </div>
                                    <motion.div
                                        initial={{ scale: 0, rotate: -20 }}
                                        whileInView={{ scale: 1, rotate: 0 }}
                                        viewport={viewportOnce}
                                        transition={{ delay: 0.25 + i * 0.12, type: 'spring', stiffness: 220, damping: 14 }}
                                        className={`font-helvetica text-7xl leading-none ${quoteColor} mb-4 transition-transform duration-300 group-hover:-translate-y-1 group-hover:scale-110 origin-bottom-left inline-block`}
                                    >
                                        &ldquo;
                                    </motion.div>
                                    <p className="text-lg leading-snug mb-8 font-helvetica tracking-tight">
                                        {t.quote}
                                    </p>
                                    <div className="border-t-2 border-current pt-4">
                                        <div className="font-helvetica font-bold text-sm tracking-widest uppercase">{t.name}</div>
                                        <div className="font-mono text-[10px] tracking-widest opacity-60 mt-1">{t.role}</div>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Latest Articles Section */}
            <section ref={articlesRef} className="relative py-24 px-4 sm:px-6 lg:px-8 bg-bone text-ink overflow-hidden">
                {/* Parallax giant text bg */}
                <motion.div
                    style={{ y: articlesBgY }}
                    className="pointer-events-none absolute inset-0 flex items-center justify-end pr-4"
                    aria-hidden
                >
                    <span className="font-helvetica text-[22vw] font-black uppercase tracking-tighter text-ink/5 leading-none rotate-90 sm:rotate-0">
                        JOURNAL
                    </span>
                </motion.div>

                <div className="relative max-w-6xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 0.4 }}
                        className="mb-12"
                    >
                        <span className="font-helvetica text-xs tracking-widest uppercase mb-4 block">
                            ★ LATEST WRITING
                        </span>
                        <h2 className="font-helvetica text-5xl sm:text-6xl tracking-tighter uppercase">
                            <WordReveal text="Journal" />
                        </h2>
                    </motion.div>

                    <div className="space-y-0 border-t-2 border-ink">
                        {articles.map((article, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: '-50px' }}
                                transition={{ duration: 0.4, delay: idx * 0.1 }}
                                className="group relative border-b-2 border-ink overflow-hidden cursor-pointer"
                            >
                                {/* Sliding red panel */}
                                <div className="absolute inset-0 bg-brutal -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out" />

                                <div className="relative flex gap-6 items-start p-6 sm:p-10 group-hover:text-white transition-colors duration-300">
                                    <div className="font-helvetica text-xs tracking-widest uppercase shrink-0 mt-2 opacity-60">
                                        [A0{idx + 1}]
                                    </div>
                                    <div className="flex-1">
                                        <div className="font-mono text-xs uppercase tracking-widest mb-3 opacity-60">
                                            {article.date} · {article.category} · {article.readingTime}
                                        </div>
                                        <h3 className="font-helvetica text-3xl sm:text-5xl tracking-tighter uppercase leading-[0.95] mb-3 font-extrabold transition-transform duration-300 group-hover:translate-x-2">
                                            {article.title}
                                        </h3>
                                        <p className="text-sm opacity-80 max-w-2xl">{article.excerpt}</p>
                                    </div>
                                    <div className="text-3xl font-helvetica shrink-0 transition-transform duration-300 group-hover:translate-x-2 group-hover:rotate-12">
                                        →
                                    </div>
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
                            <Button className="font-helvetica text-base h-auto py-4 px-8 bg-ink text-bone hover:bg-brutal hover:text-white rounded-none tracking-wider transition-colors duration-100">
                                READ ALL ARTICLES →
                            </Button>
                        </Link>
                    </motion.div>
                </div>
            </section>

            {/* Final CTA */}
            <section className="relative bg-bone text-ink py-32 px-4 sm:px-6 lg:px-8 overflow-hidden border-t-2 border-ink">
                {/* Animated mesh blobs */}
                <motion.div
                    aria-hidden
                    animate={{ x: [0, 200, 0], y: [0, -100, 0], scale: [1, 1.2, 1] }}
                    transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
                    className="pointer-events-none absolute top-1/4 left-1/4 w-[35vw] h-[35vw] rounded-full blur-3xl"
                    style={{ background: 'radial-gradient(circle, rgba(220,38,38,0.35), transparent 70%)' }}
                />
                <motion.div
                    aria-hidden
                    animate={{ x: [0, -150, 0], y: [0, 100, 0], scale: [1, 0.8, 1] }}
                    transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
                    className="pointer-events-none absolute bottom-0 right-1/4 w-[30vw] h-[30vw] rounded-full blur-3xl"
                    style={{ background: 'radial-gradient(circle, rgba(245,245,220,0.15), transparent 70%)' }}
                />
                {/* Crosshair grid */}
                <div
                    aria-hidden
                    className="pointer-events-none absolute inset-0 opacity-[0.07]"
                    style={{
                        backgroundImage:
                            'linear-gradient(currentColor 1px, transparent 1px), linear-gradient(90deg, currentColor 1px, transparent 1px)',
                        backgroundSize: '80px 80px',
                    }}
                />
                {/* Corner brackets */}
                <div aria-hidden className="pointer-events-none absolute top-8 left-8 w-12 h-12 border-t-2 border-l-2 border-brutal" />
                <div aria-hidden className="pointer-events-none absolute top-8 right-8 w-12 h-12 border-t-2 border-r-2 border-brutal" />
                <div aria-hidden className="pointer-events-none absolute bottom-8 left-8 w-12 h-12 border-b-2 border-l-2 border-brutal" />
                <div aria-hidden className="pointer-events-none absolute bottom-8 right-8 w-12 h-12 border-b-2 border-r-2 border-brutal" />

                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="relative max-w-5xl mx-auto text-center"
                >
                    <span className="font-mono text-xs tracking-widest text-brutal uppercase mb-6 block">
                        // END OF SCROLL
                    </span>
                    <h2 className="font-helvetica text-5xl sm:text-7xl lg:text-8xl font-extrabold uppercase tracking-tighter leading-[0.9] mb-10">
                        <WordReveal text="Got a thing" className="block" />
                        <span className="block">
                            <WordReveal text="to " delay={0.18} />
                            <span className="text-brutal italic">
                                <WordReveal text="build?" delay={0.24} />
                            </span>
                        </span>
                    </h2>
                    <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={viewportOnce}
                        transition={{ duration: 0.6, delay: 0.5, ease: EASE_BRUTAL }}
                        className="text-ink/70 text-lg mb-10 max-w-xl mx-auto"
                    >
                        Pitch the idea. I&apos;ll tell you if it&apos;s shippable, scopeable, or sane.
                        Usually two out of three.
                    </motion.p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                        <Magnetic strength={0.25}>
                            <Link href="/contact">
                                <Button className="font-helvetica text-base h-auto py-5 px-10 bg-brutal text-white hover:bg-bone hover:text-ink rounded-none tracking-wider transition-colors duration-100">
                                    START A PROJECT →
                                </Button>
                            </Link>
                        </Magnetic>
                        <Link href="mailto:ftonrate91@gmail.com" className="font-mono text-sm tracking-widest text-ink/60 hover:text-brutal underline underline-offset-4">
                            FTONRATE91@GMAIL.COM
                        </Link>
                    </div>
                </motion.div>
            </section>
        </main>
    );
}
