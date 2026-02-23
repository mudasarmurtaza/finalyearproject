import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { NavLink, useNavigate } from "react-router-dom"; // ✅ added useNavigate

export const CustomerLogin = () => {
  const [email, setEmail] = useState(""); // ✅ state for email
  const [password, setPassword] = useState(""); // ✅ state for password
  const [error, setError] = useState(""); // ✅ error handling
  const [customer, setCustomer] = useState(null); // ✅ customer state
  const navigate = useNavigate();

  const handleLogin = async (e) => { // ✅ new login handler
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
        localStorage.setItem("customerToken", data.token); // ✅ save JWT separately for customers
        localStorage.setItem("customer", JSON.stringify(data.user));
        window.dispatchEvent(new Event("authChange")); // ✅ notify navbar
        setCustomer(data.user);
        alert("Login successful!");
        navigate("/home"); // ✅ redirect to home
      } else {
        setError(data.message || "Login failed");
      }
    } catch (err) {
      console.error(err);
      setError("Something went wrong. Try again.");
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 " style={{ backgroundColor: '#D9D9D9' }}>
      <div className="card shadow p-4" style={{ width: "35rem", height: 'auto', backgroundColor: "#b0c4cf" }}>
        <h4 className="text-center mb-4" style={{ color: "#2e5e77", fontWeight: "600" }}>
          Customer Login
        </h4>

        <form onSubmit={handleLogin}> {/* ✅ wrap in form */}
          {/* Email Input */}
          <div className="mb-4">
            <input
              type="email"
              className="form-control"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)} // ✅ controlled input
              required
            />
          </div>

          {/* Password Input */}
          <div className="mb-4">
            <input
              type="password"
              className="form-control"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)} // ✅ controlled input
              required
            />
          </div>

          {/* Error Message */}
          {error && <p className="text-danger">{error}</p>} {/* ✅ show error */}

          {/* Forgot Password */}
          <div className="mb-4">
            <a href="#" className="text-decoration-none" style={{ color: "#2e5e77", fontSize: "14px" }}>
              Forgot Password ?
            </a>
          </div>

          {/* Login Button */}
          <button type="submit" className="btn w-100 text-white fw-bold mb-4" style={{ backgroundColor: "#3b6f8c" }}>
            Login
          </button>
        </form>

        {/* Signup Link */}
        <p className="text-center mt-3 mb-0" style={{ fontSize: "14px" }}>
          Don’t have an account ?{" "}
          <NavLink to="/customer-signup" className="fw-bold text-decoration-none" style={{ color: "#2e5e77" }}>
            Signup
          </NavLink>
        </p>

        {/* ✅ Show logged in customer info */}
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
