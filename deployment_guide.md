# 🚀 QuickHire Deployment Guide (Free Tier)

This guide will walk you through hosting your QuickHire application entirely for free using **Vercel** for the React Frontend and **Render** for the Node.js Backend. Since you are already using **Supabase** for the database, your data is already hosted in the cloud!

---

## Step 1: Preparation (GitHub)
Both Vercel and Render deploy automatically from GitHub repositories. 
1. Make sure your entire project (`Task_QuickHire_Qtec`) is pushed to a GitHub repository.
2. In your `quickhire-frontend/src/api/apiClient.js` (or currently where you define the backend URL), you will need to swap the `http://localhost:5000/api` base URL to match the Render URL once you deploy the backend.

*(Tip: It's best practice to use an environment variable in Vite like `import.meta.env.VITE_API_URL` instead of hardcoding `localhost`.)*

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
   - **Start Command**: `npm start` (or `node src/app.js`)
   - **Instance Type**: Select the **Free** tier.
5. **Set Environment Variables**:
   Scroll down to the "Environment Variables" section and add the exact same variables from your `quickhire-backend/.env` file:
   - Key: `PORT`, Value: `5000`
   - Key: `DATABASE_URL`, Value: `postgresql://postgres.[project-ref]:[password]@aws-0-[region].pooler.supabase.com:6543/postgres` *(Copy the Session Pooler string from Supabase)*
6. **Deploy**: Click **Create Web Service**. Render will now build and deploy your backend. It might take 2-3 minutes.
7. **Copy URL**: Once it says "Live", copy the Render URL at the top of the screen (e.g., `https://quickhire-api.onrender.com`).

---

## Step 3: Connect Frontend to Backend URL
Before deploying the frontend, update `quickhire-frontend` to use the new Live Backend.

1. In your frontend code (`apiClient.js`), change the `baseURL` from `http://localhost:5000/api` to `https://quickhire-api.onrender.com/api`.
   *Or, add a `.env` file in your frontend with `VITE_API_URL=https://quickhire-api.onrender.com/api` and use it.*
2. Commit and push this updated URL configuration to GitHub.

---

## Step 4: Deploy Frontend to Vercel (Vercel.com)
Vercel is the creator of Next.js but is also the fastest place to host Vite/React apps.

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
   If you used an environment variable like `VITE_API_URL` for the backend, add it here in the Environment Variables dropdown.
6. **Deploy**: Click **Deploy**. Vercel will build the React app.

---

## 🎉 Step 5: You're Live!
Once Vercel finishes building (usually less than a minute), it will give you a live `.vercel.app` URL. 

If you click it, you should see your QuickHire job board, and because it is communicating with your live Render backend and Supabase database, all your jobs will load instantly!

### Note on Render's Free Tier
Because Render is free, the backend server will "go to sleep" if no one visits the site for 15 minutes. When you open the frontend after a while, the very first API request might take **30 to 50 seconds** to load the jobs as the server wakes up. Don't panic if it feels slow at first—this is normal for free hosting!
