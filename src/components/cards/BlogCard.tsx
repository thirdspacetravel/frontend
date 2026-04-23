import { Link } from "react-router";
import CalendarIcon from "../../icons/CalendarIcon";
import Button from "../utils/Button";

export interface BlogData {
  id: string;
  slug: string;
  title: string;
  image: string;
  author: string;
  createdAt: string;
}

interface BlogCardProps {
  blog: BlogData;
  className?: string;
}

const BlogCard = ({ blog, className = "" }: BlogCardProps) => {
  return (
    <article className={`blog-card ${className}`}>
      <div className="blog-card__image-wrapper">
        <img src={blog.image} alt={blog.title} className="blog-card__image" />
        <div className="blog-card__overlay"></div>
      </div>

      <div className="blog-card__content">
        <div className="blog-card__header">
          <Link
            to={`/blog/${blog.slug}`}
            style={{ textDecoration: "none", color: "inherit", flex: 1 }}
          >
            <h3 className="blog-card__title">{blog.title}</h3>
          </Link>
        </div>

        <div className="blog-card__meta">
          <div className="blog-card__meta-item">
            <CalendarIcon />
            <span className="blog-card__meta-text">{blog.createdAt}</span>
          </div>
        </div>

        <div className="blog-card__author">
          <span className="blog-card__author-label">By</span>
          <span className="blog-card__author-name">
            {blog.author || "Third Space"}
          </span>
        </div>

        <footer className="blog-card__footer">
          <Button
            solid
            onClick={() => (window.location.href = `/blog/${blog.slug}`)}
            className="blog-card__cta"
          >
            Read Article
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
          </Button>
        </footer>
      </div>
    </article>
  );
};

export default BlogCard;
