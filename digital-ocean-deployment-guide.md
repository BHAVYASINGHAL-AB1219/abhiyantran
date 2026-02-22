# DigitalOcean App Platform Deployment Guide

Since your project is a "monorepo" containing both a React frontend and a PHP backend, you need to configure DigitalOcean to host them as two separate components within the same App. This ensures that the frontend is served as a static site and the backend runs as a PHP server.

**I have already updated your React code to point to `/api` instead of `localhost`. You are ready to deploy.**

Follow these 4 simple steps in the DigitalOcean dashboard:

---

### Step 1: Connect Your Repository
1. Log in to DigitalOcean and click **Create App**.
2. Select **GitHub** and choose your `abhiyantran` repository.
3. Leave the branch as `main` (or whichever branch you push your code to).
4. Leave **Autodeploy on push** enabled.
5. Click **Next**.

### Step 2: Configure the Backend (PHP Web Service)
When you reach the "Resources" screen, you will see your repository listed. We must tell DigitalOcean this first component is the backend.
1. Click the **Edit** button next to your repository name (e.g., `abhiyantran`).
2. Change the **Source Directory** from `/` to `/backend`.
3. Click **Save**.
   *(DigitalOcean will instantly scan the folder, see `composer.json`, and realize this is a PHP app).*
4. Verify the **Type** is now set to **Web Service**.
5. Under **Environment Variables**, add the variables from your local `.env` file (e.g., `MONGODB_URI` and `ADMIN_PASSWORD`).
6. **HTTP Routes:** Change the path to `/api`. This tells DigitalOcean that any traffic pointing to `your-app.com/api` should go to your PHP server.

### Step 3: Add the Frontend (React Static Site)
Now, you need to tell DigitalOcean about the React frontend in the root directory.
1. Still on the "Resources" page, click **Add Component** (or "Add a Web Service / Static Site").
2. Select the exact same `abhiyantran` repository from GitHub.
3. For **Type**, select **Static Site**.
4. Leave the **Source Directory** as `/` (the root folder).
5. Ensure the **Build Command** is set to `npm run build`.
6. Ensure the **Output Directory** is set to `dist`.
7. **HTTP Routes:** Ensure this is set to `/`. This means the rest of your website traffic will go here.

### Step 4: Review and Deploy
1. Click **Next** to proceed to the Environment variables section (you don't need any for the frontend, as your API urls are now relative).
2. Click **Next** to the "Info" section. Name your app whatever you like.
3. Click **Next** to the "Review" section.
4. Review your plan details (The $5.00/mo 512MB RAM tier is suitable for this).
5. Click **Create Resources** (or Deploy).

DigitalOcean will now build the static React site and spin up a PHP server, seamlessly routing frontend traffic and backend API calls!
