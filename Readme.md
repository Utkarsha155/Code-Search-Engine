# 🔍 Code Search Engine

A powerful, lightning-fast **code search engine** built for developers who need to quickly find and navigate through their codebase.
Built with **React, Node.js, Express, and MongoDB**, optimized for performance and ease of use.

---

## 🚀 Live Demo

* **Frontend (Netlify):** [https://code-search.netlify.app/](https://code-search.netlify.app/) 
* **Backend (Render):** [https://code-search-engine-ojxt.onrender.com/](https://code-search-engine-ojxt.onrender.com/)

---

## ✨ Features

* ⚡ **Lightning Fast Search** – Search through your entire codebase with instant results using advanced indexing algorithms.
* 📁 **Multi-Language Support** – Supports C++, JavaScript, Python, HTML, and more.
* 🎯 **Precise Results** – Get exact matches with highlighted keywords and context-aware snippets.
* 📊 **Search History** – Keep track of your previous searches with detailed result history and timestamps.
* ⚡ **Real-time Indexing** – Automatically indexes uploaded code for faster and more accurate search.
* 🔒 **Secure & Private** – Your code remains stored locally on the backend.

---

## 🛠️ Tech Stack

**Frontend**

* React + Vite
* Tailwind CSS
* React Router

**Backend**

* Node.js & Express
* Multer (for file uploads)
* MongoDB (for storage & metadata)

**Deployment**

* Frontend → Netlify
* Backend → Render

---

## 📂 Project Structure

```
Code-Search-Engine/
│── backend/          # Express backend APIs
│   └── server.js     # Entry point
│
│── frontend/         # React + Vite frontend
│   ├── src/          # Components, pages, utils
│   └── public/       # Static assets
│
│── codebase/         # Uploaded code files (server-side storage)
│── README.md
│── package.json
```

---

## ⚙️ Installation & Setup

### 1. Clone the repo

```bash
git clone https://github.com/your-username/Code-Search-Engine.git
cd Code-Search-Engine
```

### 2. Setup Backend

```bash
cd backend
npm install
```

Create a `.env` file in `/backend`:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/codesearchengine
JWT_SECRET=your-secret-key
NODE_ENV=development
```

Run backend:

```bash
npm start
```

### 3. Setup Frontend

```bash
cd frontend
npm install
npm run dev
```

For production build:

```bash
npm run build
```

---

## 📖 API Endpoints

* `POST /api/upload` → Upload code files
* `GET /search?q=keyword` → Search keyword across codebase
* `GET /api/codebase` → Get all uploaded files
* `DELETE /api/delete/:filename` → Delete a file
* `DELETE /api/codebase` → Clear entire codebase
* `GET /api/health` → Health check

---

## 🚀 Deployment

* **Frontend:** Deployed on Netlify (set `base directory = frontend`, `build command = npm run build`, `publish directory = frontend/dist`).
* **Backend:** Deployed on Render (set `root directory = backend`, `build command = npm install`, `start command = node server.js`).

---

## 📌 Future Improvements

* User authentication & per-user storage
* Cloud storage integration (AWS S3 / GCP)
* Advanced filters (by file type, repo, etc.)
* UI enhancements

---
