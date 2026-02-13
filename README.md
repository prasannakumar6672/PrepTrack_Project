🚀 PrepTrack
Full-Stack Interview Preparation Tracker








🌐 Live Application

🔹 Frontend: https://prep-track-project.vercel.app

🔹 Backend API: https://preptrack-project.onrender.com

📌 About The Project

PrepTrack is a full-stack web application that helps users manage and track their interview preparation topics in a structured way.

It enables:

Creating preparation topics

Tracking learning progress

Updating confidence levels

Filtering & sorting topics

Viewing summary analytics

Cloud-based persistent storage

This project demonstrates full-stack development, REST API design, cloud deployment, and production debugging.

🏗️ Tech Stack
🎨 Frontend

Next.js (App Router)

TypeScript

Tailwind CSS

PNPM

Hosted on Vercel

⚙️ Backend

Node.js

Express.js

MongoDB (Mongoose)

RESTful APIs

Hosted on Render

🗄 Database

MongoDB Atlas (Cloud)

✨ Features
🔹 Core Functionality

Full CRUD Operations

Persistent cloud database

Environment-based configuration

Production-ready CORS handling

🔹 Smart Dashboard

Total Topics Counter

Topics In Progress

Revised Topics

Average Confidence Score

🔹 Advanced Controls

Search by title

Filter by category

Filter by status

Sort by:

Newest

Oldest

Confidence

Recently Revised

🧠 Architecture Overview
Frontend (Next.js)
        ↓
REST API (Express)
        ↓
MongoDB Atlas

API layer centralized in frontend/lib/api.ts

Strict environment variable usage

No hardcoded backend URLs

Production-safe configuration

📂 Project Structure
PrepTrack_Project/
│
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   └── server.js
│
├── frontend/
│   ├── app/
│   ├── components/
│   ├── lib/
│   └── styles/
🚀 Local Development Setup
1️⃣ Clone Repository
git clone https://github.com/prasannakumar6672/PrepTrack_Project.git
cd PrepTrack_Project
2️⃣ Backend Setup
cd backend
npm install

Create .env:

MONGODB_URI=your_mongodb_connection_string
PORT=5000

Run backend:

npm start
3️⃣ Frontend Setup
cd ../frontend
pnpm install

Create .env.local:

NEXT_PUBLIC_API_URL=http://localhost:5000

Run frontend:

pnpm dev
🌍 Deployment Details
🔹 Backend (Render)

MongoDB Atlas connected

Environment variables configured

CORS configured for production domain

🔹 Frontend (Vercel)

Environment Variable:

NEXT_PUBLIC_API_URL=https://preptrack-project.onrender.com
📈 What This Project Demonstrates

Full-stack REST API integration

Cloud deployment workflow

CORS debugging in production

Environment-based configuration

MongoDB Atlas integration

Real-world deployment issue resolution

👨‍💻 Author

Prasanna Kumar
B.Tech CSE (AI & ML)

GitHub: https://github.com/prasannakumar6672
