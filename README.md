# 🚀 QuickHire Job Board

**QuickHire** is a modern, full-stack mini job board application. It allows users to browse job listings, search and filter for specific keywords or categories, and submit applications. An integrated admin dashboard permits authorized users to post new jobs and view received applicant information.

## 🛠️ Technology Stack
- **Frontend**: React.js, Vite, Tailwind CSS (v4), React Router, Lucide Icons
- **Backend**: Node.js, Express.js
- **Database**: PostgreSQL (hosted on Supabase)
- **Deployment**: Vercel (Frontend), Render (Backend)

---

## 💻 Local Development Setup

Follow these steps to run the QuickHire project locally on your machine.

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) installed on your computer.

### 1. Database Configuration
1. Set up a PostgreSQL database (e.g., using [Supabase](https://supabase.com/)).
2. Use the provided `supabase_schema.sql` file in the root directory to create the required `jobs` and `applications` tables in your database.

### 2. Backend Setup
1. Open a terminal and navigate to the backend folder:
   ```bash
   cd quickhire-backend
   ```
2. Install the necessary dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the `quickhire-backend` directory and add your database credentials:
   ```env
   PORT=5000
   DATABASE_URL=postgresql://postgres.[your-project-ref]:[your-password]@aws-0-[region].pooler.supabase.com:5432/postgres
   ```
4. Start the backend development server:
   ```bash
   npm run dev
   ```
*(The backend will run on `http://localhost:5000`)*

### 3. Frontend Setup
1. Open a **new** terminal tab and navigate to the frontend folder:
   ```bash
   cd quickhire-frontend
   ```
2. Install the dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the `quickhire-frontend` directory (if you want to override the default local API URL):
   ```env
   VITE_API_URL=http://localhost:5000/api
   ```
4. Start the Vite development server:
   ```bash
   npm run dev
   ```
*(The frontend will run on `http://localhost:5173`)*

---

# ☁️ Live Deployment Guide (Free Tier)

This guide will walk you through hosting your QuickHire application entirely for free using **Vercel** for the React Frontend and **Render** for the Node.js Backend.

---

## Step 1: Preparation (GitHub)
Both Vercel and Render deploy automatically from GitHub repositories. 
Make sure your entire project is pushed to a Github repository.

---

## Step 2: Deploy Backend to Render (Render.com)
Render is a fantastic free platform for hosting Node.js APIs.

1. **Sign Up / Log In**: Go to [Render.com](https://render.com/) and log in with your GitHub account.
2. **Create Web Service**: Click **New +** and select **Web Service**.
3. **Connect Repository**: Select your GitHub repository containing the QuickHire project.
4. **Configure Service**:
   - **Name**: `quickhire-api` (or any name you like).
   - **Root Directory**: `quickhire-backend` (Important: This tells Render where the Node.js app lives).
   - **Environment**: Node.js.
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Instance Type**: Select the **Free** tier.
5. **Set Environment Variables**:
   Scroll down to the "Environment Variables" section in Render and click **Add Environment Variable**. Add these exactly as they are here:
   
   - **Key:** `PORT`
   - **Value:** `5000`

   - **Key:** `DATABASE_URL`
   - **Value:** `your-personal-supabase-database-url-here`
6. **Deploy**: Click **Create Web Service**. Render will now build and deploy your backend. It might take 2-3 minutes.
7. **Copy URL**: Once it says "Live", copy the Render URL at the top of the screen (e.g., `https://your-api-name.onrender.com`).

---

## Step 3: Connect Frontend to Backend URL
Before deploying the frontend, update `quickhire-frontend` to use the new Live Backend.

1. In your frontend code (`src/api/apiClient.js`), the `baseURL` is configured to use `import.meta.env.VITE_API_URL` with a fallback. 
2. We will provide this variable to Vercel during the final deployment step.

---

## Step 4: Deploy Frontend to Vercel (Vercel.com)
Vercel is the fastest place to host Vite/React apps.

1. **Sign Up / Log In**: Go to [Vercel.com](https://vercel.com/) and log in with your GitHub account.
2. **Add New Project**: Click **Add New** -> **Project**.
3. **Import Repository**: Find your QuickHire GitHub repository and click **Import**.
4. **Configure Project**:
   - **Project Name**: `quickhire-app`
   - **Framework Preset**: Vercel should automatically detect **Vite**.
   - **Root Directory**: Click the "Edit" button and select the `quickhire-frontend` folder.
   - **Build Command**: Leave default (`npm run build`).
   - **Output Directory**: Leave default (`dist`).
5. **Set Environment Variables**: 
   Before you click Deploy, expand the **Environment Variables** section and add this variable:
   
   - **Key:** `VITE_API_URL`
   - **Value:** `https://your-api-name.onrender.com/api` *(Paste the Render URL from Step 2 here! Ensure you add `/api` to the end)*

6. **Deploy**: Click **Deploy**. Vercel will build the React app.

---

## 🎉 Step 5: You're Live!
Once Vercel finishes building (usually less than a minute), it will give you a live `.vercel.app` URL. 

### Note on Render's Free Tier
Because Render is free, the backend server will "go to sleep" if no one visits the site for 15 minutes. When you open the frontend after a while, the very first API request might take **30 to 50 seconds** to load the jobs as the server wakes up. Don't panic if it feels slow at first!
