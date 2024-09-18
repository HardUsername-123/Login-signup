//original code
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "../src/pages/Login";
import Register from "../src/pages/Register";
import Home from "../src/pages/Home";
import PatientDashboard from "../src/pages/PatientDashboard";
import ProviderDashboard from "../src/pages/ProviderDashboard";
import ProtectedRoutes from "./Auth/ProtectedRoutes";
import Billing from "./pages/Billing";
import Consultation from "./pages/Consultation";
import Unauthorized from "./components/Unauthorized";
import { jwtDecode } from "jwt-decode";

//otp
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";

const App = () => {
  //authorizition JWT
  const token = localStorage.getItem("token");
  let userRole = null;

  if (token) {
    try {
      const decodedToken = jwtDecode(token);
      userRole = decodedToken.role;
    } catch (error) {
      localStorage.removeItem("token");
    }
  }

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset_password/:id:token" element={<ResetPassword />} />

        {/* Route with token parameter */}
        <Route
          path="/patientDashboard"
          element={
            <ProtectedRoutes allowedRoles={["patient"]} userRole={userRole}>
              <PatientDashboard />
            </ProtectedRoutes>
          }
        />
        <Route
          path="consultation"
          element={
            <ProtectedRoutes allowedRoles={["patient"]} userRole={userRole}>
              <Consultation />
            </ProtectedRoutes>
          }
        />
        <Route
          path="billing"
          element={
            <ProtectedRoutes allowedRoles={["patient"]} userRole={userRole}>
              <Billing />
            </ProtectedRoutes>
          }
        />
        <Route
          path="/providerDashboard"
          element={
            <ProtectedRoutes allowedRoles={["provider"]} userRole={userRole}>
              <ProviderDashboard />
            </ProtectedRoutes>
          }
        />
        {/* Add more protected routes as needed */}
        <Route path="/unauthorized" element={<Unauthorized />} />
      </Routes>
    </Router>
  );
};

export default App;
