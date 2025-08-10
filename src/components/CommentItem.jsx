// src/components/postDetails/CommentItem.jsx
export const CommentItem = ({ c }) => {
  const user = c?.user || {};
  return (
    <div className="flex mb-4">
      <div className="w-8 h-8 rounded-full overflow-hidden bg-gradient-to-r mr-2">
        <div className="w-full h-full rounded-full overflow-hidden bg-white p-[1px] mr-2">
          <img
            src={user?.avatar || "/assets/users/user-1.png"}
            alt={user?.name || "User"}
            className="w-full h-full object-cover rounded-full"
          />
        </div>
      </div>
      <div className="flex-1">
        <div className="flex items-center">
          <span className="font-semibold text-sm">{user?.name || "User"}</span>
          <span className="text-xs text-gray-500 ml-2">
            {timeAgo(c?.createdAt)}
          </span>
        </div>
        <p className="text-sm mt-2 text-gray-800">{c?.text}</p>
      </div>
    </div>
  );
};

function timeAgo(iso) {
  if (!iso) return "";
  const s = (Date.now() - new Date(iso).getTime()) / 1000;
  if (s < 60) return `${s | 0}s`;
  if (s < 3600) return `${(s / 60) | 0}m`;
  if (s < 86400) return `${(s / 3600) | 0}h`;
  return `${(s / 86400) | 0}d`;
}
