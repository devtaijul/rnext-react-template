import { Routes, Route } from "react-router-dom";
import PrivateRoutes from "./routes/PrivateRoutes";
import AppLayout from "./layout/AppLayout"; // ⬅️ sidebar wrapper (login/register বাদে দেখাবে)

import { Home } from "./screen/Home";
import { Login } from "./screen/Login";
import { Register } from "./screen/Register";
import { Profile } from "./screen/Profile";
import { PostDetails } from "./screen/PostDetails";
import { EditProfile } from "./screen/EditProfile";
import { Notification } from "./screen/Notification";
import { CreatePost } from "./screen/CreatePost";
import NotFoundPage from "./screen/NotFoundPage";

function App() {
  return (
    <Routes>
      {/* Auth pages — sidebar hidden */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Everything else under layout (sidebar visible) */}
      <Route element={<AppLayout />}>
        {/* Public routes */}
        <Route path="/" element={<Home />} />
        <Route path="/post/:postId" element={<PostDetails />} />
        <Route path="/profile/:username" element={<Profile />} />

        {/* Private routes */}
        <Route element={<PrivateRoutes />}>
          <Route path="/edit-profile" element={<EditProfile />} />
          <Route path="/notifications" element={<Notification />} />
          <Route path="/create" element={<CreatePost />} />
          <Route path="/me" element={<Profile />} />{" "}
          {/* অথবা আলাদা MyProfile */}
        </Route>

        {/* 404 */}
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}

export default App;
