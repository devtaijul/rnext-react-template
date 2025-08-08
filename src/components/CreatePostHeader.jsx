import React from "react";

export const CreatePostHeader = () => {
  return (
    <header className="h-14 border-b flex items-center justify-between px-4">
      <button className="p-1">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M10 19l-7-7m0 0l7-7m-7 7h18"
          />
        </svg>
      </button>
      <h1 className="text-base font-semibold">Create new post</h1>
      <button className="text-blue-500 font-semibold">Post</button>
    </header>
  );
};
