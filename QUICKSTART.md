# Quick Start Guide

This guide will help you get the Sales Intelligence Knowledge Management System up and running quickly.

## Prerequisites

- Node.js v14+ and npm
- PostgreSQL v12+
- Git

## Quick Setup (Development)

### 1. Install Dependencies

From the root directory:

```bash
# Install all dependencies for both frontend and backend
npm run install:all
```

Or install individually:

```bash
# Backend
cd backend
npm install

# Frontend
cd ../frontend
npm install
```

### 2. Set Up Environment Variables

**Backend (.env):**

```bash
cd backend
cp .env.example .env
# Edit .env with your database credentials
```

**Frontend (.env):**

```bash
cd frontend
cp .env.example .env
# The default API URL is http://localhost:5000/api
```

### 3. Set Up Database

Create the database and initialize the schema:

```bash
# Create database
createdb sales_intelligence

# Initialize schema
psql sales_intelligence < backend/database/schema.sql
```

### 4. Start Development Servers

**Option 1: Using npm scripts from root**

```bash
# Terminal 1 - Start backend
npm run dev:backend

# Terminal 2 - Start frontend
npm run dev:frontend
```

**Option 2: Start individually**

```bash
# Terminal 1 - Backend
cd backend
npm run dev

# Terminal 2 - Frontend
cd frontend
npm start
```

### 5. Access the Application

- Frontend: http://localhost:3000
- Backend API: http://localhost:5000/api
- Health Check: http://localhost:5000/api/health

## Quick Setup (Docker)

If you have Docker and Docker Compose installed:

```bash
# Build and start all services
docker-compose up --build

# Or run in detached mode
docker-compose up -d --build
```

This will start:
- PostgreSQL database on port 5432
- Backend API on port 5000
- Frontend on port 3000

## Testing the Application

### Test Backend

```bash
cd backend
npm run build  # TypeScript compilation
```

### Test Frontend

```bash
cd frontend
npm run build  # Production build
npm test       # Run tests
```

## Default Credentials

For testing purposes, you can register a new account or use these sample credentials (if loaded from schema.sql):

**Note:** The sample passwords in the schema are placeholders. You'll need to register a new account through the UI.

## Common Issues

### Database Connection Error

Make sure PostgreSQL is running and the credentials in `.env` are correct:

```bash
# Check if PostgreSQL is running
psql -U postgres -c "SELECT version();"
```

### Port Already in Use

If ports 3000 or 5000 are already in use:

**Backend:** Change `PORT` in `backend/.env`

**Frontend:** Set `PORT` environment variable:
```bash
PORT=3001 npm start
```

### Build Errors

Clear caches and reinstall:

```bash
# Backend
cd backend
rm -rf node_modules package-lock.json
npm install

# Frontend
cd frontend
rm -rf node_modules package-lock.json
npm install
```

## Next Steps

1. Register a new user account
2. Explore the dashboard
3. View sales insights and trends
4. Integrate with Salesforce (coming soon)

## Development Tips

- Backend auto-reloads on file changes (nodemon)
- Frontend auto-reloads on file changes (React dev server)
- Check console logs for debugging
- Use the browser DevTools Network tab to inspect API calls

## Production Deployment

### Build for Production

```bash
# Build backend
cd backend
npm run build

# Build frontend
cd frontend
npm run build
```

### Run Production Build

```bash
# Backend
cd backend
npm start

# Frontend - serve the build folder with a static server
cd frontend
npx serve -s build -l 3000
```

Or use Docker:

```bash
docker-compose up -d
```

## Support

For issues or questions:
- Check the main README.md
- Review the code comments
- Contact the development team

---

Happy coding! 🚀
