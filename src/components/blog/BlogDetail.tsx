import type { BlogPost } from "@/lib/blogs";
import AuthorCard from "@/components/blog/AuthorCard";
import YouMightAlsoLike from "@/components/blog/YouMightAlsoLike";

interface BlogDetailProps {
  post: BlogPost;
  blogs: BlogPost[];
}

export default function BlogDetail({ post, blogs }: BlogDetailProps) {
  return (
    <article className="max-w-[1500px] mx-auto px-9 py-8 max-sm:px-6">

      <nav className="flex items-center text-xs mb-5 flex-wrap justify-center">
  <a
    href="/blogs"
    className="text-gray-900 font-semibold text-xs md:text-sm lg:text-base transition-colors"
  >
    Blogs
  </a>
  <span className="text-gray-400 mx-1">/</span>
  <span className="text-gray-600 text-xs md:text-sm lg:text-base">{post.title}</span>
</nav>

      {/* Title — center aligned */}
      <h1 className="text-xl md:text-2xl font-bold text-gray-900 mb-5 leading-tight text-center">
        {post.title}
      </h1>

      {/* Hero Image */}
      <div className="rounded-2xl overflow-hidden mb-4 bg-gray-100">
        <img
          src={post.heroImage1}
          alt={post.title}
          className="w-full h-56 md:h-80 object-cover"
        />
      </div>

      <div className="space-y-4 text-sm md:text-base lg:text-xl text-gray-800 leading-relaxed">
        {post.content.map((para, i) => (
          <div key={i}>
            {i === post.content.length - 1 && post.heroImage2 && (
              <div className="rounded-2xl overflow-hidden mb-4 bg-gray-100">
                <img
                  src={post.heroImage2}
                  alt="Blog content"
                  className="w-full h-56 md:h-80 object-cover"
                />
              </div>
            )}
            <p>{para}</p>
          </div>
        ))}
      </div>

      {post.conclusion && (
        <div className="mt-8 p-6 bg-blue-50 rounded-xl border border-blue-100">
          <h2 className="text-lg font-bold text-gray-900 mb-2">Conclusion</h2>
          <p className="text-sm md:text-base lg:text-xl text-gray-800 leading-relaxed">{post.conclusion}</p>
        </div>
      )}
      <AuthorCard name={post.authorName} />
      <YouMightAlsoLike blogs={blogs} />
    </article>
  );
}
