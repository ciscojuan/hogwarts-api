const express = require('express');
const mongoose = require('mongoose');
const Student = require('../models/student');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const router = express.Router();

router.get('/', async (req, res) => {

  try{
    const students = await Student.find()
    .populate('subjects')
    .populate('schedules')
    .populate('schedules.subject')
    .select('-password');

    if (!students || students.length == 0) {
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

router.get('/:id', async (req,res) => {

  try{

    const student = await Student.findOne({_id : req.params.id});

    if(!student){
      res.status(404).json({
        message: 'Teacher no found!',
        teacher,
      });
    }

  res.status(200).json({
    message: 'Query has ben successfull.',
    student
  })

  }catch(err){
    res.status(500).json(err)
  }
})


router.post('/', async (req, res) =>{

  let student = new Student({
    name: req.body.name,
    lastName : req.body.lastName,
    email : req.body.email,
    password : bcrypt.hashSync(req.body.name),
    phone: req.body.phone,
    schoolYear : req.body.schoolYear,
    subjects : req.body.subjects,
    grades: req.body.grades,
    schedules: req.body.schedules,
    createAt : Date.now(),
    updateAt: Date.now()
  })

try{
  student = await student.save();

  res.status(200).json({
    message : 'Student created Successfully.',
    student
  })
}catch(err){
  res.status(500).json({
    Error: ` ${err}.`
  })
}


})

router.put('/:id', async (req, res) =>{

  if(!mongoose.isValidObjectId(req.params.id)){
    res.status(404).json({message: "The student with the id given does not found."})
  }

  try{
    const student = await Student.findByIdAndUpdate(
      req.params.id,
      {
        name: req.body.name,
        lastName : req.body.lastName,
        email : req.body.email,
        password : bcrypt.hashSync(req.body.name),
        phone: req.body.phone,
        schoolYear : req.body.schoolYear,
        subjects : req.body.subjects,
        grades: req.body.grades,
        schedules: req.body.schedules,
        updateAt: Date.now()
      }, {
        new : true
    });
    
    res.status(201).json({ message : 'The request was successful', student})

  }catch(err){
    res.status(500).json({error: err})
  }
  

})

router.delete('/:id', async (req, res) =>{
  
  if(!mongoose.isValidObjectId(req.params.id)){
    res.status(404).json({message : 'Student no found.'})
  }

  try{

    await Student.findByIdAndRemove();

    res.status(200).json({message : 'Student removed successfuly'})
  }catch(err){
    res.status(500).json({Error : err})
  }
})

module.exports = router;
