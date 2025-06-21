# 🍽️ Recipe Finder – Full Stack MERN Application

**Recipe Finder** is a secure, dynamic, and user-friendly web application designed to help users discover, search, and explore a wide variety of recipes. Built with the MERN stack (MongoDB, Express.js, React.js, Node.js), it provides robust authentication using **OTP-based email verification**, a smart recipe search feature integrating both internal data and external API, and admin-controlled recipe management.

---

## 🎯 Key Features

### 👤 User Functionality
- Register with OTP-based email verification
- Log in to a personalized dashboard
- Search recipes using:
  - Keywords or ingredients
  - Cuisine filters
  - Time, calories, or difficulty
- View recipe details (image, ingredients, instructions, calories, time)

### 🛠️ Admin Functionality
- Admin sign-up and login (OTP-based)
- Add new recipes with:
  - Title, image, ingredients, procedure
  - Time and calorie details
- Edit or delete existing recipes
- No user-generated submissions (ensures data quality)

### 📩 Email Notification
- OTP sent for email verification
- Passwords securely hashed using bcrypt

---

## 🧰 Tech Stack

- **Frontend**: React.js, Bootstrap, React Router DOM, AOS
- **Backend**: Node.js, Express.js
- **Database**: MongoDB Atlas
- **Authentication & Security**:
  - bcryptjs
  - jsonwebtoken
  - OTP via nodemailer (Gmail)
- **External API**: Edamam Recipe API
- **State Management**: React State Hooks, react-redux
- **Routing**: react-router-dom
- **HTTP Client**: axios

---

## 📦 Modules Overview

| Module | Description |
|--------|-------------|
| **Authentication** | OTP email verification, secure password storage |
| **Recipe Management** | Admins can add, edit, and remove recipes |
| **Recipe Search** | Users can search using keywords, filters, or cuisine |
| **Admin Management** | Admin-only interface for secure content control |
| **Email Notification** | Sends OTPs to users for signup verification |

---

## 🛠️ System Requirements

- Node.js (v18+)
- MongoDB Atlas account
- Visual Studio Code
- Internet access for API and email service

---
## 🔮 Future Enhancements
✅ Personalized user profiles with recipe bookmarks

✅ AI-powered recipe recommendations

✅ Multilingual recipe support

✅ Mobile app integration using React Native

✅ Graph-based analytics dashboard for admin

---

## ✅ Conclusion
This full-stack project provided real-time experience in developing scalable and secure web applications using the MERN stack. It allowed us to apply frontend, backend, database, and API integration skills in a collaborative environment.

---
⭐ Support
If you found this project useful, please ⭐ the repo and share your thoughts.
Feedback, contributions, and forks are always welcome!

