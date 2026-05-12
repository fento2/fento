'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useState } from 'react';
import { ArticleMeta } from '@/lib/articles';

const categories = ['ALL', 'DEV', 'DESIGN', 'RANT', 'TUTORIAL'];

interface ArticlesClientProps {
  articles: ArticleMeta[];
}

export function ArticlesClient({ articles }: ArticlesClientProps) {
  const [activeCategory, setActiveCategory] = useState('ALL');

  const filtered =
    activeCategory === 'ALL'
      ? articles
      : articles.filter((a) => a.category.toUpperCase() === activeCategory.toUpperCase());

  return (
    <>
      {/* Filter Tabs */}
      <section className="border-b-4 border-ink px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex gap-2 flex-wrap">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 font-helvetica text-xs tracking-widest uppercase transition-colors duration-100 border-2 border-ink ${
                  activeCategory === cat ? 'bg-brutal text-bone' : 'bg-bone text-ink hover:bg-ink hover:text-bone'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Articles List */}
      <section className="px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto space-y-0">
          {filtered.length === 0 ? (
            <div className="py-24 text-center opacity-60">
              <p className="font-helvetica text-lg">No articles found</p>
            </div>
          ) : (
            filtered.map((article, idx) => (
              <motion.div
                key={article.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
              >
                <Link href={`/articles/${article.slug}`}>
                  <div className="border-b-2 border-ink hover:bg-ink hover:text-bone transition-colors duration-100 p-6 sm:p-8 flex gap-6 items-start group cursor-pointer">
                    {/* Number Block */}
                    <div className="bg-ink text-bone font-helvetica text-xs tracking-widest uppercase shrink-0 px-2 py-1">
                      [A0{idx + 1}]
                    </div>

                    {/* Content */}
                    <div className="flex-1">
                      <div className="font-mono text-xs uppercase tracking-widest mb-2 opacity-60">
                        {article.date} · {article.category} · {article.readingTime}
                      </div>
                      <h3 className="font-helvetica text-2xl sm:text-3xl tracking-tight uppercase leading-none mb-2 group-hover:text-bone">
                        {article.title}
                      </h3>
                      <p className="text-sm opacity-80">{article.excerpt}</p>
                    </div>

                    {/* Arrow */}
                    <div className="text-2xl font-helvetica shrink-0 group-hover:translate-x-1 transition-transform duration-100">
                      →
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))
          )}
        </div>
      </section>
    </>
  );
}
