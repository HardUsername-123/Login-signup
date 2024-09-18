const express = require("express");
const session = require("express-session");
const dotenv = require("dotenv");
const cors = require("cors");
const bodyParser = require("body-parser");
const helmet = require("helmet");
const app = express();
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");

const Patient = require("./models/patients");

dotenv.config();

const corsOptions = {
  origin: "http://localhost:3000", // Replace with your React app's origin
  credentials: true, // Allow cookies and credentials
};

app.use(cors(corsOptions));

//Middleware
app.use(cors());
app.use(helmet());
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.post("/forgot-password", (req, res) => {
  const { email } = req.body;
  Patient.findOne({ email: email }).then((user) => {
    if (!user) {
      return res.send({ Status: "User not existed" });
    }

    console.log(req.body);
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    var transporter = nodemailer.createTransport({
      host: "gsmtp.gmail.com",
      port: 587,
      secure: true,
      service: "gmail",
      auth: {
        user: "anthonycrausus14.ncmc@gmail.com",
        pass: "09061082039_",
      },
    });
    // mrjgbkkdvdfvijf
    var mailOptions = {
      from: "anthonycrausus14.ncmc@gmail.com",
      to: email,
      subject: "Reset Password Link",
      text: `http://localhost:3000/reset_password/${user._id}/${token}`,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        return res.send({ Status: "Success" });
      }
    });
  });
});

app.post("/reset-password/:id/:token", (req, res) => {
  const { id, token } = req.params;
  const { password } = req.body;

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.json({ Status: "Error with token" });
    } else {
      bcrypt
        .hash(password, 10)
        .then((hash) => {
          Patient.findByIdAndUpdate({ _id: id }, { password: hash })
            .then((u) => res.send({ Status: "Success" }))
            .catch((err) => res.send({ Status: err }));
        })
        .catch((err) => res.send({ Status: err }));
    }
  });
});

const userRoute = require("./routes/userRoute");

app.use("/", userRoute);

module.exports = app;
