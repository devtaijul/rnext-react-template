// src/components/postDetails/PostHeader.jsx

import { Link } from "react-router-dom";
import { Avatar } from "./Avatar";

export const PostHeader = ({ user = {}, createdAt }) => {
  return (
    <div className="flex items-center justify-between p-3 border-b">
      <Link to={`/profile/${user?.username || user?._id || ""}`}>
        <div className="flex items-center">
          <div className="w-8 h-8 rounded-full overflow-hidden">
            <div className="w-full h-full rounded-full overflow-hidden bg-white">
              <Avatar avatar={user?.avatar} name={user?.name} />
            </div>
          </div>
          <div className="ml-2">
            <div className="flex items-center">
              <span className="font-semibold text-sm">
                {user?.name || "User"}
              </span>
            </div>
            <div className="flex items-center">
              <span className="text-[10px] text-gray-600">
                {formatDate(createdAt)}
              </span>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

function formatDate(iso) {
  if (!iso) return "";
  const d = new Date(iso);
  return d.toLocaleString();
}
