const UserModel = require("../models/User.model");
const bcryptjs=require('bcryptjs');
const jwt=require('jsonwebtoken')
const genrateTokenAndSetCookie = require("../utils/genrateTokenAndSetCookie");
const { sendVerificationEmail, sendWelcomeEmail, sendRestPasswordLink, sendPasswordChangedSuccess } = require("../mailtrap/emails");
const { client } = require("../mailtrap/mailtrap.config");
const dotenv=require('dotenv')
dotenv.config();
const genrateResetPasswordToken = require("../utils/genrateResetPasswordToken");
const signup=async(req,res)=>{
    const {email,password,name}=req.body;
    try {
        if(!email ||!password ||!name){
            res.status(400).json(
                {success:false,message:"all filed are required"}
            )
        }
        const exist=await UserModel.findOne({email});
        if(exist){
            return res.status(400).json({success:false,message:"User Already Exist"})
        }
        const salt=await bcryptjs.genSalt(10);
        const hashpassword=await bcryptjs.hash(password,salt)
        const verificationToken=await Math.floor(100000+Math.random()*90000).toString();
        console.log(verificationToken);
        
        const user=new UserModel({
            email,password:hashpassword,
            name,verificationToken,
            verificationTokenExpiresAt:Date.now()+24*60*60*1000
        });
        await user.save();
        genrateTokenAndSetCookie(user._id,res);
        await sendVerificationEmail(user.email,user.verificationToken)
        return res.status(201).json({message:
            "user Created successfully",
            user:{
              ...user._doc,
              password:undefined
            }
        })
    } catch (error) {
        res.status(400).json(
            {success:false,message:error.message}
        )
    }
}
const verifyAccount=async(req,res)=>{
    const {code}=req.body;
    try {
        const user=await UserModel.findOne({verificationToken:code});
        if(user){
           if(code==user.verificationToken && Date.now()<user.verificationTokenExpiresAt){
            user.verificationToken=undefined;
            user.verificationTokenExpiresAt=undefined;
            user.isVerified=true
            await user.save()
            await sendWelcomeEmail(user.email,user.name)
            return res.status(200).json({user:{
                ...user._doc,password:undefined
            },message:'verifyed successfully'});
           }else{
            return res.status(400).json({message:'expire date'});
           }
        }
        else{
            return res.status(400).json({message:'wrong code or expire date'});
        }
    } catch (error) {
        res.status(400).json(
            {success:false,message:error.message}
        )
    }
}
const login=async(req,res)=>{
    const {password,email}=req.body;

    try {
    if(!email||!password){
        return res.status(400).json(
            {success:false,message:"all filed are required"}
        )
    }
    const user=await UserModel.findOne({email:email})    
    if(!user){
        return res.status(400).json({message:"invalid credentials",success:false});
    }
    const isPassword=await bcryptjs.compare(password,user.password)
    if(!isPassword){
        return res.status(400).json(
            {success:false,message:"invalid credentials"}
        )
    }    
    user.lastLogin=  Date.now()
    await user.save()
    genrateTokenAndSetCookie(user._id,res)
    return res.status(200).json({message:
        "logg ed in successfully",
        user:{
          ...user._doc,
          password:undefined
        }
    })
    } catch (error) {
        return res.status(400).json(
            {success:false,message:error.message}
        ) 
    }
}
const logout=async(req,res)=>{
    res.clearCookie("jwt");
    res.status(200).json({success:true,message:"logged out successfully"})
}
const forgetPassword=async(req,res)=>{
    const {email}=req.body;
    try {
        if(!email){
            return res.status(400).json(
                {success:false,message:"all filed are required"}
            )
        }
        const user=await UserModel.findOne({email:email})    
        if(!user){
            return res.status(400).json({message:"invalid credentials",success:false});
        }
        const passresettoken=await genrateResetPasswordToken(user.email);
        user.resetPasswordToken=passresettoken;
        sendRestPasswordLink(user.email,
            `${process.env.CLIENT_URL}/reset-password/${passresettoken}`);
        await user.save();
        return res.status(200).json({success:true
            ,token:user.resetPasswordToken
            ,message:"reset password link sent to your email check it"});
    } catch (error) {
        return res.status(400).json(
            {success:false,message:error.message}
        ) 
    }
}
    const ResetPassword=async(req,res)=>{
const { tokenLink } = req.params;
        const {password,confirmpassword}=req.body;
        try {            
            if(!tokenLink){
                return res.status(400).json(
                    {success:false,message:"invalid token"}
                )
            }
            const user=await UserModel.findOne({resetPasswordToken:tokenLink})    
            if(!user){
                return res.status(400).json({message:"invalid token",success:false});
            }
            if(!password){
                return res.status(400).json(
                    {success:false,message:"password sholud not be empty"}
                )
            }
            const decoded = jwt.verify(tokenLink, process.env.JWT_SECRET);
            if (Date.now() > decoded.exp * 1000) {  // Check if the token has expired
                return res.status(400).json({ success: false, message: "Token expired" });
            }
    
            if(!password ){
                return res.status(400).json(
                    {success:false,message:"invalid passwords"}
                )
            }
            const salt=await bcryptjs.genSalt(10);
            const hashpassword=await bcryptjs.hash(password,salt);
            user.password=hashpassword;
            user.resetPasswordToken=undefined;
            await user.save();
            sendPasswordChangedSuccess(user.email,user.name);
            return res.status(201).json(
                {success:true,message:"password changed successfully",
                    user
                }
            ) 
        } catch (error) {
             return res.status(400).json(
            {success:false,message:error.message}
        ) 
        }
}
const checkAuth=async(req,res)=>{
    try {
        const user=await UserModel.findById(req.user_id).select('-password')
        if(!user){
            return res.status(400).json({message:"user not found",success:false});
        }
        return res.status(200).json({success:true,user})
    } catch (error) {
        return res.status(400).json(
            {success:false,message:error.message}
        ) 
    }
}
module.exports={signup,login,logout,verifyAccount,forgetPassword,ResetPassword,checkAuth}