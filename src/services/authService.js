const User    = require('../models/User');
const Product = require('../models/Product');
const Otp     = require('../models/Otp');
const Activity = require('../models/Activity');
const jwt     = require('jsonwebtoken');
const sendOtp = require('../utils/sendOtp');
require('dotenv').config();

// ─── Signup ───────────────────────────────────────────────────────────────────
exports.ser_signup = async (req, res) => {
    let b = req.body.Name;
    let c = req.body.FatherName;
    let d = req.body.MobileNo;
    let e = req.body.Dob;
    let f = req.body.Email;
    let g = req.body.Gender;
    let h = req.body.ResidentialAddress;
    let i = req.body.Password;
    let j = req.body.Amount;

    let data1 = await User.findOne().sort({ user_id: -1 });
    let a = data1 ? Number(data1.user_id) + 1 : 1;

    let rec = new User({ user_id: a, parent_id: a, your_name: b, father_name: c, mobile_no: d, date: e, email: f, gender: g, address: h, password: i, amount: j });
    await rec.save();

    let data = await User.findOne({ email: f, password: i });
    let tok = jwt.sign(data.user_id, process.env.JWT_SECRET || 'aabb');
    res.cookie('mytoken', tok);
    await User.updateOne({ your_name: b }, { $set: { status: 'active' } });

    let activeuser = (await User.find({ status: 'active' })).length;
    let totalproduct = (await Product.find({})).length;
    let image = await User.findOne({ user_id: a });
    let user_image = image.picture;

    res.render('signupsuccess', { name: b, activeuser, totalproduct, user_image });
};

// ─── Login (sends OTP) ────────────────────────────────────────────────────────
exports.ser_login = async (req, res) => {
    const { email, pass } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user || pass !== user.password) return res.render('incorrectpass');
        if (user.blocked) return res.render('loginblocked');

        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        await Otp.create({ email, otp, createdAt: new Date() });
        await sendOtp(email, otp);
        res.render('otpverify', { email });
    } catch (error) {
        console.error('Error logging in:', error);
        res.render('error');
    }
};

// ─── Verify OTP ───────────────────────────────────────────────────────────────
exports.ser_verify_otp = async (req, res) => {
    const { email, otp } = req.body;
    try {
        const data = await Otp.findOne({ email, otp });
        if (!data) return res.render('wrongotp', { email });

        const user = await User.findOne({ email });
        let tok = jwt.sign(user.user_id, process.env.JWT_SECRET || 'aabb');
        res.cookie('mytoken', tok);
        await User.updateOne({ your_name: user.your_name }, { $set: { status: 'active' } });

        let activeuser = (await User.find({ status: 'active' })).length;
        let totalproduct = (await Product.find({})).length;

        await new Activity({
            user_id: user.user_id,
            activity: 'User logged in via OTP',
            activity_detail: `${user.your_name} verified OTP and logged in`
        }).save();

        res.render('dashboard', { name: user.your_name, activeuser, totalproduct, user_image: user.picture });
        await Otp.deleteMany({ email });
    } catch (error) {
        console.error('OTP verification error:', error);
        res.render('error');
    }
};

// ─── Logout ───────────────────────────────────────────────────────────────────
exports.ser_logout = async (req, res) => {
    let un = req.user.user_id;
    await User.updateOne({ user_id: un }, { $set: { status: 'deactive' } });
    res.cookie('mytoken', '');
    await new Activity({ user_id: un, activity: 'You Have Logged Out Successfully', activity_detail: 'User Have Been Successfully Logged Out' }).save();
    res.render('logout');
};

// ─── Change Password Page ─────────────────────────────────────────────────────
exports.ser_change_pass_page = async (req, res) => {
    let uid = req.user.user_id;
    let image = await User.findOne({ user_id: uid });
    res.render('changepass', { user_image: image.picture });
};

// ─── Change Password ──────────────────────────────────────────────────────────
exports.ser_changepass = async (req, res) => {
    let uid = req.user.user_id;
    let abhi = await User.findOne({ user_id: uid });
    let name = abhi.your_name;
    let user_image = abhi.picture;
    let a = req.body.oldpass;
    let b = req.body.pass;
    let c = req.body.conpass;

    if (b == c) {
        let data = await User.findOne({ user_id: uid });
        if (a == data.password) {
            await new Activity({ user_id: uid, activity: 'User Password Changed Successfully', activity_detail: 'You Have Successfully Changed Your Password' }).save();
            await User.updateOne({ user_id: uid }, { password: c });
            res.render('adminprofile', { name, user_image });
        } else {
            res.render('error');
        }
    } else {
        res.render('error');
    }
};
