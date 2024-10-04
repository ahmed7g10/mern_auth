const mongoose=require('mongoose')
const dotenv=require('dotenv')
dotenv.config()


const connectDb=async()=>{
    try {
        const conn=await mongoose.connect(process.env.MONGO_URI).then(()=>{
            console.log('connected to the db');
            
        }).catch((e)=>{
            console.log(e);
            
        })
    } catch (error) {
        console.log(error.message);
        process.exit(1)
    }
}
module.exports=connectDb;