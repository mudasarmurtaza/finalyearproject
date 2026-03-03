import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { NavLink, useNavigate } from "react-router-dom";

export const CustomerLogin = () => {
  const [email, setEmail] = useState(""); // email state
  const [password, setPassword] = useState(""); // password state
  const [error, setError] = useState(""); // error message
  const [customer, setCustomer] = useState(null); // logged‑in customer info
  const navigate = useNavigate();

  // ---------------------------------------------------------------------
  // Login handler – communicates with backend, stores token, redirects
  // ---------------------------------------------------------------------
  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const res = await fetch("http://localhost:5000/customer/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (res.ok) {
        localStorage.setItem("customerToken", data.token);
        localStorage.setItem("customer", JSON.stringify(data.user));
        window.dispatchEvent(new Event("authChange"));
        setCustomer(data.user);
        alert("Login successful!");
        navigate("/customer-profile");
      } else {
        setError(data.message || "Login failed");
      }
    } catch (err) {
      console.error(err);
      setError("Something went wrong. Try again.");
    }
  };

  // ---------------------------------------------------------------------
  // Logout handler – clears auth data and returns to home page
  // ---------------------------------------------------------------------
  const handleLogout = () => {
    localStorage.removeItem("customerToken");
    localStorage.removeItem("customer");
    window.dispatchEvent(new Event("authChange"));
    navigate("/home");
  };

  // ---------------------------------------------------------------------
  // UI – glassmorphism card, fully responsive, premium button styles
  // ---------------------------------------------------------------------
  return (
    <div className="d-flex justify-content-center align-items-center vh-100" style={{ backgroundColor: "#D9D9D9" }}>
      <div className="card login-card p-4" style={{ width: "35rem", maxWidth: "90%" }}>
        <h4 className="text-center mb-4" style={{ color: "#2e5e77", fontWeight: "600" }}>Customer Login</h4>
        <form onSubmit={handleLogin}>
          {/* Email */}
          <div className="mb-4">
            <input
              type="email"
              className="form-control"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          {/* Password */}
          <div className="mb-4">
            <input
              type="password"
              className="form-control"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {/* Error message */}
          {error && <p className="text-danger">{error}</p>}
          {/* Buttons */}
          <div className="d-flex gap-2 mb-4">
            <button type="submit" className="btn flex-fill fw-bold" style={{ background: "linear-gradient(135deg, #fbbf24 0%, #d97706 100%)", color: "#ffffff" }}>
              Login
            </button>
            <button type="button" className="btn btn-outline-light flex-fill fw-bold" onClick={handleLogout} style={{ borderColor: "#fbbf24", color: "#fbbf24" }}>
              Logout
            </button>
          </div>
        </form>
        <p className="text-center mt-3 mb-0" style={{ fontSize: "14px" }}>
          Don’t have an account?{' '}
          <NavLink to="/customer-signup" className="fw-bold text-decoration-none" style={{ color: "#2e5e77" }}>
            Signup
          </NavLink>
        </p>
        {customer && (
          <div className="mt-4 text-center">
            <h6>Welcome, {customer.name}!</h6>
            {customer.profilePic && (
              <img
                src={`http://localhost:5000${customer.profilePic}`}
                alt="Profile"
                className="rounded-circle mt-2"
                style={{ width: "100px", height: "100px", objectFit: "cover" }}
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
};
