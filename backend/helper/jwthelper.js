const jwt=require("jsonwebtoken")



exports.createjsonToken=(id)=>{
   const secret_key=process.env.JWT_SECRET;
   return jwt.sign({id:id},secret_key,{expiresIn: "1h"})
}

exports.DecodeToken=(token)=>{
   const secret_key=process.env.JWT_SECRET;
   return jwt.verify(token,secret_key);
}