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



















































































































const tble = require("./module/user");



const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
require('dotenv').config();

app.use(bodyParser.urlencoded({ extended: true }));  // Parse URL-encoded form data

app.post('/send-mail', async (req, res) => {
  

      
  
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

  try {
    await transporter.sendMail(mailOptions);
  
    res.render("mailsuccess");
  } catch (error) {
    res.render("mailsendfail");
  }
});



























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

  res.render("adminprofile",{a,b,c,name,user_image});



});












const tble2 = require("./module/user2.0");

app.post('/addproduct1', upload.single('productImage'),async (req, res) => {

    let a;

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
        
        console.log("New product added successfully.");



        

    //console.log(req.file); // Cloudinary response
   res.render("successadditem");
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
    
});