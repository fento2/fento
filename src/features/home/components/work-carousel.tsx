'use client';

import useEmblaCarousel from 'embla-carousel-react';
import { useCallback, useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { cn } from '@/lib/utils';

export interface WorkProject {
    number: string;
    title: string;
    tech: string;
    href?: string;
    /** Path to background image under /public */
    bg?: string;
    /** Path to background video under /public — takes priority over bg */
    bgVideo?: string;
}

interface WorkCarouselProps {
    projects: WorkProject[];
}

export function WorkCarousel({ projects }: WorkCarouselProps) {
    const [emblaRef, emblaApi] = useEmblaCarousel({
        loop: false,
        align: 'start',
        dragFree: true,
    });

    const [selected, setSelected] = useState(0);
    const [canScrollPrev, setCanScrollPrev] = useState(false);
    const [canScrollNext, setCanScrollNext] = useState(true);

    const onSelect = useCallback(() => {
        if (!emblaApi) return;
        setSelected(emblaApi.selectedScrollSnap());
        setCanScrollPrev(emblaApi.canScrollPrev());
        setCanScrollNext(emblaApi.canScrollNext());
    }, [emblaApi]);

    useEffect(() => {
        if (!emblaApi) return;
        emblaApi.on('select', onSelect);
        onSelect();
        return () => { emblaApi.off('select', onSelect); };
    }, [emblaApi, onSelect]);

    return (
        <div className="relative">
            {/* Embla viewport */}
            <div ref={emblaRef} className="overflow-hidden -mx-4 sm:-mx-6 lg:-mx-8">
                <div className="flex gap-4 px-4 sm:px-6 lg:px-8">
                    {projects.map((project, idx) => {
                        return project.href ? (
                            <Link
                                key={idx}
                                href={project.href}
                                className={cn(
                                    'relative flex-[0_0_80%] sm:flex-[0_0_55%] lg:flex-[0_0_38%]',
                                    'aspect-3/4 overflow-hidden border-4 border-ink group cursor-pointer',
                                    'select-none'
                                )}
                            >
                                {/* Background */}
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

                                {/* Overlay */}
                                <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/30 to-black/10 z-10" />

                                {/* Number badge */}
                                <div className="absolute top-4 left-4 z-20 bg-brutal px-2 py-0.5 font-mono text-xs text-white tracking-widest">
                                    {project.number}
                                </div>

                                {/* Bottom content */}
                                <div className="absolute bottom-0 left-0 right-0 z-20 p-5 sm:p-6">
                                    <p className="font-mono text-[10px] tracking-widest text-white/60 uppercase mb-2">
                                        {project.tech}
                                    </p>
                                    <h3 className="font-helvetica text-2xl sm:text-3xl font-extrabold uppercase leading-none text-white tracking-tight mb-4">
                                        {project.title}
                                    </h3>
                                    <div className="flex items-center gap-2 text-brutal font-helvetica text-sm tracking-wider font-bold uppercase">
                                        VIEW PROJECT
                                        <span className="text-xl leading-none group-hover:translate-x-1 transition-transform duration-150">→</span>
                                    </div>
                                </div>
                            </Link>
                        ) : (
                            <div
                                key={idx}
                                className={cn(
                                    'relative flex-[0_0_80%] sm:flex-[0_0_55%] lg:flex-[0_0_38%]',
                                    'aspect-3/4 overflow-hidden border-4 border-ink group cursor-pointer',
                                    'select-none'
                                )}
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
                                <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/30 to-black/10 z-10" />
                                <div className="absolute top-4 left-4 z-20 bg-brutal px-2 py-0.5 font-mono text-xs text-white tracking-widest">
                                    {project.number}
                                </div>
                                <div className="absolute bottom-0 left-0 right-0 z-20 p-5 sm:p-6">
                                    <p className="font-mono text-[10px] tracking-widest text-white/60 uppercase mb-2">
                                        {project.tech}
                                    </p>
                                    <h3 className="font-helvetica text-2xl sm:text-3xl font-extrabold uppercase leading-none text-white tracking-tight mb-4">
                                        {project.title}
                                    </h3>
                                    <div className="flex items-center gap-2 text-brutal font-helvetica text-sm tracking-wider font-bold uppercase">
                                        VIEW PROJECT
                                        <span className="text-xl leading-none group-hover:translate-x-1 transition-transform duration-150">→</span>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Controls */}
            <div className="flex items-center justify-between mt-8">
                {/* Dots */}
                <div className="flex gap-2">
                    {projects.map((_, idx) => (
                        <button
                            key={idx}
                            onClick={() => emblaApi?.scrollTo(idx)}
                            className={cn(
                                'h-1 transition-all duration-300',
                                idx === selected ? 'w-8 bg-ink' : 'w-4 bg-ink/30'
                            )}
                            aria-label={`Go to slide ${idx + 1}`}
                        />
                    ))}
                </div>

                {/* Arrows */}
                <div className="flex gap-2">
                    <button
                        onClick={() => emblaApi?.scrollPrev()}
                        disabled={!canScrollPrev}
                        className="w-10 h-10 border-2 border-ink flex items-center justify-center font-helvetica text-lg hover:bg-ink hover:text-bone transition-colors duration-100 disabled:opacity-20 disabled:cursor-not-allowed"
                        aria-label="Previous"
                    >
                        ←
                    </button>
                    <button
                        onClick={() => emblaApi?.scrollNext()}
                        disabled={!canScrollNext}
                        className="w-10 h-10 border-2 border-ink flex items-center justify-center font-helvetica text-lg hover:bg-ink hover:text-bone transition-colors duration-100 disabled:opacity-20 disabled:cursor-not-allowed"
                        aria-label="Next"
                    >
                        →
                    </button>
                </div>
            </div>
        </div>
    );
}
