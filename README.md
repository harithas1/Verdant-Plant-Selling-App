# Verdant — Plant E-Commerce Web Application

## Table of Contents

1. [Overview](#overview)
2. [Tech Stack](#tech-stack)
3. [Project Structure](#project-structure)
4. [Environment Variables Setup](#environment-variables-setup)
5. [Netlify Deployment Note](#netlify-deployment-note)
6. [Razorpay Payment Integration](#razorpay-payment-integration)
7. [Running the Project Locally](#running-the-project-locally)


---

## 1. Overview

Verdant is an online plant store where users can explore, filter, and purchase a wide variety of plants including indoor, outdoor, tropical, air-purifying plants, bonsais, succulents, and flowering plants.

The application supports:

- User registration, login, and email verification.
- Plant search, filtering, and sorting.
- Secure payments via Razorpay (Test Mode).
- Order status tracking.
- Reviews and ratings for products.
- Newsletter subscription.

---

## 2. Tech Stack

- **Frontend**: React.js, TailwindCSS, ShadCN, Vite
- **Backend**: Node.js, Express, FastAPI
- **Database**: PostgreSQL (Prisma ORM)
- **Authentication**: JWT + Nodemailer (Email Verification)
- **Payment Gateway**: Razorpay (Test Mode)
- **Deployment**: 
  - Frontend → Netlify
  - Backend → Render
  - Database → AWS RDS

---

## 3. Project Structure

verdant-project/
├── BE/src/.env  
|── verdant(FE)/.env
    
---
    
## 4. Environment Variables Setup: 

## 1. Backend (BE/src/.env)

Create a `.env` file in the `src` folder and add the following:

DATABASE_URL=postgresql://postgres:<your-db-password>@<your-db-host>:5432/verdant_db?schema=public
JWT_SECRET=<your-jwt-secret>
FRONTEND_URL=http://localhost:5173
RAZORPAY_KEY_ID=<your-razorpay-key-id>
RAZORPAY_KEY_SECRET=<your-razorpay-key-secret>

## 2. Frontend (verdant(FE)/.env)
Create a .env file in the frontend root directory and add the following:

VITE_RAZOR_PAY_KEY=<your-razorpay-key-id>
VITE_BACKEND_URL=http://localhost:3000

> **Note**: All frontend environment variables must be prefixed with `VITE_` to be accessible inside the React application when using Vite.

---

## 5. Netlify Deployment Note

Before deploying to Netlify:

Go to Site Settings → Environment Variables in the Netlify dashboard.
Add the same environment variables from your .env file (especially VITE_RAZOR_PAY_KEY and VITE_BACKEND_URL).
For more context, refer to: https://stackoverflow.com/questions/67378099/import-meta-env-undefined-on-production-build-vitejs

---

## 6. Razorpay Payment Integration

The project uses Razorpay in test mode for payment flow.
  * Orders are created server-side and stored only after payment verification.
  * Payment signature validation is done in the backend.

Official Documentation:
  * https://razorpay.com/docs/payments/server-integration/nodejs/
  * https://razorpay.com/docs/payments/server-integration/nodejs/integration-steps/#2-test-integration
  
---

## 7. Running the Project Locally

### 1. Clone the repository
git clone https://github.com/harithas1/Verdant-Plant-Selling-App.git
cd Verdant-Plant-Selling-App

### 2. Configure environment variables
#### Create the .env files in BE/src and verdant(FE) as per the instructions.

### 3. Install dependencies
#### Backend
cd BE
npm install

#### Frontend
cd ../verdant(FE)
npm install

### 4. Start the backend server
cd ../BE/src
npm start (or) node server.js 

### 5. Start the frontend
cd ../verdant(FE)
npm run dev

### 6. Access the Application
Frontend: http://localhost:5173
Backend: http://localhost:3000



