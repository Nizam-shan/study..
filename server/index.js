require('dotenv').config();
const express = require('express');
const path = require('path')
const app = express();
app.use(require('./router/Auth'))


const mongoose = require('mongoose');
mongoose.set('strictQuery', true);

app.use(express.json());
var cookieParser = require('cookie-parser')
app.use(cookieParser())

app.use(express.static(path.join(__dirname,"./client/build")));

app.get("*", function (_, res) {
  res.sendFile(
    path.join(__dirname, "./client/build/index.html"),
    function (err) {
      res.status(500).send(err);
    }
  );
});
//app.use(express.urlencoded({ extended: true }))
const PORT = 8000;
require('./connection/connection');
const DB = process.env.MONGO_URL;
app.listen(PORT,()=>{
    console.log("Port is running successfully",PORT);
})

app.get("/",(req,res)=>{
    res.json({msg:"this is home page"});
})