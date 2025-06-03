import { useState, useEffect } from "react";
import blogService from "./services/blogs";
import Blog from "./components/Blog";

function App() {
  const [blogs, setBlogs] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    url: "",
    likes: 0,
  });

  useEffect(() => {
    blogService.getAll().then((initialBlogs) => {
      setBlogs(initialBlogs);
    });
  }, []);

  const addBlog = (event) => {
    event.preventDefault();

    if (
      blogs.find(
        (blog) =>
          blog.author === formData.author && blog.title === formData.title
      )
    ) {
      if (
        window.confirm(
          `${formData.author} already has a blog named ${formData.title}, replace the old number of likes ?`
        )
      ) {
        const blogToUpdate = blogs.find(
          (blog) => blog.author === formData.author && blog.title === blog.title
        );
        const updatedBlog = {
          ...blogToUpdate,
          likes: formData.likes,
        };
        blogService.update(updatedBlog.id, updatedBlog).then((returnedBlog) => {
          setBlogs(
            blogs
              .filter((blog) => blog.id !== returnedBlog.id)
              .concat(returnedBlog)
          );
        });
      }
    } else {
      blogService.create({ ...formData }).then((returnedBlog) => {
        setBlogs(blogs.concat(returnedBlog));
      });

      setFormData({
        title: "",
        author: "",
        url: "",
        likes: 0,
      });
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleDeleteButton = (title, author, id) => {
    if (window.confirm(`Delete ${title} by ${author} ?`)) {
      blogService.deleteBlog(id).then(() =>
        setBlogs(
          blogs.filter((blog) => {
            return blog.id !== id;
          })
        )
      );
    }
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
          <>
            <Blog key={blog._id} blog={blog} />
            <button
              onClick={() =>
                handleDeleteButton(blog.title, blog.author, blog.id)
              }
            >
              delete
            </button>
            <br />
            <br />
          </>
        ))}
      </ul>
    </>
  );
}

export default App;
