const express = require('express');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const app = express();
const cors=require('cors')

app.use(cors())
app.use(express.json());
let ADMINS = [];
let USERS = [];
let COURSES = [];

fs.readFile(__dirname+'/admins.json','utf8', (err, data) => {
  if (err) throw err;
  ADMINS=JSON.parse(data)
});
fs.readFile(__dirname+'/users.json','utf8', (err, data) => {
  if (err) throw err;
  USERS=JSON.parse(data)
});
fs.readFile(__dirname+'/courses.json','utf8', (err, data) => {
  if (err) throw err;
  COURSES=JSON.parse(data)
});


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

// Admin routes
app.post('/admin/signup', (req, res) => {
  // logic to sign up admin
  const admin = req.body;
  const exist=ADMINS.find(A=>A.username===admin.username)
  if(exist){
    res.status(403).json({ message: 'Admin already exists' })
  }else{
    ADMINS.push(admin);
    fs.writeFile(__dirname+'/admins.json', JSON.stringify(ADMINS), (err) => {
      if (err) {
        console.error(err);
        return;
      }
      console.log('File written successfully!');
    });
    
    const token=generateTokenA(admin);
    res.json({ message: 'Admin created successfully', token});
  }
});

app.post('/admin/login', (req, res) => {
  // logic to log in admin
  const admin = req.headers;
  const exist=ADMINS.find(A=>A.username===admin.username && A.password===admin.password)
  if(exist){
    const token=generateTokenA(admin);
    res.json({ message: 'Logged in successfully', token});
  }else{
    res.sendStatus(403)
  }
});

app.get('/admin/me',AuthAdmin,(req,res)=>{
  res.json(req.user.username);
})

app.post('/admin/courses', AuthAdmin, (req, res) => {
  // logic to create a course
  const course=req.body;
  COURSES.push({...course,id:COURSES.length+1})
  fs.writeFile(__dirname+'/courses.json', JSON.stringify(COURSES), (err) => {
    if (err) {
      console.error(err);
      return;
    }
    console.log('File written successfully!');
  });
  res.json({ message: 'Course created successfully', courseId: COURSES.length })
});

app.put('/admin/courses/:courseId', AuthAdmin, (req, res) => {
  // logic to edit a course
  const update=req.body;

  const id=req.params.courseId;
  const course=COURSES.find((a)=>a.id==id)
  Object.assign(course,update);
  fs.writeFile(__dirname+'/courses.json', JSON.stringify(COURSES), (err) => {
    if (err) {
      console.error(err);
      return;
    }
    console.log('File written successfully!');
  });
  res.json({ message: 'Course updated successfully' });
});

app.get('/admin/courses/:courseId', AuthAdmin, (req, res) => {
  const id=req.params.courseId;
  const course=COURSES.find((a)=>a.id==id)
  if (course) {
    res.json(course);
  } else {
    res.status(404).json({ message: 'Course not found' });
  }
});

app.get('/admin/courses', AuthAdmin, (req, res) => {
  // logic to get all courses
  res.json(COURSES);
});

// User routes
app.post('/users/signup', (req, res) => {
  // logic to sign up user
  const user=req.body;
  const exists=USERS.find(a=>a.username===user.username)
  if(exists){
    res.status(403).json({ message: "User already exists"});
  }else{
    USERS.push({...user,course:[]});
    fs.writeFile(__dirname+'/users.json', JSON.stringify(USERS), (err) => {
      if (err) {
        console.error(err);
        return;
      }
      console.log('File written successfully!');
    });
    const token=generateTokenU(user);
    res.json({ message: 'User created successfully', token })
  }
});

app.post('/users/login', (req, res) => {
  // logic to log in user
  const user=req.headers;
  const exists=USERS.find(a=>a.username===user.username && a.password===user.password)
  if(exists){
    const token=generateTokenU(user);
    res.json({ message: 'Logged in successfully', token })
  }else{
    res.status(403).json({ message: "User doesnt exists"});
  }
});

app.get('/users/courses', AuthUser, (req, res) => {
  // logic to list all courses
  res.json(COURSES)
});

app.post('/users/courses/:courseId', AuthUser, (req, res) => {
  // logic to purchase a course
  const id=Number(req.params.courseId);
  const exist=COURSES.find(a=>a.id==id)
  if(exist){
    const {username}=req.user;
    const user=USERS.find(a=>a.username===username)
    user.course.push(id);
    fs.writeFile(__dirname+'/users.json', JSON.stringify(USERS), (err) => {
      if (err) {
        console.error(err);
        return;
      }
      console.log('File written successfully!');
    });
    res.json({ message: 'Course purchased successfully' })
  }else{
    res.status(403).json({ message: 'Course doesnt exists' })
  }
});

app.get('/users/purchasedCourses', AuthUser, (req, res) => {
  // logic to view purchased courses
  const {username}=req.user;
  const user=USERS.find(a=>a.username===username)
  const ids=user.course;
  const course=[]
  COURSES.forEach((v)=>{
    if(ids.includes(v.id)){
      course.push(v);
    }
  })
  res.json(course);
});

app.listen(3000, () => {
  console.log('Server is listening on port 3000');
});
