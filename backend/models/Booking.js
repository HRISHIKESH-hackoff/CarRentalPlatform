const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Booking must belong to a user']
  },
  car: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Car',
    required: [true, 'Booking must have a car']
  },
  startDate: {
    type: Date,
    required: [true, 'Please provide start date'],
    validate: {
      validator: function(value) {
        return value > new Date();
      },
      message: 'Start date must be in the future'
    }
  },
  endDate: {
    type: Date,
    required: [true, 'Please provide end date'],
    validate: {
      validator: function(value) {
        return value > this.startDate;
      },
      message: 'End date must be after start date'
    }
  },
  totalDays: {
    type: Number,
    required: true
  },
  pricePerDay: {
    type: Number,
    required: [true, 'Please provide price per day'],
    min: [0, 'Price cannot be negative']
  },
  totalAmount: {
    type: Number,
    required: [true, 'Please provide total amount'],
    min: [0, 'Total amount cannot be negative']
  },
  status: {
    type: String,
    enum: [
      'Pending',
      'Confirmed',
      'Active',
      'Completed',
      'Cancelled',
      'Refunded'
    ],
    default: 'Pending'
  },
  paymentStatus: {
    type: String,
    enum: ['Pending', 'Paid', 'Failed', 'Refunded'],
    default: 'Pending'
  },
  paymentId: {
    type: String,
    trim: true
  },
  pickupLocation: {
    address: {
      type: String,
      required: [true, 'Please provide pickup address'],
      trim: true
    },
    city: {
      type: String,
      required: [true, 'Please provide pickup city'],
      trim: true
    },
    state: {
      type: String,
      required: [true, 'Please provide pickup state'],
      trim: true
    },
    zipCode: {
      type: String,
      required: [true, 'Please provide pickup zip code'],
      trim: true
    }
  },
  dropoffLocation: {
    address: {
      type: String,
      required: [true, 'Please provide dropoff address'],
      trim: true
    },
    city: {
      type: String,
      required: [true, 'Please provide dropoff city'],
      trim: true
    },
    state: {
      type: String,
      required: [true, 'Please provide dropoff state'],
      trim: true
    },
    zipCode: {
      type: String,
      required: [true, 'Please provide dropoff zip code'],
      trim: true
    }
  },
  notes: {
    type: String,
    trim: true,
    maxlength: [500, 'Notes cannot be more than 500 characters']
  },
  driverLicense: {
    number: {
      type: String,
      required: [true, 'Please provide driver license number'],
      trim: true
    },
    expiryDate: {
      type: Date,
      required: [true, 'Please provide license expiry date'],
      validate: {
        validator: function(value) {
          return value > new Date();
        },
        message: 'Driver license must be valid (not expired)'
      }
    }
  },
  cancellationReason: {
    type: String,
    trim: true
  },
  cancellationDate: {
    type: Date
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Pre-save middleware to calculate total days and amount
bookingSchema.pre('save', function(next) {
  if (this.startDate && this.endDate) {
    const timeDiff = this.endDate.getTime() - this.startDate.getTime();
    this.totalDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
    
    if (this.pricePerDay) {
      this.totalAmount = this.totalDays * this.pricePerDay;
    }
  }
  next();
});

// Index for user bookings
bookingSchema.index({ user: 1, createdAt: -1 });

// Index for car bookings
bookingSchema.index({ car: 1, startDate: 1, endDate: 1 });

// Index for date range queries
bookingSchema.index({ startDate: 1, endDate: 1 });

module.exports = mongoose.model('Booking', bookingSchema);
