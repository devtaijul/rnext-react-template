// src/components/Post.jsx
import React from "react";
import { Link } from "react-router-dom";
import { PostActions } from "./PostActions";
import { PostLikes } from "./PostLikes";
import { PostCaption } from "./PostCaption";
import { PostCommentsPreview } from "./PostCommentsPreview";
import { AddComment } from "./AddComment";

export const Post = ({ post, onRequireAuth }) => {
  if (!post) return null;

  return (
    <article className="border-b pb-4 mb-4 max-w-[560px] mx-auto border rounded-md bg-white text-black">
      {/* Header */}
      <div className="flex items-center p-3">
        <Link
          to={`/profile/${post?.user?.username || post?.user?._id || ""}`}
          className="w-8 h-8 rounded-full overflow-hidden flex items-center justify-center"
        >
          <img
            src={
              `${import.meta.env.VITE_SERVER_BASE_URL}/${post?.user?.avatar}` ||
              "/assets/users/user-3.png"
            }
            alt={post?.user?.name || "User"}
            className="w-full h-full object-cover"
          />
        </Link>
        <div className="ml-2">
          <Link
            to={`/profile/${post?.user?.username || post?.user?._id || ""}`}
            className="font-semibold text-sm"
          >
            {post?.user?.name || "Unknown User"}
          </Link>
          <span className="text-gray-500 text-xs">
            {" "}
            • {timeAgo(post?.createdAt)}
          </span>
        </div>
      </div>

      {/* Image */}
      <div className="relative">
        <Link to={`/post/${post?._id}`}>
          <img
            src={post?.image}
            alt="Post"
            className="w-full object-cover max-h-[1000px] bg-gray-100"
          />
        </Link>
      </div>

      {/* Actions (Like/Comment/Share) */}
      <PostActions
        postId={post?._id}
        likesCount={post?.likesCount}
        commentsCount={post?.commentsCount}
        onRequireAuth={onRequireAuth}
      />

      {/* Likes row (avatars + count) */}
      <PostLikes likes={post?.likes} likesCount={post?.likesCount} />

      {/* Caption with Show more/less */}
      <PostCaption
        authorName={post?.user?.name}
        caption={post?.caption}
        maxLen={120}
        postId={post?._id}
      />

      {/* Comments preview (View all X comments) */}
      <PostCommentsPreview
        postId={post?._id}
        commentsCount={post?.commentsCount}
      />

      {/* Add comment (disabled for guest → popup) */}
      <AddComment postId={post?._id} onRequireAuth={onRequireAuth} />
    </article>
  );
};

function timeAgo(iso) {
  if (!iso) return "";
  const delta = (Date.now() - new Date(iso).getTime()) / 1000;
  if (delta < 60) return `${Math.floor(delta)}s`;
  if (delta < 3600) return `${Math.floor(delta / 60)}m`;
  if (delta < 86400) return `${Math.floor(delta / 3600)}h`;
  return `${Math.floor(delta / 86400)}d`;
}
