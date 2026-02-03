# Deployment Guide - EF TACTICS AI

Complete step-by-step guide for deploying EF TACTICS AI to production.

## 📋 Prerequisites

- GitHub account
- Vercel account (for frontend)
- Render account (for backend)
- Supabase account (for database)

---

## 🗄️ Step 1: Database Setup (Supabase)

### 1.1 Create Supabase Project

1. Go to [supabase.com](https://supabase.com)
2. Click "New Project"
3. Fill in project details:
   - Name: `ef-tactics-ai`
   - Database Password: (save this securely)
   - Region: Choose closest to your users

### 1.2 Run Database Schema

1. Navigate to SQL Editor in Supabase dashboard
2. Copy contents of `database/schema.sql`
3. Paste and execute the SQL

### 1.3 Get API Credentials

1. Go to Project Settings → API
2. Copy:
   - Project URL (SUPABASE_URL)
   - anon/public key (SUPABASE_ANON_KEY)
   - service_role key (SUPABASE_SERVICE_KEY)

---

## 🖥️ Step 2: Backend Deployment (Render)

### 2.1 Prepare Repository

1. Push code to GitHub:
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/yourusername/ef-tactics-ai.git
git push -u origin main
```

### 2.2 Create Render Web Service

1. Go to [render.com](https://render.com)
2. Click "New +" → "Web Service"
3. Connect your GitHub repository
4. Configure:
   - **Name**: `ef-tactics-ai-backend`
   - **Root Directory**: `backend`
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Instance Type**: Free or Starter

### 2.3 Set Environment Variables

Add these in Render dashboard:

```
NODE_ENV=production
PORT=5000
FRONTEND_URL=https://your-frontend-url.vercel.app

SUPABASE_URL=your_supabase_url
SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_KEY=your_service_key

JWT_SECRET=generate_random_secret_here
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
CACHE_TTL=3600
```

### 2.4 Deploy

1. Click "Create Web Service"
2. Wait for deployment to complete
3. Copy the backend URL (e.g., `https://ef-tactics-ai-backend.onrender.com`)

---

## 🌐 Step 3: Frontend Deployment (Vercel)

### 3.1 Install Vercel CLI

```bash
npm install -g vercel
```

### 3.2 Configure Frontend

1. Create `.env.production` in frontend directory:
```env
VITE_API_URL=https://your-backend-url.onrender.com/api
```

2. Update `frontend/vite.config.js` if needed

### 3.3 Deploy to Vercel

```bash
cd frontend
vercel login
vercel --prod
```

Follow prompts:
- Set up and deploy? **Yes**
- Which scope? (Select your account)
- Link to existing project? **No**
- Project name: `ef-tactics-ai`
- Directory: `./`
- Override settings? **No**

### 3.4 Configure Environment Variables

1. Go to Vercel dashboard
2. Select your project
3. Go to Settings → Environment Variables
4. Add:
   - `VITE_API_URL`: Your Render backend URL

### 3.5 Redeploy

```bash
vercel --prod
```

---

## 🔧 Step 4: Post-Deployment Configuration

### 4.1 Update Backend CORS

Update `FRONTEND_URL` in Render environment variables to your Vercel URL:
```
FRONTEND_URL=https://your-app.vercel.app
```

### 4.2 Test the Application

1. Visit your Vercel URL
2. Test all features:
   - Generate tactic
   - View presets
   - Tactical board
3. Check browser console for errors

### 4.3 Monitor Performance

**Render:**
- Check logs for errors
- Monitor response times

**Vercel:**
- Check Analytics
- Monitor build times

---

## 🚀 Step 5: Custom Domain (Optional)

### Frontend (Vercel)

1. Go to Project Settings → Domains
2. Add your custom domain
3. Update DNS records as instructed

### Backend (Render)

1. Go to Settings → Custom Domain
2. Add your API subdomain (e.g., `api.yourdomain.com`)
3. Update DNS records

---

## 🔄 Continuous Deployment

### Automatic Deployments

Both Vercel and Render support automatic deployments:

**Vercel:**
- Automatically deploys on push to `main` branch

**Render:**
- Enable "Auto-Deploy" in settings
- Deploys on push to `main` branch

### Manual Deployments

**Frontend:**
```bash
cd frontend
vercel --prod
```

**Backend:**
- Push to GitHub
- Render will auto-deploy
- Or manually trigger in Render dashboard

---

## 📊 Monitoring & Maintenance

### Health Checks

**Backend Health Endpoint:**
```
GET https://your-backend.onrender.com/health
```

### Logs

**Render:**
- View logs in dashboard
- Set up log drains for external monitoring

**Vercel:**
- View function logs in dashboard
- Monitor via Vercel Analytics

### Database Backups

**Supabase:**
- Automatic daily backups (Pro plan)
- Manual backups via dashboard

---

## 🐛 Troubleshooting

### Common Issues

**1. CORS Errors**
- Verify `FRONTEND_URL` in backend environment variables
- Check CORS configuration in `server.js`

**2. API Connection Failed**
- Verify `VITE_API_URL` in frontend environment variables
- Check backend is running on Render

**3. Database Connection Issues**
- Verify Supabase credentials
- Check Supabase project is active

**4. Build Failures**

Frontend:
```bash
# Test build locally
cd frontend
npm run build
```

Backend:
```bash
# Test locally
cd backend
npm start
```

### Performance Optimization

**Backend:**
- Enable caching (already implemented)
- Monitor rate limits
- Scale instance if needed

**Frontend:**
- Optimize images
- Enable Vercel Edge Network
- Monitor bundle size

---

## 📈 Scaling

### When to Scale

- Response times > 3 seconds
- High error rates
- Increased traffic

### Scaling Options

**Render:**
- Upgrade instance type
- Enable autoscaling

**Vercel:**
- Automatically scales
- Upgrade plan for more resources

**Supabase:**
- Upgrade to Pro plan
- Enable connection pooling

---

## ✅ Deployment Checklist

- [ ] Database schema deployed to Supabase
- [ ] Backend deployed to Render
- [ ] Frontend deployed to Vercel
- [ ] Environment variables configured
- [ ] CORS configured correctly
- [ ] Health check endpoint working
- [ ] All features tested in production
- [ ] Custom domain configured (optional)
- [ ] Monitoring set up
- [ ] Backup strategy in place

---

## 🎉 Success!

Your EF TACTICS AI application is now live and ready to help eFootball Mobile players dominate the game!

**Next Steps:**
- Share with the community
- Gather user feedback
- Monitor performance
- Plan future features

---

**Need Help?**

- Check logs in Render/Vercel dashboards
- Review error messages
- Consult platform documentation
- Open an issue on GitHub
