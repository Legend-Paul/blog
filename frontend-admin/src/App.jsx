import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import Dashboard from "./pages/Dashboard/Dashboard";
import Blog from "./pages/Blogs/Blogs";
import NewBlog, { Action as newBlogAction } from "./pages/NewBlog/NewBlog";
import PreviewBlog from "./pages/PreviewBlog/PreviewBlog";
import "./index.css";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Dashboard />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/api/blogs" element={<Blog />} />
      <Route
        path="/api/blogs/new"
        element={<NewBlog />}
        action={newBlogAction}
      />
      <Route
        path="/api/blogs/preview"
        element={<PreviewBlog />}
        action={newBlogAction}
      />
    </>
  )
);

export default function App() {
  return <RouterProvider router={router} />;
}
