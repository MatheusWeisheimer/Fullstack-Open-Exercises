import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'

const blogsSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    setBlogs(state, action) {
      return action.payload
    },
    appendBlog(state, action) {
      return state.concat(action.payload)
    }
  }
})  

const { setBlogs, appendBlog } = blogsSlice.actions

export const initBlogs = () => {
  return async dispatch => {
    const response = await blogService.getAll()
    dispatch(setBlogs(response))
  }
}

export const createBlog = (token, blog) => {
  return async dispatch => {
    try {
      const response = await blogService.create(token, blog)
      dispatch(appendBlog(response))
      return response
    } catch (error) {
      return Promise.reject(error)
    }
  }
}

export default blogsSlice.reducer