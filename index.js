require('dotenv').config();

const express       = require('express');
const path          = require('path');
const cookieParser  = require('cookie-parser');
const bodyParser    = require('body-parser');
const multer        = require('multer');
const { v2: cloudinary } = require('cloudinary');
const { CloudinaryStorage } = require('multer-storage-cloudinary');

const { conDB } = require('./src/config/db');
const routes    = require('./src/routes/index');
const auth      = require('./src/middleware/auth');
const User      = require('./src/models/User');
const Activity  = require('./src/models/Activity');
const nodemailer = require('nodemailer');

// ─── App setup ────────────────────────────────────────────────────────────────
const app = express();

app.set('view engine', 'ejs');
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// ─── Cloudinary / Multer ──────────────────────────────────────────────────────
cloudinary.config({
    cloud_name: 'dcdedzsme',
    api_key:    process.env.CLOUDNARY_api,
    api_secret: process.env.CLOUDNARY_secret,
});

const storage = new CloudinaryStorage({
    cloudinary,
    params: {
        folder:    'uploads',
        format:    async () => 'jpeg',
        public_id: (req, file) => `${file.originalname.split('.')[0]}-${Date.now()}`,
    },
});

const upload = multer({ storage });

// ─── Database ─────────────────────────────────────────────────────────────────
conDB();

// ─── Routes ───────────────────────────────────────────────────────────────────
app.use('/', routes);

app.get('/test_root', (req, res) => res.send('Root index.js is active'));

// ─── Special upload routes (require multer) ───────────────────────────────────
app.post('/profile_edit', auth, upload.single('UserImage'), async (req, res) => {
    const uid      = req.user.user_id;
    const new_name = req.body.name;
    const phone    = req.body.phone;

    const abhi = await User.findOne({ user_id: uid });
    const name = abhi.your_name;
    const user_image = abhi.picture;

    await User.updateOne({ user_id: uid }, { your_name: new_name, mobile_no: phone, picture: req.file.path });
    const data = await User.findOne({ user_id: uid });

    await new Activity({ user_id: uid, activity: 'Profile Edited Successfully' }).save();
    res.render('adminprofile', { a: data.your_name, b: data.mobile_no, c: data.email, name, user_image });
});

app.post('/addproduct1', auth, upload.single('productImage'), async (req, res) => {
    const uid  = req.user.user_id;
    const abhi = await User.findOne({ user_id: uid });
    const name = abhi.your_name;
    const user_image = abhi.picture;

    const Product = require('./src/models/Product');
    const { productName: b, productDescription: c, productPrice: d, productCategory: e, productStock: f } = req.body;
    const last = await Product.findOne().sort({ product_no: -1 });
    const a    = last ? Number(last.product_no) + 1 : 1;

    const rel = new Product({ product_no: a, product_name: b, product_description: c, product_price: d, product_category: e, product_quantity: f, product_image: req.file.path });
    await rel.save();

    await new Activity({ user_id: uid, activity: 'Product Added Successfully' }).save();
    res.render('successadditem', { name, user_image });
});

app.post('/producteditsuccess', auth, upload.single('productImage'), async (req, res) => {
    const uid = req.user.user_id;
    const abhi = await User.findOne({ user_id: uid });
    const name = abhi.your_name;
    const user_image = abhi.picture;

    const Product = require('./src/models/Product');
    const { productId, productName, productDescription, productCategory, productPrice, productQuantity, existingImage } = req.body;
    
    console.log("Updating Product:", { productId, productName, productPrice, productQuantity });
    console.log("File received:", req.file ? req.file.path : "No file");

    // Determine the image path: use new upload if provided, otherwise fallback to existing image
    const imagePath = req.file ? req.file.path : existingImage;

    try {
        const result = await Product.findByIdAndUpdate(productId, {
            product_name: productName,
            product_description: productDescription,
            product_category: productCategory,
            product_price: Number(productPrice),
            product_quantity: Number(productQuantity),
            product_image: imagePath
        }, { new: true });

        console.log("Update database result:", result ? "Succeeded" : "Failed (Document not found)");

        if (!result) {
            console.warn("No product found with ID:", productId);
        }

        await new Activity({ user_id: uid, activity: `Product Updated: ${productName}` }).save();
        res.render('productupdatesuccess', { user_image, name });
    } catch (error) {
        console.error("Update Error:", error);
    }
});

app.post('/quickupdate', auth, async (req, res) => {
    const { productId, field, value } = req.body;
    try {
        const Product = require('./src/models/Product');
        const update = {};
        update[field] = (field === 'product_price' || field === 'product_quantity') ? Number(value) : value;
        const updated = await Product.findByIdAndUpdate(productId, update, { new: true });
        if (!updated) return res.status(404).json({ success: false });
        await new Activity({ user_id: req.user.user_id, activity: `Quick Update: ${field} set to ${value}` }).save();
        res.json({ success: true, updatedValue: updated[field] });
    } catch (e) {
        res.status(500).json({ success: false });
    }
});

// ─── Send mail (general) ──────────────────────────────────────────────────────
app.post('/send-mail', auth, async (req, res) => {
    const uid  = req.user.user_id;
    const abhi = await User.findOne({ user_id: uid });
    const name = abhi.your_name;
    const user_image = abhi.picture;

    try {
        const { senderEmail, recipientEmail, subject, message } = req.body;
        const transporter = nodemailer.createTransport({ host: 'smtp-relay.brevo.com', port: 587, auth: { user: process.env.BREVO_USER, pass: process.env.BREVO_API_KEY } });
        await transporter.sendMail({ from: 'gupta33abhi@gmail.com', replyTo: senderEmail, to: recipientEmail, subject, text: message });
        await new Activity({ user_id: uid, activity: 'Mail Send Successfully' }).save();
        res.render('mailsuccess', { name, user_image });
    } catch {
        res.render('mailsendfail', { user_image });
    }
});

// ─── Start server ─────────────────────────────────────────────────────────────
const PORT = process.env.PORT || 901;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));