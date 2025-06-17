let express=require("express");

let app=express();

let de=require("dotenv");

let bp=require("body-parser");

const multer = require('multer');

const { v2: cloudinary } = require('cloudinary');

const { CloudinaryStorage } = require('multer-storage-cloudinary');
de.config()

const my_auth = require("./my_auth");

app.use(express.json());
cloudinary.config({

    cloud_name: 'dcdedzsme',

    api_key: process.env.CLOUDNARY_api,

    api_secret: process.env.CLOUDNARY_secret, 

});


const storage = new CloudinaryStorage({

    cloudinary: cloudinary,

    params: {

        folder: 'uploads',

        format: async (req, file) => 'jpeg', 

        public_id: (req, file) => `${file.originalname.split('.')[0]}-${Date.now()}`, 

    },

});




const upload = multer({ storage });


app.set('view engine', 'ejs');





const cookieParser = require('cookie-parser');

// Add this before your routes
app.use(cookieParser());

const recentactivity = require("./module/recentactivity");


const tble = require("./module/user");



const nodemailer = require('nodemailer');


const bodyParser = require('body-parser');
require('dotenv').config();

app.use(bodyParser.urlencoded({ extended: true }));  // Parse URL-encoded form data







app.post('/send-mail',my_auth, async (req, res) => {
  let uid = req.user.user_id;
      
    let abhi = await tble.findOne({user_id:uid});
    let name = abhi.your_name;
    let image = await tble.findOne({user_id:uid});
    let user_image = image.picture;

  try {
 
  
  const { senderEmail, recipientEmail, subject, message } = req.body;

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: senderEmail,
    to: recipientEmail,
    subject: subject,
    text: message,
  };

  
    await transporter.sendMail(mailOptions);
  
          let mailsenddetail = "Mail Send Successfully";
          let rec = new recentactivity({
            user_id:uid,
            activity:mailsenddetail
  
          });
          await rec.save(); 
    res.render("mailsuccess",{name,user_image});
  } catch (error) {
    res.render("mailsendfail",{user_image});
  }
});

















































































const Razorpay = require('razorpay');
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID, // your test key
  key_secret: process.env.RAZORPAY_SECERET_KEY, // your test secret
});









exports.processRazorpayPayment = async (req, res) => {
  try {
    const { razorpay_payment_id, razorpay_order_id, razorpay_signature } = req.body;
    const abhi = parseInt(req.body.totalAmount);
    const name = req.cookies.buynowname;
    const quantity1 = req.cookies.buynowquantity;
    
    // In production, you should verify the payment signature here
    // For now, we'll assume payment is successful
    
    // Process the purchase (same logic as local payment)
    let data1 = await tble2.findOne({product_no:name});
    let previous_quantity = data1.product_quantity;
    let new_quantity = previous_quantity - quantity1;
    await tble2.updateOne({product_no:name}, {product_quantity:new_quantity});
    
    let data2 = await tble2.findOne({product_no:name});
    res.json({
      success: true,
      data: {data2, quantity1, abhi}
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({success: false, error: "Payment processing failed"});
  }
};

// Create Razorpay order
exports.createRazorpayOrder = async (req, res) => {
  try {
    const amount = parseInt(req.body.totalAmount) * 100; // Convert to paise
    
    const options = {
      amount: amount,
      currency: "INR",
      receipt: "order_rcptid_" + Math.floor(Math.random() * 1000)
    };
    
    const order = await razorpay.orders.create(options);
    res.json(order);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error creating order");
  }


}























































































app.post('/profile_edit',my_auth, upload.single('UserImage'),async (req, res) => {

let uid = req.user.user_id;

console.log(uid);

  let new_name = req.body.name;

    let abhi = await tble.findOne({user_id:uid});
          let name = abhi.your_name;
          let image = await tble.findOne({user_id:uid});
          let user_image = image.picture;

  let phone = req.body.phone;

  await tble.updateOne({user_id:uid},{your_name:new_name,mobile_no:phone,picture:req.file.path});

  let data = await tble.findOne({user_id:uid});

  let a = data.your_name;
  let b = data.mobile_no;
  let c = data.email;


  
          let profileeditdetail = "Profile Edited Successfully";
          let rec = new recentactivity({
            user_id:data.user_id,
            activity:profileeditdetail
  
          });
          await rec.save(); 

  res.render("adminprofile",{a,b,c,name,user_image});



});












const tble2 = require("./module/user2.0");

app.post('/addproduct1',my_auth, upload.single('productImage'),async (req, res) => {

    let a;
        let uid = req.user.user_id;
    
          let abhi = await tble.findOne({user_id:uid});
          let name = abhi.your_name;
          let image = await tble.findOne({user_id:uid});
          let user_image = image.picture;


    let b = req.body.productName;

    let c = req.body.productDescription;

    let d = req.body.productPrice;

    let e = req.body.productCategory;

    let f = req.body.productStock;

        let data = await tble2.findOne().sort({ product_no: -1 });

        if (data) {

            a = Number(data.product_no) + 1;

        } else {

            a = 1;
        }

        let rel = new tble2({

            product_no: a,

            product_name: b,

            product_description: c,

            product_price: d,

            product_category: e,

            product_quantity: f,

            product_image: req.file.path,

        });
        
        await rel.save();
        
                let productadddetail = "Product Added  Successfully";
                let rec = new recentactivity({
                  user_id:data.user_id,
                  activity:productadddetail
        
                });
                await rec.save(); 
        console.log("New product added successfully.");



        

    //console.log(req.file); // Cloudinary response
   res.render("successadditem",{name,user_image});
 });
 
 
app.use(bp.urlencoded({extended:true}));
de.config();
const path=require("path");
let {conDB}=require("./dbconnection");

conDB();
app.set("view engine","ejs");
app.use("",require("./router"));
app.use(express.static(path.join(__dirname,"public")));

app.get("/",(req,res)=>{
      res.render("login");
})

app.listen(902,()=>{
    console.log("server being started");
    
})