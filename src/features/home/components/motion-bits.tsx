'use client';

import { motion, useAnimationFrame, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useRef, useState, type ReactNode } from 'react';
import { EASE_BRUTAL } from '@/features/home/lib/motion';

/** Splits children string into per-word spans with stagger reveal. */
export function WordReveal({
    text,
    className = '',
    delay = 0,
    stagger = 0.06,
}: {
    text: string;
    className?: string;
    delay?: number;
    stagger?: number;
}) {
    const words = text.split(' ');
    return (
        <motion.span
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-60px' }}
            transition={{ staggerChildren: stagger, delayChildren: delay }}
            className={className}
        >
            {words.map((w, i) => (
                <span key={i} className="inline-block overflow-hidden align-baseline mr-[0.25em]">
                    <motion.span
                        variants={{
                            hidden: { y: '110%', opacity: 0 },
                            show: { y: '0%', opacity: 1 },
                        }}
                        transition={{ duration: 0.7, ease: EASE_BRUTAL }}
                        className="inline-block"
                    >
                        {w}
                    </motion.span>
                </span>
            ))}
        </motion.span>
    );
}

/** Magnetic hover wrapper — child element drifts toward cursor. */
export function Magnetic({
    children,
    strength = 0.35,
    className = '',
}: {
    children: ReactNode;
    strength?: number;
    className?: string;
}) {
    const ref = useRef<HTMLDivElement>(null);
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const sx = useSpring(x, { stiffness: 220, damping: 18, mass: 0.4 });
    const sy = useSpring(y, { stiffness: 220, damping: 18, mass: 0.4 });

    const handle = (e: React.MouseEvent) => {
        const el = ref.current;
        if (!el) return;
        const r = el.getBoundingClientRect();
        x.set((e.clientX - (r.left + r.width / 2)) * strength);
        y.set((e.clientY - (r.top + r.height / 2)) * strength);
    };

    const reset = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <motion.div
            ref={ref}
            onMouseMove={handle}
            onMouseLeave={reset}
            style={{ x: sx, y: sy }}
            className={className}
        >
            {children}
        </motion.div>
    );
}

/**
 * Infinite marquee row using a self-driven motion value (pause-on-hover).
 * Content should already be duplicated by the caller (e.g. `[...items, ...items]`).
 */
export function MarqueeRow({
    children,
    duration = 30,
    className = '',
}: {
    children: ReactNode;
    duration?: number;
    className?: string;
}) {
    const pct = useMotionValue(0);
    const [paused, setPaused] = useState(false);

    useAnimationFrame((_, delta) => {
        if (paused) return;
        const next = pct.get() - (delta / 1000) * (50 / duration);
        pct.set(next <= -50 ? 0 : next);
    });

    const x = useTransform(pct, (v) => `${v}%`);

    return (
        <motion.div
            style={{ x }}
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
            className={className}
        >
            {children}
        </motion.div>
    );
}
