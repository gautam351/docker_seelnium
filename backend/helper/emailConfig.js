exports.otpEmailBody=(sendTo,subject,message)=>{
    return {
        "Messages":[
            {
              "From": {
                "Email": "gautampraveen351@gmail.com",
                "Name": "Praveen"
              },
              "To": [
                {
                  "Email": sendTo,
                  "Name": "Praveen"
                }
              ],
              "Subject": subject ,
              "TextPart": message,
            //   "HTMLPart": "<h3>Dear passenger 1, welcome to <a href='https://www.mailjet.com/'>Mailjet</a>!</h3><br />May the delivery force be with you!",
              "CustomID": "AppGettingStartedTest"
            }
          ]
    }
  };