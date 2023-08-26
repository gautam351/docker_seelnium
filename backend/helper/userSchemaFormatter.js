exports.fromatuser=(data)=>{
    const user= {
         name:data.username,
         email:data.email,
         password:data.password,
         role:data.role,        
     }
     if(data.pic)user["pic"]=data.pic;
     return user;
 
 }