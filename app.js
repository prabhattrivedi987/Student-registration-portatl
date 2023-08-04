require('dotenv').config();
require('./Config/dbConnect')
const express=require('express');
const path=require('path');
// const mongoose=require('mongoose');
const session=require('express-session');
const MongoStore=require('connect-mongo');

const studentRoute = require('./Route/Students/student.route');
const userRoute = require('./Route/Users/user.route');


const app=express();

//session configuration
app.use(session({
    secret:process.env.SESSION_KEY,
    resave:true,
    saveUninitialized:true,
    cookie:{maxAge:600000},
    store:new MongoStore({
        mongoUrl:process.env.MONGO_URL,
        ttl:24*60*60 //1 day
    })
}))

//view engine
app.set('view engine','ejs');
 app.set('views',path.resolve(path.join(__dirname,'views')));

//middleware
app.use(express.json());
app.use(express.static('public'));
app.use(express.urlencoded({extended:false}));


//Routes

//student Routes
app.use(studentRoute);

//user Routes
app.use(userRoute);

const  port=process.env.PORT||5000;
app.listen(port,()=>{
    console.log(`server is running on ${port}`);
})