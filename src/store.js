import { configureStore } from '@reduxjs/toolkit'
import userReducer from './pages/auth/userSlice';
import blogReducer, { blogApi } from './pages/blogger/blogSlice';
import { setupListeners } from '@reduxjs/toolkit/query'

export const store = configureStore({
  reducer: {
    user: userReducer,
    blog: blogReducer,
    [blogApi.reducerPath]: blogApi.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(blogApi.middleware);
  }
});

setupListeners(store.dispatch);
