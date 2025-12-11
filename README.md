# ScholarStream – Scholarship Management Platform

A Full-Stack MERN Application to connect students with global scholarship opportunities.  
Students can browse and apply for scholarships, moderators can manage applications, and admins oversee the platform.



##  Project Purpose

ScholarStream simplifies the process of finding scholarships by centralizing all opportunities in one platform.  
It allows:

 Students to search, filter, and apply for scholarships.  
 Moderators to manage applications and provide feedback.  
 Admins to manage users, scholarships, and view analytics.



##  Live URL

 **Client:** _your-client-live-link_  
**Server:** _your-server-live-link_



##  Key Features

 **Authentication & Authorization**  
   Email/Password + Google Social Login  
   Role-based access: Student, Moderator, Admin  
   JWT for secure API calls  

 **Scholarship Management**  
   Browse, search, filter, and sort scholarships  
   View scholarship details  
   Apply with payment via Stripe  

 **Dashboards**  
  **Admin:** Add/manage scholarships, manage users, view analytics  
  - **Moderator:** Review applications, give feedback, moderate reviews  
   **Student:** Apply to scholarships, track applications, write reviews  

  **Payment System**  
   Stripe integration  
    Payment success/failure handling  
    Application status updated automatically  

 **UI/UX**  
    Fully responsive  
    Modern, clean design  
   Framer Motion animations  
   Loading spinners and 404 page  



## NPM Packages Used

### Frontend
 react, react-router-dom, axios, firebase, react-hook-form, framer-motion, sweetalert2, react-icons, daisyui, tailwindcss, @stripe/stripe-js  

### Backend
 express, cors, dotenv, mongoose, jsonwebtoken, stripe
