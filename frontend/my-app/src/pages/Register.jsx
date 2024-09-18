import React, { useState } from "react";
import {
  Form,
  Button,
  Container,
  Row,
  Col,
  Card,
  Modal,
} from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import React Toastify CSS
import Header from "../components/Header"; //Header component
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
import {
  validatePhone,
  validateEmail,
  validatePassword,
  validateLicense,
} from "../components/RegistrationValidate";

const Register = () => {
  const [role, setRole] = useState(""); // patient or provider
  const [step, setStep] = useState(1); // current step in the wizard
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [phone, setPhone] = useState("");
  const [licenseId, setLicenseId] = useState(""); // only for providers
  const [profession, setProfession] = useState("");
  const [hospital, setHospital] = useState("");
  const [showModal, setShowModal] = useState(false); // State to control the modal
  const [otherProfession, setOtherProfession] = useState("");
  // const [loading, setLoading] = useState(false);
  // const [confirmPassword, setConfirmPassword] = useState("");
  // const [errors, setErrors] = useState({ password: "", confirmPassword: "" });

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

  const handleBack = () => {
    setStep(step - 1);
  };

  const handleNext = () => {
    if (step === 1) {
      if ("patient" !== "provider") {
        setFname("");
        setLname("");
        setEmail("");
        setPhone("");
        setPassword("");
        setConfirmPass("");
      }

      if ("provider" !== "patient") {
        setHospital("");
        setLicenseId("");
      }

      if (!role) {
        notify("Please select a role.", "error");
        return;
      }
      setStep(2);
    } else if (step === 2) {
      if (!fname || !lname || !email || !password || !phone) {
        notify("Please fill in all fields.", "error");
        return;
      }
      const emailError = validateEmail(email);
      if (emailError) {
        notify(emailError, "error");
        return;
      }
      const phoneError = validatePhone(phone);
      if (phoneError) {
        notify(phoneError, "error");
        return;
      }
      const passwordError = validatePassword(password);
      if (passwordError) {
        notify(passwordError, "error");
        return;
      }

      if (role === "provider" && !licenseId) {
        notify("Please enter your license number.", "error");
        return;
      }

      if (role === "provider" && !hospital) {
        notify(
          "Please enter your hospital or clinic that you currently work.",
          "error"
        );
        return;
      }

      if (role === "provider" && !profession) {
        notify("Please enter your Profession for provider.", "error");
        return;
      }

      if (profession === "Other" && !otherProfession.trim()) {
        notify("Please specify your profession.", "error");
        return;
      }

      if (password !== confirmPass) {
        notify("Passwords do not match", "error");
        return;
      }

      if (role === "provider") {
        const licenseError = validateLicense(licenseId);
        if (licenseError) {
          notify(licenseError, "error");
          return;
        }
        return setStep(3);
      }
      setStep(3);
    }
  };

  console.log(handleNext);

  //Submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      fname: fname.trim(),
      lname: lname.trim(),
      email: email.trim(),
      password: password.trim(),
      phone: phone.trim(),
      role,
      licenseId,
      hospital: hospital.trim(),
      profession: profession === "Other" ? "Other" : profession,
      otherProfession: profession === "Other" ? otherProfession : "",
    };

    try {
      const response = await axios.post(
        "http://localhost:5000/register",
        formData
      ); //fetch api

      console.log(response);

      if (response.status === 200) {
        localStorage.setItem("token", response.data.token);
        notify("Registration successful!", "success");
        setShowModal(true); // Show the success modal
      } else {
        notify("Registration failed.", "error");
      }
    } catch (error) {
      // Handle different error responses
      if (error.response && error.response.status === 400) {
        // Assuming 404 is returned for wrong email
        notify("Email is already in use.", "error");
      } else {
        notify("An error occurred. Please try again.", "error");
      }
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    navigate("/login"); // Close the modal when the button is clicked
  };

  return (
    <div className="bg-register">
      <Header brandText="Virtual Health Clinic" title="Virtual Health Clinic" />
      <Container
        className="mt-5 pb-lg-5 d-flex justify-content-center align-items-center"
        style={{ minHeight: "100vh", overflow: "hidden" }}
      >
        <Card
          className="p-4 m-4 m-lg-0 mt-xs-5 mt-sm-5 mt-md-5 mt-lg-5 register-card w-100 h-100 boder-none"
          style={{ maxWidth: "500px" }}
        >
          {step === 1 && (
            <>
              <h2 className="text-center mb-4">Register</h2>
              <div className="dot my-3 d-flex justify-content-between">
                <span className="text">{step}</span>
                <span className="textEmty">2</span>
                <span className="textEmty">3</span>
                <span className="line"></span>
              </div>

              <Form>
                <Form.Group controlId="formBasicRole" className="mb-4">
                  <Form.Label>Are you a:</Form.Label>
                  <Form.Select
                    as="select"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                  >
                    <option value="">Select</option>
                    <option value="patient">Patient</option>
                    <option value="provider">Provider</option>
                  </Form.Select>
                </Form.Group>
                <Button
                  variant="primary"
                  onClick={handleNext}
                  className="w-100"
                >
                  Next
                </Button>
              </Form>
            </>
          )}

          {step === 2 && (
            <>
              <h2 className="text-center mb-4">
                {role === "patient"
                  ? "Patient Registration"
                  : "Provider Registration"}
              </h2>
              <div className="dot my-3 d-flex justify-content-between">
                <span className="textEmty">1</span>
                <span className="text">{step}</span>
                <span className="textEmty">3</span>
                <span className="line"></span>
              </div>
              <Form>
                <Row>
                  <Col>
                    <Form.Group controlId="formBasicName" className="mb-3">
                      <Form.Control
                        type="text"
                        placeholder="First name"
                        value={fname}
                        onChange={(e) => setFname(e.target.value)}
                      />
                    </Form.Group>
                  </Col>

                  <Col>
                    <Form.Group controlId="formBasicName" className="mb-3">
                      <Form.Control
                        type="text"
                        placeholder="Last name"
                        value={lname}
                        onChange={(e) => setLname(e.target.value)}
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Form.Group controlId="formBasicEmail" className="mb-3">
                  <Form.Control
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </Form.Group>

                <Form.Group controlId="formBasicPhone" className="mb-3">
                  <Form.Control
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="Enter your phone number"
                  />
                </Form.Group>

                {role === "provider" && (
                  <>
                    <Form.Group controlId="formBasicLicense" className="mb-3">
                      <Form.Control
                        type="text"
                        value={licenseId}
                        onChange={(e) => setLicenseId(e.target.value)}
                        placeholder="Enter your license number"
                      />
                    </Form.Group>

                    <Form.Group
                      controlId="formBasicProfession"
                      className="mb-3"
                    >
                      <Form.Select
                        value={profession}
                        onChange={(e) => {
                          setProfession(e.target.value);
                          if (e.target.value !== "Other") {
                            setOtherProfession(""); // Clear the other profession field if a predefined option is selected
                          }
                        }}
                      >
                        <option value="">Select profession</option>
                        <option value="General Practitioner">
                          General Practitioner
                        </option>
                        <option value="Pediatrician">Pediatrician</option>
                        <option value="Cardiologist">Cardiologist</option>
                        <option value="Surgeon">Surgeon</option>
                        <option value="Registered Nurse">
                          Registered Nurse
                        </option>
                        <option value="Pharmacist">Pharmacist</option>
                        <option value="Physical Therapist">
                          Physical Therapist
                        </option>
                        <option value="Dentist">Dentist</option>
                        <option value="Psychiatrist">Psychiatrist</option>
                        <option value="Veterinarian">Veterinarian</option>
                        <option value="Physician Assistant (PA)">
                          Physician Assistant (PA)
                        </option>
                        <option value="Occupational Therapist (OT)">
                          Occupational Therapist (OT)
                        </option>
                        <option value="Respiratory Therapist">
                          Respiratory Therapist
                        </option>
                        <option value="Radiologic Technologist">
                          Radiologic Technologist
                        </option>
                        <option value="Medical Laboratory Technologist">
                          Medical Laboratory Technologist
                        </option>
                        <option value="Sonographer">Sonographer</option>
                        <option value="Dietitian/Nutritionist">
                          Dietitian/Nutritionist
                        </option>
                        <option value="Speech-Language Pathologist">
                          Speech-Language Pathologist
                        </option>
                        <option value="Family Medicine Physician">
                          Family Medicine Physician
                        </option>
                        <option value="Internist">Internist</option>
                        <option value="Neurologist">Neurologist</option>
                        <option value="Orthopedic Surgeon">
                          Orthopedic Surgeon
                        </option>
                        <option value="Plastic Surgeon">Plastic Surgeon</option>
                        <option value="Ophthalmologist">Ophthalmologist</option>
                        <option value="Dermatologist">Dermatologist</option>
                        <option value="Radiologist">Radiologist</option>
                        <option value="Anesthesiologist">
                          Anesthesiologist
                        </option>
                        <option value="Pathologist">Pathologist</option>
                        <option value="Other">Other</option>
                      </Form.Select>
                      {profession === "Other" && (
                        <Form.Control
                          type="text"
                          placeholder="Enter your profession"
                          value={otherProfession}
                          onChange={(e) => setOtherProfession(e.target.value)}
                          className=" mt-2"
                        />
                      )}
                    </Form.Group>

                    <Form.Group controlId="formBasicHospital" className="mb-3">
                      <Form.Control
                        type="text"
                        placeholder="Enter your current hospital"
                        value={hospital}
                        onChange={(e) => setHospital(e.target.value)}
                      />
                    </Form.Group>
                  </>
                )}
                <Row>
                  <Col>
                    <Form.Group controlId="formBasicPassword" className="mb-3">
                      <Form.Control
                        type="password"
                        placeholder="Create a password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group
                      controlId="formBasicConfirmPassword"
                      className="mb-3"
                    >
                      <Form.Control
                        type="password"
                        placeholder="Confirm password"
                        value={confirmPass}
                        onChange={(e) => setConfirmPass(e.target.value)}
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <div className="d-flex justify-content-between">
                  <Button
                    variant="primary"
                    onClick={handleBack}
                    className="mr-2"
                  >
                    <IoIosArrowBack /> Back
                  </Button>
                  <Button
                    variant="primary"
                    onClick={handleNext}
                    className=" ml-2"
                  >
                    Next <IoIosArrowForward />
                  </Button>
                </div>
              </Form>
            </>
          )}

          {step === 3 && (
            <>
              <h2 className="text-center mb-4">Registration Confirmation</h2>
              <div className="dot my-3 d-flex justify-content-between">
                <span className="textEmty">1</span>
                <span className="textEmty">2</span>
                <span className="text">{step}</span>
                <span className="line"></span>
              </div>
              <Form onSubmit={handleSubmit}>
                <p>Please confirm your details before submitting.</p>
                <ul className="list-unstyled p-3 rounded shadow-sm bg-light">
                  <li className="mb-3">
                    <strong className="text-primary">Role:</strong>{" "}
                    <span className="text-dark">
                      {role.charAt(0).toUpperCase() +
                        role.slice(1).toLowerCase()}
                    </span>
                  </li>
                  <li className="mb-3">
                    <strong className="text-primary">First Name:</strong>{" "}
                    <span className="text-dark">{fname}</span>
                  </li>
                  <li className="mb-3">
                    <strong className="text-primary">Last Name:</strong>{" "}
                    <span className="text-dark">{lname}</span>
                  </li>
                  <li className="mb-3">
                    <strong className="text-primary">Email:</strong>{" "}
                    <span className="text-dark">{email}</span>
                  </li>
                  <li className="mb-3">
                    <strong className="text-primary">Phone:</strong>{" "}
                    <span className="text-dark">{phone}</span>
                  </li>
                  {role === "provider" && (
                    <>
                      <li className="mb-3">
                        <strong className="text-primary">
                          License Number:
                        </strong>{" "}
                        <span className="text-dark">{licenseId}</span>
                      </li>
                      <li className="mb-3">
                        <strong className="text-primary">Profession:</strong>{" "}
                        <span className="text-dark">{profession}</span>
                      </li>
                      <li className="mb-3">
                        <strong className="text-primary">Hospital:</strong>{" "}
                        <span className="text-dark">{hospital}</span>
                      </li>
                    </>
                  )}
                </ul>

                <div className="d-flex justify-content-between">
                  <Button
                    variant="primary"
                    onClick={handleBack}
                    className="mr-2"
                  >
                    <IoIosArrowBack /> Back
                  </Button>
                  <Button
                    variant="primary"
                    type="submit"
                    className="ml-2"
                    // disabled={errors.password || errors.confirmPassword}
                  >
                    Submit <IoIosArrowForward />
                  </Button>
                </div>
              </Form>
            </>
          )}
        </Card>
      </Container>
      <ToastContainer /> {/* Container for toast notifications */}
      {/* Modal to display success message */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Success</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            {role.charAt(0).toUpperCase() + role.slice(1).toLowerCase()}{" "}
            Registration completed successfully!
          </p>
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

export default Register;
