import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { NavLink,useNavigate  } from "react-router-dom"; // ✅ should be react-router-dom

export const CustomerSignup = () => {
  const navigate = useNavigate(); 
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    password: "",
    confirmPassword: "",
    gender: "",
  });
 const [profilePic, setProfilePic] = useState(null); 
  // handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

    // handle file change
  const handleFileChange = (e) => {
    setProfilePic(e.target.files[0]);
  };

  // handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      const formDataToSend = new FormData(); // ✅ multipart form
      Object.keys(formData).forEach((key) => {
        if (key !== "confirmPassword") {
          formDataToSend.append(key, formData[key]);
        }
      });
      if (profilePic) {
        formDataToSend.append("profilePic", profilePic); // ✅ add image
      }

      const res = await fetch("http://localhost:5000/customer/signup", { // ✅ fixed absolute API
        method: "POST",
        body: formDataToSend,
      });

      const data = await res.json();

      if (res.ok) {
        alert("Customer Signup successful!");
        navigate("/customer-login"); // ✅ redirect to login
      } else {
        alert(data.error || "Signup failed");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Something went wrong. Try again.");
    }
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center vh-100"
      style={{ backgroundColor: "#D9D9D9" }}
    >
      <div
        className="p-4 rounded"
        style={{ backgroundColor: "#B4C4CD", height: "500px", width: "700px" }}
      >
        <h3 className="text-center mb-4 fw-bold" style={{ color: "#3B6D8A" }}>
          Customer Signup
        </h3>

        <form onSubmit={handleSubmit} encType="multipart/form-data"> {/* ✅ added encType */}
          <div className="row mb-3">
            <div className="col">
              <input
                type="text"
                className="form-control"
                name="name"
                placeholder="Enter your name"
                value={formData.name}
                onChange={handleChange}
              />
            </div>
            <div className="col">
              <input
                type="text"
                className="form-control"
                name="phone"
                placeholder="Enter your phone number"
                value={formData.phone}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="row mb-3">
            <div className="col">
              <input
                type="email"
                className="form-control"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <div className="col">
              <input
                type="text"
                className="form-control"
                name="address"
                placeholder="Enter your address"
                value={formData.address}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="row mb-3">
            <div className="col">
              <input
                type="password"
                className="form-control"
                name="confirmPassword"
                placeholder="Confirm your password"
                value={formData.confirmPassword}
                onChange={handleChange}
              />
            </div>
            <div className="col">
              <input
                type="password"
                className="form-control"
                name="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="mb-3">
            <label className="form-label fw-semibold">Gender</label>
            <div>
              <div className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  type="radio"
                  name="gender"
                  value="Male"
                  checked={formData.gender === "Male"}
                  onChange={handleChange}
                />
                <label className="form-check-label">Male</label>
              </div>
              <div className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  type="radio"
                  name="gender"
                  value="Female"
                  checked={formData.gender === "Female"}
                  onChange={handleChange}
                />
                <label className="form-check-label">Female</label>
              </div>
              <div className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  type="radio"
                  name="gender"
                  value="Other"
                  checked={formData.gender === "Other"}
                  onChange={handleChange}
                />
                <label className="form-check-label">Other</label>
              </div>

            </div>
          </div>

             {/* ✅ Profile Picture Upload */}
          <div className="mb-3">
            <label className="form-label fw-semibold">Profile Picture (Optional)</label>
            <input
              type="file"
              className="form-control"
              accept="image/*"
              onChange={handleFileChange}
            />
           </div>

          <div className="d-grid">
            <button
              type="submit"
              className="btn fw-bold"
              style={{ backgroundColor: "#3B6D8A", color: "#FFFFFF" }}
            >
              Signup
            </button>
          </div>
         


          <p className="text-center mt-3">
            Already have an account ?{" "}
            <NavLink
              to="/customer-login"
              className="fw-bold"
              style={{ color: "#3B6D8A" }}
            >
              Login
            </NavLink>
          </p>
        </form>
      </div>
    </div>
  );
};
