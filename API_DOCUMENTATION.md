# API Documentation

## Base URL

```
http://localhost:5000/api
```

## Authentication

Most endpoints require JWT authentication. Include the token in the Authorization header:

```
Authorization: Bearer <your-jwt-token>
```

## Endpoints

### Health Check

#### GET /health

Check if the API is running.

**Request:**
```bash
curl http://localhost:5000/api/health
```

**Response:**
```json
{
  "status": "ok",
  "message": "Sales Intelligence Knowledge Management System API",
  "timestamp": "2024-12-16T18:00:00.000Z"
}
```

---

## Authentication Endpoints

### Register

#### POST /auth/register

Create a new user account.

**Request:**
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john.doe@impetus.com",
    "password": "securepassword123",
    "name": "John Doe",
    "role": "salesman"
  }'
```

**Request Body:**
```json
{
  "email": "string (required)",
  "password": "string (required)",
  "name": "string (required)",
  "role": "string (optional, default: 'salesman')"
}
```

**Roles:**
- `salesman` - Regular sales user
- `manager` - Sales manager
- `admin` - System administrator

**Response (201 Created):**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "uuid",
    "email": "john.doe@impetus.com",
    "name": "John Doe",
    "role": "salesman"
  }
}
```

**Error (400 Bad Request):**
```json
{
  "error": "User already exists"
}
```

### Login

#### POST /auth/login

Authenticate and receive a JWT token.

**Request:**
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john.doe@impetus.com",
    "password": "securepassword123"
  }'
```

**Request Body:**
```json
{
  "email": "string (required)",
  "password": "string (required)"
}
```

**Response (200 OK):**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "uuid",
    "email": "john.doe@impetus.com",
    "name": "John Doe",
    "role": "salesman"
  }
}
```

**Error (401 Unauthorized):**
```json
{
  "error": "Invalid credentials"
}
```

---

## Sales Endpoints

All sales endpoints require authentication.

### Get All Sales

#### GET /sales

Retrieve all sales opportunities with optional filters.

**Query Parameters:**
- `stage` (optional) - Filter by stage
- `start_date` (optional) - Filter by close date (YYYY-MM-DD)
- `end_date` (optional) - Filter by close date (YYYY-MM-DD)
- `limit` (optional, default: 100) - Limit results

**Request:**
```bash
curl http://localhost:5000/api/sales?stage=Prospecting&limit=10 \
  -H "Authorization: Bearer <token>"
```

**Response (200 OK):**
```json
{
  "success": true,
  "count": 10,
  "data": [
    {
      "id": "uuid",
      "opportunity_id": "OPP-00001",
      "account_name": "Acme Corp",
      "opportunity_name": "Q4 Enterprise Deal",
      "stage": "Prospecting",
      "amount": 150000.00,
      "close_date": "2024-12-31",
      "probability": 75,
      "owner_id": "uuid",
      "created_at": "2024-01-01T00:00:00.000Z",
      "updated_at": "2024-01-01T00:00:00.000Z"
    }
  ]
}
```

### Get Sales Stats

#### GET /sales/stats

Get aggregate statistics for all sales opportunities.

**Request:**
```bash
curl http://localhost:5000/api/sales/stats \
  -H "Authorization: Bearer <token>"
```

**Response (200 OK):**
```json
{
  "success": true,
  "stats": {
    "total_opportunities": "150",
    "total_value": "5000000.00",
    "avg_deal_size": "33333.33",
    "avg_probability": "65.5",
    "won_count": "45",
    "lost_count": "30"
  }
}
```

### Get Sales by ID

#### GET /sales/:id

Retrieve a specific sales opportunity.

**Request:**
```bash
curl http://localhost:5000/api/sales/{id} \
  -H "Authorization: Bearer <token>"
```

**Response (200 OK):**
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "opportunity_id": "OPP-00001",
    "account_name": "Acme Corp",
    "opportunity_name": "Q4 Enterprise Deal",
    "stage": "Prospecting",
    "amount": 150000.00,
    "close_date": "2024-12-31",
    "probability": 75,
    "owner_id": "uuid",
    "created_at": "2024-01-01T00:00:00.000Z",
    "updated_at": "2024-01-01T00:00:00.000Z"
  }
}
```

**Error (404 Not Found):**
```json
{
  "error": "Sales record not found"
}
```

### Create Sales Record

#### POST /sales

Create a new sales opportunity.

**Request:**
```bash
curl -X POST http://localhost:5000/api/sales \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{
    "opportunity_id": "OPP-99999",
    "account_name": "New Client Corp",
    "opportunity_name": "New Deal",
    "stage": "Prospecting",
    "amount": 75000,
    "close_date": "2024-12-31",
    "probability": 50
  }'
```

**Request Body:**
```json
{
  "opportunity_id": "string (required, unique)",
  "account_name": "string (required)",
  "opportunity_name": "string (required)",
  "stage": "string (required)",
  "amount": "number (required)",
  "close_date": "date (required, YYYY-MM-DD)",
  "probability": "number (required, 0-100)"
}
```

**Response (201 Created):**
```json
{
  "success": true,
  "data": {
    "id": "uuid",
    "opportunity_id": "OPP-99999",
    "account_name": "New Client Corp",
    "opportunity_name": "New Deal",
    "stage": "Prospecting",
    "amount": 75000.00,
    "close_date": "2024-12-31",
    "probability": 50,
    "owner_id": "uuid",
    "created_at": "2024-12-16T18:00:00.000Z",
    "updated_at": "2024-12-16T18:00:00.000Z"
  }
}
```

---

## Insights Endpoints

All insights endpoints require authentication.

### Get All Insights

#### GET /insights

Retrieve stored insights with optional type filter.

**Query Parameters:**
- `type` (optional) - Filter by type: trend, forecast, recommendation, alert
- `limit` (optional, default: 20) - Limit results

**Request:**
```bash
curl http://localhost:5000/api/insights?type=trend&limit=5 \
  -H "Authorization: Bearer <token>"
```

**Response (200 OK):**
```json
{
  "success": true,
  "count": 5,
  "data": [
    {
      "id": "uuid",
      "insight_type": "trend",
      "title": "Sales Trending Up",
      "description": "Sales have increased 15% this quarter",
      "data": {},
      "created_at": "2024-12-16T18:00:00.000Z"
    }
  ]
}
```

### Get Trend Insights

#### GET /insights/trends

Get sales trends over the last 12 months.

**Request:**
```bash
curl http://localhost:5000/api/insights/trends \
  -H "Authorization: Bearer <token>"
```

**Response (200 OK):**
```json
{
  "success": true,
  "insight_type": "trend",
  "data": [
    {
      "month": "2024-01-01T00:00:00.000Z",
      "opportunity_count": "25",
      "total_value": "500000.00",
      "avg_probability": "67.5"
    }
  ]
}
```

### Get Forecast Insights

#### GET /insights/forecast

Get pipeline forecast by stage.

**Request:**
```bash
curl http://localhost:5000/api/insights/forecast \
  -H "Authorization: Bearer <token>"
```

**Response (200 OK):**
```json
{
  "success": true,
  "insight_type": "forecast",
  "data": [
    {
      "stage": "Prospecting",
      "count": "30",
      "total_value": "750000.00",
      "weighted_value": "375000.00"
    },
    {
      "stage": "Qualification",
      "count": "25",
      "total_value": "1000000.00",
      "weighted_value": "650000.00"
    }
  ]
}
```

### Get Top Performers

#### GET /insights/top-performers

Get top performing salespeople.

**Request:**
```bash
curl http://localhost:5000/api/insights/top-performers \
  -H "Authorization: Bearer <token>"
```

**Response (200 OK):**
```json
{
  "success": true,
  "insight_type": "recommendation",
  "data": [
    {
      "name": "John Doe",
      "email": "john.doe@impetus.com",
      "deals_count": "45",
      "total_value": "2250000.00",
      "won_count": "30"
    }
  ]
}
```

---

## Error Responses

### 401 Unauthorized

```json
{
  "error": "No token provided"
}
```

or

```json
{
  "error": "Invalid token"
}
```

### 500 Internal Server Error

```json
{
  "error": "Failed to fetch sales data"
}
```

---

## Rate Limiting

Currently, no rate limiting is implemented. This should be added for production use.

## CORS

CORS is enabled for all origins in development. Configure appropriately for production.

## Data Types

### Sales Stages

Common stages:
- Prospecting
- Qualification
- Proposal
- Negotiation
- Closed Won
- Closed Lost

### User Roles

- `salesman` - Regular sales user
- `manager` - Sales manager with additional permissions
- `admin` - Full system access

### Insight Types

- `trend` - Historical trend analysis
- `forecast` - Future predictions
- `recommendation` - Actionable recommendations
- `alert` - Important notifications

---

## Example Workflows

### Complete Authentication Flow

```bash
# 1. Register
TOKEN=$(curl -s -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"test@impetus.com","password":"test123","name":"Test User"}' \
  | jq -r '.token')

# 2. Use token for authenticated requests
curl http://localhost:5000/api/sales/stats \
  -H "Authorization: Bearer $TOKEN"
```

### Creating and Viewing Sales

```bash
# Create a sales record
curl -X POST http://localhost:5000/api/sales \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "opportunity_id": "TEST-001",
    "account_name": "Test Corp",
    "opportunity_name": "Test Deal",
    "stage": "Prospecting",
    "amount": 50000,
    "close_date": "2024-12-31",
    "probability": 60
  }'

# View all sales
curl http://localhost:5000/api/sales \
  -H "Authorization: Bearer $TOKEN"
```
