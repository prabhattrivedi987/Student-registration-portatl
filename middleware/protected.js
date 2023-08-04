const express=require('express');

const protected=(req,res,next)=>{
    if(!req.session.loginUser){
        return res.render('notallowed');
    }
    next();
}

module.exports=protected;