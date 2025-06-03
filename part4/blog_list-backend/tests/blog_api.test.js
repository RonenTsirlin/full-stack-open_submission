const assert = require("node:assert");
const { test, after, beforeEach } = require("node:test");
const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");

const helper = require("./test_helper");
const Blog = require("../models/blog");

const api = supertest(app);

beforeEach(async () => {
  await Blog.deleteMany({});
  await Blog.insertMany(helper.initialBlogs);
});

test("all blogs are returned", async () => {
  const response = await api.get("/api/blogs");

  assert.strictEqual(response.body.length, helper.initialBlogs.length);
});

test("blog posts have property named id, not _id", async () => {
  const response = await api.get("/api/blogs");
  const blogs = response.body;

  blogs.forEach((blog) => {
    assert.ok(blog.id, 'Expected blog to have "id" property');
    assert.strictEqual(blog._id, undefined, 'Expected "_id" to be undefined');
  });
});

test("a valid blog can be added ", async () => {
  const newBlog = {
    title: "async/await simplifies making async calls",
    author: "ME",
    url: "asdasd.sdsd.ccom",
    likes: 43,
  };

  await api
    .post("/api/blogs")
    .send(newBlog)
    .expect(201)
    .expect("Content-Type", /application\/json/);

  const blogsAtEnd = await helper.blogsInDb();
  assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length + 1);

  const contents = blogsAtEnd.map((b) => b.title);
  assert(contents.includes("async/await simplifies making async calls"));
});

test("the likes property is not missing from the request", async () => {
  const response = await api.get("/api/blogs");
  const blogs = response.body;

  blogs.forEach((blog) => {
    assert.notStrictEqual(blog.likes, undefined);
  });
});

test("likes default to 0 if missing from request", async () => {
  const newBlog = {
    title: "No likes field",
    author: "Test Author",
    url: "http://nolikes.com",
  };

  const response = await api
    .post("/api/blogs")
    .send(newBlog)
    .expect(201)
    .expect("Content-Type", /application\/json/);

  assert.strictEqual(response.body.likes, 0);
});

test("blog without title is not added", async () => {
  const newBlog = {
    author: "Author Only",
    url: "http://example.com",
    likes: 10,
  };

  const response = await api.post("/api/blogs").send(newBlog).expect(400);
  const blogsAtEnd = await helper.blogsInDb();

  assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length);
});

test("blog without url is not added", async () => {
  const newBlog = {
    title: "Missing URL Blog",
    author: "Author Only",
    likes: 5,
  };

  const response = await api.post("/api/blogs").send(newBlog).expect(400);
  const blogsAtEnd = await helper.blogsInDb();

  assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length);
});

after(async () => {
  await mongoose.connection.close();
});
