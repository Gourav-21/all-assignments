const mongoose = require("mongoose");

const ADMINSchema = new mongoose.Schema({
  username: String,
  password: String,
});

const COURSESchema = new mongoose.Schema({
  title: String,
  description: String,
  price: Number,
  imageLink: String,
  published: Boolean,
});

const USERSchema = new mongoose.Schema({
  username: String,
  password: String,
  course: [{ type: mongoose.Schema.Types.ObjectId, ref: "COURSE" }],
});

const USER = new mongoose.model("USER", USERSchema);
const ADMIN = new mongoose.model("ADMIN", ADMINSchema);
const COURSE = new mongoose.model("COURSE", COURSESchema);

module.exports = { USER, ADMIN, COURSE };