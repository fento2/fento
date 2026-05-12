import { cn } from '@/lib/utils';
import { type ReactNode } from 'react';

interface HeroSlideShellProps {
  /** Two-digit slide number, e.g. "01", "02". Shown in both label and marker. */
  slideNumber: string;
  /** Vertical label text in the top-right corner, e.g. "INTRO", "JOURNAL". */
  label: string;
  /** Marker text in the bottom-left corner, e.g. "INDEX.HTML", "NOTES.LOG". */
  marker: string;
  /** Optional gradient overlay classes. Defaults to top→bottom dark. Pass empty to disable. */
  overlayClassName?: string;
  /** Background layer (image/video). Rendered behind the overlay. */
  background: ReactNode;
  /** Foreground content (headline, button, etc). */
  children: ReactNode;
}


export function HeroSlideShell({
  slideNumber,
  label,
  marker,
  overlayClassName = 'absolute inset-0 z-1 bg-linear-to-b from-black/90 via-black/50 to-black/10 pointer-events-none',
  background,
  children,
}: HeroSlideShellProps) {
  return (
    <>
      {background}

      {overlayClassName ? <div className={cn(overlayClassName)} /> : null}

      <div className="absolute top-20 right-3 sm:right-10 z-10">
        <span className="flex justify-center items-center gap-4 font-mono text-[9px] sm:text-[10px] tracking-[0.3em] sm:tracking-[0.4em] text-white/70 [writing-mode:vertical-rl] rotate-180">
          <div className="bg-brutal w-2 h-2 rounded-full" /> SLIDE_{slideNumber} / {label}
        </span>
      </div>

      <div className="absolute bottom-4 left-3 sm:bottom-8 sm:left-10 z-10">
        <div className="font-mono text-[9px] sm:text-[10px] tracking-widest text-white/60">
          <span className="text-brutal">[</span>
          {slideNumber}
          <span className="text-brutal">]</span> — {marker}
        </div>
      </div>

      {children}
    </>
  );
}
