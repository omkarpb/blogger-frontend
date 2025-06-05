import { useCallback } from 'react';
import './App.css';
import { Routes, Route } from 'react-router';
import Cookies from 'js-cookie';
import { useLocation, useNavigate } from "react-router";

import { Login } from './pages/auth/Login';
import { Register } from './pages/auth/Register';
import { Home } from './pages/blogger/Home';
import { AuthRoute } from './pages/auth/AuthRoute';
import { BlogPost } from './pages/blogger/BlogPost';

function App() {
  let navigate = useNavigate();
  const location = useLocation();
  
  const logouthandler = useCallback(() => {
    Cookies.remove('token');
    navigate(`/login?fromPage=${location.pathname}`);
  }, [location.pathname, navigate]);
  
  return (
    <div className="app">
      <header className="headerWrapper">
        <h1 className="fancy-font">Blogger</h1>
        <button onClick={logouthandler}>Logout</button>
      </header>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route element={<AuthRoute />}>
          <Route path="/home" element={<Home />} />
          <Route path="/blogpost/:id" element={<BlogPost />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
