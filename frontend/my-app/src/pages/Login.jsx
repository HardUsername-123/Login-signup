import React, { useState } from "react";
import {
  Form,
  Button,
  Container,
  Row,
  Col,
  Card,
  Modal,
  Spinner,
} from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import Header from "../components/Header";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  // Notify function to show toast notifications
  const notify = (message, type) => {
    toast(message, {
      type: type,
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    setLoading(true);

    // Validate input data
    if (!email || !password) {
      notify("Please fill in all fields.", "error");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/login", {
        email,
        password,
      });

      const token = response.data.token;
      const role = response.data.role;

      if (response.status === 200) {
        localStorage.setItem("token", token);
        localStorage.setItem("email", email);

        setShowModal(true);
        notify("Logged in successfully!", "success"); // Success toast

        setTimeout(() => {
          if (role === "provider") {
            navigate("/providerDashboard");
          } else if (role === "patient") {
            navigate("/patientDashboard");
          }
        }, 2000);
      }
    } catch (error) {
      // Handle different error responses
      if (error.response && error.response.status === 401) {
        notify("Wrong password.", "error"); // Error toast
      } else if (error.response && error.response.status === 404) {
        notify("Wrong email or password.", "error"); // Error toast
      } else {
        notify("An error occurred. Please try again.", "error"); // Error toast
      }
    } finally {
      setLoading(false);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div className="bg-login">
      <Header brandText="Virtual Health Clinic" title="Virtual Health Clinic" />

      <Container
        className="d-flex justify-content-center align-items-center"
        style={{ minHeight: "100vh" }}
      >
        <Card
          className="p-4 m-4 m-lg-0 login-card w-100 boder-none"
          style={{ maxWidth: "400px" }}
        >
          <h2 className="text-center mb-4">Log in</h2>
          <Form onSubmit={handleLogin}>
            <Row>
              <Col>
                <Form.Group controlId="formBasicEmail" className="mb-3 mt-4">
                  <Form.Control
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={loading}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group controlId="formBasicPassword" className="mb-3">
                  <Form.Control
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={loading}
                  />
                  <div className="w-100">
                    <span
                      className="forgot-password d-flex justify-content-end"
                      onClick={() => navigate("/forgot-password")}
                    >
                      Forgot password?
                    </span>
                  </div>
                </Form.Group>
              </Col>
            </Row>
            <Button
              variant="primary"
              type="submit"
              className="w-100"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Spinner
                    as="span"
                    animation="border"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                  />{" "}
                  Loading...
                </>
              ) : (
                "Login"
              )}
            </Button>
          </Form>
          <div className="text-center mt-3">
            <small>
              Don't have an account? <a href="/register">Register</a>
            </small>
          </div>
        </Card>
      </Container>
      <ToastContainer />
      {/* Modal to display success message */}
      <Modal show={showModal} onHide={handleCloseModal} className="">
        <Modal.Header closeButton>
          <Modal.Title>Success</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Log in successfully!</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Login;
