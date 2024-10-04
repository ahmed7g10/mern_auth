const jwt=require('jsonwebtoken')
const dotenv=require('dotenv')
dotenv.config()
const genrateResetPasswordToken=(email)=>{
    const token= jwt.sign({email},process.env.JWT_SECRET,{
        expiresIn:"1d"
    })
    return token
}
module.exports=genrateResetPasswordToken;