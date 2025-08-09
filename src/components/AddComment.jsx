// src/components/post/AddComment.jsx
import React, { useState } from "react";
import { useAuth } from "../hooks/useAuth";

export const AddComment = ({ postId, onRequireAuth }) => {
  const { auth, api } = useAuth();
  const [text, setText] = useState("");

  const submit = async () => {
    if (!auth?.accessToken) return onRequireAuth?.();
    if (!text.trim()) return;

    try {
      await api.post(`/api/posts/${postId}/comments`, { text: text.trim() });
      setText("");
      // TODO: optionally: toast + revalidate comments
    } catch (e) {
      // TODO: toast error
      console.error(e);
    }
  };

  const onKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      submit();
    }
  };

  return (
    <div className="px-3 mt-2 flex justify-between items-center">
      <input
        type="text"
        placeholder="Add a comment..."
        className="text-sm w-full outline-none"
        value={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={onKeyDown}
      />
      <button onClick={submit} aria-label="Send comment" className="ml-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 stroke-zinc-600"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M3.714 3.048a.498.498 0 0 0-.683.627l2.843 7.627a2 2 0 0 1 0 1.396l-2.842 7.627a.498.498 0 0 0 .682.627l18-8.5a.5.5 0 0 0 0-.904z" />
          <path d="M6 12h16" />
        </svg>
      </button>
    </div>
  );
};
