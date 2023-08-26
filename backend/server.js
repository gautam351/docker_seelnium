const createServer = require("./app");
const connectDb = require("./db/config");
const env=require("dotenv");
const app=createServer();

// connecting to mongodb
connectDb();
// configure dotenv
env.config();

// running the app
app.listen(8008,()=>{
    console.log("Running on port 8000");
})
