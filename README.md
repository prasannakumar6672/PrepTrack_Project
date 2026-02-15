# 🚀 PrepTrack  
### Full-Stack Interview Preparation Tracker  

---

## 🌐 Live Application

🔹 **Frontend (Vercel)**  
https://prep-track-project.vercel.app  

🔹 **Backend API (Render)**  
https://preptrack-project.onrender.com  

---

## 📌 About The Project

**PrepTrack** is a cloud-deployed full-stack web application designed to help users systematically manage and track their interview preparation topics.

The application enables users to:

- Create interview preparation topics  
- Track learning progress  
- Update confidence levels  
- Filter and sort topics  
- View summary analytics  
- Store data persistently in the cloud  

This project demonstrates real-world full-stack development, REST API integration, environment-based configuration, and cloud deployment.

---

## 🏗️ Tech Stack

### 🎨 Frontend
- Next.js (App Router)
- TypeScript
- Tailwind CSS
- PNPM
- Hosted on **Vercel**

### ⚙️ Backend
- Node.js
- Express.js
- MongoDB (Mongoose)
- RESTful API architecture
- Hosted on **Render**

### 🗄 Database
- MongoDB Atlas (Cloud)

---

## ✨ Key Features

### 🔹 Core Functionality
- Full CRUD operations (Create, Read, Update, Delete)
- Persistent cloud database storage
- Environment-based configuration
- Secure and production-ready CORS handling

### 🔹 Smart Dashboard
- Total topics counter
- Topics in progress
- Revised topics
- Average confidence score calculation

### 🔹 Advanced Controls
- Search by title
- Filter by category
- Filter by status
- Sort by:
  - Newest
  - Oldest
  - Confidence level
  - Recently revised

---

## 🧠 Architecture Overview

Frontend (Next.js)
↓
REST API (Express.js)
↓
MongoDB Atlas


**Highlights:**
- Centralized API layer (`frontend/lib/api.ts`)
- Environment-driven configuration
- No hardcoded backend URLs
- Clear separation of frontend + backend logic

---

---

## 🚀 Local Development Setup

### 1️⃣ Clone Repository

git clone https://github.com/prasannakumar6672/PrepTrack_Project.git

cd PrepTrack_Project


---

### 2️⃣ Backend Setup
 cd backend
 npm install

 
Create `.env` in backend folder:
MONGODB_URI=your_mongodb_connection_string
PORT=5000


Start backend:

---

### 3️⃣ Frontend Setup

Open a new terminal:
cd frontend
pnpm install

Create `.env.local` in frontend folder:
NEXT_PUBLIC_API_URL=http://localhost:5000

Start frontend:
 pnpm dev
 
---

## 🌍 Deployment Details

### 🔹 Backend (Render)
- Connected to MongoDB Atlas
- Environment variables configured securely
- CORS configured for production domain

### 🔹 Frontend (Vercel)
Production environment variable:

---

## 📈 What This Project Demonstrates

- Full-stack REST API integration  
- Cloud deployment workflow  
- Environment configuration handling  
- CORS debugging in production  
- MongoDB Atlas integration  
- Real-world deployment issue resolution  

---

## 👨‍💻 Author

**Prasanna Kumar**  
B.Tech CSE (AI & ML)  

🔗 GitHub: https://github.com/prasannakumar6672  
🔗 LinkedIn: https://www.linkedin.com/in/prashuyadav360  


