const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors=require('cors')
const adminRouter = require('./routes/admin');
const userRouter = require('./routes/user');
require('dotenv').config();

app.use(cors())
app.use(express.json());

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect(process.env.API_KEY);
}

app.use("/admin",adminRouter);
app.use("/user",userRouter);

app.listen(3000, () => {
  console.log('Server is listening on port 3000');
});
