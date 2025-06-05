import React, { useEffect, useCallback, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useLocation, useNavigate } from "react-router";
import { useSelector, useDispatch } from 'react-redux';
import { blogListAdded } from './blogSlice';
import './styles.css';
import { useAuth } from '../auth/AuthContext';

export const Home = () => {
  const token = useAuth();
  const [user, setUser] = useState({});
  const [blogs, setBlogs] = useState([]);

  let navigate = useNavigate();
  const location = useLocation();
  const stateUser = useSelector((state) => { return state.user; });
  const stateBlogs = useSelector((state) => state.blog.blogList);
  const dispatch = useDispatch();
  useEffect(() => {
    axios.get('http://localhost:3001/blogposts/', {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    }).then((res) => {
      dispatch(blogListAdded(res.data));
    });
  }, [dispatch, token]);

  const logouthandler = useCallback(() => {
    Cookies.remove('token');
    navigate(`/login?fromPage=${location.pathname}`);
  }, [location.pathname, navigate]);

  useEffect(() => {
    setUser(stateUser);
  }, [stateUser]);

  useEffect(() => {
    setBlogs(stateBlogs);
  }, [stateBlogs]);

  const onClickHandler = useCallback((blog) => {
    navigate(`/blogpost/${blog._id}`);
  }, [navigate]);

  return (
    <div>
      <h2>Welcome {user.firstName}</h2>
      {blogs.map((blog, index) => {
        return (
          <div key={index} className="blogListItem" onClick={() => onClickHandler(blog)}>
            <h3>{blog.title}</h3>
            <p>Created on {blog.createdAt}</p>
          </div>
        );
      })}

      <button onClick={logouthandler}>Logout</button>
    </div>
  );
};
