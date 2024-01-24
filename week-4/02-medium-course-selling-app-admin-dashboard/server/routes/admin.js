const express = require('express');
const { ADMIN, COURSE } = require('../db');
const { generateTokenA, AuthAdmin } = require('../middleware/Auth');
const router = express.Router();

// Admin routes
router.post("/signup", async (req, res) => {
  // logic to sign up admin
  const admin = req.body;
  const exist = await ADMIN.findOne({ username: admin.username });
  if (exist) {
    res.status(403).json({ message: "Admin already exists" });
  } else {
    ADMIN.create({
      username: admin.username,
      password: admin.password,
    });
    const token = generateTokenA(admin);
    res.json({ message: "Admin created successfully", token });
  }
});

router.get("/me", AuthAdmin, (req, res) => {
  res.json(req.user.username);
});

router.post("/login", async (req, res) => {
  // logic to log in admin
  const admin = req.headers;
  const exist = await ADMIN.findOne({
    username: admin.username,
    password: admin.password,
  });
  if (exist) {
    const token = generateTokenA(admin);
    res.json({ message: "Logged in successfully", token });
  } else {
    res.sendStatus(403);
  }
});

router.post("/courses", AuthAdmin, async (req, res) => {
  // logic to create a course
  const course = req.body;
  const Course = new COURSE(course);
  await Course.save();
  res.json({ message: "Course created successfully", courseId: Course._id });
});

router.get("/courses/:courseId", AuthAdmin, async (req, res) => {
  // logic to edit a course
  const id = req.params.courseId;
  const course = await COURSE.findById(id);
  if (course) {
    res.json(course);
  } else {
    res.status(403).json({ message: "Course doesnt exists" });
  }
});

router.put("/courses/:courseId", AuthAdmin, async (req, res) => {
  // logic to edit a course
  const update = req.body;
  const id = req.params.courseId;
  const exist = await COURSE.findByIdAndUpdate(id, update);
  if (exist) {
    res.json({ message: "Course updated successfully" });
  } else {
    res.status(403).json({ message: "Course doesnt exists" });
  }
});

router.get("/courses", AuthAdmin, async (req, res) => {
  // logic to get all courses
  const course = await COURSE.find();
  res.json(course);
});

module.exports = router;