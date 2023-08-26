const mongoose=require("mongoose")
const bcrypt=require("bcryptjs")


const User=new mongoose.Schema({

    name:{
        type:String,
        required:true,
        trim:true,
       },
       email: {
         type: String,
         required: true,
       },
       password:{
           type:String,
           required:true,
           select:false
       },
       role:{
           type:String,
           default:"user"
       },
       pic: {
        type: String,
        default:
          "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
      },
       created_on:{
           type:Date,
           default:Date.now()
       },
       is_Verified:{
        type:Boolean,
        default:false,
       },
       otp:{
           type:String,
           default:""
       },
       otp_expires:{
        type:Date,
        default:new Date(Date.now())
       },
       resetPasswordToken:String,
       resetPasswordExpire:Date,
     });

User.pre("save",async function(next){
    if(this.isModified("password"))this.password=await bcrypt.hash(this.password,10);
})


module.exports=mongoose.model("User",User);




