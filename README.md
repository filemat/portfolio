# 🧑‍💻 Filep Máté - Personal Portfolio Website

This project is my personal portfolio website, designed to showcase my current skill set, and development interests. I consider it an exciting and insightful project, as it allowed me to practice not only programming but also UI/UX design areas where I also learned a few new tricks along the way.

---

## 🌐 Live Demo

🔗 https://filepmate.hu  

---

## 🛠️ Technologies Used

### Frontend
- **HTML5** – Base structure
- **CSS3** – Custom, responsive styling
- **Vanilla JavaScript (ES6+)** – Interactive behavior, form logic
- **Google reCAPTCHA v2** – Anti-bot protection
- **Figma** – UI/UX design and prototyping
- **Modern Fonts** – Google Fonts: `Outfit`, `Roboto`, `Roboto Flex`

### Backend
- **Node.js** + **Express.js** – RESTful API endpoint (`/api/contact`)
- **Nodemailer** – GMail-based email delivery
- **Axios** – reCAPTCHA verification (via Google API)
- **dotenv** – Secure environment variable handling
- **express-rate-limit** – API request throttling (3 req / min)
- **CORS** – Cross-origin request configuration

### Deployment & Hosting
- **Vercel** – Static frontend hosting with custom domain (`filepmate.hu`)
- **Railway** – Dynamic backend hosting
- **GitHub** – Version control and CI/CD integration

---

## 🧩 Key Features

- 👤 **Clean "About Me" section** with a personalized layout
- 💼 **"Projects" showcase cards** with tech stack tags
- 💬 **Contact form functionality**
  - Full name, email, and message input fields
  - Integrated Google reCAPTCHA v2
  - Form data sent via POST to backend API
  - Success and error feedback handling on the frontend
- ✉️ **Email delivery via GMail SMTP** using `nodemailer`
- 🛡️ **Rate limiting + CAPTCHA** to prevent spam
- 📱 **Responsive design**

---

## 📁 Project Structure

```
portfolio/
├── FRONTEND/                  # Static frontend files (Vercel)
│   ├── index.html             # Main HTML page
│   ├── contact.js             # Contact form logic + API request
│   ├── styles/
│   │   └── main.css           # Custom responsive stylesheet
│   └── assets/                # Icons, badges, SVGs, résumé
│       └── [...svg, badge, cv.pdf etc.]
│
├── BACKEND/                   # Express backend (Railway)
│   ├── server.js              # Nodemailer + reCAPTCHA API logic
│   ├── package.json           # Dependencies and start script
│   └── .env                   # Environment variables (not versioned)
```

The project is split into two main parts: a static frontend hosted on Vercel, and a dynamic backend running on Railway.

🔸 The `FRONTEND` folder is deployed to [Vercel](https://vercel.com) and serves the client-side interface.  
🔸 The `BACKEND` folder is deployed to [Railway](https://railway.app), handling email delivery, reCAPTCHA validation, and API logic.
