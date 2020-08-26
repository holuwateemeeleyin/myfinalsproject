const mongoose = require('mongoose');

const questionSchema = mongoose.Schema({
    type: {
        type: String,
        required:true
    },
    question: {
        type: String,
        required: true
    },
    optionA: {
        type: String,
        required:true
    },
    optionB: {
        type: String,
        required:true
    },
    optionC: {
        type: String,
        required:true
    },
    optionD: {
        type: String,
        required:true
    },
    answer: {
        type: String,
        required: true
    },
    
    dateCreated: {
        type: Date, 
        default: new Date ()
    }
})
// const questionSchema = mongoose.Schema({
//     question:{
//         type:String,
//         required:true,
//         initial: true,
//         default: ''
//     },
//     qtype: { 
//         type: String, 
//         initial: true, 
//         options: 'Boolean, Blank, Default', 
//         default: 'Default' 
//     },
//     true: { 
//         type: Boolean,
//         initial: true, 
//         dependsOn: { qtype: 'Boolean' } 
//     },
//     answer: { 
//         type: String, 
//         initial: true, 
//         required: true, 
//         default: '', 
//         dependsOn: {qtype: ['Blank' , 'Default']} 
//     },
//     optioncount: { 
//         type: String, 
//         options: '0, 2, 3, 4, 5', 
//         default: '0', 
//         initial: true, 
//         dependsOn: {qtype: 'Default'} 
//     },
//     option1: { 
//         type: String, 
//         initial: true, 
//         default: '',  
//         dependsOn:{ optioncount: ['2','3','4','5']}  
//     },
//     option2: { 
//         type: String, 
//         initial: true, 
//         default: '',  
//         dependsOn:{ optioncount: ['2','3','4','5']}  
//     },
//     option3: { 
//         type: String, 
//         initial: true, 
//         default: '',  
//         dependsOn:{ optioncount: ['3','4','5']}  
//     },
//     option4: { type: String, 
//         initial: true, 
//         default: '',  
//         dependsOn:{ optioncount: ['4','5']}  
//     },
//     option5: { 
//         type: String, 
//         initial: true, 
//         default: '',  
//         dependsOn:{ optioncount: ['5']}  
//     },
//     ownerId:{
//         type:String,
//         required:true
//     }
// }, {timestamps:true})

const Question = mongoose.model('Question', questionSchema)

module.exports = { Question }