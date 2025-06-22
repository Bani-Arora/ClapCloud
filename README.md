# ClapCloud

> A modern, Instagram-style social media app built with the MERN stack (MongoDB, Express, React, Node) and Tailwind CSS, complete with user authentication, image uploads via Cloudinary, post claps (likes), and more!

---

## 🚀 Live Demo

* **Frontend:** [https://clapcloudapp.onrender.com](https://clapcloudapp.onrender.com)
* **Backend API:** [https://clapcloud.onrender.com/api](https://clapcloud.onrender.com/api)


## 📋 Table of Contents

1. [Key Features](#key-features)
2. [Tech Stack](#tech-stack)
3. [Prerequisites](#prerequisites)
4. [Installation & Setup](#installation--setup)
5. [Environment Variables](#environment-variables)
6. [Running Locally](#running-locally)
7. [API Endpoints](#api-endpoints)
8. [Folder Structure](#folder-structure)
9. [Screenshots](#screenshots)
10. [Limitations & Known Issues](#limitations--known-issues)

---

## ✨ Key Features

* **User Authentication**

  * Sign up & log in with JWT-based auth
  * Protected routes via middleware
* **Image Uploads**

  * Profile avatars & post images stored on Cloudinary
  * Live preview before upload
* **Social Interactions**

  * Create, view, and delete your own posts
  * “Clap” (like) posts with real-time count
* **Responsive, Instagram-Inspired UI**

  * Tailwind CSS for rapid, mobile-first styling
  * Sticky header with avatar/name dropdown
  * Toast notifications for success, error, and loading states
* **Serverless-ready**

  * Easily deployable to Render, Vercel, Netlify, etc.
  * Environment-driven configuration

---

## 🛠️ Tech Stack

| Layer        | Technology                                               |
| ------------ | -------------------------------------------------------- |
| **Frontend** | React, Vite, Tailwind CSS, react-hot-toast, react-router |
| **Backend**  | Node.js, Express, MongoDB (Atlas), Mongoose              |
| **Storage**  | Cloudinary (image hosting)                               |
| **Auth**     | bcryptjs, jsonwebtoken                                   |
| **DevOps**   | Render (hosting), Git                                    |

---

## 📦 Prerequisites

* **Node.js** v16 or newer
* **npm** (comes with Node.js)
* A **MongoDB Atlas** cluster or local MongoDB instance
* A **Cloudinary** account (free tier)

---

## 🛠️ Installation & Setup

1. **Clone the repo**

   ```bash
   git clone https://github.com/Bani-Arora/ClapCloud
   cd ClapCloud
   ```

2. **Create your environment files**

   * Copy and rename `.env.example` → `.env` in both `backend/`.
   * Populate with your own credentials (see [Environment Variables](#environment-variables)).

3. **Install dependencies**

   ```bash
   # Backend
   cd backend
   npm install

   # Frontend
   cd ../frontend
   npm install
   ```

---

## 🔑 Environment Variables

### Backend (`backend/.env`)

```env
PORT=5000
MONGO_URI=your_mongo_connection_string
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

### Frontend (`frontend/.env`)

```env
VITE_API_BASE_URL=https://your-backend-url.onrender.com/api
```

> **Note:** Vite exposes only `VITE_`-prefixed vars to the frontend.

---

## ▶️ Running Locally

1. **Start the backend**

   ```bash
   cd backend
   npm start
   # => http://localhost:5000
   ```

2. **Start the frontend**

   ```bash
   cd ../frontend
   npm run dev
   # => http://localhost:5173
   ```

Browse to `http://localhost:5173` to see the app in action.

---

## 📡 API Endpoints

### Auth

| Method | Endpoint           | Description              |
| ------ | ------------------ | ------------------------ |
| POST   | `/api/auth/signup` | Register a new user      |
| POST   | `/api/auth/login`  | Log in & receive a token |

### Users

| Method | Endpoint               | Description                        |
| ------ | ---------------------- | ---------------------------------- |
| GET    | `/api/users/me`        | Get current user profile (JWT)     |
| PUT    | `/api/users/me`        | Update name & bio (JWT)            |
| POST   | `/api/users/me/avatar` | Upload/change profile avatar (JWT) |

### Posts

| Method | Endpoint              | Description                               |
| ------ | --------------------- | ----------------------------------------- |
| GET    | `/api/posts`          | Get global feed                           |
| POST   | `/api/posts`          | Create post (text + optional image) (JWT) |
| POST   | `/api/posts/clap/:id` | Clap (like) a post (JWT)                  |
| DELETE | `/api/posts/:id`      | Delete your own post (JWT)                |

---

## 📁 Folder Structure

```
ClapCloud/
├─ backend/
│  ├─ config/            # Cloudinary, DB connection
│  ├─ middleware/        # Auth, file upload
│  ├─ models/            # Mongoose schemas
│  ├─ routes/            # Express routes
│  ├─ .env               # Environment variables
│  └─ server.js          # Express app entrypoint
└─ frontend/
   ├─ public/            # Static assets (default-avatar.png)
   ├─ src/
   │  ├─ api/            # Axios instance
   │  ├─ components/     # UI components (Header, PostCard…)
   │  ├─ context/        # AuthContext
   │  ├─ pages/          # Signup, Login, Feed, Profile
   │  ├─ utils/          # Helpers (email validation…)
   │  ├─ App.jsx
   │  └─ main.jsx
   ├─ .env               # VITE_ vars
   └─ vite.config.js
```

---



## 🛑 Limitations & Known Issues

* No **image resizing progress** bar during upload.
* No **infinite scroll**—the feed reloads on each new post.
* No tracking of **who** clapped (just a count).
* No **comments** feature yet.
* Error handling on backend could be more granular.

Feel free to file issues or submit PRs to tackle these!

---


> Made with ❤️ by [Bani Arora](https://github.com/Bani-Arora)
> Enjoy building awesome social experiences!
