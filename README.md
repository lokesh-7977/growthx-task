
# Node.js Backend Application - Growthx Task

This is a Node.js backend application built with Express. It supports user authentication, admin management, and assignment handling. Users can register, log in, and upload assignments, while admins can manage and review assignments.

## Features

- **User Authentication**: Login and registration for users.
- **Admin Management**: Retrieve a list of admins.
- **Assignment Management**: Users can upload assignments, and admins can view, accept, or reject them.
- **Role-based Access Control**: Secure routes based on user roles (user/admin).

## Table of Contents

- [Installation](#installation)
- [Project Structure](#project-structure)
- [Routes](#routes)
  - [Authentication Routes](#authentication-routes)
  - [Assignment Routes](#assignment-routes)
- [Middleware](#middleware)

## Installation

To run this project locally, follow these steps:

1. **Clone the repository:**

   ```bash
   git clone https://github.com/lokesh-7977/growthx-task.git
   ```

2. **Navigate to the project directory:**

   ```bash
   cd backend-app
   ```

3. **Install dependencies:**

   ```bash
   npm install
   ```

4. **Create a `.env` file** in the root directory and add the following variables:

   ```bash
   touch .env
   ```

   In the `.env` file, add the following:
   

   ```env
   PORT = 4000 || unique port number 
   DB_URL = db uri from mongo atlas
   JWT_SECRET = "secret"
   JWT_EXPIRY = days for token expiry like 1 day, 7 days, 30 days etc
   ```

5. **Start the server:**

   ```bash
   npm start
   ```

   The server will be available at `http://localhost:PORT`.

## Project Structure

```bash
backend-app/
├── src/
│   ├── server.js              # Entry point of the app
│   ├── routes/
│   │   ├── auth.js           # Auth routes (login, register)
│   │   |-- assignment.js
│   ├── middleware/
│   │   ├── auth.js           # Authentication middleware (authenticateUser, authenticateAdmin)
│   ├── controllers/
│   │   ├── authController.js  # Logic for login/register
│   │   ├── assignmentController.js # Logic for handling assignments
│   └── models/               # User and assignment models
├── .env                      # Environment variables
├── package.json              # Dependencies
└── README.md                 # Project documentation
```

## Routes

### Authentication Routes

#### 1. `/login` [POST]

- **Description**: Log in as a user or admin.
- **Request Body**:

  ```json
  {
    "email": "user@example.com",
    "password": "password123"
  }
  ```

- **Response**:

  ```json
  {
    "message": "Login successful",
    "token": "your-jwt-token"
     "user data : "your data"
  ```

#### 2. `/register` [POST]

- **Description**: Register a new user.
- **Request Body**:

  ```json
  {
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123",
     "role" : "user || admin"
  }
  ```

### Admin Routes

#### 3. `/admins` [GET]

- **Description**: Retrieve a list of admins.
- **Response**:

  ```json
  [
    {
      "id": "1",
      "name": "Admin User",
      "email": "admin@example.com",
      "role": "admin"
    }
  ]
  ```

### Assignment Routes

#### 4. `/upload` [POST]

- **Description**: Upload an assignment as a user.
- **Middleware**: `authenticateUser` (ensures the user is authenticated).
- **Request Body**:

  ```json
    {
    'userId':Soumik,
    'task':'Hello World',
    'admin':'Alok',
    }
  ```

#### 5. `/assignments` [GET]

- **Description**: Retrieve a list of all uploaded assignments (admin only).
- **Middleware**: `authenticateAdmin` (ensures the user is an authenticated admin).
- **Response**:

  ```json
  [
    {
      "id": "1",
      "title": "Assignment 1",
      "content": "This is the first assignment.",
      "status": "pending"
    },
    {
      "id": "2",
      "title": "Assignment 2",
      "content": "This is the second assignment.",
      "status": "accepted"
    }
  ]
  ```

#### 6. `/assignments/:id/accept` [POST]

- **Description**: Accept an assignment by its ID (admin only).
- **Middleware**: `authenticateAdmin`
- **Response**:

  ```json
  {
    "message": "Assignment accepted"
  }
  ```

#### 7. `/assignments/:id/reject` [POST]

- **Description**: Reject an assignment by its ID (admin only).
- **Middleware**: `authenticateAdmin`
- **Response**:

  ```json
  {
    "message": "Assignment rejected"
  }
  ```

## Middleware

### `authenticateUser`

- Verifies that the user is authenticated with a valid JWT token.
- Adds the user information to `req.user`.

### `authenticateAdmin`

- Verifies that the user is authenticated and has an admin role.
- Ensures only admins can access certain routes.



This `README.md` file provides a clear guide for setting up, running, and using the application with all necessary details about the routes, features, and structure.
