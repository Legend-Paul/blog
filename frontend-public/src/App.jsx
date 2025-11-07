import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import Blogs from "./pages/Blogs/Blogs";
import Blog from "./pages/Blog/Blog";
import Signup, { Action as signupAction } from "./pages/Signup/Signup";
import Login, { Action as loginAction } from "./pages/Login/Login";
import "./globalStyles/index.css";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      {/* Account */}
      <Route
        path="/:author/auth/signup"
        element={<Signup />}
        action={signupAction}
      />
      <Route
        path="/:author/auth/login"
        element={<Login />}
        action={loginAction}
      />

      <Route path="/:author/blogs" element={<Blogs />} />
      <Route path="/:author/blogs/:slug" element={<Blog />} />
    </>
  )
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
