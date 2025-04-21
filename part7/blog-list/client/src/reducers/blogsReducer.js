import { createSlice } from "@reduxjs/toolkit";
import blogService from "../services/blogs";

const blogsSlice = createSlice({
  name: "blogs",
  initialState: [],
  reducers: {
    setBlogs(state, action) {
      return action.payload;
    },
    appendBlog(state, action) {
      return state.concat(action.payload);
    },
    updateBlog(state, action) {
      const updated = action.payload;
      return state.map((b) => (b.id === updated.id ? updated : b));
    },
    removeBlog(state, action) {
      const target = action.payload.id;
      return state.filter((b) => b.id !== target);
    },
  },
});

const { setBlogs, appendBlog, updateBlog, removeBlog } = blogsSlice.actions;

export const initBlogs = () => {
  return async (dispatch) => {
    const response = await blogService.getAll();
    dispatch(setBlogs(response));
  };
};

export const createBlog = (token, blog) => {
  return async (dispatch) => {
    try {
      const response = await blogService.create(token, blog);
      dispatch(appendBlog(response));
      return response;
    } catch (error) {
      return Promise.reject(error);
    }
  };
};

export const likeBlog = (blog) => {
  return async (dispatch) => {
    const { author, id, likes, title, url } = blog;
    const response = await blogService.like({
      author,
      id,
      likes: likes + 1,
      title,
      url,
    });
    dispatch(updateBlog(response));
  };
};

export const deleteBlog = (token, blog) => {
  return async (dispatch) => {
    const response = await blogService.remove(token, blog);
    dispatch(removeBlog(blog));
  };
};

export const commentBlog = (id, comment) => {
  return async (dispatch) => {
    try {
      const response = await blogService.comment(id, comment);
      dispatch(updateBlog(response));
      return response;
    } catch (error) {
      return Promise.reject(error);
    }
  };
};

export default blogsSlice.reducer;
