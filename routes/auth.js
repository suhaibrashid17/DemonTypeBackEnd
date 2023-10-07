const express=require('express');
const {Register,Login}=require('../controllers/userControllers');
const auth=express.Router();

auth.post("/register",Register);
auth.post("/login",Login);

module.exports=auth;