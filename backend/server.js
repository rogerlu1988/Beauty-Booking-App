const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

// Load .env variables FIRST
dotenv.config();

// Initialize Stripe AFTER loading env variables
const stripe = require("stripe")(process.env.STRIPE_SECRET);

// Initialize app
const app = express();
app.use(cors());
app.use(express.json());

// Default route
app.get("/", (req, res) => {
  res.send("API running...");
});

// User Schema
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

// Booking Schema
const bookingSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  service: { type: String, required: true },
  date: { type: Date, required: true },
  time: { type: String, required: true },
  status: { type: String, default: 'pending' },
  createdAt: { type: Date, default: Date.now }
});

const User = mongoose.model('User', userSchema);
const Booking = mongoose.model('Booking', bookingSchema);

// 👤 User Registration
app.post("/api/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    
    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "User already exists" });
    }
    
    // Create new user (in production, hash the password)
    const user = new User({ name, email, password });
    await user.save();
    
    res.status(201).json({ message: "User registered successfully", userId: user._id });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ error: "Registration failed" });
  }
});

// 📅 Create Booking
app.post("/api/bookings", async (req, res) => {
  try {
    const { name, email, service, date, time } = req.body;
    
    const booking = new Booking({ name, email, service, date, time });
    await booking.save();
    
    res.status(201).json({ message: "Booking created successfully", booking });
  } catch (error) {
    console.error("Booking error:", error);
    res.status(500).json({ error: "Booking failed" });
  }
});

// 📊 Get Analytics Data
app.get("/api/analytics/most-booked-hours", async (req, res) => {
  try {
    const bookings = await Booking.find();
    
    // Simple analytics - count bookings by hour
    const hourCounts = {};
    bookings.forEach(booking => {
      const hour = booking.time;
      hourCounts[hour] = (hourCounts[hour] || 0) + 1;
    });
    
    const labels = Object.keys(hourCounts);
    const values = Object.values(hourCounts);
    
    res.json({ labels, values });
  } catch (error) {
    console.error("Analytics error:", error);
    res.status(500).json({ error: "Analytics failed" });
  }
});

// 💳 Stripe Checkout Route
app.post("/create-checkout-session", async (req, res) => {
  try {
    const { serviceName, amount, email } = req.body;

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: serviceName,
            },
            unit_amount: amount * 100, // cents
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${process.env.FRONTEND_URL}/success`,
      cancel_url: `${process.env.FRONTEND_URL}/cancel`,
      customer_email: email,
    });

    res.json({ url: session.url });
  } catch (error) {
    console.error("Stripe error:", error.message);
    res.status(500).json({ error: "Failed to create checkout session" });
  }
});

// Start server after MongoDB connects
mongoose.connect(process.env.MONGO_URI)
  .then(() =>
    app.listen(process.env.PORT || 5000, () =>
      console.log("✅ Server running & MongoDB connected")
    )
  )
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err);
  });
