// hooks/useMe.js
import { useState, useEffect } from "react";
import { useAuth } from "./useAuth";

export const useMe = (auto = true) => {
  const { auth, fetchMe } = useAuth();
  const [loading, setLoading] = useState(!!auto);
  const [error, setError] = useState("");

  const load = async () => {
    try {
      setLoading(true);
      setError("");
      const data = await fetchMe(); // or: const { data } = await api.get("/users/me")
      console.log("data", data);

      return data;
    } catch (e) {
      setError(
        e?.response?.data?.message || e.message || "Failed to load profile"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (auto && auth.accessToken) load();
  }, [auto, auth.accessToken]);

  return { user: auth.user, loading, error, reload: load };
};
