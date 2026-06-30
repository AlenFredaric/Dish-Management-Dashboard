# Dish Management Platform

<div align="center">

### Culinary Control Center • Maison Culinaire

A modern **full-stack restaurant management platform** featuring a premium **Admin Dashboard** and an immersive **Customer Experience**, powered by React, Next.js, Express.js, and modern web technologies.

![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)
![Next.js](https://img.shields.io/badge/Next.js-16-000000?logo=next.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-339933?logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express-000000?logo=express&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38BDF8?logo=tailwindcss&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?logo=vite&logoColor=white)

</div>

---

# Overview

Dish Management Platform is a modern restaurant management ecosystem consisting of three independent applications working together.

The project demonstrates full-stack application architecture, responsive UI development, RESTful API design, reusable component architecture, and modern frontend engineering practices.

It currently consists of:

- **Culinary Control Center** – Restaurant Administration Dashboard
- **Maison Culinaire** – Premium Customer Restaurant Experience *(Currently under development)*
- **Express Backend** – Shared REST API and data management layer

---

# Applications

## Culinary Control Center

A premium restaurant administration dashboard designed for restaurant managers to manage dishes in real time.

### Features

- Publish or Archive dishes
- Live Dashboard Metrics
- Responsive Dashboard
- Premium Glassmorphism UI
- Animated Statistics
- Interactive Ambient Mouse Glow
- Connection Status Indicator
- Backend Offline Detection
- Error Recovery
- Optimistic UI Updates
- Dynamic Dish Image Rendering

---

## Maison Culinaire *(Under Development)*

A luxury customer-facing restaurant experience inspired by modern premium websites such as Tesla, Nobu, and Eleven Madison Park.

### Planned Features

- Cinematic Landing Page
- Interactive Menu
- Chef's Featured Specials
- Category Filtering
- Smart Search
- Restaurant Storytelling
- Reservation System
- Customer Reviews
- Luxury Animations
- Mobile-first Responsive Experience

---

# Technology Stack

## Frontend (Admin)

- React 19
- Vite
- Tailwind CSS
- Framer Motion
- Lucide React

## Frontend (Customer)

- Next.js 16
- TypeScript
- Tailwind CSS v4
- GSAP
- Lenis
- TanStack React Query
- React Hook Form
- Zod

## Backend

- Node.js
- Express.js
- REST API
- JSON Storage

## Development

- ESLint
- Git
- GitHub

---

# Project Architecture

```text
                    Maison Culinaire
                 Customer Frontend (Next.js)
                           │
                           │ REST API
                           ▼
                   Express.js Backend
                           │
                           ▼
                     dishes.json Data
                           ▲
                           │
                           │
            Culinary Control Center
             Admin Dashboard (React)
```

---

# Project Structure

```text
dish-dashboard-solution/

├── backend/
│   ├── server.js
│   ├── package.json
│   └── package-lock.json
│
├── customer-frontend/
│   ├── src/
│   │   ├── app/
│   │   ├── features/
│   │   ├── hooks/
│   │   ├── services/
│   │   ├── lib/
│   │   └── types/
│   ├── public/
│   └── package.json
│
├── frontend/
│   ├── src/
│   ├── public/
│   └── package.json
│
├── data/
│   └── dishes.json
│
├── screenshots/
│   ├── dashboard.png
│   ├── mobile-screen.png
│   └── offline-backend.png
│
├── README.md
└── .gitignore
```

---

# Current Features

### Admin Dashboard

- Premium Responsive UI
- Dish Publishing
- Dish Archiving
- Live Dashboard Statistics
- Backend Status Monitoring
- Mobile Responsive Design
- Optimistic Updates
- Dynamic Image Rendering

### Backend

- REST API
- JSON Data Storage
- Dish Management
- Publication Control

### Customer Frontend

Currently under active development.

Upcoming modules include:

- Luxury Landing Page
- Interactive Menu
- Reservation System
- Customer Reviews
- Chef Recommendations
- Story Section
- Search & Filtering

---

# Installation

## Clone the Repository

```bash
git clone https://github.com/AlenFredaric/Dish-Management-Dashboard.git
```

Navigate into the project directory:

```bash
cd Dish-Management-Dashboard
```

---

## Install Backend Dependencies

```bash
cd backend
npm install
```

---

## Install Admin Dashboard Dependencies

```bash
cd ../frontend
npm install
```

---

## Install Customer Frontend Dependencies

```bash
cd ../customer-frontend
npm install
```

---

# Running the Project

This project contains three independent applications.

---

## Start the Backend Server

```bash
cd backend
npm start
```

Backend:

```
http://localhost:3001
```

---

## Start the Admin Dashboard

```bash
cd frontend
npm run dev
```

Admin Dashboard:

```
http://localhost:5173
```

---

## Start the Customer Frontend

```bash
cd customer-frontend
npm run dev
```

Customer Frontend:

```
http://localhost:3000
```

---

# API Overview

### Admin API

| Method | Endpoint | Description |
|---------|----------|-------------|
| GET | `/api/dishes` | Retrieve all dishes |
| PATCH | `/api/dishes/:id` | Publish or archive a dish |

---

### Customer API *(Planned)*

| Method | Endpoint | Description |
|---------|----------|-------------|
| GET | `/api/menu` | Retrieve active menu items |
| GET | `/api/menu/featured` | Retrieve Chef's Specials |
| GET | `/api/menu/categories` | Retrieve menu categories |

---

# System Workflow

```text
                  Admin Dashboard
                         │
             Publish / Archive Dish
                         │
                         ▼
                 Express.js Backend
                         │
                Updates dishes.json
                         │
            REST API serves latest data
                         │
          ┌──────────────┴──────────────┐
          │                             │
          ▼                             ▼
 Admin Dashboard               Customer Frontend
     Updates                   Active Menu Updates
```

---

# Application Preview

## Admin Dashboard

Modern dashboard for managing restaurant dishes.

![Dashboard](./screenshots/dashboard.png)

---

## Backend Connection Status

Displays graceful offline handling when the backend becomes unavailable.

![Offline Backend](./screenshots/offline-backend.png)

---

## Responsive Mobile View

Optimized experience across mobile and tablet devices.

![Mobile View](./screenshots/mobile-screen.png)

---

# Roadmap

## Near Term

- Complete Maison Culinaire customer frontend
- Interactive Menu
- Chef's Featured Specials
- Search & Category Filters
- Reservation Page
- Responsive Mobile Experience

---

## Future Enhancements

- User Authentication
- Role-Based Access Control
- MongoDB Integration
- PostgreSQL Support
- Favorites & Wishlist
- Online Ordering
- Stripe Payment Integration
- Email Notifications
- Analytics Dashboard
- Image Uploads
- Docker Support
- CI/CD Pipeline
- Automated Testing
- Cloud Deployment

---

# Engineering Highlights

- Modular Full-Stack Architecture
- Feature-Based Frontend Structure
- RESTful API Design
- Responsive UI
- Reusable Components
- Modern React Practices
- TypeScript Ready Customer Frontend
- Production-Oriented Project Structure
- Scalable Code Organization

---

# Contributing

Contributions are welcome!

1. Fork the repository

2. Create a new branch

```bash
git checkout -b feature/your-feature
```

3. Commit your changes

```bash
git commit -m "feat: add your feature"
```

4. Push to GitHub

```bash
git push origin feature/your-feature
```

5. Open a Pull Request

---

# 📄 License

This project is licensed under the **MIT License**.

Feel free to use, modify, and learn from this project.

---

# 👨‍💻 Author

**Alen Fredaric Francis**

Full-Stack JavaScript Developer

### Tech Stack

- React.js
- Next.js
- JavaScript
- TypeScript
- Node.js
- Express.js
- Tailwind CSS
- REST APIs
- MongoDB
- Git & GitHub

---

## Support

If you found this project helpful or interesting:

⭐ Star this repository

🍴 Fork it

💡 Share your feedback

Your support is greatly appreciated!

---

<div align="center">

### Built with ❤️ by Alen Fredaric Francis

**Culinary Control Center** • **Maison Culinaire**

*A modern full-stack restaurant management platform.*

</div>