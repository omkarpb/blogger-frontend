import { createSlice } from '@reduxjs/toolkit';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const blogApi = createApi({
  reducerPath: 'blogApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:3001/blogposts/',
    prepareHeaders: (headers, { getState }) => {
      const token = getState().user.authToken;
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    }
  }),
  endpoints: (builder) => ({
    getBlogPost: builder.query({
      query: (id) => id,
    }),
  }),
});

export const { useGetBlogPostQuery } = blogApi;

const blogSlice = createSlice({
  name: 'blog',
  initialState: {
    blogList: [],
  },
  reducers: {
    blogListAdded(state, action) {
      state.blogList = action.payload;
    }
  }
});

export const { blogListAdded } = blogSlice.actions;
export default blogSlice.reducer;