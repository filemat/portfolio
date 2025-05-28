require('dotenv').config();
const axios = require("axios");
const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const rateLimit = require("express-rate-limit");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

const contactLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 perc
  max: 3,
  message: {
    error: "Too many requests, please try again later.",
  },
});

app.post("/api/contact", contactLimiter, async (req, res) => {
  const { fullName, emailName, messageContent, captchaToken } = req.body;

  if (!captchaToken) {
    return res.status(400).json({ error: "Captcha token is missing." });
  }

  try {
    const verifyUrl = `https://www.google.com/recaptcha/api/siteverify`;
    const response = await axios.post(
      verifyUrl,
      new URLSearchParams({
        secret: process.env.RECAPTCHA_SECRET_KEY,
        response: captchaToken,
      }),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );

    const { success } = response.data;

    if (!success) {
      return res.status(403).json({ error: "Captcha verification failed." });
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: emailName,
      to: process.env.EMAIL_USER,
      subject: `Portfolio message from ${fullName}`,
      text: messageContent,
    };

    await transporter.sendMail(mailOptions);
    return res.status(200).json({ message: "Message sent successfully." });

  } catch (error) {
    console.error("Server error:", error);
    return res.status(500).json({ error: "Server error. Try again later." });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});