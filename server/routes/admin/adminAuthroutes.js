const express = require("express");
const router = new express.Router();
const adminAuthcontroller = require("../../controllers/admin/adminControllers");
const adminUpload = require("../../multerconfig/admin/adminStorageConfig")
const adminauthenticate = require("../../middleware/admin/adminauthenticate");
//multer is used to store image in database


//admin auth routes
router.post("/register",adminUpload.single("admin_profile"),adminAuthcontroller.Register);
router.post("/login",adminAuthcontroller.Login);
router.get("/logout",adminauthenticate,adminAuthcontroller.Logout);

//admin verify
router.get("/adminverify",adminauthenticate,adminAuthcontroller.AdminVerify);

module.exports = router; 
