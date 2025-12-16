# System Architecture

## Overview

The Sales Intelligence Knowledge Management System is a full-stack web application designed to provide sales teams at Impetus Technologies with actionable insights from their Salesforce data.

## Architecture Diagram

```
┌─────────────────────────────────────────────────────────┐
│                      Frontend Layer                      │
│  ┌───────────────────────────────────────────────────┐  │
│  │           React Application (TypeScript)           │  │
│  │  ┌──────────┐  ┌──────────┐  ┌───────────────┐   │  │
│  │  │  Pages   │  │Components│  │  Visualizations│   │  │
│  │  ├──────────┤  ├──────────┤  ├───────────────┤   │  │
│  │  │ Login    │  │Dashboard │  │  Recharts      │   │  │
│  │  │Dashboard │  │Auth UI   │  │  (Charts)      │   │  │
│  │  └──────────┘  └──────────┘  └───────────────┘   │  │
│  │                                                     │  │
│  │  ┌──────────────────────────────────────────────┐ │  │
│  │  │        React Context (Auth, State)           │ │  │
│  │  └──────────────────────────────────────────────┘ │  │
│  │                                                     │  │
│  │  ┌──────────────────────────────────────────────┐ │  │
│  │  │      API Services (Axios HTTP Client)        │ │  │
│  │  └──────────────────────────────────────────────┘ │  │
│  └───────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────┘
                            │
                        HTTP/REST
                            │
┌─────────────────────────────────────────────────────────┐
│                      Backend Layer                       │
│  ┌───────────────────────────────────────────────────┐  │
│  │         Node.js + Express (TypeScript)            │  │
│  │                                                     │  │
│  │  ┌──────────────────────────────────────────────┐ │  │
│  │  │           Middleware Layer                    │ │  │
│  │  │  - CORS                                       │ │  │
│  │  │  - JWT Authentication                         │ │  │
│  │  │  - Request Parsing                            │ │  │
│  │  └──────────────────────────────────────────────┘ │  │
│  │                                                     │  │
│  │  ┌──────────────────────────────────────────────┐ │  │
│  │  │           Routes Layer                        │ │  │
│  │  │  - /api/auth (Authentication)                 │ │  │
│  │  │  - /api/sales (Sales Data)                    │ │  │
│  │  │  - /api/insights (Analytics)                  │ │  │
│  │  └──────────────────────────────────────────────┘ │  │
│  │                                                     │  │
│  │  ┌──────────────────────────────────────────────┐ │  │
│  │  │         Controllers Layer                     │ │  │
│  │  │  - Auth Controller                            │ │  │
│  │  │  - Sales Controller                           │ │  │
│  │  │  - Insights Controller                        │ │  │
│  │  └──────────────────────────────────────────────┘ │  │
│  │                                                     │  │
│  │  ┌──────────────────────────────────────────────┐ │  │
│  │  │          Database Access Layer                │ │  │
│  │  │  - PostgreSQL Connection Pool                 │ │  │
│  │  │  - Parameterized Queries                      │ │  │
│  │  └──────────────────────────────────────────────┘ │  │
│  └───────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────┘
                            │
                         SQL/TCP
                            │
┌─────────────────────────────────────────────────────────┐
│                    Database Layer                        │
│  ┌───────────────────────────────────────────────────┐  │
│  │              PostgreSQL Database                  │  │
│  │                                                     │  │
│  │  ┌──────────────┐  ┌──────────────┐              │  │
│  │  │    users     │  │ sales_data   │              │  │
│  │  ├──────────────┤  ├──────────────┤              │  │
│  │  │ - id         │  │ - id         │              │  │
│  │  │ - email      │  │ - opportunity│              │  │
│  │  │ - password   │  │ - account    │              │  │
│  │  │ - name       │  │ - stage      │              │  │
│  │  │ - role       │  │ - amount     │              │  │
│  │  └──────────────┘  └──────────────┘              │  │
│  │                                                     │  │
│  │  ┌──────────────────────────────┐                 │  │
│  │  │    sales_insights             │                 │  │
│  │  ├──────────────────────────────┤                 │  │
│  │  │ - id                          │                 │  │
│  │  │ - insight_type                │                 │  │
│  │  │ - title                       │                 │  │
│  │  │ - data (JSONB)                │                 │  │
│  │  └──────────────────────────────┘                 │  │
│  └───────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────┘
```

## Technology Stack

### Frontend
- **React 18**: UI framework
- **TypeScript**: Type-safe JavaScript
- **React Router**: Client-side routing
- **Recharts**: Data visualization
- **Axios**: HTTP client
- **CSS3**: Styling

### Backend
- **Node.js 20**: JavaScript runtime
- **Express 5**: Web framework
- **TypeScript**: Type-safe JavaScript
- **jsonwebtoken**: JWT authentication
- **bcryptjs**: Password hashing
- **pg**: PostgreSQL client

### Database
- **PostgreSQL 14**: Relational database
- **JSONB**: Flexible data storage for insights

### DevOps
- **Docker**: Containerization
- **Docker Compose**: Multi-container orchestration
- **Nginx**: Frontend web server (production)

## Data Flow

### Authentication Flow

1. User submits credentials (email/password)
2. Frontend sends POST to `/api/auth/login`
3. Backend validates credentials against database
4. Backend generates JWT token
5. Token returned to frontend
6. Frontend stores token in localStorage
7. Token included in Authorization header for subsequent requests

### Data Retrieval Flow

1. Frontend component loads
2. Component calls service function (e.g., `salesService.getAllSales()`)
3. Service sends authenticated HTTP request
4. Backend validates JWT token
5. Backend queries PostgreSQL database
6. Results returned to backend controller
7. Controller formats and sends response
8. Frontend receives data and updates state
9. React re-renders components with new data

### Insights Generation Flow

1. Backend receives request for insights
2. Controller executes complex SQL query
3. Database performs aggregations and calculations
4. Results formatted as insights
5. Insights returned to frontend
6. Frontend visualizes insights using Recharts

## Security Architecture

### Authentication & Authorization

- **JWT Tokens**: Stateless authentication
- **Token Expiry**: 24-hour token lifetime
- **Password Hashing**: bcrypt with salt rounds
- **Role-Based Access**: Admin, Manager, Salesman roles

### Security Measures

1. **Input Validation**: Parameterized queries prevent SQL injection
2. **CORS**: Controlled cross-origin access
3. **Environment Variables**: Sensitive data in .env files
4. **HTTPS**: Required in production
5. **Password Policy**: Strong password requirements (to be implemented)

## Database Schema

### Users Table
```sql
- id (UUID, Primary Key)
- email (VARCHAR, UNIQUE, NOT NULL)
- password (VARCHAR, NOT NULL) - bcrypt hashed
- name (VARCHAR, NOT NULL)
- role (VARCHAR, CHECK constraint)
- created_at (TIMESTAMP)
```

### Sales Data Table
```sql
- id (UUID, Primary Key)
- opportunity_id (VARCHAR, UNIQUE)
- account_name (VARCHAR)
- opportunity_name (VARCHAR)
- stage (VARCHAR)
- amount (DECIMAL)
- close_date (DATE)
- probability (INTEGER, 0-100)
- owner_id (UUID, Foreign Key -> users.id)
- created_at (TIMESTAMP)
- updated_at (TIMESTAMP)
```

### Sales Insights Table
```sql
- id (UUID, Primary Key)
- insight_type (VARCHAR, CHECK constraint)
- title (VARCHAR)
- description (TEXT)
- data (JSONB)
- created_at (TIMESTAMP)
```

## API Design

### RESTful Principles

- **Resources**: `/api/sales`, `/api/insights`, `/api/auth`
- **HTTP Methods**: GET (read), POST (create), PUT (update), DELETE (delete)
- **Status Codes**: 200 (OK), 201 (Created), 401 (Unauthorized), 404 (Not Found), 500 (Error)
- **JSON Format**: All requests and responses in JSON

### Endpoint Structure

```
/api/auth/register      - User registration
/api/auth/login         - User login
/api/sales              - CRUD operations on sales data
/api/sales/stats        - Aggregate statistics
/api/insights/trends    - Historical trends
/api/insights/forecast  - Future predictions
```

## State Management

### Frontend State

- **React Context**: Global authentication state
- **Component State**: Local UI state
- **localStorage**: Persistent token storage

### Backend State

- **Stateless API**: No server-side session storage
- **Database**: Single source of truth
- **Connection Pool**: Managed PostgreSQL connections

## Scalability Considerations

### Current Architecture

- Single backend server
- Single database instance
- Suitable for small to medium teams (< 100 users)

### Future Scaling Options

1. **Horizontal Scaling**
   - Multiple backend instances behind load balancer
   - Stateless design enables easy scaling

2. **Database Scaling**
   - Read replicas for analytics queries
   - Connection pooling optimization
   - Query optimization and indexing

3. **Caching Layer**
   - Redis for session management
   - Query result caching
   - API response caching

4. **CDN Integration**
   - Static asset delivery
   - Frontend distribution

## Integration Points

### Current Integrations

- PostgreSQL database (primary data store)

### Future Integrations

1. **Salesforce Integration**
   - OAuth 2.0 authentication
   - REST API for data sync
   - Webhook listeners for real-time updates

2. **Email Notifications**
   - SendGrid or AWS SES
   - Alert notifications
   - Report delivery

3. **Analytics Platforms**
   - Google Analytics
   - Mixpanel
   - Custom event tracking

## Monitoring & Logging

### Current Logging

- Console logging in development
- Express request logging

### Recommended Additions

1. **Application Monitoring**
   - Error tracking (Sentry)
   - Performance monitoring (New Relic)
   - Uptime monitoring

2. **Log Aggregation**
   - Centralized logging (ELK Stack)
   - Log rotation
   - Audit trails

3. **Database Monitoring**
   - Query performance
   - Connection pool metrics
   - Slow query logs

## Deployment Architecture

### Development

- Local development servers
- PostgreSQL on localhost
- Hot reload for both frontend and backend

### Docker Deployment

- Three containers: frontend, backend, database
- Docker Compose orchestration
- Volume persistence for database

### Production (Recommended)

```
Internet -> Load Balancer
              |
         Cloud Provider
              |
    ┌─────────┴─────────┐
    │                   │
  Frontend           Backend API
  (S3/CDN)          (EC2/ECS)
                        │
                   PostgreSQL RDS
```

## Performance Considerations

### Frontend

- Code splitting
- Lazy loading
- Image optimization
- Minimized bundle size

### Backend

- Database connection pooling
- Indexed database queries
- Efficient SQL queries
- Response caching (future)

### Database

- Proper indexing on frequently queried columns
- Query optimization
- Regular VACUUM and ANALYZE

## Testing Strategy

### Unit Tests
- Backend controller logic
- Frontend service functions
- Utility functions

### Integration Tests
- API endpoint testing
- Database query testing
- Authentication flow testing

### End-to-End Tests
- User authentication
- Dashboard loading
- Data visualization

### Manual Testing
- UI/UX testing
- Cross-browser compatibility
- Responsive design

## Disaster Recovery

### Backup Strategy
- Daily database backups
- Point-in-time recovery
- Off-site backup storage

### High Availability
- Database replication
- Multi-AZ deployment
- Automated failover

## Compliance & Privacy

### Data Protection
- Encrypted database connections
- Encrypted data at rest (future)
- GDPR compliance considerations

### Audit Logging
- User activity tracking
- Data access logs
- Change history

## Development Workflow

1. Feature branch from main
2. Local development and testing
3. Code review process
4. Merge to main
5. CI/CD pipeline (future)
6. Deployment to staging
7. Production deployment

## Documentation

- README.md - Project overview and setup
- QUICKSTART.md - Quick start guide
- API_DOCUMENTATION.md - API reference
- ARCHITECTURE.md - This document
- Code comments - Inline documentation

---

This architecture is designed to be maintainable, scalable, and secure while providing a solid foundation for future enhancements and integrations.
