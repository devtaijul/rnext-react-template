// src/components/post/PostLikes.jsx
import React from "react";

export const PostLikes = ({ likes = [], likesCount = 0 }) => {
  const top = likes.slice(0, 3);

  return (
    <div className="px-3">
      <div className="flex items-center">
        <div className="h-6 flex -space-x-2">
          {top.map((u, i) => (
            <img
              key={u?._id || i}
              src={
                `${import.meta.env.VITE_SERVER_BASE_URL}/${u?.avatar}` ||
                "/assets/users/user-3.png"
              }
              alt={u?.name || "User"}
              className="w-6 h-6 rounded-full object-cover border border-white"
            />
          ))}
        </div>
        <p className="text-sm ml-2">
          <span className="font-semibold">{likesCount} likes</span>
        </p>
      </div>
    </div>
  );
};
