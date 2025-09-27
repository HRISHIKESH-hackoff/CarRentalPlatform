const express = require('express');
const router = express.Router();
const Booking = require('../models/Booking');

// GET /bookings - List all bookings
router.get('/', async (req, res) => {
  try {
    const bookings = await Booking.find().populate('carId').populate('userId');
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST /bookings - Create a new booking
router.post('/', async (req, res) => {
  try {
    const booking = new Booking(req.body);
    const savedBooking = await booking.save();
    const populatedBooking = await Booking.findById(savedBooking._id)
      .populate('carId')
      .populate('userId');
    res.status(201).json(populatedBooking);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// GET /bookings/:id - Get booking by ID
router.get('/:id', async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id)
      .populate('carId')
      .populate('userId');
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }
    res.json(booking);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// PUT /bookings/:id - Update booking by ID
router.put('/:id', async (req, res) => {
  try {
    const booking = await Booking.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    ).populate('carId').populate('userId');
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }
    res.json(booking);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE /bookings/:id - Delete booking by ID
router.delete('/:id', async (req, res) => {
  try {
    const booking = await Booking.findByIdAndDelete(req.params.id);
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }
    res.json({ message: 'Booking deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
