# 📚 Book Library App

A modern full-featured application for managing a book library with its own API server.

---

## 📂 Project Structure

```plaintext
/
├── api/             # Backend (Node.js + Express + TypeScript)
│   ├── data/        # Book data (books.json)
│   ├── src/         # Server source code
│   ├── dist/        # Compiled server code
│   ├── tsconfig.json
│   └── package.json
│
├── frontend/        # Frontend (React + Redux Toolkit + TypeScript)
│   ├── src/
│   ├── public/
│   ├── tsconfig.json
│   └── package.json
│
├── LICENSE          # MIT License
├── README.md        # Project documentation
└── .gitignore
```

## 🚀 Project Description

**Book Library App** consists of two parts:

- **Frontend** — a React 18 and TypeScript application for adding, filtering, and managing books.
- **API** — a Node.js and Express.js server for generating random books via HTTP requests.

---

## 🛠️ Technologies Used

### Frontend

- React 18
- TypeScript
- Redux Toolkit
- Responsive design

### Backend

- Node.js 22
- Express.js
- TypeScript
- CORS

---

## ⚙️ Installation and Running

### Clone the repository

```bash
git clone https://github.com/when-dev/book-library-app.git
cd book-library-app
```

### Setup and run Frontend

```bash
cd frontend
npm install
npm run dev
```

### Setup and run Backend (API)

```bash
cd api
npm install
npm run build 
npm start
```

### 📚 Application Features

- Add books manually
- Add random books from local data
- Load random books via API
- Filter books by title, author, favorites
- Mark books as favorites
- Delete books
- Fully responsive layout for mobile devices

### 🌟 License

This project is licensed under the [MIT License](LICENSE).
