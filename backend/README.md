# Beauty Booking App - Backend API

Backend server for the Beauty Booking application with MongoDB, Stripe payments, and user authentication.

## Features

- 👤 User registration and authentication
- 📅 Appointment booking system
- 💳 Stripe payment integration
- 📊 Analytics and reporting
- 🗄️ MongoDB database integration

## Environment Variables

Create a `.env` file with:

```
PORT=5000
MONGO_URI=your_mongodb_connection_string
FRONTEND_URL=https://your-frontend-url.com
STRIPE_SECRET=your_stripe_secret_key
JWT_SECRET=your_jwt_secret_key
```

## API Endpoints

### Authentication
- `POST /api/register` - User registration

### Bookings
- `POST /api/bookings` - Create new booking
- `GET /api/analytics/most-booked-hours` - Get booking analytics

### Payments
- `POST /create-checkout-session` - Create Stripe checkout session

## Deployment

This backend can be deployed to:
- Railway
- Render
- Heroku
- Vercel
- Any Node.js hosting service

## Installation

```bash
npm install
npm start
```
