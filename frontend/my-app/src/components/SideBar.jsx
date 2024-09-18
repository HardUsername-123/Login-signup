// src/components/Sidebar.js
import React, { useState, useEffect } from "react";
import { Navbar, Nav, NavDropdown, Button, Offcanvas } from "react-bootstrap";
import { FaHome, FaUser, FaCog, FaBars } from "react-icons/fa";

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [showDrawer, setShowDrawer] = useState(false);

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  const handleResize = () => {
    setIsMobile(window.innerWidth < 768);
  };

  const toggleDrawer = () => {
    setShowDrawer(!showDrawer);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const DrawerContent = (
    <Nav className="flex-column dico mt-5 mt-sm-0">
      <Nav.Link href="/consultation" className="text-decoration-none gap-2">
        <FaHome /> {!isCollapsed && <span>Consultation</span>}
      </Nav.Link>
      <Nav.Link href="/billing" className="text-decoration-none gap-2">
        <FaUser /> {!isCollapsed && <span>Billing</span>}
      </Nav.Link>
      <NavDropdown
        title={!isCollapsed ? "Settings" : <FaCog />}
        id="basic-nav-dropdown"
      >
        <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
        <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
        <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
      </NavDropdown>
    </Nav>
  );

  return (
    <>
      {!isMobile ? (
        <div className={`sidebar ${isCollapsed ? "collapsed" : ""}`}>
          <Navbar expand="lg" className="flex-column">
            <Navbar.Toggle
              aria-controls="basic-navbar-nav"
              onClick={toggleSidebar}
            >
              <FaBars />
            </Navbar.Toggle>
            <Navbar.Collapse id="basic-navbar-nav">
              {DrawerContent}
            </Navbar.Collapse>
          </Navbar>
        </div>
      ) : (
        <div>
          <Button variant="transparent" onClick={toggleDrawer}>
            <FaBars />
          </Button>
          <Offcanvas show={showDrawer} onHide={toggleDrawer}>
            <Offcanvas.Header closeButton>
              <Offcanvas.Title>Menu</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>{DrawerContent}</Offcanvas.Body>
          </Offcanvas>
        </div>
      )}
    </>
  );
};

export default Sidebar;
