let { ser_leaderboard,ser_mailopen,ser_deleteproduct,ser_updateproduct,ser_confirm_purchase1,ser_confirm_purchase,ser_dashboard,ser_removeproduct,ser_buynow,ser_addtocart,ser_shopping,ser_viewproduct,ser_balance,ser_viewprofile,ser_deposit,ser_withdraw,ser_withdraw1,ser_deposit1,ser_logout,ser_changepass,ser_admininfo,ser_user,ser_update,ser_filter,ser_add,ser_adduserdata,ser_userview,ser_login,ser_blockuser,ser_unblockuser}=require("./service");



exports.cont_register=(req,rep)=>

    {
        rep.render("register");
    }
    
exports.cont_change_pass1=(req,rep)=>

    {
        ser_changepass(req,rep);
    }
    exports.cont_login=(req,res)=>
        {
            
            res.render("login");
        }
        
    exports.cont_registerr=(req,rep)=>
        {
           
            ser_add(req,rep);
          //  rep.render("dashboard");
           
           
        }
        
    exports.cont_dash=(req,rep)=>
        {
            rep.render("dashboard");
        }
        
    exports.cont_adminprofile=(req,rep)=>
        {
            ser_admininfo(req,rep);
            rep.render("adminprofile");
        }
        
    exports.cont_dashboard=(req,rep)=>
        {
            ser_dashboard(req,rep);
           
        }
               
    // exports.cont_userview=(req,rep)=>
    //     {
    //         rep.render("viewuser");
    //     }
              
    exports.cont_otp=(req,rep)=>
        {
            rep.render("success");
        }
        exports.cont_adduser=(req,rep)=>
            {
                rep.render("register2");
            }
        exports.cont_changepass=(req,rep)=>
            {
               
                rep.render("changepass");
            }
           
                exports.cont_adduserdata=(req,rep)=>
                    {
                        let name ;
                        ser_adduserdata(req,rep);
                        rep.render("dashboard",{name});
                    }
                    exports.cont_userview=(req,rep)=>
                        {
                            ser_userview(req,rep);
                            //rep.render("viewuser");
                        }
                        exports.cont_viewuser=(req,rep)=>
                            {
                              
                            }
                           
                        exports.cont_loginrout=(req,rep)=>
                            {
                              ser_login(req,rep);
                             // rep.render("dashboard");
                            }
                           
                            
                        exports.cont_filteruser=(req,rep)=>
                            {
                              ser_filter(req,rep);
                            }
                           
                               
                        exports.cont_userblock=(req,rep)=>
                            {
                              ser_blockuser(req,rep);
                            }
                            exports.cont_userunblock=(req,rep)=>
                                {
                                  ser_unblockuser(req,rep);
                                }
                                exports.cont_userupdate=(req,rep)=>
                                    {
                                    // rep.render("update");
                                     ser_user(req,rep);
                                     
                                    }
                                   
                                exports.cont_update=(req,rep)=>
                                    {
                                        ser_update(req,rep);
                                    }
                                   
                                    
                                exports.cont_admininfo=(req,rep)=>
                                    {
                                        ser_admininfo(req,rep);
                                       // rep.render("adminprofile");
                                    }
                                   
                                     
                                exports.cont_logout=(req,rep)=>
                                    {
                                        ser_logout(req,rep);
                                       // rep.render("adminprofile");
                                    }
                                    exports.cont_withdraw=(req,rep)=>
                                        {
                        
                                           ser_withdraw1(req,rep);
                                        //    rep.render("withdraw");
                                        }
                                        exports.cont_deposit=(req,rep)=>
                                            {
                                                ser_deposit1(req,rep);

                                               // rep.render("adminprofile");
                                            }
                                               
                                    exports.cont_withdraw1=(req,rep)=>
                                        {
                                            ser_withdraw(req,rep);
                                           
                                        }
                                        exports.cont_deposit1=(req,rep)=>
                                            {
                                                ser_deposit(req,rep);
                                            }
                                               
                                        exports.cont_viewprofile=(req,rep)=>
                                            {
                                                ser_viewprofile(req,rep);
                                            }
                                               
                                            exports.cont_balance=(req,rep)=>
                                                {
                                                    ser_balance(req,rep);
                                                }
                                                   
                                                
                                            exports.cont_addproduct=(req,rep)=>
                                                {
                                                    rep.render("addproduct");
                                                }
                                                   
                                                
                                                exports.cont_viewproduct=(req,rep)=>
                                                    {
                                                        ser_viewproduct(req,rep);
                                                        //rep.render("viewproduct");
                                                    }
                                                       
                                                    
                                                exports.cont_shopping=(req,rep)=>
                                                    {
                                                        ser_shopping(req,rep);
                                                        //rep.render("viewproduct");
                                                    }
                                                       
                                                    
                                                    
                                                    exports.cont_buynow=(req,rep)=>
                                                        {
                                                            ser_buynow(req,rep);
                                                            //rep.render("viewproduct");
                                                        }
                                                           
                                                        
                                                    
                                                        exports.cont_addtocart=(req,rep)=>
                                                            {
                                                                ser_addtocart(req,rep);
                                                                //rep.render("viewproduct");
                                                            }
                                                               
                                                            
                                                            exports.cont_removeproduct=(req,rep)=>
                                                                {
                                                                    ser_removeproduct(req,rep);
                                                                    //rep.render("viewproduct");
                                                                }
                                                                  
                                                            exports.cont_confirm_purchase=(req,rep)=>
                                                                {
                                                                    ser_confirm_purchase(req,rep);
                                                                    //rep.render("viewproduct");
                                                                }
                                                                   
                                                                  
                                                            exports.cont_confirm_purchase1=(req,rep)=>
                                                                {
                                                                    ser_confirm_purchase1(req,rep);
                                                                    //rep.render("viewproduct");
                                                                }
                                                                   
                                                 
                                                                exports.cont_updateproduct=(req,rep)=>
                                                                    {
                                                                        rep.render("updateproduct");
                                                                        
                                                                        //rep.render("viewproduct");
                                                                    }
                                                                       
                                                   
                                                                    
                                                                       
                                                                       
                                                                        
                                                                  
                                                            exports.cont_deleteproduct=(req,rep)=>
                                                                {   
                                                                    rep.render("deleteproduct");
                                                                    ser_deleteproduct(req,rep);
                                                                    //rep.render("viewproduct");
                                                                }
                                                                   

                                                                
                                                                exports.cont_updateproduct1=(req,rep)=>
                                                                    {
                                                                        ser_updateproduct(req,rep);
                                                                        
                                                                        //rep.render("viewproduct");
                                                                    }
                                                                       
                                                   
                                                                    
                                                                    exports.cont_mailopen=(req,res)=>
                                                                        {
                                                                            ser_mailopen(req,res);
                                                                           
                                                                        }
                                                                    
                                                                
                                                                    
                                                                        exports.cont_leaderboard=(req,res)=>
                                                                            {
                                                                                ser_leaderboard(req,res);
                                                                               
                                                                            }
                                                                        
                                                                    
                                                                       
                                                                       
                                                                        
                                                                        
                                                                   
                                                                   
                                                                    
                                                                    
                                                                
                                                                   
                                                                   
                                                                    
                                                                
                                                                
                                                                   
                                                                   
                                                                    
                                                                
                                               
                                                                
                                                                   
                                                                   
                                                                    
                                                               
                                                               
                                               