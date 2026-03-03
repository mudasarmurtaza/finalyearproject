import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router";

export const ContractorLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [contractor, setContractor] = useState(null);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await fetch("http://localhost:5000/contractor/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem("token", data.token); // ✅ Save JWT token
        localStorage.setItem("contractor", JSON.stringify(data.contractor));

        // 🔔 Notify Navbar
        window.dispatchEvent(new Event("authChange"));
        setContractor(data.user); // ✅ store contractor info
        alert("Login successful!");
        navigate('/contractor-profile');

      } else {
        setError(data.msg || "Login failed");
      }
    } catch (err) {
      console.error(err);
      setError("Something went wrong. Try again.");
    }
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center vh-100"
      style={{ backgroundColor: "#D9D9D9" }}
    >
      <div
        className="card shadow p-4"
        style={{ width: "35rem", height: "auto", backgroundColor: "#b0c4cf" }}
      >
        <h4
          className="text-center mb-4"
          style={{ color: "#2e5e77", fontWeight: "600" }}
        >
          Contractor Login
        </h4>

        <form onSubmit={handleLogin}>
          {/* Email Input */}
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

          {/* Password Input */}
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

          {/* Error Message */}
          {error && <p className="text-danger">{error}</p>}

          {/* Forgot Password */}
          <div className="mb-4">
            <NavLink
              to="/contractor-forgot-password"
              className="text-decoration-none"
              style={{ color: "#2e5e77", fontSize: "14px" }}
            >
              Forgot Password?
            </NavLink>

          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="btn w-100 text-white fw-bold mb-4"
            style={{ backgroundColor: "#3b6f8c" }}
          >
            Login
          </button>
        </form>

        {/* Signup Link */}
        <p
          className="text-center mt-3 mb-0"
          style={{ fontSize: "14px" }}
        >
          Don’t have an account ?{" "}
          <NavLink
            to="/contractor-signup"
            className="fw-bold text-decoration-none"
            style={{ color: "#2e5e77" }}
          >
            Signup
          </NavLink>
        </p>

        {/* ✅ Show contractor info after login */}
        {contractor && (
          <div className="mt-4 text-center">
            <h6>Welcome, {contractor.name}!</h6>
            {contractor.profilePic && (
              <img
                src={`http://localhost:5000${contractor.profilePic}`}
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
