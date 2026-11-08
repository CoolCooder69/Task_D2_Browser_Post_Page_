import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { getAuth, onAuthStateChanged } from "firebase/auth";

interface IPost {
  id: string;
  title: string;
  content: string;
  label: string | null;
  createdAt: string | null;
  thumbnailURL: string | undefined;
}

const API_URL = import.meta.env.VITE_API_URL ?? "http://localhost:3000";

const formatDate = (iso: string | null) =>
  iso
    ? new Date(iso).toLocaleDateString(undefined, {
        year: "numeric",
        month: "short",
        day: "numeric",
      })
    : "";


const Thumbnail = ({ src, title }: { src: string | undefined; title: string }) => {
  const [status, setStatus] = useState<"loading" | "loaded" | "error">(
    src ? "loading" : "error"
  );
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (!src) {
      setStatus("error");
      return;
    }
    setStatus("loading");
    const img = imgRef.current;
    if (img?.complete && img.naturalWidth > 0) setStatus("loaded");
  }, [src]);

  return (
    <div className="relative aspect-video w-full overflow-hidden rounded-xl border border-gray-500/20 bg-gray-500/10">
      {status === "loading" && (
        <div className="absolute inset-0 animate-pulse bg-gradient-to-br from-gray-500/10 via-gray-500/25 to-gray-500/10" />
      )}

      {status === "error" && (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 opacity-50">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-9 w-9"
            aria-hidden="true"
          >
            <rect x="3" y="3" width="18" height="18" rx="3" />
            <circle cx="8.5" cy="8.5" r="1.5" />
            <path d="m21 15-5-5L5 21" />
          </svg>
          <span className="text-xs">Image unavailable</span>
        </div>
      )}

      {src && status !== "error" && (
        <img
          ref={imgRef}
          src={src}
          alt={`Thumbnail for ${title}`}
          loading="lazy"
          onLoad={() => setStatus("loaded")}
          onError={() => setStatus("error")}
          className={`h-full w-full object-contain transition duration-500 ${
            status === "loaded" ? "opacity-100" : "opacity-0"
          }`}
        />
      )}
    </div>
  );
};

const BrowsePosts = () => {
  const [posts, setPosts] = useState<IPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(getAuth(), async (user) => {
      setLoading(true);
      setError(null);
      try {
        const token = user ? await user.getIdToken() : null;
        const res = await axios.get<{ posts: IPost[] }>(`${API_URL}/api/posts`, {
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        });
        console.log(res.data.posts);
        setPosts(res.data.posts);
      } catch (err) {
        setError(
          axios.isAxiosError(err)
            ? err.response?.data?.message ?? "Could not load posts."
            : "Something went wrong."
        );
        setPosts([]);
      } finally {
        setLoading(false);
      }
    });
    return unsubscribe;
  }, []);

  return (
    <main className="mx-auto max-w-6xl px-5 pb-16 pt-12">
      <header className="mb-10 text-center">
        <h1 className="mb-2 text-3xl font-bold tracking-tight sm:text-5xl">
          Browse Posts
        </h1>
        <p className="opacity-70">Fresh writing from the community.</p>
      </header>

      {loading && (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="min-h-[190px] animate-pulse rounded-2xl border border-gray-500/25 bg-gray-500/10"
            />
          ))}
        </div>
      )}

      {!loading && error && (
        <p className="py-12 text-center opacity-75">{error}</p>
      )}

      {!loading && !error && posts.length === 0 && (
        <p className="py-12 text-center opacity-75">
          No posts yet. Check back soon.
        </p>
      )}

      {!loading && !error && posts.length > 0 && (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <article
              key={post.id}
              className="group flex flex-col gap-3 rounded-2xl border border-gray-500/25 bg-gray-500/10 p-6 transition duration-200 hover:-translate-y-1 hover:border-gray-500/50 hover:shadow-xl"
            >
              <div className="flex min-h-6 items-center justify-between text-xs opacity-80">
                <time>{formatDate(post.createdAt)}</time>
                {post.label && (
                  <span className="rounded-full bg-gradient-to-br from-amber-300 to-amber-500 px-2.5 py-0.5 text-[0.7rem] font-semibold uppercase tracking-wide text-amber-950">
                    {post.label}
                  </span>
                )}
              </div>

              <Thumbnail src={post.thumbnailURL} title={post.title} />

              <h2 className="break-words text-xl font-semibold leading-snug">
                {post.title}
              </h2>
              <p className="line-clamp-5 break-words leading-relaxed opacity-85">
                {post.content}
              </p>
            </article>
          ))}
        </div>
      )}
    </main>
  );
};

export default BrowsePosts;