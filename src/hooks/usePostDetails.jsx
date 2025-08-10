// src/hooks/usePostDetails.js
import { useEffect, useState, useCallback } from "react";
import { useAuth } from "./useAuth";

export function usePostDetails(postId) {
  const { api } = useAuth();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");

  const fetchPost = useCallback(async () => {
    if (!postId) return;
    try {
      setLoading(true);
      setErr("");
      const { data } = await api.get(`/api/posts/${postId}`);
      console.log(data, "data");

      setPost(normalize(data));
    } catch (e) {
      setErr(e?.response?.data?.message || e.message || "Failed to load post");
    } finally {
      setLoading(false);
    }
  }, [api, postId]);

  useEffect(() => {
    fetchPost();
  }, [fetchPost]);

  return { post, loading, err, refetch: fetchPost, setPost };
}

const BASE = import.meta.env.VITE_SERVER_BASE_URL || "http://localhost:3000";
const normalize = (p) => ({
  ...p,
  image: p?.image?.startsWith("http") ? p.image : `${BASE}/${p.image}`,
});
