import React from "react";
import { Layout } from "../components/Layout";
import post1 from "../assets/articles/post-1.jpg";
import avatar from "../assets/articles/author-1.svg";
import { MorePost } from "./MorePost";

export const PostDetails = () => {
  return (
    <Layout>
      <div className="max-w-6xl w-full py-10 ml-[var(--sidebar-width)] px-4">
        {/* Post Details Section */}
        <div className="bg-white border rounded-sm overflow-hidden mb-8 mx-auto max-w-5xl">
          <div className="flex flex-col md:flex-row">
            {/* Left Side - Post Image */}
            <div className="w-full md:w-1/2 bg-black flex items-center">
              <img src={post1} alt="Post image" className="w-full post-image" />
            </div>
            {/* Right Side - Post Info and Comments */}
            <div className="w-full md:w-1/2 flex flex-col">
              {/* Post Header */}
              <div className="flex items-center justify-between p-3 border-b">
                <a href="./profile.html">
                  <div className="flex items-center">
                    <div className="w-8 h-8 rounded-full overflow-hidden">
                      <div className="w-full h-full rounded-full overflow-hidden bg-white">
                        <img
                          src={avatar}
                          alt="User avatar"
                          className="w-full h-full object-cover rounded-full"
                        />
                      </div>
                    </div>
                    <div className="ml-2">
                      <div className="flex items-center">
                        <span className="font-semibold text-sm">
                          Learn with Sumit
                        </span>
                      </div>
                      <div className="flex items-center">
                        <span className="text-[10px] text-gray-600">
                          June 9, 2025 08:00 PM
                        </span>
                      </div>
                    </div>
                  </div>
                </a>
              </div>
              <div className="p-3">
                <p className="text-sm ">
                  ডকুমেন্টেশন থেকে রিয়্যাক্ট ও নেক্সট জে.এস-এর মৌলিক ও আবশ্যিক
                  বিষয়সমূহ বুঝার পাশাপাশি এই কোর্সের প্রজেক্ট ভিত্তিক শেখানোর
                  পদ্ধতি আপনাকে একজন দক্ষ রিয়্যাক্ট ফ্রন্ট-এন্ড ডেভেলপার হয়ে
                  উঠতে সাহায্য করবে বলে আমাদের বিশ্বাস।
                </p>
              </div>
              {/* Comments Section */}
              <div className="comments-section flex-grow p-3 border-b">
                {/* Post Owner Comment */}
                <h3 className="font-bold pb-4">Comments</h3>
                {/* Comment One */}
                <div className="flex mb-4">
                  <div className="w-8 h-8 rounded-full overflow-hidden bg-gradient-to-r  mr-2 ">
                    <div className="w-full h-full rounded-full overflow-hidden bg-white p-[1px] mr-2">
                      <img
                        src={avatar}
                        alt="Saad Hasan"
                        className="w-full h-full object-cover rounded-full"
                      />
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center">
                      <span className="font-semibold text-sm">Saad Hasan</span>
                      <span className="text-xs text-gray-500 ml-2">3h</span>
                    </div>
                    <p className="text-sm mt-2 text-gray-800">
                      Tucked away in Raipur, this thoughtfully designed
                      multigenerational home by Studio Jane Designs is a study
                      in quiet sophistication and mindful living. Aptly named
                      Silk Route, the residence is as serene and introspective
                      as it is welcoming—a space crafted for both intimate
                      reflection and joyful gatherings.
                    </p>
                  </div>
                </div>
                {/* Comment Two */}
                <div className="flex mb-4">
                  <div className="w-8 h-8 rounded-full overflow-hidden bg-gradient-to-r  mr-2 ">
                    <div className="w-full h-full rounded-full overflow-hidden bg-white p-[1px] mr-2">
                      <img
                        src={avatar}
                        alt="Saad Hasan"
                        className="w-full h-full object-cover rounded-full"
                      />
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center">
                      <span className="font-semibold text-sm">Saad Hasan</span>
                      <span className="text-xs text-gray-500 ml-2">3h</span>
                    </div>
                    <p className="text-sm mt-2 text-gray-800">
                      Tucked away in Raipur, this thoughtfully designed
                      multigenerational home by Studio Jane Designs is a study
                      in quiet sophistication and mindful living. Aptly named
                      Silk Route, the residence is as serene and introspective
                      as it is welcoming—a space crafted for both intimate
                      reflection and joyful gatherings.
                    </p>
                  </div>
                </div>
                {/* Comment Three */}
                <div className="flex mb-4">
                  <div className="w-8 h-8 rounded-full overflow-hidden bg-gradient-to-r  mr-2 ">
                    <div className="w-full h-full rounded-full overflow-hidden bg-white p-[1px] mr-2">
                      <img
                        src={avatar}
                        alt="Saad Hasan"
                        className="w-full h-full object-cover rounded-full"
                      />
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center">
                      <span className="font-semibold text-sm">Saad Hasan</span>
                      <span className="text-xs text-gray-500 ml-2">3h</span>
                    </div>
                    <p className="text-sm mt-2 text-gray-800">
                      Tucked away in Raipur, this thoughtfully designed
                      multigenerational home by Studio Jane Designs is a study
                      in quiet sophistication and mindful living. Aptly named
                      Silk Route, the residence is as serene and introspective
                      as it is welcoming—a space crafted for both intimate
                      reflection and joyful gatherings.
                    </p>
                  </div>
                </div>
              </div>
              {/* Post Actions */}
              <div className="p-3 border-b">
                <div className="flex justify-between mb-2">
                  <div className="flex space-x-4">
                    <button>
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
                          d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                        />
                      </svg>
                    </button>
                    <button>
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
                          d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                        />
                      </svg>
                    </button>
                    <button>
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
                          d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
                {/* Likes */}
                <div className="mb-1">
                  <p className="text-sm font-semibold">42 likes</p>
                </div>
                {/* Post Time */}
                <div className="mb-2">
                  <p className="text-xs text-gray-500">3 hours ago</p>
                </div>
              </div>
              {/* Add Comment */}
              <div className="p-3 flex items-center">
                <div className="w-8 h-8 rounded-full overflow-hidden bg-gray-300 mr-2">
                  <img
                    src={avatar}
                    alt="User avatar"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 flex items-center justify-between">
                  <input
                    type="text"
                    placeholder="Add a comment..."
                    className="text-sm w-full outline-none"
                  />
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-gray-400"
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
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* More Posts Section */}
        <MorePost />
      </div>
    </Layout>
  );
};
