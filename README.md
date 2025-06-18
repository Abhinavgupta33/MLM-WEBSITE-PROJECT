# 💼 ChianCore – MLM Platform (MERN Stack)

**ChianCore** is a full-featured **Multi-Level Marketing (MLM)** web application built with the **MERN stack** – MongoDB, Express.js, React.js, and Node.js. It allows users to register, buy products, earn referral commissions, and manage earnings. Admins can oversee the platform using a secure dashboard.

🌐 **Live Site:** [mlm-website-project.onrender.com](https://mlm-website-project.onrender.com)

---

## 📚 Table of Contents

- [🔑 Features](#-features)
- [🛠️ Tech Stack](#-tech-stack)
- [🖼️ Screenshots](#-screenshots)
- [⚙️ Installation](#-installation)
- [📁 Project Structure](#-project-structure)
- [🔐 Environment Variables](#-environment-variables)
- [🛡️ Security Highlights](#-security-highlights)
- [👨‍💻 Author](#-author)
- [📝 License](#-license)

---

## 🔑 Features

### 👥 User Panel
- 🔐 OTP-based login with **JWT** authentication
- 🛒 Add, remove, and update product quantities in **cart**
- 💳 Razorpay integration for deposits & purchases
- 👨‍👩‍👧‍👦 Multi-level **referral system** with commission auto-distribution
- 💸 **Withdraw** from balance (requests go to admin)
- 📬 Receive **email notifications** via Nodemailer
- 📊 Dashboard: View balance, referral list, commission logs

### 🧑‍💼 Admin Panel
- ✅ Approve or reject withdrawal requests
- 🚫 Block/Unblock users
- 🧾 View all users and their referral trees
- 📦 Manage product inventory
- 📈 Track earnings and activity *(future dashboard ready)*

---

## 🛠️ Tech Stack

| Layer       | Technology |
|-------------|------------|
| Frontend    | React.js, Axios, Bootstrap |
| Backend     | Node.js, Express.js |
| Database    | MongoDB (Mongoose ORM) |
| Auth & APIs | JWT, Nodemailer, Razorpay SDK |
| Styling     | Bootstrap & Custom CSS |

---

## 🖼️ Screenshots

> *(Add screenshots in a `/screenshots` folder and reference them here)*

/screenshots/
├── login.png
├── user-dashboard.png
├── admin-panel.png
├── cart.png
├── referral-tree.png


![Login](./screenshots/login.png)
![User Dashboard](./screenshots/user-dashboard.png)
![Admin Panel](./screenshots/admin-panel.png)
![Cart](./screenshots/cart.png)
![Referral Tree](./screenshots/referral-tree.png)
⚙️ Installation
1. Clone the repositor
2. 
git clone https://github.com/Abhinavgupta33/MLM-WEBSITE-PROJECT.git
cd MLM-WEBSITE-PROJECT

3. Install dependencies
npm install

3. Set up environment variables
Create a .env file and add:

PORT=5000
MONGODB_URI=your_mongo_connection
JWT_SECRET=your_jwt_secret
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password
RAZORPAY_KEY=your_razorpay_key
RAZORPAY_SECRET=your_razorpay_secret
4. Start the server

npm start index.js
📁 Project Structure

MLM-WEBSITE-PROJECT/
├── controllers/     # Route logic
├── models/          # Mongoose schemas
├── routes/          # API routes
├── utils/           # Helper functions (mail, auth)
├── public/          # Static assets
├── views/           # EJS templates (if any)
├── screenshots/     # Project images for documentation
├── .env             # Environment variables
└── server.js        # Main server file
🔐 Environment Variables
Make sure to configure the following:

PORT

MONGODB_URI

JWT_SECRET

EMAIL_USER and EMAIL_PASS (for Gmail, use App Password)

RAZORPAY_KEY and RAZORPAY_SECRET

🛡️ Security Highlights
JWT-based session authentication

OTP verification via email

Razorpay for secure transactions

Role-based access control (Admin/User)

Encrypted passwords with Bcrypt

Environment-based config (via .env)

Secure mailing with SMTP

👨‍💻 Author
Abhinav Gupta
📧 ag9108074@gmail.com
🔗 LinkedIn
💻 GitHub

📝 License
This project is licensed under the MIT License. Feel free to use and improve it!
