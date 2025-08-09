// src/components/post/PostCommentsPreview.jsx
import React from "react";
import { Link } from "react-router-dom";

export const PostCommentsPreview = ({ postId, commentsCount = 0 }) => {
  if (!commentsCount) return null;
  return (
    <div className="px-3 mt-1">
      <Link to={`/post/${postId}`} className="text-gray-500 text-sm">
        View all {commentsCount} {commentsCount > 1 ? "comments" : "comment"}
      </Link>
    </div>
  );
};
