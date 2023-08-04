const express=require('express');
const studentRoute=express.Router();
const multer=require('multer');
const Student = require('../../model/students/student.model');
const storage=require('../../Config/Cloudinary');
const protected=require('../../middleware/protected');


//configuring multer
const upload=multer({storage:storage});

//Home page
studentRoute.get('/',(req,res)=>{
    res.render('index');
})

//registration  page
studentRoute.get('/registration',(req,res)=>{
    res.render('registration');
})

//creating student data in database
studentRoute.post('/registration',upload.single('image'),async(req,res)=>{
    const file=req.file.path;
    //console.log(file);
    try {
        const data=await Student.create({
            name:req.body.name,
            fname:req.body.fname,
            email:req.body.email,
            dob:req.body.dob,
            image:file,
            course:req.body.course,
            university:req.body.university,
        })
        res.render('success');
    } catch (error) {
        res.send('Something went wrong');
    }
    
})


//student page
studentRoute.get('/student',protected,async(req,res)=>{
    
    var page=1;
    if(req.query.page){
        page=req.query.page;
    }

    const limit=2;


    const students=await Student.find({})
    .limit(limit*1)
    .skip((page-1)*limit)
    .exec();

    const count=await Student.find({})
         .countDocuments();
         
    //console.log(students);

    res.render('student',{
        students:students,
        totalPages:parseInt(Math.ceil(count/limit)),
        currentPage:parseInt(page),
   
    });
})

//delete student data

studentRoute.get('/delete/:id',async(req,res)=>{
    try {
        const id=req.params.id;
        //console.log(id);
        const deletedData=await Student.findByIdAndDelete(id);
        res.redirect('/student');
    } catch (error) {
        res.send('something went wrong');
    }
})

//get the details of editStudent
studentRoute.get('/update/:id',async(req,res)=>{
   // console.log(req.params.id);
    try {
        const editStudent=await Student.findById(req.params.id);
        res.render('update',{user:editStudent});
        //console.log(editStudent);
    } catch (error) {
        console.log('Error while getting the details of update User',error);
    }
})

//update student data into database

studentRoute.post('/update/:id',async(req,res)=>{
    const userId = req.params.id;
    //console.log(userId);
    const updatedData = {
      name: req.body.name,
      fname:req.body.fname,
      email: req.body.email,
      dob: req.body.dob,
      course: req.body.course,
      university: req.body.university,
};
//console.log(updatedData);
  
    Student.findByIdAndUpdate(userId, updatedData, { new: true })
      .then((updatedUser) => {
        if (!updatedUser) {
          return res.status(404).json({ message: 'User not found' });
        }
  
        res.redirect('/student');
      })
      .catch((error) => {
        console.error('Error updating user:', error);
        res.status(500).json({ message: 'Internal Server Error' });
      });
})


module.exports=studentRoute;