const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require ('cookie-parser');
const mongoose = require('mongoose')
const config = require('./config/config').get(process.env.NODE_ENV);
const app = express();
const validateAddQuestion = require('./utils/validation/addQuestion')


mongoose.Promise = global.Promise;
mongoose.connect(config.DATABASE)

// const mongoURI = 'mongodb://root:abegunde24@127.0.0.1:27017/impdet'
// const db = mongoose.connect(mongoURI, {
//     useNewUrlParser: true
// })

const mongoURI= 'mongodb://root:abegunde24@127.0.0.1:27017/impdet?authSource=admin'

const { Admin } = require('./models/admin');
const { User } = require('./models/user');
const { Course } = require('./models/course')
const { Question } = require('./models/question')
const { auth } = require('./middleware/auth')
const { adminAuth } = require('./middleware/adminAuth')

app.use(bodyParser.json());
app.use(cookieParser());


// Start Get Admin

app.get('/api/adminAuth',adminAuth,(req,res)=>{
    res.json({
        isAuth:true,
        id:req.admin._id,
        adminID:req.admin.adminID,
        name:req.admin.name,
        lastname:req.admin.lastname
    })
})


app.get('/api/adminLogout',adminAuth,(req,res)=>{
    req.admin.deleteToken(req.token,(err,admin)=>{
        if(err) return res.status(400).send(err);
        res.sendStatus(200)
    })
})


app.get('/api/admins',(req,res)=>{
    Admin.find({},(err,admins)=>{
        if(err) return res.status(400).send(err);
        res.status(200).send(admins)
    })
})

app.get('/api/getStudentDetails',(req,res)=>{
    let id = req.query.id;

    Admin.findById(id,(err,doc)=>{
        if(err) return res.status(400).send(err);
        res.json({
            name: doc.name,
            lastname: doc.lastname
        })
    })
})

app.get('/api/admin_exam_details',(req,res)=>{
    Course.find({ownerId:req.query.admin}).exec((err,docs)=>{
        if(err) return res.status(400).send(err);
        res.send(docs)
    })
})


// finish


// GET //
app.get('/api/auth',auth,(req,res)=>{
    res.json({
        isAuth:true,
        id:req.user._id,
        matric:req.user.matric,
        name:req.user.name,
        middlename: req.user.middlename,
        lastname:req.user.lastname,
        faculty: req.user.faculty,
        department: req.user.department
    })
})

app.get('/api/logout',auth,(req,res)=>{
    req.user.deleteToken(req.token,(err,user)=>{
        if(err) return res.status(400).send(err);
        res.sendStatus(200)
    })
})


app.get('/api/getCourse',(req,res)=>{
    let id = req.query.id;

    Course.findById(id,(err,doc)=>{
        if(err) return res.status(400).send(err);
        res.send(doc);
    })
})


app.get('/api/courses',(req,res)=>{
    //localhost:3001/api/questions?skip=3&limit=2&order=asc
    let skip = parseInt(req.query.skip)
    let limit = parseInt(req.query.limit);
    let order = req.query.order;

    //ORDER = asc || desc
    Course.find().skip(skip).sort({_id:order}).limit(limit).exec((err,doc)=>{
        if(err) return res.status(400).send(err);
        res.send(doc);
    })
})


// app.get('/api/getStudentDetails',(req,res)=>{
//     let id = req.query.id;

//     User.findById(id,(err,doc)=>{
//         if(err) return res.status(400).send(err);
//         res.json({
//             name: doc.name,
//             middlename: doc.middlename,
//             lastname: doc.lastname,
//             faculty: doc.faculty,
//             department: doc.department
//         })
//     })
// })

app.get('/api/users',(req,res)=>{
    User.find({},(err,users)=>{
        if(err) return res.status(400).send(err);
        res.status(200).send(users)
    })
})

// app.get('/api/user_exam_details',(req,res)=>{
//     Question.find({ownerId:req.query.user}).exec((err,docs)=>{
//         if(err) return res.status(400).send(err);
//         res.send(docs)
//     })
// })




//POST Question//

app.post('/api/question', (req,res) =>{
    const { errors, isValid } = validateAddQuestion (req.body);

    if (!isValid) {
        return res.status(400).json(errors);
    }

    const question = new Question ({
        type: req.body.type,
        question: req.body.question,
        optionA: req.body.optionA,
        optionB: req.body.optionB,
        optionC: req.body.optionC,
        optionD: req.body.optionD,
        answer: req.body.answer

    });
    question.save()
        .then(question => res.json(question))
        .catch(err => console.log(err));
})

app.get('/api/getFreeQuiz', (req, res) => {
    Question.aggregate([{ $sample: { size: 15 } }])
        .exec((err, result) => {
            if (err) {
                return console.log(err);
            }
            res.json(result);
        });
});

app.get('/api/getAllQuestions', (req, res) => {
    Question.find()
        .then(questions => res.json(questions))
        .catch(err => console.log(err));
});



// app.get('/api/category/:quizCategory', (req, res) => {
//     Question.find({ type: req.params.questionCategory })
//         .then(questions => res.json(questions))
//         .catch(err => console.log(err));
// });

app.put('/api/updateQuestion/:id', (req, res) => {
    const { errors, isValid } = validateAddQuestion(req.body);

    if (!isValid) {
        return res.status(400).json(errors);
    }

    const question = new Question({
        type: req.body.type,
        question: req.body.question,
        optionA: {
            text: req.body.optionAText,
            answer: req.body.optionAAnswer
        },
        optionB: {
            text: req.body.optionBText,
            answer: req.body.optionBAnswer
        },
        optionC: {
            text: req.body.optionCText,
            answer: req.body.optionCAnswer
        },
        optionD: {
            text: req.body.optionDText,
            answer: req.body.optionDAnswer
        }
    });

    Question.findOneAndDelete({ _id: req.params.id })
        .then((returnedQuestion) => {
            if (!returnedQuestion) {
                errors.noQuestion = 'No Question found';
                return res.status(404).json(errors);
            }
            question.save()
                .then(() => {
                    res.json({ message: 'Question updated successfully!' });
                })
                .catch(err => console.log(err));
        })
        .catch(err => console.log(err));
});

// app.delete('/api/delete_question', (req,res)=>{
//     let id=req.query.id;
//     Question.findByIdAndRemove(id,(err,doc)=>{
//         if(err) return res.status(400).send(err);
//         res.json(true)
//     })
// })

// app.post('/api/question', (req,res)=>{
//     const question = new Question(req.body)
//     question.save((err,doc)=>{
//         if(err) return res.status(400).send(err);
//         res.status(200).json({
//             post:true,
//             QuestionId: doc._id
//         })
//     })
// })

// // Get all questions

// app.get('/api/questions',(req,res)=>{
//     //localhost:3001/api/questions?skip=3&limit=2&order=asc
//     let skip = parseInt(req.query.skip)
//     let limit = parseInt(req.query.limit);
//     let order = req.query.order;

//     //ORDER = asc || desc
//     Question.find().skip(skip).sort({_id:order}).limit(limit).exec((err,doc)=>{
//         if(err) return res.status(400).send(err);
//         res.send(doc);
//     })
// })




// // get one question


// app.get('/api/getQuestion',(req,res)=>{
//     let id = req.query.id;

//     Question.findById(id,(err,doc)=>{
//         if(err) return res.status(400).send(err);
//         res.send(doc);
//     })
// })

// // Update Question
// app.post('/api/question_update',(req,res)=>{
//     Question.findByIdAndUpdate(req.body._id,req.body,{new:true},(err,doc)=>{
//         res.json({
//             success:true,
//             doc
//         })
//     })    
//   })

// //  delete One question 

// app.delete('/api/delete_question', (req,res)=>{
//     let id=req.query.id;
//     Question.findByIdAndRemove(id,(err,doc)=>{
//         if(err) return res.status(400).send(err);
//         res.json(true)
//     })
// })




//POST //
app.post('/api/course',(req,res)=>{
    const course = new Course(req.body)
    course.save((err,doc)=>{
        if(err) return res.status(400).send(err);
        res.status(200).json({
            post:true,
            courseId: doc._id

        })
    })


})

app.post('/api/register',(req,res)=>{
    const user = new User(req.body)

    user.save((err,doc)=>{
        if(err) return res.json({success:false});
        res.status(200).json({
            success:true,
            user:doc
        })
    })
})

app.post('/api/login',(req,res)=>{
    User.findOne({'matric':req.body.matric},(err,user)=>{
        if(!user) return res.json({isAuth:false,message:'Auth failed, matric number not registered'})

        user.comparePassword(req.body.password,(err,isMatch)=>{
            if(!isMatch) return res.json({
                isAuth:false,
                message:'Wrong password'
            });

            user.generateToken((err,user)=>{
                if(err) return res.status(400).send(err);
                res.cookie('auth',user.token).json({
                    isAuth:true,
                    id:user._id,
                    matric:user.matric
                })
            })

        })
    })
})

// Register Admin
app.post('/api/adminRegister',(req,res)=>{
    const admin = new Admin(req.body)

    admin.save((err,doc)=>{
        // if(err) return res.json({success:false});
        if(err) return res.json({send:err});

        res.status(200).json({
            success:true,
            admin:doc
        })
    })
})

app.post('/api/adminLogin',(req,res)=>{
    Admin.findOne({'adminID':req.body.adminID},(err,admin)=>{
        if(!admin) return res.json({isAuth:false,message:'Auth failed, Admin ID not registered'})

        admin.comparePassword(req.body.password,(err,isMatch)=>{
            if(!isMatch) return res.json({
                isAuth:false,
                message:'Wrong password'
            });

            admin.generateToken((err,admin)=>{
                if(err) return res.status(400).send(err);
                res.cookie('adminAuth',admin.token).json({
                    isAuth:true,
                    id:admin._id,
                    adminID:admin.adminID
                })
            })

        })
    })
})

//UPDATE //
app.post('/api/course_update',(req,res)=>{
  Course.findByIdAndUpdate(req.body._id,req.body,{new:true},(err,doc)=>{
      res.json({
          success:true,
          doc
      })
  })    
})

//DELETE
app.delete('/api/delete_course', (req,res)=>{
    let id=req.query.id;
    Course.findByIdAndRemove(id,(err,doc)=>{
        if(err) return res.status(400).send(err);
        res.json(true)
    })
})


const port = process.env.PORT || 3001;
app.listen(port, ()=>{
    console.log(`Server running`);
    
})