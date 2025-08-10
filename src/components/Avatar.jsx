import React from "react";
import avatar_placeholder from "../assets/user_placeholder.jpg";

export const Avatar = ({ avatar, name }) => {
  return (
    <img
      src={
        avatar
          ? `${import.meta.env.VITE_SERVER_BASE_URL}/${avatar}`
          : avatar_placeholder
      }
      alt={name || "User avatar"}
      className="w-full h-full object-cover rounded-full"
    />
  );
};
