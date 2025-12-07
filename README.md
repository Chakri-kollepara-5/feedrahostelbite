# 🌱 Feedra – India’s Smart Food Donation Ecosystem

<div align="center">

![Feedra Banner](https://img.shields.io/badge/Feedra-Food_Saver_India-32CD32?style=for-the-badge&logo=leaflet&logoColor=white)

<h2>🍽️ A Smart, Real-Time Food Donation Platform Built for India</h2>
<h3>Connecting Hostels, PGs, Students & NGOs to Reduce Food Waste</h3>

</div>

---


🚀 Live Demo
 • 📘 Tech Stack
 • 🏗️ Architecture
 • 📞 Contact

</div>
🌍 Overview

Feedra is a real-time food donation application designed to help India fight food wastage by connecting:

✔ Donors (Hostels, PGs, Restaurants, Students)
✔ NGOs & Volunteers
✔ HostelBite Meal Booking Platform

It allows users to upload leftover food, notify NGOs instantly, and track pickup status — all in real time using Firebase.

🚀 Live Demo
App	Link
🌱 Feedra Live https://feedrabite.netlify.app/

🍽️ HostelBite Integration	Add your URL here
✨ Features
🌱 Food Donation (Feedra)

Add leftover meals with details

Upload food images

Real-time updates via Firebase

NGO pickup tracking

WhatsApp contact button

🍽️ Meal Booking (HostelBite)

Search hostels/meals

Pre-book or instant book

Razorpay payment integration

Hygiene ratings & reviews

🔗 Integration

"Donate Leftovers" button inside HostelBite

Opens Feedra directly or embedded

Shared green/white theme

🛠 Tech Stack
<div align="center">
Category	Technologies
Frontend	React.js, TypeScript, TailwindCSS, React Router
Backend	Firebase Auth, Firestore, Real-Time Database
Design	TailwindCSS, Lucide Icons
Payments (HostelBite)	Razorpay
Deployment	Netlify + Vercel
</div>
🏗️ Architecture Overview
<div align="center">
flowchart TD
    A[Donor - Hostel / Student] --> B[Feedra Donation Form]
    B --> C[Firestore DB - Real-time]
    C --> D[NGO Dashboard - Live Updates]
    D --> E[Pickup Tracking]

    A2[HostelBite User] --> F[Donate Leftovers Button]
    F --> B

    A3[Admin - Hostel] --> G[Admin Dashboard]
    G --> H[Meals + Donations]

</div>
📁 Folder Structure
feedra/
├── src/
│   ├── components/
│   ├── pages/
│   ├── context/
│   ├── firebase/
│   ├── assets/
│   └── App.tsx
├── public/
├── package.json
└── README.md

🧩 Installation
git clone https://github.com/Chakri-kollepara-5/feedra.git
cd feedra
npm install
npm run dev


Configure Firebase in:

src/firebase/config.ts

📞 Contact
<div align="center"> <table> <tr> <td><strong>Developer</strong></td> <td>Kollepara Venkata Sri Chakravarthi (Chakri)</td> </tr> <tr> <td><strong>Phone</strong></td> <td>+91 88856 28836</td> </tr> <tr> <td><strong>Email</strong></td> <td>feedra985@gmail.com</td> </tr> <tr> <td><strong>Location</strong></td> <td>Visakhapatnam, Andhra Pradesh 🇮🇳</td> </tr> </table> </div>
<div align="center">
💚 Built with Purpose — Feed the People, Not the Landfill.
<img src="https://img.shields.io/badge/Save_Food-Save_Lives-16a34a?style=for-the-badge" />

© 2025 Feedra • HostelBite Integrated System

</div>
