let {   ser_view_user_send_mail, ser_user_mail, ser_buynow1,ser_productdelete,ser_productedit,ser_producteditsuccess,ser_activity,ser_updateproductview,ser_addproductview,ser_adduserview,ser_signup,ser_leaderboard,ser_mailopen,ser_deleteproduct,ser_updateproduct,ser_confirm_purchase1,ser_confirm_purchase,ser_dashboard,ser_removeproduct,ser_buynow,ser_addtocart,ser_shopping,ser_viewproduct,ser_balance,ser_viewprofile,ser_deposit,ser_withdraw,ser_withdraw1,ser_deposit1,ser_logout,ser_changepass,ser_admininfo,ser_user,ser_update,ser_filter,ser_adduserdata,ser_userview,ser_login,ser_blockuser,ser_unblockuser}=require("./service");

exports.cont_register=(req,res)=>

    {
        res.render("register");
    }
    
exports.cont_change_pass1=(req,res)=>

    {
        ser_changepass(req,res);
    }
    exports.cont_login=(req,res)=>
        {
            
            res.render("login");
        }
        
    exports.cont_signup_page=(req,res)=>
        {   
            res.render("signup");
           
        }
        
    exports.cont_signup=(req,res)=>
        {   
            ser_signup(req,res);
        }
        
    exports.cont_dash=(req,res)=>
        {
            res.render("dashboard");
        }
        
    exports.cont_adminprofile=(req,res)=>
        {
            ser_admininfo(req,res);
            res.render("adminprofile");
        }
        
    exports.cont_dashboard=(req,res)=>
        {
            ser_dashboard(req,res);
           
        }
               
    // exports.cont_userview=(req,res)=>
    //     {
    //         res.render("viewuser");
    //     }
              
    exports.cont_otp=(req,res)=>
        {
            res.render("success");
        }
        exports.cont_adduser=(req,res)=>
            {
              ser_adduserview(req,res);
            }
        exports.cont_changepass=(req,res)=>
            {
               
                res.render("changepass");
            }
           
                exports.cont_adduserdata=(req,res)=>
                    {
                        
                        ser_adduserdata(req,res);
                        
                    }
                    exports.cont_userview=(req,res)=>
                        {
                            ser_userview(req,res);
                            //res.render("viewuser");
                        }
                        exports.cont_viewuser=(req,res)=>
                            {
                              
                            }
                           
                        exports.cont_loginrout=(req,res)=>
                            {
                              ser_login(req,res);
                             // res.render("dashboard");
                            }
                           
                            
                        exports.cont_filteruser=(req,res)=>
                            {
                              ser_filter(req,res);
                            }
                           
                               
                        exports.cont_userblock=(req,res)=>
                            {
                              ser_blockuser(req,res);
                            }
                            exports.cont_userunblock=(req,res)=>
                                {
                                  ser_unblockuser(req,res);
                                }
                                exports.cont_userupdate=(req,res)=>
                                    {
                                    // res.render("update");
                                     ser_user(req,res);
                                     
                                    }
                                   
                                exports.cont_update=(req,res)=>
                                    {
                                        ser_update(req,res);
                                    }
                                   
                                    
                                exports.cont_admininfo=(req,res)=>
                                    {
                                        ser_admininfo(req,res);
                                       // res.render("adminprofile");
                                    }
                                   
                                     
                                exports.cont_logout=(req,res)=>
                                    {
                                        ser_logout(req,res);
                                       // res.render("adminprofile");
                                    }
                                    exports.cont_withdraw=(req,res)=>
                                        {
                        
                                           ser_withdraw1(req,res);
                                        //    res.render("withdraw");
                                        }
                                        exports.cont_deposit=(req,res)=>
                                            {
                                                ser_deposit1(req,res);

                                               // res.render("adminprofile");
                                            }
                                               
                                    exports.cont_withdraw1=(req,res)=>
                                        {
                                            ser_withdraw(req,res);
                                           
                                        }
                                        exports.cont_deposit1=(req,res)=>
                                            {
                                                ser_deposit(req,res);
                                            }
                                               
                                        exports.cont_viewprofile=(req,res)=>
                                            {
                                                ser_viewprofile(req,res);
                                            }
                                               
                                            exports.cont_balance=(req,res)=>
                                                {
                                                    ser_balance(req,res);
                                                }
                                                   
                                                
                                            exports.cont_addproduct= (req,res)=>
                                                {
                                                    ser_addproductview(req,res);
                                                    
                                                }
                                                   
                                                
                                                exports.cont_viewproduct=(req,res)=>
                                                    {
                                                        ser_viewproduct(req,res);
                                                        //res.render("viewproduct");
                                                    }
                                                       
                                                    
                                                exports.cont_shopping=(req,res)=>
                                                    {
                                                        ser_shopping(req,res);
                                                        //res.render("viewproduct");
                                                    }
                                                       
                                                    
                                                    exports.cont_buynow=(req,res)=>
                                                        {
                                                            ser_buynow(req,res);
                                                            //res.render("viewproduct");
                                                        }
                                                        

                                                    exports.cont_buynow1=(req,res)=>
                                                        {
                                                            ser_buynow1(req,res);
                                                            //res.render("viewproduct");
                                                        }
                                                           
                                                        
                                                    
                                                        exports.cont_addtocart=(req,res)=>
                                                            {
                                                                ser_addtocart(req,res);
                                                                //res.render("viewproduct");
                                                            }
                                                               
                                                            
                                                            exports.cont_removeproduct=(req,res)=>
                                                                {
                                                                    ser_removeproduct(req,res);
                                                                    //res.render("viewproduct");
                                                                }
                                                                  
                                                            exports.cont_confirm_purchase=(req,res)=>
                                                                {
                                                                    ser_confirm_purchase(req,res);
                                                                    //res.render("viewproduct");
                                                                }
                                                                   
                                                                  
                                                            exports.cont_confirm_purchase1=(req,res)=>
                                                                {
                                                                    ser_confirm_purchase1(req,res);
                                                                    //res.render("viewproduct");
                                                                }
                                                                   
                                                 
                                                                exports.cont_updateproduct=(req,res)=>
                                                                    {   
                                                                        ser_updateproductview(req,res);
                                                                    
                                                                        //res.render("viewproduct");
                                                                    }
                                                                       
                                                   exports.cont_productedit=(req,res)=>
                                                    {
                                                            ser_productedit(req,res);


                                                   }
                                                                    
                                                                       
                                                                       
                                                                        
                                                                  
                                                            exports.cont_deleteproduct=(req,res)=>
                                                                {   
                                                                    res.render("deleteproduct");
                                                                    ser_deleteproduct(req,res);
                                                                    //res.render("viewproduct");
                                                                }
                                                                   

                                                                
                                                                exports.cont_updateproduct1=(req,res)=>
                                                                    {
                                                                        ser_updateproduct(req,res);
                                                                        
                                                                        //res.render("viewproduct");
                                                                    }
                                                                       
                                                   
                                                                    
                                                                    exports.cont_mailopen=(req,res)=>
                                                                        {
                                                                            ser_mailopen(req,res);
                                                                           
                                                                        }
                                                                    
                                                                
                                                                    
                                                                        exports.cont_leaderboard=(req,res)=>
                                                                            {
                                                                                ser_leaderboard(req,res);
                                                                               
                                                                            }



                                                                            exports.cont_activity=(req,res)=>
                                                                                {
                                                                                    ser_activity(req,res);

                                                                            }


                                                                            
                                                                            exports.cont_producteditsuccess=(req,res)=>
                                                                                {
                                                                                    ser_producteditsuccess(req,res);

                                                                            }



                                                                            exports.cont_productdelete=(req,res)=>
                                                                                {
                                                                                    ser_productdelete(req,res);

                                                                            }

                                                                            
                                                                            exports.cont_user_mail=(req,res)=>
                                                                                {
                                                                                   
                                                                                    ser_user_mail(req,res);
                                                                                    }

                                                                            exports.cont_view_user_send_mail=(req,res)=>
                                                                            {
                                                                               
                                                                                ser_view_user_send_mail(req,res);
                                                        
                                                                            }

















                                                                    
                                                                       
                                                                           
                                                                            
                                                                            
                                                                       
                                                                        
                                                                        
                                                                   
                                                                   
                                                                    
                                                                    
                                                                
                                                                   
                                                                   
                                                                    
                                                                
                                                                
                                                                   
                                                                   
                                                                    
                                                                
                                               
                                                                
                                                                   
                                                                   
                                                                    
                                                               
                                                               
                                               