import type { Variants, Transition } from 'framer-motion';

export const EASE_BRUTAL: [number, number, number, number] = [0.22, 1, 0.36, 1];
export const EASE_SHARP: [number, number, number, number] = [0.7, 0, 0.2, 1];
export const EASE_OUT_EXPO: [number, number, number, number] = [0.16, 1, 0.3, 1];

export const T_FAST: Transition = { duration: 0.45, ease: EASE_BRUTAL };
export const T_BASE: Transition = { duration: 0.7, ease: EASE_BRUTAL };
export const T_SLOW: Transition = { duration: 1.1, ease: EASE_BRUTAL };

export const fadeUp: Variants = {
    hidden: { opacity: 0, y: 28 },
    show: { opacity: 1, y: 0, transition: T_BASE },
};

export const fadeRight: Variants = {
    hidden: { opacity: 0, x: -24 },
    show: { opacity: 1, x: 0, transition: T_BASE },
};

export const clipReveal: Variants = {
    hidden: { opacity: 0, clipPath: 'inset(0 100% 0 0)' },
    show: {
        opacity: 1,
        clipPath: 'inset(0 0% 0 0)',
        transition: { duration: 0.9, ease: EASE_BRUTAL },
    },
};

export const staggerParent = (stagger = 0.08, delay = 0): Variants => ({
    hidden: {},
    show: {
        transition: { staggerChildren: stagger, delayChildren: delay },
    },
});

export const diagonalStagger = (i: number, cols = 2, base = 0.07): number =>
    (Math.floor(i / cols) + (i % cols)) * base;

export const viewportOnce = { once: true, margin: '-60px' } as const;
