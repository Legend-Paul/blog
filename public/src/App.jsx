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
      <Route path="/legend/blogs" element={<Blogs />} />

      <Route
        path="/:author"
        errorElement={<ErrorPage />}
        element={<AuthorLayout />}
      >
        {/* Blogs */}
        <Route index element={<Blogs />} />
        <Route path="blogs" element={<Blogs />} />
        <Route path="blogs/:slug" element={<Blog />} action={blogAction} />

        {/* Account */}
        <Route path="auth/signup" element={<Signup />} action={signupAction} />
        <Route path="auth/login" element={<Login />} action={loginAction} />
        <Route
          path="auth/forgot-password"
          element={<ForgotPassword />}
          action={forgotPasswordAction}
        />
        <Route path="auth/signout" element={<Signout />} />
      </Route>
    </>
  )
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
