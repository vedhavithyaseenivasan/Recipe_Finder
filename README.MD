# 🍽️ Recipe Finder – Full Stack MERN Application

**Recipe Finder** is a secure, dynamic, and user-friendly web application designed to help users discover, search, and explore a wide variety of recipes. Built with the MERN stack (MongoDB, Express.js, React.js, Node.js), it provides robust authentication using **OTP-based email verification**, a smart recipe search feature integrating both internal data and external API, and admin-controlled recipe management.

---

## 🎯 Key Features

### 👤 User Functionality
- Register with OTP-based email verification
- Log in to a personalized dashboard
- Search recipes using:
  - Keywords or ingredients
- View recipe details (image, ingredients, instructions)

### 🛠️ Admin Functionality
- Admin sign-up and login (OTP-based)
- Add new recipes with:
  - Title, image, ingredients, procedure
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
  - jsonwebtoken
  - OTP via nodemailer (Gmail)
- **External API**: Edamam Recipe API
- **State Management**: React State Hooks, react-redux
- **Routing**: react-router-dom
- **HTTP Client**: axios

---

## 🧰 Live Demo

You can access the live version of Recipe Finder here:  
👉 [Visit Recipe Finder](https://culinary-finder.vercel.app/)

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

## 📁 Project Structure

- Frontend -> # React.js frontend client
- Backend ->  # Node.js + Express backend server
- Readme.md

---

## 🔧 Prerequisites

Ensure you have the following installed on your system:

- ✅ Node.js (v18+)
- ✅ npm (Node package manager)
- ✅ MongoDB Atlas account or MongoDB installed locally
- ✅ VS Code or any code editor
- ✅ Internet access (for OTP email and Edamam API)

---
# 🚀 How to Run – Recipe Finder 

The project is built using the **MERN stack** (MongoDB, Express.js, React.js, Node.js) with secure OTP-based authentication and API-integrated recipe search.

- Backend setup
  
   - Navigate to the server folder:
   ```bash
   cd recipe-finder/server
   ```
   - Start the backend server
   ```bash
   node server.js
   ```
   - Server runs at
   ```bash
   http://localhost:5000
   ```

- Frontend Setup
  
   - Open a new terminal and navigate to the client folder
   ```bash
   cd recipe-finder/client
   ```
   - Install frontend dependencies
   ```bash
   npm install
   ```
   - Start the React development server
   ```bash
   npm start
   ```
   - Application will run at
   ```bash
   http://localhost:3000
   ```
---
## 📌 You're Ready!
🎉 The Recipe Finder app is now live on your local machine. You can:

-Register/login with OTP

-Search for recipes using keywords or filters

-Add/edit/delete recipes from the admin panel

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

