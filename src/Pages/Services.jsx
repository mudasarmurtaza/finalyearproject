import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import image1 from '../assets/Services_Page_Pics/image1.JPG';
import bg_Funfact from '../assets/Services_Page_Pics/bg-funfact.png';
import funfact1 from '../assets/Services_Page_Pics/Funfact1.png';
import funfact2 from '../assets/Services_Page_Pics/Funfact2.png';
import funfact3 from '../assets/Services_Page_Pics/Funfact3.png';
import AIimage from '../assets/Services_Page_Pics/AI-Image.JPG';

export const Services = () => {
  return (
    <div id="services" style={{ backgroundColor: "#D9D9D9" }}>
      {/* Header Section */}
      <section className="container py-5">
        <div className="row align-items-center g-4">
          <div className="col-lg-6 col-md-12">
            <h2
              className="mb-4 fw-bold"
              style={{ color: "#3B6D8A", fontSize: "clamp(2rem, 4vw, 2.5rem)" }}
            >
              Our Services
            </h2>
            <p className="lead fw-medium" style={{ textAlign: "justify" }}>
              We provide intelligent, efficient, and user-friendly tools to
              simplify your house construction planning. Our services are
              designed to save time, reduce costs, and bring clarity to your
              building projects – from initial design to final estimation.
            </p>
            <button
              className="btn rounded-pill lead fw-medium"
              style={{
                backgroundColor: "#3B6D8A",
                color: "white",
                width: "130px",
              }}
            >
              Explore Now
            </button>
          </div>
          <div className="col-lg-5 col-md-12 offset-lg-1 text-center">
            <img
              src={image1}
              alt="construction"
              className="img-fluid rounded-4 w-100"
              style={{ maxHeight: "400px", objectFit: "cover" }}
            />
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="container py-5">
        <div className="row g-4">
          {[
            {
              title: "Smart Cost Estimation",
              desc: "Get accurate construction cost estimates instantly by entering basic project details such as plot size, number of rooms, and building style. Our AI-driven system calculates material requirements, labor costs, and total budget with precision.",
            },
            {
              title: "Material Requirement Planning",
              desc: "Receive a detailed breakdown of construction materials-bricks, cement, steel, wood, sand, and more–based on your design specifications. This helps you avoid wastage and ensures optimal resource allocation.",
            },
            {
              title: "Interactive Room & Floor Plan Design",
              desc: "Visualize your dream home with our easy-to-use floor plan designer. Create custom layouts, adjust room sizes, and match your design preferences before finalizing construction.",
            },
            {
              title: "Contractor & Builder Matching",
              desc: "Connect with verified contractors and builders in your area. Browse reviews, ratings, and past projects to select the right professional for your construction needs.",
            },
            {
              title: "Secure Chat & Collaboration",
              desc: "Communicate directly with contractors, architects, and suppliers through our built-in secure messaging system. Share files, drawings, and updates throughout your project.",
            },
            {
              title: "Budget Tracking & Management",
              desc: "Track your expenses in real-time and compare against your planned budget. Stay within limits and avoid unexpected overruns with smart budget alerts.",
            },
          ].map((service, index) => (
            <div
              key={index}
              className="col-lg-4 col-md-6 col-12 d-flex justify-content-center"
            >
              <div
                className="card shadow-sm h-100 rounded-5"
                style={{ backgroundColor: "#B4C4CD", width: "100%", maxWidth: "400px" }}
              >
                <div className="card-body p-4" style={{ textAlign: "justify" }}>
                  <h5
                    className="mb-4 pt-3 fw-bold text-center"
                    style={{
                      color: "#3B6D8A",
                      fontSize: "clamp(1.3rem, 3vw, 2rem)",
                    }}
                  >
                    {service.title}
                  </h5>
                  <p
                    className="card-text fw-medium"
                    style={{
                      fontFamily: "Poppins",
                      color: "#090808",
                      fontSize: "clamp(1rem, 2.5vw, 1.25rem)",
                    }}
                  >
                    {service.desc}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Fun Facts Section */}
      <section
        className="bg-dark text-light py-5"
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url(${bg_Funfact})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="container text-center">
          {/* Section Title */}
          <h5
            className="mb-4 rounded-pill d-block mx-auto p-2 fw-bold"
            style={{
              background: "#D9D9D9",
              width: "150px",
              color: "#3B6D8A",
            }}
          >
            Our Funfacts
          </h5>

          <div className="row g-4">
            {/* Funfact 1 */}
            <div className="col-lg-4 col-md-6 col-12 d-flex flex-column align-items-center">
              <img
                src={funfact1}
                alt="Satisfied Clients"
                className="img-fluid mb-2"
                style={{
                  width: "197px",
                  height: "130px",
                  objectFit: "cover",
                }}
              />
              <h3 className="fw-bold text-white">15+</h3>
              <p className="text-white">Satisfied Clients</p>
            </div>

            {/* Funfact 2 */}
            <div className="col-lg-4 col-md-6 col-12 d-flex flex-column align-items-center">
              <img
                src={funfact2}
                alt="Awards Achieved"
                className="img-fluid mb-2"
                style={{
                  width: "197px",
                  height: "130px",
                  objectFit: "cover",
                }}
              />
              <h3 className="fw-bold text-white">10+</h3>
              <p className="text-white">Awards Achieved</p>
            </div>

            {/* Funfact 3 */}
            <div className="col-lg-4 col-md-6 col-12 d-flex flex-column align-items-center">
              <img
                src={funfact3}
                alt="Team Members"
                className="img-fluid mb-2"
                style={{
                  width: "197px",
                  height: "130px",
                  objectFit: "cover",
                }}
              />
              <h3 className="fw-bold text-white">3</h3>
              <p className="text-white">Team Members</p>
            </div>
          </div>
        </div>
      </section>

      {/* AI-Based Design Section */}
      <section className="container py-5" style={{ backgroundColor: "#D9D9D9" }}>
        <div className="row align-items-center g-4">
          <div className="col-lg-6 col-md-12 text-center">
            <img
              src={AIimage}
              alt="AI Design"
              className="img-fluid rounded w-100"
              style={{ maxHeight: "350px", objectFit: "cover" }}
            />
          </div>
          <div className="col-lg-6 col-md-12">
            <h3
              className="fw-bold"
              style={{
                fontFamily: "'Poppins', sans-serif",
                fontSize: "clamp(2rem, 4vw, 4rem)",
                lineHeight: "1.2",
                marginBottom: "20px",
                color: "#3B6D8A",
              }}
            >
              AI-Based Design Suggestions
            </h3>
            <p
              className="fw-normal"
              style={{
                fontFamily: "'Poppins', sans-serif",
                fontSize: "clamp(1.1rem, 2.5vw, 1.8rem)",
                lineHeight: "1.4",
                color: "#101010",
                textAlign: "justify",
              }}
            >
              Get smart recommendations for room layouts, material choices, and
              cost-saving alternatives based on your budget and plot size.
            </p>
            <button
              className="btn btn-primary rounded-pill border-0 text-center"
              style={{ backgroundColor: "#3B6D8A" }}
            >
              Explore Now
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
