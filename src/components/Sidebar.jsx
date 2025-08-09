import React from "react";
import logo2 from "../assets/logo-2.svg";
import avatar from "../assets/avatar.jpg";
import { navigations } from "../utils/data";
import { Link, useNavigate } from "react-router-dom";
import { HomeIcon } from "../icons/HomeIcon";
import { useAuth } from "../hooks/useAuth";

export const Sidebar = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };
  return (
    <aside className="hidden floating-navbar bg-white  border px-6 py-2 md:flex flex-col">
      <a href="/" className="flex gap-2 items-center font-medium py-4 mb-8">
        <img src={logo2} alt="PhotoBooth" className="h-6 object-contain" />
        <h2 className="text-lg">Photo Booth</h2>
      </a>
      <ul className="space-y-8 flex-1">
        {navigations.map((navigation) => (
          <li key={navigation.id}>
            <Link
              to={navigation.href}
              className="flex flex-row items-center gap-2"
            >
              <HomeIcon />
              <span className="text-sm text-zinc-800">{navigation.name}</span>
            </Link>
          </li>
        ))}
      </ul>
      <div className="flex  justify-between">
        <a href="/profile">
          <div className="flex items-center">
            <div className="w-8 h-8 rounded-full overflow-hidden bg-gray-300">
              <img
                src={avatar}
                alt="User avatar"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="ml-2">
              <span className="font-semibold text-sm">Saad Hasan</span>
              <p className="text-xs text-gray-500  leading-0">@saadh393</p>
            </div>
          </div>
        </a>
        <button title="logout" className="" onClick={handleLogout}>
          <svg
            className="h-4 w-4"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            data-name="Layer 1"
          >
            <path d="m8 0c-3.309 0-6 2.691-6 6s2.691 6 6 6 6-2.691 6-6-2.691-6-6-6zm0 10c-2.206 0-4-1.794-4-4s1.794-4 4-4 4 1.794 4 4-1.794 4-4 4zm-3.5 4h6.5v2h-6.5c-1.379 0-2.5 1.122-2.5 2.5v5.5h-2v-5.5c0-2.481 2.019-4.5 4.5-4.5zm11.5 8h2v2h-2c-1.654 0-3-1.346-3-3v-6c0-1.654 1.346-3 3-3h2v2h-2c-.552 0-1 .449-1 1v6c0 .551.448 1 1 1zm8-3.941c0 .548-.24 1.07-.658 1.432l-2.681 2.362-1.322-1.5 1.535-1.354h-3.874v-2h3.74l-1.401-1.235 1.322-1.5 2.688 2.37c.411.355.651.877.651 1.425z" />
          </svg>
        </button>
      </div>
    </aside>
  );
};
