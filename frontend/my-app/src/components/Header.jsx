import React from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { Link } from "react-router-dom";

const Header = ({ brandText, title }) => {
  const links = [
    { path: "/login", label: "Login" },
    { path: "/register", label: "Register" },
  ];
  return (
    <Navbar bg="light" expand="lg" className="header-shodow p-3 fixed-top">
      <Container>
        <Navbar.Brand
          as={Link}
          to="/"
          className="d-flex justify-content-center align-items-center gap-3"
          style={{ textDecoration: "none" }}
        >
          <img
            src="https://img.icons8.com/ultraviolet/80/000000/caduceus.png"
            alt={brandText}
            style={{ width: "30px" }}
          />
          <h5>{title}</h5>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
            {links.map((link, index) => (
              <Nav.Link
                key={index}
                as={Link}
                to={link.path}
                style={{ textDecoration: "none" }}
              >
                {link.label}
              </Nav.Link>
            ))}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
