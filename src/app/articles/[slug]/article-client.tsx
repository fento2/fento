'use client';

import { motion } from 'framer-motion';
import { MDXRemote } from 'next-mdx-remote/rsc';
import Link from 'next/link';
import { Article, ArticleMeta } from '@/lib/articles';

interface ArticleClientProps {
  article: Article;
  relatedArticles: ArticleMeta[];
}

export function ArticleClient({ article, relatedArticles }: ArticleClientProps) {
  return (
    <main className="bg-bone text-ink">
      {/* Hero */}
      <section className="border-b-4 border-ink">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="font-helvetica text-5xl sm:text-6xl lg:text-7xl leading-[0.92] uppercase mb-6">
              {article.title}
            </h1>
            <div className="flex items-center gap-4 font-mono text-xs uppercase tracking-widest opacity-70">
              <span>{article.date}</span>
              <span>·</span>
              <span>{article.category}</span>
              <span>·</span>
              <span>{article.readingTime}</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="max-w-none space-y-6 [&>h1]:font-helvetica [&>h1]:text-4xl [&>h1]:uppercase [&>h1]:tracking-tight [&>h1]:mb-6 [&>h2]:font-helvetica [&>h2]:text-3xl [&>h2]:uppercase [&>h2]:tracking-tight [&>h2]:mb-6 [&>p]:leading-[1.75] [&>p]:text-lg [&>blockquote]:border-l-4 [&>blockquote]:border-brutal [&>blockquote]:pl-6 [&>blockquote]:italic [&>blockquote]:text-brutal [&>blockquote]:my-8 [&>blockquote]:py-4 [&>code]:bg-ink [&>code]:text-bone [&>code]:px-2 [&>code]:py-1 [&>code]:rounded-none [&>code]:font-mono [&>code]:text-sm [&>pre]:bg-ink [&>pre]:text-bone [&>pre]:p-6 [&>pre]:overflow-x-auto [&>pre]:mb-6 [&>pre>code]:bg-transparent [&>pre>code]:text-inherit [&>pre>code]:p-0 [&>pre>code]:font-mono [&>ul]:list-disc [&>ul]:pl-6 [&>ul>li]:mb-2 [&>ol]:list-decimal [&>ol]:pl-6 [&>ol>li]:mb-2"
          >
            <MDXRemote source={article.content} />
          </motion.div>
        </div>
      </section>

      {/* Navigation & Related */}
      <section className="border-t-4 border-ink py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Back Link */}
          <div className="mb-24">
            <Link
              href="/articles"
              className="font-helvetica text-sm uppercase tracking-widest hover:text-brutal transition-colors"
            >
              ← BACK TO JOURNAL
            </Link>
          </div>

          {/* Related Articles */}
          {relatedArticles.length > 0 && (
            <div>
              <h2 className="font-helvetica text-3xl uppercase tracking-tight mb-8">Related Reading</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {relatedArticles.map((related) => (
                  <Link key={related.slug} href={`/articles/${related.slug}`}>
                    <div className="border-4 border-ink p-6 hover:bg-brutal hover:text-bone transition-colors duration-100 cursor-pointer">
                      <h3 className="font-helvetica text-xl uppercase tracking-tight mb-2">{related.title}</h3>
                      <p className="font-mono text-xs uppercase tracking-widest opacity-60">{related.date}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
