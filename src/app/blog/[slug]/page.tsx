import { notFound } from "next/navigation";
import { getBlogBySlug, getAllBlogSlugs } from "@/lib/blogs";
import BlogDetail from "@/components/blog/BlogDetail";

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  return getAllBlogSlugs();
}

export default async function BlogPage({ params }: PageProps) {
  const { slug } = await params;
  const post = getBlogBySlug(slug);

  if (!post) {
    return notFound();
  }

  return <BlogDetail post={post} />;
}
