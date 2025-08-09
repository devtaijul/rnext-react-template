// Home.jsx
import { useRef, useEffect } from "react";
import { useFetchPosts } from "../hooks/useFetchPosts";
import { Post } from "../components/Post";

export const Home = () => {
  const {
    posts,
    loading,
    error,
    hasMore,
    reachedGuestLimit,
    loadMore,
    isGuest,
  } = useFetchPosts({ limit: 10, guestLimit: 4, auto: true });

  console.log("posts", posts);

  // infinite scroll (auth থাকলেই)
  const sentinelRef = useRef(null);
  useEffect(() => {
    if (isGuest || !hasMore) return;
    const el = sentinelRef.current;
    if (!el) return;

    const io = new IntersectionObserver(
      (entries) => entries[0].isIntersecting && loadMore(),
      { rootMargin: "600px 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [hasMore, isGuest, loadMore]);

  return (
    <div className="max-w-6xl mx-auto w-full py-10">
      {error && (
        <div className="mb-4 rounded border border-red-500/40 bg-red-500/10 px-3 py-2 text-sm text-red-300">
          {error}
        </div>
      )}

      <div className="space-y-6">
        {posts.map((p) => (
          <Post key={p._id} post={p} />
        ))}

        {loading && (
          <div className="space-y-6">
            {[...Array(2)].map((_, i) => (
              <div key={i} className="bg-white rounded-lg overflow-hidden">
                <div className="w-full aspect-square bg-gray-200 animate-pulse" />
                <div className="p-3">
                  <div className="h-4 w-2/3 bg-gray-200 animate-pulse rounded mb-2" />
                  <div className="h-4 w-1/2 bg-gray-200 animate-pulse rounded" />
                </div>
              </div>
            ))}
          </div>
        )}

        {!isGuest && hasMore && <div ref={sentinelRef} className="h-8" />}

        {isGuest && reachedGuestLimit && (
          <div className="mt-4 rounded bg-white text-black px-4 py-3 text-sm">
            You’re viewing a preview. <span className="font-medium">Login</span>{" "}
            to see more posts.
          </div>
        )}
      </div>
    </div>
  );
};
