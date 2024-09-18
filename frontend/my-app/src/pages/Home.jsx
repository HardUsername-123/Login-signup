import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
import { Container, Row, Col, Button } from "react-bootstrap";
import Header from "../components/Header";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUserMd,
  faCalendarAlt,
  faFileAlt,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import Loading from "../components/Loading";
// import About from "../components/About";

const Home = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000);

    return () => clearTimeout(timer); // Clean up the timer on component unmount
  }, []);

  const handleGetStarted = () => {
    navigate("/register");
  };

  return (
    <div className="home">
      {loading ? (
        <Loading loading={loading} />
      ) : (
        <>
          <Header
            brandText="Virtual Health Clinic"
            title="Virtual Health Clinic"
          />
          {/* Hero Section */}
          <div className="bg-home">
            <Container className="my-5 text-center">
              <h1 className="display-4">
                Welcome to the Virtual Health Clinic
              </h1>
              <p className="lead">
                Book your appointments and consult with healthcare providers
                online.
              </p>

              <Button
                variant="primary"
                size="lg"
                className="mt-5 fs-6"
                onClick={handleGetStarted}
              >
                Get Started
              </Button>
            </Container>
          </div>
          {/* Features Section */}
          <Container className="features-section py-5 my-4">
            <Row className="text-center gap-5 gap-lg-0">
              <Col md={4}>
                <div className="feature">
                  <FontAwesomeIcon icon={faUserMd} size="3x" className="mb-3" />
                  <h3>Consultation</h3>
                  <p>
                    Connect with top healthcare providers online for
                    consultations.
                  </p>
                </div>
              </Col>
              <Col md={4}>
                <div className="feature">
                  <FontAwesomeIcon
                    icon={faCalendarAlt}
                    size="3x"
                    className="mb-3"
                  />
                  <h3>Appointment Scheduling</h3>
                  <p>Easily book appointments that fit your schedule.</p>
                </div>
              </Col>
              <Col md={4}>
                <div className="feature">
                  <FontAwesomeIcon
                    icon={faFileAlt}
                    size="3x"
                    className="mb-3"
                  />
                  <h3>Patient Management</h3>
                  <p>Manage your health records and history with ease.</p>
                </div>
              </Col>
            </Row>
          </Container>
          {/*About */}
          {/* <About /> */}
          {/* Footer Section */}
          <div className="footer-section bg-dark text-white text-center py-2">
            <Container>
              <p>&copy; 2024 MicroFlux Company. All rights reserved.</p>
              <p>
                <span
                  className="footer"
                  onClick={() => console.log("Contact was clicked")}
                >
                  Contact Us
                </span>{" "}
                |{" "}
                <span
                  className="footer"
                  onClick={() => console.log("Privacy Policy was clicked")}
                >
                  Privacy Policy
                </span>
              </p>
            </Container>
          </div>
        </>
      )}
    </div>
  );
};

export default Home;
