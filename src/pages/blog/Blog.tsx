import { useParams } from "react-router";
import { trpc } from "../../trpc";
import Spinner from "../../components/utils/Spinner";
import ReactMarkdown from "react-markdown";

const Blog = () => {
  const { slug } = useParams<{ slug: string }>();

  const {
    data: blog,
    isLoading,
    error,
  } = trpc.public.fetchBlogBySlug.useQuery(
    { slug: slug! },
    {
      enabled: !!slug,
      staleTime: 0,
    },
  );

  if (isLoading)
    return (
      <div className="blog-loading">
        <Spinner size={50} strokeWidth={2} />
      </div>
    );

  if (error || !blog)
    return (
      <div className="blog-not-found">
        <h2>Blog post not found.</h2>
        <p>The post you are looking for doesn't exist or has been removed.</p>
      </div>
    );

  const images = blog.images as string[];
  const coverImage =
    images && images.length > 0
      ? `${import.meta.env.VITE_API_URL}/images/${images[0]}`
      : null;

  return (
    <section className="blog-post">
      <header className="blog-header">
        <h1>{blog.title}</h1>
        <p className="blog-meta">
          By {blog.author || "Third Space"} •{" "}
          {new Date(blog.createdAt).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>
      </header>

      {coverImage && (
        <div className="blog-cover">
          <img src={coverImage} alt={blog.title} />
        </div>
      )}

      <div className="blog-content">
        <ReactMarkdown>{blog.content}</ReactMarkdown>
      </div>
    </section>
  );
};

export default Blog;
