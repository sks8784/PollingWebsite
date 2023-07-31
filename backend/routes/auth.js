const express=require('express');
const router=express.Router();

const User=require('../models/user');
const fetchuser =require('../middleware/fetchuser');
const {check,validationResult}=require('express-validator');
const bcrypt=require('bcryptjs');
var jwt=require('jsonwebtoken');

const dotenv=require('dotenv');
dotenv.config();

const JWT_KEY=process.env.JWT_KEY;

router.post('/login',[
    check('email','Enter a valid email').isEmail(),
    check('password','Password length must be greater than 5').isLength({min:5})
],async(req,res)=>{
    const error=validationResult(req);
    if(!error.isEmpty()){
        return res.status(400).json({
            error:error.array()
        })
    }
    const {email,password}=req.body;
    try{
        let user=await User.findOne({email});
        if(!user){
            return res.status(400).json({
                error:"User does not exist"
            })
        }
        const passwordCompare=await bcrypt.compare(password,user.password);
        if(!passwordCompare){
            return res.status(400).json({
                error:"Invalid details"
            });
        }
        const data={
            user:{
                id:user.id
            }
        }
        const authtoken=jwt.sign(data,JWT_KEY);
        const success=true;
        return res.json({success,authtoken})

    }catch(error){
        return res.status(400).json({
            error:"Error while logging in"
        })
    }
})


router.post('/createUser',[
    check('name','Length of name must be greater than 2').isLength({min:3}),
    check('email','Enter a valid email').isEmail(),
    check('password','Password length must be greater than 5').isLength({min:5})
],async(req,res)=>{

    const error=validationResult(req);
    if(!error.isEmpty()){
    return res.status(400).json({
        error:error.array()
    });
    }

    let user=await User.findOne({email:req.body.email})
    if(user){
        return res.status(400).json({error:"Email already exists"});
    }
    const salt=await bcrypt.genSaltSync(10);
    const secPass=await bcrypt.hash(req.body.password,salt);
    
   
    User.create({
        name:req.body.name,
        username:req.body.username,
        email:req.body.email,
        password:secPass
    }).then(User=>res.json(User))
    .catch(err=>{console.log(err)})

})


router.get('/getuser',fetchuser,async(req,res)=>{
    try{
        // console.log(req.user);
        
       
        const user1=await User.findById(req.user).select("-password");
        return res.send(user1);
    }catch(error){
        return res.status(400).json({
            error:error
        })
    }
})

module.exports=router;