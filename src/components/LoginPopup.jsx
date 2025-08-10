// src/components/LoginPopup.jsx
import React, { useEffect } from "react";
import { createPortal } from "react-dom";
import logo from "../assets/logo.svg";
import { LoginForm } from "./LoginForm";
import { Link } from "react-router-dom";
import { PAGES } from "../config/pages.config";

export const LoginPopup = ({ open, onClose }) => {
  // lock body scroll
  useEffect(() => {
    if (!open) return;
    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = overflow;
    };
  }, [open]);

  // Esc to close
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && onClose?.();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-[1000] flex items-center justify-center"
      aria-modal="true"
      role="dialog"
    >
      {/* Backdrop */}
      <div
        aria-label="Close login"
        onClick={onClose}
        className="absolute inset-0 bg-black/60"
      />

      {/* Modal card (same look as your page login) */}
      <div className="relative w-[90%] max-w-[420px]">
        <div className="login-container rounded-md">
          {/* Logo */}
          <div className="flex justify-center mb-8">
            <img src={logo} alt="PhotoBooth" className="h-[51px]" />
          </div>

          {/* Card */}
          <div className="bg-white p-6 border border-gray-300 mb-3 rounded-md">
            {/* একই LoginForm reuse করছি */}
            <LoginForm />
          </div>

          {/* Signup footer */}
          <div className="bg-white p-6 border border-gray-300 text-center rounded-md">
            <p className="text-sm">
              Don't have an account?{" "}
              <Link to={PAGES.REGISTER} className="text-blue-500 font-semibold">
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
};
