# 🖥️ TalkVerse Frontend

TalkVerse frontend is a modern real-time chat application built with **React, TypeScript, Vite, Tailwind CSS, and Socket.IO**.  
It provides a smooth and interactive user experience for secure one-to-one chats, AI-powered conversations, and seamless navigation.  

---

## 📂 Project Structure

├── .gitignore
├── README.md
├── eslint.config.js
├── index.html
├── package-lock.json
├── package.json
├── public
│ ├── _redirects
│ └── vite.svg
├── src
│ ├── App.tsx
│ ├── assets
│ │ ├── ai_img.jpg
│ │ ├── fevicone.png
│ │ └── react.svg
│ ├── auth
│ │ ├── Login.tsx
│ │ └── Register.tsx
│ ├── axios
│ │ └── axios.tsx
│ ├── components
│ │ ├── AiLeftSidebar.tsx
│ │ ├── Button.tsx
│ │ ├── LogoutButton.tsx
│ │ ├── MainRoutes.tsx
│ │ ├── NonProtectedRoute.tsx
│ │ └── ProjextedRoute.tsx
│ ├── context
│ │ └── ContextApi.tsx
│ ├── index.css
│ ├── main.tsx
│ ├── pages
│ │ ├── AiChat.tsx
│ │ ├── Home.tsx
│ │ ├── Loading.tsx
│ │ ├── PageNotFound.tsx
│ │ └── UserToUserChat.tsx
│ ├── socket
│ │ └── socket.ts
│ └── vite-env.d.ts
├── tsconfig.app.json
├── tsconfig.json
├── tsconfig.node.json
└── vite.config.ts

markdown
Copy code

---

## ⚙️ Features

- 🔐 **Authentication**
  - Login, Register, Logout with JWT + HttpOnly cookies
  - Protected and non-protected routes
- 👥 **Chat**
  - One-to-one chat with real-time updates via Socket.IO
  - AI-powered chat assistant
- 🎨 **UI/UX**
  - Tailwind CSS styling
  - Responsive and modern design
  - Reusable components (Button, Sidebar, etc.)
- ⚡ **Performance**
  - Built with **Vite** for fast development and optimized builds
  - Context API for global state management
- 🛡️ **Security**
  - Authenticated API calls via Axios with credentials
  - Route guards (`ProtectedRoute` & `NonProtectedRoute`)

---

## 🚀 Getting Started

### 1️⃣ Clone the repo
```bash
git clone https://github.com/your-username/talkverse-frontend.git
cd talkverse-frontend