
const User=require('../models/User');
const bcrypt=require('bcrypt');
const Register=async(req,res)=>{
    const password=req.body.password;
    try{
        const response1=await User.findOne({email:req.body.email});
        if(response1)
        {
            res.status(404).json({error:"A user with this email already exists."});
        }
        else{
        const salt=await bcrypt.genSalt(10);
        const hashedPassword=await bcrypt.hash(password,salt);
        const response=await User.create({name:req.body.name,email:req.body.email,password:hashedPassword});
        res.status(200).json(response);
        }
    }
    catch(error)
    {
        res.status(500).json({error:"An error occurred while registering"});
    }
}
const Login=async(req,res)=>{
    try{
      const response=await User.findOne({email:req.body.email});
      if(response)
      {
         const isPasswordCorrect=await bcrypt.compare(req.body.password,response.password);
         if(isPasswordCorrect)
         {
            const UserDetails={
                name:response.name,
                email:response.email
            }
            res.status(200).json(UserDetails);
         }
         else{
            res.status(404).json({error:"Incorrect Password"});
         }
      }
      else{
        res.status(404).json({error:"Incorrect Email"});
      }
    }
    catch(error){
        res.status(500).json({error:"There was an error while logging you in"});
    }
}
module.exports={Register,Login};