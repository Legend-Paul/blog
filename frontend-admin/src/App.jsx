import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import Dashboard from "./pages/Dashboard/Dashboard";
import Blog from "./pages/Blogs/Blogs";
import NewBlog from "./pages/NewBlog/NewBlog";
import PreviewBlog, { EditorPreview } from "./pages/PreviewBlog/PreviewBlog";
import ErrorPage from "./Error/ErrorPage";
import newBlogAction from "./utils/CreateBlog";
import updateBlogAction from "./utils/UpdateBlog";
import Signup, { Action as signupAction } from "./pages/Signup/Signup";
import Login, { Action as loginAction } from "./pages/Login/Login";
import ForgotPassword, {
  Action as forgotPasswordAction,
} from "./pages/ForgotPassword/ForgotPassword";
import UpdateUser, {
  Action as updateUserAction,
} from "./pages/UpdateUser/UpdateUser";
import Signout from "./pages/Signout/Signout";
import "./globalStyles/index.css";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route errorElement={<ErrorPage />}>
        <Route path="/">
          <Route index element={<Dashboard />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="api/blogs" element={<Blog />} />

          {/* Editor Route */}
          <Route
            path="api/blogs/new"
            element={<NewBlog />}
            action={newBlogAction}
          />
          <Route
            path="api/blog/edit/:slug"
            element={<NewBlog />}
            action={updateBlogAction}
          />
          {/* Prveiew Route */}
          <Route
            path="api/blog/edit/:slug/preview"
            element={<EditorPreview />}
            action={updateBlogAction}
          />

          <Route
            path="api/blogs/new/preview"
            element={<EditorPreview />}
            action={newBlogAction}
          />

          <Route path="api/blog/:slug" element={<PreviewBlog />} />

          <Route
            path="auth/user/update"
            element={<UpdateUser />}
            action={updateUserAction}
          />
          <Route path="/auth/signout" element={<Signout />} />
        </Route>
        {/* auth */}
        <Route path="/auth/signup" action={signupAction} element={<Signup />} />
        <Route path="/auth/login" element={<Login />} action={loginAction} />
        <Route
          path="/auth/forgot-password"
          element={<ForgotPassword />}
          action={forgotPasswordAction}
        />
      </Route>
    </>
  )
);

export default function App() {
  return <RouterProvider router={router} />;
}
