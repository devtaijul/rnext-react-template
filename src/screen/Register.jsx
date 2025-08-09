import React from "react";
import logo2 from "../assets/logo-2.svg";
import { PAGES } from "../config/pages.config";
import { RegisterForm } from "../components/RegisterForm";

export const Register = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center py-8 sm:px-6 lg:px-8">
      <div className="signup-container">
        {/* PhotoBooth Logo */}
        <div className="flex justify-center mb-4">
          <img src={logo2} alt="PhotoBooth" className="h-[51px]" />
        </div>
        {/* Sign Up Form */}
        <div className="bg-white p-6 border border-gray-300 mb-3">
          {/* Headline */}
          <h2 className="text-center font-semibold text-gray-500 text-lg mb-4">
            Sign up to see photos and videos from your friends.
          </h2>
          <RegisterForm />
        </div>
        {/* Login Box */}
        <div className="bg-white p-6 border border-gray-300 text-center mb-4 rounded-md">
          <p className="text-sm">
            Have an account?{" "}
            <a href={PAGES.LOGIN} className="text-blue-500 font-semibold">
              Log in
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};
