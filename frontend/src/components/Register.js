import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail]       = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage]   = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("https://book-car-rental-backend.onrender.com/api/auth/register", { username, email, password },{ withCredentials: true });
      setMessage(res.data.message || "Registered!");
      setTimeout(()=>navigate("/login"), 1200);
    } catch (err) {
      setMessage("Registration failed: " + (err.response?.data?.error || err.response?.data?.message || err.message));
    }
  };

  return (
    <div className="container mt-3" style={{ maxWidth: 400 }}>
      <h2>Register</h2>
      {message && <div className="alert alert-info">{message}</div>}
      <form onSubmit={handleSubmit}>
        <div className="mb-2"><label>Username</label><input className="form-control" value={username} onChange={e=>setUsername(e.target.value)} required/></div>
        <div className="mb-2"><label>Email</label><input type="email" className="form-control" value={email} onChange={e=>setEmail(e.target.value)} required/></div>
        <div className="mb-2"><label>Password</label><input type="password" className="form-control" value={password} onChange={e=>setPassword(e.target.value)} required/></div>
        <button className="btn btn-primary" type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;
