import { View, Text } from "react-native";
import React from "react";

const ValidatePassword = (password, confirmPassword) => {
  const [confirmPassword, setConfirmPassword] = useState("");

  let passwordError = "";
  let confirmPasswordError = "";

  // Validate password length
  if (password.length < 8) {
    passwordError = "Password must be at least 8 characters long.";
  }
  // Validate password complexity
  if (!/[A-Z]/.test(password)) {
    passwordError += " Password must contain at least one uppercase letter.";
  }
  if (!/[a-z]/.test(password)) {
    passwordError += " Password must contain at least one lowercase letter.";
  }
  if (!/\d/.test(password)) {
    passwordError += " Password must contain at least one digit.";
  }
  if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    passwordError += " Password must contain at least one special character.";
  }

  // Validate password match
  if (password !== confirmPassword) {
    confirmPasswordError = "Passwords do not match.";
  }

  setErrors({
    password: passwordError,
    confirmPassword: confirmPasswordError,
  });
};

export default ValidatePassword;
