import axios from "axios";
const baseUrl = "/api/blogs/";

const getAllBlogs = () => {
  return axios.get(baseUrl).then((response) => response.data);
};

const getBlogById = (blogId) => {
  return axios.get(baseUrl + blogId).then((response) => response.data);
};

const createBlog = (newBlog) => {
  return axios
    .post(baseUrl, newBlog)
    .then((response) => response.data)
    .catch((error) => {
      throw new Error(error.response.data.error);
    });
};

const updateBlog = (updatedBlog) => {
  return axios
    .put(baseUrl + updatedBlog.id, updatedBlog)
    .then((response) => response.data)
    .catch((error) => {
      throw new Error(error.response.data.error);
    });
};

const deleteBlog = (blog) => {
  return axios.delete(baseUrl + blog.id);
};

const createBlogComment = (blogId, comment) => {
  return axios
    .post(baseUrl + blogId + "/comments", { comment })
    .then((response) => response.data)
    .catch((error) => {
      throw new Error(error.response.data.error);
    });
};

const blogService = {
  getAll: getAllBlogs,
  getById: getBlogById,
  create: createBlog,
  update: updateBlog,
  delete: deleteBlog,
  createComment: createBlogComment,
};

export default blogService;
