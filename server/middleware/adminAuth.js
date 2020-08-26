const {Admin} = require('./../models/admin');

let adminAuth = (req,res,next) =>{
    let token = req.cookies.adminAuth;

    Admin.findByToken(token,(err,admin)=>{
        if(err) throw err;
        if(!admin) return res.json({
            error:true
        });
        req.token = token;
        req.admin = admin
        next();
    })
}
module.exports = {adminAuth}