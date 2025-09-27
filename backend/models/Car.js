const mongoose = require('mongoose');

const carSchema = new mongoose.Schema({
  make: {
    type: String,
    required: [true, 'Please provide car make'],
    trim: true,
    maxlength: [50, 'Make cannot be more than 50 characters']
  },
  model: {
    type: String,
    required: [true, 'Please provide car model'],
    trim: true,
    maxlength: [50, 'Model cannot be more than 50 characters']
  },
  year: {
    type: Number,
    required: [true, 'Please provide manufacturing year'],
    min: [1990, 'Year cannot be earlier than 1990'],
    max: [new Date().getFullYear() + 1, 'Year cannot be in the future']
  },
  licensePlate: {
    type: String,
    required: [true, 'Please provide license plate'],
    unique: true,
    trim: true,
    uppercase: true
  },
  color: {
    type: String,
    required: [true, 'Please provide car color'],
    trim: true,
    maxlength: [30, 'Color cannot be more than 30 characters']
  },
  category: {
    type: String,
    required: [true, 'Please provide car category'],
    enum: [
      'Economy',
      'Compact',
      'Mid-size',
      'Full-size',
      'SUV',
      'Luxury',
      'Sports',
      'Convertible',
      'Van',
      'Truck'
    ]
  },
  transmission: {
    type: String,
    required: [true, 'Please provide transmission type'],
    enum: ['Manual', 'Automatic', 'CVT']
  },
  fuelType: {
    type: String,
    required: [true, 'Please provide fuel type'],
    enum: ['Gasoline', 'Diesel', 'Electric', 'Hybrid', 'CNG']
  },
  seats: {
    type: Number,
    required: [true, 'Please provide number of seats'],
    min: [2, 'Must have at least 2 seats'],
    max: [15, 'Cannot have more than 15 seats']
  },
  mileage: {
    type: Number,
    required: [true, 'Please provide mileage'],
    min: [0, 'Mileage cannot be negative']
  },
  pricePerDay: {
    type: Number,
    required: [true, 'Please provide price per day'],
    min: [0, 'Price cannot be negative']
  },
  features: [{
    type: String,
    trim: true
  }],
  images: [{
    type: String,
    trim: true
  }],
  location: {
    address: {
      type: String,
      required: [true, 'Please provide address'],
      trim: true
    },
    city: {
      type: String,
      required: [true, 'Please provide city'],
      trim: true
    },
    state: {
      type: String,
      required: [true, 'Please provide state'],
      trim: true
    },
    zipCode: {
      type: String,
      required: [true, 'Please provide zip code'],
      trim: true
    }
  },
  status: {
    type: String,
    enum: ['Available', 'Rented', 'Maintenance', 'Out of Service'],
    default: 'Available'
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Car must belong to a user']
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Index for location-based searches
carSchema.index({ 'location.city': 1, 'location.state': 1 });

// Index for category and price searches
carSchema.index({ category: 1, pricePerDay: 1 });

module.exports = mongoose.model('Car', carSchema);
