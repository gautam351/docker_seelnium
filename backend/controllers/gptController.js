const {Configuration,OpenAIApi}=require("openai");
const { responseUtil } = require("../helper/response");





// api for sending prompt and getting result from chapGPT
exports.getSearchByGPT=async(req,res,next)=>{

// confirgure chatGPT
const configuration = new Configuration({
    apiKey:process.env.OPEN_AI,
  });

const openai = new OpenAIApi(configuration);


   const {search}=req.body;

// if incomplete details   
   if(!search)return responseUtil(res,false,[],"insufficient details",404,false);
  
   try {
//making api request to chatGPT 
    const response = await openai.createChatCompletion({
        
            "model": "gpt-3.5-turbo",
            "messages": [
                {"role": "user",
                 "content": "You are a helpful assistant."
                }, 
                {"role": "user",
                 "content": search
                }
            ]
          
          
      });

      return responseUtil(res,true,response.data.choices[0].message.content,"successfully retrived data from GPT",200,false);
 
    } catch (error) {

// if any error caught
    return responseUtil(res,false,[],"erro occured",200,false);
   
}
  

}



