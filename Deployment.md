# Deployment Guide

This guide will walk you through deploying the Sales & Marketing Team Management System to production.

## 1. MongoDB Atlas (Database)

1.  **Create a free cluster:** Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) and create a new account or log in.
2.  Build a new cluster (use the free M0 tier).
3.  **Whitelist IP Address:** Under "Network Access," add your IP address (or `0.0.0.0/0` for access from anywhere, not recommended for production).
4.  **Create a Database User:** Under "Database Access," create a new user with a secure password.
5.  **Get Connection URI:** Click "Connect" from your cluster view, select "Connect your application," and copy the connection string. Replace `<password>` with the password you created.

## 2. Backend (Render)

1.  **Push your backend code to a GitHub repository.**
2.  **Create a new Web Service on Render:** Go to your Render dashboard and click "New" > "Web Service."
3.  **Connect your GitHub repo:** Select the backend repository.
4.  **Configure the service:**
    - **Name:** `sales-marketing-api` (or your choice)
    - **Root Directory:** `backend` (if you are using a monorepo)
    - **Build Command:** `npm install`
    - **Start Command:** `npm start`
5.  **Add Environment Variables:** Under "Environment," add all the variables from your local `.env` file (`MONGO_URI`, `JWT_SECRET`, etc.).
6.  **Deploy:** Click "Create Web Service." Render will build and deploy your application.
7.  **Copy the backend URL:** Once deployed, copy the URL (e.g., `https://sales-marketing-api.onrender.com`).

## 3. Frontend (Vercel)

1.  **Push your frontend code to the same or a different GitHub repository.**
2.  **Create a new Project on Vercel:** Go to your Vercel dashboard and click "Add New..." > "Project."
3.  **Import your Git Repository:** Select the frontend repository.
4.  **Configure the project:**
    - Vercel should automatically detect that it's a Vite project.
    - **Root Directory:** `frontend` (if you are using a monorepo)
5.  **Add Environment Variables:** In the project settings under "Environment Variables," add:
    - `VITE_API_BASE_URL` = your deployed backend URL from Render.
6.  **Deploy:** Click "Deploy." Vercel will build and deploy your frontend.
7.  You will get a URL for your live frontend application.

## 4. Final Testing

1.  Visit your deployed frontend URL.
2.  Register two users: one with the role "Admin" and another with "Salesperson."
3.  Log in as Admin and create a product category.
4.  Log in as Salesperson, add a product, and create a task.
5.  Upload an image for the task (ensure location tracking works).
6.  Generate an invoice and check if the email is sent successfully.
