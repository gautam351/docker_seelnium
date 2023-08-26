exports.responseUtil=(res,success,data,message,statusCode,cookies,cookieName,cookieData,expires,secure,httponly)=>{
  
  
//   response without cookies
    if(!cookies)
  {
      return res.status(statusCode).json({
    success:success,
    data:data,
    message:message  
    }) 
 }

//  response with cookies
 return res.status(statusCode).cookie(cookieName,cookieData,{
    expires:expires,
    secure:secure,
    httpOnly:httponly
 }).json({
    success:success,
    data:data,
    message:message
 })


}

