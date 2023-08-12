'use strict';
const express = require('express');
const Subject = require('../models/subject');
const moment = require('moment');
const router = express.Router();

router.get('/', async (req, res) => {
  const subjects = await Subject.find();

  if (!subjects) {
    res.status(400).json({ message: 'No subjects found.' });
  }

  res.status(200).json({
    message: 'Subjects fetched successfully.',
    subjects,
  });
});

router.get('/:id', async (req, res) => {
  const subject = await Subject.findOne({_id :req.params.id});

  if (!subject) {
    res.status(400).json({ message: 'No subjects found.' });
  }

  res.status(200).json({
    message: 'Subjects fetched successfully.',
    subject,
  });
});

router.post('/', async (req, res) => {
  try {
    const date = moment();
    const currentDate = date.format('DD/MM/YYYY');

    const subject = await Subject.create({
      name: req.body.name,
      createAT: currentDate,
      updateAT: currentDate,
    });

    res.status(201).json({
      message: 'Subject created successfully.',
      subject,
    });
  } catch (err) {
    res.status(500).json({
      message: 'Something went wrong.',
      error: err,
    });
  }
});

router.put('/:id', async (req, res) => {
  const subject = await Subject.findById(req.params.id);
  const date = moment();
  const currentDate = date.format('DD/MM/YYYY');

  if (!subject) return res.status(400).json({ message: 'Subject not found.' });

  try {
    const updatedSubject = await Subject.findByIdAndUpdate(
      req.params.id,
      {
        name: req.body.name,
        UpdateAt: currentDate,
      },
      { new: true },
    );

    res.status(200).json({
      message: 'Subject updated successfully.',
      subject: updatedSubject,
    });
  } catch (err) {
    res.status(500).send({
      message: 'Something happened when trying to updated the subject.',
      error: err,
    });
  }

});

router.delete('/:id', async (req, res) => {

  const subject = await Subject.findById(req.params.id);

  if (!subject) return res.status(400).json({ message: 'Subject not found.' });

  try {
    await Subject.findByIdAndRemove(req.params.id);

    res.status(200).json({
      message: 'Subject deleted successfully.',
    });
  } catch (err) {
    res.status(500).send({
      message: 'Something happened when trying to delete the subject.',
      error: err,
    });
  }

})

module.exports = router;
