import { useState, useEffect } from "react";
import blogService from "./services/blogs";
import Blog from "./components/blog";

function App() {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    blogService.getAll().then((initialBlogs) => {
      setBlogs(initialBlogs);
    });
  }, []);

  return (
    <>
      <h1>Blog List</h1>
      <ul>
        {blogs.map((blog) => (
          <Blog key={blog._id} blog={blog} />
        ))}
      </ul>
    </>
  );
}

export default App;
