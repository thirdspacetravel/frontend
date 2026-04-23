import { useEffect, useState } from "react";
import { useOutletContext, useParams, useNavigate } from "react-router";
import MenuIcon from "../../../icons/MenuIcon";
import { trpc } from "../../../trpc";
import InteractiveButton from "../../../components/utils/InteractiveButton";
import Spinner from "../../../components/utils/Spinner";
import ReactMarkdown from "react-markdown";
import { TextInput } from "../../../components/utils/InputUtils";
import MediaGalleryUpload from "../../components/trips/MediaGalleryUpload";

interface ContextType {
  toggle: () => void;
  isOpen: boolean;
}

const BlogDetailPage = () => {
  const { toggle } = useOutletContext<ContextType>();
  const { blogId } = useParams();
  const navigate = useNavigate();

  const utils = trpc.useUtils();

  const {
    data: blog,
    isLoading,
    isError,
    error,
  } = trpc.admin.fetchBlogById.useQuery({ id: blogId! }, { enabled: !!blogId });

  const updateMutation = trpc.admin.updateBlog.useMutation({
    onSuccess: () => {
      utils.admin.fetchBlogs.invalidate();
      utils.admin.fetchBlogById.invalidate({ id: blogId! });
      setIsDirty(false);
    },
  });

  const deleteMutation = trpc.admin.deleteBlog.useMutation({
    onSuccess: () => {
      utils.admin.fetchBlogs.invalidate();
      navigate("/admin/blogs");
    },
  });

  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [author, setAuthor] = useState("");
  const [content, setContent] = useState("");
  const [images, setImages] = useState<string[]>([]);
  const [isDirty, setIsDirty] = useState(false);

  useEffect(() => {
    if (blog) {
      setTitle(blog.title || "");
      setSlug(blog.slug || "");
      setAuthor(blog.author || "");
      setContent(blog.content || "");
      setImages(blog.images || []);
      setIsDirty(false);
    }
  }, [blog]);

  useEffect(() => {
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      if (isDirty) {
        event.preventDefault();
      }
    };
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [isDirty]);

  if (isLoading || !blogId) return <div>Loading blog details...</div>;
  if (isError) return <div>Error: {error?.message}</div>;
  if (!blog) return <div>Blog not found.</div>;

  const handleContentChange = (newVal: string) => {
    setContent(newVal);
    setIsDirty(true);
  };

  const handleMetaChange = (label: string, value: string) => {
    switch (label) {
      case "title":
        setTitle(value);
        break;
      case "slug":
        setSlug(value);
        break;
      case "author":
        setAuthor(value);
        break;
    }
    setIsDirty(true);
  };

  const handleImagesChange = (urls: string[]) => {
    setImages(urls);
    setIsDirty(true);
  };

  const save = async (status: "DRAFT" | "PUBLISHED") => {
    await updateMutation.mutateAsync({
      id: blogId,
      title,
      slug,
      author,
      content,
      images,
      status,
    });
  };

  const handleUpdate = () => save(blog.status as "DRAFT" | "PUBLISHED");
  const handlePublish = () => save("PUBLISHED");
  const handleCancel = () => save("DRAFT");
  const handleDelete = async () => {
    if (confirm("Are you sure you want to delete this blog?")) {
      await deleteMutation.mutateAsync({ id: blog.id });
    }
  };

  const isPublishing =
    updateMutation.isPending &&
    updateMutation.variables?.status === "PUBLISHED";
  const isUpdating =
    updateMutation.isPending &&
    updateMutation.variables?.status === blog.status;

  return (
    <>
      <header className="layout-header">
        <div className="layout-header__left">
          <div className="menu-toggle" onClick={toggle}>
            <MenuIcon />
          </div>
          <h2 className="layout-header__title">
            #BL-{blog.status.slice(0, 3).toUpperCase()}-
            {String(blog.blogNo).padStart(4, "0")}
          </h2>
        </div>
      </header>
      <div className="content">
        <div className="content__actions">
          {blog.status === "DRAFT" ? (
            <>
              <InteractiveButton
                onClick={handleUpdate}
                disabled={!isDirty || updateMutation.isPending}
              >
                {isUpdating ? <Spinner size={20} /> : "Save Draft"}
              </InteractiveButton>
              <InteractiveButton
                solid
                onClick={handlePublish}
                disabled={updateMutation.isPending || isDirty}
              >
                {isPublishing ? <Spinner size={20} /> : "Publish Blog"}
              </InteractiveButton>
            </>
          ) : (
            <>
              <InteractiveButton
                onClick={handleUpdate}
                disabled={!isDirty || updateMutation.isPending}
              >
                {isUpdating ? <Spinner size={20} /> : "Update Changes"}
              </InteractiveButton>
              <InteractiveButton
                solid
                className="btn--danger"
                onClick={handleCancel}
                disabled={updateMutation.isPending}
              >
                {updateMutation.isPending ? (
                  <Spinner size={20} />
                ) : (
                  "Unpublish (Draft)"
                )}
              </InteractiveButton>

              <InteractiveButton
                onClick={handleDelete}
                disabled={deleteMutation.isPending}
              >
                {deleteMutation.isPending ? (
                  <Spinner size={20} />
                ) : (
                  "Delete Blog"
                )}
              </InteractiveButton>
            </>
          )}
        </div>

        <div className="content-canvas__container">
          <main className="content-canvas__main">
            <div className="content-canvas__card">
              <header className="content-canvas__header">
                <div className="content-canvas__info">
                  <h2 className="content-canvas__title">Blog Metadata</h2>
                  <p className="content-canvas__subtitle">
                    Basic details and SEO for the blog post.
                  </p>
                </div>
              </header>
              <div className="content-canvas__body">
                <TextInput
                  label="Title"
                  id="title"
                  value={title}
                  onChange={(e) => handleMetaChange("title", e.target.value)}
                  placeholder="e.g. 5 Reasons to Visit Spiti"
                />
                <div className="content-canvas__row col-2">
                  <TextInput
                    label="Slug"
                    id="slug"
                    value={slug}
                    onChange={(e) => handleMetaChange("slug", e.target.value)}
                    placeholder="e.g. 5-reasons-to-visit-spiti"
                  />
                  <TextInput
                    label="Author"
                    id="author"
                    value={author}
                    onChange={(e) => handleMetaChange("author", e.target.value)}
                    placeholder="e.g. John Doe"
                  />
                </div>
              </div>
            </div>
          </main>

          <aside className="content-canvas__sidebar">
            <MediaGalleryUpload
              tripData={{ images }}
              onChange={handleImagesChange}
            />
          </aside>
        </div>

        <div className="content-canvas__card" style={{ marginTop: "1.5rem" }}>
          <header className="content-canvas__header">
            <div className="content-canvas__info">
              <h2 className="content-canvas__title">
                Content Editor (Markdown)
              </h2>
              <p className="content-canvas__subtitle">
                Write your blog content here. The preview shows on the right.
              </p>
            </div>
          </header>
          <div
            className="content-canvas__body"
            style={{ flexDirection: "row", gap: "1.5rem" }}
          >
            <div className="input__field" style={{ flex: 1 }}>
              <textarea
                className="input__textarea"
                style={{
                  height: "600px",
                  resize: "vertical",
                  fontFamily: "monospace",
                  width: "100%",
                  boxSizing: "border-box",
                  padding: "1rem",
                }}
                value={content}
                onChange={(e) => handleContentChange(e.target.value)}
                placeholder="Write your markdown here..."
              />
            </div>
            <div className="input__field" style={{ flex: 1 }}>
              <div
                className="blog-post"
                style={{
                  height: "600px",
                  border: "1px solid rgba(0, 0, 0, 0.1)",
                  borderRadius: "12px",
                  padding: "0 1.5rem",
                  overflowY: "auto",
                  backgroundColor: "var(--theme-bg-base, #ffffff)",
                  boxSizing: "border-box",
                  maxWidth: "100%",
                  margin: 0,
                }}
              >
                <div className="blog-content" style={{ marginTop: "-2rem" }}>
                  <ReactMarkdown>{content}</ReactMarkdown>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BlogDetailPage;
