import React, { useState } from "react";
import SearchIcon from "../../../icons/SearchIcon";
import { useNavigate } from "react-router";
import InteractiveButton from "../../../components/utils/InteractiveButton";
import AddIcon from "../../../icons/AddIcon";
import { trpc } from "../../../trpc";
import TrashIcon from "../../../icons/TrashIcon";
import Spinner from "../../../components/utils/Spinner";
import { useDebounce } from "../../../hooks/useDebounce";

const BlogsTable: React.FC = () => {
  const [page, setPage] = useState(1);
  const [searchConfig, setSearchConfig] = useState("");
  const debouncedKeyword = useDebounce(searchConfig, 500);
  const navigate = useNavigate();

  const utils = trpc.useUtils();

  const createBlogMutation = trpc.admin.createDraftBlog.useMutation({
    onSuccess: () => {
      utils.admin.fetchBlogs.invalidate();
      utils.admin.getBlogsCount.invalidate();
    },
  });
  const deleteBlogMutation = trpc.admin.deleteBlog.useMutation({
    onSuccess: () => {
      utils.admin.fetchBlogs.invalidate();
      utils.admin.getBlogsCount.invalidate();
    },
  });
  const handleAddBlog = async () => {
    const res = await createBlogMutation.mutateAsync();
    if (res.success) {
      navigate(`/admin/blogs/${res.blogId}`);
    }
  };
  // Fetch paginated data
  const { data: blogs = [], isLoading } = trpc.admin.fetchBlogs.useQuery({
    page,
    keyword: debouncedKeyword,
  });

  // Fetch total count for pagination logic
  const { data: countData } = trpc.admin.getBlogsCount.useQuery({
    keyword: debouncedKeyword,
  });

  const totalPages = countData?.totalPages || 1;
  const totalItems = countData?.total || 0;

  // Calculate showing range
  const startRange = (page - 1) * 10 + 1;
  const endRange = Math.min(page * 10, totalItems);
  const handleSearchChange = (updates: typeof searchConfig) => {
    setSearchConfig(updates);
    setPage(1);
  };
  return (
    <>
      <header className="dashboard-header">
        <div className="dashboard-header__search-wrapper">
          <SearchIcon className="dashboard-header__search-icon" />
          <input
            type="text"
            className="dashboard-header__search-input"
            placeholder="Search by Title"
            value={searchConfig}
            onChange={(e) => handleSearchChange(e.target.value)}
          />
        </div>
      </header>

      <div className="dashboard-card">
        <div className="dashboard-card__header">
          <h2 className="dashboard-card__title">Blog Management</h2>
          <InteractiveButton solid onClick={handleAddBlog}>
            <AddIcon /> Add Blog
          </InteractiveButton>
        </div>

        {blogs.length > 0 ? (
          <div className="table-responsive">
            <table className="table">
              <thead>
                <tr>
                  <th>Blog Title</th>
                  <th>Blog Id</th>
                  <th>Author</th>
                  <th>Created At</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {blogs.map((blog) => {
                  const blogImages = blog.images as string[];
                  const isDeletingThisBlog =
                    deleteBlogMutation.isPending &&
                    deleteBlogMutation.variables?.id === blog.id;
                  return (
                    <tr
                      key={blog.id}
                      onClick={() => navigate(`/admin/blogs/${blog.id}`)}
                    >
                      <td>
                        <div className="table-info">
                          <img
                            src={
                              blogImages && blogImages[0]
                                ? `${import.meta.env.VITE_API_URL}/images/${blogImages[0]}`
                                : "https://placehold.co/100"
                            }
                            alt={blog.title}
                          />
                          <div>
                            <div className="table__title">{blog.title || "Untitled Blog"}</div>
                            <div className="table__subtitle">
                              {blog.slug}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td>
                        #BL-{blog.id.slice(0, 4).toUpperCase()}-
                        {blog.id.slice(4, 8).toUpperCase()}
                      </td>
                      <td>
                        <span>{blog.author}</span>
                      </td>
                      <td>
                        <span>
                          {blog.createdAt
                            ? new Date(blog.createdAt).toLocaleDateString(
                                "en-IN",
                                { day: "numeric", month: "short", year: "numeric" },
                              )
                            : "TBD"}
                        </span>
                      </td>
                      <td>
                        <span
                          className={`status-badge status-badge--${blog.status.toLowerCase()}`}
                        >
                          {blog.status}
                        </span>
                      </td>

                      <td>
                        {blog.status === "DRAFT" && (
                          <button
                            className="action-btn"
                            onClick={(e) => {
                              e.stopPropagation();
                              if (
                                confirm(
                                  "Are you sure you want to delete this Blog?",
                                )
                              ) {
                                deleteBlogMutation.mutate({ id: blog.id });
                              }
                            }}
                            disabled={deleteBlogMutation.isPending}
                          >
                            {isDeletingThisBlog ? (
                              <Spinner size={16} strokeWidth={1} />
                            ) : (
                              <TrashIcon color="red" />
                            )}
                          </button>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="empty-state">
            {isLoading ? (
              <Spinner size={20} strokeWidth={1} />
            ) : (
              <>
                <p>No blogs found.</p>
                <p>It looks like there are no blogs created at the moment.</p>
              </>
            )}
          </div>
        )}
        <footer className="dashboard-card__pagination">
          <span className="pagination-info">
            Showing {totalItems > 0 ? `${startRange}-${endRange}` : "0"} of{" "}
            {totalItems} blogs
          </span>

          <div className="pagination-controls">
            <button
              className={`btn ${page === 1 ? "btn--disabled" : ""}`}
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
            >
              Previous
            </button>
            <button
              className={`btn ${page >= totalPages ? "btn--disabled" : ""}`}
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page >= totalPages}
            >
              Next
            </button>
          </div>
        </footer>
      </div>
    </>
  );
};
export default BlogsTable;
