// src/components/Dashboard.js
import React from "react";
import { Button, Container } from "react-bootstrap";
// import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import UserNavbar from "../components/UserNavbar";

const ProviderDashboard = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("token");
    // Redirect to login or another page
    navigate("/login");
  };

  return (
    <div className="">
      <UserNavbar
        brandText="Virtual Health Clinic"
        // title="Virtual Health Clinic"
      />
      <Container>
        <div className="mt-5">
          <h2>Welcome to provider Dashboard</h2>
          <Button variant="secondary" className="m-2" onClick={handleLogout}>
            Log out
          </Button>
        </div>
      </Container>
    </div>
  );
};

export default ProviderDashboard;
