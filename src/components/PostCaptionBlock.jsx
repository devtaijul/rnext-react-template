// src/components/postDetails/PostCaptionBlock.jsx
export const PostCaptionBlock = ({ caption }) => {
  if (!caption) return null;
  return (
    <div className="p-3">
      <p className="text-sm ">{caption}</p>
    </div>
  );
};
