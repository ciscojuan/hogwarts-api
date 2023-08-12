'use strict'
const mongoose = require('mongoose');
const SubjectScheme = mongoose.Schema({
  name:{
    type: String,
    required:true
  },
  createAT : {
    type: Date,
    default: Date.now(),
  },
  updateAT: {
    type: Date,
    default: Date.now(),
  },
})

module.exports = mongoose.model('Subject', SubjectScheme);
