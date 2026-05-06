/**
 * METADATA EXAMPLES FOR EACH PAGE
 *
 * Copy and use these examples in your page.tsx files
 */

import { generateMetadata } from '@/lib/metadata';
import type { Metadata } from 'next';

// ============================================
// HOME PAGE METADATA (app/page.tsx)
// ============================================
export const homeMetadata: Metadata = generateMetadata();

/*
// app/page.tsx
import type { Metadata } from 'next';
import { generateMetadata } from '@/lib/metadata';

export const metadata: Metadata = generateMetadata();

export default function Home() {
  return (...)
}
*/

// ============================================
// ABOUT PAGE METADATA (app/about/page.tsx)
// ============================================
export const aboutMetadata: Metadata = generateMetadata(
  'About',
  'Learn more about me, my background, and my professional journey',
  '/about'
);

/*
// app/about/page.tsx
import type { Metadata } from 'next';
import { generateMetadata } from '@/lib/metadata';

export const metadata: Metadata = generateMetadata(
  'About',
  'Learn more about me, my background, and my professional journey',
  '/about'
);

export default function About() {
  return (...)
}
*/

// ============================================
// SERVICES PAGE METADATA (app/services/page.tsx)
// ============================================
export const servicesMetadata: Metadata = generateMetadata(
  'Services',
  'Explore the professional services I offer',
  '/services'
);

/*
// app/services/page.tsx
import type { Metadata } from 'next';
import { generateMetadata } from '@/lib/metadata';

export const metadata: Metadata = generateMetadata(
  'Services',
  'Explore the professional services I offer',
  '/services'
);

export default function Services() {
  return (...)
}
*/

// ============================================
// CONTACT PAGE METADATA (app/contact/page.tsx)
// ============================================
export const contactMetadata: Metadata = generateMetadata(
  'Contact',
  'Get in touch with me. Send me a message or find my social links',
  '/contact'
);

/*
// app/contact/page.tsx
import type { Metadata } from 'next';
import { generateMetadata } from '@/lib/metadata';

export const metadata: Metadata = generateMetadata(
  'Contact',
  'Get in touch with me. Send me a message or find my social links',
  '/contact'
);

export default function Contact() {
  return (...)
}
*/

// ============================================
// BLOG POST METADATA EXAMPLE
// ============================================
/*
// app/blog/[slug]/page.tsx
import type { Metadata } from 'next';
import { generateMetadata } from '@/lib/metadata';

interface BlogPageProps {
  params: { slug: string };
}

// For dynamic pages, use generateMetadata as a function
export async function generateMetadata({
  params,
}: BlogPageProps): Promise<Metadata> {
  const post = await fetchPost(params.slug);

  return generateMetadata(
    post.title,
    post.excerpt,
    `/blog/${params.slug}`
  );
}

export default function BlogPost({ params }: BlogPageProps) {
  return (...)
}
*/
