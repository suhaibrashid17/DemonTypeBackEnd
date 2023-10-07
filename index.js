
const express=require('express');
const app=express()
const mongoose=require('mongoose');
const auth=require('./routes/auth');
require("dotenv").config();
const cors=require('cors');
app.use(cors());
app.use(express.json())

app.use("/api/auth",auth);


const PORT_NUM=8080||process.env.PORT_NUM;
mongoose.connect('mongodb://127.0.0.1:27017/DemonType')
.then(()=>
app.listen(PORT_NUM,()=>{
    console.log('App Running on port '+PORT_NUM+' and connected to db');
})
)
.catch((error)=>{
    console.log(error);
})