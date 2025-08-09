import { Outlet, useLocation } from "react-router-dom";
import { Sidebar } from "../components/Sidebar";

const HIDDEN_ON = new Set(["/login", "/register"]);

export default function AppLayout() {
  const { pathname } = useLocation();
  const showSideNav = !HIDDEN_ON.has(pathname);

  return (
    <div className="min-h-screen flex">
      {showSideNav && <Sidebar />}
      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  );
}
