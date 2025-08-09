import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { AuthContext } from "../context";

const BASE_URL =
  import.meta.env.VITE_SERVER_BASE_URL || "http://localhost:3000";

// axios base instance
const api = axios.create({
  baseURL: BASE_URL,
});

const initialAuth = {
  accessToken: "",
  refreshToken: "",
  user: null,
  loading: false,
  error: "",
  hydrated: false,
};
const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(initialAuth);

  // --- helper: session setter ---
  const setSession = ({ accessToken, refreshToken, user }) => {
    // set axios default immediately
    if (accessToken) {
      api.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
    } else {
      delete api.defaults.headers.common.Authorization;
    }
    setAuth((prev) => ({
      ...prev,
      accessToken: accessToken || "",
      refreshToken: refreshToken ?? prev.refreshToken,
      user: user ?? prev.user,
      loading: false,
      error: "",
    }));
    if (refreshToken) {
      localStorage.setItem("refreshToken", refreshToken);
    }
  };

  // --- login using refreshToken: save -> exchange -> set state ---
  const loginWithRefreshToken = async (incomingRefreshToken) => {
    try {
      setAuth((p) => ({ ...p, loading: true, error: "" }));
      // 1) save refresh token locally (so reload e thake)
      localStorage.setItem("refreshToken", incomingRefreshToken);

      // 2) exchange for fresh access token + user
      const res = await axios.post(`${BASE_URL}/api/auth/refresh-token`, {
        refreshToken: incomingRefreshToken,
      });

      const data = res.data || {};
      setSession({
        accessToken: data.accessToken,
        refreshToken: data.refreshToken || incomingRefreshToken,
        user: data.user,
      });
      return data;
    } catch (err) {
      const msg =
        err?.response?.data?.message ||
        err?.message ||
        "Failed to login with refresh token";
      setAuth((p) => ({ ...p, loading: false, error: msg }));
      throw err;
    }
  };

  // --- logout ---
  const logout = () => {
    localStorage.removeItem("refreshToken");
    setAuth(initialAuth);
  };

  // --- boot: try restore from localStorage ---
  useEffect(() => {
    const saved = localStorage.getItem("refreshToken");

    const restore = async () => {
      try {
        if (saved) {
          // silent login with saved refresh token
          await loginWithRefreshToken(saved);
        }
      } catch (e) {
        console.log(e);

        // ignore; will stay logged out
      } finally {
        setAuth((p) => ({ ...p, hydrated: true })); // 👈 mark ready
      }
    };

    restore();
  }, []);

  // --- axios interceptor: attach Bearer + auto refresh on 401 ---
  useEffect(() => {
    const reqId = api.interceptors.request.use((config) => {
      if (auth.accessToken) {
        config.headers.Authorization = `Bearer ${auth.accessToken}`;
      }
      return config;
    });

    let isRefreshing = false;
    let pending = [];

    const processQueue = (error, token = null) => {
      pending.forEach((p) => {
        if (error) p.reject(error);
        else p.resolve(token);
      });
      pending = [];
    };

    const resId = api.interceptors.response.use(
      (res) => res,
      async (error) => {
        const original = error.config;

        // if unauthorized and we have a refresh token, try refresh once
        if (
          error?.response?.status === 401 &&
          !original._retry &&
          localStorage.getItem("refreshToken")
        ) {
          original._retry = true;

          if (isRefreshing) {
            // wait until current refresh finishes
            return new Promise((resolve, reject) => {
              pending.push({
                resolve: (token) => {
                  original.headers.Authorization = `Bearer ${token}`;
                  resolve(api(original));
                },
                reject,
              });
            });
          }

          isRefreshing = true;
          const rt = localStorage.getItem("refreshToken");
          try {
            const r = await axios.post(`${BASE_URL}/api/auth/refresh-token`, {
              refreshToken: rt,
            });
            const { accessToken, refreshToken, user } = r.data || {};
            setSession({ accessToken, refreshToken, user });

            processQueue(null, accessToken);
            original.headers.Authorization = `Bearer ${accessToken}`;
            return api(original);
          } catch (e) {
            processQueue(e, null);
            logout();
            return Promise.reject(e);
          } finally {
            isRefreshing = false;
          }
        }

        return Promise.reject(error);
      }
    );

    return () => {
      api.interceptors.request.eject(reqId);
      api.interceptors.response.eject(resId);
    };
  }, [auth.accessToken]); // rebind when token changes

  // --- /users/me fetcher
  const fetchMe = async () => {
    if (!auth?.accessToken) return null; // token না থাকলে কিছু করো না
    const { data } = await api.get("/api/users/me"); // <-- Bearer auto from intercept
    setAuth((p) => ({ ...p, user: data }));
    return data;
  };

  const value = useMemo(
    () => ({
      auth,
      setAuth,
      setSession,
      loginWithRefreshToken,
      logout,
      fetchMe,
      api, // export axios instance with interceptors
    }),
    [auth]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
