# 🚀 Quick Start Guide - EF TACTICS AI

Get up and running in 5 minutes!

## ⚡ Installation

### 1. Install Dependencies

**Backend:**
```bash
cd C:\Users\Admin\EFOOTBALL\ef-tactics-ai\backend
npm install
```

**Frontend:**
```bash
cd C:\Users\Admin\EFOOTBALL\ef-tactics-ai\frontend
npm install
```

### 2. Set Up Environment

**Backend** - Create `backend\.env`:
```env
NODE_ENV=development
PORT=5000
FRONTEND_URL=http://localhost:5173
SUPABASE_URL=your_url_here
SUPABASE_ANON_KEY=your_key_here
SUPABASE_SERVICE_KEY=your_key_here
JWT_SECRET=your_secret_here
```

**Frontend** - Create `frontend\.env`:
```env
VITE_API_URL=http://localhost:5000/api
```

### 3. Run Development Servers

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```

**Terminal 2 - Frontend:**
```bash
cd frontend
npm run dev
```

### 4. Open Application

Navigate to: `http://localhost:5173`

---

## 📚 Key Files

- **README.md** - Complete documentation
- **DEPLOYMENT.md** - Production deployment guide
- **walkthrough.md** - Detailed project walkthrough

## 🎯 Features

✅ AI Tactics Generator  
✅ Tactical Board Visualization  
✅ Preset Library  
✅ Validation Engine  
✅ Mobile-Responsive UI  

## 🚀 Deploy to Production

See **DEPLOYMENT.md** for step-by-step instructions for:
- Supabase (Database)
- Render (Backend)
- Vercel (Frontend)

---

**Need help?** Check README.md or open an issue!
