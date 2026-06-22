import { notFound } from "next/navigation";
import { getBlogBySlug, getAllBlogSlugs, getAllBlogs } from "@/lib/blogs";
import BlogDetail from "@/components/blog/BlogDetail";

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  return getAllBlogSlugs();
}

export const dynamic = "force-dynamic";

export default async function BlogPage({ params }: PageProps) {
  const { slug } = await params;
  const post = await getBlogBySlug(slug);
  const blogs = await getAllBlogs();

  if (!post) {
    return notFound();
  }

  return <BlogDetail post={post} blogs={blogs} />;
}
