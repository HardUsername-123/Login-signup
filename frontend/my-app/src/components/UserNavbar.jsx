import React, { useState, useEffect } from "react";
import { Nav, Navbar, Container, Button, Offcanvas } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FaBars } from "react-icons/fa";

import axios from "axios";

const UserNavbar = ({ brandText }) => {
  const [showDrawer, setShowDrawer] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  const email = localStorage.getItem("email");

  const toggleDrawer = () => {
    setShowDrawer(!showDrawer);
  };

  const handleResize = () => {
    setIsMobile(window.innerWidth < 768);
    setIsMobile(window.innerWidth < 990);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem("token");

      if (token) {
        try {
          const response = await axios.get("http://localhost:5000/user", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          console.log(response.data);
        } catch (err) {
          console.log("Error fetching data: ", err);
        }
      }
    };
    fetchUserData();
  }, []);

  return (
    <Navbar bg="light" className="header-shodow p-3 w-md-50">
      <Container>
        <>
          {!isMobile ? (
            <div className="d-flex justify-content-between align-items-center w-100">
              <Navbar.Brand
                as={Link}
                to=""
                className="d-flex justify-content-center align-items-center gap-3"
                style={{ textDecoration: "none" }}
              >
                <img
                  src="https://img.icons8.com/ultraviolet/80/000000/caduceus.png"
                  alt={brandText}
                  style={{ width: "30px" }}
                />
                <div>
                  <h5>{email}</h5>
                </div>
              </Navbar.Brand>

              <Nav className="ml-auto">
                <Nav.Link
                  href="/billing"
                  className="text-decoration-none gap-2"
                >
                  Billing
                </Nav.Link>
                <Nav.Link
                  href="/consultation"
                  className="text-decoration-none gap-2"
                >
                  Consultation
                </Nav.Link>
              </Nav>
            </div>
          ) : (
            <div>
              <Button variant="transparent" onClick={toggleDrawer}>
                <FaBars />
              </Button>
              <Offcanvas show={showDrawer} onHide={toggleDrawer}>
                <Offcanvas.Header closeButton>
                  <Offcanvas.Title>{email}</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                  <Container>
                    <div></div>
                    <div className="d-flex flex-sm-column flex-md-column flex-lg-row gap-2 mt-3">
                      <Nav.Link
                        href="/billing"
                        className="text-decoration-none gap-2"
                      >
                        Billing
                      </Nav.Link>
                      <Nav.Link
                        href="/consultation"
                        className="text-decoration-none gap-2"
                      >
                        Consultation
                      </Nav.Link>
                    </div>
                  </Container>
                </Offcanvas.Body>
              </Offcanvas>
            </div>
          )}
        </>
      </Container>
    </Navbar>
  );
};

export default UserNavbar;
