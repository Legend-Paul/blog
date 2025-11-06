import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import Blogs from "./pages/Blogs/Blogs";
import Blog from "./pages/Blog/Blog";
import "./globalStyles/index.css";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/:author/blogs" element={<Blogs />} />
      <Route path="/:author/blogs/:slug" element={<Blog />} />
    </>
  )
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
