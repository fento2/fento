import fs from "fs";
import path from "path";
import matter from "gray-matter";

const contentDir = path.join("src", "content", "articles");

export interface ArticleMeta {
  slug: string;
  title: string;
  date: string;
  category: string;
  readingTime: string;
  excerpt: string;
}

export interface Article extends ArticleMeta {
  content: string;
}

export function getAllArticles(): ArticleMeta[] {
  if (!fs.existsSync(contentDir)) {
    return [];
  }
  const files = fs
    .readdirSync(contentDir)
    .filter((file) => file.endsWith(".mdx"));

  const articles = files
    .map((file) => {
      const slug = file.replace(".mdx", "");
      const fullPath = path.join(contentDir, file);
      const fileContent = fs.readFileSync(fullPath, "utf-8");
      const { data } = matter(fileContent);

      return {
        slug,
        title: data.title || "",
        date: data.date || "",
        category: data.category || "",
        readingTime: data.readingTime || "",
        excerpt: data.excerpt || "",
      };
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return articles;
}

export function getArticleBySlug(slug: string): Article | null {
  try {
    const fullPath = path.join(contentDir, `${slug}.mdx`);
    const fileContent = fs.readFileSync(fullPath, "utf-8");
    const { data, content } = matter(fileContent);

    return {
      slug,
      title: data.title || "",
      date: data.date || "",
      category: data.category || "",
      readingTime: data.readingTime || "",
      excerpt: data.excerpt || "",
      content,
    };
  } catch {
    return null;
  }
}

export function getRelatedArticles(slug: string, limit = 2): ArticleMeta[] {
  const allArticles = getAllArticles();
  const current = allArticles.find((a) => a.slug === slug);

  if (!current) return [];

  return allArticles
    .filter((a) => a.slug !== slug && a.category === current.category)
    .slice(0, limit);
}
