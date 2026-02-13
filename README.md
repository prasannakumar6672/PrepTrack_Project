🚀 PrepTrack – Full Stack Interview Preparation Tracker

🌐 Live Demo

Frontend (Vercel): https://prep-track-project.vercel.app

Backend (Render): https://preptrack-project.onrender.com

📌 Overview

PrepTrack is a full-stack web application designed to help users systematically track and manage their interview preparation topics.

It allows users to:

Create new preparation topics

Track preparation status

Update confidence levels

Edit topics

Delete topics

View summary statistics

Filter, search, and sort topics

The application follows production-ready architecture and is fully deployed to cloud platforms.

🏗️ Tech Stack
Frontend

Next.js (App Router)

TypeScript

Tailwind CSS

PNPM

Deployed on Vercel

Backend

Node.js

Express.js

MongoDB (Mongoose)

RESTful API Architecture

CORS Configuration

Deployed on Render

Database

MongoDB Atlas (Cloud)

⚙️ Architecture

Frontend communicates with backend using REST APIs.

All API requests are centralized in:

frontend/lib/api.ts

Environment-based configuration:

Local development uses .env.local

Production uses Vercel environment variables

No hardcoded backend URLs are used.

🔥 Features
✅ CRUD Operations

Create topic

Read topics

Update topic

Delete topic

✅ Smart Dashboard

Total topics

Topics in progress

Revised topics

Average confidence score

✅ Filtering & Sorting

Search by title

Filter by category

Filter by status

Sort by:

Newest

Oldest

Confidence

Recently revised

✅ Production Ready

Strict environment variable handling

Secure CORS configuration

Cloud deployment setup

Centralized error handling

Defensive frontend coding

🧪 Local Setup
1️⃣ Clone Repository
git clone https://github.com/prasannakumar6672/PrepTrack_Project.git
cd PrepTrack_Project
2️⃣ Backend Setup
cd backend
npm install

Create .env file inside backend:

MONGODB_URI=your_mongodb_connection_string
PORT=5000

Run backend:

npm start
3️⃣ Frontend Setup
cd ../frontend
pnpm install

Create .env.local inside frontend:

NEXT_PUBLIC_API_URL=http://localhost:5000

Run frontend:

pnpm dev
🌍 Deployment
Backend (Render)

Environment variables configured in dashboard

MongoDB Atlas IP whitelist enabled

CORS configured for Vercel domain

Frontend (Vercel)

Environment variable configured:

NEXT_PUBLIC_API_URL=https://preptrack-project.onrender.com
📂 Project Structure
PrepTrack_Project/
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
📈 What This Project Demonstrates

Full-stack REST API integration

Cloud deployment workflow

Environment variable management

CORS handling in production

MongoDB Atlas integration

Real-world debugging process

👨‍💻 Author

Prasanna Kumar
B.Tech CSE (AI & ML)
GitHub: https://github.com/prasannakumar6672