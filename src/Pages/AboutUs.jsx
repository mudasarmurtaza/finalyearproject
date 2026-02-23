import "bootstrap/dist/css/bootstrap.min.css";
import about_us from '../assets/About_Page_Pics/Image_1.JPG';
import whoweare from '../assets/About_Page_Pics/Image_2.JPG';
import ourmission from '../assets/About_Page_Pics/Image_3.JPG';

export const AboutUs = () => {
  return (
    <div style={{ backgroundColor: '#D9D9D9' }}>
      {/* About Us Section */}
      <section className="container py-5" style={{ backgroundColor: '#D9D9D9' }}>
        <div className="container">
          {/* About Us */}
          <div className="row align-items-center mb-5 g-4">
            <div className="col-lg-5 col-md-6 col-12">
              <h2 className="mb-4 fw-bold" style={{ fontSize: "clamp(1.8rem, 4vw, 2.5rem)" }}>
                About Us
              </h2>
              <p className="lead fw-medium" style={{textAlign:"justify"}}>
                We are passionate innovators dedicated to developing solutions
                that transform the way industries operate. Our mission is to
                bring lasting impact to construction by blending technology,
                expertise, and creativity.
              </p>
              <p className="lead fw-medium" style={{textAlign:"justify"}}>
                By collaborating with clients and industry leaders, we deliver
                groundbreaking projects that redefine standards and open new
                opportunities. With a focus on sustainability, efficiency, and
                innovation, we take pride in building solutions that make a difference.
              </p>
            </div>
            <div className="col-lg-5 col-md-6 col-12 offset-lg-2">
              <img
                src={about_us}
                alt="About"
                className="img-fluid rounded-4 shadow-lg w-100"
                style={{ maxHeight: "400px", objectFit: "cover" }}
              />
            </div>
          </div>

        {/* Who We Are */}
<div className="row align-items-center mb-5 mt-5 g-4">
  {/* Image first on large screens, but second on small screens */}
  <div className="col-lg-6 col-md-6 col-12 order-2 order-md-1">
    <img
      src={whoweare}
      alt="Who We Are"
      className="img-fluid rounded-4 shadow-lg w-100"
      style={{ maxHeight: "400px", objectFit: "cover" }}
    />
  </div>

  {/* Text second on large screens, but first on small screens */}
  <div className="col-lg-5 col-md-6 col-12 offset-lg-1 order-1 order-md-2">
    <h2 className="mb-4 fw-bold" style={{ fontSize: "clamp(1.8rem, 4vw, 2.5rem)" }}>
      Who We Are
    </h2>
    <p className="lead fw-medium " style={{textAlign:"justify"}}>
      We are a team of creative thinkers and professionals committed
      to delivering solutions that exceed expectations.
    </p>
    <p className="lead fw-medium " style={{textAlign:"justify"}}>
      Our dedication to excellence is rooted in passion for innovation
      and a belief that the best results come from creative and practical
      approaches to solving exceptional needs.
    </p>
  </div>
</div>


          {/* Mission */}
          <div className="row align-items-center mb-5 g-4">
            <div className="col-lg-6 col-md-6 col-12">
              <h2 className="mb-4 fw-bold" style={{ fontSize: "clamp(1.8rem, 4vw, 2.5rem)" }}>
                Our Mission
              </h2>
              <p className="lead fw-medium ">
                Our mission is to simplify complexity through technology-driven,
                impactful solutions.
              </p>
              <p className="lead fw-medium " style={{textAlign:"justify"}}>
                With precision, dedication, and innovation, we aim to provide
                integrated approaches that empower industries in a fast-changing
                world.
              </p>
            </div>
            <div className="col-lg-5 col-md-6 col-12 offset-lg-1">
              <img
                src={ourmission}
                alt="Mission"
                className="img-fluid rounded-4 shadow-lg w-100"
                style={{ maxHeight: "400px", objectFit: "cover" }}
              />
            </div>
          </div>

          {/* Vision */}
          <div className="text-center mt-5 pt-4">
            <h2 className="mb-4 fw-bold" style={{ fontSize: "clamp(1.8rem, 4vw, 2.5rem)" }}>
              Our Vision
            </h2>
            <div className="row justify-content-center">
              <div className="col-lg-8 col-md-10 col-12">
                <p className="lead fw-medium " style={{textAlign:"justify"}}>
                  We envision a future where technology bridges gaps, connects
                  people, and paves doors to endless possibilities.
                </p>
                <p className="lead fw-medium " style={{textAlign:"justify"}}>
                  By blending creativity with technical expertise, we aim to revolutionize
                  the construction industry. Our vision embraces a smarter way of living
                  — streamlined, interconnected, and digitally transformed.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
