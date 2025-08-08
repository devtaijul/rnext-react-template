import React from "react";
import post1 from "../assets/articles/post-2.jpg";

export const MorePost = () => {
  return (
    <div className="mb-8 mx-auto max-w-5xl">
      <h2 className="text-sm text-gray-500 font-normal mb-4">
        More posts from{" "}
        <span className="font-semibold text-black">Learn with Sumit</span>
      </h2>
      <div className="grid grid-cols-3 gap-1">
        {/* Grid Item 1 */}
        <a href="./post-details.html">
          <div className="relative">
            <img src={post1} alt="Grid image" className="w-full grid-image" />
          </div>
        </a>
        {/* Grid Item 2 */}
        <a href="./post-details.html">
          <div className="relative">
            <img src={post1} alt="Grid image" className="w-full grid-image" />
          </div>
        </a>
        {/* Grid Item 3 */}
        <a href="./post-details.html">
          <div className="relative">
            <img src={post1} alt="Grid image" className="w-full grid-image" />
          </div>
        </a>
        {/* Grid Item 4 */}
        <a href="./post-details.html">
          <div className="relative">
            <img src={post1} alt="Grid image" className="w-full grid-image" />
          </div>
        </a>
        {/* Grid Item 5 */}
        <a href="./post-details.html">
          <div className="relative">
            <img src={post1} alt="Grid image" className="w-full grid-image" />
          </div>
        </a>
        {/* Grid Item 6 */}
        <a href="./post-details.html">
          <div className="relative">
            <img src={post1} alt="Grid image" className="w-full grid-image" />
          </div>
        </a>
      </div>
    </div>
  );
};
