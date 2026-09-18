# 🎾 BookIva — Padel Court Booking Web App

<p align="center">
  <img src="https://via.placeholder.com/900x400.png?text=BookIva+Preview" alt="BookIva Preview" width="100%">
</p>

<p align="center">
  <strong>BookIva</strong> is a web application for booking padel courts, allowing users to search, select, and reserve court slots online — complete with a digital payment system and an admin dashboard for service management.
</p>

<p align="center">
  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" />
  <img src="https://img.shields.io/badge/TailwindCSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" />
  <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white" />
  <img src="https://img.shields.io/badge/Prisma-2D3748?style=for-the-badge&logo=prisma&logoColor=white" />
  <img src="https://img.shields.io/badge/Xendit-1C1E21?style=for-the-badge&logoColor=white" />
</p>

<p align="center">
  <a href="#-about-the-project">About</a> •
  <a href="#-key-features">Features</a> •
  <a href="#-tech-stack">Tech Stack</a> •
  <a href="#-installation">Installation</a> •
  <a href="#-folder-structure">Structure</a> •
  <a href="#-contact">Contact</a>
</p>

---

## 📖 About the Project

**BookIva** was built to solve a common problem in padel court reservations: manual booking via chat or phone calls, which is time-consuming and prone to scheduling conflicts. With BookIva, users can view real-time slot availability through an interactive calendar, pick their preferred service, and complete payment directly online.

This project was developed **end-to-end** — from database design, REST API, authentication (including OAuth), to third-party payment gateway integration (Xendit) — as a full-stack web development case study with a multi-role system (user & admin).

## 🎥 Demo

> Add your live demo link and a short walkthrough video here (e.g. deployed on Vercel/Railway, or a GIF of the booking flow).

- 🎬 Video Walkthrough: `https://your-video-link.com`

## ✨ Key Features

### 👤 For Users

- **Authentication** — Login & Register, including **OAuth** support for a faster sign-in experience.
- **Home Page** — Landing page showcasing featured court services.
- **Service Page & Service Detail** — List of courts/services along with detailed information (price, facilities, location, etc.).
- **Booking Page** — Interactive calendar displaying a list of available time slots.
- **Booking Detail** — Summary of booking data (service, schedule, price) before proceeding to payment.
- **Online Payment** — **Xendit API** integration for a secure and fast payment process.

### 🛠️ For Admins

- **Admin Dashboard** — Dedicated panel for managing court/service data, monitoring bookings, and configuring slot availability.
- **Role-Based Access Control** — Multi-role system that distinguishes access rights between `user` and `admin`.

## 🧩 Tech Stack

| Layer               | Technology             |
| ------------------- | ---------------------- |
| **Frontend**        | React.js, Tailwind CSS |
| **Backend**         | Node.js (Express)      |
| **Database ORM**    | Prisma ORM             |
| **Authentication**  | JWT / Session + OAuth  |
| **Payment Gateway** | Xendit API             |

## 🏗️ High-Level Architecture

```mermaid
flowchart LR
    A[React + Tailwind CSS] -->|REST API| B[Node.js Server]
    B --> C[(Database via Prisma ORM)]
    B --> D[Xendit Payment API]
    B --> E[OAuth Provider]
```

## 📸 Screenshots

| Home Page                                    | Service Detail                                  | Booking Calendar                                | Admin Dashboard                               |
| -------------------------------------------- | ----------------------------------------------- | ----------------------------------------------- | --------------------------------------------- |
| ![home](https://via.placeholder.com/250x150) | ![service](https://via.placeholder.com/250x150) | ![booking](https://via.placeholder.com/250x150) | ![admin](https://via.placeholder.com/250x150) |

> Replace the placeholder images above with actual screenshots of your application.

## ⚙️ Installation

### Prerequisites

- Node.js `>= 18.x`
- A database (PostgreSQL/MySQL — depending on your `schema.prisma` setup)
- A [Xendit](https://xendit.co) account to obtain an API key

### Steps

```bash
# 1. Clone the repository
git clone https://github.com/username/bookiva.git
cd bookiva

# 2. Install dependencies (backend & frontend)
cd server && npm install
cd ../client && npm install

# 3. Configure environment variables
cp .env.example .env
```

### Environment Variables

Create a `.env` file in the backend folder with the following variables:

```env
DATABASE_URL="postgresql://user:password@localhost:5432/bookiva"
JWT_SECRET="your_jwt_secret"
OAUTH_CLIENT_ID="your_oauth_client_id"
OAUTH_CLIENT_SECRET="your_oauth_client_secret"
XENDIT_SECRET_KEY="your_xendit_secret_key"
XENDIT_CALLBACK_TOKEN="your_xendit_callback_token"
```

```bash
# 4. Run database migrations with Prisma
npx prisma migrate dev

# 5. Start the backend server
npm run dev

# 6. Start the frontend application
cd ../client
npm run dev
```

The application will be running at:

- Frontend → `http://localhost:5173`
- Backend → `http://localhost:5000`

## 🚀 Roadmap

- [ ] Email notifications from Xendit after make a payment
- [ ] Service review & include time slot book
- [ ] service search & filter by location

## 🧠 Challenges & Learnings

> Use this section to highlight your problem-solving process — recruiters and reviewers often value this more than a plain feature list. For example:

- Handling **real-time slot availability** without double bookings required careful transaction handling on the backend.
- Integrating **Xendit's webhook/callback** for payment status updates taught me how to build idempotent payment confirmation logic.
- Implementing **OAuth alongside traditional login** required designing a flexible authentication flow that supports multiple providers under one user model.
- Designing a **role-based access system** (user vs admin) helped me understand middleware-based authorization in Express.

## 🧑‍💻 Contact

**Mohamad Azriqin**
📧 Email: azriqinmohd@gmail.com
💼 LinkedIn: [linkedin.com/in/username](https://linkedin.com)

---

<p align="center">⭐ If you find this project helpful, feel free to give it a star!</p>
