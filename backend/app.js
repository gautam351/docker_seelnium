const express=require("express")
const cors=require("cors")
const cookieParser =require("cookie-parser")
const bodyParser=require("body-parser")
const authRoutes=require("./routes/AuthRoutes")
const emailRoutes=require("./routes/emailRoutes")
// creating an express instance app
const app=express();

// function to setup server
const createServer=()=>{
  
//setting up cors
app.use(
    cors({
        origin:"http://localhost:3000",
        credentials: true,
       
    })
) 

// to use json format
app.use(express.json())

// setting up cookies parser and body parser
app.use(cookieParser())
app.use(bodyParser.urlencoded({extended:true}))


// Routes
app.use("/api/v1",authRoutes)
// app.use("/api/v1",emailRoutes)

    return app;
}


module.exports=createServer;