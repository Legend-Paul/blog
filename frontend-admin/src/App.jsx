import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard/Dashboard";
import Blog from "./pages/Blogs/Blogs";
import NewBlog, { Action as newBlogAction } from "./pages/NewBlog/NewBlog";
import "./index.css";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/api/blogs" element={<Blog />} />
        <Route
          path="/api/blogs/new"
          element={<NewBlog />}
          action={newBlogAction}
        />
      </Routes>
    </Router>
  );
}
