const express = require("express");
const path = require("path");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const multer = require("multer");
const { v2: cloudinary } = require("cloudinary");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const nodemailer = require("nodemailer");

const router = require("./router");
const tble = require("./module/user");
const tble2 = require("./module/user2.0");
const { conDB } = require("./dbconnection");
const my_auth = require("./my_auth");

dotenv.config();
const app = express();

// Setup view engine
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use("/", router);

// Connect DB
conDB();

// Cloudinary Config
cloudinary.config({
  cloud_name: "dcdedzsme",
  api_key: process.env.CLOUDNARY_api,
  api_secret: process.env.CLOUDNARY_secret,
});

// Multer Cloudinary Storage
const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "uploads",
    format: async () => "jpeg",
    public_id: (req, file) => `${file.originalname.split(".")[0]}-${Date.now()}`,
  },
});
const upload = multer({ storage });


// Route: Send Email
app.post("/send-mail", async (req, res) => {
  const { senderEmail, recipientEmail, subject, message } = req.body;

  const transporter = nodemailer.createTransport({
    service: "gmail",
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


// Route: Add Product
app.post("/addproduct1", upload.single("productImage"), async (req, res) => {
  const { productName, productDescription, productPrice, productCategory, productStock } = req.body;

  let latest = await tble2.findOne().sort({ product_no: -1 });
  let product_no = latest ? Number(latest.product_no) + 1 : 1;

  const newProduct = new tble2({
    product_no,
    product_name: productName,
    product_description: productDescription,
    product_price: productPrice,
    product_category: productCategory,
    product_quantity: productStock,
    product_image: req.file.path,
  });

  await newProduct.save();

  console.log("New product added successfully.");
  res.render("successadditem");
});


// Export for Vercel (no app.listen)
module.exports = app;
