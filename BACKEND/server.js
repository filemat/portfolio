require('dotenv').config();
const axios = require("axios");
const express = require('express');
const fetch = require('node-fetch');
const nodemailer = require('nodemailer');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

app.post('/api/contact', async (req, res) => {
  const { fullName, emailName, messageContent, captchaToken } = req.body;

  if (!fullName || !emailName || !messageContent || !captchaToken){
    return res.status(400).json({ error: 'All input fields are neccessary!' });
  }

  const secretKey = process.env.RECAPTCHA_SECRET_KEY;
  const verificationUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${captchaToken}`;

  try {
    const captchaRes = await fetch(verificationUrl, { method: 'POST' });
      const captchaData = await captchaRes.json();

      if (!captchaData.success) {
        return res.status(403).json({ error: 'Captcha verification failed.' });
      }

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    const mailOptions = {
      from: emailName,
      to: process.env.EMAIL_USER,
      subject: `New message - ${fullName}`,
      text: messageContent,
      html: `<p><strong>From:</strong> ${fullName} (${emailName})</p><p>${messageContent}</p>`
    };

    await transporter.sendMail(mailOptions);
    res.status(200).json({ success: true, message: 'Message sent!' });

  } catch (error) {
    console.error('Error during email send!:', error);
    res.status(500).json({ error: 'Delivery of message was not successfull!.' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
