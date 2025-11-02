import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import Dashboard from "./pages/Dashboard/Dashboard";
import Blog from "./pages/Blogs/Blogs";
import NewBlog, { Action as newBlogAction } from "./pages/NewBlog/NewBlog";
import PreviewBlog, {
  EditorPreview,
  Action as previewAction,
} from "./pages/PreviewBlog/PreviewBlog";
import ErrorPage from "./Error/ErrorPage";
import "./index.css";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route errorElement={<ErrorPage />}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/api/blogs" element={<Blog />} />
        <Route
          path="/api/blogs/new"
          element={<NewBlog />}
          action={newBlogAction}
        />
        <Route
          path="/api/blog/edit/:slug"
          element={<NewBlog />}
          action={newBlogAction}
        />
        <Route
          path="/api/blog/:slug"
          element={<PreviewBlog />}
          action={newBlogAction}
        />
        <Route
          path="/api/blogs/new/preview"
          element={<EditorPreview />}
          action={previewAction}
        />
        <Route
          path="/api/blog/edit/:slug/preview"
          element={<EditorPreview />}
          action={previewAction}
        />
      </Route>
    </>
  )
);

export default function App() {
  return <RouterProvider router={router} />;
}
