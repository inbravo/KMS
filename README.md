# Sales Intelligence Knowledge Management System

A comprehensive web-based sales intelligence solution designed for Impetus Technologies to provide insights from Salesforce data. This system helps salespeople make data-driven decisions through interactive dashboards and analytics.

## 🎯 Features

- **User Authentication**: Secure login and registration for salespeople, managers, and admins
- **Sales Dashboard**: Real-time visualization of sales pipeline and performance metrics
- **Sales Insights**: Trend analysis, forecasting, and performance tracking
- **PostgreSQL Database**: Robust data storage and query capabilities
- **RESTful API**: Clean API architecture for data access
- **Responsive Design**: Mobile-friendly interface

## 🏗️ Architecture

- **Frontend**: React with TypeScript, Recharts for visualizations
- **Backend**: Node.js with Express and TypeScript
- **Database**: PostgreSQL
- **Authentication**: JWT-based authentication

## 📋 Prerequisites

- Node.js (v14 or higher)
- PostgreSQL (v12 or higher)
- npm or yarn

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/inbravo/test.git
cd test
```

### 2. Set Up Backend

```bash
cd backend
npm install
cp .env.example .env
# Edit .env with your database credentials
npm run dev
```

### 3. Set Up Database

Create a PostgreSQL database:

```bash
createdb sales_intelligence
psql sales_intelligence < database/schema.sql
```

### 4. Set Up Frontend

```bash
cd ../frontend
npm install
cp .env.example .env
npm start
```

The application will be available at:
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000

## 📁 Project Structure

```
.
├── backend/              # Node.js/Express backend
│   ├── src/
│   │   ├── config/       # Database configuration
│   │   ├── controllers/  # Request handlers
│   │   ├── middleware/   # Auth middleware
│   │   ├── routes/       # API routes
│   │   ├── types/        # TypeScript types
│   │   └── index.ts      # Entry point
│   ├── database/         # SQL schemas
│   └── package.json
│
├── frontend/             # React frontend
│   ├── src/
│   │   ├── components/   # React components
│   │   ├── contexts/     # React contexts
│   │   ├── pages/        # Page components
│   │   ├── services/     # API services
│   │   ├── types/        # TypeScript types
│   │   └── App.tsx       # Main app
│   └── package.json
│
└── README.md
```

## 🔑 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login

### Sales Data
- `GET /api/sales` - Get all sales opportunities
- `GET /api/sales/stats` - Get sales statistics
- `GET /api/sales/:id` - Get specific opportunity
- `POST /api/sales` - Create new opportunity

### Insights
- `GET /api/insights/trends` - Get sales trends
- `GET /api/insights/forecast` - Get pipeline forecast
- `GET /api/insights/top-performers` - Get top performing salespeople

## 🧪 Testing

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

## 🔒 Security

- JWT-based authentication
- Password hashing with bcrypt
- Environment variable configuration
- CORS protection

## 📊 Database Schema

The system uses three main tables:
- `users` - User accounts and authentication
- `sales_data` - Sales opportunities and pipeline data
- `sales_insights` - Analytical insights and recommendations

## 🛠️ Development

### Backend Development
```bash
cd backend
npm run dev
```

### Frontend Development
```bash
cd frontend
npm start
```

### Build for Production

Backend:
```bash
cd backend
npm run build
npm start
```

Frontend:
```bash
cd frontend
npm run build
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## 📝 License

This project is licensed under the ISC License.

## 🙋‍♂️ Support

For support, contact the Impetus Technologies development team.

## 🔮 Future Enhancements

- Real-time Salesforce integration
- Advanced analytics and ML-powered insights
- Mobile applications
- Email notifications and alerts
- Custom report generation
- Team collaboration features
