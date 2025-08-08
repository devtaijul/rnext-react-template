import React from "react";

export const Success = () => {
  return (
    <div className="demo-container">
      <h1 className="demo-title text-2xl font-bold">
        PhotoBooth Success Dialog Examples
      </h1>
      <div className="demo-grid">
        {/* Standard Success Dialog */}
        <div className="demo-card">
          <h2 className="font-semibold mb-4">Standard Success Dialog</h2>
          <div className="dialog">
            <div className="p-8 flex flex-col items-center">
              <div className="success-icon mb-6">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-10 w-10 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-center mb-2">
                Success!
              </h3>
              <p className="text-gray-500 text-center mb-6">
                Your post has been shared successfully.
              </p>
              <button className="primary-button mb-3">Continue</button>
            </div>
          </div>
        </div>
        {/* Account Created Dialog */}
        <div className="demo-card">
          <h2 className="font-semibold mb-4">Account Created Dialog</h2>
          <div className="dialog">
            <div className="p-8 flex flex-col items-center">
              <div className="success-icon mb-6">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-10 w-10 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-center mb-2">
                Account Created
              </h3>
              <p className="text-gray-500 text-center mb-6">
                Your PhotoBooth account has been created successfully.
              </p>
              <button className="primary-button mb-3">Continue to Feed</button>
              <button className="secondary-button">
                Complete Your Profile
              </button>
            </div>
          </div>
        </div>
        {/* Password Changed Dialog */}
        <div className="demo-card">
          <h2 className="font-semibold mb-4">Password Changed Dialog</h2>
          <div className="dialog">
            <div className="p-8 flex flex-col items-center">
              <div
                className="success-icon mb-6"
                style={{ backgroundColor: "#0095f6" }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-10 w-10 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-center mb-2">
                Password Updated
              </h3>
              <p className="text-gray-500 text-center mb-6">
                Your password has been changed successfully. You'll be logged
                out from all other devices.
              </p>
              <button className="primary-button">OK</button>
            </div>
          </div>
        </div>
        {/* Post Saved Dialog */}
        <div className="demo-card">
          <h2 className="font-semibold mb-4">Post Saved Dialog</h2>
          <div className="dialog">
            <div className="p-6 flex flex-col items-center">
              <div className="mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-16 w-16 text-black"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-center mb-1">Saved</h3>
              <p className="text-gray-500 text-center text-sm mb-4">
                Post saved to your collection.
              </p>
              <div className="flex w-full">
                <button className="w-1/2 py-3 border-t border-r border-gray-200 font-semibold text-sm">
                  View Collection
                </button>
                <button className="w-1/2 py-3 border-t border-gray-200 text-blue-500 font-semibold text-sm">
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
        {/* Story Posted Dialog */}
        <div className="demo-card">
          <h2 className="font-semibold mb-4">Story Posted Dialog</h2>
          <div className="dialog">
            <div className="p-8 flex flex-col items-center">
              <div
                className="success-icon mb-6"
                style={{
                  backgroundColor: "#833AB4",
                  backgroundImage:
                    "linear-gradient(45deg, #833AB4, #FD1D1D, #FCAF45)",
                  border: "none",
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-10 w-10 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-center mb-2">
                Story Posted!
              </h3>
              <p className="text-gray-500 text-center mb-6">
                Your story has been shared with your followers.
              </p>
              <div className="flex space-x-3">
                <button className="primary-button px-6">View Story</button>
                <button className="border border-gray-300 text-black px-6 py-1.5 rounded-md font-semibold text-sm">
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
        {/* Simple Toast Dialog */}
        <div className="demo-card">
          <h2 className="font-semibold mb-4">Simple Toast Dialog</h2>
          <div className="dialog" style={{ maxWidth: 300 }}>
            <div className="p-4 flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-green-500 mr-3"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
              <p className="text-sm font-medium">Comment posted successfully</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
