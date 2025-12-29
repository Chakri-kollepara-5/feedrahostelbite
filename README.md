<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0">

</head>

<body>

<div class="container">

<h1>🌱 Feedra – India’s Smart Food Donation Ecosystem</h1>

<div class="center">
  <img class="badge" src="https://img.shields.io/badge/Feedra-Food_Saver_India-32CD32?style=for-the-badge&logo=leaflet&logoColor=white">
</div>

<h2>🍽️ A Smart, Real-Time Food Donation Platform Built for India</h2>
<h3>Connecting Hostels, PGs, Students & NGOs to Reduce Food Waste</h3>

<hr/>

<div class="card center">
  🚀 <strong>Live Demo</strong> • 📘 <strong>Tech Stack</strong> • 🏗️ <strong>Architecture</strong> • 📞 <strong>Contact</strong>
</div>

<div class="card">
  <h2>🌍 Overview</h2>

  <p>Feedra is a real-time food donation application designed to help India fight food wastage by connecting:</p>

  <ul>
    <li>✔ Donors (Hostels, PGs, Restaurants, Students)</li>
    <li>✔ NGOs & Volunteers</li>
    <li>✔ HostelBite Meal Booking Platform</li>
  </ul>

  <p>It allows users to upload leftover food, notify NGOs instantly, and track pickup status — all in real time using Firebase.</p>
</div>

<div class="card">
  <h2>🚀 Live Demo</h2>

  <table>
    <tr><th>App</th><th>Link</th></tr>
    <tr><td>🌱 Feedra Live</td><td><a href="https://feedra.online" target="_blank">https://feedra.online</a></td></tr>
  </table>
</div>

<div class="card">
  <h2>✨ Features</h2>

  <h3>🌱 Food Donation (Feedra)</h3>
  <ul>
    <li>Add leftover meals with details</li>
    <li>Upload food images</li>
    <li>Real-time updates via Firebase</li>
    <li>NGO pickup tracking</li>
    <li>WhatsApp contact button</li>
  </ul>

  <h3>🍽 Meal Booking (HostelBite)</h3>
  <ul>
    <li>Search hostels/meals</li>
    <li>Pre-book or instant book</li>
    <li>Razorpay payment integration</li>
    <li>Hygiene ratings & reviews</li>
  </ul>

  <h3>🔗 Integration</h3>
  <ul>
    <li>“Donate Leftovers” button inside HostelBite</li>
    <li>Opens Feedra directly or embedded</li>
    <li>Shared green/white theme</li>
  </ul>
</div>

<div class="card">
  <h2>🛠 Tech Stack</h2>

  <table>
    <tr><th>Category</th><th>Technologies</th></tr>
    <tr><td>Frontend</td><td>React.js, TypeScript, TailwindCSS, React Router</td></tr>
    <tr><td>Backend</td><td>Firebase Auth, Firestore, Real-Time Database</td></tr>
    <tr><td>Design</td><td>TailwindCSS, Lucide Icons</td></tr>
    <tr><td>Payments (HostelBite)</td><td>Razorpay</td></tr>
    <tr><td>Deployment</td><td>Netlify + Vercel</td></tr>
  </table>
</div>

<div class="card">
  <h2>🏗 Architecture Overview</h2>

  <pre>
Donor → Feedra Donation Form → Firestore DB (Realtime)
     → NGO Dashboard → Pickup Tracking
     → HostelBite Users → Donate Leftovers Button
     → Admin Dashboard → Meals + Donations
  </pre>
</div>

<div class="card">
  <h2>📁 Folder Structure</h2>

  <pre>
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
  </pre>
</div>

<div class="card">
  <h2>🧩 Installation</h2>

  <pre>
git clone https://github.com/Chakri-kollepara-5/feedra.git
cd feedra
npm install
npm run dev
  </pre>

  <p>Configure Firebase in:</p>

  <pre>src/firebase/config.ts</pre>
</div>

<div class="card">
  <h2>📞 Contact</h2>

  <table>
    <tr><td><strong>Developer</strong></td><td>Kollepara Venkata Sri Chakravarthi (Chakri)</td></tr>
    <tr><td><strong>Phone</strong></td><td>+91 88856 28836</td></tr>
    <tr><td><strong>Email</strong></td><td>feedra985@gmail.com</td></tr>
    <tr><td><strong>Location</strong></td><td>Visakhapatnam, Andhra Pradesh 🇮🇳</td></tr>
  </table>
</div>

<div class="footer">
  💚 Built with Purpose — Feed the People, Not the Landfill.<br>
  <img src="https://img.shields.io/badge/Save_Food-Save_Lives-16a34a?style=for-the-badge"><br><br>
  © 2025 Feedra • HostelBite Integrated System
</div>

</div>
</body>
</html>
