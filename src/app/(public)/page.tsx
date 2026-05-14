import { HomePage } from '@/features/home/page/homePage';
import { getAllArticles } from '@/lib/articles';
import type { WorkProject } from '@/features/home/components/work-carousel';

const projects: WorkProject[] = [
  {
    number: '01',
    title: 'Indonesia Region API',
    tech: 'NODE · EXPRESS · PRISMA · POSTGRES',
    href: '/project',
    bg: '/home/hero.jpg',
  },
  {
    number: '02',
    title: 'Hotel Site Redesign',
    tech: 'NEXT · REACT · TAILWIND',
    href: '/project',
    bgVideo: '/home/hero.mp4',
  },
  {
    number: '03',
    title: 'Indonesia Region API',
    tech: 'NODE · EXPRESS · PRISMA · POSTGRES',
    href: '/project',
    bg: '/home/hero.jpg',
  },
  {
    number: '04',
    title: 'Hotel Site Redesign',
    tech: 'NEXT · REACT · TAILWIND',
    href: '/project',
    bgVideo: '/home/hero.mp4',
  },
  {
    number: '01',
    title: 'Indonesia Region API',
    tech: 'NODE · EXPRESS · PRISMA · POSTGRES',
    href: '/project',
    bg: '/home/hero.jpg',
  },
  {
    number: '02',
    title: 'Hotel Site Redesign',
    tech: 'NEXT · REACT · TAILWIND',
    href: '/project',
    bgVideo: '/home/hero.mp4',
  },
  {
    number: '03',
    title: 'Indonesia Region API',
    tech: 'NODE · EXPRESS · PRISMA · POSTGRES',
    href: '/project',
    bg: '/home/hero.jpg',
  },
  {
    number: '04',
    title: 'Hotel Site Redesign',
    tech: 'NEXT · REACT · TAILWIND',
    href: '/project',
    bgVideo: '/home/hero.mp4',
  },
  {
    number: '01',
    title: 'Indonesia Region API',
    tech: 'NODE · EXPRESS · PRISMA · POSTGRES',
    href: '/project',
    bg: '/home/hero.jpg',
  },
  {
    number: '02',
    title: 'Hotel Site Redesign',
    tech: 'NEXT · REACT · TAILWIND',
    href: '/project',
    bgVideo: '/home/hero.mp4',
  },
  {
    number: '03',
    title: 'Indonesia Region API',
    tech: 'NODE · EXPRESS · PRISMA · POSTGRES',
    href: '/project',
    bg: '/home/hero.jpg',
  },
  {
    number: '04',
    title: 'Hotel Site Redesign',
    tech: 'NEXT · REACT · TAILWIND',
    href: '/project',
    bgVideo: '/home/hero.mp4',
  },
];

export default function Home() {
  const articles = getAllArticles().slice(0, 2);

  return <HomePage projects={projects} articles={articles} />;
}