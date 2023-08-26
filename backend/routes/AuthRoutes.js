const { signUpUser, loginUser, logoutUser, verifyOTP } = require("../controllers/AuthController");
const { getSearchByGPT } = require("../controllers/gptController");
const { getYoutubeVideoID } = require("../controllers/scriptsController");
const { testFunction } = require("../controllers/testController");
const { isAuthUser } = require("../middleware/AuthMiddleware");

const router=require("express").Router();







router.route("/").post(isAuthUser, testFunction);
router.route("/signup").post(signUpUser);
router.route("/otpVerfication").post(verifyOTP);
router.route("/login").post(loginUser);
router.route("/logout").get(isAuthUser,logoutUser);
router.route("/getYoutubeVideo").post(getYoutubeVideoID);
router.route("/searchByGPT").post(getSearchByGPT);

module.exports=router;