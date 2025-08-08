import React from "react";
import user1 from "../assets/users/user-1.png";
import post1 from "../assets/articles/post-1.jpg";
import { PostGrid } from "../components/PostGrid";

export const Profile = () => {
  return (
    <div className="main-container">
      <div className="profile-container">
        {/* Profile Header */}
        <div className="flex flex-col md:flex-row mb-10">
          {/* Profile Picture */}
          <div className="flex justify-items-end md:justify-start md:w-1/3 mb-6 md:mb-0 relative">
            <div className="w-24 h-24 md:w-36 md:h-36 rounded-full overflow-hidden border border-gray-300 mx-auto">
              <img
                src={user1}
                alt="Profile picture"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          {/* Profile Info */}
          <div className="md:w-2/3">
            {/* Username and Buttons */}
            <div className="flex flex-col sm:flex-row items-center sm:items-start mb-4">
              <h2 className="text-xl font-normal mb-4 sm:mb-0 sm:mr-4">
                Saad Hasan
              </h2>
            </div>
            <div className="flex space-x-2">
              <a
                href="./edit-profile.html"
                className="bg-gray-100 px-4 py-1.5 rounded-md text-sm font-medium"
              >
                Edit profile
              </a>
            </div>
            {/* Stats */}
            <div className="flex justify-center sm:justify-start space-x-8 mb-4 mt-2">
              <div>
                <span className="font-semibold">53</span> posts
              </div>
            </div>
            {/* Bio */}
            <div className="text-sm">
              <p>Pain Demands to be Felt</p>
              <p className="text-blue-900">
                <a
                  href="https://saadh393.github.io"
                  target="_blank"
                  className="flex items-center"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-3 w-3 mr-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
                    />
                  </svg>
                  saadh393.github.io
                </a>
              </p>
            </div>
          </div>
        </div>
        <PostGrid />
      </div>
    </div>
  );
};
