const express = require('express');
const mongoose = require('mongoose');
const Student = require('../models/student');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const router = express.Router();

router.get('/', async (req, res) => {

  try{
    const students = await Student.find();

    if (!students) {
      res.status(400).json({ message: 'No Students found.' });
    }

    res.status(200).json({
      message: 'Students fetched successfully.',
      students,
    });

  }catch(error){
    res.status(500).json({message: error.message});
  }
});


module.exports = router;
