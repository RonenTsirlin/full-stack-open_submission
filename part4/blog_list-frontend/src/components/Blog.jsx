const Blog = ({ blog }) => {
  return (
    <li>
      {`Title: ${blog.title}`}
      <br />
      {`Authur: ${blog.author}`}
      <br />
      {`URL: ${blog.url}`}
      <br />
      {`Likes: ${blog.likes}`}
      <br />
    </li>
  );
};

export default Blog;
