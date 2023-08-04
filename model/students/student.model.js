const mongoose=require('mongoose');

//student schema
const studentSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    fname:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
    },
    dob:{
        type:String,
        required:true,
    },
    image:{
        type:String,
    },
    course:{
        type:String,
        required:true,
    },
    university:{
        type:String,
        required:true,
    },
},
{
    timestamps:true,
});

//student Model

const Student=mongoose.model('Student',studentSchema);

module.exports=Student;