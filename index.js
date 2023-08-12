'use strict'
const express = require('express')
const mongoose = require('mongoose')
const morgan = require('morgan');
const cors = require('cors');

require('dotenv').config();

const app = express()

const port = process.env.PORT || 38600;

const subjectRouter = require('./routes/subject');
const scheduleRouter = require('./routes/schedule');
const teacherRouter = require('./routes/teacher');
//cargar rutas
const api = process.env.API_URL;
//middlewares
app.use(express.json());
app.use(morgan('dev'));
app.use(cors());
app.options('*', cors());



//app.use(`${api}/students`, require('./routes/student'));
//app.use(`${api}/teachers`, require('./routes/teacher'));
app.use(`${api}/subjects`, subjectRouter);
app.use(`${api}/schedules`, scheduleRouter);
app.use(`${api}/teachers`, teacherRouter);
//database
mongoose.connect(process.env.MONGODB_URI)
.then(() => console.log("Connected to the databse succesfully."))
.catch((err) => console.error(err));

//server

app.listen(port, () => {
  console.log(`Server is running in on http://localhost:${port}/`, api )
})
