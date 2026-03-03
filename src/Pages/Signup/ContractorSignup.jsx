import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { NavLink, useNavigate } from "react-router-dom";
import { FaUser, FaPhone, FaEnvelope, FaMapMarkerAlt, FaLock, FaAddressCard, FaCity } from "react-icons/fa";

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
      className="d-flex justify-content-center min-vh-100"
      style={{
        background: "#bdc5ccff",
        overflow: "hidden",
        padding: "3rem 1rem",
      }}
    >
      <div
        className="card p-4 p-md-5 shadow-lg"
        style={{
          width: "100%",
          maxWidth: "800px",
          borderRadius: "1.5rem",
          background: "rgba(15, 23, 42, 0.85)",
          backdropFilter: "blur(15px)",
          border: "1px solid rgba(251, 191, 36, 0.4)",
          color: "#ffffff",
        }}
      >
        <h3
          className="text-center fw-bold mb-4"
          style={{ color: "#fbbf24", textShadow: "0 2px 10px rgba(0,0,0,0.3)" }}
        >
          Contractor Signup
        </h3>

        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <div className="row mb-3">
            <div className="col-12 col-md-6 mb-3 mb-md-0 position-relative">
              <FaUser style={{ position: "absolute", top: "50%", left: "25px", transform: "translateY(-50%)", color: "#fbbf24" }} />
              <input
                type="text"
                className="form-control ps-5"
                name="name"
                placeholder="Enter your name"
                value={formData.name}
                onChange={handleChange}
                style={{
                  borderRadius: "50px",
                  background: "rgba(255,255,255,0.1)",
                  border: "1px solid rgba(255,255,255,0.2)",
                  color: "#ffffff",
                }}
              />
            </div>
            <div className="col-12 col-md-6 position-relative">
              <FaPhone style={{ position: "absolute", top: "50%", left: "25px", transform: "translateY(-50%)", color: "#fbbf24" }} />
              <input
                type="text"
                className="form-control ps-5"
                name="phone"
                placeholder="Enter your phone number"
                value={formData.phone}
                onChange={handleChange}
                style={{
                  borderRadius: "50px",
                  background: "rgba(255,255,255,0.1)",
                  border: "1px solid rgba(255,255,255,0.2)",
                  color: "#ffffff",
                }}
              />
            </div>
          </div>

          <div className="row mb-3">
            <div className="col-12 col-md-6 mb-3 mb-md-0 position-relative">
              <FaEnvelope style={{ position: "absolute", top: "50%", left: "25px", transform: "translateY(-50%)", color: "#fbbf24" }} />
              <input
                type="email"
                className="form-control ps-5"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                style={{
                  borderRadius: "50px",
                  background: "rgba(255,255,255,0.1)",
                  border: "1px solid rgba(255,255,255,0.2)",
                  color: "#ffffff",
                }}
              />
            </div>
            <div className="col-12 col-md-6 position-relative">
              <FaAddressCard style={{ position: "absolute", top: "35%", left: "25px", transform: "translateY(-50%)", color: "#fbbf24" }} />
              <input
                type="text"
                className="form-control ps-5"
                name="cnicNumber"
                placeholder="Enter your CNIC number"
                value={formData.cnicNumber}
                onChange={handleChange}
                required
                style={{
                  borderRadius: "50px",
                  background: "rgba(255,255,255,0.1)",
                  border: "1px solid rgba(255,255,255,0.2)",
                  color: "#ffffff",
                }}
              />
              <small className="form-text text-white-50 ms-2">
                Format: 12345-1234567-1
              </small>
            </div>
          </div>

          <div className="row mb-3">
            <div className="col-12 col-md-6 mb-3 mb-md-0 position-relative">
              <FaMapMarkerAlt style={{ position: "absolute", top: "50%", left: "25px", transform: "translateY(-50%)", color: "#fbbf24" }} />
              <input
                type="text"
                className="form-control ps-5"
                name="address"
                placeholder="Enter your address"
                value={formData.address}
                onChange={handleChange}
                style={{
                  borderRadius: "50px",
                  background: "rgba(255,255,255,0.1)",
                  border: "1px solid rgba(255,255,255,0.2)",
                  color: "#ffffff",
                }}
              />
            </div>
            <div className="col-12 col-md-6 position-relative">
              <FaCity style={{ position: "absolute", top: "50%", left: "25px", transform: "translateY(-50%)", color: "#fbbf24" }} />
              <input
                type="text"
                className="form-control ps-5"
                name="city"
                placeholder="Enter your city"
                value={formData.city}
                onChange={handleChange}
                required
                style={{
                  borderRadius: "50px",
                  background: "rgba(255,255,255,0.1)",
                  border: "1px solid rgba(255,255,255,0.2)",
                  color: "#ffffff",
                }}
              />
            </div>
          </div>

          <div className="row mb-3">
            <div className="col-12 col-md-6 mb-3 mb-md-0 position-relative">
              <FaLock style={{ position: "absolute", top: "50%", left: "25px", transform: "translateY(-50%)", color: "#fbbf24" }} />
              <input
                type="password"
                className="form-control ps-5"
                name="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                style={{
                  borderRadius: "50px",
                  background: "rgba(255,255,255,0.1)",
                  border: "1px solid rgba(255,255,255,0.2)",
                  color: "#ffffff",
                }}
              />
            </div>
            <div className="col-12 col-md-6 position-relative">
              <FaLock style={{ position: "absolute", top: "50%", left: "25px", transform: "translateY(-50%)", color: "#fbbf24" }} />
              <input
                type="password"
                className="form-control ps-5"
                name="confirmPassword"
                placeholder="Confirm your password"
                value={formData.confirmPassword}
                onChange={handleChange}
                style={{
                  borderRadius: "50px",
                  background: "rgba(255,255,255,0.1)",
                  border: "1px solid rgba(255,255,255,0.2)",
                  color: "#ffffff",
                }}
              />
            </div>
          </div>

          <div className="mb-3">
            <label className="form-label fw-semibold" style={{ color: "#fbbf24" }}>Gender</label>
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
                <label className="form-check-label text-white">Male</label>
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
                <label className="form-check-label text-white">Female</label>
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
                <label className="form-check-label text-white">Other</label>
              </div>
            </div>
          </div>

          {/* Uploads Section */}
          <div className="mb-3 p-3 rounded" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)" }}>
            <div className="row">
              <div className="col-12 col-md-6 mb-3">
                <label className="form-label fw-semibold" style={{ color: "#fbbf24" }}>Profile Picture (Optional)</label>
                <input
                  type="file"
                  className="form-control"
                  accept="image/*"
                  onChange={handleFileChange}
                  style={{ borderRadius: "10px", background: "rgba(255,255,255,0.1)", color: "#ffffff", border: "1px solid rgba(255,255,255,0.2)" }}
                />
              </div>

              <div className="col-12 col-md-6 mb-3">
                <label className="form-label fw-semibold" style={{ color: "#fbbf24" }}>Verification Document (Required)</label>
                <input
                  type="file"
                  className="form-control"
                  accept="image/*"
                  onChange={handleVerificationImageChange}
                  required
                  style={{ borderRadius: "10px", background: "rgba(255,255,255,0.1)", color: "#ffffff", border: "1px solid rgba(255,255,255,0.2)" }}
                />
                <small className="form-text text-white-50">Upload contractor license/certification.</small>
              </div>

              <div className="col-12 col-md-6 mb-3">
                <label className="form-label fw-semibold" style={{ color: "#fbbf24" }}>CNIC Front (Required)</label>
                <input
                  type="file"
                  className="form-control"
                  accept="image/*"
                  onChange={handleCnicFrontChange}
                  required
                  style={{ borderRadius: "10px", background: "rgba(255,255,255,0.1)", color: "#ffffff", border: "1px solid rgba(255,255,255,0.2)" }}
                />
                <small className="form-text text-white-50">Front side of CNIC.</small>
              </div>

              <div className="col-12 col-md-6 mb-3">
                <label className="form-label fw-semibold" style={{ color: "#fbbf24" }}>CNIC Back (Required)</label>
                <input
                  type="file"
                  className="form-control"
                  accept="image/*"
                  onChange={handleCnicBackChange}
                  required
                  style={{ borderRadius: "10px", background: "rgba(255,255,255,0.1)", color: "#ffffff", border: "1px solid rgba(255,255,255,0.2)" }}
                />
                <small className="form-text text-white-50">Back side of CNIC.</small>
              </div>
            </div>
          </div>

          <div className="d-grid mt-4">
            <button
              type="submit"
              className="btn fw-bold py-2"
              style={{
                background: "linear-gradient(135deg, #fbbf24 0%, #d97706 100%)",
                color: "#0f172a",
                borderRadius: "50px",
                fontSize: "1rem",
                transition: "all 0.3s ease",
                boxShadow: "0 8px 20px rgba(0,0,0,0.3)",
              }}
              onMouseOver={(e) => (e.currentTarget.style.transform = "translateY(-3px)")}
              onMouseOut={(e) => (e.currentTarget.style.transform = "translateY(0)")}
            >
              Signup
            </button>
          </div>

          <p className="text-center mt-3 mb-0" style={{ fontSize: "14px", color: "#fbbf24" }}>
            Already have an account?{" "}
            <NavLink
              to="/contractor-login"
              className="fw-bold text-decoration-none"
              style={{ color: "#fbbf24" }}
            >
              Login
            </NavLink>
          </p>
        </form>
      </div>
    </div>
  );
};
