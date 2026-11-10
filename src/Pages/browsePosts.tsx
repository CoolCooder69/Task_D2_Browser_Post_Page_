import {  useState } from "react";
import axios from "axios";
import { Skeleton } from "@/components/ui/skeleton";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@/Context/AuthContext";

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

const Thumbnail = ({ src, title }: { src?: string; title: string }) => {
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(!src);

  return (
    <div className="relative aspect-video w-full overflow-hidden rounded-xl border">
      {!loaded && !failed && <Skeleton className="absolute inset-0" />}

      {failed ? (
        <div className="flex h-full items-center justify-center text-xs opacity-50">
          Image unavailable
        </div>
      ) : (
        <img
          src={src}
          alt={`Thumbnail for ${title}`}
          loading="lazy"
          onLoad={() => setLoaded(true)}
          onError={() => setFailed(true)}
          className={`h-full w-full object-contain transition-opacity duration-500 ${
            loaded ? "opacity-100" : "opacity-0"
          }`}
        />
      )}
    </div>
  );
};

const PostCard = ({ post }: { post: IPost }) => (
  <article className="flex flex-col gap-3 rounded-2xl border bg-gray-500/10 p-6 transition hover:-translate-y-1 hover:shadow-xl">
    <div className="flex items-center justify-between text-xs opacity-80">
      <time>{formatDate(post.createdAt)}</time>
      {post.label && (
        <span className="rounded-full bg-amber-400 px-2.5 py-0.5 text-[0.7rem] font-semibold uppercase text-amber-950">
          {post.label}
        </span>
      )}
    </div>

    <Thumbnail src={post.thumbnailURL} title={post.title} />

    <h2 className="wrap-break-word text-xl font-semibold">{post.title}</h2>
    <p className="line-clamp-5 wrap-break-word opacity-85">{post.content}</p>
  </article>
);

const PostCardSkeleton = () => (
  <div className="flex flex-col gap-3 rounded-2xl border p-6">
    <Skeleton className="h-4 w-1/3" />
    <Skeleton className="aspect-video w-full" />
    <Skeleton className="h-6 w-3/4" />
    <Skeleton className="h-4 w-full" />
    <Skeleton className="h-4 w-5/6" />
  </div>
);


const BrowsePosts = () => {
  const { user, loading } = useAuth();
  const postQuery = useQuery({
    queryKey: ["post", user],
    queryFn: async () => {
      const token = user ? await user.getIdToken() : null;
      const res = axios.get<{ posts: IPost[] }>(`${API_URL}/api/posts`, {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });
      return (await res).data?.posts;
    },
    enabled: !loading, 
    staleTime: 300000 // 5 mins 
  });

  const renderContent = () => {
    if (postQuery.isLoading) {
      return [1, 2, 3, 4, 5, 6].map((n) => <PostCardSkeleton key={n} />);
    }
    if (postQuery.isError)
      return <p className="col-span-full py-12 text-center">{postQuery.error.message}</p>;
    if (postQuery.data?.length === 0) {
      return (
        <p className="col-span-full py-12 text-center">
          No posts yet. Check back soon.
        </p>
      );
    }
    return postQuery.data?.map((post) => <PostCard key={post.id} post={post} />);
  };

  return (
    <main className="mx-auto max-w-6xl px-5 pb-16 pt-12">
      <header className="mb-10 text-center">
        <h1 className="mb-2 text-3xl font-bold tracking-tight sm:text-5xl">
          Browse Posts
        </h1>
        <p className="opacity-70">Fresh writing from the community.</p>
      </header>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {renderContent()}
      </div>
    </main>
  );
};

export default BrowsePosts;
