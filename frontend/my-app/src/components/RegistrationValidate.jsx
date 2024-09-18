// Function to validate phone number
exports.validatePhone = (phone) => {
  const phoneRegex = /^\d+$/; // Check if phone contains only digits
  if (!phoneRegex.test(phone)) {
    return "Phone number should contain only digits.";
  }
  if (phone.length !== 11 && phone.length !== 13) {
    return "Phone number should be either 11 or 13 digits long.";
  }
  return null;
};

// Function to validate email
exports.validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return "Invalid email format.";
  }
  return null;
};

//Function to validate password
exports.validatePassword = (password) => {
  if (password.length < 7) {
    return "Password should be at least 7 characters long.";
  }
  return null;
};

//Function to validate license number
exports.validateLicense = (licenseId) => {
  const licenseRegex = /^\d+$/; // Check if license contains only digits
  if (!licenseRegex.test(licenseId)) {
    return "License id number should contain only digits.";
  }
  if (licenseId.length < 7) {
    return "license id number should be either 7 digits long.";
  }
  return null;
};
