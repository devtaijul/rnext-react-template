import React from "react";
import { Layout } from "../components/Layout";

export const Notification = () => {
  return (
    <Layout>
      <div className="notifications-container">
        {/* Header */}
        <header className="sticky top-0 bg-white  z-10">
          <div className="flex items-center justify-between p-4">
            <h1 className="text-lg font-semibold">Notifications</h1>
          </div>
        </header>
        {/* Notifications List */}
        <div className="notifications-list">
          {/* Today Section */}
          <div className="px-4 py-3 border-b border-gray-100">
            <h2 className="text-base font-semibold">Today</h2>
          </div>
          {/* Like Notification */}
          <div className="notification-item flex items-center p-4 border-b border-gray-100">
            <div className="relative">
              <div className="w-11 h-11 rounded-full overflow-hidden mr-3">
                <img
                  src="./assets/users/user-1.png"
                  alt="User avatar"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <div className="flex-1 mr-3">
              <p className="text-sm">
                <span className="font-semibold">john_doe</span> liked your
                photo.
              </p>
              <p className="text-xs text-gray-500 mt-1">2m</p>
            </div>
            <div className="w-11 h-11 rounded overflow-hidden">
              <img
                src="./assets/users/user-1.png"
                alt="Post thumbnail"
                className="post-thumbnail"
              />
            </div>
          </div>
          {/* Comment Notification */}
          <div className="notification-item flex items-center p-4 border-b border-gray-100">
            <div className="relative">
              <div className="w-11 h-11 rounded-full overflow-hidden mr-3">
                <img
                  src="./assets/users/user-1.png"
                  alt="User avatar"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <div className="flex-1 mr-3">
              <p className="text-sm">
                <span className="font-semibold">sarah_wilson</span> commented:
                "Amazing shot! 🔥"
              </p>
              <p className="text-xs text-gray-500 mt-1">5m</p>
            </div>
            <div className="w-11 h-11 rounded overflow-hidden">
              <img
                src="./assets/users/user-1.png"
                alt="Post thumbnail"
                className="post-thumbnail"
              />
            </div>
          </div>
          {/* Multiple Likes Notification */}
          <div className="notification-item flex items-center p-4 border-b border-gray-100">
            <div className="relative mr-3">
              <div className="w-11 h-11 rounded-full overflow-hidden">
                <img
                  src="./assets/users/user-1.png"
                  alt="User avatar"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <div className="flex-1 mr-3">
              <p className="text-sm">
                <span className="font-semibold">emma_jones</span> liked your
                photo.
              </p>
              <p className="text-xs text-gray-500 mt-1">1h</p>
            </div>
            <div className="w-11 h-11 rounded overflow-hidden">
              <img
                src="./assets/users/user-1.png"
                alt="Post thumbnail"
                className="post-thumbnail"
              />
            </div>
          </div>
          {/* Yesterday Section */}
          <div className="px-4 py-3 border-b border-gray-100">
            <h2 className="text-base font-semibold">Yesterday</h2>
          </div>
          {/* Story Like Notification */}
          <div className="notification-item flex items-center p-4 border-b border-gray-100">
            <div className="w-11 h-11 rounded-full overflow-hidden mr-3">
              <img
                src="./assets/users/user-1.png"
                alt="User avatar"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1 mr-3">
              <p className="text-sm">
                <span className="font-semibold">lisa_travel</span> liked your
                story.
              </p>
              <p className="text-xs text-gray-500 mt-1">1d</p>
            </div>
            <div className="w-11 h-11 rounded overflow-hidden border-2 border-gray-300">
              <img
                src="./assets/users/user-1.png"
                alt="Story thumbnail"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          {/* Comment Reply Notification */}
          <div className="notification-item flex items-center p-4 border-b border-gray-100">
            <div className="w-11 h-11 rounded-full overflow-hidden mr-3">
              <img
                src="./assets/users/user-1.png"
                alt="User avatar"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1 mr-3">
              <p className="text-sm">
                <span className="font-semibold">anna_fitness</span> replied to
                your comment: "Thanks for the tip!"
              </p>
              <p className="text-xs text-gray-500 mt-1">1d</p>
            </div>
            <div className="w-11 h-11 rounded overflow-hidden">
              <img
                src="./assets/users/user-1.png"
                alt="Post thumbnail"
                className="post-thumbnail"
              />
            </div>
          </div>
          {/* This Week Section */}
          <div className="px-4 py-3 border-b border-gray-100">
            <h2 className="text-base font-semibold">This Week</h2>
          </div>
          {/* Multiple Comments Notification */}
          <div className="notification-item flex items-center p-4 border-b border-gray-100">
            <div className="relative mr-3">
              <div className="w-11 h-11 rounded-full overflow-hidden">
                <img
                  src="./assets/users/user-1.png"
                  alt="User avatar"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            <div className="flex-1 mr-3">
              <p className="text-sm">
                <span className="font-semibold">tom_artist</span> and{" "}
                <span className="font-semibold">3 others</span> commented on
                your photo.
              </p>
              <p className="text-xs text-gray-500 mt-1">3d</p>
            </div>
            <div className="w-11 h-11 rounded overflow-hidden">
              <img
                src="./assets/users/user-1.png"
                alt="Post thumbnail"
                className="post-thumbnail"
              />
            </div>
          </div>
          {/* Like on Comment Notification */}
          <div className="notification-item flex items-center p-4 border-b border-gray-100">
            <div className="w-11 h-11 rounded-full overflow-hidden mr-3">
              <img
                src="./assets/users/user-1.png"
                alt="User avatar"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1 mr-3">
              <p className="text-sm">
                <span className="font-semibold">maria_design</span> liked your
                comment: "Love this aesthetic!"
              </p>
              <p className="text-xs text-gray-500 mt-1">6d</p>
            </div>
            <div className="w-11 h-11 rounded overflow-hidden">
              <img
                src="./assets/users/user-1.png"
                alt="Post thumbnail"
                className="post-thumbnail"
              />
            </div>
          </div>
          {/* Padding at bottom for scroll */}
          <div className="h-20" />
        </div>
      </div>
    </Layout>
  );
};
