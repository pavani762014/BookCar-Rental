import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("https://book-car-rental-backend.onrender.com/api/bookings/book/login", { username, password });
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("username", res.data.username);
      localStorage.setItem("userId", res.data.userId);
      setMessage("Login successful!");
      navigate("/dashboard");
    } catch (err) {
      setMessage("Login failed: " + (err.response?.data?.error || err.message));
    }
  };

  return (
    <div className="container mt-3" style={{ maxWidth: 400 }}>
      <h2>Login</h2>
      {message && <div className="alert alert-info">{message}</div>}
      <form onSubmit={handleSubmit}>
        <div className="mb-2">
          <label>Username</label>
          <input type="text" className="form-control" value={username} onChange={e=>setUsername(e.target.value)} required />
        </div>
        <div className="mb-2">
          <label>Password</label>
          <input type="password" className="form-control" value={password} onChange={e=>setPassword(e.target.value)} required />
        </div>
        <button className="btn btn-primary mt-2" type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
