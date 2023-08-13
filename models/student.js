'use strict';
const mongoose = require('mongoose');

const StudentSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  phone: {
    type: Number,
    required: true,
  },
  schoolYear: {
    type: String,
    required: true,
    default: '1',
  },
  grades: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Grade'
    }
  ],
  subjects: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Subject', 
    }
  ],
  schedules:[
    {
      type : mongoose.Schema.Types.ObjectId,
      ref: 'Schedule',
    }
  ],
  createAt: {
    type: Date,
    default: Date.now(),
  },
  updateAt: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.rs = mongoose.model('Student', StudentSchema);
