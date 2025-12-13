import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
  Outlet,
} from "react-router-dom";
import Blogs from "./pages/Blogs/Blogs";
import Blog, { Action as blogAction } from "./pages/Blog/Blog";
import Signup, { Action as signupAction } from "./pages/Signup/Signup";
import Login, { Action as loginAction } from "./pages/Login/Login";
import Signout from "./pages/Signout/Signout";
import ForgotPassword, {
  Action as forgotPasswordAction,
} from "./pages/ForgotPassword/ForgotPassword";
import ErrorPage from "./Error/ErrorPage";
import "./globalStyles/index.css";

// Layout component that renders child routes
function AuthorLayout() {
  return <Outlet />;
}

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      {/* Blogs */}
      <Route index element={<Blogs />} errorElement={<ErrorPage />} />
      <Route
        path="/:author/blogs"
        element={<Blogs />}
        errorElement={<ErrorPage />}
      />
      <Route
        path="/:author/blogs/:slug"
        element={<Blog />}
        action={blogAction}
        errorElement={<ErrorPage />}
      />

      {/* Account */}
      <Route
        path="/:author/auth/signup"
        element={<Signup />}
        action={signupAction}
        errorElement={<ErrorPage />}
      />
      <Route
        path="/:author/auth/login"
        element={<Login />}
        action={loginAction}
        errorElement={<ErrorPage />}
      />
      <Route
        path="/:author/auth/forgot-password"
        element={<ForgotPassword />}
        action={forgotPasswordAction}
      />
      <Route
        path="/:author/auth/signout"
        element={<Signout />}
        errorElement={<ErrorPage />}
      />
    </>
  )
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
