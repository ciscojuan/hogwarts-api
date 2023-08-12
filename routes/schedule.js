'use strict';
const express = require('express');
const Schedule = require('../models/schedule');
const router = express.Router();

router.get('/', async (req, res) => {
  const schedule = await Schedule.find();
  try {
    res.status(200).json({
      message: 'List of Schedules:',
      schedules: schedule,
    });
  } catch (err) {
    if (!schedule) {
      res.status(400).json({
        message: 'There is no Schedules to show.',
        error: err,
      });
    }
  }
});

module.exports = router;
