// src/components/post/PostCaption.jsx
import React, { useState } from "react";

export const PostCaption = ({
  authorName = "",
  caption = "",
  maxLen = 120,
  postId,
}) => {
  const [expand, setExpand] = useState(false);
  const isLong = (caption || "").length > maxLen;
  const shown = expand ? caption : (caption || "").slice(0, maxLen);

  return (
    <div className="px-3 mt-2">
      <p className="text-sm">
        {authorName && <span className="font-semibold">{authorName}</span>}{" "}
        <span className="caption-text">{shown}</span>
        {isLong && !expand && <span className="text-gray-500">… </span>}
        {isLong && (
          <button
            onClick={() => setExpand((s) => !s)}
            className="text-gray-500 text-sm"
          >
            {expand ? "less" : "more"}
          </button>
        )}
      </p>
    </div>
  );
};
