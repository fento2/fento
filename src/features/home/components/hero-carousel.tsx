'use client';

import { useEffect, type ReactNode } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import Fade from 'embla-carousel-fade';

interface HeroCarouselProps {
  /** Each entry is rendered as-is inside an Embla slide. Write any JSX you want. */
  slides: ReactNode[];
  /** Autoplay delay in ms. Set to 0 to disable. */
  autoplayDelay?: number;
  className?: string;
}

export function HeroCarousel({
  slides,
  autoplayDelay = 6000,
  className = '',
}: HeroCarouselProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, duration: 40 },
    [
      Fade(),
      ...(autoplayDelay > 0
        ? [Autoplay({ delay: autoplayDelay, stopOnInteraction: true })]
        : []),
    ]
  );

  // If a slide contains a <video>, pause autoplay while it plays and advance on `ended`.
  useEffect(() => {
    if (!emblaApi) return;

    const handleSelect = () => {
      const idx = emblaApi.selectedScrollSnap();
      const root = emblaApi.rootNode();
      const autoplay = emblaApi.plugins().autoplay;

      // Reset every video.
      root.querySelectorAll('video').forEach((v) => {
        v.pause();
        v.currentTime = 0;
        v.onended = null;
      });

      const activeSlide = root.querySelector(
        `[data-slide-index="${idx}"]`
      ) as HTMLElement | null;
      const activeVideo = activeSlide?.querySelector('video') as HTMLVideoElement | null;

      if (activeVideo) {
        autoplay?.stop();
        activeVideo.onended = () => emblaApi.scrollNext();
        activeVideo.play().catch(() => { });
      } else {
        autoplay?.play();
      }
    };

    emblaApi.on('select', handleSelect);
    handleSelect();

    return () => {
      emblaApi.off('select', handleSelect);
    };
  }, [emblaApi, slides]);

  return (
    <div ref={emblaRef} className={`overflow-hidden bg-ink ${className}`}>
      <div className="flex h-full">
        {slides.map((slide, idx) => (
          <div
            key={idx}
            data-slide-index={idx}
            className="relative flex-[0_0_100%] min-w-0 flex flex-col bg-ink"
          >
            {slide}
          </div>
        ))}

      </div>
    </div>
  );
}
