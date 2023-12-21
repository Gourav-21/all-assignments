const express = require('express');
const app = express();
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const cors=require('cors')
require('dotenv').config();

app.use(cors())
app.use(express.json());

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect(process.env.API_KEY);
}

const ADMINSchema = new mongoose.Schema({
  username:String,
  password:String
}) 

const COURSESchema=new mongoose.Schema({
  title:String,
  description:String,
  price:Number,
  imageLink:String,
  published:Boolean
})

const USERSchema=new mongoose.Schema({
  username:String,
  password:String,
  course:[{type: mongoose.Schema.Types.ObjectId,ref:'COURSE'}]
})

const ADMIN=new mongoose.model("ADMIN",ADMINSchema);
const COURSE=new mongoose.model("COURSE",COURSESchema);
const USER=new mongoose.model("USER",USERSchema);


const AdminSecret = "Secret"
const UserSecret = "user"

const generateTokenA=(admin)=>{
  return jwt.sign({ username:admin.username },AdminSecret,{ expiresIn: '1h'})
}

const generateTokenU=(User)=>{
  return jwt.sign({ username:User.username },UserSecret,{ expiresIn: '1h' })
}

const AuthAdmin=(req,res,next)=>{
  if(req.headers.authorization){
    const token=req.headers.authorization.split(' ')[1];
    jwt.verify(token,AdminSecret,(err,user)=>{
      if(err){
        res.sendStatus(403);
      }else{
        req.user=user;
        next();
      }
    })
  }else
  return res.sendStatus(401)
}

const AuthUser=(req,res,next)=>{
  if(req.headers.authorization){
    const token=req.headers.authorization.split(' ')[1];
    jwt.verify(token,UserSecret,(err,user)=>{
      if(err){
        res.sendStatus(403);
      }else{
        req.user=user;
        next();
      }
    })
  }else
  return res.sendStatus(401)
}

let ADMINS = [];
let USERS = [];
let COURSES = [];

// Admin routes
app.post('/admin/signup',async (req, res) => {
  // logic to sign up admin
  const admin=req.body;
  const exist= await ADMIN.findOne({ username: admin.username })
  if(exist){
    res.status(403).json({ message: 'Admin already exists' })
  }else{
    ADMIN.create({
      username:admin.username,
      password:admin.password
    })
    const token=generateTokenA(admin);
    res.json({ message: 'Admin created successfully', token});
  }
});

app.get('/admin/me',AuthAdmin,(req,res)=>{
  res.json(req.user.username);
})

app.post('/admin/login',async (req, res) => {
  // logic to log in admin
  const admin = req.headers;
  const exist= await ADMIN.findOne({ username: admin.username , password: admin.password })
  if(exist){
    const token=generateTokenA(admin);
    res.json({ message: 'Logged in successfully', token});
  }else{
    res.sendStatus(403)
  }
});

app.post('/admin/courses',AuthAdmin,async (req, res) => {
  // logic to create a course
  const course=req.body;
  const Course=new COURSE(course)
  await Course.save();
  res.json({ message: 'Course created successfully', courseId: Course._id })
});

app.put('/admin/courses/:courseId',AuthAdmin,async (req, res) => {
  // logic to edit a course
  const update=req.body;
  const id=req.params.courseId;
  const exist =await COURSE.findByIdAndUpdate(id, update) 
  if(exist){
    res.json({ message: 'Course updated successfully' });
  }else{
    res.status(403).json({ message: 'Course doesnt exists' })
  }
});

app.get('/admin/courses',AuthAdmin, async (req, res) => {
  // logic to get all courses
  const course= await COURSE.find();
  res.json(course);
});

// User routes
app.post('/users/signup',async (req, res) => {
  // logic to sign up user
  const user=req.body;
  const exists= await USER.findOne({ username: user.username })
  if(exists){
    res.status(403).json({ message: "User already exists"});
  }else{
    await USER.create(user)
    const token=generateTokenU(user);
    res.json({ message: 'User created successfully', token })
  }
});

app.post('/users/login', async (req, res) => {
  // logic to log in user
  const user=req.headers;
  const exists= await USER.findOne({ username: user.username , password: user.password })
  if(exists){
    const token=generateTokenU(user);
    res.json({ message: 'Logged in successfully', token })
  }else{
    res.status(403).json({ message: "User doesnt exists"});
  }
});

app.get('/users/courses',AuthUser,async (req, res) => {
  // logic to list all courses
  const course= await COURSE.find();
  res.json(course);
});

app.post('/users/courses/:courseId',AuthUser, async (req, res) => {
  // logic to purchase a course
  const id=req.params.courseId;
  const exist=await COURSE.findById(id)
  if(exist){
    const {username}=req.user;
    const user=await USER.findOne({ username: username})
    user.course.push(id);
    await user.save();
    res.json({ message: 'Course purchased successfully' })
  }else{
    res.status(403).json({ message: 'Course doesnt exists' })
  }
});

app.get('/users/purchasedCourses',AuthUser, async (req, res) => {
  // logic to view purchased courses
  const {username}=req.user;
  const user=await USER.findOne({username}).populate('course')
  res.json(user.course);

});

app.listen(3000, () => {
  console.log('Server is listening on port 3000');
});
