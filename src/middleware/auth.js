const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Cart = require('../models/Cart'); // Add Cart model required to count items

async function auth(req, res, next) {
    try {
        if (req.cookies.mytoken && req.cookies.mytoken !== '') {
            const tokendata = req.cookies.mytoken;
            const actdata = jwt.verify(tokendata, process.env.JWT_SECRET || 'aabb');
            const user = await User.findOne({ user_id: actdata });
            if (!user) return res.status(403).json({ msg: 'User not found' });
            
            req.user = user;
            
            // Calculate total cart items live!
            const userCart = await Cart.find({ addedby: String(user.user_id) });
            let cartTotalQuantity = 0;
            for (let item of userCart) {
                cartTotalQuantity += Number(item.product_quantity) || 0;
            }
            res.locals.cartTotalQuantity = cartTotalQuantity;

            next();
        } else {
            res.redirect('/');
            console.log('Please Login First');
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error', message: err.message });
    }
}

module.exports = auth;
