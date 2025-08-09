import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import AppLayout from "../layout/AppLayout";

const PrivateRoutes = () => {
  const { auth } = useAuth();
  const location = useLocation();

  // still restoring session → কিছুই redirect কোরো না, শুধু একটা লোডার দেখাও
  if (!auth.hydrated) {
    return (
      <div className="min-h-[60vh] grid place-items-center text-zinc-300">
        <div className="animate-pulse">Checking session…</div>
      </div>
    );
  }

  // hydrated হয়ে গেছে, এখন সিদ্ধান্ত নাও
  if (auth.accessToken) {
    return (
      <AppLayout>
        <Outlet />
      </AppLayout>
    );
  }

  // not authenticated → login page, সাথে from state পাঠাও যাতে পরে back করা যায়
  return <Navigate to="/login" replace state={{ from: location }} />;
};

export default PrivateRoutes;
