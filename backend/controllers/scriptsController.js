const { responseUtil } = require("../helper/response");
const { getYouTubeVideo } = require("../seleniumScripts/youtubeSongs")


// controller to find a video id or any top result of youtube based on search query
exports.getYoutubeVideoID=async(req,res,next)=>{
         const {search}=req.body;
         if(!search)return responseUtil(res,false,[],"insufficient details",404,false);
        const id=await getYouTubeVideo(search);
        return responseUtil(res,true,id,"successfully retrived",200,false);
   
   
}


