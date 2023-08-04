const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const adminSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    unique: true,
    lowercase: true
  },
  phone: {
    type: Number,
    default: null
  },
  bloodGroup: {
    type: String,
    enum: ['A+', 'B+', 'AB+', 'O+', 'A-', 'B', 'AB', 'O-'],
    default: ''
  },
  address: {
    type: String,
    default: ''
  },
  state: {
    type: String,
    default: '',
    trim: true
  },
  status: {
    type: String,
    default: 'pending'
  },
  dateTime: {
    type: Date, // Use the Date type to store date and time information
    default: null
  }
});

module.exports = mongoose.model('donations1', adminSchema);
