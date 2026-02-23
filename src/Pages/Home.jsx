import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; // <-- add this
import bgImage from '../assets/Home_Page_Pics/orig.jpeg';
import howitworks from '../assets/Home_Page_Pics/How_it_works.JPG'

// feature images
import AIestimation from '../assets/Home_Page_Pics/Image_AI_Est.png'
import D_Map from '../assets/Home_Page_Pics/Image_2D_Map.png'
import SecureChat from '../assets/Home_Page_Pics/Secure_Chat.png'
import ContactRating from '../assets/Home_Page_Pics/Contractor_Rating.png'
import RealTime from '../assets/Home_Page_Pics/Real_Time.png'
import { FaCircleCheck } from "react-icons/fa6";

export const Home = () => {
    return (
        <div>
            {/* Hero Section */}
            <section
                className="text-white d-flex align-items-center"
                style={{
                    backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(${bgImage})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center", minHeight: "80vh",
                }}
            >

                <div className="container text-start ">
                    <h1 className="fw-bold fw-bolder"
                        style={{
                            fontSize: "clamp(2rem, 8vw, 100px)", // responsive scaling
                            maxWidth: "100%", // prevent overflow
                        }}
                    >
                        Estimate Your Dream Home with AI
                    </h1>
                    <button className="btn btn-primary px-4 py-2 text-align-center fs-4 rounded-pill mt-3">Get Started</button>
                </div>
            </section>

            {/* How it Works */}
            <section className="container-fluid py-5" style={{ backgroundColor: '#B4C4CD' }}>
                <h2 className="text-center fw-bolder mb-5 mt-5" style={{ fontSize: '60px' }}>
                    How it Works
                </h2>
                <div className="row align-items-center">
                    <div className="offset-lg-2 col-lg-3 col-md-6 col-12 mb-4 mb-md-0">
                        <ul className="list-unstyled fs-5">
                            <li className="mb-5 fs-1 fw-medium"><FaCircleCheck className="text-primary" /> Input Requirements</li>
                            <li className="mb-5 fs-1 fw-medium"><FaCircleCheck className="text-primary" /> Get Estimations</li>
                            <li className="mb-5 fs-1 fw-medium"><FaCircleCheck className="text-primary" /> Receive Bids</li>
                            <li className="mb-5 fs-1 fw-medium"><FaCircleCheck className="text-primary" /> Finalize Contractor</li>
                            <li className="mb-5 fs-1 fw-medium"><FaCircleCheck className="text-primary" /> Get Results</li>
                        </ul>
                    </div>

                    <div className="offset-lg-1 col-lg-5 col-md-6 col-12 text-center">
                        <img
                            src={howitworks}
                            alt="How it Works"
                            className="img-fluid rounded-5 shadow-lg"
                            style={{ height: "550px", objectFit: "cover", width: "100%" }}
                        />
                    </div>
                </div>
            </section>

            {/* Features */}
            <section className="container py-5 my-5 ">
                <h2 className="text-center fw-bolder mb-5" style={{ fontSize: '60px' }}>
                    Features
                </h2>
                <div className="row text-center g-4 justify-content-center">
                    {[
                        { title: "AI Estimations", img: AIestimation },
                        { title: "2D Map Prediction", img: D_Map },
                        { title: "Secure Chats with Clients", img: SecureChat },
                        { title: "Contractor Rating", img: ContactRating },
                        { title: "Real-Time Project Tracking", img: RealTime },
                        { title: "Blue-prints & Media Uploads", img: "https://img.icons8.com/color/96/upload--v1.png" },
                    ].map((feature, i) => (
                        <div key={i} className="col-lg-4 col-md-6 col-12 d-flex justify-content-center">
                            <div className="card shadow border-0 h-100" style={{ backgroundColor: '#B4C4CD', width: '100%', maxWidth: '400px' }}>
                                <div className="card-body">
                                    <img
                                        src={feature.img}
                                        alt={feature.title}
                                        className="mb-3 img-fluid"
                                        style={{ height: "150px", objectFit: "contain" }}
                                    />
                                    <h5 className="fw-bold fs-3">{feature.title}</h5>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Why Choose Us */}
            <section className="container-fluid" style={{ backgroundColor: '#B4C4CD' }}>
                <section className="container py-5 ">
                    <h2 className="text-center fw-bolder mb-5 mt-5" style={{ fontSize: '60px' }}>Why Choose Us</h2>
                    <div className="row align-items-center">
                        <div className="col-lg-6 col-12 text-center mb-4 mb-lg-0">
                            <img
                                src={howitworks}
                                alt="How it Works"
                                className="img-fluid rounded-5 shadow-lg"
                                style={{ height: "500px", objectFit: "cover", width: "100%" }}
                            />
                        </div>
                        <div className="col-lg-5 col-12 mx-lg-5">
                            <ul className="list-unstyled fs-5 ">
                                <li className="mb-5 fs-1 fw-medium "><FaCircleCheck className="text-primary" /> AI-Powered Results</li>
                                <li className="mb-5 fs-1 fw-medium "><FaCircleCheck className="text-primary" /> Verified Contractors</li>
                                <li className="mb-5 fs-1 fw-medium "><FaCircleCheck className="text-primary" /> Transparent Bidding System</li>
                                <li className="mb-5 fs-1 fw-medium "><FaCircleCheck className="text-primary" /> Fast & Secure Communication</li>
                            </ul>
                        </div>
                    </div>
                </section>
            </section>
        </div>
    );
};
