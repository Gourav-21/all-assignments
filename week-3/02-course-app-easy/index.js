const express = require('express');
const app = express();

app.use(express.json());

let ADMINS = [];
let USERS = [];
let COURSES = [];

function adminAuth(req,res,next){
  const admin = req.headers;
  const exist=ADMINS.find(A=>A.username===admin.username && A.password===admin.password)
  if(exist){
    next();
  }else{
    res.sendStatus(403);
  }
}

function userAuth(req,res,next){
  const user=req.headers;
  const exists=USERS.find((a)=>a.username==user.username && a.password==user.password)
  if(exists){
    next();
  }else{
    res.sendStatus(403);
  }
}

function ranId(){
  return Math.floor(Math.random()*10000);
}

// Admin routes
app.post('/admin/signup', (req, res) => {
  const admin = req.body;
  const exist=ADMINS.find(A=>A.username===admin.username)
  if(exist){
    res.status(403).json({ message: 'Admin already exists' })
  }else{
    ADMINS.push(admin);
    res.json({ message: 'Admin created successfully' });
  }
});

app.post('/admin/login', adminAuth, (req, res) => {
  // logic to log in admin
    res.json({ message: 'Logged in successfully' });
});

app.post('/admin/courses', adminAuth, (req, res) => {
  // logic to create a course
  const course=req.body;
  const id=ranId();
  course.courseId=id;
  COURSES.push(course);
  res.json({ message: 'Course created successfully', courseId: id })
});

app.put('/admin/courses/:courseId', adminAuth, (req, res) => {
  // logic to edit a course
  const { courseId }=(req.params);
  const course=COURSES.find(a=>a.courseId==courseId);
  if(course){
    Object.assign(course,req.body)
    res.json({ message: 'Course updated successfully' });
  }else{
    res.status(403).json({ message: 'Course doesnt exists' })
  }
});

app.get('/admin/courses', adminAuth, (req, res) => {
  // logic to get all courses
  res.json(COURSES);
});

// User routes
app.post('/users/signup', (req, res) => {
  // logic to sign up user
  const user=req.body;
  const exists=USERS.find((a)=>a.username==user.username)
  if(exists){
    res.status(403).json({ message: 'User already exists' })
  }else{
    USERS.push({...user,course:[]})
    res.json({ message: 'User created successfully' } );
  }
});

app.post('/users/login', userAuth, (req, res) => {
  // logic to log in user
  res.json({ message: 'Logged in successfully' });
});

app.get('/users/courses', userAuth, (req, res) => {
  // logic to list all courses
  res.json(COURSES);
});

app.post('/users/courses/:courseId', userAuth, (req, res) => {
  // logic to purchase a course
  const { courseId }=(req.params);
  const exist=COURSES.find((x)=>x.courseId==courseId);
  if(exist){
    const user=req.headers;
    const index=USERS.findIndex((a)=>a.username==user.username)
    USERS[index].course.push(courseId)
    res.json({ message: 'Course purchased successfully' });
  }else{
    res.status(403).json({ message: 'Course doesnt exists' })
  }
});

app.get('/users/purchasedCourses', userAuth, (req, res) => {
  // logic to view purchased courses
  const user=req.headers;
  const index=USERS.findIndex((a)=>a.username==user.username)
  const course=USERS[index].course;
  res.json(course);
});

app.listen(3000, () => {
  console.log('Server is listening on port 3000');
});
