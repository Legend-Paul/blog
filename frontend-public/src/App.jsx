import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import Blogs from "./pages/Blogs/Blogs";
import "./globalStyles/index.css";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/:author/blogs" element={<Blogs />} />
    </>
  )
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
