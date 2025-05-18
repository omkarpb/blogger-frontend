import './App.css';
import { Routes, Route } from 'react-router';
import { Login } from './pages/auth/Login';
import { Register } from './pages/auth/Register';

function App() {
  return (
    <div className="app">
      <header className="headerWrapper">
        <h1 className="fancy-font">Blogger</h1>
      </header>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </div>
  );
}

export default App;
