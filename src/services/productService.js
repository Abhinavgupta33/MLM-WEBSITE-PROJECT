const User     = require('../models/User');
const Product  = require('../models/Product');
const Cart     = require('../models/Cart');
const Activity = require('../models/Activity');

// ─── Helper ───────────────────────────────────────────────────────────────────
async function getUserCtx(uid) {
    const user = await User.findOne({ user_id: uid });
    return { name: user.your_name, user_image: user.picture };
}

// ─── View products (admin) ────────────────────────────────────────────────────
exports.ser_addproductview = async (req, res) => {
    let uid = req.user.user_id;
    const { name, user_image } = await getUserCtx(uid);
    await new Activity({ user_id: uid, activity: 'Add Product Page Visited' }).save();
    res.render('addproduct', { name, user_image });
};

exports.ser_viewproduct = async (req, res) => {
    let uid = req.user.user_id;
    const { name, user_image } = await getUserCtx(uid);
    let products = await Product.find({});
    res.render('viewproduct', { products, name, user_image });
};

exports.ser_updateproductview = async (req, res) => {
    let uid = req.user.user_id;
    const { name, user_image } = await getUserCtx(uid);
    let products = await Product.find({});
    await new Activity({ user_id: uid, activity: 'Product Updated Successfully' }).save();
    res.render('updateproduct', { products, name, user_image });
};

exports.ser_updateproduct = async (req, res) => {
    let uid = req.user.user_id;
    const { name, user_image } = await getUserCtx(uid);
    let { productNumber: a, productName: b, productDescription: c, productPrice: d, productCategory: e, productQuantity: g } = req.body;
    await Product.updateOne({ product_no: a }, { product_name: b, product_description: c, product_price: d, product_category: e, product_quantity: g });
    await new Activity({ user_id: uid, activity: 'Product Updated Successfully' }).save();
    res.render('successupdated', { name, user_image });
};

exports.ser_deleteproduct = async (req, res) => {
    let uid = req.user.user_id;
    const { name, user_image } = await getUserCtx(uid);
    res.render('deleteproduct', { name, user_image });
};

exports.ser_productedit = async (req, res) => {
    let uid = req.user.user_id;
    const { name, user_image } = await getUserCtx(uid);
    let productno = req.query.productno;
    let product_detail = await Product.findOne({ product_no: productno });
    res.render('productedit', { product_detail, user_image, name });
};

exports.ser_producteditsuccess = async (req, res) => {
    let uid = req.user.user_id;
    const { name, user_image } = await getUserCtx(uid);
    let { productId, productName, productDescription, productCategory, productPrice, productQuantity, existingImage } = req.body;
    
    const imagePath = req.file ? req.file.path : existingImage;

    try {
        await Product.findByIdAndUpdate(productId, {
            product_name: productName,
            product_description: productDescription,
            product_category: productCategory,
            product_price: Number(productPrice),
            product_quantity: Number(productQuantity),
            product_image: imagePath
        });
        res.render('productupdatesuccess', { user_image, name });
    } catch (error) {
        console.error("Update Error:", error);
        res.status(500).send("Error updating product");
    }
};

exports.ser_productdelete = async (req, res) => {
    let uid = req.user.user_id;
    const { name, user_image } = await getUserCtx(uid);
    let productname = req.query.productname;
    if (uid == '1') {
        await Product.deleteOne({ product_name: productname });
        await Cart.deleteOne({ product_name: productname });
        res.render('productdeletesuccess', { name, user_image });
    } else {
        res.render('productdeletefail', { name, user_image });
    }
};
