// src/components/postDetails/AddCommentInline.jsx
import { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { Avatar } from "./Avatar";
import { LoginPopup } from "./LoginPopup";

export const AddCommentInline = ({ postId, onAdded }) => {
  const { auth, api } = useAuth();
  const [showLogin, setShowLogin] = useState(false);
  const [text, setText] = useState("");

  const submit = async () => {
    if (!auth?.accessToken) {
      // TODO: show login/register popup
      setShowLogin(true);
      return;
    }
    if (!text.trim()) return;
    try {
      await api.post(`/api/posts/${postId}/comments`, { text: text.trim() });
      setText("");
      onAdded?.();
    } catch (e) {
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
    <div className="p-3 flex items-center">
      <div className="w-8 h-8 rounded-full overflow-hidden bg-gray-300 mr-2">
        <Avatar avatar={auth?.user?.avatar} name={auth?.user?.name} />
      </div>
      <div className="flex-1 flex items-center justify-between">
        <input
          type="text"
          placeholder="Add a comment..."
          className="text-sm w-full outline-none"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={onKeyDown}
        />
        <button onClick={submit} aria-label="Send">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </button>
      </div>
      <LoginPopup open={showLogin} onClose={() => setShowLogin(false)} />
    </div>
  );
};
