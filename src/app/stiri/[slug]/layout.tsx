import type { Metadata } from "next";
import { buildArticleMetadata, newsArticleJsonLd, breadcrumbJsonLd } from "@/lib/seo";
import { JsonLd } from "@/components/json-ld";
import { articleMetas } from "../article-metas";

export function generateStaticParams() {
  return articleMetas.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = articleMetas.find((a) => a.slug === slug);
  if (!article) {
    return { title: "Articol negăsit — Seniore.ro" };
  }
  return buildArticleMetadata({
    title: article.title,
    description: article.excerpt,
    slug: article.slug,
    image: article.image,
    date: article.date,
  });
}

export default function StiriSlugLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
