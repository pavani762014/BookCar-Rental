import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    localStorage.removeItem("userId");
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container">
        <Link className="navbar-brand" to="/">Car Rental</Link>
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav me-auto">
            <li className="nav-item"><Link className="nav-link" to="/">Home</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/cars">Cars</Link></li>
            {token && <li className="nav-item"><Link className="nav-link" to="/dashboard">Dashboard</Link></li>}
          </ul>

          <ul className="navbar-nav ms-auto">
            {!token && <>
              <li className="nav-item"><Link className="nav-link" to="/login">Login</Link></li>
              <li className="nav-item"><Link className="nav-link" to="/register">Register</Link></li>
            </>}
            {token && <li className="nav-item"><button className="btn btn-link nav-link" onClick={handleLogout}>Logout</button></li>}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
