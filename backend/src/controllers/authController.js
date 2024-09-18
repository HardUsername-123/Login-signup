// const nodemailer = require("nodemailer");
// const jwt = require("jsonwebtoken");
// const bcrypt = require("bcrypt");
// const Patient = require("../models/patients");
// require("dotenv").config();

// exports.forgotPassword = (req, res) => {
//   const { email } = req.body;
//   Patient.findOne({ email: email }).then((user) => {
//     if (!user) {
//       return res.send({ Status: "User not existed" });
//     }
//     const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
//       expiresIn: "1d",
//     });
//     var transporter = nodemailer.createTransport({
//       host: "smtp.gmail.com",
//       port: 587,
//       secure: false,
//       auth: {
//         user: "anthonycrausus14.ncmc@gmail.com",
//         pass: "mrjgbkkdvdfvijf",
//       },
//     });

//     var mailOptions = {
//       from: "anthonycrausus14.ncmc@gmail.com",
//       to: email,
//       subject: "Reset Password Link",
//       text: `http://localhost:3000/reset_password/${user._id}/${token}`,
//     };

//     transporter.sendMail(mailOptions, function (error, info) {
//       if (error) {
//         console.log(error);
//       } else {
//         return res.send({ Status: "Success" });
//       }
//     });
//   });
// };

// exports.resetPassword = (req, res) => {
//   const { id, token } = req.params;
//   const { password } = req.body;

//   jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
//     if (err) {
//       return res.json({ Status: "Error with token" });
//     } else {
//       bcrypt
//         .hash(password, 10)
//         .then((hash) => {
//           Patient.findByIdAndUpdate({ _id: id }, { password: hash })
//             .then((u) => res.send({ Status: "Success" }))
//             .catch((err) => res.send({ Status: err }));
//         })
//         .catch((err) => res.send({ Status: err }));
//     }
//   });
// };
