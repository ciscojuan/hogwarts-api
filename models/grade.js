const mongoose = require('mongoose');
const GradeSchema = mongoose.Schema({
    subject: {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'Subject',
        require: true
    },
    vale : Number,
    createAt : {
        type : Date,
        default : Date.now
    },
    updateAt : {
        type : Date,
        default : Date.now
    }
})