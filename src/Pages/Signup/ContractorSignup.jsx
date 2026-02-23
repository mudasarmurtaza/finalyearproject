import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { NavLink, useNavigate } from "react-router-dom";

export const ContractorSignup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    city: "",
    password: "",
    confirmPassword: "",
    gender: "",
    cnicNumber: "",

  });

  const [profilePic, setProfilePic] = useState(null); // ✅ New state for profile picture
  const [verificationImage, setVerificationImage] = useState(null); // ✅ New state for verification image
  const [cnicFront, setCnicFront] = useState(null); // ✅ New state for CNIC front image
  const [cnicBack, setCnicBack] = useState(null); // ✅ New state for CNIC back image

  // handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // handle file change
  const handleFileChange = (e) => {
    setProfilePic(e.target.files[0]); // store the uploaded file
  };

  // handle verification image change
  const handleVerificationImageChange = (e) => {
    setVerificationImage(e.target.files[0]); // store the verification image
  };

  // handle CNIC front image change
  const handleCnicFrontChange = (e) => {
    setCnicFront(e.target.files[0]); // store the CNIC front image
  };

  // handle CNIC back image change
  const handleCnicBackChange = (e) => {
    setCnicBack(e.target.files[0]); // store the CNIC back image
  };

  // handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      const formDataToSend = new FormData();
      formDataToSend.append("name", formData.name);
      formDataToSend.append("phone", formData.phone);
      formDataToSend.append("cnicNumber", formData.cnicNumber);
      formDataToSend.append("email", formData.email);
      formDataToSend.append("city", formData.city);
      formDataToSend.append("address", formData.address);
      formDataToSend.append("password", formData.password);
      formDataToSend.append("gender", formData.gender);
      


      if (profilePic) {
        formDataToSend.append("profilePic", profilePic); // ✅ append profile picture only if provided
      }

      const res = await fetch("http://localhost:5000/contractor/signup", {
        method: "POST",
        body: formDataToSend, // ✅ send as multipart/form-data
      });

      const data = await res.json();

      if (res.ok) {
        // If verification image is provided, upload it separately
        if (verificationImage) {
          const verificationFormData = new FormData();
          verificationFormData.append("contractorId", data.contractor._id);
          verificationFormData.append("verificationImage", verificationImage);

          const verificationRes = await fetch("http://localhost:5000/contractor/signup/verification", {
            method: "POST",
            body: verificationFormData,
          });

          if (!verificationRes.ok) {
            console.warn("Verification image upload failed, but signup was successful");
          }
        }

        // If CNIC images are provided, upload them separately
        if (cnicFront || cnicBack) {
          const cnicFormData = new FormData();
          cnicFormData.append("contractorId", data.contractor._id);

          if (cnicFront) {
            cnicFormData.append("cnicFront", cnicFront);
          }
          if (cnicBack) {
            cnicFormData.append("cnicBack", cnicBack);
          }

          const cnicRes = await fetch("http://localhost:5000/contractor/signup/cnic", {
            method: "POST",
            body: cnicFormData,
          });

          if (!cnicRes.ok) {
            console.warn("CNIC images upload failed, but signup was successful");
          }
        }

        alert("Signup successful!");
        console.log(data);
        navigate('/contractor-login')
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
      className="d-flex justify-content-center py-5"
      style={{ backgroundColor: "#D9D9D9" }}
    >
      <div
        className="p-4 rounded"
        style={{ backgroundColor: "#B4C4CD", maxWidth: "700px", width: "100%" }}
      >
        <h3 className="text-center mb-4 fw-bold" style={{ color: "#3B6D8A" }}>
          Contractor Signup
        </h3>

        <form onSubmit={handleSubmit} encType="multipart/form-data">
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
                type="text"
                className="form-control"
                name="cnicNumber"
                placeholder="Enter your CNIC number"
                value={formData.cnicNumber}
                onChange={handleChange}
                required
              />
              <small className="form-text text-muted">
                Format: 12345-1234567-1
              </small>
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
            <div className="col-6">
              <input
                type="text"
                className="form-control"
                name="city"
                placeholder="Enter your city"
                value={formData.city}
                onChange={handleChange}
                required
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

          {/* ✅ Verification Image Upload */}
          <div className="mb-3">
            <label className="form-label fw-semibold">Verification Document (Required)</label>
            <input
              type="file"
              className="form-control"
              accept="image/*"
              onChange={handleVerificationImageChange}
              required
            />
            <small className="form-text text-muted">
              Please upload a clear image of your contractor license, certification, or other verification document.
            </small>
          </div>

          {/* ✅ CNIC Images Upload */}
          <div className="row mb-3">
            <div className="col-md-6">
              <label className="form-label fw-semibold">CNIC Front (Required)</label>
              <input
                type="file"
                className="form-control"
                accept="image/*"
                onChange={handleCnicFrontChange}
                required
              />
              <small className="form-text text-muted">
                Upload front side of your CNIC
              </small>
            </div>
            <div className="col-md-6">
              <label className="form-label fw-semibold">CNIC Back (Required)</label>
              <input
                type="file"
                className="form-control"
                accept="image/*"
                onChange={handleCnicBackChange}
                required
              />
              <small className="form-text text-muted">
                Upload back side of your CNIC
              </small>
            </div>
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
              to="/contractor-login"
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
