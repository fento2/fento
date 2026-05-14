'use client';

import useEmblaCarousel from 'embla-carousel-react';
import { useCallback, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { cn } from '@/lib/utils';
import { EASE_BRUTAL } from '@/features/home/lib/motion';

export interface WorkProject {
    number: string;
    title: string;
    tech: string;
    href?: string;
    bg?: string;
    bgVideo?: string;
}

interface WorkCarouselProps {
    projects: WorkProject[];
}

function WorkCard({ project, index }: { project: WorkProject; index: number }) {
    const ref = useRef<HTMLDivElement>(null);

    // Tilt on hover
    const rx = useMotionValue(0);
    const ry = useMotionValue(0);
    const sRx = useSpring(rx, { stiffness: 220, damping: 18, mass: 0.4 });
    const sRy = useSpring(ry, { stiffness: 220, damping: 18, mass: 0.4 });

    // Cursor-tracked image parallax
    const mx = useMotionValue(0);
    const my = useMotionValue(0);
    const sMx = useSpring(mx, { stiffness: 120, damping: 20 });
    const sMy = useSpring(my, { stiffness: 120, damping: 20 });
    const imgX = useTransform(sMx, (v) => v * 12);
    const imgY = useTransform(sMy, (v) => v * 12);

    const handleMove = (e: React.MouseEvent) => {
        const el = ref.current;
        if (!el) return;
        const r = el.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width - 0.5;
        const py = (e.clientY - r.top) / r.height - 0.5;
        rx.set(-py * 6);
        ry.set(px * 6);
        mx.set(px);
        my.set(py);
    };

    const handleLeave = () => {
        rx.set(0);
        ry.set(0);
        mx.set(0);
        my.set(0);
    };

    const inner = (
        <>
            {/* Background with parallax */}
            <motion.div
                style={{ x: imgX, y: imgY, scale: 1.08 }}
                className="absolute inset-0 will-change-transform"
            >
                {project.bgVideo ? (
                    <video
                        src={project.bgVideo}
                        autoPlay
                        muted
                        loop
                        playsInline
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                ) : project.bg ? (
                    <Image
                        src={project.bg}
                        alt={project.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                        sizes="(max-width: 640px) 80vw, (max-width: 1024px) 55vw, 38vw"
                    />
                ) : (
                    <div className="absolute inset-0 bg-ink" />
                )}
            </motion.div>

            <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/30 to-black/10 z-10" />

            {/* Sweep gloss on hover */}
            <div
                aria-hidden
                className="pointer-events-none absolute inset-0 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                    background:
                        'linear-gradient(115deg, transparent 35%, rgba(255,255,255,0.15) 50%, transparent 65%)',
                    mixBlendMode: 'overlay',
                }}
            />

            {/* Number badge */}
            <motion.div
                initial={{ y: -8, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 + index * 0.04, ease: EASE_BRUTAL }}
                className="absolute top-4 left-4 z-20 bg-brutal px-2 py-0.5 font-mono text-xs text-white tracking-widest"
            >
                {project.number}
            </motion.div>

            {/* Bottom content */}
            <div className="absolute bottom-0 left-0 right-0 z-20 p-5 sm:p-6">
                <p className="font-mono text-[10px] tracking-widest text-white/60 uppercase mb-2 transition-transform duration-500 ease-out group-hover:-translate-y-1">
                    {project.tech}
                </p>
                <h3 className="font-helvetica text-2xl sm:text-3xl font-extrabold uppercase leading-none text-white tracking-tight mb-4 transition-transform duration-500 ease-out group-hover:-translate-y-1">
                    {project.title}
                </h3>
                <div className="flex items-center gap-2 text-brutal font-helvetica text-sm tracking-wider font-bold uppercase">
                    <span className="relative">
                        VIEW PROJECT
                        <span className="absolute left-0 -bottom-0.5 h-px w-full bg-brutal origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out" />
                    </span>
                    <span className="text-xl leading-none transition-transform duration-300 group-hover:translate-x-2">→</span>
                </div>
            </div>
        </>
    );

    const sharedCls = cn(
        'relative flex-[0_0_80%] sm:flex-[0_0_55%] lg:flex-[0_0_20%]',
        'aspect-3/4 overflow-hidden group cursor-pointer select-none',
        '[transform-style:preserve-3d]'
    );

    const motionStyle = { rotateX: sRx, rotateY: sRy, transformPerspective: 1000 };

    // Entry reveal — clipPath + slight rise, staggered by index
    const entry = {
        initial: { opacity: 0, y: 24, clipPath: 'inset(0 0 100% 0)' },
        whileInView: { opacity: 1, y: 0, clipPath: 'inset(0 0 0% 0)' },
        viewport: { once: true, margin: '-40px' },
        transition: { duration: 0.7, ease: EASE_BRUTAL, delay: index * 0.06 },
    } as const;

    return project.href ? (
        <motion.div
            ref={ref}
            onMouseMove={handleMove}
            onMouseLeave={handleLeave}
            style={motionStyle}
            {...entry}
            className={sharedCls}
        >
            <Link href={project.href} className="absolute inset-0 block">
                {inner}
            </Link>
        </motion.div>
    ) : (
        <motion.div
            ref={ref}
            onMouseMove={handleMove}
            onMouseLeave={handleLeave}
            style={motionStyle}
            {...entry}
            className={cn(sharedCls, 'border-4 border-ink')}
        >
            {inner}
        </motion.div>
    );
}

export function WorkCarousel({ projects }: WorkCarouselProps) {
    const [emblaRef, emblaApi] = useEmblaCarousel({
        loop: false,
        align: 'start',
        dragFree: true,
        containScroll: 'trimSnaps',
    });

    const [scrollProgress, setScrollProgress] = useState(0);

    const onScroll = useCallback(() => {
        if (!emblaApi) return;
        const progress = emblaApi.scrollProgress();
        setScrollProgress(Math.max(0, Math.min(1, progress)));
    }, [emblaApi]);

    useEffect(() => {
        if (!emblaApi) return;
        emblaApi.on('scroll', onScroll);
        emblaApi.on('reInit', onScroll);
        onScroll();
        return () => {
            emblaApi.off('scroll', onScroll);
            emblaApi.off('reInit', onScroll);
        };
    }, [emblaApi, onScroll]);

    return (
        <div className="relative">
            <div
                ref={emblaRef}
                style={{ marginRight: 'calc(50% - 50vw)', clipPath: 'inset(0 -100vw 0 0)' }}
            >
                <div className="flex gap-4">
                    {projects.map((project, idx) => (
                        <WorkCard key={idx} project={project} index={idx} />
                    ))}
                </div>
            </div>

            {/* Pagination scrollbar */}
            <div className="relative mt-8 h-px bg-ink/25 w-full overflow-hidden">
                <motion.div
                    className="absolute top-0 left-0 h-full bg-ink"
                    style={{
                        width: `${100 / projects.length}%`,
                        transform: `translateX(${scrollProgress * (projects.length - 1) * 100}%)`,
                    }}
                    transition={{ duration: 0.15, ease: 'linear' }}
                />
                <motion.div
                    aria-hidden
                    className="absolute top-0 left-0 h-full bg-brutal opacity-60 blur-[2px]"
                    style={{
                        width: `${100 / projects.length}%`,
                        transform: `translateX(${scrollProgress * (projects.length - 1) * 100}%)`,
                    }}
                />
            </div>
        </div>
    );
}
