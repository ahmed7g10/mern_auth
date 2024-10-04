const express=require('express');
const mongoose=require('mongoose');
const connectDb = require('./db/connectDB');
const path=require('path')
const AuthRouter = require('./routes/auth.route');
const dotenv=require('dotenv');
const cors=require("cors")
dotenv.config()

const app=express();

const cookieParser=require('cookie-parser')
app.use(cookieParser() )
app.use(express.json())
const PORT=process.env.PORT ||5000;
app.use(cors({origin:"http://localhost:3000",credentials:true}))
app.use('/api/auth',AuthRouter)
if (process.env.NODE_ENV === "production") {
	const __dirname=path.resolve();

	app.use(express.static(path.join(__dirname, "/frontend/dist")));

	app.get("*", (req, res) => {
		res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
	});
}
app.listen(PORT,async()=>{
    await connectDb()
    console.log(
    `server running on port ${PORT}` 
);
})

