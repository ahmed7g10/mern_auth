const jwt=require('jsonwebtoken');
const dotenv=require('dotenv');
dotenv.config()

const genrateTokenAndSetCookie=async(user_id,res)=>{
    const token=jwt.sign({user_id},process.env.JWT_SECRET,
        {
            expiresIn:"7d",
        }
    )
    res.cookie("jwt",token,{
        httpOnly:true,
        secure:false,
        
        maxAge:7*24 *60* 60* 1000
    })
    return token;
}
module.exports=genrateTokenAndSetCookie;