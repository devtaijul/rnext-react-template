// src/screen/CreatePost.jsx
import React, { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import upload_preview from "../assets/users/user-1.png";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { CreatePostAdditionalOptions } from "../components/CreatePostAdditionalOptions";
import toast from "react-hot-toast";

const CAPTION_MAX = 2200; // Instagram-like

export const CreatePost = () => {
  const { api, auth } = useAuth();
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isValid },
    setError,
    clearErrors,
    watch,
    setValue,
    reset,
  } = useForm({
    mode: "onChange",
    defaultValues: {
      caption: "",
      image: null,
    },
  });

  // preview state
  const [preview, setPreview] = useState(null);
  const caption = watch("caption") || "";
  const imgList = watch("image"); // FileList or null
  const selectedFile = imgList?.[0] || null;

  const onPickFile = () => {
    if (fileInputRef.current) fileInputRef.current.click();
  };

  const onFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) {
      setPreview("");
      setValue("image", null);
      return;
    }
    // validate type & size (optional size ≤ 5MB)
    if (!file.type.startsWith("image/")) {
      toast.error("Only image files are allowed");
      setPreview("");
      setValue("image", null);
      return;
    }
    const maxMB = 5;
    if (file.size > maxMB * 1024 * 1024) {
      toast.error(`Max file size ${maxMB}MB`);
      setPreview("");
      setValue("image", null);
      return;
    }
    clearErrors("image");
    setPreview(URL.createObjectURL(file));
  };

  const onRemoveImage = () => {
    setPreview("");
    setValue("image", null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const onSubmit = async (values) => {
    // hard guard
    if (!values.image?.[0]) {
      toast.error("Image is required");
      return;
    }
    try {
      const fd = new FormData();
      fd.append("caption", (values.caption || "").trim());
      fd.append("image", values.image[0]);

      await api.post("/api/posts", fd, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      // success → reset & go home
      reset();
      setPreview(upload_preview);
      navigate("/");
      // TODO: optional toast success
    } catch (err) {
      const msg =
        err?.response?.data?.message || err?.message || "Failed to create post";
      setError("root", { type: "server", message: msg });
    }
  };

  return (
    <main>
      {/* Header */}
      <header className="h-14 border-b flex items-center justify-between px-4 bg-white">
        <button className="p-1" onClick={() => navigate(-1)} aria-label="Back">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
        </button>
        <h1 className="text-base font-semibold">Create new post</h1>
        <button
          form="create-post-form"
          type="submit"
          className="text-blue-500 font-semibold disabled:opacity-50"
          disabled={!auth?.accessToken || isSubmitting || !isValid}
        >
          {isSubmitting ? "Posting..." : "Post"}
        </button>
      </header>

      <form id="create-post-form" onSubmit={handleSubmit(onSubmit)}>
        <div className="upload-container flex flex-col md:flex-row">
          {/* Left: Image Preview */}
          <div className="w-full md:w-1/2 bg-gray-100 flex items-center justify-center relative min-h-[320px]">
            {preview && (
              <img
                src={preview}
                alt="Upload preview"
                className="image-preview object-contain max-h-[80vh]"
              />
            )}
            {!selectedFile ? (
              <div className="absolute bottom-1/2 left-1/2 -translate-x-1/2">
                <button
                  type="button"
                  onClick={onPickFile}
                  className="bg-black bg-opacity-75 text-white text-sm py-1 px-3 rounded-md"
                >
                  Click to select an image
                </button>
              </div>
            ) : (
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                <button
                  type="button"
                  onClick={onPickFile}
                  className="bg-black/80 text-white text-xs py-1 px-3 rounded-md"
                >
                  Change
                </button>
                <button
                  type="button"
                  onClick={onRemoveImage}
                  className="bg-red-600 text-white text-xs py-1 px-3 rounded-md"
                >
                  Remove
                </button>
              </div>
            )}

            <input
              type="file"
              accept="image/*"
              className="hidden"
              {...register("image", {
                required: "Image is required",
                onChange: onFileChange,
              })}
              ref={(el) => {
                // react-hook-form এর ref
                register("image").ref(el);
                // তোমার own ref
                fileInputRef.current = el;
              }}
            />
            {errors.image && (
              <div className="absolute top-3 left-1/2 -translate-x-1/2 bg-red-500/90 text-white text-xs px-2 py-1 rounded">
                {errors.image.message}
              </div>
            )}
          </div>

          {/* Right: Post details */}
          <div className="w-full md:w-1/2 bg-white flex flex-col">
            {/* User Info */}
            <div className="flex items-center p-4 border-b">
              <div className="w-8 h-8 rounded-full overflow-hidden bg-gray-300">
                <img
                  src={
                    auth?.user?.avatar ? `${auth.user.avatar}` : upload_preview
                  }
                  alt="User avatar"
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="ml-3 font-semibold text-sm">
                {auth?.user?.name || "You"}
              </span>
            </div>

            {/* Caption */}
            <div className="p-4 border-b flex-grow">
              <div className="mb-2">
                <p className="font-medium text-base mb-2">Caption</p>
                <textarea
                  className="w-full caption-input border-0 outline-none text-sm"
                  placeholder="Write a caption..."
                  maxLength={CAPTION_MAX}
                  {...register("caption", {
                    required: "Caption is required",
                    maxLength: {
                      value: CAPTION_MAX,
                      message: `Max ${CAPTION_MAX} characters`,
                    },
                    setValueAs: (v) => (v ?? "").trimStart(), // UX: leading spaces কাটে
                  })}
                />
              </div>

              {/* Helper + count */}
              <div className="flex justify-between items-center">
                <button
                  className="text-gray-400"
                  type="button"
                  title="Tips"
                  onClick={() => {
                    // optional helper
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
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
                <span
                  className={`text-xs ${
                    caption.length > CAPTION_MAX - 50
                      ? "text-orange-500"
                      : "text-gray-400"
                  }`}
                >
                  {caption.length}/{CAPTION_MAX}
                </span>
              </div>

              {errors.caption && (
                <p className="text-xs text-red-500 mt-1">
                  {errors.caption.message}
                </p>
              )}
            </div>

            {/* Additional Options (kept as-is) */}
            <CreatePostAdditionalOptions />
          </div>
        </div>

        {/* Root-level server error */}
        {errors.root?.message && (
          <div className="max-w-3xl mx-auto mt-3 rounded border border-red-500/30 bg-red-500/10 px-3 py-2 text-sm text-red-600">
            {errors.root.message}
          </div>
        )}
      </form>
    </main>
  );
};
