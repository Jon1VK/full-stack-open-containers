const lodash = require("lodash");

const dummy = (blogs) => {
  blogs;
  return 1;
};

const totalLikes = (blogs) => {
  return blogs.reduce((likes, blog) => likes + blog.likes, 0);
};

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) return null;
  const maxLikeCount = Math.max(...blogs.map((blog) => blog.likes));
  return blogs.find((blog) => blog.likes === maxLikeCount);
};

const mostBlogs = (blogs) => {
  if (blogs.length === 0) return null;
  const blogCounts = lodash.countBy(blogs, (blog) => blog.author);
  const maxBlogCount = Math.max(...Object.values(blogCounts));
  const authors = Object.entries(blogCounts).map(([author, blogs]) => ({
    author,
    blogs,
  }));
  return authors.find((author) => author.blogs === maxBlogCount);
};

const mostLikes = (blogs) => {
  if (blogs.length === 0) return null;
  const blogsByAuthor = lodash.groupBy(blogs, (blog) => blog.author);
  const likeCounts = lodash.mapValues(blogsByAuthor, (blogs) =>
    lodash.sumBy(blogs, (blog) => blog.likes)
  );
  const maxLikeCount = Math.max(...Object.values(likeCounts));
  const authors = Object.entries(likeCounts).map(([author, likes]) => ({
    author,
    likes,
  }));
  return authors.find((author) => author.likes === maxLikeCount);
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
};
