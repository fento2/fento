# Metadata Configuration Guide

Panduan lengkap untuk menggunakan sistem metadata di aplikasi Anda.

## 📋 File Metadata

### 1. **lib/metadata.ts** - Metadata Configuration
File utama yang berisi:
- `baseMetadata` - Metadata dasar aplikasi
- `siteConfig` - Konfigurasi site (URL, social links, dll)
- `generateMetadata()` - Function untuk generate metadata otomatis

### 2. **app/layout.tsx** - Root Layout
Metadata untuk semua halaman sudah dikonfigurasi di sini menggunakan `generateMetadata()`.

### 3. **public/favicon.svg** - Favicon
Logo Anda dalam format SVG sebagai favicon.

### 4. **public/site.webmanifest** - Web Manifest
Konfigurasi PWA untuk installable web app.

### 5. **public/robots.txt** - Robots.txt
File untuk search engine crawlers.

### 6. **app/sitemap.ts** - Sitemap
Sitemap otomatis untuk SEO.

## 🎯 Cara Menggunakan

### Untuk Halaman Statis

**Contoh: app/about/page.tsx**

```typescript
import type { Metadata } from 'next';
import { generateMetadata } from '@/lib/metadata';

export const metadata: Metadata = generateMetadata(
  'About Me',                    // Page title (optional)
  'Learn about my background',   // Page description (optional)
  '/about'                       // Page path (optional)
);

export default function About() {
  return <div>About page...</div>;
}
```

### Untuk Halaman Dinamis (Blog, Products, dll)

**Contoh: app/blog/[slug]/page.tsx**

```typescript
import type { Metadata } from 'next';
import { generateMetadata } from '@/lib/metadata';

interface BlogPostProps {
  params: { slug: string };
}

// generateMetadata harus async untuk dynamic routes
export async function generateMetadata({
  params,
}: BlogPostProps): Promise<Metadata> {
  // Fetch data dari database/API
  const post = await fetchBlogPost(params.slug);

  return generateMetadata(
    post.title,
    post.excerpt,
    `/blog/${params.slug}`
  );
}

export default function BlogPost({ params }: BlogPostProps) {
  return <article>Blog post content...</article>;
}
```

## 🔧 Kustomisasi Metadata

### Update Site Config (lib/metadata.ts)

```typescript
export const siteConfig = {
  name: 'Your Name',              // Nama brand
  description: 'Your description',
  url: 'https://yoursite.com',    // PENTING: Set NEXT_PUBLIC_SITE_URL atau update ini
  ogImage: '/og-image.png',       // Open Graph image
  links: {
    twitter: 'https://twitter.com/yourhandle',
    github: 'https://github.com/yourname',
    linkedin: 'https://linkedin.com/in/yourname',
  },
};
```

### Update Base Metadata (lib/metadata.ts)

```typescript
export const baseMetadata = {
  title: 'Your Site Title',
  description: 'Your site description',
  author: 'Your Name',
  keywords: ['keyword1', 'keyword2', 'keyword3'],
};
```

## 🎨 Metadata yang Dihasilkan

### Default Metadata:
- ✅ Title & Description
- ✅ Meta Keywords & Author
- ✅ Viewport & Robots
- ✅ Open Graph (Facebook, LinkedIn)
- ✅ Twitter Card
- ✅ Favicon (SVG & ICO)
- ✅ Apple Icon
- ✅ Web Manifest
- ✅ Sitemap

## 📱 Open Graph & Twitter Card

Metadata otomatis include:

```html
<!-- Open Graph (Facebook, LinkedIn, etc) -->
<meta property="og:type" content="website" />
<meta property="og:url" content="https://yoursite.com" />
<meta property="og:title" content="Your Page Title" />
<meta property="og:description" content="Your page description" />
<meta property="og:image" content="/og-image.png" />

<!-- Twitter Card -->
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="Your Page Title" />
<meta name="twitter:description" content="Your page description" />
<meta name="twitter:image" content="/og-image.png" />
```

## 🌍 Environment Variables

Set di `.env.local`:

```env
NEXT_PUBLIC_SITE_URL=https://yoursite.com
```

## 📝 Checklist Metadata

- [ ] Update `siteConfig` dengan URL yang benar
- [ ] Update `baseMetadata` dengan info Anda
- [ ] Update Twitter handle di metadata.ts
- [ ] Upload OG image ke `public/og-image.png`
- [ ] Upload Apple icon ke `public/apple-icon.png`
- [ ] Update `robots.txt` dengan URL yang benar
- [ ] Test metadata di: https://metatags.io/
- [ ] Test Open Graph di: https://ogp.me/

## 🚀 Best Practices

1. **Unique Metadata**: Setiap halaman punya metadata unik
2. **Descriptive**: Gunakan deskripsi yang jelas dan compelling
3. **Keywords**: 3-5 keywords yang relevan per halaman
4. **OG Images**: Buat custom OG images untuk sharing yang lebih baik
5. **Canonical URLs**: Sudah otomatis dihandle

## 🔗 Useful Links

- [Next.js Metadata API](https://nextjs.org/docs/app/building-your-application/optimizing/metadata)
- [Open Graph Protocol](https://ogp.me/)
- [Twitter Card Documentation](https://developer.twitter.com/en/docs/twitter-for-websites/cards/overview/abouts-cards)
- [Meta Tags Tester](https://metatags.io/)
