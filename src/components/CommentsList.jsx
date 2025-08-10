// src/components/postDetails/CommentsList.jsx
import { CommentItem } from "./CommentItem";

export const CommentsList = ({ comments = [] }) => {
  return (
    <div className="comments-section flex-grow p-3 border-b">
      <h3 className="font-bold pb-4">Comments</h3>
      {comments.length === 0 && (
        <p className="text-sm text-gray-500">No comments yet</p>
      )}
      {comments.map((c) => (
        <CommentItem key={c._id} c={c} />
      ))}
    </div>
  );
};
