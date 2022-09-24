const userModel=require("../models/user");
const bcrypt=require("bcrypt");
const dotenv = require('dotenv').config();
const jwt=require("jsonwebtoken");

const signup = async (req,res)=> {

    const {username,email,password}=req.body;
    try{

        console.log("signup is going");

    //check existing user
    const existingUser = await userModel.findOne({
        email:email
    });
 
    if(existingUser){
        return res.status(400).json({success:false,message:"User already exists"});
    }

    const hashedPassword = await bcrypt.hash(password,10);

    const result=await userModel.create({
        email:email,
        password:hashedPassword,
        username:username
    });

    const token = jwt.sign({
        email:result.email,id:result._id
    },process.env.SECRET_KEY);

    res.status(201).json({success:true,user:result,token:token});
    
    }catch(error){
        console.log(error);
        res.status(500).json({success:false,message:"Something went wrong error "+error});
    }
}

const deleteAccount = async(req,res)=>{
    userModel.findByIdAndRemove(req.params.id)
    .then(user =>{
        if(user){
            return res.status(200).json({success:true,message:"User deleted successfully"})
        }else{
            return res.status(404).json({
                success:false, message : "User not found"
            })
        }
    });
}

const signin = async(req,res) => {
    const {email,password}=req.body;
    try{
        const existingUser = await userModel.findOne({email:email}).select("+password");
        if(!existingUser){
            return res.status(404).json({message:"User not found"});
        }

        console.log("current user db password "+JSON.stringify(existingUser)+" user input "+password);
        const matchPassword= await bcrypt.compare(password,existingUser.password);

        if(!matchPassword){
            return res.status(400).json({message:"Invalid Credentials"});
        }
        const token = jwt.sign({
            email:existingUser.email,id:existingUser._id
        },process.env.SECRET_KEY);
    
        res.status(200).json({success:true,user:existingUser,token:token});
        

    }catch(error){
        console.log(error);
        res.status(500).json({success:false,message:"Something went wrong error "+error});
    }
}

const getUserProfile = async (req,res)=>{
    try{
        console.log('current user id '+req.userId);
        console.log('current full request '+req);
        const currentUser = await userModel.findOne({_id:req.userId});
        console.log('getting current user data '+currentUser);
        res.status(200).json({success:true,data : currentUser});
    }catch(error){
        console.log(error);
        res.status(500).json({success:false,message : "Something went wrong"});
    }

}

const updateUserProfile = async (req,res) =>{
    const data=req.body;

    const userProfile={
        updated:Date.now,
    };
    if(data.username){
        userProfile.username=data.username;
    }
    if(data.avatar){
        userProfile.avatar=data.avatar;
    }
    if(data.phoneNumber){
        userProfile.phoneNumber=data.phoneNumber;
    }
    if(data.userSubscribeTopic){
        userProfile.userSubscribeTopic=data.userSubscribeTopic;
    }
    if(data.role){
        userProfile.role=data.role;
    }

    try{
        const updatedProfile=await userModel.findByIdAndUpdate(req.userId,userProfile,{new:true});
        res.status(200).json({success:true,data : updatedProfile});
    }catch(error){
        console.log(error);
        res.status(500).json({success:false,message : "Something went wrong"});
    }
}

module.exports={signin,signup,updateUserProfile,getUserProfile};