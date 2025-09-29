# Code Search Engine - Deployment Guide

## Project Structure
```
Code-Search-Engine-old/
├── backend/           # Node.js/Express backend
│   ├── server.js      # Main server file
│   ├── package.json   # Backend dependencies
│   ├── env.example    # Environment variables template
│   └── ...
├── frontend/          # React/Vite frontend
│   ├── src/           # React source code
│   ├── package.json   # Frontend dependencies
│   ├── env.example    # Environment variables template
│   └── ...
└── codebase/          # User uploaded code files
```

## Deployment Options

### Option 1: Separate Deployments (Recommended)

#### Backend Deployment (Railway, Render, Heroku, etc.)
1. **Prepare Backend:**
   ```bash
   cd backend
   cp env.example .env
   # Edit .env with your production settings
   ```

2. **Deploy Backend:**
   - Connect your GitHub repo to your deployment platform
   - Set root directory to `backend/`
   - Set environment variables:
     - `PORT` (usually auto-set by platform)
     - `NODE_ENV=production`

3. **Get Backend URL:**
   - Note your deployed backend URL (e.g., `https://your-app.railway.app`)

#### Frontend Deployment (Vercel, Netlify, etc.)
1. **Prepare Frontend:**
   ```bash
   cd frontend
   cp env.example .env.local
   # Edit .env.local with your backend URL
   VITE_API_URL=https://your-backend-url.com
   ```

2. **Deploy Frontend:**
   - Connect your GitHub repo to your deployment platform
   - Set root directory to `frontend/`
   - Set build command: `npm run build`
   - Set environment variables:
     - `VITE_API_URL=https://your-backend-url.com`

### Option 2: Full-Stack Deployment (Railway, Render)

1. **Create a root package.json:**
   ```json
   {
     "name": "code-search-engine",
     "scripts": {
       "build": "cd frontend && npm install && npm run build",
       "start": "cd backend && npm install && npm start"
     }
   }
   ```

2. **Deploy:**
   - Set root directory to project root
   - Set build command: `npm run build`
   - Set start command: `npm start`

## Environment Variables

### Backend (.env)
```env
PORT=5000
NODE_ENV=production
```

### Frontend (.env.local)
```env
VITE_API_URL=https://your-backend-url.com
```

## Local Development

### Backend
```bash
cd backend
npm install
npm run dev
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```

## Production Commands

### Backend
```bash
cd backend
npm install
npm run prod
```

### Frontend
```bash
cd frontend
npm install
npm run build
npm run serve
```

## Platform-Specific Instructions

### Railway
1. Connect GitHub repo
2. Set root directory to `backend/` for backend
3. Set root directory to `frontend/` for frontend
4. Add environment variables in Railway dashboard

### Vercel (Frontend)
1. Connect GitHub repo
2. Set root directory to `frontend/`
3. Set build command: `npm run build`
4. Add environment variables in Vercel dashboard

### Render
1. Connect GitHub repo
2. Set root directory to `backend/` for backend
3. Set root directory to `frontend/` for frontend
4. Add environment variables in Render dashboard

## Troubleshooting

### Common Issues:
1. **CORS errors:** Make sure backend has proper CORS configuration
2. **API not found:** Check VITE_API_URL is set correctly
3. **Build failures:** Ensure all dependencies are installed
4. **Port issues:** Let the platform set the PORT automatically

### Health Check:
- Backend: `https://your-backend-url.com/api/health`
- Frontend: Your deployed frontend URL

## File Organization ✅

All files are now properly organized:
- ✅ Backend files in `backend/` folder
- ✅ Frontend files in `frontend/` folder  
- ✅ C++ utilities moved to backend
- ✅ Environment variables configured
- ✅ Deployment scripts added
