# server-side-card-app

## Introduction

card-app-backEnd is a comprehensive Node.js application designed to streamline card management operations. Built on Ubuntu, this application leverages the power of Express.js, offering robust API endpoints for various card-related functionalities. The application is secured using JWT (JSON Web Tokens) and utilizes Joi for request validation, bcrypt for password hashing, Morgan for logging, and CORS for cross-origin resource sharing.

## Features

- User authentication and authorization
- Card management operations
- Secure API endpoints
- Comprehensive logging
- Cross-origin requests handling

## Technologies Used

- **Node.js**: JavaScript runtime for building the server-side application.
- **Express.js**: Web application framework for Node.js.
- **Joi**: Object schema validation.
- **JWT (JSON Web Tokens)**: For secure user authentication.
- **bcrypt**: For hashing and securing passwords.
- **Morgan**: HTTP request logger middleware.
- **CORS**: Package for providing a Connect/Express middleware that can be used to enable CORS.

## Prerequisites

- Node.js
- npm (Node Package Manager)
- Ubuntu Operating System

## Installation and Setup

```bash
# Clone the Repository
git clone https://github.com/razi2809/server-side-card-app.git
cd server-side-card-app

# Install Dependencies
npm install

# Set Environment Variables
# Create a .env file and populate it with the necessary environment variables:
# PORT, DATABASE_URL, JWT_SECRET, etc.

# Start the Application
npm run watch
```
