# 🌍 WanderLust – Full Stack Vacation Rental Platform 🏡

🔗 **Live Demo:** https://wonderlusttravel.onrender.com/  
📦 **GitHub Repository:** https://github.com/mrankush079/wonderlust

---

## 📌 Project Overview

**WanderLust** is a full-stack web application inspired by platforms like Airbnb.  
It allows users to **browse, list, and book vacation properties** such as houses, villas, and farmhouses.

The platform supports:
- User-generated property listings
- Seamless booking system
- Real-time maps using Mapbox API
- Secure authentication using Google & GitHub OAuth
- Cloud-based image storage with Cloudinary

This project demonstrates real-world **MERN-style development with EJS**, RESTful APIs, authentication, and cloud deployment.

---

## 🚀 Features

### 🔍 Property Discovery
- Search and filter listings
- Category-based browsing
- Location-based search using Mapbox

### 🏷️ Listings & Booking
- Users can add, edit, and delete their own properties
- Upload multiple images per listing
- Simple and smooth booking flow

### ⭐ Reviews & Ratings
- Users can rate and review properties
- Input validations and error handling

### 🗺️ Map Integration
- Interactive map for each listing
- Real-time location visualization

### 🔐 Authentication & Security
- Google OAuth & GitHub OAuth
- Local authentication using Passport.js
- Sessions and cookies for persistent login
- Data validation using Joi

---

## 🛠️ Tech Stack

### Frontend
- HTML5, CSS3, JavaScript  
- Bootstrap  
- EJS (Templating Engine)

### Backend
- Node.js  
- Express.js  
- RESTful APIs  
- MVC Architecture  

### Database
- MongoDB Atlas  
- Mongoose ODM  

### Cloud & Tools
- Cloudinary – Image hosting  
- Multer – File uploads  
- Passport.js – Authentication  
- Express-session & Connect-mongo – Session storage  
- Dotenv – Environment variables  

---

## 🏗️ Project Architecture

Models → MongoDB Schemas
Views → EJS Templates
Controllers → Express Route Logic


This ensures:
- Clean code structure  
- Scalability  
- Easy maintenance  

---

## ⚙️ Installation & Setup

### Prerequisites
Make sure you have installed:
- Node.js (v18+ recommended)
- MongoDB
- Nodemon (global)

### Step 1: Clone the Repository
```bash
git clone : https://github.com/mrankush079/wonderlust
cd wonderlust


The project follows **MVC Architecture**:

Step 2: Install Dependencies

npm install


Step 3: Environment Variables

Create a .env file in the root directory:

ATLASDB_URL=mongodb://127.0.0.1:27017/wanderlust

CLOUD_NAME=your_cloud_name
CLOUD_API_KEY=your_api_key
CLOUD_API_SECRET=your_api_secret

SECRET=your_secret_key

Step 4: Run the Application

nodemon app.js

Open your browser:

http://localhost:8080

🌐 Deployment

=>Deployed on Render

=>Database hosted on MongoDB Atlas

=>Images stored using Cloudinary CDN

🔗 Live URL: https://wonderlusttravel.onrender.com/



🧠 What This Project Demonstrates

This project showcases strong skills in:

1)Building RESTful APIs

2)Authentication & Authorization

3)MongoDB schema design

4)File uploads & cloud storage

5)MVC architecture

6)Real-world deployment

Third-party API integration (Mapbox, OAuth)


📄 Resume Description (You Can Use)

WanderLust – Full Stack Vacation Rental Platform
 Developed a full-stack web application using Node.js, Express, MongoDB, and EJS,
 enabling users to list and book vacation properties with real-time map integration (Mapbox),
 secure authentication (Google/GitHub OAuth), image uploads via Cloudinary, and a complete review & rating system.
 Deployed on Render with MongoDB Atlas.

👨‍💻 Author

Ankush Choudhary 
GitHub: https://github.com/mrankush079

⭐ If you like this project, give it a star!

This project was built as a major full-stack project to demonstrate practical web development skills.

