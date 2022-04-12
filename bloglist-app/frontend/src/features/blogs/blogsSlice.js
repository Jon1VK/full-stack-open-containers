import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from "@reduxjs/toolkit";
import blogService from "../../services/blogs";

const blogsAdapter = createEntityAdapter({
  sortComparer: (a, b) => b.likes - a.likes,
});

const initialState = blogsAdapter.getInitialState();

export const fetchBlogs = createAsyncThunk(
  "blogs/fetchBlogs",
  async () => await blogService.getAll()
);

export const fetchBlog = createAsyncThunk(
  "blogs/fetchBlog",
  async (blogId) => await blogService.getById(blogId)
);

export const createBlog = createAsyncThunk(
  "blogs/createBlog",
  async (newBlog) => await blogService.create(newBlog)
);

export const updateBlog = createAsyncThunk(
  "blogs/updateBlog",
  async (updatedBlog) => await blogService.update(updatedBlog)
);

export const deleteBlog = createAsyncThunk("blogs/deleteBlog", async (blog) => {
  await blogService.delete(blog);
  return blog.id;
});

export const createBlogComment = createAsyncThunk(
  "blogs/createComment",
  async ({ blogId, comment }) =>
    await blogService.createComment(blogId, comment)
);

export const blogsSlice = createSlice({
  name: "blogs",
  initialState,
  extraReducers: {
    [fetchBlogs.fulfilled]: blogsAdapter.upsertMany,
    [fetchBlog.fulfilled]: blogsAdapter.upsertOne,
    [createBlog.fulfilled]: blogsAdapter.addOne,
    [updateBlog.fulfilled]: blogsAdapter.upsertOne,
    [deleteBlog.fulfilled]: blogsAdapter.removeOne,
    [createBlogComment.fulfilled]: blogsAdapter.upsertOne,
  },
});

const blogsReducer = blogsSlice.reducer;

export default blogsReducer;

export const { selectAll: selectAllBlogs, selectById: selectBlogById } =
  blogsAdapter.getSelectors((state) => state.blogs);
