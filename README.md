# 🚚 Droply – Parcel Delivery Web Application

![Droply Homepage](https://i.ibb.co/1GnRx9xJ/Droply.png)

## 📦 Project Overview

**Droply** is a full-featured parcel transportation platform designed for seamless package management, delivery tracking, and role-based control. It offers a robust and intuitive experience for **customers**, **delivery agents**, and **admins**.

---

## 🌐 Live Website  
🔗 [Visit Droply Website](https://parcel-transpotation.web.app/)

---

## 🎯 Key Features

### 👤 Customer Panel
- 📦 Real-time parcel tracking  
- 🗂️ Access to delivery history  

### 🚴 Delivery Personnel Dashboard
- 📋 View and manage assigned deliveries  
- ✅ Update parcel delivery status in real time  

### 🛠️ Admin Dashboard
- 👥 User and parcel management  
- 🔐 Role-based access with secure JWT authentication  

---

## ⚙️ Tech Stack

### 💻 Frontend
- React, Tailwind CSS, DaisyUI  
- ApexCharts, Recharts, React Query, React Router  
- Stripe.js for payment handling  

### 🖥️ Backend
- Node.js, Express.js  
- MongoDB  
- Stripe for payments  

### 🔐 Authentication
- Firebase Authentication  
- JWT for backend authorization  

### 🚀 Deployment
- Firebase (Client)  
- Vercel / Render (Server)  

---

## 🧪 Environment Setup

### 📁 Step 1: Clone Repositories

**Client**
```bash
git clone https://github.com/spidergroupcm/Droply-Delivery-Website-Client.git
cd parcel-transport-client
```

**Server**
```bash
git clone https://github.com/spidergroupcm/Droply-Delivery-Website-Server.git
cd parcel-transport-server
```

### 🔑 Step 2: Set Environment Variables

**Client `.env`**
```env
VITE_apiKey=your_firebase_api_key
VITE_authDomain=your_firebase_auth_domain
VITE_projectId=your_firebase_project_id
VITE_storageBucket=your_firebase_storage_bucket
VITE_messagingSenderId=your_messaging_sender_id
VITE_appId=your_firebase_app_id
```

**Server `.env`**
```env
DB_USER=your_db_user
DB_PASS=your_db_password
ACCESS_TOKEN_SECRET=your_jwt_secret
STRIPE_SECRET_KEY=your_stripe_secret_key
```

### 📦 Step 3: Install Dependencies

**Client**
```bash
npm install
npm run dev
```

**Server**
```bash
npm install
nodemon start
```

---

## 📚 Dependencies

### 📌 Client-Side  
Includes:
- React, Firebase, Tailwind CSS, DaisyUI  
- ApexCharts, Recharts, Stripe.js, Axios  
- Leaflet, React Icons, SweetAlert2, etc.

### 📌 Server-Side  
Includes:
- Express, MongoDB, JWT, Dotenv, CORS, Stripe

---

## 👨‍💻 Developer  
**ASM Mohebullah**  
MERN Stack Developer | +88 01789711089 | Bangladesh

>
