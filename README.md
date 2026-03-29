# 🚀 Ginieverse – AI-Powered Career & Industry Insights Platform

🔗 **Live Demo:** https://ginnie-verse-git-master-princy-sahus-projects.vercel.app

Ginieverse is a full-stack AI-driven career development platform designed to help users understand their industry, build professional resumes and cover letters, and prepare for interviews through intelligent tools and insights.

---

## ✨ Features

### 🔍 Industry Insights
- Personalized industry analysis based on user inputs  
- Displays industry growth rate, market outlook, and demand level  
- Shows current trends, top skills, and recommended learning paths  
- Helps users stay aligned with market needs  

### 📄 AI Resume Builder
- Create and manage a professional resume  
- AI-powered **“Improve with AI”** option for:
  - Professional Summary
  - Skills section  
- Resume stored securely in the database  
- Export resume as **PDF**  

### ✉️ AI Cover Letter Generator
- Generate customized cover letters based on:
  - Job title
  - Company name
  - Job description  
- Edit and manage multiple cover letters  
- AI-enhanced content tailored to the user’s industry  

### 🧠 Interview Preparation
- Practice interviews through quiz-based assessments  
- Covers technical and behavioral questions  
- Instant feedback and improvement suggestions  
- Helps users track strengths and weak areas  

### 🔐 Authentication & User Management
- Secure authentication using **Clerk**  
- User-specific data handling (resume, cover letters, insights)  
- Dark mode support with Clerk Themes  

---

## 🛠️ Tech Stack

![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)
![React](https://img.shields.io/badge/React-19-blue?logo=react)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-38B2AC?logo=tailwind-css)
![Prisma](https://img.shields.io/badge/Prisma-ORM-2D3748?logo=prisma)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Database-316192?logo=postgresql)
![Clerk](https://img.shields.io/badge/Auth-Clerk-6C47FF?logo=clerk)
![Google Gemini](https://img.shields.io/badge/AI-Google_Gemini-4285F4?logo=google)
![Inngest](https://img.shields.io/badge/Inngest-Workflows-000000)
![Three.js](https://img.shields.io/badge/Three.js-3D-black?logo=three.js)
![License](https://img.shields.io/badge/License-MIT-green)
![ESLint](https://img.shields.io/badge/ESLint-Code_Quality-4B32C3?logo=eslint)
![Zod](https://img.shields.io/badge/Zod-Validation-3E67B1)
![React Hook Form](https://img.shields.io/badge/Forms-React_Hook_Form-EC5990)
![Status](https://img.shields.io/badge/Status-Active-success)
![Build](https://img.shields.io/badge/Build-Passing-brightgreen)



### Frontend
- Next.js (App Router)
- React
- Tailwind CSS
- Radix UI
- Framer Motion
- React Hook Form + Zod
- Three.js / React Three Fiber

### Backend
- Next.js Server Actions
- Prisma ORM
- PostgreSQL
- Inngest (background jobs & workflows)

### AI & Automation
- Google Gemini API  
  - Resume improvement  
  - Cover letter generation  
  - Content enhancement  

### Authentication
- Clerk Authentication
- Clerk Themes

### Data & Visualization
- Recharts
- Date-fns

### Utilities & Tools
- HTML2PDF (resume export)
- Sonner (notifications)
- Lucide React & Heroicons
- ESLint
- Prisma CLI
- PostCSS
- Babel (React Compiler)

---

## 🗂️ Database Schema (Overview)

- **User** – profile, industry, resume, cover letters, assessments  
- **IndustryInsights** – growth rate, trends, skills, market outlook  
- **Resume** – markdown-based resume content  
- **CoverLetter** – AI-generated cover letters  
- **Assessment** – interview quizzes and results  

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/princy-712/giniverse.git
cd giniverse
```
## 2️⃣ Install Dependencies

```bash
npm install
```
## 3️⃣ Environment Variables

```bash
DATABASE_URL=

NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=

NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/onboarding
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/onboarding

GEMINI_API_KEY=
```
## 4️⃣ Setup Database

```bash
npx prisma generate
npx prisma migrate dev
```
## 5️⃣ Run the Development Server

```bash
npm run dev
```

## 📌 Project Highlights
- Full-stack Next.js App Router architecture
- AI integration for real-world productivity use cases
- Secure and scalable database design with Prisma
- Clean, modern UI with animations and accessibility
- Practical career-focused problem solving
  
## Dashboard 
<img width="1467" height="841" alt="Screenshot 2025-12-31 at 6 00 02 PM" src="https://github.com/user-attachments/assets/2d20ee13-7f04-47fd-a78e-08125d300c21" />

## Industry Insights
<img width="1463" height="496" alt="Screenshot 2025-12-31 at 6 01 01 PM" src="https://github.com/user-attachments/assets/b29b89b9-2e79-4ab5-acc9-d3d40c345066" />
<img width="1469" height="653" alt="Screenshot 2025-12-31 at 6 01 40 PM" src="https://github.com/user-attachments/assets/cb31ce94-0d55-496d-b399-2226ebbc8b29" />
<img width="1470" height="479" alt="Screenshot 2025-12-31 at 6 02 46 PM" src="https://github.com/user-attachments/assets/a85b7d39-f7a1-466a-9ae4-592d2c3e32f4" />

## AI Resume Builder
<img width="1470" height="819" alt="Screenshot 2025-12-31 at 6 03 28 PM" src="https://github.com/user-attachments/assets/5a52f99c-8f40-45fd-941e-df62e30ee2fa" />

## AI Cover Letter
<img width="1468" height="735" alt="Screenshot 2025-12-31 at 6 31 01 PM" src="https://github.com/user-attachments/assets/15cd76c6-af60-4ea1-b06a-8ca3f8c9f425" />

## AI Interview prep quiz generator
<img width="1470" height="837" alt="Screenshot 2025-12-31 at 6 05 11 PM" src="https://github.com/user-attachments/assets/bdd6bcb9-8ab7-42ec-ae3f-99192cc62e35" />
<img width="1470" height="841" alt="Screenshot 2025-12-31 at 6 06 18 PM" src="https://github.com/user-attachments/assets/63a0ca65-e670-4b0b-8d1a-1bdca2c50648" />


