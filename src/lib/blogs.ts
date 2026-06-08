import allBlogs from "@/data/blogs.json";

export interface CommentData {
  id: number;
  name: string;
  date: string;
  text: string;
  avatar: string;
}

export interface BlogPost {
  id: number;
  heroImage1: string;
  heroImage2: string;
  authorName: string;
  date: string;
  title: string;
  description: string;
  slug: string;
  status: "Published" | "Draft" | "Under Review";
  content: string[];
  conclusion: string;
  likes: number;
  comments: number;
  commentList: CommentData[];
}

export const BLOG_POSTS: BlogPost[] = allBlogs as BlogPost[];

export function getBlogBySlug(slug: string) {
  return BLOG_POSTS.find((post) => post.slug === slug);
}

export function getAllBlogSlugs() {
  return BLOG_POSTS.map((post) => ({ slug: post.slug }));
}
