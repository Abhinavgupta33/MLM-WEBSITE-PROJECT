const User     = require('../models/User');
const Product  = require('../models/Product');
const Activity = require('../models/Activity');
require('dotenv').config();

// ─── Helper: get base user context ───────────────────────────────────────────
async function getUserCtx(uid) {
    const user = await User.findOne({ user_id: uid });
    return { name: user.your_name, user_image: user.picture };
}

// ─── Dashboard ────────────────────────────────────────────────────────────────
exports.ser_dashboard = async (req, res) => {
    let uid = req.user.user_id;
    const { name, user_image } = await getUserCtx(uid);
    let activeuser = (await User.find({ status: 'active' })).length;
    let totalproduct = (await Product.find({})).length;
    res.render('dashboard', { name, activeuser, totalproduct, user_image });
};

// ─── Admin Profile Info ───────────────────────────────────────────────────────
exports.ser_admininfo = async (req, res) => {
    let uid = req.user.user_id;
    const { name, user_image } = await getUserCtx(uid);
    let data = await User.findOne({ user_id: uid });
    res.render('adminprofile', { a: data.your_name, b: data.mobile_no, c: data.email, name, user_image });
};

// ─── Add User View ────────────────────────────────────────────────────────────
exports.ser_adduserview = async (req, res) => {
    let uid = req.user.user_id;
    const { name, user_image } = await getUserCtx(uid);
    await new Activity({ user_id: uid, activity: 'Add User Page Visited' }).save();
    res.render('adduser', { name, user_image });
};

// ─── Add User Data (MLM commission) ──────────────────────────────────────────
exports.ser_adduserdata = async (req, res) => {
    let uid = req.user.user_id;
    const { name, user_image } = await getUserCtx(uid);
    let b = req.query.Name, c = req.query.FatherName, d = req.query.MobileNo;
    let e = req.query.Dob, f = req.query.Email, g = req.query.Gender;
    let h = req.query.ResidentialAddress, i = req.query.Password, j = req.query.Amount;

    try {
        let data = await User.findOne().sort({ user_id: -1 });
        let a = data ? Number(data.user_id) + 1 : 1;

        let rel = new User({ user_id: a, parent_id: Number(uid), your_name: b, father_name: c, mobile_no: d, date: e, email: f, gender: g, address: h, password: i, amount: j / 2 });
        await rel.save();

        // Distribute commissions up the MLM tree
        let data1 = await User.findOne().sort({ user_id: -1 });
        let parentId = data1.parent_id;
        let commission = j / 4;

        while (true) {
            let user = await User.findOne({ user_id: parentId });
            if (!user) break;
            let updatedAmount = (user.amount || 0) + commission;
            await User.updateOne({ user_id: parentId }, { $set: { amount: updatedAmount } });
            commission = commission / 2;
            if (commission < 0.01) break;
            parentId = user.parent_id;
            if (!parentId || parentId === user.user_id) break;
        }

        let activeuser = (await User.find({ status: 'active' })).length;
        let totalproduct = (await Product.find({})).length;
        await new Activity({ user_id: uid, activity: 'User Added Successfully', activity_detail: 'You Added User Successfully' }).save();
        res.render('dashboard', { name, activeuser, totalproduct, user_image });
    } catch (error) {
        console.error('Error adding user data:', error);
        res.render('error');
    }
};

// ─── View Users (referral tree) ───────────────────────────────────────────────
exports.ser_userview = async (req, res) => {
    try {
        let uid = req.user.user_id;
        const { name, user_image } = await getUserCtx(uid);
        let users = await User.find({ parent_id: uid }, { _id: 0 });
        res.render('viewuser', { users, name, user_image });
    } catch (err) {
        console.error('Error fetching user data:', err);
        res.status(500).send('Internal Server Error');
    }
};

// ─── Filter Users ─────────────────────────────────────────────────────────────
exports.ser_filter = async (req, res) => {
    let uid = req.user.user_id;
    const { name, user_image } = await getUserCtx(uid);
    let filter = {};
    if (req.body.filtername)   filter.your_name  = req.body.filtername;
    if (req.body.filteremail)  filter.email       = req.body.filteremail;
    if (req.body.filterId)     filter.amount      = req.body.filterId;
    if (req.body.filtermobile) filter.mobile_no   = req.body.filtermobile;
    let users = await User.find(filter);
    res.render('viewuser', { name, users, user_image });
};

// ─── Block User ───────────────────────────────────────────────────────────────
exports.ser_blockuser = async (req, res) => {
    let uid = req.user.user_id;
    const { name, user_image } = await getUserCtx(uid);
    let userId = req.body.id;
    await new Activity({ user_id: userId, activity: 'User Blocked Successfully', activity_detail: 'You Have Blocked User Successfully' }).save();
    await User.updateOne({ user_id: userId }, { $set: { blocked: true } });
    res.render('successblocked', { name, user_image });
};

// ─── Unblock User ─────────────────────────────────────────────────────────────
exports.ser_unblockuser = async (req, res) => {
    let uid = req.user.user_id;
    const { name, user_image } = await getUserCtx(uid);
    let userId = req.body.id;
    await new Activity({ user_id: userId, activity: 'User Unblocked Successfully', activity_detail: 'You Have Unblocked User Successfully' }).save();
    await User.updateOne({ user_id: userId }, { $set: { blocked: false } });
    res.render('successunblocked', { name, user_image });
};

// ─── User for Update form ─────────────────────────────────────────────────────
exports.ser_user = async (req, res) => {
    let uid = req.user.user_id;
    const { name, user_image } = await getUserCtx(uid);
    let userId = req.body.id;
    let data = await User.findOne({ user_id: userId });
    res.cookie('abh', userId);
    res.render('update', { data, name, user_image });
};

// ─── Update User ──────────────────────────────────────────────────────────────
exports.ser_update = async (req, res) => {
    let uid = req.user.user_id;
    const { name, user_image } = await getUserCtx(uid);
    let un = req.cookies.abh;
    let { un: a, fn: b, mn: c, em: e, ge: f, ad: g } = req.body;
    await User.updateOne({ user_id: un }, { your_name: a, father_name: b, mobile_no: c, email: e, gender: f, address: g });
    let activeuser = (await User.find({ status: 'active' })).length;
    let totalproduct = (await Product.find({})).length;
    await new Activity({ user_id: uid, activity: 'User Details Updated Successfully', activity_detail: 'You Have Updated User Detail Successfully' }).save();
    res.render('dashboard', { name, activeuser, totalproduct, user_image });
};

// ─── Additional Header Pages ──────────────────────────────────────────────────
exports.ser_settings = async (req, res) => {
    let uid = req.user.user_id;
    const { name, user_image } = await getUserCtx(uid);
    res.render('settings', { name, user_image });
};

exports.ser_notifications = async (req, res) => {
    let uid = req.user.user_id;
    const { name, user_image } = await getUserCtx(uid);
    res.render('notifications', { name, user_image });
};

exports.ser_messages = async (req, res) => {
    let uid = req.user.user_id;
    const { name, user_image } = await getUserCtx(uid);
    res.render('messages', { name, user_image });
};

exports.ser_team = async (req, res) => {
    let uid = req.user.user_id;
    const { name, user_image } = await getUserCtx(uid);
    res.render('team', { name, user_image });
};

exports.ser_help = async (req, res) => {
    let uid = req.user.user_id;
    const { name, user_image } = await getUserCtx(uid);
    res.render('help', { name, user_image });
};

exports.ser_feedback = async (req, res) => {
    let uid = req.user.user_id;
    const { name, user_image } = await getUserCtx(uid);
    res.render('feedback', { name, user_image });
};
