// src/hooks/useInfiniteObserver.js
import { useEffect } from "react";

export function useInfiniteObserver(
  ref,
  enabled,
  onIntersect,
  rootMargin = "600px 0px"
) {
  useEffect(() => {
    if (!enabled) return;
    const el = ref.current;
    if (!el) return;

    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) onIntersect?.();
      },
      { rootMargin }
    );

    io.observe(el);
    return () => io.disconnect();
  }, [ref, enabled, onIntersect, rootMargin]);
}
