"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { BLOG_POSTS } from "@/lib/blogs";

const TAG_COLORS: Record<string, string> = {
  Health: "var(--accent-orange)",
  Wellness: "var(--accent-orange)",
  "Healthy Living": "var(--accent-orange)",
};

export default function YouMightAlsoLike() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);
  const [dragged, setDragged] = useState(false);

  const related = BLOG_POSTS.slice(0, 5).map((p) => ({
    id: p.id,
    title: p.title,
    excerpt: p.description,
    image: p.heroImage1,
    tags: ["Health", "Wellness", "Healthy Living"].slice(0, (p.id % 3) + 1),
    href: `/blog/${p.slug}`,
  }));

  const onMouseDown = (e: React.MouseEvent) => {
    isDragging.current = true;
    startX.current = e.pageX - (scrollRef.current?.offsetLeft ?? 0);
    scrollLeft.current = scrollRef.current?.scrollLeft ?? 0;
    setDragged(false);
  };

  const onMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current || !scrollRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = x - startX.current;
    if (Math.abs(walk) > 4) setDragged(true);
    scrollRef.current.scrollLeft = scrollLeft.current - walk;
  };

  const onMouseUp = () => { isDragging.current = false; };
  const onMouseLeave = () => { isDragging.current = false; };

  return (
    <>
      <style>{`
        .drag-scroll {
          cursor: grab;
          -webkit-overflow-scrolling: touch;
          scrollbar-width: none;
        }
        .drag-scroll::-webkit-scrollbar { display: none; }
        .drag-scroll:active { cursor: grabbing; }

        .blog-card {
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }
        .blog-card:hover {
          transform: translateY(-3px);
          box-shadow: 0 8px 24px rgba(0,0,0,0.12);
        }
      `}</style>

      <section className="w-full py-6">
        <h2 className="text-lg font-bold text-gray-900 mb-4 px-4 text-center">
          You Might Also Like
        </h2>

        <div
          ref={scrollRef}
          className="drag-scroll flex gap-4 overflow-x-auto px-4 pb-2 select-none"
          onMouseDown={onMouseDown}
          onMouseMove={onMouseMove}
          onMouseUp={onMouseUp}
          onMouseLeave={onMouseLeave}
        >
          {related.map((post) => (
            <Link
              key={post.id}
              href={dragged ? "#" : post.href}
              onClick={(e) => dragged && e.preventDefault()}
              className="blog-card shrink-0 w-[320px] sm:w-[360px] md:w-[380px] lg:w-[420px] rounded-2xl overflow-hidden bg-white border border-gray-100 shadow-sm flex flex-col"
              draggable={false}
            >
              <div className="w-full h-44 md:h-52 lg:h-60 overflow-hidden bg-gray-100">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover pointer-events-none"
                  draggable={false}
                />
              </div>

              <div className="p-4 md:p-5 lg:p-6 flex flex-col flex-1">
                <h3 className="text-sm md:text-base lg:text-lg font-bold text-gray-900 mb-2">{post.title}</h3>

                <div className="flex flex-wrap gap-1.5 mb-3">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-0.5 rounded-full text-white text-[10px] md:text-xs lg:text-sm font-semibold"
                      style={{ background: TAG_COLORS[tag] ?? "var(--accent-orange)" }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <p className="text-xs md:text-sm lg:text-base text-gray-600 leading-relaxed flex-1 line-clamp-3">
                  {post.excerpt}
                </p>

                <p className="mt-3 text-xs md:text-sm lg:text-base text-gray-500 hover:text-gray-800 transition-colors">
                  Read More →
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
