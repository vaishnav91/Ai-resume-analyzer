# AI Resume Analyzer (MERN Stack)

An AI-powered Resume Analyzer built using the MERN stack that evaluates resumes, provides a score, highlights strengths & weaknesses, and suggests improvements using OpenAI.

This project demonstrates full-stack development, authentication, file handling, AI integration, role-based access control, and dashboard analytics.

---

## 🚀 Features

### 👤 User Features
- User Registration & Login (JWT Authentication)
- Upload Resume (PDF)
- Automatic Text Extraction
- AI-based Resume Analysis
- Resume Score (Out of 100)
- Strengths & Weaknesses Breakdown
- Improvement Suggestions
- Re-analyze Resume
- Delete Resume
- Personal Dashboard

### 🛠 Admin Features
- View Total Users
- View Total Resumes
- System-wide Average Score
- Admin Dashboard Analytics

---

## 🏗 Tech Stack

### Frontend
- React.js
- Axios
- React Router
- CSS

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- Multer (File Upload)
- PDF-Parse (Text Extraction)
- OpenAI API

### Database
- MongoDB (Local)

---

## 📁 Project Structure (Monorepo)

ai-resume-analyzer-mern/
│
├── client/ # React Frontend
│
├── server/ # Express Backend
│ ├── controllers/ # Route logic
│ ├── models/ # Mongoose schemas
│ ├── routes/ # API routes
│ ├── middleware/ # Auth & role middleware
│ ├── services/ # OpenAI service logic
│ └── uploads/ # Local resume storage
│
└── README.md

