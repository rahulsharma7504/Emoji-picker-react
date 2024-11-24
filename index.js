const dotenv=require('dotenv').config()
const express = require('express');
const cors=require('cors');
const bodyparser = require('body-parser');
const mongoose=require('mongoose');

mongoose.connect(process.env.MONGODB_URI).then(()=>{
  console.log("Connected to MongoDB")
 }).catch((err) => {
  console.log(err.message)
})

const app = express();

app.use(cors());
app.use(bodyparser.json());
const userRoute=require("./Routes/UserRoute");

app.use('/api',userRoute)
 
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
