const { Builder, Capabilities }=require("selenium-webdriver")
const chrome=require("selenium-webdriver/chrome")

const createDriver=async()=>{
   
          return   new Builder().forBrowser("chrome")
            .setChromeOptions(new chrome.Options().headless().addArguments("--no-sandbox").addArguments("--disable-dev-shm-usage")).build();

}

module.exports=createDriver;