'use strict';
const express = require('express');
const Schedule = require('../models/schedule');
const { default: mongoose } = require('mongoose');
const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const schedule = await Schedule.find().populate('subject');
    res.status(200).json({
      message: 'List of Schedules:',
      schedules: schedule,
    });

    if (!schedule) {
      res.status(400).json({
        message: 'There is no Schedules to show.',
        error: err,
      });
    }

  } catch (err) {
    res.status(500).json({Error : err})
  }
});

router.get('/:id', async (req, res) => {
  if (!mongoose.isValidObjectId(req.params.id)) {
    res.status(400).json({ message: 'schedule not found.' })
  }

  try {

    const schedule = await Schedule.findOne({ _id: req.params.id }).populate('subject')

    res.status(200).json({
      message: 'Schedule loaded successful.',
      schedule

    })

  } catch (err) {
    res.status(500).json({ message: err })
  }

})


router.post('/', async (req, res) => {
  
  try{
    const { weekDay, startTime, endTime, subject } = req.body;

  let schedule = new Schedule({
    weekDay,
    startTime,
    endTime,
    subject
  })
  schedule = await schedule.save();

  res.status(201).json({message : 'Schedule created successfull', schedule })
  }catch(err){
    res.status(500).json({Error: err})
  }
  
})

module.exports = router;
