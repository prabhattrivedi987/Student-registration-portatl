const express=require('express');
const User=require('../../model/users/user.model');
const Student=require('../../model/students/student.model');
const userRoute=express.Router();
const bcrypt=require('bcryptjs');
const session=require('express-session');

//login page
userRoute.get('/login',(req,res)=>{
    res.render('login');
})

//verify login
userRoute.post('/login',async(req,res)=>{
    const {email,password}=req.body;
    
    try {

        //check email exist 
    const userFound=await User.findOne({email});
    if(!userFound){
        res.send('Invalid Login Credentials');
    }
    //check for password
    const isValidPassword=await bcrypt.compare(password,userFound.password);
    if(!isValidPassword){
        res.send('Inavlid Login Credentials');
    }
    
      //save the loginUser details into session
      req.session.loginUser=userFound;  
    res.redirect('/student');

    } catch (error) {
        res.send('Something went wrong');
    }
})

//user logout
userRoute.get('/logout',(req,res)=>{
    req.session.destroy();
    res.redirect('/login');
})


//signup page
userRoute.get('/signup',(req,res)=>{
    res.render('signup');
})

//creating user details in database
userRoute.post('/signup',async(req,res)=>{
    const {username,email,password}=req.body;
    //check if  email exist
    const userFound=await User.find({email});
    if(userFound){
        res.send(`User Already Exists`);
    }
    //gen salt
    const salt=await bcrypt.genSalt(10);
    //hashing password
    const hashPassword=await bcrypt.hash(password,salt);

    try {
        const user=await User.create({
            username,
            email,
            password:hashPassword,
        })
        res.render('login');
    } catch (error) {
        res.send('Something went wrong');
    }
    
})



module.exports=userRoute;