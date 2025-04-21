
const tble3 = require("./module/user3.0");
const tble2 = require("./module/user2.0");
const tble = require("./module/user");
let jwt=require("jsonwebtoken");




 exports.ser_signup = async (req, res) => {
    
    let a;
     let b = req.body.Name;
     let c = req.body.FatherName;
     let d = req.body.MobileNo;
     let e = req.body.Dob;
     let f = req.body.Email;
     let g = req.body.Gender;
     let h = req.body.ResidentialAddress;
     let i = req.body.Password;
     let j = req.body.Amount;
 
         let data1 = await tble.findOne().sort({ user_id: -1 });
 
         if (data1) {
             a = Number(data1.user_id) + 1;
         } else {
             a = 1;
         }
       
 
         let rec = new tble({
             user_id: a,
             parent_id: a,
             your_name: b,
             father_name: c,
             mobile_no: d,
             date: e,
             email: f,
             gender: g,
             address: h,
             password: i,
             amount: j
         });
         await rec.save();
         let name = b;

         let data = await tble.findOne({ email: f, password: i }); // Use findOne
        
         //console.log(data.user_id);
         let tok=jwt.sign(data.user_id,"aabb");
        
         //let wapas=jwt.verify(tok,"aabb");/
         //console.log(wapas);

   
             res.cookie("mytoken",tok);
         await tble.updateOne({your_name:name},{$set:{status:"active"}});
   
         let active_user = await tble.find({status:"active"});
         let activeuser = active_user.length;
       
         let totalproducts = await tble2.find({});
         let totalproduct = totalproducts.length;
     
         res.render("dashboard",{name,activeuser,totalproduct})
     
 };
 

exports.ser_dashboard = async (req,rep) => {
    
    let uid = req.user.user_id;
    let abhi = await tble.findOne({user_id:uid});
    let name = abhi.your_name;
    let active_user = await tble.find({status:"active"});
    let activeuser = active_user.length;
    
    let totalproducts = await tble2.find({});
    let totalproduct = totalproducts.length;
    
    rep.render("dashboard",{name,activeuser,totalproduct})

}
exports.ser_login = async (req, rep) => {
  
    let a = req.body.email;
  let b = req.body.pass;
  try {
      let data = await tble.findOne({ email: a, password: b }); // Use findOne
        
      //console.log(data.user_id);
      let tok=jwt.sign(data.user_id,"aabb");
     
      //let wapas=jwt.verify(tok,"aabb");/
      //console.log(wapas);
      if (data.blocked==false) {

          rep.cookie("mytoken",tok);
          //const hello = req.cookies.loginuserid;ss
       //rep.cookie("abhi",data.user_id)
       let name = data.your_name;
       await tble.updateOne({your_name:name},{$set:{status:"active"}});
   
        let active_user = await tble.find({status:"active"});
        let activeuser = active_user.length;
      
        let totalproducts = await tble2.find({});
        let totalproduct = totalproducts.length;
    
        rep.render("dashboard",{name,activeuser,totalproduct});
      } else {
        
          rep.render("loginblocked");
      }
  } catch (error) {
      console.error("Error logging in:", error);
      rep.render("error");
  }
};

// exports.ser_adduserdata = async (req, res) => {
//     let un = req.cookies.abhi;
//     console.log(un);

//     let a, b = req.query.Name, c = req.query.FatherName, d = req.query.MobileNo;
//     let e = req.query.Dob, f = req.query.Email, g = req.query.Gender;
//     let h = req.query.ResidentialAddress, i = req.query.Password, j = req.query.Amount;
//     let amount = j;

//     if (amount > 0) {
//         let userId = un;
//         let commission = amount;

//         while (commission > 0.01) { // Stop when the commission becomes too small
//             let user = await tble.findOne({ user_id: userId });
//             if (!user) {
//                 console.log(`User with ID ${userId} not found.`);
//                 break; // Break the loop if the user is not found
//             }

//             let currentAmount = user.amount || 0;
//             let updatedAmount = currentAmount + commission;
//             await tble.updateOne({ user_id: userId }, { $set: { amount: updatedAmount } });

//             console.log(`User ID ${userId} receives commission: ${commission}`);
            
//             // Prepare for the next iteration
//             commission = commission / 2;
//             userId = user.parent_id; // Assuming each user has a `parent_id` linking to the next user

//             if (!userId) {
//                 console.log('No more parent users to distribute to.');
//                 break; // Break the loop if there are no more parent users
//             }
//         }
//     } else {
//         console.log("Amount update failed.");
//     }

//     try {
//         let data = await tble.findOne().sort({ user_id: -1 });

//         if (data) {
//             a = Number(data.user_id) + 1;
//         } else {
//             a = 1;
//         }
//         console.log(`Assigned user_id number: ${a}`);

//         let rel = new tble({
//             user_id: a,
//             parent_id: Number(un),
//             your_name: b,
//             father_name: c,
//             mobile_no: d,
//             date: e,
//             email: f,
//             gender: g,
//             address: h,
//             password: i,
//             amount: j
//         });
//         await rel.save();
//         res.render("dashboard");
//     } catch (error) {
//         console.error("Error adding user data:", error);
//         res.render("error");
//     }
// };





exports.ser_adduserdata = async (req, res) => {
    let uid = req.user.user_id;
    let abhi = await tble.findOne({user_id:uid});
    let name = abhi.your_name;
 
    let un = req.user.user_id;
    console.log(un);
    let a;
    let b = req.query.Name;
    let c = req.query.FatherName;
    let d = req.query.MobileNo;
    let e = req.query.Dob;
    let f = req.query.Email;
    let g = req.query.Gender;
    let h = req.query.ResidentialAddress;
    let i = req.query.Password;
    let j = req.query.Amount;

    try {
        let data = await tble.findOne().sort({ user_id: -1 });

        if (data) {
            a = Number(data.user_id) + 1;
        } else {
            a = 1;
        }
        console.log(`Assigned user_id number: ${a}`);

        let rel = new tble({
            user_id: a,
            parent_id: Number(un),
            your_name: b,
            father_name: c,
            mobile_no: d,
            date: e,
            email: f,
            gender: g,
            address: h,
            password: i,
            amount: j/2
        });
        await rel.save();
        console.log("New user added successfully.");
        let data1 = await tble.findOne().sort({ user_id: -1 });
        let parentId = data1.parent_id; 
        let commission = j/4;
        
       
        if (parentId < 1) {
            console.log("top parent reached");
            let updatedAmount = currentAmount + commission;
            await tble.updateOne({ user_id: parentId }, { $set: { amount: updatedAmount } });
        }

        while (true) 
            {
            let user = await tble.findOne({ user_id: parentId });
         
            let currentAmount = user.amount;
            console.log(currentAmount);
            let updatedAmount = currentAmount + commission;
            console.log(updatedAmount);
            await tble.updateOne({ user_id: parentId }, { $set: { amount: updatedAmount } });

           commission = commission / 2;
            parentId = user.parent_id; 
           
        }

        res.render("dashboard",{name});
    } catch (error) {
        console.error("Error adding user data:", error);
        res.render("error");
    }
};





exports.ser_userview = async (req, rep) => {
    
    try {
        let uid = req.user.user_id;
        let abhi = await tble.findOne({user_id:uid});
        let name = abhi.your_name;
     
      let un = req.user.user_id;
  
      console.log("Parent ID from cookie:", un);
  
      // Fetch all users with the specified parent_id
      let users = await tble.find({ parent_id: un }, { _id: 0 });
  
      if (!users || users.length === 0) {
        console.log("No user data found.");
        return rep.render("viewuser", { users: [] }); // Render empty list if no data
      }
  
      console.log(`Found ${users.length} users`);
  
      // Render the view with the array of users
      rep.render("viewuser", { users,name });
    } catch (err) {
      console.error("Error fetching user data: ", err);
      rep.status(500).send("Internal Server Error");
    }
  };
  




  exports.ser_filter = async (req, rep) => {
    let uid = req.user.user_id;
    let abhi = await tble.findOne({ user_id: uid });
    let name = abhi.your_name;
  
    let a = req.body.filtername;
    let b = req.body.filteremail;
    let c = req.body.filterId;
    let d = req.body.filtermobile;
  
    let filter = {};
    if (a) filter.your_name = a;
    if (b) filter.email = b;
    if (c) filter.amount = c;
    if (d) filter.mobile_no = d;
  
    let users = await tble.find(filter);
  
    rep.render("viewuser", { name, users });
  };
  





    exports.ser_blockuser = async (req, rep) => {

        let userId = req.body.id;
            await tble.updateOne({ user_id: userId }, { $set: { blocked: true } });
            rep.render("successblocked");



    };



    


    exports.ser_unblockuser = async (req, rep) => {
        
        let userId = req.body.id; 
        let passwordcheck = 0;
        await tble.updateOne({ user_id: userId }, { $set: { blocked: false } }); 
        rep.render("successunblocked");

    };






    exports.ser_view = async (req, res) => {
        
        try {
            let users = await tble.find({});
           // rep.cookie("name",users.your_name);
          //rep.render("dashboard", { result: data.user_id });
            
            if (!users || users.length === 0) {
                console.log("No user data found.");
                return res.render("viewuser", { users: [] });
            }
    
            console.log(`Found ${users.length} users`);
    
            // Render the view with the array of users
            res.render("update", { users });
        } catch (err) {
            console.error("Error fetching user data: ", err);
            res.status(500).send("Internal Server Error");
        }
    };
    





    exports.ser_user = async (req, rep) => {
        let uid = req.user.user_id;
        let abhi = await tble.findOne({user_id:uid});
        let hello = abhi.your_name;
     
        let userId = req.body.id; 
        console.log(userId);
        data = await tble.findOne({user_id:userId});
        rep.cookie("abh",userId);
        rep.render("update", {data});
    };






    exports.ser_update = async (req, rep) => {
        let uid = req.user.user_id;
        let abhi = await tble.findOne({user_id:uid});
        let name = abhi.your_name;
     

            let un = req.cookies.abh;
            console.log(un);
            // Extract data from the request body
            let a = req.body.un;
            let b = req.body.fn;
            let c = req.body.mn;
            let e = req.body.em;
            let f = req.body.ge;
            let g = req.body.ad;
            console.log(a);
            console.log(b);
            console.log(c);
            console.log(e);
            console.log(f);
            console.log(g);
    //console.log(h);
  //  console.log(i);
            // Create an update object dynamically
            
    
            await tble.updateOne({ user_id:un}, { your_name:a,father_name:b,mobile_no:c,email:e,gender:f,address:g});
    
            console.log("User updated successfully.");
            rep.render("dashboard",{name});
        
    };
     






    exports.ser_admininfo = async (req, rep) => {
        let uid = req.user.user_id;
        let abhi = await tble.findOne({user_id:uid});
        let name = abhi.your_name;
     
        let un = req.user.user_id;
        console.log(un);
        let data=await tble.findOne({ user_id:un});
        let a=data.your_name;
        console.log(a);
        let b=data.mobile_no;
        console.log(b);
        let c=data.email;
        console.log(c);

        rep.render("adminprofile", { a,b,c,name});

    };






    exports.ser_changepass = async (req, rep) => {
        
        let un = req.user.user_id;
        console.log(un);
        let a = req.body.oldpass;
        console.log(a);
        let b = req.body.pass;
        console.log(b);
        let c = req.body.conpass;
        console.log(c);
        if(b==c){

            data=await tble.findOne({ user_id:un});
            let d = data.password;
        
        if(a==d){
            
            await tble.updateOne({ user_id:un}, { password:c});
            rep.render("adminprofile");
        }
        

else{
    console.log("password donot match");
    }

        }
    else{
        console.log("pssword and confirm pass donot match");
    }
    
    };






    exports.ser_logout = async (req,rep) =>{

        let un = req.user.user_id;
        let status = await tble.updateOne({user_id:un},{$set:{status:"deactive"}});
       await rep.cookie("mytoken","");
       await rep.render("logout");
    
    }


    let passwordcheck = 0;






    exports.ser_withdraw1 = async(req,rep) => {

        //  let email =req.body.id;
        // console.log("hello");
        // rep.cookie("wa",email);
        await rep.render("withdraw",{passwordcheck});
    
   
    }
    
    
    
    
    
    exports.ser_deposit1 = async(req,rep) => {

    //     let email =req.body.id;
    //    console.log("hello");
    //    rep.cookie("dp",email);
       await rep.render("deposit",{passwordcheck});
   
  
   }





    exports.ser_withdraw = async(req,rep) => {
      
        let uid = req.user.user_id;
        // let uId = req.cookies.wa;
        // console.log(uId); 
        let a = req.body.amount;
        console.log(a);
        let b = req.body.password;
        console.log(b);
        let data = await tble.findOne({user_id:uid});
        let previous_amount = data.amount;
        console.log(previous_amount);
        let new_amount =previous_amount-a;
        console.log(new_amount);
        if(data.blocked==true){
            rep.render("blockeduser");
        }
        else{
        if(previous_amount<a ){

            rep.render("notbalance");
        } 
        else {
            
              if(passwordcheck<5) { 
                if (data.password !== b) {
                     console.log("incorrect password"); 
                     passwordcheck++; 
                 await  rep.render("withdraw",{passwordcheck});  
                if (passwordcheck>=5) { 
                    await tble.updateOne({ user_id: uid }, { $set: {blocked: true } }); 
                 await   rep.render("passblocked"); 
                    return;
                 }
             }
        
            else{

                await tble.updateOne({ user_id: uid }, { $set: {amount:new_amount } }); 
                await rep.render("successwithdraw");
        
                }
            }       
         }
        }
        
    }   





    exports.ser_deposit = async(req,rep) => {

        let uId = req.user.user_id;
        console.log(uId); 
        let a = req.body.amount;
        console.log(a);
        let b = req.body.password;
        console.log(b);
        let data = await tble.findOne({user_id:uId});
        let previous_amount = data.amount;
        console.log(previous_amount);
        let new_amount = parseInt(a)+parseInt(previous_amount);
        console.log(new_amount);
         
    if(data.blocked==true){
        rep.render("blockeduser");
    }
    else{
           
              if(passwordcheck<5) { 
                if (data.password !== b) {
                     passwordcheck++; 
                     console.log(" passcheck incorrect password"); 
                 await rep.render("deposit",{passwordcheck});
                     
                if (passwordcheck>=5) { 
                    await tble.updateOne({ user_id:uId }, { $set: {blocked: true } }); 
                    await rep.render("passblocked"); 
                    return;
                 }
             }
        
            else{

                await tble.updateOne({ user_id: uId }, { $set: {amount:new_amount } }); 
              await  rep.render("successdeposit");
        
                }
            }       

        }
        
    }   







    
    exports.ser_viewprofile = async(req,rep) => {

            let email =req.body.id;
          
          

            let data = await tble.findOne({email:email});
            console.log(data);

          await  rep.render("profileview", { data });
  
           
       
      
          
       }
    
       exports.ser_balance = async(req,rep) => {

        let uid = req.user.user_id;
      
      

        let data = await tble.findOne({user_id:uid});

      await  rep.render("balance", { data });

       
   
  
   }



       
   exports.ser_viewproduct = async(req,rep) => {

    let uid = req.user.user_id;
  
let user = await tble.findOne({user_id:uid}); 
let name = user.your_name;
console.log(name);
   let products = await tble2.find({});
    //console.log(data)
    rep.render("viewproduct",{products,name});


   


}




exports.ser_shopping = async(req,rep) => {

    let uid = req.user.user_id;
  

    let cart = await tble3.find({addedby:uid});
    //console.log(data)
    rep.render("addtocart",{cart});


   


}






exports.ser_addtocart = async(req,rep) => {
    let uid = req.user.user_id;
    let abhi = await tble.findOne({user_id:uid});
    let name = abhi.your_name;
 
    
    let quantity = await parseInt(req.query.quantity);
    let product = await req.query.product_no;
    console.log(product);
    console.log(quantity);
    let cart1= await tble2.findOne({product_no:product});
    if(cart1.product_quantity>=quantity)
    {   
        let data1 = await tble3.findOne({addedby:uid,product_no:product});
       
        if(data1){
            if(cart1.product_quantity>=quantity+data1.product_quantity){
            let total_quantity = (data1.product_quantity) + (quantity);
            await tble3.updateOne({product_no:product},{  product_no: cart1.product_no,product_name:cart1.product_name,product_description:cart1.product_description,product_price:cart1.product_price,product_category:cart1.product_category,product_quantity:total_quantity,product_image:cart1.product_image,addedby:uid})
            let products = await tble2.find({});
            //console.log(data)
            rep.render("viewproduct",{products,name});
            }
            else{
                rep.render("itemnotavailable");
            }
        }
        else{
        let rel = await new tble3({
        product_no: cart1.product_no,
        product_name:cart1.product_name,
        product_description:cart1.product_description,
        product_price:cart1.product_price,
        product_category:cart1.product_category,
        product_quantity:quantity,
        product_image:cart1.product_image,    
        addedby:uid
        });
    let products = await tble2.find({});
    await rel.save();
  await  rep.render("viewproduct",{products,name});
    }
}
    

else {
    console.log("not enough product");
    rep.render("itemnotavailable")
}
}





exports.ser_removeproduct = async(req,rep) => {
    let removequantity = req.query.yoyo;
    console.log(removequantity)
    let uid = req.user.user_id;
    let data = req.query.id;
    let data1 = await tble2.findOne({product_name:data});
    let quanityindatabase = data1.product_quantity;
    if(removequantity<=quanityindatabase){

        let data3 = await tble3.findOne({product_name:data})
        let lastquantity = data3.product_quantity;
       
        if(lastquantity<=1){

            await tble3.deleteOne({product_name:data});
            let cart = await tble3.find({addedby:uid});
            console.log(data)
            rep.render("addtocart",{cart});
        }
        else{
        let data2 = await tble3.findOne({product_name:data});
        let quanityindatabase1 = data2.product_quantity;
        let newquantity = parseInt(quanityindatabase1)-parseInt(removequantity);
        await tble3.updateOne({product_name:data},{product_quantity:newquantity});
       let cart = await tble3.find({addedby:uid});
        console.log(data)
        rep.render("addtocart",{cart});
       
    }
}
else{

    let cart = await tble3.find({addedby:uid});
    console.log(data)
    rep.render("addtocart",{cart});

}
    
}







exports.ser_buynow = async(req,rep) => {
    console.log("i am abhi");
    
    let uid = req.user.user_id;
    let abhi = await tble.findOne({user_id:uid});
    let name = abhi.your_name;
    let quantity = await parseInt(req.query.quantity);
    let product = await req.query.product_no;
    console.log(quantity);
    console.log(uid);

    let cart = await tble2.findOne({product_no:product});
    let abhi1 = cart.product_quantity;
    rep.cookie("buynowname",product);
    rep.cookie("buynowquantity",quantity);
    console.log(abhi1);
    if(abhi1>quantity){
    rep.render("buynow1",{quantity,cart});
}

else{
    rep.render("itemnotavailable")
}
}







exports.ser_confirm_purchase = async(req,rep) => {
    let abhi = req.body.totalAmount;
    let uid = req.user.user_id;
    
    let data = await tble.findOne({user_id:uid});
    let balance = data.amount;
    
    if(balance>abhi){
      let  new_amount = parseInt(balance)-parseInt(abhi);
   
      await tble.updateOne({user_id:uid},{amount:new_amount});
      let data1 = await tble3.find({addedby:uid},)
      data1.forEach( async index =>{
        let name=index.product_name;
        let quantity1 = index.product_quantity;
        let data2 = await tble2.findOne({product_name:name});
        let previous_quantity = data2.product_quantity;
        let new_quantity = parseInt(previous_quantity)- parseInt(quantity1)
        await tble2.updateOne({product_name:name},{product_quantity:new_quantity})
      })
      
      await  tble3.deleteMany({addedby:uid})
    
    rep.render("successpurchase",{data1,abhi});
    }
    else{
        rep.render("error")
    }


    }
    
    






    
exports.ser_confirm_purchase1 = async(req,rep) => {
    let abhi = parseInt(req.body.totalAmount);
    let uid = req.user.user_id;
    console.log(abhi)
    let name = req.cookies.buynowname;
    let quantity1 = req.cookies.buynowquantity;
    console.log(name);
    console.log(quantity1);
    let data = await tble.findOne({user_id:uid});
    let balance =parseInt( data.amount);
    console.log(balance)
    
    if(balance>abhi){
      let  new_amount = parseInt(balance)-parseInt(abhi);
   
      await tble.updateOne({user_id:uid},{amount:new_amount});

        let data1 = await tble2.findOne({product_no:name});
        let previous_quantity = data1.product_quantity;
        let new_quantity = parseInt(previous_quantity)- parseInt(quantity1)
        console.log(new_quantity)
        await tble2.updateOne({product_no:name},{product_quantity:new_quantity})
      let data2 = await tble2.findOne({product_no:name});
    rep.render("successpurchase1",{data2,quantity1,abhi});
    }
    else{
        rep.render("error")
    }


    }
    





    exports.ser_updateproduct = async(req,rep) => {

    let a = req.body.productNumber;
    let b = req.body.productName;
    console.log(b);
    let c = req.body.productDescription;
    console.log(c);
    let d = req.body.productPrice;
    console.log(d);
    let e = req.body.productCategory;
    console.log(e);
    let g = req.body.productQuantity;
    console.log(g);
    
       
     await tble2.updateOne({product_no:a},{product_name:b,product_description:c,product_price:d,product_category:e,product_quantity:g});
        console.log("product updated successfully.");



        

    //console.log(req.file); // Cloudinary response
   rep.render("successupdated");
 }








    
    exports.ser_mailopen = async(req,res) => {

        let uid = req.user.user_id;
        let abhi = await tble.findOne({user_id:uid});
        let name = abhi.your_name;
        res.render("mail",{name});

    }

    exports.ser_leaderboard = async(req,res) => {

        let uid = req.user.user_id;
        let abhi = await tble.findOne({user_id:uid});
        let name = abhi.your_name;
        res.render("leaderboard",{name});

    }


    
    // exports.ser_update = async (req, rep) => {
       
    //     try {
    //         let userId = req.body.id; 
    //         let users = await tble.find(userId);
        
    //         if (!users || users.length === 0) {
    //           console.log("No user data found.");
    //           return rep.render("update", { users: [] }); // Render empty list if no data
    //         }
        
    //         console.log(`Found ${users.length} users`);
        
    //         // Render the view with the array of users
    //         rep.render("update", { users });
    //       } catch (err) {
    //         console.error("Error fetching user data: ", err);
    //         rep.status(500).send("Internal Server Error");
    //       }

    //     let a=req.query.un;
    //     let b=req.query.fn;
    //     let c=req.query.mn;
    //     let d=req.query.da;
    //     let e=req.query.em;
    //     let f=req.query.ge;
    //     let g=req.query.ad;
    //     let h=req.query.pa;
    //     let i=req.query.am;
    //     let j=req.query.ui;
    //     let filter={};
    //     if(a)filter.your_name = a;
    //     if(b)filter.father_name = b;
    //     if(c)filter.mobile_no = c; 
    //     if(d)filter.date = d;
    //     if(e)filter.email = e;
    //     if(f)filter.gender = f;
    //     if(g)filter.address = g;
    //     if(h)filter.password = h;
    //     if(i)filter.amount = i;
    //     if(j)filter.user_id = j;
       
    //     await tble.updateOne({   },{$set: { users:filter }});
    //     rep.redirect('/viewuser');


    // };



// exports.ser_userview = async (req, rep) => {
//   let un = req.cookies.abhi;

//   console.log(un);


//  let data=await tble.find({user_id:un},{_id:0,});
//  console.log("total "+data);
//  let a=data.user_id;
//  let b=data.your_name;
//  let c=data.parent_id;
//  let d=data.father_name;
//  let e=data.mobile_no;
//  let f=data.date;
//  let g=data.email;
//  let h=data.gender;
//  let i=data.address;
//  let j=data.password;
//  let k=data.amount;
 
//  console.log("1 "+b);
//  console.log("2 "+a);
//  rep.render("viewuser",{user_name:a,your_name:b,parent_id:c,father_name:d,mobile_no:e,date:f,email:g,gender:h,address:i,password:j,amount:k});
//  //rep.render("viewuser",{users:data});

// };



// exports.ser_userview = async (req, res) => {
//   let un = req.cookies.abhi;

//   try {
//       let data = await tble.find({ user_id: un }, { _id: 0 });
//       console.log("total " + data);

//       if (data.length > 0) {
//           let user = data[0]; // Assume only one user is found
//           res.render("viewuser", {
//               user_name: user.user_name,
//               your_name: user.your_name,
//               parent_id: user.parent_id,
//               father_name: user.father_name,
//               mobile_no: user.mobile_no,
//               date: user.date,
//               email: user.email,
//               gender: user.gender,
//               address: user.address,
//               password: user.password,
//               amount: user.amount
//           });
//       } else {
//           res.render("viewuser", { user_name: "User not found" });
//       }
//   } catch (error) {
//       console.error("Error viewing user:", error);
//       res.render("error");
//   }
// };




 // exports.ser_add = async (req,rep) => {
//     let a ;
//     let b = req.query.Name;
//     let c = req.query.FatherName;
//     let d = req.query.MobileNo;
//     let e = req.query.Dob;
//     let f = req.query.Email;
//     let g = req.query.Gender;
//     let h = req.query.ResidentialAddress;
//     let i = req.query.Password;
//     let j = req.query.Amount;
    
//     let data = await tble.findOne().sort({ user_id: -1 });

//     if (data) {
//         a = data.user_id + 1;
//     } else {
//         a = 1;
//     }
//     console.log(`Assigned account number: ${a}`);

//     let rec = await new tble({user_id:a,parent_id:a,your_name:b,father_name:c, mobile_no:d,date:e, email:f,gender:g,address:h, password:i,amount:j});
//     await rec.save();
// rep.render("dashboard");
// };





// exports.ser_login = async (req,rep) => {
//   let a=req.query.email;
//   let b=req.query.pass;
//   console.log(a);
//   console.log(b);
//   let data=await tble.find({email:a,password:b});
//   if(data){


//     rep.cookie("abhi",data.user_id);
//     rep.render("dashboard",{result:data.user_id});
  
//   }
//   else{
//     rep.render("error");
//   }

// };
// exports.ser_adduserdata = async (req, rep) => {
//     let un = req.cookies.abhi;
//     console.log(un);
    


//    //let a=req.query.name;
//    let b = req.query.Name;
//    let c = req.query.FatherName;
//    let d = req.query.MobileNo;
//    let e = req.query.Dob;
//    let f = req.query.Email;
//    let g = req.query.Gender;
//    let h = req.query.ResidentialAddress;
//    let i = req.query.Password;
//    let j = req.query.Amount;
//    let data = await tble.findOne().sort({ user_id: -1 });
// let a;
//     if (data) {
//         a = data.user_id + 1;
//     } else {
//         a = 1;
//     }
//     console.log(`Assigned account number: ${a}`);
//    let rel = await new tble({user_id:a,parent_id:un,your_name:b,father_name:c, mobile_no:d,date:e, email:f,gender:g,address:h, password:i,amount:j});
//   await rel.save();
 

// };
