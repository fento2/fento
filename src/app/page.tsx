import { getAllArticles } from '@/lib/articles';
import { HomeClient } from './home-client';

const projects = [
  {
    number: '01',
    title: 'Indonesia Region API',
    tech: 'NODE · EXPRESS · PRISMA · POSTGRES',
    bgColor: 'bg-brutal',
    textColor: 'text-ink',
    numberBg: 'bg-bone',
  },
  {
    number: '02',
    title: 'Hotel Site Redesign',
    tech: 'NEXT · REACT · TAILWIND',
    bgColor: 'bg-bone',
    textColor: 'text-ink',
    numberBg: 'bg-ink',
    numberText: 'text-bone',
  },
];

export default function Home() {
  const articles = getAllArticles().slice(0, 2);

  return <HomeClient projects={projects} articles={articles} />;
}