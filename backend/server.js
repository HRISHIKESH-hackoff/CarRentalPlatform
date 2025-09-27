const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Placeholder route
app.get('/', (req, res) => {
  res.json({ message: 'Car Rental Platform API' });
});

// TODO: Add route imports here
// app.use('/api/auth', require('./routes/auth'));
// app.use('/api/cars', require('./routes/cars'));
// app.use('/api/bookings', require('./routes/bookings'));

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
