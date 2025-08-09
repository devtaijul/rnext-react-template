import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../hooks/useAuth";
import { PAGES } from "../config/pages.config";

const BASE_URL =
  import.meta.env.VITE_SERVER_BASE_URL || "http://localhost:3000";

const isEmail = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);

const isPhone = (v) => /^(\+?\d{10,14})$/.test(v.replace(/\s|-/g, "")); // 10–14 digits, + optional

export const RegisterForm = () => {
  const navigate = useNavigate();
  const { setSession, auth } = useAuth();
  const [showPw, setShowPw] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
    watch,
  } = useForm({
    defaultValues: {
      identifier: "", // email or phone
      fullName: "",
      username: "",
      password: "",
    },
    mode: "onSubmit",
  });

  const password = watch("password");

  const onSubmit = async (values) => {
    try {
      const variables = {
        name: values.fullName,
        email: values.identifier,
        password: values.password,
        username: values.username,
      };

      // API shape ধরে নিচ্ছি: POST /auth/signup -> { refreshToken, accessToken?, user? }
      const res = await axios.post(`${BASE_URL}/api/auth/signup`, variables);

      const data = res.data || {};

      // Prefer refresh flow (assignment-friendly)
      if (data.refreshToken) {
        setSession({
          refreshToken: data.refreshToken,
          accessToken: data.accessToken,
          user: data.user,
        });
      } else if (data.accessToken && data.user) {
        // fallback: যদি সাথে access token আসে
        // তুমি চাইলে এখানে AuthContext.setSession ইউটিল ইউজ করতে পারো
        setSession({
          refreshToken: localStorage.getItem("refreshToken") || "",
          accessToken: data.accessToken,
          user: data.user,
        });
      }

      // Register শেষে Edit Profile-এ নাও (assignment requirement)
      navigate(PAGES.EDIT_PROFILE, { replace: true });
    } catch (err) {
      const msg =
        err?.response?.data?.message || err?.message || "Registration failed";
      setError("root", { type: "server", message: msg });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      {/* Email/Phone */}
      <div className="mb-2">
        <div className="relative">
          <input
            type="text"
            className="form-input"
            placeholder="Mobile Number or Email"
            aria-label="Mobile Number or Email"
            {...register("identifier", {
              required: "Email or phone is required",
              validate: (v) =>
                isEmail(v) ||
                isPhone(v) ||
                "Enter a valid email or phone number",
            })}
          />
        </div>
        {errors.identifier && (
          <p className="mt-1 text-xs text-red-400">
            {errors.identifier.message}
          </p>
        )}
      </div>

      {/* Full Name */}
      <div className="mb-2">
        <div className="relative">
          <input
            type="text"
            className="form-input"
            placeholder="Full Name"
            aria-label="Full Name"
            {...register("fullName", {
              required: "Full name is required",
              minLength: { value: 3, message: "At least 3 characters" },
            })}
          />
        </div>
        {errors.fullName && (
          <p className="mt-1 text-xs text-red-400">{errors.fullName.message}</p>
        )}
      </div>

      {/* Username */}
      <div className="mb-2">
        <div className="relative">
          <input
            type="text"
            className="form-input"
            placeholder="Username"
            aria-label="Username"
            {...register("username", {
              required: "Username is required",
              minLength: { value: 3, message: "Min 3 characters" },
              maxLength: { value: 20, message: "Max 20 characters" },
              pattern: {
                value: /^[a-z0-9_]+$/,
                message: "Only lowercase letters, numbers and _",
              },
            })}
          />
        </div>
        {errors.username && (
          <p className="mt-1 text-xs text-red-400">{errors.username.message}</p>
        )}
      </div>

      {/* Password */}
      <div className="mb-3">
        <div className="relative">
          <input
            type={showPw ? "text" : "password"}
            className="form-input"
            placeholder="Password"
            aria-label="Password"
            {...register("password", {
              required: "Password is required",
              minLength: { value: 6, message: "Minimum 6 characters" },
              validate: (v) => {
                // Optional: suggest stronger rules
                const hasNum = /\d/.test(v);
                const hasLetter = /[a-zA-Z]/.test(v);
                if (!hasNum || !hasLetter) {
                  return "Use letters and numbers for a stronger password";
                }
                return true;
              },
            })}
          />
          <button
            type="button"
            className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-500 text-xs"
            onClick={() => setShowPw((s) => !s)}
            tabIndex={-1}
          >
            {showPw ? "Hide" : "Show"}
          </button>
        </div>
        {errors.password && (
          <p className="mt-1 text-xs text-red-400">{errors.password.message}</p>
        )}

        {/* (Optional) Tiny strength hint */}
        {password && (
          <div className="mt-2 flex gap-1">
            {[
              "bg-red-500",
              "bg-orange-500",
              "bg-yellow-400",
              "bg-green-500",
            ].map((c, idx) => (
              <span
                key={idx}
                className={`h-1 flex-1 rounded ${c} ${
                  idx < scorePw(password) ? "" : "opacity-20"
                }`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Server error */}
      {/* errors.root.message will appear if API fails */}
      {/* Using a simple banner */}
      {/* You can replace with your Error-Dialog template */}
      {errors.root?.message && (
        <div className="mb-3 rounded border border-red-500/40 bg-red-500/10 px-3 py-2 text-sm text-red-300">
          {errors.root.message}
        </div>
      )}

      {/* Sign Up */}
      <div className="mb-2">
        <button
          type="submit"
          className="signup-button disabled:opacity-50 disabled:pointer-events-none"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Creating account..." : "Sign up"}
        </button>
      </div>

      {/* OR */}
      <div className="or-separator">OR</div>

      {/* Social (placeholder) */}
      <div className="mb-4">
        <button
          type="button"
          className="signup-button"
          onClick={() =>
            alert("Google signup not implemented in assignment scope")
          }
        >
          Sign up with Google
        </button>
      </div>
    </form>
  );
};

// Very basic password scoring: 0–4
function scorePw(pw) {
  let s = 0;
  if (pw.length >= 6) s++;
  if (pw.length >= 8) s++;
  if (/[A-Z]/.test(pw)) s++;
  if (/\d/.test(pw)) s++;
  return Math.min(s, 4);
}
