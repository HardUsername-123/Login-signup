// Registration Controller
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Patient = require("../models/patients");
const Provider = require("../models/provider");
require("dotenv").config(); // To access environment variables

// Registration Controller
exports.register = async (req, res) => {
  try {
    const {
      fname,
      lname,
      email,
      phone,
      password,
      licenseId,
      profession,
      hospital,
      role,
      otherProfession,
    } = req.body;

    // Validate input data
    if (!fname || !lname || !email || !phone || !password || !role) {
      return res.status(400).json({ message: "Please fill in all fields." });
    }

    let user;

    if (role === "provider") {
      // Ensure licenseId is provided for providers
      if (!licenseId) {
        return res
          .status(400)
          .json({ message: "License ID is required for providers." });
      }

      // Check if provider already exists
      const existingProvider = await Provider.findOne({ email });
      if (existingProvider) {
        return res.status(400).json({ message: "Email already in use." });
      }

      user = new Provider({
        fname,
        lname,
        email,
        phone,
        licenseId,
        profession,
        hospital,
        role,
        profession: profession,
        otherProfession: profession === "Other" ? otherProfession : "",
      });
    } else if (role === "patient") {
      // Check if patient already exists
      const existingPatient = await Patient.findOne({ email });
      if (existingPatient) {
        return res.status(400).json({ message: "Email already in use." });
      }

      user = new Patient({
        fname,
        lname,
        email,
        phone,
        role,
      });
    } else {
      return res.status(400).json({ message: "Invalid role specified." });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    user.password = hashedPassword;

    await user.save();
    // Generate JWT token
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );

    return res.status(200).json({ token, message: "Created Successfully!" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Error creating user" });
  }
};

// Login Controller
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate input data
    if (!email || !password) {
      return res.status(400).json({ message: "Please fill in all fields." });
    }

    // Find user by email
    let user = await Provider.findOne({ email });
    if (!user) {
      user = await Patient.findOne({ email });
    }

    if (!user) {
      return res.status(404).json({ message: "Invalid email" });
    }
    // Check password
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(401).json({ message: "Invalid password" });
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );

    res
      .status(200)
      .json({ token, role: user.role, message: "Login successful!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error logging in" });
  }
};

// upadate-password

exports.updatePass = async (req, res) => {
  const { email, newPassword } = req.body;

  try {
    // Find the user by email
    const user = await Patient.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    // Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update the user's password in the database
    user.password = hashedPassword;
    await user.save();

    res.status(200).json({ message: "Password updated successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
