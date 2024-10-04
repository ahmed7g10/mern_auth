const express=require('express');
const { signup, verifyAccount, logout, login, forgetPassword, ResetPassword, checkAuth } = require('../controllers/auth.conroller');
const verifyToken = require('../middleware/verifyToken');
const AuthRouter=express.Router();
AuthRouter.get('/check-auth',verifyToken,checkAuth)
AuthRouter.post('/signup',signup)
AuthRouter.post('/verify',verifyAccount)
AuthRouter.post('/logout',logout)
AuthRouter.post('/login',login)
AuthRouter.post('/resetpass',forgetPassword)
AuthRouter.patch('/forget-password/:tokenLink',ResetPassword)
module.exports=AuthRouter;
