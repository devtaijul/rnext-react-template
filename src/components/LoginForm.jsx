import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import axios from "axios";

export const LoginForm = () => {
  const { auth, setSession } = useAuth();
  const navigate = useNavigate();
  const [showPw, setShowPw] = useState(false);
  console.log("auth", auth);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
  } = useForm({
    defaultValues: { identifier: "", password: "" },
    mode: "onSubmit",
  });

  const onSubmit = async (values) => {
    console.log("values", values);

    const variables = {
      email: values.identifier,
      password: values.password,
    };

    try {
      // API shape ধরে নিচ্ছি: POST /api/auth/login -> { token, user }
      const res = await axios.post(
        `${import.meta.env.VITE_SERVER_BASE_URL}/api/auth/login`,
        JSON.stringify(variables),
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("res", res);

      if (res.status === 200) {
        const { accessToken, refreshToken, user } = res.data;
        if (accessToken && refreshToken) {
          console.log(`Login time auth token: ${accessToken}`);
          setSession({ user, accessToken, refreshToken });

          navigate("/");
        }
      }
    } catch (err) {
      setError("root", {
        type: "server",
        message: err.message || "Login failed",
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      {/* Identifier (phone/username/email) */}
      <div className="mb-3">
        <div className="relative">
          <input
            type="text"
            className="form-input"
            placeholder="Phone number, username, or email"
            aria-label="Phone number, username, or email"
            {...register("identifier", {
              required: "Identifier is required",
              minLength: { value: 3, message: "At least 3 characters" },
            })}
          />
        </div>
        {errors.identifier && (
          <p className="mt-1 text-xs text-red-400">
            {errors.identifier.message}
          </p>
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
            })}
          />
          <button
            type="button"
            onClick={() => setShowPw((s) => !s)}
            className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-500 text-xs"
            tabIndex={-1}
          >
            {showPw ? "Hide" : "Show"}
          </button>
        </div>
        {errors.password && (
          <p className="mt-1 text-xs text-red-400">{errors.password.message}</p>
        )}
      </div>

      {/* Server error */}
      {errors.root?.message && (
        <div className="mb-3 rounded border border-red-500/40 bg-red-500/10 px-3 py-2 text-sm text-red-300">
          {errors.root.message}
        </div>
      )}

      {/* Login */}
      <div className="mb-4">
        <button
          type="submit"
          className="login-button disabled:opacity-50 disabled:pointer-events-none"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Logging in..." : "Log in"}
        </button>
      </div>

      {/* OR */}
      <div className="or-separator">OR</div>

      {/* Social (placeholder) */}
      <div className="mb-4">
        <button
          type="button"
          className="login-button"
          onClick={() =>
            alert("Google login not implemented in assignment scope")
          }
        >
          Log in with Google
        </button>
      </div>
    </form>
  );
};
