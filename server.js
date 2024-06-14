const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/Bakery', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected...'))
  .catch(err => {
    console.error('MongoDB connection error:', err.message);
    process.exit(1); // Exit process with failure
  });

// User model
const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

const User = mongoose.model('User', userSchema);

// Bill model
const billSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  address: { type: String, required: true },
  deliveryDate: { type: Date, required: true },
  paymentMethod: { type: String, required: true },
  products: [{
    name: { type: String, required: true },
    price: { type: Number, required: true }
  }],
  createdAt: { type: Date, default: Date.now }
});

const Bill = mongoose.model('Bill', billSchema);

// Register route
app.post('/api/register', async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: 'User with this email already exists' });
    }

    const newUser = new User({ username, email, password });
    await newUser.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Login route
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    if (email === 'admin@gov.in' && password === 'admin') {
      // Admin login
      res.json({ message: 'Admin logged in successfully', userType: 'admin' });
    } else {
      // User login
      const user = await User.findOne({ email, password });
      if (user) {
        res.json({ message: 'User logged in successfully', userType: 'customer' });
      } else {
        res.status(400).json({ message: 'Invalid credentials' });
      }
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Save bill route
app.post('/api/save-bill', async (req, res) => {
  const { name, phoneNumber, address, deliveryDate, paymentMethod, products } = req.body;

  try {
    const newBill = new Bill({
      name,
      phoneNumber,
      address,
      deliveryDate,
      paymentMethod,
      products
    });

    await newBill.save();
    res.status(201).json({ message: 'Bill saved successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Start server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
