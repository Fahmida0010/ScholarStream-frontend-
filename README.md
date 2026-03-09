# ScholarStream – Scholarship Management Platform

A Full-Stack MERN Application to connect students with global scholarship opportunities.
Students can browse and apply for scholarships, moderators can manage applications, and admins oversee the platform.

---

# Project Overview

ScholarStream is a modern **Scholarship Management Platform** designed to help students easily discover and apply for scholarship opportunities worldwide.

The platform centralizes scholarship information in one place and provides separate dashboards for **Students, Moderators, and Admins** to efficiently manage applications, feedback, and platform data.

Students can explore scholarships, apply online, and track their applications. Moderators review applications and provide feedback, while admins manage users, scholarships, and analytics.

---

# Project Screenshot

*(Add a screenshot of your homepage or dashboard here)*

Example:

```
![ScholarStream Screenshot](./screenshot.png)
```

---

# Live URL

**Client:** https://cheerful-beijinho-1ae898.netlify.app
**Server:** https://scholar-stream-backend-two.vercel.app

Backend Repository Link : https://github.com/Fahmida0010/scholarStream-backend.git

Admin_email: [tasni@gmail.com](mailto:tasni@gmail.com)
Admin_Password: Tasni25@#

Moderator_Email: [diana@gmail.com](mailto:diana@gmail.com)
Moderator_Password: Diana25@#

---

# Main Technologies Used

* MongoDB
* Express.js
* React
* Node.js
* Firebase Authentication
* Stripe Payment Integration
* Tailwind CSS
* DaisyUI
* JWT Authentication

---

# Project Purpose

ScholarStream simplifies the process of finding scholarships by centralizing all opportunities in one platform.

It allows:

Students to search, filter, and apply for scholarships.
Moderators to manage applications and provide feedback.
Admins to manage users, scholarships, and view analytics.

---

# Key Features

### Authentication & Authorization

Email/Password + Google Social Login
Role-based access: Student, Moderator, Admin
JWT for secure API calls

### Scholarship Management

Browse, search, filter, and sort scholarships
View scholarship details
Apply with payment via Stripe

### Dashboards

Admin: Add/manage scholarships, manage users, view analytics

Moderator: Review applications, give feedback, moderate reviews

Student: Apply to scholarships, track applications, write reviews

### Payment System

Stripe integration
Payment success/failure handling
Application status updated automatically

### UI/UX

Fully responsive
Modern, clean design
Framer Motion animations
Loading spinners and 404 page

---

# NPM Packages Used

### Frontend

react
react-router-dom
axios
firebase
react-hook-form
framer-motion
sweetalert2
react-icons
daisyui
tailwindcss
@stripe/stripe-js

### Backend

express
cors
dotenv
mongodb
jsonwebtoken
stripe

---

# Dependencies Installation

To install all dependencies, run the following command in both client and server directories:

```
npm install
```

---

# Run the Project Locally

### Step 1: Clone the repository

```
git clone https://github.com/Fahmida0010/scholarStream-backend.git
```

### Step 2: Install dependencies

```
npm install
```

### Step 3: Setup environment variables

Create a `.env` file and add necessary variables such as:

```
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
STRIPE_SECRET_KEY=your_stripe_key
```

### Step 4: Run the project

For frontend:

```
npm run dev
```

For backend:

```
node index.js
```

---

# Relevant Links

Client Live Site
https://cheerful-beijinho-1ae898.netlify.app

Server Live API
https://scholar-stream-backend-two.vercel.app

Backend Repository
https://github.com/Fahmida0010/scholarStream-backend.git

