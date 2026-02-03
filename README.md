<<<<<<< HEAD
# Efootball_tactic
A Efoolball Tactic Generator
=======
# EF TACTICS AI

> AI-powered eFootball Mobile tactics generator with visual tactical board and preset library

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

## 🎯 Overview

EF TACTICS AI is a complete web application that helps eFootball Mobile players master the game by generating optimized formations, playstyles, and individual instructions. Powered by intelligent AI agents that understand **eFootball Mobile 2026** mechanics, the app provides professional-grade tactical setups in under 3 seconds.

**🆕 Updated for eFootball 2026** - Now featuring Link Up System support, Enhanced Defensive Gameplay mechanics, and the latest 2026 meta formations!

### ✨ Features

- **AI-Powered Tactics Generation**: Instantly generate complete tactical setups based on your preferences
- **🔗 Link Up System Support**: Identifies managers compatible with the new 2026 Link Up System
- **🛡️ Enhanced Defensive Tactics**: Updated for 2026's improved defensive gameplay mechanics
- **Visual Tactical Board**: Interactive formation visualization with player positions
- **Preset Library**: Access proven tactics used by top players
- **2026 Meta Awareness**: AI trained on the latest competitive meta formations
- **Validation Engine**: Ensures tactics follow eFootball Mobile rules
- **Beginner-Friendly Explanations**: Step-by-step guides and pro tips
- **Mobile-Optimized**: Responsive design for all devices
- **Dark Mode**: Beautiful dark-themed UI

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ and npm
- Supabase account (for database)

### Installation

1. **Clone the repository**
```bash
cd C:\Users\Admin\EFOOTBALL\ef-tactics-ai
```

2. **Install backend dependencies**
```bash
cd backend
npm install
```

3. **Install frontend dependencies**
```bash
cd ../frontend
npm install
```

4. **Set up environment variables**

Create `.env` file in the backend directory:
```env
NODE_ENV=development
PORT=5000
FRONTEND_URL=http://localhost:5173

SUPABASE_URL=your_supabase_project_url
SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_KEY=your_supabase_service_key

JWT_SECRET=your_jwt_secret_key_here
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
CACHE_TTL=3600
```

5. **Set up database**

Run the SQL schema in your Supabase project:
```bash
# Copy the contents of database/schema.sql and run in Supabase SQL editor
```

6. **Start development servers**

Terminal 1 (Backend):
```bash
cd backend
npm run dev
```

Terminal 2 (Frontend):
```bash
cd frontend
npm run dev
```

7. **Open the app**

Navigate to `http://localhost:5173` in your browser

## 📁 Project Structure

```
ef-tactics-ai/
├── backend/                 # Node.js + Express API
│   ├── controllers/         # Request handlers
│   ├── routes/              # API routes
│   ├── services/
│   │   ├── ai/              # AI agent services
│   │   │   ├── tacticalAnalyst.js
│   │   │   ├── rulesValidator.js
│   │   │   ├── formationMapper.js
│   │   │   └── explainer.js
│   │   └── cache.js
│   ├── middleware/          # Express middleware
│   └── server.js            # Entry point
├── frontend/                # React + Vite + Tailwind
│   ├── src/
│   │   ├── components/      # Reusable components
│   │   ├── pages/           # Page components
│   │   ├── services/        # API client
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── index.html
├── shared/                  # Shared constants and types
├── database/                # Database schemas
└── docs/                    # Documentation
```

## 🎮 eFootball 2026 Features

This app is fully updated for **eFootball Mobile 2026** with support for all new features:

### 🔗 Link Up System
- Enhanced player chemistry and combination play
- Improved passing accuracy between linked players (+15%)
- Better off-ball movement and positioning
- Compatible managers: **Xabi Alonso**, **Hansi Flick**, **L. Spalletti**, **S. Inzaghi**, **S. Solbakken**, **Pep Guardiola**

### 🛡️ Enhanced Defensive Gameplay
- More responsive player switching mechanics
- Better AI defensive positioning
- Improved tackle timing windows
- Enhanced pressing coordination
- **Man Marking** and **Tight Marking** are now more effective

### 📱 Mobile Enhancements
- Graphics upgrade for better visual experience
- **Cancel Pass** feature support
- Optimized touch controls

### 🏆 2026 Meta Tactics
- **Top Formations**: 4-2-1-3, 3-4-2-1, 4-1-2-3, 5-2-1-2
- **Top Playstyles**: Possession Game, Quick Counter
- **Best Link Up Managers**: Hansi Flick, Xabi Alonso, S. Inzaghi
- Updated defensive instructions for enhanced gameplay

### 🎯 Treasure Link
- Bingo-style progression system awareness
- Achievement tracking integration ready

## 🎮 Usage

### Generate a Tactic

1. Navigate to the **Generator** page
2. Select your preferred:
   - Formation (e.g., 4-3-3, 5-2-1-2)
   - Playstyle (Possession, Quick Counter, etc.)
   - Squad Level (Beginner, Medium, Advanced)
   - Opponent Style
3. Click **Generate Tactic**
4. View complete tactical setup with:
   - Team settings
   - Individual instructions
   - Manager recommendation
   - How-to-play guide

### Browse Presets

1. Navigate to the **Presets** page
2. Filter by tags (META, BEGINNER, ADVANCED, etc.)
3. Click any preset to view full details

### Visualize on Tactical Board

1. Navigate to the **Tactical Board** page
2. Select a formation
3. View player positions on interactive pitch

## 🤖 AI Agents

The app uses 4 specialized AI agents:

1. **Tactical Analyst**: Generates complete tactical setups
2. **Rules Validator**: Validates tactics against eFootball Mobile rules
3. **Formation Mapper**: Creates positional data and board layouts
4. **Explainer**: Generates beginner-friendly explanations

## 🔧 API Endpoints

### POST `/api/tactics/generate`
Generate a complete tactic

**Request Body:**
```json
{
  "formation": "4-3-3",
  "playstyle": "Possession Game",
  "squadLevel": "Medium",
  "opponentStyle": "Counter Attack"
}
```

### POST `/api/tactics/validate`
Validate a tactic

### GET `/api/tactics/presets`
Get all preset tactics

### GET `/api/tactics/presets/:id`
Get specific preset details

## 🚢 Deployment

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed deployment instructions.

### Quick Deploy

**Frontend (Vercel):**
```bash
cd frontend
vercel --prod
```

**Backend (Render):**
1. Connect GitHub repository to Render
2. Set environment variables
3. Deploy

## 🧪 Testing

```bash
# Backend tests
cd backend
npm test

# Frontend tests
cd frontend
npm run test:ui
```

## 📊 Performance Metrics

- ✅ Tactic generation: < 3 seconds
- ✅ Tactical board load: < 2 seconds
- ✅ User can create tactic: < 30 seconds

## 🛠️ Tech Stack

- **Frontend**: React 18, Vite, Tailwind CSS, Fabric.js
- **Backend**: Node.js, Express
- **Database**: Supabase (PostgreSQL)
- **Deployment**: Vercel (frontend), Render (backend)

## 📝 License

MIT License - see LICENSE file for details

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📧 Support

For issues and questions, please open an issue on GitHub.

---

**Built with ❤️ for the eFootball Mobile community**
>>>>>>> 4037ffb (Initial commit)
