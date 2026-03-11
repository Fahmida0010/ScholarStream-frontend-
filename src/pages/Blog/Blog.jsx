import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const Blog = () => {
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const category = query.get("category") || "featured";

  const [blogs, setBlogs] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `${import.meta.env.VITE_API_URL}/api/blog?category=${category}`
        );
        const data = await res.json();
        setBlogs(data);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, [category]);

  // Skeleton Loading UI
  if (loading) {
    return (
      <div className="min-h-screen bg-base-200/30 py-16 px-6 md:px-12">
        {/* Header Skeleton */}
        <div className="text-center mb-16">
          <div className="skeleton h-12 md:h-14 w-80 md:w-96 mx-auto rounded-lg mb-4"></div>
          <div className="skeleton h-6 w-full max-w-3xl mx-auto rounded mb-2"></div>
          <div className="skeleton h-6 w-5/6 max-w-3xl mx-auto rounded"></div>
        </div>

        {category === "featured" ? (
          // Featured Skeleton - Card Grid
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8 max-w-7xl mx-auto">
            {[...Array(8)].map((_, index) => (
              <div
                key={index}
                className="card bg-base-100 shadow-lg rounded-2xl overflow-hidden border border-base-300/40"
              >
                <div className="h-2 
                bg-gradient-to-r from-primary/30
                 to-secondary/30"></div>
                <div className="card-body p-6">
                  <div className="skeleton h-8 w-4/5 rounded mb-4"></div>
                  <div className="skeleton h-5 w-full rounded mb-3"></div>
          <div className="skeleton h-5 w-full rounded mb-3"></div>
                  <div className="skeleton h-5 w-3/4 rounded mb-6"></div>
                  <div className="skeleton h-10 w-full rounded"></div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          // Tips Skeleton - Simple Sections
          <div className="max-w-4xl mx-auto space-y-16">
            {[...Array(6)].map((_, index) => (
              <section
                key={index}
                className="bg-white/70
                 backdrop-blur-sm p-8 md:p-10 rounded-2xl
                  border border-indigo-100 shadow-sm"
              >
                <div className="skeleton h-10 md:h-12 w-3/4 rounded mb-6"></div>
                <div className="skeleton h-6 w-full rounded mb-3"></div>
                <div className="skeleton h-6 w-full rounded mb-3"></div>
                <div className="skeleton h-6 w-full rounded mb-3"></div>
                <div className="skeleton h-6 w-2/3 rounded mb-8"></div>
                <div className="skeleton h-10 w-44 rounded"></div>
              </section>
            ))}
          </div>
        )}
      </div>
    );
  }

  const isFeatured = category === "featured";

  return (
    <div className="min-h-screen bg-base-200/30 py-16 px-6 md:px-12">
      {/* Header */}
      <div className="text-center mb-16">
        <h1
          className={`text-4xl md:text-5xl font-extrabold mb-4 ${
            isFeatured
              ? "bg-pink-800 bg-clip-text text-transparent"
              : "text-purple-900"
          }`}
        >
          {isFeatured
            ? "Featured Scholarship Articles"
            : "Guidelines & Winning Tips"}
        </h1>
        <p className="text-lg text-green-500 max-w-3xl mx-auto">
          {isFeatured
            ? "In-depth guides and strategies to help you secure scholarships in 2026"
            : "Simple, powerful, and proven tips used by successful scholarship winners"}
        </p>
      </div>

      {/* Content Layout - Different for featured vs tips */}
      {isFeatured ? (
        // Featured: Card Grid
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8 max-w-7xl mx-auto">
          {blogs.map((blog) => (
            <div
              key={blog._id}
              className="card bg-base-100 shadow-lg hover:shadow-2xl transition-all duration-300 border border-base-300/40 rounded-2xl overflow-hidden group"
            >
              <div className="h-2 bg-red-900"></div>
              <div className="card-body p-6 flex flex-col">
                <h3 className="card-title text-xl font-bold text-primary group-hover:text-primary-focus">
                  {blog.title}
                </h3>
                <p className="text-base-content/80 mt-3 line-clamp-4 flex-grow">
                  {blog.summary || "No summary available"}
                </p>
                <div className="card-actions mt-6">
                  <button
                    className="btn btn-outline btn-primary w-full"
                    onClick={() => setSelectedPost(blog)}
                  >
                    Read Full Article →
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        
        <div className="max-w-4xl mx-auto space-y-16">
  {blogs.map((blog) => (
    <section
      key={blog._id}
      className="bg-base-100/70 backdrop-blur-sm p-8
        md:p-10 rounded-2xl border border-base-300 
        shadow-sm hover:shadow-md transition-shadow"
    >
      <h2 className="text-2xl md:text-3xl font-bold
        text-primary mb-5 
        border-b border-base-300 pb-3">
        {blog.title}
      </h2>

      <p className="text-base-content/90 leading-relaxed mb-6 text-lg">
        {blog.content?.substring(0, 350) + "..." || "No content available"}
      </p>

      <button
        className="btn btn-outline btn-info btn-md"
        onClick={() => setSelectedPost(blog)}
      >
        Explore Full Tip →
      </button>
    </section>
  ))}
</div>
      )}

      {/* No posts found */}
      {blogs.length === 0 && !loading && (
        <div className="text-center py-20 text-base-content/60">
          <h3 className="text-2xl font-semibold">No content available yet</h3>
        </div>
      )}

      {/* Modal - Common for both */}
      {selectedPost && (
        <dialog id="post-modal" className="modal modal-open">
          <div className="modal-box max-w-4xl w-11/12 rounded-2xl p-8 md:p-12 bg-base-100 shadow-2xl">
            <button
              className="btn btn-sm btn-circle btn-ghost absolute right-6 top-6"
              onClick={() => setSelectedPost(null)}
            >
              ✕
            </button>

            <div className="mb-8">
              <div className="badge badge-outline badge-info mb-4">
                {selectedPost.category.toUpperCase()}
              </div>
              <h3 className="text-2xl md:text-3xl font-bold text-indigo-800">
                {selectedPost.title}
              </h3>
              {(selectedPost.summary || selectedPost.content) && (
                <p className="mt-4 text-base-content/80 italic">
                  {selectedPost.summary || selectedPost.content.substring(0, 200) + "..."}
                </p>
              )}
            </div>

            <div
              className="prose prose-headings:text-indigo-700 prose-a:text-indigo-600 max-w-none prose-lg leading-relaxed"
              dangerouslySetInnerHTML={{
                __html: selectedPost.details || selectedPost.content || "<p>No detailed content available</p>",
              }}
            />

            <div className="modal-action mt-10">
              <button className="btn btn-outline" onClick={() => setSelectedPost(null)}>
                Close
              </button>
            </div>
          </div>

          <form method="dialog" className="modal-backdrop">
            <button onClick={() => setSelectedPost(null)}>close</button>
          </form>
        </dialog>
      )}
    </div>
  );
};

export default Blog;