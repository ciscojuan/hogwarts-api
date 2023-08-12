const express = require('express');
const Teacher = require('../models/teacher');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const teachers = await Teacher.find()
      .populate('subjects')
      .select('-password');

    if (!teachers || teachers.length === 0) {
      res.status(404).json({
        message: 'No teachers found!',
      });
    } else {
      res.status(200).json({
        message: 'Teachers found!',
        teachers,
      });
    }
  } catch (err) {
    req.status(500).send(err);
  }
});

router.post('/', async (req, res) => {
  if (!mongoose.isValidObjectId(req.body.subjects)) {
    return res.status(400).json('One or more subjects id does not exist.');
  }

  let teacher = new Teacher({
    name: req.body.name,
    lastName: req.body.lastName,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 10),
    phone: req.body.phone,
    subjects: req.body.subjects,
    createAt: new Date(),
    uptadeAt: new Date(),
  });

  try {
    teacher = await teacher.save();

    res.status(201).json({
      message: 'Teacher created!',
      teacher,
    });
  } catch (err) {
    req.status(500).send(err);
  }
});

router.put('/:id', async (req, res) => {
  if (!mongoose.isValidObjectId(req.params.id)) {
    return res.status(400).json('Teacher id does not exist.');
  }

  if (!mongoose.isValidObjectId(req.body.subjects)) {
    return res.status(400).json('One or more subjects id does not exist.');
  }

  try {
    const updtaedTeacher = await Teacher.findByIdAndUpdate(
      req.params.id,
      {
        name: req.body.name,
        lastName: req.body.lastName,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 10),
        phone: req.body.phone,
        subjects: req.body.subjects,
        uptadeAt: new Date(),
      },
      { new: true },
    );

    if (!updtaedTeacher) {
      return res.status(404).json({
        message: 'Teacher not found!',
      });
    }

    res.status(200).json({
      message: 'Teacher updated!',
      updtaedTeacher,
    });
  } catch (err) {
    req.status(500).send(err);
  }
});

module.exports = router;
