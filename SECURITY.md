# Security Policy

## Overview

This document outlines the security measures implemented in the Sales Intelligence Knowledge Management System.

## Security Features

### 1. Authentication & Authorization

#### JWT-Based Authentication
- Stateless token-based authentication
- 24-hour token expiration
- Token validation on all protected routes
- Role-based access control (Admin, Manager, Salesman)

#### Password Security
- Passwords hashed using bcrypt with 10 salt rounds
- No plain-text password storage
- Secure password comparison

**Security Check:** ✅ JWT secret validation enforces production security

```typescript
// Production environment requires JWT_SECRET to be explicitly set
if (!process.env.JWT_SECRET && process.env.NODE_ENV === 'production') {
  throw new Error('FATAL ERROR: JWT_SECRET is not defined');
}
```

### 2. Rate Limiting

Rate limiting is implemented to prevent abuse and denial-of-service attacks:

#### Authentication Endpoints
- **Limit:** 5 requests per 15 minutes per IP
- **Applies to:** `/api/auth/register`, `/api/auth/login`
- **Purpose:** Prevent brute force attacks

#### General API Endpoints
- **Limit:** 100 requests per 15 minutes per IP
- **Applies to:** `/api/sales/*`
- **Purpose:** Prevent API abuse

#### Insights Endpoints (Expensive Queries)
- **Limit:** 10 requests per 15 minutes per IP
- **Applies to:** `/api/insights/*`
- **Purpose:** Protect database from expensive analytical queries

### 3. SQL Injection Prevention

#### Parameterized Queries
- All database queries use parameterized statements
- No string concatenation for query building
- PostgreSQL `pg` library handles parameter escaping

**Example:**
```typescript
// Safe - parameterized query
await pool.query('SELECT * FROM users WHERE email = $1', [email]);

// NEVER do this - vulnerable to SQL injection
await pool.query(`SELECT * FROM users WHERE email = '${email}'`);
```

### 4. CORS Protection

Cross-Origin Resource Sharing (CORS) is configured to control access:

**Development:**
```typescript
app.use(cors()); // Allow all origins for development
```

**Production (Recommended):**
```typescript
app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true
}));
```

### 5. Environment Variables

Sensitive configuration stored in environment variables:

```bash
JWT_SECRET=<secure-random-string>
DB_PASSWORD=<database-password>
NODE_ENV=production
```

**Security Requirements:**
- Never commit `.env` files to version control
- Use strong, randomly generated secrets in production
- Rotate secrets periodically
- Use environment-specific configurations

### 6. Type Safety

TypeScript provides compile-time type checking:
- Prevents common runtime errors
- Enforces interface contracts
- Improves code reliability

### 7. Input Validation

**Current Implementation:**
- Type checking via TypeScript
- Database constraints (CHECK, NOT NULL, UNIQUE)

**Recommended Additions:**
- Request body validation (e.g., express-validator, joi)
- Input sanitization
- Maximum payload size limits

## Security Recommendations for Production

### 1. HTTPS/TLS
- ✅ **Required:** Use HTTPS in production
- Configure TLS certificates
- Redirect HTTP to HTTPS
- Use secure cookies

### 2. Database Security
- ✅ Use strong database passwords
- ✅ Limit database user privileges
- ⚠️ Enable connection encryption (SSL/TLS)
- ⚠️ Regular backups with encryption
- ⚠️ Database firewall rules

### 3. API Security Enhancements

#### Add Request Validation
```bash
npm install express-validator
```

#### Add Helmet.js for Security Headers
```bash
npm install helmet
```

```typescript
import helmet from 'helmet';
app.use(helmet());
```

#### Add CSRF Protection
For session-based authentication (if needed):
```bash
npm install csurf
```

### 4. Logging & Monitoring

**Recommended:**
- Log authentication attempts
- Monitor rate limit violations
- Track API errors
- Alert on suspicious activity

**Tools:**
- Winston or Pino for logging
- Sentry for error tracking
- Datadog or New Relic for monitoring

### 5. Secrets Management

**Production Best Practices:**
- Use AWS Secrets Manager, Azure Key Vault, or HashiCorp Vault
- Never hardcode secrets
- Rotate secrets regularly
- Use different secrets per environment

### 6. Dependency Security

**Regular Updates:**
```bash
npm audit
npm audit fix
npm outdated
```

**Automated Tools:**
- Dependabot for automated updates
- Snyk for vulnerability scanning
- npm audit in CI/CD pipeline

## Known Security Considerations

### 1. Sample Data (schema.sql)
- ⚠️ Sample user insertion is commented out
- ⚠️ If enabled, uses documented test password
- ✅ Production databases should use registration API only

### 2. Development Mode
- ⚠️ Less strict CORS in development
- ⚠️ Verbose error messages in development
- ✅ Production mode enforces stricter security

### 3. Rate Limiting
- ✅ Implemented for all routes
- ⚠️ IP-based (consider user-based for better granularity)
- ⚠️ Consider Redis for distributed rate limiting

## Security Scanning Results

### CodeQL Analysis
- ✅ No SQL injection vulnerabilities
- ✅ No XSS vulnerabilities
- ✅ Rate limiting implemented
- ✅ Authentication properly enforced
- ⚠️ 2 false positives (router.use calls with middleware)

### Current Status
All critical security issues have been addressed. Remaining alerts are false positives related to middleware application order.

## Reporting Security Issues

If you discover a security vulnerability, please report it by:

1. **DO NOT** create a public GitHub issue
2. Email the security team at: security@impetus.com
3. Include:
   - Description of the vulnerability
   - Steps to reproduce
   - Potential impact
   - Suggested fix (if any)

## Security Audit Checklist

Before deploying to production:

- [ ] JWT_SECRET is set to a strong random value
- [ ] Database passwords are strong and unique
- [ ] HTTPS/TLS is configured
- [ ] CORS is restricted to frontend domain
- [ ] Rate limiting is enabled
- [ ] Logging and monitoring are configured
- [ ] Dependency vulnerabilities are resolved
- [ ] Environment variables are properly secured
- [ ] Database backups are configured
- [ ] Error messages don't leak sensitive information
- [ ] Security headers are configured (Helmet.js)
- [ ] Input validation is comprehensive
- [ ] API documentation is access-controlled

## Compliance

### Data Protection
- User passwords are securely hashed
- No plain-text sensitive data in logs
- Database connections are pooled and managed

### GDPR Considerations (if applicable)
- User data can be exported
- User accounts can be deleted
- Data retention policies should be implemented
- Privacy policy should be provided

## Security Updates

This document should be reviewed and updated:
- After security audits
- When new features are added
- When vulnerabilities are discovered
- At least quarterly

---

Last Updated: December 2024
Version: 1.0.0
