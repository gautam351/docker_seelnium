const { By } = require("selenium-webdriver");
const createDriver = require("./seleniumConfigDriver");


// function to run selenium script and get the video id from youtube
exports.getYouTubeVideo=async(query)=>{
 
let driver=await createDriver();
const url="https://www.youtube.com/results?search_query="+query.replace(" ","+");
console.log(url);
await driver.get(url);
let temp=await driver.findElements(By.xpath("//a[@id='video-title']"));
await temp[0].click();
// await driver.sleep(1000);
const watch_id=await driver.getCurrentUrl();
console.log(watch_id);
driver.quit();
return watch_id.substring(watch_id.length-11);
}