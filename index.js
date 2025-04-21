let express=require("express");

let app=express();

let de=require("dotenv");

let bp=require("body-parser");

const multer = require('multer');

const { v2: cloudinary } = require('cloudinary');

const { CloudinaryStorage } = require('multer-storage-cloudinary');
de.config()

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







































const tble2 = require("./module/user2.0");

app.post('/addproduct1', upload.single('productImage'),async (req, res) => {

    let a;

    let b = req.body.productName;

    console.log(b);

    let c = req.body.productDescription;

    console.log(c);

    let d = req.body.productPrice;

    console.log(d);

    let e = req.body.productCategory;

    console.log(e);

    let f = req.body.productStock;

    console.log(f);
    
        let data = await tble2.findOne().sort({ product_no: -1 });

        if (data) {

            a = Number(data.product_no) + 1;

        } else {

            a = 1;
        }

        console.log(`Assigned product_no number: ${a}`);

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
const cookieParser = require('cookie-parser'); 
app.use(cookieParser());
de.config();
const path=require("path");
let {conDB}=require("./dbconnection");
const my_auth = require("./my_auth");
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