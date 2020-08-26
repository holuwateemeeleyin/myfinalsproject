const mongoose = require('mongoose');
const courseSchema = mongoose.Schema({
    courseTitle:{
        type:String,
        required:true
    },
    courseCode:{
        type:String,
        required:true
    },
    courseUnit:{
        type:Number,
        required:true, 
        min:1,
        max:6
    },
    // questionItems: {
    //     type:JSON,
    //     required:true,
    // },
    ownerId:{
        type:String,
        required:true
    }
}, {timestamps:true})

const Course = mongoose.model('Course', courseSchema)

module.exports = { Course }