import { useState, useEffect } from "react";
import blogService from "./services/blogs";
import Blog from "./components/blog";

function App() {
  const [blogs, setBlogs] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    url: "",
    likes: "",
  });

  useEffect(() => {
    blogService.getAll().then((initialBlogs) => {
      setBlogs(initialBlogs);
    });
  }, []);

  const addBlog = (event) => {
    event.preventDefault();

    blogService.create({ ...formData }).then((returnedBlog) => {
      setBlogs(blogs.concat(returnedBlog));
    });

    setFormData({
      title: "",
      author: "",
      url: "",
      likes: 0,
    });
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <>
      <h1>Blog List</h1>
      <h2>Add a blog:</h2>
      <form onSubmit={addBlog}>
        <label>
          Title:{" "}
          <input
            name="title"
            type="text"
            value={formData.title}
            onChange={handleChange}
          />
        </label>
        <br />

        <label>
          Author:{" "}
          <input
            name="author"
            type="text"
            value={formData.author}
            onChange={handleChange}
          />
        </label>
        <br />

        <label>
          URL:{" "}
          <input
            name="url"
            type="text"
            value={formData.url}
            onChange={handleChange}
          />
        </label>
        <br />

        <label>
          Likes:{" "}
          <input
            name="likes"
            type="number"
            min="0"
            step="1"
            value={formData.likes}
            onChange={handleChange}
          />
        </label>
        <br />

        <button type="submit">Add Blog</button>
      </form>

      <h2>Blogs:</h2>
      <ul>
        {blogs.map((blog) => (
          <Blog key={blog._id} blog={blog} />
        ))}
      </ul>
    </>
  );
}

export default App;
