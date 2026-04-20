<div align="center">

<img src="https://img.shields.io/badge/Zyntra-AI%20Content%20Platform-6366f1?style=for-the-badge&logoColor=white" alt="Zyntra" />

# Zyntra — AI-Powered Content Creation Platform

**A full-stack SaaS application delivering a suite of AI tools for writers, creators, and professionals.**  
Write articles, generate images, remove backgrounds, erase objects, and get AI resume feedback — all in one place.

[![React](https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-7-646CFF?style=flat-square&logo=vite)](https://vitejs.dev/)
[![Express](https://img.shields.io/badge/Express-5-000000?style=flat-square&logo=express)](https://expressjs.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-38BDF8?style=flat-square&logo=tailwindcss)](https://tailwindcss.com/)
[![Clerk](https://img.shields.io/badge/Clerk-Auth%20%2B%20Billing-6C47FF?style=flat-square&logo=clerk)](https://clerk.com/)
[![Neon](https://img.shields.io/badge/Neon-Serverless%20Postgres-00E699?style=flat-square)](https://neon.tech/)
[![Cloudinary](https://img.shields.io/badge/Cloudinary-AI%20Media-3448C5?style=flat-square&logo=cloudinary)](https://cloudinary.com/)
[![Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-000000?style=flat-square&logo=vercel)](https://vercel.com/)

</div>

---

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Architecture](#architecture)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [API Reference](#api-reference)
- [Environment Variables](#environment-variables)
- [Getting Started](#getting-started)
- [Subscription & Usage Model](#subscription--usage-model)
- [Deployment](#deployment)

---

## Overview

Zyntra is a production-ready, multi-tenant SaaS platform built around a collection of AI-driven content tools. It integrates **Google Gemini** (via the OpenAI-compatible SDK), **Clipdrop**, and **Cloudinary's generative AI** transformations to power six distinct creative features — from long-form article generation to intelligent object removal from photos.

Authentication and subscription billing are handled end-to-end by **Clerk**, which drives a tiered usage model: free users receive a 10-creation trial, while premium subscribers unlock unlimited access and exclusive premium-only tools.

All user-generated content is persisted in a **Neon serverless PostgreSQL** database, with images stored and transformed via **Cloudinary**. The platform is deployed on **Vercel** with separate client and server deployments.

---

## Features

### 🖊️ AI Article Writer
Generate full-length, structured articles from a prompt with configurable output length. Powered by Gemini 3 Flash. Available on the free tier (shared 10-creation limit).

### #️⃣ Blog Title Generator
Produce a curated set of scroll-stopping blog titles for any topic in seconds. Available on the free tier.

### 🖼️ AI Image Generation *(Premium)*
Text-to-image generation via the **Clipdrop API**. Generated images are uploaded to Cloudinary and can optionally be published to the community gallery.

### ✂️ Background Removal *(Premium)*
Upload any image and remove its background instantly using **Cloudinary's AI background removal transformation** — no manual masking required.

### 🧹 Object Removal *(Premium)*
Specify any object by name and erase it from a photo using **Cloudinary's generative remove** transformation. The result is a seamlessly in-painted image.

### 📄 Resume Review *(Premium)*
Upload a PDF resume (up to 5 MB). The server parses the document text and sends it to Gemini for a detailed critique covering strengths, weaknesses, and actionable improvements.

### 🌐 Community Gallery
A public feed of published AI-generated images from all users, with a like/unlike toggle system for social discovery.

### 📊 Dashboard
A personal hub showing all past creations (articles, titles, images, reviews) alongside active plan information and total creation count.

---

## Architecture

```
┌─────────────────────────────────────────────────────────┐
│                        CLIENT                           │
│  React 19 + Vite 7 + Tailwind 4 + React Router 7       │
│  Clerk React (Auth UI + PricingTable + Protect gates)   │
└──────────────────────┬──────────────────────────────────┘
                       │  HTTPS / REST
┌──────────────────────▼──────────────────────────────────┐
│                        SERVER                           │
│  Express 5 · Clerk Express (requireAuth + plan check)  │
│                                                         │
│  ┌──────────────┐  ┌────────────────┐  ┌─────────────┐ │
│  │  ai.routes   │  │  user.routes   │  │ auth.middle │ │
│  └──────┬───────┘  └───────┬────────┘  └─────────────┘ │
│         │                  │                             │
│  ┌──────▼──────────────────▼───────────────────────┐   │
│  │              ai.controller / user.controller     │   │
│  └────────┬──────────┬─────────────┬───────────────┘   │
│           │          │             │                     │
│    ┌──────▼──┐ ┌─────▼──┐  ┌──────▼──────┐            │
│    │ Gemini  │ │Clipdrop│  │ Cloudinary  │            │
│    │   API   │ │  API   │  │ (AI + Store)│            │
│    └─────────┘ └────────┘  └─────────────┘            │
│           │                                             │
│    ┌──────▼──────────────────────────────────────┐    │
│    │       Neon Serverless PostgreSQL             │    │
│    │   creations(id, user_id, prompt, content,    │    │
│    │              type, publish, created_at)       │    │
│    └──────────────────────────────────────────────┘    │
└─────────────────────────────────────────────────────────┘
```

### Request Lifecycle

```
User Action
  → Clerk issues JWT token (client-side)
  → Axios attaches Bearer token to request header
  → Express clerkMiddleware() validates token globally
  → requireAuth() rejects unauthenticated requests
  → auth middleware checks Clerk subscription plan & free_usage metadata
  → Controller executes AI call or rejects based on plan entitlement
  → Result saved to Neon DB & response returned to client
```

---

## Tech Stack

| Layer | Technology | Purpose |
|---|---|---|
| **Frontend Framework** | React 19 + Vite 7 | Component-based UI with fast HMR |
| **Styling** | Tailwind CSS 4 | Utility-first design system |
| **Routing** | React Router 7 | Client-side navigation with nested routes |
| **Auth & Billing** | Clerk | Authentication, session management, subscription plans |
| **HTTP Client** | Axios | REST API communication with JWT injection |
| **Notifications** | React Hot Toast | Non-blocking user feedback |
| **Markdown Rendering** | React Markdown | Renders AI-generated article output |
| **Icons** | Lucide React | Consistent icon set |
| **Backend Runtime** | Node.js + Express 5 | RESTful API server |
| **Database** | Neon (Serverless Postgres) | Persistent creation storage |
| **AI Text Generation** | Google Gemini 3 Flash (via OpenAI SDK) | Article, titles, resume review |
| **AI Image Generation** | Clipdrop API | Text-to-image synthesis |
| **AI Image Processing** | Cloudinary Generative AI | Background removal, object removal |
| **Media Storage** | Cloudinary | Image hosting and CDN delivery |
| **File Uploads** | Multer | Multipart form handling for images and PDFs |
| **PDF Parsing** | pdf-parse | Resume text extraction |
| **Deployment** | Vercel | Serverless hosting for both client and server |

---

## Project Structure

```
Zyntra/
│
├── client/                          # React + Vite frontend
│   ├── public/
│   │   ├── favicon.svg
│   │   └── gradientBackground.png   # Hero section background
│   │
│   ├── src/
│   │   ├── assets/
│   │   │   ├── assets.js            # Centralized asset exports + AiToolsData config
│   │   │   └── [images & icons]
│   │   │
│   │   ├── components/
│   │   │   ├── AiTools.jsx          # AI tools grid / feature showcase
│   │   │   ├── CreationItem.jsx     # Reusable creation card (article / image / review)
│   │   │   ├── Footer.jsx
│   │   │   ├── Hero.jsx             # Landing hero with CTA
│   │   │   ├── Navbar.jsx           # Top nav with Clerk UserButton
│   │   │   ├── Plan.jsx             # Clerk PricingTable integration
│   │   │   ├── Sidebar.jsx          # App sidebar with tool navigation
│   │   │   └── Testimonial.jsx
│   │   │
│   │   ├── pages/
│   │   │   ├── Home.jsx             # Marketing landing page
│   │   │   ├── Layout.jsx           # App shell with Sidebar + Outlet
│   │   │   ├── Dashboard.jsx        # User dashboard with creations + plan info
│   │   │   ├── WriteArticle.jsx     # Article generation tool
│   │   │   ├── BlogTitles.jsx       # Blog title generator tool
│   │   │   ├── GenerateImages.jsx   # Text-to-image tool (premium)
│   │   │   ├── RemoveBackground.jsx # Background removal tool (premium)
│   │   │   ├── RemoveObject.jsx     # Object removal tool (premium)
│   │   │   ├── ReviewResume.jsx     # PDF resume review tool (premium)
│   │   │   └── Community.jsx        # Public creation gallery with likes
│   │   │
│   │   ├── App.jsx                  # Route definitions
│   │   ├── main.jsx                 # App entry point + ClerkProvider
│   │   └── index.css
│   │
│   ├── vercel.json                  # SPA rewrite rules for Vercel
│   ├── vite.config.js
│   └── package.json
│
├── server/                          # Node.js + Express backend
│   ├── configs/
│   │   ├── db.js                    # Neon serverless SQL client
│   │   ├── cloudinary.js            # Cloudinary SDK initialisation
│   │   └── multer.js                # Multer disk storage config
│   │
│   ├── controllers/
│   │   ├── ai.controller.js         # All AI feature handlers
│   │   └── user.controller.js       # Creations retrieval + like toggle
│   │
│   ├── middlewares/
│   │   └── auth.middleware.js       # Plan detection + free_usage injection
│   │
│   ├── routes/
│   │   ├── ai.routes.js             # /api/ai/* endpoints
│   │   └── user.routes.js           # /api/user/* endpoints
│   │
│   ├── server.js                    # App entry point + middleware bootstrap
│   ├── vercel.json                  # Serverless function config
│   └── package.json
│
└── README.md
```

---

## API Reference

All routes are protected by Clerk's `requireAuth()` global middleware. Routes marked with **[auth]** additionally run the plan-checking `auth` middleware.

### AI Endpoints — `/api/ai`

| Method | Endpoint | Auth | Plan | Description |
|---|---|---|---|---|
| `POST` | `/generate-article` | [auth] | Free (limit 10) / Premium | Generate a full article from a prompt and length parameter |
| `POST` | `/generate-blog-title` | [auth] | Free (limit 10) / Premium | Generate blog title suggestions from a topic prompt |
| `POST` | `/generate-image` | [auth] | **Premium only** | Text-to-image via Clipdrop; optional community publish flag |
| `POST` | `/remove-image-background` | [auth] | **Premium only** | Upload image (multipart); returns background-removed URL |
| `POST` | `/remove-image-object` | [auth] | **Premium only** | Upload image + `object` string; returns object-erased URL |
| `POST` | `/resume-review` | [auth] | **Premium only** | Upload PDF resume (max 5 MB); returns AI critique |

### User Endpoints — `/api/user`

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| `GET` | `/get-user-creations` | [auth] | Returns all creations belonging to the authenticated user |
| `GET` | `/get-published-creations` | [auth] | Returns all publicly published image creations for the community feed |
| `POST` | `/toggle-like-creation` | [auth] | Toggles a like on a specific creation |

### Database Schema

```sql
-- creations table (Neon PostgreSQL)
CREATE TABLE creations (
  id          SERIAL PRIMARY KEY,
  user_id     TEXT NOT NULL,           -- Clerk user ID
  prompt      TEXT NOT NULL,
  content     TEXT NOT NULL,           -- Article text or Cloudinary URL
  type        TEXT NOT NULL,           -- 'article' | 'blog-title' | 'image' | 'resume-review'
  publish     BOOLEAN DEFAULT FALSE,   -- Community visibility flag
  created_at  TIMESTAMPTZ DEFAULT NOW()
);
```

---

## Environment Variables

### `client/.env`

```env
VITE_CLERK_PUBLISHABLE_KEY=pk_test_...
VITE_BASE_URL=http://localhost:3000
```

### `server/.env`

```env
# Database
DATABASE_URL=postgresql://...@...neon.tech/neondb?sslmode=require

# Clerk
CLERK_SECRET_KEY=sk_test_...

# AI
GEMINI_API_KEY=...
CLIPDROP_API_KEY=...

# Cloudinary
CLOUDINARY_CLOUD_NAME=...
CLOUDINARY_API_KEY=...
CLOUDINARY_API_SECRET=...

# Server
PORT=3000
```

---

## Getting Started

### Prerequisites

- Node.js 18+
- A [Clerk](https://clerk.com/) account with a configured application and subscription plans
- A [Neon](https://neon.tech/) project with the `creations` table created
- A [Cloudinary](https://cloudinary.com/) account
- A [Clipdrop](https://clipdrop.co/apis) API key
- A Google Gemini API key (via [Google AI Studio](https://aistudio.google.com/))

### Installation

```bash
# Clone the repository
git clone https://github.com/your-username/zyntra.git
cd zyntra
```

#### Run the Server

```bash
cd server
npm install
npm run server      # Development (nodemon)
# or
npm start           # Production
```

#### Run the Client

```bash
cd client
npm install
npm run dev         # Development
# or
npm run build       # Production build
```

The client will start at `http://localhost:5173` and the server at `http://localhost:3000`.

### Database Setup

Run the following SQL against your Neon database to create the required table:

```sql
CREATE TABLE creations (
  id          SERIAL PRIMARY KEY,
  user_id     TEXT NOT NULL,
  prompt      TEXT NOT NULL,
  content     TEXT NOT NULL,
  type        TEXT NOT NULL CHECK (type IN ('article', 'blog-title', 'image', 'resume-review')),
  publish     BOOLEAN DEFAULT FALSE,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);
```

---

## Subscription & Usage Model

Zyntra uses Clerk's native subscription billing to differentiate between free and premium users. The `auth` middleware on every protected AI route reads the user's plan and enforces the following rules:

| Feature | Free | Premium |
|---|---|---|
| AI Article Writer | ✅ (10 creations shared) | ✅ Unlimited |
| Blog Title Generator | ✅ (10 creations shared) | ✅ Unlimited |
| AI Image Generation | ❌ | ✅ |
| Background Removal | ❌ | ✅ |
| Object Removal | ❌ | ✅ |
| Resume Review | ❌ | ✅ |
| Community Gallery | ✅ | ✅ |

Usage tracking for free users is stored in Clerk's `privateMetadata` (`free_usage` field) and incremented server-side after each successful free-tier generation. When the limit is reached, the API returns a `"Limit reached. Upgrade to continue."` message. Upgrading via Clerk's `PricingTable` resets the counter automatically.

---

## Deployment

Both the client and server are configured for deployment on **Vercel**.

#### Client (`client/vercel.json`)

Configures SPA rewrites so all routes resolve to `index.html`:

```json
{
  "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
}
```

#### Server (`server/vercel.json`)

Routes all incoming requests to `server.js` as a serverless function:

```json
{
  "version": 2,
  "builds": [{ "src": "server.js", "use": "@vercel/node" }],
  "routes": [{ "src": "/(.*)", "dest": "server.js" }]
}
```

Set all required environment variables in the Vercel dashboard for each deployment before going live. Update `VITE_BASE_URL` on the client to point to the deployed server URL.

---

<div align="center">

Built with ❤️ · Powered by Gemini, Clipdrop & Cloudinary AI

</div>
