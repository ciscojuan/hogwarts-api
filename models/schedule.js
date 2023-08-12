'use strict';
const mongoose = require('mongoose');

const ScheduleSchema = mongoose.Schema({
  weekDay: {
    type: String,
    enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
    required: true,
  },
  startTime :{
    type: String,
    required: true,
    default: '08:00'
  },
  endTime :{
    type: String,
    required: true,
    default: '17:00'
  },
  subject: {
    type: mongoose.Schema.Types.ObjectId,
    ref : 'Subject',
    required: true,
  }
});

module.exports = mongoose.model('Schedule', ScheduleSchema);
