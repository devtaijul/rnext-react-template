// src/screen/PostDetails.jsx
import React from "react";
import { useParams } from "react-router-dom";
import { usePostDetails } from "../hooks/usePostDetails";
import { PostMedia } from "../components/PostMedia";
import { PostHeader } from "../components/PostHeader";
import { PostCaptionBlock } from "../components/PostCaptionBlock";
import { CommentsList } from "../components/CommentsList";
import { PostMetaActions } from "../components/PostMetaActions";
import { AddCommentInline } from "../components/AddCommentInline";

export const PostDetails = () => {
  const { postId } = useParams();

  const { post, loading, err, refetch } = usePostDetails(postId);

  console.log("post", post);

  return (
    <main>
      <div className="max-w-6xl w-full py-10 ml-[var(--sidebar-width)] px-4">
        {/* Loading / Error */}
        {loading && (
          <div className="bg-white border rounded-sm overflow-hidden mb-8 mx-auto max-w-5xl">
            <div className="aspect-square bg-gray-100 animate-pulse" />
            <div className="p-4">
              <div className="h-4 w-1/2 bg-gray-200 animate-pulse rounded mb-2" />
              <div className="h-4 w-1/3 bg-gray-200 animate-pulse rounded" />
            </div>
          </div>
        )}
        {err && (
          <div className="bg-red-500/10 border border-red-500/30 text-red-600 px-4 py-3 rounded mb-4">
            {err}
          </div>
        )}

        {/* Post */}
        {post && (
          <div className="bg-white border rounded-sm overflow-hidden mb-8 mx-auto max-w-5xl">
            <div className="flex flex-col md:flex-row">
              {/* Left: media */}
              <PostMedia src={post.image} />

              {/* Right: info */}
              <div className="w-full md:w-1/2 flex flex-col">
                <PostHeader user={post.user} createdAt={post.createdAt} />
                <PostCaptionBlock caption={post.caption} />
                <CommentsList comments={post.comments || []} />
                <PostMetaActions
                  likesCount={post.likesCount}
                  createdAt={post.createdAt}
                />
                <AddCommentInline postId={post._id} onAdded={refetch} />
              </div>
            </div>
          </div>
        )}

        {/* More from this user */}
        {/* {post && <MorePost userId={post.userId} />} */}
      </div>
    </main>
  );
};
