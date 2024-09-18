// src/components/Dashboard.js
import React from "react";
import { Button, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import UserNavbar from "../components/UserNavbar";

const PatientDashboard = () => {
  const navigate = useNavigate();

  const email = localStorage.getItem("email");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    // Redirect to login or another page
    navigate("/login");
  };

  // const navLinks = [
  //   { path: "/login", label: "Login" },
  //   { path: "/register", label: "Register" },
  // ];

  return (
    <div className="vh-100 overflow-hidden">
      <UserNavbar
        brandText="Virtual Health Clinic"
        // title="Virtual Health Clinic"
      />
      <Container className="mt-5 vh-100">
        <h2>Welcome, {email}</h2> {/* Display the email here */}
        <h2>Patient Dashboard</h2>
        <Link to="/consultation">
          <Button variant="primary" className="m-2">
            Start Consultation
          </Button>
        </Link>
        <Link to="/billing">
          <Button variant="secondary" className="m-2">
            Billing
          </Button>
        </Link>
        <Button variant="secondary" className="m-2" onClick={handleLogout}>
          Log out
        </Button>
      </Container>
    </div>
  );
};

export default PatientDashboard;
