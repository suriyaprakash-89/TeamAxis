# TeamAxis: Sales & Marketing Management System

This is a full-stack MERN application designed for sales and marketing teams to manage members, products, tasks, and generate invoices. It includes features like live location tracking, media uploads, and an admin dashboard for analytics.

## Features

- **Authentication:** JWT-based authentication with roles (Admin, Salesperson).
- **Team Management:** Admins can manage team members.
- **Product & Category Management:** Create and manage products and categories.
- **Task Management:** Assign and track tasks for salespeople.
- **Live Location Tracking:** Capture geolocation on media upload.
- **Media Uploads:** Support for images, videos, and voice notes via Cloudinary.
- **Invoice Generation:** Create PDF invoices and send them via email with Nodemailer.
- **Analytics Dashboard:** Visual representation of sales and team performance.

## Tech Stack

- **Frontend:** React.js, Vite, TailwindCSS, Axios, Recharts
- **Backend:** Node.js, Express.js
- **Database:** MongoDB, Mongoose
- **APIs:** Cloudinary, Google Maps, Nodemailer

## Prerequisites

- Node.js & npm
- MongoDB Atlas account
- Cloudinary account
- Nodemailer (Gmail account for testing)

## Local Setup

1.  **Clone the repository:**

    ```bash
    git clone https://github.com/your-username/sales-marketing-management.git
    cd sales-marketing-management
    ```

2.  **Setup Backend:**

    ```bash
    cd backend
    npm install
    ```

    Create a `.env` file in the `backend` directory and add the following:

    ```
    PORT=5000
    MONGO_URI=your_mongodb_atlas_uri
    JWT_SECRET=your_jwt_secret
    CLOUDINARY_CLOUD_NAME=your_cloudinary_name
    CLOUDINARY_API_KEY=your_cloudinary_key
    CLOUDINARY_API_SECRET=your_cloudinary_secret
    EMAIL_USER=your_email_address
    EMAIL_PASS=your_email_password
    ```

    Start the backend server:

    ```bash
    npm run dev
    ```

3.  **Setup Frontend:**
    `bash
    cd ../frontend
    npm install
    `
    Create a `.env` file in the `frontend` directory:
    `    VITE_API_BASE_URL=http://localhost:5000
   `
    Start the frontend development server:
    `bash
    npm run dev
    `
    The application will be available at `http://localhost:5173`.

## GitHub Repository Setup

1.  Create a new repository on GitHub.
2.  Follow the instructions on GitHub to push your existing local repository to the remote one.
    ```bash
    git remote add origin https://github.com/your-username/your-repo-name.git
    git branch -M main
    git push -u origin main
    ```
