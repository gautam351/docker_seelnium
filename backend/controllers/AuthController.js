const User = require("../db/Model/User");
const { createjsonToken } = require("../helper/jwthelper");
const { responseUtil } = require("../helper/response");
const { fromatuser } = require("../helper/userSchemaFormatter");
const bcrypt=require("bcryptjs");
const { otpVerificationEmail } = require("./emailControler");

// sign up function
exports.signUpUser=async(req,res)=>{
   const {username,email,password,role}=req.body;
  
// check if data is missing 
   if(!username || !email || !password || !role)return responseUtil(res,false,[],"insufficient details",200);

// check if the user already exists or not
   const check=await  User.findOne({email:email});
   if(check && check.is_Verified)return responseUtil(res,false,[],"user already exists",200);
   let userData=check;
   
  if(!check) userData=await User.create(fromatuser(req.body));
   



   // generate otp which is valid for 10 mins
   const otp=Math.ceil((Math.random()*5*10000));
     userData.otp=otp;
     userData.otp_expires=new Date(Date.now()+10*60000);
     
     userData.save({validateBeforeSave:false});
     
   //   now send email
    const emailsent= otpVerificationEmail(email,"OTP FOR BUDDY",otp+ "is your OTP for buddy. This otp is only valid for 10 min");
   
   return responseUtil(res,true,[],"verification code sent to "+email,200,false);  
}


// verify otp and send cookies
exports.verifyOTP=async(req,res)=>{
   const {otp,email}=req.body;
   if(!otp || !email)return responseUtil(res,false,[],"insufficient details",200);
   const userData=await User.findOne({email:email});
   // if otp didn't matched or code expired
   if(otp!==userData.otp || userData.otp_expires<new Date(Date.now())) return responseUtil(res,false,[],"wrong otp or code expired",200);
   
   // make the user verified and set otp to ""
  
      userData.is_Verified=true;
      userData.otp=Math.ceil((Math.random()*5*10000)).toString();
   userData.save({validateBeforeSave:false});
   

   // set cookies and send token
   const token=createjsonToken(userData._id);
   // send response
   return responseUtil(res,true,userData,"user logged in successfully.",201,true,"token",token,new Date(Date.now() + 900000),false,true);

}




// login API
exports.loginUser=async(req,res)=>{
   const {email,password}=req.body;
   if(!email || !password )return responseUtil(res,false,[],"insufficient details",200);

   // check if user is present or not
   const userData=await User.findOne({email:email}).select("+password");
   if(!userData)return  responseUtil(res,false,[],"user does not exists",404);
   
   // if exists match password , generate the token , set cookies and login the user
   const password_match =await bcrypt.compare(password,userData.password);
   if(!password_match)return  responseUtil(res,false,[],"invalid credentials",200);

    // generate otp which is valid for 10 mins
    const otp=Math.ceil((Math.random()*5*10000));
    userData.otp=otp;
    userData.otp_expires=new Date(Date.now()+10*60000);
    
    userData.save({validateBeforeSave:false});
    
  //   now send email
   const emailsent= otpVerificationEmail(email,"OTP FOR BUDDY",otp+ " is your OTP for buddy. This OTP is only valid for 10 min");
  
  return responseUtil(res,true,[],"verification code sent to "+email,200,false);  



}





// logout API
exports.logoutUser=async(req,res,next)=>{
  
   return responseUtil(res,true,[],"logout successfull",200,true,"token",null,new Date(Date.now()),false,true);

}