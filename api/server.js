require("dotenv").config();

const express = require("express");
const nodemailer = require("nodemailer");


const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Email transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,        // your gmail
    pass: process.env.EMAIL_PASS     // 16 char app password
  }
});

// API to send email
app.post("/send-email", async (req, res) => {
  const { to, subject, message } = req.body;

  try {
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: to,
      subject: subject,
      text: message,
    });

    res.send("Email sent successfully!");
  } catch (error) {
    console.log(error);
    res.status(500).send("Error sending email");
  }
});

const path = require("path");

// Route to open home.html
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "home.html"));
});



app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
