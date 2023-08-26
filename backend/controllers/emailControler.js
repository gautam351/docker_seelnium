const Mailjet = require ('node-mailjet');
const { responseUtil } = require('../helper/response');
const { otpEmailBody } = require('../helper/emailConfig');


// function to send otp for 
exports.otpVerificationEmail=async(sendTo,subject,message)=>{
    
  // configure the mailjet usinf Public key and private key
    const mailjet = new Mailjet({
      apiKey: process.env.MJ_APIKEY_PUBLIC || "6895de8765a6f720680b18c3ea654667",
      apiSecret: process.env.MJ_APIKEY_PRIVATE || "fb6f2fd0f1d919a6514b92961975dfa3"
    });

    // create a request and send it 
    const request = mailjet
    .post("send", {'version': 'v3.1'})
    .request(otpEmailBody(sendTo,subject,message))
    
    // if sucess return true 
    request
      .then((result) => {
        return true;
      })
      // if error log the error and reutrn false
      .catch((err) => {
        console.log(err);
       return false ;
        // console.log()
      })
     
 


}