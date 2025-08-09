// src/hooks/useFetchPosts.js
import { useCallback, useEffect, useRef, useState } from "react";
import { useAuth } from "../hooks/useAuth";

const BASE = import.meta.env.VITE_SERVER_BASE_URL || "http://localhost:3000";

const normalizePost = (p) => ({
  ...p,
  image: p?.image?.startsWith("http") ? p.image : `${BASE}/${p.image}`,
  likesCount: p?.likesCount ?? (Array.isArray(p?.likes) ? p.likes.length : 0),
  commentsCount:
    p?.commentsCount ?? (Array.isArray(p?.comments) ? p.comments.length : 0),
  user: p?.user || {},
});

export function useFetchPosts(options = {}) {
  const {
    initialPage = 1,
    limit = 10,
    guestLimit = 4,
    auto = true, // mount হলে অটো-লোড
  } = options;

  const { api, auth } = useAuth();

  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(initialPage);
  const [hasMore, setHasMore] = useState(true);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [reachedGuestLimit, setReachedGuestLimit] = useState(false);

  const inFlight = useRef(false);

  const isGuest = !auth?.accessToken;

  const load = useCallback(async () => {
    if (loading || inFlight.current) return;
    if (!hasMore) return;

    // guest limit reached → hard stop
    if (isGuest && posts.length >= guestLimit) {
      setHasMore(false);
      setReachedGuestLimit(true);
      return;
    }

    try {
      inFlight.current = true;
      setLoading(true);
      setError("");

      const { data } = await api.get("/api/posts", {
        params: { page, limit },
      });

      const list = Array.isArray(data) ? data.map(normalizePost) : [];

      // merge
      const merged = [...posts, ...list];

      if (isGuest) {
        const clamped = merged.slice(0, guestLimit);
        setPosts(clamped);
        setHasMore(false); // guest-এ আর বাড়বে না
        setReachedGuestLimit(true);
      } else {
        setPosts(merged);
        // pagination end check
        if (list.length < limit) setHasMore(false);
        setPage((p) => p + 1);
      }
    } catch (e) {
      setError(
        e?.response?.data?.message || e.message || "Failed to load posts"
      );
    } finally {
      setLoading(false);
      inFlight.current = false;
    }
  }, [api, page, limit, posts, hasMore, isGuest, guestLimit, loading]);

  const loadMore = useCallback(() => {
    if (!loading && hasMore) load();
  }, [load, loading, hasMore]);

  const reload = useCallback(async () => {
    setPosts([]);
    setPage(initialPage);
    setHasMore(true);
    setReachedGuestLimit(false);
    setError("");
    await load(); // first page
  }, [initialPage, load]);

  const reset = useCallback(() => {
    setPosts([]);
    setPage(initialPage);
    setHasMore(true);
    setReachedGuestLimit(false);
    setError("");
  }, [initialPage]);

  // auto-load on mount
  useEffect(() => {
    if (!auto) return;
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // auth change হলে feed reset + প্রথম পেজ থেকে শুরু
  useEffect(() => {
    reset();
    // ছোট delay দিয়ে প্রথম পেজ লোড
    const t = setTimeout(() => load(), 0);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth?.accessToken]);

  return {
    posts,
    loading,
    error,
    hasMore,
    reachedGuestLimit,
    loadMore,
    reload,
    reset,
    page,
    isGuest,
  };
}
