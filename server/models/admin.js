const mongoose = require('mongoose');
const bcrypt = require ('bcrypt');
const jwt = require ('jsonwebtoken');
const config = require('./../config/config').get(process.env.NODE_ENV);
const SALT_I =10;


const adminSchema = mongoose.Schema({
    adminID:{
        type:String,
        required:true,
        trim:true,
        unique:1
    },
    password:{
        type:String,
        required:true,
        minlength:4
    },
    name:{
        type:String,
        maxlength:100
    },
    lastname:{
        type:String,
        maxlength:100
    },
    role:{
        type:Number,
        default:0
    },
    token:{
        type: String
    }
})

adminSchema.pre('save', function(next){
    var admin = this;
 
    if(admin.isModified('password')){
        bcrypt.genSalt(SALT_I,function(err,salt){
            if(err) return next(err);

            bcrypt.hash(admin.password,salt,function(err,hash){
                if(err) return next(err);
                admin.password = hash;
                next();
            })
        })
    } else {
        next()
}
})

adminSchema.methods.comparePassword = function(adminPassword,cb){
    bcrypt.compare(adminPassword,this.password,function(err,isMatch){
        if(err) return cb(err);
        cb(null,isMatch);
    })
}

adminSchema.methods.generateToken = function(cb){
    var admin = this;
    var token = jwt.sign(admin._id.toHexString(),config.SECRET);

    admin.token = token
    admin.save(function(err,admin){
        if(err) return cb(err);
        cb(null,admin)
    })
}

adminSchema.statics.findByToken = function(token,cb){
    var admin = this;
    jwt.verify(token,config.SECRET,function(err,decode){
        admin.findOne({"_id":decode,"token":token},function(err,admin){
            if(err) return cb(err);
            cb(null,admin)
        })
    })
}
adminSchema.methods.deleteToken = function(token,cb){
    var admin = this;
    
    admin.update({$unset:{token:1}},(err,admin)=>{
        if(err) return cb(err)
        cb(null,admin)
    })
}


const Admin = mongoose.model('Admin', adminSchema)

module.exports = { Admin }