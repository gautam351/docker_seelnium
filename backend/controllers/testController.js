exports.testFunction=(req,res)=>{
   return res.status(200).json({
    succes:true,
    data:{
      _id:req.User,
      email:req.email
    },
     
   })
}