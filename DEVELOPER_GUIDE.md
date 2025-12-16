# Developer Guide

Welcome to the Sales Intelligence Knowledge Management System development team!

## Getting Started as a Developer

### 1. First Time Setup

```bash
# Clone the repository
git clone https://github.com/inbravo/test.git
cd test

# Install all dependencies
npm run install:all

# Set up environment variables
cd backend
cp .env.example .env
# Edit .env with your local database credentials

cd ../frontend
cp .env.example .env
# Default API URL is already set

cd ..
```

### 2. Database Setup

```bash
# Create the database
createdb sales_intelligence

# Run the schema
psql sales_intelligence < backend/database/schema.sql
```

### 3. Start Development

```bash
# Terminal 1 - Backend
npm run dev:backend

# Terminal 2 - Frontend
npm run dev:frontend
```

Access the application:
- Frontend: http://localhost:3000
- Backend: http://localhost:5000/api

## Project Documentation

Before making changes, read these in order:

1. **README.md** - Project overview and setup
2. **ARCHITECTURE.md** - System design and architecture
3. **API_DOCUMENTATION.md** - API endpoints and examples
4. **SECURITY.md** - Security measures and best practices
5. **QUICKSTART.md** - Quick reference guide

## Development Workflow

### Making Changes

1. **Create a feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make your changes**
   - Backend changes go in `backend/src/`
   - Frontend changes go in `frontend/src/`

3. **Test your changes**
   ```bash
   # Backend
   cd backend
   npm run build  # Check TypeScript compilation
   
   # Frontend
   cd frontend
   npm run build  # Check React build
   npm test       # Run tests
   ```

4. **Commit and push**
   ```bash
   git add .
   git commit -m "Description of changes"
   git push origin feature/your-feature-name
   ```

5. **Create a Pull Request**

## Common Development Tasks

### Adding a New API Endpoint

1. **Add route** in `backend/src/routes/`
2. **Create controller** in `backend/src/controllers/`
3. **Update types** in `backend/src/types/` if needed
4. **Document** in `API_DOCUMENTATION.md`

Example:
```typescript
// routes/example.routes.ts
import { Router } from 'express';
import { getExample } from '../controllers/example.controller';
import { authMiddleware } from '../middleware/auth.middleware';
import { apiLimiter } from '../middleware/rateLimiter.middleware';

const router = Router();
router.use(authMiddleware);
router.use(apiLimiter);
router.get('/', getExample);

export default router;
```

### Adding a New Frontend Component

1. **Create component** in `frontend/src/components/` or `frontend/src/pages/`
2. **Add styles** (inline CSS or separate .css file)
3. **Update routing** in `frontend/src/App.tsx` if it's a page
4. **Add types** in `frontend/src/types/` if needed

Example:
```typescript
// components/ExampleComponent.tsx
import React from 'react';

interface ExampleProps {
  title: string;
}

const ExampleComponent: React.FC<ExampleProps> = ({ title }) => {
  return (
    <div>
      <h2>{title}</h2>
    </div>
  );
};

export default ExampleComponent;
```

### Modifying the Database Schema

1. **Update** `backend/database/schema.sql`
2. **Run migration** on your local database
3. **Update types** in `backend/src/types/`
4. **Update controllers** that query the modified tables
5. **Test** all affected endpoints

### Adding New Dependencies

```bash
# Backend
cd backend
npm install package-name
npm install --save-dev @types/package-name  # If types exist

# Frontend
cd frontend
npm install package-name
```

Always check for security vulnerabilities:
```bash
npm audit
```

## Code Style Guidelines

### TypeScript

- Use TypeScript for all new code
- Define proper interfaces/types
- Avoid `any` type - use specific types
- Use async/await instead of promises
- Handle errors properly

### React

- Use functional components with hooks
- Use TypeScript interfaces for props
- Keep components focused and small
- Use meaningful component names

### Backend

- Use async/await for database operations
- Always use parameterized queries
- Validate input data
- Return consistent response formats
- Handle errors gracefully

## Testing

### Backend Tests

```bash
cd backend
npm test
```

### Frontend Tests

```bash
cd frontend
npm test
```

### Manual Testing Checklist

- [ ] Registration works
- [ ] Login works
- [ ] Dashboard loads
- [ ] Charts render correctly
- [ ] API calls succeed
- [ ] Error handling works
- [ ] Rate limiting is enforced
- [ ] Logout works

## Debugging Tips

### Backend Debugging

1. **Check logs** in the terminal running the backend
2. **Use console.log** for quick debugging
3. **Check database** with psql:
   ```bash
   psql sales_intelligence
   SELECT * FROM users;
   ```

### Frontend Debugging

1. **Browser DevTools** - Console tab for errors
2. **Network tab** - Check API calls
3. **React DevTools** - Inspect component state

### Common Issues

**Port already in use:**
```bash
# Kill process on port 5000 (backend)
lsof -ti:5000 | xargs kill -9

# Kill process on port 3000 (frontend)
lsof -ti:3000 | xargs kill -9
```

**Database connection error:**
- Check PostgreSQL is running
- Verify credentials in .env
- Test connection: `psql sales_intelligence`

**TypeScript errors:**
- Clear and rebuild: `rm -rf dist && npm run build`
- Check node_modules: `rm -rf node_modules && npm install`

## Docker Development

### Build and run with Docker

```bash
docker-compose up --build
```

### View logs

```bash
docker-compose logs -f backend
docker-compose logs -f frontend
```

### Rebuild a single service

```bash
docker-compose up --build backend
```

### Clean up

```bash
docker-compose down
docker-compose down -v  # Also remove volumes
```

## Security Checklist for New Features

- [ ] Input validation implemented
- [ ] SQL injection prevented (parameterized queries)
- [ ] Authentication required for protected routes
- [ ] Rate limiting applied
- [ ] Error messages don't leak sensitive info
- [ ] No secrets in code
- [ ] Types properly defined (no `any`)

## Performance Tips

- Use database indexes for frequently queried columns
- Implement pagination for large result sets
- Cache expensive queries when appropriate
- Optimize images and assets
- Use React.memo for expensive components
- Lazy load routes and components

## Useful Commands

```bash
# Root level
npm run install:all        # Install all dependencies
npm run dev:backend        # Start backend dev server
npm run dev:frontend       # Start frontend dev server
npm run build:all          # Build both backend and frontend

# Backend
cd backend
npm run dev                # Start with nodemon
npm run build              # TypeScript compilation
npm start                  # Start production server

# Frontend
cd frontend
npm start                  # Start dev server
npm run build              # Production build
npm test                   # Run tests
```

## Resources

### Technologies

- [TypeScript Documentation](https://www.typescriptlang.org/docs/)
- [React Documentation](https://react.dev/)
- [Express.js Guide](https://expressjs.com/)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)
- [Recharts Documentation](https://recharts.org/)

### Internal Documentation

- README.md - Project overview
- ARCHITECTURE.md - System design
- API_DOCUMENTATION.md - API reference
- SECURITY.md - Security guidelines

## Getting Help

1. Check the documentation first
2. Search closed issues/PRs
3. Ask in the team chat
4. Create a GitHub issue

## Contributing

1. Follow the code style guidelines
2. Write clear commit messages
3. Add tests for new features
4. Update documentation
5. Request code review

---

Happy coding! 🚀
