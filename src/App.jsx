import { Route, Routes } from "react-router-dom";
import PrivateRoutes from "./routes/PrivateRoutes";
import { Home } from "./screen/Home";
import { Login } from "./screen/Login";
import { Profile } from "./screen/Profile";
import { Register } from "./screen/Register";
import NotFoundPage from "./screen/NotFoundPage";

function App() {
  return (
    <>
      <Routes>
        <Route element={<PrivateRoutes />}>
          <Route element={<Home />} path="/" exact />
          <Route element={<Profile />} path="/me" />
        </Route>
        <Route element={<Login />} path="/login" />
        <Route element={<Register />} path="/register" />
        <Route element={<NotFoundPage />} path="*" />
      </Routes>
    </>
  );
}

export default App;
