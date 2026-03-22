const User     = require('../models/User');
const Product  = require('../models/Product');
const Cart     = require('../models/Cart');
const Activity = require('../models/Activity');

// ─── Helper ───────────────────────────────────────────────────────────────────
async function getUserCtx(uid) {
    const user = await User.findOne({ user_id: uid });
    return { name: user.your_name, user_image: user.picture };
}

// ─── Shopping cart view ───────────────────────────────────────────────────────
exports.ser_shopping = async (req, res) => {
    let uid = req.user.user_id;
    const { user_image } = await getUserCtx(uid);
    let cart = await Cart.find({ addedby: uid });
    res.render('addtocart', { cart, user_image });
};

// ─── Add to cart ──────────────────────────────────────────────────────────────
exports.ser_addtocart = async (req, res) => {
    let uid = req.user.user_id;
    const { name, user_image } = await getUserCtx(uid);
    let quantity = parseInt(req.query.quantity);
    let product = req.query.product_no;
    let cart1 = await Product.findOne({ product_no: product });

    const handleAjaxReturn = async () => {
        const userCart = await Cart.find({ addedby: String(uid) });
        let cartCount = 0;
        userCart.forEach(i => cartCount += (Number(i.product_quantity) || 0));
        return res.json({ success: true, cartCount });
    };

    if (cart1.product_quantity >= quantity) {
        let data1 = await Cart.findOne({ addedby: uid, product_no: product });
        if (data1) {
            if (cart1.product_quantity >= quantity + data1.product_quantity) {
                let total_quantity = data1.product_quantity + quantity;
                await Cart.updateOne({ product_no: product }, { product_quantity: total_quantity });
                await new Activity({ user_id: uid, activity: 'Product Added To Cart Successfully' }).save();
                if (req.query.ajax === 'true') return handleAjaxReturn();
                let products = await Product.find({});
                res.render('viewproduct', { products, name, user_image });
            } else {
                if (req.query.ajax === 'true') return res.status(400).json({ success: false, msg: 'Item Not Available' });
                res.render('itemnotavailable', { name, user_image });
            }
        } else {
            let rel = new Cart({ product_no: cart1.product_no, product_name: cart1.product_name, product_description: cart1.product_description, product_price: cart1.product_price, product_category: cart1.product_category, product_quantity: quantity, product_image: cart1.product_image, addedby: uid });
            await rel.save();
            await new Activity({ user_id: uid, activity: 'Item Added To Cart', activity_detail: 'User Added Item Successfully To Cart' }).save();
            if (req.query.ajax === 'true') return handleAjaxReturn();
            let products = await Product.find({});
            res.render('viewproduct', { products, name, user_image });
        }
    } else {
        if (req.query.ajax === 'true') return res.status(400).json({ success: false, msg: 'Item Not Available' });
        res.render('itemnotavailable', { name, user_image });
    }
};

// ─── Remove from cart ─────────────────────────────────────────────────────────
exports.ser_removeproduct = async (req, res) => {
    try {
        let uid = req.user.user_id;
        const { name, user_image } = await getUserCtx(uid);
        let removequantity = req.body.quantity;
        let data = req.body.id;
        let data1 = await Product.findOne({ product_name: data });
        if (removequantity <= data1.product_quantity) {
            let data3 = await Cart.findOne({ product_name: data });
            if (data3.product_quantity <= 1) {
                await Cart.deleteOne({ product_name: data });
            } else {
                let newquantity = parseInt(data3.product_quantity) - parseInt(removequantity);
                await Cart.updateOne({ product_name: data }, { product_quantity: newquantity });
                await new Activity({ user_id: uid, activity: 'Item Removed Successfully', activity_detail: 'User Removed Item Successfully From Cart' }).save();
            }
        }
        let cart = await Cart.find({ addedby: uid });
        res.render('addtocart', { cart, user_image });
    } catch {
        res.render('error');
    }
};

// ─── Buy now (cart) ───────────────────────────────────────────────────────────
exports.ser_buynow = async (req, res) => {
    try {
        let uid = req.user.user_id;
        const { name, user_image } = await getUserCtx(uid);
        let cart = await Cart.find({ addedby: uid });
        res.render('buynow', { cart, user_image });
    } catch {
        res.render('error');
    }
};

// ─── Buy now (direct) ────────────────────────────────────────────────────────
exports.ser_buynow1 = async (req, res) => {
    let uid = req.user.user_id;
    const { name, user_image } = await getUserCtx(uid);
    let quantity = parseInt(req.query.quantity);
    let product = req.query.product_no;
    let cart = await Product.findOne({ product_no: product });
    res.cookie('buynowname', product);
    res.cookie('buynowquantity', quantity);
    if (cart.product_quantity > quantity) {
        res.render('buynow1', { quantity, cart, user_image });
    } else {
        res.render('itemnotavailable', { name, user_image });
    }
};

// ─── Update quantity ──────────────────────────────────────────────────────────
exports.ser_update_quantity = async (req, res) => {
    try {
        let uid = req.user.user_id;
        const { user_image } = await getUserCtx(uid);
        let { quantity, productId: product_name } = req.body;
        let qty = await Product.findOne({ product_name });
        if (qty.product_quantity > quantity) {
            await Cart.updateOne({ product_name }, { product_quantity: quantity });
        } else {
            return res.render('itemnotavailable', { user_image });
        }
        res.redirect('/shopping');
    } catch {
        res.render('error');
    }
};

// ─── Confirm purchase (cart) ──────────────────────────────────────────────────
exports.ser_confirm_purchase = async (req, res) => {
    let abhi = req.body.totalAmount;
    let uid  = req.user.user_id;
    let data = await User.findOne({ user_id: uid });
    let balance = data.amount;
    if (balance > abhi) {
        let new_amount = parseInt(balance) - parseInt(abhi);
        await User.updateOne({ user_id: uid }, { amount: new_amount });
        let data1 = await Cart.find({ addedby: uid });
        data1.forEach(async index => {
            let data2 = await Product.findOne({ product_name: index.product_name });
            let new_quantity = parseInt(data2.product_quantity) - parseInt(index.product_quantity);
            await Product.updateOne({ product_name: index.product_name }, { product_quantity: new_quantity });
        });
        await Cart.deleteMany({ addedby: uid });
        res.render('successpurchase', { data1, abhi });
    } else {
        res.render('error');
    }
};

// ─── Confirm purchase (direct buy) ────────────────────────────────────────────
exports.ser_confirm_purchase1 = async (req, res) => {
    let abhi = parseInt(req.body.totalAmount);
    let uid  = req.user.user_id;
    let name = req.cookies.buynowname;
    let quantity1 = req.cookies.buynowquantity;
    let data = await User.findOne({ user_id: uid });
    let balance = parseInt(data.amount);
    if (balance > abhi) {
        let new_amount = parseInt(balance) - abhi;
        await User.updateOne({ user_id: uid }, { amount: new_amount });
        let data1 = await Product.findOne({ product_name: name });
        let new_quantity = parseInt(data1.product_quantity) - parseInt(quantity1);
        await Product.updateOne({ product_name: name }, { product_quantity: new_quantity });
        let data2 = await Product.findOne({ product_name: name });
        res.render('successpurchase1', { data2, quantity1, abhi });
    } else {
        res.render('error');
    }
};
