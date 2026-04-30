# 📋 Mini Message Board

A full-stack message board application where users can register, log in, and post messages. Built with a **Node.js/Express** backend and a **React/Vite** frontend.

---

![App Screenshot](./assets/screenshot.png)

---

## 🚀 Features

- 🔐 User registration and login with JWT authentication
- 💬 View all messages (public)
- ✍️ Post new messages (authenticated users only)
- 🌗 Dark/Light theme toggle with session persistence
- ⏱️ Timestamps on messages via `date-fns`
- 🔒 Passwords hashed with `bcryptjs`

---

## 🛠️ Tech Stack

### Backend
| Technology | Purpose |
|---|---|
| Node.js + Express | Server & REST API |
| PostgreSQL | Database |
| Prisma | ORM / Database client |
| bcryptjs | Password hashing |
| JSON Web Tokens (JWT) | Authentication |
| CORS | Cross-origin requests |

### Frontend
| Technology | Purpose |
|---|---|
| React + Vite | UI framework & build tool |
| Tailwind CSS + shadcn/ui | Styling & UI components |
| Axios | HTTP requests with JWT interceptor |
| date-fns | Timestamp formatting |
| Lucide Icons | Icon library |
| ESLint | Linting |

---

## 📁 Project Structure

```
mini-message-board/
├── server/
│   ├── index.js               
│   ├── app.js                
│   ├── prisma.js              
│   ├── controllers/
│   │   ├── authController.js  
│   │   └── messageController.js 
│   ├── routes/
│   │   ├── authRoutes.js
│   │   └── messageRoutes.js
│   ├── middleware/
│   │   └── auth.js            
│   └── prisma/
│       └── schema.prisma     
│
└── client/
    ├── src/
    │   ├── main.jsx            
    │   ├── App.jsx             
    │   ├── pages/
    │   │   ├── LoginPage.jsx
    │   │   ├── RegisterPage.jsx
    │   │   └── BoardPage.jsx
    │   ├── context/
    │   │   ├── AuthContext.jsx  
    │   │   └── ThemeContext.jsx 
    │   ├── lib/
    │   │   ├── axios.js        
    │   │   └── utils.js        
    │   └── components/
    │       └── ui/
    │           └── button.jsx
    └── vite.config.js
```
---

## 🗄️ Database Schema

```prisma
model User {
  id        Int       @id @default(autoincrement())
  username  String    @unique
  password  String
  createdAt DateTime  @default(now())
  messages  Message[]
}

model Message {
  id        Int      @id @default(autoincrement())
  text      String
  createdAt DateTime @default(now())
  userId    Int
  user      User     @relation(fields: [userId], references: [id])
}
```
---

## 📡 API Endpoints

### Auth
| Method | Endpoint | Description | 
|--------|----------|-------------|
| POST | `/api/auth/register` | Create a new user account |
| POST | `/api/auth/login` | Login and receive a JWT token | 

### Messages
| Method | Endpoint | Description | 
|--------|----------|-------------|
| GET | `/api/messages/` | Fetch all messages with author username | 
| POST | `/api/messages/` | Post a new message | 

---

## ⚙️ Getting Started

### Prerequisites
- Node.js (v18+)
- PostgreSQL database
- npm or yarn

---

### 🔧 Backend Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/huddlecap/mini-message-board.git
   cd mini-message-board/server
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**

   Create a `.env` file in the `server/` directory:
   ```env
   DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE"
   JWT_SECRET="your_jwt_secret_here"
   PORT=5000
   ```

4. **Run Prisma migrations**
   ```bash
   npx prisma migrate dev --name init
   ```

5. **Start the server**
   ```bash
   npm start
   ```

   The server will run at `http://localhost:5000`

---

### 💻 Frontend Setup

1. **Navigate to the client directory**
   ```bash
   cd ../client
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**

   Create a `.env` file in the `client/` directory:
   ```env
   VITE_API_URL=http://localhost:5000
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

   The app will run at `http://localhost:5173`

---

## 🔐 Security

- Passwords are hashed using `bcryptjs` before storing in the database
- JWT tokens are signed with a secret key (`JWT_SECRET`) and stored in `localStorage`
- Protected routes use an `auth.js` middleware that verifies the JWT on every request
- Axios interceptor automatically attaches `Authorization: Bearer {token}` to all outgoing requests

---

## 👤 Author
Lender Shark

---

## 📜 License

This project is open source and available under the [MIT License](LICENSE).
