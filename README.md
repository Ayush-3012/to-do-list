# 🚀 To-Do List Application (Full-Stack)

A modern, highly interactive, and fully responsive To-Do List web application built with the MERN stack (MongoDB, Express, React, Node.js). It features a beautiful UI, smooth animations, week-wise task analytics, and a robust backend.

## ✨ Features

- **Modern UI/UX**: Designed with TailwindCSS and animated using Framer Motion.
- **Task Management**: Create, Read, Update, and Delete (CRUD) tasks effortlessly.
- **Priority Indicators**: Colored chips (High, Medium, Low) for quick visual identification of task importance.
- **Week-Wise Analytics**: Keep track of "This Week" vs "All-Time" completed and pending tasks.
- **Interactive Calendar**: Custom date selector with task count indicators natively built-in.
- **Search Functionality**: Expandable search bar to instantly find tasks.
- **Notifications**: Elegant toast notifications for success/error alerts using `react-toastify`.
- **Custom Loaders**: Animated ring loaders powered by the `ldrs` library.
- **RESTful API**: Scalable Node.js & Express backend architecture.
- **Vercel Ready**: Pre-configured `vercel.json` files for seamless Serverless deployment.

## 🛠️ Tech Stack

### Frontend
- **Framework**: React (Vite) with TypeScript
- **Styling**: TailwindCSS
- **Animations**: Framer Motion
- **HTTP Client**: Axios
- **Date Picker**: React Datepicker
- **Icons**: React Icons (Feather Icons)
- **Toast/Loaders**: React-Toastify & Ldrs

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose
- **Language**: TypeScript

## 🚀 Getting Started

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) and [Git](https://git-scm.com/) installed on your machine.

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Ayush-3012/to-do-list.git
   cd to-do-list
   ```

2. **Setup the Backend**
   ```bash
   cd backend
   npm install
   ```
   Create a `.env` file in the `backend` directory and add your MongoDB URI:
   ```env
   PORT=8000
   MONGODB_URI=your_mongodb_connection_string
   ```
   Start the backend development server:
   ```bash
   npm run dev
   ```

3. **Setup the Frontend**
   Open a new terminal window and navigate to the frontend directory:
   ```bash
   cd frontend
   npm install
   ```
   Start the frontend development server:
   ```bash
   npm run dev
   ```

## 🌐 Deployment (Vercel)

This project is pre-configured to be deployed seamlessly on Vercel.

1. **Frontend Deployment**: Select the `frontend` folder as the Root Directory in Vercel. It will automatically detect Vite and build the project.
2. **Backend Deployment**: Select the `backend` folder as the Root Directory in a new Vercel project. Ensure you add `MONGODB_URI` to the Environment Variables. The included `vercel.json` and `server.ts` handles the Serverless Function routing automatically.

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the issues page if you want to contribute.

## 📝 License

This project is licensed under the MIT License.
