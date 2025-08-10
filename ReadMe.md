# 💬 OMEGA

A real-time chat application built with the **MERN stack** (MongoDB, Express.js, React, Node.js) using **TypeScript**.  
It features live messaging via **Socket.IO**, file/image sharing with **Cloudinary**, and a beautiful, responsive UI powered by **Tailwind CSS** + **DaisyUI**.

---

## ✨ Features

-   🔑 **Authentication & Authorization**
    -   Secure user registration & login (JWT-based)
    -   Password hashing with bcrypt
-   💬 **Real-time Messaging**
    -   Instant message delivery using Socket.IO
    -   Typing indicators & online user status
-   🖼 **Media Sharing**
    -   Upload and send images via Cloudinary
    -   Automatic image preview in chat
-   🎨 **Beautiful UI**
    -   Tailwind CSS + DaisyUI components for a modern look
-   📂 **Chat History**
    -   Persistent chat data stored in MongoDB

---

## 🛠 Tech Stack

### Frontend

-   **React** + **TypeScript**
-   **Tailwind CSS** + **DaisyUI**
-   **Socket.IO Client**
-   **Axios** for API requests

### Backend

-   **Node.js** + **Express.js** + **TypeScript**
-   **MongoDB** + **Mongoose**
-   **Socket.IO Server**
-   **Cloudinary** SDK
-   **JWT** for authentication

---

## 📦 Installation

### 1️⃣ Clone the repository

```bash
git clone https://github.com/Dheerajydv/Omega.git
cd omega
```

### 2️⃣ Install dependencies

#### Backend

```bash
cd server/
pnpm install
```

#### Frontend

```bash
cd client/
pnpm install
```

### 3️⃣ Environment Variables

#### Backend `.env`

```env
PORT=8000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

#### Frontend `.env`

```env
VITE_API_URL=http://localhost:5173
```

### 4️⃣ Run the development servers

#### Backend

```bash
cd server/
pnpm run dev
```

#### Frontend

```bash
cd client/
pnpm run dev
```

---

## 📂 Project Structure

```
mern-chat-app/
│
├── server/               # Backend
│   ├── src/
│   │   ├── controllers/  # API logic
│   │   ├── db/           # Database Connection
│   │   ├── middlewares/  # Middlewares
│   │   ├── models/       # Mongoose models
│   │   ├── routes/       # Express routes
│   │   ├── socketio/     # Socket.IO events
│   │   ├── types/        # Typescript Types
│   │   └── server.ts     # App entry
│   └── package.json
│
├── client/               # Frontend
│   ├── src/
│   │   ├── components/   # UI components
│   │   ├── pages/        # Page components
│   │   ├── context/      # State/context
│   │   ├── types/        # Typescript Types
│   │   ├── utils/        # Utility Functions
│   │   ├── zustands/     # Zustand Store
│   │   └── main.tsx      # App entry
│   └── package.json
│
└── README.md
```

---

## 🚀 Deployment

-   **Frontend**: Vercel / Netlify
-   **Backend**: Render / Railway / Heroku
-   **Database**: MongoDB Atlas
-   **Media Storage**: Cloudinary

---

## 🤝 Contributing

1. Fork the project
2. Create your feature branch:
    ```bash
    git checkout -b feature/AmazingFeature
    ```
3. Commit your changes:
    ```bash
    git commit -m 'Add some AmazingFeature'
    ```
4. Push to the branch:
    ```bash
    git push origin feature/AmazingFeature
    ```
5. Open a Pull Request

---

## 🙌 Acknowledgements

-   [MERN Stack](https://www.mongodb.com/mern-stack)
-   [DaisyUI](https://daisyui.com/)
-   [Cloudinary](https://cloudinary.com/)
-   [Socket.IO](https://socket.io/)
-   [Tailwind CSS](https://tailwindcss.com/)
