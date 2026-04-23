import { useState } from "react";
import { trpc } from "../../trpc";
import BlogCard, { type BlogData } from "../../components/cards/BlogCard";
import Spinner from "../../components/utils/Spinner";
import { useDebounce } from "../../hooks/useDebounce";
import { keepPreviousData } from "@tanstack/react-query";
import HeroSection from "../../components/sections/HeroSection";

const Blogs = () => {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  // Debounce the search input by 500ms to avoid spamming the backend
  const debouncedSearch = useDebounce(search, 500);

  const { data: blogs, isLoading: isLoadingBlogs } =
    trpc.public.fetchBlogs.useQuery(
      { page, keyword: debouncedSearch || undefined },
      { placeholderData: keepPreviousData },
    );

  const { data: countData } = trpc.public.fetchBlogCount.useQuery({
    keyword: debouncedSearch || undefined,
  });

  const totalPages = Math.ceil((countData || 0) / 10);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    setPage(1); // Reset back to first page when searching
  };

  const formattedBlogs: BlogData[] = (blogs || []).map((blog) => ({
    id: blog.id,
    title: blog.title || "",
    slug: blog.slug || "",
    image:
      blog.images && blog.images.length > 0
        ? `${import.meta.env.VITE_API_URL}/images/${blog.images[0]}`
        : "https://placehold.co/600x400",
    author: blog.author || "Third Space Travel",
    createdAt: new Date(blog.createdAt).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }),
  }));

  return (
    <>
      <HeroSection
        title="Journal & Stories"
        subtitle="Tales from the road, travel guides, and inspiration for your next journey."
        mediaSrc="./herosection/herosection3.jpg"
      />
      <div className="blogs-index">
        <header className="blogs-index__header">
          <div
            className="search-container"
            style={{ position: "relative", marginTop: 0 }}
          >
            <input
              type="text"
              placeholder="Search blogs by title or author..."
              value={search}
              onChange={handleSearchChange}
            />
            <svg
              className="search-icon"
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
          </div>
        </header>

        <main>
          {isLoadingBlogs ? (
            <div
              className="blog-loading"
              style={{
                minHeight: "40vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Spinner size={50} strokeWidth={2} />
            </div>
          ) : formattedBlogs.length > 0 ? (
            <>
              <div className="blogs-index__grid">
                {formattedBlogs.map((blog) => (
                  <BlogCard key={blog.id} blog={blog} />
                ))}
              </div>

              {totalPages > 1 && (
                <div className="blogs-index__pagination">
                  <button
                    disabled={page === 1}
                    onClick={() => setPage(page - 1)}
                  >
                    Previous
                  </button>
                  <span>
                    Page {page} of {totalPages}
                  </span>
                  <button
                    disabled={page >= totalPages}
                    onClick={() => setPage(page + 1)}
                  >
                    Next
                  </button>
                </div>
              )}
            </>
          ) : (
            <div
              className="blogs-index__empty"
              style={{
                minHeight: "40vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
                gap: "1rem",
              }}
            >
              <h3>No articles found</h3>
              <p>
                We couldn't find any blogs matching your search "
                {debouncedSearch}".
              </p>
            </div>
          )}
        </main>
      </div>
    </>
  );
};

export default Blogs;
