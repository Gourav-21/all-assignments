const express = require('express');
const { USER, COURSE } = require('../db');
const { AuthUser, generateTokenU } = require('../middleware/Auth');
const router = express.Router();

// User routes
router.post("/signup", async (req, res) => {
  // logic to sign up user
  const user = req.body;
  const exists = await USER.findOne({ username: user.username });
  if (exists) {
    res.status(403).json({ message: "User already exists" });
  } else {
    await USER.create(user);
    const token = generateTokenU(user);
    res.json({ message: "User created successfully", token });
  }
});

router.post("/login", async (req, res) => {
  // logic to log in user
  const user = req.headers;
  const exists = await USER.findOne({
    username: user.username,
    password: user.password,
  });
  if (exists) {
    const token = generateTokenU(user);
    res.json({ message: "Logged in successfully", token });
  } else {
    res.status(403).json({ message: "User doesnt exists" });
  }
});

router.get("/courses", AuthUser, async (req, res) => {
  // logic to list all courses
  const course = await COURSE.find();
  res.json(course);
});

router.post("/courses/:courseId", AuthUser, async (req, res) => {
  // logic to purchase a course
  const id = req.params.courseId;
  const exist = await COURSE.findById(id);
  if (exist) {
    const { username } = req.user;
    const user = await USER.findOne({ username: username });
    user.course.push(id);
    await user.save();
    res.json({ message: "Course purchased successfully" });
  } else {
    res.status(403).json({ message: "Course doesnt exists" });
  }
});

router.get("/purchasedCourses", AuthUser, async (req, res) => {
  // logic to view purchased courses
  const { username } = req.user;
  const user = await USER.findOne({ username }).populate("course");
  res.json(user.course);
});

module.exports = router;
