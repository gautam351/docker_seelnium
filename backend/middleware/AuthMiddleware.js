const User = require("../db/Model/User");
const {  DecodeToken } = require("../helper/jwthelper");
const { responseUtil } = require("../helper/response");
const jwt=require("jsonwebtoken");

// middleware for auth routes
exports.isAuthUser=async(req,res,next)=>{
    const {token}=req.cookies;
    if(!token)return responseUtil(res,false,[],"Unauthorized Access",200,false);
    const decoded_token=DecodeToken(token);
    const user=await User.findById(decoded_token.id);
    if(!user || !user.is_Verified)return responseUtil(res,false,[],"user does not exists",404,false);
    req.User= user._id ;
    req.email=user.email;
    next();


}