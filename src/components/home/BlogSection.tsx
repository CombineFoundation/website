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
    date: "Jan 20",
    title: "Name of the blog",
    description:
      "Lorem ipsum dolor sit amet consectetur adipiscing elit Ut et.Lorem ipsum dolor sit amet consectetur adipiscing elit Ut",
    slug: "blog-post-1",
  },
  {
    id: 2,
    image: "/home/image1.avif",
    authorName: "Person's Name",
    date: "Jan 20",
    title: "Name of the blog",
    description:
      "Lorem ipsum dolor sit amet consectetur adipiscing elit Ut et.Lorem ipsum dolor sit amet consectetur adipiscing elit Ut",
    slug: "blog-post-2",
  },
  {
    id: 3,
    image: "/home/image1.avif",
    authorName: "Person's Name",
    date: "Jan 20",
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
    <div className="flex flex-col font-sans w-full max-w-[372px]">
      <div
        className="relative w-full rounded-2xl overflow-hidden flex-shrink-0"
        style={{ height: "320px" }}
      >
        <Image
          src={post.image}
          alt={post.title}
          fill
          className="object-cover"
        />

        <div
          className="absolute bottom-0 left-0 right-0 px-5 py-5"
          style={{
            background: "rgba(255, 255, 255, 0.03)",
            boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
            backdropFilter: "blur(4.7px)",
            WebkitBackdropFilter: "blur(4.7px)",
            borderTop: "1px solid rgba(255, 255, 255, 0.3)",
          }}
        >
          <p className="text-white text-lg font-semibold leading-snug drop-shadow-sm">
            {post.authorName}
          </p>
          <p className="text-white/80 text-sm mt-0.5 drop-shadow-sm">
            {post.date}
          </p>
        </div>
      </div>

      <div className="flex items-start justify-between gap-3 mt-3">
        <div className="flex-1">
          <h3 className="text-gray-900 font-bold text-xl mb-1.5">{post.title}</h3>
          <p className="text-gray-500 text-sm leading-relaxed line-clamp-3">
            {post.description}
          </p>
        </div>
        <Link
          href={`/blog/${post.slug}`}
          className="flex-shrink-0 w-11 h-11 rounded-full flex items-center justify-center transition-opacity duration-200 mt-1 hover:opacity-90"
          style={{
            background: "radial-gradient(circle at 40% 35%, #2e86d4 0%, #1057b0 50%, #0a3d8f 100%)",
          }}
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
    <section className="w-full px-6 py-14 font-sans">
      <div className="max-w-6xl mx-auto">
        <SectionHeader
          title="Blog"
          description="Lorem ipsum dolor sit amet consectetur adipiscing elit Ut et."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 mt-10 justify-items-center">
          {blogPosts.map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>
      </div>
    </section>
  );
}