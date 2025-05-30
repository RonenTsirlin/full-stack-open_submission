const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  return blogs.reduce((sum, blog) => sum + blog.likes, 0);
};

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) return null;

  // max[0] = max value, max[1] = index of that value.
  let max = [0, 0];
  blogs.forEach((blog, index) => {
    if (blog.likes > max[0]) {
      max[0] = blog.likes;
      max[1] = index;
    }
  });
  return blogs[max[1]];
};

const mostBlogs = (blogs) => {
  const blogCountByAuthor = {};

  blogs.forEach((blog) => {
    if (blogCountByAuthor[blog.author]) blogCountByAuthor[blog.author]++;
    else blogCountByAuthor[blog.author] = 1;
  });

  let maxKey = null;
  let maxValue = 0;

  for (const key in blogCountByAuthor) {
    if (blogCountByAuthor[key] > maxValue) {
      maxValue = blogCountByAuthor[key];
      maxKey = key;
    }
  }

  return { author: maxKey, blogs: maxValue };
};

const mostLikes = (blogs) => {
  const blogCountByAuthor = {};

  blogs.forEach((blog) => {
    if (blogCountByAuthor[blog.author])
      blogCountByAuthor[blog.author] += blog.likes;
    else blogCountByAuthor[blog.author] = blog.likes;
  });

  let maxKey = null;
  let maxValue = 0;

  for (const key in blogCountByAuthor) {
    if (blogCountByAuthor[key] > maxValue) {
      maxValue = blogCountByAuthor[key];
      maxKey = key;
    }
  }

  return { author: maxKey, likes: maxValue };
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
};
