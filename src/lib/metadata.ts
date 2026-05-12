import type { Metadata } from "next";

export const baseMetadata = {
  title: "Fendry Tonrate",
  description:
    "Personal portfolio of Fendry Tonrate — designer and developer crafting thoughtful digital experiences.",
  author: "Fendry Tonrate",
  keywords: ["portfolio", "projects", "web development", "design"],
};

export const siteConfig = {
  name: "FT",
  description: baseMetadata.description,
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://example.com",
  ogImage: "/og-image.png",
  links: {
    // twitter: "https://twitter.com",
    github: "https://github.com/fento2",
    linkedin: "https://www.linkedin.com/in/fendry-tonrate-0a46b9348",
  },
};

export function generateMetadata(
  title?: string,
  description?: string,
  path?: string,
): Metadata {
  const pageTitle = title
    ? `${title} | ${baseMetadata.title}`
    : baseMetadata.title;
  const pageDescription = description || baseMetadata.description;
  const pageUrl = path ? `${siteConfig.url}${path}` : siteConfig.url;

  return {
    title: pageTitle,
    description: pageDescription,
    keywords: baseMetadata.keywords,
    authors: [{ name: baseMetadata.author }],
    viewport: "width=device-width, initial-scale=1",
    robots: "index, follow",
    openGraph: {
      type: "website",
      locale: "en_US",
      url: pageUrl,
      title: pageTitle,
      description: pageDescription,
      siteName: siteConfig.name,
      images: [
        {
          url: siteConfig.ogImage,
          width: 1200,
          height: 630,
          alt: baseMetadata.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: pageTitle,
      description: pageDescription,
      images: ["/home/hero.jpg"],
      creator: "@yourtwitterhandle",
    },
    icons: {
      icon: [
        { url: "/favicon.svg", type: "image/svg+xml" },
        { url: "/favicon.ico", sizes: "32x32" },
      ],
      apple: "/apple-icon.png",
    },
    manifest: "/site.webmanifest",
  };
}
