let express=require("express");
let router=express.Router();
let my_auth=require("./my_auth");
let{cont_leaderboard,cont_deleteproduct,cont_mailopen,cont_updateproduct1,cont_signup,cont_updateproduct,cont_confirm_purchase1,cont_confirm_purchase,cont_removeproduct,cont_addtocart,cont_buynow,cont_shopping,cont_viewproduct,cont_addproduct,cont_balance,cont_viewprofile,cont_logout,cont_deposit1,cont_deposit,cont_withdraw1,cont_withdraw,cont_change_pass1,cont_admininfo,cont_update,cont_userupdate,cont_userunblock,cont_userblock,cont_filteruser,cont_loginrout,cont_viewuser,cont_userview,cont_register,cont_adduserdata,cont_login,cont_adduser,cont_signup_page,cont_adminprofile,cont_dashboard,cont_otp,cont_changepass}=require("./controller");

router.get("/",cont_login);
router.get("/register",my_auth,cont_register);
router.post("/loginrout",cont_loginrout);
router.get("/signup_page",cont_signup_page);
router.post("/signup",cont_signup);
router.get("/adminprofile",my_auth,cont_adminprofile);
router.get("/viewuser",my_auth,cont_viewuser);
router.get("/user_register",my_auth,cont_adduserdata);
router.get("/dashboard",my_auth,cont_dashboard);
router.get("/userview",my_auth,cont_userview);
router.get("/adduser",my_auth,cont_adduser);
router.get("/opt_genrate",my_auth,cont_otp);
router.post("/change_pass",my_auth,cont_change_pass1);
router.get("/change_pass_page",my_auth,cont_changepass);
router.post("/filteruser",my_auth,cont_filteruser);
router.post("/user_block",my_auth,cont_userblock);
router.post("/user_unblock",my_auth,cont_userunblock);
router.post("/user",my_auth,cont_userupdate);
router.post("/updatehello",my_auth,cont_update);
router.get("/admininfo",my_auth,cont_admininfo);
router.get("/logout",my_auth,cont_logout);
router.get("/withdraw",my_auth,cont_withdraw);
router.get("/deposit",my_auth,cont_deposit);
router.post("/withdraw1",my_auth,cont_withdraw1);
router.post("/deposit1",my_auth,cont_deposit1);
router.post("/viewprofile",my_auth,cont_viewprofile);
router.get("/balance",my_auth,cont_balance);
router.get("/addproduct",my_auth,cont_addproduct);
router.post("/addproduct1",my_auth);
router.get("/viewproduct",my_auth,cont_viewproduct);
router.get("/shopping",my_auth,cont_shopping);
router.get("/buynow",my_auth,cont_buynow);
router.get("/addtocart",my_auth,cont_addtocart);
router.get("/removeproduct",my_auth,cont_removeproduct);
router.post("/confirm_purchase",my_auth,cont_confirm_purchase);
router.post("/confirm_purchase1",my_auth,cont_confirm_purchase1);
router.get("/updateproduct",my_auth,cont_updateproduct);
router.get("/deleteproduct",my_auth,cont_deleteproduct);
router.post("/updateproductform",my_auth,cont_updateproduct1);
router.post("/send-mail",my_auth);
router.get("/mail-open",my_auth,cont_mailopen);
router.get("/leaderboard",my_auth,cont_leaderboard);
router.post("/profile_edit")




module.exports=router;
