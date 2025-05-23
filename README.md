# 💼ChianCore Website

A full-stack Multi-Level Marketing (MLM) platform built using the **MERN** stack – MongoDB, Express.js, React.js, and Node.js. This project allows users to register, purchase products, earn referral-based commissions, and manage their earnings. Admins can control the entire system via a secure dashboard.

---

## 🌐 Live Demo

🔗 **Hosted on Render:** [Visit Live Website](https://mlm-website-project.onrender.com/)

---

## 📌 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Screenshots](#-screenshots)
- [Installation](#-installation)
- [Project Structure](#-project-structure)
- [Environment Variables](#-environment-variables)
- [Security](#-security)
- [Author](#-author)
- [License](#-license)

---

## ✨ Features

### 👥 User Features:
- 🔐 Secure registration and login with JWT authentication
- 💳 Razorpay integration for purchasing products or adding balance
- 🛒 E-commerce features like add/remove products to cart and quantity update
- 👥 Referral-based commission system (MLM tree structure)
- 💸 Withdraw request functionality with admin approval
- 📬 Email notifications using Nodemailer
- 📊 User dashboard for balance, referrals, and transactions

### 🛠️ Admin Features:
- ✅ Approve/Decline withdrawal requests
- 🧑‍💻 Block/Unblock users
- 📦 Manage product listings
- 🧾 View and manage all users and their commissions
- 📈 Track platform performance and total earnings

---

## 🧰 Tech Stack

### Frontend:
- React.js
- Axios for API calls
- React Router DOM
- Bootstrap / Custom CSS

### Backend:
- Node.js
- Express.js
- MongoDB with Mongoose
- JWT for secure authentication
- Razorpay SDK for payment processing
- Nodemailer for email functionality
- Bcrypt for password hashing

---

## 📸 Screenshots

> *(Add images here in your actual repo)*

- **Login Page**
- **User Dashboard**
- **Admin Panel**
- **Product Cart**
- **Commission Tree View**

---

## ⚙️ Installation

### 1. Clone the repository

```bash
git clone https://github.com/Abhinavgupta33/mlm-website.git
cd mlm-website
