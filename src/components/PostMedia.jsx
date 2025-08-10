// src/components/postDetails/PostMedia.jsx
export const PostMedia = ({ src, alt = "Post image" }) => {
  return (
    <div className="w-full md:w-1/2 bg-black flex items-center">
      <img src={src} alt={alt} className="w-full post-image object-contain" />
    </div>
  );
};
