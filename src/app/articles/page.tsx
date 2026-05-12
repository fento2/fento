import Link from 'next/link';
import { getAllArticles, ArticleMeta } from '@/lib/articles';
import { ArticlesClient } from './articles-client';

export default function Articles() {
  const allArticles = getAllArticles();

  return (
    <main className="bg-bone text-ink">
      {/* Hero */}
      <section className="border-b-4 border-ink">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
          <h1 className="font-helvetica text-6xl sm:text-7xl lg:text-9xl leading-[0.92] uppercase">JOURNAL</h1>
          <p className="text-lg mt-6 max-w-2xl opacity-80">Thoughts on building, breaking, and shipping software.</p>
        </div>
      </section>

      {/* Client Component with filtering */}
      <ArticlesClient articles={allArticles} />
    </main>
  );
}
