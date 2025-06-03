const Blog = require("../models/blog");

const initialBlogs = [
  {
    title: "Test",
    author: "Me",
    url: "none.com",
    likes: 13,
  },
  {
    title: "Anotha Test",
    author: "Me",
    url: "nope.com",
    likes: 0,
  },
  {
    title: "lastTest",
    author: "meToo",
    url: "testing_again.com",
    likes: 28,
  },
];

const blogsInDb = async () => {
  const blogs = await Blog.find({});
  return blogs.map((blog) => blog.toJSON());
};

module.exports = { blogsInDb, initialBlogs };
