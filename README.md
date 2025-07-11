# Full Stack Interview Application

A modern full-stack application built with Next.js 14, TypeScript, Express, and MongoDB.

## 🚀 Features

- **Authentication System**
  - User signup and login
  - Protected routes
  - Role-based access control
  - JWT-based authentication

- **Client-Side (Next.js)**
  - Modern UI components with Shadcn/ui
  - Responsive design
  - Form validation with Zod
  - Protected routes with authentication context
  - Admin dashboard
  - User profile management

- **Server-Side (Express + TypeScript)**
  - RESTful API architecture
  - TypeScript for type safety
  - MongoDB with Mongoose
  - Middleware for authentication and validation
  - Role-based access control
  - Input validation

## 📦 Project Structure

```
interview-final/
├── client/                 # Next.js frontend application
│   ├── app/               # App router pages
│   ├── components/        # Reusable UI components
│   └── lib/              # Utilities and API functions
│
└── server/                # Express backend application
    └── src/
        ├── controllers/   # Route controllers
        ├── middleware/    # Express middleware
        ├── models/        # MongoDB models
        ├── routes/        # API routes
        └── utils/         # Utility functions
```

## 🛠️ Prerequisites

- Node.js (v18 or higher)
- pnpm
- MongoDB

## 🚀 Getting Started

### Setting up the Backend

1. Navigate to the server directory:
   ```bash
   cd server
   ```

2. Install dependencies:
   ```bash
   pnpm install
   ```

3. Create a `.env` file in the server directory:
   ```env
   PORT=5000
   MONGODB_URI=your_mongodb_uri
   JWT_SECRET=your_jwt_secret
   ```

4. Start the development server:
   ```bash
   pnpm dev
   ```

### Setting up the Frontend

1. Navigate to the client directory:
   ```bash
   cd client
   ```

2. Install dependencies:
   ```bash
   pnpm install
   ```

3. Create a `.env.local` file in the client directory:
   ```env
   NEXT_PUBLIC_API_URL=http://localhost:5000
   ```

4. Start the development server:
   ```bash
   pnpm dev
   ```

The application will be available at `http://localhost:3000`

## 🔒 Authentication

The application uses JWT-based authentication:
- Tokens are stored securely in HTTP-only cookies
- Protected routes require valid authentication
- Role-based middleware for admin access

## 🛣️ API Routes

### Auth Routes
- `POST /api/auth/signup` - Register a new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/logout` - Logout user

### User Routes
- `GET /api/users/profile` - Get user profile
- `PUT /api/users/profile` - Update user profile
- `GET /api/users` - Get all users (admin only)

## 💻 Tech Stack

### Frontend
- Next.js 14
- TypeScript
- Shadcn/ui
- TailwindCSS
- Zod for validation
- React Context for state management

### Backend
- Express.js
- TypeScript
- MongoDB with Mongoose
- JWT for authentication
- Express middleware

## 🔐 Security Features

- Password hashing
- JWT token authentication
- Protected API routes
- Input validation
- Role-based access control
- HTTP-only cookies


## 📄 License

This project is licensed under the MIT License. 