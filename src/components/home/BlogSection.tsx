"use client";

import Image from "next/image";
import Link from "next/link";
import SectionHeader from "@/components/UI/SectionHeader";

type BlogPost = {
  id: number;
  image: string;
  authorName: string;
  date: string;
  title: string;
  description: string;
  slug: string;
};

const blogPosts: BlogPost[] = [
  {
    id: 1,
    image: "/home/image1.avif",
    authorName: "Person's Name",
    date: "Jan 30",
    title: "Name of the blog",
    description:
      "Lorem ipsum dolor sit amet consectetur adipiscing elit Ut et.Lorem ipsum dolor sit amet consectetur adipiscing elit Ut",
    slug: "blog-post-1",
  },
  {
    id: 2,
    image: "/home/image1.avif",
    authorName: "Person's Name",
    date: "Feb 20",
    title: "Name of the blog",
    description:
      "Lorem ipsum dolor sit amet consectetur adipiscing elit Ut et.Lorem ipsum dolor sit amet consectetur adipiscing elit Ut",
    slug: "blog-post-2",
  },
  {
    id: 3,
    image: "/home/image1.avif",
    authorName: "Person's Name",
    date: "May 5",
    title: "Name of the blog",
    description:
      "Lorem ipsum dolor sit amet consectetur adipiscing elit Ut et.Lorem ipsum dolor sit amet consectetur adipiscing elit Ut",
    slug: "blog-post-3",
  },
];

type BlogCardProps = {
  post: BlogPost;
};

function BlogCard({ post }: BlogCardProps) {
  return (
    <div className="flex flex-col">
      <div className="relative w-full rounded-2xl overflow-hidden" style={{ height: "300px" }}>
        <Image
          src={post.image}
          alt={post.title}
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        <div className="absolute bottom-0 left-0 px-4 py-4">
          <p className="text-white text-sm font-medium">{post.authorName}</p>
          <p className="text-white/80 text-xs mt-0.5">{post.date}</p>
        </div>
      </div>

      <div className="flex items-start justify-between gap-3 mt-4">
        <div className="flex-1">
          <h3 className="text-gray-900 font-bold text-xl mb-2">{post.title}</h3>
          <p className="text-gray-500 text-sm leading-relaxed line-clamp-3">
            {post.description}
          </p>
        </div>
        <Link
          href={`/blog/${post.slug}`}
          className="flex-shrink-0 w-10 h-10 rounded-full bg-[#1a3a7c] hover:bg-[#243d73] flex items-center justify-center transition-colors duration-200 mt-1"
          aria-label={`Read ${post.title}`}
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="white"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="7" y1="17" x2="17" y2="7" />
            <polyline points="7 7 17 7 17 17" />
          </svg>
        </Link>
      </div>
    </div>
  );
}

export default function BlogSection() {
  return (
    <section className="px-6 py-14 max-w-6xl mx-auto">
      <SectionHeader
        title="Blog"
        description="Lorem ipsum dolor sit amet consectetur adipiscing elit Ut et."
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-10">
        {blogPosts.map((post) => (
          <BlogCard key={post.id} post={post} />
        ))}
      </div>
    </section>
  );
}