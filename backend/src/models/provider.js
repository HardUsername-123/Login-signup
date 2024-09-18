const mongoose = require("mongoose");

const providerSchema = new mongoose.Schema({
  fname: {
    type: String,
    required: true,
  },
  lname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phone: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  licenseId: {
    type: String,
    required: true,
    unique: true,
  },
  hospital: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
  },
  profession: {
    type: String,
    enum: [
      "General Practitioner",
      "Pediatrician",
      "Cardiologist",
      "Surgeon",
      "Registered Nurse",
      "Pharmacist",
      "Physical Therapist",
      "Dentist",
      "Psychiatrist",
      "Veterinarian",
      "Physician Assistant (PA)",
      "Occupational Therapist (OT)",
      "Respiratory Therapist",
      "Radiologic Technologist",
      "Medical Laboratory Technologist",
      "Sonographer",
      "Dietitian/Nutritionist",
      "Speech-Language Pathologist",
      "Family Medicine Physician",
      "Internist",
      "Neurologist",
      "Orthopedic Surgeon",
      "Plastic Surgeon",
      "Ophthalmologist",
      "Dermatologist",
      "Radiologist",
      "Anesthesiologist",
      "Pathologist",
      "Other",
    ],
    required: true,
  },
  otherProfession: {
    type: String,
    required: function () {
      return this.profession === "Other";
    },
  },
});

module.exports = mongoose.model("Provider", providerSchema);
